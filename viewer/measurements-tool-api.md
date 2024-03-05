# MesurementsTool
This extension provides basic configurable measurement capabilities. The tool is autonomous, and is able to create measurements on it's own
:::warning
This extension requires and active ICameraProvider extension implementation
:::

### <h3>Accessors</h3>
|  	|   |  
|---    |---     
| [enabled](/viewer/measurements-tool-api.md#enabled) | [options](/viewer/measurements-tool-api.md#options) 



### <h3>Methods</h3>
|  	| 	| 	
|---	|---	
| [removeMeasurement](/viewer/measurements-tool-api.md#removemeasurement) | [clearMeasurements](/viewer/measurements-tool-api.md#clearmeasurements) 


### <h3>Typedefs</h3>
|  	| 	| 	
|---	|---	
| [MeasurementOptions](/viewer/measurements-tool-api.md#measurementoptions) | [MeasurementType](/viewer/measurements-tool-api.md#measurementtype) 


### <h3>Constants</h3>
|  	| 	
|---	
[DefaultMeasurementsOptions](/viewer/speckle-renderer-api.md#defaultmeasurementsoptions)

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
get options(): MeasurementOptions
set options(value: MeasurementOptions)
```
Gets and sets the extension options
#### Returns: [*MeasurementOptions*](/viewer/speckle-renderer-api.md#defaultmeasurementsoptions)

<br>
<br>

### <h3>Methods</h3>
#### <b>removeMeasurement</b>
```ts
removeMeasurement(): void
```
Removes any currently ongoing measurements  
#### Returns: void

<br>

#### <b>clearMeasurements</b>
```ts
clearMeasurements(): void
```
Removes all measurements, including finished or ongoing now 
#### Returns: void


<br>
<br>

### <h3>Typdefs</h3>
#### <b>MeasurementOptions</b>
```ts
interface MeasurementOptions {
  visible: boolean
  type?: MeasurementType
  vertexSnap?: boolean
  units?: string
  precision?: number
}
```
The options for newly created measurements
- **visible**: If the measurements are visible
- *optional* **type**: Current measurement type to create 
- *optional* **vertexSnap**: Should the cursor snap to the nearest vertex
- *optional* **units**: The measurement units
- *optional* **precision**: The number of decimals to be displayed
#### Returns: void

<br>

#### <b>MeasurementType</b>
```ts
enum MeasurementType {
  PERPENDICULAR,
  POINTTOPOINT
}
```
Measurement types
#### Returns: void

<br>
<br>

### <h3>Constants</h3>
#### <b>DefaultMeasurementsOptions</b>
```ts
const DefaultMeasurementsOptions = {
  visible: true,
  type: MeasurementType.POINTTOPOINT,
  vertexSnap: true,
  units: 'm',
  precision: 2
}
```
The default extension options