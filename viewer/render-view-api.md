# NodeRenderView

### <h3>Constructors</h3>
[constructor](/viewer/render-view-api.md#constructor)

### <h3>Accessors</h3>
|  	|   |   |   |
|---    |---    |---    |---
| [aabb](/viewer/render-view-api.md#aabb) | [batchCount](/viewer/render-view-api.md#batchcount) | [batchEnd](/viewer/render-view-api.md#batchend) | [batchId](/viewer/render-view-api.md#batchid)
| [batchStart](/viewer/render-view-api.md#batchstart) | [geometryType](/viewer/render-view-api.md#geometrytype) | [guid](/viewer/render-view-api.md#guid) | [hasGeometry](/viewer/render-view-api.md#hasgeometry)
| [batchStart](/viewer/render-view-api.md#batchstart) | [geometryType](/viewer/render-view-api.md#geometrytype) | [guid](/viewer/render-view-api.md#guid) | [hasGeometry](/viewer/render-view-api.md#hasgeometry)
| [hasMetadata](/viewer/render-view-api.md#hasmetadata) | [renderData](/viewer/render-view-api.md#renderdata) | [renderMaterialHash](/viewer/render-view-api.md#rendermaterialhash) | [speckleType](/viewer/render-view-api.md#hasgeometry)
| [transparent](/viewer/render-view-api.md#transparent) | [validGeometry](/viewer/render-view-api.md#validgeometry) | [vertEnd](/viewer/render-view-api.md#vertend) | [vertStart](/viewer/render-view-api.md#vertstart)



### <h3>Methods</h3>
|  	| 	| 	|
|---	|---	|---
| [setBatchData](/viewer/render-view-api.md#setbatchdata) 	| [cancelBuild](/viewer/render-view-api.md#cancelbuild) 	| [computeTransform](/viewer/render-view-api.md#computetransform)
[getAtomicParent](/viewer/render-view-api.md#getA=atomicparent) | [getInstances](/viewer/render-view-api.md#getinstances) | [getRenderableNodes](/viewer/render-view-api.md#getrenderablenodes)
[getRenderableRenderViews](/viewer/render-view-api.md#getrenderablerenderviews) |[getRenderViewNodesForNode](/viewer/render-view-api.md#getrenderviewnodesfornode) | [getRenderViewsForNode](/viewer/render-view-api.md#getrenderviewsfornode)
[getRenderViewsForNodeId](/viewer/render-view-api.md#getrenderviewsfornodeid) | [purge](/viewer/render-view-api.md#purge) 
 

<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(data: NodeRenderData)
```
Populates/constructs this node render view
#### Parameters
- **data**: [*NodeRenderData*]()

<br>
<br>


### <h3>Accessors</h3>

#### <b>aabb</b>
```ts
get aabb(): Box3
```
Gets the axis aligned box of this render view's geometry.
:::warning
The bounds returned do not take any user transformations into account, nor the instance transformations
:::
#### Returns: [*Box3*](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

<br>

#### <b>batchCount</b>
```ts
get batchCount(): number
```
Gets the total number of indices inside it's batch
#### Returns: number

<br>

#### <b>batchEnd</b>
```ts
get batchEnd(): number
```
Gets the end index inside the batch's index buffer. Equals to `batchStart + batchCount`
#### Returns: number

<br>

#### <b>batchId</b>
```ts
get batchId(): string
```
Gets the id of the batch this render viewe belongs to
#### Returns: string

<br>

#### <b>batchStart</b>
```ts
get batchStart(): number
```
Gets the start index inside the batch's index buffer
#### Returns: string

<br>

#### <b>geometryType</b>
```ts
get geometryType(): GeometryType
```
Gets this render view's [*GeometryType*]()
#### Returns: [*GeometryType*]()

<br>

#### <b>guid</b>
```ts
get guid(): string
```
Gets a unique id by concatenating the node's id and the subtree id it's part of
#### Returns: string

<br>

#### <b>hasGeometry</b>
```ts
get hasGeometry(): boolean
```
Returns true if this render view has geometry, false otherwise
#### Returns: boolean

<br>

#### <b>hasMetadata</b>
```ts
get hasMetadata(): boolean
```
Returns true if this render view has metadata, false otherwise. Metadata is any data that is used to create geometry in a deffered way
#### Returns: boolean

<br>

#### <b>renderData</b>
```ts
get renderData(): NodeRenderData
```
Gets the render view's associated [*NodeRenderData*]()
#### Returns: [*NodeRenderData*]()

<br>

#### <b>renderMaterialHash</b>
```ts
get renderMaterialHash(): number
```
Gets the render view's computed material hash
#### Returns: number

<br>

#### <b>speckleType</b>
```ts
get speckleType(): SpeckleType
```
Gets the render view's render data [*SpeckleType*]()
#### Returns: [*SpeckleType*]()

<br>

#### <b>transparent</b>
```ts
get transparent(): boolean
```
Gets whether the render view has a transparent default material
#### Returns: boolean

<br>

#### <b>validGeometry</b>
```ts
get validGeometry(): boolean
```
Returns true if the existing geometry is valid. Input data can be invalid, so this checks for that 
#### Returns: boolean

<br>

#### <b>vertEnd</b>
```ts
get vertEnd(): number
```
Gets the ending index of this render view's vertex position attribute array inside it's batch 
#### Returns: number

<br>

#### <b>vertStart</b>
```ts
get vertStart(): number
```
Gets the starting index of this render view's vertex position attribute array inside it's batch 
#### Returns: number

<br>


<br>
<br>

### <h3>Methods</h3>
#### <b>setBatchData</b>
```ts
setBatchData(
    id: string,
    start: number,
    count: number,
    vertStart?: number,
    vertEnd?: number
  )
```
Sets the batch related data to the render view. All render view geometry is contained inside a batch, and the offset + length is being stored at render view level for both indices and position attribute.
:::warning
By default, `batchStart` and `batchCount` are dynamic, so *they can change* at runtime. `vertStart` and `vertEnd` are not dynamic by default  
:::

#### Parameters
- **id**: The id of the batch
- **start**: Start index of the render view's index array inside the batch's index array
- **count**: Start length of the render view's index array
- *optional* **vertStart**: Start index of the render view's position array inside the batch's position array
- *optional* **vertEnd**: End index of the render view's index array inside the batch's index array


#### Returns: void

<br>

#### <b>cancelBuild</b>
```ts
cancelBuild(): void
```
Cancel any tree building operations that might be taking place. If no building is taking place, nothing happens.

#### Parameters
- **subtreeId**: The [*TreeNode*](/viewer/render-view-api.md#treenode) to add as a subtree

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

#### Returns: [*TreeNode*](/viewer/render-view-api.md#treenode)[]

<br>

#### <b>getInstances</b>
```ts
getInstances(): { [id: string]: Record<string, TreeNode> }
```
Calls the underlying WorldTree [*getInstances*](/viewer/world-tree-api.md#getinstances) with the render tree's id as the argument

#### Returns: <span style="font-weight:normal">A dictionary where each instance id holds a record of [*TreeNode*](/viewer/render-view-api.md#treenode) grouped by their instance unique id.</span>

<br>

#### <b>getRenderableNodes</b>
```ts
getRenderableNodes(...types: SpeckleType[]): TreeNode[]
```
Gets all renderable nodes of the specified [*SpeckleType*]()s.

#### Parameters
- **types**: Variable number of [*SpeckleType*]() values

#### Returns: [*TreeNode[]*](/viewer/render-view-api.md#treenode)

<br>

#### <b>getRenderableRenderViews</b>
```ts
getRenderableRenderViews(...types: SpeckleType[]): NodeRenderView[]
```
Same as [*getRenderableNodes*](/viewer/render-view-api.md#getrenderablerenderviews), but returns the mapped [*NodeRenderView*]()s of the renderable nodes

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
- **node**: [*TreeNode*](/viewer/render-view-api.md#treenode)


#### Returns: [*TreeNode[]*](/viewer/render-view-api.md#treenode)

<br>

#### <b>getRenderViewsForNode</b>
```ts
getRenderViewsForNode(node: TreeNode): NodeRenderView[]
```
Gets all displayable [*RenderView*]()s descending from *node*

#### Parameters
- **node**: [*TreeNode*](/viewer/render-view-api.md#treenode)


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

