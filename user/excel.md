---
typora-copy-images-to: ./img-excel
---

# Excel

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the deprecated V2 Excel connector.</span>
  <span class="next-gen">A Next Gen version of the Excel connector is not yet available, but is under consideration. When released, it will appear on the <a href="https://app.speckle.systems/connectors">Connectors page</a>.</span>
</div>

> ⚠️ The Excel connector is currently not distributed or supported.  
> If and when it returns, you'll be able to find and install it from [**app.speckle.systems/connectors**](https://app.speckle.systems/connectors)

---

## Overview (Legacy V2)

Speckle’s Excel connector supported the following platforms:

- Excel on iPad
- Excel 2016 or later on Mac
- Excel 2013 or later on Windows
- Excel on the web

::: tip

Explore the archived tutorial:  
[Getting started with Excel](https://speckle.systems/tutorials/getting-started-with-speckle-for-excel/)

:::

## Getting Started (Legacy)

<iframe width="100%" height="400px" src="https://www.youtube.com/embed/4viUTvo6BCw" title="Speckle for Excel intro" frameborder="0" allowfullscreen></iframe>

### Installing (Historical Only)

The V2 Excel connector was not distributed via Speckle Manager.  
It was installed through the Microsoft Office Add-In Store.

Steps:

- Open Excel (Desktop or Web)
- Go to _Insert > Office Add-ins_
- Search for `Speckle` and click _Add_

Alternatively, visit the archived listing:  
[Excel Add-In on Microsoft AppSource](https://appsource.microsoft.com/en-us/product/office/WA200002934)

Once installed, the connector appeared in the **Home ribbon**:

![image](https://user-images.githubusercontent.com/2679513/119171684-cdf3da00-ba5c-11eb-87a5-bee798f96f90.png)

### Logging In

You needed to log in directly within the connector UI by entering the server URL and credentials.  
Manager accounts were not accessible to the add-in.

::: tip

Only **cloud-hosted servers** (e.g. `https://app.speckle.systems`) were supported, due to Microsoft Store limitations.  
Self-hosted server use required local republishing of the connector.

:::

## Basic Usage (Legacy)

### Adding Projects

- Click the top left menu
- Choose “Add Project”
- Select a project — it is saved in your Excel document and reloaded automatically

You could toggle between **send** and **receive** modes per project.

![excel-add](https://user-images.githubusercontent.com/2679513/119180828-b4588f80-ba68-11eb-8ac3-0aa8f9d5158f.gif)

### Receiving Data

Data was flattened into tabular form to fit Excel's structure.  
You could selectively receive specific objects or properties from a version.

#### Simple Values

Lists of numbers or text were output row-wise. Nested structures were stringified.

#### Objects

Objects were **flattened** into rows with headers derived from property names (e.g. `geometry.length`).  
This worked best for lists of objects sharing the same schema.

#### Complex Objects

If an object had many nested properties (25+), an extra dialog allowed you to choose which to import.

![excel-receive](https://user-images.githubusercontent.com/2679513/120610238-e1cf1100-c44a-11eb-88cd-669d18faf0a6.gif)

### Sending Data

You could send:

- Simple ranges (as lists of values)
- Tabular data (as lists of objects)

Use “Set range” or “Set range with headers” to define what to send.

![excel-send](https://user-images.githubusercontent.com/2679513/119195853-30f56900-ba7d-11eb-9ac5-fd057a44ac9f.gif)

## Support

The Excel connector is not actively supported.  
To request or track progress on a future Next Gen release, please visit the [Speckle Community Forum](https://speckle.community/).
