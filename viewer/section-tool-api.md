---
title: SectionTool
deprecationMessages: viewer
---

<Banner />

# SectionTool

Default section tool implementation.
:::warning
This extension requires and active CameraController extension implementation.
:::

### <h3>Accessors</h3>

| [enabled](/viewer/section-tool-api.md#enabled) | [sectionPlanes](/viewer/section-tool-api.md#sectionplanes) | [visible](/viewer/section-tool-api) |
:---------------------------------------- | :---------------------------------------------------------------- | :-------------------------------------------------- |

### <h3>Methods</h3>

| [getBox](/viewer/section-tool-api.md#getbox) | [getObbTransform](/viewer/camera-controller-api.md#getobbtransform) | [on](/viewer/camera-controller-api.md#on) | [removeListener](/viewer/camera-controller-api.md#removelistener) |
| :------------------------------------------- | :---------------------------------------- | :---------------------------------------- | :--------------------------------------------------------------- |
| [setBox](/viewer/section-tool-api.md#setbox) | [toggle](/viewer/section-tool-api.md#toggle) |                                      |                                                                 |


### <h3>Typedefs</h3>

| [SectionToolEvent](/viewer/section-tool-api.md#sectiontoolevent) | [SectionToolEventPayload](/viewer/section-tool-api.md#sectiontooleventpayload)
| :----------------------------------------------------------------------- | :---------------------------------------- | 

### <h3>Accessors</h3>

#### <b>enabled</b>

```ts
get enabled(): boolean
set enabled(value: boolean)
```

Enables/disables the extension.

**Returns**: boolean

#### <b>sectionPlanes</b>

```ts
get sectionPlanes(): Planes[]
```

Gets the section box's up to date section planes

**Returns**: [_Plane[]_](https://threejs.org/docs/?q=plane#api/en/math/Plane)

#### <b>visible</b>

```ts
get visible(): boolean
set visible(value: boolean)
```

Gets and sets the visbility of the actual section box.

**Returns**: boolean

### <h3>Methods</h3>

#### <b>getBox</b>

```ts
getBox(): OBB
```

Gets the current section box bounds.

**Returns**: [_OBB_](https://threejs.org/docs/?q=OBB#examples/en/math/OBB)

#### <b>getObbTransform</b>

```ts
getObbTransform(): Matrix4
```

Gets the current section box transform.

**Returns**: [_Matrix4_](https://threejs.org/docs/?q=matrix4#api/en/math/Matrix4)

#### <b>on</b>

```ts
on(e: CameraEvent, handler: (data: boolean) => void)
```

Function for subscribing to camera events.

**Parameters**

- **e**: [_CameraEvent_](/viewer/camera-controller-api.md#cameraevent)
- **handler**: The handler for the events

**Returns**: void

#### <b>removeListener</b>

```ts
removeListener(e: CameraEvent, handler: (data: unknown) => void)
```

Function for un-subscribing from camera events.

**Parameters**

- **e**: [_CameraEvent_](/viewer/camera-controller-api.md#cameraevent)
- **handler**: The handler for the events to unsubscribe

**Returns**: void

#### <b>setBox</b>

```ts
setBox(targetBox: OBB | Box3 | { min: Vector3Like; max: Vector3Like }, offset = 0): void
```

Sets the section box to the specified bounds
**Parameters**

- **targetBox**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3) | [_OBB_](https://threejs.org/docs/?q=OBB#examples/en/math/OBB) | { min: _Vector3Like_; max: _Vector3Like_ }
- _optional_ **offset**: Linear tolerance

**Returns**: void

#### <b>toggle</b>

```ts
toggle(): void
```

Enables/disables the section tool.

**Returns**: void

### <h3>Typedefs</h3>

#### <b>SectionToolEvent</b>

```ts
enum SectionToolEvent {
  DragStart = "section-box-drag-start",
  DragEnd = "section-box-drag-end",
  Updated = "section-box-changed",
}
```

Events that the extension can emit.

#### <b>SectionToolEventPayload</b>

```ts
interface SectionToolEventPayload {
  [SectionToolEvent.DragStart]: void
  [SectionToolEvent.DragEnd]: void
  [SectionToolEvent.Updated]: Plane[]
}
```

Mapping SectionToolEvent types to handler argument type