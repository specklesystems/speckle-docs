---
typora-copy-images-to: ./img-gh
---

# Grasshopper

::: tip

Check out our dedicated tutorial on [how to get started with Grasshopper](https://speckle.systems/tutorials/getting-started-with-speckle-for-grasshopper/)!

:::

## Getting Started

Speckle currently supports Grasshopper for McNeel Rhino 6 and 7.
To install this Connector and connect your Speckle account, make sure to follow the instructions in [Speckle Manager](/user/manager).

![GH Connector components](./img-gh/speckle-gh-main-tab.png)

Once installed, the **Grasshopper Connector** will appear under the `Speckle 2` tab, or if you use _tab icons_ you'll see our new Speckle logo instead.

The following component categories are intended for all users:

- Send/Receive nodes
- Account category, holding all account related nodes.
- Stream category, holding all stream related nodes.

We've also built a few components designed for advanced users and developers:

- Dev/Conversion: Conversion + serialization nodes.
- Dev/Transports: Not sure what transports are? Check [this](/dev/transports.md) out!

### Ribbon tabs

In addition to the nodes in the `Speckle 2` tab, the Speckle Grasshopper connector also comes with a variety of specific nodes create objects for specific industry standards (such as `BIM` and `Structural`) or specific applications (such as `ETABS`, `Revit` or `GSA`). These nodes are organized in independent tabs:

- **Speckle 2 BIM**
- **Speckle 2 Revit**
- **Speckle 2 Structural**
- **Speckle 2 ETABS**
- **Speckle 2 GSA**

::: tip Too many tabs?

We know your ribbon tab space is precious (as Grasshopper doesn't allow for horizontal scrolling of tabs...) and that in all likelihood, you will only need a couple of these nodes available at any given time.

You can choose which of these tabs you want to display in your Grasshopper instance using the `Speckle 2` top-menu.

Just go to `Speckle 2 -> Tabs` and enable the ones you do need. By default, all these extra tabs will be deactivated.

![Grasshopper Tabs menu](./img-gh/gh-speckleMenu-tabs.png)

**Changes to this settings will take effect after Restarting Rhino**.
:::

## Streams and URLs

In visual programming environments, Speckle Streams are identified by their URLs. Across our Dynamo and Grasshopper connectors you'll see URLs in 4 different formats:

- `https://speckle.xyz/streams/3073b96e86` points to the `main` branch on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/branches/dev` points to a branch named `dev` on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/commits/604bea8cc6` points to a specific commit `604bea8cc6` on Stream `3073b96e86`
- `https://speckle.xyz/streams/3073b96e86/globals/d227da61c1` points to the [globals](/user/web.html#globals) at `d227da61c1` on Stream `3073b96e86` (the globals id is optional)

::: tip
Unsure what _commits_ and _branches_ are? 🤔

No worries, you don't need to know what they are to use Speckle! But if you're curious, you can read about them in [concepts](/user/concepts).
:::

We'll see how branch and commit URLs are used in the following sections.

## Sending Data

Let's look at how we would send some data in grasshopper. First, start by creating a new `Send` node.

![image-20210322180706379](./img-gh/image-20210322180706379.png)

To select the stream you want send data to,just pass in its URL as a string to the stream port.

![image-20210322181425413](./img-gh/image-20210322181425413.png)

Alternatively, you can also use one of the following nodes to create or retrieve existing streams:

- [Create Stream](/user/grasshopper.md#create-stream)
- [Get Stream](/user/grasshopper.md#get-stream)
- [List Streams](/user/grasshopper.md#list-streams)

:::tip NOTE
While you can send data to streams and branches, you cannot send data to a specific commit. This is because commits represent your stream in a specific point in time. Therefore, everything that gets sent to Speckle is already a commit.

Want to edit an old commit? Just re-send the data and use the new commit instead.
:::

#### Adding Objects

In order to select which objects to send in grasshopper, we just need to connect the desired nodes to the `Data` input in the `Send` node. The sender supports any type of data, in any structure (item, list, datatree), and will convert any supported Rhino objects into a Speckle-compatible format where necessary.

#### Adding a Commit Message

While not required, it's good practice to add a "commit message" whenever you send you data, especially if working with others. This message should briefly describe the changes being pushed.
You can add a commit message by passing some text to the `message` port.
The commit message will be visible in Speckle Web (where you will also be able to edit it).

#### Sending

Once you've lined up your objects (and optionally written a commit message) the only thing left to do is to press the **Send button**.

![gh-send](./img-gh/gh-send.gif)

::: tip
To view the data you just sent in Grasshopper, right-click the `Send` node and select the `View commit ...` option. This should open a new browser window loading the _stream url_. You can share that url with any collaborators so they can receive the data.

![image-20210322182801307](./img-gh/image-20210322182801307.png)

:::

### Auto Sending

By right-clicking on the node, you can enable/disable auto sending. If enabled, data will be send automatically every time it changes.

![image](https://user-images.githubusercontent.com/2679513/139331715-86d102dd-fa0b-4854-bc75-764e005b0559.png)

### Sending to a Specific Branch

When referring to a stream by its URL, the `main` branch is used to send and receive data by default.

To target a specific branch, simply use the branch URL, such as: `https://speckle.xyz/streams/3073b96e86/branches/dev`.

## Receiving Data

Receiving data is very simple. You just need a `Receive` node, and a stream URL.

![gh-receive](./img-gh/gh-receive.gif)

When new data is pushed to this stream a notification will appear on the receive node, highlighting this fact.

### Auto Receiving

By right-clicking on the node, you can enable/disable auto receiving. If enabled, new data pushed to this stream will be pulled automatically as it becomes available.

![image-20210322183400126](./img-gh/image-20210322183400126.png)

### Receiving a Specific Branch

When referring to a stream by its URL, the `main` branch is used to send and receive data by default.

To receive from a specific branch, simply use the branch URL, such as: `https://speckle.xyz/streams/3073b96e86/branches/dev`.

### Receiving a Specific Commit

As we've seen, you can retrieve data from both the 'stream' and 'branch' level. It goes deeper - it's possible to retrieve data from specific commits. To do so, simply use the commit URL, such as: `https://speckle.xyz/streams/3073b96e86/commits/604bea8cc6`

::: tip NOTE

When receiving from a commit, the node will stop showing notifications about new activity on such stream and the auto receive toggle will be disabled.

:::

### Receiving a Specific Object

Finally, you can also receive just a specific object in a commit, to do so simply use the commit URL, ie: `https://speckle.xyz/streams/3073b96e86/objects/df7b8bafccefa791d82939dd36541189`. Objects can't be edited, so the data received using such a URL will always be consistent.
You can find the ID of an object from the Speckle Web interface:

![image-20210322185007725](./img-dyn/image-20210322185007725.png)

## Creating Custom Objects

A custom object is a [Base Object](/user/concepts.html#the-base-object) with custom properties assigned to it. It's basically a custom data structure you can create to send data in a specific format that you define.

There's several different ways to create custom speckle objects using the Grasshopper. One of them is using the `Create Speckle Object` node.

![Create speckle object node.](./img-gh/nodes-create-object.png)

This node is a _variable parameter_ type, meaning if you zoom into the _inputs_ section, you should see a `+/-` sign that will allow you to add/remove properties from the object. Each input you define will represent a new property on the object. You can also modify the name of these properties, as well as their _access type_.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Modifying the Access Type

Access type operates in the same way as the `Python` and `C#` script components. In this case, you can specify if you want a specific property in the object to be a _list_ or a single _item_.

![Access type menu](./img-gh/menu-listAccess.gif)

::: warning
Choosing the wrong access type for your data may result in duplicated data being generated.
:::

#### Detach/Do Not Detach

Every property can also be specified as _detached/non-detached_. When a property is _detached_, it means that the objects it contains will be saved as independent entities in the Speckle database. All properties are detached by default for performance reasons, but you can choose not to by specifying `Do not detach` on the right-click menu. Primitive types (int/double/bool/etc...) are never detached even if flagged as such.

Want to dig deeper into Detach/Do Not Detatch? Take a look at [this](/dev/decomposition.md) dev doc about the Decomposition API.

![Detach/Do not detach](./img-gh/menu-DoNotDetach.gif)

#### Optional

Every property can also be flagged as _optional_. This will allow you to create new objects with _incomplete_ data.

Please Note: There is a limitation on this behavior. At least one of the node's inputs must be _non-optional_.

![Optional menu](./img-gh/menu-Optional.gif)

::: tip

When you activate any of the previous options, the corresponding icon will be shown in the parameter, very much like the `Graft/Flatten/Simplify` options.

![State tags](./img-gh/menu-stateTags.png)

:::

#### Renaming inputs

All inputs can be renamed following the normal Grasshopper way. Just right-click the input you wish to rename, and write a new name for it in the first field of the pop-up menu.

![Classic input renaming](./img-gh/gh-cso-rename-classic.gif)

Most of the time, Grasshopper user's may have already named some of their input connections, and you can _inherit_ those names in your input in several ways:

1. Use the `Inherit names` option in each input _right-click menu_.
   ![Right-click menu "Inherit names" option](./img-gh/gh-cso-rename-menu.gif)
2. Double-click the input while pressing `shift`.
   ![Shift + double-click "Inherit names" shortcut](./img-gh/gh-cso-rename-shiftdoubleclick.gif)
3. Drag a new connection into the parameter while pressing `tab`.
   ![Tab + drag connection "Inherit names" shortcut](./img-gh/gh-cso-rename-tabdrag.gif)

::: tip

All renaming options and shortcuts are available in any other "variable input" speckle nodes, such as:

- Send node
- Extend speckle object

:::

## Supported Elements

- [Grasshopper Support Tables](/user/support-tables.html#grasshopper)

## Grasshopper BIM

Speckle 2.0 lets you create _Speckle BIM Elements_ from Rhino Geometry, so you can send objects like lines and surfaces as beams and floors! This means you can bring in your Rhino geometry directly as native Revit family elements using Grasshopper 💥

![Grasshopper BIM](./img-gh/gh-bim.png)

::: tip

You'll find the same functionality for Rhino [here](/rhino.html#using-rhino-bim).

:::

### Features

Access Grasshopper BIM element creation through the Grasshopper toolbars, which include a button for every supported BIM element.

The functionality is currently split into 2 distinct categories: `Speckle 2 BIM` and `Speckle 2 Revit`. You'll find a tab for each of them in Grasshopper when you install the GH Connector.

### The "Speckle 2 BIM" Tab

![Speckle BIM](./img-gh/speckle-bim.png)

The `Speckle 2 BIM` tab holds all components that can create _generic_ BIM elements. These are the most basic BIM elements supported by Speckle, and consist on the minimum amount of information required to make them work.

![Example of simple floor, wall and level](./img-gh/gh-bim-BuiltElements.png)

### The "Speckle 2 Revit" Tab

![Revit-bim](./img-gh/revit-bim.png)

The `Speckle 2 Revit`tab holds all the components that can create _Revit specific_ BIM elements. These elements require a higher amount of data from that is specific to your Revit Project, such as _family name_, _type_, _parameters_, etc... but they also provide a higher level of control when targeting Revit.

![Example of revit wall floor and level](./img-gh/gh-bim-RevitElements.png)

::: tip Did you know?

You can share all your Revit project information through Speckle, including all available families in the project, so you won't have to guess!

Follow our [Revit to GH guide](https://speckle.systems/tutorials/create-revit-bim-models-in-grasshopper/) for more details.
:::

#### Updating Revit Parameters

Sometimes you might just want to update Revit parameters from Grasshopper rather than creating new elements.
For this we have created a "ParameterUpdater" component.

![image](https://user-images.githubusercontent.com/2679513/142267411-fb9149f9-b878-4dc9-a2ec-2102d1bef90f.png)

It takes as inputs:

- a Revit element ID (ElementId or UniqueId)
- one or more **Parameters**

![image](https://user-images.githubusercontent.com/2679513/142267701-2de399b3-8f5c-4b7c-b7a0-d388a7175f7d.png)

Each Parameter will have:

- a name, either a the Revit display name, BuiltInParameter name or GUID (for shared parameters)
- a value
- (optional) Speckle units (_mm, cm, m, km, in, ft, yd, mi, none_)

Here’s how units are handled:

- if updating a _length based_ parameter (eg Base Offset) you don’t need to set the units. Speckle will automatically pick the ones in the current Rhino document and convert them to Revit (unless you want to override them)
- if updating a _non-length based_ parameter (eg Air FLow) you should set the units to `none`. Speckle will then simply assume the value used matches the _display units being used in Revit_ (eg L/s) and will not convert them.
- Speckle currently does not support converting non-length base units

![image](https://user-images.githubusercontent.com/2679513/142268627-e3dbf093-e306-4ffb-b4ed-f39014caf6b4.png)

### Using Grasshopper BIM

In simple scenarios, Grasshopper BIM works by assigning a new `@speckleSchema` property to a given geometry, such as a line. Once these objects are received in a BIM capable software (like Revit), our Revit Connector will detect this special property and generate the corresponding Revit element instead of a model curve.

The example bellow creates a `Floor` using a rectangle. If you expand the resulting `Polyline`'s properties, you can see the `@speckleSchema` property is present and it's type is `Objects.BuiltElements.Floor`

![Polyline with floor speckle schema attached](./img-gh/gh-bim-be-floor.png)

For more complex scenarios, where attaching a schema to the object is not viable, the result of the node will directly be the BIM object of choice, and it will contain all the geometric objects inside it.

The example bellow creates a `DirectShape` from a list of spheres. Since Revit's DirectShape allows you to add more than one geometry to each DS, the output of the node will be a `Objects.BuiltElements.Revit.DirectShape` with the list of geometries attached to it's `@baseGeometries` property.

![Direct shape from list of spheres](./img-gh/gh-bim-DS.png)

#### Understanding the schema conversion option

Each `Grasshopper BIM` node has an option that allows the user to select between two different types of conversion:

- Convert as `Schema Object`
- Convert as `Geometry(Line,Curve,Mesh...)` with `Schema(Beam, Floor...)` attached.

The precise language of the options varies depending on the BIM element you are trying to create, take for example the `Beam` node:

![Schema conversion option for a Beam](./img-gh/speckle-gh-schema-option.png)

This option allows you to switch between generating `Speckle BIM` elements directly, or treat them as geometry with a special property attached (`@speckleSchema`). The advantage of selecting one over the other depends on your preference:

- When targeting exclusively BIM applications, it makes sense to use the _default setting_ (`Convert as Schema Object`), as the data will be organised in a way that is relatable to BIM users (such as beams, columns, slabs, etc...)
- When your data is going to be consumed primarily as geometry in other applications, but needs to play nice in some BIM application as well, then it may make more sense to treat this objects as **geometry first**, and attach the BIM information to that geometry.

They will both be received as **native BIM elements** in any target BIM application, so essentially, there is no difference between the two in the way they will behave, and you can even have both types of objects mixed in the same commit.

When the **Convert `Geometry` with `Schema` attached** option is enabled, the output will display a visual hint to indicate to the user this behavior is occurring, and allow to distinguish between nodes with different state options active:

![Output visual hint](./img-gh/gh-schema-convertOption-nodesSimple.png)

You can _expand_ the generated objects further to inspect differences:

![Difference in conversion methods](./img-gh/gh-schema-convertOption-nodes.png)

As you can see, the resulting objects are quite different, but contain essentially the same information (one as `Geometry -> BIM Element` and the other as `BIM Element -> Geometry`).

##### Setting the default behavior

By default, any `BIM Element` node uses the `Convert to Schema Object` option. You can modify this behavior in your Grasshopper installation using the `Speckle 2` menu in the top menu bar.

![Default conversion option](./img-gh/gh-schema-defaultconversion-menu.png)

This setting will be recorded in your Grasshopper installation, and will only affect all newly created nodes.

### Schema Builder

::: tip

The _Schema Builder_ exists to allow the GH connector to read and create _schema objects_ from any available kit.

If you're just using the **Objects Kit**, our recommended approach is to use the individual nodes in the `Speckle 2 BIM` and `Speckle 2 Revit` tabs.

:::

![Schema Builder node](./img-gh/nodes-schema-builder.png)

The **Schema Builder** node is a very powerful one. It works similarly to the node above as it allows to create custom objects, but it does so by following pre-existing schemas. To learn more about [schemas and kits](/dev/kits) check out or dev section.

By default, the Schema Builder node comes with a series of types, these include mainly building elements to enhance interoperability between Rhino/Grasshopper and other BIM software solutions like Revit.

When a new **Schema Builder** node is created, a pop-up window will be displayed prompting the user to select a specific object schema. This schema will be used to populate the input/output ports of the node with the appropriate fields.

![Schema builder pop-up](./img-gh/nodes-schema-builder-popup.png)

::: tip
Check out our [tutorial on sending data from Grasshopper to Revit](https://speckle.systems/tutorials/process-revit-bim-models-in-grasshopper/)!
:::

## Object Conversion

By default, the Speckle nodes will try to convert any compatible objects (such as meshes, solids, lines and points):

- **On Input**: to Speckle compatible format.
- **On Output**: to the native Rhino format that Grasshopper will understand.

There are some situations where this behavior may not be ideal, as it may cause unintentional data-loss. This is particularly true when dealing with nested data.

Speckle can handle nested Speckle objects without any issues but, due to limitations in the Rhino API, you can only attach text to a specific geometry object's custom data, such as a line.

![Creating a Speckle line with custom data attached](./img-gh/speckle-gh-conversion-createNestedLine.png)

Since any valid geometry objects will be automatically converted to their Rhino representation when they're output by a node, this _non-supported_ data will be _"lost"_.

In order to provide a work-around to this problem, all nodes that perform conversions have an "Do not convert" option in the right-click menu, that will prevent conversion from occurring on that specific node.

![Do not convert menu item](./img-gh/speckle-gh-conversion-menuitem.png)

::: details Handling geometry objects with nested data

Following the example above, we package and send the custom Speckle Line.

![Send custom line and normal rhino line](./img-gh/speckle-gh-conversion-send.png)

After receiving the data, when expanding Speckle objects you'll have several options:

1. Default behavior when receiving data: Automatic conversion to Rhino objects
   ![Expand and convert](./img-gh/speckle-gh-conversion-expandAndConvert.png)
2. Behavior when "Do not convert" options is enabled: Output is a Speckle Line
   ![Expand but don't convert](./img-gh/speckle-gh-conversion-expandAndNoConvert.png)

Now you can access the custom data attached to the line:

![Access line custom data](./img-gh/speckle-gh-conversion-accessCustomData.png)

:::

::: tip
Don't worry, we always ensure all objects are converted to Speckle format before preforming a `Send` operation.
:::

::: warning Changing document units
If you ever change the units of your Rhino document, make sure you recompute the entire Grasshopper definition (press `F5`) to ensure the change is properly propagated to all nodes.
:::

## Using the C#/Python script nodes

For more advanced scenarios, you can also use the Speckle libraries inside your custom C# or Python scripts in any Grasshopper definition. There is, though, a bit of a set up involved for this to properly work.

::: tip Fair warning

About creating your own objects in scripting nodes: Creating objects with [`circular references`](https://en.wikipedia.org/wiki/Circular_reference) is **not supported**, and although there is nothing stopping you from creating this types of object relationships in your code, they will fail to be sent to the server (or any other transport for that matter).

That said, they **will work** inside your Grasshopper definition, but we heavily suggest you don't. If you end up doing so (for whatever reason we don't want to know... 😉), just make sure you remove all those nasty `circular references` before sending.

:::

### C# Script

1. Create a new C# node on your canvas.

   ![](./img-gh/speckle-gh-script-csharpNode.png)

2. Right-click the node and select `Manage assemblies...` from the dropdown menu.

   ![](./img-gh/speckle-gh-script-assemblyMenu.png)

3. A new window will appear. Press the `Add` link to select a new library. You'll need to add **two libraries**:
   1. Find the location of the Speckle Rhino+Grasshopper connector. It should be in `%appdata%\McNeel\Rhinoceros\7.0\Plug-ins\SpeckleRhino2 (8dd5f30b-a13d-4a24-abdc-3e05c8c87143)` and select `SpeckleCore2.dll` (make sure to use the right Rhino folder based on your installed version).
   2. Now head to `C:\Windows\Microsoft.NET\assembly\GAC_MSIL\netstandard\v4.0_2.0.0.0__cc7b13ffcd2ddd51` and select `netstandard.dll`
4. Once done, it should look like this:

   ![](./img-gh/speckle-gh-script-assemblies.png)

5. Now open up your script and add the following lines of code:

   ```csharp
   var speckleObject = new Speckle.Core.Models.Base();
   speckleObject["aProperty"] = "A property value";
   speckleObject["aListProperty"] = new List<double>{ 1, 2, 3, 4, 5 };
   A = speckleObject;
   ```

   ![](./img-gh/speckle-gh-script-code.png)

6. This will output a `Base` object, to see the properties inside it you can always use `Expand Speckle Node`

   ![](./img-gh/speckle-gh-script-final.png)

### Python Script

The process to use Speckle in a python script is similar to the C# node steps, only this time, we'll reference the assemblies directly in our code using `clr`.

1. Add a new python node to your canvas
2. Double click it to open the editor, and paste this code to reference the libraries (remember to replace `USERNAME` for the actual name in your computer)

   ```python
    import clr
   clr.AddReferenceToFileAndPath("C:\\Windows\\Microsoft.NET\\assembly\\GAC_MSIL\\netstandard\\v4.0_2.0.0.0__cc7b13ffcd2ddd51\\netstandard.dll")
   clr.AddReferenceToFileAndPath("C:\\Users\\USERNAME\\AppData\\Roaming\\Grasshopper\\Libraries\\SpeckleGrasshopper2\\SpeckleCore2.dll")
   import Speckle.Core.Models.Base as Base
   ```

3. Bellow that, add this code to create a new Speckle object.

   ```python
   speckleObject = Base()
   speckleObject["aProperty"] = "A single item value"
   speckleObject["aListProperty"] = [ 1, 2, 3, 4, 5 ]
   a = speckleObject
   ```

4. Your final result should look like this:
   ![](./img-gh/speckle-gh-script-pythoncode.png)

5. And that's it! The output will be a `Base` object you can operate with just like any other created with the `Object Management` nodes.

## Nodes

### Send Node

![Send node](./img-gh/nodes-send.png)

The **Send Node** performs sending operations, usually to a Speckle Server, but also supports sending to a different data storage using _transports_. Whenever possible, the _Send_ node wil try to convert any Rhino-compatible objects into Speckle format.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Input

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Message_: The message you want to attach to the _commit_ when you send the data. Defaults to `"Grasshopper push"`.
- _Data_: This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.

#### Output

- _Stream_: The _commit url_ pointing to the objects in the Speckle server.

#### Extra options

##### Variable inputs

Just as in the `Create Speckle Object` node, you can add as many inputs as necessary. In the `Send` node, all inputs are set to `tree` to accept any type of information and grasshopper data structure.

![Send node variable input behaviour](./img-gh/gh-send-variableinput.gif)

##### Send automatically

There is also an option to set the node to automatically send every time there is a change in the data. You will find this option in the right-click menu of the node.

| ![Activating auto mode in sender](./img-gh/nodes-send-automode-activate.png) | ![Auto-send mode active in sender](./img-gh/nodes-send-automode-active.png) |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |


##### Detach input data

This option is enabled by default in all inputs, but it can be disabled on a per-input basis on the right-click menu of each input.

You can find a more detailed explanation of this option [here](#detachdo-not-detach).

### Receive Node

![Receive node](./img-gh/nodes-receive.png)

The **Receive Node** fetches data from a specified `Stream` or any other valid `Transport`. Whenever possible, the receiver node will try to convert all Speckle objects into Rhino-compatible objects.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Outputs

- _Data_: The data that was received from the stream.

#### Extra options

##### Expand received object

**Enabled by default**. This will expand the received object to expose it's properties. If the specific speckle object has a supported conversion, it will be converted instead (i.e.: a point, line, mesh)

This option can be disabled in the right-click menu of the Receive node.

Here's a quick animation of the process:

![Receive node with expand option active](./img-gh/gh-receive-variableoutput.gif)

##### Do not convert

Similar to the `Do not convert` option in `Create Speckle Object` node, it will prevent any conversion from happening and output Speckle objects instead.

##### Receive automatically

There is also an option to set the node to automatically send every time there is a new commit on the stream. You will find this option in the right-click menu of the node.

This option is not available when the input stream url points to a specific `commit` or an `object`.

### Local Send Node

![Send local node](./img-gh/nodes-send-local.png)

The **Local Send** node performs sending operations directly to the users's local database.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Data_: The data to be sent locally. This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will perform the conversion to Speckle automatically.

#### Outputs

- _localDataId_: The unique `id` for the data that was locally sent.

### Local Receive Node

![Receive local node](./img-gh/nodes-receive-local.png)

The **Local Receive** node performs receive operations in the same way as the [Receive node](#receive-node). The only difference is that data is received locally from the Speckle's user local database, instead of the server or any other transport.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _localDataId_: The unique `id` for the data you want to fetch locally. This would be provided from a [Local Send node](#local-send-node)

#### Outputs

- _Data_: The data that was received. This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will perform the conversion to Speckle automatically.

### Synchronous Send Node

![image](./img-gh/gh-sendSync.png)

The **Synchronous Send** node performs receive operations in the same way as the [Send node](#send-node) but synchronously and it will lock the canvas.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Input

- _Data_: This port will accept almost anything you give it. If the objects provided are not `Base` objects, it will also perform the conversion to Speckle automatically.
- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Message_: The message you want to attach to the _commit_ when you send the data. Defaults to `"Grasshopper push"`.

#### Output

- _Stream_: The _commit url_ pointing to the objects in the Speckle server.

### Synchronous Receive Node

![image](./img-gh/gh-receiveSync.png)

The **Synchronous Receive** node performs receive operations in the same way as the [Receive node](#receive-node) but synchronously and it will lock the canvas.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Outputs

- _Data_: The data that was received from the stream.

### Create Speckle Object

Please refer to the [Creating custom objects](/user/grasshopper.html#creating-custom-objects) section.

### Create Speckle Object by Key/Value pairs

![Create object by key/value](img/nodes-create-object-keyval.png)

This node will create a new Speckle object using a list of `Keys` to be used as the object's properties, and a list of values (or nested list) to assign to each property.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

> When using this component, there is no option to specify a properties `detached` state, so all properties will be detached by default.

![Creating an object with keys and values as items](./img-gh/nodes-create-keyval-item.png)

![Creating an object with keys and values as lists](./img-gh/nodes-create-keyval-list.png)

> Notice when creating list items, the data structure must match. Meaning, the keys and values for each object must start with the same branch index.

### Deconstruct Speckle Object

![Expand Object node](./img-gh/nodes-expand-object.png)

> This node used to be called `Expand Speckle Object`

The **Deconstruct Speckle Object** works in the exact opposite way as the [Create Speckle Object](#create-speckle-object). When a `Base` object is plugged into the input, it will automatically create the outputs for each of the `Base` objects' properties.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- `Speckle Object`: The Speckle object to extract the properties from.

#### Outputs

Outputs are dynamically generated according to the specific Base objects that have to be expanded.
All outputs will appear in alphabetical order regardless on the order they were created/added to the object.

### Get Speckle Object Keys

#### Inputs

- `Speckle Object`: The Speckle object to extract the properties from.

#### Outputs

- `Keys`: The list of keys available for each object as text or, if the option is enabled, a unique list containing all available keys in any of the objects.

### Extend Speckle Object

![Extend object node](./img-gh/nodes-extend-object.png)

The **Extend Speckle Object** node provides a way to add new properties to an already existing `Base` object using _variable parameters_.

#### Inputs

- _Speckle Object_: The Speckle object to be extended.

::: tip Variable inputs
You can add or remove inputs just like you would with the `Create Speckle Object` node.
:::

#### Outputs

- _Speckle Object_: The extended/updated Speckle `Base` object.

### Extend Speckle Object by Key/Value

![Extend object by key/value node](./img-gh/nodes-extend-object-keyval.png)

The **Extend Speckle Object by Key/Value** provides a way to add new properties to an already existing `Base` object.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

- _Speckle Object_: The Speckle object to be extended.
- _Keys_: The Keys to extend the object with. When an existing key is overriden, a warning will be displayed.
- _Values_: The values to assign to each individual key. Works in the same way as the [Create Object by KeyValue node](#create-speckle-object-by-keyvalue-pairs)

#### Outputs

- _Speckle Object_: The extended/updated Speckle `Base` object.

### Schema Builder

Please refer to the [Using the Schema Builder](/user/grasshopper.html#schema-builder) section.

<!-- > This node is capable of [Kit Selection](#object-conversion-and-kits) -->

#### Inputs

Inputs are dynamically generated based on the user-selected schema.

#### Outputs

Output is dynamically generated based on the user-selected schema.

### Accounts Node

![Accounts node](./img-gh/nodes-accounts.png)

The **Accounts** node provides a fast way of selecting different Speckle accounts. Uses the native grasshopper

> Accounts must be set-up in your computer using the **Speckle Manager**. If no accounts are shown after setting up the solution

### Create Stream

![alt](./img-gh/nodes-create-stream.png)

The **Create Stream** node allows for the quick creation of a new stream. This stream will have default name and description, so it may be a good idea to edit that at some point.

Once an account has been provided, the node will generate a new stream and remember it for as long as the node exists in the canvas. This means the only way to create another new stream is to use a new `Create Stream` component.

#### Inputs

- _Account_: A Speckle account, provided by the **Accounts Node**.

#### Outputs

- _Stream_: A `Stream` object pointing to the newly created stream.

### Get Stream

![Stream get node](./img-gh/nodes-stream-get.png)

The **Get Stream** node will try to find an existing `Stream`, given its unique `id` (or its `stream url`) and a specific account to access that stream with.

::: tip
You can also use a stream URL copied from your browser instead of using this node.
:::

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Account_: A Speckle account, provided by the **Accounts Node**. If no account is provided, the _default account_ will be used.

#### Outputs

- _Stream_: A `Stream` object. If the stream doesn't exist, an error will be shown.

### List Streams

![Stream list node](./img-gh/nodes-stream-list.png)

The **List Streams** node returns a specified amount of streams available in an account. For performance reasons, it has been limited to fetching a maximum of 20 streams.

::: tip
You can also use a stream URL copied from your browser instead of using this node
:::

#### Inputs

- _Account_: A Speckle account, provided by the **Accounts Node**. If no account is provided, the _default account_ will be used.
- _Limit_: The number of streams to fetch from the server.

#### Outputs

- _Streams_: List of `Stream` objects available to the specified account.

### Stream details

![Stream details node](./img-gh/nodes-stream-details.png)

The **Stream Details** node returns all relevant information related to a specific `Stream`.

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.

#### Output

- _Stream ID_: The unique `id` that identifies the stream.
- _Name_: The name of the stream.
- _Description_: The description of the stream.
- _Created at_: The date this stream was created.
- _Updated at_: The date marking the last time the stream was updated.
- _Public_: Boolean value indicating if the stream has _link sharing_ enabled.
- _Collaborators_: A list of collaborators that have access to this stream, as well as their roles.
- _Branches_: A list of available branches for this stream.

### Stream Update

![Stream update node](./img-gh/nodes-stream-update.png)

The **Stream Update** node allows for updating the _name_, _description_ and _link sharing_ (which will make your data publicly available to read by anyone with the _stream url_)

#### Inputs

- _Stream_: Supports any generated stream from within the `Stream` component category, but also _stream urls_ in text format.
- _Name (optional)_: Text string with the new name for the stream.
- _Description (optional)_: Text string with the new description for the stream.
- _Public_: Boolean value to activate/deactivate this stream's _link sharing_.

#### Output

- _Stream ID_: A `Stream` url pointing to the updated stream.

### Developer Tools

These nodes where developed exclusively for testing/development purposes. If you don't know what these are, you most likely won't ever need them.

#### Convert to Speckle Node

![Convert to Speckle node](./img-gh/nodes-convert-tospeckle.png)

The **Convert to Speckle** node will try to convert any Rhino objects (such as lines, curves, meshes...) into Speckle objects.

This node works **recursively**, meaning that if given any non-convertible `base` object, it will traverse through the properties and try to convert each value, leaving the structure intact.

::: warning

This node was developed for testing/development purposes.

:::

#### Convert to Native Node

The **Convert to Native** node will try to convert any Speckle objects into Rhino compatible objects.

This node works **recursively**, meaning that if given any non-convertible `base` object, it will traverse through the properties and try to convert each value, leaving the structure intact.

::: warning

This node was developed for testing/development purposes.

:::

#### Serialize Speckle objects Node

![alt](./img-gh/node-serialize.png)

The **Serialize objects** node will convert any Speckle object into `JSON` formatted text.

#### Deserialize Speckle objects node

![alt](./img-gh/nodes-deserialize.png)

The **Deserialize Objects** node will convert a serialized speckle object in json format into `Base` speckle objects.

#### Send to Transport

![](./img-gh/nodes-transports-send.png)

Sends an object to a specified transport and returns the `id` of the object.

#### Receive from Transport

Receives an object from the specified transport using it's `id`

![](./img-gh/nodes-transports-receive.png)

#### SQLite Transport

![SQLite Transport](./img-gh/nodes-transport-sqlite.png)

Creates a connection to a specific SQLite database.

#### Disk Transport

![Disk transport](./img-gh/nodes-transport-disk.png)

Creates a connection to a specific file in the computer's disk, where the data will be saved in JSON format.

#### Memory Transport

![Memory transport](./img-gh/nodes-transport-memory.png)

Creates a connection to in-memory storage.

#### Flatten Collection

> Introduced in 2.14

![Flatten collection](./img-gh/gh-collections-flatten-node.png)

Returns a flat list of any deeply nested collections within an existing collection/model.

This node makes it easier to obtain the geometry elements within complex commit object structures (such as Rhino nested layers or Navisworks tree structure).

::: tip Example

For a given layer structure in Rhino you can easily extract the information from all the layers in grasshopper

![Rhino nested layers](./img-gh/gh-collection-rhinoExample.png)
![Grasshopper flattened rhino model](./img-gh/gh-collection-receive-and-flatten.png)

Finally, the output collections can be expanded to expose their inner properties:

![Accessing the elements geometry](./img-gh/gh-collection-geometry-elements.png)

:::
