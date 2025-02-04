# Reporting Function Success

Functions must report their execution status to provide clear feedback about their operation.

## Status Methods

### Python
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

### C#
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

## Status Types

| Status | Method | Use Case |
|--------|---------|----------|
| Success | mark_run_success() | Function completed normally |
| Failed | mark_run_failed() | Function encountered errors |
| Exception | mark_run_failed() + raise | Unexpected errors |

## Best Practices

1. Always report final status
2. Include meaningful messages
3. Use appropriate status type
4. Include relevant metrics
5. Handle all error cases