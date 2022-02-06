# Objects Kit

## Introduction

Objects Kit is the default [Speckle 2.0 Kit](/dev/kits). It includes geometry and element base classes as well as conversions routines for the AEC applications that we officially support. Objects uses .NET Standard 2.0 and has been tested on Windows and MacOS. You can find the code in [speckle-sharp/Objects](https://github.com/specklesystems/speckle-sharp/tree/master/Objects).

::: tip
Objects is available on NuGet as `Speckle.Objects`.
All converters are also available under `Speckle.Objects.COnverter.*`.
:::

While Objects Kit is the default, you are free to develop your own Kit or fork this one to customise it yourself. As of the beta release, easy swapping of kits within the connectors is not fully supported. However, this will be fully supported by the time we officially ship 2.0 🎉

More info on Objects and Kits in 2.0 can be found in our [Kits section](/dev/kits).

## Developing

Objects Kit is just a set of simple Data Transfer Objects that are fairly straightforward to understand. The object model is split into two main parts:

- `Geometry`: the basic building blocks such as points, lines, meshes, surfaces, etc
- `BuiltElements`: higher level elements such as rooms, beams, ducts, openings, topography, etc

### Writing Objects

If you'd like to contribute more [objects](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Objects) to the Objects Kit or extend and customise the kit yourself, you can easily do so by creating new classes that inherit from `Base`. You can read more about the `Base` class [here](/dev/base). There are also a few [interfaces](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Interfaces.cs) an object can inherit from including `ICurve`, `IHasArea`, `IHasVolume`, and `IHasBoundingBox`.

The class itself needs to have an empty constructor for serialisation / deserialisation purposes. You can create as many additional constructors for your own use as makes sense.

For example, here is what our [box class](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Geometry/Box.cs) looks like:

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

#### Adding `SchemaInfo` attributes to

### Specific Host Application Support

The basic objects are intended to be as general as possible

In order to better support interop between the various AEC host applications and Speckle, Objects also contains classes that help to deal with native object types and their properties. These inherit from a more generic Speckle object but add additional properties that are important for specific applications, but are too specific to include in the generic object.

For example, [`Objects.BuiltElements.Revit`](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Objects/BuiltElements/Revit) contains a collection of classes that extend the basic ones with a series of default Revit properties. This is the approach we'll follow with other host applications as well.

#### Adding Schema information attributes to classes

In order for these _Host Application specific_ classes to be discoverable in any other host application (such as Grasshopper's `Create Schema Object` node), this objects must contain at least one constructor with the attribute `SchemaInfo`. The attribute allows to provide human-readable names and descriptions that will be used to display to the user.

In addition, you can optionally add the `SchemaMainParam` attribute to one of the constructor's inputs to signal it as the **main geometry parameter** for that Schema.

Here's the code for the `Objects.BuiltElements.Beam` constructor, with the `baseLine` flagged as its main parameter:

```csharp
[SchemaInfo("Beam", "Creates a Speckle beam", "BIM", "Structure")]
public Beam([SchemaMainParam] ICurve baseLine)
{
    this.baseLine = baseLine;
}
```

#### Handing breaking changes in the Schema model

These information from the `SchemaInfo` attribute is used, among other places, to automatically generate all the Schema Nodes you'll find in the Grasshopper connector.

This means that any breaking-change on that object will have unwanted side-effects on the end-user; such as previously existing Schemas dissapearing without warning.

In order to prevent this, the recommended way to update is to:

1. Add a `SchemaDeprecated` attribute to the existing constructor, and modify it's implementation if necessary.
2. Create a new constructor with the new parameters and add the `SchemaInfo` attribute to it too.

Following our previous `Beam` example. If we added two new properties to our beam (`width` and `height`), the final changes would look like this:

```csharp
public double width;
public double height;

[SchemaDeprecated, SchemaInfo("Beam", "Creates a Speckle beam", "BIM", "Structure")]
public Beam([SchemaMainParam] ICurve baseLine)
{
    this.baseLine = baseLine;
    this.height = 1.0;
    this.width = 1.0;
}

[SchemaInfo("Beam", "Creates a Speckle beam", "BIM", "Structure")]
public Beam([SchemaMainParam] ICurve baseLine, double height, double width)
{
    this.baseLine = baseLine;
    this.height = height;
    this.width = width;
}
```

This will ensure that anyone using the previous Schema definition can still do, but also provide a way to notify them that they should upgrade to the new/upgraded one.

> These `SchemaDeprecated` constructors will eventually be deleted from the object model, but not before giving all users enough warning.

### Converters

The Objects Kit doesn't just stop at Objects - you need converters as well! These can be found in [Objects/Converters](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Converters). Each converter is a class within the `Objects.Converter` namespace and contains conversion routines to a Speckle object and to the native software equivalent. The two key methods within a converter are predictably:

- `ConvertToNative`: converts a Speckle object to the native software
- `ConvertToSpeckle`: converts a native software object to Speckle

Both of these core methods check if the specific type passed into it is supported by the converter, then calls the conversion method for that type accordingly.

For example, here is a shortened version of the [`ConvertToSpeckle`](https://github.com/specklesystems/speckle-sharp/blob/9ba30e125f2bd65d2f746563d00a90a736ade116/Objects/Converters/ConverterRevit/ConverterRevitShared/ConverterRevit.cs#L69-L154) method in `ConverterRevit`:

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

Each supported type has its own conversion routines. You can expand the support of a converter by adding your own conversions. Depending on the converter structure, you can do this by either adding a new partial class (Revit) or adding to the respective `ConverterX.Geometry` or `ConverterX.BuiltElements` file (RhinoGh, Dynamo, AutoCAD). As a simple example, here is the Revit [`BeamToSpeckle`](https://github.com/specklesystems/speckle-sharp/blob/9ba30e125f2bd65d2f746563d00a90a736ade116/Objects/Converters/ConverterRevit/ConverterRevitShared/Partial%20Classes/ConvertBeam.cs#L93-L111) method which is called by the `FamilyInstanceToSpeckle` conversion:

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
