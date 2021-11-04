# Speckle Web App

## Introduction

The **Speckle Web App** is our browser-based interface for managing all things Speckle. It is your one stop shop for:

- Managing your streams and their viewing / editing permissions
- Coordinating your data among various parties & users
- Creating and editing streams
- Viewing your data in our 3D model viewer
- Managing your account
- Sharing your data with others

When you first visit your speckle server address (e.g. our default [speckle.xyz server](https://speckle.xyz)), you'll be prompted to log in or register to that server. Servers are independent of each other meaning if you are a part of multiple Speckle Servers, you'll need to create a new account for each one.

::: tip IMPORTANT 🙌
This guide assumes you have access to a **Speckle Server**.
If you don't have one provided by your company, you can use our [free Speckle server](https://speckle.systems/getstarted/).
:::

## Streams

![image-20210322192558215](./img/web/image-20210322192558215.png)

Once you're logged in, you'll be greeted by the home page which shows your [streams](/user/concepts.html#what-are-streams) and a feed of recent activity on the left.

These streams are the ones you have access to including streams you've created and streams you have been added to as a [collaborator](/user/concepts.html#who-can-i-share-them-with). Each stream shows you a brief summary of the stream including its name, the number of [branches](/user/concepts.html#branches) & [commits](/user/concepts.html#commits), when it was last updated, and who has access to it. Clicking any of the streams will take you to the details of that particular stream. You can also click the big blue button to create a new stream.

### The Streams Page

👉 Psst - need a streams refresher? [Let's go!](/user/concepts.html#what-are-streams)

On a stream page, you can browse the existing commits and view the data in our lovely 3D viewer. The most recent commit is the one you will initially see in the viewer.

![image-20210322192409067](./img/web/image-20210322192409067.png)

If you have _contributor_ access, you can also add new branches and commits to the stream. If you have _owner_ access, you will see additional buttons which will let you edit the name / description, configure link sharing, and manage collaborators.

By clicking on any of the latest commits you'll be taken to that commit's page.

::: tip NOTE

The list of recent commits by default refers to the `main` branch. You can swap branches by using the dropdown at the top of the page.

![image-20210322192914688](./img/web/image-20210322192914688.png)

:::

## Branches

🤔 Wait, what were branches again? [We gotchu!](/user/concepts.html#what-are-branches)

Each stream contains a little branching-icon button to help you easily switch between a stream's different branches. By default, each stream will contain only one branch, called **main**.

![image-20210322193000611](./img/web/image-20210322193000611.png)

By clicking on the **Branches** button you'll be taken to a page that lists all existing branches for the current stream.

![image-20210322193139643](./img/web/image-20210322193139643.png)

From here you can access each branch's page or create new branches.

### The Branches Page

By going even deeper, you can access a page for a single branch in your stream. This will display all of the commits that have been pushed to it, and you can edit the branch name and description too. This looks like:

![image-20210322193547220](./img/web/image-20210322193547220.png)

The latest Received Receipts feature allows to display all the receive-events next to each commit - records of receiving the commit by a registered user through Speckle connector. You can view the full list of records by clicking on user avatars.

![image-brach-rr](./img/web/image-brach-rr.png)
![image-brach-rr-popup](./img/web/image-brach-rr-popup.png)

## The Commit Page

👀 Not sure what commits are? [Check this out!](/user/concepts.html#commits)

Clicking on a particular commit will take you to a new page where you can view the commit in the viewer and explore the commit object.

The "Data" section on this page allows you to explore the commit object by expanding it. The top level [_Base_](/user/concepts.html#the-base-object) is the root commit object and each item within it is a property. Properties can either be simple values (like the id, speckle type, and children count), another object, or a list of objects.

![object expander in speckle web](https://user-images.githubusercontent.com/7717434/107505427-955a7f80-6b94-11eb-8624-b6c694a568b4.png)

Clicking on one of these lists will expand it and show you all the objects nested within it. If a nested object is a "Referenced Object", this means it is a separate object that hasn't been loaded yet. You can click it to load the referenced object and get more details. Clicking on the little arrow button next to an object will open that particular object in a new page and display it in the viewer.

![web-commit-objects](https://user-images.githubusercontent.com/7717434/107504494-4b24ce80-6b93-11eb-8a4d-1895d55c32e0.gif)

## 3D Viewer

Speckle's built-in **3D Viewer** lets you visualise and interrogate your geometric data right in the browser. You can use the viewer to visualise a whole commit or just a specific object.

Use your left mouse button to rotate the view around and use the right mouse button to pan. Double clicking on an object will bring it into focus and double clicking on the background will bring the whole scene into view.

Try playing with our embedded 3D viewer below to get a feel for navigating a model and inspecting its elements in your browser.

<iframe src="https://speckle.xyz/embed?stream=a632e7a784&branch=roof" width=600 height=400></iframe>

The toolbar at the bottom edge of the viewer allows you to:

1. Select a canonical view (such as Top, Front, Left)
2. Focus the whole scene
3. Cut the view with a section plane
4. Open a help menu if you need a reminder of the controls

### Embedding the 3D viewer

You can easily embed any stream, branch, commit or object directly from the **web app**. To do so, just follow these steps:

::: warning Please note
Your stream must be made **public** in order for the embedded viewer to properly load.
:::

1. In the **_web app_**, go to a stream page containing _geometric data_.

   ![Stream page with geometric data](./img/web/embedViewer-StreamPage.png)

2. Press the _play_ button to load the viewer. The viewer toolbar should appear in the bottom.

   ![Viewer toolbar](./img/web/embedViewer-Toolbar.png)

3. You'll find the share button on the left-hand side.

   ![Viewer embed button](./img/web/embedViewer-embedButton.png)

4. Click it and you'll be provided with 2 options:

   ![Viewer embed options](./img/web/embedViewer-embedOptions.png)

   - Copy `iframe`: Will copy the `iframe` code required to paste on any html document.
   - Copy `url`: Will copy the `url` of the embed viewer.

The result would be a viewer like the one [above ☝🏼](#_3d-viewer)

## Globals

Want to keep track of project information, design values, notes, or any other general info alongside your geometry? Each stream can have a set of global variables which can do just that! These globals could be things like site region, building height, number of floors, maximum areas, summer / winter temperatures, etc - your imagination is the limit!

These globals can then be accessed from your scripts or applications like any other Speckle data. You can plug them into calculations or pull them into reports or spreadsheets. You can also look back at the history and see who changed what and why.

### Creating and Editing

To build or edit a stream's globals, click the "Globals" button in the stream sidebar.

![globals button on stream page](./img/web/globals-button.png)

This will take you to the interactive globals editor. Here, you can add new fields with the ➕ button and fill in their info. You also have a toolbar on the top right to "clear" (delete all the fields / groups), "reset all" (undo all your changes), and "save" your changes with a message.

![globals ui](./img/web/globals-info.png)

Any field can be transformed into a group by clicking the box button on the right. Any group can also be flattened by clicking the collapse button on the right of its name. You can drag and drop any field or group anywhere you want within the editor to build the structure you want!

![editing your globals](https://i.imgur.com/E2HkaJ1.gif)

If you need to delete a field or group, toggle on "delete" mode and click the big red buttons.

![deleting globals](./img/web/globals-delete.gif)

Each time you hit "save", you'll be prompted to add a message along with your changes. This will be saved to the chronological history which you can see at the bottom of the page. You can click on any of these messages to go back see the globals from that point in time.

![globals history](./img/web/globals-history.png)

::: tip NOTE

Globals currently do not support detached objects. Let us know on the forum if this is something you would want!

:::

### Receiving Globals

The quickest way to grab your globals is to use the Grasshopper or Dynamo connectors. You can receive the globals using their URL just like you would any other stream, branch, or commit.

![receive globals in grasshopper](./img/web/globals-gh-receive.gif)

If you want to get your globals using code, you can do this in the same way you would receive a commit. Under the hood, the globals exist in a branch called `globals`. Each time you save the globals, you create a new commit on this branch. The following snippet is a complete example of receiving the latest version of your globals using python:

```py
# initialise and authenticate your client
stream_id = "62e5ff6a2b"
account = get_default_account()
client = SpeckleClient(host=account.serverInfo.url)
client.authenticate(token=account.token)
transport = ServerTransport(client, stream_id)

# get the `globals` branch
branch = client.branch.get(stream_id, "globals")

# get the latest commit
latest_commit = branch.commits.items[0]

# receive the globals object
globs = operations.receive(latest_commit.referencedObject, transport)
```

## Profile

Click on your profile image to head to the **Profile** management page. If you haven't added a profile pic yet, we've auto-generated you a nice little robot avatar (you're welcome :smile:)

From your profile page, you can edit your personal details and manage your authorised applications in the "Your Apps" section. These are the applications that you have granted access to your streams and profile. On this page, you can make sure you recognise all the apps and easily revoke access to any apps you no longer want to authorise.

![profile page on speckle web](https://user-images.githubusercontent.com/7717434/107490504-e14ff900-6b81-11eb-9fe5-2ae7297090f9.png)

Further down the page are some more advanced options intended for developers. You can check out the GraphiQL Explorer where you can explore the API and interact with your live data. You can generate Personal Access Tokens which are like passwords you can use to authenticate in your scripts and apps. You can also register your own Apps so other people on the server can use them too.

## Admin

If you're a server admin, you'll also have access to an admin dashboard.

![image](https://user-images.githubusercontent.com/2679513/123423388-68dd5800-d5b7-11eb-9116-4365d476a294.png)

The dashboard currently shows key metrics such as total number of users, streams, commits and objects. We’ve also included historical data on said metrics which can help you identify nicely how active your server is by actually seeing how many streams, commits and objects are created each month.

![image](https://user-images.githubusercontent.com/2679513/123423608-ad68f380-d5b7-11eb-9957-385bdd6be54f.png)

The admin page will be extended in the future to give you even more control and insights on your server.

There’s also an api endpoint for this, so you can request the data behind the graphs and use it wherever you want to!

For this, you will need a personal access token generated by an admin user that includes the `server:stats` scope.

![image](https://user-images.githubusercontent.com/2679513/123423856-f7ea7000-d5b7-11eb-9c65-f32cd5cbc9ae.png)
