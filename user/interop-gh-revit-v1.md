# Grasshopper ➡ Revit

::: tip NOTE ❗️

All our tutorials have been migrated to out tutorials portal! 
Check them out 👉 [Tutorials](https://speckle.systems/tutorials/)

:::

>**Level:** intermediate
>
>**Author:** Alan
>
>**Software used:** Revit 2021, Grasshopper for Rhino 7

You can stream _Grasshopper_ native geometry to Revit using Speckle! In this guide, we will send different types of geometry and built elements to Revit to understand how Speckle converts them into native Revit geometries. We will also create some `BuiltElements` using the `SchemaBuilder` node, which allows for the generation of native Revit elements such as walls, floors, topography, etc...

## Getting started

Before getting started, check that you have a supported version of Rhino (6 or 7) and Revit (2019-21) and the Speckle 2.0 connectors installed for **Grasshopper** and **Revit**. Then download the Rhino and Grasshopper files or this tutorial [here](https://drive.google.com/drive/folders/1TYX8aL_CZ7fVLaE1pWz4h4qYZYYAaA0o?usp=sharing)

::: tip
Our Rhino and Grasshopper connectors are independent of each other, unlike in Speckle 1.0. This means you can choose which one is appropriate for you, or install both! 😁
:::

## Sending `Rhino/Grasshopper` geometry objects

The _Grasshopper Connector_ supports sending any type of geometry or data. This geometric data may not be fully supported in Revit as such, so the Revit converter will determine what type of Revit element each geometry get's converted to.

### Default conversions

Let's send some geometry objects from Grasshopper to Revit. We'll start with the GH part:

1. Open the Rhino file. The model is organized into a `Structure` layer for columns and an `Architecture` layer for floors and walls.
2. Open the Grasshopper file. You'll notice several grouped nodes. Focus on the topmost one, called **"Default Conversions"**.
   ![Default conversions group](./img-interop/rvt-defaultConversions.png)
3. Here, we've already selected different common geometry types from our Rhino model.
   - A curve
   - A BREP
   - A Mesh
4. Create a new `Sender` node in the Grasshopper canvas.
5. Create a new `Stream` by adding an `Accounts` and a `Create Stream` node; and connect them as shown:
   > You can also use an existing stream for this if you prefer.
6. Push the send button and wait for the sender to _do its thing_.

![Send geometry from GH](./img-interop/rvt-geometry-send.gif)

::: tip Viewing your stream
Right click the `Send node` and select `View commit....`. This will open a new browser window taking you to the Stream location in your Speckle server.
![View stream online](./img-interop/rvt-viewStream.png)

- Streams created in Grasshopper have the name `Random Stream` by default, so feel free to change it to be able to identify it in Revit. You can also identify a stream by it's unique ID.
  :::
  Now for the Revit side of things:

1. Open a new Revit file, and call up the Revit Desktop UI via the Speckle 2 plugin ribbon.
2. Add the stream you just created by clicking the blue `+` button on the lower right corner.
3. Press the `Receive` button in the stream card and wait for it to finish.
4. Once done, you should see the different geometry elements converted to Revit:
   1. All curves would have been converted to `ModelCurves`
   2. All BREP/Mesh elements would be converted to `DirectShape`'s with the 'Generic Model' category.

> The stream card will also display any warnings or errors that ocurred during the process.

![Receive geometry from GH in Revit](./img-interop/rvt-geometry-receive.gif)

If you want to have more control over how these geometries get converted in Revit, keep going to the next section 👇

### About sending `BREPs`

Rhino BREP support still has some limitations we are working on improving, but other's are strictly imposed by the Revit API. In order to ensure unsupported geometric objects still get represented when importing to Revit, we provide a `fallback` value for every `BREP` in the form of a `Mesh`.

So, whenever a BREP conversion fails in Revit, the resulting object will still be generated in the model, only as a tesselated representation of the smooth BREP.

## Sending custom `Base` objects

With Speckle, you can create you own custom objects to represent and organize data in anyway. Let's create a custom object for the geometry we sent in the previous step.

- Bring a new `Create Speckle Object` node onto the canvas.
- Zoom-in to the node and add some properties inputs to it.
  - You can rename inputs by right-clicking the input name.
  - You can also specify if the input is of `item` or `list` type. Similar to how the scripting nodes operate in Grasshopper.
- Connect the geometries we sent earlier to each of the input types. If done correctly, the result should be just **one** `Base` object.
- Connect that object to the `Data` input on the `Send` node.
- Press send and wait until it finishes.

![Sending `base` objects from GH](./img-interop/rvt-base-send.gif)

Now let's switch to Revit:

If you already had the file open from the previous step, you should have an update notification on the `stream` we added earlier. Press the receive button and wait for the process to complete.

As you may notice, even though the geometry was sent inside a `Base` object, all entities will still appear in the Revit model. This is because the conversion process will look for any objects it can convert to Revit native elements, independently of the data structure they are sent in.

Meaning, you are free to organize your data as needed for any other application (i.e.: GH->GH data trees) and still receive it in Revit properly.

![Receive `base` objects from GH in Revit](./img-interop/rvt-geometry-receive.gif)

## Sending `SchemaBuilder` objects

In order to create other _native_ Revit elements, we'd need to use the `Schema Builder` node in Grasshopper.

::: tip SchemaBuilder node pop-up

When first create the node, a pop-up window will appear allowing you to select the object type you want to create. These are organized into two main categories:

- Built elements: These are Speckle elements created to support common built elements (beam, wall, slab, level...) accross the entire Speckle ecosystem.
- Revit elements: These are specifically designed to support Revit specific entities and workflows.
  ![Schema builder pop-up](./img-interop/rvt-schemaBuilder-popup.gif)

:::

### Creating Levels and Floors

Let's start by creating some `RevitLevels`, which we will later use to assign other objects to it's appropriate building level.

1. Create a new `SchemaBuilder` node and select `Create Level` within the Revit category.
2. Connect to it the _Level Name_ and _Level Height_ nodes that already existed in the file.
3. Create a new `SchemaBuilder` node and select `RevitFloor`within the Revit category.
4. Wire up the `RevitFloor` node
   - `family` and `type`: connect a panel with the appropriate family and type name. If the family/type does not exist in the document, a _default_ one will be selected.
   - `outline`: connect the `Floor Outlines` node. This is just a collection of the perimeter curves for each floor (extracted from the Revit file)
   - `level`: Connect the levels we created on step 1-2.
5. Create a sender, wire it up as explained in the previous steps (data + stream) and press send. You can use the same stream as before.

![Create Revit floors in GH](./img-interop/rvt-schema-createFloors.png)

Go back to the Revit file, you should see a notification in your stream telling you the data was updated.

1. Press `Receive` and wait for the process to finish.
2. Once done, you should see your newly created floors and levels. Each floor assigned to it's corresponding level.

Since these are native Revit Elements, you can edit as any other Revit type. Double-click any of the floor to edit their floor lines.

![Edit revit floors from Speckle](./img-interop/rvt-schema-editFloorsRevit.gif)

::: tip Automatic floor creation

The Revit connector will always attempt to assign objects to existing floors when available. If the object lies at a height where no `level` exists, a new level will be automatically generated with the name `Generated Level XXXX`, where `XXXX` will be the height at that level.

This is specially true when sending `BuiltElements`. Notice the lack of `level` in the `Floor` node as opposed to the `RevitFloor`. If sending a `Floor`, a level will be generated at the height of the floor outline.

![Floor nodes comparison](./img-interop/rvt-schema-floorComparison.png)
:::

## Assigning parameter values

The `Schema Builder` node also contains a `Parameter` type, created specifically to pass parameter values along with the Revit model elements being sent.

::: warning
When sending Revit elements with custom parameters, you must ensure the parameters exist for the type/family you are targetting or the value will not be set.
:::

Passing parameter values is as easy as connecting the desired parameter to the `parameter` input of a `RevitElement` node. Let's modify the `Mark` parameter value to be the current level elevation.

1. Focus on the `RevitFloors` we created earlier.
2. Create a new `Schema Builder` node and select the type `Parameter`
3. Use a `Expand Speckle Object` node to extract the information from the levels.
4. Connect the elevation to a text node (to force it to be a string) and connect it to the `Parameter` node as shown
5. Now, send the floors clicking the `Send` button.

![Send floors with parameter values](./img-interop/rvt-schema-createFloorWithParam.png)

In Revit:

1. Press the receive button as soon as you get notified of the updated data.
2. Select any of the floors that were sent and ensure the parameter has been properly set.

::: tip
You can do this with any type of parameter in your model (family/shared...)
:::

![Receiving stairs in Revit](./img-interop/rvt-schema-parameterSet.png)

## Sending complex geometry

In cases of higher complexity, creating native Revit elements may not be an option. When necessary, when can also send any complex geometry (curves, BREPs, meshes) to Revit as a `DirectShape`. This allows us to assign parameter values and a category type to our element.

Let's try it out with the stairs:

1. Create a new `SchemaBuilder` node and select `DirectShape` from the Revit category.
2. You'll notice the `DirectShape` node will also create a `ValueList` drowpdown to select the appropriate element type.
3. Connect the `Stairs by level` node to the `BaseGeometries` input.
   ::: tip
   The `BaseGeometries` input expects a list, so make sure you graft it to create one `DS` per stair object.
   :::
4. Connect a panel to the `name` input, and write a meaningful name (it can be unique for each object).
5. Connect the `DirectShape` output **and** the previously created `RevitFloors` to a sender and press `Send`

Now in Revit just press **Receive** and wait for the magic to happen.

![Receive complex stairs](./img-interop/rvt-schema-receiveDS.gif)

## Receiving updates

In order to ensure that further work on your model does not get deleted when receiving updated data from Speckle, we only delete/add objects when necessary, and update any other existing objects that have been modified.

Lets test this with a simple wall:

1. In the Revit model, add some new elements, such as walls, linked to the Floors we received.
2. In grasshopper, modify the affected level in some way and send the new changes.
3. Receive the changes in Revit.

If all went well, your walls should have updated along with the floor changes.

## Using Speckle in the Family Editor

::: warning Under construction
You can definitelly use Speckle inside the Family editor but this section is currently being built 🚧, please check again later!
:::

## Known issues

Speckle 2.0 is currently under `beta`. You can find any known issues on our [GitHub Repo Issues page](https://github.com/specklesystems/speckle-sharp/issues?q=is%3Aissue+is%3Aopen).
