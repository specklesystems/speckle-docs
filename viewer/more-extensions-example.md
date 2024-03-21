# More Extensions
We'll be expanding on our [basic example](/viewer/basic-example.md) by adding some of the stock viewer extensions.

## Section Tool
The stock section extension provides 6 customisable section planes by default placed as a axis aligned box. Additional to the tool itself there is also the section outlines display provided as another optional extension.

```ts
const sections = viewer.createExtension(SectionTool);
viewer.createExtension(SectionOutlines);
```

The section tools comes with a control gizmo by default, but we can also control it programatically. So if we want to set the section box to a particular size we can do

```ts
/** Enable the section tool */
sections.toggle();

/** Programatically apply a section box */
const box = new Box3().copy(viewer.getRenderer().sceneBox);
box.max.z *= 0.35;
sections.setBox(box);
```

Here's a running code sandbox with this use case

<iframe src="https://codesandbox.io/embed/r8fsk3?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Section Planes"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>


<br>
<br>
<br>

## Measurements Tool
The default measurement tool provides basic functionality for most measuring needs. There are two main measuring modes:
- **PointToPoint**: Classic measurement mode where you measure the distance between two defined points
- **Perpendicular**: This measuremente mode allows you to measure the distance along one point on a surface along it's normal to another chosen point.
- **AutoLazer™**: Double clicking when in perpendicular mode, automatically measures from the current point to the nearest surface along the current point's surface normal


Here's a sandbox example with a small integrated UI for playing around with the measurement tool

<iframe src="https://codesandbox.io/embed/frmffj?view=Editor+%2B+Preview&module=%2Fsrc%2FMeasurementsUI.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Measurement Tool"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

<br>
<br>
<br>

## Differ

The differ provides diffing functionality between models. It can provide a diff data-wise as well as visually. Diffing works by taking a *current* model and comparing it against an *incoming* model. The result will contain added/removed/modified/unchanged objects which are colored accordingly (if visual diff is enabled). Diff results are based on object `id`s and `applicationId`s

Here's an example of the differ running

<iframe src="https://codesandbox.io/embed/rpnjs5?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.ts&hidenavigation=1"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Differ"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>