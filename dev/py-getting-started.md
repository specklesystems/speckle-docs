# Getting Started with specklepy

specklepy is the Python SDK for Speckle, enabling you to interact with the Speckle platform programmatically. It's compatible with Python `>=3.9.0` (`<4.0`) and provides tools for working with AEC data, including geometry creation, data serialization, and server interactions.

## Installation

specklepy can be installed via pip:

```bash
pip install specklepy
```

## Key Components

SpecklePy consists of three main parts:

1. `SpeckleClient`: Interact with the server API (authentication, projects, models)
2. `operations` and `transports`: Send and receive large objects
3. `Base` object and serializer: Create and customize Speckle objects

## Local Data Paths

SpecklePy stores local accounts and object cache databases in the following locations:

- Windows: `%APPDATA%\Speckle` or `<USER>\AppData\Roaming\Speckle`
- Linux: `$XDG_DATA_HOME/Speckle` or `~/.local/share/Speckle`
- Mac: `~/.config/Speckle`


## Authentication

Before interacting with a Speckle server, you need to authenticate. Specklepy offers two authentication methods:

```python
from specklepy.api.client import SpeckleClient
from specklepy.api.credentials import get_default_account

# Initialize client - use your server's URL
client = SpeckleClient(host="speckle.xyz")

# Method 1: Use Speckle Manager account
# Recommended if you've installed Speckle Manager
account = get_default_account()
client.authenticate_with_account(account)

# Method 2: Use personal access token
# Get this from your Speckle server profile
client.authenticate_with_token("your-token")
```

## Creating Your First Project

Projects in Speckle organize your data and collaboration. Each project can contain multiple models and versions.

```python
from specklepy.api.models import Project
from specklepy.core.api.inputs.project_inputs import ProjectCreateInput

# Create a new project
project = client.project.create(
    input=ProjectCreateInput(
        name="First Project",
        description="My first Speckle project"
    )
)

project_id = project.id

# Projects can be public or private
# You can set visibility and other properties during creation
project = client.project.create(
    input=ProjectCreateInput(
        name="Public Project",
        description="A collaborative project",
        visibility="public"
    )
)
```

## Working with Models

Models represent different aspects or iterations of your project. They can contain various types of data, from 3D geometry to analytical results.

```python
from specklepy.core.api.inputs.model_inputs import CreateModelInput

# Create a model within your project
model = client.model.create(
    input=CreateModelInput(
        name="First Model",
        projectId=project_id
    )
)

model_id = model.id

# Models can be organized however you like
# For example, by discipline or phase
architecture_model = client.model.create(
    input=CreateModelInput(
        name="Architecture",
        projectId=project_id,
        description="Architectural design model"
    )
)
```

## Sending Data

specklepy uses a transport system to move data between your application and Speckle servers. The `StreamWrapper` simplifies this process.

```python
from specklepy.api import operations
from specklepy.api.wrapper import StreamWrapper
from specklepy.objects import Base

# Create a simple building object
# Base objects can have any properties you need
building = Base()
building.name = "Simple Building"
building.levels = 5
building.height = 15.0
building.function = "office"

# Setup transport using StreamWrapper
# This handles authentication and server connection
wrapper = StreamWrapper(f"https://speckle.xyz/projects/{project_id}")
transport = wrapper.get_transport()

# Send object to Speckle
object_id = operations.send(
    base=building,
    transports=[transport]
)
```

## Creating a Version

Versions capture the state of your model at a point in time, similar to commits in version control.

```python
from specklepy.core.api.inputs.version_inputs import CreateVersionInput

# Create a version with your data
version = client.version.create(
    input=CreateVersionInput(
        objectId=object_id,
        modelId=model_id,
        projectId=project_id,
        message="Initial version",
        sourceApplication="python"  # Optional: identify the source
    )
)

# You can create multiple versions to track changes
version2 = client.version.create(
    input=CreateVersionInput(
        objectId=object_id,
        modelId=model_id,
        projectId=project_id,
        message="Updated floor heights"
    )
)
```

## Retrieving Data

Data can be retrieved from any version using the transport system:

```python
# Receive object using transport
received = operations.receive(
    obj_id=object_id,
    remote_transport=transport
)

print(received.name)  # "Simple Building"
print(received.levels)  # 5

# Access any custom properties you've added
print(received.function)  # "office"
```

## Next Steps

This guide covered the basics of specklepy. There's much more you can do:

1. **Geometry Creation**: specklepy includes a comprehensive geometry system with support for points, curves, meshes, and more. See the Geometry guide for details.

2. **Custom Objects**: Create your own object types by subclassing `Base` to represent your domain-specific data.

3. **Advanced Features**:
   - Work with multiple transports simultaneously
   - Handle large datasets using chunking
   - Create custom geometric operations
   - Set up real-time subscriptions

4. **Team Collaboration**:
   - Manage project permissions
   - Share models with teammates
   - Track changes through versions

Check out the other guides for detailed information on these topics.
