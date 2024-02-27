# Archicad

The Speckle Archicad Connector currently supports Archicad 25, 26 and 27🆕. It is available both on Windows and Mac.

::: tip 💡 TIP

Check out our dedicated tutorial on [how to get started with Archicad](https://speckle.systems/tutorials/getting-started-with-speckle-for-archicad/)!

:::

## Getting Started

Sending out to geometry applications is well supported, but receiving back into BIM applications is not fully supported. See the support table linked at the bottom of this guide for specifics on what is and isn't supported.

Feel free to reach out on the forum regarding your potential use cases and we will try to prioritise what you need in the development of this connector!

<div style="position: relative;padding-bottom: 56.25%;"><iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/TNJIQHd3vuk" title="Archicad Teaser Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Installation

Before using this connector, you'll need to follow our standard setup instructions to [install Speckle Manager and add a Speckle account](/user/manager).

Note that for this connector, you will need admin permissions on your machine to install it.

Once you've installed the connector, you'll be able to access it from the "Interoperability" menu

![screenshot of speckle connector launch in archicad](./img-archicad/archicad-launch.png)

## User Interface

::: tip IMPORTANT 🙌

This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

:::

### Sending Data

After launching the connector, either create a new project or select an existing one.

Next, select the objects you want to send from within the model viewer. Then in the send menu, click "Add selection".

You can then write a message to label the version and click send. Once the send is complete, you'll be able to click the popup to view it in the browser.

![gif of the launch and send procedure in archicad](./img-archicad/archicad-send-process.gif)

### Receiving Data

#### Into Archicad

To receive data into Archicad, simply select a project and click receive! Note that receiving into Archicad is currently not well supported. This is still an alpha and thus very work in progress!

Feel free to drop suggestions and ideas about how you would like to use this connector on the [forum](https://speckle.community/) to help guide the development of this connector 🚀

#### Into Other Connectors

Receiving Archicad models in other geometry focussed connectors (eg SketchUp, Rhino, Blender) is pretty well supported. Check out the images below for some examples!

##### Blender

![archicad to blender](./img-archicad/archicad-to-blender.png)

##### Rhino

![archicad to rhino](./img-archicad/archicad-to-rhino.png)

##### SketchUp

![archicad to sketchup](./img-archicad/archicad-to-sketchup.png)

## Supported Elements

[Archicad Support Tables](/user/support-tables.html#archicad)
