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
    <div id="renderer" style="width:100%;height:100%;left:0px;top:0px;position:absolute" </div>

    <script src="src/index.ts"></script>
  </body>
</html>
```
Now save this HTML snippet as `index.html`

Next we'll create the typescript file: 

```typescript
import { Viewer, DefaultViewerParams, SpeckleLoader } from "@speckle/viewer";
import { CameraController } from "@speckle/viewer";

async function main() {
  /** Get the HTML container */
  const container = document.getElementById("renderer");

  /** Create Viewer instance */
  const viewer = new Viewer(container, DefaultViewerParams);
  /** Initialise the viewer */
  await viewer.init();

  /** Add the stock camera controller extension */
  viewer.createExtension(CameraController);

  /** Create a loader for the speckle stream */
  const loader = new SpeckleLoader(
    viewer.getWorldTree(),
    "https://latest.speckle.dev/streams/92b620fb17/objects/801360a35cd00c13ac81522851a13341",
    ""
  );
  /** Load the speckle data */
  await viewer.loadObject(loader, 1, true);
}

/** Call our function, which we named 'main' */
main();
```
Now save this typescript snippet as`index.ts`

The result:

<iframe src="https://stackblitz.com/edit/speckle-basic-setup?embed=1&file=package.json"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="brave-engelbart-63rfsz"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
