# QGIS

![QGIS connector](./img-qgis/qgis-main.png)

::: tip

The QGIS connector is in early stages of development and it is released as _experimental_. This means there's an extra step to installing it. Once we're out of `beta`, this step will no longer be necessary.
:::

The Speckle 2.0 connector for QGIS currently supports QGIS versions 3.0.0 and upwards.

## Getting started

### Installation

You can find Speckle QGIS in the QGIS `Plugins -> Manage and install plugins` menu item.

![Plugins dropdown](./img-qgis/qgis-pluginsMenu.png)

The plugin is currently published as experimental, so make sure you go to `Settings` and activate the `Show also experimental plugins` checkbox.

![Experimental option](./img-qgis/qgis-pluginsExperimentalOption.png)

Then go to the `All` tab and search for `Speckle`. You should see the plugin appear in the list:

![Speckle panel](./img-qgis/qgis-specklePluginView.png)

> You can also install it manually by either using the `Install from zip` option, or following the manual installation instructions in our [repo's readme](https://github.com/specklesystems/speckle-qgis).
>
> ![Install from zip](./img-qgis/qgis-installFromZip.png)

### Features

The plugin allows you to select several layers in your project, and send their geometry (as well as their contained metadata), to a Speckle server.

Only vector and raster based layers are supported. We're looking to improve support for other types of layers in the future.

The geometry will be reprojected and sent in a `Project CRS` of your QGIS project. If the chosen Coordinate Reference System is of Geographic type with non-linear units, they will be treated as Meters in other software that do not support such units.

You can received Speckle geometry sent from other software. Currently supported Speckle types for receiving: Point, Line, Polyline, Arc, Circle, Polycurve. 

Properties of the objects upon receiving are stored in the layer attribute table.

You can send you data from QGIS and receive it in CAD in a CAD-friendly location, thanks to option to create custom CRS in QGIS. To do this, you will be required to enter geographic coordinates of the point representing origin point (0, 0, 0) in your CAD project.

### Using Speckle QGIS

Once the plugin is installed, you'll find a new toolbar button in QGIS that will open the `SpeckleQGIS` panel.

![Plugin view](./img-qgis/qgis-panelView.png)

The panel contains a very simple UI interface:

![The Speckle QGIS panel](./img-qgis/qgis-specklePanel.png)

#### Adding a Project to the project

First, you need to search and add a Project to the project. For that, you can press the `+` button under the `Project Projects` panel. This will open a new pop-up window that will allow you to search for a specific Project.

![Search Project panel](./img-qgis/qgis-searchPopUp.png)

And here's a short gif of the process 👇🏼

![Adding a Project to the project](./img-qgis/qgis-addingStream.gif)

> Once a Project is added to the QGIS project, it is saved along with it so the Speckle Projects will still be available after restarting QGIS.

#### Selecting the active Project

From the list of Projects in the **Speckle Projects** panel, you can select one to make it the **current active Project**. This will be the Project used for sending/receiving data. When an active Project is selected, `Active Project` field will display the name, and the `Model` dropdown will be populated with all available Models from that Project.

![alt](./img-qgis/qgis-activeStream.gif)

#### Sending data

In order to send some data, just follow these steps:

1. Select a Project so it becomes **active**
2. Specify a specific Model to send data to using the dropdown menu.
3. Select the layers in the file that you wish to send.
4. (optional) Write a Version message.
5. (optional) If you want to receive it in a non-GIS software or view in the browser, make sure you set your project to CRS of projected type using Meters as units.
5. Send the selected layers.

Here's a quick walkthrough of the process.

![Sending data from QGIS](./img-qgis/QGIS_03_sending.gif)

If you want to receive the layers later in a non-GIS software at the exact location (e.g. receive a context for your building in London), you can create a custom CRS in QGIS, that will match the global coordinate system from QGIS with the local coordinate system in CAD. Simply enter the geographic coordinates (Lat, Lon) of the point which is the origin (0,0,0) of your CAD environment. 

![Matching coordinates with CAD](./img-qgis/QGIS_04_matching_CAD_coordinates.gif)

#### Viewing the result

Once data has been sent to Speckle, you can view the result by going to your Speckle's server Url (our general availability public one is https://app.speckle.systems). Here's an example of some QGIS data:

<iframe src="https://app.speckle.systems/projects/389eec5d8/models/57249e2af6@13f1ff032c" width=600 height=400></iframe>

#### Receiving data

Steps to receive the data:

1. Select the Project to receive data from
2. Select the Model
3. Select specific Version (by default the latest one)
4. Find the received layers in the new layer group named after Project, Model and Version

![Receiving data](./img-qgis/QGIS_05_receiving.gif)

## Feedback

We're really interested in your feedback regarding the integration between QGIS and Speckle! You can always reach us at our [Community Forum](https://speckle.community)
