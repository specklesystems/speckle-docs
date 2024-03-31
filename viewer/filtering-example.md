# Filtering

All filtering functionality in the viewer is handled by the [`FilteringExtension`](/viewer/filtering-extension-api.md). In a nutshell you can:
- *Hide/show* objects
- *Isolate/unisolate* objects
- *Color* objects based on properties

All functions provided by the `FilteringExtension` take object ids as a means to select objects for filtering.
Like any other extension you need to add it at initialisation time
```ts
const filteringExtension = viewer.createExtension(FilteringExtension)
```

## Hiding and Showing

Let's say we want to hide all the walls of a model. First thing we need to do is to find out the ids of the walls we want to hide. Depending on the model, a wall object might mean different things, but let's consider a Revit example where a wall object has the `RevitWall` speckle type.
```ts
const wallNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
    if (!node.model.raw.speckle_type) return;
    return node.model.raw.speckle_type.includes("RevitWall");
});

const filteringState = filtering.hideObjects(
    wallNodes.map((node: TreeNode) => node.model.id)
);
```

## Isolating and Unisolating
Similar to hiding, let's say we want to isolate all floors
```ts
const floorNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
    if (!node.model.raw.speckle_type) return;
    return node.model.raw.speckle_type.includes("RevitFloor");
});

const filteringState = filtering.isolateObjects(
    floorNodes.map((node: TreeNode) => node.model.id)
);
```


## Coloring by Properties
This filtering operation is different than the ones before as it involves the notion of `properties`. The viewer needs `PropertyInfo` objects in order to filter by color, but that's fine because there's a builtin way of getting them by using
```ts
const properties: PropertyInfo[] = await viewer.getObjectProperties();
```
With properties available, we can now do some color filtering!
```ts
/** Find the 'level.name' property info*/
const propertyInfo: PropertyInfo = properties.find((value) => {
    return value.key === "level.name";
}) as PropertyInfo;

const filteringState = filtering.setColorFilter(propertyInfo);
```

Filters can be combined to a certain extent, but as a general rule of thumb, any particular object in the scene will always look how its last filter (if any) told it to look. 

Here's a code sandbox with all of the above combined in a simple app

<iframe src="https://codesandbox.io/embed/hz88rs?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Filtering"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>