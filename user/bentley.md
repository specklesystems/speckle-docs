# Bentley (MicroStation, OpenRoads, OpenRail, and OpenBuildings)

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 Bentley connectors.</span>
  <span class="next-gen">These connectors are currently legacy, but we're exploring options for a Next Gen revival in collaboration with Bentley.</span>
  <span><b>Status</b>: These connectors are not actively maintained and are provided as-is.</span>
</div>

::: warning ❗️ Legacy Only (For Now)

The Bentley connectors were originally developed and contributed by **Arup**, but ongoing development has ceased.  
They are provided **as-is**, with no active support or compatibility updates.

We are currently in discussion with **Bentley** about bringing official support to Speckle’s Next Gen connector ecosystem.  
📣 **Stay tuned!**

:::

The legacy Speckle connector for Bentley software supports:

- MicroStation CONNECT
- OpenRoads Designer CE
- OpenRail Designer CE
- OpenBuildings Designer CE

---

## Getting Started

> ⚠️ These connectors are only available as **legacy installers**.

👉 **Download them from the [Legacy Connectors Page](https://releases.speckle.systems/legacy-connectors)**

Once installed, a `Speckle 2` ribbon will appear in your Bentley application.  
Click the Speckle icon to open the standard Speckle desktop interface.

![Speckle ribbon](./img-bentley/speckle-ribbon.png)

---

## User Interface

When the Speckle panel opens, you can create a new Speckle project or connect to an existing one.  
Projects are saved with your current DGN file.

---

### Sending Data

You can send data by:

- Manually selecting elements in your Bentley model
- Using filters to target specific groups of elements

#### Steps:

1. Set the current project to **Sender** mode
2. Select objects → click `Set Selection`
3. Click `Send`

#### Filter Options:

- `All`: sends all supported elements
- `Level`: by level
- `Element Type`: by object category
- `Civil Element Type`: available in OpenRoads/OpenRail
- OpenBuildings gridlines appear under `Grid Systems`

---

### Receiving Data

To receive Speckle data:

1. Add a project in **Receiver** mode
2. Click `Receive`
3. The model will be added to your current file

---

## Supported Elements

🔗 [View Bentley Support Tables](/user/support-tables.html#microstation)

---

## Feedback & the Future

We understand the importance of Bentley tools in infrastructure and rail workflows.

💬 If Bentley support matters to you, please let us know on the [Speckle Community Forum](https://speckle.community).  
We’re working to make this ecosystem sustainable — and your feedback helps shape our roadmap.

> 🛠 Want to help or fork it yourself? The original code is still open source — reach out on the forum for guidance.
