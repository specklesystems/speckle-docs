# Rhino

## Quick Start Video

Prefer watching to reading? Who doesn't!

<div style="position: relative;padding-bottom: 56.25%;"><iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/v56nxXBbtfI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Getting Started

::: tip 💡 TIP

Check out our dedicated tutorial on [how to get started with Rhino](https://speckle.systems/tutorials/getting-started-with-speckle-for-rhino/)!

:::

To install this Connector and add your Speckle account, follow the instructions in the [Speckle Manager](/user/manager) section.
Speckle currently supports both Rhino 6 and Rhino 7.

Once installed, you can find the connector by running the `Speckle` command in Rhino. This should open a new pop-up window with the [Desktop UI](/user/ui.md) (the old version of Speckle used the `SpecklePanel` command for this).

![Speckle command](./img-rhino/rhino-speckle-command.png)

## User Interface

> This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

Once the Desktop UI panel is open, go ahead and create a new project (or add an existing one) to the current file. Once the Rhino `.3dm` file is saved, the projects associated with that file will be saved too.

### Sending

Sending objects to Speckle can be done in multiple ways.

- Default method sends `Everything` from Rhino. This includes all document objects and project info.
  ![Rhino_l5U9dlMIpg](https://user-images.githubusercontent.com/51519350/187154289-8bbb5ff6-8e86-4adc-bd16-110025e2b78a.gif)
- `Layers` option will send objects on the selected layers.
  ![Rhino_Sv9ZFfjPtS](https://user-images.githubusercontent.com/51519350/187154488-db2a5a2c-ee20-46cc-b115-5bd5c4732622.gif)
- `Project Information` adds the selected project information as views to the project.
  ![Rhino_geo27Qb21a](https://user-images.githubusercontent.com/51519350/187154964-a3d05c4d-2f94-4133-8aac-691d62cf8674.gif)
- `Selection` sends only the selected objects.
  ![Rhino_e9hP9XMEgx](https://user-images.githubusercontent.com/51519350/187155192-2c85a908-ffba-4e14-8d46-ec4653a92c00.gif)

For the detail-lovers out there, you'll notice that your Rhino layer structure is replicated as `Base` object properties, which can be recreated on the receiving end.

### Receiving

In order to receive data from a Speckle project, you'll first need to add that to your active document. If the preoject already exists on the server it will automatically be listed. You can also use the search bar to find the project you are looking for👀.

![rhino-search-project](https://user-images.githubusercontent.com/51519350/187166411-6759734d-6335-4134-92ad-06010d1af36f.png)

Once the project has been added, switch to the `Receive` mode.

![Rhino_zbpyw7DbW5](https://user-images.githubusercontent.com/51519350/187166530-974e37fb-dcc4-48a0-a739-6a134cc94e4f.gif)

From here, you can select the `model` and the `version` you want to receive. Once you are done with the selection, go ahead and click on the `🔵 Receive` button. This will display a progress bar (just like the sending operation) and, if successful, will add the received objects to the current document.

![Rhino_R2Ga18NETv](https://user-images.githubusercontent.com/51519350/187166647-a18dd449-faff-4806-a4c4-e59b8a6c57a7.gif)

In order to prevent overriding existing layers/objects in the file, all received objects will be placed in a nested layer structure. This structure will contain all the layers. that the sent objects were placed to, with a parent layer with a name in the format `<PROJECT_NAME>: <MODEL_NAME> @ <VERSION>`.

![Version layers](./img-rhino/rhino-stream-receive-nested-layers.png)

In the screenshot above, you can see the difference between:

1. The original layers of the sent objects
2. The layers created by Speckle when receiving the data back

You may also notice the overlapping received objects(gray) with the original objects (blue and red).

![Received layers pattern](./img-rhino/rhino-stream-receive-layers.png)

## Supported Elements

- [Rhino Support Tables](/user/support-tables.html#rhino)

# Rhino BIM

Speckle 2.0 lets you tag Rhino geometry as Speckle BIM elements, so you can send objects like lines and surfaces as beams and floors! This means you can bring in your Rhino geometry directly as native Revit family elements 💥

![RhinoBIM](https://user-images.githubusercontent.com/51519350/187174018-fe346d28-3ab2-49ec-b9e6-c3c3d193cfa9.gif)

## Features

Access Rhino BIM element creation through the Speckle BIM toolbar, which includes a button for every supported BIM element. Check the section below for a run through of which geometries can be tagged as Speckle BIM elements and their associated commands.

![toolbar](./img-rhino/BIM/toolbar.png)

Rhino BIM manages BIM tags by assigning geometry objects a `Attribute User Text` property if they have been flagged as BIM elements while sending to a project. Once they are added, remember to remove these tags with the `Remove` button if you wish to send the objects as plain geometry instead of BIM elements, or if you wish to assign them a different tag.

:::tip NOTE

If this is your first time installing the Speckle connector, you may need to load the toolbar by navigating to Options > Toolbars > SpeckleConnectorRhino, and then making sure the Speckle2 checkbox is selected.

:::

Keep in mind that when streaming Speckle BIM elements from Rhino into Revit, they will come in as the first available family type in your Revit document. Currently there is no way to assign specific revit families to Rhino BIM elements, but this may be changed in the future.

## Using Rhino BIM

Assigning or removing Speckle BIM tags from geometry objects is easy:

1. Click the BIM button corresponding to the BIM element or action you would like apply
2. Select all geometry objects you wish to apply the button action to
3. Press Enter

If you'd prefer to use the command line instead of the toolbar buttons, refer to each button section for their respective command. There's also a bit of magic happening behind the scenes to detect which types of geometry can be assigned Speckle BIM tags, so if a selected object is missing its Speckle BIM `Attribute User Text` property when you try to turn it into a BIM element, it probably doesn't qualify for that tag!

### Creating walls

**Command:** _CreateWall_

1. Create or select _vertically planar_ surfaces.
   ![wall](https://i.imgur.com/uHG7zPF.gif)
2. Click on the Speckle BIM wall button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
   ![wall](https://i.imgur.com/xDZZsSe.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the [How To Get Started with Rhino](/user/rhino.html#getting-started) docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the [How To Get Started with Revit](/user/revit.html#getting-started) docs! The surface will be created as a default wall type.
   ![wall](./img-rhino/BIM/wall_3.gif)
5. Transform your rhino surface, and resend it to Revit - your wall will automatically update!

### Creating Floors

**Command:** _CreateFloor_

1. Create or select _xy planar_ surfaces.
   ![floor](https://i.imgur.com/5RPrnv3.gif)
2. Click on the Speckle BIM floor button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
   ![floor](https://i.imgur.com/edTLmkm.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! The surface will be created as a default floor type.
   ![floor](./img-rhino/BIM/floor_3.gif)
5. Transform your rhino surface, and resend it to Revit - your floor will automatically update!

### Creating Columns

**Command:** _CreateColumn_

1. Create or select lines that are _approximately vertical_, defined as less than 45 degrees tilted relative to the z-axis.
   ![column](https://i.imgur.com/ZSg1JO9.gif)
2. Click on the Speckle BIM Column button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
   ![column](https://i.imgur.com/3ob91pt.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! The line will be created as a default column type.
   ![column](./img-rhino/BIM/column_3.gif)
5. Transform your rhino line, and resend it to Revit - your column will automatically update!

### Creating Beams

**Command:** _CreateBeam_

1. Create or select lines that are _approximately horizontal_, defined as less than 45 degrees tilted relative to the xy-plane.
   ![beam](https://i.imgur.com/YupuFuK.gif)
2. Click on the Speckle BIM Beam button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
   ![beam](https://i.imgur.com/yrByUwv.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! The line will be created as a default beam type.
   ![beam](./img-rhino/BIM/beam_3.gif)
5. Transform your rhino line, and resend it to Revit - your beam will automatically update!

### Creating Pipes

**Command:** _CreatePipe_

1. Create or select open curves (this works best for lines).
2. Click on the Speckle BIM Pipe button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied. **Note:** the default Pipe `diameter` is set to "1.0" - if you'd like to change this, just change the value in the user string!
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs.
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs. The curve will be created as a default pipe type.
5. Transform your rhino curve, and resend it to Revit - your pipe will automatically update!

### Creating Ducts

**Command:** _CreateDuct_

1. Create or select open curves (this works best for lines).
2. Click on the Speckle BIM Duct button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied. **Note:** the default Duct `width`, `height`, and `diameter` is set to "1.0" - if you'd like to change this, just change the corresponding value in the user string.
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs.
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs. The curve will be created as a default duct type.
5. Transform your rhino curve, and resend it to Revit - your duct will automatically update!

### Creating Topography

**Command:** _CreateTopography_

1. Create or select open meshes.
2. Click on the Speckle BIM Topography button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs.
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs. The mesh will be created as a default topography type.
5. Transform your rhino mesh, and resend it to Revit - your topography will automatically update!

### Creating Face Walls

**Command:** _CreateFaceWall_

1. Create or select any kind of surface.
   ![facewall](https://i.imgur.com/q1tBTgQ.gif)
2. Click on the Speckle BIM face wall button and press Enter. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
   ![facewall](https://i.imgur.com/B6jrSim.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! The surface will be created as a default wall type.
   ![facewall](https://i.imgur.com/JIk5nek.gif)
5. Transform your rhino surface, and resend it to Revit - your face wall will automatically update!

### Creating Direct Shapes

**Command:** _CreateDirectShape_

1. Create or select any kind of brep, extrusion, or mesh.
   ![directshape](https://i.imgur.com/SMVl5Qc.gif)
2. Click on the Speckle BIM direct shape button and press Enter. _Select the BIM type for this direct shape in the commandline_. Check your object's User Attribute Text to confirm the Speckle BIM tag was successfully applied.
   ![directshape](https://i.imgur.com/guy9X0S.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! The geometry will be created as a generic model.
   ![directshape](./img-rhino/BIM/directshape_3.gif)
5. Transform your rhino geometry, and resend it to Revit - your generic model will automatically update!

### Creating Adaptive Components

**Command:** _CreateAdaptiveComponent_

1. Create a set of points that define your adaptive components. In this example, our Revit adaptive family is defined by four points, so we will have a collection of points in a multiple of four.
   ![adaptivecomponent](https://i.imgur.com/vb3Rfzi.gif)
2. Click on the Speckle BIM adaptive component button and press Enter. _Then type the family name for your adaptive component in commandline_. Select your points in order, pressing enter after every group of four. Press Enter again when done, and blocks will be created for each point group. Check your block's User Attribute Text to confirm the Speckle BIM tag was successfully applied!
   ![adaptivecomponent](https://i.imgur.com/PIdhc5B.gif)
3. Send the blocks with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the blocks in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! Make sure you have your Adaptive Family loaded into your Revit document. The geometry will be created as instances of your adaptive component!
   ![adaptivecomponent](https://i.imgur.com/zEUG5tO.gif)

### Automatically Creating BIM elements

**Command:** _CreateAutomatic_

This is a super magic option that will try to automatically assign the most appropriate Speckle BIM tags to all of your selected geometry 🔮

1. Select all geometry that you want to turn into BIM elements.
2. Click on the Speckle BIM automatic button and press enter. Check each geometry's User Attribute Text to see the Speckle BIM tag that is applied.
   ![automatic](https://i.imgur.com/3wzFqO9.gif)
3. Send the geometry with Speckle: if you're unfamiliar with how to do this, check out the How To Get Started with Rhino docs!
4. Receive the geometry in Revit: if you're unfamiliar with how to do this, check out the How To Get Started with Revit docs! The geometries that have a BIM tag will come in as their respective default category type.
   ![automatic](https://i.imgur.com/yasZg4v.gif)

### Remove

**Command:** _RemoveSpeckleSchema_

Removes all Speckle BIM tags from selected geometry objects. This is necessary when you want to send your geometry as regular geometry, or if you'd like to change the BIM tag for an object.

1. Select all geometry that you want to remove Speckle BIM tags for.
2. Click on the Speckle BIM remove button and press enter. If you check your geometry's User Attribute Text, you should no longer see the SpeckleSchema tag!

## Schema Builder (OLD)

This feature is now replaced by Rhino BIM, but the commands still work - check below for a walkthrough of old schema builder features.

Currently, direct conversions are available for the following types:

| Base Geometry            | BuiltElement schemas  | Revit type |
| ------------------------ | --------------------- | :--------: |
| Planar surface           | `Wall` `Floor` `Roof` |            |
| Planar polysurface       | `Wall`                |            |
| Planar and nurbs surface | `FaceWall`            |     ✅     |
| Line                     | `Column` `Beam`       |            |
| Brep / extrusion         | `DirectShape`         |     ✅     |
| Mesh                     | `DirectShape`         |     ✅     |

### Walkthrough

Stream your Rhino objects directly into Revit as BuiltElements! Rhino to Revit interop uses a custom Speckle `Attribute User Text (AUT)` string to determine an object's schema before sending projects. AUTs are modified with two commands:

- `ApplySpeckleSchema` gives you options for adding AUTs to model objects
- `RemoveSpeckleSchema` removes schema AUTs from model objects

Some schemas have additional parameters that can be manually modified for custom control over parameters like Revit Family or Revit Type.

### Assigning schemas

![command](https://i.imgur.com/6E6LXWY.gif)

#### The automagic method

The easiest way to assign schemas to your Rhino objects is to let the Speckle schema builder decide for you!

1. Type `ApplySpeckleSchema` in the command line
2. Select objects for BuiltElements conversion
3. By default, `Automatic` is set to `On`. Press **Enter**!

The algorithm for automatic schema application takes into account object and layer naming before it tries to find the best BuiltElements schema to apply. For example, if an object has _Wall_ in its name, or in the absence of a name, the object is nested in a layer with a name that includes _Wall_, then the automatic method will try to send the object as a Speckle `Wall` element. If the algorithm can't find a BuiltElements type in either the object or layer name, it will analyze the object geometry and try to find the first schema fit based on the object's properties.

**note** `DirectShape` conversions are not assigned during the automagic method. If an XY planar surface does not have a specific schema in its object or layer name, it will default to `Floor`, instead of `Roof` or `Ceiling`.

#### The single schema method

You can assign a specific schema to selected objects through the single schema method: this method also includes conversions to `DirectShape` and `FaceWall` schemas.

1. Type `ApplySpeckleSchema` in the command line
2. Set `Automatic` to `Off`
3. Select a `Schema` option
4. By default, `DirectShape` is set to `Off`. To send as a DirectShape instead of a native object, set the toggle to `On`.
5. Select objects for schema application, and press **Enter**!

#### Customizing properties

Revit-specific BuiltElements schemas such as `FaceWall` and `DirectShape` can be manually customized with additional properties. By default, these schemas will have a user string with the following formats:

```
FaceWall([family], [type])
DirectShape(Schema, UniqueName)
```

To assign custom values, select your FaceWall or DirectShape object and navigate to its User Attribute Text panel. Double click on the _SpeckleSchema_ entry value and replace the `[]` properties with custom values if you want to assign a specific Revit family or type to your `FaceWall` object. If no changes are made, FaceWalls are assigned to the `Basic Wall` type by default. For DirectShapes, a unique shape name is automatically generated, but can be changed to a custom string if desired.

### Removing schemas

Removing schemas from Rhino objects is super easy:

1. Type `RemoveSpeckleSchema` in the command line
2. Select objects to remove schemas from
3. Press **Enter** - Speckle AUT strings are now deleted from all selected objects!

## Things to keep in mind

This section is work in progress 🚧 ! Please check back again soon 😃
