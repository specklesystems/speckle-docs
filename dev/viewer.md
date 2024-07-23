# Using our Embeddable 3D Viewer

This section is currently being built 🚧, please check again later.

::: tip 

For the brave, there's an example application in the [viewer package right here](https://github.com/specklesystems/speckle-server/tree/main/packages/viewer).

:::

Our end goals are:
- easy to load and unload speckle data
- easy to embed in your own react/vue/vanilla web apps
- easy to customise with your own tree views, etc.

<div id="embed" style="width: 100%; height: 500px;"></div>

<script>
    const interval = setInterval(() => {
        if (typeof StackBlitzSDK !== 'undefined') {
            clearInterval(interval);
            StackBlitzSDK.embedProjectId('embed', 'css-custom-prop-color-values', {
                openFile: 'index.ts',
            });
        }
    }, 500);

    </script>