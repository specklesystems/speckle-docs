# Viewer Data

## World Tree
The viewer stores data in a hierarchical fashion inside a tree-like structure which we call `WorldTree`

![Viewer Data](./img/tree.svg "Viewer Data")

Loading data into the viewer can be 100% customisable, so the structure of the tree is also up to the loader implementation, however when talking about the default Speckle loader, one important aspect of how we store data is that, direct children of `Root` will always be the root of a complete subtree which represents a loaded model.

A node inside the tree looks like the following:
```typescript
{
    model: NodeData
    children: Array<TreeNode>
    parent: TreeNode
}
```
And the `NodeData` model payload of a Node:
```typescript
{
    raw: { [prop: string]: any }
    children: TreeNode[]
    atomic: boolean
    subtreeId?: number
    renderView?: NodeRenderView
    instanced?: boolean
}
```
Each node will store any `raw` data that came in via the loader. In the SpeckleLoder's case it's the actual speckle object. The `atomic` property hints at whether we need to treat this node as a complete object (true) or just being part of another object (false). `subtreeId` is just an internally used property for search acceleration, and `instanced` tells if this node data is being used by multiple nodes. The `renderView` property is a very important property which holds the data required for everything rendering related. We will describe it in detail later on.

The `WorldTree` class provides functionality for adding, removing ,searching and walking the tree. It is the single source of truth for all the data in the viewer and it's the place to go for all data related operations.


## Loaders
The viewer provides a loader system which allows for virtually any data to be loaded in. The `SpeckleLoader` is an example of such loader that specialises on loading speckle data.

If we take a look at how the viewer loads data:
```typescript
loadObject(loader: Loader): Promise<void>
```
We see that it delegates the loading process to a `Loader` object that we specify. The `Loader` class is abstract and intentionally thin, requiring only three functions to exist in it's extensions: `load`, `cancel`, and `dispose`.

In order for data to correctly end up in the viewer's store, and all the builtin rendering features to work correctly, the loading process, regardless of how it's chosen to be implemented, needs to accomplish the following things:

1. Populate the viewer's `WorldTree` with nodes
2. Convert renderable incoming data into types the viewer can understand
3. Build a global `RenderTree`