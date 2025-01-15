# Pipeline

Abstract class that is the base for all concrete rendering pipeline implementations.

### <h3>Constructors</h3>
 [constructor](/viewer/rendering-pipeline-api/pipeline-api.md#constructor) |
| :-------------------------------------------------- | 

### <h3>Properties</h3>

| [drawingSize](/viewer/rendering-pipeline-api/pipeline-api.md#drawingsize) | [passList](/viewer/rendering-pipeline-api/pipeline-api.md#passlist) | [speckleRenderer](/viewer/rendering-pipeline-api/pipeline-api.md#specklerenderer) 
| :-------------------------------------------------- | :------------------------------------------------ | :---------------------------- | 


### <h3>Accessors</h3>

| [passes](/viewer/rendering-pipeline-api/pipeline-api.md#passes)
| :------------------------------------------------ | 

### <h3>Methods</h3>

| [createMultipleRenderTarget](/viewer/rendering-pipeline-api/pipeline-api.md#createmultiplerendertarget)                 | [createRenderTarget](/viewer/rendering-pipeline-api/pipeline-api.md#createrendertarget)               | [getPass](/viewer/rendering-pipeline-api/pipeline-api.md#getpass)               | [onAfterPipelineRender](/viewer/rendering-pipeline-api/pipeline-api.md#onafterpipelinerender)           |
| :------------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | :-------------------------------------------------------- |
| [onBeforePipelineRender](/viewer/rendering-pipeline-api/pipeline-api.md#onbeforepipelinerender) | [render](/viewer/rendering-pipeline-api/pipeline-api.md#render)             | [reset](/viewer/rendering-pipeline-api/pipeline-api.md#reset)     | [resize](/viewer/rendering-pipeline-api/pipeline-api.md#resize)             |
| [setClippingPlanes](/viewer/rendering-pipeline-api/pipeline-api.md#setclippingplanes)         | [update](/viewer/rendering-pipeline-api/pipeline-api.md#update) 


### <h3>Constructors</h3>

#### <h4>constructor</h4>

```ts
constructor(speckleRenderer: SpeckleRenderer)
```
**Parameters**

- **speckleRenderer**: The hosting renderer as [_SpeckleRenderer_](/viewer/speckle-renderer-api.md)


### <h3>Properties</h3>


#### <b>drawingSize</b>

```ts
protected drawingSize: Vector2;
```

The final display size for the pipeline in pixels. DPR is already factored in.

**Returns**: [_Vector2_](https://threejs.org/docs/index.html?q=vect#api/en/math/Vector2)

#### <b>passList</b>

```ts
protected passList: Array<GPass>;
```

The pipeline's ordered [_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md).

**Returns**: Array<[_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md)>

#### <b>speckleRenderer</b>

```ts
protected speckleRenderer: SpeckleRenderer;
```

The hosting speckle renderer instance 

**Returns**: [_SpeckleRenderer_](/viewer/speckle-renderer-api.md)


### <h3>Accessors</h3>

#### <b>passes</b>

```ts
get passes(): Array<GPass>;
```

Gets the current ordered pass list

**Returns**: Array<[_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md)>



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

**Returns**: [_GPass[]_](/viewer/rendering-pipeline-api/g-pass-api.md)


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


