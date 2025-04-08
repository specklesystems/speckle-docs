---
typora-copy-images-to: img-teklastructures
---

# Tekla Structures (Legacy Alpha)

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 Tekla Structures connector.</span>
  <span class="next-gen">Tekla Structures is now fully supported by a stable Next Gen connector. This page refers to the legacy alpha version only.</span>
</div>

> ⚠️ We recommend using the **Next Gen Tekla Structures connector** for the latest and most reliable experience.  
> 👉 Download it at [**app.speckle.systems/downloads**](https://app.speckle.systems/downloads)



The legacy Tekla connector (V2 alpha) supported Tekla Structures 2020 and 2021.  
It was community-driven and experimental — no longer actively maintained.

::: tip

Check out our updated tutorial:  
[Getting Started with Tekla Structures](https://speckle.systems/tutorials/getting-started-with-tekla-structures)

:::

## Getting Started

To install the legacy connector and add your Speckle account, Speckle Manager was required.  
This setup is no longer recommended. Please install the modern connector via the link above.

Once installed (V2), the connector appeared in the **Applications & Components** panel:

![ToolBar](./img-teklastructures/toolbar.png)

> Before receiving data, ensure the model is saved as a `.tekla` file.

## User Interface

::: tip

This connector used our legacy shared UI. Projects were saved in a text file within a `Speckle` folder inside the model directory.  
Do not delete this folder — it was required for project tracking.

:::

## Filters

You can use filters to determine which elements to send to Speckle.

### Selection Filter

Sends currently selected objects in the Tekla view.

### Phase Filter

Filters objects by Tekla-defined phase and sends associated elements.

### Category Filter

Allows selection of one or more Tekla categories (most granular control).  
Enables sending of results and non-geometrical elements.

### All Filter

Sends **all supported** geometrical elements and their metadata.

![Tekla Structures](./img-teklastructures/teklastructures-ui.png)

## Supported Elements

- [Tekla Structures Support Tables](/user/support-tables.html#teklastructures)

## Updating Elements

This connector did **not** support element updating. Data was always added anew.

## Revit → Tekla Structures

Sending from Revit to Tekla Structures is possible. Speckle converts elements into a neutral object format.  
For reference, see the [Objects Kit definitions](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Objects/BuiltElements).

Incoming data is mostly geometric. Support for BIM-specific conversion was limited in this alpha version.

## Grasshopper → Tekla Structures

Though Tekla has its own Grasshopper plugins, you can also send via Speckle using:

- **Beam elements** (1D geometry)
- **Contour plates** (2D geometry)

Section names must match entries in Tekla’s local catalog for them to be recognized.

Refer to the [ETABS example](/user/csi) for a similar workflow.

## Exploring Tekla Data in Speckle

You can view and inspect objects sent from or to Tekla using the:

- [Speckle Web App](/user/web.html)
- Grasshopper
- Dynamo
- Unity
- or any application that supports Speckle metadata

