# Power BI

![Power BI connector](./img-powerbi/powerbi-main.png)

::: tip

The Power BI connector is in `beta` development and still requires manual installation. We will look into streamlining installation via Speckle Manager as well as Microsoft certification once development stabilizes.

:::

The Speckle 2.0 connector for Power BI supports Power BI Desktop only.

## Getting Started

### Installation

> All releases of the Speckle 2.0 Power BI Connector are available on our [Power BI GitHub repository](https://github.com/specklesystems/speckle-powerbi/releases).

1. Download the `Speckle.mez` file from the latest release (or release of your choice).

2. Copy the downloaded file into the local `Custom Connectors` folder in your installation of Power BI: `Documents\Power BI Desktop\Custom Connectors`.

3. The Speckle Power BI Beta Connector should now appear as a data source once you load up Power BI Desktop!

::: warning

If the `Custom Connectors` folder doesn't exist, you can create it at the path in Step 2! Make sure it is created in your user's `Documents` directory.

:::

### Features

The Power BI beta connector allows you to import your Speckle stream, branch, commit, or object data using the corresponding URL from your Speckle server stream. The following data will be retrieved depending on which type of URL you use:

- Stream URL -> the most recent commit on the main branch of this stream
- Branch URL -> the most recent commit on this branch
- Commit URL -> this commit
- Object URL -> this object

If you're having issues connecting to your stream, make sure the stream is either set to `Public` or your local account has access to the private stream.

### Using Speckle Power BI

Once the connector is installed, you'll find a `Speckle (beta)` option in the `Get data` interface, under the `Other` category.

![Data connector](./img-powerbi/get-data.gif)

Select the Speckle connector and click `Connect` - a window will open where you can input your Speckle stream, branch, commit, or object URL!


## Feedback

We're really interested in your feedback regarding the integration between Power BI and Speckle! You can always reach us with suggestions, comments, and error reports on our [Community Forum](https://speckle.community)
