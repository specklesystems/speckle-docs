# Visual Settings

<div class="banner-ribbon">
  <span><b>Important</b>: This guide features the V2 PowerBI data connector and model viewer visual.</span>
  <span class="next-gen">Next Gen is on its way, radically changing how the PowerBI connector works!</span>
</div>

## Object Display

This setting determines how objects are displayed when not in the input data table.

- **Ghosted (default)**: Other elements are shown as transparent grey (or any other color you define) material, enhancing the ghost effect. 👻
- **Hidden**: Other elements are hidden. Only active elements are shown in the visual.

## Camera

These settings control the initial camera view, projection type, camera movement, and zoom behavior in the 3D Viewer Visual.

- **Default View:** Controls the default view when the visual is active. The default value is Perspective. It can be set to Perspective, Top, Left, Right, Front, or Back.
- **Projection:** Controls the projection of the camera in the visual. It can be set to "Perspective" or "Orthographic.” The default value is Perspective.
- **Allow under model:** Controls whether the camera movement is allowed beneath the model or scene in the 3D Viewer Visual. The default value is False.
- **Zoom extent on change: D**etermines whether the camera automatically adjusts its zoom level to fit the entire scene whenever a change occurs in the data or visualization. If unchecked, the camera stays where it was previously. The default value is True.

## Lighting

These lighting settings provide you with fine-grained control over the illumination and shading of your 3D Viewer Visual.

- **Intensity**: Controls the overall brightness or intensity of the lighting in the 3D Viewer Visual. Increasing the intensity can make the scene appear brighter, while decreasing it can create a more subdued or darker lighting effect.
- **Elevation:** Determines the vertical angle at which the light source illuminates the 3D scene.
- **Azimuth:** Defines the horizontal angle at which the light source illuminates the 3D scene.
- **Indirect:** Controls the amount of indirect lighting or ambient illumination in the 3D Viewer Visual.
- **Cast Shadows:** Enables or disables the rendering of shadows cast by objects in the 3D scene.
- **Catch Shadows:** The Catch-Shadows setting determines whether objects in the 3D Viewer Visual can receive shadows cast by other objects.
