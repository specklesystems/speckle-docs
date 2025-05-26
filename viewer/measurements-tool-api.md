---
title: MeasurementsTool
deprecationMessages: viewer
---

<Banner />

# MeasurementsTool

This extension provides basic configurable measurement capabilities. The tool is autonomous, and is able to create measurements on it's own.
:::warning
This extension requires and active CameraController extension implementation.
:::

### <h3>Accessors</h3>

| [activeMeasurement](/viewer/measurements-tool-api.md#activemeasurement) | [enabled](/viewer/measurements-tool-api.md#enabled) | [options](/viewer/measurements-tool-api.md#options) | [selectedMeasurement](/viewer/measurements-tool-api.md#selectedmeasurement) |
| ----------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------- |

### <h3>Methods</h3>

| [removeMeasurement](/viewer/measurements-tool-api.md#removemeasurement) | [clearMeasurements](/viewer/measurements-tool-api.md#clearmeasurements) |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |

### <h3>Typedefs</h3>

| [Measurement](/viewer/measurements-tool-api.md#measurement) | [MeasurementOptions](/viewer/measurements-tool-api.md#measurementoptions) | [MeasurementType](/viewer/measurements-tool-api.md#measurementtype) |
| ----------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |

### <h3>Constants</h3>

| [DefaultMeasurementsOptions](/viewer/speckle-renderer-api.md#defaultmeasurementsoptions) |
| ---------------------------------------------------------------------------------------- |

### <h3>Accessors</h3>

#### <b>activeMeasurement</b>

```ts
get activeMeasurement(): Measurement
```

Gets the currently ongoing measurement. Null if there is none.

**Returns**: Measurement

#### <b>enabled</b>

```ts
get enabled(): boolean
set enabled(value: boolean)
```

Enables/disables the extension.

**Returns**: boolean

#### <b>options</b>

```ts
get options(): MeasurementOptions
set options(value: MeasurementOptions)
```

Gets and sets the extension options.

**Returns**: [_MeasurementOptions_](/viewer/speckle-renderer-api.md#defaultmeasurementsoptions)

#### <b>selectedMeasurement</b>

```ts
get selectedMeasurement(): Measurement
```

Gets the currently selected measurement. Null if there is none.

**Returns**: [_Measurement_](/viewer/speckle-renderer-api.md#measurement)

### <h3>Methods</h3>

#### <b>removeMeasurement</b>

```ts
removeMeasurement(): void
```

Removes any currently ongoing measurements.

**Returns**: void

#### <b>clearMeasurements</b>

```ts
clearMeasurements(): void
```

Removes all measurements, including finished or ongoing now.

**Returns**: void

### <h3>Typedefs</h3>

#### <b>Measurement</b>

```ts
abstract class Measurement extends Object3D
```

Abstract class for all measurement types.

#### <b>MeasurementOptions</b>

```ts
interface MeasurementOptions {
  visible: boolean;
  type?: MeasurementType;
  vertexSnap?: boolean;
  units?: string;
  precision?: number;
}
```

The options for newly created measurements.

- **visible**: If the measurements are visible
- _optional_ **type**: Current measurement type to create
- _optional_ **vertexSnap**: Should the cursor snap to the nearest vertex
- _optional_ **units**: The measurement units
- _optional_ **precision**: The number of decimals to be displayed

**Returns**: void

#### <b>MeasurementType</b>

```ts
enum MeasurementType {
  PERPENDICULAR,
  POINTTOPOINT,
}
```

Measurement types.

**Returns**: void

### <h3>Constants</h3>

#### <b>DefaultMeasurementsOptions</b>

```ts
const DefaultMeasurementsOptions = {
  visible: true,
  type: MeasurementType.POINTTOPOINT,
  vertexSnap: true,
  units: "m",
  precision: 2,
};
```

The default extension options.
