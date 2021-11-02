# Core Concepts

This section goes into the details on how your data is sent to and stored in Speckle. Whether you're new to Speckle or just need a refresher, this is a great place to start!

### A Quick Note on Terminology

We've tried to keep this guide straightforward, removing technical language unless it's absolutely necessary. It's worth noting that whenever we mention the terms **data**, **objects** or **elements**, we're really referring to the same thing. Speckle is built to handle all kinds of data, whether CAD geometry, BIM elements (geometry + metadata) or pure data (text, numbers, etc).

### Streams, Branches and Commits

Your Speckle data is organised using a robust and sophisticated collaboration approach that's been adopted universally in software development. To keep things simple, we're using the same concepts and terminology, known as **Streams**, **Branches** and **Commits**.

To use Speckle you only really need to know what a stream is. Branches and commits are slightly more advanced, but will add a lot of flexibility and control to your future collaborative workflows.

## Streams

### What are streams

The main data structure in Speckle is the **stream**.

A stream is simply a collection of data with some additional information to help you manage and retrieve them. Each stream is assigned a `streamId` which uniquely identifies the stream on a server. You can also assign a name and description to help keep track of your streams.

A stream also lets you manage permissions: it has a list of collaborators including an owner and additional reviewers and contributors which the owner has chosen to share the stream with.

### What do streams contain?

A stream can contain anything from a handful of objects to a whole building model. You are free to add as much or as little data to a single stream and create as many streams as you'd like. Some examples of what might be contained within a stream are:

- A layer in a CAD application
- A set of calculation results
- A workset in Revit
- A selection of objects from Grasshopper
- A structural model

A stream also contains further options for managing your data using  **branches** and **commits**. Don't worry about these yet - we'll cover them in the following sections.

### Who can I share streams with?

Streams can be either Public or Private:;

- **Public**: Anyone with the link or `streamId` can view the stream
- **Private**: People need to be added as _collaborators_ to the stream to access it

Anyone invited as a collaborator can have varying levels of access to the stream, depending on which role you assign them:

- **Owner**: Full access, including deletion rights and editing user permissions.
- **Contributor**: Can edit the stream's contents (create new branches and commits) but cannot edit stream details (name and description) or manage permissions.
- **Reviewer**: View-only access to a stream.

### How do I use streams?

Streams are the main mechanism by which data is shared between people and applications. For example, you could create a stream in Revit and send that data to your server. Then, any of your colleagues with access to that stream could view the data in the browser or receive the data in Grasshopper, Rhino, Revit, etc.

If any of your colleagues have _collaborator_ access, they are also free to make their own changes and send their changes to the stream. You can then receive those changes from the stream in your original model to see the changes reflected.

To see step-by-step guides on how to send your data between various supported applications, check out our [tutorials](https://speckle.systems/tutorials/).

## Branches

### What are branches?

Branches give you an extra layer of organisation within a stream. Speckle users frequently use branches to carry out parallel studies / design options.

All streams start with a single default branch called `main`. If you would like to "branch" off from this `main` branch and work on multiple different versions of your data in parallel or if you want to segment separate parts of your data from each other, that is where branches come in.

![branch menu from the Speckle frontend](https://user-images.githubusercontent.com/7717434/107365334-8dd3a180-6ad4-11eb-8d6f-47bc42b80da4.png)

### How do I use branches?

You can add as many additional branches to your streams as you would like. Some Connectors and the Speckle Web App give you the option of creating new branches and switching between them.

Let's say you have a very large model you want to add to a single stream, but your collaborators from different disciplines don't want to receive the whole model every time. You could split the model up into different branches: `Structural`, `MEP`, `Architecture`.

Or perhaps you have a complex model that encompasses a site with multiple separate buildings. You could still contain the whole model in a single stream, but create a separate branch for each building: `Building A`, `Building B`, `Building C`.

Maybe you're working on a smaller scale and you would like to present a different facade options to the client. The stream could be split into `Option A`, `Option B`, and `Option C` which you could then easily switch between to explore the different options in your next meeting.

If you happen to be familiar with `git`, you might be wondering _"Can I also merge the content of a branch into another one?"_. The answer is yes, but currently that can only happen inside one of the AEC software for which we have connectors. The merged data can then be re-sent to an existing or new branch.

## Commits

### What are commits?

Commits are essentially a snapshot of your data - a point in time where you have "committed" your changes. They allow you to track the changes in your stream and easily see who changed what and when. The great thing about commits is that they create a timeline of all the changes your stream goes through and give you the possibility of going back in time, resetting your model to any version - whenever you want!

Each time you send data to Speckle, you are automatically creating a new commit which contains all the objects in your stream along with additional information such as the time, date, and author of the commit. You can also add an optional _commit message_ which is a short description of what you've changed. Like a stream, each commit is assigned a generated `commitId` which can be used to identify and retrieve it. You can go back in time and look at the history of your stream through the series of commits.

![a commit card from the Speckle frontend](https://user-images.githubusercontent.com/7717434/107365302-814f4900-6ad4-11eb-894f-3094863ad7c6.png)

Say goodbye to saving your files as "AM_Project_Design-final", "AM_Project_Design-final-final", "AM_Project_Design-final-final-latest"...!

::: tip IMPORTANT 🙌
Please Note: Commits aren't editable, you can change their message but not their content. Sent the wrong data? No problem - simply send the correct data and work from that commit instead.
:::

### How do I use commits?

If you have used a connector and you've sent data to a stream, you've already used them! Each time data is sent to a stream, a commit is created. To help you keep track of the changes in your stream, it is a good idea to add a commit message that succinctly describes what the commit contains. Some of the connectors pre-populate a default commit message for you, but you are still free to write your own to add more detail.

When receiving data in a connector, you have the option of either staying synced with the latest commit or receiving a specific commit based on the `commitId`. If you choose to stay on the latest commit, you'll see a notification when someone else has sent new data to the stream. When you see this, you'll be able to use the receive function to get the new commit and update your file.

### Commit Received Receipts

The most recent update to Commits was Received Receipts feature: log of all the times users received a commit through Speckle connector. Each time a registered user receives specific commit, the record is being created, containing information on who received the data, when and in which software.

![image-commit-data-rr](./img/image-commit-data-rr.png)
![image-commit-data-rr-popup](./img/image-commit-data-rr-popup.png)

The Received Receipts are displayed alongside commit description in the web interface, and every receive-event makes a new record in your Activity Feed.

![image-feed-rr](./img/image-feed-rr.png)

## What Next?

&nbsp;

For some users, this is their first time hearing about streams, branches and commits. Your head must be spinning!

However, some users can't get enough of this and are ready to learn all about some of our more advanced topics. For these users, we've got you covered! See our Advanced Concepts page for more.