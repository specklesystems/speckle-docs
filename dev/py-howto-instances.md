# How-to: Instances, Definitions and Transforms

## Block Definitions and Instances

Block definitions are reusable object templates that can be instantiated multiple times in different locations with different transforms. This pattern is useful for repeating elements like furniture, fixtures, or structural components.

### Creating Block Definitions

```python
from specklepy.objects.other import BlockDefinition
from specklepy.objects.geometry import Point

# Create a block definition for a table
table_def = BlockDefinition(
    name="Office Table",
    basePoint=Point(x=0, y=0, z=0),  # Origin point for the definition
    geometry=[
        # Add geometry objects that make up your table
        # e.g., surfaces, curves, meshes, etc.
    ]
)
```

### Creating Instances

```python
from specklepy.objects.other import BlockInstance
from specklepy.objects.other import Transform

# Create an instance of the table
table_instance = BlockInstance(
    transform=Transform(),  # Default identity transform
    definition=table_def    # Reference to the block definition
)
```

## Working with Transforms

Transforms represent 4x4 transformation matrices that can be applied to instances or geometry. They combine rotation, translation, and scaling operations.

### Creating Transforms

```python
from specklepy.objects.other import Transform

# Identity transform (no change)
identity = Transform()
identity.matrix = [
    1.0, 0.0, 0.0, 0.0,  # First row
    0.0, 1.0, 0.0, 0.0,  # Second row
    0.0, 0.0, 1.0, 0.0,  # Third row
    0.0, 0.0, 0.0, 1.0   # Fourth row
]

# Translation transform (move 10 units in x)
translation = Transform()
translation.matrix = [
    1.0, 0.0, 0.0, 10.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]
```

### Applying Transforms to Points

```python
from specklepy.objects.geometry import Point

# Create a point
point = Point(x=1, y=2, z=3)

# Create and apply transform
transform = Transform()
transform.matrix = [
    1.0, 0.0, 0.0, 5.0,  # Translation of 5 units in x
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]

# Transform the point
transformed_point = transform.apply_to_point(point)
print(transformed_point.x)  # Will be 6.0 (original 1 + translation 5)
```

### Multiple Instances with Different Transforms

```python
# Create multiple instances of the same definition with different transforms
def create_grid_of_tables(rows: int, cols: int, spacing: float) -> List[BlockInstance]:
    instances = []
    
    for row in range(rows):
        for col in range(cols):
            # Create transform for this position
            transform = Transform()
            transform.matrix = [
                1.0, 0.0, 0.0, col * spacing,
                0.0, 1.0, 0.0, row * spacing,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ]
            
            # Create instance
            instance = BlockInstance(
                transform=transform,
                definition=table_def
            )
            instances.append(instance)
            
    return instances

# Create a 3x3 grid of tables spaced 2 units apart
table_grid = create_grid_of_tables(rows=3, cols=3, spacing=2.0)
```

## Real-World Example: Office Layout

Here's a complete example showing how to create a reusable office furniture layout:

```python
from specklepy.objects.base import Base
from specklepy.objects.other import BlockDefinition, BlockInstance, Transform
from specklepy.objects.geometry import Point
from typing import List

class OfficeLayout(Base):
    """Container for office furniture layout"""
    furniture_definitions: List[BlockDefinition] = []
    furniture_instances: List[BlockInstance] = []
    
    def add_definition(self, definition: BlockDefinition):
        """Add a new furniture definition"""
        self.furniture_definitions.append(definition)
        
    def place_furniture(
        self,
        definition: BlockDefinition,
        x: float,
        y: float,
        rotation: float = 0.0
    ) -> BlockInstance:
        """Place a piece of furniture at the specified location"""
        # Create transform for position and rotation
        transform = Transform()
        # Note: This is a simplified transform. In practice,
        # you'd want to build a proper rotation matrix
        transform.matrix = [
            1.0, 0.0, 0.0, x,
            0.0, 1.0, 0.0, y,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]
        
        # Create and store instance
        instance = BlockInstance(
            transform=transform,
            definition=definition
        )
        self.furniture_instances.append(instance)
        return instance

# Usage example:
if __name__ == "__main__":
    # Create office layout
    office = OfficeLayout()
    
    # Create furniture definitions
    desk = BlockDefinition(
        name="Standard Desk",
        basePoint=Point(x=0, y=0, z=0),
        geometry=[]  # Add actual desk geometry here
    )
    
    chair = BlockDefinition(
        name="Office Chair",
        basePoint=Point(x=0, y=0, z=0),
        geometry=[]  # Add actual chair geometry here
    )
    
    # Add definitions to layout
    office.add_definition(desk)
    office.add_definition(chair)
    
    # Place furniture
    for i in range(3):  # Create three workstations
        x = i * 2.0  # Space desks 2 units apart
        
        # Place desk
        office.place_furniture(desk, x, 0.0)
        
        # Place chair
        office.place_furniture(chair, x, 0.5)  # Chair slightly behind desk
```

## Best Practices

1. **Block Definition Tips**
   - Keep definitions simple and reusable
   - Use meaningful names
   - Position geometry relative to a logical base point
   - Document any assumptions about orientation

2. **Transform Tips**
   - Initialize with identity matrix when unsure
   - Test transforms with simple points first
   - Remember matrix multiplication order matters
   - Keep track of your coordinate system conventions

3. **Instance Tips**
   - Use instances for repeating elements
   - Group related instances logically
   - Consider using container classes for organization
   - Track relationships between instances if needed

4. **Performance Considerations**
   - Reuse definitions when possible
   - Batch create instances for better performance
   - Use detaching for large collections of instances
   - Consider chunking for large transform arrays

Remember: The instance/definition pattern is powerful for managing repeating elements while keeping file sizes manageable. Each definition is stored once, with instances just referencing the definition and specifying a transform.
