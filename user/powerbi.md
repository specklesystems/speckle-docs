# Power BI

## PowerBI Data Connector

The Speckle 2.0 connector for Power BI supports **Power BI Desktop only**.

::: tip 💡 TIP

The Power BI connector is in `beta` development and still requires manual installation. We will look into streamlining installation via Speckle Manager as well as Microsoft certification once development stabilizes.

:::

![Power BI connector](./img-powerbi/powerbi-main.png)

### Features

The Power BI beta connector allows you to import your Speckle Project, Model, Version, or object data using the corresponding URL from your Speckle Project. The following data will be retrieved depending on which type of URL you use:

- Project URL -> the most recent Version on the main Model of this Project
- Model URL -> the most recent Version on this Model
- Version URL -> this Version
- Object URL -> this object

If you're having issues connecting to your Project, make sure the Project is either set to `Link Shared` or your local account has access to the private Project.

### Installation

::: tip 📌 IMPORTANT

All releases of the Speckle 2.0 Power BI Connector are available on our [Power BI GitHub repository](https://github.com/specklesystems/speckle-powerbi/releases).

:::

1. Download the `Speckle.mez` file from the latest release (or release of your choice).

2. Copy the downloaded file into the local `Custom Connectors` folder in your installation of Power BI: **`Documents\Power BI Desktop\Custom Connectors`**.

3. The Speckle Power BI Beta Connector should now appear as a data source once you load up Power BI Desktop!

::: warning 📁 WARNING

If the `Custom Connectors` folder doesn't exist, you can create it at the path in Step 2! Make sure it is created in your user's `Documents` directory.

:::

### Using Speckle Power BI

Once the connector is installed, you'll find a `Speckle - Get by URL (beta)` option in the `Get data` interface, under the `Other` category.

![Data connector](./img-powerbi/get-data.gif)

Select the Speckle connector and click `Connect` - a window will open where you can input your Speckle Project, Model, Version, or object URL!

The result of that query will be a table with the following columns:

- Project URL
- URL Type
- Object ID
- speckle_type
- data

![Result table](./img-powerbi/powerbi-result-table.png)

::: tip

Project URL and Object ID columns were added to facilitate loading data into the new [Speckle PowerBI 3D Viewer](#speckle-3d-viewer-visual)

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

### Fetching the Version data in a structured way

::: warning

This feature is experimental and may change in future releases.

:::

As of version `0.0.15`, you can fetch the Version data while preserving the structure of the data that was sent.

This new function can be found under the `Get Data -> Other` as `Speckle - Get By URL [Structured]`.

This new function allows for much faster interactions with your Speckle data, as it no longer requires to pull every single object as a flat list. There's a small downside to this, as you will no longer get the data with the expected columns to connect it directly to the _Speckle PowerBI Visual_.

> A tutorial to cover this topic will be published soon!

### Making your own API requests

::: warning

This feature is experimental and may change in future releases.

:::

As of version `0.0.15`, you can make your own GraphQL API requests to any Speckle server.

> This is not currently exposed as an available Data Source in `Get Data`, but you can access it while in the Query editor.

This can be used to craft your own interactions with Speckle, unlocking un-supported features such as:

- Fetching comments
- Read receipts
- Admin data such as server stats.
- Any other feature available through our API.

![GraphQL API Request]()

#### Inputs

- **Server URL**: The url of the Speckle server you want to connect to
- **Query**: The raw text GraphQL query
- **Variables**: A record containing a key for each variable in the GraphQL query and it's value. Nested records are allowed.

#### Outputs

A record containing the response, following the same structure as any GraphQL query.

::: tip

We recommend experimenting with our GraphQL explorer to construct your queries, as it will provide auto-complete and error checking out of the box.

[app.speckle.systems/explorer](https://app.speckle.systems/explorer)

Once you're happy with you're query, you can move it to PowerBI with little effort.

:::

### Accessing Private Projects 🔒

#### With a Personal Access Token

If you're having issues connecting to your private Project, make sure you set an `Access Token` on your Profile. This is how you do it:

1. Go to you Profile on Speckle server. [https://app.speckle.systems/profile](https://app.speckle.systems/profile)
2. Under Developer Setting Create a `New Token`

   ![image](https://user-images.githubusercontent.com/51519350/198557652-abd6f63b-4260-4ef8-aeb9-bac03bf2f7e1.png)

3. Set its name as `PowerBI Connector` and check every option under `Scopes`✅ and click `SAVE`.

   ![image](https://user-images.githubusercontent.com/51519350/198579553-61a9e918-a35a-4498-b774-3a0be3ca8d20.png)

4. This will create a token for you. Make sure you copied it. It is the first and last time you’ll be able to see this token. Treat it as a Password 🔑 and do not share it with anyone.
5. Go to **Power BI > Options and Settings > Data source settings.**

   ![image](https://user-images.githubusercontent.com/51519350/198579710-17e33e8f-a61c-47b1-8a20-68a03d1e49db.png)

6. Go to **Global Permissions** and select your Speckle server.

   ![image](https://user-images.githubusercontent.com/51519350/198579769-5116f628-c0bd-4226-98d5-878815251d4e.png)

7. After selecting server, follow **Edit Permissions > Edit > Private Project.** Paste your _Token_ into `Personal Access Token` input.

   ![cdaf98266d5cc4ba2e82776bc54ba8a367a83232](https://user-images.githubusercontent.com/51519350/198579885-cbc6bed1-5659-42b9-80dd-6a4afd53321e.gif)

8. That’s it. It should work now.

If you have trouble seeing your server under Data sources, simply delete existing servers. Go back to Speckle connector and try to receive the same Project/Model/Version. You’ll have the option to add it from there.

#### Logging in using your Speckle account

As of version `0.0.15`, user's of our general availabilty public server <https://app.speckle.systems> can now also login directly using their Speckle account.

To do so, you must select the `app.speckle.systems` option in the credentials pop-up:

![Selecting app.speckle.systems in the credentials pop-up]()

Then press the `Login with Speckle` button. This will open a pop-up window prompting you to log into your account and allow the PowerBI app to access your user data. This just grants `read-only` access, as recommended by PowerBI guidelines.

Once the app has been granted access, PowerBI will continue with the process of fetching the data.

## Speckle 3D Viewer Visual

> The PowerBI visual is still in **early stages of development**. We welcome your feedback!

![PowerBI rooms report](./img-powerbi/powerbi-rooms.gif)

The _3D Viewer Visual_ allows for the visualization of Speckle data in a 3D environment inside your PowerBI reports. It is compatible with PowerBI Desktop and can also be used in PowerBI.com for online visualization.

### Features

The current version enables basic visualization, filtering and coloring features, as well as some basic camera and color controls:

- Load individual objects that were fetched with the PowerBI Data Connector
- Highlight objects in the 3D viewer that were selected on a different table in the report.
- Color objects based on a category or value

### Installation

You can install the Speckle 3D Viewer Visual manually by following these steps:

1. Download the latest `.pbiviz` package from our [Github repo](https://github.com/specklesystems/speckle-powerbi-visuals/releases).
2. Open your report in Power BI Desktop or Power BI service.
3. Select the ellipsis from the visualizations pane.
   ![Ellipsis visualization menu](./img-powerbi/ellipsis.png)
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
- `Project URL`: The Project url this object was fetched from
- `Object ID`: The id of each speckle object in the table (this was extracted from the `data` records).

> Other columns may be present, and can be user generated, but are not relevant for this section.

#### Landing page

When you initially drop the Speckle PowerBI visual, you'll see a landing page with some basic instructions on how to proceed

![Landing page](./img-powerbi/powerbi-visual-landing.png)

#### Loading objects

In order to load the objects from the table into the viewer, just add the fields `Project URL` and `Object ID` onto their respective inputs in the visual.

![Visual inputs](./img-powerbi/visual-inputs.png)

![Connecting inputs](./img-powerbi/powerbi-visual-addinputs.gif)

Once both the fields are added, the Viewer would start to load the objects into the scene. The **Object Data** input is optional, and is only used to enable highlight/coloring functions.

::: tip

The `Project URL` and `Object ID` columns will exist on the resulting query when using `Get by URL` function.

If you're using the new (experimental) `Get by URL [Structured]` function, you'll be required to generate the `Project URL` and `Object ID` columns in your final query table.

:::

#### Highlighting objects across visuals

In order to enable highlighting across report visuals, connect a field on the **Object Data**. This could be any field in your data source (the object id, volume, level name, beam type...)

Once a field has been added, any objects highlighted in another visual (such as a Table, Matrix, Slicer...) will be filtered out in the viewer, showing any other objects _ghosted out (gray transparent material)_

This also works in reverse order: Selecting something on the visual will filter it on any other visual in the report that is configured to do so.

![Visual selection affects other visuals in the report](./img-powerbi/powerbi-visual-bidirectional-selection.gif)

#### Object tooltips

::: warning

This feature is experimental and may change in future releases.

In particular, there are plans to allow customization of the tooltip data based on user-defined inputs, and removing the need of clicking the object to display the tooltip.

:::

When an object is selected in the PowerBI viewer, a tooltip will be displayed showing the object's properties and values.

![PowerBI Visual tooltip](./img-powerbi/powerbi-visual-tooltip.gif)

The tooltip's position will be updated as the camera moves through the model.

#### Context-menu

::: warning

This feature is experimental and may change in future releases.

In particular, there are plans to move the context-menu to the the right-click mouse button in an upcoming release.

:::

When an object is `double-clicked`, the context menu for that object will appear. This allows for easy object exclusion/isolation from the viewer in an interactive way.

![PowerBI visuals context-menu](./img-powerbi/powerbi-visual-doubleclick-exclude.gif)

#### Coloring objects by category

Coloring objects works in the same way that highlighting. Once a field has been added to **Object Data** the viewer will color the data by the field that was provided, when available.

The way an object is colored depends on the type of field you connected:

- Text based fields: The colors will be automatically generated by unique value.
- Number based fields: The colors will be generated using the 3-color gradient in the Viewer Settings, assuming the first color represents the minimum value and the last color represents the maximum value.

![Coloring objects](./img-powerbi/powerbi-visual-addfilter.gif)

### Visual Settings

#### Camera controls

![Camera settings](./img-powerbi/settings-camera.png)

The camera controls settings allow for:

- Orthogonal or perspective mode
- Setting the view that would be shown when first loaded (top, front, back, left, right)

#### Colors

![Color settings](./img-powerbi/settings-color.png)

The filtering/coloring feature available when connecting a data field into the `Object Data` section can be customized by selecting a 3-color gradient on the visual settings.

This will affect the color pallette that is used when **coloring objects by a number based field**. When connecting a text based field into the `Object Data` input, the color will be computed automatically and the color pallette in the settings will be ignored.

## Feedback

We're really interested in your feedback regarding the integration between Power BI and Speckle! You can always reach us with suggestions, comments, and error reports on our [Community Forum](https://speckle.community)
