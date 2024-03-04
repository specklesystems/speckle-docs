# Intersections
Entry point for intersecting and obtaining intersection data from the scene. Accessible from [*SpeckleRenderer*](/viewer/speckle-renderer-api.md)


### <h3>Methods</h3>
|  	|   |
|---    |---
| [intersect](/viewer/intersections-api.md#intersect) | [intersectRay](/viewer/intersections-api.md#intersectray)


<br>
<br>

### <h3>Methods</h3>
#### <b>intersect</b>
```ts
intersect(
    scene: Scene,
    camera: Camera,
    point: Vector2,
    nearest = true,
    bounds: Box3 = null,
    castLayers: Array<ObjectLayers> = undefined,
    firstOnly = false
  ): Array<Intersection>
```
Scene intersect function
:::tip
All intersect calls from this class will use the available acceleration structures. This makes the intersection **significantly** faster than using your own three.js raycasters
:::
#### Parameters
- **scene**: [*Scene*](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)
- **camera**: [*Camera*](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- **point**: The NDC point to cast the ray from
- **nearest**: If the results should be sorted by dinstance. i.e nearest first
- **bounds**: An optional bounds where the intersecting takes place. Everything outside this bounds is disregarded from the result list
- **castLayers**: The [*ObjectLayers*](/viewer/viewer-api.md#objectlayers) enabled on the raycaster for this cast. Any object outside of these layers is disregarded from intersection
- **firstOnly**: When this flag is enabled the acceleration structure will stop traversing after encountering the first intersection. Only applies to meshes
#### Returns: Array< Intersection > Three.js defined intersection

<br>

#### <b>intersectRay</b>
```ts
intersectRay(
    scene: Scene,
    camera: Camera,
    ray: Ray,
    nearest = true,
    bounds: Box3 = null,
    castLayers: Array<ObjectLayers> = undefined,
    firstOnly = false
  ): Array<Intersection>
```
Scene intersect function using a provided Ray
:::tip
All intersect calls from this class will use the available acceleration structures. This makes the intersection **significantly** faster than using your own three.js raycasters
:::
#### Parameters
- **scene**: [*Scene*](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)
- **camera**: [*Camera*](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- **ray**: The ray to use for casting
- **nearest**: If the results should be sorted by dinstance. i.e nearest first
- **bounds**: An optional bounds where the intersecting takes place. Everything outside this bounds is disregarded from the result list
- **castLayers**: The [*ObjectLayers*](/viewer/viewer-api.md#objectlayers) enabled on the raycaster for this cast. Any object outside of these layers is disregarded from intersection
- **firstOnly**: When this flag is enabled the acceleration structure will stop traversing after encountering the first intersection. Only applies to meshes
#### Returns: Array< Intersection > Three.js defined intersection
<br>
<br>