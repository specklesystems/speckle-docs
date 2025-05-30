---
title: Extension 
deprecationMessages: viewer
---

<Banner />

# Extension
Base class for all extensions. Extensions are created via [_createExtension_](/viewer/viewer-api.md#createextension) method from the viewer instance.

### <h3>Fields</h3>

| [viewer](/viewer/extension-api.md#viewer) |
| ------------------------------------------------ |

### <h3>Accessors</h3>

| [enabled](/viewer/extension-api.md#enabled) | [inject](/viewer/extension-api.md#inject) |
| ------------------------------------ | ------------------------------------ |

### <h3>Methods</h3>

| [onEarlyUpdate](/viewer/extension-api.md#onearlyupdate)  | [onLateUpdate](/viewer/extension-api.md#onlateupdate) | [onRender](/viewer/extension-api.md#onrender) | [onResize](/viewer/extension-api.md#onresize) |
| :------------------------------------------------------------------- | :--------------------------------------------------------------- | :------------------------------------------------- | :------------------------------------------------- |

### <h3>Fields</h3>

#### <b>viewer</b>

```ts
protected viewer: IViewer
```
All extensions hold a reference to the viewer implementation instance that spawned them
<br>
<br>

### <h3>Accessors</h3>

#### <b>enabled</b>

```ts
get enabled(): boolean
set enabled(value: boolean)
```
All extensions should implement enabling/disabling themselves
<br>
<br>


#### <b>inject</b>

```ts
get inject(): Array<Constructor<Extension>>
```
Gets the list of extensions that need to get injected on creation time. This is how an extension declares that it needs other extensions injected. Injection is automatically done when calling [_createExtension_](/viewer/viewer-api.md#createextension)

<br>
<br>

### <h3>Methods</h3>

#### <b>onEarlyUpdate</b>

```ts
onEarlyUpdate(deltaTime?: number)
```
Update function called before the viewer's update
<br>
<br>

#### <b>onLateUpdate</b>

```ts
onLateUpdate(deltaTime?: number)
```
Update function called after the viewer's update
<br>
<br>

#### <b>onRender</b>

```ts
onRender()
```
Render function called after the viewer's render
<br>
<br>

#### <b>onResize</b>

```ts
onResize()
```
Called whenever a resize happens