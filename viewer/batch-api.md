# Batch
A batch is the structural component of the viewer's scenegraph. All loaded objects are split and organized into batches. Instead of adding each individual object as an Object3D derived entity to the three.js scene, we split and organize them into batches, which are then added to the three.js scene.

The `Batch` is defined as an `interface` and we have several batch types, based on the geometry type, implemeting it.

### <h3>Properties</h3>
|  	|   |   |   |
|---    |---    |---    |---
| [batchMaterial](/viewer/batch-object-api.md#batchmaterial) | [geometryType](/viewer/batch-object-api.md#geometrytype) | [id](/viewer/batch-object-api.md#id) | [renderObject](/viewer/batch-object-api.md#renderobject) 
| [renderViews](/viewer/batch-object-api.md#renderviews) | [subtreeId](/viewer/batch-object-api.md#subtreeid)


### <h3>Accessors</h3>
|  	|   |   |   |
|---    |---    |---    |---
| [bounds](/viewer/batch-object-api.md#bounds) | [drawCalls](/viewer/batch-object-api.md#drawcalls) | [groups](/viewer/batch-object-api.md#groups) | [materials](/viewer/batch-object-api.md#materials) 
| [minDrawCalls](/viewer/batch-object-api.md#mindrawcalls) | [triCount](/viewer/batch-object-api.md#tricount) | [vertCount](/viewer/batch-object-api.md#vertcount)



### <h3>Methods</h3>
|  	| 	|   |   |
|---	|---    |---    |---
| [buildBatch](/viewer/batch-object-api.md#buildbatch) 	| [getCount](/viewer/batch-object-api.md#getcount) | [getMaterial](/viewer/batch-object-api.md#getmaterial) | [getMaterialAtIndex](/viewer/batch-object-api.md#getmaterialatindex)	
| [getOpaque](/viewer/batch-object-api.md#getopaque) 	| [getRenderView](/viewer/batch-object-api.md#getrenderview) | [getStencil](/viewer/batch-object-api.md#getstencil) | [getTransparent](/viewer/batch-object-api.md#gettransparent)	
| [getVisibleRange](/viewer/batch-object-api.md#getvisiblerange) 	| [onRender](/viewer/batch-object-api.md#onrender) | [onUpdate](/viewer/batch-object-api.md#onupdate) | [purge](/viewer/batch-object-api.md#purge)	
| [resetDrawRanges](/viewer/batch-object-api.md#resetdrawranges) 	| [setBatchBuffers](/viewer/batch-object-api.md#setbatchbuffers) | [setBatchMaterial](/viewer/batch-object-api.md#setbatchmaterial) | [setDrawRanges](/viewer/batch-object-api.md#setdrawranges)	
| [setVisibleRange](/viewer/batch-object-api.md#setvisiblerange)

### <h3>Typedefs</h3>
|  	|   |   |   |
|---    |---    |---	|---		
| [BatchUpdateRange](/viewer/batch-object-api.md#batchupdaterange) | [DrawGroup](/viewer/batch-object-api.md#drawgroup) | [LineBatch](/viewer/batch-object-api.md#linebatch) | [MeshBatch](/viewer/batch-object-api.md#meshbatch)
| [PointBatch](/viewer/batch-object-api.md#pointbatch) | [TextBatch](/viewer/batch-object-api.md#textbatch) | [InstancedMeshBatch](/viewer/batch-object-api.md#instancedmeshbatch)
<br><br>


### <h3>Properties</h3>

#### <b>batchMaterial</b>
```ts
batchMaterial: Material
```
The batch's default material, based on which it's objects have been grouped.
#### Returns: [*Material*](https://threejs.org/docs/index.html?q=mater#api/en/materials/Material)

<br>

#### <b>geometryType</b>
```ts
geometryType: GeometryType
```
The batch's [*GeometryType*](/viewer/render-view-api.md#geometrytypeenum)
#### Returns: [*GeometryType*](/viewer/render-view-api.md#geometrytypeenum)

<br>

#### <b>id</b>
```ts
id: string
```
The UUID of the batch. Follows three.js uuid format
#### Returns: string

<br>

#### <b>renderObject</b>
```ts
renderObject: Object3D
```
The batch's renderable object. Depending on the batch type, this can be either a [*Mesh*]()
#### Returns: [*Vector3*](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

<br>

#### <b>renderView</b>
```ts
get renderView(): NodeRenderView
```
Gets the start index inside the batch's index buffer
#### Returns: [*NodeRenderView*](/viewer/render-view-api.md)

<br>
<br>

### <h3>Methods</h3>
#### <b>buildAccelerationStructure</b>
```ts
buildAccelerationStructure(bvh?: MeshBVH)
```
Build this object's [*AccelerationStructure*]() either from scratch, using the render view's geometry, either by using the optional bvh argument. BVH's can be shared between objects as long as it makes sense like for example for instances
:::tip
The speckle viewer uses the [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) library as the backbone for any BVH related operations
:::
#### Parameters
- *optional* **bvh**: [*MeshBVH*](https://github.com/gkjohnson/three-mesh-bvh)


#### Returns: void

<br>

#### <b>transformTRS()</b>
```ts
public transformTRS(
    translation: VectorLike,
    euler?: VectorLike,
    scale?: VectorLike,
    pivot?: VectorLike
  )
```
Used for transforming the object by using translation, rotation, scale and rotation pivot values
#### Parameters
- **translation**: The translation component of the transformation
- *optional* **euler**: Rotation component as euler angles in XYZ order
- *optional* **scale**: Scale component of the transformation
- *optional* **pivot**: The rotation pivot

#### Returns: void

<br>
<br>

### <h3>Typedefs</h3>

<br>

#### <b>VectorLike</b>

```ts
type VectorLike = { x: number; y: number; z?: number; w?: number }
```
Archtype for Vector2, Vector3 and Vector4






