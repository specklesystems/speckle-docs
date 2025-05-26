---
title: Preview Images
deprecationMessages: sdks
---

<Banner />

# Stream Preview Images

Preview images for your stream can be accessed through the `preview` endpoint. You can get preview for streams (which will give you the latest commit on `main`), specific commits, the latest commit on a branch, or even a specific object.

## Requesting Previews

If the stream is public, you can simply take any url (stream, commit, branch, or object) and replace `streams` with `preview` to get a preview image back from that resource. You can try this yourself by simply going to the URL in your browser. If the stream is private, you will need to make an authenticated request in order to get access to the preview.

::: tip URL Scheme
Stream preview: `https://app.speckle.systems/preview/<YOUR-STREAM-ID>`

Commit preview: `https://app.speckle.systems/preview/<YOUR-STREAM-ID>/commits/<YOUR-COMMIT-ID>`

Branch preview: `https://app.speckle.systems/preview/<YOUR-STREAM-ID>/branches/<YOUR-BRANCH-NAME>`

Object preview: `https://app.speckle.systems/preview/<YOUR-STREAM-ID>/objects/<YOUR-OBJECT-ID>`
:::

## Examples

For example, here is a [commit](https://app.speckle.systems/streams/3073b96e86/commits/604bea8cc6) preview:
```md
![speckle haus commit](https://app.speckle.systems/preview/3073b96e86/commits/604bea8cc6)
```
<img src="https://app.speckle.systems/preview/3073b96e86/commits/604bea8cc6" />

And here is an [object](https://app.speckle.systems/streams/3073b96e86/objects/1a2a5fd7ff5c6e6b2382f513d19eb3d5) preview:
```md
![speckle haus object](https://app.speckle.systems/preview/3073b96e86/objects/1a2a5fd7ff5c6e6b2382f513d19eb3d5)
```
<img src="https://app.speckle.systems/preview/3073b96e86/objects/1a2a5fd7ff5c6e6b2382f513d19eb3d5" />
