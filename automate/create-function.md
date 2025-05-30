---
title: Creating Functions
deprecationMessages: automate
---

<Banner />

# Creating Functions

If you have a verified account on [app.speckle.systems](https://app.speckle.systems), navigate to a Workspaces-hosted project where you are a collaborator. Go to the Automations tab and select View Functions to see your team's existing functions. To create a new function, click New Function in the top right:
![new function button](/automate/img/new-function-button.png)

This launches the function creation wizard.

---

## Steps to Create a Function

1. **Authorise GitHub**  
   Required only the first time.  
   ![authorise github](/automate/img/authorise-github.png)

   ::: tip 💡 **Authorized OAuth Apps**  
   Speckle Automate will appear under your GitHub account's Authorized OAuth Apps. Access can be revoked at any time, but it is necessary to publish new functions.  
   ![authorised applications](/automate/img/authorised-applications.png)  
   :::

2. **Choose a Template**  
   We currently offer Python and C# templates, reflecting our best-supported SDKs (**specklepy** and **speckle-sharp**). Each includes the Automate SDK for its respective language.

3. **Define Your Function**  
   Some details can be edited later:
   - **Avatar/Logo/Icon** [optional]: Displayed in the functions list.
   - **Name** [required]: Does not need to be unique. Use a descriptive name to help identify the function and its purpose, e.g., `SolarFarmLayout by SolarCorp`.
   - **Description** [required]: A short Markdown-supported description used in the functions list.
   - **Source Application Data Supported** [optional]: Indicate which source applications your function is designed for.
   - **Tags** [optional]: You can further categorise your function with single or multi-word tags, e.g., `Solar_Panels`.
   - **Organisation**: Within Github, if your team works within an organisation, you can select that here. 
   - **Click Next**: The wizard will create your function project on GitHub.

   ::: tip 🧙‍♂️ **Wizard Actions**  
   The wizard handles scaffolding for you:
   - Clones the template project into your repositories.  
     ![repo-title](/automate/img/repo-title.png)  
   - Creates a GitHub action (`.github/workflows/main.yml`) for build and deployment.  
     ![build-and-deploy](/automate/img/build-and-deploy.png)  
   - Injects API interaction environment variables (`SPECKLE_FUNCTION_ID` and `SPECKLE_FUNCTION_TOKEN`).  
     ![repo-secrets](/automate/img/repo-secrets.png)  
   :::

4. **Repository Management**  
   The function wizard creates a private GitHub repository under your account.  
   - **Public vs Private**: Whether you keep this repository private or make it public depends on your team's open-source or source-available development approach. Speckle Automate supports both public and private repositories.
   - **Personal or Organisational Accounts**: Depending on your setup and collaboration needs, you can publish functions from your GitHub account or an organisation's account. Your published function can also be moved from one to the other.

   ::: tip 💡 **Important**  
   Carefully manage repository access based on your team's workflows and requirements.  
   :::

5. **Finalise Your Function**  
   Once created, the function template can be edited and tailored to your business logic.  
   ![function-created](/automate/img/function-created.png)

6. **Next Steps**  
   From the success page, you can:
   - **Open the Repository**: View the project on GitHub.  
   - **Open in Codespace**: Start coding immediately in a virtual environment. Remember to push changes back to GitHub.  
   - **Go to Function**: Navigate to your function’s page within Speckle Automate.

7. **Make a Release**  
   After making the first release on GitHub, your function will only appear in the Functions Library.

---

With these steps, your function is ready for further development, automation, and collaboration!
