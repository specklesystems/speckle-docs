---
title: Basic Usage
---

# Basic Usage

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 SketchUp connector.</span>
  <span class="next-gen">SketchUp is now supported in the Next Gen connector ecosystem. These docs refer to the legacy version only.</span>
</div>

> ⚠️ This documentation covers the legacy (V2) SketchUp connector, which is no longer actively developed.  
> 👉 We recommend trying the new Next Gen connector available at [**app.speckle.systems/downloads**](https://app.speckle.systems/downloads)


In this page, we’ll show some basic operations using the legacy V2 SketchUp connector.

## Sending Data

<video autoplay muted loop>
  <source src="./img-sketchup/sending.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Sending is based on **Selection** mode only.

Steps:

1. Select all the objects you want to send.
2. Click the "**Send**" cube.
3. To change the target model, click the current selection and choose a different model from the dropdown.

## Receiving Data

<video autoplay muted loop>
  <source src="./img-sketchup/receiving.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Click the "**Receive**" cube to bring in data from a selected model and version.

::: warning
SketchUp groups will be received as component instances, not as groups.
:::

## Creating a New Project

<video autoplay muted loop>
  <source src="./img-sketchup/create-stream.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

To create a new project:

1. Click "**Create New Project**".
2. Enter a **name** and optional **description**.
3. Toggle visibility to make it **private** (if desired).
4. Click "**Create**".

## Creating a Model

<video autoplay muted loop>
  <source src="./img-sketchup/create-branch.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

To create a new model:

1. Hover over the model list and click the “**+**” button.
2. Enter a **name** and optional **description**.
3. Click "**Create**".

Your new model will now be active and ready for data.

## Adding a Project by URL

<video autoplay muted loop>
  <source src="./img-sketchup/add-by-id.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

If you have a URL for a model or version:

1. Click "**Add by ID or URL**".
2. Paste the full link.
3. Click "**Add**" to create a project card preloaded with the selected model and version.

## Switching Accounts

<video autoplay muted loop>
  <source src="./img-sketchup/switching-accounts.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

This V2 connector relied on accounts added through [**Speckle Manager**](https://speckle.guide/user/manager).  

Account switching was done by clicking your profile image and selecting from the available list.

> In the Next Gen version, sign-in is fully integrated into the connector itself — no Manager required.
