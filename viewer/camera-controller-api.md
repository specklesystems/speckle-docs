# CameraController

The default camera controller extension that comes with the viewer package. Includes toggleable perspective and orthographic camera projections.

### <h3>Accessors</h3>

| [aspect](/viewer/camera-controller-api.md#aspect) | [controls](/viewer/camera-controller-api.md#controls) | [enabled](/viewer/camera-controller-api.md#enabled) | [fieldOfView](/viewer/camera-controller-api.md#fieldofview) |
| :------------------------------------------------------------------ | :---------------------------------------------------- | :-------------------------------------------------- | :---------------------------------------------------------- |
| [renderingCamera](/viewer/camera-controller-api.md#renderingcamera) |                                                       |                                                     |                                                             |

### <h3>Methods</h3>

| [disableRotations](/viewer/camera-controller-api.md#disablerotations) | [enableRotations](/viewer/camera-controller-api.md#enablerotations) | [on](/viewer/camera-controller-api.md#on) | [removeListener](/viewer/camera-controller-api.md#removelistener) |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------ | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [setCameraPlanes](/viewer/camera-controller-api.md#setcameraplanes)   | [setCameraView](/viewer/camera-controller-api.md#setcameraview)     | [setOrthoCameraOn](/viewer/camera-controller-api.md#setorthocameraon) | [setPerspectiveCameraOn](/viewer/camera-controller-api.md#setperspectivecameraon) |
| [toggleCameras](/viewer/camera-controller-api.md#togglecameras)       |                                                                     |                                                                       |

### <h3>Typedefs</h3>

| [CameraControllerEvent](/viewer/camera-controller-api.md#cameracontrollerevent) | [CameraProjection](/viewer/camera-controller-api.md#cameraprojection) | [CanonicalView](/viewer/camera-controller-api.md#canonicalview) | [InlineView](/viewer/camera-controller-api.md#inlineview) |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------- | :-------------------------------------------------------------- | :-------------------------------------------------------- |
| [PolarView](/viewer/camera-controller-api.md#polarview)                         |                                                                       |                                                                 |

### <h3>Accessors</h3>

#### <b>aspect</b>

```ts
get aspect(): number
```

Gets the current display aspect ratio

**Returns**: number

#### <b>controls</b>

```ts
get controls()
```

Gets the current underlying camera controller implementation. Typically an external library.
:::warning
Currently it exists for backwards compatibility. Will deprecate in future iterations!
:::
**Returns**: any

#### <b>enabled</b>

```ts
get enabled(): boolean
set enabled(val: boolean)
```

Gets or sets whether this extension is enabled.
:::tip
Extensions typically need to support being turned on/off with no impact on potentially other active extensions.
:::
**Returns**: boolean

#### <b>fieldOfView</b>

```ts
get fieldOfView(): number
set fieldOfView(value: number)
```

Gets or sets the perspective camera's field of view.

**Returns**: number

#### <b>renderingCamera</b>

```ts
get renderingCamera(): PerspectiveCamera | OrthographicCamera
set renderingCamera(value: PerspectiveCamera | OrthographicCamera)
```

Gets or sets the current rendering camera.

**Returns**: number

### <h3>Methods</h3>

#### <b>disableRotations</b>

```ts
disableRotations(): void
```

Disables all camera controls rotation capabilities.

**Returns**: void

#### <b>enableRotations</b>

```ts
enableRotations(): void
```

Enables all camera controls rotation capabilities.

**Returns**: void

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

#### <b>setCameraPlanes</b>

```ts
setCameraPlanes(targetVolume: Box3, offsetScale: number = 1)
```

Function that adapts the camera's near and far clipping planes according to the current scene's volume.
**Parameters**

- **targetVolume**: [_Box3_](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)
- _optional_ **offsetScale**: Works as a linear tolerance to the volume parameter

**Returns**: void

#### <b>setCameraPlanes</b>

```ts
setCameraView(objectIds: string[], transition: boolean, fit?: number): void
```

Focuses the camera based on the volume defined by the received object ids list.

**Parameters**

- **objectIds**: The object ids that make up the volume
- **transition**: Whether or not to make the transition animated
- _optional_ **fit**: Linear tolerance

```ts
setCameraView(
    view: CanonicalView | SpeckleView | InlineView | PolarView,
    transition: boolean,
    fit?: number
  ): void
```

Focuses the camera based on explicit view models provided.

**Parameters**

- **view**: Explicit view of different possible type: [_CanonicalView_](), [_SpeckleView_](), [_InlineView_]()
- **transition**: Whether or not to make the transition animated
- _optional_ **fit**: Linear tolerance

```ts
setCameraView(bounds: Box3, transition: boolean, fit?: number): void
```

Focuses the camera based on explicit volume provided as [_Box3_](https://threejs.org/docs/index.html?q=box#api/en/math/Box3).

**Parameters**

- **bounds**: [_Box3_](https://threejs.org/docs/index.html?q=box#api/en/math/Box3)
- **transition**: Whether or not to make the transition animated
- _optional_ **fit**: Linear tolerance

**Returns**: void

#### <b>setOrthoCameraOn</b>

```ts
setOrthoCameraOn(): void
```

Enables the orthographic camera.

**Returns**: void

#### <b>setPerspectiveCameraOn</b>

```ts
setPerspectiveCameraOn(): void
```

Enables the perspective camera.

**Returns**: void

#### <b>toggleCameras</b>

```ts
toggleCameras(): void
```

Switches between perspective and orthographic cameras.

**Returns**: void

### <h3>Typedefs</h3>

#### <b>CameraControllerEvent</b>

```ts
enum CameraControllerEvent {
  Stationary,
  Dynamic,
  FrameUpdate,
  ProjectionChanged,
}
```

Events the camera controller puts out.

**Returns**: void

#### <b>CameraProjection</b>

```ts
enum CameraProjection {
  PERSPECTIVE,
  ORTHOGRAPHIC,
}
```

Camera projection types.

**Returns**: void

#### <b>CanonicalView</b>

```ts
type CanonicalView =
  | "front"
  | "back"
  | "up"
  | "top"
  | "down"
  | "bottom"
  | "right"
  | "left"
  | "3d"
  | "3D";
```

Supported cannonical views.

**Returns**: void

#### <b>InlineView</b>

```ts
type InlineView = {
  position: Vector3;
  target: Vector3;
};
```

Inline, on-demand camera view.

- **position**: The position of the camera
- **target**: The point in space where the camera looks at
  **Returns**: void

#### <b>PolarView</b>

```ts
type PolarView = {
  azimuth: number;
  polar: number;
  radius?: number;
  origin?: Vector3;
};
```

Camera view defined in polar coordinates.
