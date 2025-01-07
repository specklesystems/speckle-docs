# How-to: Work with Large Datasets in specklepy

When working with building data, the key to success is organizing your data effectively. Rather than creating monolithic models, you'll want to:

- Split data into logical, discipline-specific models
- Enable independent loading and editing of components
- Support efficient collaboration
- Manage memory and network resources

This guide will show you how to structure and handle large datasets effectively in specklepy.

## Model Organization and Federation

### Why Split Models?

Instead of creating one massive model containing everything, break your project into logical, discipline-specific models:

```python
from specklepy.core.api.inputs.model_inputs import CreateModelInput

# Create separate models for different disciplines
architecture = client.model.create(
    input=CreateModelInput(
        name="Architectural Design",
        projectId=project_id,
        description="Primary architectural elements and spaces"
    )
)

structure = client.model.create(
    input=CreateModelInput(
        name="Structural Design",
        projectId=project_id,
        description="Primary and secondary structural systems"
    )
)

mep = client.model.create(
    input=CreateModelInput(
        name="MEP Systems",
        projectId=project_id,
        description="Mechanical, electrical, and plumbing"
    )
)
```

Benefits of this approach:

- Teams can work independently
- Faster loading and processing
- Easier version control
- More efficient updates
- Federation handled by viewers or host applications

## Detaching: Essential for Large Models

Detaching is your primary tool for managing large datasets. It lets you:

- Load components independently
- Share common elements
- Manage memory efficiently
- Support collaborative workflows

### When to Use Detaching

Use detaching for:

- Collections of Base objects
- Shared or reusable components
- Large sub-assemblies
- Data that might be accessed independently

```python
from specklepy.objects.base import Base

class ArchitecturalModel(Base, detachable={"levels", "curtainSystems", "furniture"}):
    """Building model split into logical parts"""
    levels: List[Base] = None          # Each floor as separate object
    curtainSystems: List[Base] = None  # Facade systems
    furniture: List[Base] = None       # Furniture types (shared/repeated)
    
class StructuralModel(Base, detachable={"foundation", "framingSystem", "connections"}):
    """Structural model with detachable components"""
    foundation: List[Base] = None      # Foundation elements
    framingSystem: List[Base] = None   # Primary structure
    connections: List[Base] = None     # Connection details
```

### Using Detaching Effectively

Consider access patterns when deciding what to detach:

```python
class Level(Base, detachable={"spaces", "walls", "fixtures"}):
    """A building level with independently loadable parts"""
    spaces: List[Base] = None      # Rooms and areas
    walls: List[Base] = None       # Wall elements
    fixtures: List[Base] = None    # Fixed equipment
    
    # Keep small, frequently accessed data attached
    levelNumber: int = None
    elevation: float = None
    name: str = None
```

### Shared Components

Detaching is particularly useful for repeated elements:

```python
class FurnitureLibrary(Base, detachable={"types"}):
    """Library of furniture types used across the project"""
    types: List[Base] = None  # Each furniture type stored once
    
class Space(Base):
    """A space that references furniture types"""
    furnitureInstances: List[str] = None  # References to furniture types
```

## Working with Large Lists (Chunking)

Chunking is a specialized tool specifically for large lists of primitive values (numbers, strings). It's not for lists of Base objects - use detaching for those instead.

### When to Use Chunking

Only use chunking for:

- Point cloud coordinates
- Mesh vertices/faces
- Analysis results (numeric arrays)
- Other large arrays of primitive values

```python
class PointCloud(Base, chunkable={"points": 1000, "colors": 1000}):
    """Point cloud data with chunked primitive arrays"""
    points: List[float] = None    # XYZ coordinates
    colors: List[int] = None      # RGB values
    
    # Don't chunk these - they're not primitive lists
    metadata: dict = None
    sections: List[Base] = None  # Use detaching instead
```

### What Not to Chunk

❌ Don't use chunking for:

```python
# WRONG: Don't chunk lists of Base objects
class Building(Base, chunkable={"floors": 10}):  # No! Use detaching instead
    floors: List[Base] = None

# RIGHT: Use detaching for Base objects
class Building(Base, detachable={"floors"}):
    floors: List[Base] = None
```

## Transport Strategies for Large Models

When working with multiple models and detached components:

```python
from specklepy.api import operations
from specklepy.transports.server import ServerTransport
from specklepy.transports.sqlite import SQLiteTransport

# Set up transports
local = SQLiteTransport(
    scope="ProjectA",
    name="StructuralDesign"  # Organize by discipline
)

server = ServerTransport(stream_id="your-stream")

# Send structural model
operations.send(
    base=structural_model,
    transports=[local, server]
)

# Send architectural model separately
operations.send(
    base=architectural_model,
    transports=[local, server]
)
```

## Best Practices for Large Projects

1. **Model Organization**
   - Split by discipline
   - Create logical sub-models
   - Use federation rather than massive single models
   - Consider access patterns

2. **Detaching Strategy**
   - Detach large collections of Base objects
   - Detach shared/reused components
   - Keep related data together
   - Consider collaborative workflows

3. **Data Access Patterns**
   - Load only what's needed
   - Use references for shared data
   - Cache frequently accessed components
   - Plan for incremental loading

4. **Memory Management**

   ```python
   def process_large_model(model_id, project_id):
       """Process a large model in parts"""
       # Get model data
       model = client.model.get(
           model_id=model_id,
           project_id=project_id
       )
       
       # Process each level independently
       for level in model.levels:
           # Load level data
           level_data = operations.receive(
               obj_id=level.id,
               remote_transport=transport
           )
           
           # Process level
           process_level(level_data)
           
           # Clear memory
           del level_data
   ```

5. **Collaboration Workflow**
   - Use separate models per discipline
   - Coordinate through versions
   - Share references not copies
   - Plan update strategies

## Example: Large Project Structure

Here's a typical large project organization:

```python
# Create models for each discipline
models = {
    "arch": client.model.create(
        input=CreateModelInput(
            name="100-Architectural",
            projectId=project_id
        )
    ),
    "struct": client.model.create(
        input=CreateModelInput(
            name="200-Structural",
            projectId=project_id
        )
    ),
    "mep": client.model.create(
        input=CreateModelInput(
            name="300-MEP",
            projectId=project_id
        )
    )
}

# Track relationships between models
def update_model_version(model_id, object_id, dependencies):
    """Create new version with tracked dependencies"""
    message = "Model Update\n\nDependent Models:\n"
    
    for dep in dependencies:
        message += f"- {dep['name']}: Version {dep['version']}\n"
    
    client.version.create(
        input=CreateVersionInput(
            objectId=object_id,
            modelId=model_id,
            projectId=project_id,
            message=message
        )
    )
```

Remember:

- Split large projects into discipline models
- Use detaching for Base object collections
- Only use chunking for primitive value lists
- Plan for federation in viewers/applications
- Consider team workflows and access patterns
