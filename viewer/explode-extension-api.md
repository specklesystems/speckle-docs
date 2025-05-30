---
title: ExplodeExtension
deprecationMessages: viewer
---

<Banner />

# ExplodeExtension
A simple extension that allows object movement in a sphercal fashion, similar to an 'explosion' 

### <h3>Methods</h3>
|  	|
|---
| [setExplode](/viewer/explode-extension-api.md#setexplode)  


<br><br>


### <h3>Methods</h3>
#### <b>setExplode</b>
```ts
setExplode(time: number): void
```
Updates the explosion translation of objects. The objects will translate linearly between their current positon and a maximal position determined by the size of the scene
#### Parameters
 - **time**: Value between 0 and 1 which is used to interpolate the object translations from their original positions (0) to a maxmimal position (1)

#### Returns: void
