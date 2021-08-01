# Writing Your Own Transport

WIP 🚧

Transports help pipe data from one location to another in an efficient way - and make Speckle 2.0 remarkably powerful as you can customize where and how this data goes to. This allows you, as a developer, to even use Speckle "without Speckle".

We currently have a couple of transports scaffolded:

- in memory
- sqlite
- disk
- remote (speckle server)
- mongodb (experimental)

::: tip
Transports are available on NuGet as `Speckle.Transports.*`.
:::

Why are transports really cool? Imagine you want to write your own server, from scratch. To use it in all our connectors, the only thing you need to do is write a transport that uses your server's api!

Another use case would be if you want to simultaneously send your data to a MySQL database. We currently do not support this, but using a custom built transport, you can send your data to it, at the same time as sending it to a Speckle server.

::: tip IMPORTANT 🙌

Where are all the transports?

- Required ones are [here](https://github.com/specklesystems/speckle-sharp/tree/master/Core/Core/Transports) (in-memory, sqlite)
- Extraneous ones are [here](https://github.com/specklesystems/speckle-sharp/tree/master/Core/Transports) (Server, Disk, MongoDB)

:::

Here's how the `ITransport` interface looks like. Beware, it will be cleaned up in the near future!

```cs
public interface ITransport
{
  public string TransportName { get; set; }

  /// <summary>
  /// Saves an object.
  /// </summary>
  /// <param name="id">The hash of the object.</param>
  /// <param name="serializedObject">The full string representation of the object.</param>
  public void SaveObject(string id, string serializedObject);

  /// <summary>
  /// Saves an object, retrieving its serialised version from the provided transport.
  /// </summary>
  /// <param name="id">The hash of the object.</param>
  /// <param name="sourceTransport">The transport from where to retrieve it.</param>
  public void SaveObject(string id, ITransport sourceTransport);

  /// <summary>
  /// Gets an object.
  /// </summary>
  /// <param name="id">The object's hash.</param>
  public string GetObject(string id);

  /// <summary>
  /// Copies the parent object and all its children to the provided transport.
  /// </summary>
  /// <param name="id">The id of the object you want to copy.</param>
  /// <param name="targetTransport">The transport you want to copy the object to.</param>
  public Task<string> CopyObjectAndChildren(string id, ITransport targetTransport);
}
```
