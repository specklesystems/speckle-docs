# Viewing Automation Results

There are two entry points to view Automate results:

### From the Model Scene View

A results "doughnut" icon will appear if automation registered against that model is running or has been completed. Clicking on this icon reveals all the automations that have reported results for the currently viewed version.

![Automate results in model scene viewer](/automate/img/scene-viewer-results.png)

Clicking on any of the run cards expands to show details:

![Automation run results card](/automate/img/results-card.png)

- **Status**: Displays the message included with a Fail or Success result.  
- **Attachments**: Lists any artefacts uploaded by the function.  
- **Resulting Models**: Provides the option to add any model version produced by the function.  
- **Results**: Displays each result report, including:
  - Status, category, object count, and message as reported by the function.  
  - Clicking on a results card isolates the objects reported by that card.  
  - A filter function may highlight specific outcomes if the result includes metadata.

    ![result metadata view](/automate/img/result-metadata.png)

### From the Project Dashboard

In the model list or card view, any model with completed automation runs will display the same doughnut icon.

![model-list-indicator](/automate/img/passed-runs.png)

Clicking the doughnut icon in the model list provides a summary similar to the model scene view, with additional options:

![automation list showing all runs passed](/automate/img/all-runs-passed.png)

- **View Results**: Links to the relevant version and uses the results context view to include other models or objects.  
- **Open Model**: Opens the model at its latest version.  
- **View Artefact**: Opens the artefact in a new browser tab (e.g., images) or prompts to download (e.g., files).  
