---

---
# Unity

Our Unity connector differs from the other connectors described in our User Guide as it's only really meant for use by software developers. It doesn't have an elaborate UI, but it offers convenience methods to send and receive data.

In addition to this page, you should also take a look at our [.NET SDK section](/dev/dotnet).

::: tip 

Check out our dedicated [tutorials on Unity](https://speckle.systems/tag/unity/)!

:::

![unity example](https://user-images.githubusercontent.com/2679513/108543628-3a83ff00-72dd-11eb-8792-3d43ce54e6af.gif)

## Getting Started

Before using this connector, you'll need to follow our standard setup instructions to [install Speckle Manager and add a Speckle account](/user/manager). After this, you can proceed to clone the [Speckle Unity repository on GitHub](https://github.com/specklesystems/speckle-unity).

The repo contains a sample scene named `SpecklePlayground` that shows how to send and receive data from your default account.

## Editor Time Sending and Receiving

### Receiving

To receive data directly from the editor, just add the `SpeckleManager.cs` script to a GameObject, in the inspector you'll now be able to select accounts, streams, branches and commits.

Please note this feature is in early release and might be a bit unstable.

![StreamManager](https://user-images.githubusercontent.com/2679513/123954157-fb0ea300-d99f-11eb-8507-724676d4717c.png)

## Game Time Sending and Receiving

Sending and receiving supports either flat and nested structures (such as Grasshopper tress and Dynamo nested lists).

### Receiving

To receive data please refer to the [`Receiver.cs`](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Receiver.cs) class in `Assets\Speckle Connector`. This is just a wrapper around methods in [Core](/dev/dotnet), an example usage follows:

```csharp
var receiver = myGameObject.AddComponent<Receiver>();
receiver.Init(streamId);
receiver.Receive();
```

The `Init()` method accepts additional optional arguments to use different accounts, automatically receive updates, delete the old objects, report progress and errors etc. Please check the [source code](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Receiver.cs) for a complete list.

### Sending

To send data please refer to the [`Sender.cs`](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Sender.cs) class in `Assets\Speckle Connector`. This is just a wrapper around methods in [Core](/dev/dotnet), an example usage follows:

```csharp
var sender = myGameObject.AddComponent<Sender>();
sender.Send(streamId, objs);
```

The `Send()` method accepts additional optional arguments to use different accounts, report progress and errors etc. Please check the [source code](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Sender.cs) for a complete list.

### Supported Elements

* [Unity Support Tables](/user/support-tables.html#unity)

### Metadata

Geometry alone isn't much fun, that's why we've made it easy to also transfer BIM and custom data with your objects.
When receiving data, a `SpeckleProperties` component is attached to each object. Inside it there is a `Dictionary<string,object>` called `Data` that contains all the metadata coming from Speckle. This works similarly when sending data; if any objects have a `SpeckleProperties` component attached to them, it will be used.

### Materials

We have included basic material support in Speckle and in some of our connectors.

When receiving, the Unity connectors first checks if a shader exists in the scene that matches the incoming object's material _by name_. If a match cannot be found, Speckle will try to create a basic material with the same color and transparency. If an incoming object has no materials set, a default material will be applied.

## Building

In order to build the Speckle Playground project (and potentially any project) using the Unity Connector, please ensure the following:

* Set the project architecture to `x86_64`
* If you get errors on missing shaders include them in your build. To do so, just copy them to a Resource folder OR add them in `Project Settings → Graphics → Built-in Shader Settings → Always Included shaders`
  ![shader](https://user-images.githubusercontent.com/45512892/133595679-3c37c01e-f156-4a17-afde-a975a523c90b.png)