# SectionTool

Default section tool implementation.
:::warning
Requires ICameraProvider implementation.
:::

### <h3>Accessors</h3>

| [enabled](/viewer/selection-extension-api.md#enabled) | [visible](/viewer/selection-extension-api.md#visible) |
| ----------------------------------------------------- | ----------------------------------------------------- |

### <h3>Methods</h3>

|                                                     |                                           |                                                                   |                                                     |
| --------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| [getBox](/viewer/selection-extension-api.md#getbox) | [on](/viewer/camera-controller-api.md#on) | [removeListener](/viewer/camera-controller-api.md#removelistener) | [setBox](/viewer/selection-extension-api.md#setbox) |
| [toggle](/viewer/selection-extension-api.md#toggle) |                                           |                                                                   |

### <h3>Typedefs</h3>

| [SectionToolEvent](/viewer/selection-extension-api.md#sectiontoolevent) |
| ----------------------------------------------------------------------- |

### <h3>Accessors</h3>

#### <b>enabled</b>

```ts
get enabled(): boolean
set enabled(value: boolean)
```

Enables/disables the extension.

**Returns**: boolean

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
getBox(): Box3
```

Gets the current section box bounds.

**Returns**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)

#### <b>on</b>

```ts
on(e: CameraControllerEvent, handler: (data: boolean) => void)
```

Function for subscribing to camera events.

**Parameters**

- **e**: [_CameraControllerEvent_]()
- **handler**: The handler for the events

**Returns**: void

#### <b>removeListener</b>

```ts
removeListener(e: CameraControllerEvent, handler: (data: unknown) => void)
```

Function for un-subscribing from camera events.

**Parameters**

- **e**: [_CameraControllerEvent_]()
- **handler**: The handler for the events to unsubscribe

**Returns**: void

#### <b>setBox</b>

```ts
setBox(targetBox: Box3, offset = 0): void
```

Sets the section box to the specified bounds
**Parameters**

- **targetBox**: [_Box3_](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3)
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
