# Writing your own kit

Writing your own kit is a quite simple task, as long as you are not intimidated by the various AEC software APIs 😁.
As mentioned in [this page](/dev/kits), kits are made of:

- an object model
- a set of converters

A good example is the Objects kit, in our [speckle-sharp repo](https://github.com/specklesystems/speckle-sharp/tree/master/Objects).

::: tip IMPORTANT 🙌
Kit selection is not yet available in most of our connectors. We are planning to add it soon!
:::

## Object Model

An Object Model is just a collection _data structures_. These are the types that the kit is supporting, and for which conversion routines need to be written so that you can send and receive from Speckle.

### Creating an Object Model

There are a few general rules to keep in mind when writing these classes.

#### 1. Always Inherit from the `Base` Class

This ensures serialisation and deserialisation happen through Speckle, with the default sane serialisation handling that we know we can support. Most importantly, it will enable type name handling and cross-kit legibility. For more on the `Base` class, head to the [Base Object](/dev/base) section.

#### 2. Reference Loops will be Ignored

You can always recreate them post deserialisation using a function flagged with the `[OnDeserialized]` attribute like so:

```cs
  [OnDeserialized]
  internal void onDeserialized(StreamingContext context)
  {
    Edges.ForEach(e => e.Brep = this);
    Loops.ForEach(l => l.Brep = this);
    Trims.ForEach(t => t.Brep = this);
    Faces.ForEach(f => f.Brep = this);
  }
```

#### 3. Keep Data Structures Lean

You should prefer typed arrays over lists of non-primitive values. For example, instead of a `List<Point>` for keeping track of mesh vertices, use a `List<double>`

#### 4. Always Include a Parameterless Constructor

This is for Newtonsoft serialisation / deserialisation. At worst, flag one constructor with the `[JsonConstructor]` attribute. Keep in mind this does indirect magic that can potentially trip you up - eg key names must match argument prop names.

### Example

With these rules in mind, creating your own classes by inheriting from `Base` is relatively straight forward. Additionally, there are also a few [interfaces](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Interfaces.cs) an object can inherit from including `ICurve`, `IHasArea`, `IHasVolume`, and `IHasBoundingBox`.

For a simple example, this is what our [box class](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Geometry/Box.cs) looks like:

```cs
public class Box : Base, IHasVolume, IHasArea, IHasBoundingBox
{
  public Plane basePlane { get; set; }

  public Interval xSize { get; set; }

  public Interval ySize { get; set; }

  public Interval zSize { get; set; }

  public Box bbox { get; }

  public double area { get; set; }

  public double volume { get; set; }

  public Box() { }

  public Box(Plane basePlane, Interval xSize, Interval ySize, Interval zSize, string units = Units.Meters, string applicationId = null)
  {
    this.basePlane = basePlane;
    this.xSize = xSize;
    this.ySize = ySize;
    this.zSize = zSize;
    this.applicationId = applicationId;
    this.units = units;
  }
}
```

## Converters

Converters are the key to interoperability. They include the conversion routines for objects to and from the object model types. You create a new converter for each different application you want to support by inheriting from the [`ISpeckleConverter` interface](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/ISpeckleConverter.cs). All your converters should live together in the same kit alongside your types. You can see how we've implemented converters in our default Objects kit [here](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Converters).

Converters exist in the `MyKit.Converter` namespace and can either be broken up into smaller partial classes for each supported type (see the Revit Converter) or for each category (eg `ConverterX.Geometry` and `ConverterX.BuiltElements` as in the rest of our converters).

The converters must implement two key methods (plus a few others not described here):

- `ConvertToNative`: converts a Speckle object to the native software
- `ConvertToSpeckle`: converts a native software object to Speckle

The specific conversion routines for each supported type are defined separately and called from these key methods. If the type is not supported, an error should be added to the converter's `ConversionErrors` and a null object should be returned.

For example, here is a shortened version of the [`ConvertToSpeckle`](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Converters/ConverterRevit/ConverterRevitShared/ConverterRevit.cs#L69-L154) method in `ConverterRevit`:

```cs
public Base ConvertToSpeckle(object @object)
{
  Base returnObject = null;
  switch (@object)
  {
    case DB.DetailCurve o:
      returnObject = DetailCurveToSpeckle(o);
      break;
    case DB.DirectShape o:
      returnObject = DirectShapeToSpeckle(o);
      break;
    case DB.FamilyInstance o:
      returnObject = FamilyInstanceToSpeckle(o);
      break;
    case DB.Floor o:
      returnObject = FloorToSpeckle(o);
      break;
    // etc ...
    default:
      ConversionErrors.Add(new Error("Type not supported", $"Cannot convert {@object.GetType()} to Speckle"));
      returnObject = null;
      break;
  }

  return returnObject;
}
```

And here is the Revit [`BeamToSpeckle`](https://github.com/specklesystems/speckle-sharp/blob/9ba30e125f2bd65d2f746563d00a90a736ade116/Objects/Converters/ConverterRevit/ConverterRevitShared/Partial%20Classes/ConvertBeam.cs#L93-L111) method which is called by the `FamilyInstanceToSpeckle` conversion:

```cs
private RevitBeam BeamToSpeckle(DB.FamilyInstance revitBeam)
{
  var baseGeometry = LocationToSpeckle(revitBeam);
  var baseLine = baseGeometry as ICurve;
  if (baseLine == null)
  {
    throw new Exception("Only line based Beams are currently supported.");
  }

  var speckleBeam = new RevitBeam();
  speckleBeam.type = Doc.GetElement(revitBeam.GetTypeId()).Name;
  speckleBeam.baseLine = baseLine;
  speckleBeam.level = ConvertAndCacheLevel(revitBeam, BuiltInParameter.INSTANCE_REFERENCE_LEVEL_PARAM);
  speckleBeam["@displayMesh"] = GetElementMesh(revitBeam);

  GetAllRevitParamsAndIds(speckleBeam, revitBeam);

  return speckleBeam;
}
```

## Kit Interface

Once you've got your object model and your conversion routines, you can officially put together your kit by inheriting from the [`ISpeckleKit` interface](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/ISpeckleKit.cs) and register your `Types` and `Converters`.

```cs
public interface ISpeckleKit
{
  IEnumerable<Type> Types { get; }

  IEnumerable<string> Converters { get; }

  string Description { get; }
  string Name { get; }
  string Author { get; }
  string WebsiteOrEmail { get; }

  /// <summary>
  /// Tries to load a converter for a specific app.
  /// </summary>
  /// <param name="app">Must be one of the Kits.Applications variables.</param>
  /// <returns>The converter for the specific app, or null.</returns>
  public ISpeckleConverter LoadConverter(string app);

}
```

## KitManager

The KitManager is a handy tool for loading up different kits. By default, it looks for the kits in `%AppData%/Speckle/Kits`. To explore all its features, have a look at the code [here](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/KitManager.cs).

See below for a simple example of getting a list of available kits, selecting a specific kit, and loading a converter.

```cs
// Get a list of all available kits
var kits = KitManager.Kits

// Get a specific kit by name or from the assembly full name
var kitByName = KitManager.Kits.FirstOrDefault(kit => kit.Name == "CoreKit");
var kitFromAssembly = KitManager.GetKit(typeof(CoreKit).Assembly.FullName);

// Load the default Objects kit and the included Revit converter
var kit = KitManager.GetDefaultKit();
var converter = kit.LoadConverter(ConnectorRevitUtils.RevitAppName);
converter.SetContextDocument(CurrentDoc.Document);

```
