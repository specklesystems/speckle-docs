# Rhino ➡ Revit

::: tip NOTE ❗️

All our tutorials have been migrated to out tutorials portal! 
Check them out 👉 [Tutorials](https://speckle.systems/tutorials/)

:::

>**Level:** beginner
>
>**Author:** Claire
>
>**Software used:** Revit 2021, Rhino 7

**Stream Rhino geometry directly into Revit with Speckle!**

In this tutorial, we'll send a sample building from Rhino into default `Floor`, `Wall`, `Facewall`, and `Column` and `Beam` families in Revit with the **ApplySpeckleSchema** command.

![](./img-interop/rhino-revit-intro.gif)

## Tutorial

Before getting started, make sure you have [Speckle Manager](./manager) installed and an active account set up on a server. This tutorial uses Rhino 7 and any supported version of Revit - check that you have the Speckle 2.0 connectors installed for these applications. Then, download the Rhino 7 file for this tutorial [here](https://drive.google.com/file/d/1FhMNXpmd3VR8OK_4riCvnAdMImXVmFAl/view?usp=sharing).

1.  Open the Rhino file. The model is organized into layers for each section of the model we will be sending.
2.  Pull up the Rhino Desktop UI by typing `Speckle` in the command line.
3.  Open a new Revit file, and open our Revit connector, which can be found in the Add-ins ribbon .

### Send Context Geometry as Breps

Let's send our first stream! Since we won't be sending the context geometry as families, the next steps are just a warm up (with some fun layer filtering action):

1. Create a new stream, name it `Context` and check that it is on **Sender** mode. If not, click the arrows on the top right corner to toggle between the two modes.
2. Click the blue **Objects** button and select _Set/Edit Objects Filter_ from the dropdown.
3. From the `Layer` filter tab, select _Context::Buildings_ and _Leadenhallish:Substructure_ and click **Set Filter**.
4. Click **Send** on the `Context` stream card.
5. In Revit Desktop UI, click the blue **Add a stream** button on the bottom. Add the `Context` stream by clicking the arrow next to the stream in the popup window.
6. Click **Receive** on the stream, and watch the geometry come in as generic models.

Overall, not a bad start - now let's do some serious sending!

![](https://user-images.githubusercontent.com/2679513/127766741-fbda5350-b0f0-400b-a698-cf2d9ccd8866.mp4)

### Send Ground Floor Geometry with Walls, Floors, and a Facewall

For the ground level of our building, we're going to send geometry as a mix of walls, floors, facewalls, and generic models for elements (like ramp surfaces) that are not currently supported.

Let's try using the **Automagic** ⚡ method, which automatically decides which schemas to apply to your selected geoemtry based on object and layer names as well as geometry type. Let's test this out and see which geometries were successfully assigned a schema:

1. Lock the context layers you sent from the previous section, and hide all layers except for _Leadenhallish::Ground Floor_ for ease of selection.
2. Type **ApplySpeckleSchema** in the command line - notice that the _Automatic_ command option toggle is by default set to _On_.
3. Select all objects in _Leadenhallish::Ground Floor_ and hit **Enter** to finish the command.
4. Now click through the geometry and check which pieces have been assigned a Speckle schema by navigating to the _Object > Properties > Attribute User Text_ panel.

You should see a **<SpeckleSchema,Floor>** keyvalue pair in the attribute user text panel of any planar horizontal surfaces on the ground floor. However, the planar vertical surfaces were not assigned a schema, even though they should be walls: this is because the automagic method picked up the word _Floor_ in the layer name and only tried to assign the `Floor` schema to all the selected objects! Let's manually set a wall schema for our vertical surfaces:

1. Select the vertical surfaces on the _Leadenhallish::Ground Floor_ layer.
2. Type **ApplySpeckleSchema** in the command line and set the _Automatic_ command option toggle to _Off_. Hit **Enter**.
3. The command now shows two options. Make sure _DirectShape_ is set to _Off_, and click on the _Schema_ option toggle to change the schema to _Wall_. Hit **Enter**.
4. Check the _Attribute User Text_ panel and you should see a **<SpeckleSchema,Wall>** entry now!
5. Repeat steps 1-4 for the curving surface on the ground floor, this time selecting the _Schema=Facewall_ option instead.

Create a new stream, name it `Ground Floor` and send all geometry from the _Leadenhallish::Ground Floor_ layer. In Revit, receive this stream and any objects that were assigned a schema will be converted as default Revit families.

![](https://user-images.githubusercontent.com/2679513/127766762-b5fd074e-eb30-417f-8456-dbb53e197f14.mp4)

### Send the Core Brep as Walls and Floors

Next, we'll send try to send the core geometry as `Wall` and `Floor` surfaces.

1. Lock the previous layer and unhide the _Leadenhallish::Core_ layer.
2. Select all geometry - notice that the core is modelled as a single brep.
3. Try to apply schemas automatically with the **ApplySpeckleSchema** command.
4. No schemas were assigned to the brep! We need to explode it first into surfaces: select the brep and type **Explode** in the command line.
5. Now try applying schemas again. Voila, floors and walls were assigned!
6. Create a `Core` stream and send the geometry to Revit

![](https://user-images.githubusercontent.com/2679513/127766776-70710229-9d4e-4ac5-b731-d5ec95908057.mp4)

### Send the Floor, Slabs and Truss to Complete the Model

To finish off our model, let's send the floor slabs and truss with the automagic method. We don't need to worry about missing schemas in the _Leadenhallish::Floor Slabs_ layer since it only has horizontal surfaces, and the truss curves in _Leadenhallish::Structure_ sublayers will be intelligently picked up as either `Column` or `Beam` objects!

1. Lock the previous layer and unhide _Leadenhallish::Structure_ and select _Leadenhallish::Floor Slabs_. Select all containing geometry.
2. Apply schemas automatically with the **ApplySpeckleSchema** command.
3. Cycle through some of the truss members to look at their assigned schema. Lines with < 45 degree deviation from vertical are assigned as columns, while all others are assigned as beams.
4. Create a new `Floors and Truss` stream and send to Revit. Go to Revit and receive it - our Leadenhall lookalike building is now complete!

![](https://user-images.githubusercontent.com/2679513/127766792-d6db9f93-9bc2-4e3f-b11f-92f17c2099b8.mp4)

## Remarks

Detailed information on the Rhino schema commands used in this tutorial can be found under the `Advanced User` section in the Rhino User Guide. This feature is an early prototype, so we currently do not offer control over specific family types during schema assignment: ⚠ all geometry with schemas are assigned a default type upon conversion into Revit.

To remove schemas applied during this tutorial and start over:

1. Type **RemoveSpeckleSchema** in the command line
2. Select objects to remove schemas from
3. Press **Enter** - Speckle AUT strings are now deleted from all selected objects!
