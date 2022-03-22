# Supported Elements

As Speckle develops, we are able to build further integrations with each of the applications we support. However, each application, and its API, comes with its own limitations that (alas) no programmer can overcome!

The tables below give an per-application indication of which object conversions Speckle is currently able to support, and to what extent.

::: tip Not Seeing Support for Something you Want? 🧃

We're working hard to support additional elements. The list below will be updated as soon new conversion routines are added.

If you'd like us to add something specific, let us know on the [Speckle Community Forum](https://speckle.community)! We use community feedback to guide what features we'll work on next.

:::

## Rhino

### Supported Elements

Almost all geometric elements are supported by the Rhino connector. This includes:

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

| Other           | Send | Receive |    Status     |
| --------------- | :--: | :-----: | :-----------: |
| RenderMaterial  |  ✅  |         | `In Progress` |
| BlockInstance   |  ✅  |   ✅    |  `Complete`   |
| BlockDefinition |  ✅  |   ✅    |  `Complete`   |
| PointCloud      |  ✅  |   ✅    |  `Complete`   |
| Hatch           |  ✅  |   ✅    |  `Complete`   |
| Text            |  ✅  |   ✅    |  `Complete`   |

> Speckle supports sending BREPs from Rhino <-> Rhino, and Rhino <-> Revit, with some limitations imposed by Revit's API.

Note: If Rhino's unit system is changed by the user, this may result in incorrectly scaled blocks. Make sure blocks are created in the same unit system as they are intended to be sent in.

### Unsupported elements

Many non-geometric elements (such as text dots) and any geometric element not listed above are not supported.

## Grasshopper

### Supported Elements

Grasshopper supports the same geometry as the Rhino connector:

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

### Unsupported elements

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
| Solid           |             |             | `To do` |
| Brep           |      ✅       |      ✅       | `Complete` |
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
| Alignment    | ✅         |         | `In Progress` |
| Corridor     | ✅         |         | `In Progress` |
| FeatureLine  | ✅         |         | `In Progress` |
| Grid Surface | ✅ as Mesh |         | `In Progress` |
| Pipe         | ✅         |         | `In Progress` |
| Profile      | ✅         |         | `In Progress` |
| Structure    | ✅         |         | `In Progress` |
| Tin Surface  | ✅ as Mesh |         | `In Progress` |

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
| 3D Solid      | as Mesh | as Mesh  | `In Progress` |

| Other           | Send | Receive |   Status   |
| --------------- | :--: | :-----: | :--------: |
| BlockInstance   |  ✅  |   ✅    | `Complete` |
| BlockDefinition |  ✅  |   ✅    | `Complete` |
| Hatch           |  ✅  |   ✅    | `Complete` |
| Text            |  ✅  |   ✅    | `Complete` |

### Unsupported Elements

Labels, dimensions, and annotations are not supported, as well as any unlisted element. Dynamic blocks are not supported at this time, and there is a known issue with blocks containing text that is not updated with field values.

## Blender

### Supported Elements

The Blender Connector is still a work in progress and, as such, the conversions to and from Speckle are not yet robust. We welcome feedback, requests, edge cases, and contributions!

- Meshes are fairy well supported
- Breps are imported as meshes using their `displayValue`
- Curves have limited support

| Type                                     | Send |   Receive    |    Status     |
| ---------------------------------------- | :--: | :----------: | :-----------: |
| Arc                                      |      | approximated | `In Progress` |
| Brep                                     |      |   as mesh    | `In Progress` |
| Curve (Nurbs, Bezier, Ngons as Polyline) |  ✅  |      ✅      | `In Progress` |
| Mesh                                     |  ✅  |      ✅      | `In Progress` |
| Polycurve                                |      |      ✅      | `In Progress` |
| Polyline                                 |  ✅  |      ✅      | `In Progress` |
| Render Material                          |  ✅  |      ✅      | `In Progress` |

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

| Geometry                                                           |  Send   | Receive |
| ------------------------------------------------------------------ | :-----: | :-----: |
| Point                                                              |   ✅    |   ✅    |
| Columns                                                            |   ✅    |   ✅    |
| Beams                                                              |   ✅    |   ✅    |  
| Braces                                                             |   ✅    |   ✅    |  
| Sections Profile (Catalogue)                                       |   ✅    |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/structural/structural-kit/Objects/Objects/Structural/Property/SectionProfile.cs) for schema                                                           |   ✅    |   ✅    |
| Floor with Slab Sections + Deck Sections                           |   ✅    |   ✅    |
| Wall and Sections                                                  |   ✅    |   ✅    |
| Material Code definition                                           |          |   ✅    |
| Loading (1D,2D)   note: node elements can only send                |       ✅   |   ✅    |
| Results (1D,2D,Node)                                                       |   ✅    |    |
| Restraints                                                         |   ✅    |   ✅    |
| Links                                                              |   ✅    |   ✅    |
| Stories                                                              |   ✅    |   ✅    |
| Springs (Point,Linear,Area)                                        |   ✅    |   ✅    |
| Tendons                                                             |   ✅    |       |
| GridLines                                                             |   ✅    |       |

## SAP2000

### Supported Elements

We've only started supporting with an alpha release of ETABS elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                           |  Send   | Receive |
| ------------------------------------------------------------------ | :-----: | :-----: |
| Point                                                              |   ✅    |   ✅    |
| Columns                                                            |   ✅    |   ✅    |
| Beams                                                              |   ✅    |   ✅    |  
| Braces                                                             |   ✅    |   ✅    |  
| Sections Profile (Catalogue)                                       |   ✅    |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/structural/structural-kit/Objects/Objects/Structural/Property/SectionProfile.cs) for schema                                                           |   ✅    |   ✅    |
| Floor with Slab Sections + Deck Sections                           |   ✅    |   ✅    |
| Wall and Sections                                                  |   ✅    |   ✅    |
| Material Code definition                                           |          |   ✅    |
| Loading (1D,2D)   note: node elements can only send                |       ✅   |   ✅    |
| Results (1D,2D,Node)                                                       |   ✅    |    |
| Restraints                                                         |   ✅    |   ✅    |
| Links                                                              |   ✅    |   ✅    |
| Stories                                                              |   ✅    |   ✅    |
| Springs (Point,Linear,Area)                                        |   ✅    |   ✅    |
| Tendons                                                             |   ✅    |       |
| GridLines                                                             |   ✅    |       |

## SAP2000

### Supported Elements

We've only started supporting with an alpha release of SAP2000 elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                           |  Send   | Receive |
| ------------------------------------------------------------------ | :-----: | :-----: |
| Point                                                              |   ✅    |   ✅    |
| Columns                                                            |   ✅    |   ✅    |
| Beams                                                              |   ✅    |   ✅    |  
| Braces                                                             |   ✅    |   ✅    |  
| Sections Profile (Catalogue)                                       |   ✅    |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/structural/structural-kit/Objects/Objects/Structural/Property/SectionProfile.cs) for schema                                                           |   ✅    |   ✅    |
| Material Code definition                                           |          |   ✅    |
| Loading (1D,2D)   note: node elements can only send                |       ✅   |   ✅    |
| Results (1D,2D,Node)                                                       |   ✅    |    |

## CSiBridge

### Supported Elements

We've only started supporting with an alpha release of CSiBridge elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                           |  Send   | Receive |
| ------------------------------------------------------------------ | :-----: | :-----: |
| Point                                                              |   ✅    |   ✅    |
| Columns                                                            |   ✅    |   ✅    |
| Beams                                                              |   ✅    |   ✅    |  
| Braces                                                             |   ✅    |   ✅    |  
| Sections Profile (Catalogue)                                       |   ✅    |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/structural/structural-kit/Objects/Objects/Structural/Property/SectionProfile.cs) for schema                                                           |   ✅    |   ✅    |
| Material Code definition                                           |          |   ✅    |
| Loading (1D,2D)   note: node elements can only send                |       ✅   |   ✅    |
| Results (1D,2D,Node)                                                       |   ✅    |    |

## SAFE

### Supported Elements

We've only started supporting with an alpha release of SAFE elements, please let us know what else you'd like to see, and do contribute if you have the skillz!

| Geometry                                                           |  Send   | Receive |
| ------------------------------------------------------------------ | :-----: | :-----: |
| Point                                                              |   ✅    |   ✅    |
| Columns                                                            |   ✅    |   ✅    |
| Beams                                                              |   ✅    |   ✅    |  
| Braces                                                             |   ✅    |   ✅    |  
| Sections Profile (Catalogue)                                       |   ✅    |   ✅    |
| User Defined Sections ~ refer to [structural object kit](https://github.com/specklesystems/speckle-sharp/blob/structural/structural-kit/Objects/Objects/Structural/Property/SectionProfile.cs) for schema                                                           |   ✅    |   ✅    |
| Material Code definition                                           |          |   ✅    |
| Loading (1D,2D)   note: node elements can only send                |       ✅   |   ✅    |
| Results (1D,2D,Node)                                                       |   ✅    |    |

## SketchUp

### Supported Elements

The SketchUp connector is still in early Alpha and is therefore a work in progress. Let us know what else you'd like to see supported or if you would like to contribute!

| Type                                     | Send | Receive |    Status     |
| ---------------------------------------- | :--: | :-----: | :-----------: |
| Brep                                     |      | as mesh | `Complete`    |
| Mesh                                     |  ✅  |   ✅   | `In Progress` |
| Line & Polyline                          |  ✅  |   ✅   | `Complete`    |
| Render Material                          |  ✅  |   ✅   | `In Progress` |
| BlockInstance                            |  ✅  |   ✅   | `In Progress` |
| BlockDefinition                          |  ✅  |   ✅   | `In Progress` |

## MicroStation

**This is a community-contributed connector! We'll try to keep these charts as accurate as possible, but keep in mind some information may be out of date.**

### Supported Elements

| Geometry         |  Send   | Receive |    Status     |
| ---------------- | :-----: | :-----: | :-----------: |
| Point            |   ✅    | as LineElement |  `Complete`   |
| Vector           |   ✅    |   ✅    |  `Complete`   |
| Plane            |   ✅    |   ✅    |  `Complete`   |
| Line             |   ✅    |   ✅    |  `Complete`   |
| Arc              |   ✅    |   ✅    |  `Complete`   |
| Circle           |   ✅    | as EllipseElement |  `Complete`   |
| Ellipse          |   ✅    |   ✅    |  `Complete`   |
| Polyline         |   ✅    |   ✅    |  `Complete`   |
| Polycurve        |   ✅    |   ✅    |  `Complete`   |
| Curve (BSpline)  |   ✅    |   ✅    |  `Complete`   |
| Shape            | as Polyline | as Polyline | `Complete` |
| Complex Shape    | as Polycurve | as Polycurve |  `Complete`   |
| Mesh             |   ✅    |   ✅    |  `Complete`   |
| Surface (BSpline)|   ✅    |         | `In Progress` |
| ExtendedElement  | as Base |          | `In Progress` |
| ComplexHeader    | as Base |          | `In Progress` |

### Unsupported Elements

Note that 2d elements (like `Point2d` and `Vector3d`) are converted into 3d elements on send and receive.

Points are converted as LineElements with the same start and end point on receive, and LineElements with the same start and end points are converted as Points on send.

Ellipses with rotation are converted as a curve when sent to Speckle.

Breps, pointclouds, blocks, views, and any other element not listed are not supported in MicroStation.

## OpenRoads and OpenRail

**These are community-contributed connectors! We'll try to keep these charts as accurate as possible, but keep in mind some information may be out of date.**

### Supported Elements

In addition to supporting all of the geometry elements that the MicroStation connector supports, OpenRoads and OpenRail also support the following built elements:

| BuiltElement                 | Send | Receive |    Status     |
| ---------------------------- | :--: | :-----: | :-----------: |
| Alignment                    |  ✅  |   ✅   |  `Complete`   |
| Corridor                     |  as Base  |    |  `In Progress`   |

### Unsupported Elements

Profiles, Stations, Featurelines, and anything else not listed are currently not supported.

## OpenBuildings

**This is a community-contributed connector! We'll try to keep these charts as accurate as possible, but keep in mind some information may be out of date.**

### Supported Elements

In addition to supporting all of the geometry elements that the MicroStation connector supports, OpenBuildings also supports the following built elements:

| BuiltElement                 | Send | Receive |    Status     |
| ---------------------------- | :--: | :-----: | :-----------: |
| GridCurve                    |  as Line  |      |  `In Progress`  |
| GridSystem                   |  as Base  |      |  `In Progress`  |

### Unsupported Elements

## Tekla Structures

### Supported Elements

The Tekla Structures connector is still in early Alpha and therefore will still be developed and worked on. Let us know what else you'd like to see supported or if you would like to contribute to make it finish the alpha phase faster!

| Type                                     | Send | Receive |    Status     |
| ---------------------------------------- | :--: | :-----: | :-----------: |
| Contour plates (slabs/plates)                                  |  ✅    | ✅ | `Complete`    |
| Beams                           |  ✅  |   ✅   | `Complete` |
| Columns                          |  ✅  |   ✅   | `Complete`    |
| Spiral Beams                          |  ✅  |   ✅   | `Complete` |
| Curved Beams                                |  ✅  |      | `In Progress`|
| Polybeams                             |  ✅  |   ✅   | `Complete` |
| Welds                                 |   ✅    |   |`In Progress`|  
| Rebars                                |  ✅     |    |`In Progress`|
| Bolts                                 |  ✅      |  |`In Progress`|
