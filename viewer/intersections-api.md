---
title: Intersections
deprecationMessages: viewer
---

<Banner />

# Intersections

Entry point for intersecting and obtaining intersection data from the scene. Accessible from [_SpeckleRenderer_](/viewer/speckle-renderer-api.md)

### <h3>Methods</h3>

| [intersect](/viewer/intersections-api.md#intersect) | [intersectRay](/viewer/intersections-api.md#intersectray) |
| --------------------------------------------------- | --------------------------------------------------------- |

### <h3>Typedefs</h3>

| [ExtendedIntersection](/viewer/intersections-api.m#extendedintersection) | [ExtendedMeshIntersection](/viewer/intersections-api.m#extendedmeshintersection)  | [MeshIntersection](/viewer/intersections-api.m#meshintersection) 
| :------------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------- | 


### <h3>Methods</h3>

#### <b>intersect</b>

```ts
intersect(
    scene: Scene,
    camera: Camera,
    point: Vector2,
    castLayers: ObjectLayers.STREAM_CONTENT_MESH,
    nearest?: boolean,
    bounds?: Box3,
    firstOnly?: boolean,
    tasOnly?: boolean
  ): Array<ExtendedMeshIntersection> | null

intersect(
    scene: Scene,
    camera: Camera,
    point: Vector2,
    castLayers?: Array<ObjectLayers>,
    nearest?: boolean,
    bounds?: Box3,
    firstOnly?: boolean,
    tasOnly?: boolean
  ): Array<ExtendedIntersection> | null
```

Scene intersect function.
:::tip
All intersect calls from this class will use the available acceleration structures. This makes the intersection **significantly** faster than using your own three.js raycasters.
:::

**Parameters**

- **scene**: [_Scene_](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)
- **camera**: [_Camera_](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- **point**: The NDC point to cast the ray from
- **castLayers**: The [_ObjectLayers_](/viewer/viewer-api.md#objectlayers) enabled on the raycaster 
- **nearest**: If the results should be sorted by dinstance. i.e nearest first
- **bounds**: An optional bounds where the intersecting takes place. Everything outside this bounds is disregarded from the result list
for this cast. Any object outside of these layers is disregarded from intersection
- **firstOnly**: When this flag is enabled the acceleration structure will stop traversing after encountering the first intersection. Only applies to meshes
- **tasOnly**: When this flag is enabled, onyl the TAS will be intersected. Can be combined with `firstOnly` if wanted
**Returns**: Array< Intersection > Three.js defined intersection

#### <b>intersectRay</b>

```ts
intersectRay(
    scene: Scene,
    camera: Camera,
    ray: Ray,
    castLayers: ObjectLayers.STREAM_CONTENT_MESH,
    nearest?: boolean,
    bounds?: Box3,
    firstOnly?: boolean,
    tasOnly?: boolean
  ): Array<ExtendedMeshIntersection> | null
intersectRay(
    scene: Scene,
    camera: Camera,
    ray: Ray,
    castLayers?: Array<ObjectLayers>,
    nearest?: boolean,
    bounds?: Box3,
    firstOnly?: boolean,
    tasOnly?: boolean
  ): Array<ExtendedIntersection> | null
```

Scene intersect function using a provided Ray.
:::tip
All intersect calls from this class will use the available acceleration structures. This makes the intersection **significantly** faster than using your own three.js raycasters.
:::

**Parameters**

- **scene**: [_Scene_](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)
- **camera**: [_Camera_](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- **ray**: The ray to use for casting
- **castLayers**: The [_ObjectLayers_](/viewer/viewer-api.md#objectlayers) enabled on the raycaster 
- **nearest**: If the results should be sorted by dinstance. i.e nearest first
- **bounds**: An optional bounds where the intersecting takes place. Everything outside this bounds is disregarded from the result list
for this cast. Any object outside of these layers is disregarded from intersection
- **firstOnly**: When this flag is enabled the acceleration structure will stop traversing after encountering the first intersection. Only applies to meshes
- **tasOnly**: When this flag is enabled, onyl the TAS will be intersected. Can be combined with `firstOnly` if wanted
**Returns**: Array< Intersection > Three.js defined intersection

### <h3>Typedefs</h3>

#### <b>ExtendedIntersection</b>

```ts
interface ExtendedIntersection extends Intersection {
  batchObject?: BatchObject;
  pointOnLine?: Material;
}
```

Extension of three.js's default Intersection.

#### <b>ExtendedMeshIntersection</b>

```ts
interface ExtendedMeshIntersection extends MeshIntersection {
  batchObject: BatchObject
  object: SpeckleMesh | SpeckleInstancedMesh
}
```

#### <b>MeshIntersection</b>

```ts
interface MeshIntersection extends Intersection {
  face: Face
  faceIndex: number
}
```

