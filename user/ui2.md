---
typora-copy-images-to: img-interop
---

# User Interface

<div class="banner-ribbon">
  <span><b>Important</b>: This tutorial features V2 connectors.</span>
  <span class="next-gen">Next Gen is on its way, radically changing how connectors look and work!</span>
</div>

Most of our connectors look the same, despite working inside of different applications. Our shared user interface is currently used inside:

- Rhinoceros
- Revit
- Civil3D
- AutoCAD
- CSI connectors

Other connectors work slightly differently depending on which software they're used in (e.g. Grasshopper and Dynamo use a node-based environment).

Let's go on a quick graphical tour of the shared user interface to get you familiar with using Speckle.

## Main View

When launching a Connector for the first time inside a document, you'll first see a list with the latest projects available in **all your account**:

![dui2](https://user-images.githubusercontent.com/2679513/159477337-7df363f5-4d72-419f-9a67-c880b84242e6.gif)

In this same view you'll also be able to search projects, create a new project or to add one from a URL.

### Selecting a Project

You can select a project in various ways. If you have access to it and it's been used recently you should see it in the main list.
We have also added a button to quickly view the project online.

Alternatively you can search for it (by name or ID), or add it by URL.

Adding a project by URL is very useful when you want to receive from project of which you are not a team member but is Link Shared.

## Project View

After selecting a project, you'll see the Project View.

At the top you'll be able to see all the recent send & receive activity for the project.

At the bottom, you can select whether you want to send or receive from it.

![dui2-project](https://user-images.githubusercontent.com/2679513/159477977-6468748a-e73b-4be6-924b-00cb08121efb.gif)

### Sending

When sending to a project, you'll be able to decide which model to use and what elements to send.
Each connector has built in filters to help you select elements in ways that make the most sense for the application you're using.

![Revit_rlKM6e6qTn](https://user-images.githubusercontent.com/51519350/186396184-be4fd296-8be2-4657-89b8-943170be4304.png)

#### Model Selection

Data in a project can be organized in models, for instance, to have multiple design options or to store data by discipline.
The default model is called main, you can select the model you want to send to by using the dropdown.

If you want to create a new model, you can do so from the [web](./web) interface.

![Revit_nNrp8zDlw1](https://user-images.githubusercontent.com/51519350/186396455-838408eb-039b-4615-a2ab-2401b18b5099.png)

#### Object Selection

Each connector offers various ways to select objects from the model to send.
For instance in Revit you can send:

- everything
- elements by category
- elements by view
- elements by workset
- project information, family names and types
- manually selected elements

![dui2-send-filter](https://user-images.githubusercontent.com/2679513/139485797-bd26ef1c-9366-43a2-b14b-9c6f14dbb9bd.gif)

#### Version Message

When sending to Speckle, it's always good to include a message describing what you're sending or explaining the changes applied since the last send operation.
The version message is saved and re-used in future sends.

![Revit_NKzJqG4NoT](https://user-images.githubusercontent.com/51519350/186397873-1c889e61-2a06-467c-a073-d38ae6c0b345.gif)

#### Save or Send

You can now click "Save 💾" and these options will be saved locally in the current document for later use.

![image](https://user-images.githubusercontent.com/51519350/186397368-5e6ed7ec-c32c-40dd-a8f4-685325406d33.png)

If instead you want to send already, just click on "Send", the project will also be saved.

### Receiving

Similarly to sending data, the Receiving comes with a few options.

#### Model Selection

Data in a project can be organized in models, for instance, to have multiple design options or to store data by discipline.
The default model is called main, you can select the model you want to receive from by using the dropdown.

![image](https://user-images.githubusercontent.com/51519350/186398225-d9759a2d-6695-4aa6-a857-ae152b77eb5b.png)

If a model has no data in it, you will not be able to use it.

#### Version Selection

A version is a snapshot in time of the data inside a model. Every time you send to Speckle from a connector, a version is created.
With the version selection dropdown you can specify whether to receive a specific version, or to always get the latest available for the selected model.

If you choose to stay on the "latest" version, you'll get a notification every time new data is sent to that model.

If a preview is available it will be displayed when selecting a version.

![Revit_WrPYfd3bxG](https://user-images.githubusercontent.com/51519350/186398705-112a5491-78a9-4cbd-b311-d3b60ff109b0.gif)

#### Save or Receive

You can now click "Save" and these options will be saved locally in the current document for later use.

![image](https://user-images.githubusercontent.com/51519350/186398525-bde3349b-2193-4cb5-b26c-8d3185555304.png)

If instead you are ready to receive, just click on "Receive".

## Saved Projects

Saved projects will show up under a "Saved Projects" list.

![dui2-saved](https://user-images.githubusercontent.com/2679513/159479002-ea661bad-4f43-46f9-a810-8a4780c8a056.gif)

### Menu

By clicking the three vertical dots, you'll access a menu with more actions, like viewing it online, or editing its options.

::: tip 💡 TIP

This menu is customizable, and every Connector will have slightly different actions available.

:::

![dui2-menu](https://user-images.githubusercontent.com/2679513/159479330-0134c4ea-78fb-4d05-bb6e-e76a46bc07af.gif)

## Accounts

It is possible to log into Speckle and manage your accounts directly from this user interface.

![dui2-account](https://user-images.githubusercontent.com/2679513/159479841-3cb0f858-4107-4550-bde8-abbeb1415924.gif)

## Legacy Terminology

In the past, we used to call "streams" what we now call "projects". We've updated the terminology to make it more intuitive for new users. If you are using a legacy server, we have retained an option to switch the terminology used in the user interface to "streams", "branches" and "commits".
