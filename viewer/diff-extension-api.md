---
title: DifExtension
deprecationMessages: viewer
---

<Banner />

# DiffExtension

The default diffing functionality expose as an extension.

### <h3>Methods</h3>

| [diff](/viewer/diff-extension-api.md#diff) | [undiff](/viewer/diff-extension-api.md#undiff) | [updateVisualDiff](/viewer/diff-extension-api.md#updatevisualdiff) |
| ------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------ |

### <h3>Typedefs</h3>

| [DiffResult](/viewer/diff-extension-api.md#diffresult) | [VisualDiffMode](/viewer/diff-extension-api.md#visualdiffmode) |
| ------------------------------------------------------ | -------------------------------------------------------------- |

### <h3>Methods</h3>

#### <b>diff</b>

```ts
async diff(
    urlA: string,
    urlB: string,
    mode: VisualDiffMode,
    authToken?: string
  ): Promise<DiffResult>
```

Diffs the two speckle models provided as URLs. If the models are not yet loaded, they are also loaded.

**Parameters**

- **urlA**: The 'current' model
- **urlB**: The 'incoming' model
- **mode**: The [_VisualDiffMode_](/viewer/diff-extension-api.md#visualdiffmode)
- _optional_ **authToken** Used for potentially loading models

**Returns**: Promise <[_DiffResult_](/viewer/diff-extension-api.md#diffresult)>

#### <b>undiff</b>

```ts
async undiff(): Promise<void>
```

Undos any visual diffing and unloads any loaded models previously loaded b diffing.

**Returns**: Promise< void >

#### <b>updateVisualDiff</b>

```ts
updateVisualDiff(time?: number, mode?: VisualDiffMode): void
```

Updates the current visual diff.

**Parameters**:

- _optional_ **time**: A value between 0 and 1 which that is used to interpolate opacity between 'current' and 'incoming' objects
- _optional_ **model**: [_VisualDiffMode_](/viewer/diff-extension-api.md#visualdiffmode)

**Returns**: void

### <h3>Typedefs</h3>

#### <b>DiffResult</b>

```ts
interface DiffResult {
  unchanged: Array<TreeNode>;
  added: Array<TreeNode>;
  removed: Array<TreeNode>;
  modified: Array<Array<TreeNode>>;
}
```

- **unchanged**: All the nodes considered unchanged
- **added**: All the nodes considered added
- **removed**: All the nodes considered removed
- **modified**: All the nodes considered modified by pairs, where the first node is from the 'current' model and second one is from the 'incoming' model

#### <b>VisualDiffMode</b>

```ts
enum VisualDiffMode {
  PLAIN,
  COLORED,
}
```

With PLAIN, original materials are kept, and only made transparent. With COLORED the materials are replaced with typical diff colored materials:

- `red` for `removed`
- `yellow` for `modified`
- `green` for `added`
- `no change` for `unchanged`
