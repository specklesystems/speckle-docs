---
title: More Extensions
deprecationMessages: viewer
---

<Banner />

# More Extensions

We'll be expanding on our [basic example](/viewer/basic-example.md) by adding some of the stock viewer extensions.

## Section Tool

The stock section extension provides 6 customisable section planes by default placed as a axis aligned box. Additional to the tool itself there is also the section outlines display provided as another optional extension.

```ts
const sections = viewer.createExtension(SectionTool);
viewer.createExtension(SectionOutlines);
```

The section tools comes with a control gizmo by default, but we can also control it programatically. So if we want to set the section box to a particular size we can do:

```ts
/** Enable the section tool */
sections.toggle();

/** Programatically apply a section box */
const box = new Box3().copy(viewer.getRenderer().sceneBox);
box.max.z *= 0.6;
sections.setBox(box);
```

You can run the example live [here](https://stackblitz.com/edit/speckle-section-planes?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId="speckle-section-planes" :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" />

## Measurements Tool

The default measurement tool provides basic functionality for most measuring needs. There are two main measuring modes:

- **PointToPoint**: Classic measurement mode where you measure the distance between two defined points
- **Perpendicular**: This measuremente mode allows you to measure the distance along one point on a surface along it's normal to another chosen point.
- **AutoLazer™**: Double clicking when in perpendicular mode, automatically measures from the current point to the nearest surface along the current point's surface normal

You can run the example live [here](https://stackblitz.com/edit/speckle-measurement-tool?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId='speckle-measurement-tool' :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" 
/>

## Differ

The differ provides diffing functionality between models. It can provide a diff data-wise as well as visually. Diffing works by taking a _current_ model and comparing it against an _incoming_ model. The result will contain added/removed/modified/unchanged objects which are colored accordingly (if visual diff is enabled). Diff results are based on object `id`s and `applicationId`s.

You can run the example live [here](https://stackblitz.com/edit/speckle-differ?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId='speckle-differ' :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" 
/>
