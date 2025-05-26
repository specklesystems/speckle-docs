---
title: The Objects Kit
deprecationType: developer
---

<Banner />

# Objects kit

## Introduction

Objects kit is the default [Speckle kit](/dev/kits). It includes geometry and element base classes as well as conversions routines for the AEC applications that we officially support. Objects uses .NET Standard 2.0 and has been tested on Windows and MacOS. You can find the code in [speckle-sharp/Objects](https://github.com/specklesystems/speckle-sharp/tree/master/Objects).

::: tip
Objects is available on NuGet as `Speckle.Objects`.
All converters are also available under `Speckle.Objects.COnverter.*`.
:::

While the Objects is the default kit, you are free to develop your own kit or fork this one to customise it yourself. As of the beta release, easy swapping of kits within the connectors is not fully supported. However, this will be fully supported by the time we officially ship 2.0 🎉

More info on Objects and kits in 2.0 can be found in our [kits section](/dev/kits).

## Developing

Objects kit is just a set of simple data transfer objects that are fairly straightforward to understand. The object model is split into two main parts:

- `Geometry`: the basic building blocks such as points, lines, meshes, surfaces, etc
- `BuiltElements`: higher level elements such as rooms, beams, ducts, openings, topography, etc

### Writing Objects

If you'd like to contribute more [objects](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Objects) to the Objects kit or extend and customise the kit yourself, you can easily do so by creating new classes that inherit from `Base`. You can read more about the `Base` class [here](/dev/base). There are also a few [interfaces](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Objects/Interfaces.cs) an object can inherit from including `ICurve`, `IHasArea`, `IHasVolume`, and `IHasBoundingBox`.

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

### Specific Host Application Support

The basic objects are intended to be as general as possible

In order to better support interop between the various AEC host applications and Speckle, Objects also contains classes that help to deal with native object types and their properties. These inherit from a more generic Speckle object but add additional properties that are important for specific applications, but are too specific to include in the generic object.

For example, [`Objects.BuiltElements.Revit`](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Objects/BuiltElements/Revit) contains a collection of classes that extend the basic ones with a series of default Revit properties. This is the approach we'll follow with other host applications as well.

#### Adding Schema Information Attributes to Classes

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

#### Handing Breaking Changes in the Schema Model

These information from the `SchemaInfo` attribute is used, among other places, to automatically generate all the Schema Nodes you'll find in the Grasshopper Connector.

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

The Objects kit doesn't just stop at Objects - you need converters as well! These can be found in [Objects/Converters](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Converters). Each converter is a class within the `Objects.Converter` namespace and contains conversion routines to a Speckle object and to the native software equivalent. The two key methods within a converter are predictably:

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

## Instances, Transforms, and Definitions

Speckle supports object instancing across many connectors, using an abstract `Objects` class that allows for conversions between block instances in Rhino and AutoCAD, family instances in Revit, collections and geometry instances in Blender, instances in Sketchup, and more.

::: tip What is an instance?
In Speckle, an **instance** is a single **transformation** of a detached, typed **definition** object containing *transformable geometry*.
:::

### Instances

Check out the [Instance class in speckle-sharp](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Other/Instance.cs).

Speckle instances live in the `Objects.Other` namespace and are comprised of two main parts:

1. A detached `definition` object, which contains transformable geometry including other instances. 
2. A `transform` matrix indicating the transformations to be applied to the geometry inside the definition.

Concretions of the `Instance` class can contain instance-specific properties outside of the shared definition. When scoping your own concretion, keep in mind that any properties which will be shared across instances of the same definition should belong in the `definition` class, and any properties which are specific to a single instance should be on the `Instance` class.

**What about receiving Instances in applications that do not support instancing?**

Our abstract `Instance` class also contains virtual `GetTransformableGeometry()` and `GetTransformedGeometry()` methods which should be overridden in concretions. These methods determine how to retrieve the transformable geometry inside the `definition` and transforms their vertices with the instance transform for use in applications which do not natively support instancing.

### Transforms

Check out the [Transform class in speckle-sharp](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Other/Transform.cs).

Speckle instance transformations are stored in a `System.Numerics.Matrix4x4` typed 4x4 matrix. We are following a column-dominant transform matrix convention, where the 3x3 sub-matrix contains scaling and rotation transforms and the 4th column is the translation vector.

<p align="center">
  <img src="/dev/img/objects/transform1.jpg" height="200" />
</p>


		RS                 Rotation and Scale Matrix
		0                  Identity Row
		[Tx, Ty, Tz]       Translation Vector with homogeneous scaling factor Tw


When retrieving the row-dominant array value of the `System.Numerics.Matrix4x4` matrix, we expect the the **transformation basis x, y, and z vectors** to be represented by the 1st, 2nd, and 3rd columns of the 3x3 sub-matrix, respectively. The 4th column still represents translation.

<p align="center">
  <img src="/dev/img/objects/transform2.jpg" height="200" />
</p>


		[M0, M4, M8]       Basis X vector
		[M1, M5, M9]       Basis Y vector
		[M2, M6, M10]      Basis Z vector
		[M3, M7, M11]      Translation vector


#### Nested Instance Transforms

In some applications, instance definitions can contain other instances of other definitions. This is called **instance nesting**, where the transform of a nested instance is the **local transformation** of that nested instance relative to the parent definition. 

::: warning
⚠️ When calculating the total transformation of a nested instance, multiply its transform by all of the transforms of its parent instances.
:::

```csharp
// create two instances of the same definition
Transform transform1;
Transform transform2;
var childDefinition = new BlockDefinition(){ geometry = myGeometry };

var myInstance1 = new BlockInstance(){ 
  transform = transform1, 
  definition = childDefinition };

var myInstance2 = new BlockInstance(){ 
  transform = transform2, 
  definition = childDefinition };

// use these two instances in the definition of a parent instance
Transform parentTransform;
var parentDefinition = new BlockDefinition(){ geometry = new List<Base>(){myInstance1, myInstance2} };

var parentInstance = new BlockInstance() {
  transform = parentTransform, 
  definition = parentDefinition };

// total transformations of the geometry inside myInstance1 and myInstance2
var totalTransform1 = transform1.matrix * parentTransform.Matrix;
var totalTransform2 = transform2.matrix * parentTransform.Matrix;
```

#### Host Instance Transforms

Applications such as Blender and Revit also allow for element hosting behavior, where the **hosted** element is linked to a **host** element such that moving the host element in the native application also moves the hosted element. In general, hosted elements in Speckle are stored in the detatched `elements` property on the host Speckle object: this is true for `Instance` objects that function as hosts for other objects as well.

::: warning
⚠️ When calculating the total transformation of a hosted instance, **do not** apply its host instance’s transform.

:::

```csharp
// using the same instances as above, let's host the second instance on the first
BlockInstance myInstance1;
BlockInstance myInstance2;
myInstance1["elements"] = new List<Base>(){ myInstance2 };

// total transformations of the geometry inside myInstance1 and myInstance2
var totalTransform1 = transform1.matrix;
var totalTransform2 = transform2.matrix;
```

### Definitions

The abstract implementation of our instance definition property allows for any object inheriting `Base` to be used as a definition. The simplest implementation would be a generic `Base` object with some displayable `displayValue` property:

```csharp
// An instance class with definition of type Base
public class BaseInstance: Instance<Base>
{
	// We're expecting transformable geometry to be in the `displayValue` property
  protected override IEnumerable<Base> GetTransformableGeometry()
  {
		var display = typedDefinition["displayValue"] as List<Base>;
    var allChildren = display ?? new List<Base>();
    return allChildren;
  }

  [SchemaComputed("transformedGeometry")]
  public override IEnumerable<ITransformable> GetTransformedGeometry()
  {
    var transformed = base.GetTransformedGeometry().ToList();
    return transformed;
  }
}

// A base with two meshes as its displayValue
var definition = new Base();
definition["displayValue"] = new List<Mesh>(){ mesh1, mesh2 };

// an instance of this base
var instance = new BaseInstance();
instance.definition = definition;
instance.transform = new Transform(matrix1, units);

```

#### Connector Implementations

Our Objects kit contains definition classes that are used by our sharp connectors. The Speckle `Objects.Other.Instance : Base` class is implemented as follows:

| Connector | Speckle Instance Class | Speckle Definition Class GitHub Link |
| --- | --- | --- |
| Rhino, AutoCAD, Sketchup, Blender | `BlockInstance : Instance <BlockDefinition>` | [BlockDefinition](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Other/Block.cs) |
| Revit | `RevitInstance : Instance <RevitSymbolElementType>` | [RevitSymbolElementType](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/BuiltElements/Revit/RevitElementType.cs) |

##### Revit

Revit elements are parametric instances, and we use the `RevitInstance` class to send elements where (1) **no direct conversions exist** and (2) are **point-based family instances**. 

When sending or receiving models in Revit using the **Reference Point setting**, and when sending elements in **linked models**, the transformations of the linked model  and/or reference point is applied to the top-level family instance transform only.

**Limitations of Revit API and Instancing**

- Revit cannot natively support **scaling** operations in transforms. When receiving non-revit instances in Revit, we convert the transformed geometry directly and create **groups** from the converted geometry.
- Due to the parametric nature of Revit elements, some instance parameters result in **changes to the definition geometry**. Since we use the `displayValue` property to create Revit elements in most of our other connectors, this means that we are currently creating `RevitSymbolElementType` definitions with varying `displayValue`s to capture these geometry changes where they occur.
