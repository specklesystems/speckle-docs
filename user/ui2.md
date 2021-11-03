---
typora-copy-images-to: img-interop
---

# User Interface NEW!

::: tip IMPORTANT ⚠️
This new User Interface is currently in beta testing, add your feedback on the [forum](https://speckle.community/t/new-desktopui-in-alpha-testing/1851)!
:::

Most of our Connectors look the same, despite working inside of different applications. Our shared user interface is currently used inside:

- McNeel Rhinoceros
- Autodesk Revit
- Autodesk Civil3D
- Autodesk AutoCAD
- CSI ETABS

Other Connectors work slightly differently depending on which software they're used in (e.g. Grasshopper and Dynamo use a node-based environment).

Let's go on a quick graphical tour of the shared user interface to get you familiar with using Speckle.

## Main View

When launching a Connector for the first time inside a document, you'll first see a list with the latest streams available in your account:

![dui2-select](https://user-images.githubusercontent.com/2679513/139484851-8038b1c3-e0a5-4585-892e-bc870974f422.gif)

In this same view you'll also be able to switch account, search streams, create a new stream or to add one from a stream URL.

### Selecting a Stream

You can select a stream in various ways. If you have access to it and it's been used recently you should see it in the main list.
Note how, by hovering on the list, you can choose whether to send or receive data from it. We have also added a button to view the stream online.

Alternatively you can search for it (by name or ID), or add it by URL.

Adding a stream by URL is very useful when you want to receive from a public stream of which you are not a collaborator.

## Stream Options

After selecting a stream, you'll be able to configure what to send to it or what to receive.

![dui2-edit](https://user-images.githubusercontent.com/2679513/139484996-20cb05d7-1298-47e1-89e7-284b44edb2fa.gif)

### Sending

In order to send data to your stream, you'll need to tell Speckle which elements should be sent. Is it:

- Just the items you've selected?
- A specific layer(s) in Rhino?
- A specific Revit view?

The Connectors are built to help you select objects in ways that make the most sense for the application you're using.

#### Branch Selection

Data in a stream can be organized in branches, for instance, to have multiple design options or to store data by discipline.
The default branch is called main, you can select the branch you want to send to by using the dropdown.

If you want to create a new branch, you can do so from the [web](./web) interface.

![image](https://user-images.githubusercontent.com/2679513/139489755-d9e05fe6-76af-47f3-ae99-b0934f1720da.png)

#### Object Selection

Each connector offers various ways to select objects from the model to send.
For instance you could send AutoCAD geometry by selection, Revit elements by Category or Rhino objects by Layer.

![dui2-send-filter](https://user-images.githubusercontent.com/2679513/139485797-bd26ef1c-9366-43a2-b14b-9c6f14dbb9bd.gif)

#### Save or Quick Send

You can now click "Save" and these options will be saved locally in the current document for later use.

If instead you're after a one-off send, just click on "Quick Send".

![image](https://user-images.githubusercontent.com/2679513/139485991-3e5a8b73-9d3b-4da2-a487-1bb84d23e6ca.png)

### Receiving

Similarly to sending data, the Receiving comes with a few options.

#### Branch Selection

Data in a stream can be organized in branches, for instance, to have multiple design options or to store data by discipline.
The default branch is called main, you can select the branch you want to receive from by using the dropdown.

If a branch has no data in it, you will not be able to use it.

![image](https://user-images.githubusercontent.com/2679513/139489660-1588c96c-c827-4687-9392-cb2a26a032a1.png)

#### Commit Selection

A commit is a snapshot in time of the data inside a branch. Every time you send to Speckle from a connector, a commit is created.
With the commit selection dropdown you can specify whether to receive a specific commit, or to always get the latest available for the selected branch.

If you choose to stay on the "latest" commit, you'll get a notification every time new data is sent to that branch.

If a preview is available it will be displayed when selecting a commit.

#### Save or Quick Receive

You can now click "Save" and these options will be saved locally in the current document for later use.

If instead you're after a one-off receive, just click on "Quick Receive".

![image](https://user-images.githubusercontent.com/2679513/139487243-c0f3637f-2f72-486c-ad1b-7bd55b788b1a.png)

## Saved Streams

Saved streams will show up under a "Saved Streams" tab. The tab is hidden if you don't have any.

![image](https://user-images.githubusercontent.com/2679513/139488208-fbadee2c-7420-44ba-acca-37effe266961.png)

### Menu

By clicking on the blue button in each of them you'll instantly send or receive using the specified options.
If sending, you'll have the option to add a "Commit Message", which is just a brief explanation of what you are sending and why.

By clicking the three vertical dots, you'll access a menu with more actions, like viewing it online, removing it or editing its options.

::: tip

This menu is customizable, and every Connector will have slightly different actions available.

:::

![dui2-send-edit](https://user-images.githubusercontent.com/2679513/139488772-80fa5715-7b88-451e-9dcd-326cfe368660.gif)
