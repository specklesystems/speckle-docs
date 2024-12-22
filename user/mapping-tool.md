# Mapping Tool (alpha)

The Speckle Mapping Tool, is a new feature available in some of our connectors that allows for even greater control when sending CAD data to BIM software as it allows to map simple CAD geometry to native BIM elements.

For example, it allows to receive Rhino lines as beams in Revit, and so on.

::: tip 🚧 This feature is in WIP

This feature is currently being developed, so please treat it as a very early alpha and [report any bugs or suggest new ideas on our forum](https://speckle.community/t/mapping-tool-for-cad-bim-workflows/4086).

:::

Currently, the Mapping tool is only available for Rhino > Revit workflows; in the future it'll be expanded to others like AutoCAD > Archicad or Civil 3D > Tekla and so on.

## How Does it Work?

This feature relies on having some data such as families, types, levels etc, available, and the first step is to send these to Speckle form the BIM tool.
Then, you will be able to map these to the supported elements from within the CAD tool. And finally, you just need to send the mapped element from the CAD tool to the BIM one.

See below the required steps for a Rhino > Revit workflow.

### Revit Setup

In Revit create or open a document with all the levels, families and types that you're planning to use.
Then send to Speckle only its levels, families and types.

We recommend using a model for this, and updating it over time as you add more levels and types.

![image](https://user-images.githubusercontent.com/2679513/203250688-83d4cf52-d800-41be-b217-ac45cace6a9f.png)

### Rhino Setup

In Rhino, type the `SpeckleMappings` command, this will open up a new panel (Windows) or window (Mac) with the mapping tool.

![image](https://user-images.githubusercontent.com/2679513/203253776-f7899083-5e94-4264-8840-f4941f4b32e1.png)

Click on `Select Mapping Source` and select the project and model with the Revit data we just sent:

![select-mapping-source](https://user-images.githubusercontent.com/2679513/203254063-5cf9e507-ee22-4969-8613-696bb84b3f49.gif)

You're now ready to map!

::: tip ☝️ NOTE

The available elements depend on the provided families and types. So, if you Revit document did not have any Beam types available, this option will not be available in the Mapping tool.

:::

### Mapping Rhino Geometry to Revit Elements

After selecting a mapping source, you just need to select model elements of similar types, and set the respective mappings and properties, then click on Apply.

![mapping](https://user-images.githubusercontent.com/2679513/203260126-d0136aeb-9ec4-4358-8868-fa4e7e02bbc3.gif)

Finally, send these objects:

![mapping-selection](https://user-images.githubusercontent.com/2679513/203260338-76ae8c08-365d-496f-93ee-802645269e9b.gif)

And receive them in a Revit a project that has the needed types and levels:

![mapping-revit](https://user-images.githubusercontent.com/2679513/203261807-6c1eb95c-9433-4cf1-bb0b-00f597bcbf56.gif)

### Supported Mappings Rhino > Revit

| Rhino Geometry | Revit Element  |
| -------------- | -------------- |
| Extrusion      | Wall           |
| Mesh           | DirectShape    |
| Mesh           | Topography     |
| Brep           | DirectShape    |
| Point          | FamilyInstance |
| Block          | FamilyInstance |
| Surface        | Floor          |
| Line           | Beam           |
| Line           | Brace          |
| Line           | Pipe           |
| Line           | Duct           |
| Line           | Column         |
