# Supported Elements

As Speckle develops, we are able to build further integrations with each of the applications we support. However, each application, and its API, comes with its own limitations that (alas) no programmer can overcome!

The tables below give an per-application indication of which object conversions Speckle is currently able to support, and to what extent.

::: tip Not Seeing Support for Something you Want? 🧃

We're working hard to support additional elements. The list below will be updated as soon new conversion routines are added.

If you'd like us to add something specific, let us know on the [Speckle Community Forum](https://speckle.community)! We use community feedback to guide what features we'll work on next.

:::

## Rhino

### Supported Elements

Almost all geometric elements are supported by the Rhino Connector. This includes:

| Geometry     |  Send   | Receive |   Status   |
| ------------ | :-----: | :-----: | :--------: |
| Point        |   ✅    |   ✅    | `Complete` |
| Line         |   ✅    |   ✅    | `Complete` |
| Plane        |   ✅    |   ✅    | `Complete` |
| Arc          |   ✅    |   ✅    | `Complete` |
| Circle       |   ✅    |   ✅    | `Complete` |
| Ellipse      |   ✅    |   ✅    | `Complete` |
| Polyline     |   ✅    |   ✅    | `Complete` |
| Polycurve    |   ✅    |   ✅    | `Complete` |
| Spline       |   ✅    |   ✅    | `Complete` |
| Nurb Surface | As Brep |   ✅    | `Complete` |
| Brep         |   ✅    |   ✅    | `Complete` |
| Extrusion    |   ✅    | As Brep | `Complete` |
| Mesh         |   ✅    |   ✅    | `Complete` |

| BuiltElement | Send | Receive  |   Status   |
| ------------ | :--: | :------: | :--------: |
| View         |  ✅  |    ✅    | `Complete` |
| ModelCurve   |      | As Curve | `Complete` |
| DirectShape  |      | As Mesh  | `Complete` |
| Level        |      | As Named Construction Plane  | `Complete` |

| Other           | Send | Receive |    Status     |
| --------------- | :--: | :-----: | :-----------: |
| RenderMaterial  |  ✅  |   ✅    |  `Complete`  |
| BlockInstance   |  ✅  |   ✅    |  `Complete`   |
| BlockDefinition |  ✅  |   ✅    |  `Complete`   |
| PointCloud      |  ✅  |   ✅    |  `Complete`   |
| Hatch           |  ✅  |   ✅    |  `Complete`   |
| Text            |  ✅  |   ✅    |  `Complete`   |
| Dimension       |  ✅  |   ✅    |  `Complete`   |

> Speckle supports sending BREPs from Rhino <-> Rhino, and Rhino <-> Revit, with some limitations imposed by Revit's API.

Note: If Rhino's unit system is changed by the user, this may result in incorrectly scaled blocks. Make sure blocks are created in the same unit system as they are intended to be sent in.

### Unsupported Elements

Many non-geometric elements (such as text dots) and any geometric element not listed above are not supported.

## Grasshopper

### Supported Elements

Grasshopper supports the same geometry as the Rhino Connector:

| Geometry     |  Send   | Receive |   Status   |
| ------------ | :-----: | :-----: | :--------: |
| Point        |   ✅    |   ✅    | `Complete` |
| Line         |   ✅    |   ✅    | `Complete` |
| Plane        |   ✅    |   ✅    | `Complete` |
| Arc          |   ✅    |   ✅    | `Complete` |
| Circle       |   ✅    |   ✅    | `Complete` |
| Ellipse      |   ✅    |   ✅    | `Complete` |
| Polyline     |   ✅    |   ✅    | `Complete` |
| Polycurve    |   ✅    |   ✅    | `Complete` |
| Spline       |   ✅    |   ✅    | `Complete` |
| Nurb Surface | As Brep |   ✅    | `Complete` |
| Brep         |   ✅    |   ✅    | `Complete` |
| Extrusion    |   ✅    | As Brep | `Complete` |
| Mesh         |   ✅    |   ✅    | `Complete` |

| Other          | Send | Receive |    Status     |
| -------------- | :--: | :-----: | :-----------: |
| RenderMaterial |  ✅  |         | `In Progress` |

The **Schema Builder** node also provides additional support for the following built elements:

| BuiltElement                          | Send | Receive |    Status     |
| ------------------------------------- | :--: | :-----: | :-----------: |
| Adaptive Component                    |  ✅  |         |  `Complete`   |
| Beam                                  |  ✅  |         |  `Complete`   |
| Brace                                 |  ✅  |         |  `Complete`   |
| Ceiling                               |  ✅  |         |  `Complete`   |
| Column                                |  ✅  |         |  `Complete`   |
| Curves (Model, Detail, Room Boundary) |  ✅  |         |  `Complete`   |
| Direct Shape                          |  ✅  |         |  `Complete`   |
| Freeform Element                      |  ✅  |         |  `Complete`   |
| Duct                                  |  ✅  |         |  `Complete`   |
| Face Wall                             |  ✅  |         |  `Complete`   |
| Family Instance                       |  ✅  |         |  `Complete`   |
| Floor                                 |  ✅  |         |  `Complete`   |
| GridLine                              |  ✅  |         |  `Complete`   |
| Level                                 |  ✅  |         |  `Complete`   |
| Opening (Wall, Vertical, Shaft)       |  ✅  |         |  `Complete`   |
| Parameter                             |  ✅  |         |  `Complete`   |
| Railing                               |  ✅  |         |  `Complete`   |
| Roof (Extrusion, Footprint)           |  ✅  |         |  `Complete`   |
| Topography                            |  ✅  |         |  `Complete`   |
| View                                  |      |         | `In Progress` |
| Wall                                  |  ✅  |         |  `Complete`   |

Refer to the section below for additional information on the **Schema Builder** node.

### Unsupported Elements

Non-geometric elements and any geometric element not listed above, such as text tags, hatches, etc... are not supported.

## Revit

### Supported Elements

| BuiltElement                                            | Send | Receive |    Status     |
| ------------------------------------------------------- | :--: | :-----: | :-----------: |
| Area                                                    |  ✅  |         |  `Complete`   |
| Adaptive Component                                      |  ✅  |   ✅    |  `Complete`   |
| Beam                                                    |  ✅  |   ✅    |  `Complete`   |
| Brace                                                   |  ✅  |   ✅    |  `Complete`   |
| Building Pad                                            |  ✅  |         |  `Complete`   |
| CableTray                                               |  ✅  |   ✅    |  `Complete`   |
| Ceiling                                                 |  ✅  |         |  `Complete`   |
| Curves (Model, Detail, Room Boundary, Space Separation) |  ✅  |   ✅    |  `Complete`   |
| Direct Shape                                            |  ✅  |   ✅    |  `Complete`   |
| Duct                                                    |  ✅  |   ✅    |  `Complete`   |
| Face Wall                                               |      |   ✅    |  `Complete`   |
| Family Instance                                         |  ✅  |   ✅    |  `Complete`   |
| Floor                                                   |  ✅  |   ✅    |  `Complete`   |
| Freeform Element                                        |      |   ✅    | `In Progress` |
| Grid                                                    |  ✅  |   ✅    |  `Complete`   |
| Group                                                   |  ✅  |         | `In Progress` |
| Level                                                   |  ✅  |   ✅    |  `Complete`   |
| Opening (Wall, Vertical, Shaft)                         |  ✅  |   ✅    |  `Complete`   |
| Pipe                                                    |  ✅  |   ✅    |  `Complete`   |
| Project Information                                     |  ✅  |         |  `Complete`   |
| Railing                                                 |  ✅  |   ✅    |  `Complete`   |
| Rebar                                                   |  ✅  |         | `In Progress` |
| Roof (Extrusion, Footprint)                             |  ✅  |   ✅    |  `Complete`   |
| Room                                                    |  ✅  |   ✅    |  `Complete`   |
| Space                                                   |  ✅  |   ✅    |  `Complete`   |
| Stair                                                   |  ✅  |         |  `Complete`   |
| Topography                                              |  ✅  |   ✅    |  `Complete`   |
| View (FloorPlan, CeilingPlan, Elevation, Section, 3D)   |  ✅  |         |  `Complete`   |
| Wall                                                    |  ✅  |   ✅    |  `Complete`   |
| Wire                                                    |  ✅  |   ✅    |  `Complete`   |

| Other          | Send | Receive             | Status     |
| -------------- | ---- | ------------------- | ---------- |
| RenderMaterial | ✅   |                     | `Complete` |
| BlockInstance  |      | ✅ As Generic Model | `Complete` |
| PointCloud     | ✅   |                     | `Complete` |

### Supported Geometries

Generally speaking, Revit doesn't support raw geometry as it deals with families. Nonetheless, we've made it simple to receive some types of geometry directly, without the need of specifying family type, name or any other parameter.

| Geometry     | Send | Receive           | Status     |
| ------------ | ---- | ----------------- | ---------- |
| Line & Curve |      | ✅ As ModelCurve  | `Complete` |
| Brep         |      | ✅ As DirectShape | `Complete` |
| Mesh         |      | ✅ As DirectShape | `Complete` |

### Supported Geometries in Family Editor

| Geometry     | Send | Receive          | Status     |
| ------------ | ---- | ---------------- | ---------- |
| Line & Curve |      | ✅ As ModelCurve | `Complete` |
| Brep         |      | ✅ As FreeForm   | `Complete` |
| Mesh         |      | ✅ As FreeForm   | `Complete` |

### Non Supported Elements

Various element and data types do not have a direct conversions in Revit. Therefore sending Numbers, Points, Vectors or other non supported elements will have no effects.

To use such data types in Revit you should check our our [Dynamo Connector](/user/dynamo)

:::tip

If non supported elements are received in this connector, no errors are thrown.

:::

## Dynamo

### Supported Elements

| Geometry       |     Send      |    Receive    |   Status   |
| -------------- | :-----------: | :-----------: | :--------: |
| Point          |      ✅       |      ✅       | `Complete` |
| Line           |      ✅       |      ✅       | `Complete` |
| Plane          |      ✅       |      ✅       | `Complete` |
| Arc            |      ✅       |      ✅       | `Complete` |
| Circle         |      ✅       |      ✅       | `Complete` |
| Cuboid         |    As Box     |      ✅       | `Complete` |
| Ellipse        |      ✅       |      ✅       | `Complete` |
| Helix          |   As Spline   |               | `Complete` |
| Polyline       |               | x<sup>α</sup> | `Complete` |
| Polycurve      |      ✅       |      ✅       | `Complete` |
| Polygon        |  As Polyline  |      ✅       | `Complete` |
| Rectangle      |  As Polyline  |      ✅       | `Complete` |
| Spline         |      ✅       |      ✅       | `Complete` |
| Solid          |               |               |  `To do`   |
| Brep           |       As Mesh      |      As Mesh      | `Complete` |
| Mesh           |      ✅       |      ✅       | `Complete` |
| Revit Elements | x<sup>β</sup> |               | `Complete` |

<sup>α</sup>: As Rectangle, Polycurve, or Polygon

<sup>β</sup>: All Revit elements described [here](/user/revit.html#supported-elements) can also be sent from Dynamo

### Unsupported Elements

Any geometric elements not listed above are not supported.

## Civil 3D

### Supported Elements

| Geometry     | Send       | Receive | Status        |
| ------------ | ---------- | ------- | ------------- |
| Alignment    | ✅         | ✅      | `Complete`    |
| Corridor     | ✅         |         | `In Progress` |
| FeatureLine  | ✅         |         | `In Progress` |
| Grid Surface | ✅ as Mesh |         | `In Progress` |
| Pipe         | ✅         |         | `In Progress` |
| Profile      | ✅         |         | `In Progress` |
| Structure    | ✅         |         | `In Progress` |
| Tin Surface  | ✅ as Mesh | ✅      | `Complete`    |

### Unsupported Elements

Subassemblies and Assemblies are not supported.

## AutoCAD

### Supported Elements

| Geometry      |  Send   | Receive |    Status     |
| ------------- | :-----: | :-----: | :-----------: |
| Point         |   ✅    |   ✅    |  `Complete`   |
| Line          |   ✅    |   ✅    |  `Complete`   |
| Arc           |   ✅    |   ✅    |  `Complete`   |
| Circle        |   ✅    |   ✅    |  `Complete`   |
| Ellipse       |   ✅    |   ✅    |  `Complete`   |
| Polyline      |   ✅    |   ✅    |  `Complete`   |
| Polycurve     |   ✅    |   ✅    |  `Complete`   |
| Spline        |   ✅    |   ✅    |  `Complete`   |
| Plane Surface |   ✅    |         | `In Progress` |
| Nurb Surface  |   ✅    |         | `In Progress` |
| PolyFace Mesh |   ✅    |   ✅    |  `Complete`   |
| SubD Mesh     |   ✅    |   ✅    |  `Complete`   |
| 3D Solid      | as Mesh | as Mesh | `In Progress` |

| Other           | Send | Receive |   Status   |
| --------------- | :--: | :-----: | :--------: |
| BlockInstance   |  ✅  |   ✅    | `Complete` |
| BlockDefinition |  ✅  |   ✅    | `Complete` |
| Hatch           |  ✅  |   ✅    | `Complete` |
| Text            |  ✅  |   ✅    | `Complete` |
| Dimension       |  ✅  |   ✅    | `Complete` |

### Unsupported Elements

Labels and tables are not supported, as well as any unlisted element. There is a known issue with blocks containing text that is not updated with field values.

## Blender

### Supported Elements

The Blender Connector is still a work in progress and, as such, data sent from the Blender Connector is a highly lossy exchange.
Our connectors are ever evolving to facilitate more and more Speckle usecases. We welcome feedback, requests, edge cases, and contributions!

In addition to geometry data, custom object properties are also converted, including `ifc_definition_id` (Blender BIM).

**Send (Blender ⟶ Speckle)**
 - Supported geometry types work well with a few very minor tecnical limitations
 - Only Principle BSDF, Diffuse BSDF, and the basic non-node based shaders are officially supported, other shaders are likley to look different when sent.
 - Image and procedural textures are not supported
 - Modifiers and Transform data (translation, rotation, scale) are baked before sending, so Blender -> Blender workflows will be quite lossy

| Blender Type                             | Send                    | Limitations  |
| ---------------------------------------- | :---------------------- | --- |           
|  Mesh                                    | ✅ as `Mesh`(es)        | No Vertex Groups, Vertex Colors, or Vertex Normals |
|  Material                                | ✅ as `RenderMaterial` | Principle and Diffuse BSDF Shader Only  | 
|  Bézier Curves                           | ✅ as `Curve`          | Sent as nurbs curve |
|  NURB Curves                             | ✅ as `Curve`          | `CU_NURB_BEZIER` flag ignored |
|  Poly Lines                              | ✅ as `PolyLine`       |  |
|  Collection                              | ✅ as `Collection`     | No collection properties |
|  Collection Instances                    | ✅ as `Block`          |  |
|  Empty                                   | 🟨 as `Point`          | Position only, No Axis type |
|  Camera                                  | 🟨 as `View3D`         | Aproximated; lense/sensor info lossed |
|  Surfaces                                | 🟨 as `Mesh`(es)       | Converted as mesh |
|  Metaball                                | 🟨 as `Mesh`(es)       | Converted as mesh |
|  Text                                    | 🟨 as `Mesh`(es)       | Converted as mesh |
|  Lights                                  | ❌                     | Ignored |
|  Light Probes                            | ❌                     | Ignored |
|  Armatures                               | ❌                     | Ignored |

**Receive (Speckle ⟶ Blender)**
- Mesh based geometries are well supported
- Many types of curves are fairly well supported although some have limitations

| Speckle Type                             | Receive            | Limitations     |
| ---------------------------------------- | :----------------- | :-----------: |
| Mesh                                     | ✅ as Mesh         |  |
| Render Material                          | ✅ as Material     | `Principle Shader Only` |
| Curve                                    | ✅ as Nurbs Curve  |  |
| Brep                                     | 🟨 as Mesh         | Uses mesh `displayValue` |
| View 3D                                  | ✅ as Camera       |  |
| Collection                               | ✅ as Collection   |   |
| Instances and Block                      | ✅ as Collection Instance or transformed empty  |  |
| Curve/Polycurve                          | ✅ as Nurbs Curve  |   |
| Line/Polyline                            | ✅ as Polyline     |   |
| Circle/Elipse                            | ✅ as Nurbs Curve  |  |
| Arc                                      | 🟨 as Nurbs Curve  | No trims |
| Text                                     | 🟨 as Polyline     | Not as Text |

## Unity

### Supported Elements

We've only started supporting Unity elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Type                 | Speckle > Unity | Unity > Speckle |
| -------------------- | :-------------: | :-------------: |
| Point                |       ✅        |       ✅        |
| Line                 |       ✅        |                 |
| Polyline             |       ✅        |                 |
| Curve                |       ✅        |                 |
| Mesh                 |       ✅        |       ✅        |
| BuiltElements 3DView |       ✅        |                 |

## ETABS

### Supported Elements

We've only started supporting with an alpha release of ETABS elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                                                                                                                                                                  | Send | Receive |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--: | :-----: |
| Point                                                                                                                                                                                                     |  ✅  |   ✅    |
| Columns                                                                                                                                                                                                   |  ✅  |   ✅    |
| Beams                                                                                                                                                                                                     |  ✅  |   ✅    |
| Braces                                                                                                                                                                                                    |  ✅  |   ✅    |
| Sections Profile (Catalogue)                                                                                                                                                                              |  ✅  |   ✅    |
| User Defined Sections ~ refer to [structural objects](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Structural/Properties/Profiles/SectionProfile.cs) for schema |  ✅  |   ✅    |
| Floor with Slab Sections + Deck Sections                                                                                                                                                                  |  ✅  |   ✅    |
| Wall and Sections                                                                                                                                                                                         |  ✅  |   ✅    |
| Material Code definition                                                                                                                                                                                  |      |   ✅    |
| Loading (1D,2D) note: node elements can only send                                                                                                                                                         |  ✅  |   ✅    |
| Results (1D,2D,Node)                                                                                                                                                                                      |  ✅  |         |
| Restraints                                                                                                                                                                                                |  ✅  |   ✅    |
| Links                                                                                                                                                                                                     |  ✅  |   ✅    |
| Stories                                                                                                                                                                                                   |  ✅  |   ✅    |
| Springs (Point,Linear,Area)                                                                                                                                                                               |  ✅  |   ✅    |
| Tendons                                                                                                                                                                                                   |  ✅  |         |
| GridLines                                                                                                                                                                                                 |  ✅  |   ✅    |

## SAP2000

### Supported Elements

We've only started supporting with an alpha release of SAP2000 elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                                                                                                                                                                  | Send | Receive |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--: | :-----: |
| Point                                                                                                                                                                                                     |  ✅  |   ✅    |
| Columns                                                                                                                                                                                                   |  ✅  |   ✅    |
| Beams                                                                                                                                                                                                     |  ✅  |   ✅    |
| Braces                                                                                                                                                                                                    |  ✅  |   ✅    |
| Sections Profile (Catalogue)                                                                                                                                                                              |  ✅  |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Structural/Properties/Profiles/SectionProfile.cs) for schema |  ✅  |   ✅    |
| Material Code definition                                                                                                                                                                                  |      |   ✅    |
| Loading (1D,2D) note: node elements can only send                                                                                                                                                         |  ✅  |   ✅    |
| Results (1D,2D,Node)                                                                                                                                                                                      |  ✅  |         |

## CSiBridge

### Supported Elements

We've only started supporting with an alpha release of CSiBridge elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                                                                                                                                                                  | Send | Receive |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--: | :-----: |
| Point                                                                                                                                                                                                     |  ✅  |   ✅    |
| Columns                                                                                                                                                                                                   |  ✅  |   ✅    |
| Beams                                                                                                                                                                                                     |  ✅  |   ✅    |
| Braces                                                                                                                                                                                                    |  ✅  |   ✅    |
| Sections Profile (Catalogue)                                                                                                                                                                              |  ✅  |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Structural/Properties/Profiles/SectionProfile.cs) for schema |  ✅  |   ✅    |
| Material Code definition                                                                                                                                                                                  |      |   ✅    |
| Loading (1D,2D) note: node elements can only send                                                                                                                                                         |  ✅  |   ✅    |
| Results (1D,2D,Node)                                                                                                                                                                                      |  ✅  |         |

## SAFE

### Supported Elements

We've only started supporting with an alpha release of SAFE elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                                                                                                                                                                  | Send | Receive |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--: | :-----: |
| Point                                                                                                                                                                                                     |  ✅  |   ✅    |
| Columns                                                                                                                                                                                                   |  ✅  |   ✅    |
| Beams                                                                                                                                                                                                     |  ✅  |   ✅    |
| Braces                                                                                                                                                                                                    |  ✅  |   ✅    |
| Sections Profile (Catalogue)                                                                                                                                                                              |  ✅  |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Objects/Structural/Properties/Profiles/SectionProfile.cs) for schema |  ✅  |   ✅    |
| Material Code definition                                                                                                                                                                                  |      |   ✅    |
| Loading (1D,2D) note: node elements can only send                                                                                                                                                         |  ✅  |   ✅    |
| Results (1D,2D,Node)                                                                                                                                                                                      |  ✅  |         |

## SketchUp

### Supported Elements

The SketchUp Connector is still in early Alpha and is therefore a work in progress. Let us know what else you'd like to see supported or if you would like to contribute!

| Type            | Send | Receive |    Status     |
| --------------- | :--: | :-----: | :-----------: |
| Brep            |      | as mesh |  `Complete`   |
| Mesh            |  ✅  |   ✅    | `In Progress` |
| Line & Polyline |  ✅  |   ✅    |  `Complete`   |
| Render Material |  ✅  |   ✅    | `In Progress` |
| BlockInstance   |  ✅  |   ✅    | `In Progress` |
| BlockDefinition |  ✅  |   ✅    | `In Progress` |

## MicroStation

**This is a community-contributed connector! We'll try to keep these charts as accurate as possible, but keep in mind some information may be out of date.**

### Supported Elements

| Geometry          |     Send     |      Receive      |    Status     |
| ----------------- | :----------: | :---------------: | :-----------: |
| Point             |      ✅      |  as LineElement   |  `Complete`   |
| Vector            |      ✅      |        ✅         |  `Complete`   |
| Plane             |      ✅      |        ✅         |  `Complete`   |
| Line              |      ✅      |        ✅         |  `Complete`   |
| Arc               |      ✅      |        ✅         |  `Complete`   |
| Circle            |      ✅      | as EllipseElement |  `Complete`   |
| Ellipse           |      ✅      |        ✅         |  `Complete`   |
| Polyline          |      ✅      |        ✅         |  `Complete`   |
| Polycurve         |      ✅      |        ✅         |  `Complete`   |
| Curve (BSpline)   |      ✅      |        ✅         |  `Complete`   |
| Shape             | as Polyline  |    as Polyline    |  `Complete`   |
| Complex Shape     | as Polycurve |   as Polycurve    |  `Complete`   |
| Mesh              |      ✅      |        ✅         |  `Complete`   |
| Surface (BSpline) |      ✅      |                   | `In Progress` |
| ExtendedElement   |   as Base    |                   | `In Progress` |
| ComplexHeader     |   as Base    |                   | `In Progress` |

### Unsupported Elements

Note that 2d elements (like `Point2d` and `Vector3d`) are converted into 3d elements on send and receive.

Points are converted as LineElements with the same start and end point on receive, and LineElements with the same start and end points are converted as Points on send.

Ellipses with rotation are converted as a curve when sent to Speckle.

Breps, pointclouds, blocks, views, and any other element not listed are not supported in MicroStation.

## OpenRoads and OpenRail

**These are community-contributed connectors! We'll try to keep these charts as accurate as possible, but keep in mind some information may be out of date.**

### Supported Elements

In addition to supporting all of the geometry elements that the MicroStation Connector supports, OpenRoads and OpenRail also support the following built elements:

| BuiltElement |  Send   | Receive |    Status     |
| ------------ | :-----: | :-----: | :-----------: |
| Alignment    |   ✅    |   ✅    |  `Complete`   |
| Corridor     | as Base |         | `In Progress` |

### Unsupported Elements

Profiles, Stations, Featurelines, and anything else not listed are currently not supported.

## OpenBuildings

**This is a community-contributed connector! We'll try to keep these charts as accurate as possible, but keep in mind some information may be out of date.**

### Supported Elements

In addition to supporting all of the geometry elements that the MicroStation Connector supports, OpenBuildings also supports the following built elements:

| BuiltElement |  Send   | Receive |    Status     |
| ------------ | :-----: | :-----: | :-----------: |
| GridCurve    | as Line |         | `In Progress` |
| GridSystem   | as Base |         | `In Progress` |

### Unsupported Elements

## Tekla Structures

### Supported Elements

The Tekla Structures Connector is still in early Alpha and therefore will still be developed and worked on. Let us know what else you'd like to see supported or if you would like to contribute to make it finish the alpha phase faster!

| Type                          | Send | Receive |    Status     |
| ----------------------------- | :--: | :-----: | :-----------: |
| Contour plates (slabs/plates) |  ✅  |   ✅    |  `Complete`   |
| Beams                         |  ✅  |   ✅    |  `Complete`   |
| Columns                       |  ✅  |   ✅    |  `Complete`   |
| Spiral Beams                  |  ✅  |   ✅    |  `Complete`   |
| Curved Beams                  |  ✅  |         | `In Progress` |
| Polybeams                     |  ✅  |   ✅    |  `Complete`   |
| Welds                         |  ✅  |         | `In Progress` |
| Rebars                        |  ✅  |         | `In Progress` |
| Bolts                         |  ✅  |         | `In Progress` |

## Archicad

### Supported Elements

The Archicad Connector is still in Alpha and being developed. Geometry and mesh based support is comprehensive and almost all of the built elements are supported. Let us know what would be particularly useful to you and we will make sure to prioritise them!

| Type                | Send | Receive |    Status     |                       Notes                       |
| ------------------- | :--: | :-----: | :-----------: | :-----------------------------------------------: |
| Mesh / Direct Shape |  ✅  |   ✅    |  `Complete`   | All unsupported elements will go in/out as meshes |
| Floor (Slab)        |  ✅  |   ✅    |  `Complete`   |                                                   |
| Wall                |  ✅  |   ✅    |  `Complete`   |                                                   |
| Room (Zone)         |  ✅  |   ✅    |  `Complete`   |                                                   |
| Beam                |  ✅  |   ✅    |  `Complete`   |                                                   |
| Column              |  ✅  |   ✅    |  `Complete`   |                                                   |
| Roof                |  ✅  |   ✅    |  `Complete`   |                                                   |
| Shell               |  ✅  |   ✅    |  `Complete`   |                                                   |
| Door                |  🟨  |   🟨    | `In Progres`  | GDL parameters are not exported                   |
| Window              |  🟨  |   🟨    | `In Progres`  | GDL parameters are not exported                   |
| Skylight            |  🟨  |   🟨    | `In Progres`  | GDL parameters are not exported                   |
| Mesh                |  ✅  |   ✅    |  `Complete`   |                                                   |
| Morhp               |  ✅  |   ✅    |  `Complete`   |                                                   |
| Object              |  ✅  |   ✅    |  `Complete`   | GDL parameters are not exported                   |

## Navisworks

### Supported Elements

The Navisworks Connector is still in Alpha and is still being developed. Geometry and mesh based support is pretty comprehensive, but built element (BIM) conversion is non existant. Let us know what elements or properties you see as missing and would be particularly useful to you! Navisworks Connector is send only.

| Type                | Send | Receive |    Status     |                       Notes                       |
| ------------------- | :--: | :-----: | :-----------: | :-----------------------------------------------: |
| "Solid" Geometry    |  ✅  |   ❌    |  `Complete`   | All 3d elements will be sent as as meshes |
| Line Geometry       |  ✅  |         |  `Complete`   | 2D and 2.5D Linework is sent as many lines as "dissolved" by Navisworks according to its facetting setting on appending                                               |
| Point               |  🟨  |         | `Partial` |             |
| Text                |      |         | `Unsupported` |                                                   |
