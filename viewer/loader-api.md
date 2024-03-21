# Loader

Abstract class
### <h3>Constructors</h3>
|  	| 
|---   
| [constructor](/viewer/loader-api.md#constructor)

### <h3>Accessors</h3>
|  	| 
|---   
| [resource](/viewer/loader-api.md#resource) 



### <h3>Methods</h3>
|  	| 	| 	|
|---	|---	|---
| [load](/viewer/loader-api.md#load) 	| [cancel](/viewer/loader-api.md#cancel) 	| [dispose](/viewer/loader-api.md#dispose)

<br><br>

### <h3>Constructors</h3>

#### <b>constructor</b>
```ts
constructor(resource: string, resourceData?: string | ArrayBuffer)
```
Populates the loader with data.
#### Parameters
- **resource**: This can either be a resource URL, either an resource ID
- *(optional)* **resourceData**: Explicit data you want to load

<br>
<br>


### <h3>Accessors</h3>

#### <b>resource</b>
```ts
get resource(): string
```
Gets the loader's resource
#### Returns: string


<br>
<br>

### <h3>Methods</h3>
#### <b>load</b>
```ts
abstract load(): Promise<boolean>
```
This function needs to handle all the resource loading  
#### Returns: <span style="font-weight:normal">A promise which resolves to a boolean indicating if the loading process completed successfully (true) or was interrupted/failed (false)</span>

<br>

#### <b>cancel</b>
```ts
abstract cancel()
```
This function needs to cancel any ongoing loading process and clean afterwards
#### Returns: void

<br>

#### <b>dispose</b>
```ts
abstract dispose()
```
This function needs to dispose of the loader and it's allocated resources
#### Returns: void