---
title: REST API
deprecationMessages: sdks
---

<Banner />

# REST API

Our Speckle Server offers both a [GraphQL API](/server/server-graphql-api) and a REST API, for most of your queries the GQL API is probably best suited because of its flexibility and ease of use.
When working with uploading and downloading objects, the REST API is preferred.

## Uploading and Downloading Objects

### Check if the Server Contains a List of Objects

This method is useful for optimizing uploads, so that objects that are already in the project are not uploaded for every commit.

**URL:** `${CANONICAL_URL}/api/diff/:projectId`

**Method:** <span class="api-chip post">POST</span>

**Authentication:** Token

**Required permissions:** Write permissions on the project

**Request body schema:** application/json

**Request body:**

- `objects` (string): An array of object ids, serialized as a JSON string

**Limits:**

- _Recommended_ max number of objects to check: `1000`

**Output:** A JSON representation of a dictionary, where the keys are the input object ids, and the values are boolean values (whether the server already has that object or not)

### Upload a Batch of Objects

**URL:** `${CANONICAL_URL}/objects/:projectId`

**Method:** <span class="api-chip post">POST</span>

**Authentication:** Token

**Required permissions:** Write permissions on the project

**Input:** The batch to be inserted is sent as a multipart-encoded file content (filename is ignored) and is a JSON representation of an array of objects to be inserted

- Example file content: `[{"id": "9b2cdb21da092dbd3558a4bc55b2cf7e", "speckle_type": "Base", "totalChildrenCount": 0, "numbers": [0.04667752874618203, 0.16370857295385177, 0.1008153029515465]}]`)
- The server accepts multiple batches as multiple files in the same call.
- It's recommended to compress the batch with gzip and set the uploaded file content_type to `application/gzip`. Otherwise, set it to `application/json`

**Limits:**

- Maximum size of each individual object: `10 MB` (large objects can be split into multiple objects using `chunkable` properties and `detachable` properties)
- Maximum size of each request: `50 MB` hard limit

### Downloading a Single Object

**URL:** `${CANONICAL_URL}/objects/:projectId/:objectId/single`

**Method:** <span class="api-chip get">GET</span>

**Authentication:** Token

**Required permissions:** Read permissions on the project

**Output:** The JSON representation of the object

### Downloading a List of Objects

This method is useful when optimizing downloads: Get the root object without children, check the children ids in the local cache and then request only the new objects with this method.

**URL:** `${CANONICAL_URL}/api/getobjects/:projectId`

**Method:** <span class="api-chip post">POST</span>

**Authentication:** Token

**Required permissions:** Read permissions on the project

**Request body schema:** application/json

**Request body:**

- `objects` (string): An array of object ids, serialized as a JSON string

**Headers:**

- `Accept`: either `text/plain` or `application/json`

**Limits:**

- _Recommended_ max number of objects to download with 1 request: `1000`

**Output:** The requested objects. The formatting is based on the `Accept` HTTP Request header

- If `Accept` is `text/plain`, each line of the output contains 1 object in the format: `{object_id}\t{object_content}`
- If `Accept` is `application/json`, the output is a JSON representation of an array of objects.

### Downloading an Object and All its Children

**URL:** `${CANONICAL_URL}/objects/:projectId/:objectId`

**Method:** <span class="api-chip get">GET</span>

**Authentication:** Token

**Required permissions:** Read permissions on the project

**Headers:**

- `Accept`: either `text/plain` or `application/json`

**Output:** The requested object and its children. The formatting is based on the `Accept` HTTP Request header

- If `Accept` is `text/plain`, each line of the output contains 1 object in the format: `{object_id}\t{object_content}`
- If `Accept` is `application/json`, the output is a JSON representation of an array of objects.
