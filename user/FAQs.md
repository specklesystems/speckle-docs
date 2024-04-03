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

## What is a project?

**Projects** are collections of data inside Speckle. You can see a project as a folder or a repository.

## What is a version?

Data in a Project is stored in **versions**, which are snapshots of data in time. Every time you send to Speckle from a connector, a version is created.

## What is a model?

Versions can also be organized in **models**, for instance, to have multiple design options or to store data by discipline. If a project has only one model and has no name it can be referred to as _main_.

## What is a connector?

**Connectors** are plugins for design and analysis software, they let you exchange geometry and BIM data with Speckle (send and receive it)

## The Speckle server is unreachable

When a Speckle Server is unreachable a few things could be going on.

If you cannot access the server from **your browser** or from **Speckle Manager**:

- Firstly, check you are online by visiting other websites.
- Make sure the server address is not blocked by a corporate firewall, proxy or VPN, by either trying to access it via a different network (eg mobile network) or by _contacting your IT department_.
- The server could be down! If it's hosted by us, we're most likely working on it already. If it's hosted by your company, please reach out to them.

If the server address is **blocked by a corporate firewall, proxy or VPN**, kindly ask your IT department to allowlist the following domains and subdomains that Speckle uses:

- **\*.speckle.xyz (critical)**
- **\*.speckle.dev (critical)**
- **\*.speckle.systems (critical)**
- speckle-excel.netlify.app (critical for the Excel Connector)
- speckle-releases.ams3.digitaloceanspaces.com
- speckle.community

Make sure you can also receive emails from `*@speckle.systems`, eg. `no-reply@speckle.systems`. Some IT departments might block this sender address - without it invites and other features will not work.

For any more questions about this, feel free to [contact us](https://speckle.systems/contact/)!

## I can't add an account in Speckle Manager

Check our [troubleshooting section](/user/manager.html#troubleshooting) for Speckle Manager.

## How do I merge two models in Speckle

Currently, versions, models or projects cannot be merged via Speckle, but you can do so in most authoring software supported by Speckle or progammaticaly using our SDKs. For instance, you can manually merge two models (or even projects) easily in Grasshopper or a Jupyter notebook.

## Why can't I see anything in the 3D Viewer?

Our 3D Viewer only supports visualizing geometry. If you're sending any data that doesn't have a supported geometrical representation it will not be visible, for example when sending a list of Levels or Revit Family and Type names. You'll always be able to explore the raw data of a project in the version page, however.

## How do I solve a DLL conflict?
If a Speckle connector and another plugin you have installed in your host application (Revit, Rhino, AutoCAD etc) use similar packages, you might have conflicts which could make either plugin unusable. This manifests usually with a dialog similar to the following at startup:

![Revit dll conflict](https://speckle.community/uploads/default/original/2X/c/c9633fc3de90cc9620350125b7a6cba33792ed0e.jpeg)

To resolve the issue, you need to remove the conflicting plugin. 
1. To find it, read the error message carefully. The one above, for example, clearly mentions a conflict with a package called `Serilog`. Other times we have seen conflicts with `Sentry`. 
2. Look inside each plugin folder until you find one containing a `*.dll` file with that name. The windows search functionality can help here.
3. Temporarily remove that plugin, reload your host application and see if the problem is solved. Otherwise try with another one.

### Revit plugin locations
In Revit, plugins can be installed in multiple locations, we recommend searching through all of them:

```
%appdata%\Autodesk\Revit\Addins\                 NOTE: the variable "%appdata%"" can be copy/pasted in your windows explorer window
%appdata%\Autodesk\ApplicationPlugins\
C:\ProgramData\Autodesk\Revit\Addins\
C:\ProgramData\Autodesk\ApplicationPlugins\
C:\Program Files\Autodesk\Revit 20XX\AddIns\
%appdata%\Dynamo\Dynamo Revit\2.XX\packages\     NOTE: dynamo plugins can conflict too!
```



## I forgot my password 🤔

This time over, we've got you covered: just go to the [password reset page](https://app.speckle.systems/authn/resetpassword)!

## More questions?

We source them from all the feedback we get. Head over to [the forum and post one](https://speckle.community)!
