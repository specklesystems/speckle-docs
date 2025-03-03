---
title: Basic Usage
---

# Basic Usage

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 Sketchup connector.</span>
  <span class="next-gen">Next Gen connectors are coming soon, bringing significant changes to the documentation and features!</span>
</div>

In this page, we’ll show some basic operations you can do using SketchUp connector.

## Sending Data

<video autoplay muted loop>
  <source src="./img-sketchup/sending.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

For the moment, there is only one send mode: **Selection**.

To send data:

1. Select all the objects you want to send.
2. Click on the "**Send**" cube.
3. If you wish to change the target model, click on the selected model and choose the desired model from the dropdown menu.

## Receiving Data

<video autoplay muted loop>
  <source src="./img-sketchup/receiving.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Receiving models in SketchUp is as simple as clicking the "**Receive**" cube. As with sending, you can switch the targeted model and the particular version to receive.

::: warning
Note that if you sent SketchUp groups to a model, they will be received as component instances rather than groups.
:::

## Creating a New Project

<video autoplay muted loop>
  <source src="./img-sketchup/create-stream.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Creating a new project is also really easy.

1. Click on the "**Create New Project**" button.
2. A dialog box will appear. Provide a **name** for your project and an optional **description**.
3. To make your project **private**, use the toggle option.
4. Click on the "**Create**" button to finalize and create your project.

That's it! Your new project is now successfully created.

## Creating a Model

<video autoplay muted loop>
  <source src="./img-sketchup/create-branch.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

To create a new model:

1. Hover over the model button. “**+**” button will appear on the left. Click on it.
2. A new dialog box will open where you can **name** your model and optionally provide a **description** for it.
3. Click on "**Create**".

The newly created model will become active, ready for you to start working on it.

## Adding a Project by URL

<video autoplay muted loop>
  <source src="./img-sketchup/add-by-id.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

If you have the URL of the project you want to receive, you can easily add it using the "**Add By ID or URL**" button. Paste the URL of the data you want to receive and click “**Add**”. A Project Card will be added, with the model and version selected from the pasted URL.

## Switching Accounts

<video autoplay muted loop>
  <source src="./img-sketchup/switching-accounts.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Your Speckle accounts should be added via **[Speckle Manager](https://speckle.guide/user/manager)**.

You can switch between your accounts by clicking on your profile image and selecting it from the popup menu.
