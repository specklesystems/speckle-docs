# Viewer

<style>
table, tr, td, th{
border: none;
background-color: rgba(0, 0, 0, 0.0) !important;
}
</style>

### <h3>Constructors</h3>

[constructor](/viewer/viewer-api.md#constructor)

### <h3>Accessors</h3>
|  	| 	| 
|---	|---
| [Utils](/viewer/viewer-api.md#utils) 	| [World](/viewer/viewer-api.md#world) 	

### <h3>Methods</h3>
|  	| 	| 	| 	| 
|---	|---	|---	|---
| [cancelLoad](/viewer/viewer-api.md#cancelload) 	| [createExtension](/viewer/viewer-api.md#createextension) 	| [dispose](/viewer/viewer-api.md#dispose) 	| [getContainer](/viewer/viewer-api.md#getcontainer) 	
[getExtension](/viewer/viewer-api.md#getextension)  | [getObjectProperties](/viewer/viewer-api.md#getobjectproperties) | [getRenderer](/viewer/viewer-api.md#getrenderer) | [getViews](/viewer/viewer-api.md#getviews) 
 [getWorldTree](/viewer/viewer-api.md#getworldtree) 	| [init](/viewer/viewer-api.md#init) | [loadObject](/viewer/viewer-api.md#loadObject) 	| [on](/viewer/viewer-api.md#on) 	
 [query](/viewer/viewer-api.md#query) | [requestRender](/viewer/viewer-api.md#requestrender) 	| [resize](/viewer/viewer-api.md#resize) | [screenshot](/viewer/viewer-api.md#screenshot) 	
 [setLightConfiguration](/viewer/viewer-api.md#setlightconfiguration) 	| [unloadAll](/viewer/viewer-api.md#unloadall) 	| [unloadObject](/viewer/viewer-api.md#unloadobject)

### <h3>Typedefs</h3>
|  	| 	| 	| 	|
|---	|---	|---	|---
[LightConfiguration](/viewer/viewer-api.md#lightconfiguration) | [ObjectLayers](/viewer/viewer-api.md#objectlayers)	| [PropertyInfo](/viewer/viewer-api.md#propertyinfo) | [SelectionEvent](/viewer/viewer-api.md#selectionEvent) 
[SpeckleView](/viewer/viewer-api.md#speckleview) | [SunLightConfiguration](/viewer/viewer-api.md#sunlightconfiguration) | [UpdateFlags](/viewer/viewer-api.md#updateflags) | [Utils](/viewer/viewer-api.md#utilsinterface) 
[ViewerEvent](/viewer/viewer-api.md#viewerevent) | [ViewerParams](/viewer/viewer-api.md#viewerparams) |  [World](/viewer/viewer-api.md#worldclass) 
<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
new Viewer(container: HTMLElement, params: ViewerParams)
```
#### Parameters
 - **container**: [*HTMLElement*](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
 - **params**: [*ViewerParams*](/viewer/viewer-api.md#viewer)

#### Returns: [***Viewer***](/viewer/viewer-api.md#viewer)
<br>
<br>


### <h3>Accessors</h3>

#### <b>Utils</b>
```ts
get Utils(): Utils
```
#### Returns: [***Utils***](/viewer/viewer-api.md#utilsinterface)

<br>

#### <b>World</b>
```ts
get World(): World
```
#### Returns: [***World***](/viewer/viewer-api.md#worldclass)

<br>
<br>

### <h3>Methods</h3>
#### <b>cancelLoad</b>
```ts
cancelLoad(url: string, unload?: boolean): Promise<void>
```
Cancels any ongoing loading operations, with the option of unloading an current progress
#### Parameters
- **url**: *string*
- *(optional)* **unload**: *boolean*

#### Returns: <span style="font-weight:normal">A promise which resolves when the operation completes</span>
<br>

#### <b>createExtension</b>
```ts
createExtension<T extends Extension>(type: new () => T): T
```
Creates and registers the extension of the specified type constructor
#### Parameters
- **type**: [*Extension*]() subclass

#### Returns: <span style="font-weight:normal">The extension instance</span>
<br>

#### <b>dispose</b>
```ts
dispose(): void
```
Disposes the viewer instance
#### Returns: *void*
<br>

#### <b>getContainer</b>
```ts
getContainer(): HTMLElement
```
Gets HTML container used at viewer initialisation
#### Returns: [***HTMLElement***](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
<br>

#### <b>getExtension</b>
```ts
getExtension<T extends Extension>(type: new () => T): T
```
Gets the extension of type T registered with the viewer. 
#### Returns: [*Extension*]() <span style="font-weight:normal">subclass, undefined if it does not exist</span>

<br>

#### <b>getObjectProperties</b>
```ts
  getObjectProperties(resourceURL?: string, bypassCache?: boolean): Promise<PropertyInfo[]>
```
Goes through all objects and builds [*PropertyInfo*](/viewer/viewer-api.md#propertyinfo) objects asynchronously.
::: warning
When executing for a very large number of objects, this method can take long to finish
:::
#### Parameters
- **resourceURL**: The id of the node where to start building properties.
- *(optional)* **bypassCache**: Enabled the use of the property cache. Default *false*
#### Returns: [*PropertyInfo[]*](/viewer/viewer-api.md#propertyinfo) 

<br>

#### <b>getRenderer</b>
```ts
getRenderer(): SpeckleRenderer
```
Gets the [*SpeckleRenderer*]() instance associated with the viewer.
#### Returns: [*SpeckleRenderer*]() 

<br>

#### <b>getViews</b>
```ts
getViews(): SpeckleView[]
```
Gets all the current [*SpeckleView*](/viewer/viewer-api.md#speckleview) instances.
#### Returns: [*SpeckleView[]*](/viewer/viewer-api.md#speckleview) 

<br>

#### <b>getWorldTree</b>
```ts
getWorldTree(): WorldTree
```
Gets the [*WorldTree*]() instance associated with the viewer.
#### Returns: [*WorldTree[]*]() 

<br>

#### <b>init</b>
```ts
init(): Promise<void>
```
Initializes the viewer asynchronously and loads required assets.
#### Returns: <span style="font-weight:normal">*Promise< void >*</span>

<br>

#### <b>loadObject</b>
```ts
loadObject(loader: Loader, zoomToObject?: boolean): Promise<void>
```
Loads objects asynchronously using a [*Loader*]().
#### Parameters
- **loader**: The [*Loader*]() instance used in loading.
- *(optional)* **zoomToObject**: Enabled zooming in on the loaded object after loading finishes. Default *true*
#### Returns: <span style="font-weight:normal">*Promise< void >*</span>

<br>

#### <b>on</b>
```ts
on(eventType: ViewerEvent, handler: (arg) => void)
```
Subscribes handlers to [*ViewerEvent*](/viewer/viewer-api.md#viewerevent)s.
#### Parameters
- **eventType**: The [*ViewerEvent*](/viewer/viewer-api.md#viewerevent) the handler needs to register to
- **handler**: The event handler 
#### Returns: *void*

<br>

#### <b>query</b>
```ts
query<T extends Query>(query: T): QueryArgsResultMap[T['operation']]
```
General purpose mechanism for getting spatial information from the viewer.
#### Parameters
- **query**: The [*Query*]() to run
#### Returns: [*QueryResult*]()

<br>

#### <b>requestRender</b>
```ts
requestRender(flags?: number): void
```
Requests the viewer to render one or more frames.
#### Parameters
- *(optional)* **flags**: [*UpdateFlags*](/viewer/viewer-api.md#updateflags). If no flags are provided it defaults to *UpdateFlags.RENDER*.
#### Returns: *void*

<br>

#### <b>resize</b>
```ts
resize(): void
```
Resize the viewer manually. The dimensions will be inherited from the container.
#### Returns: *void*

<br>

#### <b>screenshot</b>
```ts
screenshot(): Promise<string>
```
Takes a snapshot of the current viewer camera view and returns it as a base64 encoded string.
#### Returns: <span style="font-weight:normal">A promise which resolves to a base64 encoded image.</span>

<br>

#### <b>setLightConfiguration</b>
```ts
setLightConfiguration(config: LightConfiguration): void
```
Applies the provided [*LightConfiguration*](/viewer/viewer-api.md#lightconfiguration).
#### Returns: *void*

<br>

#### <b>unloadAll</b>
```ts
unloadAll(): Promise<void>
```
Unloads and disposes everything that's currently loaded.
#### Returns: *Promise< void > *

<br>

#### <b>unloadObject</b>
```ts
unloadObject(url: string): Promise<void>
```
Unloads and disposes the specified resource associated with the provided url.
#### Parameters
- **url**: The resource id to unload.
#### Returns: *Promise< void > *

<br><br>

### <h3>Typedefs</h3>

#### <b>LightConfiguration</b>
```ts
interface LightConfiguration {
  enabled?: boolean
  castShadow?: boolean
  intensity?: number
  color?: number
  indirectLightIntensity?: number
  shadowcatcher?: boolean
}
```
- **enabled**: Enables direct lighting (sun).
- **castShadow**: Enables shadows.
- **intensity**: Direct light(sun) intensity.
- **color**: Direct light(sun) color.
- **indirectLightIntensity**: Indirect IBL intensity.
- **shadowcatcher**: Enables *The Shadowcatcher*. 🛸

<br>

#### <b>ObjectLayers</b>
```ts
enum ObjectLayers {
  STREAM_CONTENT_MESH = 10,
  STREAM_CONTENT_LINE = 11,
  STREAM_CONTENT_POINT = 12,
  STREAM_CONTENT_TEXT = 13,
  STREAM_CONTENT_POINT_CLOUD = 14,

  NONE = 0,
  STREAM_CONTENT = 1,
  PROPS = 2,
  SHADOWCATCHER = 3,
  OVERLAY = 4,
  MEASUREMENTS = 5
}
```
All the layers the viewer uses for rendering objects and props. Rendering order generally follows the order of layers values. The same layers are also used for raycasting, where they are all enabled by default except *STREAM_CONTENT_POINT* which is disabled

<br>

#### <b>PropertyInfo</b>
```ts
interface PropertyInfo {
  key: string
  objectCount: number
  type: 'number' | 'string'
}
```
- **key**: Property identifier, flattened.
- **objectCount**: Total number of objects that have this property.
- **type**: If the property is numeric or string based.

<br>

#### <b>SelectionEvent</b>
```ts
type SelectionEvent = {
  multiple: boolean
  event?: PointerEvent
  hits: Array<{
    node: TreeNode
    point: Vector3
  }>
}
```
Payload for *ViewerEvent.ObjectClicked* and *ViewerEvent.ObjectDoubleClicked*.
- **multiple**: Whether this is a multiple selection or not.
- **event**: The browser [*PointerEvent*](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) piggybacked.
- **hits**: The array of hits sorted by distance, where closest is first. *node* is the intersected [*TreeNode*]() and *point* is it's point of intersection.

<br>

#### <b>SpeckleView</b>
```ts
type SpeckleView = {
  name: string
  id: string
  view: Record<string, unknown>
}
```
- **name**: Human readable name.
- **id**: View's speckle id.
- **view**: View's associated speckle data .

<br>

#### <b>SunLightConfiguration</b>
```ts
interface SunLightConfiguration extends LightConfiguration {
  elevation?: number
  azimuth?: number
  radius?: number
}
```
- **elevation**: Sun elevation in polar coordinates.
- **azimuth**: Sun azimuth in polar coordinates.
- **radius**: Sun distance from [*World*]() center.

<br>

#### <b>UpdateFlags</b>
```ts
 enum UpdateFlags {
  RENDER = 1,
  SHADOWS = 2
}
```
Specifies which rendering aspects need to be updated. UpdateFlags work by bit masking. So if you want multiple flags, you need to *OR* them.

<br>

#### <b>UtilsInterface</b>
```ts
interface Utils {
  screenToNDC(
    x: number,
    y: number,
    width?: number,
    height?: number
  ): { x: number; y: number }
  NDCToScreen(
    x: number,
    y: number,
    width?: number,
    height?: number
  ): { x: number; y: number }
}
```
Two utilities that help you move values form NDC to Screen space and back.

<br>

#### <b>ViewerEvent</b>
```ts
enum ViewerEvent {
  ObjectClicked = 'object-clicked',
  ObjectDoubleClicked = 'object-doubleclicked',
  DownloadComplete = 'download-complete',
  LoadComplete = 'load-complete',
  LoadProgress = 'load-progress',
  UnloadComplete = 'unload-complete',
  LoadCancelled = 'load-cancelled',
  UnloadAllComplete = 'unload-all-complete',
  Busy = 'busy',
  FilteringStateSet = 'filtering-state-set',
  LightConfigUpdated = 'light-config-updated'
}
```
All the events the viewer can emit.

<br>

#### <b>ViewerParams</b>
```ts
interface ViewerParams {
  showStats: boolean
  environmentSrc: Asset | string
  verbose: boolean
}
```
- **showStats**: Displays a [stats](https://github.com/mrdoob/stats.js) panel.
- **environmentSrc**: The URL of the image used for indirect IBL.
- **verbose**: Enables viewer logs.

#### <b>WorldClass</b>
```ts
class World {
  readonly worldBox: Box3
  get worldSize(): Box3 
  get worldOrigin(): Vector3 

  expandWorld(box: Box3) 
  reduceWorld(box: Box3)
  updateWorld()
  resetWorld() 
```
Utility class for keeping track of the total dimensions of loaded objects. It's mostly used for informative purposes
