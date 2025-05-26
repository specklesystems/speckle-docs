---
title: Python SDK
deprecationMessages: sdks
---

<Banner />

# Introduction

The Python SDK can be found in our [speckle-py repo](https://github.com/specklesystems/speckle-py), its readme contains instructions on how to build it.
It's compatible with Python 3.6+.

## Installation

You can install it using pip

```console
pip install specklepy
```

## Key Components

SpecklePy has three main parts:

1. a `SpeckleClient` which allows you to interact with the server API
2. `operations` and `transports` for sending and receiving large objects
3. a `Base` object and accompanying serializer for creating and customising your own Speckle objects

### Local Data Paths

It may be helpful to know where the local accounts and object cache dbs are stored. Depending on on your OS, you can find the dbs at:

- Windows: `APPDATA` or `<USER>\AppData\Roaming\Speckle`
- Linux: `$XDG_DATA_HOME` or by default `~/.local/share/Speckle`
- Mac: `~/.config/Speckle`
