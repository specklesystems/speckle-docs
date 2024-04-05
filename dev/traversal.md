# Traversing Structured Data

Before understanding traversal, it's crucial to recognize the challenges posed by handling structured data in Speckle. Without a method to navigate through complex, hierarchical data structures, you might end up with partial or incorrect data representations. Traversal provides a systematic way to explore Speckle data while capturing the relational context between objects.

The most basic way to consume Speckle objects is simply **[by flattening the Speckle data](/dev/FilteringData.html)**, and consuming objects one by one.
For many use cases, this is all that is required, but often it is necessary to consume Speckle objects **while capturing the hierarchical context of objects**.

**In connectors**, this means traversing received Speckle data **to find convertible objects and their children**.
In these cases, we are converting more than just objects one by one, but also **preserving the hierarchical tree** of parent/child relationships.

::: tip So, What is Traversal?
In practical terms, Traversal is **how we navigate Speckle data** and the relationships between Speckle Objects, to **consume objects with hierarchical context.**

To be concise, traversal aims to transform the [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) topology (*Think of it as a one-way network of objects; no loops allowed*) of a Speckle data **into a pure [tree](https://en.wikipedia.org/wiki/Tree_(graph_theory)) topology** (*a branching hierarchy*). 
:::

The structure of a Speckle data (e.g. from a version) differs depending on the data sent and from which connector.
While it is possible to write code that manually traverses a specific version, by **hardcoding assumptions** its structure, it is often desirable to **write code that can consume any Speckle data, sent from any connector**.
For this, it is necessary to understand the common **rules for how the connectors structure data**, and how this data can be traversed.

This concept is most useful in connectors when receiving and converting data,
but the concept of traversal applies for any use case with the need to preserve and transform the structure of data.

Simply iterating through all Speckle objects and consuming them individually is insufficient. Many types of **objects contain several representations** and reference geometry objects that are part of their definition (rather than separate displayable objects). 

To illustrate this, consider how the `Wall` object is defined:

```csharp
public class Wall : Base
{
    public double height { get; set; }

    public ICurve baseLine { get; set; }

    public string units { get; set; }

    [DetachProperty]
    public List<Base> elements { get; set; }

    [DetachProperty]
    public List<Mesh> displayValue { get; set; }
}
```

The `baseLine` curve forms part of the definition of the wall. And the `displayValue` provides a purely polygonal **mesh representation** of the mesh for display. 

A naïve function that consumes all objects one by one would **blindly consume** the baseline curve, and each mesh `displayValue` **without context** that it’s part of the Wall, nor do we have selectivity to choose which representation is use.

For these objects, it is necessary to be **selective about which properties should be traversed deeper**.

![A wall is a convertible object; the `baseLine` and `displayValue` representations should be ignored from being traversed.](../dev/img/core/selective-traversal.png)

Within the Speckle connectors, **A `Wall` object is considered a convertible object**; the `baseLine` and `displayValue` representations **should be ignored** from being traversed.

This is where traversal functions come into play. These functions **encode the “rules” for which properties should be traversed**. And provides a convenient way to traverse Speckle data without making connector-specific assumptions about its structure.

The **Default Traversal Function** provides a de jure method of traversing Speckle objects, designed around a Speckle converter. This function is used by most of our connectors (with slight deviation) when receiving Speckle objects.

In general, a connector considers an object to be either:

- Convertible directly through a `ToNative` function
- Convertible using displayValue (through a fall-back display value)
- Convertible indirectly (through another conversion, as is the case for, say, `RenderMaterial`)
- Not convertible at all

Different connectors will have **different definitions of a “convertible” object**. There is no definitive list of “convertible” Speckle types. Connector-specific flexibility allows for **targeted interop** workflows and allows for the **intricacies of each host application**.

As part of the default traversal rules, we selectively traverse the properties of “convertible” objects. Only traversing `"elements"` (and its alias `"@elements"`).

All other non-”convertible” objects will be traversed blindly (i.e. they have all properties traversed).

Collections are a special case, As we handle them slightly differently depending on the connector. Some connectors (on receive) ignore all collection structures and convert objects the best way the native application allows. Others will use them to construct Layers, Tags, Collections, Groups etc. 

Be careful when dynamically attaching data to `Collection` objects to avoid inconsistent behaviour. We would advise keeping `"elements"` as the only traversed property. This is something we may consider enforcing in a future version of Core. This doesn’t mean you can’t use dynamic properties on collections, but it does avoid dynamically attaching geometry.

## Using the Traversal Functions

For most use cases, the `DefaultTraversal` function can be used out of the box to consume Speckle objects individually while still retaining the object hierarchy (tree).

The below case demonstrates the `DefaultTraversal` implementation and how it can be used to iterate through the Tree. The `TraversalContext` objects are the tree nodes that contain the `current: Base` object and the `parent : TraveralContext`. Additionally, they contain the name of the parent’s property that was traversed to get to current.

```csharp
async Task Foo(string myStream, ISpeckleConverter myConverter)
{
    // Initialize traversal function with the given converter
    var traversalFunc = DefaultTraversal.CreateTraverseFunc(myConverter);

    // Receive commit object from the stream
    Base commitObject = await Helpers.Receive(myStream);

    // Traverse the commit object
    foreach (TraversalContext context in traversalFunc.Traverse(commitObject))
    {
        // Get the current object in traversal
        Base current = context.current;

        // Get the parent of the current object
        TraversalContext? parent = context.parent;

        // Perform some operation on the current object
        // Replace `DoWork` with your actual functionality
        DoWork(current);
    }
}
```

The above code can be adapted to perform common tasks, such as 

- Filter for walls

```csharp
List<Wall> walls = traversalFunc.Traverse(commitObject)
      .Select(c => c.current)
      .OfType<Wall>()
      .ToList();
```

- Filter for all objects by volume

```csharp
List<Base> smallThings = traversalFunc
      .Traverse(commitObject)
      .Select(c => c.current)
      .Where(b => b["Volume"] is double and < 20)
      .ToList();
```

## The Traversal Rule Builder

Before we delve into customizing traversal rules, let's establish the default rules that are applied during traversal:

**Default Traversal Rules:**

1. For Convertible Objects: Only the "elements" and its alias "@elements" properties are traversed.
2. For Non-Convertible Objects: All properties are traversed, with no exceptions.
3. For Collections: The "elements" property is the only one traversed, to avoid inconsistent behavior.

Now that we understand the default behavior, let's explore how you can create custom rules using the Traversal Rule Builder. The `TraversalRule` builder provides a means to construct a set of rules for how Speckle objects should be traversed. Each rule defines which properties of a Speckle object should be traversed and predicate criteria for when the rule is active for a given Speckle object. 

`GraphTraversal.Traverse(Base)` will perform a depth-first traversal of the provided commit object, adding objects into an internal stack. Rules are executed in order for the current `Base` object. The first rule, whose predicated function holds true, determines which members of said `Base` object are traversed (added to the stack). 

The `DefaultTraversal` contains two simple rules.
A rule is triggered for convertible objects (objects either convertible directly through the converter or through the existence of a `displayValue` property).
For these objects, we only traverse `"elements"` (and `"@elements"`).

The second rule, the default rule, is used for all other objects (i.e. non-convertible objects);
it traverses all properties on an object (with the exception of `Obsolete` and `SchemaIgnore` members)

```csharp
// Implementation of the default traversal function, simplified for brevity
public static GraphTraversal CreateTraverseFunc(ISpeckleConverter converter)
{
    var convertibleRule = TraversalRule.NewTraversalRule()
        .When(converter.CanConvertToNative) //NOTE: only one `When` clause needs to evaluate true, for this rule to hold true 
        .When(HasDisplayValue)
        .ContinueTraversing(ElementsAliases);

    var defaultRule = TraversalRule.NewTraversalRule()
        .When(_ => true) //Always evaluates true
        .ContinueTraversing(AllMembers); //AllMembers returns all non-obsolete members (instance & dynamic)

    return new GraphTraversal(convertibleRule, defaultRule);
}
```

Inside the `DefaultTraversal` class, you will find another traversal function returned by `CreateRevitTraversalFunc`. This function is almost the same as the regular function. However, instead of performing a deep traversal of nested elements. Instead, it halts traversal as soon as it finds a convertible object. Deeper traversal is then performed by the Revit converter, which has more control over the hosting of nested Revit Elements.

```csharp
  public static GraphTraversal CreateRevitTraversalFunc(ISpeckleConverter converter)
  {
    var convertibleRule = TraversalRule.NewTraversalRule()
      .When(converter.CanConvertToNative)
      .ContinueTraversing(None);

    var displayValueRule = TraversalRule.NewTraversalRule()
      .When(HasDisplayValue)
      .ContinueTraversing(ElementsAliases);

    var defaultRule = TraversalRule.NewTraversalRule()
      .When(_ => true)
      .ContinueTraversing(AllMembers);

    return new GraphTraversal(convertibleRule, displayValueRule, defaultRule);
  }
```

### What if I Don’t Use a Converter?

These functions were designed for Speckle connectors, which by design, do not reference the `Objects` assembly.
Because of this, the functions are unaware of the specific object models designed to be convertible.
Thus we use the `ISpeckleConverter` interface to avoid coupling of converter and connector code projects.

However, other use cases may require consuming Speckle data outside of a connector/converter’s software architecture.
Fear not! the traversal functions are flexible in achieving desirable behaviour.
Adapting the `CreateTraverseFunction` function or engineering custom rules to achieve the desired result is possible.

As a quick workaround, you could substitute the `converter.CanConvertToNative` function with a simple `b => b.speckle_type.contains("Objects.Geometry")`. 
This should handle raw geometry, and the `HasDisplayValue` predicate should handle all other types of convertible geometry.
This should give you similar results to our converter’s, though there may be some edge cases where this behaves differently.

### What if I Want Custom Traversal Behaviour?

The `TraverseRule` builder can be used to create **custom rules** and custom traversal behaviour.
A rule is formed by specifying a number of predicate functions and a selection function to select which property name should be traversed when the rule evaluates true.

```csharp
bool predicateFunction(Base b) {... }
IEnumerable<string> memberSelectionFunction(Base b) {... }
    
var myCustomRule = TraversalRule.NewTraversalRule()
        .When(predicateFunction)
        .ContinueTraversing(memberSelectionFunction);
```

### What if I Want to Capture Custom Context?

The `TraversalContext` and `GraphTraversal` classes are designed to be subclassable.
This allows developers to capture additional context such as inherited data e.g. transformation matrices, display styles, render materials, etc.

### What About SpecklePy?

The same Traversal rules are coming to SpecklePy very soon. They are already being used in the Blender connector. The `GraphTraversal` and `ITraversalRule` interface works exactly the same as in Sharp. However, instead of the builder pattern, the constructor args accept `Callable` functions (e.g., regular or lambda expressions).

```python
def get_default_traversal_func(can_convert_to_native: Callable[[Base], bool]) -> GraphTraversal:
    """
    Initialize traversal function for traversing a speckle commit object.
    """
    # Rule for convertible objects
    convertible_rule = TraversalRule(
      [can_convert_to_native],
      lambda _: {"elements", "@elements"},
    )

    default_rule = TraversalRule(
      [lambda _: True],
      lambda o: o.get_member_names(),
    )

    return GraphTraversal([convertible_rule, default_rule])
```

### What About Javascript/Typescrip?

As of now, there's **no immediate plan** to bring this traversal feature to JS/TS. However, we're keen on enhancing Speckle data consumption in JS/TS in the future. If you're interested in this functionality, your feedback can influence our development priorities. Stay connected through our [forum](https://speckle.community) for updates and to share your thoughts.
