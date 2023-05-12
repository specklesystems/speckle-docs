# Manager

Manager for Speckle is the best way to get (almost) all our Connectors installed and up to date on your computer, and if you have more than one Speckle accounts you'll be able to manage them there as well.

## Download

Manager is available for both Windows and Mac (with limitations).
Manager automatically updates when new versions are available.

::: tip
Manager does not require admin privileges! Just double click and run to install it.
:::

Download Speckle Manager now:

- [🔽 Speckle Manager](https://speckle.systems/download/)

![Manager_hZXb0CIu5N 1](https://user-images.githubusercontent.com/51519350/186161062-70f7a7de-c215-4410-9aa7-5f7158b357f0.png)

## Logging In & Adding Accounts

:::tip ✨ NEW

You can now log into your Speckle account/s directly from our main [User Interface](/user/ui2), without the need to have Manager installed.
:::

### From Speckle Manager

Once you have downloaded the Manager, you'll be able to easily add an account. All you need to do is head to the "**Accounts**" menu, click the "**Add Account**" button, and provide your server URL. This will open a browser window where you can log in or register an account on that server and authorise the Speckle Manager.

![manager-add-account](https://user-images.githubusercontent.com/51519350/186378731-2e996b5f-6ef1-4560-b2dd-7e1c3ec5d3ea.png)

### From the Web

Just visit your profile and click "Add account to desktop manager":

![Add Account from Web](https://user-images.githubusercontent.com/51519350/186384404-709a9af4-179e-4a98-8411-abb4223d4563.png)

### During Onboarding

You can also add an account directly from Speckle Web as part of the onboarding process you will see after registering on a new server.

### Adding Accounts Manually

Using Manager to handle your accounts and [Connectors](/#connectors) is the recommended way, but if you'd like to do without it a manual flow is also available.

To manually add an account you first need to [generate a token for your account](/dev/tokens).

Then you can proceed to create a `.json` file with the following data structure:

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

Place the file:
- on Windows, under:  `%appdata%\Speckle\Accounts\` 
- on Mac, under: `~/.config/Speckle/Accounts`
- on Linux, under `~/.local/share/Speckle/Accounts`

## Installing Connectors

:::warning 🤔 Installation Problems

Having problems while installing connectors? Check our [troubleshooting section](/user/manager.html#troubleshooting)!

:::

Manager also shows you the currently available connectors and allows you to install or remove connectors from your machine. Head into the **"Connectors"** menu to see what connectors you have installed and which are available to download. You'll also be able to check which version of each connector you have and update a connector as new versions are released.

![Manager-Install-Connector](https://user-images.githubusercontent.com/51519350/186389527-af5220c8-0cd8-4ab5-9c8d-31c16340b2ab.gif)

### Updating Connectors

You will receive a notification in Speckle Manager when updates for your installed connectors are available. You can then update them from the [Connectors](/#connectors) page.

![Manager-Update-Connector](https://user-images.githubusercontent.com/51519350/186390609-8f2967f4-1b85-4d9b-8e4a-a7d53437dacd.gif)

### Uninstalling Connectors

Just head over the [Connectors](/#connectors) page in Speckle Manager and click **Remove**.

![Manager-Delete-Connector](https://user-images.githubusercontent.com/51519350/186391081-dd70cb38-ec87-43ed-983e-608710c93829.gif)

## Advanced Settings

You can access the Settings page by clicking the ⚙ icon on the top right of the Speckle Manager window.

![Manager-Advanced-Settings](https://user-images.githubusercontent.com/51519350/186392111-fda4cbc4-1ed9-4153-a1e2-82e0198d9c40.png)

From here you'll be able to do various things such as changing the default position, clearing your local cache, allowing beta versions etc.

![Manager-Advanced-Settings-Page](https://user-images.githubusercontent.com/51519350/186392354-f04e2b63-0b8a-44af-9b0d-2ec7add92245.png)

### Resetting the local cache

The local cache is used when sending and receiving to Speckle to speed up similar operations in the future. If you notice your cache is significantly large, you can delete it from here.

### Using Beta Versions of Manager

Toggling this setting **on** will enable beta versions of Manager. This means that every time we make a beta release you'll be able to install it as well.
If you are experiencing issues with Manager we might ask you do so to try a new version we have made.

### Installing Early Versions of our Connectors

To install early version of our connectors, simply head to the _versions_ tab inside a connector.

![Connectors-Install-Beta](https://user-images.githubusercontent.com/51519350/186392925-1263b0d4-48e7-4724-be89-c5d0a01e3506.gif)

### Changing the default Speckle Server address

You can change the default address of the Speckle server in two ways:

- by adding a file named `server` containing the server URL in `%appdata%/Speckle/` (or equivalent Speckle folder in your system)
- by adding an Environment Variable `SPECKLE_SERVER` containing the server URL

## Uninstalling Manager

On Windows, simply head over **Apps & Features**, find **Manager for Speckle** and then click **Uninstall**.

![image](https://user-images.githubusercontent.com/2679513/182909714-1a7f4815-949c-4557-870e-05ede9550f0c.png)

## Preventing Manager from running at Startup

On Windows, Manager will automatically launch on startup to check for new updates.

If you want to disable this functionality, you can simply do so:

- Open the Task Manager, using (e.g.) `Ctrl + Shift + Esc`
- Navigate to the **Startup** tab.
- Find the row with **Manager.exe** and set its **Status** to **Disabled**

![image](https://user-images.githubusercontent.com/2679513/182909877-e6e86778-7cb6-4c79-9a2e-687f49c9694f.png)

## Troubleshooting

Having issues with Speckle Manager? Try the solutions below:

- _Cannot log into your account?_ Check if the [Speckle server might be blocked](https://speckle.guide/user/FAQs.html#the-speckle-server-is-unreachable)
- _Cannot see any Connectors?_ Check if the [connectors url might be blocked](https://speckle.guide/user/FAQs.html#the-speckle-server-is-unreachable)

Still having problems? Help us troubleshoot your issues by doing the following:

- Open the Settings ⚙ page
- Turn the log on
- Try reproducing your issue and copy paste the text in the Connector log
- Send us a message on the [forum](https://speckle.community)!

![image](https://user-images.githubusercontent.com/2679513/182915726-ef32b867-0d44-4cf8-8d4e-2e110b836c84.png)

## License

Speckle Manager is free to use and will always be.
To use it you need to agree to its [End User License Agreement](https://speckle.systems/eula/).
