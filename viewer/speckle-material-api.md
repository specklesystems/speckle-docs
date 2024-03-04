# SpeckleMaterial
All speckle-derived materials inherit this class. Internally, all speckle materials are mixins between three materials and this class

It's not meant to be used directly, but rather the already existing implementations which work just like regular three.js materials but offer relative to eye rendering support
- SpeckleStandardMaterial
- SpeckleBasicMaterial
- SpeckleLineMaterial
- SpecklePointMaterial
- SpeckleTextMaterial
### <h3>Accessors</h3>
|  	|   |   |   |
|---    |---    |---    |---
| [baseUniforms](/viewer/speckle-material-api.md#baseuniforms) | [fragmentProgram](/viewer/speckle-material-api.md#fragmentprogram) | [pointSize](/viewer/speckle-material-api.md#pointsize) | [stencilOutline](/viewer/speckle-material-api.md#stenciloutline) 
| [uniformsDef](/viewer/speckle-material-api.md#uniformsdef) | [vertexProgram](/viewer/speckle-material-api.md#vertexprogram)




### <h3>Methods</h3>
|  	| 	|
|---	|---
| [fastCopy](/viewer/speckle-material-api.md#fastcopy) 

### <h3>Typedefs</h3>
|  	|   |   |   |
|---	|---    |---	|---
| [DisplayStyle](/viewer/speckle-material-api.md#displaystyle) | [FilterMaterial](/viewer/speckle-material-api.md#filtermaterial)  | [FilterMaterialType](/viewer/speckle-material-api.md#filtermaterialtype) | [MaterialOptions](/viewer/speckle-material-api.md#materialoptions) 
| [RenderMaterial](/viewer/speckle-material-api.md#rendermaterial)


<br><br>


### <h3>Accessors</h3>

#### <b>baseUniforms</b>
```ts
protected get baseUniforms(): { [uniform: string]: IUniform }
```
Gets the base three.js uniforms for this material. So for example *SpeckleStandardMaterial* has the base uniforms as `ShaderLib.standard.uniforms`

#### Returns: An object containing the uniforms

<br>

#### <b>fragmentProgram</b>
```ts
protected get fragmentProgram(): string
```
Gets the fragment program source code.
#### Returns: string

<br>

#### <b>pointSize</b>
```ts
protected set pointSize(value: number)
```
Sets the point size for point materials
#### Returns: number

<br>

#### <b>stencilOutline</b>
```ts
protected set stencilOutline(value: boolean)
```
Can enable the material to have stencil outlines
#### Returns: void

<br>

#### <b>uniformsDef</b>
```ts
protected get uniformsDef(): Uniforms
```
Define the custom uniforms for the material
#### Returns: *Uniforms* which is an alias for Record<string, any>

<br>

#### <b>vertexProgram</b>
```ts
protected get vertexProgram(): string
```
Gets the vertex program source code
#### Returns: string

<br>
<br>

### <h3>Methods</h3>
#### <b>fastCopy</b>
```ts
fastCopy(from: Material, to: Material)
```
Copies properties from one *from* Material to *to* Material. The data copied over is restricted to no more and no less than what the viewer needs, so unlike three.js default material copying this aims to be as fast as possible

#### Parameters
- **from**: [*Material*](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)
- **to**: [*Material*](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)

#### Returns: void


<br>
<br>

### <h3>Typedefs</h3>

#### <b>DisplayStyle</b>

```ts
interface DisplayStyle {
  id: string
  color: number
  lineWeight: number
  opacity?: number
}
```
Speckle model for material properties on lines
- **id**: The id of the style object
- **color**: The color of the line
- **lineWeigth**: The thickness of the line in world units
- *optional* **opacity**: The opacity of the line
<br>

#### <b>FilterMaterial</b>
```ts
interface FilterMaterial {
  filterType: FilterMaterialType
  rampIndex?: number
  rampIndexColor?: Color
  rampTexture?: Texture
}
```
Filter materials are pre-defined materials that you can directly apply with as little configuration as possible.
- **filterType**: [*FilterMaterialType*]()
- *optional* **rampIndex**: The index of the color in the ramp texture. Applies only for FilterMaterialType.COLORED and FilterMaterialType.GRADIENT
- *optional* **rampIndexColor**: The actual color from the ramp texture. Applies only for FilterMaterialType.COLORED and FilterMaterialType.GRADIENT
- *optional* **rampTexture**: The ramp texture. Applies only for FilterMaterialType.COLORED and FilterMaterialType.GRADIENT

<br>

#### <b>FilterMaterialType</b>
```ts
enum FilterMaterialType {
  GHOST,
  GRADIENT,
  COLORED,
  HIDDEN
}
```
The list of available filter materials

<br>

#### <b>MaterialOptions</b>
```ts
interface MaterialOptions {
  stencilOutlines?: boolean
  pointSize?: number
  depthWrite?: number
}
```
Custom options for materials
- *optional* **stencilOutlines**: Displays outlines for material. Only applies to meshes
- *optional* **pointSize**: The point size for point materials. Only applies to points
- *optional* **depthWrite**: Whether the material should write to depth

<br>

#### <b>RenderMaterial</b>
```ts
interface RenderMaterial {
  id: string
  color: number
  opacity: number
  roughness: number
  metalness: number
  vertexColors: boolean
}
```
Speckle model for material properties of meshes.
- **id**: The id if the render material
- **color**: Color as a int32
- **opacity**: Opacity
- **roughness**: Roughness
- **metalness**: Metalness
- **vertexColors**: Whether the material reads vertex colors
