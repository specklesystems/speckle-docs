# Rhino

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 Rhino connector.</span>
  <span class="next-gen">Next Gen connectors are coming soon, bringing significant changes to the documentation and features!</span>
</div>



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

## Rhino Mapper

Speckle 2.0 lets you tag Rhino geometry as Speckle BIM elements, so you can send objects like lines and surfaces as beams and floors! This means you can bring in your Rhino geometry directly as native Revit family elements 💥

![RhinoMapper](https://user-images.githubusercontent.com/51519350/187174018-fe346d28-3ab2-49ec-b9e6-c3c3d193cfa9.gif)

### Getting Started

Open the Rhino Mapper panel by clicking on the Speckle Mapper button on the Speckle toolbar, or by using the `SpeckleMappings` command. 

![toolbar](./img-rhino/BIM/toolbar.png)

:::tip NOTE

If this is your first time installing the Speckle connector, you may need to load the toolbar by navigating to Options > Toolbars > SpeckleConnectorRhino, and then making sure the Speckle2 checkbox is selected.

:::

### Features

Assigning or removing Speckle BIM tags from geometry objects is easy:

1. Select the geometry you would like to map to a BIM element
2. (Optional) Click `Choose project` to select the model of the Speckle project that contains your Revit families and levels. If none is selected, a default mapping will be used if available.
3. Click `Apply Mappings`

![ui](./img-rhino/BIM/ui.png)

Rhino Mapper manages BIM mappings by assigning geometry objects a `Attribute User Text` property if they have been flagged as BIM elements while sending to a project. You can see which objects in your model have been mapped at the bottom of the Speckle Mapper UI.

To remove a mapping, click the checkbox next to the existing mapping and then click `Clear Mappings`.

![remove](./img-rhino/BIM/remove-mapping.png)

:::tip NOTE

If no mapping options appear when you select a geometry object, that means there are currently no supported mappings for that object! If you think there should be, give us feedback using the feedback button on the top right corner.

:::

#### Creating Walls

Walls can be mapped with three different options, depending on the type of surface geometry you've selected:

- For _vertically planar_ single surfaces, you can map a wall by its profile curve or by its base curve.

- For _nonplanar_ single surfaces, you can map a wall as a `FaceWall`.

- The default wall option will generate a wall schema by the surface's base curve.

#### Creating Floors

Floors can be mapped to _xy planar surfaces_. Any interior trims in these surfaces will be mapped as voids in the floor.

#### Creating Columns

Columns can be mapped to any _linear curve_.

#### Creating Beams

Beams can be mapped to any _curve_.

#### Creating Pipes

Pipes can be mapped to any _linear curve_.

#### Creating Ducts

Ducts can be mapped to any _linear curve_.

#### Creating Topography

Topography can be mapped to _open meshes_.

#### Creating Direct Shapes

Direct Shapes can be mapped to _breps_ and _meshes_.

#### Creating Freeform Elements

Freeform elements can be mapped to _breps_ and _meshes_.

#### Creating Family Instances

Family instances can be mapped to _block instances_, using their insertion point and transform for the received revit family instance.

## Things to Keep in Mind

This section is work in progress 🚧 ! Please check back again soon 😃
