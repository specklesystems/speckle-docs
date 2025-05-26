---
title: Loaders
deprecationMessages: viewer
---

<Banner />

# Loaders

The viewer provides a loader system which allows for virtually any data to be loaded in. The `SpeckleLoader` is an example of such loader that specialises on loading speckle data.

If we take a look at how the viewer loads data:

```typescript
loadObject(loader: Loader): Promise<void>
```

We see that it delegates the loading process to a `Loader` object that we specify. The `Loader` class is abstract and intentionally thin:

```ts
public abstract load(): Promise<boolean>
public abstract cancel()
public abstract dispose()
```

In order for data to correctly end up in the viewer's store, and all the built-in rendering features to work correctly, the loading process, regardless of how it's chosen to be implemented, needs to accomplish the following things:

1. Populate the viewer's `WorldTree` with nodes
2. Convert renderable incoming data into types the viewer can understand
3. Build a `RenderTree`

Populating the viewer's tree can be very generic, so the viewer doesn't impose anything in this step. However, traditionally, we make use of a `Converter` which takes in raw data, and builds and adds tree nodes to the tree.

Once the tree is populated, we need a way to turn renderable information contained in the tree in any form it may be in, to something that the viewer understands how to render. This is where the `GeometryConverter` comes in. It's a thin abstract class again and any geometry converter needs to implement the following:

```typescript
public abstract getSpeckleType(node: NodeData): SpeckleType
public abstract convertNodeToGeometryData(node: NodeData): GeometryData
public abstract disposeNodeGeometryData(node: NodeData): void
```

The up-to-date types the viewer works with can be found [here](/viewer/geometry-converter-api.md#speckletype), however internally the viewer doesn't rely that much on these types, and they are mostly relevant at conversion time.

The most important function than needs to be implemented by any geometry converter is `convertNodeToGeometryData` which takes tree nodes and builds `GeometryData` objects for them, which allow the viewer to render the objects correctly.

Once a geometry converter is implemented, you don't need to call any of it's method on your own. Everything will be called automatically in step 3, where we build the `RenderTree`. A [RenderTree](/viewer/viewer-rendering.md#rendertree) is simply a subtree of the WorldTree (or the entirety of it) with added rendering-related functionality. In order to build a RenderTree:

```typescript
const geometryConverter = new MyGeometryConverter();
renderTree.buildRenderTree(geometryConverter);
```

For examples of using our loading system and concrete implementations of `Loader` and `GeometryConverter` you can have a look at :

- [Speckle loader and converter](https://github.com/specklesystems/speckle-server/tree/main/packages/viewer/src/modules/loaders/Speckle)
- [OBJ loader and converter (geometry only)](https://github.com/specklesystems/speckle-server/tree/main/packages/viewer/src/modules/loaders/OBJ)

Additionally, [here](https://stackblitz.com/edit/speckle-obj-loader?file=index.html) is a live sandbox with the OBJLoader in use or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId="speckle-obj-loader" :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" />
