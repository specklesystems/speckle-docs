# AutoCAD & Civil 3D

Speckle currently supports Autodesk® AutoCAD® 2021-2023 and Autodesk® Civil 3D® 2021-2023.

⚠ _This connector is currently in alpha with limited functionality._

::: tip

Check out our dedicated tutorial on [how to get started with AutoCAD](https://speckle.systems/tutorials/getting-started-with-speckle-for-autocad/)!
Check out our dedicated tutorial on [how to get started with Civil3D](https://speckle.systems/tutorials/getting-started-with-speckle-for-civil3d/)!

:::

## Getting Started

To begin, you'll need to install this Connector and add your Speckle account. Follow our instructions in [Speckle Manager](/user/manager) if you haven't already.

Once installed, you can find this connector in the `Add-Ins` tab under `Speckle 2`. Clicking this button will open the Speckle connector interface, which shows a list of all the projects you currently have in the model.

![Setting up the Plugin](./img-acad/setup-plugin.gif)

## User Interface

::: tip IMPORTANT 🙌

This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

:::

### Sending Data

The AutoCAD Civil3D Connector supports selection filtering by layer.

### Receiving Data

Geometry from projects will be added to AutoCAD / Civil3D layers starting with a prefix with the following format:

```text
project[ model @ version id ]
```

Any layer information from the incoming project will be appended to the prefix with the standard AutoCAD delimiter `$`. When receiving from applications (like Rhino) with nested layers, the incoming full layer path will replace any default delimiters with `$`.

![Screenshot of Layers showing th esource data](./img-acad/receiving-layers.png)

## Supported Elements

- [AutoCAD Support Tables](/user/support-tables.html#autocad)
- [Civil 3D Support Tables](/user/support-tables.html#civil-3d)

### Things to keep in mind

The AutoCAD Civil3D connector is very early stages, expect some bugs during use! Your comments, feedback, and suggestions are welcome in the [Speckle Community Forum](https://speckle.community/t/new-speckle-2-0-autocad-civil3d-suggestions/1155)!
