# Core Concepts

Understanding the core concepts in specklepy is essential for working effectively with the platform.
This guide introduces the fundamental ideas and their practical applications in managing AEC data.

## Base Objects

Base objects are the fundamental building blocks in Speckle. Every piece of data you work with inherits from the Base class.
This allows for a flexible and extensible approach to creating, managing, and sharing AEC data.

Why Use Base Objects?

1. Dynamic Properties: Add properties dynamically at runtime to adapt to changing requirements.
2. Typed Objects: Define specific object types with custom properties.
3. Custom Type Names: Assign domain-specific type names for better organization and clarity.

```python
from specklepy.objects import Base

# Basic object with dynamic properties
obj = Base()
obj.dynamic_property = "value"  # Add properties dynamically
print(obj.dynamic_property)  # Outputs: value

# Create a typed object
class Wall(Base):
    height: float = 0.0
    width: float = 0.0

wall = Wall()
wall.height = 3.0
wall.width = 0.3
print(wall.height, wall.width)  # Outputs: 3.0, 0.3

# Define a custom type name
class Beam(Base, speckle_type="Elements.Structural.Beam"):
    length: float = 0.0

beam = Beam()
beam.length = 5.0
print(beam.speckle_type)  # Outputs: Elements.Structural.Beam
```

Best Practices:

- Use dynamic properties for flexibility but prefer typed objects for predictable structures.
- Follow naming conventions for custom types (Namespace.Category.Type) to ensure clarity and consistency.
- Document expected properties and their units.
Real-World Application:
In an AEC workflow, Base objects could represent components like walls, beams, or furniture, allowing teams to iterate and customize data as project requirements evolve.

## Transport System

The transport system in Speckle moves data between applications, local storage, and cloud servers. It is designed for flexibility and scalability, enabling both local workflows and global collaboration.

Why Use Transports?

1. Local Storage: Cache frequently used data for faster access.
2. Server Communication: Share data with your team or store it long-term.
3. Hybrid Workflows: Combine multiple transport types for robust workflows.

Example: Sending Data with Transports

```python
from specklepy.api import operations
from specklepy.transports.server import ServerTransport
from specklepy.transports.sqlite import SQLiteTransport

# Local cache (default)
sqlite = SQLiteTransport()

# Server transport
server = ServerTransport(
    stream_id="your-stream",
    token="your-token",
    url="https://speckle.xyz"
)

# Send using multiple transports
obj_id = operations.send(
    base=wall,
    transports=[sqlite, server]
)
```

Best Practices:

- Always include a local transport for caching when using a server transport.
- Use meaningful transport scopes and names for better organization.
- Avoid sending large, monolithic models. Use chunking and detaching where appropriate.

Real-World Application:
Architects can use transports to sync data between local workstations and cloud servers,
ensuring seamless collaboration across dispersed teams.

## Units & Geometry

Speckle handles units explicitly to ensure consistency across teams and applications. Geometry in Speckle is unit-aware, enabling automatic conversions during data exchange.

Why Specify Units?

1. Consistency: Ensure measurements are interpreted correctly across different applications.
2. Flexibility: Convert units dynamically without losing data integrity.
3. Interoperability: Work seamlessly with collaborators using different unit systems.

Example: Working with Units and Geometry:

```python
from specklepy.objects.geometry import Point
from specklepy.objects.units import Units

# Create geometry with units
pt = Point(x=1, y=2, z=3)
pt.units = Units.mm

# Check units
print(pt.units)  # "mm"

# Unit conversion
pt.units = Units.m  # Values automatically converted
```

Supported Units:

- Metric: mm, cm, m, km
- Imperial: in, ft, yd, mi
- Default: Meters (m)

Best Practices:

- Always define units explicitly when creating geometry.
- Verify units after receiving geometry to avoid misinterpretations.
- Use consistent units within teams to reduce conversion errors.

Real-World Application:
When importing a building model created in meters into a project using millimeters, Speckle ensures automatic conversion, saving time and reducing errors.
