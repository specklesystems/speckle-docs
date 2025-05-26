---
title: Quickstart
deprectationMessages: developer
---

<Banner />

# QuickStart

In a rush? Don't feel like reading through a lot of documentation? This guide will get you up and running with a local dev server and have you sending data to Speckle ASAP. Feel free to dip into the [User Guide](/user/) or [Dev Docs](/dev/speckle-sharp/) for more detailed explanations where you need them.

## Dependencies

Before you can spin up a local dev server, you'll need to install the following:

- Node
- Postgres
- Valkey

## Manager

Speckle Manager is our desktop application for managing local accounts and connectors. You will need to install it before you can use the Speckle connectors. Get the latest version [here](https://speckle.systems/download/).

The Manager allows you to add and remove Speckle accounts to your local environment. Simply head to the "Accounts" page to add your first account. You'll need to enter a server URL (which can just be `http://localhost:3000`) then follow the instructions to log in/register and authorise the Manager. From Manager, you'll also be able to set a Default Account which is the account any desktop connectors will use if you don't specify an account.

The Manager also has a "Connectors" page where you can view, install, update, and uninstall our official desktop connectors.

## Web

[Speckle Web](/dev/web) is a monorepo containing the multiple components of Speckle: the Server, the Frontend, and the Viewer. To get started, clone the repo from [here](https://github.com/specklesystems/speckle-server).

### Setting Up

There are a few setup steps to go through after a fresh clone.

1. Build the Viewer

```sh
corepack enable
cd packages/viewer
yarn install
yarn build:public
yarn build
```

2. Bootstrap to the Viewer with the Frontend and install packages

```sh
cd packages/frontend_2
yarn build
```

3. Create a Postgres db called `speckle2_dev`

4. Copy and fill in an `.env` file in `packages/server` based on the `.env.example`

### Starting Up

Once you've gone through the initial setup, you're just three steps away from spinning up your dev server and exploring the frontend.

1. Start local instances of Postgres, MinIO, and Valkey
2. In `packages/server`, run `yarn dev`
3. In `packages/frontend`, run `yarn dev`

Tada ✨ You should now see the frontend at `localhost:3000`! You can explore the API using the GraphQL Playground at `localhost:3000/graphql`.

## Desktop

### Speckle-Sharp

[Speckle-Sharp](/dev/speckle-sharp/) is the home of all thing Speckle C# including the .NET SDK and the desktop connectors. The connectors use our default interoperability kit [Objects](/dev/speckle-sharp/objects): a .NET object model containing geometry and AEC element base classes. It works great out of the box, but can be forked and extended by you if you need extended capabilities.

The repo also contains the [DesktopUI](https://github.com/specklesystems/speckle-sharp/tree/master/DesktopUI): a WPF application which you can implement to build your own connectors!

### Connectors

Currently, we have four connectors within Speckle Sharp: Dynamo, Grasshopper, Revit, and Rhino. The connectors are what free your data from their source applications and allow you to access them from wherever you need them. They provide simple and intuitive user interfaces for selecting, sending, and receiving data to and from your Server.

### Installation

You can install release builds of the connectors from the [Speckle Manager](#manager) or you can debug them locally by cloning [the repo](https://github.com/specklesystems/speckle-sharp). Instructions for building and debugging each of the connectors can be found in the [Dev Docs](/dev/speckle-sharp/connectors).

## Conclusion

That's all, folks! Your lighting fast introduction to Speckle is now complete. There's plenty more to see in the Dev Docs, so have a browse if you want more information. If you have any questions, feedback, or ideas, join us on [the forum](https://speckle.community/) and start a discussion!
