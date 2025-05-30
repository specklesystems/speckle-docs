---
title: Loading Data
deprecationMessages: viewer
---

<Banner />

# Loading Data

You can load data into the speckle viewer virtually from any source as long as you provide an appropriate loader suite.

## Speckle Data
The viewer comes with a builtin speckle loader. Here's an example of how to get things going:
```ts
const urls = await UrlHelper.getResourceUrls(
  "https://app.speckle.systems/projects/7591c56179/models/32213f5381"
);
for (const url of urls) {
  const loader = new SpeckleLoader(viewer.getWorldTree(), url, "");
  /** Load the speckle data */
  await viewer.loadObject(loader, true);
}
```

## Other Data Sources
By creating your own loaders you can load data from various input sources. The viewer library only come with a barebones OBJ loader in addition to the speckle loader. 

```ts
const objUrl: string = '<your OBJ resource URL>'
/** Create a loader for the .obj data */
const loader = new ObjLoader(viewer.getWorldTree(), objUrl);
/** Load the obj data */
await viewer.loadObject(loader, true);
```
Alternatively, you can load the OBJ from an OBJ file contents as `string` or `ArrayBuffer`
```ts
const objData:string | ArrayBuffer = '<your OBJ resource data>'
/** Create a loader for the .obj data */
const loader = new ObjLoader(viewer.getWorldTree(), '<user defined id>', objData);
/** Load the obj data */
await viewer.loadObject(loader, true);
```
You can run the example live [here](https://stackblitz.com/edit/speckle-obj-loader?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId="speckle-obj-loader" :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" />