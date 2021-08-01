# Quality control AutoCAD drawings in Grasshopper

::: tip NOTE ❗️

All our tutorials have been migrated to out tutorials portal! 
Check them out 👉 [Tutorials](https://speckle.systems/tutorials/)

:::

>**Level:** Intermediate
>
>**Author:** Claire
>
>**Software used:** AutoCAD, Rhino, Grasshopper

**Quality control your AutoCAD drawings with the visual programming power of Grasshopper!**

In this tutorial, we'll send a floorplan from AutoCAD to Rhino with Speckle, run a simple Grasshopper script to find incorrectly drawn lines, and send the annotations back to AutoCAD. We'll also adjust some blocks in Rhino along the way.

![](./img-interop/autocad-rhinogh-intro.gif)

## Tutorial

Before getting started, make sure you have the [Speckle Manager](./manager.md) installed and an active account set up on a Speckle server. This tutorial uses AutoCAD 2021 and Rhino 7 - check that you have the Speckle 2.0 connectors installed for these applications.

With the setup completed, download the [AutoCAD](https://drive.google.com/file/d/1-2a16JwCKxR6nXDFJr2WHaX1jMJeNeTb/view?usp=sharing) and [Grasshopper](https://drive.google.com/file/d/1-4SgskLzdQMJ0ZmPUdZraTCALPcGqd75/view?usp=sharing) files for this tutorial.

1.  Open the AutoCAD file. The drawing is a simplified version of a sample dwg that comes installed with AutoCAD.
2.  Pull up the AutoCAD Desktop UI by typing `Speckle` in the command line, or by clicking on the Speckle 2 plugin in the Add-Ins tab in your ribbon.
3.  Open a new Rhino file and start Grasshopper by typing `Grasshopper` in the command line. Open the .gh file included with this tutorial.

### Send the AutoCAD Drawing to Rhino

Let's send our first stream to Speckle! Keep in mind that we'll use branches to organize our data in this tutorial.

1.  Create a new `Plan Coordination` stream and check that it's on **Sender** mode. If not, click the arrows on the top right corner to toggle between the two modes.
2.  Create a new `Annotations` branch by clicking on **main** in the bottom left of the stream and selecting _Add a new branch_ from the drop-down. Switch back to **main** after creating the new branch.
3.  Select all geometry in the file.
4.  Click the blue **Objects** button and select _Set Selection_ from the dropdown.
5.  Click **Send** on the `Plan Coordination` stream. Type `Drawing for review` in the comment line, and click **Send** again to commit the selected geometry.
6.  To view the drawing in the [Speckle Web App](./web.md), click the **Open in browser** icon in the top right corner of the stream. Keep this tab open for later.
7.  In Rhino Desktop UI, click the blue **Add a stream** button on the bottom. Add the `Plan Coordination` stream card to UI by clicking the arrow next to the stream in the popup window.
8.  Click the big **Receive** on button the stream and watch the drawing you just sent come into Rhino!

![](https://user-images.githubusercontent.com/2679513/127766823-cce36758-928c-4673-b373-1ee8d51f3a08.mp4)

### Run a Grasshopper Script to Identify Bad Lines

The sample plan drawing from AutoCAD has some messy lines with gaps or overlaps at the ends that need to be cleaned up. Now, we'll run a quick analysis in Grasshopper and send the results back to AutoCAD.

1.  Select all drawing lines in Rhino and set them in the input `Crv node` in Grasshopper by right-clicking the node and selecting _Select Multiple Curves_ from the dropdown.
2.  You should see small circles previewed on all curve ends that are not correctly adjoining other curves in the drawing! Adjust the `Radius` slider in the input to customize the size of these annotation circles.
3.  To send our annotations back to AutoCAD, get the `Annotations` branch URL from the Speckle Web App tab we opened in the previous section. Navigate to the `Annotations` branch page in the browser and copy this URL.
4.  In the Speckle section of the Grasshopper script, paste your copied URL into the text panel.
5.  Make sure you have a valid account selected for the stream server in the accounts node, and click **Send** in the Send Data node.
6.  Go back to AutoCAD and swap the `Plan Coordination` stream to receiver mode. Select the `Annotations` branch from the branch dropdown, and click **Receive**.
7.  The Grasshopper generated circles now appear in your file - change their layer color to red and use these as a guide to see which lines need to be fixed!

![](https://user-images.githubusercontent.com/2679513/127766842-6102a423-45d6-42fa-ab11-c85ac8bbefc9.mp4)

### Modify Drawing Blocks in Rhino

Finally, we'll make some changes to the door blocks and send them back to AutoCAD.

1.  Double-click a door block instance in the Rhino file to open block editing mode.
2.  Trim the end of the door swing curve to match the end of the door curve, and press enter to save block changes. Make the same change for any other door block definitions that need trimming.
3.  Open the Block Manager by typing `BlockManager` in the command line. Locate the door block definitions (left and right swing) and rename them by removing the stream commit prefix. Now they are ready for sending!
4.  Create a new `Block edits` branch in the `Plan Coordination` stream in Rhino.
5.  Select all door block instances, set the selection, and send them to this branch.
6.  Receive the new blocks in AutoCAD - open Block Manager to delete the old door blocks from your file, and rename the received block definitions by removing the commit prefix.

![](https://user-images.githubusercontent.com/2679513/127766853-421591b3-588b-48a1-b906-3c0b34137dec.mp4)

## Remarks

Block conversions in Rhino and AutoCAD are an early prototype, so we currently do not support nested block definitions or dynamic blocks. If you have feedback on this feature, hop over to our [community forum](https://speckle.community/c/making-speckle/10) and give us a shout!
