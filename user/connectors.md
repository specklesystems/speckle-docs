# Introduction

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on V2 connectors.</span>
  <span class="next-gen">Next Gen connectors are coming soon, bringing significant changes to the documentation and features!</span>
</div>

Our desktop connectors are plugins for some of the most popular AEC software, including:

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
- ArcGIS
- [Power BI](/user/powerbi/introduction)
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

These connectors take care of sending and receiving data to your Speckle server, in the form of projects (no need for files or file types!)

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

If you are working with multiple Speckle connectors please ensure their MAJOR and MINOR version is always aligned (for instance Grasshopper Connector v 2.5.0 and Revit Connector at 2.5.2). **This is even more important when having Rhino and Grasshopper or Revit and Dynamo connectors installed at the same time.**

We might from time to time also make pre-releases of our connectors (see Using [Pre-releases](/user/manager.html#using-beta-versions-of-our-connectors)), these will have a `-something` appended to their names such as `2.5.0-alpha`, `2.7.3-rc1`. these are not fully tested and should be installed at your own risk 😱.

::: tip 👮‍♂️ Manager Versions

Note: the version of Speckle Manager is unrelated to the versions of the connectors. Nevertheless, it's always a good idea to keep Manager updated to the latest stable version.

:::

## Troubleshooting

Having issues with one of our connectors? Please follow the steps below to help us assist you:
- Post a detailed description of the issue on our [Community Forum](https://speckle.community/c/help/8). Make sure to provide as much information as possible and to attach any source files that could help us replicate it 
- Share with us any logs relevant to the connector, you can find them in: `%appdata%/Speckle/Logs` (just copy paste that address in your windows explorer)

## Units

The connectors take care of unit conversions for geometric objects so you don't have to worry about that. For example, if you're sending a 1 foot long line from Rhino to an AutoCAD document in mm it will measure exactly 304.8mm.

Unit conversion also automatically happens on BIM metadata, so if you're sending a Wall [using the Schema Builder](/user/grasshopper.html#schema-builder) node from Grasshopper to Revit the connectors will take care of converting the height for you.

::: warning 🙌 IMPORTANT
Custom metadata and non-linear units are not currently being converted.
:::
