# ProgressivePipeline 

[_Pipeline_](/viewer/rendering-pipeline-api/pipeline-api.md) -> [_ProgressivePipeline_](/viewer/rendering-pipeline-api/progressive-pipeline-api.md)

Abstract class that extends the abstract [_Pipeline_](/viewer/rendering-pipeline-api/pipeline-api.md) and provides builtin functionality for progressive rendering. Progressive pipelines define three stages for themselves:
- Dynamic
- Progressive
- Passthrough

Each stage will typically have it's own list of [_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md), bu they can share pass instances between them if necessary

At any given time the pipeline can be in one of these stages. *Dynamic* stage is when the pipeline needs to render dynamic content like for example when the camera is in motion. *Progressive* stage is when the pipeline has reached a stationary point and progressive rendering can start and accumulate. *Passthrough* stage is when the pipeline needs to render, without restarting an already existing progressive result. The progressive rendering resulti is passed through as is.


### <h3>Constructors</h3>
 [constructor](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#constructor) |
| :-------------------------------------------------- | 

### <h3>Properties</h3>

| [accumulating](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#accumulating) | [accumulationFrameCount](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#accumulationframecount)   | [accumulationFrameIndex](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#accumulationframeindex) | [dynamicStage](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#dynamicstage)   |
| :--------------------------------------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------------- | :----------------------------------------------------------------- |      
| [passthroughStage](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#passthroughstage) | [progressiveStage](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#progressivestage) 



### <h3>Accessors</h3>

| [passes](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#passes)
| :------------------------------------------------ | 

### <h3>Methods</h3>

| [onStationaryBegin](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#onstationarybegin)                 | [onStationaryEnd](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#onstationaryrnd)               | [onAccumulationComplete](/viewer/rendering-pipeline-api/progressive-pipeline-api.md#onaccumulationcomplete)               |           |
| :------------------------------------------------------------ | :------------------------------------------------------ | :------------------------------------------------------ | :-------------------------------------------------------- |


### <h3>Constructors</h3>

#### <h4>constructor</h4>

```ts
constructor(speckleRenderer: SpeckleRenderer)
```
**Parameters**

- **speckleRenderer**: The hosting renderer as [_SpeckleRenderer_](/viewer/speckle-renderer-api.md)


### <h3>Properties</h3>


#### <b>accumulating</b>

```ts
protected accumulating: boolean;
```

Flag that indicates whether the pipeline is in the process of accumulating samples or not


#### <b>accumulationFrameCount</b>

```ts
protected accumulationFrameCount: number;
```
The pipeline's desired accumulation frames count. Defaults to `16`

#### <b>accumulationFrameIndex</b>

```ts
protected accumulationFrameIndex: number;
```

The pipeline's current accumulation frame index, `0` if not in the progressive stage


#### <b>dynamicStage</b>

```ts
protected dynamicStage: Array<GPass>;
```

The pipeline's dynamic rendering stage pass list.
:::tip
These passes will be used for rendering in dynamic scenarios, like when the camera is moving
:::


#### <b>progressiveStage</b>

```ts
protected progressiveStage: Array<GPass>;
```

The pipeline's progressive rendering stage pass list.
:::tip
These passes will be used for rendering in static scenarios, like when the camera has stopped and the pipeline needs to accumulate progressive samples
:::

#### <b>passthroughStage</b>

```ts
protected passthroughStage: Array<GPass>;
```

The pipeline's passthrough rendering stage pass list.
:::tip
These passes will be used for rendering in scenarios where the pipeline needs to render, however it wants to keep it's last progressive render result and just pass it through
:::


### <h3>Accessors</h3>

#### <b>passes</b>

```ts
get passes(): Array<GPass>;
```

Gets the pipeline's passes by combining all three of it's stages passes in the following order: dynamic, progressive and passthrough.

**Returns**: Array<[_GPass_](/viewer/rendering-pipeline-api/g-pass-api.md)>



### <h3>Methods</h3>

#### <b>onStationaryBegin</b>

```ts
onStationaryBegin(): void
```
Callback for when the pipeline is switching from dynamic/passthrough stage to progressive


**Returns**: _void_

#### <b>onStationaryEnd</b>

```ts
onStationaryEnd(): void
```
Callback for when the pipeline is switching from progressive stage to dynamic

**Returns**: _void_


#### <b>onAccumulationComplete</b>

```ts
onAccumulationComplete(): void
```

Callback for when the pipeline has finished accumulating and is switching from progressive to passthrough

**Returns**: _void_


