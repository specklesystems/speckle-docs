# SketchUp (Alpha)

<div class="banner-ribbon">
  <span><b>Notice</b>: This user guide is based on the V2 SketchUp connector.</span>
  <span class="next-gen">SketchUp is now supported in the Next Gen ecosystem. These docs refer to the legacy alpha connector only.</span>
</div>

> ⚠️ This connector was an early alpha and is no longer actively maintained.  
> A fully supported **Next Gen SketchUp connector is now available** at  
> 👉 [**app.speckle.systems/downloads**](https://app.speckle.systems/downloads)

![example-send](./img-sketchup/sketchup-hostel-sent.png)

## Getting Started

This connector was built as an alpha prototype for SketchUp 2021 on Windows.  
For newer versions or production workflows, we recommend switching to the [Next Gen connector](https://app.speckle.systems/downloads).

You can still follow the manual steps below to experiment with the legacy code, or explore the [repo](https://github.com/specklesystems/speckle-sketchup).

## Installation

There is no packaged installer for this connector. Installation must be done manually.

Note: The connector was developed against SketchUp 2021 on Windows and may not function on other versions or platforms.

### Manual Installation

#### 1. Clone the Repository

Ensure you have [git](https://git-scm.com/downloads) installed. Then:

```bash
git clone https://github.com/specklesystems/speckle-sketchup
```
#### 2. Build the User Interface
Navigate into the ui/ folder:
```bash
cd speckle-sketchup/ui
npm install
npm run build
```
This generates the UI in the html folder within speckle_connector.

#### 3. Add the Connector to SketchUp
Locate your SketchUp Plugins directory. For Windows SketchUp 2021:
```bash
C:\Users\{YOU}\AppData\Roaming\SketchUp\SketchUp 2021\SketchUp\Plugins
```
Copy the following items into that folder:

speckle_connector directory

speckle_connector.rb file

User Interface
Sending Data
Only selection-based sending is supported.

Select objects

Click the "Send" cube

<video autoplay="autoplay" muted="muted" loop="loop"><source src="/assets/media/sending.0130e219.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Change the model from the dropdown if needed


Receiving Data
Click the "Receive" cube to bring in selected models and versions.
SketchUp groups are received as component instances.

![image](https://github.com/user-attachments/assets/3017cc07-adea-4b76-a0b7-6a70f07c106d)

<video autoplay="autoplay" muted="muted" loop="loop"><source src="/assets/media/receiving.fac2fa42.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Accounts
This alpha connector required accounts to be added via Speckle Manager.

In the Next Gen connector, account sign-in is built directly into the SketchUp interface.

Supported Elements
See the SketchUp Support Tables
