---
title: SmoothOrbitControls
deprecationMessages: viewer
---

<Banner />

# SmoothOrbitControls
[_SpeckleControls_](/viewer/speckle-controls-api) -> [_SmoothOrbitControls_](/viewer/smooth-orbit-controls-api)

Orbit camera controls based on Google's model-viewer implementation. Input are the angles and radius of a spherical coordinate system with a configurable origin.

### <h3>Methods</h3>

| [adjustOrbit](/viewer/smooth-orbit-controls-api.md#adjustorbit)               | [setDamperDecayTime](/viewer/smooth-orbit-controls-api.md#setdamperdecaytime)       | [setFieldOfView](/viewer/smooth-orbit-controls-api.md#setfieldofview)                     | [setOrbit](/viewer/smooth-orbit-controls-api.md#setorbit)         |
| :---------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------- |
| [setRadius](/viewer/smooth-orbit-controls-api.md#setradius)   | [setTarget](/viewer/smooth-orbit-controls-api.md#settarget)  

### <h3>Typedefs</h3>

| [SmoothOrbitControlsOptions](/viewer/smooth-orbit-controls-api.md#smoothorbitcontrolsoptions)  |
:---------------------------------------------------- | 

</br>

### <h3>Methods</h3>

#### <b>adjustOrbit</b>

```ts
adjustOrbit(deltaTheta: number, deltaPhi: number, deltaZoom: number): void
```

Used to adjust the current controler's target camera spherical coordinates by providing deltas.
**Parameters**

- **deltaTheta**: The adjustment for the theta angle
- **deltaPhi**: The adjustment for the phi angle
- **deltaZoom**: The adjustment to the radius

**Returns**: void


#### <b>setDamperDecayTime</b>

```ts
setDamperDecayTime(decayMilliseconds: number)
```

Sets the dampening values for the control. A larger smoothens out the camera's movement

**Parameters**

- **decayMilliseconds**: Decay value

**Returns**: void



#### <b>setFieldOfView</b>

```ts
setFieldOfView(fov: number)
```

Sets the field of view when camera is [_PerspectiveCamera_](https://threejs.org/docs/index.html?q=persp#api/en/cameras/PerspectiveCamera)

**Parameters**

- **fov**: Field of view value

**Returns**: void

#### <b>setOrbit</b>

```ts
setOrbit(
    goalTheta?: number,
    goalPhi?: number,
    goalRadius?: number
): boolean
```

Set the absolute orbital goal of the camera. The change will be applied over a number of frames depending on configured dampening value. Returns true if invoking the method will result in the camera changing position and/or rotation, otherwise false.

**Parameters**

- **goalTheta**: Goal theta angle
- **goalPhi**: Goal phi angle
- **goalRadius**: Goal radius value

**Returns**: boolean

#### <b>setRadius</b>

```ts
setRadius(radius: number): void
```
Sets the radius value

**Returns**: void


#### <b>setTarget</b>

```ts
setTarget(x: number, y: number, z: number): void
```
Sets the origin of the spherical coordinate system

**Returns**: void

### <h3>Typedefs</h3>

#### <b>SmoothOrbitControlsOptions</b>

```ts
export interface SmoothOrbitControlsOptions {
  enableOrbit?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  orbitSensitivity?: number
  zoomSensitivity?: number
  panSensitivity?: number
  inputSensitivity?: number
  minimumRadius?: number
  maximumRadius?: number
  minimumPolarAngle?: number
  maximumPolarAngle?: number
  minimumAzimuthalAngle?: number
  maximumAzimuthalAngle?: number
  infiniteZoom?: boolean
  zoomToCursor?: boolean
  damperDecay?: number
  orbitAroundCursor?: boolean
  showOrbitPoint?: boolean
}
```
The available options:
- _optional_ **enableOrbit**: Enables orbiting
- _optional_ **enableZoom**: Enables zooming
- _optional_ **enablePan**: Enables panning
- _optional_ **orbitSensitivity**: Sensitivity of rotating
- _optional_ **zoomSensitivity**: Sensitivity of zooming
- _optional_ **panSensitivity**: Sensitivity of panning
- _optional_ **inputSensitivity**: General Sensitivity
- _optional_ **minimumRadius**: The closest the camera can be to the target
- _optional_ **maximumRadius**: The farthest the camera can be from the target
- _optional_ **minimumPolarAngle**: The minimum angle between model-up and the camera polar position
- _optional_ **maximumPolarAngle**: The maximum angle between model-up and the camera polar position
- _optional_ **minimumAzimuthalAngle**: The minimum angle between model-forward and the camera azimuthal position
- _optional_ **infiniteZoom**: Enables infinite zoom
- _optional_ **zoomToCursor**: Enables scrolling to cursor
- _optional_ **damperDecay**: The dampening value for the controller
- _optional_ **orbitAroundCursor**: Enables rotating around cursor
- _optional_ **showOrbitPoint**: Enables the display of the orbit's anchor point





