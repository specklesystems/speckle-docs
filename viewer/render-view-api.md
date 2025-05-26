---
title: NodeRenderView
deprecationMessages: viewer
---

<Banner />

# NodeRenderView

### <h3>Constructors</h3>

| [constructor](/viewer/render-view-api.md#constructor) |
| ----------------------------------------------------- |

### <h3>Accessors</h3>

| [aabb](/viewer/render-view-api.md#aabb)               | [batchCount](/viewer/render-view-api.md#batchcount)       | [batchEnd](/viewer/render-view-api.md#batchend)                     | [batchId](/viewer/render-view-api.md#batchid)         |
| :---------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------- |
| [batchStart](/viewer/render-view-api.md#batchstart)   | [geometryType](/viewer/render-view-api.md#geometrytype)   | [guid](/viewer/render-view-api.md#guid)                             | [hasGeometry](/viewer/render-view-api.md#hasgeometry) |
| [hasMetadata](/viewer/render-view-api.md#hasmetadata) | [renderData](/viewer/render-view-api.md#renderdata)       | [renderMaterialHash](/viewer/render-view-api.md#rendermaterialhash) | [speckleType](/viewer/render-view-api.md#hasgeometry) |
| [transparent](/viewer/render-view-api.md#transparent) | [validGeometry](/viewer/render-view-api.md#validgeometry) | [vertEnd](/viewer/render-view-api.md#vertend)                       | [vertStart](/viewer/render-view-api.md#vertstart)     |

### <h3>Methods</h3>

| [setBatchData](/viewer/render-view-api.md#setbatchdata) | [computeAABB](/viewer/render-view-api.md#computeaabb) | [disposeGeometry](/viewer/render-view-api.md#disposegeometry) |
| ------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |

### <h3>Typedefs</h3>

| [NodeRenderData](/viewer/render-view-api.md#noderenderdata) | [GeometryData](/viewer/render-view-api.md#geometrydata) | [GeometryAttributes](/viewer/render-view-api.md#geometryattributes) | [GeometryType](/viewer/render-view-api.md#geometrytypeenum) |
| ----------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |

### <h3>Constructors</h3>

#### <b>constructor</b>

```ts
constructor(data: NodeRenderData)
```

Populates/constructs this node render view.

**Parameters**

- **data**: [_NodeRenderData_](/viewer/render-view-api.md#noderenderdata)

### <h3>Accessors</h3>

#### <b>aabb</b>

```ts
get aabb(): Box3
```

Gets the axis aligned box of this render view's geometry.
:::warning
The bounds returned do not take any user transformations into account, nor the instance transformations.
:::

**Returns**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

#### <b>batchCount</b>

```ts
get batchCount(): number
```

Gets the total number of indices inside it's batch.

**Returns**: number

#### <b>batchEnd</b>

```ts
get batchEnd(): number
```

Gets the end index inside the batch's index buffer. Equals to `batchStart + batchCount`.

**Returns**: number

#### <b>batchId</b>

```ts
get batchId(): string
```

Gets the id of the batch this render view belongs to.

**Returns**: string

#### <b>batchStart</b>

```ts
get batchStart(): number
```

Gets the start index inside the batch's index buffer.

**Returns**: string

#### <b>geometryType</b>

```ts
get geometryType(): GeometryType
```

Gets this render view's [_GeometryType_](/viewer/render-view-api.md#geometrytypeenum).

**Returns**: [_GeometryType_](/viewer/render-view-api.md#geometrytypeenum)

#### <b>guid</b>

```ts
get guid(): string
```

Gets a unique id by concatenating the node's id and the subtree id it's part of.

**Returns**: string

#### <b>hasGeometry</b>

```ts
get hasGeometry(): boolean
```

Returns true if this render view has geometry, false otherwise.

**Returns**: boolean

#### <b>hasMetadata</b>

```ts
get hasMetadata(): boolean
```

Returns true if this render view has metadata, false otherwise. Metadata is any data that is used to create geometry in a deffered way.

**Returns**: boolean

#### <b>renderData</b>

```ts
get renderData(): NodeRenderData
```

Gets the render view's associated [_NodeRenderData_](/viewer/render-view-api.md#noderenderdata).

**Returns**: [_NodeRenderData_](/viewer/render-view-api.md#noderenderdata)

#### <b>renderMaterialHash</b>

```ts
get renderMaterialHash(): number
```

Gets the render view's computed material hash.

**Returns**: number

#### <b>speckleType</b>

```ts
get speckleType(): SpeckleType
```

Gets the render view's render data [_SpeckleType_](/viewer/geometry-converter-api.md#speckletype).

**Returns**: [_SpeckleType_](/viewer/geometry-converter-api.md#speckletype)

#### <b>transparent</b>

```ts
get transparent(): boolean
```

Gets whether the render view has a transparent default material.

**Returns**: boolean

#### <b>validGeometry</b>

```ts
get validGeometry(): boolean
```

Returns true if the existing geometry is valid. Input data can be invalid, so this checks for that.

**Returns**: boolean

#### <b>vertEnd</b>

```ts
get vertEnd(): number
```

Gets the ending index of this render view's vertex position attribute array inside it's batch.

**Returns**: number

#### <b>vertStart</b>

```ts
get vertStart(): number
```

Gets the starting index of this render view's vertex position attribute array inside it's batch.

**Returns**: number

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
By default, `batchStart` and `batchCount` are dynamic, so _they can change_ at runtime. `vertStart` and `vertEnd` are not dynamic by default.
:::
:::warning
_Normally_, you have no need overwritting the render view's batch data. It's handled internally by the viewer-core.
:::

**Parameters**

- **id**: The id of the batch
- **start**: Start index of the render view's index array inside the batch's index array
- **count**: Start length of the render view's index array
- _optional_ **vertStart**: Start index of the render view's position array inside the batch's position array
- _optional_ **vertEnd**: End index of the render view's index array inside the batch's index array

**Returns**: void

#### <b>computeAABB()</b>

```ts
computeAABB(): void
```

Computes this render view's axis aligned bounding box.
:::warning
The render view's aabb can be read by using [_aabb_](/viewer/render-view-api.md#aabb), but do note that it does not take user transformations nor instance transformations into account.
:::

**Returns**: void

#### <b>disposeGeometry</b>

```ts
disposeGeometry(): void
```

Disposes of the individual geometry of this render view. After batching, the individual geometry of render views becomes redundant, so we can dispose of it to reduce memory footprint.

**Returns**: void

### <h3>Typedefs</h3>

#### <b>NodeRenderData</b>

```ts
interface NodeRenderData {
  id: string;
  subtreeId: number;
  speckleType: SpeckleType;
  geometry: GeometryData;
  renderMaterial: RenderMaterial;
  displayStyle: DisplayStyle;
}
```

This is the bare bones data representation of anything renderable in the viewer. The [_NodeRenderView_](/viewer/render-view-api.md#constructor) is more or less a wrapper around this data that adds some shorthands and some extra functionality.

- **id**: The id of the object. For speckle data, this would be the speckle id
- **subtreeId**: The id of the subtree of the host node
- **speckleType**: [_SpeckleType_](/viewer/geometry-converter-api.md#speckletype)
- **geometry**: Raw geometry information stored as [_GeometryData_](/viewer/render-view-api.md#geometrydata)
- **renderMaterial**: Raw material information stored as [_RenderMaterial_](/viewer/speckle-material-api.md#rendermaterial)
- **DisplayStyle**: Raw line material information stored as [_DisplayStyle_](/viewer/speckle-material-api.md#displaystyle)

#### <b>GeometryData</b>

```ts
interface GeometryData {
  attributes: Partial<Record<GeometryAttributes, number[]>>;
  bakeTransform: Matrix4;
  transform: Matrix4;
  metaData?: Record<string, any>;
  instanced?: boolean;
}
```

Raw geometry information, explicit and/or implicit.

- **attributes**: [_GeometryAttributes_](/viewer/render-view-api.md#geometryattributes) Vertex attribute arrays
- **bakeTransform**: [_Matrix4_](https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4) transformation that will get baked into the geometry
- **transform**: [_Matrix4_](https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4) the object's transformation. As per the default implementation, instances use this as the per instance transform attribute. Non-instances have it baked in their geometries
- **metaData**: Implicit geometry data which the viewer uses at runtime to create geometry. Text is a good example of implicit geometry
- **instanced**: Whether this geometry data is instanced or not

#### <b>GeometryAttributes</b>

```ts
enum GeometryAttributes {
  POSITION = "POSITION",
  COLOR = "COLOR",
  NORMAL = "NORMAL",
  UV = "UV",
  TANGENT = "TANGENT",
  INDEX = "INDEX",
}
```

Defined attributes that the viewer supports.

#### <b>GeometryType enum</b>

```ts
enum GeometryType {
  MESH,
  LINE,
  POINT,
  POINT_CLOUD,
  TEXT,
}
```

The formalized geometry types the viewer supports and recognizes.
