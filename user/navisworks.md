# Navisworks (Alpha) 🛠️

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the legacy V2 Navisworks connector.</span>
  <span class="next-gen">A Next Gen connector is now available from <a href="https://app.speckle.systems/downloads">app.speckle.systems/downloads</a> and includes significant improvements to installation and functionality. Installing this legacy version is not recommended, but still possible if needed.</span>
</div>

::: tip

Navisworks Connector is an alpha release, meaning it is still in development and may contain bugs or other issues that could cause unexpected behavior. We advise caution if using this software in a production environment or for critical tasks. It should not damage your data in place but unsaved changes may be lost. This software is intended for testing and evaluation purposes only. Please exercise caution when using this software and report any issues or bugs to the development team. Thank you for helping us improve our software.
:::


The Speckle Navisworks Connector currently supports Autodesk Navisworks 2020, 2021, 2022 and 2023.

## Getting Started

Once installed, you can find the Navisworks Connector in the ribbon menu under the **Speckle** tab like so:

![speckle-ribbon-navisworks](https://user-images.githubusercontent.com/760691/231277506-a539c3e0-17e2-43a7-8b1e-2d01909ec77b.png)

## User Interface

::: tip 🙌 IMPORTANT

This connector uses our shared Desktop UI. Read up on general guidelines for usage in the [Desktop UI section](/user/ui).

:::

### Selection Filters

To help you select which elements will be to sent to Speckle, we've built various filters into our Navisworks Connector. Once a filter is set, just click **Send** and all objects passing the filter will be sent to your Speckle project.

_Please Note: Elements are only sent if they are visible._

![navisworks-selection-filters](https://user-images.githubusercontent.com/760691/231277784-667e4899-e1f8-4753-a23c-96d9e5557c9a.png)

On opening a stream card, any selected objects by default become the elements destined for send. This can be reset.

![navisworks-setselection](https://user-images.githubusercontent.com/760691/231278189-3a228391-d16b-4048-b383-3d8d4b784674.png)

#### Saved View Filter

The view filter works similarly to the category one, and lets you include all elements visible in one or more views.

![navisworks-savedview-filter](https://user-images.githubusercontent.com/760691/231277894-c74ecec6-c18b-41eb-8758-be42aeac2c56.png)

This will only be visible if your model has saved views with Hide/Required selected.

![navisworks-valid-savedview](https://user-images.githubusercontent.com/760691/231278551-50625f13-4a2f-467e-a638-526c3b07497f.png)

#### Selection Set Filter

The selection set filter lets you select one or more selection sets or saved searches from the current model.

This will only be visible if your model has selection sets or saved searches.

![navisworks-selectionset-filter](https://user-images.githubusercontent.com/760691/231278069-23ad3ec5-429d-46fb-bd53-54459b39aa5a.png)

### Receive Modes

Receiving geometry into Navisworks is not currently supported. However, you can receive data into a Revit or Rhino model and then open the model in Navisworks.

### Current Limitations

Navisworks produces a lot of data, and the Speckle Navisworks Connector is still in its early stages. As such, there are a few limitations to be aware of:
- Sends may not complete first time around. If this happens, try again.
- Only a single view can be sent at a time.
- One-click send is not supported. You must select a filter first.

## Supported Elements

- [Navisworks Support Tables](/user/support-tables.html#navisworks)


### Levels and Collections

Where a Navisworks model has levels differentiated these will be found in the Speckle commits as a collection as any other type of collection. There is no coallescing of levels performed across collections. This is because Navisworks does not have a strong concept of levels. Essentially the hierachy of the Speckle data will match the hierachy of the selected elements.

## Navisworks and BIM Data

When sending from Navisworks, Speckle will convert all embedded BIM properties alongside metadata generated in the conversion from native formats to Navisworks. This includes file paths, element ids, element types, etc.

The BIMness of objects is stored in the `properties` property of the object. This is a dictionary of key-value pairs, where the key is the name of the parameter and the value is the value of the parameter. There is no concept beyond Object+Data in the data sent.

::: tip 📝 NOTE

All the parameters are stored using their **User Display Names**.

:::

To easily explore on object's data and parameters, our [Speckle Web App](/user/web.html) interface can be of great help. As well as any other applications that lets you explore the object metadata (eg Grasshopper, Dynamo, Unity, etc).

![web-bim-data](https://user-images.githubusercontent.com/51519350/186416982-15eb496a-18fc-4782-b1d2-a6df01e9a5ed.png)

## Advanced Settings

The `Advanced Settings` page allows you to customize the way Speckle behaves "per-stream".

![navisworks-advanced-settings](https://user-images.githubusercontent.com/760691/231278734-bd54c648-eef5-456d-a035-ddb046e896eb.png)

### Reference point

Allows the user to specify which reference point should be used when sending data.

Available options are:

- **Model Origin** (the default option)
- The **Project Base coordinate**
- The **Bounding Box origin**

The XY Coordinate inputs are valid for defining the Project Base coordinate option.

### Coordinate Units

Allows the user to specify the units of the coordinates sent to Speckle.

### Include View

Allows the user to specify whether the current active view should be included in the data sent to Speckle.
