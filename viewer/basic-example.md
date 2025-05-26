---
title: Basic Example
deprecationMessages: viewer
---

<Banner />

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
  "https://app.speckle.systems/projects/24c98619ac/models/38639656b8"
);
for (const url of urls) {
  const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
  /** Load the speckle data */
  await viewer.loadObject(loader, true);
}
```

You can run the example live [here](https://stackblitz.com/edit/speckle-basic-setup?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId="speckle-basic-setup" :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" />
