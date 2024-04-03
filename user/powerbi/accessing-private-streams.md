# Accessing Private Models

Once you complete the installation and configuration steps, you can receive “public” models from Speckle. To receive your private models, you need to complete authentication. There are two authentication methods:

- Log in using your Speckle Account.
- With a Personal Access Token.

### **Log-in Using Your Speckle Account**

You can now log in with **any account of any Speckle server**. Here’s how you do it:

<video autoplay muted loop>
  <source src="./img-powerbi/3-login.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

1. First, paste the URL of the private model you want to receive and click “OK”.
2. Select the ”Server URL” option in the credentials pop-up. In our case, it is “**app.speckle.systems**”.
3. Then press the ”**Sign in”** button. This will open a pop-up window prompting you to log into your account and allow the Power BI app to access your user data. This grants `read-only` access, as recommended by Power BI guidelines.

Once the app has been granted access, Power BI will continue fetching the data.

### With a Personal Access Token

Another way of authenticating is with a “Personal Access Token”. Tokens are a form of authentication to grant users secure access to their projects and models. Here is how you do it:

<video autoplay muted loop>
  <source src="./img-powerbi/16-token-access.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

1. Go to your profile on your Speckle server. We’ll use Speckle’s free server: https://app.speckle.systems/profile
2. Under Developer Settings, Create a `New Token`.
3. Give it a descriptive name (such as Power BI Connector), check every option under Scopes, and click `Save`.
4. This will create a token for you. Make sure you copy it. It is the first and last time you’ll be able to see this token. Treat it as a _Password,_ and do not share it with anyone.
5. Go to **Power BI > Options and Settings > Data source settings.**
6. Go to **Global Permissions** and select your Speckle server.
7. After selecting a server, follow **Edit Permissions > Edit > Private Model.** Paste your *Token* into `Personal Access Token` input.

That’s it! Now, Power BI will continue fetching your private data from the Speckle server.

:::tip 📌IMPORTANT
Delete existing servers if you have trouble seeing your server under Data sources. Return to the Speckle Connector and try to receive the same model/version. You’ll have the option to add it from there.

:::
