---
title: Writing your own connector (Obsolete)
deprecationType: developer-obsolete
description: Had a dream for a connector that doesn't yet exist? We had all the tools ready for you to start developing your own!
---

<Banner />

# Writing your own connector (Outdated)

![img](/dev/img/connectors-dev/connectors.png)

Have a dream for a connector that doesn't yet exist? We have all the tools ready for you to start developing your own!

We are very enthusiastic about community connectors and would love to help you bring them to life. To get started, check out the guide below. Feel free to reach out with any questions or calls for more contributors to the project on our [forum](https://speckle.community/).

## Before you Begin

Before you begin writing your own connector, we encourage you to follow the steps below:

1. **make sure you are comfortable** writing plugins for the host application you are planning to target, otherwise the guide below will not be of great help 😅
3. **post on the [community forum](https://speckle.community/)** announcing what you are planning to develop and how
4. **consider** that if you make your connector publicly available, it's going to be your own responsibility to maintain it
5. **check whether the [objects](https://github.com/specklesystems/speckle-sharp/tree/master/Objects) kit is fit** to support your future connector, if it might need to be extended or if you might want to develop a new kit as well
6. **read** our [dev docs on Base object, kits, transports](/dev/base.html) etc...

## Anatomy of a Connector

Connectors are made of the following parts:

- **a User Interface**
- **bindings** between the host application and the UI
- **custom logic** specific to the host application (for selecting elements, saving senders and receivers in the project file etc)
- **a converter** to convert between the host application and Speckle geometry and BIM elements

For the purpose of this tutorial, we'll be using a user interface called [DesktopUI](/user/ui) currently in use by our Revit, Rhino, AutoCAD and Civil 3D connectors. But you can of course create your own or use whatever the host application you are integrating with provides - that's the case of visual programming software.

## Getting Started

To get started, create a C# project in your IDE of choice by following the conventions and requirements for writing plugins for the host application you are targeting. In most cases you'll be creating a .NET Framework class library project.

To be consistent with other Speckle connectors you should name your project `ConnectorAPP_NAME`, set the Assembly name to `SpeckleConnectorAPP_NAME` and the namespace to `Speckle.ConnectorAPP_NAME` where `APP_NAME` is the name of your host application (eg Tekla, Etabs...).

::: tip Requirements

The minimum supported .NET Framework for using our .NET SDK is **4.6.1**

:::

Then you can proceed to add the following packages from NuGet:

- `Speckle.DesktopUI`
- `Speckle.Objects`

![image-20210427162106504](/dev/img/connectors-dev/image-20210427162106504.png)

By installing these packages,`Speckle.Core` and other packages will be also added automatically.

## Adding DesktopUI (DUI2)

Our DesktopUI is written using [Avalonia](https://avaloniaui.net/), a .NET open source framework for cross-platform UIs.
You can play around with a standalone version of it by opening the solution in `speckle-sharp/DesktopUI2/DesktopUI2.sln`.
Assuming the host application you are integrating with provides a way to launch plugins via command or by clicking a button, you can insatiate and launch the new DesktopUI with the code below:

```csharp
public static Window MainWindow { get; private set; }

public static AppBuilder BuildAvaloniaApp() => AppBuilder.Configure<DesktopUI2.App>()
  .UsePlatformDetect()
  .With(new SkiaOptions { MaxGpuResourceSizeBytes = 8096000 })
  .With(new Win32PlatformOptions { AllowEglInitialization = true, EnableMultitouch = false })
  .LogToTrace()
  .UseReactiveUI();

protected override Result Command()
{
  CreateOrFocusSpeckle();
  return Result.Success;
}

public static void CreateOrFocusSpeckle()
{
  if (MainWindow == null)
  {
    BuildAvaloniaApp().Start(AppMain, null);
  }

  MainWindow.Show();
}

private static void AppMain(Application app, string[] args)
{
  var viewModel = new MainWindowViewModel();
  MainWindow = new MainWindow
  {
    DataContext = viewModel
  };

  Task.Run(() => app.Run(MainWindow));
}

```

You can see how it's been implemented in [Rhino](https://github.com/specklesystems/speckle-sharp/tree/c413671748d72b236c99177f8f4994ad015da6ba/ConnectorRhino/ConnectorRhino/ConnectorRhinoShared/ConnectorRhinoCommand2.cs) and [Revit](https://github.com/specklesystems/speckle-sharp/tree/c413671748d72b236c99177f8f4994ad015da6ba/ConnectorRevit/ConnectorRevit/Entry/SpeckleRevitCommand2.cs).

Now, in your host application, after launching the Speckle plugin you should see this window pop up:

![image](https://user-images.githubusercontent.com/2679513/140319871-f242c4e6-9a9f-40ed-976e-9bd91b9c7b03.png)

### Adding the Bindings

The UI we just launched is quite sleek, but also a bit useless for the time being, as it doesn't have any connection to the host application; so it wouldn't know what to do when the _Send_ button is clicked, when the user wants to change selection or where to load saved streams from etc...

DesktopUI comes with some [DummyBindings](https://github.com/specklesystems/speckle-sharp/tree/c413671748d72b236c99177f8f4994ad015da6ba/DesktopUI2/DesktopUI2/DummyBindings.cs) so that you can test it, but let's go ahead and write our own.

Create a class named something like `ConnectorBindingsAPP_NAME.cs` and have it implement the abstract class `ConnectorBindings.cs`. It'll look something like the code below:

```csharp
public class ConnectorBindingsAECApp : ConnectorBindings
  {
    public override string GetActiveViewName()
    {
      throw new NotImplementedException();
    }

    public override List<MenuItem> GetCustomStreamMenuItems()
    {
      throw new NotImplementedException();
    }

    public override string GetDocumentId()
    {
      throw new NotImplementedException();
    }

    public override string GetDocumentLocation()
    {
      throw new NotImplementedException();
    }

    public override string GetFileName()
    {
      throw new NotImplementedException();
    }

    public override string GetHostAppName()
    {
      throw new NotImplementedException();
    }

    public override List<string> GetObjectsInView()
    {
      throw new NotImplementedException();
    }

    public override List<string> GetSelectedObjects()
    {
      throw new NotImplementedException();
    }

    public override List<ISelectionFilter> GetSelectionFilters()
    {
      throw new NotImplementedException();
    }

    public override List<StreamState> GetStreamsInFile()
    {
      throw new NotImplementedException();
    }

    public override Task<StreamState> ReceiveStream(StreamState state, ProgressViewModel progress)
    {
      throw new NotImplementedException();
    }

    public override void SelectClientObjects(string args)
    {
      throw new NotImplementedException();
    }

    public override Task SendStream(StreamState state, ProgressViewModel progress)
    {
      throw new NotImplementedException();
    }

    public override void WriteStreamsToFile(List<StreamState> streams)
    {
      throw new NotImplementedException();
    }
  }
```

As you might have guessed, we now need to populate these methods with logic that calls the host app API to perform the various actions. You don't have to implement each method as some might not be relevant for your host application, but make sure exceptions are handled gracefully. This is one of the most complicated parts of writing a connector and requires a very good understanding and experience with the host app API.

You can see how that's been done in [Rhino](https://github.com/specklesystems/speckle-sharp/tree/c413671748d72b236c99177f8f4994ad015da6ba//ConnectorRhino/ConnectorRhino/ConnectorRhinoShared/UI/ConnectorBindingsRhino2.cs) and [Revit](https://github.com/specklesystems/speckle-sharp/tree/c413671748d72b236c99177f8f4994ad015da6ba/ConnectorRevit/ConnectorRevit/UI/ConnectorBindingsRevit2) (where it's split in multiple partial classes).

In this class you might also want to add the logic to handle various events triggered from the host application such as `DocumentOpened` and automatically open the UI if the document has any streams saved.

Once the binding class is complete you need to set it in the MainWindow constructor when launching the UI.

Change:

```csharp
 var viewModel = new MainWindowViewModel();
```

To something like:

```csharp
 var viewModel = new MainWindowViewModel(Bindings);
```

You should now see the UI responding to various user actions with your custom binding logic.

### Adding Support for Reports

Our new DesktopUI has methods to better track what happens during send and receive operations, so that we can present a report to the user to better understand what happened.
The class being used is `ProgressReport` defined in [Core](https://github.com/specklesystems/speckle-sharp/tree/c413671748d72b236c99177f8f4994ad015da6ba/Core/Core/Models/Extras.cs#L96-L178).

It has three main methods that you should implement in your conversions and bindings:

- `Log()`: used to log any useful operation, for instance [the converter version being used](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L51), [successful operations](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L483) or [skipped elements](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L255). You should Log as many useful operations as possible, in our connectors every conversion is being logged.
- `LogConversionError()`: used to track any errors happening [during a conversion](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L949)
- `LogOperationError()`: used to track [any other error](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L194), while sending or receiving

#### Passing Errors from the Converter to the UI

:::tip IMPORTANT
Don't forget this step! Not doing so will result in incomplete reports.
:::

Since Speckle kits are hot swappable, the connectors or UI don't have any direct dependency on them. Therefore, we'd typically have 2 instances of a `ProgressReport` class, one [inside the converter](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L58) and one in the [connector/UI](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs#L20).

To make sure your reports include everything, you need to merge the two at the end of a send/receive conversion by calling: `connectorReport.Merge(converterReport);` like demonstrated [here](https://github.com/specklesystems/speckle-sharp/blob/main/ConnectorRhino/ConnectorRhino/ConnectorRhinoShared/UI/ConnectorBindingsRhino.cs#L230).

#### Report Summary

At the top of a report we're outputting a summary, it only works if some _keywords_ are used in the messages being logged: `converted`, `created`, `updated`, `skipped` ,`failed`; [see the logic here](https://github.com/specklesystems/speckle-sharp/blob/main/Core/Core/Models/Extras.cs#L103-L124). It might change in the future, but works for now.

Therefore your messages should be formatted like this:

- "_Converted_ Curve to Beam"
- "_Created_ Wall"
- "_Updated_ Floor"
- "_Skipped_ not supported type: {@object.GetType()}"
- "_Failed_ to create Floor: ..."

### Adding Custom Actions

The new UI also offers the possibility of registering custom actions that will show up in the "options menu" of each saved stream:
![img](https://user-images.githubusercontent.com/2679513/139488772-80fa5715-7b88-451e-9dcd-326cfe368660.gif)

You can register new actions in your `GetCustomStreamMenuItems` bindings method like so:

```csharp
public override List<MenuItem> GetCustomStreamMenuItems()
{
  var menuItems = new List<MenuItem>
  {
    new MenuItem { Header="Test link", Icon="Home", Action =OpenLink},
    new MenuItem { Header="More items", Icon="List", Items = new List<MenuItem>
    {
      new MenuItem { Header="Sub item 1", Icon="Account" },
      new MenuItem { Header="Sub item 2", Icon="Clock" },
    }
    },
  };
  return menuItems;
}

public void OpenLink(StreamState state)
{
  //to open urls in .net core you must set UseShellExecute = true
  Process.Start(new ProcessStartInfo(state.ServerUrl) { UseShellExecute = true });
}
```


## Implementing Telemetry

Telemetry is an optional aspects of a connector, but it massively helps us understand how our tech is being used and if our products are useful or not.
We encourage everyone adding it (and enabling it) in their connectors. The more usage we see, the more resources the project will get and a Better Speckle will be possible.

The telemetry service (matomo) is already added as a reference in Core, so you will just need to:

- initialize it with a `Setup.Init()` with the name of your connector as input,
- track the main actions with `Tracker.TrackPageView`, [example](https://github.com/specklesystems/speckle-sharp/blob/main/ConnectorGrasshopper/ConnectorGrasshopperShared/Ops/Deprecated/Operations.SendComponent.cs#L59)

## Writing the Converter

Last crucial bit for your connector to work properly is to create a converter. The converter will take care of converting native data and geometry from your host application to Speckle when sending and vice-versa when receiving.

For the purpose of this guide, we'll assume your converter will be extending the [Objects kit](/dev/objects), but you can also [write your own kit](/dev/kits-dev) if you so wish.

::: tip IMPORTANT

The connector **should never have a direct references** to the converter or kit. This is because kits are swappable and having a direct reference would prevent this mechanism from working.

:::

### Creating the Converter Project

Create a new C# project for the converter, we recommend using a class library with .NET Standard 2.0.

To be consistent with other Speckle converters you should name your project `ConverterAPP_NAME`, set the Assembly name to `Objects.Converter.APP_NAME` and the namespace to `Objects.Converter.APP_NAME` where `APP_NAME` is the name of your host application (eg Tekla, Etabs...).

Then add references to the following NuGet packages:

- `Speckle.Objects`
- Your host app API (preferably as NuGets)

### Adding the Converter Logic

Now create a new class named `ConverterAPP_NAME` and have it implement the `ISpeckleConverter` interface. It'll look something like this:

```csharp
 public class ConverterAECApp : ISpeckleConverter
  {
    public string Description => throw new NotImplementedException();

    public string Name => throw new NotImplementedException();

    public string Author => throw new NotImplementedException();

    public string WebsiteOrEmail => throw new NotImplementedException();

    public HashSet<Exception> ConversionErrors => throw new NotImplementedException();

    public bool CanConvertToNative(Base @object)
    {
      throw new NotImplementedException();
    }

    public bool CanConvertToSpeckle(object @object)
    {
      throw new NotImplementedException();
    }

    public object ConvertToNative(Base @object)
    {
      throw new NotImplementedException();
    }

    public List<object> ConvertToNative(List<Base> objects)
    {
      throw new NotImplementedException();
    }

    public Base ConvertToSpeckle(object @object)
    {
      throw new NotImplementedException();
    }

    public List<Base> ConvertToSpeckle(List<object> objects)
    {
      throw new NotImplementedException();
    }

    public IEnumerable<string> GetServicedApplications()
    {
      throw new NotImplementedException();
    }

    public void SetContextDocument(object doc)
    {
      throw new NotImplementedException();
    }

    public void SetContextObjects(List<ApplicationPlaceholderObject> objects)
    {
      throw new NotImplementedException();
    }

    public void SetPreviousContextObjects(List<ApplicationPlaceholderObject> objects)
    {
      throw new NotImplementedException();
    }
  }
```

You might not need to implement all these methods, it really depends on how you want to handle the conversions and on how complex is the host app you're dealing with.

We'll detail a few of these methods and properties below, and you can see how they have been implemented for [Rhino](https://github.com/specklesystems/speckle-sharp/blob/main/Objects/Converters/ConverterRhinoGh/ConverterRhinoGhShared/ConverterRhinoGh.cs) and [Revit](https://github.com/specklesystems/speckle-sharp/blob/master/Objects/Converters/ConverterRevit/ConverterRevitShared/ConverterRevit.cs).

:::tip IMPORTANT

Please note that **it's fundamental** that the string value(s) returned by `GetServicedApplications()` matches the name used for `APP_NAME`. So if your converter is built as `Objects.Converter.Tekla.dll` , the method should return `new string[] { "Tekla"};`

:::

If you'd like to add your `APP_NAME` to the [list of applications in Core](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Core/Kits/Applications.cs), we can certainly do so, just submit a PR.

### The Context Document

The `SetContextDocument` is used to _inject_ the Document from the connector and host app API to the converter ( it might have a different name in your case, or not even exist!), but in software as Revit or Rhino it's fundamental to create new objects, start transactions, get units etc...

### The Convert methods

The most important methods in a converter are `ConvertToNative` and `ConvertToSpeckle`, and are what will take most of your time and API flexing skills.

Please have a look at how things are done in other converters, you will most likely end up having a switch statement with a list of functions that handle the various geometry and data types.

The logic of these routines can get quite complicated if you want to support nested elements or update previously received objects, and we recommend adding such functionalities later.

::: tip IMPORTANT

Don't forget to properly set the units of your objects when sending to Speckle and to scale incoming geometry when receiving from Speckle.

:::

For any questions feel free to write on the [community forum](https://speckle.community/)!

### New Objects

If the host app you're targeting uses object types not currently defined in the Objects kit and you'd like to write conversions for them, we are happy to extend it!

Please get in touch on the forum before making a PR, then have a look at [how to write new objects](/dev/objects.html#writing-objects).

## Loading the Converter

At some point in your `ConnectorBindings` you'll need to implement the `SendStream` and `ReceiveStream` methods. It's within these that we will be invoking methods of the converter and then either send or receive data to/from Speckle.

::: tip IMPORTANT

The connector **should never have a direct references** to the converter or kit. This is because kits are swappable and having a direct reference would prevent this mechanism from working.

:::

To invoke the `ConvertToNative` and `ConvertToSpeckle` methods (and other methods / properties as well) of the converter, we first need to load it. To do so, you should use the `KitManager` in `Core` as follows:

```csharp
var kit = KitManager.GetDefaultKit();
var converter = kit.LoadConverter(APP_NAME);
// then stuff like converter.ConvertToNative(obj);
```

The converter, as you might have seen above should have implemented other handy methods such as `CanConvertToSpeckle`

For more information on how to implement the send/receive bindings,
use our connectors' implementations as reference, and (for receive) see [Traversal docs](../dev/traversal.html).

## Publishing the Connector

We currently don't have mechanisms to publish third party connectors via Manager, but if you'd like to do so please write on the [community forum](https://speckle.community/) and we'll work out a solution! You are of course free to develop your own installer / deployment mechanism.

## Conclusion

We hope this guide will make it easier for you to start writing your own connector and we are really looking forward to seeing it! As this is a quite high level guide we encourage you to check out how our other connectors have been written and ping us with additional questions if you have any.
