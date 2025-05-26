---
title: SpeckleMaterial
deprecationMessages: viewer
---

<Banner />

# SpeckleMaterial

All speckle-derived materials inherit this class. Internally, all speckle materials are mixins between three materials and this class.

It's not meant to be used directly, but rather the already existing implementations which work just like regular three.js materials but offer relative to eye rendering support.

- SpeckleStandardMaterial
- SpeckleBasicMaterial
- SpeckleLineMaterial
- SpecklePointMaterial
- SpeckleTextMaterial

### <h3>Accessors</h3>

| [baseUniforms](/viewer/speckle-material-api.md#baseuniforms) | [fragmentProgram](/viewer/speckle-material-api.md#fragmentprogram) | [pointSize](/viewer/speckle-material-api.md#pointsize) | [stencilOutline](/viewer/speckle-material-api.md#stenciloutline) |
| ------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------- |
| [uniformsDef](/viewer/speckle-material-api.md#uniformsdef)   | [vertexProgram](/viewer/speckle-material-api.md#vertexprogram)     |

### <h3>Methods</h3>

| [fastCopy](/viewer/speckle-material-api.md#fastcopy) |
| ---------------------------------------------------- |

### <h3>Typedefs</h3>

| [DisplayStyle](/viewer/speckle-material-api.md#displaystyle)     | [FilterMaterial](/viewer/speckle-material-api.md#filtermaterial)         | [FilterMaterialType](/viewer/speckle-material-api.md#filtermaterialtype) | [MaterialOptions](/viewer/speckle-material-api.md#materialoptions) |
| :--------------------------------------------------------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------- |
| [RenderMaterial](/viewer/speckle-material-api.md#rendermaterial) | [StencilOutlineType](/viewer/speckle-material-api.md#stenciloutlinetype) |

### <h3>Accessors</h3>

#### <b>baseUniforms</b>

```ts
protected get baseUniforms(): { [uniform: string]: IUniform }
```

Gets the base three.js uniforms for this material. So for example _SpeckleStandardMaterial_ has the base uniforms as `ShaderLib.standard.uniforms`.

**Returns**: An object containing the uniforms

#### <b>fragmentProgram</b>

```ts
protected get fragmentProgram(): string
```

Gets the fragment program source code.

**Returns**: string

#### <b>pointSize</b>

```ts
protected set pointSize(value: number)
```

Sets the point size for point materials.

**Returns**: number

#### <b>stencilOutline</b>

```ts
protected set stencilOutline(value: boolean)
```

Can enable the material to have stencil outlines.

**Returns**: void

#### <b>uniformsDef</b>

```ts
protected get uniformsDef(): Uniforms
```

Define the custom uniforms for the material.

**Returns**: _Uniforms_ which is an alias for Record<string, any>

#### <b>vertexProgram</b>

```ts
protected get vertexProgram(): string
```

Gets the vertex program source code.

**Returns**: string

### <h3>Methods</h3>

#### <b>fastCopy</b>

```ts
fastCopy(from: Material, to: Material)
```

Copies properties from one _from_ Material to _to_ Material. The data copied over is restricted to no more and no less than what the viewer needs, so unlike three.js default material copying this aims to be as fast as possible.

**Parameters**

- **from**: [_Material_](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)
- **to**: [_Material_](https://threejs.org/docs/index.html?q=materi#api/en/materials/Material)

**Returns**: void

### <h3>Typedefs</h3>

#### <b>DisplayStyle</b>

```ts
interface DisplayStyle {
  id: string;
  color: number;
  lineWeight: number;
  opacity?: number;
}
```

Speckle model for material properties on lines.

- **id**: The id of the style object
- **color**: The color of the line
- **lineWeigth**: The thickness of the line in world units
- _optional_ **opacity**: The opacity of the line
  <br>

#### <b>FilterMaterial</b>

```ts
interface FilterMaterial {
  filterType: FilterMaterialType;
  rampIndex?: number;
  rampIndexColor?: Color;
  rampTexture?: Texture;
}
```

Filter materials are pre-defined materials that you can directly apply with as little configuration as possible.

- **filterType**: [_FilterMaterialType_](/viewer/speckle-material-api.md#filtermaterialtype)
- _optional_ **rampIndex**: The index of the color in the ramp texture. Applies only for FilterMaterialType.COLORED and FilterMaterialType.GRADIENT
- _optional_ **rampIndexColor**: The actual color from the ramp texture. Applies only for FilterMaterialType.COLORED and FilterMaterialType.GRADIENT
- _optional_ **rampTexture**: The ramp texture. Applies only for FilterMaterialType.COLORED and FilterMaterialType.GRADIENT

#### <b>FilterMaterialType</b>

```ts
enum FilterMaterialType {
  GHOST,
  GRADIENT,
  COLORED,
  HIDDEN,
}
```

The list of available filter materials.

#### <b>MaterialOptions</b>

```ts
interface MaterialOptions {
  stencilOutlines?: StencilOutlineType;
  pointSize?: number;
  depthWrite?: number;
}
```

Custom options for materials.

- _optional_ **stencilOutlines**: [_StencilOutlineType_](/viewer/speckle-material-api.md#stenciloutlinetype). Only applies to meshes
- _optional_ **pointSize**: The point size for point materials. Only applies to points
- _optional_ **depthWrite**: Whether the material should write to depth

#### <b>RenderMaterial</b>

```ts
interface RenderMaterial {
  id: string;
  color: number;
  opacity: number;
  roughness: number;
  metalness: number;
  vertexColors: boolean;
}
```

Speckle model for material properties of meshes.

- **id**: The id if the render material
- **color**: Color as a int32
- **opacity**: Opacity
- **roughness**: Roughness
- **metalness**: Metalness
- **vertexColors**: Whether the material reads vertex colors

#### <b>StencilOutlineType</b>

```ts
enum StencilOutlineType {
  NONE,
  OVERLAY,
  OUTLINE_ONLY,
}
```

- **NONE**: No outlines
- **OVERLAY**: Outline on top of object
- **OUTLINE_ONLY**: Outline only, rest of the object is not visible
