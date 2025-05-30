---
title: Function Inputs
deprecationMessages: automate
---

<Banner />

# Function Inputs

When creating Speckle functions, you'll often need users to provide configuration values. Rather than having users edit code or configuration files, the SDK can automatically generate user-friendly form inputs in the web interface.

## Basic Input Types

The most common need is collecting text and numbers from users. You can create these inputs while controlling what values are valid:

### Text and Numbers
```python
class FunctionInputs(AutomateBase):
    project_name: str = Field(
        title="Project Name",
        description="Enter the project identifier"
    )
    
    max_length: float = Field(
        default=10.0,
        title="Maximum Length",
        description="Maximum allowed length in meters",
        gt=0,
        lt=100  # Prevents users entering unrealistic values
    )
```

```csharp
public class FunctionInputs
{
    [DisplayName("Project Name")]
    [Description("Enter the project identifier")]
    public string ProjectName { get; set; }

    [Range(0, 100)]  // Validates user input
    [DisplayName("Maximum Length")]
    [Description("Maximum allowed length in meters")] 
    public double MaxLength { get; set; } = 10.0;
}
```

## Controlling User Choices with Dropdowns

Often you'll want users to select from specific options rather than typing freely. This prevents errors and makes your function more robust. There are two ways to create dropdowns:

### Using Enums (Recommended)
Enums are the cleaner approach when you have a fixed set of options that won't change often:

```python
class AnalysisType(str, Enum):
    STRUCTURAL = "structural"
    THERMAL = "thermal" 
    COST = "cost"

class FunctionInputs(AutomateBase):
    analysis_type: AnalysisType = Field(
        default=AnalysisType.STRUCTURAL,
        title="Analysis Type", 
        description="Select analysis method"
    )
```

```csharp
public enum AnalysisType
{
    [Description("Structural Analysis")]  // What users see in the dropdown
    Structural,                          // What your code receives
    [Description("Thermal Analysis")]
    Thermal,
    [Description("Cost Analysis")]
    Cost
}

public class FunctionInputs
{
    [DisplayName("Analysis Type")]
    public AnalysisType Type { get; set; } = AnalysisType.Structural;
}
```

### Using JSON Schema (Experimental)
Sometimes you need more flexibility or want to generate options dynamically. JSON schema gives you this control, but the 
full schema is only partially supported and may not give desired results in UI:

```python
report_type: str = Field(
    default="detailed",
    title="Report Type",
    json_schema_extra={
        "oneOf": [
            {"const": "detailed", "title": "Detailed Report"},
            {"const": "summary", "title": "Summary Report"}
        ]
    }
)
```

## Protecting Sensitive Data

When your function needs sensitive information like API keys or passwords, use secret fields. These protect users by:
- Masking the input with asterisks
- Encrypting the values in storage
- Only decrypting them when your function runs

```python
from pydantic import SecretStr

class FunctionInputs(AutomateBase):
    api_key: SecretStr = Field(
        title="API Key",
        description="Enter your API key"
    )
```

```csharp 
public class FunctionInputs
{
    [Secret]  // Marks this as sensitive data
    [DisplayName("API Key")]
    public string ApiKey { get; set; }
}
```

## Validating User Input

Help users provide correct data by adding validation rules:

### Python
The SDK uses Pydantic validation:
- `gt`, `lt`: Ensure numbers are greater/less than a value
- `ge`, `le`: Allow numbers equal to the limit
- `min_length`, `max_length`: Control text length
- `pattern`: Match text against a regex pattern

### C#
Use standard .NET validation attributes:
- `[Range]`: Set minimum and maximum numbers
- `[MinLength]`, `[MaxLength]`: Control text length
- `[RegularExpression]`: Match text patterns
- `[Required]`: Mark fields as mandatory
  
## Field Types Comparison Table

| Field Type | Python (Pydantic) Type | C# Type | JSON Representation |
|------------|------------------------|---------|---------------------|
| String     | str (BaseModel)        | string  | { "type": "string" } |
| Integer    | int (BaseModel)        | int     | { "type": "integer" } |
| Float      | float (BaseModel)      | double  | { "type": "number" } |
| Boolean    | bool (BaseModel)       | bool    | { "type": "boolean" } |
| Enum       | enum (Enum)            | enum    | { "type": "enum" } |
