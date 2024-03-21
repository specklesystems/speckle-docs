# TopLevelAccelerationStructure
The viewer is using [*three-mesh-bvh*](https://github.com/gkjohnson/three-mesh-bvh) as the backbone for it's BVH implementation. The AccelerationStructure class is a thin wrapper around the library's [*MeshBVH*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3) class with some additional specific functionality.

The speckle viewer uses a dual level BVH for optimal acceleration. The TopLevelAccelerationStructure is a BVH comprised of several other BVHs. Each viewer batch will have a single top level acceleration structure containing all the BVHs of the individual objects that make up the batch.
### <h3>Constructors</h3>
|  	| 
|---   
| [constructor](/viewer/top-level-acceleration-structure-api.md#constructor)

### <h3>Properties</h3>
|  	| 
|---  
| [accelerationStructure](/viewer/top-level-acceleration-structure-api.md#accelerationstructure)



### <h3>Methods</h3>
|  	| 	|   |   |
|---	|---    |---    |---
| [getBoundingBox](/viewer/top-level-acceleration-structure-api.md#getboundingbox) | [raycast](/viewer/top-level-acceleration-structure-api.md#raycast) |[raycastFirst](/viewer/top-level-acceleration-structure-api.md#raycastfirst) | [refit](/viewer/top-level-acceleration-structure-api.md#refit)
| [shapecast](/viewer/top-level-acceleration-structure-api.md#shapecast) | 

### <h3>Typedefs</h3>
|   |   |
|---    |--- 
| [ExtendedIntersection](/viewer/top-level-acceleration-structure-api.md#extendedintersection) | [ExtendedShapeCastCallbacks](/viewer/top-level-acceleration-structure-api.md#extendedshapecastcallbacks)
<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(batchObjects: BatchObject[])
```
Populates/constructs this top level acceleration structure with the group of objects that comprise it
#### Parameters
- **batchObjects**: The group of [*BatchObject*](/viewer/batch-object-api.md)s that will make up this top level acceleration structure

<br>
<br>


### <h3>Properties</h3>

#### <b>accelerationStructure</b>
```ts
accelerationStructure: AccelerationStructure
```
The top-level [*AccelerationStructure*](/viewer/acceleration-structure-api.md) built on top of the group of bottom-level BVHs.
:::warning
The top-level acceleration structure does not have it's own transformation space. It's identical to the world space. Unlike the bottom-level acceleration structure which is always centered around the world origin
:::
#### Returns: [*AccelerationStructure*](/viewer/acceleration-structure-api.md)

<br>
<br>

### <h3>Methods</h3>

#### <b>getBoundingBox</b>
```ts
getBoundingBox(target?: Box3): Box3
```
Gets the aabb of the entire top level BVH
#### Parameters
- *optional* **target**: [*Box3*](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

#### Returns: [*Box3*](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

<br>

#### <b>raycast</b>
```ts
raycast(
    ray: Ray,
    materialOrSide: Side | Material | Material[] = FrontSide
): ExtendedIntersection[]
```
Wrapper over three-mesh-bvh raycast function. Queries the top-level BVH first, then if it finds intersections, it goes down to the bottom-level BVHs and raycasts against them
#### Parameters
- **ray**: [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) to intersect with
- **materialOrSide**: [*Side*](https://threejs.org/docs/index.html?q=Materia#api/en/constants/Materials) | [*Material*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material) | [*Material[]*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material)

#### Returns: [*ExtendedIntersection*](/viewer/top-level-acceleration-structure-api.md#extendedintersection)

<br>

#### <b>raycastFirst</b>
```ts
raycastFirst(
    ray: Ray,
    materialOrSide: Side | Material | Material[] = FrontSide
): ExtendedIntersection
```
Identical to `raycast` but stops at first intersection found. Queries the top-level BVH first, then if it finds intersections, it goes down to the bottom-level BVHs and raycasts against them
#### Parameters
- **ray**: [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) to intersect with
- **materialOrSide**: [*Side*](https://threejs.org/docs/index.html?q=Materia#api/en/constants/Materials) | [*Material*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material) | [*Material[]*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material)

#### Returns: [*ExtendedIntersection*](/viewer/top-level-acceleration-structure-api.md#extendedintersection)

<br>

#### <b>raycastFirst</b>
```ts
refit(): void
```
Rebuilds the top level acceleration structure. Whenever any of the comprising batch objects update their transfromation, a refit needs to be called.
:::tip
`refit` is called automatically whenever any of the comprising [*BatchObjects*](/viewer/batch-object-api.md) update their transformation
:::
#### Returns: void

<br>

#### <b>shapecast</b>
```ts
shapecast(callbacks: ExtendedShapeCastCallbacks): boolean
```
Generic mechanism to intersect the BVH with various shapes/objects. The callbacks provide granular access to several stages of both the top-level BVH and bottom-level BVH intersection process
#### Parameters
- **callbacks**: [ExtendedShapeCastCallbacks](/viewer/top-level-acceleration-structure-api.md#extendedshapecastcallbacks)

#### Returns: boolean

<br>
<br>

### <h3>Typedefs</h3>

<br>

#### <b>ExtendedIntersection</b>

```ts
interface ExtendedIntersection extends Intersection {
  batchObject?: BatchObject
  material?: Material
}
```
Extension of three.js's default Intersection

<br>

#### <b>ExtendedShapeCastCallbacks</b>

```ts
type ExtendedShapeCastCallbacks = {
  intersectsTAS?: (
    box: Box3,
    isLeaf: boolean,
    score: number | undefined,
    depth: number,
    nodeIndex: number
  ) => ShapecastIntersection | boolean
  intersectTASRange?: (batchObject: BatchObject) => ShapecastIntersection | boolean
  intersectsBounds: (
    box: Box3,
    isLeaf: boolean,
    score: number | undefined,
    depth: number,
    nodeIndex: number
  ) => ShapecastIntersection | boolean

  traverseBoundsOrder?: (box: Box3) => number
} & (
  | {
      intersectsRange: (
        triangleOffset: number,
        triangleCount: number,
        contained: boolean,
        depth: number,
        nodeIndex: number,
        box: Box3
      ) => boolean
    }
  | {
      intersectsTriangle: (
        triangle: ExtendedTriangle,
        triangleIndex: number,
        contained: boolean,
        depth: number,
        batchObject?: BatchObject
      ) => boolean | void
    }
)
```
Extension of three-mesh-bvh shapecast callbacks with the addition of top level acceleration structure stages.


