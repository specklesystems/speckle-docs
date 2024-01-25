# Render Tree

### <h3>Constructors</h3>
[constructor](/viewer/render-tree-api.md#constructor)

### <h3>Accessors</h3>
|  	|
|---
| [id](/viewer/render-tree-api.md#id)

### <h3>Methods</h3>
|  	| 	| 	|
|---	|---	|---
| [buildRenderTree](/viewer/render-tree-api.md#buildRenderTree) 	| [cancelBuild](/viewer/render-tree-api.md#cancelbuild) 	| [computeTransform](/viewer/render-tree-api.md#computetransform)
[getAtomicParent](/viewer/render-tree-api.md#getA=atomicparent) | [getInstances](/viewer/render-tree-api.md#getinstances) | [getRenderableNodes](/viewer/render-tree-api.md#getrenderablenodes)
[getRenderableRenderViews](/viewer/render-tree-api.md#getrenderablerenderviews) |[getRenderViewNodesForNode](/viewer/render-tree-api.md#getrenderviewnodesfornode) | [getRenderViewsForNode](/viewer/render-tree-api.md#getrenderviewsfornode)
[getRenderViewsForNodeId](/viewer/render-tree-api.md#getrenderviewsfornodeid) | [purge](/viewer/render-tree-api.md#purge) 
 

<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(tree: WorldTree, subtreeRoot: TreeNode)
```
The recommended way of spawing render trees is via [*getRenderTree*](/viewer/world-tree-api.md#getrendertree) method in [*WorldTree*](/viewer/world-tree-api.md)
#### Parameters
- **tree**: [*WorldTree*](/viewer/world-tree-api.md)
- **subtreeRoot**: [*TreeNode*](/viewer/world-tree-api.md#treenode)
#### Returns: [***RenderTree***](/viewer/render-tree-api.md)
<br>
<br>


### <h3>Accessors</h3>

#### <b>id</b>
```ts
get id(): string
```
Gets the id of the render tree's root node
#### Returns: string

<br>
<br>

### <h3>Methods</h3>
#### <b>buildRenderTree</b>
```ts
buildRenderTree(geometryConverter: GeometryConverter): Promise<boolean>
```
Builds the render tree using the provided [*GeometryConverter*](). Building can be interrupted by calling [*cancelBuild*](/viewer/render-tree-api.md#cancelBuild). 'Building' the render tree, means constructing each node's [*NodeRenderView*](), preparing all geometry and materials, and executing any required transformations. This operation should only be carrired out once, as re-building an already built tree is not possible.

#### Parameters
- **geometryConverter**: The [*GeometryConverter*]() to use in building the tree

#### Returns: <span style="font-weight:normal">A promise which resolves to a boolean indicating if the building process completed successfully (true) or was interrupted (false)</span>

<br>

#### <b>cancelBuild</b>
```ts
cancelBuild(): void
```
Cancel any tree building operations that might be taking place. If no building is taking place, nothing happens.

#### Parameters
- **subtreeId**: The [*TreeNode*](/viewer/render-tree-api.md#treenode) to add as a subtree

#### Returns: void

<br>

#### <b>computeTransform</b>
```ts
computeTransform(node: TreeNode): Matrix4
```
Computes the final world space transformation for the given [*TreeNode*](/viewer/world-tree-api.md#treenode)


#### Parameters
- **node**: [*TreeNode*](/viewer/world-tree-api.md#treenode) 

#### Returns: [*Matrix4*](https://threejs.org/docs/index.html?q=matrix#api/en/math/Matrix4)

<br>

#### <b>getAtomicParent</b>
```ts
getAtomicParent(node: TreeNode): TreeNode
```
Gets the closest atomic parent of the provided node. An atomic node represents a standalone object. E.g a door, a window, rather than pieces of a standalone object E.g the door's handle, the window's frame 

#### Parameters
- **node**: [*TreeNode*](/viewer/world-tree-api.md#treenode)

#### Returns: [*TreeNode*](/viewer/render-tree-api.md#treenode)[]

<br>

#### <b>getInstances</b>
```ts
getInstances(): { [id: string]: Record<string, TreeNode> }
```
Calls the underlying WorldTree [*getInstances*](/viewer/world-tree-api.md#getinstances) with the render tree's id as the argument

#### Returns: <span style="font-weight:normal">A dictionary where each instance id holds a record of [*TreeNode*](/viewer/render-tree-api.md#treenode) grouped by their instance unique id.</span>

<br>

#### <b>getRenderableNodes</b>
```ts
getRenderableNodes(...types: SpeckleType[]): TreeNode[]
```
Gets all renderable nodes of the specified [*SpeckleType*]()s.

#### Parameters
- **types**: Variable number of [*SpeckleType*]() values

#### Returns: [*TreeNode[]*](/viewer/render-tree-api.md#treenode)

<br>

#### <b>getRenderableRenderViews</b>
```ts
getRenderableRenderViews(...types: SpeckleType[]): NodeRenderView[]
```
Same as [*getRenderableNodes*](/viewer/render-tree-api.md#getrenderablerenderviews), but returns the mapped [*NodeRenderView*]()s of the renderable nodes

#### Parameters
- **node**: Variable number of [*SpeckleType*]() values

#### Returns: [*NodeRenderView[]*]()

<br>

#### <b>getRenderViewNodesForNode</b>
```ts
getRenderViewNodesForNode(node: TreeNode): TreeNode[]
```
Returns all [*TreeNode*]()s that have a displayable [*NodeRenderView*]() descending from *node*

#### Parameters
- **node**: [*TreeNode*](/viewer/render-tree-api.md#treenode)


#### Returns: [*TreeNode[]*](/viewer/render-tree-api.md#treenode)

<br>

#### <b>getRenderViewsForNode</b>
```ts
getRenderViewsForNode(node: TreeNode): NodeRenderView[]
```
Gets all displayable [*RenderView*]()s descending from *node*

#### Parameters
- **node**: [*TreeNode*](/viewer/render-tree-api.md#treenode)


#### Returns: [*RenderView[]*]()

<br>

#### <b>getRenderViewsForNodeId</b>
```ts
getRenderViewsForNodeId(id: string): NodeRenderView[]
```
Gets all displayable [*RenderView*]()s descending from the node with the provided *id*

#### Parameters
- **id**: Id of the node to gather [*RenderView*]()s for


#### Returns: [*RenderView[]*]()

<br>

#### <b>purge</b>
```ts
purge(): void
```
Purges the render tree
:::warning
Purges render trees are no longer usable
:::
#### Returns: void

