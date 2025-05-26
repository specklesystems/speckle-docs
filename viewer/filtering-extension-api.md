---
title: FilteringExtension
deprecationMessages: viewer
---

<Banner />

# FilteringExtension

The default filtering functionality is exposed as an extension. The current filtering implementation works by providing an updated [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate) after each call to its functions. You can use this filtering state to keep track of filtering state.

### <h3>Accessors</h3>

| [filteringState](/viewer/filtering-extension-api.md#filteringstate) |
| ------------------------------------------------------------------- |

### <h3>Methods</h3>

| [hideObjects](/viewer/filtering-extension-api.md#hideobjects) | [isolateObjects](/viewer/filtering-extension-api.md#isolateobjects) | [removeColorFilter](/viewer/filtering-extension-api.md#removecolorfilter) | [removeUserObjectColors](/viewer/filtering-extension-api.md#removeuserobjectcolors) |
| :---------------------------------------------------------------------- | :------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| [resetFilters](/viewer/filtering-extension-api.md#resetfilters)         | [setColorFilter](/viewer/filtering-extension-api.md#setcolorfilter) | [setUserObjectColors](/viewer/filtering-extension-api.md#setuserobjectcolors) | [showObjects](/viewer/filtering-extension-api.md#showobjects)                       |
| [unIsolateObjects](/viewer/filtering-extension-api.md#unisolateobjects) |                                                                     |                                                                               |                                                                                     |

### <h3>Typedefs</h3>

| [FilteringState](/viewer/filtering-extension-api.md#filteringstate) | [PropertyInfo](/viewer/filtering-extension-api.md#propertyinfo) |
| ------------------------------------------------------------------- | --------------------------------------------------------------- |

### <h3>Accessors</h3>

#### <b>filteringState</b>

```ts
get filteringState(): FilteringState
```

Returns the current [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate).

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

### <h3>Methods</h3>

#### <b>hideObjects</b>

```ts
hideObjects(
    objectIds: string[],
    stateKey: string = null,
    includeDescendants = false,
    ghost = false
  ): FilteringState
```

Hides the specified object ids.

**Parameters**

- **objectIds**: The ids of the objects to hide
- _optional_ **stateKey**: A way of splitting up commands coming from different controls (model explorer, filters, selection) so the viewer filtering api can know whether to reset its internal state or not
- _optional_ **includeDescendants**: Whether to include the descendants of the provided object ids
- _optional_ **ghost** Whether to ghost the rest of the objects

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>isolateObjects</b>

```ts
isolateObjects(
    objectIds: string[],
    stateKey: string = null,
    includeDescendants = true,
    ghost = true
  ): FilteringState
```

Hides the specified object ids.

**Parameters**

- **objectIds**: The ids of the objects to hide
- _optional_ **stateKey**: A way of splitting up commands coming from different controls (model explorer, filters, selection) so the viewer filtering api can know whether to reset its internal state or not
- _optional_ **includeDescendants**: Whether to include the descendants of the provided object ids
- _optional_ **ghost** Whether to ghost the rest of the objects

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>isolateObjects</b>

```ts
removeColorFilter(): FilteringState
```

Removes any current color filters.

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>removeUserObjectColors</b>

```ts
removeUserObjectColors(): FilteringState
```

Removes any current user color filters.

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>resetFilters</b>

```ts
resetFilters(): FilteringState
```

Removes al the current filters.

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>setColorFilter</b>

```ts
setColorFilter(prop: PropertyInfo, ghost = true): FilteringState
```

Applies a color filter.

**Parameters**

- **prop**: [_PropertyInfo_](/viewer/filtering-extension-api.md#propertyinfo)
- _optional_ **ghost**" Whether to ghost the rest of the objects

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>setUserObjectColors</b>

```ts
setUserObjectColors(
    groups: { objectIds: string[]; color: string }[]
): FilteringState
```

Applies a user color filter.
:::tip
If used appropriately user color filters can typically be much more performant than applying multiple materials per color.
:::
**Parameters**

- **groups**: Groups of objects organized by color

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>showObjects</b>

```ts
showObjects(
    objectIds: string[],
    stateKey: string = null,
    includeDescendants = false
  ): FilteringState
```

Shows the specified object ids.

**Parameters**

- **objectIds**: The ids of the objects to hide
- _optional_ **stateKey**: A way of splitting up commands coming from different controls (model explorer, filters, selection) so the viewer filtering api can know whether to reset its internal state or not
- _optional_ **includeDescendants**: Whether to include the descendants of the provided object ids

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

#### <b>unIsolateObjects</b>

```ts
unIsolateObjects(
    objectIds: string[],
    stateKey: string = null,
    includeDescendants = true,
    ghost = true
  ): FilteringState
```

Shows the specified object ids.

**Parameters**

- **objectIds**: The ids of the objects to hide
- _optional_ **stateKey**: A way of splitting up commands coming from different controls (model explorer, filters, selection) so the viewer filtering api can know whether to reset its internal state or not
- _optional_ **includeDescendants**: Whether to include the descendants of the provided object ids
- _optional_ **ghost** Whether to ghost the rest of the objects

**Returns**: [_FilteringState_](/viewer/filtering-extension-api.md#filteringstate)

### <h3>Typedefs</h3>

#### <b>FilteringState</b>

```ts
type FilteringState = {
  selectedObjects?: string[];
  hiddenObjects?: string[];
  isolatedObjects?: string[];
  colorGroups?: Record<string, string>[];
  userColorGroups?: { ids: string[]; color: string }[];
  activePropFilterKey?: string;
  passMin?: number | null;
  passMax?: number | null;
};
```

- **selectedObjects**: The current selected object ids
- **hidenObjects**: The current hidden object ids
- **isolatedObjects**: The current isolated object ids
- **colorGroups**: The current color groups
- **userColorGroups**: The current user color groups
- **activePropFilterKey**: The active property filtering key
- **passMin**: The minimal value of the property filtering value if numeric
- **passMax**: The maximum value of the property filtering value if numeric

#### <b>PropertyInfo</b>

```ts
interface PropertyInfo {
  key: string;
  objectCount: number;
  type: "number" | "string";
}
```

Outline of a filterable property.

- **key**: The property key
- **objectCount**: The object count where the key is present
- **type**: Property type
