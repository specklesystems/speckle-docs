# Introduction

Our Desktop Connectors are plugins for some of the most popular AEC software, including:

- [Autodesk Revit](/user/revit)
- [Dynamo](/user/dynamo)
- [McNeel Rhinoceros](/user/rhino)
- [Grasshopper](/user/grasshopper)
- [Autodesk AutoCAD](/user/autocadcivil)
- [Autodesk Civil3D](/user/autocadcivil)
- [Unity](/user/unity)
- [Unreal Engine](/user/unreal)
- [Blender](/user/blender)
- [Excel](/user/excel)
- [QGIS](/user/qgis)
- [ArcGIS](/user/arcgis)
- [Power BI](/user/powerbi)
- [ETABS](/user/csi)
- [SAP2000](/user/csi)
- [SAFE](/user/csi)
- [CSiBridge](/user/csi)
- [Bentley MicroStation](/user/bentley)
- [Bentley OpenRoads](/user/bentley)
- [Bentley OpenRail](/user/bentley)
- [Bentley OpenBuildings](/user/bentley)
- [Tekla Structures](/user/teklastructures)
- [Autodesk Navisworks](/user/navisworks)

...with more on the way soon!

These Connectors take care of sending and receiving data to your Speckle server, in the form of streams (no need for files or file types!)

::: tip 💡 TIP

Check out the 👉 [tutorials](https://speckle.systems/tutorials/) on how to use our connectors!

:::

## Installation

All our connectors (with a few exceptions) are distributed via the [Speckle Manager](/user/manager.html). See our section on [installing connectors](/user/manager.html#installing-connectors) for more details.

## Versions

Every time we make a new release of a connector, with bug fixes and new features, we update its version number. Here's how it works:

- we use version with three numbers `MAJOR.MINOR.PATCH`
- the MAJOR number is currently fixed on 2
- the MINOR number is increased with any "substantial" new release, currently we try to ship one every month
- the PATCH number is increased when we need to release hotfixes to any of our connectors, might happen zero or multiple times during a month

If you are working with multiple Speckle Connectors please ensure their MAJOR and MINOR version is always aligned (for instance Grasshopper Connector v 2.5.0 and Revit Connector at 2.5.2).** This is even more important when having Rhino and Grasshopper or Revit and Dynamo Connectors installed at the same time.**

We might from time to time also make pre-releases of our connectors (see Using [Pre-releases](/user/manager.html#using-beta-versions-of-our-connectors)), these will have a `-something` appended to their names such as `2.5.0-alpha`, `2.7.3-rc1`. these are not fully tested and should be installed at your own risk 😱.

::: tip 👮‍♂️ Manager Versions

Note: the version of Speckle Manager is unrelated to the versions of the Connectors. Nevertheless, it's always a good idea to keep Manager updated to the latest stable version.

:::

## Units

The connectors take care of unit conversions for geometric objects so you don't have to worry about that. For example, if you're sending a 1 foot long line from Rhino to an AutoCAD document in mm it will measure exactly 304.8mm.

Unit conversion also automatically happens on BIM metadata, so if you're sending a Wall [using the Schema Builder](/user/grasshopper.html#schema-builder) node from Grasshopper to Revit the connectors will take care of converting the height for you.

::: warning 🙌 IMPORTANT
Custom metadata and non-linear units are not currently being converted.
:::
