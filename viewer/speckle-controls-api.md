---
title: SpeckleControls
deprecationMessages: viewer
---

<Banner />

# SpeckleControls
Abstract base class for all camera controls implementations

### <h3>Accessors</h3>

| [enabled](/viewer/speckle-controls-api.md#enabled)               | [options](/viewer/speckle-controls-api.md#options)       | [targetCamera](/viewer/speckle-controls-api.md#targetCamera)                     | [up](/viewer/speckle-controls-api.md#up)         |
| :---------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------- |
  
### <h3>Methods</h3>

| [dispose](/viewer/speckle-controls-api.md#dispose)               | [fitToSphere](/viewer/speckle-controls-api.md#fittosphere)       | [fromPositionAndTarget](/viewer/speckle-controls-api.md#frompositionandtarget)                     | [getPosition](/viewer/speckle-controls-api.md#getposition)         |
| :---------------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------- |
| [getTarget](/viewer/speckle-controls-api.md#gettarget)   | [isStationary](/viewer/speckle-controls-api.md#isstationary)   | [jumpToGoal](/viewer/speckle-controls-api.md#jumptogoal)                             | [update](/viewer/speckle-controls-api.md#update)       |


### <h3>Accessors</h3>

#### <b>enabled</b>

```ts
abstract get enabled(): boolean
abstract set enabled(value: boolean)
```

Gets/sets the enabled state of the controls

**Returns**: boolean

#### <b>options</b>

```ts
abstract get options(): Partial<Record<string, unknown>>
abstract set options(value: Partial<Record<string, unknown>>)
```

Gets/sets any options the controls implementation might need

**Returns**: Partial<Record<string, unknown>>

#### <b>targetCamera</b>

```ts
abstract set targetCamera(target: PerspectiveCamera | OrthographicCamera)
```

Sets the camera that will be controls by this controls instance. It only accepts [_PerspectiveCamera_](https://threejs.org/docs/index.html?q=pers#api/en/cameras/PerspectiveCamera) or [_OrthographicCamera_](https://threejs.org/docs/index.html?q=orth#api/en/cameras/OrthographicCamera) instances

**Returns**: void

#### <b>up</b>

```ts
public get up() 
public set up(value: Vector3)
```

Sets the up vector this controls instance will use to compute the camera position and rotation. Default value is `(0, 1, 0)`, however speckle data is represented in a coordinate system where up is `(0, 0, 1)`

**Returns**: [_Vector3_](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

</br>
</br>

### <h3>Methods</h3>

#### <b>dispose</b>

```ts
abstract dispose(): void
```

Disposes of the controls implementation

**Returns**: void


#### <b>fitToSphere</b>

```ts
abstract fitToSphere(sphere: Sphere): void
```

All controls implementations need to be able to position and orient themselves according to an input [_Sphere_](https://threejs.org/docs/index.html?q=sphere#api/en/math/Sphere)

:::warning
The `sphere` argument is provided in a coordinate system where up is `(0, 1, 0)`
:::

**Parameters**

- **sphere**: [_Sphere_](https://threejs.org/docs/index.html?q=sphere#api/en/math/Sphere)

**Returns**: void


#### <b>fromPositionAndTarget</b>

```ts
abstract fromPositionAndTarget(position: Vector3, target: Vector3): void
```

Sets the controller's goal position and rotation based on a given location and another location to 'lookAt'. All controls implementation need to be able to position and orient themselves according to these two vectors.

**Parameters**

- **position**: The desired camera position as [_Vector3_](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)
- **target**: A position in space where the camera should 'lookAt' as [_Vector3_](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)
**Returns**: void

#### <b>getPosition</b>

```ts
abstract getPosition(): Vector3
```

Gets the current goal position of the control's target camera

**Returns**: [_Vector3_](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

#### <b>getTarget</b>

```ts
abstract getTarget(): Vector3
```

Gets the current goal look position of the control's target camera


**Returns**: [_Vector3_](https://threejs.org/docs/index.html?q=vec#api/en/math/Vector3)

#### <b>isStationary</b>

```ts
abstract isStationary(): boolean
```

Determines whether the control's camera target is stationary or not.

**Returns**: boolean


#### <b>jumpToGoal</b>

```ts
abstract jumpToGoal(): void
```

Immediately sets the control's target camera position and rotation to their goal values. Effectively skipping over any potential camera animation

**Returns**: void

#### <b>update</b>

```ts
abstract update(delta?: number): boolean
```

The control's update loop

**Parameters**

- **delta**(*optional*): Frame delta time

**Returns**: void

