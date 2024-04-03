# Loading Data

You can load data into the speckle viewer virtually from any source as long as you provide an appropriate loader suite.

## Speckle Data
The viewer comes with a builtin speckle loader. Here's an example of how to get things going:
```ts
const objUrl = "https://speckle.xyz/streams/da9e320dad/objects/31d10c0cea569a1e26809658ed27e281"
const loader = new SpeckleLoader(viewer.getWorldTree(), objUrl);
await viewer.loadObject(loader, true);
```

## Other Data Sources
By creating your own loaders you can load data from various input sources. The viewer library only come with a barebones OBJ loader in addition to the speckle loader. Here's a code sandbox:

<iframe src="https://codesandbox.io/embed/pydvhz?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Obj Loader"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>