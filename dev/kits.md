---
title: Object Kits (Obsolete)
deprecationType: developer-obsolete
description: Kits were a way to package object models and conversion routines for interoperability in Speckle. This page covers the basics of kits, their structure, and how they work.
---

<Banner />

# Kits (Obsolete)
 
Kits were originally discussed on the community forum. Check out [the original thread](https://speckle.community/t/introducing-kits-2-0/710)!

## Preamble

This page covers what kits are and do and the basic concepts behind them. [Here can read how to write your own kit](/dev/kits-dev).

::: tip NOTE
Currently kits are only supported by our .NET SDK
:::

## What are Kits?

![what is a kit?|690x195](https://speckle.community/uploads/default/optimized/1X/f7ce9276c37b105133e7eccf0e376ae3093a991d_2_690x195.png)

Kits are at the heart of how Speckle _manages_ interoperability. They are, in a nutshell, a package consisting of:

- **an object model** that defines the structure of the data
- **a set of converters**, implementations for various AEC authoring applications (ie, conversion routines that make the translations happen)

Whenever a connector is "sending to Speckle", it needs to convert data (lines, points, beams, doors, etc.) into this intermediate object model. Upon receiving, the opposite process happens.

::: tip IMPORTANT 🙌
**Kits are not tied into the core of Speckle, they are pluggable.** Anyone can add/remove them as they wish or develop their own.
:::

## How Kits Work

A kit is assumed to be able to handle all element types, geometries and disciplines in use by a user/team/company. This is a core difference from previous iterations of Speckle. If multiple kits are available on a user machine, the user (or system administrators) will be responsible of selecting the default kit.

::: tip IMPORTANT 🙌
Kit selection is not yet available in most of our connectors. We are planning to add it soon!
:::

When a connector needs to convert an object, it will only search for available conversion routines in the selected kit and will not automatically fall back on other kits - this might change in the future!

![Conversion](https://speckle.community/uploads/default/optimized/1X/f9890eead0fb8aa7bbe141a6cf7dd16453b0d176_2_690x449.png)

## Objects

Objects is the name of our default kit. It ships with any of our connectors and it's the perfect base for any customization and/or extension.
You can read more about it in the [Objects kit section](/dev/objects).
