---
title: BastchObject
deprecationMessages: viewer
---

<Banner />

# BatchObject

### <h3>Constructors</h3>

| [constructor](/viewer/batch-object-api.md#constructor)
|--- |

### <h3>Properties</h3>

| [transform](/viewer/batch-object-api.md#transform) | [transformInv](/viewer/batch-object-api.md#transforminv) 
------------------------------------------------------ | ---------------------------------------------------- |

### <h3>Accessors</h3>

| [aabb](/viewer/batch-object-api.md#aabb) | [accelerationStructure](/viewer/batch-object-api.md#accelerationstructure) | [batchIndex](/viewer/batch-object-api.md#batchindex) | [localOrigin](/viewer/batch-object-api.md#localorigin) | [renderView](/viewer/batch-object-api.md#renderview) |
| ---------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------- |

### <h3>Methods</h3>

| [buildAccelerationStructure](/viewer/batch-object-api.md#buildaccelerationstructure) | [transformTRS](/viewer/batch-object-api.md#transformtrs) |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------- |

### <h3>Typedefs</h3>

| [VectorLike](/viewer/batch-object-api.md#vectorlike) | [InstancedBatchObject](/viewer/batch-object-api.md#instancedbatchobject) |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |

### <h3>Constructors</h3>

#### <b>constructor</b>

```ts
constructor(renderView: NodeRenderView, batchIndex: number)
```

Populates/constructs this batch object.

**Parameters**

- **renderView**: [_NodeRenderView_](./render-view-api)
- **batchIndex**: The object's index within its batch. Objects are placed in order inside the batch as they get processed

### <h3>Properties</h3>

#### <b>transform</b>

```ts
transform: Matrix4;
```

The batch object's immediate transformation

**Returns**: [Matrix4](https://threejs.org/docs/index.html?q=matr#api/en/math/Matrix4)

#### <b>transformInv</b>

```ts
transformInv: Matrix4;
```

The batch object's immediate inverse transformation

**Returns**: [Matrix4](https://threejs.org/docs/index.html?q=matr#api/en/math/Matrix4)


### <h3>Accessors</h3>

#### <b>aabb</b>

```ts
get aabb(): Box3
```

Gets the axis aligned bounding box of this object.
:::tip
If you want to work with object dimensions and positioning, this is the bounds to use. This is the _transformed_ aabb, unlike [_NodeRenderView's aabb_](/viewer/render-view-api.md#aabb) which does not take any transformation into account.
:::

**Returns**: [_Box3_](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

#### <b>accelerationStructure</b>

```ts
get accelerationStructure(): AccelerationStructure
```

Gets the object's bottom level BVH.

**Returns**: [_AccelerationStructure_](/viewer/acceleration-structure-api.md)

#### <b>batchIndex</b>

```ts
get batchIndex(): number
```

Gets the object's index inside its batch.

**Returns**: number

#### <b>localOrigin</b>

```ts
get localOrigin(): Vector3
```

Gets local origin of the object. i.e the render view's aabb center.

**Returns**: [_Vector3_](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

#### <b>renderView</b>

```ts
get renderView(): NodeRenderView
```

Gets the start index inside the batch's index buffer.

**Returns**: [_NodeRenderView_](/viewer/render-view-api.md)

### <h3>Methods</h3>

#### <b>buildAccelerationStructure</b>

```ts
buildAccelerationStructure(bvh?: MeshBVH)
```

Build this object's [_AccelerationStructure_](/viewer/acceleration-structure-api.md) either from scratch, using the render view's geometry, either by using the optional bvh argument. BVH's can be shared between objects as long as it makes sense like for example for instances.
:::tip
The speckle viewer uses the [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) library as the backbone for any BVH related operations.
:::

**Parameters**

- _optional_ **bvh**: [_MeshBVH_](https://github.com/gkjohnson/three-mesh-bvh)

**Returns**: void

#### <b>transformTRS()</b>

```ts
public transformTRS(
    translation: VectorLike,
    euler?: VectorLike,
    scale?: VectorLike,
    pivot?: VectorLike
  )
```

Used for transforming the object by using translation, rotation, scale and rotation pivot values.

**Parameters**

- **translation**: The translation component of the transformation
- _optional_ **euler**: Rotation component as euler angles in XYZ order
- _optional_ **scale**: Scale component of the transformation
- _optional_ **pivot**: The rotation pivot

**Returns**: void

### <h3>Typedefs</h3>

#### <b>VectorLike</b>

```ts
type VectorLike = { x: number; y: number; z?: number; w?: number };
```

Archtype for Vector2, Vector3 and Vector4.

#### <b>InstancedBatchObject</b>

```ts
class InstancedBatchObject extends BatchObject
```

Child class used for instanced objects. No additional functionality, just some additional required logic wrapped.
