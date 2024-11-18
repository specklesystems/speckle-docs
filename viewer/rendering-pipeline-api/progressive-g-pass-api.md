# ProgressiveGPass

[_BaseGPass_](/viewer/rendering-pipeline-api/base-g-pass-api.md) -> [_ProgressiveGPass_](/viewer/rendering-pipeline-api/progressive-g-pass-api.md)

Base abstract class for all passes that need to converge/accumulate over more than one frame.

### <h3>Accessors</h3>

| [accumulationFrames](/viewer/rendering-pipeline-api/progressive-g-pass-api.md#clearalpha)                 | [frameIndex](/viewer/rendering-pipeline-api/progressive-g-pass-api.md#clearcolor)    |
| :------------------------------------------------------------ | :------------------------------------------------------ | 



### <h3>Methods</h3>

[render](/viewer/rendering-pipeline-api/g-pass-api.md#render)     |
:------------------------------------------------------------ |   


### <h3>Accessors</h3>


#### <b>accumulationFrames</b>

```ts
get accumulationFrames(): number 
set accumulationFrames(value: number) 
```

Gets or sets the total number of frames the pass needs to converge/accumulate in.

**Returns**: _number_


#### <b>frameIndex</b>

```ts
get frameIndex(): number 
set frameIndex(value: number) 
```

Gets or sets the frame index in the current convergence/accumulation cycle.

**Returns**: _number_


### <h3>Methods</h3>

#### <b>render</b>

```ts
render(
    renderer: WebGLRenderer,
    camera?: PerspectiveCamera | OrthographicCamera | null,
    scene?: Scene
  ): boolean
```
Implementation for the base class abstract `render` which automatically returns `true` while `frameIndex < accumulationFrames`, and `false` otherwise

**Parameters**

- **renderer**: The hosting [_WebGLRenderer_](https://threejs.org/docs/index.html?q=webgl#api/en/renderers/WebGLRenderer)
- _optional_ **camera**: Rendering camera
- _optional_ **scene**: Scene that needs to be rendered

**Returns**: _boolean_




