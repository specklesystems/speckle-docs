---
title: Manual Installation
---

# Manual Installation

If you'd like to try installing on a different platform or for a different version, you can do a manual installation. Note that the connector has not been tested on older versions or on different platforms. There may be issues, so feel free to report them on the forum.

## 1. Clone the Repository

First, ensure you have [git](https://git-scm.com) installed.

Run the following command in your terminal to clone the repo:

```
git clone https://github.com/specklesystems/speckle-sketchup
```

This will create a `speckle-sketchup` folder with the connector files wherever you run this command.

## 2. Build the User Interface

Navigate into the `ui/` folder

```
cd speckle-sketchup/ui
```

Then run the following commands:

```
npm install
npm run build
```

This will create a `html` folder inside the `speckle-sketchup/speckle_connector` folder.

## 3. Add the Connector to SketchUp

Find the `Plugins` folder for your SketchUp installation. On Windows for SketchUp, the folder will be at:

```
C:\Users\{YOU}\AppData\Roaming\SketchUp\`{SketchUp_VERSION}\SketchUp\Plugins
```

Once you've found the equivalent for your OS / SketchUp version, copy the `speckle_connector` folder and the `speckle_connector.rb` file into the `Plugins` folder.
