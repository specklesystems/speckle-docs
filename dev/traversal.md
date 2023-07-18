# What is Traversal


In practical terms, **how do we navigate Speckle Objects** and their relationships to other Speckle Objects to **consume objects individually?**

The basic example of traversal is simply flattening the Speckle objects graph (directed acyclic graph) to a flat list of Speckle Objects. A slightly more useful form of traversal also preserves objects' directed (one-way) parental hierarchy. i.e. the tree structure of parent → child relationships.

To be concise, traversal aims to transform the directed acyclic graph topology of a Speckle Commit (Version) **into a pure tree topology**. 

### Why do we need it?

When consuming Speckle data from code, it is necessary to understand the **rules for how the data is structured** and how a Speckle Commit (Version) can be traversed.

The structure of a Speckle data (e.g. from a Commit/Version) differs depending on the data sent and from which connector. In comparison, it is possible to write code that manually traverses a commit made by a specific Connector by hardcoding assumptions about the structure of the commit. Often it is desirable to **write code that can consume speckle data sent from any connector**.

For connectors receiving speckle data, this involves traversing for all **convertible** Speckle objects, but this concept applies to any consumers of speckle data.

Simply iterating through all Speckle objects and consuming them individually is insufficient for most applications. Many types of **objects contain several representations** and reference geometry objects that are part of their definition (rather than separate displayable objects). 

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

A naïve function that consumes all objects one by one would **blindly consume** the baseline curve, and each mesh `displayValue` **without context** that it’s part of the Wall, nor can we choose which representation to use.

For these objects, it is necessary to be **selective about which properties should be traversed deeper**.

![A wall is a convertible object; the `baseLine` and `displayValue` representations should be ignored from being traversed.](../dev/img/core/selective-traversal.png)

A wall is a convertible object; the `baseLine` and `displayValue` representations should be ignored from being traversed.

This is where traversal functions come into play. These functions encode the “rules” for which properties should be traversed. And provides a convenient way to traverse speckle data without making Connector-specific assumptions about its structure.

The **Default Traversal Function** provides a de jure method of traversing speckle objects, designed around a Speckle Converter. This function is used by most of our connectors (with slight deviation) when receiving speckle objects.

In general, a Connector considers an object to be either:

- Convertible directly through a `ToNative` function
- Convertible using displayValue (through a fall-back display value)
- Convertible indirectly (through another conversion, as is the case for, say, `RenderMaterial`)
- Not convertible at all

Different connectors will have **different definitions of a “convertible” object**. There is no definitive list of “convertible” Speckle types. Connector-specific flexibility allows for **targeted interop** workflows and allows for the **intricacies of each host application**.

As part of the default traversal rules, we selectively traverse the properties of “convertible” objects. Only traversing `"elements"` (and its alias `"@elements"`) and any dynamic properties.

All other non-”convertible” objects will be traversed blindly (i.e. they have all properties traversed).

Collections are a special case, As we handle them slightly differently depending on the connector. Some connectors (on receive) ignore all collection structures and convert objects the best way the native application allows. Others will use them to construct Layers, Tags, Collections, Groups etc. 

Be careful when dynamically attaching data to `Collection` objects to avoid inconsistent behaviour. We would advise keeping `"elements"` as the only traversed property. This is something we may consider enforcing in a future version of Core. This doesn’t mean you can’t use dynamic properties on collections, but it does avoid dynamically attaching geometry.

# How to use the traversal functions


For most use cases, the `DefaultTraversal` function can be used out of the box to consume Speckle objects individually while still retaining the object hierarchy (tree).

The below case demonstrates the `DefaultTraversal` implementation and how it can be used to iterate through the Tree. The `TraversalContext` objects are the tree nodes that contain the `current: Base` object and the `parent : TraveralContext`. Additionally, they contain the name of the parent’s property that was traversed to get to current.

```csharp
async Task Foo(string myStream, ISpeckleConverter myConverter)
{
    var traversalFunc = DefaultTraversal.CreateTraverseFunc(myConverter);

    Base commitObject = await Helpers.Receive(myStream);

    foreach (TraversalContext context in traversalFunc.Traverse(commitObject))
    {
        Base current = context.current; //Current object
        TraversalContext? parent = context.parent; //Direct parent node in the graph

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

# Traversal Rule Builder


The `TraversalRule` builder provides a means to construct a set of rules for how speckle objects should be traversed. Each rule defines which properties of a Speckle object should be traversed and predicate criteria for when the rule is active for a given Speckle object. 

`GraphTraversal.Traverse(Base)` will perform a depth-first traversal of the provided commit object, adding objects into an internal stack. Rules are executed in order for the current `Base` object. The first rule, whose predicated function holds true, determines which members of said `Base` object are traversed (added to the stack). 

The `DefaultTraversal` contains two simple rules. A rule is triggered for convertible objects (objects either convertible directly through the converter or through the existence of a `displayValue` property). For these objects, we only traverse `"elements"` (alias’ such as `"@elements"`) and dynamic members. We also explicitly ignore some properties here, notably `"displayValue"` and its aliases.

The second rule, the default rule, is used for all other objects (i.e. non-convertible objects); it traverses all properties on an object (with the exception of `Obsolete` and `SchemaIgnore` members)

```csharp
// Implementation of the default traversal function, simplified for brevity
public static GraphTraversal CreateTraverseFunc(ISpeckleConverter converter)
{
    var convertableRule = TraversalRule.NewTraversalRule()
        .When(converter.CanConvertToNative) //NOTE: only one `When` clause needs to evaluate true, for this rule to hold true 
        .When(HasDisplayValue)
        .ContinueTraversing(b =>
        {
            return new[] {"elements", "@elements"}
        });

    var defaultRule = TraversalRule.NewTraversalRule()
        .When(_ => true) //Allways evaluates true
        .ContinueTraversing(b => GetMembers(b)); //GetMembers returns all non-obsolete members (instance & dynamic)

    return new GraphTraversal(convertableRule, defaultRule);
}
```

Inside the `DefaultTraversal` class, you will find another traversal function returned by `CreateRevitTraversalFunc`. This function is almost the same as the regular function. However, instead of performing a deep traversal of nested elements. Instead, it halts traversal as soon as it finds a convertible object. Deeper traversal is then performed by the Revit converter, which has more control over the hosting of nested Revit Elements.

```csharp
  public static GraphTraversal CreateRevitTraversalFunc(ISpeckleConverter converter)
  {
    var convertableRule = TraversalRule.NewTraversalRule()
      .When(converter.CanConvertToNative)
      .ContinueTraversing(None);

    var displayValueRule = TraversalRule.NewTraversalRule()
      .When(HasDisplayValue)
      .ContinueTraversing(b =>
      {
          return new[] {"elements", "@elements"}
      });

    var defaultRule = TraversalRule.NewTraversalRule()
      .When(_ => true)
      .ContinueTraversing(b => GetMembers(b));

    return new GraphTraversal(convertableRule, displayValueRule, defaultRule);
  }
```

### What if I don’t need to use a converter

These functions were designed for Speckle Connectors, which by design, do not reference the `Objects` assembly. Thus is unaware of specific object models designed to be convertible/geometry objects. Thus we use the `ISpeckleConverter` interface to avoid coupling of Converter and Connector projects.

However, other use cases may require consuming speckle data outside of a connector/converter’s software architecture. Fear not! the traversal functions are flexible in achieving desirable behaviour.

Adapting the `CreateTraverseFunction` function or engineering custom rules to achieve the desired result is possible.

As a quick workaround, you could substitute the `converter.CanConvertToNative` function with a simple `b => b.speckle_type.contains("Objects.Geometry")`, this should handle raw geometry, and the `HasDisplayValue` predicate should handle all other types of convertible geometry. This should give you similar results to our converter’s, though there may be some edge cases where this behaves differently.

### What if I want custom traversal behaviour

The `TraverseRule` builder can be used to create custom rules and custom traversal behaviour.
A rule is formed by specifying a number of predicate functions and a selection function to select which property name should be traversed when the rule evaluates true.

```csharp
bool predicateFunction(Base b) {... }
IEnumerable<string> memberSelectionFunction(Base b) {... }
    
var myCustomRule = TraversalRule.NewTraversalRule()
        .When(predicateFunction)
        .ContinueTraversing(memberSelectionFunction);
```

### What about Speckle PY?

The same Traversal rules are coming to specklepy very soon. They are already being used in the Blender connector. The `GraphTraversal` and `ITraversalRule` interface works exactly the same as in Sharp. However, instead of the builder pattern, the constructor args accept `Callable` functions (e.g., regular or lambda expressions).

```python
def get_default_traversal_func(can_convert_to_native: Callable[[Base], bool]) -> GraphTraversal:
		"""
		Traversal func for traversing a speckle commit object
		"""

    convertable_rule = TraversalRule(
    [can_convert_to_native],
    lambda _: {"elements", "@elements"},
    )

    default_rule = TraversalRule(
    [lambda _: True],
    lambda o: o.get_member_names(),
    )

    return GraphTraversal([convertable_rule, default_rule])
```

### What about JS?

Right now, we are not planning to implement this any time soon. Our Speckle Viewer does perform a similar traversal process with roughly equivalent behaviour, but not in a flexible rule builder pattern. However, we have goals to support easier consumption of Speckle data in JS, so you may see this function (or something similar) eventually come to JS/TS. Let us know on our forums if this would be useful to you, as this could influence our prioritisation.
