---
typora-copy-images-to: img-navisworks
---

# Navisworks

::: tip

Navisworks Connector is an alpha release, which means that it is still in development and may contain bugs or other issues that could cause unexpected behavior. We advise caution if using this software in a production environment or for critical tasks. It should not damage your data in place but unsaved changes may be lost. This software is intended for testing and evaluation purposes only. Please exercise caution when using this software and report any issues or bugs to the development team. Thank you for helping us improve our software.
:::


The Speckle Navisworks Connector currently supports Autodesk Navisworks 2020, 2021, 2022 and 2023.

## Getting Started

To install the Navisworks Connector and add your Speckle account, proceed by following the instructions in [Speckle Manager](/user/manager).

Once installed, you can find the Navisworks connector in the ribbon menu under the **Speckle** tab like so:

![speckle-ribbon-revit](https://user-images.githubusercontent.com/51519350/186413456-3c2f0f5c-f5f4-4f40-a8cf-1ed53ee0ae39.png)

## User Interface

::: tip 🙌 IMPORTANT

This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

:::

### Selection Filters

To help you select which elements will be to sent to Speckle, we've built various filters into our Navisworks connector. Once a filter is set, just click **Send** and all objects passing the filter will be sent to your Stream.

_Please Note: Elements are only sent if they are visible._

![Revit_rlKM6e6qTn](https://user-images.githubusercontent.com/51519350/186396184-be4fd296-8be2-4657-89b8-943170be4304.png)

#### Saved View Filter

The view filter works similarly to the category one, and lets you include all elements visible in one or more views.

This will only be visible if your model has saved views with Hide/Required selected.

![Revit_j4qto03sVu](https://user-images.githubusercontent.com/51519350/186414397-d7493ee9-2177-406d-908c-dc986f1772d5.gif)

#### Selection Set Filter

The selection set filter lets you select one or more selection sets or saved searches from the current model.

This will only be visible if your model has selection sets or saved searches.

![Revit_tqN7o2tYxY](https://user-images.githubusercontent.com/51519350/186414641-21225e10-122b-44cd-bf4d-322ecc80f53b.gif)

### Receive Modes

Receiving geometry into Navisworks is not currently supported. However, you can receive data into a Revit or Rhino model and then open the model in Navisworks.

### Current Limitations

Navisworks produces a lot of data, and the Speckle Navisworks Connector is still in its early stages. As such, there are a few limitations to be aware of:
- Sends may not complete first time around. If this happens, try again.
- Only a single view can be sent at a time.
- One-click send is not supported. You must select a filter first.

## Supported Elements

- [Navisworks Support Tables](/user/support-tables.html#navisworks)


### Levels

Where a Navisworks model has levels differentiated these will be found in the Speckle commits as a collection as any other type of collection. There is no coallescing of levels will be performed across other collections. This is because Navisworks does not have a strong concept of levels. Essentially the hierachy of the Speckle data will match the hierachy of the selected elements.

## Navisworks & BIM Data

When sending from Navisworks, Speckle will convert all embedded BIM properties alongside metadata generated in the conversion from native formats to Navisworks. This includes file paths, element ids, element types, etc.

The BIMness of objects is stored in the `properties` property of the object. This is a dictionary of key-value pairs, where the key is the name of the parameter and the value is the value of the parameter. There is no concept beyond Object+Data in the data sent.

::: tip 📝 NOTE

All the parameters are stored using their **User Display Names**.

:::

To easily explore on object's data and parameters, our [Speckle Web App](/user/web.html) interface can be of great help. As well as any other applications that lets you explore the object metadata (eg Grasshopper, Dynamo, Unity, etc).

![web-bim-data](https://user-images.githubusercontent.com/51519350/186416982-15eb496a-18fc-4782-b1d2-a6df01e9a5ed.png)

## Stream Advanced Settings

The `Advanced Settings` page allows you to customize the way Speckle behaves "per-stream".

![Advanced settings page](./img-revit/revit-advancedSettings-view.png)

### Reference point

Allows the user to specify which reference point should be used when sending data.

Available options are:

- **Model Origin** (the default option)
- The **Project Base coordinate**
- The **Bounding Box origin**

### Coordinate Units

Allows the user to specify the units of the coordinates sent to Speckle.

### Include View

Allows the user to specify whether the current active view should be included in the data sent to Speckle.
