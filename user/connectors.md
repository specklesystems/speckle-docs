# Introduction

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on V2 connectors.</span>
  <span class="next-gen">Next Gen connectors are now available and bring significant improvements. These docs refer to legacy V2 connectors only.</span>
</div>

> Looking to get started with Speckle today?  
> 👉 Download the latest Next Gen connectors at [**app.speckle.systems/downloads**](https://app.speckle.systems/downloads)

---

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

These connectors send and/or receive data from your Speckle server, enabling structured project-based data exchange — no files required.

::: tip
Check out our [tutorials](https://speckle.systems/tutorials/) to see these connectors in action.
:::

## Installation

These V2 connectors were primarily distributed via [Speckle Manager](/user/manager.html).

For current projects and supported applications, we strongly recommend downloading the **Next Gen connectors** from  
[**app.speckle.systems/downloads**](https://app.speckle.systems/downloads)

## Versions (Applies to V2 Only)

Connector versions follow the format `MAJOR.MINOR.PATCH`. For V2 connectors:

- `MAJOR` is fixed at 2
- `MINOR` is incremented with new feature releases
- `PATCH` is used for bug fixes

Ensure that any V2 connectors installed together (e.g., Revit + Dynamo or Rhino + Grasshopper) use **matching MAJOR and MINOR versions**.

You may encounter beta versions marked with `-alpha`, `-rc1`, etc. These are pre-release builds and may be unstable.

::: tip Manager Versions

The version of Speckle Manager is independent of connector versions. For V2 workflows, keeping Manager updated was recommended — but it is no longer required in the Next Gen system.

:::

## Troubleshooting

If you're running into issues with a V2 connector:

- Describe your issue in detail on our [Community Forum](https://speckle.community/c/help/8)
- Include source files or screenshots when possible
- Share relevant logs from `%appdata%/Speckle/Logs`

## Units

Connectors automatically convert units between software environments.  
For example, a 1 ft line in Rhino will appear as 304.8 mm in an AutoCAD document set to millimetres.

This applies to BIM parameters as well — values like wall height will be converted when sending between platforms such as Grasshopper and Revit.

::: warning
Custom metadata and non-linear unit types are not currently converted.
:::
