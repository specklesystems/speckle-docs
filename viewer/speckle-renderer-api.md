# SpeckleRenderer

<!-- <style>
td, th{
    border: none;
}
</style> -->


### <h3>Accessors</h3>
|  	| 	|   |   |
|---	|---    |---	|---
| [allObjects](/viewer/speckle-renderer-api.md#allobjects) 	| [clippingPlanes](/viewer/speckle-renderer-api.md#clippingplanes) 	| [clippingVolume](/viewer/speckle-renderer-api.md#clippingvolume) 	| [indirectIBL](/viewer/speckle-renderer-api.md#indirectibl)
[indirectIBLIntensity](/viewer/speckle-renderer-api.md#indirectiblintensity) | [intersections](/viewer/speckle-renderer-api.md#intersections) | [needsRender](/viewer/speckle-renderer-api.md#needsrender) | [pipelineOptions](/viewer/speckle-renderer-api.md#pipelineoptions)
[renderer](/viewer/speckle-renderer-api.md#renderer) | [renderingCamera](/viewer/speckle-renderer-api.md#renderingcamera) | [renderingStats](/viewer/speckle-renderer-api.md#renderingstats) | [scene](/viewer/speckle-renderer-api.md#scene)
[sceneBox](/viewer/speckle-renderer-api.md#scenebox) | [sceneCenter](/viewer/speckle-renderer-api.md#scenecenter) | [sceneSphere](/viewer/speckle-renderer-api.md#scenesphere) | [shadowcatcher](/viewer/speckle-renderer-api.md#shadowcatcher)
[shadowMapNeedsUpdate](/viewer/speckle-renderer-api.md#shadowmapneedsupdate) | [sunLight](/viewer/speckle-renderer-api.md#sunlight)


### <h3>Methods</h3>
|  	| 	| 	| 	|
|---	|---	|---	|---
| [addRenderTree](/viewer/speckle-renderer-api.md#addrendertree) 	| [boxFromObjects](/viewer/speckle-renderer-api.md#boxfromobjects) 	| [cancelRenderTree](/viewer/speckle-renderer-api.md#cancelrendertree) 	| [enableLayers](/viewer/speckle-renderer-api.md#enablelayers) 	
[getBatch](/viewer/speckle-renderer-api.md#getbatch)  | [getBatchMaterial](/viewer/speckle-renderer-api.md#getbatchmaterial) | [getMaterial](/viewer/speckle-renderer-api.md#getmaterial) | [getObject](/viewer/speckle-renderer-api.md#getobject) 
 [getObjects](/viewer/speckle-renderer-api.md#get0bjects) 	| [removeRenderTree](/viewer/speckle-renderer-api.md#removerendertree) | [renderViewFromIntersection](/viewer/speckle-renderer-api.md#renderviewfromintersection) |   [resetMaterials](/viewer/speckle-renderer-api.md#resetmaterials)
 [resetPipeline](/viewer/speckle-renderer-api.md#resetpipeline) | [resize](/viewer/speckle-renderer-api.md#resize) | [setMaterial](/viewer/speckle-renderer-api.md#setmaterial) 	| [setSunLightConfiguration](/viewer/speckle-renderer-api.md#setsunlightconfiguration)
 [screenshot](/viewer/speckle-renderer-api.md#screenshot) | [setLightConfiguration](/viewer/speckle-renderer-api.md#setlightconfiguration) 	| [updateShadowCatcher](/viewer/speckle-renderer-api.md#updateshadowcatcher) 	

### <h3>Typedefs</h3>
|  	| 	| 	| 	|
|---	|---	|---	|---
[DynamicAOPassParams](/viewer/speckle-renderer-api.md#dynamicaopassparams) | [PipelineOptions](/viewer/speckle-renderer-api.md#pipelineoptions)	| [PipelineOutputType](/viewer/speckle-renderer-api.md#pipelineoutputtype) | [RenderingStats](/viewer/speckle-renderer-api.md#renderingstats) 
[StaticAoPassParams](/viewer/speckle-renderer-api.md#staticaopassparams) | 

### <h3>Constants</h3>
|  	| 	| 	| 	|
|---	|---	|---	|---
[DefaultPipelineOptions](/viewer/speckle-renderer-api.md#defaultpipelineoptions) | [DefaultDynamicAOPassParams](/viewer/speckle-renderer-api.md#defaultdynamicaopassparams)	| [DefaultStaticAoPassParams](/viewer/speckle-renderer-api.md#defaultstaticaopassparams) | 

<br>
<br>


### <h3>Accessors</h3>

#### <b>allObjects</b>
```ts
get allObjects(): Object3D
```
Gets the parent three.js object for all *loaded* scene content
#### Returns: [***Object3D***](https://threejs.org/docs/index.html?q=objec#api/en/core/Object3D)

<br>

#### <b>clippingPlanes</b>
```ts
get clippingPlanes(): Plane[]
set clippingPlanes(value: Plane[])
```
Gets or set the clipping [*Plane*](https://threejs.org/docs/index.html?q=plane#api/en/math/Plane)s for the scene. Anything outside the volume determined by the clipping planes will get visually clipped

<br>

#### <b>clippingVolume</b>
```ts
get clippingVolume(): Box3
set clippingVolume(box: Box3)
```
Gets or set the clipping volume for the renderer as a [*Box3*](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3). Anything outside the clipping volume is not interactible by default.

<br>

#### <b>indirectIBL</b>
```ts
set indirectIBL(texture: Texture)
```
Sets the texture for indirect image based lighting. Works as per existing three.js [*Scene*](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene.environment) documentation

<br>

#### <b>indirectIBLIntensity</b>
```ts
set indirectIBLIntensity(value: number)
```
Sets the [*envMapIntensity*](https://threejs.org/docs/index.html?q=standard#api/en/materials/MeshStandardMaterial.envMapIntensity) for all [*SpeckleStandardMaterial*](/viewer/speckle-material-api.md)s in the scene

<br>

#### <b>intersections</b>
```ts
get intersections(): Intersections
```
Gets the [*Intersections*]() instance associated with the renderer
#### Returns: [***Intersections***]()

<br>

#### <b>needsRender</b>
```ts
set needsRender(value: boolean)
```
Signals the renderer that it needs to render at least one frame. Assigning a *false* value has no effect

<br>

#### <b>pipelineOptions</b>
```ts
get pipelineOptions()
set pipelineOptions(value: PipelineOptions)
```
Gets or sets the renderer's [*PipelineOptions*](/viewer/speckle-renderer-api.md#pipelineoptions)

<br>

#### <b>renderer</b>
```ts
get renderer(): SpeckleWebGLRenderer
```
Gets the underlying *SpeckleWebGLRenderer* which is small extension of [*WebGLRenderer*](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderer)
#### Returns: [***SpeckleWebGLRenderer***](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderer)

<br>

#### <b>renderingCamera</b>
```ts
get renderingCamera(): Camera
```
Gets the currently rendering [*Camera*](https://threejs.org/docs/index.html?q=ca#api/en/cameras/Camera)
#### Returns: [***Camera***](https://threejs.org/docs/index.html?q=ca#api/en/cameras/Camera)

<br>

#### <b>renderingStats</b>
```ts
get renderingStats(): RenderingStats
```
Gets the up to date [*RenderingStats*](/viewer/speckle-renderer-api.md#renderingstats)
#### Returns: [***RenderingStats***](/viewer/speckle-renderer-api.md#renderingstats)

<br>

#### <b>scene</b>
```ts
get scene(): Scene
```
Gets the underlying three.js [*Scene*](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)
#### Returns: [***Scene***](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene)

<br>

#### <b>sceneBox</b>
```ts
get sceneBox(): Box3
```
Gets the total bounds of the scene.
#### Returns: [***Box3***](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

<br>

#### <b>sceneCenter</b>
```ts
get sceneCenter(): Vector3
```
Gets the center of the total bounds of the scene
#### Returns: [***Vector3***](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

<br>

#### <b>sceneSphere</b>
```ts
get sceneSphere(): Sphere
```
Gets the sphere encompasing the entire scene
#### Returns: [***Sphere***](https://threejs.org/docs/index.html?q=Sphere#api/en/math/Sphere)

<br>

#### <b>shadowcatcher</b>
```ts
get shadowcatcher(): Shadowcatcher
```
Gets *The Shadowcatcher*🛸 instance associated with the renderer
#### Returns: *Shadowcatcher*

<br>

#### <b>shadowMapNeedsUpdate</b>
```ts
set shadowMapNeedsUpdate(value: boolean)
```
Signals the renderer to render the shadowmap

<br>

#### <b>sunLight</b>
```ts
get sunLight(): DirectionalLight
```
Gets the [*DirectionalLight*](https://threejs.org/docs/index.html?q=direct#api/en/lights/DirectionalLight) sun instance
#### Returns: [***DirectionalLight***](https://threejs.org/docs/index.html?q=direct#api/en/lights/DirectionalLight)

<br>
<br>

### <h3>Methods</h3>
#### <b>addRenderTree</b>
```ts
async *addRenderTree(subtreeId: string): AsyncGenerator<any, void, unknown>
```
Generator function which takes the id of a render tree, builds the batches, then adds the batches to the scene. The function will `yield` after each batch has been created, allowing for user defined code to be run in the following fashion
```ts
for await (const step of speckleRenderer.addRenderTree(id)){
    // User defined code
}
```
#### Parameters
- **subtreeId**: The id of the render tree to add to the scene

#### Returns: [***AsyncGenerator***](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)

<br>

#### <b>boxFromObjects</b>
```ts
boxFromObjects(objectIds: string[]): Box3
```
Builds the bounds of the provided object ids as a [*Box3*](https://threejs.org/docs/index.html?q=box#api/en/math/Box3).
#### Parameters
- **objectIds**: An array of ids that participate in the bounds calculation

#### Returns: [***Box3***](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)

<br>

#### <b>cancelRenderTree</b>
```ts
cancelRenderTree(subtreeId: string): void
```
Cancels any ongoing render tree adding operations. Effective cancelling happens as soon as the current running generator step yields.
#### Parameters
- **objectIds**: An array of ids that participate in the bounds calculation

#### Returns: *void*

<br>

#### <b>enableLayers</b>
```ts
enableLayers(layers: ObjectLayers[], value: boolean): void
```
Enables/Disables [*ObjectLayer*](/viewer/viewer-api.md#objectlayers)s from rendering. By default all layers are enabled
#### Parameters
- **objectIds**: An array of ids that participate in the bounds calculation

#### Returns: *void*

<br>

#### <b>getBatch</b>
```ts
getBatch(id: string): Batch
```
Gets a [*Batch*](/viewer/batch-api.md) by id
#### Parameters
- **id**: The id of the batch

#### Returns: [***Batch***](/viewer/batch-api.md)

<br>

#### <b>getBatchMaterial</b>
```ts
getBatchMaterial(rv: NodeRenderView): Material
```
Gets the default material of the provided [*NodeRenderView*](/viewer/render-view-api.md). It's originally defined material
#### Parameters
- **rv**: [*NodeRenderView*](/viewer/render-view-api.md)

#### Returns: [***Material***](https://threejs.org/docs/index.html?q=mate#api/en/materials/Material)

<br>

#### <b>getMaterial</b>
```ts
getMaterial(rv: NodeRenderView): Material
```
Gets the current material of the provided [*NodeRenderView*](/viewer/render-view-api.md).
#### Parameters
- **rv**: [*NodeRenderView*](/viewer/render-view-api.md)

#### Returns: [***Material***](https://threejs.org/docs/index.html?q=mate#api/en/materials/Material)

<br>

#### <b>getObject</b>
```ts
getObject(rv: NodeRenderView): BatchObject
```
Gets the associated [*BatchObject*](/viewer/batch-object-api.md) with the provided [*NodeRenderView*](/viewer/render-view-api.md)
#### Parameters
- **rv**: [*NodeRenderView*](/viewer/render-view-api.md)

#### Returns: [***BatchObject***](/viewer/batch-object-api.md)

<br>

#### <b>getObjects</b>
```ts
getObjects(): BatchObject[]
```
Gets all [*BatchObject*](/viewer/batch-object-api.md) instances from the renderer

#### Returns: [***BatchObject[]***](/viewer/batch-object-api.md)

<br>

#### <b>removeRenderTree</b>
```ts
removeRenderTree(subtreeId: string)
```
Removes the specified render tree along with all it's generated objects from the scene
#### Parameters
- **subtreeId**: The id of the render tree to remove from the scene

#### Returns: *void*

<br>

#### <b>renderViewFromIntersection</b>
```ts
renderViewFromIntersection(intersection: ExtendedIntersection): NodeRenderView
```
Takes an intersection result produced by [*intersections*](/viewer/speckle-renderer-api.md#intersections) and outputs the intersected [*NodeRenderView*](/viewer/render-view-api.md).
#### Parameters
- **intersection**: [*ExtendedIntersection*](/viewer/top-level-acceleration-structure-api.md#extendedintersection)

#### Returns: [*NodeRenderView*](/viewer/render-view-api.md)

<br>

#### <b>resetMaterials</b>
```ts
resetMaterials(): void
```
Resets all object materials to their original default

#### Returns: *void*

<br>

#### <b>resetPipeline</b>
```ts
resetPipeline(): void
```
Resets the rendering pipeline, retriggering the accumulation stage.

#### Returns: *void*

<br>

#### <b>resize</b>
```ts
resize(width: number, height: number): void
```
Manually resizes the renderer

#### Returns: *void*

<br>

#### <b>setMaterial</b>
There are several overloads of this method
```ts
setMaterial(rvs: NodeRenderView[], material: Material): void
```
Sets the material instance to the specified rvs.
#### Parameters
- **rvs**: [*NodeRenderView*](/viewer/render-view-api.md)
- **material**: The material instance to apply. It can be a vanilla three.js [*Material*](https://threejs.org/docs/index.html?q=mate#api/en/materials/Material) but also a [*SpeckleMaterial*](/viewer/speckle-material-api.md)
```ts
setMaterial(
    rvs: NodeRenderView[],
    material: RenderMaterial & DisplayStyle & MaterialOptions
): void
```
Creates a material based on the intersection between [*RenderMaterial*](/viewer/speckle-material-api.md#rendermaterial), [*DisplayStyle*](/viewer/speckle-material-api.md#displaystyle) and [*MaterialOptions*](/viewer/speckle-material-api.md#materialoptions). Because this method does not discriminate based on the render view's geometry type (mesh, lines, points) it needs to be able to build materials suitable for all gometry types.
#### Parameters
- **rvs**: [*NodeRenderView*](/viewer/render-view-api.md)
- **material**: [*RenderMaterial*](/viewer/speckle-material-api.md#rendermaterial) & [*DisplayStyle*](/viewer/speckle-material-api.md#displaystyle) & [*MaterialOptions*](/viewer/speckle-material-api.md#materialoptions)
#### Returns: *void*
```ts
setMaterial(rvs: NodeRenderView[], material: FilterMaterial): void
```
Sets the filter material to the specified rvs. [*FilterMaterial*](/viewer/speckle-material-api.md#filterMmaterial)s are a set of predefined material types which are commonly used. 
#### Parameters
- **rvs**: [*NodeRenderView*](/viewer/render-view-api.md)
- **material**: [*FilterMaterial*](/viewer/speckle-material-api.md#filterMmaterial)

#### Returns: *void*

<br>

#### <b>setSunLightConfiguration</b>
```ts
setSunLightConfiguration(config: SunLightConfiguration): void
```
Sets the provided [*SunLightConfiguration*]()
#### Parameters
- **config**: [*SunLightConfiguration*]()
#### Returns: *void*

<br>

#### <b>updateShadowCatcher</b>
```ts
updateShadowCatcher(): void
```
Updates *The Shadowcatcher*🛸

#### Returns: *void*

<br><br>

### <h3>Typedefs</h3>

#### <b>DynamicAOPassParams</b>
```ts
interface DynamicAOPassParams {
  intensity: number
  scale: number
  kernelRadius: number
  bias: number
  normalsType: NormalsType
  blurEnabled: boolean
  blurRadius: number
  blurStdDev: number
  blurDepthCutoff: number
}
```
- **intensity**: Intensity of dynamic AO
- **scale**: Scale of dynamic AO
- **kernelRadius**: Radius of the sampling kernel in screen space
- **bias**: Dynamic AO bias
- **normalsType**: Reconstructed normals quality: DEFAULT, IMPROVED = 1, ACCURATE = 2
- **blurEnabled**: Enables/Disables dynamic AO blue
- **blurRadius**: Radius of the blur in screen space
- **blurStdDev**: Blur standard deviation
- **blurDepthCutoff**: Cutoff value for depth aware blur
<br>

#### <b>PipelineOptions</b>
```ts
interface PipelineOptions {
  pipelineOutput: PipelineOutputType
  accumulationFrames: number
  dynamicAoEnabled: boolean
  dynamicAoParams: DynamicAOPassParams
  staticAoEnabled: boolean
  staticAoParams: StaticAoPassParams
  depthSide: Side
}
```
- **pipelineOutput**: [*PipelineOutputType*](/viewer/speckle-renderer-api.md#pipelineoutputtype).
- **accumulationFrames**: Number of frames used for accumulation
- **dynamicAoEnabled**: Enables dynamic AO
- **dynamicAoParams**: [*DynamicAOPassParams*](viewer/speckle-renderer-api.md#dynamicaopassparams)
- **staticAoEnabled**: Enables static AO.
- **staticAoParams**: [*StaticAoPassParams*](viewer/speckle-renderer-api.md#staticaopassparams)
- **depthSide**: Face side when rendering depth

<br>

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
Details regarding rendering state

<br>

#### <b>StaticAoPassParams</b>
```ts
interface StaticAoPassParams {
  intensity?: number
  kernelRadius?: number
  kernelSize?: number
  bias?: number
```
- **intensity**: Intensity of the static AO.
- **kernelRadius**: Sampling kernel radius in screen space
- **kernelSize**: Size of the sampling kernel
- **bias**: AO bias

<br><br>

### <h3>Constants</h3>

#### <b>DefaultPipelineOptions</b>
```ts
const DefaultPipelineOptions: PipelineOptions = {
  pipelineOutput: PipelineOutputType.FINAL,
  accumulationFrames: 16,
  dynamicAoEnabled: true,
  dynamicAoParams: DefaultDynamicAOPassParams,
  staticAoEnabled: true,
  staticAoParams: DefaultStaticAoPassParams,
  depthSide: DoubleSide
}
```
Default values for [*PipelineOptions*](viewer/speckle-renderer-api.md#pipelineoptions)

<br>

#### <b>DefaultDynamicAOPassParams</b>
```ts
const DefaultDynamicAOPassParams: DynamicAOPassParams = {
  intensity: 1.5,
  scale: 0,
  kernelRadius: 5,
  bias: 0.2,
  normalsType: NormalsType.ACCURATE,
  blurEnabled: true,
  blurRadius: 2,
  blurStdDev: 4,
  blurDepthCutoff: 0.007
}
```
Default values for [*DynamicAOPassParams*](viewer/speckle-renderer-api.md#dynamicaopassparams)

<br>

#### <b>DefaultStaticAoPassParams</b>
```ts
const DefaultStaticAoPassParams: StaticAoPassParams = {
  intensity: 1,
  kernelRadius: 30, // Screen space
  kernelSize: 16,
  bias: 0.01,
  minDistance: 0,
  maxDistance: 0.008
}
```
Default values for [*StaticAoPassParams*](viewer/speckle-renderer-api.md#staticaopassparams)