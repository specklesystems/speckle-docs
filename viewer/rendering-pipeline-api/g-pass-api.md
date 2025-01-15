# GPass

Contract for all rendering pass implementations in the speckle viewer. The "G" stands for "Graphics" and it's only there to make it clear that it's a different type that three's `Pass`.

### <h3>Accessors</h3>

| [clearAlpha](/viewer/rendering-pipeline-api/g-pass-api.md#clearalpha)                 | [clearColor](/viewer/rendering-pipeline-api/g-pass-api.md#clearcolor)               | [clearFlags](/viewer/rendering-pipeline-api/g-pass-api.md#clearflags)               | [displayName](/viewer/rendering-pipeline-api/g-pass-api.md#displayname)           |
| :------------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | :-------------------------------------------------------- |
| [enabled](/viewer/rendering-pipeline-api/g-pass-api.md#enabled) | [jitter](/viewer/rendering-pipeline-api/g-pass-api.md#jitter)             | [options](/viewer/rendering-pipeline-api/g-pass-api.md#options)     | [outputTarget](/viewer/rendering-pipeline-api/g-pass-api.md#outputTarget)             |
| [overrideBatchMaterial](/viewer/rendering-pipeline-api/g-pass-api.md#overridebatchmaterial)         | [overrideMaterial](/viewer/rendering-pipeline-api/g-pass-api.md#overridematerial) | [visibility](/viewer/rendering-pipeline-api/g-pass-api.md#visibility)  


### <h3>Methods</h3>

| [onAferRender](/viewer/rendering-pipeline-api/g-pass-api.md#onaferrender)                 | [onBeforeRender](/viewer/rendering-pipeline-api/g-pass-api.md#onbeforerender)               | [render](/viewer/rendering-pipeline-api/g-pass-api.md#render)               | [setClearColor](/viewer/rendering-pipeline-api/g-pass-api.md#setclearcolor)           |
| :------------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | :-------------------------------------------------------- |
| [setClearFlags](/viewer/rendering-pipeline-api/g-pass-api.md#setclearflags) | [setClippingPlanes](/viewer/rendering-pipeline-api/g-pass-api.md#setclippingplanes)             | [setJitter](/viewer/rendering-pipeline-api/g-pass-api.md#setjitter)     | [setLayers](/viewer/rendering-pipeline-api/g-pass-api.md#setlayers)             |
| [setSize](/viewer/rendering-pipeline-api/g-pass-api.md#setsize)         | [setVisibility](/viewer/rendering-pipeline-api/g-pass-api.md#setvisibility) | [update](/viewer/rendering-pipeline-api/g-pass-api.md#update) 


### <h3>Typedefs</h3>

| [ClearFlags](/viewer/rendering-pipeline-api/g-pass-api.md#clearflags) | [ObjectVisibility](/viewer/rendering-pipeline-api/g-pass-api.md#objectvisibility) | [PassOptions](/viewer/rendering-pipeline-api/g-pass-api.md#passoptions)   |
| :------------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------- | 

### <h3>Accessors</h3>


#### <b>clearAlpha</b>

```ts
get clearAlpha(): number | undefined
```

Gets the current alpha clear value for the pass. If the value is `undefined` the pass will not clear alpha

**Returns**: _number | undefined_


#### <b>clearColor</b>

```ts
get clearColor(): number | undefined
```

Gets the current clear color value for the pass. If the value is `undefined` the pass will not clear color. 

The color is represented as a `number` where:
- `R = value & 0xFF0000`
- `G = value & 0x00FF00`
- `B = value & 0x0000FF`

**Returns**: _number | undefined_

#### <b>clearFlags</b>

```ts
get clearFlags(): number | undefined
```

Gets the current flags that determine what gets cleared by the pass. The value returned is a mask with the possibly OR-ed WebGL constant values for `COLOR_BUFFER_BIT` `DEPTH_BUFFER_BIT` and `STENCIL_BUFFER_BIT`

**Returns**: _number | undefined_


#### <b>displayName</b>

```ts
get displayName(): string
```

Gets the display name of the pass

**Returns**: _string_


#### <b>enabled</b>

```ts
get enabled(): boolean
set enabled(value: boolean)
```

Gets or sets the enabled state of the pass. A disabled pass will not be rendered by the hosting pipeline

**Returns**: _boolean_



#### <b>jitter</b>

```ts
get jitter(): boolean
```

Gets the jitter state of the pass. If jitter is enabled, the pipeline will apply Hatlon jitter to the projection matrix

**Returns**: _boolean_


#### <b>options</b>

```ts
set options(value: PassOptions)
```
Sets the pass options. [_PassOptions_]()

**Returns**: _void_



#### <b>outputTarget</b>

```ts
set outputTarget(value: WebGLRenderTarget)
get outputTarget(): WebGLRenderTarget | null
```

Gets or sets the render target the pass writes to. If `null` it will write to the backbuffer

**Returns**: [_WebGLRenderTarget_](https://threejs.org/docs/index.html?q=WebGLRenderTarget#api/en/renderers/WebGLRenderTarget)


#### <b>overrideBatchMaterial</b>

```ts
get overrideBatchMaterial(): Material | null
```
Gets the material that will override the default material of batches in the scene. This allows the pass to combine it's defined override material with filters or other externally applied materials. If `null`, nothing gets overriden

**Returns**: _Material | null_


#### <b>overrideMaterial</b>

```ts
get overrideMaterial(): Material | null
```
Gets the material that will override *all* materials. If the overriden material is defined, it will completely replace any existing materials on the batches and no other effects that apply materials on objects will be made visible in this pass's render result. If `null`, nothing gets overriden

**Returns**: _Material | null_

#### <b>visibility</b>

```ts
get visibility(): ObjectVisibility | null
```
Gets the current visibility state for the pass. If `null`, no visibility restrictions will be applied to the pass's rendering, i.e everything gets rendered

**Returns**: _ObjectVisibility | null_


### <h3>Methods</h3>

#### <b>onAferRender</b>

```ts
onAferRender: () => void
```
Callback for after rendering the pass

**Returns**: _void_

#### <b>onBeforeRender</b>

```ts
onBeforeRender: () => void
```
Callback for before rendering the pass

**Returns**: _void_

#### <b>render</b>

```ts
render(
    renderer: WebGLRenderer,
    camera?: PerspectiveCamera | OrthographicCamera | null,
    scene?: Scene
  ): boolean
```

The pass's render function

**Parameters**

- **renderer**: The hosting [_WebGLRenderer_](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer)
- _optional_ **camera**: The rendering camera
- _optional_ **scene** The scene to be rendered

**Returns**: _boolean_ If `true`, it signals that the pass needs more rendering, `false` otherwise 


#### <b>setClearColor</b>

```ts
setClearColor(color: number, alpha: number): void
```

Sets the pass's clear color and alpha. 

:::warning
Clearing will be executed on whatever the current `outputTarget` value is. If `outputTarget` is `null`, the backbuffer will be cleared!
:::

**Parameters**

- **color**: The color represented as a number as previously [detailed](/viewer/rendering-pipeline-api/g-pass-api.md#clearcolor)
- **alpha**: The alpha value in the range of [0,1]

**Returns**: _void_


#### <b>setClearFlags</b>

```ts
setClearFlags(flags: number): void
```

Sets the clear flags. The [_ClearFlags_](/viewer/rendering-pipeline-api/g-pass-api.md#clearflagsenum) values can be used for ease of use

**Parameters**

- **flags**: The value for the flags as previously [detailed](/viewer/rendering-pipeline-api/g-pass-api.md#clearflags)

**Returns**: _void_


#### <b>setClippingPlanes</b>

```ts
setClippingPlanes(planes: Plane[]): void
```

Sets the current clipping planes, if any exist

**Parameters**

- **flags**: The array of [_Planes_](https://threejs.org/docs/index.html?q=plane#api/en/math/Plane)

**Returns**: _void_



#### <b>setJitter</b>

```ts
setJitter(value: boolean): void
```
Enables/disables jittering for the pass

**Returns**: _void_



#### <b>setLayers</b>

```ts
setLayers?(layers: ObjectLayers[]): void
```
The the exclusive layers this pass will render. If no layers are set, all layers get rendered

**Parameters**

- **layers**: [_ObjectLayers_](/viewer/viewer-api.md#objectlayers)

**Returns**: _void_



#### <b>setSize</b>

```ts
setSize(width: number, height: number): void
```

Sets the rendering size for this pass. 

**Parameters**

- **width**: _number_
- **height**: _number_

**Returns**: _void_



#### <b>setVisibility</b>

```ts
setVisibility(objectVisibility: ObjectVisibility): void
```

Sets the exclusive visibility of the pass. Currently just a single visibility option can be set.

**Parameters**

- **objectVisibility**: [_ObjectVisibility_](/viewer/rendering-pipeline-api/g-pass-api.md#objectvisibility)

**Returns**: _void_


#### <b>update</b>

```ts
update(camera: PerspectiveCamera | OrthographicCamera | null): void
```

The pass's update function. Generally used for updating pass related data before the render call

**Parameters**

- **camera**: The rendering camera

**Returns**: _void_



### <h3>Typedefs</h3>

#### <b>ClearFlags</b>

```ts
enum ClearFlags {
  COLOR = 0x00000100,
  DEPTH = 0x00000400,
  STENCIL = 0x00004000
}
```

The WebGL constant values for the clear flags for convenience


#### <b>ObjectVisibility</b>

```ts
enum ObjectVisibility {
  OPAQUE = 'opaque',
  TRANSPARENT = 'transparent',
  DEPTH = 'depth',
  STENCIL = 'stencil'
}
```

An object visibility categorization. Used to restrict pass rendering to only specific object lists

#### <b>PassOptions</b>

```ts
interface PassOptions {}
```

This can be virtuall anything, and it's up for the concrete pass implementations to define their own options


