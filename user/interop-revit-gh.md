# Revit to Grasshopper and back

::: tip NOTE ❗️

All our tutorials have been migrated to out tutorials portal! 
Check them out 👉 [Tutorials](https://speckle.systems/tutorials/)

:::

> **Level:** Advanced
>
> **Author:** Alan
>
> **Software used:** Revit 2021, Grasshopper for Rhino 7

**Stream _Revit_ native elements to _Grasshopper_ using Speckle!**

In this guide, we will send different types of Revit elements, such as walls, floors, levels, etc. We will also learn how to specify which data will be sent by using _filters_. We'll extract parameter values, use them to drive our Grasshopper definitions and see how to update parameter values back in the Revit model.

![Intro image](./img-interop/rvt-gh-intro-img.png)

## Getting Started

Before getting started, check that you have a supported version of Rhino (6 or 7) and Revit (2019-22) and the Speckle 2.0 connectors installed for both **Grasshopper** and **Revit**.

With the setup sorted, download the Revit and Grasshopper files for this tutorial [here](https://drive.google.com/drive/folders/19JNfCRJcPaO4QBo2q0swwjNLZ1nOnMMS?usp=sharing)

::: tip
Our Rhino and Grasshopper connectors are independent of each other, unlike in Speckle 1.0. This means you can choose whichever one best suits your workflow 😁
:::

## Sharing Project Data

In many cases, we'll want to share some basic project data between software, such as our Revit model's views, existing levels or loaded families. These types of elements are not really selectable in Revit, but we can use one of Speckle's _filters_ to get them across.

1. Create a new stream called `Interop - Revit/GH v2 - Project Data`.
2. Select the `Project Information` filter
3. Choose the **Project Info**, **Levels** and **Families & Types** options and press `Set Filter`.
   You should see the filter selection appear in the _Stream card_.
4. Press `Send`.

![Sharing project data](./img-interop/v2/rvtGh-sendingProjectData.gif)

## Sharing Revit Elements

Now that everyone can access the project data, let's create a new stream to send a few building elements over.

In this case, we'll be sending the **Walls**, **Floors** and **Structural Framing**, over to Grasshopper.

![Sharing revit elements](./img-interop/v2/rvtGH-sendingBuildingElements.gif)

1. Create a new stream called `Interop - Revit/GH v2 - Building`.
2. Select the `Category` filter
3. Choose the **Walls**, **Floors** and **Structural Framing** categories and click on `Set Filter`.
   You should see the filter selection appear in the _Stream card_.
4. Press `Send`.

## Receiving Revit Elements in Grasshopper

Now we have both our _Project Data_ and some _Building Elements_ saved as streams in the Speckle server. Let's switch to Grasshopper and use those elements to do some simple Grasshopper tasks.

## Displaying Existing Levels

Included in the _Project Data_ we sent over we have the levels from Revit.Let's create some planes at each elevation, and use those to display the name of each floor.

![Generating level planes](./img-interop/v2/rvtGh-createLevelTextTag.png)

1. Create a `Receive` node and a panel with the `Interop - Revit/GH v2 - Project Data` **stream url**.
2. Connect the panel to the only input in the `Receive` node.
3. Press the `Receive` button inside the node and wait for the process to finish.

   ::: tip Base objects
   You'll notice that the data you received is a `Base` object. In order to see what's _inside_ that Speckle object, we need to **expand it**.

   We'll use the 'Expand Speckle Object` node extensively in this guide.
   :::

4. Create an `ExpandSpeckleObject` component and plug the `Base` object into it's input.
5. The node outputs will display the different properties available on that object. There will be a `@levels` output.
6. Create another `ExpandSpeckleObject` to the `@levels` output.
7. The node will display the properties available for each level in the building, including its **name** and **elevation**.
8. Create a vector using the `elevation` value, and plug that into an `XY Plane` node.
9. Create a `Text Tag` and plug our newly created planes and our `level` names.

If everything went well, you should see on your screen the generated planes and text tags with the level names on each position.

![Generating level planes](./img-interop/v2/rvtGh-generateLevelTagsRhino.png)

## Displaying Revit Elements in Grasshopper

Let's also receive the Revit elements we sent to the `Interop - Revit/GH - Building` stream.

![Receive revit elements](./img-interop/v2/rvtGh-receiveRevitElements.png)

1.  Create a `Receive` node and a panel with the `Interop - Revit/GH v2 - Building` **stream url**.
2.  Connect the panel to the only input in the `Receive` node.
3.  Press the `Receive` button inside the node and wait for the process to finish.
4.  Create an `ExpandSpeckleObject` component and plug the `Base` object into its input.

    ::: tip
    You'll see that every category we selected on the Revit filter is organized in different outputs:+

         Floors - Structural Framing - Walls

    :::

### Visualizing Revit Elements

Every Revit element will always have a `displayMesh` property containing the geometric representation of that object.

In order to access it, we can use the `Speckle Object Value by Key` node to just fetch the mesh from the elements we received. The ouptut can then be previewed in the Rhino window.

![Get display mesh of element](./img-interop/v2/rvtGh-displayMeshValue.png)

We can now proceed to extract some parameters from each object and use them to color our elements accordingly.

### Color by Category

Coloring by category is the most straightforward. Using the data tree we generated with our elements:

![Color elements by category](./img-interop/v2/rvtGh-colorByCategory.png)

1. Extract the `displayMesh` value from each element
2. Generate one color for each of the branches in our `data tree`
3. Connect the meshes and colors into a `Custom Preview` node.

![Color elements by category result](./img-interop/v2/rvtGh-colorElementsByCategoryRhino.png)

### Color by Level

Coloring by level requires also extracting the assigned level for each element. We can do it just like we did for the `displayMesh`

![Color elements by level](./img-interop/v2/rvtGh-ColorByLevel.png)

1. Use a `Speckle Object Value by Key` to get the `displayMesh` and `level` of each object.
2. Use an `ExpandSpeckleObject` node to obtain the `name` and `elevation` of the floor assigned to each element.
3. Using some _grasshopper magic_, create one color per elevation value (we are using a gradient for this).
4. Connect the meshes and colors into a `Custom Preview` node.

![Color elements by level](./img-interop/v2/rvtGh-colorElementsByLevelRhino.png)

### Color by Parameter Value

Coloring by parameter requires a little bit more Grasshopper knowledge. As you'd have to handle the parameter list on your own.

![Color elements by parameter](./img-interop/v2/rvtGh-ColorByParameter.png)

1. Use an `Expand Speckle Object` component to retrieve **all** the properties from the elements. We're interested in the `displayMesh` and the `parameters` list.
2. Use another `Expand Speckle Object` component to retrieve the properties of each parameter.
3. To simplify our work, create a set out of all the parameter names.
4. Now you can use that set to select a specific parameter value (in our case the **volume**, index 9) and use those values to drive our gradient.

You should see the colored elements in the Rhino viewport (in the screenshot, green is smaller and red is bigger).

![Color elements by parameter](./img-interop/v2/rvtGH-colorElementsByTypeRhino.png)

## Updating Revit Parameter Values from Grasshopper

 So far, we're received Revit elements and played around with their values in Grasshopper. Next, let's send some extra information back to the original Revit model (labelling elements, modifying family types or any other parameter change).

::: tip
You can send parameter updates to Revit using the `ParameterUpdater` schema. For that, you'll need to:

1. Create a new `Create Schema Object` node, and select from the _pop-up_ the `ParameterUpdater` option.
2. Repeat the same step, but select the `Paramter` option from the _pop-up_.

The process is quite simple, you first need to _create a parameter_ with a `name` and a `value`. Then, in the `ParameterUpdater` you specify the `elementId` of the element you want to modify, and the parameter object we just created.

In order to be able to update a parameter value, the parameter _**must exist**_ in the element.
:::

### Sending Update Orders from Grasshopper

Let's use this to update the `Mark` parameter (which exists in all Revit elements) of all walls in our model.

We're just going to name each wall sequentially with the pattern `WALL1, WALL2...WALLXX`, so each wall will have a unique `Mark` value.

![Creating parameter updates](./img-interop/v2/rvtGh-updateParameters.png)

1. Connect the walls to an `Expand Speckle Object` node.
2. Using the `elementId` create a list of numbers of the same length and concatenate it with the text `WALL`.
3. Connect the list to the `Parameter` node, and connect a panel with the text **Mark** to the `name`
4. Connect the `elementId` and the `parameter` list appropriately in the `ParameterUpdater` node.

We will also need a new stream and `Send Data` node to send this data to Revit. Create a new stream called `Interop - Revit/GH v2 - ParamUpdate` and send the `ParameterUpdater` elements.

![Sending parameter updates from GH](./img-interop/v2/rvtGh-sendParameterUpdater.gif)

### Receiving the Updates in Revit

In Revit, add the stream we just created to your project and press `Receive`. Once the process has completed, you should see the `Mark` property has been filled with unique values for each wall. You can repeat this process as many times as is necessary.

![Receiving parameter updates in GH](./img-interop/v2/rvtGh-receiveParameterUpdates.gif)

## Known Issues

- Under the `beta` release, there is limited support for Solid elements to be sent _from_ Revit _to_ Speckle. Any solid that is not supported will be converted to a `Mesh` instead.

  Speckle 2.0 is currently under `beta`. You can find any known issues on our [GitHub Repo Issues page](https://github.com/specklesystems/speckle-sharp/issues?q=is%3Aissue+is%3Aopen).
