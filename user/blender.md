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

![add by url](./img-blender/add-by-url.png)

From version 2.1.9, you can also add existing streams by their URL. You can use the URL to a stream, a specific branch, or a specific commit. Simply paste it into the popup and the correct account, stream, branch, and commit will get selected for you.

The **Active Stream Panel** will show more details about the stream you've selected in the Streams Panel. From here, you can change the active branch and commit. You can also Send and Receive any items you have selected in Blender. Under the Send and Receive buttons, you can use the dropdown menus to select a script to run on all elements during the send / receive process.

At the very bottom of the panel (not pictured), you'll find a button that will open the stream in the [Speckle Web App](/user/web).

## Supported Elements

- [Blender Support Tables](/user/support-tables.html#blender)

## Blender BIM

There is currently some limited support for [BlenderBIM](https://blenderbim.org/), though this is intended as an export and does not work coming back. To take advantage of this, simply open an IFC using BlenderBIM then use the Speckle Connector to send to Speckle.

<iframe src="https://speckle.xyz/embed?stream=c51120a7f7&commit=767b7288ee" width=600 height=400 />

There are a few things to keep in mind when sending an IFC to Speckle using BlenderBIM:

- Structure: The hierarchical structure of collections and objects is preserved when sending to Speckle.
  - The name of each object is attached in the `name` field.
  - Any `/` in names will be replaced with `::`
- Materials: If the object has a material, this will be simplified into a [Render Material](https://github.com/specklesystems/speckle-py/blob/9a1f28516d0bb7c76e390af103bc677bc5ca7b04/specklepy/objects/other.py#L6-L12) and attached in the `renderMaterial` field.
- Properties: Custom properties added within Blender are always added to a `properties` field on respective objects. For BlenderBIM objects, this includes the `ifc_definition_id`.
  - Additional IFC properties that aren't stored in Blender are currently not extracted from the IFC and attached. This may be explored as an enhancement in the future.
- Type: Objects are all sent as meshes and collections are sent as `Base` objects. None of the objects are currently being converted and sent as BIM objects.

## Developing Locally

If you'd like to help develop this connector further, you can pull from the [github repo here](https://github.com/specklesystems/speckle-blender).

To run your local version of the connector, drag the `bpy_speckle` folder from the `speckle-blender` directory into your Blender `addons` folder replacing any previous version you may have in there. This will be at `%APPDATA%/Blender Foundation/Blender/2.92/scripts/addons`. If you haven't installed the connector before, you'll need to manually go into the `addons/modules` folder and install the dependencies there.
