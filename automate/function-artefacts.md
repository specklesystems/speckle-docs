# Creating Function Artifacts

Functions can generate additional files and artifacts to provide supplementary information and analysis outputs.

## File Artifacts

### Python
```python
def automate_function(runCtx: AutomateContext):
    # Create PDF report
    report_bytes = generate_pdf_report()
    runCtx.create_file_artifact(
        "analysis_report.pdf",
        report_bytes,
        "application/pdf"
    )
    
    # Create CSV data
    csv_data = generate_csv_data()
    runCtx.create_file_artifact(
        "analysis_data.csv",
        csv_data.encode(),
        "text/csv"
    )
    
    # Create image visualization
    image_bytes = generate_plot()
    runCtx.create_file_artifact(
        "analysis_plot.png",
        image_bytes,
        "image/png"
    )
```

### C#
```csharp
public static void Run(AutomationContext context)
{
    // Create PDF report
    byte[] reportBytes = GeneratePdfReport();
    context.CreateFileArtifact(
        "analysis_report.pdf",
        reportBytes,
        "application/pdf"
    );
    
    // Create CSV data
    byte[] csvData = GenerateCsvData();
    context.CreateFileArtifact(
        "analysis_data.csv",
        csvData,
        "text/csv"
    );
    
    // Create image visualization
    byte[] imageBytes = GeneratePlot();
    context.CreateFileArtifact(
        "analysis_plot.png",
        imageBytes,
        "image/png"
    );
}
```

## Supported File Types

| Type | MIME Type | Description |
|------|-----------|-------------|
| PDF | application/pdf | Reports and documents |
| CSV | text/csv | Tabular data exports |
| PNG | image/png | Images and visualizations |
| JPEG | image/jpeg | Images and photos |
| TXT | text/plain | Plain text files |
| JSON | application/json | Structured data |
| HTML | text/html | Web reports |
| XML | application/xml | Structured data |

## Best Practices

1. Include appropriate file extensions
2. Use correct MIME types
3. Handle large files appropriately
4. Generate artifacts after processing
5. Include metadata when relevant