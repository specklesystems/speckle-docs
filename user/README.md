---
permalink: /
---

# Welcome!

Thanks for visiting our user guide! This is the single source of documentation on everything Speckle.

Organizations all over the world rely on our collaboration, interoperability and automation platform to deliver better buildings, faster. Speckle is a platform with endless possibilities, we'll walk you through some of its most common usage scenarios, but ultimately you'll have the flexibility to use Speckle (and your data) however you want.

## What We'll Cover

This guide provides an introduction to the key Speckle concepts you'll need to know. We'll go over what you need to install, how to [create an account](/user/quickstart.html#registration), and how to [send data](/user/ui.html#sending-data) to your first Speckle project.

We also have a few [tutorials](https://speckle.systems/tutorials/) that provide step-by-step guidance for several common workflows (e.g. sending data Rhino -> Revit and back).

If you're a programmer wanting to learn how to build things with Speckle, head over to our [developer docs](/dev/). If you're after some in-depth reading on how Speckle works under the hood, make sure to check the [core concepts section](/dev/base).

::: tip IMPORTANT 🙌
This guide assumes you have access to a **Speckle Server**.
If you don't have one provided by your company, you can use our [free Speckle server](https://speckle.systems/getstarted/).
:::

## Our Tech

Speckle is made up of several moving parts. Before describing each in detail, let's run through them quickly.

### Speckle Web App

[![Web App Video](https://img.youtube.com/vi/QI5pVV1GCNs/maxresdefault.jpg)](https://www.youtube.com/watch?v=QI5pVV1GCNs)

The [Speckle Web App](https://app.speckle.systems/) lets you manage and coordinate your data directly from your web browser. It includes a management interface to help you administer your various projects and a 3D model viewer to let see your projects.

### Connectors

![desktopui-send-stream](https://user-images.githubusercontent.com/51519350/185949603-bdc88a6a-d7e9-416b-9263-ea5b693604c8.gif)

Our desktop [connectors](/user/connectors) are plugins for some of the most popular construction industry software including Rhino, Revit, Grasshopper, Dynamo, AutoCAD, Sketchup, Civil3D, Unity, Blender (and more). They take care of sending and receiving data in your software (e.g. Rhino) to and from your Speckle server. The connectors can handle almost any kind of data. Most commonly, this will be CAD and BIM data; essentially, geometry with attached metadata.

Each time the connectors send data to your Speckle server, they also take care of transforming it from your software's native format to Speckle's own, neutral format. This makes accessing it from other software extremely easy and fast.

### Speckle Manager

![Speckle-Manager](https://user-images.githubusercontent.com/51519350/185951596-c3b4b52b-c1df-4199-94fd-61246f6227c2.gif)

The [Speckle Manager](/user/manager) is a desktop application that handles accounts and connectors on your machine. You'll need to add a Speckle account to your computer using Speckle Manager in order to be authorised to send or access data to/from a Speckle Server.

## Legal stuff

Before using any of our software or websites, please make sure you read and understand our [terms of use](https://speckle.systems/policy/terms/), [privacy policy](https://speckle.systems/policy/privacy) and [trademark usage policy](https://v1.speckle.systems/trademark/).
