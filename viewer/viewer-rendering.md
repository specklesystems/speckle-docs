---
title: Rendering
deprecationMessages: viewer
---

<Banner />

# Rendering

With the introduction of custom loaders, we've potentially broadened the scope of what the viewer could be used for, however our goal and purpose is still focusing on AEC related visualisation, with a strong bias towards Speckle data. Because Speckle data is organized in a certain way, the viewer creates some concepts and abstractions around it so that clients can use it efficiently.

One such abstraction is the `NodeRenderView`, which is intensely used by the viewer core as well as viewer extensions.

## RenderViews

The nodes from the previously defined [WorldTree](/viewer/viewer-data/#worldTree) can contain any kind of data. Some of them contain rendering related data, like meshes, lines, points. A 'RenderView' of a node is just it's rendering related data from the viewer's point of view. The viewer will use render views for all rendering related operations instead of the node itself.

Across the viewer-core and viewer extensions, render views are required to be passed around for various entry points.

All render viewers are accessible through the `RenderTree`

## Render Tree

A render tree is just a wrapper around a part of (or the entire) world tree, with additional rendering related functionality. Here's how you get a render tree instance for the entire model:

```typescript
const renderTree = worldTree.getRenderTree();
```

![Render Tree](/automate/img/rendertree2.png "Render Tree")

You can be more specific and get a render tree instance for only a part of the model by providing an object id. The id you provide to `getRenderTree` represents the root of the render tree. So the call below will you get you the render tree highlighted in the image below:

```typescript
const renderTree = worldTree.getRenderTree("2f1bd7295481641c888f09b5fbb6dc2b");
```

![Render Tree](/automate/img/rendertree.png "Render Tree")

It's important to note that you should always get the minimum render tree for your needs. As in, it's probably easiest to just get the whole render tree each time, but keep in mind that if you're going through the tree, fetching render views, it's always better for that tree to be as small as possible.

Once you got hold of a render tree, you can start fetching render views:

```typescript
const nodeId = "2f1bd7295481641c888f09b5fbb6dc2b";
const renderTree = worldTree.getRenderTree(nodeId);
// Get all render views starting from the root of the render tree
const node = worldTree.findId(nodeId);
const rvs = renderTree.getRenderViewsForNode(node);
// Define some material parameters
const materialData = {
  color: 0xee0022,
  opacity: 1,
  roughness: 1,
  metalness: 0,
  vertexColors: false,
};
// Apply material
viewer.setMaterial(rvs, materialData);
```

## Batching

The viewer will automatically attempt to batch together any renderables you provide within a `loadObject` cycle. In order for batching to take place, the following conditions need to met:

- Objects need to be of the same [_GeometryType_](/viewer/render-view-api.md#geometrytypeenum)
- Objects need to belong to the same subtree i.e loaded from within the same `loadObject` call

Additional aspects of batching are:

- Instances are rendered as hardware instances
- Instances of a type will not batch together with non-instances, nor with other types of instances
- Batches are limited to a maximum of 500,000 vertices
- Batches have a maximum object count limited by the platform's `Max Vertex Uniform Vectors` count

Batching improves overall performance significantly by drastically reducing the number of draw calls needed, especially in typical AEC scenarios where you can easily reach tens of thousands, or even more, individual objects that need to get drawn. Regardless, batching does not restrict manipulating objects individually in any way. This is achieved using [_BatchObject_](/viewer/batch-object-api.md)s.
