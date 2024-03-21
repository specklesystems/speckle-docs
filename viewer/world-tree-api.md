# WorldTree

### <h3>Constructors</h3>
[constructor](/viewer/world-tree-api.md#constructor)

### <h3>Accessors</h3>
|  	| 	| 
|---	|---
| [nodeCount](/viewer/world-tree-api.md#nodecount) 	| [root](/viewer/world-tree-api.md#root) 	

### <h3>Methods</h3>
|  	| 	| 	| 	|
|---	|---	|---	|---
| [addNode](/viewer/world-tree-api.md#addnode) 	| [addSubtree](/viewer/world-tree-api.md#addsubtree) 	| [findAll](/viewer/world-tree-api.md#findall) 	| [findId](/viewer/world-tree-api.md#findid) 	
[getAncestors](/viewer/world-tree-api.md#getancestors)  | [getInstances](/viewer/world-tree-api.md#getinstances) | [getRenderTree](/viewer/world-tree-api.md#getrendertree) | [isRoot](/viewer/world-tree-api.md#isroot) 
[parse](/viewer/world-tree-api.md#parse) | [purge](/viewer/world-tree-api.md#purge) 	| [removeNode](/viewer/world-tree-api.md#removenode) | [walk](/viewer/world-tree-api.md#walk) 
[walkAsync](/viewer/world-tree-api.md#walkasync) 	|
 

### <h3>Typedefs</h3>
|  	| 	| 	| 	|  	|   |   |
|---	|---	|---	|---	|---	|---	|---    |
[NodeData](/viewer/world-tree-api.md#nodedata) | [SearchPredicate](/viewer/world-tree-api.md#searchpredicate)	| [TreeNode](/viewer/world-tree-api.md#treenode) | [SelectionEvent](/viewer/world-tree-api.md#selectionEvent) 
[SpeckleView](/viewer/world-tree-api.md#speckleview) | [SunLightConfiguration](/viewer/world-tree-api.md#sunlightconfiguration) | [UpdateFlags](/viewer/world-tree-api.md#updateflags) | [Utils](/viewer/world-tree-api.md#utilsinterface) 
[ViewerEvent](/viewer/world-tree-api.md#viewerevent) | [ViewerParams](/viewer/world-tree-api.md#viewerparams) |  [World](/viewer/world-tree-api.md#worldclass) 
<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
new WorldTree()
```
#### Returns: [***WorldTree***](/viewer/world-tree-api.md)
<br>
<br>


### <h3>Accessors</h3>

#### <b>nodeCount</b>
```ts
get nodeCount(): number
```
Gets the total node count for the tree
#### Returns: number

<br>

#### <b>root</b>
```ts
get root(): TreeNode
```
Gets the root [*TreeNode*](/viewer/world-tree-api.md#treenode)
#### Returns: [*TreeNode*](/viewer/world-tree-api.md#treenode)


<br>
<br>

### <h3>Methods</h3>
#### <b>addNode</b>
```ts
addNode(node: TreeNode, parent: TreeNode): void
```
Adds a [*TreeNode*](/viewer/world-tree-api.md#treenode) as a child of the provided parent node

#### Parameters
- **node**: The [*TreeNode*](/viewer/world-tree-api.md#treenode) to add
- **parent**: The parent [*TreeNode*](/viewer/world-tree-api.md#treenode) to add the node to

#### Returns: void

<br>

#### <b>addSubtree</b>
```ts
addSubtree(node: TreeNode): void
```
Adds a [*TreeNode*](/viewer/world-tree-api.md#treenode) as the root of a subtree. The world tree can be split into subtrees, each of which will have it's dedicated *NodeMap* for optimal searching speed. A subtree does not differ structurally from a regula node, and it does not alter the overall hierarchy of the world tree in any way

#### Parameters
- **node**: The [*TreeNode*](/viewer/world-tree-api.md#treenode) to add as a subtree

#### Returns: void

<br>

#### <b>findAll</b>
```ts
findAll(predicate: SearchPredicate, node?: TreeNode): TreeNode[]
```
Goes throught the tree starting at *node* if provided, otherwise at the tree *root* and runs the provided predicate for each node. All nodes which satisfy the predicate are returned
::: warning
Be mindful about the predicate's contents. If the tree is very large this operation can lock the main thread for too long. If you need to execute complex predicates on large trees, [*walkAsync*]() is a better candidate
:::

#### Parameters
- **predicate**: The [*SearchPredicate*](/viewer/world-tree-api.md#searchpredicate) to run for each node
- *(optional)* **node**: The [*TreeNode*](/viewer/world-tree-api.md#treenode) to start at. If not provided, the tree root will be used

#### Returns: [*TreeNode*](/viewer/world-tree-api.md#treenode)[]

<br>

#### <b>findId</b>
```ts
findId(id: string, subtreeId?: number): TreeNode[]
```
Find a node by id. The optional *subtreeId* argument can narrow down the search to a specific subtree, otherwise it will search the entire tree. It returns an array of nodes because multiple nodes can have the same id, like in the case of instances.
::: tip
Using this method for tree searches is encouraged because it's accelerated by a backing *NodeMap* which brings down searches to just one or more lookups
:::

#### Parameters
- **id**: The id of the node to search for
- *(optional)* **subtreeId**: The id of the subtree to search in. If *undefined* the search will include the entire tree

#### Returns: [*TreeNode*](/viewer/world-tree-api.md#treenode)[]

<br>

#### <b>getAncestors</b>
```ts
getAncestors(node: TreeNode): TreeNode[]
```
Gets the full list of node ancestors in hierarchical order.

#### Parameters
- **node**: The node to search ancestors for

#### Returns: [*TreeNode*](/viewer/world-tree-api.md#treenode)[]

<br>

#### <b>getInstances</b>
```ts
getInstances(subtree: string): { [id: string]: Record<string, TreeNode> }
```
Gets all the instances in the provided subtree id.

#### Parameters
- **subtree**: The root subtree id

#### Returns: <span style="font-weight:normal">A dictionary where each instance id holds a record of [*TreeNode*](/viewer/world-tree-api.md#treenode) grouped by their instance unique id.</span>

<br>

#### <b>getRenderTree</b>
```ts
getRenderTree(subtreeId?: string): RenderTree
```
Gets the [*RenderTree*]() instance of the provided subtree id. If *subtreeId* argument is undefined, gets the *RenderTree* instance for the entire tree.

#### Parameters
- **subtreeId**: The root subtree id

#### Returns: [*RenderTree*]()

<br>

#### <b>isRoot</b>
```ts
isRoot(node: TreeNode): boolean
```
Checks is a [*TreeNode*](/viewer/world-tree-api.md#treenode) is root

#### Parameters
- **node**: [*TreeNode*](/viewer/world-tree-api.md#treenode)

#### Returns: boolean

<br>

#### <b>parse</b>
```ts
parse(model): TreeNode
```
Default way of creating [*TreeNode*](/viewer/world-tree-api.md#treenode)s. The input model needs to follow the form
```
{ 
    id: string, 
    raw?: object, 
    atomic?: boolean, 
    children?: []
}
```
The input *model* can contain virtually anything, but it should have at least the properties defined above.

#### Parameters
- **node**: ```{ id: string, raw?: object, atomic?: boolean, children: []}```


#### Returns: [*TreeNode*](/viewer/world-tree-api.md#treenode)

<br>

#### <b>purge</b>
```ts
purge(subtreeId?: string): void
```
Destroys part of the tree, or in the absence of a *subtreeId* argument, the entire tree
::: warning
Purged trees are no longer usable!
:::

#### Parameters
- *optional* **subtreeId**: The subtree root id. If undefined the whole tree will get purged


#### Returns: void

<br>

#### <b>removeNode</b>
```ts
removeNode(node: TreeNode): void
```
Removed the provided [*TreeNode*](/viewer/world-tree-api.md#treenode) from the tree

#### Parameters
- **node**: [*TreeNode*](/viewer/world-tree-api.md#treenode)


#### Returns: void

<br>

#### <b>walk</b>
```ts
walk(predicate: SearchPredicate, node?: TreeNode): void
```
Walks the tree starting at *node* and executes the [*SearchPredicate*](/viewer/world-tree-api.md#searchpredicate) for each node. If *node* argument is undefined, walking starts at root. Walking is stopped when the predicate returns *false*
::: warning
This function is **synchronous** and depending on the complexity of your [*SearchPredicate*](/viewer/world-tree-api.md#searchpredicate) and the total number of nodes, it might block the main thread. For a heavy [*SearchPredicate*](/viewer/world-tree-api.md#searchpredicate) use [*walkAsync*](/viewer/world-tree-api.md#walkasync)
:::

#### Parameters
- **predicate**: [*SearchPredicate*](/viewer/world-tree-api.md#searchpredicate)
- *optional* **node**: [*TreeNode*](/viewer/world-tree-api.md#treenode)


#### Returns: void

<br>

#### <b>walkAsync</b>
```ts
async walkAsync(predicate: SearchPredicate, node?: TreeNode): Promise<boolean>
```
The asynchronous version of [*walk*](/viewer/world-tree-api.md#walk). The function will yield for 16ms (one frame) after a cummulated 100ms spent executing. The return promise will resolve to a boolean which determines if the tree was completely walked (true) or not (false)


#### Parameters
- **predicate**: [*SearchPredicate*](/viewer/world-tree-api.md#searchpredicate)
- *optional* **node**: [*TreeNode*](/viewer/world-tree-api.md#treenode)


#### Returns: Promise< boolean >

<br><br>

### <h3>Typedefs</h3>

#### <b>NodeData</b>
```ts
interface NodeData {
  id: string
  raw: { [prop: string]: any }
  children: TreeNode[]
  atomic: boolean
  subtreeId?: number
  renderView?: NodeRenderView
  instanced?: boolean
}
```
This is the data payload for each [*TreeNode*](/viewer/world-tree-api.md#treenode)
- **raw**: Raw from node creation with [*parse*](/viewer/world-tree-api.md#parse)
- **children**: Children [*TreeNode*](/viewer/world-tree-api.md#treenode)s
- **atomic**: Whether this node is a complete object (true) or just part of another object (false)
- *optional* **subtreeId**: Assigned at runtime used for search acceleration
- *optional* **renderView**: Data required for everything rendering related
- *optional* **instanced**: Whether this node is an instance

<br>

#### <b>SearchPredicate</b>
```ts
type SearchPredicate = (node: TreeNode) => boolean
```
Delegate type used in tree's [*findAll*](/viewer/world-tree-api.md#findall), [*walk*](/viewer/world-tree-api.md#walk) and [*walkAsync*](/viewer/world-tree-api.md#walkasync) methods. 
:::warning
When using the predicate in [*findAll*](/viewer/world-tree-api.md#findall) the return value detemines if the current node matche the search(*true*) or not(*false*). When using the predicate in [*walk*](/viewer/world-tree-api.md#walk) and [*walkAsync*](/viewer/world-tree-api.md#walkasync), return *false* will stop the tree walking early
:::
<br>

#### <b>TreeNode</b>
```ts
type TreeNode = TreeModel.Node<NodeData>
```
Abstraction of a tree node.
The tree is implemented on top of an existing tree [library](https://github.com/joaonuno/tree-model-js) which defines the tree nodes it'w own way. At runtime the nodes will consist of:
```ts
{
  children: Node[]
  config: {childrenPropertyName: 'children', modelComparatorFn: undefined}
  model: NodeData
  parent: TreeNode
}
```

<br>