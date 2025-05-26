---
title: TopLevelAccelerationStructure
deprecationMessages: viewer
---

<Banner />

# TopLevelAccelerationStructure

The viewer is using [_three-mesh-bvh_](https://github.com/gkjohnson/three-mesh-bvh) as the backbone for it's BVH implementation. The AccelerationStructure class is a thin wrapper around the library's [_MeshBVH_](https://threejs.org/docs/index.html?q=box#api/en/math/Box3) class with some additional specific functionality.

The speckle viewer uses a dual level BVH for optimal acceleration. The TopLevelAccelerationStructure is a BVH comprised of several other BVHs. Each viewer batch will have a single top level acceleration structure containing all the BVHs of the individual objects that make up the batch.

### <h3>Constructors</h3>

| [constructor](/viewer/top-level-acceleration-structure-api.md#constructor) |
| -------------------------------------------------------------------------- |

### <h3>Properties</h3>

| [accelerationStructure](/viewer/top-level-acceleration-structure-api.md#accelerationstructure) |
| ---------------------------------------------------------------------------------------------- |

### <h3>Methods</h3>
| [closestPointToPoint](/viewer/top-level-acceleration-structure-api.md#closestpointtopoint) | [raycast](/viewer/top-level-acceleration-structure-api.md#raycast) | [raycastFirst](/viewer/top-level-acceleration-structure-api.md#raycastfirst) | [refit](/viewer/top-level-acceleration-structure-api.md#refit)
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------- | :-------------------------------------------------------------- | :-------------------------------------------------------- |
 | [shapecast](/viewer/top-level-acceleration-structure-api.md#shapecast) 


### <h3>Typedefs</h3>

[ExtendedShapeCastCallbacks](/viewer/top-level-acceleration-structure-api.md#extendedshapecastcallbacks) |
| -------------------------------------------------------------------------------------------- | 

### <h3>Constructors</h3>

#### <b>constructor</b>

```ts
constructor(batchObjects: BatchObject[])
```

Populates/constructs this top level acceleration structure with the group of objects that comprise it.

**Parameters**

- **batchObjects**: The group of [_BatchObject_](/viewer/batch-object-api.md)s that will make up this top level acceleration structure

### <h3>Properties</h3>

#### <b>accelerationStructure</b>

```ts
accelerationStructure: AccelerationStructure;
```

The top-level [_AccelerationStructure_](/viewer/acceleration-structure-api.md) built on top of the group of bottom-level BVHs.
:::warning
The top-level acceleration structure does not have it's own transformation space. It's identical to the world space. Unlike the bottom-level acceleration structure which is always centered around the world origin.
:::

**Returns**: [_AccelerationStructure_](/viewer/acceleration-structure-api.md)

### <h3>Methods</h3>

#### <b>closestPointToPoint</b>

```ts
closestPointToPoint(point: Vector3): HitPointInfo | null
```

Returns the closest point on the BVH to the provided argument

**Parameters**

- **point**: [_Vector3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Vector3) The point in space we want to find the closest point in the BVH to

**Returns**: [_HitPointInfo_](https://github.com/gkjohnson/three-mesh-bvh/blob/be976e6746123f37faa8527b63c13cec9782253c/src/index.d.ts#L17)


#### <b>getBoundingBox</b>

```ts
getBoundingBox(target?: Box3): Box3
```

Gets the aabb of the entire top level BVH.

**Parameters**

- _optional_ **target**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

**Returns**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

#### <b>raycast</b>

```ts
raycast(
    ray: Ray,
    materialOrSide: Side | Material | Material[] = FrontSide
): ExtendedIntersection[]
```

Wrapper over three-mesh-bvh raycast function. Queries the top-level BVH first, then if it finds intersections, it goes down to the bottom-level BVHs and raycasts against them.

**Parameters**

- **ray**: [_Ray_](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) to intersect with
- **materialOrSide**: [_Side_](https://threejs.org/docs/index.html?q=Materia#api/en/constants/Materials) | [_Material_](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material) | [_Material[]_](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material)

**Returns**: [_ExtendedIntersection_](/viewer/top-level-acceleration-structure-api.md#extendedintersection)

#### <b>raycastFirst</b>

```ts
raycastFirst(
    ray: Ray,
    materialOrSide: Side | Material | Material[] = FrontSide
): ExtendedIntersection
```

Identical to `raycast` but stops at first intersection found. Queries the top-level BVH first, then if it finds intersections, it goes down to the bottom-level BVHs and raycasts against them.

**Parameters**

- **ray**: [_Ray_](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) to intersect with
- **materialOrSide**: [_Side_](https://threejs.org/docs/index.html?q=Materia#api/en/constants/Materials) | [_Material_](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material) | [_Material[]_](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material)

**Returns**: [_ExtendedIntersection_](/viewer/top-level-acceleration-structure-api.md#extendedintersection)

#### <b>raycastFirst</b>

```ts
refit(): void
```

Rebuilds the top level acceleration structure. Whenever any of the comprising batch objects update their transfromation, a refit needs to be called.
:::tip
`refit` is called automatically whenever any of the comprising [_BatchObjects_](/viewer/batch-object-api.md) update their transformation.
:::

**Returns**: void

#### <b>shapecast</b>

```ts
shapecast(callbacks: ExtendedShapeCastCallbacks): boolean
```

Generic mechanism to intersect the BVH with various shapes/objects. The callbacks provide granular access to several stages of both the top-level BVH and bottom-level BVH intersection process.

**Parameters**

- **callbacks**: [ExtendedShapeCastCallbacks](/viewer/top-level-acceleration-structure-api.md#extendedshapecastcallbacks)

**Returns**: boolean

### <h3>Typedefs</h3>

#### <b>ExtendedShapeCastCallbacks</b>

```ts
type ExtendedShapeCastCallbacks = {
  intersectsTAS?: (
    box: Box3,
    isLeaf: boolean,
    score: number | undefined,
    depth: number,
    nodeIndex: number
  ) => ShapecastIntersection | boolean;
  intersectTASRange?: (
    batchObject: BatchObject
  ) => ShapecastIntersection | boolean;
  intersectsBounds: (
    box: Box3,
    isLeaf: boolean,
    score: number | undefined,
    depth: number,
    nodeIndex: number
  ) => ShapecastIntersection | boolean;

  traverseBoundsOrder?: (box: Box3) => number;
} & (
  | {
      intersectsRange: (
        triangleOffset: number,
        triangleCount: number,
        contained: boolean,
        depth: number,
        nodeIndex: number,
        box: Box3
      ) => boolean;
    }
  | {
      intersectsTriangle: (
        triangle: ExtendedTriangle,
        triangleIndex: number,
        contained: boolean,
        depth: number,
        batchObject?: BatchObject
      ) => boolean | void;
    }
);
```

Extension of three-mesh-bvh shapecast callbacks with the addition of top level acceleration structure stages.
