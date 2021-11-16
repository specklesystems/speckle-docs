# Speckle Manager

Speckle Manager is a standalone desktop application that helps you manage your Speckle [Accounts](/quickstart.html#registration) and [Connectors](/#connectors). While the Speckle Manager isn't strictly required to use the Speckle platform, we highly recommend using it to help keep track of your connectors, install the latest updates and handle multiple user accounts.

Throughout this documentation we'll assume you have used Manager to set up your account and install the connectors ([alternative methods](/user/manager.md#adding-accounts-manually) are also supported).

::: tip IMPORTANT 🙌
This guide assumes you have access to a **Speckle Server**.
If you don't have one provided by your company, you can use our [free Speckle server](https://speckle.systems/getstarted/).
:::

## Installation
Manager is available for both Windows and Mac (with limitations).

::: tip
Manager does not require admin privileges! Just double click and run to install it.
:::

Download the latest version of Speckle Manager:

- [Speckle Manager for Windows](https://speckle-releases.ams3.digitaloceanspaces.com/manager/SpeckleManager%20Setup.exe)
- [Speckle Manager for Mac](https://speckle-releases.ams3.digitaloceanspaces.com/manager/SpeckleManager%20Setup.dmg) (currently account management only)

Manager for Windows will prompt you to update when an update is available, in Mac you'll need to manually install new versions.

![image](https://user-images.githubusercontent.com/2679513/129895485-77fbf165-ff2d-4d7f-8aca-4a8a476d1274.png)

### Preventing Manager from running at Startup

On Windows, Manager will automatically launch on startup to check for new updates. It will notify you of any updated connector versions as soon as they are released.

If you want to disable this functionality, you can simply do so:

- Open the Task Manager, using (e.g.) `Ctrl + Shift + Esc`
- Navigate to the Startup tab..
- Find the row with **SpeckleManager** and set its **Status** to **Disabled**

![image](https://user-images.githubusercontent.com/2679513/112289752-7caab280-8c86-11eb-8c9a-928d536e8eb3.png)

### Uninstallation

On Windows, simply head over **Apps & Features**, find **SpeckleManager** and then click **Uninstall**.

![image](https://user-images.githubusercontent.com/2679513/112290160-dc08c280-8c86-11eb-962c-19a8a20afc94.png)

## Adding Accounts

:::warning Account Problems

Having trouble adding an account? Check our [troubleshooting section](/user/manager.html#troubleshooting)!

:::

### From Speckle Manager

Once you have downloaded the Manager, you'll be able to easily add an account. All you need to do is head to the "Accounts" menu, click the "Add Account" button, and provide your server URL. This will open a browser window where you can log in or register an account on that server and authorise the Speckle Manager.

![manager account add](https://user-images.githubusercontent.com/2679513/129895785-9ea26528-65ff-4882-9f7b-e48c7b18352d.gif)

### From the Web

Just visit your profile and click "Add account to desktop manager":

![image-20210322195941511](./img/manager/image-20210322195941511.png)

### During Onboarding

You can also add an account directly from Speckle Web as part of the onboarding process you will see after registering on a new server.

### Adding Accounts Manually

Using Manager to handle your accounts and [Connectors](/#connectors) is the recommended way, but if you'd like to do without it a manual flow is also available.

To manually add an account you first need to [generate a token for your account](/dev/tokens-apps).

Then you can proceed to create a `.json` file in `%appdata%\Speckle\Accounts\` with the following data structure:

```json
{
  "token": "YOUR-TOKEN-HERE",
  "serverInfo": {
    "name": "Server Name",
    "company": "Company Name",
    "url": "https://YOUR-SERVE-URL-HERE"
  },
  "userInfo": {
    "id": "YOUR-USER-ID",
    "name": "First Last",
    "email": "firstlast@email.com"
  }
}
```

## Installing Connectors

:::warning Installation Problems

Having installing connectors? Check our [troubleshooting section](/user/manager.html#troubleshooting)!

:::

Manager also shows you the currently available connectors and allows you to install or remove connectors from your machine. Head into the **"Connectors"** menu to see what connectors you have installed and which are available to download. You'll also be able to check which version of each connector you have and update a connector as new versions are released.

![manager connector add](https://user-images.githubusercontent.com/2679513/129897388-cbf5f00b-dccf-4609-aeb0-5dd3b0b52c5d.gif)

### Updating Connectors

You will receive a notification in Speckle Manager when updates for your installed connectors are available. You can then update them from the [Connectors](/#connectors) page.

### Uninstalling Connectors

Just head over the [Connectors](/#connectors) page in Speckle Manager and click **Remove**.

## Advanced Settings

You can access the Settings page by clicking the ⚙ icon on the top right of the Speckle Manager window.
![image](https://user-images.githubusercontent.com/2679513/112290969-a1535a00-8c87-11eb-82f8-8e3a4b630e7c.png)

From here you'll be able to do various things such as clearing your local cache, resetting Speckle Manager, allowing beta versions etc.

![image](https://user-images.githubusercontent.com/2679513/112291184-cc3dae00-8c87-11eb-9c02-693108f499fb.png)

### Resetting Manager
This resets the list of installed connectors but it does not uninstall them. It also does not affect any accounts.

### Resetting the local cache

The local cache is used when sending and receiving to Speckle to speed up similar operations in the future. If you notice your cache is significantly large, you can delete it from here.

### Using Beta Versions of Manager
Toggling this setting on **on** will enable beta versions of Manager. This means that every time we make a beta release you'll be able to install it as well. 
If you are experiencing issues with Manager we might ask you do so to try a new version we have made.


### Using Beta Versions of our Connectors

Toggling this setting on **on** will enable beta versions of connectors. This means that every time we make a beta release you'll be able to install it as well.
In general, **you should not enable this setting unless you have been asked to**, this could happen when we are trying to release a fix for a specific issue affecting you.

To uninstall the beta version of a connector and to return to its latest stable release, just do the following:

- set the beta toggle to **off**
- uninstall & reinstall the connector

### SUUID

The Speckle Unique User ID is an anonimized identifier which can help us debug issues you're running into. You might be asked to share it in case you're facing bugs we cannot replicate ourselves.

## Troubleshooting

Having issues with Speckle Manager? Try the solutions below:

_Cannot log into your account?_ Check if the [Speckle server might be blocked](https://speckle.guide/user/FAQs.html#the-speckle-server-is-unreachable)
_Cannot see any Connectors?_ Check if the [connectors url might be blocked](https://speckle.guide/user/FAQs.html#the-speckle-server-is-unreachable)
_Cannot install any Connectors?_ Try disabling your antivirus and/or ask IT to trust our Certificate:

![image](https://user-images.githubusercontent.com/2679513/129898042-0783221c-de08-4054-8afc-51298abb88f6.png)

Still having problems? Help us troubleshoot your issues by doing the following:

- Open the settings page
- Click on **Open Dev Tools**, a new window will open
- Try reproducing you issue and if you see any text in the Dev Tools take a screenshot
- Take a note of you `SUUID`
- Send us a message on the [forum](https://speckle.community)!

## License

Speckle Manager is free to use and will always be.
To use it you need to agree to its [End User License Agreement](https://speckle.systems/eula/).
