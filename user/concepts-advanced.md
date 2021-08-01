# Advanced Concepts

Congratulations on being an advanced user of Speckle!
You've breezed through our git-based walkthrough guide and have arrived at the hard stuff. 

A lot of careful thought has gone into planning Speckle v2.0.
Its architecture has been designed to be modular, swappable and hackable. Nearly every part of Speckle can be disassembled and customised to your heart's content. 

Want to write your own Speckle Connector? We wrote a guide to help you with that!
Want to run your own Speckle server or embed our Three.js viewer into your Notion document? We've got you covered there, too!

But that's enough talk - let's dive in.

## The Base Object 🟦

The `Base` object is probably not something you'll have to deal with directly when you're just getting started with Speckle. However, it is a helpful concept to be aware of if you want to get into creating custom Speckle objects, work on your own conversions (AKA Speckle Kits), or building scripts and apps on top of Speckle.

### What is the Base Object?

The `Base` object is the building block of Speckle data. It is a dynamic object that is the "base" of all other Speckle objects. The `Base` and other objects that inherit from it have a combination of pre-defined properties (eg `id`, `speckle_type`, `units`) and dynamic properties which can be added on the fly. Property values can also be other `Base` objects such as a `RevitColumn` containing a `Line` representing its base line.

Sending a collection of Revit elements? Each of those elements is being converted into a Speckle Object equivalent which inherits from Speckle's `Base` class. The commit you just created when sending those elements? That is also a `Base` which contains all the Revit elements nested within it.

A key feature of the `Base` object is **decomposition**. This allows you to flag properties as _detachable_; this means they'll exist outside of the parent `Base` object and can be stored or retrieved separately.

For example, if you have several `Beam` and `Wall` elements that all want to reference the same `Level`. Instead of creating multiple copies of this `Level` and storing it within each of the `Beam` and `Wall` objects, you would instead make the `Level` detachable in the `Beam`s and `Wall`s. This allows all the objects to reference the same `Level`, which now only needs to be stored once.

### How do I use the Base Object? 

When using the connectors to send existing data, you won't really need to think about the `Base` object as all this is taken care of for you behind the scenes. The objects in your model are converted to Speckle `Base` objects and then are nested within a parent `Base` object to create the commit - all when you press the "Send" button.

If you are getting into creating your own `Base` objects, our [The Base Object](/dev/base) section and the [Decomposition API](/dev/decomposition) are a great way to get started.

For further information on the `Base` object, see our [deep dive](https://speckle.community/t/core-2-0-the-base-object/782) on the Speckle community forum.

## Speckle Kits 🔀

### What are Speckle Kits? 
We said every part of Speckle is hackable. `Speckle Kits` are probably one of the more accessible hacks we've made possible.

As mentioned previously, Speckle converts all incoming data from various software (Revit, Grasshopper, etc) to its software-agnostic 'Speckle' format. It does this via detailed conversion routines, built to handle each of the support applications' APIs.

However, perhaps you don't like the way Speckle handles `Brep` geometry by default, or you wish we stripped out more data to suit your hyper-fast application. Why not hack one of our translation routines, or (better yet) build your own from scratch?
If this sounds like you, you'll want to read about creating `Speckle Kits`!

::: tip
In short - Speckle Kits are custom translators to get data to (and from) Speckle's native object model.
:::

### How do I use Speckle Kits?
For a detailed overview of Speckle Kits, see our developer section, and our [deep dive](https://speckle.community/t/introducing-kits-2-0/710/37) on the Speckle community forum.

## Transports 💾

### What are Transports?
Speckle data is designed to be serialized and stored in a number of ways: perhaps you keep your Speckle data in Excel, an SQL database or a non-relational DB system? We introduced `Transports` to Speckle 2.0 to give you full control over how and where your data is stored.

### How do I use Transports?
For a detailed overview of Transports, see our developer section, and our [deep dive](https://speckle.community/t/core-2-0-transports/919) on the Speckle community forum.