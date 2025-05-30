---
title: Reporting Success
deprecationMessages: automate
---

<Banner />

# Reporting Success

Effective execution reporting ensures visibility, debugging efficiency, and robust automation workflows. 
Functions must clearly communicate their success or failure states.

## Status Reporting Methods

```python
async def automate_function(runCtx: AutomateContext):
    try:
        # Function logic
        results = process_data()
        if results.is_valid:
            await runCtx.mark_run_success(
                "Analysis completed successfully: Found 5 valid elements"
            )
        else:
            await runCtx.mark_run_failed(
                "Analysis completed but found invalid elements"
            )
    except Exception as ex:
        await runCtx.mark_run_failed(str(ex))
        raise
```
#### Why?
- Asynchronous execution supports event-driven workflows.
- The try-except block ensures errors are caught and reported.
- Explicit success/failure messages provide clarity.

```csharp
public static async Task Run(AutomationContext context)
{
    try
    {
        // Function logic
        var results = ProcessData();
        if (results.IsValid)
        {
            await context.MarkRunSuccess(
                "Analysis completed successfully: Found 5 valid elements"
            );
        }
        else
        {
            await context.MarkRunFailed(
                "Analysis completed but found invalid elements"
            );
        }
    }
    catch (Exception ex)
    {
        await context.MarkRunFailed(ex.Message);
        throw;
    }
}
```
#### Why?

- Uses Task for async execution to integrate with automation workflows.
- Ensures the function reports status before exiting.
- Encapsulates logic within try-catch to prevent silent failures.

## Status Types and When to Use Them



| Status    | Method                    | When to Use                                              |
|-----------|---------------------------|----------------------------------------------------------|
| Success   | mark_run_success()        | Function executes correctly and returns expected results |
| Failed    | mark_run_failed()         | Function completes but results are invalid or not useful |
| Exception | mark_run_failed() + raise | Function crashes due to unexpected errors                |

#### Why?

- Explicit status codes streamline debugging and monitoring.
- Differentiates between an expected failure and a catastrophic error.
- Enables structured logging for automated workflows.

## Best Practices for Execution Reporting
1. Always Report Final Status
   - Unreported failures leave automation in limbo.
2. Use Meaningful Messages
   - Generic errors like "Process failed" are useless in debugging.
3. Choose the Right Status Type
   - A function that runs but produces bad data should be marked as failed, not as an exception.
4. Include Relevant Metrics
   - If processing a batch, report counts (e.g., "5 valid elements found").
5. Handle All Error Cases
   - Assume the worst: anticipate network failures, malformed data, and external system issues.