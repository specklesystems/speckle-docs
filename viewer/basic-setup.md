---
title: Basic Setup
deprecationMessages: viewer
---

<Banner />

# Basic Setup

The first thing you'll need is a container for the viewer and a [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)/[typescript](https://www.typescriptlang.org/) script which will run the viewer code. 

We'll create a simple HTML and a simple typescript file
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Parcel Sandbox</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body>
    <div id="renderer" style="width:100%;height:100%;left:0px;top:0px;position:absolute" />

    <script src="src/index.ts"></script>
  </body>
</html>
```
Now save this HTML snippet as `index.html`

Next we'll create the typescript file: 

```typescript
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
} from "@speckle/viewer";
import { CameraController, SelectionExtension } from "@speckle/viewer";

async function main() {
  /** Get the HTML container */
  const container = document.getElementById("renderer");

  /** Configure the viewer params */
  const params = DefaultViewerParams;
  params.showStats = true;
  params.verbose = true;

  /** Create Viewer instance */
  const viewer = new Viewer(container, params);
  /** Initialise the viewer */
  await viewer.init();

  /** Add the stock camera controller extension */
  viewer.createExtension(CameraController);
  /** Add the selection extension for extra interactivity */
  viewer.createExtension(SelectionExtension);

  /** Create a loader for the speckle stream */
  const urls = await UrlHelper.getResourceUrls(
    "https://app.speckle.systems/projects/7591c56179/models/32213f5381"
  );
  for (const url of urls) {
    const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
    /** Load the speckle data */
    await viewer.loadObject(loader, true);
  }
}

main();

```
Now save this typescript snippet as`index.ts`

You can run the example live [here](https://stackblitz.com/edit/speckle-basic-setup?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId="speckle-basic-setup" :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" />




