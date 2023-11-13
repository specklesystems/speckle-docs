# Frequently Asked Questions

## How can I start with Speckle Automate?

1. Simply create an account on [latest.speckle.systems](http://latest.speckle.systems), if you don’t have one already.
1. Join our [beta testing group](https://forms.gle/15NHa9h8sYvUHG2e6).
1. Wait patiently!
1. Once you receive an early access invitation, you can log in to Speckle Automate at [automate.speckle.dev](http://automate.speckle.dev) using your [latest.speckle.systems](http://latest.speckle.systems) (formerly [speckle.xyz](http://speckle.xyz) ) account.
1. Check out [our guide](https://speckle.guide/automate/) for more information on how to get started!

## How much does it cost? Is Speckle Automate included in my subscription?

At the present moment Speckle Automate is available only as a private beta. You can join the waiting list [here](https://forms.gle/15NHa9h8sYvUHG2e6). While we are developing Speckle Automate it is not open source; we will review this decision in due course.

### I use my favourite desktop tool for clash detection. What is the difference of running clash detection in Speckle?

The main difference is that clash detection with Speckle Automate runs on the background and on as many models you wish. It runs on models from any of our integrations, such as Blender, Sketchup, Grasshopper, Revit, TopSolid etc. - so you only have to work with Speckle Automate to get similar results across all your software. That saves you lot of time opening your favourite desktop tool, loading models, running the clash detection and waiting for the results.

The results from the Clash Detection running in Speckle Automate are viewable directly in your web browser. You can enable sharing for your Speckle Model, and send that link to your colleagues and clients; or embed our viewer in SharePoint, Notion or a web page. You can view the clash detection results on Mobile, Desktop, or the application of your choice.

The results can then be retrieved from Speckle into any of our [Connectors](https://speckle.systems/features/connectors/) whether that is Revit, Excel, PowerBI etc. Speckle makes it easy for you to use the most appropriate and familiar software to allow you to get the best from your work.

### Is Speckle Automate faster than my desktop workflow?

This is really hard to tell as it depends on complexity of your models, your hardware and so on. However, Speckle Automate Function is triggered without human interaction every time you upload a new model version; this alone might result in a faster response. Speckle Automate runs in the background, saving you time to focus on more important tasks. It runs on dedicated hardware hosted in the cloud and doesn’t slow down your computer if you are trying to get other things done while it runs.

### What languages are supported?

C#, Python are supported at the moment and we plan to add JavaScript in the future. In terms of support, we offer a template repository, software development kit, documentation, an active forum, and a large community of like-minded contributors.

However, Speckle Automate can run any language, any framework, or any off-the-shelf software - please refer to the [Function specification for more details](./function-specification). While this is technically possible, and we can point you to documentation  to do this, you may not find the same level of support in terms of SDKs, documentation, or community to support you if you choose to take this path.

### Is Speckle Automate part of the Speckle Server? How do I install the service?

No, Speckle Automate is a separate service but it relies on Speckle Server already being available.

Speckle Server is freely available and can be installed on your own infrastructure. While in beta, Speckle Automate is not currently installable and is not open source. We may reconsider this at some time in the future.

### What else do I need for Speckle Automation?

A mindset that automation is the future!

### How does Speckle Automate compare to Hypar, Viktor, or ShapeDiver?

We love every product delivering new technology to push the AEC industry forward, and we believe Automate has a complementary role beside them. Here are some of the differences:

- The intention is different:
  - Speckle Automate is intended to automate tedious or difficult tasks. It is intended to run at lower frequency; whenever you send a new version of your model to Speckle. It is designed to run computations that last for many seconds or minutes, allowing for complex (and time-consuming) automations.
  - Speckle Automate is **not** intended for real-time parametric modeling in immediate, millisecond response to user adjustments in an application window. This type of activity is better suited for Hypar, NodePen, Viktor, Dynamo, Grasshopper, etc..
- Integrations:
  - Speckle Automate builds on top of Speckle therefore it allows you to integrate with the software you know and love, whether that is SketchUp, Revit, Rhino, Grasshopper, Archicad, Blender, PowerBI, Unity etc. [The list](https://speckle.systems/features/connectors/) is long and growing! Thanks to these Speckle [Connectors](https://speckle.systems/features/connectors/) and other integrations, you can send your model directly from your software of choice, and it will automatically start an Automation on Speckle Automate. Once the Automation is complete, you can retrieve the results and view them in your application of choice. This doesn’t have to be the application you sent the original data from; you could, for example, send data from Revit and view the results in Power BI.
  - Other cloud-based applications do allow data to be saved in files and exported to your software, and some have limited integrations with other applications. However, they do not build upon existing deep integrations with your favorite software, as Speckle does!
  - Automate results can be viewed in the browser, and the viewer can be embedded in many web pages and applications. The Speckle viewer also has an API which allows for extensions and customisation.
- Languages and existing software:
  - Speckle Automate can run any language, framework, and existing software (see our [Function specification](./function-specification)). We provide helpful SDKs and documentation for commonly used languages, e.g. C# and Python, but it is not necessary to limit yourself to just those.
    - At present, we understand that Hypar is limited to .Net languages, predominantly C#, and Viktor is limited to Python. Dynamo and GrassHopper have similar limitations.

### Who can create Functions?

Anyone in your team with coding skills or a third party developer can write Speckle Automate Functions for your projects. We provide easy-to-use templates, complete examples, documentation, and developer-friendly software development kits to get you started. See our [guide](./create-function) for more details.

### How do I use Automate in my project?

Select an existing Function from the library, and simply create an Automation from it! See our [guide](./create-automation) for more details.

### How can I create a Speckle Function? Do I upload my Functions to Speckle?

You can start with our Function template or an example and expand on these to develop your own. Speckle Automate is integrated with GitHub and you can simply commit your code to your repository. Your Function then appears in the library, where you can assign it to a model or the whole project. See our [guide](./create-function) for more details.

### Who can access my automated workflows?

Speckle Server and Speckle Automate have permission controls that prevent any unauthorised access and your intellectual property stays in your organisation. You can read more on Speckle’s [security in this article](https://speckle.systems/security/).

### Are there public Functions? Can I share Functions outside my organisation? Can I limit who can use a Function?

All Functions are public on [automate.speckle.dev](http://automate.speckle.dev) and available to view in the Function Library. They are shared with all users of Speckle Automate. We wish to encourage an open-source ethos and community of collaborators to create outstanding Functions.

We may consider private Enterprise libraries in the future if there is sufficient demand.

### Where can I find help?

If you get stuck our team will be happy to help you. Simply head to our [Community Forum](https://speckle.community/invites/Fbk5j1wbRW) and post any issues you have with Speckle Automate. There is a dedicated section on our tutorials page where you can find more tips and tricks when getting started.

### Is there a way to un-publish already used Function?

We wish to retain any Function that has been used in an Automation, to ensure that the Automation will always be able to be run. However, we are considering a way to archive Functions that are no longer in use, to keep the library tidy.

### Can we use third-party libraries?

Provided the licensing terms of the third party library is compatible with being run on a cloud-platform such as Automate, then yes. The library and Function must also comply with Speckle's Terms of Service.

### Does speckle support conda environment?

Yes, Automate supports any docker image that runs on linux os on amd64 architecture; see the [Function specification](./function-specification) for more details.

### Is it a Function author's responsibility to describe all limitations, e.g. what host application/object types will be accepted for the Function

The Function Author is best suited to understand what their Function is capable of handling and has been tested against. We expect them to label their Function accordingly to set expectations for Automation composers.
