---
title: ViewModes
deprecationMessages: viewer
---

<Banner />

# ViewModes

This extension simplifies working with stock [rendering pipelines](/viewer/rendering-pipeline-api)
:::warning
For correct behavior of SHADED view mode, a FilteringExtension is required to be present when adding this extension
:::

### <h3>Accessors</h3>

| [viewMode](/viewer/view-modes-extension-api.md#viewmode) | [viewModeOptions](/viewer/view-modes-extension-api.md#viewmodeoptions) |
| ------------------------------------------------------- | --------------------------------------------------- |


### <h3>Methods</h3>

| [on](/viewer/view-modes-extension-api.md#on) | [setViewMode](/viewer/view-modes-extension-api.md#setviewmode) |
| ------------------------------------------------------- | --------------------------------------------------- |


### <h3>Typedefs</h3>

| [ViewMode](/viewer/view-modes-extension-api.md#viewmode) | [ViewModeEvent](/viewer/view-modes-extension-api.md#viewmodeevent) | [ViewModeOptions](/viewer/view-modes-extension-api.md#viewmodeoptions) | [ViewModeEventPayload](/viewer/view-modes-extension-api.md#viewmodeeventpayload) |
| -------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |


### <h3>Accessors</h3>

#### <b>viewMode</b>

```ts
get viewMode(): ViewMode
```

Gets the current view mode

**Returns**: [_ViewMode_](/viewer/view-modes-extension-api.md#viewmode)

#### <b>viewModeOptions</b>

```ts
get viewModeOptions(): ViewModeOptions
```

Gets the current view mode options

**Returns**: [_ViewModeOptions_](/viewer/view-modes-extension-api.md#viewmodeoptions)


### <h3>Methods</h3>

#### <b>on</b>

```ts
on<T extends ViewModeEvent>(
    eventType: T,
    listener: (arg: ViewModeEventPayload[T]) => void
)
```
Method for subscribing to view mode events.

**Parameters**

- **eventType**: [_ViewModeEvent_](/viewer/view-modes-extension-api.md#viewmodeevent)
- **listener**: The handler for the events with [_ViewModeEventPayload_](/viewer/view-modes-extension-api.md#viewmodeeventpayload) arguments

**Returns**: void


#### <b>setViewMode</b>

```ts
setViewMode(viewMode: ViewMode, options?: ViewModeOptions)
```
Sets the provided [ViewMode](/viewer/view-modes-extension-api.md#viewmode) along with the options

**Parameters**

- **viewMode**: [ViewMode](/viewer/view-modes-extension-api.md#viewmode)
- _(optional)_ **options**: [_ViewModeOptions_](/viewer/view-modes-extension-api.md#viewmodeoptions)

**Returns**: void


### <h3>Typedefs</h3>

#### <b>ViewMode</b>

```ts
enum ViewMode {
  DEFAULT,
  SOLID,
  PEN,
  ARCTIC,
  SHADED
}
```
Defines the supported view modes


#### <b>ViewModeEvent</b>

```ts
enum ViewModeEvent {
  Changed = 'view-mode-changed'
}
```
Defines the supported view modes events


#### <b>ViewModeOptions</b>

```ts
type ViewModeOptions = PipelineOptions & EdgesPipelineOptions
```
A union of available [rendering pipeline options](/viewer/rendering-pipeline-api/pipeline-api.md#pipelineoptions)


#### <b>ViewModeEventPayload</b>

```ts
interface ViewModeEventPayload {
  [ViewModeEvent.Changed]: ViewMode
}
```
Defines the supported view modes events payloads