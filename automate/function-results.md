# Annotating Function Results

Function results can be attached to objects and versions to provide detailed feedback and analysis outcomes.

## Object Annotations

### Python
```python
def automate_function(runCtx: AutomateContext):
    # Analyze objects
    objects_with_issues = []
    
    # Add object annotations
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

### C#
```csharp
public static void Run(AutomationContext context)
{
    // Add object annotations
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

## Version Results

### Python
```python
def automate_function(runCtx: AutomateContext):
    # Create results
    results = [
        ObjectResult("obj_id_1", "Error", "Structural failure risk"),
        ObjectResult("obj_id_2", "Warning", "Load capacity concern"),
        ObjectResult("obj_id_3", "Info", "Cost optimization applied")
    ]
    
    # Create new version with results
    runCtx.create_new_version_with_results(
        objects_with_issues,
        "Analysis Results",
        results
    )
```

### C#
```csharp
public static void Run(AutomationContext context)
{
    var results = new List<ObjectResult>
    {
        new("obj_id_1", "Error", "Structural failure risk"),
        new("obj_id_2", "Warning", "Load capacity concern"),
        new("obj_id_3", "Info", "Cost optimization applied")
    };
    
    context.CreateNewVersionWithResults(
        objectsWithIssues,
        "Analysis Results",
        results
    );
}
```

## Annotation Types

| Type | Method | Use Case |
|------|---------|----------|
| Error | attach_error_to_objects() | Critical issues requiring attention |
| Warning | attach_warning_to_objects() | Potential issues or concerns |
| Info | attach_info_to_objects() | General information or updates |
| Success | attach_success_to_objects() | Positive outcomes or validations |

## Best Practices

1. Use appropriate annotation types
2. Group related annotations by category
3. Provide clear, actionable messages
4. Include relevant object IDs
5. Create new versions for major changes