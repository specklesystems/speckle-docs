# Manager (Legacy)

> ⚠️ **Notice**: This user guide is based on the legacy Speckle Manager.  
> 🚀 **Next Gen connectors** now support built-in account sign-in and can be downloaded individually.

## What Is Speckle Manager?

**Speckle Manager** was originally created to help users install and manage multiple Speckle connectors and accounts from a single place. While it’s still available, **it is no longer required** for using Speckle.

### ✅ Recommended Today

Visit the [**Connectors Portal**](https://app.speckle.systems/connectors) to download the latest **Next Gen connectors**, each with:

- Built-in **account sign-in**
- Simple, standalone installers
- No dependency on Manager



## When to Use Manager

You may still find Manager useful if:

- You want a central place to install and update multiple connectors at once
- You are using legacy or v2 connectors that haven’t been updated yet
- You’re managing multiple Speckle accounts



## Download Manager or Legacy Connectors

Looking for Manager or an older connector?

👉 **[Download from Legacy Connectors Page](https://releases.speckle.systems/legacy-connectors)**

Manager works on both Windows and macOS (with some limitations) and updates automatically.

> 💡 Manager does **not** require admin privileges. Just double-click and run to install.



## Logging In & Managing Accounts

You no longer need Manager to log in to Speckle. Most **Next Gen connectors** now include built-in sign-in, and you can also manage your accounts via [Speckle Web](https://app.speckle.systems).

If you're still using Manager:

1. Open the **Accounts** tab
2. Click **Add Account**
3. Enter your server URL and log in via browser

You can also add accounts manually by [creating a JSON file](#adding-accounts-manually).



## Installing & Updating Connectors in Manager

In Manager, the **Connectors** tab allows you to:

- Install or remove connectors
- View which versions are installed
- Update connectors as new versions are released
- Access beta versions if enabled

  ![image](https://github.com/user-attachments/assets/38d2c395-574b-41e6-a5f3-9cb6bbc35673)


> 💡 **Tip:** The latest connectors are best installed directly from the [Connectors Portal](https://app.speckle.systems/connectors).



## Advanced Settings

Access advanced options by clicking the ⚙ icon in the top-right corner of the Manager window.

From there, you can:

- Reset local cache
- Enable beta versions
- Change the default server
- View logs for troubleshooting

---

## Adding Accounts Manually

If you prefer, you can add an account manually without Manager:

1. [Generate a token](https://speckle.guide/dev/tokens) for your Speckle account
2. Create a `.json` file with this structure:

```json
{
  "token": "YOUR-TOKEN-HERE",
  "serverInfo": {
    "name": "Server Name",
    "company": "Company Name",
    "url": "https://YOUR-SERVER-URL-HERE"
  },
  "userInfo": {
    "id": "YOUR-USER-ID",
    "name": "First Last",
    "email": "firstlast@email.com"
  }
}
```
Save the file to:
- Windows: %appdata%\Speckle\Accounts\
- macOS: ~/.config/Speckle/Accounts
- Linux: ~/.local/share/Speckle/Accounts


## Troubleshooting
Still having issues?
- Check if the Speckle server is blocked
- Visit the Speckle Community Forum

To help us debug:
1. Go to Settings ⚙
2. Enable logging
3. Reproduce the issue
4. Copy/paste logs to the forum.

## License
Speckle Manager is free to use and always will be.
Use of Manager is subject to our End User License Agreement.
