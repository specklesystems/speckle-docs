---
title: Object Manipulation
deprecationMessages: viewer
---

<Banner />

# Object Manipulation
The viewer allows individual object transformation manipulation. In the example below, we've extended the stock `SelectionExtension` to allow us to move objects around.

You can run the example live [here](https://stackblitz.com/edit/speckle-extended-selection?file=index.html) or <VueCustomTooltip label="Embedding works only on chromium based browsers"><ins>embedded</ins></VueCustomTooltip> below

<Stackblitz projectId='speckle-extended-selection' :embedOptions="{ 
    height: 500,
    openFile: 'src/main.ts',
    view: 'preview',
    hideExplorer: true,
    hideNavigation: true }" 
/>