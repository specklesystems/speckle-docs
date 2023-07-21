---
title: Basic Usage
---

# Basic Usage

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
3. If you wish to change the target branch, click on the selected branch and choose the desired branch from the dropdown menu.

## Receiving Data

<video autoplay muted loop>
  <source src="./img-sketchup/receiving.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Receiving streams in SketchUp is as simple as clicking the "**Receive**" cube. As with sending, you can switch the targeted branch and the particular commit to receive.

::: warning
Note that if you sent SketchUp groups to a stream, they will be received as component instances rather than groups.
:::

## Creating a New Stream

<video autoplay muted loop>
  <source src="./img-sketchup/create-stream.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Creating a new stream is also really easy.

1. Click on the "**Create New Stream**" button.
2. A dialog box will appear. Provide a **name** for your stream and an optional **description**.
3. To make your stream **private**, use the toggle option.
4. Click on the "**Create**" button to finalize and create your stream.

That's it! Your new stream is now successfully created.

## Creating a Branch

<video autoplay muted loop>
  <source src="./img-sketchup/create-branch.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

To create a new branch:

1. Hover over the branch button. “**+**” button will appear on the left. Click on it.
2. A new dialog box will open where you can **name** your branch and optionally provide a **description** for it.
3. Click on "**Create**".

The newly created branch will become active, ready for you to start working on it.

## Adding a Stream by URL

<video autoplay muted loop>
  <source src="./img-sketchup/add-by-id.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

If you have the URL of the data you want to receive, you can easily add it using the "**Add By ID or URL**" button. Paste the URL of the data you want to receive and click “**Add**”. A Stream Card will be added, with the branch and commit selected from the pasted URL.

## Switching Accounts

<video autoplay muted loop>
  <source src="./img-sketchup/switching-accounts.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Your Speckle accounts should be added via **[Speckle Manager](https://speckle.guide/user/manager)**.

You can switch between your accounts by clicking on your profile image and selecting it from the popup menu.
