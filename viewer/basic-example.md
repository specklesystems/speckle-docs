# Basic Example
We'll be exploring the most basic speckle viewer example in a step-by-step fashion

Before we can do anything, we'll need a html container for the viewer. Let's take the most simple examples
```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>

  <body>
    ...
    <div id="renderer">
    ...
  </body>
</html>
```
First thing we want to do is to create and initialize a viewer instance
```ts
/** Get the HTML container */
const container = document.getElementById("renderer");

/** Create Viewer instance */
const viewer = new Viewer(container);
/** Initialise the viewer */
await viewer.init();
```
Next, let's add a camera controller so we have control over the camera
```ts
/** Add the stock camera controller extension */
viewer.createExtension(CameraController);
```
Finally, let's load in some data from a speckle stream
```ts
/** Create a loader for the speckle stream */
const resource = "https://latest.speckle.dev/streams/c43ac05d04/objects/d807f3888a400dbd814529fafd8ccac0"
const loader = new SpeckleLoader(viewer.getWorldTree(), resource, "");

/** Load the speckle data */
await viewer.loadObject(loader, true);
```
Here is the endresult:

<iframe src="https://codesandbox.io/embed/jf4ccn?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
    style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
    title="Basic Setup"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>