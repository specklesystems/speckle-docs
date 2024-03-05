# SelectionExtension

Defalt selection helper extension. Handles object selection automatically, both visually and data wise. Optionally can highlight on hover.
The extension automatically binds to
- `ViewerEvent.ObjectClicked` for selection detection. 
- `ViewerEvent.ObjectDoubleClicked` for focusing on objects
- `InputEvent.PointerMove` for hover detection

:::warning
Requires an existing `ICameraProvider` implementation
:::
### <h3>Accessors</h3>
|  	|   |
|---    |--- 
| [enabled](/viewer/selection-extension-api.md#enabled) |[options](/viewer/selection-extension-api.md#options) 


### <h3>Methods</h3>
|  	| 	|   |   |
|---	|---    |---	|---
| [getSelectedObjects](/viewer/selection-extension-api.md#getselectedobjects) | [getSelectedNodes](viewer/selection-extension-api.md#getselectednodes) | [selectObjects](/viewer/selection-extension-api.md#selectobjects) | [unselectObjects](/viewer/selection-extension-api.md#unselectobjects)

### <h3>Typedefs</h3>
|  	| 
|---
| [SelectionExtensionOptions](/viewer/selection-extension-api.md#selectionextensionoptions) 


### <h3>Constants</h3>
|  	| 	
|---	
[DefaultSelectionExtensionOptions](/viewer/speckle-renderer-api.md#defaultselectionextensionoptions)
<br><br>


### <h3>Accessors</h3>

#### <b>enabled</b>
```ts
get enabled(): boolean
set enabled(value: boolean)
```
Enables/disables the extension

#### Returns: boolean

<br>

#### <b>options</b>
```ts
get options(): SelectionExtensionOptions
set options(value: SelectionExtensionOptions)
```
Gets and sets the extension options
#### Returns: [*SelectionExtensionOptions*](/viewer/selection-extension-api.md#selectionextensionoptions)

<br>
<br>

### <h3>Methods</h3>
#### <b>getSelectedObjects</b>
```ts
getSelectedObjects(): Array<Record<string, unknown>>
```
Gets the currently selected raw objects

#### Returns: Array< Record< string, unknown > >


<br>

#### <b>getSelectedNodes</b>
```ts
getSelectedNodes(): Array<TreeNode>
```
Gets the currently selected nodes

#### Returns: Array< TreeNode >

<br>

#### <b>selectObjects</b>
```ts
selectObjects(ids: Array<string>, multiSelect = false): void
```
Programatically selects objects by ids
#### Parameters
- **ids**: Array< string >
- *optional* **multiSelect**: Signals if this select needs to clear previous one or not

#### Returns: void

<br>

#### <b>unselectObjects</b>
```ts
unselectObjects(ids?: Array<string>): void
```
Programatically un-selects objects by ids
#### Parameters
- *optional* **ids**: Array< string >. If not specified everything gets unselected 

#### Returns: void

<br>
<br>

### <h3>Typedefs</h3>

#### <b>SelectionExtensionOptions</b>

```ts
interface SelectionExtensionOptions {
  selectionMaterialData: RenderMaterial & DisplayStyle & MaterialOptions
  hoverMaterialData?: RenderMaterial & DisplayStyle & MaterialOptions
}
```
Options for configuring how the visual selection looks. If `hoverMaterialData` is not specified, there will be no hover effect.
:::tip
The selection/hover material data is provided as a an intersection between a [*RenderMaterial*](/viewer/speckle-material-api.md#rendermaterial), a [*DisplayStyle*](/viewer/speckle-material-api.md#displaystyle) and a [*MaterialOptions*](/viewer/speckle-material-api.md#materialoptions) in order to accomodate all renderable types: triangles, lines and points
::: 
- **selectionMaterialData**: The material data for selection effect
- **hoverMaterialData**: The material data for hover effect. If not specified, hover will not be enabled

### <h3>Constants</h3>

#### <b>DefaultSelectionExtensionOptions</b>
```ts
const DefaultSelectionExtensionOptions: SelectionExtensionOptions = {
  selectionMaterialData: {
    id: MathUtils.generateUUID(),
    color: 0x047efb,
    opacity: 1,
    roughness: 1,
    metalness: 0,
    vertexColors: false,
    lineWeight: 1,
    stencilOutlines: true,
    pointSize: 4
  }
}
```