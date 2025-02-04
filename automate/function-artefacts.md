# Creating Function Artefacts

Speckle Automate provides multiple methods for generating and storing function results, each catering to different use 
cases. The two primary methods—creating a new model version and storing a file artifact—offer different advantages 
depending on the desired outcome.

## Available Methods

| Method                               | Description                                  |
|--------------------------------------|----------------------------------------------|
| `create_new_version_in_project(...)` | Create a model version in a specific project |
| `store_file_result(...)`             | Save a file or blob as an artifact           |

### Understanding Their Use Cases
1. Creating a New Model Version

   This method allows automation functions to produce structured Speckle models, enabling users to store and interact with augmented, synthesized, or entirely new geometry and data.

   #### When to Use It
   This method aligns with workflows where data should remain interactive, allowing downstream applications to consume and manipulate the generated results.
   - **Augmenting an existing model**: Enhancing a source model with derived data, such as clash results, enriched metadata, or structural analysis outcomes.
   - **Synthesizing new geometry**: Generating new elements based on parametric constraints or inferred relationships, such as simplified massing models or AI-assisted design variations.
   - **Contextual model generation**: Constructing additional contextual models (e.g., a terrain model derived from GIS data or a structure inferred from existing conditions).
   


2. Storing a File Artifact

   File artifacts serve as an alternative when the function output is best represented as a document, dataset, or visualization rather than an interactive Speckle model.

   #### When to Use It
   Unlike model versions, file artifacts are adjacent to the Speckle ecosystem, meaning they don’t provide interactive elements within Speckle itself but can be downloaded and used externally.

   - **Exporting non-native formats**: Storing alternative representations of model data, such as:
.obj, .gltf, or .dotbim files for use in third-party applications.
   - **Creating documentation & reports**: Generating PDF reports that summarize results, analysis, or model insights.
   - **Storing structured data**: Outputting .csv or .json files for integration with BI tools or external databases.
   - **Data persistence**: Saving SQLite databases containing structured information that can be queried later.
   - **Multimedia outputs**: Storing images, animations, or even movie files to visualize simulation results.


## Choosing the Right Approach
While object result annotation allows interactive manipulation of automation results, model versions and file artifacts 
serve distinct purposes:

| Need                                          | Use Model Version | Use File Artifact | Use Object Annotation |
|-----------------------------------------------|-------------------|-------------------|-----------------------|
| Data should remain interactive in Speckle     | ✅                 | ❌                 | ❌                     |
| Output should be a structured model           | ✅                 | ❌                 | ❌                     |
| Output should be a downloadable file          | ❌                 | ✅                 | ❌                     |
| External software compatibility needed        | ❌                 | ✅                 | ❌                     |
| Output is a visualization, report, or dataset | ❌                 | ✅                 | ❌                     |
| Annotate specific model objects               | ❌                 | ❌                 | ✅                     |
   
Speckle Automate offers the flexibility to choose the best-fit approach for your workflow. Whether you’re enriching 
project data with new model versions or exporting specialized artifacts, understanding these methods enables greater 
creativity in automation.

### Example: Generating Reports

Speckle Automate functions can generate structured reports in various formats, such as JSON, HTML, and PDF, to document and visualize analysis results.

#### Example: Generating a PDF Report

```python
import os
import tempfile
from fpdf import FPDF

def generate_pdf_report(data, filename):
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_file_path = os.path.join(temp_dir, filename)
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt="Analysis Report", ln=True, align="C")
        pdf.cell(200, 10, txt="Results Summary", ln=True)
        
        for key, value in data.items():
            pdf.cell(200, 10, txt=f"{key}: {value}", ln=True)
        
        pdf.output(temp_file_path)
        automation_context.store_file_result(temp_file_path, "application/pdf")
```

### Example: Creating a New Model Version

Automation functions can generate new structured models, storing enhanced data or derived geometry.

#### Example: Creating a New Model Version in Speckle

```csharp
var newVersion = await CreateNewVersion(
                           automationContext,
                           versionCollection,
                           targetModelName,
                           revitCategory,
                           objects.Count
                       );
```

We can also populate the context view with details of the created model:
```csharp
// Link source and target models
await LinkSourceAndTargetModels(automationContext, targetModelName, newVersion);
```

```csharp
private static async Task LinkSourceAndTargetModels(
     AutomationContext context,
     string targetModelName,
     string newVersion
 )
 {
     var targetModelId = await FindTargetModelId(context, targetModelName);

     if (!string.IsNullOrEmpty(targetModelId))
     {
         var modelVersionIdentifier = $"{targetModelId}@{newVersion}";
         context.SetContextView([modelVersionIdentifier], false);
     }
 }
 
 private static async Task<string> FindTargetModelId(
     AutomationContext context,
     string targetModelName
 )
 {
     var project = await context.SpeckleClient.Project.GetWithModels(
         projectId: context.AutomationRunData.ProjectId,
         modelsLimit: 1,
         modelsFilter: new ProjectModelsFilter(
             search: targetModelName,
             contributors: null,
             sourceApps: null,
             ids: null,
             excludeIds: null,
             onlyWithVersions: false
         )
     );

     return project.models?.items.FirstOrDefault()?.id ?? string.Empty;
 }
```

The `SetContextView` method populates the context view with the newly created model, allowing users to visualize the 
generated data directly within Speckle. The example shows how the AutomateContext SDK contains
all the necessary methods to interact with Speckle data and manage automation results effectively. The combination of the 
context object with the Speckle Sharp SDK (and specklepy) allows for endless possibilities for 
the interaction of model data and the data hub itself.

## Best Practices

1. Include appropriate file extensions
2. Use correct MIME types
3. Handle large files appropriately
4. Generate artifacts after processing
5. Include metadata when relevant
6. Store files in a temporary directory
7. Clean up temporary files after use (a nicety, not a necessity)
