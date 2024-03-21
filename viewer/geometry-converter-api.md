# GeometryConverter

Abstract class
### <h3>Constructors</h3>
|  	| 
|---   
| [constructor](/viewer/geometry-converter-api.md#constructor)


### <h3>Methods</h3>
|  	| 	| 	|
|---	|---	|---
| [getSpeckleType](/viewer/geometry-converter-api.md#getspeckletype) 	| [convertNodeToGeometryData](/viewer/geometry-converter-api.md#convertnodetogeometrydata) 	| [disposeNodeGeometryData](/viewer/geometry-converter-api.md#disposenodegeometrydata)


### <h3>Typedefs</h3>
|  	| 
|---	
| [SpeckleType](/viewer/geometry-converter-api.md#speckletype) 
<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor()
```
Default constructor


<br>
<br>

### <h3>Methods</h3>
#### <b>getSpeckleType</b>
```ts
abstract getSpeckleType(node: NodeData): SpeckleType
```
Gets an opinionated [*SpeckleType*](/viewer/geometry-converter-api.md#speckletype) based on the node's data
#### Parameters
- **node**: [*NodeData*](/viewer/world-tree-api.md#nodedata)
#### Returns: [*SpeckleType*](/viewer/geometry-converter-api.md#speckletype)

<br>

#### <b>convertNodeToGeometryData</b>
```ts
abstract convertNodeToGeometryData(node: NodeData): GeometryData
```
Takes in [*NodeData*](/viewer/world-tree-api.md#nodedata) and outputs viewer defined geometry data
#### Parameters
- **node**: [*NodeData*](/viewer/world-tree-api.md#nodedata)
#### Returns: [*GeometryData*](/viewer/render-view-api.md#geometrydata)

<br>

#### <b>disposeNodeGeometryData</b>
```ts
abstract disposeNodeGeometryData(node: NodeData): void
```
#### Parameters
- **node**: [*NodeData*](/viewer/world-tree-api.md#nodedata)
Disposes the explicit node data geometry
#### Returns: void

<br>
<br>

### <h3>Typedefs</h3>
#### <b>SpeckleType</b>
```ts
enum SpeckleType {
  View3D = 'View3D',
  BlockInstance = 'BlockInstance',
  Pointcloud = 'Pointcloud',
  Brep = 'Brep',
  Mesh = 'Mesh',
  Point = 'Point',
  Line = 'Line',
  Polyline = 'Polyline',
  Box = 'Box',
  Polycurve = 'Polycurve',
  Curve = 'Curve',
  Circle = 'Circle',
  Arc = 'Arc',
  Ellipse = 'Ellipse',
  RevitInstance = 'RevitInstance',
  Text = 'Text',
  Transform = 'Transform',
  Unknown = 'Unknown'
}
```
Non-exhaustive enum for viewer recognized object types