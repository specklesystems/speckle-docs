# SmoothOrbitControls
[_SpeckleControls_](/viewer/speckle-controls-api.md) -> [_SmoothOrbitControls_](/viewer/smooth-oribt-controls-api.md)

Orbit camera controls based on Google's model-viewer implementation. Input are the angles and radius of a spherical coordinate system with a configurable origin.

### <h3>Methods</h3>

| [adjustOrbit](/viewer/smooth-oribt-controls-api.md#adjustorbit)               | [setDamperDecayTime](/viewer/smooth-oribt-controls-api.md#setdamperdecaytime)       | [setFieldOfView](/viewer/smooth-oribt-controls-api.md#setfieldofview)                     | [setOrbit](/viewer/smooth-oribt-controls-api.md#setorbit)         |
| :---------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------- |
| [setRadius](/viewer/smooth-oribt-controls-api.md#setradius)   | [setTarget](/viewer/smooth-oribt-controls-api.md#settarget)  

### <h3>Typedefs</h3>

| [SmoothOrbitControlsOptions](/viewer/smooth-oribt-controls-api.md#smoothorbitcontrolsoptions)  |
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




