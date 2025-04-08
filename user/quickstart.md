# Zero to Speckle ASAP

Pressed for time? Here's a lightning-fast intro to getting started 🚀

---

## 1. Registration

Before you can use Speckle, you'll need an account!

- You can register on our [general server](https://app.speckle.systems/)
- Or, if your company runs its own Speckle server, use the URL they provide

Once signed in, a friendly onboarding wizard will help get you started.

---

## 2. Creating Your First Project

![image](https://user-images.githubusercontent.com/2679513/148923228-790246ff-d25a-4c25-966c-e2399b2ea13e.png)

Welcome aboard 🥳 You're now inside the Speckle [web app](/user/web).

From here, you can view, manage, and share the data and 3D models you or others have sent to Speckle.

**To create your first project**, click the big blue “+ New” button.

::: tip 💡 What’s a project?

A **project** is like a folder or repository. Inside each project, you’ll find:

- **Models** — separate data containers for design options, disciplines, or phases
- **Versions** — each time you send data, a new snapshot (version) is created

:::

![newstream](https://user-images.githubusercontent.com/2679513/148924418-4af6e065-97fc-4c9c-b906-5a0d2f0e821a.gif)

---

## 3. Sending & Receiving Data with Connectors

New projects are empty by default. To add data, you’ll use a **Speckle connector**.

::: tip 💡 What are connectors?

**Connectors** are plugins for your favorite design tools. They let you exchange geometry and BIM data directly between tools — and the cloud.

You can:
- Send your models to Speckle
- View them online
- Receive them into other supported tools

:::

Find your tool in the [connectors section](/user/connectors) of our docs.

---

### Installing a Connector

Most connectors are available via [Speckle Manager](https://speckle.systems/download/), which also handles updates and account setup.

![manager](https://user-images.githubusercontent.com/2679513/148925769-e12fe66f-923e-4af8-9eac-166dab1eb21d.gif)

::: tip ⚠️ Don’t want to use Manager?

No problem — connectors can also be downloaded directly from the [Releases page](https://releases.speckle.systems).

:::

---

### Grasshopper & Dynamo

The [Grasshopper](/user/grasshopper) and [Dynamo](/user/dynamo) connectors work almost identically.

You’ll mainly use:
- `Send Data` and `Receive Data` nodes/components
- Stream/project management nodes (`Create`, `List`, `Get`, etc.)

You can also send and receive data locally, build custom objects, and handle JSON directly.

![dyn-send](./img-dyn/dyn-send.gif)

---

### Revit, Rhino, AutoCAD, Civil 3D, Bentley, etc.

These connectors share a unified interface.

From the Speckle panel inside your software, you can:
- Select an existing project
- Choose whether to **Send** or **Receive** data
- Pick which data to include

Learn more in the [Desktop UI docs](/user/ui2).

![dui2-select](https://user-images.githubusercontent.com/2679513/139484851-8038b1c3-e0a5-4585-892e-bc870974f422.gif)

Not sure what can be exchanged? Our [Supported Elements](/user/support-tables) tables have you covered.

---

## 4. Seeing Your Models Online

After sending, your data is immediately visible in the Speckle web app — including a 3D viewer!

You can also embed models into websites or apps, or use the API to access the data programmatically.

Here's a sample project you can explore:  
🔗 [https://app.speckle.systems/projects/3073b96e86](https://app.speckle.systems/projects/3073b96e86)

Once your model’s in Speckle, you can:
- Share it with collaborators
- Comment or discuss (coming soon!)
- Filter, search, and explore parameters
- Automate tasks and run checks
- View in different tools and formats

---

## 5. That’s a Wrap

You're now set up and ready to Speckle 🎉

Want to go deeper?
- Browse our [tutorials](https://speckle.systems/tutorials/)
- Explore the [Dev Docs](/dev/)
- Join the [Community Forum](https://speckle.community/) for help, inspiration, or feedback

We're glad you're here 💙
