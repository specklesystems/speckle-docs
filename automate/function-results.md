---
title: Annotating Function Results
deprecationMessages: automate
---

<Banner />

# Annotating Function Results

`AutomationContext` provides methods to attach structured annotations to objects, allowing automated analysis and validation 
workflows to provide meaningful feedback.

## Object Annotations

Object annotations enable attaching different types of messages (errors, warnings, informational notes, and successes) to specific objects within an automation run. This helps in tracking issues, communicating insights, and guiding decision-making.

::: tip Why annotate objects?
Annotations allow functions to return structured results, making them actionable in dashboards, reports, and workflows.
:::

Example
```python
from speckle_automate import AutomateContext

def automate_function(runCtx: AutomateContext):
    # Example: Structural validation
    runCtx.attach_error_to_objects(
        "Structural Analysis",
        ["obj_id_1", "obj_id_2"],
        "Beam span exceeds maximum allowable length"
    )
    
    runCtx.attach_warning_to_objects(
        "Load Analysis",
        ["obj_id_3"],
        "Load approaching maximum capacity"
    )
    
    runCtx.attach_info_to_objects(
        "Cost Analysis",
        ["obj_id_4", "obj_id_5"],
        "Material cost optimized"
    )
```

```csharp
public static void Run(AutomationContext context)
{
    context.AttachErrorToObjects(
        "Structural Analysis",
        new[] { "obj_id_1", "obj_id_2" },
        "Beam span exceeds maximum allowable length"
    );
    
    context.AttachWarningToObjects(
        "Load Analysis",
        new[] { "obj_id_3" },
        "Load approaching maximum capacity"
    );
    
    context.AttachInfoToObjects(
        "Cost Analysis",
        new[] { "obj_id_4", "obj_id_5" },
        "Material cost optimized"
    );
}
```

### Annotation Types

| Type    | Method                      | Use Case                                      |
|---------|-----------------------------|-----------------------------------------------|
| Error   | attach_error_to_objects()   | Critical issues requiring immediate action    |
| Warning | attach_warning_to_objects() | Potential concerns needing attention          |
| Info    | attach_info_to_objects()    | General insights and analysis results         |
| Success | attach_success_to_objects() | Positive outcomes or validation confirmations |

## Metadata and Customisation

Annotations can be enriched with additional metadata to improve interpretability and visualization.

::: tip Using Metadata in Annotations
The metadata parameter allows storing arbitrary key-value pairs alongside annotations, making them more descriptive and informative.
:::

Example:

```python
runCtx.attach_info_to_objects(
    "Cost Analysis",
    ["obj_id_4", "obj_id_5"],
    "Material cost optimized",
    metadata={"currency": "USD", "cost_saved": 5000}
)
```

### Gradient Visualization

Certain metadata keys affect how results are displayed in the model viewer:

- `gradient: Bool`: Enables gradient-based visualization.

- `gradientValues: List[str]`: Specifies values to apply to objects.

Example:

```python
runCtx.attach_info_to_objects(
    "Gradient Visualization",
    all_object_ids,
    "Values applied to objects in list order",
    metadata={"gradient": True, "gradientValues": gradient_values}
)
```

## Best Practices

- Use the appropriate annotation type to convey severity accurately.
- Group related annotations into categories for better organization.
- Provide clear, actionable messages to aid decision-making.
- Include relevant object IDs to maintain traceability.
- Leverage metadata for richer annotations and better UI integration.

By leveraging these methods, automation functions can provide structured feedback that enhances decision-making and 
workflow efficiency.