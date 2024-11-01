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
Sets the pass options

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

#### <b>createMultipleRenderTarget</b>

```ts
static createMultipleRenderTarget(
    count: number,
    options?: WebGLRenderTargetOptions,
    width?: number,
    height?: number
  ): WebGLMultipleRenderTargets
```
Creates an MRT enabled three.js render target.

::: warning
The resulting render target will be using a 32 bit depth + stencil _renderbuffer_.
:::

::: warning
Because the Speckle viewer is still using an older version of three.js the type `WebGLMultipleRenderTargets` does not exist anymore in their documentation. However it works similarly to the regular `WebGLRenderTarget`
:::

**Parameters**

- **count**: The number of color attachements to the framebuffer
- _optional_ **options**: [_WebGLRenderTargetOptions_](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderTarget)
- _optional_ **width**: _number_ If none specified it will default to `1`
- _optional_ **height**: _number_ If none specified it will default to `1`


**Returns**: [_WebGLMultipleRenderTargets_](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderTarget)

#### <b>createRenderTarget</b>

```ts
static createRenderTarget(
    options?: WebGLRenderTargetOptions,
    width?: number,
    height?: number
  ): WebGLRenderTarget
```
Creates a three.js render target.

::: warning
The resulting render target will be using a 32 bit depth + stencil _renderbuffer_.
:::

**Parameters**

- _optional_ **options**: [_WebGLRenderTargetOptions_](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderTarget)
- _optional_ **width**: _number_ If none specified it will default to `1`
- _optional_ **height**: _number_ If none specified it will default to `1`


**Returns**: [WebGLRenderTarget](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderTarget)

#### <b>getPass</b>

```ts
getPass(name: string): GPass[]
```

Get's all the passes with the provided name

**Parameters**

- **name**: _string_

**Returns**: [_GPass[]_](/viewer/pipeline-api/gpass-api.md)


#### <b>onAfterPipelineRender</b>

```ts
onAfterPipelineRender(): void 
```

Callback for before the pipeline starts to render

**Returns**: _void_

#### <b>onBeforePipelineRender</b>

```ts
onBeforePipelineRender(): void
```

Callback for before the pipeline has finished rendering

**Returns**: _void_


#### <b>render</b>

```ts
render(): boolean
```

The pipeline's render loop. The `Pipeline` class offers a complete implementation for the render loop that feeds the required data into the passes. Only very specialized pipelines would require the render function overriden

**Returns**: _boolean_ A `true` value indicates that the pipeline needs further rendering. `false` otherwise

#### <b>reset</b>

```ts
reset(): void
```
Resets the pipeline

**Returns**: _void_

#### <b>resize</b>

```ts
resize(width: number, height: number): void
```
Resizes the pipeline with the provided dimensions. The `width` and `height` are expected to be final values, as in, they should contained any DPR already factored in

**Parameters**

- **width**: _number_
- **height**: _number_

**Returns**: _void_

#### <b>setClippingPlanes</b>

```ts
setClippingPlanes(planes: Plane[]): void
```

Propagates clipping planes towards the pipeline's consituent passes

**Parameters**

- **planes**: The clipping [_Planes_](https://threejs.org/docs/index.html?q=plane#api/en/math/Plane)

**Returns**: _void_


