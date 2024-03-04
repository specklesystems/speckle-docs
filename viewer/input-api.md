# Input
Basic, viewer-core defined input event manager. Accessible from [*SpeckleRenderer*](/viewer/speckle-renderer-api.md)


### <h3>Methods</h3>
|  	| 
|---
| [on](/viewer/input-api.md#on)


### <h3>Typedefs</h3>
|  	| 
|---	
| [InputEvent](/viewer/input-api.md#inputevent) 


<br>
<br>

### <h3>Methods</h3>
#### <b>getSpeckleType</b>
```ts
on(eventType: InputEvent, handler: (arg) => void): void
```
And the handler to the event type call list
#### Parameters
- **eventType**: [*InputEvent*](/viewer/world-tree-api.md#inputevent)
- **handler**: The handler that gets called
#### Returns: void

<br>
<br>

### <h3>Typedefs</h3>
#### <b>SpeckleType</b>
```ts
enum InputEvent {
  PointerDown,
  PointerUp,
  PointerMove,
  Click,
  DoubleClick,
  KeyUp
}

```
Input event types