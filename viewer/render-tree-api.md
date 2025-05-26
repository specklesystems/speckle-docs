---
title: RenderTree
deprecationMessages: viewer
---

<Banner />

# RenderTree

### <h3>Constructors</h3>

| [constructor](/viewer/render-tree-api.md#constructor) |
| ----------------------------------------------------- |

### <h3>Accessors</h3>

| [id](/viewer/render-tree-api.md#id)
|---|

### <h3>Methods</h3>

| [buildRenderTree](/viewer/render-tree-api.md#buildRenderTree)                   | [cancelBuild](/viewer/render-tree-api.md#cancelbuild)                             | [computeTransform](/viewer/render-tree-api.md#computetransform)           |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| [getAtomicParent](/viewer/render-tree-api.md#getatomicparent)                 | [getInstances](/viewer/render-tree-api.md#getinstances)                           | [getRenderableNodes](/viewer/render-tree-api.md#getrenderablenodes)       |
| [getRenderableRenderViews](/viewer/render-tree-api.md#getrenderablerenderviews) | [getRenderViewNodesForNode](/viewer/render-tree-api.md#getrenderviewnodesfornode) | [getRenderViewsForNode](/viewer/render-tree-api.md#getrenderviewsfornode) |
| [getRenderViewsForNodeId](/viewer/render-tree-api.md#getrenderviewsfornodeid)   | [purge](/viewer/render-tree-api.md#purge)                                         |                                                                           |

### <h3>Constructors</h3>

#### <b>constructor</b>

```ts
constructor(tree: WorldTree, subtreeRoot: TreeNode)
```

The recommended way of spawing render trees is via [_getRenderTree_](/viewer/world-tree-api.md#getrendertree) method in [_WorldTree_](/viewer/world-tree-api.md).

**Parameters**

- **tree**: [_WorldTree_](/viewer/world-tree-api.md)
- **subtreeRoot**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: [**_RenderTree_**](/viewer/render-tree-api.md)

### <h3>Accessors</h3>

#### <b>id</b>

```ts
get id(): string
```

Gets the id of the render tree's root node.

**Returns**: string

### <h3>Methods</h3>

#### <b>buildRenderTree</b>

```ts
buildRenderTree(geometryConverter: GeometryConverter): Promise<boolean>
```

Builds the render tree using the provided [_GeometryConverter_](/viewer/geometry-converter-api.md). Building can be interrupted by calling [_cancelBuild_](/viewer/render-tree-api.md#cancelBuild). 'Building' the render tree, means constructing each node's [_NodeRenderView_](/viewer/render-view-api.md), preparing all geometry and materials, and executing any required transformations. This operation should only be carrired out once, as re-building an already built tree is not possible.

**Parameters**

- **geometryConverter**: The [_GeometryConverter_](/viewer/geometry-converter-api.md) to use in building the tree

**Returns**: <span style="font-weight:normal">A promise which resolves to a boolean indicating if the building process completed successfully (true) or was interrupted (false)</span>

#### <b>cancelBuild</b>

```ts
cancelBuild(): void
```

Cancel any tree building operations that might be taking place. If no building is taking place, nothing happens.

**Parameters**

- **subtreeId**: The [_TreeNode_](/viewer/render-tree-api.md#treenode) to add as a subtree

**Returns**: void

#### <b>computeTransform</b>

```ts
computeTransform(node: TreeNode): Matrix4
```

Computes the final world space transformation for the given [_TreeNode_](/viewer/world-tree-api.md#treenode).
:::warning
For non instanced nodes, this function will return the identity transformation since speckle does not define a local space (yet) and all geometry is in world space. This function **will not** take any runtime user defined transformations into account.
:::

**Parameters**

- **node**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: [_Matrix4_](https://threejs.org/docs/index.html?q=matrix#api/en/math/Matrix4)

#### <b>getAtomicParent</b>

```ts
getAtomicParent(node: TreeNode): TreeNode
```

Gets the closest atomic parent of the provided node. An atomic node represents a standalone object. E.g a door, a window, rather than pieces of a standalone object E.g the door's handle, the window's frame.

**Parameters**

- **node**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: [_TreeNode_](/viewer/render-tree-api.md#treenode)[]

#### <b>getInstances</b>

```ts
getInstances(): { [id: string]: Record<string, TreeNode> }
```

Calls the underlying WorldTree [_getInstances_](/viewer/world-tree-api.md#getinstances) with the render tree's id as the argument.

**Returns**: <span style="font-weight:normal">A dictionary where each instance id holds a record of [_TreeNode_](/viewer/render-tree-api.md#treenode) grouped by their instance unique id.</span>

#### <b>getRenderableNodes</b>

```ts
getRenderableNodes(...types: SpeckleType[]): TreeNode[]
```

Gets all renderable nodes of the specified [_SpeckleType_](/viewer/geometry-converter-api.md#speckletype)s.

**Parameters**

- **types**: Variable number of [_SpeckleType_](/viewer/geometry-converter-api.md#speckletype) values

**Returns**: [_TreeNode[]_](/viewer/render-tree-api.md#treenode)

#### <b>getRenderableRenderViews</b>

```ts
getRenderableRenderViews(...types: SpeckleType[]): NodeRenderView[]
```

Same as [_getRenderableNodes_](/viewer/render-tree-api.md#getrenderablerenderviews), but returns the mapped [_NodeRenderView_](/viewer/render-view-api.md)s of the renderable nodes.

**Parameters**

- **node**: Variable number of [_SpeckleType_](/viewer/geometry-converter-api.md#speckletype) values

**Returns**: [_NodeRenderView[]_](/viewer/render-view-api.md)

#### <b>getRenderViewNodesForNode</b>

```ts
getRenderViewNodesForNode(node: TreeNode): TreeNode[]
```

Returns all [_TreeNode_](/viewer/world-tree-api.md#treenode)s that have a displayable [_NodeRenderView_](/viewer/render-view-api.md) descending from _node_.

**Parameters**

- **node**: [_TreeNode_](/viewer/render-tree-api.md#treenode)

**Returns**: [_TreeNode[]_](/viewer/render-tree-api.md#treenode)

#### <b>getRenderViewsForNode</b>

```ts
getRenderViewsForNode(node: TreeNode): NodeRenderView[]
```

Gets all displayable [_NodeRenderView_](/viewer/render-view-api.md)s descending from _node_.

**Parameters**

- **node**: [_TreeNode_](/viewer/render-tree-api.md#treenode)

**Returns**: [_NodeRenderView[]_](/viewer/render-view-api.md)

#### <b>getRenderViewsForNodeId</b>

```ts
getRenderViewsForNodeId(id: string): NodeRenderView[]
```

Gets all displayable [_NodeRenderView_](/viewer/render-view-api.md)s descending from the node with the provided _id_.

**Parameters**

- **id**: Id of the node to gather [_NodeRenderView_](/viewer/render-view-api.md)s for

**Returns**: [_NodeRenderView[]_](/viewer/render-view-api.md)

#### <b>purge</b>

```ts
purge(): void
```

Purges the render tree.
:::warning
Purges render trees are no longer usable.
:::

**Returns**: void
