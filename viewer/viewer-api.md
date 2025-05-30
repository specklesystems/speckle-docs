---
title: Viewer
deprecationMessages: viewer
---

<Banner />

# Viewer

<!-- <style>
table, tr, td, th{
border: none;
background-color: rgba(0, 0, 0, 0.0) !important;
}
</style> -->

### <h3>Constructors</h3>

| [constructor](/viewer/viewer-api.md#constructor) |
| ------------------------------------------------ |

### <h3>Accessors</h3>

| [Utils](/viewer/viewer-api.md#utils) | [World](/viewer/viewer-api.md#world) |
| ------------------------------------ | ------------------------------------ |

### <h3>Methods</h3>

| [cancelLoad](/viewer/viewer-api.md#cancelload)  | [createExtension](/viewer/viewer-api.md#createextension) | [dispose](/viewer/viewer-api.md#dispose) | [getContainer](/viewer/viewer-api.md#getcontainer) |
| :------------------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------- |
| [getExtension](/viewer/viewer-api.md#getextension)                   | [getObjectProperties](/viewer/viewer-api.md#getobjectproperties) | [getRenderer](/viewer/viewer-api.md#getrenderer)   | [getViews](/viewer/viewer-api.md#getviews)         |
| [getWorldTree](/viewer/viewer-api.md#getworldtree)                   | [hasExtension](/viewer/viewer-api.md#hasextension)                               | [init](/viewer/viewer-api.md#init)     | [loadObject](/viewer/viewer-api.md#loadObject)                     |
| [on](/viewer/viewer-api.md#on)                                 | [query](/viewer/viewer-api.md#query)             | [requestRender](/viewer/viewer-api.md#requestrender)             | [resize](/viewer/viewer-api.md#resize)     |
| [screenshot](/viewer/viewer-api.md#screenshot) | [setLightConfiguration](/viewer/viewer-api.md#setlightconfiguration)                     | [unloadAll](/viewer/viewer-api.md#unloadall) | [unloadObject](/viewer/viewer-api.md#unloadobject)

### <h3>Typedefs</h3>

| [Asset](/viewer/viewer-api.md#asset) | [LightConfiguration](/viewer/viewer-api.md#lightconfiguration)  | [ObjectLayers](/viewer/viewer-api.md#objectlayers) | [PropertyInfo](/viewer/viewer-api.md#propertyinfo) |
| :------------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------- | :----------------------------------------------------- |
| [SelectionEvent](/viewer/viewer-api.md#selectionevent)               | [SpeckleView](/viewer/viewer-api.md#speckleview) | [SunLightConfiguration](/viewer/viewer-api.md#sunlightconfiguration)   | [UpdateFlags](/viewer/viewer-api.md#updateflags)          |
| [Utils](/viewer/viewer-api.md#utilsinterface)               | [ViewerEvent](/viewer/viewer-api.md#viewerevent)                   | [ViewerEventPayload](/viewer/viewer-api.md#viewereventpayload)          | [ViewerParams](/viewer/viewer-api.md#viewerparams)
| [World](/viewer/viewer-api.md#worldclass)

### <h3>Constructors</h3>

#### <b>constructor</b>

```ts
new Viewer(container: HTMLElement, params: ViewerParams)
```

**Parameters**

- **container**: [_HTMLElement_](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
- **params**: [_ViewerParams_](/viewer/viewer-api.md#viewer)

**Returns**: [**_Viewer_**](/viewer/viewer-api.md#viewer)

### <h3>Accessors</h3>

#### <b>Utils</b>

```ts
get Utils(): Utils
```

**Returns**: [**_Utils_**](/viewer/viewer-api.md#utilsinterface)

#### <b>World</b>

```ts
get World(): World
```

**Returns**: [**_World_**](/viewer/viewer-api.md#worldclass)

### <h3>Methods</h3>

#### <b>cancelLoad</b>

```ts
cancelLoad(url: string, unload?: boolean): Promise<void>
```

Cancels any ongoing loading operations, with the option of unloading an current progress

**Parameters**

- **url**: _string_
- _(optional)_ **unload**: _boolean_

**Returns**: <span style="font-weight:normal">A promise which resolves when the operation completes</span>

#### <b>createExtension</b>

```ts
createExtension<T extends Extension>(type: new () => T): T
```

Creates and registers the extension of the specified type constructor

**Parameters**

- **type**: [_Extension_]() subclass

**Returns**: <span style="font-weight:normal">The extension instance</span>

#### <b>dispose</b>

```ts
dispose(): void
```

Disposes the viewer instance

**Returns**: _void_

#### <b>getContainer</b>

```ts
getContainer(): HTMLElement
```

Gets HTML container used at viewer initialisation

**Returns**: [**_HTMLElement_**](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

#### <b>getExtension</b>

```ts
getExtension<T extends Extension>(type: new () => T): T
```

Gets the extension of type T registered with the viewer.

**Returns**: [_Extension_]() <span style="font-weight:normal">subclass, undefined if it does not exist</span>

#### <b>getObjectProperties</b>

```ts
  getObjectProperties(resourceURL?: string, bypassCache?: boolean): Promise<PropertyInfo[]>
```

Goes through all objects and builds [_PropertyInfo_](/viewer/viewer-api.md#propertyinfo) objects asynchronously.
::: warning
When executing for a very large number of objects, this method can take long to finish
:::

**Parameters**

- **resourceURL**: The id of the node where to start building properties.
- _(optional)_ **bypassCache**: Enabled the use of the property cache. Default _false_

**Returns**: [_PropertyInfo[]_](/viewer/viewer-api.md#propertyinfo)

#### <b>getRenderer</b>

```ts
getRenderer(): SpeckleRenderer
```

Gets the [_SpeckleRenderer_](/viewer/speckle-renderer-api.md) instance associated with the viewer.

**Returns**: [_SpeckleRenderer_](/viewer/speckle-renderer-api.md)

#### <b>getViews</b>

```ts
getViews(): SpeckleView[]
```

Gets all the current [_SpeckleView_](/viewer/viewer-api.md#speckleview) instances.

**Returns**: [_SpeckleView[]_](/viewer/viewer-api.md#speckleview)

#### <b>getWorldTree</b>

```ts
getWorldTree(): WorldTree
```

Gets the [_WorldTree_](/viewer/world-tree-api.md) instance associated with the viewer.

**Returns**: [_WorldTree[]_](/viewer/world-tree-api.md)

#### <b>hasExtension</b>

```ts
hasExtension<T extends Extension>(type: Constructor<T>): boolean
```

Returns `true` if specified extension type exists, `false` otherwise

**Returns**: _boolean_


#### <b>init</b>

```ts
init(): Promise<void>
```

Initializes the viewer asynchronously and loads required assets.

**Returns**: <span style="font-weight:normal">_Promise< void >_</span>

#### <b>loadObject</b>

```ts
loadObject(loader: Loader, zoomToObject?: boolean): Promise<void>
```

Loads objects asynchronously using a [_Loader_](/viewer/loader-api.md).

**Parameters**

- **loader**: The [_Loader_](/viewer/loader-api.md) instance used in loading.
- _(optional)_ **zoomToObject**: Enabled zooming in on the loaded object after loading finishes. Default _true_

**Returns**: <span style="font-weight:normal">_Promise< void >_</span>

#### <b>on</b>

```ts
on<T extends ViewerEvent>(
  eventType: T,
  handler: (arg: ViewerEventPayload[T]) => void
): void
```

Subscribes handlers to [_ViewerEvent_](/viewer/viewer-api.md#viewerevent)s.

**Parameters**

- **eventType**: The [_ViewerEvent_](/viewer/viewer-api.md#viewerevent) the handler needs to register to
- **handler**: The event handler

**Returns**: _void_

#### <b>query</b>

```ts
query<T extends Query>(query: T): QueryArgsResultMap[T['operation']]
```

General purpose mechanism for getting spatial information from the viewer.

**Parameters**

- **query**: The [_Query_]() to run

**Returns**: [_QueryResult_]()

#### <b>requestRender</b>

```ts
requestRender(flags?: number): void
```

Requests the viewer to render one or more frames.

**Parameters**

- _(optional)_ **flags**: [_UpdateFlags_](/viewer/viewer-api.md#updateflags). If no flags are provided it defaults to _UpdateFlags.RENDER_.

**Returns**: _void_

#### <b>resize</b>

```ts
resize(): void
```

Resize the viewer manually. The dimensions will be inherited from the container.

**Returns**: _void_

#### <b>screenshot</b>

```ts
screenshot(): Promise<string>
```

Takes a snapshot of the current viewer camera view and returns it as a base64 encoded string.

**Returns**: <span style="font-weight:normal">A promise which resolves to a base64 encoded image.</span>

#### <b>setLightConfiguration</b>

```ts
setLightConfiguration(config: LightConfiguration): void
```

Applies the provided [_LightConfiguration_](/viewer/viewer-api.md#lightconfiguration).

**Returns**: _void_

#### <b>unloadAll</b>

```ts
unloadAll(): Promise<void>
```

Unloads and disposes everything that's currently loaded.

**Returns**: _Promise< void > _

#### <b>unloadObject</b>

```ts
unloadObject(url: string): Promise<void>
```

Unloads and disposes the specified resource associated with the provided url.

**Parameters**

- **url**: The resource id to unload.

**Returns**: _Promise< void > _

### <h3>Typedefs</h3>

#### <b>LightConfiguration</b>

```ts
interface LightConfiguration {
  enabled?: boolean;
  castShadow?: boolean;
  intensity?: number;
  color?: number;
  indirectLightIntensity?: number;
  shadowcatcher?: boolean;
}
```

- **enabled**: Enables direct lighting (sun).
- **castShadow**: Enables shadows.
- **intensity**: Direct light(sun) intensity.
- **color**: Direct light(sun) color.
- **indirectLightIntensity**: Indirect IBL intensity.
- **shadowcatcher**: Enables _The Shadowcatcher_. 🛸

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
  MEASUREMENTS = 5,
}
```

All the layers the viewer uses for rendering objects and props. Rendering order generally follows the order of layers values. The same layers are also used for raycasting, where they are all enabled by default except _STREAM_CONTENT_POINT_ which is disabled

#### <b>PropertyInfo</b>

```ts
interface PropertyInfo {
  key: string;
  objectCount: number;
  type: "number" | "string";
}
```

- **key**: Property identifier, flattened.
- **objectCount**: Total number of objects that have this property.
- **type**: If the property is numeric or string based.

#### <b>SelectionEvent</b>

```ts
type SelectionEvent = {
  multiple: boolean;
  event?: PointerEvent;
  hits: Array<{
    node: TreeNode;
    point: Vector3;
  }>;
};
```

Payload for _ViewerEvent.ObjectClicked_ and _ViewerEvent.ObjectDoubleClicked_.

- **multiple**: Whether this is a multiple selection or not.
- **event**: The browser [_PointerEvent_](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) piggybacked.
- **hits**: The array of hits sorted by distance, where closest is first. _node_ is the intersected [_TreeNode_](/viewer/world-tree-api.md#treenode) and _point_ is it's point of intersection.

#### <b>SpeckleView</b>

```ts
type SpeckleView = {
  name: string;
  id: string;
  view: Record<string, unknown>;
};
```

- **name**: Human readable name.
- **id**: View's speckle id.
- **view**: View's associated speckle data .

#### <b>SunLightConfiguration</b>

```ts
interface SunLightConfiguration extends LightConfiguration {
  elevation?: number;
  azimuth?: number;
  radius?: number;
}
```

- **elevation**: Sun elevation in polar coordinates.
- **azimuth**: Sun azimuth in polar coordinates.
- **radius**: Sun distance from [_World_](/viewer/viewer-api.md#worldclass) center.

#### <b>UpdateFlags</b>

```ts
enum UpdateFlags {
  RENDER = 0b1,
  SHADOWS = 0b10,
  CLIPPING_PLANES = 0b100,
  RENDER_RESET = 0b1000
}
```

Specifies which rendering aspects need to be updated. UpdateFlags work by bit masking. So if you want multiple flags, you need to _OR_ them.

#### <b>UtilsInterface</b>

```ts
interface Utils {
  screenToNDC(
    x: number,
    y: number,
    width?: number,
    height?: number
  ): { x: number; y: number };
  NDCToScreen(
    x: number,
    y: number,
    width?: number,
    height?: number
  ): { x: number; y: number };
}
```

Two utilities that help you move values form NDC to Screen space and back.

#### <b>ViewerEvent</b>

```ts
enum ViewerEvent {
  ObjectClicked = "object-clicked",
  ObjectDoubleClicked = "object-doubleclicked",
  DownloadComplete = "download-complete",
  LoadComplete = "load-complete",
  LoadProgress = "load-progress",
  UnloadComplete = "unload-complete",
  LoadCancelled = "load-cancelled",
  UnloadAllComplete = "unload-all-complete",
  Busy = "busy",
  FilteringStateSet = "filtering-state-set",
  LightConfigUpdated = "light-config-updated",
}
```

All the events the viewer can emit.

#### <b>ViewerEventPayload</b>

```ts
interface ViewerEventPayload {
  [ViewerEvent.ObjectClicked]: SelectionEvent | null
  [ViewerEvent.ObjectDoubleClicked]: SelectionEvent | null
  [ViewerEvent.LoadComplete]: string
  [ViewerEvent.UnloadComplete]: string
  [ViewerEvent.UnloadAllComplete]: void
  [ViewerEvent.Busy]: boolean
  [ViewerEvent.FilteringStateSet]: FilteringState
  [ViewerEvent.LightConfigUpdated]: LightConfiguration
}
```

Mapping of viewer events to event handler argument types
#### <b>ViewerParams</b>

```ts
interface ViewerParams {
  showStats: boolean;
  environmentSrc: Asset;
  verbose: boolean;
}
```

- **showStats**: Displays a [stats](https://github.com/mrdoob/stats.js) panel.
- **environmentSrc**: The URL of the image used for indirect IBL.
- **verbose**: Enables viewer logs.

#### <b>Asset</b>

```ts
enum AssetType {
  TEXTURE_8BPP = 'png', 
  TEXTURE_HDR = 'hdr',
  TEXTURE_EXR = 'exr',
  FONT_JSON = 'font-json'
}

interface Asset {
  id: string
  src: string
  type: AssetType
}
```

- **id**: Mandatory id of the asset.
- **src**: The URL of the asset. Supports inline base64 encoded assets
- **type**: _AssetType_
:::warning
For correct asset caching use need to use unique asset ids!
:::

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
  getRelativeOffset(offsetAmount: number = 0.001): number
```

Utility class for keeping track of the total dimensions of loaded objects. It's mostly used for informative purposes
