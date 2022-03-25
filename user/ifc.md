# IFC Import Service

Speckle can now process IFC files and store them in your st reams. You can then receive them in other applications and access them from the Speckle API.

> This was made possible thanks to the amazing IFC.js Open Source project! 🙌🏼

Our **Import IFC** service can be found in the Stream page sidebar, right under the `Globals` section:

![IFC Import](./img-ifc/ifc-sidebar.png)

Once selected, you'll see the IFC Import panel with 2 main sections:

![IFC Panel Sections](./img-ifc/ifc-panels.png)

## Upload new files

To upload new files, just drag and drop the `.ifc` file from your computer into the panel. A new item will appear bellow the "drag-and-drop" zone indicating the file was successfully added.

![Drag and drop new file](./img-ifc/drag-drop-new-file.gif)

For each file, you can specify what branch of the stream to upload and save to (by default it will be sent to `main`) by selecting the branch name from the drop-down menu.

Once ready, press `Upload` to start the process. The item will then be moved to the `Previous Uploads`.

![Start import process](./img-ifc/select-branch-and-upload.gif)

## Previous Uploads

Here you'll be able to view the list of previously uploaded ifc files in that specific stream.

It will also report the current status of the import operation:

1. `Converting`: the operation is still on-going, or is queued to start.

   ![Converting status](./img-ifc/previous-uploads.gif)

2. `Error`: the import operation failed. You can hover the error for more details on what went wrong.

   ![Error status](./img-ifc/upload-error.png)

3. `View Commit`: the import operation succeeded, and there's a new commit on the selected branch. Click on the button to view it.

   ![Success status](./img-ifc/upload-complete.png)

You can also download the original `.ifc` file that was used to create this commit at any point in the future by pressing the `download` icon on the left-hand side of the file name.

![Download link](./img-ifc/upload-download.png)

## Final result

The result will be available directly in the 3D viewer, and can be received in other applications. Here's a quick example:

<iframe src="https://speckle.xyz/embed?stream=d9f76faff3&commit=3e47b02175" width=600 height=400 />
