---
title: SpeckleRenderer
deprecationMessages: viewer
---

<Banner />

# SpeckleRenderer

<!-- <style>
td, th{
    border: none;
}
</style> -->

### <h3>Accessors</h3>


| [allObjects](/viewer/speckle-renderer-api.md#allobjects) | [clippingPlanes](/viewer/speckle-renderer-api.md#clippingplanes)   | [clippingVolume](/viewer/speckle-renderer-api.md#clippingvolume) | [indirectIBL](/viewer/speckle-renderer-api.md#indirectibl)   |
| :--------------------------------------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------------- | :----------------------------------------------------------------- |      
| [indirectIBLIntensity](/viewer/speckle-renderer-api.md#indirectiblintensity) | [intersections](/viewer/speckle-renderer-api.md#intersections)     | [needsRender](/viewer/speckle-renderer-api.md#needsrender)       | [pipeline](/viewer/speckle-renderer-api.md#pipeline) |
| [renderer](/viewer/speckle-renderer-api.md#renderer)                         | [renderingCamera](/viewer/speckle-renderer-api.md#renderingcamera) | [renderingStats](/viewer/speckle-renderer-api.md#renderingstats) | [scene](/viewer/speckle-renderer-api.md#scene)                     |
| [sceneBox](/viewer/speckle-renderer-api.md#scenebox)                         | [sceneCenter](/viewer/speckle-renderer-api.md#scenecenter)         | [sceneSphere](/viewer/speckle-renderer-api.md#scenesphere)       | [shadowcatcher](/viewer/speckle-renderer-api.md#shadowcatcher)     |
| [shadowMapNeedsUpdate](/viewer/speckle-renderer-api.md#shadowmapneedsupdate) | [sunLight](/viewer/speckle-renderer-api.md#sunlight)               |

### <h3>Methods</h3>


| [addRenderTree](/viewer/speckle-renderer-api.md#addrendertree) | [boxFromObjects](/viewer/speckle-renderer-api.md#boxfromobjects)  | [cancelRenderTree](/viewer/speckle-renderer-api.md#cancelrendertree)  | [enableLayers](/viewer/speckle-renderer-api.md#enablelayers)  |
| :------------------------------------------------------------- | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| [getBatch](/viewer/speckle-renderer-api.md#getbatch)           | [getBatchMaterial](/viewer/speckle-renderer-api.md#getbatchmaterial)       | [getMaterial](/viewer/speckle-renderer-api.md#getmaterial)                               | [getObject](/viewer/speckle-renderer-api.md#getobject)                               |
| [getObjects](/viewer/speckle-renderer-api.md#get0bjects)       | [removeRenderTree](/viewer/speckle-renderer-api.md#removerendertree)       | [renderViewFromIntersection](/viewer/speckle-renderer-api.md#renderviewfromintersection) | [resetMaterials](/viewer/speckle-renderer-api.md#resetmaterials)                     |
| [resetPipeline](/viewer/speckle-renderer-api.md#resetpipeline) | [resize](/viewer/speckle-renderer-api.md#resize)                           | [setMaterial](/viewer/speckle-renderer-api.md#setmaterial)                               | [setSunLightConfiguration](/viewer/speckle-renderer-api.md#setsunlightconfiguration) |
| [screenshot](/viewer/speckle-renderer-api.md#screenshot)       | [updateShadowCatcher](/viewer/speckle-renderer-api.md#updateshadowcatcher) |

### <h3>Typedefs</h3>

 [RenderingStats](/viewer/speckle-renderer-api.md#renderingstats) | [SunLightConfiguration](/viewer/speckle-renderer-api.md#sunlightconfiguration)
| :------------------------------------------------------------------------- | :----------------------------------------------------------------------------- | 


### <h3>Accessors</h3>

#### <b>allObjects</b>

```ts
get allObjects(): Object3D
```

Gets the parent three.js object for all _loaded_ scene content.

**Returns**: [**_Object3D_**](https://threejs.org/docs/index.html?q=objec#api/en/core/Object3D)

#### <b>clippingPlanes</b>

```ts
get clippingPlanes(): Plane[]
set clippingPlanes(value: Plane[])
```

Gets or set the clipping [_Plane_](https://threejs.org/docs/index.html?q=plane#api/en/math/Plane)s for the scene. Anything outside the volume determined by the clipping planes will get visually clipped.

#### <b>clippingVolume</b>

```ts
get clippingVolume(): Box3
set clippingVolume(box: Box3)
```

Gets or set the clipping volume for the renderer as a [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3). Anything outside the clipping volume is not interactible by default.

#### <b>indirectIBL</b>

```ts
set indirectIBL(texture: Texture)
```

Sets the texture for indirect image based lighting. Works as per existing three.js [_Scene_](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene.environment) documentation.

#### <b>indirectIBLIntensity</b>

```ts
set indirectIBLIntensity(value: number)
```

Sets the [_envMapIntensity_](https://threejs.org/docs/index.html?q=standard#api/en/materials/MeshStandardMaterial.envMapIntensity) for all [_SpeckleStandardMaterial_](/viewer/speckle-material-api.md)s in the scene.

#### <b>intersections</b>

```ts
get intersections(): Intersections
```

Gets the [_Intersections_](/viewer/intersections-api.md) instance associated with the renderer.

**Returns**: [**_Intersections_**](/viewer/intersections-api.md)

#### <b>needsRender</b>

```ts
set needsRender(value: boolean)
```

Signals the renderer that it needs to render at least one frame. Assigning a _false_ value has no effect.

#### <b>pipeline</b>

```ts
get pipeline(): Pipeline
set pipeline(value: Pipeline)
```

Gets or sets the renderer's [_Pipeline_](/viewer/rendering-pipeline-api/pipeline-api.md).

#### <b>renderer</b>

```ts
get renderer(): SpeckleWebGLRenderer
```

Gets the underlying _SpeckleWebGLRenderer_ which is small extension of [_WebGLRenderer_](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderer).

**Returns**: [**_SpeckleWebGLRenderer_**](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderer)

#### <b>renderingCamera</b>

```ts
get renderingCamera(): Camera
```

Gets the currently rendering [_Camera_](https://threejs.org/docs/index.html?q=ca#api/en/cameras/Camera).

**Returns**: [**_Camera_**](https://threejs.org/docs/index.html?q=ca#api/en/cameras/Camera)

#### <b>renderingStats</b>

```ts
get renderingStats(): RenderingStats
```

Gets the up to date [_RenderingStats_](/viewer/speckle-renderer-api.md#renderingstats).

**Returns**: [**_RenderingStats_**](/viewer/speckle-renderer-api.md#renderingstats)

#### <b>scene</b>

```ts
get scene(): Scene
```

Gets the underlying three.js [_Scene_](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene).

**Returns**: [**_Scene_**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)

#### <b>sceneBox</b>

```ts
get sceneBox(): Box3
```

Gets the total bounds of the scene.

**Returns**: [**_Box3_**](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

#### <b>sceneCenter</b>

```ts
get sceneCenter(): Vector3
```

Gets the center of the total bounds of the scene.

**Returns**: [**_Vector3_**](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

#### <b>sceneSphere</b>

```ts
get sceneSphere(): Sphere
```

Gets the sphere encompasing the entire scene.

**Returns**: [**_Sphere_**](https://threejs.org/docs/index.html?q=Sphere#api/en/math/Sphere)

#### <b>shadowcatcher</b>

```ts
get shadowcatcher(): Shadowcatcher
```

Gets *The Shadowcatcher*🛸 instance associated with the renderer.

**Returns**: _Shadowcatcher_

#### <b>shadowMapNeedsUpdate</b>

```ts
set shadowMapNeedsUpdate(value: boolean)
```

Signals the renderer to render the shadowmap.

#### <b>sunLight</b>

```ts
get sunLight(): DirectionalLight
```

Gets the [_DirectionalLight_](https://threejs.org/docs/index.html?q=direct#api/en/lights/DirectionalLight) sun instance.

**Returns**: [**_DirectionalLight_**](https://threejs.org/docs/index.html?q=direct#api/en/lights/DirectionalLight)

### <h3>Methods</h3>

#### <b>addRenderTree</b>

```ts
async *addRenderTree(subtreeId: string): AsyncGenerator<any, void, unknown>
```

Generator function which takes the id of a render tree, builds the batches, then adds the batches to the scene. The function will `yield` after each batch has been created, allowing for user defined code to be run in the following fashion.

```ts
for await (const step of speckleRenderer.addRenderTree(id)) {
  // User defined code
}
```

**Parameters**

- **subtreeId**: The id of the render tree to add to the scene

**Returns**: [**_AsyncGenerator_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)

#### <b>boxFromObjects</b>

```ts
boxFromObjects(objectIds: string[]): Box3
```

Builds the bounds of the provided object ids as a [_Box3_](https://threejs.org/docs/index.html?q=box#api/en/math/Box3).

**Parameters**

- **objectIds**: An array of ids that participate in the bounds calculation

**Returns**: [**_Box3_**](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

#### <b>cancelRenderTree</b>

```ts
cancelRenderTree(subtreeId: string): void
```

Cancels any ongoing render tree adding operations. Effective cancelling happens as soon as the current running generator step yields.

**Parameters**

- **objectIds**: An array of ids that participate in the bounds calculation

**Returns**: _void_

#### <b>enableLayers</b>

```ts
enableLayers(layers: ObjectLayers[], value: boolean): void
```

Enables/Disables [_ObjectLayer_](/viewer/viewer-api.md#objectlayers)s from rendering. By default all layers are enabled.

**Parameters**

- **objectIds**: An array of ids that participate in the bounds calculation

**Returns**: _void_

#### <b>getBatch</b>

```ts
getBatch(id: string): Batch
```

Gets a [_Batch_](/viewer/batch-api.md) by id.

**Parameters**

- **id**: The id of the batch

**Returns**: [**_Batch_**](/viewer/batch-api.md)

#### <b>getBatchMaterial</b>

```ts
getBatchMaterial(rv: NodeRenderView): Material
```

Gets the default material of the provided [_NodeRenderView_](/viewer/render-view-api.md). It's originally defined material.

**Parameters**

- **rv**: [_NodeRenderView_](/viewer/render-view-api.md)

**Returns**: [**_Material_**](https://threejs.org/docs/index.html?q=mate#api/en/materials/Material)

#### <b>getMaterial</b>

```ts
getMaterial(rv: NodeRenderView): Material
```

Gets the current material of the provided [_NodeRenderView_](/viewer/render-view-api.md).

**Parameters**

- **rv**: [_NodeRenderView_](/viewer/render-view-api.md)

**Returns**: [**_Material_**](https://threejs.org/docs/index.html?q=mate#api/en/materials/Material)

#### <b>getObject</b>

```ts
getObject(rv: NodeRenderView): BatchObject
```

Gets the associated [_BatchObject_](/viewer/batch-object-api.md) with the provided [_NodeRenderView_](/viewer/render-view-api.md).

**Parameters**

- **rv**: [_NodeRenderView_](/viewer/render-view-api.md)

**Returns**: [**_BatchObject_**](/viewer/batch-object-api.md)

#### <b>getObjects</b>

```ts
getObjects(): BatchObject[]
```

Gets all [_BatchObject_](/viewer/batch-object-api.md) instances from the renderer.

**Returns**: [**_BatchObject[]_**](/viewer/batch-object-api.md)

#### <b>removeRenderTree</b>

```ts
removeRenderTree(subtreeId: string)
```

Removes the specified render tree along with all it's generated objects from the scene.

**Parameters**

- **subtreeId**: The id of the render tree to remove from the scene

**Returns**: _void_

#### <b>renderViewFromIntersection</b>

```ts
renderViewFromIntersection(intersection: ExtendedIntersection): NodeRenderView
```

Takes an intersection result produced by [_intersections_](/viewer/speckle-renderer-api.md#intersections) and outputs the intersected [_NodeRenderView_](/viewer/render-view-api.md).

**Parameters**

- **intersection**: [_ExtendedIntersection_](/viewer/top-level-acceleration-structure-api.md#extendedintersection)

**Returns**: [_NodeRenderView_](/viewer/render-view-api.md)

#### <b>resetMaterials</b>

```ts
resetMaterials(): void
```

Resets all object materials to their original default.

**Returns**: _void_

#### <b>resetPipeline</b>

```ts
resetPipeline(): void
```

Resets the current rendering pipeline.

**Returns**: _void_

#### <b>resize</b>

```ts
resize(width: number, height: number): void
```

Manually resizes the renderer.

**Returns**: _void_

#### <b>setMaterial</b>

There are several overloads of this method.

```ts
setMaterial(rvs: NodeRenderView[], material: Material): void
```

Sets the material instance to the specified rvs.

**Parameters**

- **rvs**: [_NodeRenderView_](/viewer/render-view-api.md)
- **material**: The material instance to apply. It can be a vanilla three.js [_Material_](https://threejs.org/docs/index.html?q=mate#api/en/materials/Material) but also a [_SpeckleMaterial_](/viewer/speckle-material-api.md)

```ts
setMaterial(
    rvs: NodeRenderView[],
    material: RenderMaterial & DisplayStyle & MaterialOptions
): void
```

Creates a material based on the intersection between [_RenderMaterial_](/viewer/speckle-material-api.md#rendermaterial), [_DisplayStyle_](/viewer/speckle-material-api.md#displaystyle) and [_MaterialOptions_](/viewer/speckle-material-api.md#materialoptions). Because this method does not discriminate based on the render view's geometry type (mesh, lines, points) it needs to be able to build materials suitable for all gometry types.

**Parameters**

- **rvs**: [_NodeRenderView_](/viewer/render-view-api.md)
- **material**: [_RenderMaterial_](/viewer/speckle-material-api.md#rendermaterial) & [_DisplayStyle_](/viewer/speckle-material-api.md#displaystyle) & [_MaterialOptions_](/viewer/speckle-material-api.md#materialoptions)

**Returns**: _void_

```ts
setMaterial(rvs: NodeRenderView[], material: FilterMaterial): void
```

Sets the filter material to the specified rvs. [_FilterMaterial_](/viewer/speckle-material-api.md#filterMmaterial)s are a set of predefined material types which are commonly used.

**Parameters**

- **rvs**: [_NodeRenderView_](/viewer/render-view-api.md)
- **material**: [_FilterMaterial_](/viewer/speckle-material-api.md#filterMmaterial)

**Returns**: _void_

#### <b>setSunLightConfiguration</b>

```ts
setSunLightConfiguration(config: SunLightConfiguration): void
```

Sets the provided [_SunLightConfiguration_](/viewer/speckle-renderer-api.md#sunlightconfiguration).

**Parameters**

- **config**: [_SunLightConfiguration_](/viewer/speckle-renderer-api.md#sunlightconfiguration)

**Returns**: _void_

#### <b>updateShadowCatcher</b>

```ts
updateShadowCatcher(force?: boolean): void
```

Updates *The Shadowcatcher*🛸.

**Parameters**

- _optional_ **force**: boolean 

**Returns**: _void_

### <h3>Typedefs</h3>

#### <b>RenderingStats</b>

```ts
{
  objects: number
  batchCount: number
  drawCalls: number
  trisCount: number
  vertCount: number
  batchDetails: Array<{
    drawCalls: number
    minDrawCalls: number
    tris: number
    verts: number
  }
}
```

Details regarding rendering state.


#### <b>SunLightConfiguration</b>

```ts
interface SunLightConfiguration extends LightConfiguration {
  elevation?: number;
  azimuth?: number;
  radius?: number;
}
```

- **elevation**: Elevation in polar coordinates
- **azimuth**: Azimuth in polar coordinates
- **radius**: Distance from the camera target

