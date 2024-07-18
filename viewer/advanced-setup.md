# Advanced Setup

The viewer can be extended with functionality via [extensions](/viewer/overview.md#extensions). The package already contains a few stock extensions that offer typical functionality.

Using our previous basic example, we can add the measurement tool for example

```typescript
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
  CameraController,
  MeasurementsExtension
} from "@speckle/viewer";


async function main() {
  /** Get the HTML container */
  const container = document.getElementById("renderer") as HTMLElement;

  /** Configure the viewer params */
  const params = DefaultViewerParams;
  params.verbose = true;

  /** Create Viewer instance */
  const viewer = new Viewer(container, params);
  /** Initialise the viewer */
  await viewer.init();

  /** Add the stock camera controller extension */
  viewer.createExtension(CameraController);
  /** Add mesurements extension */
  const measurements = viewer.createExtension(MeasurementsExtension);

  const urls = await UrlHelper.getResourceUrls(
    "https://app.speckle.systems/projects/7591c56179/models/32213f5381"
  );
  for (const url of urls) {
    const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
    /** Load the speckle data */
    await viewer.loadObject(loader, true);
  }

  measurements.enabled = true;
}

main();

```

<iframe src="https://codesandbox.io/embed/frmffj?view=preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Measurement Tool"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

Adding more extensions is easy, and all you need to do is call the viewer's `createExtension` function with the extension type you want to add.

Here is the complete list of available stock extensions:

| Extension             | Description                              |
| --------------------- | ---------------------------------------- |
| CameraController      | Provides basic camera orbit controls     |
| SelectionExtension    | Selection/hover effect, focus on objects |
| SectionTool           | Adds a customisable section box          |
| SectionOutlines       | Adds outlines to sectioned objects       |
| MeasurementsExtension | Provides measurement functionality       |
| FilteringExtension    | Filtering functionality                  |
| DiffExtension         | Diffing functionality                    |

All the available stock extensions are designed to work together, in order to offer the complete set of viewer functionality. To see all of them in action, you can checkout our [viewer-sandbox](https://github.com/specklesystems/speckle-server/tree/main/packages/viewer-sandbox) project, our [speckle frontend](https://app.speckle.systems/). Alternatively, you can also run the viewer-sandbox [here](https://viewer.speckle.systems/)
