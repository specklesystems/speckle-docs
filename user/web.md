# Web App

<div class="banner-ribbon">
  <span><b>Important</b>: This guide features legacy web application.</span>
  <span class="next-gen">The new Speckle web application can be found at https://app.speckle.systems </span>
</div>


## Introduction

The **Speckle Web App** is our browser-based interface for managing all things Speckle. It is your one stop shop for:

- Managing your streams and their viewing/editing permissions
- Coordinating your data among various parties & users
- Creating and editing streams
- Viewing your data in our 3D model viewer
- Managing your account

When you first visit your speckle server address (e.g. our default [general availibility server](https://app.speckle.systems)), you'll be prompted to log in or register to that server. Servers are independent of each other meaning if you are a part of multiple Speckle Servers, you'll need to create a new account for each one.

::: tip 🙌 IMPORTANT
This guide assumes you have a **Speckle Account**.
If you don't, register on our [General Availabilty Speckle server](https://app.speckle.systems).
:::

## Streams

![speckle-web-interface](https://user-images.githubusercontent.com/51519350/186161631-bf87b7f8-865a-490c-a72e-e81dae8e1102.png)

Once you're logged in, you'll be greeted by the home page which shows your [streams](/user/concepts.html#what-are-streams) and a feed of recent activity on the left.

These streams are the ones you have access to including streams you've created and streams you have been added to as a [collaborator](/user/concepts.html#who-can-i-share-them-with). Each stream shows you a brief summary of the stream including its name, the number of [branches](/user/concepts.html#branches) & [commits](/user/concepts.html#commits), when it was last updated, and who has access to it. Clicking any of the streams will take you to the details of that particular stream. You can also click the big blue button to create a new stream.

### The Streams Page

👉 Psst - need a streams refresher? [Let's go!🏃‍♂️](/user/concepts.html#what-are-streams)

On a stream page, you can browse the existing commits and view the data in our lovely 3D viewer. The most recent commit is the one you will initially see in the viewer. You can see 🔄360-preview your commits by hovering over them.

![opera_xQ0xkzHx14](https://user-images.githubusercontent.com/51519350/186161920-341a5862-b580-4cb5-aa2e-ef6bc4d6b59c.gif)

If you have _contributor_ access, you can also add new branches and commits to the stream. If you have _owner_ access, you will see additional buttons which will let you edit the name / description, configure link sharing, and manage collaborators.

By clicking on any of the latest commits you'll be taken to that commit's page.

## Branches

🤔 Wait, what were branches again? [We gotchu!](/user/concepts.html#what-are-branches)

Each stream contains a branching-icon on the sidebar to help you easily switch between a stream's different branches. By default, each stream will contain only one branch, called **main**.

![branches](https://user-images.githubusercontent.com/51519350/186162317-958b49d9-82c2-403a-882e-1530645248e4.png)

By clicking on the **Branches** button, all existing branches for the current stream will be listed.

![ezgif-5-c718dccbf0](https://user-images.githubusercontent.com/51519350/186162858-fa139544-4b47-4324-aaba-674161688288.gif)

From here you can access each branch's page or create new branches.
![opera_HpsebHQzLo](https://user-images.githubusercontent.com/51519350/186163315-08a7ca29-8f03-4c75-b486-280c864e6692.gif)

### The Branches Page

By going even deeper, you can access a page for a single branch in your stream. This will display all of the commits that have been pushed to it, and you can edit the branch name and description too. This looks like:

![image](https://user-images.githubusercontent.com/51519350/186163938-4a71677f-874b-4b62-96be-f7595f9ae3e9.png)

## The Commit Page

👀 Not sure what commits are? [Check this out!](/user/concepts.html#commits)

Clicking on a particular commit will take you to a new page where you can view the commit in the viewer and explore the commit object.

The "Expand Data View" option on the sidebar allows you to explore the commit object. The top level [_Base_](/user/concepts.html#the-base-object) is the root commit object and each item within it is a property. Properties can either be simple values (like the id, speckle type, and children count), another object, or a list of objects.

![commit-page](https://user-images.githubusercontent.com/51519350/186190430-6bc2a26e-59bd-4588-8c27-44f77db5cc7d.png)

Clicking on one of these lists will expand it and show you all the objects nested within it. If a nested object is a "Referenced Object", this means it is a separate object that hasn't been loaded yet. You can click it to load the referenced object and get more details. Clicking on the little arrow button next to an object will open that particular object in a new page and display it in the viewer.

![opera_dh6fdPSMEN](https://user-images.githubusercontent.com/51519350/186192655-ac93da0a-bc6b-4594-807c-7f3a7850ceb5.gif)

### Commit Received Receipts

The most recent update to Commits was Received Receipts feature: log of all the times users received a commit through Speckle connector. Each time a registered user receives specific commit, the record is being created, containing information on who received the data, when and in which software.

![opera_HIkQ1lQfwE](https://user-images.githubusercontent.com/51519350/186360257-080a43f8-39bd-4213-81d1-46fd51fa540e.gif)

The Received Receipts are displayed alongside commit description in the web interface, and every receive-event makes a new record in your Activity Feed.

![receive-record](https://user-images.githubusercontent.com/51519350/186184861-9dafcf20-effa-410a-92b9-76b52a321bc6.png)

## 3D Viewer

Speckle's built-in **3D Viewer** lets you visualise and interrogate your geometric data right in the browser. You can use the viewer to visualise a whole commit or just a specific object.

Use your left mouse button to rotate the view around and use the right mouse button to pan. Double clicking on an object will bring it into focus and double clicking on the background will bring the whole scene into view.

Try playing with our embedded 3D viewer below to get a feel for navigating a model and inspecting its elements in your browser.

<iframe src="https://app.speckle.systems/projects/a632e7a784/models/1b47b19207#embed=%7B%22isEnabled%22%3Atrue%7D" width=600 height=400></iframe>

The toolbar at the bottom edge of the viewer allows you to:

1. Select a canonical view (such as Top, Front, Left)
2. Focus the whole scene
3. Cut the view with a section plane
4. Open a help menu if you need a reminder of the controls

### Embedding the 3D viewer

You can easily embed any stream, branch, commit or object directly from the **web app**. To do so, just follow these steps:

::: warning 📌 Please Note
Your stream must be made **Link Shared** in order for the embedded viewer to properly load.
:::

1. In the **_web app_**, go to a stream page containing _geometric data_.

   ![image](https://user-images.githubusercontent.com/51519350/186363636-2b94f885-4afd-4fea-bfea-ac231d909729.png)

1. Open any of the commits of the stream, for example, the latest one at the top of the page

   ![image](https://user-images.githubusercontent.com/51519350/186363745-0efab129-c77a-437a-b1af-eb58107e17ee.png)

1. In the commit page you'll see the 3D viewer and in the top right corner of the page you'll see a sharing button

   ![share-button](https://user-images.githubusercontent.com/51519350/186364448-f109c15d-dd4e-428a-9566-e179d2c9f41a.png)

1. Click it and you'll be presented with the sharing popup

   ![embed-options (2)](https://user-images.githubusercontent.com/51519350/186365051-5eadc0cb-ade8-4997-9847-a0761fbb5580.png)

Sharing pop
Here you can customize the embed viewer and copy the `iframe` code that you can paste in any HTML document, or the link to the stream or commit page in the Web app.

The resulting `iframe` would be a viewer like the one [above ☝🏼](#_3d-viewer)

## Globals

Want to keep track of project information, design values, notes, or any other general info alongside your geometry? Each stream can have a set of global variables which can do just that! These globals could be things like site region, building height, number of floors, maximum areas, summer / winter temperatures, etc - your imagination is the limit!

These globals can then be accessed from your scripts or applications like any other Speckle data. You can plug them into calculations or pull them into reports or spreadsheets. You can also look back at the history and see who changed what and why.

### Creating and Editing

To build or edit a stream's globals, click the "Globals" button in the stream sidebar.

![globals button on stream page](/ueser/img/web/globals-button.png)

This will take you to the interactive globals editor. Here, you can add new fields with the ➕ button and fill in their info. You also have a toolbar on the top right to "clear" (delete all the fields / groups), "reset all" (undo all your changes), and "save" your changes with a message.

![globals ui](/ueser/img/web/globals-info.png)

Any field can be transformed into a group by clicking the box button on the right. Any group can also be flattened by clicking the collapse button on the right of its name. You can drag and drop any field or group anywhere you want within the editor to build the structure you want!

![editing your globals](https://i.imgur.com/E2HkaJ1.gif)

If you need to delete a field or group, toggle on "delete" mode and click the big red buttons.

![deleting globals](/ueser/img/web/globals-delete.gif)

Each time you hit "save", you'll be prompted to add a message along with your changes. This will be saved to the chronological history which you can see at the bottom of the page. You can click on any of these messages to go back see the globals from that point in time.

![globals history](/ueser/img/web/globals-history.png)

::: tip 📝 NOTE

Globals currently do not support detached objects. Let us know on the forum if this is something you would want!

:::

### Receiving Globals

The quickest way to grab your globals is to use the Grasshopper or Dynamo connectors. You can receive the globals using their URL just like you would any other stream, branch, or commit.

![receive globals in grasshopper](/ueser/img/web/globals-gh-receive.gif)

If you want to get your globals using code, you can do this in the same way you would receive a commit. Under the hood, the globals exist in a branch called `globals`. Each time you save the globals, you create a new commit on this branch. The following snippet is a complete example of receiving the latest version of your globals using python:

```py
# initialise and authenticate your client
stream_id = "62e5ff6a2b"
account = get_default_account()
client = SpeckleClient(host=account.serverInfo.url)
client.authenticate_with_account(account)
transport = ServerTransport(client=client, stream_id=stream_id)

# get the `globals` branch
branch = client.branch.get(stream_id, "globals")

# get the latest commit
latest_commit = branch.commits.items[0]

# receive the globals object
globs = operations.receive(latest_commit.referencedObject, transport)
```

## Profile

Click on your profile image to head to the **Profile** management page. If you haven't added a profile pic yet, we've auto-generated you a nice little robot avatar🤖 (you're welcome :smile:)

From your profile page, you can edit your personal details and manage your authorised applications in the "Your Apps" section. These are the applications that you have granted access to your streams and profile. On this page, you can make sure you recognise all the apps and easily revoke access to any apps you no longer want to authorise.

![speckle-profile](https://user-images.githubusercontent.com/51519350/186372877-121c4490-36dc-4aef-a769-d110e63ee012.png)

Further down the page are some more advanced options intended for developers. You can check out the GraphQL Explorer where you can explore the API and interact with your live data. You can generate Personal Access Tokens which are like passwords you can use to authenticate in your scripts and apps. You can also register your own Apps so other people on the server can use them too.

## Admin

If you're a server admin, you'll also have access to an admin dashboard.

![image](https://user-images.githubusercontent.com/2679513/123423388-68dd5800-d5b7-11eb-9116-4365d476a294.png)

The dashboard currently shows key metrics such as total number of users, streams, commits and objects. We’ve also included historical data on said metrics which can help you identify nicely how active your server is by actually seeing how many streams, commits and objects are created each month.

![image](https://user-images.githubusercontent.com/2679513/123423608-ad68f380-d5b7-11eb-9957-385bdd6be54f.png)

The admin page will be extended in the future to give you even more control and insights on your server.

There’s also an api endpoint for this, so you can request the data behind the graphs and use it wherever you want to!

For this, you will need a personal access token generated by an admin user that includes the `server:stats` scope.

![image](https://user-images.githubusercontent.com/2679513/123423856-f7ea7000-d5b7-11eb-9c65-f32cd5cbc9ae.png)
