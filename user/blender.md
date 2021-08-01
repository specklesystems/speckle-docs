# Blender

::: tip 

Check out our dedicated tutorial on [how to get started with Blender](https://speckle.systems/tutorials/getting-started-with-speckle-for-blender/)!

:::

## Getting Started

For a quick overview, check out this short video on how to get started sending and receiving data from Blender!

<div style="position: relative;padding-bottom: 56.25%;"><iframe width="100%" height="100%" style="position: absolute;" src="https://www.youtube.com/embed/vy-i6lCdMOE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Installation

Before using this connector, you'll need to follow our standard setup instructions to [install Speckle Manager and add a Speckle account](/user/manager).

Once the connector has been installed, you will find it in the Add-ons tab of your Preferences menu, under the "Scene" category. Activate it by checking the tick box next to the Add-on name.

![activating the Blender Connector](./img-blender/enable-addon.png)

## User Interface

The Blender Connector lives in the 3D viewport toolbar (N) under the Speckle tab. It contains three main panels:

- **User Panel** for switching between different local accounts.
- **Streams Panel** for browsing your existing streams, creating new streams, or deleting old streams.
- **Active Stream Panel** for sending and receiving data to and from Speckle.

![panels overview](./img-blender/sidebar-menu.png)

The **Streams Panel** shows a list of your most recent streams, which you can search through by name. You can add new streams with the "+" button, delete streams with the "-" button, and refresh the streams with the refresh button.

The **Active Stream Panel** will show more details about the stream you've selected in the Streams Panel. From here, you can change the active branch and commit. You can also Send and Receive any items you have selected in Blender. Under the Send and Receive buttons, you can use the dropdown menus to select a script to run on all elements during the send / receive process.

At the very bottom of the panel (not pictured), you'll find a button that will open the stream in the [Speckle Web App](/user/web).

## Supported Elements

- [Blender Support Tables](/user/support-tables.html#blender)

## Developing Locally

If you'd like to help develop this connector further, you can pull from the [github repo here](https://github.com/specklesystems/speckle-blender).

To run your local version of the connector, drag the `bpy_speckle` folder from the `speckle-blender` directory into your Blender `addons` folder replacing any previous version you may have in there. This will be at `%APPDATA%/Blender Foundation/Blender/2.92/scripts/addons`. If you haven't installed the connector before, you'll need to manually go into the `addons/modules` folder and install the dependencies there.
