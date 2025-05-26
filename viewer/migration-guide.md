---
title: Migration Guide
deprecationMessages: viewer
---

<Banner />

# Migration Guide

# 2.23.6 - 2.23.8
- `Loader`'s `resourceData` changed from `string | ArrayBuffer` to `unknown` to allow each loader to define it’s own resource data type

# 2.21.2 - 2.23.6
- `SmoothOrbitControls`'s constructor changed. It no longer takes a `Scene` and `Intersections`, but only a `SpeckleRenderer`

# 2.21.1 - 2.22.2
- Entire rendering pipeline got a massive update and it now allows for free user customization as well as user defined passes
- `pipeline` accessors added to `SpeckleRenderer`. This allows for user defined rendering pipelines
- `pipelineOptions` accessors removed from `SpeckleRenderer`
- `PipelineOutputType` removed. The pipeline’s result now depends on the pipeline’s pass configuration
- `DynamicAOPassParams`  and it’s default removed
- `StaticAoPassParams` and it’s default removed and replaced by `ProgressiveAOPassOptions`
- A series of pre-defined rendering passes as well as entire rendering pipelines have been added

# 2.20.2 → 2.21.1
- `Vector3` and `Box3` have been removed from the viewer’s exports. They can now be imported from three.js

# 2.19.4 → 2.20.2
- All input mesh vertex colors are now treated as sRGB

# 2.19.1 → 2.19.4
- `NearCameraCalculation` type option added to `CameraController` option.
- `UpdateFlags.RENDER` no longer resets pipeline. Added `UpdateFlags.RENDER_RESET` which forces a pipeline reset

# 2.18.16 → 2.19.1
- Added `tasOnly` as a parameter in all `intersect` variants.
- The existing `firstHitOnly` option on `Raycaster` now stops on first intersected TAS, asa well as first intersected BAS from that TAS (if `tasOnly` is not set)

# 2.18.15 → 2.18.16
- `Vector3Like` replaces `VectorLike` in the arguments of `transformTRS` in `BatchObject`
- `SpeckleLoader` no longer takes a `priority` argument in it’s constructor
- `addRenderTree` from `SpeckleRenderer` now takes a `RenderTree` as an argument instead of a `RenderTree` id
- `getRenderTree` is now overloaded with a version with no arguments that never returns null
- `intersect` and `intersectRay` arguments have been moved around and both are now overloaded

# 2.18.14 → 2.18.15
- Asset now has a mandatory ```id``` field
- `getEnvironment` and `getTexture` from `Assets` now only accept `Asset` as argument
- The concept of `Providers` has been removed entirely
- `CameraProvider` has been replaced by `SpeckleCamera`
- `CameraControllerEvent` renamed to `CameraEvent`

# 2.18 → 2.18.14

- `updateClippingPlanes`  in `SpeckleRenderer`  does not take an optional `Plane[]` argument anymore
- `setOptions` from `SelectionExtension` has changed to an accessor
- `displayOn` and `displayOff` from `SectionTool` are replaced by `visible` accessor

# 2.x → 2.18

The introduction of viewer API 2.0 into our stable channel. The changes to the API itself are extensive and there is no point for a step by step guide, as what was previously known as API 2.0 will become the single supported viewer API moving forward.

<h2>API 1.0 Backwards Compatibility:</h2>

For **backwards compatibility** reasons we provide a built-in legacy implementation that emulates the old API precisely. Please note that this is meant as a temporary measure which will eventually become naturally obsolete. For this purpose, this migration guide entry will describe moving from any older viewer version to 2.18 *while using the legacy implementation*

- `Viewer` or `DebugViewer` instances are replaced by `LegacyViewer`
- The `hits`  field from `SelectionEvent` now holds the hit node and hit point.
    
    ```jsx
    type SelectionEvent = {
      multiple: boolean
      event?: PointerEvent
      hits: Array<{
        node: TreeNode
        point: Vector3
      }>
    }
    ```
    
- The synchronous `loadObject` was removed. Please use `loadObjectAsync` which works the same way

<h2>API 1.0 Full Migration:</h2>

The encouraged way, is to conform to the new API as soon as possible. The following guide will attempt to help with the initial migration from the old API to the new one.

<h3>Extensions:</h3>

A lot of existing viewer functionality has been transferred over to modular `Extensions`. In order to continue to make use of this functionality, the viewer clients now need to explicitly enable extensions by calling `createExtension` with the extension’s constructor as the argument. For example, the complete functionality set requires all the extensions enabled

```jsx
const cameraController = this.createExtension(CameraController)
const selection = this.createExtension(LegacySelectionExtension)
const sections = this.createExtension(SectionTool)
const sectionOutlines = this.createExtension(SectionOutlines)
const measurements = this.createExtension(MeasurementsExtension)
const filtering = this.createExtension(FilteringExtension)
const explodeExtension = this.createExtension(ExplodeExtension)
const diffExtension = this.createExtension(DiffExtension)
```

<h3>General:</h3>

- `ViewerParams`no longer has a `keepGeometryData` property. Redundant geometry data is by default removed and cannot be kept
- `SectionBoxChanged` and `SectionBoxUpdated` removed from `ViewerEvent` and replaced by `SectionToolEvent.Updated` in `SectionTool` extension
- `SelectionEvent.hits` changed to `Array<{node: TreeNode, point: Vector3}>`
- `requestRender` from `Viewer` now takes optional `UpdateFlags`
- `getObjects` removed from `Viewer`. Similar functionality exists with `getObject` in `SpeckleRenderer`
- `explode` removed from `Viewer` and replaced by having an `ExplodeExtension` active. Explode time is now controller via `setExplode` in `ExplodeExtension`
- `getDataTree` and `DataTree` type still exist, but are deprecated and will be soon removed completely. Any functionality can now be replicated with `WorldTree`
- `cameraHandler` removed from `Viewer` and replaced by `controls` accessor in `CameraController`.

<h3>Section Box:</h3>

- `setSectionBox` removed from `Viewer` and replaced by `setBox` in`SectionTool`
- `getSectionBoxFromObjects` removed from `Viewer`  and replaced by `boxFromObjects` from `SpeckleRenderer`
- `getCurrentSectionBox` removed from `Viewer` and replace by `getCurrentBox` in`SectionTool`
- `toggleSectionBox` removed from `Viewer` and replaced by `toggle` in `SectionTool`
- `sectionBoxOff` and `sectionBoxOn` removed from `Viewer` and replaced by the `enabled` accessor in `SectionTool`

<h3>Camera:</h3>

- `zoom` removed from `Viewer` and replaced by `setCameraView` in `CameraController` extension
- `toggleCameraProjection` removed from `Viewer` and replaced by `toggleCameras` in `CameraController` extension
- `setView` removed from `Viewer` and replaced by `setCameraView` in `CameraController` extension
- `loadObject` signature changed to `loadObject(loader: Loader, zoomToObject?: boolean)` and it’s now asynchronous
- `loadObjectAsync` removed from `Viewer`

<h3>Diffing:</h3>

- `diff` removed from `Viewer` and replaced by `diff` in `DiffExtension`
- `undiff` removed from `Viewer` and replaced by `undiff` in `DiffExtension`
- `setDiffTime` and `setVisualDiffMode` removed from `Viewer` and replaced by `updateVisualDiff` in `DiffExtension`

<h3>Filtering and Selection:</h3>

- `applyFilter` removed from `Viewer`
- `getObjectProperties` is now asynchronous
- `showObjects` and `hideObjects` are removed from `Viewer` and moved to `FilteringExtension`
- `isolateObjects` and `unIsolateObjects` are removed from `Viewer` and moved to `FilterinExtension`
- `selectObjects` is removed from `Viewer` and replaced by `selectObjects` in `SelectionExtension`
- `resetSelection` is removed from `Viewer` and replaced by `clearSelection` in `SelectionExtension`
- `highlightObjects` and `resetHighlight` are removed from `Viewer`
- `setColorFilter` ans `removeColorFilter` are removed from `Viewer` and replaced by `setColorFilter`and `removeColorFilter` in `FilteringExtension`
- `setUserObjectColors` is remove from `Viewer` and replaced by `setUserObjectColors` in `SelectionExtension` but usage is discouraged since paradigm no longer applies
- `resetFilters`  is removed from `Viewer` and replaced by `resetFilters`  in `SelectionExtension`

<h3>Measurements:</h3>

- `enableMeasurements` removed from `Viewer` and replaced by having a `MeasurementsExtension` active and it’s `enabled` accessor set
- `setMeasurementOptions` removed from `Viewer` and replaced by the `options` accessor in `MeasurementsExtension`
- `removeMeasurement` removed from `Viewer` and replaced by `removeMeasurement` in `MeasurementsExtension`