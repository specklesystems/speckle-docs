# Power BI

![Power BI connector](./img-powerbi/powerbi-main.png)

::: tip

The Power BI connector is in `beta` development and still requires manual installation. We will look into streamlining installation via Speckle Manager as well as Microsoft certification once development stabilizes.

:::

## PowerBI Data Connector

The Speckle 2.0 connector for Power BI supports Power BI Desktop only.

### Getting Started

#### Installation

> All releases of the Speckle 2.0 Power BI Connector are available on our [Power BI GitHub repository](https://github.com/specklesystems/speckle-powerbi/releases).

1. Download the `Speckle.mez` file from the latest release (or release of your choice).

2. Copy the downloaded file into the local `Custom Connectors` folder in your installation of Power BI: `Documents\Power BI Desktop\Custom Connectors`.

3. The Speckle Power BI Beta Connector should now appear as a data source once you load up Power BI Desktop!

::: warning

If the `Custom Connectors` folder doesn't exist, you can create it at the path in Step 2! Make sure it is created in your user's `Documents` directory.

:::

#### Features

The Power BI beta connector allows you to import your Speckle stream, branch, commit, or object data using the corresponding URL from your Speckle server stream. The following data will be retrieved depending on which type of URL you use:

- Stream URL -> the most recent commit on the main branch of this stream
- Branch URL -> the most recent commit on this branch
- Commit URL -> this commit
- Object URL -> this object

If you're having issues connecting to your stream, make sure the stream is either set to `Public` or your local account has access to the private stream.

#### Using Speckle Power BI

Once the connector is installed, you'll find a `Speckle (beta)` option in the `Get data` interface, under the `Other` category.

![Data connector](./img-powerbi/get-data.gif)

Select the Speckle connector and click `Connect` - a window will open where you can input your Speckle stream, branch, commit, or object URL!

The result of that query will be a table with the following columns:

- Stream URL
- URL Type
- Object ID
- speckle_type
- data

![Result table](./img-powerbi/powerbi-result-table.png)

::: tip

Stream URL and Object ID columns were added to facilitate loading data into the new `Speckle PowerBI 3D Viewer` (see below.)

:::

#### Expanding the `data` records

In order to access the data within each object, you must expand that record into a set of it's properties.

Pressing the `expand column` button displays a pop-up that will enable you to choose which properties to expand.

![Expand column button](./img-powerbi/expand-column-button.png)

This process can be done several times in a row until you reach the property values you're interested in.

![Expand column pop-up](./img-powerbi/expand-column-popup.png)

::: tip

We recommend that you uncheck the `Use original column name as prefix` option **only** when expanding the initial `data` column.

This allows for nested property names to not have a prefix (i.e. the level name of a room would be `level.name` instead of `data.level.name`

:::

## Speckle 3D Viewer Visual

> The PowerBI visual is still in **early stages of development**. We welcome your feedback!

![PowerBI rooms report](./img-powerbi/powerbi-rooms.gif)

The _3D Viewer Visual_ allows for the visualisation of Speckle data in a 3D environment inside your PowerBI reports. It is compatible with PowerBI Desktop and can also be used in PowerBI.com for online visualization.

### Features

The current version enables basic visualisation, filtering and coloring features, as well as some basic camera and color controls:

- Load individual objects that were fetched with the PowerBI Data Connector
- Highlight objects in the 3D viewer that were selected on a different table in the report.
- Color objects based on a category or value

### Installation

You can install the Speckle 3D Viewer Visual manually by following these steps:

1. Download the latest `.pbiviz` package from our [Github repo](https://github.com/specklesystems/speckle-powerbi-visuals/releases).
2. Open your report in Power BI Desktop or Power BI service.
3. Select the ellipsis from the visualizations pane.
   ![Ellipsis visualisation menu](./img-powerbi/ellipsis.png)
4. Select Import a visual from a file from the menu.
   ![Import from file dropdown](./img-powerbi/import-from-file.png)
5. If you get a message cautioning you about importing custom files, select Import if you trust the source of the file.
   ![Alert when importing visuals](./img-powerbi/caution.png)
6. Navigate to the folder that has the custom visual file (`.pbiviz`) and open it.
7. When the visual has successfully imported, select OK.
   ![Success visual import pop-up](./img-powerbi/success.png)
8. The visual now appears as a new icon in the visualizations pane of the current report. Select it to create the visual on the report canvas.
   ![Visual installed](./img-powerbi/visual-installed.png)

::: tip

If you want the visual to remain on the visualization pane so you can use it in future reports, right-click on it and select Pin to visualization pane.

:::

### Usage

The 3D Viewer Visual was designed to work alongside our _PowerBI Data Connector_ (version 0.10 or above). The _data connector_ will output a table containing the following columns:

- `data`: A column of records containing the data belonging to each speckle object.
- `Stream URL`: The stream url this object was fetched from
- `Object ID`: The id of each speckle object in the table (this was extracted from the `data` records).

> Other columns may be present, and can be user generated, but are not relevant for this section.

#### Loading objects

In order to load the objects from the table into the viewer, just add the fields `Stream URL` and `Object ID` onto their respective inputs in the visual.

![Visual inputs](./img-powerbi/visual-inputs.png)

Once both the fields are added, the Viewer would start to load the objects into the scene. The **Object Data** input is optional, and is only used to enable highlight/coloring functions.

#### Highlighting objects across visuals

In order to enable highlighting across report visuals, connect a field on the **Object Data**. This could be any field in your data source (the object id, volume, level name, beam type...)

Once a field has been added, any objects highlighted in another visual (such as a Table, Matrix, Slicer...) will be filtered out in the viewer, showing any other objects _ghosted out (gray transparent material)_

#### Coloring objects by category

Coloring objects works in the same way that highlighting. Once a field has been added to **Object Data** the viewer will color the data by the field that was provided, when available.

The way an object is colored depends on the type of field you connected:

- Text based fields: The colors will be automatically generated by unique value.
- Number based fields: The colors will be generated using the 3-color gradient in the Viewer Settings, assuming the first color represents the minimum value and the last color represents the maximum value.

### Visual Settings

#### Camera controls

![Camera settings](./img-powerbi/settings-camera.png)

The camera controls settings allow for:

- Orthogonal or perspective mode
- Setting the view that would be shown when first loaded (top, front, back, left, right)

#### Colors

![Color settings](./img-powerbi/settings-color.png)

The filtering/coloring feature available when connecting a data field into the `Object Data` section can be customised by selecting a 3-color gradient on the visual settings.

This will affect the color pallette that is used when **coloring objects by a number based field**. When connecting a text based field into the `Object Data` input, the color will be computed automatically and the color pallette in the settings will be ignored.

## Feedback

We're really interested in your feedback regarding the integration between Power BI and Speckle! You can always reach us with suggestions, comments, and error reports on our [Community Forum](https://speckle.community)
