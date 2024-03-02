# Introduction

Welcome to the **Speckle Developer Docs** - a single source of documentation on everything Speckle!
If you're looking for info on how to _use_ Speckle, check our [user guide](/).

> Speckle is the open source data platform for architecture, engineering, and construction. It liberates your data from proprietary file formats and closed source software and puts it back into your hands.

This part of our docs is for any developer planning to extend, integrate or improve Speckle. We'll walk you through the main concepts behind our tech and guide you through fun tasks such as [writing your own connector](/dev/connectors-dev) or [writing custom Speckle apps](/dev/apps).

We hope to see the great things you'll do with our SDKs and APIs, let's go!

## Speckle, The Platform

We call Speckle a data platform but Speckle is also a set of connectors for AEC applications. There are Speckle kits, which are the base of our approach to interoperability. Then there are various Speckle apps - like the Speckle 3D viewer, the Speckle Web UI, the Speckle Server...

That's quite a lot to chew, but you're probably still asking yourself - **what is Speckle**?

> ### Ultimately, Speckle has two distinct parts: the developer platform, and the applications and products built on top of it.

So what's what? Simple: if an architect/engineer/AEC professional interacts with it, it's a Speckle **product** built on top of Speckle's **developer platform**.

The developer platform consists of code that makes it easier for us (and you!) to build user-facing applications - either web-based or desktop-based.

This section is about the platform, and not about the products. If you want to see how to use Speckle as an architect or engineer, check our [user guide](/).

## Code Repositories

Our platform is made of many moving parts, the code for anything Speckle 2.0 onwards is hosted in our [GitHub specklesystems organization](https://github.com/specklesystems).
Here's a quick summary of the main repos you'll find there, please make sure to give them a star ⭐️ if you like what you see!

[Speckle Server](https://github.com/specklesystems/speckle-server) contains all the web-based applications including the server backend, the frontend web application, and the 3D viewer.

<!-- made with https://tree.nathanfriend.io/ -->

```text
└── speckle-server
    ├── server
    ├── frontend
    └── viewer
```

<!-- ![diagram of the speckle-web repo structure](https://user-images.githubusercontent.com/7717434/107392209-5a534000-6af1-11eb-865d-9ead30d9b3ed.png) -->

[Speckle Sharp](https://github.com/specklesystems/speckle-sharp) contains all the C# desktop components including the .NET SDK, the connectors (Rhino, Revit, Grasshopper, & Dynamo...), and Objects (our default interoperability kit).

```text
└── speckle-sharp
    ├── core
    ├── connector revit
    ├── connector rhino
    ├── connector dynamo
    ├── connector grasshopper
    ├── connector autocadcivil
    ├── desktopui
    └── objects
        ├── objects
        └── conerters
            ├── revit
            ├── rhinogh
            ├── dynamo
            └── autocadcivil
```

<!--
![diagram of the speckle-sharp repo structure](https://user-images.githubusercontent.com/7717434/107392452-99819100-6af1-11eb-901e-14c29858931a.png) -->

To put it simply, Speckle Sharp is what you use to free your data from different models and desktop applications and Speckle Server is where you send all this data and interact with it in the browser.

[Speckle Py](https://github.com/specklesystems/speckle-py) is our Python SDK. Are you more of a pythonista than a .NET ninja? Have a play with it!

[Speckle Unity](https://github.com/specklesystems/speckle-unity) is our Unity Connector, it might make it inside Speckle Sharp in the future.

## Additional tools

Inside our GitHub organisation you'll also find a few additional tools you might want to check out, for example, the two below.

Ever struggle with janky behaviour in Grasshopper as things start getting complicated? You might enjoy the [GrasshopperAsyncComponent](https://speckle.systems/blog/async-gh/).
Do any dev work in Revit and want a handy tool for viewing and running unit tests? [xUnitRevit](https://speckle.systems/blog/xunitrevit/) might be exactly what you've been looking for.

## Legal stuff

Before using any of our software or websites, please make sure you read and understand our [terms of use](https://speckle.systems/terms/), [privacy policy](https://speckle.systems/privacy/) and [trademark usage policy](https://speckle.systems/trademark/).
