# AccelerationStructure
The viewer is using [*three-mesh-bvh*](https://github.com/gkjohnson/three-mesh-bvh) as the backbone for it's BVH implementation. The AccelerationStructure class is a thin wrapper around the library's [*MeshBVH*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3) class with some additional specific functionality.

The speckle viewer uses a dual level BVH for optimal acceleration. The AccelerationStructure is the functional element of the *bottom-level* acceleration structure. Each individual object will have it's own BVH, encapsulated by an AccelerationStructure object
### <h3>Constructors</h3>
|  	| 
|---   
| [constructor](/viewer/acceleration-structure-api.md#constructor)

### <h3>Accessors</h3>
|  	|   |
|---    |---  
| [bvh](/viewer/acceleration-structure-api.md#bvh) | [geometry](/viewer/acceleration-structure-api.md#geometry) 



### <h3>Methods</h3>
|  	| 	|   |   |
|---	|---    |---    |---
| [buildBVH](/viewer/acceleration-structure-api.md#buildbvh) 	| [getBoundingBox](/viewer/acceleration-structure-api.md#getboundingbox) | [getVertexAtIndex](/viewer/acceleration-structure-api.md#getvertexatindex) | [raycast](/viewer/acceleration-structure-api.md#raycast)
| [raycastFirst](/viewer/acceleration-structure-api.md#raycastfirst) 	| [shapecast](/viewer/acceleration-structure-api.md#shapecast) | [transformInput](/viewer/acceleration-structure-api.md#transforminput) | [transformOutput](/viewer/acceleration-structure-api.md#transformoutput)

### <h3>Typedefs</h3>
|  	| 
|---	
| [VectorLike](/viewer/acceleration-structure-api.md#vectorlike) 
<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(bvh: MeshBVH)
```
Populates/constructs this acceleration structure with the backing BVH
#### Parameters
- **bvh**: The backing BVH as a [*MeshBVH*](https://github.com/gkjohnson/three-mesh-bvh/blob/master/src/core/MeshBVH.js)

<br>
<br>


### <h3>Accessors</h3>

#### <b>bvh</b>
```ts
get bvh(): MeshBVH
```
Gets the backing BVH
#### Returns: [*MeshBVH*](https://github.com/gkjohnson/three-mesh-bvh/blob/master/src/core/MeshBVH.js)

<br>

#### <b>geometry</b>
```ts
get geometry(): BufferGeometry
```
Gets the three.js geometry associated to the BVH. 
:::tip
When building a BVH, three-mesh-bvh library needs a three.js geometry as input. This is that geometry. We don't use it for rendering.
:::
#### Returns: [*BufferGeometry*](https://threejs.org/docs/index.html?q=buffer#api/en/core/BufferGeometry)

<br>
<br>

### <h3>Methods</h3>
#### <b>buildBVH</b>
```ts
static buildBVH(
    indices: number[],
    position: Float32Array,
    options: BVHOptions = DefaultBVHOptions,
    transform?: Matrix4
): MeshBVH
```
Build a BVH using the provided geometry data.
#### Parameters
- **indices**: Geometry indices
- **position**: Geometry vertex positions
- **options**: [*BVHOptions*]()
- *optional* **transform**: A [*Matrix4*](https://threejs.org/docs/index.html?q=matri#api/en/math/Matrix4) that transforms the geometry data before building the BVH


#### Returns: [*MeshBVH*](https://github.com/gkjohnson/three-mesh-bvh/blob/master/src/core/MeshBVH.js)

<br>

#### <b>getBoundingBox</b>
```ts
getBoundingBox(target?: Box3): Box3
```
Gets the aabb of the entire BVH
#### Parameters
- *optional* **target**: [*Box3*](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

#### Returns: [*Box3*](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

<br>

#### <b>getVertexAtIndex</b>
```ts
getVertexAtIndex(index: number): Vector3
```
Gets position value of a vertex at the given index inside the BVH vertex position array
#### Parameters
- **index**: number

#### Returns: [*Vector3*](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)


<br>

#### <b>raycast</b>
```ts
raycast(
    ray: Ray,
    materialOrSide: Side | Material | Material[] = FrontSide
): Intersection<Object3D<Event>>[]
```
Wrapper over three-mesh-bvh raycast function. Keeps original behavior,but makes sure input and output spaces are correct.
#### Parameters
- **ray**: [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) to intersect with
- **materialOrSide**: [*Side*](https://threejs.org/docs/index.html?q=Materia#api/en/constants/Materials) | [*Material*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material) | [*Material[]*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material)

#### Returns: [*Intersection*](https://threejs.org/docs/index.html?q=rayc#api/en/core/Raycaster.intersectObject)

<br>

#### <b>raycastFirst</b>
```ts
raycastFirst(
    ray: Ray,
    materialOrSide: Side | Material | Material[] = FrontSide
): Intersection<Object3D<Event>>[]
```
Identical to `raycast` but stops at first intersection found
#### Parameters
- **ray**: [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) to intersect with
- **materialOrSide**: [*Side*](https://threejs.org/docs/index.html?q=Materia#api/en/constants/Materials) | [*Material*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material) | [*Material[]*](https://threejs.org/docs/index.html?q=Materia#api/en/materials/Material)

#### Returns: [*Intersection*](https://threejs.org/docs/index.html?q=rayc#api/en/core/Raycaster.intersectObject)

<br>

#### <b>shapecast</b>
```ts
shapecast(
    callbacks: {
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
            depth: number
          ) => boolean | void
        }
    )
  ): boolean
```
Generic mechanism to intersect the BVH with various shapes/objects. The callbacks provide granular access to several stages of the BVH intersection process
#### Parameters
- **callbacks**: More details [*here*](https://github.com/gkjohnson/three-mesh-bvh/tree/master?tab=readme-ov-file#shapecast)

#### Returns: boolean

<br>

#### <b>transformInput</b>
```ts
transformInput<T extends Vector3 | Ray | Box3>(input: T): T
```
Transform input vector, ray or box from world space into the acceleration structure's space
:::warning
All the AccelerationStructure methods that deal with querying the BVH: [getBoundingBox](/viewer/acceleration-structure-api.md#getboundingbox), [getVertexAtIndex](/viewer/acceleration-structure-api.md#getvertexatindex), [raycast](/viewer/acceleration-structure-api.md#raycast), [raycastFirst](/viewer/acceleration-structure-api.md#raycastfirst), [shapecast](/viewer/acceleration-structure-api.md#shapecast) already call this function implicitly
:::
#### Parameters
- **input**: [*Vector3*](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3) | [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) | [*Box3*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

#### Returns: [*Vector3*](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3) | [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) | [*Box3*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

<br>

#### <b>transformOutput</b>
```ts
transformOutput<T extends Vector3 | Ray | Box3>(output: T): T
```
Transform input vector, ray or box from the acceleration structure's space into world space
#### Parameters
- **input**: [*Vector3*](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3) | [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) | [*Box3*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)
:::warning
All the AccelerationStructure methods that deal with querying the BVH: [getBoundingBox](/viewer/acceleration-structure-api.md#getboundingbox), [getVertexAtIndex](/viewer/acceleration-structure-api.md#getvertexatindex), [raycast](/viewer/acceleration-structure-api.md#raycast), [raycastFirst](/viewer/acceleration-structure-api.md#raycastfirst), [shapecast](/viewer/acceleration-structure-api.md#shapecast) already call this function implicitly
:::
#### Returns: [*Vector3*](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3) | [*Ray*](https://threejs.org/docs/index.html?q=ray#api/en/math/Ray) | [*Box3*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)



<br>
<br>

### <h3>Typedefs</h3>

<br>

#### <b>VectorLike</b>

```ts
type VectorLike = { x: number; y: number; z?: number; w?: number }
```
Archtype for Vector2, Vector3 and Vector4





