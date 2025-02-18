# How-to: Work with Geometry

## Important Note About Geometric Operations

specklepy provides objects and schemas for representing geometry, but it does not include functionality for geometric computations, analysis, or validation. For these tasks, you will need to integrate with specialized libraries such as:

- **Trimesh** or **PyMesh** for mesh processing
- **PythonOCC** for BREP operations
- **Numpy** for vector math

### What specklepy CAN do

- Programmatically define geometry in text-based formats.
- Serialize and transport geometry efficiently.
- Ensure schema conformance for interoperability.

### What specklepy CANNOT do

- Perform geometric operations like measuring distances or intersections.
- Validate geometric correctness, such as checking for watertight meshes or proper face orientations.

## Available Geometry Objects

specklepy provides base classes for common geometric entities:

```python
from specklepy.objects.geometry import (
    Point,
    Vector,
    Line,
    Polyline,
    Curve,
    Mesh,
    Brep,
    Surface
)

# Basic point
pt = Point(x=1.0, y=2.0, z=3.0)

# Vector with direction
vec = Vector(x=0.0, y=0.0, z=1.0)

# Line between points
line = Line(
    start=Point(x=0, y=0, z=0),
    end=Point(x=10, y=0, z=0)
)
```

## Units

Always specify units when creating geometric objects to ensure proper interpretation:

```python
from specklepy.objects.units import Units

# Create point with explicit units
point = Point(x=1000, y=2000, z=0)
point.units = Units.mm  # Specify as millimeters

# The same point in different units
point.units = Units.m  # Converting to meters
print(point.x)  # Will print 1.0
```

## Creating Simple Geometry

Here's how to create basic geometric objects:

```python
# Create a polyline
polyline = Polyline()
polyline.value = [0,0,0, 1,0,0, 1,1,0, 0,1,0]  # Flattened coordinates
polyline.closed = True
polyline.units = Units.m

# Create a mesh
mesh = Mesh()
mesh.vertices = [0,0,0, 1,0,0, 1,1,0, 0,1,0]  # Vertex coordinates
mesh.faces = [4, 0,1,2,3]  # First number is vertex count for n-gon support
mesh.units = Units.m

# Note: Speckle meshes support n-gon faces (faces with any number of vertices)
# Many mesh libraries including trimesh only support triangles
```

## Working with BREPs

While specklepy can represent BREP geometry, it doesn't perform BREP operations:

```python
# Create a BREP container
brep = Brep()
brep.displayValue = [mesh]  # Display mesh representation
brep.units = Units.m

# Note: Actual BREP operations would need to be performed
# using an external geometric kernel
```

## Surfaces

Surface representation without operations:

```python
# Create a surface definition
surface = Surface()
surface.degreeU = 3
surface.degreeV = 3
surface.pointData = [/* control points */]
surface.units = Units.m

# Note: Surface evaluation and operations would need
# to be performed by external libraries
```

## Handling Large Geometry

For large geometric objects, use chunking to manage data efficiently:

```python
from specklepy.objects.base import Base

class LargeGeometry(Base, chunkable={
    "vertices": 1000,    # Split vertices into chunks of 1000
    "faces": 1000,       # Split faces into chunks of 1000
}):
    vertices: List[float] = None
    faces: List[int] = None
    
# Create large mesh
large_mesh = LargeGeometry()
large_mesh.vertices = [/* many vertices */]
large_mesh.faces = [/* many faces */]
```

## Geometric Collections

Group related geometry using Base objects:

```python
class GeometryCollection(Base, detachable={"elements"}):
    elements: List[Base] = None
    
# Create a collection
collection = GeometryCollection()
collection.elements = [
    Point(x=0, y=0, z=0),
    Line(
        start=Point(x=0, y=0, z=0),
        end=Point(x=1, y=0, z=0)
    ),
    mesh
]
```

## Validation and Checking

Remember that specklepy only validates schema conformance, not geometric validity:

```python
# This is schema-valid but possibly geometrically invalid
invalid_mesh = Mesh()
invalid_mesh.vertices = [0,0,0, 1,1,1]  # Only two vertices
invalid_mesh.faces = [3, 0,1,1]  # Invalid face
# specklepy will allow this - geometric validation
# needs to be done by your application

# Schema validation will catch this:
try:
    point = Point(x="not a number", y=0, z=0)
except SpeckleException as e:
    print("Schema validation failed:", e)
```

## Working with trimesh

trimesh is a powerful Python library for working with triangle meshes. However, Speckle meshes need conversion as they use a different format and support n-gon faces which trimesh does not. Here's how to convert between the formats:

```python
import numpy as np
import trimesh
from typing import Tuple

def speckle_to_trimesh(speckle_mesh: Mesh) -> trimesh.Trimesh:
    """
    Convert a Speckle mesh to a trimesh mesh.
    Handles n-gon triangulation implicitly through trimesh.
    """
    # Convert Speckle's flat vertex array to numpy
    vertices = np.array(speckle_mesh.vertices).reshape(-1, 3)
    
    # Convert Speckle's faces format to triangles
    faces = []
    i = 0
    while i < len(speckle_mesh.faces):
        # Get number of vertices in this face
        n = speckle_mesh.faces[i]
        # Get face vertices
        face = speckle_mesh.faces[i + 1:i + 1 + n]
        
        if n == 3:
            # Already a triangle
            faces.append(face)
        else:
            # For n-gons, create a fan triangulation
            # Note: This is a simple triangulation that may not work well for all cases
            for j in range(1, n - 1):
                faces.append([face[0], face[j], face[j + 1]])
        
        i += n + 1
    
    faces = np.array(faces)
    
    # Create trimesh
    return trimesh.Trimesh(vertices=vertices, faces=faces)

def trimesh_to_speckle(trim_mesh: trimesh.Trimesh) -> Mesh:
    """
    Convert a trimesh mesh to a Speckle mesh.
    Note that trimesh only supports triangles.
    """
    # Create Speckle mesh
    mesh = Mesh()
    
    # Convert vertices to flat array
    mesh.vertices = trim_mesh.vertices.flatten().tolist()
    
    # Convert faces to Speckle format (with count prefix for each face)
    faces = []
    for face in trim_mesh.faces:
        faces.extend([3, *face])  # 3 vertices per face (triangles)
    mesh.faces = faces
    
    return mesh

# Example usage:
speckle_mesh = Mesh()
speckle_mesh.vertices = [0,0,0, 1,0,0, 1,1,0, 0,1,0, 0.5,0.5,1]
speckle_mesh.faces = [5, 0,1,2,3,4]  # Pentagon (n-gon) face

# Convert to trimesh for operations
trim_mesh = speckle_to_trimesh(speckle_mesh)

# Now you can use trimesh's powerful features
# For example, calculate volume:
volume = trim_mesh.volume

# Or check watertightness:
is_watertight = trim_mesh.is_watertight

# Or compute normals:
face_normals = trim_mesh.face_normals

# Convert back to Speckle when done
result_mesh = trimesh_to_speckle(trim_mesh)
```

Note that when converting n-gon faces to triangles, the triangulation method can significantly impact the result. The simple fan triangulation shown above works for convex polygons but might not be suitable for all cases. For more complex needs, consider using more sophisticated triangulation algorithms.

## Integration with Other Libraries

Example of using specklepy with numpy for geometric calculations:

```python
import numpy as np

def calculate_centroid(points: List[Point]) -> Point:
    # Convert to numpy for computation
    coords = np.array([[p.x, p.y, p.z] for p in points])
    centroid = coords.mean(axis=0)
    
    # Create speckle point with result
    return Point(
        x=float(centroid[0]),
        y=float(centroid[1]),
        z=float(centroid[2])
    )

# Example usage
points = [
    Point(x=0, y=0, z=0),
    Point(x=1, y=0, z=0),
    Point(x=1, y=1, z=0)
]
center = calculate_centroid(points)
```

## Best Practices

1. **Always Specify Units**

   ```python
   geometry.units = Units.m  # Be explicit about units
   ```

2. **Use Chunking for Large Data**

   ```python
   class BigMesh(Base, chunkable={"vertices": 1000}):
       vertices: List[float] = None
   ```

3. **Group Related Geometry**

   ```python
   class Assembly(Base, detachable={"parts"}):
       parts: List[Base] = None
   ```

4. **Handle Geometric Operations Externally**

   ```python
   # Use specialized libraries for geometric operations
   import numpy as np
   
   def transform_point(point: Point, matrix: np.ndarray) -> Point:
       coords = np.array([point.x, point.y, point.z, 1])
       transformed = matrix @ coords
       return Point(
           x=float(transformed[0]),
           y=float(transformed[1]),
           z=float(transformed[2])
       )
   ```

5. **Validate Geometry As Needed**

   ```python
   def validate_mesh(mesh: Mesh) -> bool:
       # Implement your validation using appropriate
       # geometric libraries - specklepy won't do this
       pass
   ```

## Common Patterns

### 1. Geometry Conversion

When working with other geometric libraries:

```python
def to_numpy_points(speckle_points: List[Point]) -> np.ndarray:
    """Convert Speckle points to numpy array"""
    return np.array([
        [p.x, p.y, p.z] for p in speckle_points
    ])

def from_numpy_points(np_points: np.ndarray) -> List[Point]:
    """Convert numpy points to Speckle points"""
    return [
        Point(x=float(p[0]), y=float(p[1]), z=float(p[2]))
        for p in np_points
    ]
```

### 2. Geometry Collections

Organizing geometry hierarchically:

```python
class Level(Base, detachable={"geometry"}):
    """A building level with geometry"""
    elevation: float = 0.0
    height: float = 0.0
    geometry: List[Base] = None

class Building(Base, detachable={"levels"}):
    """A building with multiple levels"""
    levels: List[Level] = None
```

### 3. Display Meshes

Providing visualization geometry:

```python
class ComplexGeometry(Base):
    """Geometry with visualization mesh"""
    # Your complex geometry definition
    displayValue: Optional[List[Mesh]] = None
    
    def create_display_mesh(self):
        """
        Create a simplified mesh for display
        Note: You'd need to implement this using
        appropriate geometric libraries
        """
        pass
```

By understanding specklepy's role and limitations, you can effectively integrate it into workflows for defining, sharing, and transporting geometric data.
