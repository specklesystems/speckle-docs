---
title: WorldTree
deprecationMessages: viewer
---

<Banner />

# WorldTree

### <h3>Constructors</h3>

| [constructor](/viewer/world-tree-api.md#constructor) |
| ---------------------------------------------------- |

### <h3>Accessors</h3>

| [nodeCount](/viewer/world-tree-api.md#nodecount) | [root](/viewer/world-tree-api.md#root) |
| ------------------------------------------------ | -------------------------------------- |

### <h3>Methods</h3>

| [addNode](/viewer/world-tree-api.md#addnode)  | [addSubtree](/viewer/world-tree-api.md#addsubtree) | [findAll](/viewer/world-tree-api.md#findall)  | [findId](/viewer/world-tree-api.md#findid) |
| :----------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------- | :----------------------------------------- |
| [getAncestors](/viewer/world-tree-api.md#getancestors) | [getInstances](/viewer/world-tree-api.md#getinstances) | [getRenderTree](/viewer/world-tree-api.md#getrendertree) | [isRoot](/viewer/world-tree-api.md#isroot) |
| [parse](/viewer/world-tree-api.md#parse)               | [purge](/viewer/world-tree-api.md#purge)               | [removeNode](/viewer/world-tree-api.md#removenode)       | [walk](/viewer/world-tree-api.md#walk)     |
| [walkAsync](/viewer/world-tree-api.md#walkasync)       |

### <h3>Typedefs</h3>

| [NodeData](/viewer/world-tree-api.md#nodedata) | [SearchPredicate](/viewer/world-tree-api.md#searchpredicate) | [TreeNode](/viewer/world-tree-api.md#treenode) | [SelectionEvent](/viewer/world-tree-api.md#selectionEvent) |
| :--------------------------------------------------- | :----------------------------------------------------------------------- | :--------------------------------------------------- | :--------------------------------------------------------- |
| [SpeckleView](/viewer/world-tree-api.md#speckleview) | [SunLightConfiguration](/viewer/world-tree-api.md#sunlightconfiguration) | [UpdateFlags](/viewer/world-tree-api.md#updateflags) | [Utils](/viewer/world-tree-api.md#utilsinterface)          |
| [ViewerEvent](/viewer/world-tree-api.md#viewerevent) | [ViewerParams](/viewer/world-tree-api.md#viewerparams)                   | [World](/viewer/world-tree-api.md#worldclass)        |

### <h3>Constructors</h3>

#### <b>constructor</b>

```ts
new WorldTree();
```

**Returns**: [**_WorldTree_**](/viewer/world-tree-api.md)

### <h3>Accessors</h3>

#### <b>nodeCount</b>

```ts
get nodeCount(): number
```

Gets the total node count for the tree.

**Returns**: number

#### <b>root</b>

```ts
get root(): TreeNode
```

Gets the root [_TreeNode_](/viewer/world-tree-api.md#treenode).

**Returns**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

### <h3>Methods</h3>

#### <b>addNode</b>

```ts
addNode(node: TreeNode, parent: TreeNode): void
```

Adds a [_TreeNode_](/viewer/world-tree-api.md#treenode) as a child of the provided parent node.

**Parameters**

- **node**: The [_TreeNode_](/viewer/world-tree-api.md#treenode) to add
- **parent**: The parent [_TreeNode_](/viewer/world-tree-api.md#treenode) to add the node to

**Returns**: void

#### <b>addSubtree</b>

```ts
addSubtree(node: TreeNode): void
```

Adds a [_TreeNode_](/viewer/world-tree-api.md#treenode) as the root of a subtree. The world tree can be split into subtrees, each of which will have it's dedicated _NodeMap_ for optimal searching speed. A subtree does not differ structurally from a regula node, and it does not alter the overall hierarchy of the world tree in any way.

**Parameters**

- **node**: The [_TreeNode_](/viewer/world-tree-api.md#treenode) to add as a subtree

**Returns**: void

#### <b>findAll</b>

```ts
findAll(predicate: SearchPredicate, node?: TreeNode): TreeNode[]
```

Goes throught the tree starting at _node_ if provided, otherwise at the tree _root_ and runs the provided predicate for each node. All nodes which satisfy the predicate are returned.
::: warning
Be mindful about the predicate's contents. If the tree is very large this operation can lock the main thread for too long. If you need to execute complex predicates on large trees, [_walkAsync_](/viewer/world-tree-api.md#walkasync) is a better candidate.
:::

**Parameters**

- **predicate**: The [_SearchPredicate_](/viewer/world-tree-api.md#searchpredicate) to run for each node
- _(optional)_ **node**: The [_TreeNode_](/viewer/world-tree-api.md#treenode) to start at. If not provided, the tree root will be used

**Returns**: [_TreeNode_](/viewer/world-tree-api.md#treenode)[]

#### <b>findId</b>

```ts
findId(id: string, subtreeId?: number): TreeNode[]
```

Find a node by id. The optional _subtreeId_ argument can narrow down the search to a specific subtree, otherwise it will search the entire tree. It returns an array of nodes because multiple nodes can have the same id, like in the case of instances.
::: tip
Using this method for tree searches is encouraged because it's accelerated by a backing _NodeMap_ which brings down searches to just one or more lookups
:::

**Parameters**

- **id**: The id of the node to search for
- _(optional)_ **subtreeId**: The id of the subtree to search in. If _undefined_ the search will include the entire tree

**Returns**: [_TreeNode_](/viewer/world-tree-api.md#treenode)[]

#### <b>getAncestors</b>

```ts
getAncestors(node: TreeNode): TreeNode[]
```

Gets the full list of node ancestors in hierarchical order.

**Parameters**

- **node**: The node to search ancestors for

**Returns**: [_TreeNode_](/viewer/world-tree-api.md#treenode)[]

#### <b>getInstances</b>

```ts
getInstances(subtree: string): { [id: string]: Record<string, TreeNode> }
```

Gets all the instances in the provided subtree id.

**Parameters**

- **subtree**: The root subtree id

**Returns**: <span style="font-weight:normal">A dictionary where each instance id holds a record of [_TreeNode_](/viewer/world-tree-api.md#treenode) grouped by their instance unique id.</span>

#### <b>getRenderTree</b>

```ts
getRenderTree(): RenderTree
getRenderTree(subtreeId: string): RenderTree | null
```

Gets the [_RenderTree_](/viewer/render-tree-api.md) instance of the provided subtree id. If the subtree id is not found, `null` is returned. The overloaded version with no argument gets the _RenderTree_ instance for the entire tree, which can never be null. 

**Parameters**

- **subtreeId**: The root subtree id

**Returns**: [_RenderTree_](/viewer/render-tree-api.md)

#### <b>isRoot</b>

```ts
isRoot(node: TreeNode): boolean
```

Checks is a [_TreeNode_](/viewer/world-tree-api.md#treenode) is root.

**Parameters**

- **node**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: boolean

#### <b>parse</b>

```ts
parse(model): TreeNode
```

Default way of creating [_TreeNode_](/viewer/world-tree-api.md#treenode)s. The input model needs to follow the form.

```
{
    id: string,
    raw?: object,
    atomic?: boolean,
    children?: []
}
```

The input _model_ can contain virtually anything, but it should have at least the properties defined above.

**Parameters**

- **node**: `{ id: string, raw?: object, atomic?: boolean, children: []}`

**Returns**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

#### <b>purge</b>

```ts
purge(subtreeId?: string): void
```

Destroys part of the tree, or in the absence of a _subtreeId_ argument, the entire tree.
::: warning
Purged trees are no longer usable!
:::

**Parameters**

- _optional_ **subtreeId**: The subtree root id. If undefined the whole tree will get purged

**Returns**: void

#### <b>removeNode</b>

```ts
removeNode(node: TreeNode): void
```

Removed the provided [_TreeNode_](/viewer/world-tree-api.md#treenode) from the tree.

**Parameters**

- **node**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: void

#### <b>walk</b>

```ts
walk(predicate: SearchPredicate, node?: TreeNode): void
```

Walks the tree starting at _node_ and executes the [_SearchPredicate_](/viewer/world-tree-api.md#searchpredicate) for each node. If _node_ argument is undefined, walking starts at root. Walking is stopped when the predicate returns _false_.
::: warning
This function is **synchronous** and depending on the complexity of your [_SearchPredicate_](/viewer/world-tree-api.md#searchpredicate) and the total number of nodes, it might block the main thread. For a heavy [_SearchPredicate_](/viewer/world-tree-api.md#searchpredicate) use [_walkAsync_](/viewer/world-tree-api.md#walkasync).
:::

**Parameters**

- **predicate**: [_SearchPredicate_](/viewer/world-tree-api.md#searchpredicate)
- _optional_ **node**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: void

#### <b>walkAsync</b>

```ts
async walkAsync(predicate: SearchPredicate, node?: TreeNode): Promise<boolean>
```

The asynchronous version of [_walk_](/viewer/world-tree-api.md#walk). The function will yield for 16ms (one frame) after a cummulated 100ms spent executing. The return promise will resolve to a boolean which determines if the tree was completely walked (true) or not (false).

**Parameters**

- **predicate**: [_SearchPredicate_](/viewer/world-tree-api.md#searchpredicate)
- _optional_ **node**: [_TreeNode_](/viewer/world-tree-api.md#treenode)

**Returns**: Promise< boolean >

### <h3>Typedefs</h3>

#### <b>NodeData</b>

```ts
interface NodeData {
  id: string;
  raw: { [prop: string]: any };
  children: TreeNode[];
  atomic: boolean;
  subtreeId?: number;
  renderView?: NodeRenderView;
  instanced?: boolean;
}
```

This is the data payload for each [_TreeNode_](/viewer/world-tree-api.md#treenode).

- **raw**: Raw from node creation with [_parse_](/viewer/world-tree-api.md#parse)
- **children**: Children [_TreeNode_](/viewer/world-tree-api.md#treenode)s
- **atomic**: Whether this node is a complete object (true) or just part of another object (false)
- _optional_ **subtreeId**: Assigned at runtime used for search acceleration
- _optional_ **renderView**: Data required for everything rendering related
- _optional_ **instanced**: Whether this node is an instance

#### <b>SearchPredicate</b>

```ts
type SearchPredicate = (node: TreeNode) => boolean;
```

Delegate type used in tree's [_findAll_](/viewer/world-tree-api.md#findall), [_walk_](/viewer/world-tree-api.md#walk) and [_walkAsync_](/viewer/world-tree-api.md#walkasync) methods.
:::warning
When using the predicate in [_findAll_](/viewer/world-tree-api.md#findall) the return value detemines if the current node matche the search(_true_) or not(_false_). When using the predicate in [_walk_](/viewer/world-tree-api.md#walk) and [_walkAsync_](/viewer/world-tree-api.md#walkasync), return _false_ will stop the tree walking early.
:::

#### <b>TreeNode</b>

```ts
type TreeNode = TreeModel.Node<NodeData>;
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
