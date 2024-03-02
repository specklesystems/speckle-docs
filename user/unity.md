---

---
# Unity

Our Unity Connector differs from the other connectors described in our User Guide; 
It has only a simple UI, and is missing some of the comforts present in other connectors.
But it offers several Unity Components to send and receive data from Speckle, and allows developers to easily develop their own
components and features.

In addition to this page, you should also take a look at our [.NET SDK section](/dev/dotnet).

::: tip 

Check out our dedicated [tutorials on Unity](https://speckle.systems/tag/unity/)!

:::

![unity example](https://user-images.githubusercontent.com/2679513/108543628-3a83ff00-72dd-11eb-8792-3d43ce54e6af.gif)

## Getting Started

Before using this connector, you'll need to follow our standard setup instructions to [install Speckle Manager and add a Speckle account](/user/manager). After this, you can proceed to clone the [Speckle Unity repository on GitHub](https://github.com/specklesystems/speckle-unity).

The repo contains a sample scene named `SpecklePlayground` that shows an in-game example of how to send and receive data from your default speckle account.
The example is minimal, but demonstrates what is possible using the Speckle Unity Connector.

## Package Installation

To install the connector into your own Unity project, rather than using sample project (see above), open the Package Manager (`Windows -> Package Manager`)
and select **Add Package from git URL**.

<center><img src="./img-unity/unity_install_git.png" width="50%" /></center>


Paste in the following URL
```
https://github.com/specklesystems/speckle-unity.git?path=/Packages/systems.speckle.speckle-unity
```

Once the package has installed, you must follow the steps in [Project Setup](unity.html#project-setup) in order to be able to successfully build your project.

## Editor Time Sending and Receiving

### Receiving
To receive data directly from the editor, just add the `SpeckleReceiver.cs` component to a GameObject, in the inspector you'll now be able to select accounts, streams, branches and commits.

<center><img src="./img-unity/unity_stream_manager_inspector.png" width="50%" alt="Screenshot of SpeckleReceiver component inspector" /></center>

The `Generate Asset` option, when enabled, will generate Mesh, Material, and Prefab assets in the `Resource` folder.


### Sending 

To Send data directly from the editor, just add the `SpeckleSender.cs` component to a GameObject.

<center><img src="./img-unity/unity_stream_manager_inspector_sender.png" width="50%" alt="Screenshot of SpeckleSender component inspector" /></center>

With the Selection dropdown, you can switch between sending:
- **Children**: All children of this GameObject.
- **Selection**: Editor Selection (may want to lock the inspector to stop it switching away).
- **All (excl. disabled)**: All enabled objects in the current scene.
- **All (incl. disabled)**: All objects in the current scene.

## Game Time Sending and Receiving



### Receiving

To receive data please refer to the [`Receiver.cs`](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Receiver.cs) class in `Assets\Speckle Connector`. This is just a wrapper around methods in [Core](/dev/dotnet), an example usage follows:

```csharp
var receiver = myGameObject.AddComponent<Receiver>();
receiver.Init(projectId);
receiver.Receive();
```

The `Init()` method accepts additional optional arguments to use different accounts, automatically receive updates, delete the old objects, report progress and errors etc. Please check the [source code](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Receiver.cs) for a complete list.

### Sending

To send data please refer to the [`Sender.cs`](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Sender.cs) class in `Assets\Speckle Connector`. This is just a wrapper around methods in [Core](/dev/dotnet), an example usage follows:

```csharp
var sender = myGameObject.AddComponent<Sender>();
sender.Send(projectId, objs);
```

The `Send()` method accepts additional optional arguments to use different accounts, report progress and errors etc. Please check the [source code](https://github.com/specklesystems/speckle-unity/blob/main/Assets/Speckle%20Connector/Sender.cs) for a complete list.

### Supported Elements

* [Unity Support Tables](/user/support-tables.html#unity)

### Metadata and Custom Properties

Geometry alone isn't much fun, that's why we've made it easy to also transfer BIM and custom data with your objects.
When receiving data, a `SpeckleProperties` component is attached to each object. Inside it there is a `Dictionary<string,object>` called `Data` that contains all the metadata coming from Speckle. This works similarly when sending data; if any objects have a `SpeckleProperties` component attached to them, it will be used.

This data is visible from the inspector (read only)
This data is fully accessible from code (read/write), like so:
```cs
SpeckleProperties props = myGameObject.GetComponent<SpeckleProperties>();

// props.Data is a IDictionary<string, object>

// you can check for a property like this:
if(pros.Data.ContainsKey("area")
   && Data["area"] is int area)
{
    Debug.Log(area);
}

//And Add a property like this
pros.Data.Add("area", 250);

```




### Materials

We have included basic material support in Speckle and in some of our connectors.

When receiving, the Unity connectors first checks if a shader exists in the scene that matches the incoming object's material _by name_. If a match cannot be found, Speckle will try to create a basic material with the same color and transparency. If an incoming object has no materials set, a default material will be applied.

## Project Setup

In order to successfully build a project using the Unity Connector, please ensure the following:

* Include `Standard` and `Diffuse` shaders in project settings. To do so, just add them in `Project Settings → Graphics → Built-in Shader Settings → Always Included shaders`.
  ![shader](https://user-images.githubusercontent.com/45512892/133601294-cdd78c5f-4c35-4f88-8a7a-73d97a7b234c.png)
 
Note that these steps have already been applied to the **Speckle Playground** sample project.