# BatchObject

### <h3>Constructors</h3>
|  	| 
|---   
| [constructor](/viewer/batch-object-api.md#constructor)

### <h3>Accessors</h3>
|  	|   |   |   |
|---    |---    |---    |---
| [aabb](/viewer/batch-object-api.md#aabb) | [accelerationStructure](/viewer/batch-object-api.md#accelerationstructure) | [batchIndex](/viewer/batch-object-api.md#batchindex) | [localOrigin](/viewer/batch-object-api.md#localorigin) 
| [renderView](/viewer/batch-object-api.md#renderview)



### <h3>Methods</h3>
|  	| 	|
|---	|---
| [buildAccelerationStructure](/viewer/batch-object-api.md#buildaccelerationstructure) 	| [transformTRS](/viewer/batch-object-api.md#transformtrs) 	

### <h3>Typedefs</h3>
|  	|   |
|---	|---
| [VectorLike](/viewer/batch-object-api.md#vectorlike) | [InstancedBatchObject](/viewer/batch-object-api.md#instancedbatchobject)
<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(renderView: NodeRenderView, batchIndex: number)
```
Populates/constructs this batch object
#### Parameters
- **renderView**: [*NodeRenderView*](/viewer/viewer/render-view-api.md)
- **batchIndex**: The object's index within it's batch. Objects are placed in order inside the batch as they get processed 

<br>
<br>


### <h3>Accessors</h3>

#### <b>aabb</b>
```ts
get aabb(): Box3
```
Gets the axis aligned bounding box of this object
:::tip
If you want to work with object dimensions and positioning, this is the bounds to use. This is the *transformed* aabb, unlike [*NodeRenderView's aabb*](/viewer/render-view-api.md#aabb) which does not take any transformation into account. 
:::
#### Returns: [*Box3*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

<br>

#### <b>accelerationStructure</b>
```ts
get accelerationStructure(): AccelerationStructure
```
Gets the object's bottom level BVH
#### Returns: [*AccelerationStructure*]()

<br>

#### <b>batchIndex</b>
```ts
get batchIndex(): number
```
Gets the object's index inside it's batch
#### Returns: number

<br>

#### <b>localOrigin</b>
```ts
get localOrigin(): Vector3
```
Gets local origin of the object. i.e the render view's aabb center
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

<br>

#### <b>InstancedBatchObject</b>
```ts
class InstancedBatchObject extends BatchObject
```
Child class used for instanced objects. No additional functionality, just some additional required logic wrapped



