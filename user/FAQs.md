# FAQs

## What is Speckle?

Speckle is an open source software platform that helps you get in control of your own data.
Speckle stores your 3D models and BIM data directly inside a database in a transparent and accessible way.

## What can I do with Speckle?

Speckle is a swiss-army knife for working with 3D data and we keep adding new functionalities every day. Here are some of the main things people have been using Speckle for:

- Interoperability: get your CAD and BIM models into other software without exporting or importing
- 3D Viewer: see your CAD and BIM models online, share and embed them anywhere
- Real time: get real time updates and notifications and changes
- Object-based: say goodbye to files! Speckle is the first object based platform for the AEC industry, store your data in a fast and accessible database
- Version control: Speckle is the Git & Hub for geometry and BIM data - you can manage multiple versions of this data with ease!
- Collaboration: share your designs collaborate with others
- Permission and data management: set granular permissions on you designs and parts of them
- GraphQL API: get what you need anywhere you want it
- Webhooks: the base for a automation and next-gen pipelines
- Custom Apps: create custom apps that leverage your data the way you want
- Built for developers: we are building Speckle with developers in mind and got tools for every stack
- Built for the AEC industry: Speckle connectors are plugins for the most common software used in the industry such as Revit, Rhino, Grasshopper, AutoCAD, Civil 3D, Excel, Unreal Engine, Unity, QGIS, Blender and more!

In short, Speckle is a great basis for you company's digital transformation and for transitioning to digital and data driven workflows.

## What does open source mean?

It means that you are free to take our code and run away with it! Really!
Speckle is licensed as Apache 2 so you are free to study, modify, redistribute and commercialize any parts of it.

This means that you can totally deploy your own Speckle server without ever having to depend on us!

## What is a Stream?

**Streams** are collections of data inside Speckle. You can see a stream as a folder, a project or a repository.

## What is a Commit?

Data in a stream is stored in **commits**, which are snapshots of data in time. Every time you send to Speckle from a connector, a commit is created.

## What is a Branch?

Commits can also be organized in **branches**, for instance, to have multiple design options or to store data by discipline. The default branch is called _main_.

## What is a Connector?

**Connectors** are plugins for design and analysis software, they let you exchange geometry and BIM data with Speckle (send and receive it)

## The Speckle Server is unreachable

When a Speckle Server is unreachable a few things could be going on.

If you cannot access the server from **your browser** or from **Speckle Manager**:

- Firstly, check you are online by visiting other websites.
- Make sure the server address is not blocked by a corporate firewall, proxy or VPN, by either trying to access it via a different network (eg mobile network) or by _contacting your IT department_.
- The server could be down! If it's hosted by us, we're most likely working on it already. If it's hosted by your company, please reach out to them.

If the server address is **blocked by a corporate firewall, proxy or VPN**, kindly ask your IT department to allowlist the following domains and subdomains that Speckle uses:

- **\*.speckle.xyz (critical)**
- **\*.speckle.dev (critical)**
- speckle-excel.netlify.app (critical for the Excel connector)
- speckle-releases.ams3.digitaloceanspaces.com
- speckle.systems
- speckle.community

Make sure you can also receive emails from `*@speckle.sytems`, eg. `no-reply@speckle.systems`. Some IT departments might block this sender adress - without it invites and other features will not work.

For any more questions about this, feel free to [contact us](https://speckle.systems/contact/)!

## I can't add an account in Speckle Manager

Check our [troubleshooting section](/user/manager.html#troubleshooting) for Speckle Manager.

## How do I merge two branches in Speckle

Currently, commits, branches or streams cannot be merged via Speckle, but you can do so in most authoring software supported by Speckle. For instance, you can manually merge two branches (or even streams) easily in Grasshopper.

## Why can't I see anything in the 3D Viewer?

Our 3D Viewer only supports visualizing geometry. If you're sending any data that doesn't have a supported geometrical representation it will not be visible, for example when sending a list of Levels or Revit Family and Type names. You'll always be able to explore the raw data of a Stream in the commit page, however.

## I forgot my password 🤔

This time over, we've got you covered: just go to the [password reset page](https://speckle.xyz/authn/resetpassword)!

## More questions?

We source them from all the feedback we get. Head over to [the forum and post one](https://speckle.community)!
