---
title: Introduction
deprecationMessages: viewer
---

<Banner />

# Introduction

The viewer features a completely customisable rendering pipeline based on core three.js functionality, but **not** on it's default `EffectComposer` approach.

### <h3>Stock Pipelines</h3>

The library comes with several stock rendering pipelines:
- _DefaultPipeline_: Normal Shading
- _ShadedViewPipeline_: Typical for Speckle data. Uses the color proxies of objects instead of material colors
- _ArcticViewPipeline_: Solid white coloring + heavy spread ambient occlusion
- _PenViewPipeline_: Object outlines only respecting the scene depth
- _SolidViewPipeline_: Solid coloring using a matcap texture or optionally a solid color
- _EdgesPipeline_: Object outlines only. Typically used inside other pipelines rather than on it's own


The way a pipeline is set is via the _SpeckleRenderer's_ [_pipeline_](/viewer/speckle-renderer-api.md#pipeline) property

```ts
const renderer = viewer.getRenderer()
renderer.pipeline = new PenViewPipeline(renderer)
```

Pipeline take optionally [options](/viewer/speckle-renderer-api.md#basepipelineoptions) of various kinds. All stock pipelines take [PipelineOptions](/viewer/speckle-renderer-api.md#pipelineoptions) which controls the overlaying of edges/outlines. Default is `true`. 

```ts
const renderer = viewer.getRenderer()
renderer.pipeline = new PenViewPipeline(renderer, {
    outlineThickness: 4
    outlineColor: 0xff0000
    outlineOpacity: 0.5
})
```