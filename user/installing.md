# Installing connectors

Manager for Speckle is the best way to get (almost) all our connectors installed and up to date on your computer, and if you have more than one Speckle accounts you'll be able to manage them there as well.

::: tip 🙌 IMPORTANT
This guide assumes you have a **Speckle Account**.
If you don't, just register on our [General Availability Speckle server](https://app.speckle.systems).
:::

## Download

Manager is available for both Windows and Mac (with limitations).
Manager automatically updates when new versions are available.

::: tip 💡 TIP
Manager does not require admin privileges🎉! Just double-click and run to install it.
:::

Download Speckle Manager from our:

- [⬇️ Downloads Page](https://speckle.systems/download/)

![Manager_hZXb0CIu5N 1](https://user-images.githubusercontent.com/51519350/186161062-70f7a7de-c215-4410-9aa7-5f7158b357f0.png)

## System Wide Installations

By default Manager installs connectors on Windows under the _local user app data folder_, if you would like to install it for every user on a machine, or roll it out company-wide, we have made things simpler!

::: tip 📝 NOTE
We are rolling out this functionality to more connectors, currently it's only been added in Revit, Rhino and Grasshopper
:::

1. To do so, first download the individual exe for manual installation from our [⬇️ website](https://speckle.systems/download/)
2. If you are running the installer manually, you'll no see a dialog prompting you to choose local (_Install for me only_) or system wide (_Install for all users - requires admin privileges_) options.
   ![install-manager-admin](https://user-images.githubusercontent.com/51519350/186138876-e221babc-36b5-4621-9b54-195168a70fa0.png)
3. If you are running the installer programmatically, you can instead use the following command-line arguments:
   - `/SILENT` and `/SUPPRESSMSGBOXES` for a background installation
   - `/ALLUSERS` or `/CURRENTUSER` for a system or local installation
4. _IMPORTANT:_ Local and system installations should not be mixed as it could cause issues.
