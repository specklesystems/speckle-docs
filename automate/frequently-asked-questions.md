# Frequently Asked Questions

### **How much does it cost? Is Automate included in my enterprise subscription?**

- We want Automate to make a lot of the tedious tasks in your workflow easier, so we are working hard to make it as accessible as possible.
- Automate will be free as long as it’s in beta. We’re working on our future pricing plans and hope to announce them to you soon.
- It is anticipated that our paid Speckle server tiers will include some level of Automate usage, but where the balance lies we are still working out. 
- We will be looking for feedback from our beta testers to help us shape this.

### **I use my favourite desktop tool for clash detection. What is the difference between running clash detection in Speckle?**

- The main difference is that clash detection with Automate runs in the background and on as many models as you wish. It runs on models from any of our integrations, such as Blender, Sketchup, Grasshopper, Revit, TopSolid etc.. So you only have to work with Automate to get similar results across all your software. That saves you much time opening your favourite desktop tool, loading models, running the clash detection and waiting for the results.
- The results from the Clash Detection running in Automate are viewable directly in your web browser. You can enable sharing for your Speckle Model, send that link to your colleagues and clients, or embed our viewer in SharePoint, Notion or a web page. You can view the clash detection results on Mobile, Desktop, or the application of your choice.
- The results can then be retrieved from Speckle into any of our [**Connectors (opens new window)**](https://v1.speckle.systems/features/connectors/), whether Revit, Excel, PowerBI, etc. Speckle makes using the most appropriate and familiar software easy to get the best from your work.
- Automate results have an API, and reporting tools could be built to integrate with external reporting workflows such as PowerBI or Jupyter Notebooks out of the gate.

### **Is Automate faster than my desktop workflow?**

- This is hard to tell as it depends on the complexity of your models, hardware, etc. However, Automate Function is triggered without human interaction every time you upload a new model version; this alone might result in a faster response. Automate runs in the background, saving you time to focus on more critical tasks. It runs on dedicated hardware hosted in the cloud and doesn’t slow down your computer if you try to get other things done while it runs.
- Automations you define to run on models others contribute to will not require them to notify you, for you to retrieve their data, for you to take the results and turn them into a report; this can happen while you are at lunch, at sleep or climbing a mountain.

### What languages are supported?

- C# and Python are currently supported as first-class extensions to the existing Speckle SDKs; we plan to add Jupyter Notebooks soon and JavaScript/Typescript later. In terms of support, we offer a template repository, software development kit, documentation, an active forum, and a large community of like-minded contributors.
- You could extend our specklepy Automate template to execute your analysis with custom C++ or Rust libraries.
- Automate can run any language, framework, or off-the-shelf software - please refer to the Function specification for more details. While this is technically possible, and we can point you to documentation to do this, you may find a different level of support in terms of SDKs, documentation, or community to support you if you choose to take this path.
- Windows and MacOS runtimes are not currently available.
- In short, if you can execute a function from a command line, you can run it in Automate.

### **Is Automate part of the Speckle Server? How do I install the service?**

- No, Automate is a separate service but relies on the Speckle Server that is already available.
- We will be working hard during the lifetime of the beta testing to integrate Automate into the Speckle web application more tightly; the Automate backend will be separate.
- Speckle Server is freely available and can be installed on your own infrastructure. While in beta, Automate is not currently installable or open source.

### **What else do I need for Speckle Automation?**

A mindset that automation is the future!

### **How does Automate compare to Hypar, Viktor, or ShapeDiver?**

We love every product delivering new technology to push the AEC industry forward, and we believe Automate has a complementary role beside them. Here are some of the differences:

- The intention is different:
    - Automate is **not** intended for real-time parametric modelling in immediate, millisecond response to user adjustments in an application window. This type of activity is better suited for Hypar, NodePen, Viktor, Dynamo, Grasshopper, etc..
    - Automate is intended to automate tedious or complex tasks. It is designed to run at a lower frequency whenever you send a new version of your model to Speckle. It is designed to run computations for many seconds or minutes, allowing for complex (and time-consuming) automations.
- Integrations:
    - Automate builds on top of Speckle; therefore, it allows you to integrate with the software you know and love, whether SketchUp, Revit, Rhino, Grasshopper, ArchiCAD, Blender, PowerBI, Unity, etc. [The list 🔗i](https://v1.speckle.systems/features/connectors/)s long and growing! Thanks to these Speckle [Connectors 🔗a](https://v1.speckle.systems/features/connectors/)nd other integrations, you can send your model directly from your software of choice, and it will automatically start an Automation on Automate. Once the Automation is complete, you can retrieve the results and view them in your application. This doesn’t have to be the application you sent the original data from; you could, for example, send data from Revit and view the results in Power BI.
    - Other cloud-based applications allow data to be saved in files and exported to your software, and some have limited integrations with other applications. However, they do not build upon existing deep integrations with your favourite software, as Speckle does!
    - Automate results can be viewed in the browser, and the viewer can be embedded in many web pages and applications. The Speckle viewer also has an API which allows for extensions and customisation.
- Languages and existing software:
    - Automate can run any language, framework, and existing software (see our [**Function specification**](https://deploy-preview-190--speckle-docs.netlify.app/automate/function-specification)). We provide helpful SDKs and documentation for commonly used languages, e.g. C# and Python, but limiting yourself to just those is unnecessary.

### **Who can create Functions?**

- Anyone on your team with coding skills or a third-party developer can write Automate Functions for your projects. We provide easy-to-use templates, complete examples, documentation, and developer-friendly software development kits to get you started. See our [**guide**](https://speckle.guide/automate/create-function) for more details.

### **How do I use Automate in my project?**

- Please select an existing Function from the library and create an Automation from it! See our [**guide**](https://speckle.guide/automate/create-automation) for more details.

### **How can I create a Speckle Function? Do I upload my Functions to Speckle?**

- You can start with our Function template or an example and expand on these to develop your own. Automate is integrated with GitHub, and you can commit your code to your repository. Your Function appears in the library, where you can assign it to a model or the whole project. See our [**guide**](https://speckle.guide/automate/create-function) for more details.

### **Who can access my automated workflows?**

- Speckle Server and Automate have permission controls that prevent unauthorised access, and your intellectual property stays in your organisation. You can read more on Speckle’s [**security in this article](https://v1.speckle.systems/security/).**  Automations are private to an individual account; anyone with access to the project can see the results of all automation run on the models belonging to it.

### **Are there public Functions? Can I share Functions outside my organisation? Can I limit who can use a Function?**

- All Functions are public on [**latest.speckle.systems/functions**](https://latest.speckle.systems/functions/) and available to view in the functions list. They are shared with all users of Automate. We wish to encourage an open-source ethos and community of collaborators to create outstanding functions. We will be actively developing additional features to the functions list as we integrate them into the Speckle web application, and we welcome your insights. e.g. organisational lists and user ratings.

### **Where can I find help?**

- If you get stuck, our team will be happy to help you. Head to our [Community Forum](https://speckle.community/invites/Fbk5j1wbRW) and post any issues with Automate in the dedicated channel. We will publish a dedicated section on our tutorials page where you can find more tips and tricks when getting started.

### **Is there a way to un-publish the already-used functions?**

- We wish to retain any function used in automation to ensure that the automation will always be able to be run. However, we are considering ways to archive Functions that are no longer in use to keep the library tidy.

### **Can we use third-party libraries? Can I send data to another service?**

- If the third-party library's licensing terms are compatible with being run on a cloud platform such as Automate, then yes. The library and function must also comply with Speckle's Terms of Service. You are free to link to any other web-accessible API. If you need to use authentication tokens, ensure not to include them in your function code but define a field to allow automation to provide them.

### **Is it a Function author's responsibility to describe all limitations, e.g. what host application/object types will be accepted for the function?**

- The function author is best suited to understand what their function can handle and has been tested against. We expect them to label their function accordingly to set expectations for automation composers.

### Are functions checked for malicious activity? How can I trust a function won’t steal my project data?

- We will be monitoring data egress but only ad-hoc reviewing some codes as a matter of policy. We hope you’ll agree that functions as open-source are much less of a black box than other services you might be uploading project data to. Other Automatons and Specklers can review a function if you have specific questions. If you are not confident you can review the code, do not commit to using a function with project data until you are.
- All automations are tied to the revision of a function that was current at the time they were made. The automation list will indicate if newer versions are available, and you can review the changes to the function before updating your automation. It will not be possible for a function to change its operation or what it does with your data without you knowing.