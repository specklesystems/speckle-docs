# Introduction

Our .NET SDK is called [Core](https://github.com/specklesystems/speckle-sharp/tree/master/Core), and it's part of our [SpeckleSharp repo](https://github.com/specklesystems/speckle-sharp). Together with it you might find useful [Objects](https://github.com/specklesystems/speckle-sharp/tree/master/Objects), our default kit.

Core and Objects are written in .NET Standard 2.0, they've been tested on Windows and MacOS and are being used by all our .NET based connectors.

## Getting started

Before using them [please make sure they are supported by your .NET framework](https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support).

We have published various NuGets to make it simpler to use Speckle in your next .NET project. Here's what's available at the moment:

- Core
- All Transports
- Objects
- All Objects Converters

All our NuGets are prefixed by `Speckle.`. Please don't confuse them with the old v1 packages.

![image](https://user-images.githubusercontent.com/2679513/113474800-0833f880-946a-11eb-8c90-92b23918a0c8.png)

## How to use

Here's a quick summary of the main tasks Core helps you with:

- sending and receiving data to and from multiple transports
- speckle kit management & data conversion (the interoperability core)
- serialization and deserialization

Server specific tasks:

- stream, branch and commit api calls
- update notifications (subscriptions)
- local account management

## Structuring Your Data

Speckle allows you to structure your data in any way you like. Here's a quick example:

```cs
using Speckle.Core.Models;

var myBuilding = new Base()

myBuilding[ "@floors" ] = myFloors;
myBuilding[ "@walls" ] = myWalls;
myBuilding[ "name" ] = "Southwood Park"

```

The `Base` object behaves like a dictionary - with some added Speckle smarts - and lets you organically compose your data in any way you want.

::: tip

For more advanced usage, check [the tests out](https://github.com/specklesystems/speckle-sharp/blob/master/Core/Tests/BaseTests.cs)!
More on `Base` [can be found here](/dev/base)

:::

For advanced use of `Base`, please see how our [BuiltElement classes](https://github.com/specklesystems/speckle-sharp/tree/master/Objects/Objects/BuiltElements) have been structured inheriting from `Base`.


## Sending Data

Sending data to Speckle is also pretty straightforward. Assuming you have SpeckleManager set up locally, all you need to do is:

```csharp
using Speckle.Core.Api;

var commitId = Helpers.Send("Stream URL or ID", data, "My commit message").Result;
```

### Advanced Sending

If you want more control on how and where to your data is Sent, just use some of our lower lever functions.
For instance:

```csharp
using Speckle.Core.Api;
using Speckle.Core.Models;
using Speckle.Core.Transports;



var streamId = "streamId";
var branchName = "main";
var client = new Client(account);

var transport = new ServerTransport(account, streamId);

var objectId = await Operations.Send(
  data,
  new List<ITransport> { transport },
  useDefaultCache,
  onProgressAction,
  onErrorAction, disposeTransports: true);

var commitId = await client.CommitCreate(
  new CommitCreateInput
  {
    streamId = sw.StreamId,
    branchName = branchName,
    objectId = objectId,
    message = message,
    sourceApplication = sourceApplication,
    totalChildrenCount = totalChildrenCount,
  });
```

## Receiving Data

Receiving data from Speckle couldn't be easier when using our SDKs. Assuming you have SpeckleManager set up locally, all you need to do is:

```csharp
using Speckle.Core.Api;

var data = Helpers.Receive("Stream URL or ID").Result;
```

Just use a stream URL or Id to receive from. If the URL contains branchName, commitId or objectId those will be used, otherwise the latest commit from main will be received.

The `Helpers.Receive` takes optional arguments for specifying an `account` (otherwise the default will be used) and for progress/error reporting.

### Advanced Receiving

If you want more control on how and where from your data is Received, just use some of our lower lever functions.
For instance, the code below receives the last commit of a stream from a specific branch:

```csharp
using Speckle.Core.Api;
using Speckle.Core.Models;
using Speckle.Core.Transports;



var streamId = "streamId";
var branchName = "main";
var client = new Client(account);
var branch = await client.BranchGet(streamId, branchName, 1);
var objectId = branch.commits.items[0].referencedObject; // take last commit

var transport = new ServerTransport(account, streamId);

var data = await Operations.Receive(
  objectId,
  remoteTransport: transport,
  onErrorAction: onErrorAction,
  onProgressAction: onProgressAction,
  onTotalChildrenCountKnown: onTotalChildrenCountKnown,
  disposeTransports: true
);

```
## Serializing & Deserializing Data

Getting a JSON representation of your data is easy:

```cs
using Speckle.Core.Api;
using Speckle.Core.Models;

var json = Operations.Serialize(data);

var data = Operations.Deserialize(json);

```

## Using the .NET SDK without Manager

Core has been designed to be used in conjunction with Manager, that's where the account information is basically pulled from.

But you can of course also use Core in environments where Manager is not available, for example in a serverless function.
To do so (and avoid worrying about authentication), we first need to set up a [personal access token](/dev/tokens).

Then, we can create a basic `Account` and pass it to a new `Client` and use the API as usual, see full example below:

```csharp
using Speckle.Core.Api;
using Speckle.Core.Credentials;
using System;

namespace SpeckleSampleApp
{
  class Program
  {
    static void Main(string[] args)
    {
      var account = new Account();
      account.token = "YOUR-PERSONAL-ACCESS-TOKEN";
      account.serverInfo = new ServerInfo
      {
        url = "https://speckle.xyz/"
      };

      var client = new Client(account);
      var stream = client.StreamGet("5dfbeb49c9").Result;
    }
  }
}

```

Alternatively, if you don't want to use a personal access token you'd need to take care of the auth flow yourself, this functionality is not currently present in Core.
