# BaseGPass

[_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md) -> [_BaseGPass_](/viewer/rendering-pipeline-api/base-g-pass-api.md)

Abstract base class which contains most of the basic common implementation for most passes. When developing a new pass, it's recommended to extend this class rather then implementing the `GPass` interface directly.

:::warning
`BaseGPAss` implements almosts all [_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md) members however the `render` function is declared as `abstract` so extending implementations will need to implement it themselves 
:::


### <h3>Methods</h3>

| [applyLayer](/viewer/rendering-pipeline-api/base-g-pass-api.md#applylayer)                 | [clear](/viewer/rendering-pipeline-api/base-g-pass-api.md#clear)               | [enableLayer](/viewer/rendering-pipeline-api/base-g-pass-api.md#enablelayer)          |
| :------------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | 



### <h3>Methods</h3>

#### <b>applyLayer</b>

```ts
protected applyLayers(camera: Camera | null)
```
Implementation for applying object layers. Provided for extending types

**Returns**: _void_

#### <b>clear</b>

```ts
protected clear(renderer: WebGLRenderer)
```
Implementation for clearing render targets. Provided for extending types

**Parameters**

- **renderer**: The hosting [_WebGLRenderer_](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer)

**Returns**: _void_

#### <b>enableLayer</b>

```ts
enableLayer(layer: ObjectLayers, value: boolean): void
```

Enabled/disables specific object layers on the pass

**Parameters**

- **layer**: The [_ObjectLayers_](/viewer/viewer-api.md#objectlayers) to enable/disable 
- **value**: _boolean__

**Returns**: _void_





