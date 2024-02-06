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
| [setBatchData](/viewer/render-view-api.md#setbatchdata) 	| [computeAABB](/viewer/render-view-api.md#computeaabb) 	| [disposeGeometry](/viewer/render-view-api.md#disposegeometry)


### <h3>Typedefs</h3>
|  	| 	| 	| 	| 
|---	|---	|---	|---	|
[NodeRenderData](/viewer/world-tree-api.md#noderenderdata) | [GeometryData](/viewer/world-tree-api.md#geometrydata)	| [GeometryAttributes](/viewer/world-tree-api.md#geometryattributes) | [GeometryType](/viewer/world-tree-api.md#geometrytype)
[RenderMaterial](/viewer/world-tree-api.md#rendermaterial)

<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(data: NodeRenderData)
```
Populates/constructs this node render view
#### Parameters
- **data**: [*NodeRenderData*](/viewer/world-tree-api.md#noderenderdata)

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
Gets this render view's [*GeometryType*](/viewer/world-tree-api.md#geometrytype)
#### Returns: [*GeometryType*](/viewer/world-tree-api.md#geometrytype)

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
Gets the render view's associated [*NodeRenderData*](/viewer/world-tree-api.md#noderenderdata)
#### Returns: [*NodeRenderData*](/viewer/world-tree-api.md#noderenderdata)

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
:::warning
*Normally*, you have no need overwritting the render view's batch data. It's handled internally by the viewer-core
:::

#### Parameters
- **id**: The id of the batch
- **start**: Start index of the render view's index array inside the batch's index array
- **count**: Start length of the render view's index array
- *optional* **vertStart**: Start index of the render view's position array inside the batch's position array
- *optional* **vertEnd**: End index of the render view's index array inside the batch's index array


#### Returns: void

<br>

#### <b>computeAABB()</b>
```ts
computeAABB(): void
```
Computes this render view's axis aligned bounding box.
:::warning
The render view's aabb can be read by using [*aabb*](/viewer/render-view-api.md#aabb), but do note that it does not take user transformations nor instance transformations into account.
:::

#### Returns: void

<br>

#### <b>disposeGeometry</b>
```ts
disposeGeometry(): void
```
Disposes of the individual geometry of this render view. After batching, the individual geometry of render views becomes redundant, so we can dispose of it to reduce memory footprint


#### Returns: void


<br>
<br>

### <h3>Typedefs</h3>

<br>

#### <b>NodeRenderData</b>
```ts
interface NodeRenderData {
  id: string
  subtreeId: number
  speckleType: SpeckleType
  geometry: GeometryData
  renderMaterial: RenderMaterial
  displayStyle: DisplayStyle
}
```
This is the bare bones data representation of anything renderable in the viewer. The [*NodeRenderView*](/viewer/render-view-api.md#constructor) is more or less a wrapper around this data that adds some shorthands and some extra functionality
- **id**: The id of the object. For speckle data, this would be the speckle id
- **subtreeId**: The id of the subtree of the host node
- **speckleType**: [*SpeckleType*]()
- **geometry**: Raw geometry information stored as [*GeometryData*](/viewer/world-tree-api.md#geometrydata)
- **renderMaterial**: Raw material information stored as [*RenderMaterial*]()
- **DisplayStyle**: Raw line material information stored as [*DisplayStyle*]()

<br>

#### <b>GeometryData</b>
```ts
interface GeometryData {
  attributes: Partial<Record<GeometryAttributes, number[]>>
  bakeTransform: Matrix4
  transform: Matrix4
  metaData?: Record<string, any>
  instanced?: boolean
}
```
Raw geometry information, explicit and/or implicit.
- **attributes**: [*GeometryAttributes*]() Vertex attribute arrays
- **bakeTransform**: [*Matrix4*](https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4) transformation that will get baked into the geometry
- **transform**: [*Matrix4*](https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4) the object's transformation. As per the default implementation, instances use this as the per instance transform attribute. Non-instances have it baked in their geometries
- **metaData**: Implicit geometry data which the viewer uses at runtime to create geometry. Text is a good example of implicit geometry
- **instanced**: Whether this geometry data is instanced or not

<br>

#### <b>GeometryAttributes</b>
```ts
enum GeometryAttributes {
  POSITION = 'POSITION',
  COLOR = 'COLOR',
  NORMAL = 'NORMAL',
  UV = 'UV',
  TANGENT = 'TANGENT',
  INDEX = 'INDEX'
}
```
Defined attributes that the viewer supports

<br>

#### <b>GeometryType</b>
```ts
enum GeometryType {
  MESH,
  LINE,
  POINT,
  POINT_CLOUD,
  TEXT
}
```
The formalized geometry types the viewer supports and recognizes.




