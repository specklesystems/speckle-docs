# Core Concepts

This section goes into the details on how your data is sent to and stored in Speckle. Whether you're new to Speckle or just need a refresher, this is a great place to start!

## A Quick Note on Terminology

We've tried to keep this guide straightforward, removing technical language unless it's absolutely necessary. It's worth noting that whenever we mention the terms **data**, **objects** or **elements**, we're really referring to the same thing. Speckle is built to handle all kinds of data, whether CAD geometry, BIM elements (geometry + metadata) or pure data (text, numbers, etc).

## Projects, Models and Versions

Your Speckle data is organised using a robust and sophisticated collaboration approach that's been adopted universally in software development. To keep things simple, we're using the same concepts and terminology, known as **projects**, **models** and **versions**.

To use Speckle you only really need to know what a project is. models and versions are slightly more advanced, but will add a lot of flexibility and control to your future collaborative workflows.

## Projects

### What are Projects?

The main data structure in Speckle is the **project**.

A project is simply a collection of data with some additional information to help you manage and retrieve them. Each project is assigned a `projectId` which uniquely identifies the project on a server. You can also assign a name and description to help keep track of your projects.

A Project also lets you manage permissions: it has a list of collaborators including an owner and additional reviewers and contributors which the owner has chosen to share the Project with.

### What do Projects contain?

A project can contain anything from a handful of objects to a whole building. You are free to add as much or as little data to a single project and create as many projects as you'd like. Some examples of what might be contained within a project are:

- A layer in a CAD application
- A set of calculation results
- A workset in Revit
- A selection of objects from Grasshopper
- A structural model

A project also contains further options for managing your data using **models** and **versions**. Don't worry about these yet - we'll cover them in the following sections.

### Who can I share Projects with?

Projects can be either Private, Link Shared or Discoverable;

- **Private**: People need to be added to the project team to access it
- **Link Shared**: Anyone with the link or `projectId` can view the project
- **Discoverable**: The project may be offered for discovery via UI or API without knowledge of the `projectId` or specific permissions

Anyone invited as a team member can have one of 3 levels of access to the project, depending on which role you assign them:

- **Owner**: Full access, including deletion rights and editing user permissions.
- **Editor**: Can edit the project's contents (create new Models and Versions) but cannot edit project details (name and description) or manage permissions.
- **Viewer**: View-only access to a project.

### How do I use Projects?

Projects are the main mechanism by which data is shared between people and applications. For example, you could create a project in Revit and send that data to your server. Then, any of your colleagues with access to that project could view the data in the browser or receive the data in Grasshopper, Rhino, Revit, etc.

If any of your colleagues are a team member with Editor access, they are also free to make their own changes and send their changes to the project. You can then receive those changes from the project in your original model to see the changes reflected.

To see step-by-step guides on how to send your data between various supported applications, check out our [tutorials](https://speckle.systems/tutorials/).

## Models

### What are Models?

Models give you an extra layer of organisation within a project. Speckle users frequently use models to carry out parallel studies / design options., define different disciplines, or to separate out different parts of a project that may represent different responsibilities or ownership.

All projects start with a single default model, if you do not name this it may be referenced as `main`. If you would like to "model" off from this `main` model and work on multiple different versions of your data in parallel or if you want to segment separate parts of your data from each other, that is where Models come in.

![Model menu from the Speckle frontend](https://user-images.githubusercontent.com/7717434/107365334-8dd3a180-6ad4-11eb-8d6f-47bc42b80da4.png)

### How do I use Models?

You can add as many additional models to your projects as you would like. Speckle Web App gives you the option of creating new models and switching between them.

Let's say you have a very large design you want to add to a single project, but your collaborators from different disciplines don't want to receive the whole design every time. You could split the design up into different models: `Structural`, `MEP`, `Architecture`.

Or perhaps you have a complex design that encompasses a site with multiple separate buildings. You could still contain the whole design in a single project, but create a separate model for each building: `Building A`, `Building B`, `Building C`.

Maybe you're working on a smaller scale and you would like to present different facade options to the client. The project could be split into `Option A`, `Option B`, and `Option C` models which you could then easily switch between to explore the different options in your next meeting.

If you happen to be familiar with `git`, you might be wondering _"Can I also merge the content of a model into another one?"_. The answer is yes, but currently that can only happen inside one of the AEC software for which we have connectors or prgammatically using our SDKs. The merged data can then be re-sent to an existing or new model.

## Versions

### What are Versions?

Versions are essentially a snapshot of your data - a point in time where you have "published" your changes. They allow you to track the changes in your project models and easily see who changed what and when. The great thing about versions is that they create a timeline of all the changes your project models go through and give you the possibility of going back in time, resetting your model to any version - whenever you want!

Each time you send data to Speckle, you are automatically creating a new version which contains all the objects in your project along with additional information such as the time, date, and author of the version. You can also add an optional _version message_ which is a short description of what you've changed. Like a project, each version is assigned a generated `versionId` which can be used to identify and retrieve it. You can go back in time and look at the history of your project through the series of versions.

![Version Card](https://user-images.githubusercontent.com/51519350/186121617-9f83dc01-89c5-4878-b088-7c3a81d4d75d.png)

Say goodbye to saving your files as "AM_Project_Design-final", "AM_Project_Design-final-final", "AM_Project_Design-final-final-latest"...!

::: tip IMPORTANT 🙌
Please Note: Versions aren't editable, you can change their message but not their content. Sent the wrong data? No problem - simply send the correct data and work from that version instead.
:::

### How do I use Versions?

If you have used a connector and you've sent data to a project, you've already used them! Each time data is sent to a project, a version is created. To help you keep track of the changes in your project, it is a good idea to add a version message that succinctly describes what the version contains. Some of the connectors pre-populate a default version message for you, but you are still free to write your own to add more detail.

When receiving data in a connector, you have the option of either staying synced with the latest version or receiving a specific version based on the `versionId`. If you choose to stay on the latest version, you'll see a notification when someone else has sent new data to the Project. When you see this, you'll be able to use the receive function to get the new version and update your file.

## What Next?

&nbsp;

For some users, this is their first time hearing about projects, models and Vversions. Your head must be spinning!

However, some users can't get enough of this and are ready to learn all about some of our more advanced topics. For these users, we've got you covered! See our Advanced Concepts page for more.
