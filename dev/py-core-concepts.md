# Core Concepts

## Base Objects

Base objects are the fundamental building blocks in Speckle. Every piece of data you work with inherits from the Base class.

```python
from specklepy.objects import Base

# Basic object
obj = Base()
obj.dynamic_property = "value"

# Typed object
class Wall(Base):
    height: float = 0.0
    width: float = 0.0

# Custom type name
class Beam(Base, speckle_type="Elements.Structural.Beam"):
    length: float = 0.0
```

## Transport System

Transports move data between applications and storage:

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

## Units & Geometry

Speckle handles units explicitly to ensure consistency:

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

Key points about units:
- Always specify units when creating geometry
- Units are preserved during transport
- Supported units: mm, cm, m, km, in, ft, yd, mi
- Default unit is meters (m)