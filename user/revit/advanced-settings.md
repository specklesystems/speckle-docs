---
title: Settings
---

# Connector Settings

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 Revit connector.</span>
  <span class="next-gen">Next Gen connectors are coming soon, bringing significant changes to the documentation and features!</span>
</div>

The `Advanced Settings` page allows you to customize the way Speckle behaves "per-project".

<div style="text-align: center;">
    <img class="rounded-dropshadow" src="./img-revit/advanced-settings.png" width=350 display=block>
</div>

## 1. Reference Point

<img class="rounded-dropshadow" src="./img-revit/setting-reference-point.png" width=350>

This setting lets you specify which reference point should be used when sending or receiving data.

Available options are:

1. **Internal Origin** (default)
2. P**roject Base** point
3. **Survey Point**

## 2. Send Linked Models

By default, Speckle will only send data from the current model, without including any elements from any *Linked Models* (if they exist). Check this option to control when you want to send all the information including Linked models.

## 3. Receive Linked Models

By default, Speckle will only receive data from the current model, without including any elements from any *Linked Models* (if they exist). Check this option when you want to receive all the information (including Linked models).

## 4. Fallback to DirectShape on Receive

<img class="rounded-dropshadow" src="./img-revit/setting-fallback-directshape.png" width=350>
Speckle allows to load any model to Revit as a DirectShape when only a mesh reference model containing no BIM data is needed.

Available options are:

1. **Always:** No native objects are created; everything is created as direct shapes with categories and materials assigned.
2. **On Error** (Default): Revit Connector tries to bring all objects as native types but in case of an error falls back to DirectShape mesh. This result is then visually consistent model with its rendering in Speckle viewer.
3. **Never:** If you want to load all objects as native, choose the `Never` option.

<aside>
💡 WARNING: Some objects might not be loaded, or the geometry might not be correct. Speckle’s aim is to support all types and workflows but while we get there, some inconsistencies can occur.

</aside>

## 5. Disallow Join for Elements

<img class="rounded-dropshadow" src="./img-revit/setting-disallow-join.png" width=350>

By default, Revit objects imported by Speckle will be joined. Objects joined in Revit can have very strange behavior, so this setting lets you select one or more types of objects to disallow joins by default before receiving.\*\*\*\*

Available Options are:

1. Architectural Walls
2. Structural Walls
3. Structural Framing

## 6. Mesh Import Method

<img class="rounded-dropshadow" src="./img-revit/setting-mesh-import.png" width=350>

This setting allows you to select the Mesh import method you'd like to use.

Available Options are:

1. **Default**: Speckle will convert any Meshes into Revit native meshes (DirectShapes), leading to them appearing with all their internal edges. This may not be desired depending on the geometry and density of the mesh.
2. **DXF**: To import meshes **without the inner edges**, you can select the `DXF Import` option. This will export the mesh into `DXF` format, and import it into your project. This way of exporting will also preserve colors and materials whenever possible.
3. **Family DXF**: The third option is similar to the second, but it will insert the resulting DXF into a new Family document, that will then be inserted into the project.

## 7. Missing Type Mapping

By default, Speckle will attempt to match your incoming Speckle objects with native Revit objects. It does this by trying to match the `Category`, `Family`, and `Type` properties of the Speckle object. This works well if you are importing standardized objects such as structural sections.

Suppose an object with a type "W12x19" is added to a Revit project. Speckle can easily recognize this object and match it to a type with the same name in the Wide Flange family, provided that family type is loaded in the project. If there isn't a family type loaded into Revit of the correct category and type , then Speckle will make it's best guess of which object type to match to.

To avoid this, you can use the object type mapping setting.

<img class="rounded-dropshadow" src="./img-revit/setting-missing-type.png" width=350>

Available options are:

- **Never**: Speckle automatically handles all the mapping for you.
- **Always**: Upon receiving a model version, you'll be presented with a table of incoming object types and the opportunity to assign a Revit type.
- **For New Types: Upon r**eceiving a model for the first time, you will be presented with a table that displays all incoming types. You can then map these types to the corresponding types in the Revit application, similar to the previous option. However, if you receive a newer version of the same model for a second time, the mapping dialog will only appear if there are new incoming types that the user has not yet mapped.
  If the next version has the same object types as the first, the previous custom mapping will be used, and you won't need to remap incoming types.

<img class="rounded-dropshadow" src="./img-revit/missing-type-notification.png" width=350>

### Importing External Families and Types

![import-types-dialog](./img-revit/import-types-dialog.png)

When you are in the mapping dialog and you want to import some object types, but you realize that you do not have those Revit types loaded into the project, you can click on the "Import Types" button. This will bring up the Import Family Types dialog, allowing you to select and import the necessary types.

To begin, the program will prompt you to select one or multiple Revit family files using a file dialog. Once you have selected the files, you will be able to browse through all the available types and import the ones you need. If a toggle appears grayed out, it indicates that the type is already present in the project.
