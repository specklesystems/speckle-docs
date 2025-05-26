---
title: Handling Data in Functions
deprecationMessages: automate
---

<Banner />

# Handling Data in Functions

## Core Concepts

Once you've called `receive_version()`, you're now working with standard Speckle data structures. No special Speckle Automate handling is required—everything behaves just like it would in any Speckle-enabled workflow.

Speckle represents building data as a **directed acyclic graph (DAG)**:
- **Objects reference other objects** but never themselves.
- **Properties can be primitive** (strings, numbers) or references to other objects.
- **References are one-way** (parent → child).
- **Common structures** include `elements`, `parameters`, `units`, `applicationId`, and legacy `@` prefixed properties.

[→ Deep dive into Speckle's data model](../dev/decomposition.md)

---

## Strategy Selection

When working with Speckle data, selecting the right strategy for data handling is crucial. Depending on your specific 
needs, you may choose from various strategies such as filtering and collection, hierarchical analysis, or model 
augmentation.

### Flattening: When You Just Need Everything in One List
Sometimes, all you need is every single object in a model—no hierarchy, no context, just a flat list of elements to 
work with. This is especially useful when:

#### When to use?

- You need to apply a bulk operation across all objects (e.g., tagging, filtering).
- You’re exporting data and don’t care about parent-child relationships.
- You want to run quick queries without navigating complex nested structures. 

Unlike filtering and collection, which extracts only relevant objects, and hierarchical analysis, which considers 
relationships, flattening is a brute-force but effective strategy when structure doesn't matter.

```python
def flatten(base):
    """Recursively flattens all objects in a Speckle model into a list."""
    flattened = []

    def traverse(obj):
        if obj is None:
            return
        flattened.append(obj)
        for key, value in obj.__dict__.items():
            if isinstance(value, list):
                for item in value:
                    traverse(item)
            elif hasattr(value, "__dict__"):  # Check if it's a nested object
                traverse(value)

    traverse(base)
    return flattened

```
Usage example:

```python
all_objects = flatten(my_speckle_model)
print(f"Flattened model contains {len(all_objects)} elements.")
```

```csharp
using System.Collections.Generic;
using Speckle.Core.Models;

public static class SpeckleUtils
{
    public static List<Base> Flatten(Base baseObject)
    {
        var flattened = new List<Base>();

        void Traverse(Base obj)
        {
            if (obj == null) return;
            flattened.Add(obj);

            foreach (var prop in obj.GetDynamicMembers())
            {
                var value = obj[prop];

                if (value is List<Base> list)
                {
                    foreach (var item in list)
                        Traverse(item);
                }
                else if (value is Base nestedObj)
                {
                    Traverse(nestedObj);
                }
            }
        }

        Traverse(baseObject);
        return flattened;
    }
}
```

Usage Example:

```csharp
List<Base> allObjects = SpeckleUtils.Flatten(mySpeckleModel);
Console.WriteLine($"Flattened model contains {allObjects.Count} elements.");
```

::: tip Hacker Tip:
You can bea lot simpler in crafting a flatten function for Speckle data, essentially you define the logic to finding children
and then recursively call the function on each child, dumping what you find into a list.
- Simple & Universal – Works on any Speckle model, regardless of complexity.
- Fast Querying – Once flattened, any filtering or analysis can be done without recursion.
- Great for Bulk Operations – Need to tag, validate, or extract properties? Just loop over the list.

Think of this as your "data dump" function—it won’t give you structure, but it will give you everything. and probably the 
best way to get started.
:::


### Filtering and Collection: Extracting Meaningful Data

Sometimes, you don’t care about the full model structure—you just need specific objects based on criteria. This is where 
**filtering and collection** strategies come in handy.

#### When to use?
- You need a quick inventory of elements (e.g., all beams over 10m long).
- You want to run rule-based validation (e.g., missing materials in structural elements).

```python
def collect_elements(base):
    # Define reusable conditions
    is_beam = lambda obj: obj.speckle_type == "Objects.BuiltElements.Beam"
    is_long = lambda obj: getattr(obj, "length", 0) > 10.0
    has_material = lambda obj: "material" in obj.parameters
    
    # Combine for complex queries
    return base.query(lambda obj: 
        is_beam(obj) and is_long(obj) and has_material(obj)
    )
```
```csharp
public IEnumerable<Base> CollectElements(Base baseObject)
{
    return baseObject.Traverse<Beam>()
        .Where(b => b.length > 10.0)
        .Where(b => b.Parameters.ContainsKey("material"));
}
```
::: tip Hacker Tip:
- This method is blazing fast because it avoids unnecessary traversal.
- Combine multiple filters at once to cut down processing time.
:::

### Hierarchical Analysis: Understanding Model Relationships
Not all elements exist in isolation—especially in structural, MEP, or nested families workflows. Sometimes, relationships 
are the critical factor.

#### When to use?

- Structural stability checks (e.g., “Does every floor have enough supporting columns?”).
- MEP system validation (e.g., “Are ducts properly supported?”).
- Logical grouping validation (e.g., “Are walls properly associated with rooms?”).

```python
def analyze_structure(base):
    # Define context-specific rules
    def has_sufficient_support(floor, columns):
        return len(columns) >= 4
    
    for floor in base.query(lambda o: o.speckle_type == "Objects.BuiltElements.Floor"):
        beams = floor.query(lambda o: o.speckle_type == "Objects.BuiltElements.Beam")
        columns = floor.query(lambda o: o.speckle_type == "Objects.BuiltElements.Column")
        
        if not has_sufficient_support(floor, columns):
            floor.parameters["structural_review"] = "insufficient_support"
```
::: tip Hacker Tip:
- Instead of querying the whole model (slow!), query only relevant objects.
- Add metadata ("structural_review": "insufficient_support") so later steps can flag these floors.
:::

### Model Augmentation: Adding Intelligence to Models
Adding custom insights to a model can be a game-changer—whether for validation, compliance, or optimization.

#### When to use?

- You want to tag elements for review based on logic.
- You need to enrich models with additional properties for later use.

```python
async def analyze_and_tag(base, automate_context):
    # Define reusable tagging function
    def tag_element(elem, result):
        elem.parameters["analysis_status"] = result
        
    def analyze_element(elem):
        return "pass" if check_conditions(elem) else "review"
    
    modified = []
    for elem in base.query(lambda o: "BuiltElements" in o.speckle_type):
        elem_copy = elem.duplicate()
        tag_element(elem_copy, analyze_element(elem))
        modified.append(elem_copy)
        
    await automate_context.create_new_version_in_project(
        modified,
        "Analysis Results",
        "Added analysis tags"
    )
```
::: tip Hacker Tip:
- Duplicate before modifying! Directly changing elements can lead to unexpected overwrites.
- This approach creates a new version instead of mutating the original model.
:::

### Data Export: Extracting Information for Reports or External Systems
Data is only as useful as the insights you extract from it. Sometimes, you need to generate reports or export key information for downstream workflows.

#### When to use?

- Generating BOQs (Bills of Quantities).
- Creating PDF reports for compliance reviews.
- Exporting custom datasets for non-Speckle workflows.

```python
async def export_data(base, automate_context):
    # Define data extraction rules
    def extract_metrics(elem):
        return {
            "id": elem.id,
            "type": elem.speckle_type,
            "volume": getattr(elem, "volume", 0)
        }
    
    data = [extract_metrics(elem) 
            for elem in base.query(lambda o: "BuiltElements" in o.speckle_type)]
    
    report = create_report(data)
    await automate_context.store_file_result(
        "analysis.pdf",
        report,
        "application/pdf"
    )
```

```csharp
public async Task ExportData(Base baseObject, AutomationContext automateContext)
{
    // Define data extraction rules
    Dictionary<string, object> ExtractMetrics(Base elem)
    {
        return new Dictionary<string, object>
        {
            { "id", elem.id },
            { "type", elem.speckle_type },
            { "volume", elem.GetProperty("volume", 0) }
        };
    }

    var data = baseObject.Query(o => o.speckle_type.Contains("BuiltElements"))
                         .Select(elem => ExtractMetrics(elem))
                         .ToList();

    var report = CreateReport(data);
    await automateContext.StoreFileResult(
        "analysis.pdf",
        report,
        "application/pdf"
    );
}
```

::: tip Hacker Tip:
- Whatever you determine `extract_metrics()` function to be will isolate logic—making it easy to extend.
- Async workflows ensure the report doesn't block execution.
:::

## Building Reusable Components: Making Your Life Easier

Writing flexible, reusable components means you can apply the same logic across multiple workflows without reinventing the wheel.

```python
class ElementChecks:
    @staticmethod
    def is_type(type_name: str):
    return lambda obj: obj.speckle_type == type_name
    
        @staticmethod
        def has_property(prop_name: str, min_value: float = None):
            def check(obj):
                value = getattr(obj, prop_name, None)
                return value is not None and (min_value is None or value > min_value)
            return check
        
        @staticmethod
        def meets_criteria(criteria: dict):
            return lambda obj: all(
                getattr(obj, prop) == value 
                for prop, value in criteria.items()
            )

class ElementActions:
    @staticmethod
    def tag_for_review(elem: Base, reason: str):
    if "review_notes" not in elem.parameters:
    elem.parameters["review_notes"] = []
    elem.parameters["review_notes"].append(reason)
    
        @staticmethod
        def calculate_metrics(elem: Base) -> dict:
            return {
                "volume": getattr(elem, "volume", 0),
                "material": elem.parameters.get("material", "unknown"),
                "level": getattr(elem, "level", "unknown")
            }
```

### Why does this matter?

- Instead of repeating logic across multiple functions, you centralize it.
- If business logic changes, you only update one place.

Usage example:

```python
def analyze_project(base):
    is_beam = ElementChecks.is_type("Objects.BuiltElements.Beam")
    is_large = ElementChecks.has_property("volume", 10.0)
    
    for elem in base.query(lambda o: is_beam(o) and is_large(o)):
        ElementActions.tag_for_review(elem, "Large beam needs review")
        metrics = ElementActions.calculate_metrics(elem)
```
```csharp
public void AnalyzeProject(Base baseObject)
{
    Func<Base, bool> isBeam = ElementChecks.IsType("Objects.BuiltElements.Beam");
    Func<Base, bool> isLarge = ElementChecks.HasProperty("volume", 10.0);

    foreach (var elem in baseObject.Query(o => isBeam(o) && isLarge(o)))
    {
        ElementActions.TagForReview(elem, "Large beam needs review");
        var metrics = ElementActions.CalculateMetrics(elem);
    }
}
```

## TL;DR: Best Practices for AEC Hackers 🚀
1. Be specific when querying—avoid full model traversals.
2. Use hierarchical queries when relationships matter.
3. Augment models instead of mutating original data.
4. Extract insights into reports for non-Speckle workflows.
5. Build reusable functions to avoid repetitive code.

With these patterns, you’re not just hacking workflows—you’re engineering them.