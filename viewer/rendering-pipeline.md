# Pipeline

Abstract class that is the base for all concrete rendering pipeline implementations.


### <h3>Properties</h3>

| [drawingSize](/viewer/rendering-pipeline.md#drawingsize) | [passList](/viewer/rendering-pipeline.md#passlist) | [speckleRenderer](/viewer/rendering-pipeline.md#specklerenderer) 
| :-------------------------------------------------- | :------------------------------------------------ | :---------------------------- | 


### <h3>Accessors</h3>

| [passes](/viewer/rendering-pipeline.md#passes)
| :------------------------------------------------ | 

### <h3>Methods</h3>

| [createMultipleRenderTarget](/viewer/rendering-pipeline.md#createmultiplerendertarget)                 | [createRenderTarget](/viewer/rendering-pipeline.md#createrendertarget)               | [getPass](/viewer/rendering-pipeline.md#getpass)               | [onAfterPipelineRender](/viewer/rendering-pipeline.md#onafterpipelinerender)           |
| :------------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | :-------------------------------------------------------- |
| [onBeforePipelineRender](/viewer/rendering-pipeline.md#onbeforepipelinerender) | [render](/viewer/rendering-pipeline.md#render)             | [reset](/viewer/rendering-pipeline.md#reset)     | [resize](/viewer/rendering-pipeline.md#resize)             |
| [setClippingPlanes](/viewer/rendering-pipeline.md#setclippingplanes)         | [update](/viewer/rendering-pipeline.md#update) 

### <h3>Typedefs</h3>

| [BatchUpdateRange](/viewer/rendering-pipeline.md#batchupdaterange) | [DrawGroup](/viewer/rendering-pipeline.md#drawgroup)   | [LineBatch](/viewer/rendering-pipeline.md#linebatch) | [MeshBatch](/viewer/rendering-pipeline.md#meshbatch)                   |
| :-------------------------------------------------------- | :-------------------------------------------- | :------------------------------------------ | :------------------------------------------------------------ |
| [InstancedMeshBatch](/viewer/rendering-pipeline.md#meshbatch)      | [PointBatch](/viewer/rendering-pipeline.md#pointbatch) | [TextBatch](/viewer/rendering-pipeline.md#textbatch) | [InstancedMeshBatch](/viewer/rendering-pipeline.md#instancedmeshbatch) |

### <h3>Properties</h3>

#### <b>batchMaterial</b>

```ts
batchMaterial: Material;
```

The batch's default material. Batch objects have been grouped by this material.

**Returns**: [_Material_](https://threejs.org/docs/index.html?q=mater#api/en/materials/Material)

#### <b>geometryType</b>

```ts
geometryType: GeometryType;
```

The batch's [_GeometryType_](/viewer/render-view-api.md#geometrytypeenum).

**Returns**: [_GeometryType_](/viewer/render-view-api.md#geometrytypeenum)

#### <b>id</b>

```ts
id: string;
```

The UUID of the batch. Follows three.js uuid format.

**Returns**: string

#### <b>renderObject</b>

```ts
renderObject: Object3D;
```

The batch's renderable object. Depending on the batch type, this can be either a [_Mesh_](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh), [_LineSegment2_](https://threejs.org/docs/index.html?q=linese#api/en/objects/LineSegments), [_Points_](https://threejs.org/docs/index.html?q=point#api/en/objects/Points), [_Text_](https://www.npmjs.com/package/troika-three-text).

**Returns**: [_Object3D_](https://threejs.org/docs/index.html?q=point#api/en/core/Object3D)

#### <b>renderViews</b>

```ts
renderViews: NodeRenderView[]
```

The collection of render views that make up the batch.

**Returns**: [_NodeRenderView[]_](/viewer/render-view-api.md)

#### <b>subtreeId</b>

```ts
subtreeId: number;
```

The id of the subtree the batch is part of.

**Returns**: number

### <h3>Properties</h3>

#### <b>bounds</b>

```ts
get bounds(): Box3
```

Gets the bounds of the batch.

**Returns**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

#### <b>drawCalls</b>

```ts
get drawCalls(): number
```

Gets the current of draw calls for the batch.

**Returns**: number

#### <b>groups</b>

```ts
get groups(): DrawGroup[]
```

Gets the current list of draw groups. A draw group is equivalent to a draw call.

**Returns**: [_DrawGroup[]_](/viewer/rendering-pipeline.md#drawgroup)

#### <b>materials</b>

```ts
get materials(): Material[]
```

Gets the current list of materials used for rendering the batch.

**Returns**: [_Material[]_](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)

#### <b>minDrawCalls</b>

```ts
get minDrawCalls(): number
```

Gets the implementation's desired minimum draw calls. Ideally 1, but implementation dependant.

**Returns**: number

#### <b>triCount</b>

```ts
get triCount(): number
```

Gets the batch's triangle count.

**Returns**: number

#### <b>vertCount</b>

```ts
get vertCount(): number
```

Gets the batch's vertex count.

**Returns**: number

### <h3>Methods</h3>

#### <b>buildBatch</b>

```ts
buildBatch();
```

Build this batch. The implementation needs to make the batch renderable by:

- Building the geometry
- Creating appropriate [*BatchObjects*](if any) and their acceleration structures(if any)
- Setting appropriate batch data to the render views
- Initialising the batch's [_renderObject_](/viewer/rendering-pipeline.md#renderobject)

**Returns**: void

#### <b>getCount()</b>

```ts
getCount(): number
```

Gets the batch's primitive count

**Returns**: void

#### <b>getCount()</b>

```ts
getCount(): number
```

Gets the batch's primitive count.

**Returns**: void

#### <b>getDepth()</b>

```ts
getDepth(): BatchUpdateRange
```

Gets the batch's [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange) required for the depth pass.

**Returns**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

#### <b>getMaterial()</b>

```ts
getMaterial(renderView: NodeRenderView): Material
```

Gets the current material of the provided render view.

**Parameters**

- **renderView**: [_NodeRenderView_](/viewer/render-view-api.md)

**Returns**: [_Material_](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)

#### <b>getMaterialAtIndex()</b>

```ts
getMaterialAtIndex(index: number): Material
```

Gets the current material of the provided primitive index. Batches that build acceleration structures do not need to implement this.

**Parameters**

- **index**: The primitive index to lookup

**Returns**: [_Material_](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)

#### <b>getOpaque()</b>

```ts
getOpaque(): BatchUpdateRange
```

Gets the batch's opaque [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange).

**Returns**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

#### <b>getRenderView()</b>

```ts
getRenderView(index: number): NodeRenderView
```

Gets the render view at the specified index. Batches that build acceleration structures do not need to implement this.

**Parameters**

- **index**: The primitive index to lookup

**Returns**: [_NodeRenderView_](/viewer/render-view-api.md)

#### <b>getStencil()</b>

```ts
getStencil(): BatchUpdateRange
```

Gets the batch's stencil [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange).

**Returns**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

#### <b>getTransparent()</b>

```ts
getTransparent(): BatchUpdateRange
```

Gets the batch's transparent [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange).

**Returns**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

#### <b>getVisibleRange()</b>

```ts
getVisibleRange(): BatchUpdateRange
```

Gets the batch's visible [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange).

**Returns**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

#### <b>onRender()</b>

```ts
onRender(renderer: WebGLRenderer): void
```

Callback for the viewer's render loop.

**Parameters**

- **renderer**: [_WebGLRenderer_](https://threejs.org/docs/index.html?q=webglre#api/en/renderers/WebGLRenderer)

**Returns**: void

#### <b>onUpdate()</b>

```ts
onUpdate(deltaTime: number): void
```

Callback for the viewer's update loop.

**Parameters**

- **deltaTime**: number

**Returns**: void

#### <b>purge()</b>

```ts
purge(): void
```

Purges the batch by disposing of the associated geometry data and materials.

**Returns**: void

#### <b>resetDrawRanges()</b>

```ts
resetDrawRanges: void
```

Resets the batch to its default state where there is a single draw group rendered with the [_batchMaterial_](/viewer/rendering-pipeline.md#batchmaterial).

**Returns**: void

#### <b>setBatchBuffers()</b>

```ts
setBatchBuffers(range: BatchUpdateRange[]): void
```

Updates relevant batch buffers based on the [_MaterialOptions_](/viewer/speckle-material-api.md#materialoptions) from the provided [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange). Implementation specific.

**Parameters**

- **range**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

**Returns**: void

#### <b>setBatchMaterial()</b>

```ts
setBatchMaterial(material: Material): void
```

Sets the default batch material.

**Parameters**

- **material**: [_Material_](https://threejs.org/docs/index.html?q=mater#api/en/materials/Material)

**Returns**: void

#### <b>setDrawRanges()</b>

```ts
setDrawRanges(ranges: BatchUpdateRange[]): void
```

Sets materials to specific objects inside the batch by specifying their draw ranges.
:::tip
Materials are assigned to objects inside batches by using this method. Normally, the viewer offers a higher level of assigning materials through SpeckleRenderer's [_setMaterial_](/viewer/speckle-renderer-api.md#setmaterial) which calls this method internally.
:::

**Parameters**

- **ranges**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

**Returns**: void

#### <b>setVisibleRange()</b>

```ts
setVisibleRange(range: BatchUpdateRange[]): void
```

Sets visibility of objects inside the batch. Implementation specific.
:::warning
Mesh batches currently only allow for contiguous visibility between draw ranges. i.e no different visibility gaps. Line batches however are not restricted by this.
:::

**Parameters**

- **ranges**: [_BatchUpdateRange_](/viewer/rendering-pipeline.md#batchupdaterange)

**Returns**: void

### <h3>Typedefs</h3>

#### <b>BatchUpdateRange</b>

```ts
interface BatchUpdateRange {
  offset: number;
  count: number;
  material?: Material;
  materialOptions?: FilterMaterialOptions;
}
```

Represents a region of the batch. Multi purpose. It can represent either a specific object from the batch, or a specific index range in the batch spanning across multiple objects.

#### <b>DrawGroup</b>

```ts
interface DrawGroup {
  start: number;
  count: number;
  materialIndex?: number;
}
```

Formalisation of three.js's notion of draw group.
:::tip
The viewer's [_MeshBatch_](/viewer/rendering-pipeline.md#meshbatch) implementation of Batch uses three.js's geometry groups as a means to render parts of the batch with different materials.
:::

#### <b>LineBatch</b>

```ts
class LineBatch implements Batch {}
```

Batch implementation for lines.

#### <b>MeshBatch</b>

```ts
class MeshBatch implements Batch {}
```

Batch implementation for triangle meshes.

#### <b>InstancedMeshBatch</b>

```ts
class InstancedMeshBatch implements Batch {}
```

Batch implementation for instances of triangle meshes with hardware instancing support.

#### <b>PointBatch</b>

```ts
class PointBatch implements Batch {}
```

Batch implementation for points and point clouds.

#### <b>TextBatch</b>

```ts
class TextBatch implements Batch {}
```

Batch implementation for text. Using [_troika-three-text_](https://www.npmjs.com/package/troika-three-text) internally.
