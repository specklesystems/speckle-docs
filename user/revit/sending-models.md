---
title: Sending
---

# Sending Models from Revit

After successfully installing the Revit connector for Speckle, let’s send your first data from Revit to Speckleverse.

:::tip NOTE✍️
We have renamed some core concepts in Speckle to be more widely understandable.

- *Streams* have been renamed to **projects**
- *Branches* have been renamed to **models**
- *Commits* have been renamed to **versions**
  :::

## Launching the Connector

Revit connector will be added to all supported versions that you have installed.

:::tip IMPORTANT
Revit Connector currently supports Autodesk Revit 2020, 2021, 2022, 2023 and 2024🆕.
:::

To launch the connector:

<img class="rounded-dropshadow" src="./img-revit/launching-the-connector.png">

1. Navigate to the “**Speckle**” tab in the ribbon.
2. Click on the “**Revit Connector**” button, the one with the little blue brick 🧊.

## Sending Models

<img class="rounded-dropshadow" src="./img-revit/sending-from-revit.gif">

Sending your Revit model takes only **4** steps:

1. **Select (or create) a Speckle project**.
2. **Select (or create) a Speckle model** to send to.
3. **Select what you want to send**.
4. Click **Send**.

Let’s expand on these.

## Selecting a Speckle Project and Model

Before sending data from Revit, it is important to determine where you want to send the data. You can create a Speckle project & model using the web interface or the Revit Connector UI. We’ll cover how to create those using the Connector UI.

### Create a Speckle Project

<img class="rounded-dropshadow" src="./img-revit/create-speckle-project.png" width=350>

To create a Speckle Project:

1. Click the **Create New Project** button.
2. Provide a **Name** for your Project and an optional **Description**.
3. Use the toggle, to make your project **Private** or **Link Shareable**.
4. Click **Create**.

:::tip IMPORTANT
It's not necessary to create a Speckle project every time. You can also select an existing project and send data to it.
:::

You can also create a Speckle Project using Speckle’s web interface.

### Create a Speckle Model

<img class="rounded-dropshadow" src="./img-revit/create-speckle-model.png" width=700 display=block>

To create a Speckle model:

1. Expand the **Model** dropdown.
2. Select **Add New Model**.
3. Provide a **Name** and an optional **Description**.
4. Click **Create**.

:::tip IMPORTANT
Again, you can also select an existing model and send data to it.
:::

You can also create a Speckle model using Speckle’s web interface.

## Selecting What to Send

Next, you need to decide what you want to send from Revit. To help you select which elements will be sent to Speckle, we've built various filters into our Revit connector. Once a filter is set, just click **Send** and all objects passing the filter will be sent to your Project.

Let's review each of filter.

### 1. Everything

Sends all supported model elements, family types, levels, project information etc. The everything filter covers graphical and non-graphical elements in the model.

<img class="rounded-dropshadow" src="./img-revit/filter-everything.png" width=350>

### 2. Selection

Manually select elements from Revit, click “**Set Current Selection**” and send them to Speckle.

<img class="rounded-dropshadow" src="./img-revit/filter-selection.png" width=350>

### 3. Category

The category filter lets you select one or multiple supported Revit categories.

<img class="rounded-dropshadow" src="./img-revit/filter-category.png" width=350>

### 4. View

The view filter works similarly to the category filter and lets you include all elements visible in one or multiple views.

<img class="rounded-dropshadow" src="./img-revit/filter-view.png" width=350>

### 5. Schedule

Sends the selected Revit Schedule as a **DataTable** to Speckle. Learn more about DataTables and their usage in [Parameter Updater](/user/excel.html#parameter-updater-sync-revit-schedules-and-other-data).

<img class="rounded-dropshadow" src="./img-revit/filter-schedule.png" width=350>

### 6. Filters

Filters are used to selectively extract specific model elements based on predefined logical conditions. In the given image, for instance, Speckle will identify and send all elements that passes the selected filter.

<img class="rounded-dropshadow" src="./img-revit/filter-revit-filter.png" width=350>

### 7. Workset

Selects all elements belonging to the selected workset.

<img class="rounded-dropshadow" src="./img-revit/filter-worksets.png" width=350>

### 8. Project Information

The project info filter lets you add non-graphical elements, such as Levels, Views (2D & 3D), Family Types (their properties, not geometry), and Project Information.

<img class="rounded-dropshadow" src="./img-revit/filter-project-info.png" width=350>
