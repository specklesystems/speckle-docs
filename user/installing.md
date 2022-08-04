# Installing Connectors

Manager for Speckle is the best way to get (almost) all our Connectors installed and up to date on your computer, and if you have more than one Speckle accounts you'll be able to manage them there as well.

::: tip IMPORTANT 🙌
This guide assumes you have a **Speckle Account**.
If you don't, just register on our [free XYZ Speckle server](https://speckle.xyz).
:::

## Download

Manager is available for both Windows and Mac (with limitations).
Manager automatically updates when new versions are available.

::: tip
Manager does not require admin privileges! Just double click and run to install it.
:::

Download Speckle Manager from our:

- [⬇️ Releases Website](https://speckle-releases.netlify.app/)


![image](https://user-images.githubusercontent.com/2679513/182888937-d998604c-59ef-4cbc-bdb6-2176338d41fd.png)

## System Wide Installations

By default Manager installs Connectors on Windows under the *local user app data folder*, if you would like to install it for every user on a machine, or roll it out company-wide, we have made things simpler!

::: tip NOTE
We are rolling out this functionality to more connectors, currently it's only been added in Revit, Rhino and Grasshopper
:::

1. To do so, first download the individual exe for manual installation from our [⬇️ Releases Website](https://speckle-releases.netlify.app/)
2. If you are running the installer manually, you'll no see a dialog prompting you to choose local (Install for me only) or system wide (Install for all users - requires admin privileges) options.
![image](https://user-images.githubusercontent.com/2679513/172787395-e1123fc2-6259-44e0-a475-7ba12adf010c.png)
3. If you are running the installer programmatically, you can instead use the following command-line arguments:
    - `/SILENT` and `/SUPPRESSMSGBOXES` for a background installation
    - `/ALLUSERS` or `/CURRENTUSER` for a system or local installation
4. *IMPORTANT:* Local and system installations should not be mixed as it could cause issues.