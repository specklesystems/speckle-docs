# How-to: Work with Base Objects

## Creating Custom Types

Create typed objects by inheriting from `Base`:

```python
from specklepy.objects.base import Base

class Wall(Base):
    height: float = 0.0
    width: float = 0.0
    material: str = "concrete"

# Create instance
wall = Wall(height=3.0, width=0.3)
```

Specify custom type names using `speckle_type`:

```python
class Beam(Base, speckle_type="Elements.Structural.Beam"):
    length: float = 0.0
```

## Dynamic Properties

Add properties dynamically at runtime:

```python
obj = Base()
obj.custom_prop = "value"
obj.nested = Base()
obj.nested.prop = 42
```

Access properties using dot notation or dictionary style:

```python
value = obj.custom_prop
value = obj["custom_prop"] 
```

## Property Validation

Properties are type-checked at runtime:

```python
class Column(Base):
    height: float
    
column = Column()
column.height = "invalid"  # Raises SpeckleException - expected float
```

Supported types:

- Basic: int, float, str, bool
- Collections: List, Dict, Optional
- Other Base objects
- Enums

## Detaching

Use detaching for properties that should be stored as separate objects:

- Referenced geometry
- Shared components
- Large sub-objects
- Collections of Base objects

```python
class Model(Base, detachable={"geometry"}):
    geometry: List[Base]  # Stored as separate objects
```

## Chunking

Use chunking specifically for large lists of primitive values:

- Arrays of numbers (vertices, indices)
- Lists of coordinates
- Other numeric data collections
- NOT for lists of Base objects (use detaching instead)

```python
class Mesh(Base, chunkable={"vertices": 1000}):
    vertices: List[float]  # Split into chunks of 1000
```

## Data Access & Traversal

Get property names:

```python
obj.get_member_names()  # All properties
obj.get_typed_member_names()  # Defined properties
obj.get_dynamic_member_names()  # Runtime properties
```

Count children:

```python
child_count = obj.get_children_count()
```

Get object ID (hash):

```python
obj_id = obj.get_id()
```

## Serialization

Convert to dictionary:

```python
obj_dict = obj.to_dict()
```

Use the operations module for full serialization:

```python
from specklepy.api import operations

# Serialize
serialized = operations.serialize(obj)

# Deserialize
obj = operations.deserialize(serialized)
```

## Best Practices

1. Use type hints for all properties in custom classes

2. Set meaningful default values

3. Use descriptive speckle_type names following convention:
   - Namespace.Category.Type
   - e.g. "Elements.Structural.Beam"

4. Choose between chunking and detaching:
   - Use detaching for Base object collections and referenced data
   - Use chunking for large lists of primitive values
   - Never chunk lists of Base objects

5. Document custom types:
   - Property descriptions
   - Units expectations
   - Usage examples

6. Validate data:
   - Check required properties
   - Verify value ranges
   - Handle edge cases
