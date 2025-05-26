---
title: Queries
deprecationMessages: viewer
---

<Banner />

# Queries
Queries are a simple mechanism that allows the user to perform several operations in a contained way. The supported operations are 
- Project a point
- Unproject a point
- Intersection test
- Occlusion test

Queries are not meant to be used directly, but rather through the viewer's [_query_](/viewer/viewer-api.md#query) function


### <h3>Typedefs</h3>

| [IntersectionQuery](/viewer/queries-api.md#intersectionquery) | [IntersectionQueryResult](/viewer/queries-api.md#intersectionqueryresult)  | [PointQuery](/viewer/queries-api.md#pointquery) | [PointQueryResult](/viewer/queries-api.md#pointqueryresult)  |
| :------------------------------------------------------------- | :------------------------------------------------------------------- | :------------------------------------------------- | :----------------------------------------------------- |
| [Query](/viewer/queries-api.md#query) | [QueryArgsResultMap](/viewer/queries-api.md#queryargsresultmap)   | [QueryOperation](/viewer/queries-api.md#queryoperation) | [QueryResult](/viewer/queries-api.md#queryresult)             

<br>
<br>

#### <b>IntersectionQuery</b>

```ts
interface IntersectionQuery extends Query {
  point: { x: number; y: number; z?: number; w?: number }
  tolerance?: number
  operation: 'Occlusion' | 'Pick'
}
```
- **point**: The point to test for intersections
- _optional_ **tolerance**: Tolerance for intersection
- **operation**: The query operation type

Based on the operation modes:
- `Occlusion`: Test if a point in the scene is being occluded by the scene's geometry
- `Pick`: Cast a camer ray to the specified point and return all intersection results
<br>
<br>

#### <b>IntersectionQueryResult</b>

```ts
interface IntersectionQueryResult {
  objects: Array<{
    guid: string
    object?: Record<string, unknown>
    point: { x: number; y: number; z: number }
  }> | null
}
```
- **guid**: The id of the object
- _optional_ **object**: The raw data of the intersected object
- **point**: The point of intersection
<br>
<br>

#### <b>PointQuery</b>

```ts
interface PointQuery extends Query {
  point: { x: number; y: number; z?: number; w?: number }
  operation: 'Project' | 'Unproject'
}
```
- **point**: The point to run the operation on
- **operation**: The operation type

Based on the operation modes:
- `Project`: Projects a world point onto the screen. Result is in NDC
- `Unproject`: Unprojects an NDC point into a world point
<br>
<br>

#### <b>PointQuery</b>

```ts
interface PointQuery extends Query {
  point: { x: number; y: number; z?: number; w?: number }
  operation: 'Project' | 'Unproject'
}
```
- **point**: The point to run the operation on
- **operation**: The operation type

Based on the operation modes:
- `Project`: Projects a world point onto the screen. Result is in NDC
- `Unproject`: Unprojects an NDC point into a world point
<br>
<br>

#### <b>PointQueryResult</b>

```ts
interface PointQueryResult {
  x: number
  y: number
  z?: number
  w?: number
}
```
The result is a point of variable component length
<br>
<br>

#### <b>PointQueryResult</b>

```ts
interface Query {
  id?: string 
  operation: string
}
```
- _optional_ **id**: Currently unused
- **operation**: The operation type
<br>
<br>

#### <b>QueryArgsResultMap</b>

```ts
type QueryArgsResultMap = {
  Project: PointQueryResult
  Unproject: PointQueryResult
  Occlusion: IntersectionQueryResult
  Pick: IntersectionQueryResult
} & { [key: string]: unknown }
```
Mapping between the query type and query result type.
<br>
<br>

#### <b>QueryOperation</b>

```ts
type QueryOperation = 'Project' | 'Unproject' | 'Occlusion' | 'Pick'
```
Query operation type values
<br>
<br>

#### <b>QueryResult</b>

```ts
type QueryResult = PointQueryResult | IntersectionQueryResult
```
Query result type values