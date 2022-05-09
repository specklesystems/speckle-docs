---
typora-copy-images-to: img-interop
---

# User Interface

Most of our Connectors look the same, despite working inside of different applications. Our shared user interface is currently used inside:

- Rhinoceros
- Revit
- Civil3D
- AutoCAD
- CSI Connectors

Other Connectors work slightly differently depending on which software they're used in (e.g. Grasshopper and Dynamo use a node-based environment).

Let's go on a quick graphical tour of the shared user interface to get you familiar with using Speckle.

## Main View

When launching a Connector for the first time inside a document, you'll first see a list with the latest streams available in **all your account**:

![dui2](https://user-images.githubusercontent.com/2679513/159477337-7df363f5-4d72-419f-9a67-c880b84242e6.gif)

In this same view you'll also be able to search streams, create a new stream or to add one from a URL.

### Selecting a Stream

You can select a stream in various ways. If you have access to it and it's been used recently you should see it in the main list.
We have also added a button to quickly view the stream online.

Alternatively you can search for it (by name or ID), or add it by URL.

Adding a stream by URL is very useful when you want to receive from a public stream of which you are not a collaborator.

## Stream View

After selecting a stream, you'll see the Stream View.
At the top you'll be able to see all the recent send & receive activity for the stream.
At the bottom, you can select whether you want to send or receive from it.

![dui2-stream](https://user-images.githubusercontent.com/2679513/159477977-6468748a-e73b-4be6-924b-00cb08121efb.gif)

### Sending

When sending to a stream, you'll be able to decide which branch to use and what elements to send.
Each connector has built in filters to help you select elements in ways that make the most sense for the application you're using.

#### Branch Selection

Data in a stream can be organized in branches, for instance, to have multiple design options or to store data by discipline.
The default branch is called main, you can select the branch you want to send to by using the dropdown.

If you want to create a new branch, you can do so from the [web](./web) interface.

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

#### Commit Message

When sending state in use by others, it's always good to include a message describing what you're sending.
The commit message is saved and re-used in future sends.

#### Save or Send

You can now click "Save" and these options will be saved locally in the current document for later use.

If instead you want to send already, just click on "Send", the stream will also be saved.

### Receiving

Similarly to sending data, the Receiving comes with a few options.

#### Branch Selection

Data in a stream can be organized in branches, for instance, to have multiple design options or to store data by discipline.
The default branch is called main, you can select the branch you want to receive from by using the dropdown.

If a branch has no data in it, you will not be able to use it.

#### Commit Selection

A commit is a snapshot in time of the data inside a branch. Every time you send to Speckle from a connector, a commit is created.
With the commit selection dropdown you can specify whether to receive a specific commit, or to always get the latest available for the selected branch.

If you choose to stay on the "latest" commit, you'll get a notification every time new data is sent to that branch.

If a preview is available it will be displayed when selecting a commit.

#### Save or Receive

You can now click "Save" and these options will be saved locally in the current document for later use.

If instead you are ready to receive, just click on "Receive".

## Saved Streams

Saved streams will show up under a "Saved Streams" list.

![dui2-saved](https://user-images.githubusercontent.com/2679513/159479002-ea661bad-4f43-46f9-a810-8a4780c8a056.gif)

### Menu

By clicking the three vertical dots, you'll access a menu with more actions, like viewing it online, or editing its options.

::: tip

This menu is customizable, and every Connector will have slightly different actions available.

:::

![dui2-menu](https://user-images.githubusercontent.com/2679513/159479330-0134c4ea-78fb-4d05-bb6e-e76a46bc07af.gif)

## Accounts

From Speckle 2.5.0 onwards it is possible to log into Speckle and manage your accounts directly from this user interface.

![dui2-account](https://user-images.githubusercontent.com/2679513/159479841-3cb0f858-4107-4550-bde8-abbeb1415924.gif)
