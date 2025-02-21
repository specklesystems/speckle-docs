# How-to: Work with Transports

## What are Transports?

Transports are Speckle's way of moving data between different locations. Think of them as specialized delivery services - each type of transport is optimized for a specific kind of "journey" your data might need to take:

- From your application to your local computer
- From your computer to a Speckle server
- Between different applications
- Into temporary memory for testing

## Why Do We Need Different Transports?

Different scenarios require different approaches to handling data:

- **Local Storage**: When you need fast access to data you use frequently
- **Server Communication**: When sharing data with others or storing it long-term
- **Memory Storage**: When running tests or doing temporary operations

## Available Transport Types

### 1. SQLiteTransport

This is your local storage system. It saves data on your computer in a SQLite database, making it fast to access and reliable.

```python
from specklepy.transports.sqlite import SQLiteTransport

# Basic setup - stores data in default location
transport = SQLiteTransport()

# Custom setup - store data where you want it
transport = SQLiteTransport(
    base_path="C:/MySpeckleData",  # Where to store the data
    scope="ProjectA",              # Organize data by project
    name="Design Phase 1"          # Give it a meaningful name
)
```

When to use SQLiteTransport:

- ✅ Caching frequently used data
- ✅ Working offline
- ✅ Need fast access to data
- ❌ Sharing data with others
- ❌ Long-term cloud storage

### 2. ServerTransport

This transport handles communication with Speckle servers. It's like a courier service for your data - packaging it up, sending it over the internet, and making sure it arrives safely.

```python
from specklepy.api.wrapper import StreamWrapper
from specklepy.transports.server import ServerTransport

# Recommended way - StreamWrapper handles authentication automatically
wrapper = StreamWrapper("https://speckle.xyz/projects/3073b96e86")
transport = wrapper.get_transport()

# Alternative manual setup
transport = ServerTransport(
    stream_id="3073b96e86",
    token="your-token",
    url="https://speckle.xyz"
)
```

When to use ServerTransport:

- ✅ Sharing data with team members
- ✅ Long-term storage of projects
- ✅ Collaboration across different locations
- ❌ Need super fast access
- ❌ Working completely offline

### 3. MemoryTransport

This transport keeps data in your computer's memory (RAM). It's fast but temporary - everything is lost when your program ends.

```python
from specklepy.transports.memory import MemoryTransport

transport = MemoryTransport()
```

When to use MemoryTransport:

- ✅ Running tests
- ✅ Temporary data processing
- ✅ Need extremely fast access
- ❌ Need to store data permanently
- ❌ Working with large datasets

## Sending Data: How It Works

When you send data using transports, several things happen behind the scenes:

1. Your data is serialized (converted into a format that can be stored/transmitted)
2. The transport checks if it needs to break large data into chunks
3. The data is stored or transmitted according to the transport type

Here's how to send data:

```python
from specklepy.api import operations
from specklepy.objects.base import Base

# Create some data
building = Base()
building.height = 100
building.floors = 25

# Send using multiple transports (recommended)
obj_id = operations.send(
    base=building,
    transports=[
        SQLiteTransport(),  # Local cache for fast access
        server_transport    # Server storage for sharing
    ]
)

# The returned obj_id is like a tracking number - 
# you can use it to retrieve your data later
```

## Receiving Data: The Process

When receiving data, Speckle tries to be smart about it:

1. First checks local storage (faster)
2. If not found locally, fetches from server
3. Automatically caches server data locally for future use

```python
# Basic receive operation
received_building = operations.receive(
    obj_id="abc123",
    remote_transport=server_transport
)

# Speckle will cache this data locally so next time it's faster
print(received_building.height)  # 100
```

## Common Scenarios and Solutions

### Scenario 1: Working with Large Models

When dealing with large architectural or engineering models:

```python
# Increase batch size for large models
transport = ServerTransport(
    stream_id="your-stream",
    max_batch_size_mb=20  # Default is 10MB
)

# Use local cache to avoid repeated downloads
sqlite_transport = SQLiteTransport()

obj = operations.receive(
    obj_id="large-model-id",
    remote_transport=transport,
    local_transport=sqlite_transport
)
```

### Scenario 2: Collaborative Project

When multiple team members are working on the same project:

```python
# Set up project access
wrapper = StreamWrapper("https://speckle.xyz/projects/team-project")
transport = wrapper.get_transport()

# Each team member can send updates
obj_id = operations.send(
    base=my_design_update,
    transports=[transport]
)

# Team members can receive updates
latest_design = operations.receive(
    obj_id=obj_id,
    remote_transport=transport
)
```

### Scenario 3: Offline Work

When you need to work without internet access:

```python
# Set up local storage
local = SQLiteTransport(
    scope="OfflineWork",
    name="ProjectBackup"
)

# Store everything locally
operations.send(base=my_work, transports=[local])

# Later, when online, sync with server
server_transport = wrapper.get_transport()
operations.send(
    base=my_work,
    transports=[local, server_transport]
)
```

## Best Practices

1. **Always Use Local Cache**
   - Faster access to data
   - Works offline
   - Reduces server load

   ```python
   operations.send(
       base=obj,
       transports=[SQLiteTransport(), server_transport]
   )
   ```

2. **Handle Errors Gracefully**

   ```python
   try:
       result = operations.send(base=obj, transports=[transport])
   except SpeckleException as ex:
       print(f"Failed to send: {ex}")
       # Implement retry logic or user notification
   ```

3. **Clean Up Resources**

   ```python
   # Always close transports when done
   transport.close()
   ```

4. **Use Meaningful Names**

   ```python
   # Good naming helps with organization
   transport = SQLiteTransport(
       scope="ProjectPhase2",
       name="StructuralAnalysis"
   )
   ```

## Common Issues and Solutions

### "Object Not Found" Errors

```python
# Check if objects exist before trying to receive
has_objects = transport.has_objects([obj_id])
if not all(has_objects.values()):
    print("Some objects are missing!")
```

### Performance Issues

```python
# Use batch operations for multiple objects
transport.begin_write()
for obj in many_objects:
    transport.save_object(obj.id, obj_data)
transport.end_write()
```

### Connection Problems

```python
# Implement retry logic
max_retries = 3
for attempt in range(max_retries):
    try:
        obj = operations.receive(obj_id, transport)
        break
    except SpeckleException:
        if attempt == max_retries - 1:
            raise
        time.sleep(1 * (attempt + 1))
```

Remember: Transports are a fundamental part of how Speckle moves data around. Understanding how they work and when to use each type will help you build more efficient and reliable applications.
