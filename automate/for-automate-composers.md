# For Automators

### Designing Automation Workflows
- **Automation Workflows**: Automations are triggered by new versions published to a given model within a project. Automation will execute a function and pass the published data and any configuration parameters to it.
- **Creating Workflows**: Follow a step-by-step guide to assemble workflows using pre-built and custom functions, making it easy to automate processes efficiently.

### Viewing Automation Runs

From your automation list, you can view each automation by name, the function it is deploying, and the associated project and model. If an automation has been disabled, it will display a Paused icon.

![A registered automation](./img/paused-status.png)

If a model no longer exists, the automation will be automatically disabled, and a notification banner will appear under the details header.

![model removed error](./img/model-error.png)

Below the automation details, you will see a list of all runs, including their status, the model version they ran on, start time, duration, and a link to view the log output of each run. The status can be:
- Pending  
- Running  
- Success  
- Failure  

![automation run indicating success](./img/run-success.png)

Clicking on the details header opens the Automation page, where you can manage additional configurations.

### Managing Automation Configurations

- **Editing Details**: Click "Edit" to rename an automation or toggle its enabled state.
- **Enable and Disable**: Automations will automatically run on a new version of the selected model. If this is no longer needed, you can disable and re-enable it anytime.
- **Amend Function**: Clicking on the function card allows you to:
  - Select a different function version.
  - Modify its configuration details.
  - See if the function is set to the latest revision.
- **Trigger Automation**: If the model exists, you can manually trigger the automation even if it is disabled. This will use the latest version as the source.
- **Review Runs**: The same detailed run review is available on the dedicated Automation page.
- **Version Control**:
  - Automations are tied to a specific model and project. By default, automations use the latest version of a function.  
  - If a function revision becomes available, you will be notified that your automation is not using the newest version. You can choose to update it or continue using the existing version.
  - Note: While the underlying API supports auditing the version of automation at a specific time, this is not currently available in the user interface.

### Collaboration
- **Functions**: By default, functions are source-available. Once created, they can be accessed by anyone with repository permissions. For private functions, access depends on Workspace permissions or the original function author’s GitHub settings.
- **Automations**: Automations are tied to the Automator's account, which must have the **owner** role for the associated project.
