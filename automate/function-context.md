# `AutomationContext` Reference

The **AutomateContext** is your function's interface to Speckle at runtime. It provides:

- Access to model data that triggered the automation
- Authentication for Speckle API interactions
- Methods to report results and analysis findings
- Tools to create new model versions and file artifacts
- Logging capabilities for debugging

Your function receives this context automatically - no setup required.

---

## Properties
::: tip Note
These are listed with their python names, but the C# SDK has equivalent properties
:::

### Core Properties
These properties provide essential context about the current automation run:


- **`automation_run_data`**: The current automation run data as an AutomationRunData object
- **`speckle_client`**: The Speckle client instance used to interact with the Speckle server
- **`server_transport`**: It is unlikely you will need to interact with this directly, as the SDK has methods to abstract this away

### AutomationRunData
The `AutomationRunData` object has the following properties that help with identifying the current run:
- **`project_id`**: The project ID of the current automation run
- **`speckle_server_url`**: The Speckle server URL
- **`automation_id`**: The automation ID the function is configured with
- **`automation_run_id`**: The ID of the current automation run
- **`function_run_id`**: The ID of the current function run
- **`[triggers]`**: The list of triggers that initiated the automation run (this is a single model id for now)

### Configuration values
The Automate runtime also feeds your function with the following data if it has been defined
- **`function_inputs`**: Values for each of your [`FunctionInputs`](./function-inputs.md) fields

---

## Methods

The `AutomationContext` provides a range of methods to interact with Speckle data, manage results, and log progress.

### Working with Data

| Method              | Description                                     | 
|---------------------|-------------------------------------------------|
| `receive_version()` | Retrieve the model data that triggered this run | 

### Reporting Function Success

Use these methods to update the automation run status. Note that if you call multiple status methods, only the last one will be recorded and displayed in the UI. This may cause confusion if multiple status methods are called.


| Method                          | Description                                                                                              |
|---------------------------------|----------------------------------------------------------------------------------------------------------|
| `mark_run_success( message )`   | Report successful completion                                                                             | 
| `mark_run_failed( message )`    | Report failure with details. A failure may be a legitimate result depending on the function use case.    |           
| `mark_run_exception( message )` | Report an exception during execution, this relates to code error or could be for incorrect model format. | 

### Handling Results
These methods help in tagging and categorizing objects with statuses:

| Method                                                               | Description                            | 
|----------------------------------------------------------------------|----------------------------------------|
| `attach_error_to_objects(category, object_ids, message, metadata)`   | Flag objects with issues               | 
| `attach_warning_to_objects(category, object_ids, message, metadata)` | Add warnings to objects                | 
| `attach_success_to_objects(category, object_ids, message, metadata)` | Mark objects as successfully processed | 
| `attach_info_to_objects(category, object_ids, message, metadata})`   | Add informational notes to objects     |

#### Best Practices for object annotations

- Use categories to group related annotations, and provide clear, actionable messages. Include relevant object IDs to help users identify the objects in question.
- Avoid creating too many annotations, _e.g. one per object_. Instead, group related objects and annotate them together.
- Categories can be used to group annotations by severity, type, result description or any other relevant criteria.
- `attach_result_to_objects()` is a generic method that can be used to add any type of annotation to objects. An additional `level` parameter can be used to specify the type of annotation.
- The `metadata` parameter can be used to store additional arbitrary information about the objects, as a key:value store.

::: tip Experimental
The only metadata keys that are currently affecting in the model view UI are `gradient: Bool` and `gradientValues: List[str]` and can be used:
```python
automate_context.attach_info_to_objects(
    category="Gradient Visualization",
    metadata={"gradient": True, "gradientValues": gradient_values},
    message="Values applied to objects in list order",
    object_ids=all_object_ids,
)
```
:::

### Creating function artefacts
Manage new model versions and save result as file/blob artefacts:

| Method                               | Description                                  | 
|--------------------------------------|----------------------------------------------|
| `create_new_version_in_project(...)` | Create a model version in a specific project |
| `store_file_result(...)`             | Save a file or blob as an artefact           |

Working with the returned values of each of these methods is covered in [Handling Results](./function-results.md).

### Context Views
Lastly a property of the `AutomationContext` which is part result part context `context_view` can be used to set the 
view state that will be displayed in the UI when viewing the function results.
This can be used to display a custom view for the function run, it is in the form of the url schema to reference specific 
federations of models and model@version together in a scene.

---

### Further Reading

More detail including code examples for using these methods are covered in:

- [Working with Data](./function-data.md)
- [Reporting Function Success](./function-success.md)
- [Handling Results](./function-results.md)
- [Managing Files](./function-artefacts.md)
