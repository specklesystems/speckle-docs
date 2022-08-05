---
permalink: /
---

# Welcome!

Thanks for visiting our user guide! This is the single source of documentation on everything Speckle.

Organizations all over the world rely on our collaboration, interoperability and automation platform to deliver better buildings, faster. Speckle is a platform with endless possibilities, we'll walk you through some of its most common usage scenarios, but ultimately you'll have the flexibility to use Speckle (and your data) however you want.

## What We'll Cover

This guide provides an introduction to the key Speckle concepts you'll need to know. We'll go over what you need to install, how to [create an account](/user/quickstart.html#registration), and how to [send data](/user/ui.html#sending-data) to your first Speckle stream.

We also have a few [tutorials](https://speckle.systems/tutorials/) which provide step-by-step guidance for several common workflows (e.g. sending data Rhino -> Revit and back).

If you're a programmer wanting to learn how to build things with Speckle, head over to our [developer docs](/dev/). If you're after some in-depth reading on how Speckle works under the hood, make sure to check the [core concepts section](/dev/base).

::: tip IMPORTANT 🙌
This guide assumes you have access to a **Speckle Server**.
If you don't have one provided by your company, you can use our [free Speckle server](https://speckle.systems/getstarted/).
:::

## Our Tech

Speckle is made up of several moving parts. Before describing each in detail, let's run through them quickly.

### Speckle Web App

![image](https://user-images.githubusercontent.com/2679513/183118366-767ba483-2f65-4713-8cea-2b995befd7da.png)


The [Speckle Web App](/user/web) lets you manage and coordinate your data directly from your web browser. It includes a management interface to help you administer your various streams and a 3D model viewer to let see your projects.

### Connectors

![desktopui-send-stream](https://user-images.githubusercontent.com/7717434/106739196-c248e880-6610-11eb-8cc5-01216cc980b1.gif)

Our desktop [Connectors](/user/connectors) are plugins for some of the most popular construction industry software including Rhino, Revit, Grasshopper, Dynamo, AutoCAD, Civil3D, Unity, Blender (and more). They take care of sending and receiving data in your software (e.g. Rhino) to and from your Speckle server. The Connectors can handle almost any kind of data. Most commonly, this will be CAD and BIM data; essentially, geometry with attached metadata.

Each time the Connectors send data to your Speckle server, they also take care of transforming it from your software's native format to Speckle's own, neutral format. This makes accessing it from other software extremely easy and fast.

### Speckle Manager

![image](https://user-images.githubusercontent.com/2679513/182888937-d998604c-59ef-4cbc-bdb6-2176338d41fd.png)

The [Speckle Manager](/user/manager) is a desktop application that handles accounts and connectors on your machine. You'll need to add a Speckle account to your computer using Speckle Manager in order to be authorised to send or access data to/from a Speckle Server.

## Legal stuff

Before using any of our software or websites, please make sure you read and understand our [terms of use](https://speckle.systems/terms/), [privacy policy](https://speckle.systems/privacy/) and [trademark usage policy](https://speckle.systems/trademark/).
