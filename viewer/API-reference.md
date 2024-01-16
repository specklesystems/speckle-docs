# API

## Viewer Core
::: tip
This is a tip
:::

<style>
table, tr, td, th{
border: none;
background-color: rgba(0, 0, 0, 0.0) !important;
}
</style>

### Viewer

#### Constructors

[constructor](/viewer/API-reference.md#constructor)

#### Accessors
|  	| 	| 
|---	|---
| [Utils](/viewer/API-reference.md#utils) 	| [World](/viewer/API-reference.md#world) 	

#### Methods
|  	| 	| 	| 	|  	|   |   |
|---	|---	|---	|---	|---	|---	|---    |
| [cancelLoad](/viewer/API-reference.md#cancelload) 	| [createExtension](/viewer/API-reference.md#createextension) 	| [dispose](viewer/API-reference.md#dispose) 	| [getContainer](/viewer/API-reference.md#getcontainer) 	
[getExtension](/viewer/API-reference.md#getextension)  | getObjectProperties | getRenderer | getViews 
 getWorldTree 	| init | loadObject 	| on 	
 query | requestRender 	| resize | screenshot 	
 setLightConfiguration 	| unloadAll 	| unloadObject

#### Typedefs


#### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
new Viewer(container: HTMLElement, params: ViewerParams)
```
#### Parameters
 - **container**: [*HTMLElement*](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
 - **params**: [*ViewerParams*](/viewer/API-reference.md#viewer)

#### Returns: [***Viewer***](/viewer/API-reference.md#viewer)
<br>
<br>


#### <h3>Accessors</h3>

#### <b>Utils</b>
```ts
get Utils(): Utils
```
#### Returns: [***Utils***](/viewer/API-reference.md#viewer)

<br>

#### <b>World</b>
```ts
get World(): World
```
#### Returns: [***World***](/viewer/API-reference.md#viewer)

<br>
<br>

#### <h3>Methods</h3>
#### <b>cancelLoad</b>
```ts
cancelLoad(url: string, unload?: boolean): Promise<void>
```
Cancels any ongoing loading operations, with the option of unloading an current progress
#### Parameters
- **url**: *string*
- *(optional)* **unload**: *boolean*

#### Returns: <span style="font-weight:normal">A promise which resolves when the operation completes</span>
<br>

#### <b>createExtension</b>
```ts
createExtension<T extends Extension>(type: new () => T): T
```
Creates and registers the extension of the specified type constructor
#### Parameters
- **type**: [*Extension*]() subclass

#### Returns: <span style="font-weight:normal">The extension instance</span>
<br>

#### <b>dispose</b>
```ts
dispose(): void
```
Disposes the viewer instance
#### Returns: *void*
<br>

#### <b>getContainer</b>
```ts
getContainer(): HTMLElement
```
Gets HTML container used at viewer initialisation
#### Returns: [***HTMLElement***](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
<br>

#### <b>getExtension</b>
```ts
getExtension<T extends Extension>(type: new () => T): T
```
Gets the extension of type T registered with the viewer. 
#### Returns: [*Extension*]() <span style="font-weight:normal">subclass, undefined if it does not exist</span>

