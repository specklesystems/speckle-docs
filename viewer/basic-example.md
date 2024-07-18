# Basic Example

Let's explore the most basic Speckle viewer example, step-by-step.

Before we can do anything, we'll need a HTML container for the viewer.

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

First thing we want to do is to create and initialize a viewer instance.

```ts
/** Get the HTML container */
const container = document.getElementById("renderer");

/** Create Viewer instance */
const viewer = new Viewer(container);
/** Initialise the viewer */
await viewer.init();
```

Next, let's add a camera controller so we have control over the camera.

```ts
/** Add the stock camera controller extension */
viewer.createExtension(CameraController);
```

Finally, let's load in some data from a Speckle model. It's easier to use the provided `UrlHelper` which knows how to parse various speckle URL formats

```ts
/** Create a loader for the speckle stream */
const urls = await UrlHelper.getResourceUrls(
  "https://app.speckle.systems/projects/7591c56179/models/32213f5381"
);
for (const url of urls) {
  const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
  /** Load the speckle data */
  await viewer.loadObject(loader, true);
}
```

Here is the end result:

<iframe src="https://codesandbox.io/embed/jf4ccn?view=preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Basic Setup"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
