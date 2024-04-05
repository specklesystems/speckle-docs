# Filtering and Flattening Speckle Data in .NET

::: tip
Make sure you read the [introduction to .NET](/dev/dotnet) before you dive in here! The most important sections you need to cover first are: 

- [Structuring Data](/dev/dotnet.html#structuring-your-data)
- [Receiving](/dev/dotnet.html#receiving-data)

:::

As you know, Speckle data is structured according to the conventions of the host application, domain or mental model of the developer. There is no single canonical way in which data is structured! 

Generally, working with structured data is a bit more difficult, as you need to parse the "graph", or the tree that describes its structure. Nevertheless, this doesn't need to be so! What if we could access all the data inside a given commit and treat it just as any other list? Well, it's actually super easy! 

## Step 1: Let's Flatten the Data

The extension method below flattens any `Base` object into its constituent parts: it returns a list of all its sub-`Base`s. **Simply add this to your project somewhere and you're good to go.** 

::: tip

Once we test this a bit more, we're probably going to add it to our Core SDK - so keep an eye out!

:::

```csharp

public static class Extensions
{
  // Flattens a base object into all its constituent parts.
  public static IEnumerable<Base> Flatten(this Base obj)
  {
    yield return obj;

    var props = obj.GetDynamicMemberNames();
    foreach (var prop in props)
    {
      var value = obj[prop];
      if (value == null) continue;

      if (value is Base b)
      {
        var nested = b.Flatten();
        foreach (var child in nested) yield return child;
      }

      if (value is IDictionary dict)
      {
        foreach (var dictValue in dict.Values)
        {
          if (dictValue is Base lb)
          {
            foreach (var lbChild in lb.Flatten()) yield return lbChild;
          }
        }
      }

      if (value is IEnumerable enumerable)
      {
        foreach (var listValue in enumerable)
        {
          if (listValue is Base lb)
          {
            foreach (var lbChild in lb.Flatten()) yield return lbChild;
          }
        }
      }
    }
  }
}

```

## Step 2: Let's Query the Data

Now that we have our flattening method in place, what can we do? Well - quite a lot! We can now use the power of LINQ to do complex queries on our dataset. For example, let's assume we want to get **all the timber walls** from a given building. How should we do that? Easy: 

```csharp

using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using Speckle.Core.Api;
using Speckle.Core.Models;

// Note: some boilerplate code removed.

// Receive a revit commit (note: you will need a local account on app.speckle.systems for this to work!)
var data = Helpers.Receive("https://speckle.xyz/streams/0d3cb7cb52/commits/681cdd572c").Result;
var flatData = data.Flatten().ToList();

var timberWalls = flatData.FindAll(obj => obj is Objects.BuiltElements.Revit.RevitWall wall && wall.type == "Wall - Timber Clad");

```

Check out the [actual filtered timber walls here, in 3D](https://speckle.xyz/streams/0d3cb7cb52/commits/681cdd572c?filter=%7B%22ghostOthers%22%3Atrue,%22filterBy%22%3A%7B%22type%22%3A%5B%22Wall%20-%20Timber%20Clad%22%5D%7D,%22colorBy%22%3Anull%7D&c=%5B8.38909,-14.62227,21.72508,19.02341,-4.21317,7.28914,0,1%5D)!

Having fun? Let's try a couple more examples! Here's a query that will return all the **windows**:

```csharp

var windows = flatData.FindAll(obj => (string)obj["category"] == "Windows");

```

Here are [the actual elements in our 3D viewer](https://speckle.xyz/streams/0d3cb7cb52/commits/681cdd572c?filter=%7B%22ghostOthers%22%3Atrue,%22filterBy%22%3A%7B%22category%22%3A%5B%22Windows%22%5D%7D,%22colorBy%22%3A%7B%22type%22%3A%22category%22,%22property%22%3A%22category%22%7D%7D&c=%5B-5.7784,-18.86637,18.78367,16.556,-1.104,4.3014,0,1%5D).

For extra fun, let's extract all the [**rooms**](https://speckle.xyz/streams/0d3cb7cb52/commits/681cdd572c?filter=%7B%22ghostOthers%22%3Atrue,%22filterBy%22%3A%7B%22speckle_type%22%3A%5B%22Objects.BuiltElements.Room%22%5D%7D,%22colorBy%22%3Anull%7D&c=%5B-3.83025,-15.78239,24.12586,16.556,-1.104,4.3014,0,1%5D
):

```csharp

var rooms = flatData.FindAll(obj => obj is Objects.BuiltElements.Room);

```


All the **levels**: 

```csharp

// Note: to get only the unique levels, we need to de-duplicate them.
var levels = flatData.FindAll(obj => obj is Objects.BuiltElements.Level).Cast<Objects.BuiltElements.Level>().GroupBy(level => level.name).Select(g => g.First()).ToList();

```

For a more complex query, let's try to create a summary of all the elements on each level. Here's how to achieve this with the power of LINQ: 

```csharp

var elementsByLevel = flatData.FindAll(obj => obj["level"] != null).GroupBy(obj => ((Base)obj["level"])["name"]);
foreach(var grouping in elementsByLevel) {
  Console.WriteLine($"On level {grouping.Key} there are {grouping.Count()} elements.");
}

```

And the output: 

```
On level Level 1 there are 74 elements.
On level Roof Line there are 1 elements.
On level Ceiling there are 4 elements.
On level Level 2 there are 64 elements.
On level Level 1 Living Rm. there are 14 elements.
On level Foundation there are 31 elements.
```

## Conclusion: Structured Data versus Flat Data

Both structured data and flattened data have advantages and disadvantages. The latter lends itself for ETL workflows and various classification based exercises, whereas the former allows for a better model. Dealing with structured data doesn't mean that we can't flatten it and benefit from all processing ease of flattened data. You can use this as a basis for quite a few automation exercises, such as: 
- automatically compiling bills of materials
- checking model quality (ie, why are there two Level 1s, `Level 1` and `Level 1 Living Rm` in that model?)
- creating custom schedules
- and more! 


