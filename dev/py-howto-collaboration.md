# How-to: Project Collaboration

## Understanding Collaboration in Speckle

When working on building and infrastructure projects, effective collaboration is crucial. Multiple team members, various disciplines, and different organizations all need to work together seamlessly. Speckle's collaboration system is designed to make this complex process manageable.

### The Project Concept

Think of a Speckle Project like a digital job site. Just as a physical construction site needs:

- Different teams working in designated areas
- A way to track progress
- Clear communication channels
- Security and access control

A Speckle Project provides digital versions of all these necessities:

- Models organize different aspects of work (like architecture, structure, MEP)
- Versions track progress and changes over time
- Comments and notifications enable communication
- Role-based permissions control who can do what

## Setting Up Your Digital Workspace

Let's start by creating a project - your team's digital headquarters:

```python
from specklepy.api.client import SpeckleClient
from specklepy.core.api.inputs.project_inputs import ProjectCreateInput
from specklepy.core.api.enums import ProjectVisibility

# Connect to Speckle
client = SpeckleClient(host="speckle.xyz")
client.authenticate_with_token("your-token")

# Create the project workspace
project = client.project.create(
    input=ProjectCreateInput(
        name="Office Tower Design",
        description="Collaborative design for the new office tower",
        visibility=ProjectVisibility.PRIVATE
    )
)

project_id = project.id
```

The visibility setting is important:

- **PRIVATE**: Only invited team members can access (default and recommended for most projects)
- **PUBLIC**: Anyone can view, but only team members can edit (good for public proposals or educational projects)
- **UNLISTED**: Like private, but accessible via direct link (useful for client presentations)

## Building Your Team

Just like a real project needs the right people with the right responsibilities, your Speckle project needs a well-organized team.

### Understanding Roles

Speckle has three main project roles:

- **Owner**: Like a project manager - full control over the project
- **Contributor**: Like team members - can add and modify content
- **Reviewer**: Like consultants or clients - can view and comment

Here's how to invite team members:

```python
from specklepy.core.api.inputs.project_inputs import ProjectInviteCreateInput

# Invite a team member
invite = client.project_invite.create(
    project_id=project_id,
    input=ProjectInviteCreateInput(
        email="architect@company.com",
        role="project.contributor",  # Their permission level
    )
)
```

Think carefully about roles:

- ✅ Owners should be project leads or BIM managers
- ✅ Contributors are your active team members
- ✅ Reviewers are stakeholders who need to view and comment
- ❌ Don't make everyone an owner - it complicates project management
- ❌ Don't use reviewer role for active team members - they'll be too limited

### Managing Team Access

As projects evolve, you might need to adjust team members' roles:

```python
from specklepy.core.api.inputs.project_inputs import ProjectUpdateRoleInput

# Update someone's role - maybe they're now leading the project
client.project.update_role(
    input=ProjectUpdateRoleInput(
        userId="user-id",
        projectId=project_id,
        role="project.owner"  # Promoting to owner
    )
)
```

## Organizing Work with Models

Models in Speckle are like different drawings or files in traditional workflows, but more powerful. They help organize different aspects of your project:

```python
from specklepy.core.api.inputs.model_inputs import CreateModelInput

# Create models for different disciplines
architecture = client.model.create(
    input=CreateModelInput(
        name="100 - Architecture",  # Using a numbering system helps organize
        projectId=project_id,
        description="Main architectural design including layouts and facades"
    )
)

structure = client.model.create(
    input=CreateModelInput(
        name="200 - Structure",
        projectId=project_id,
        description="Primary and secondary structural systems"
    )
)
```

Best practices for models:

- ✅ Use a consistent naming convention (like numbers for disciplines)
- ✅ Give clear, detailed descriptions
- ✅ Create separate models for major disciplines
- ❌ Don't put everything in one model
- ❌ Don't create too many small models

## Tracking Changes with Versions

Versions are like save points in your project's history. They help you:

- Track what changed and why
- Know who made changes
- Roll back if needed
- Understand the project's evolution

```python
from specklepy.core.api.inputs.version_inputs import CreateVersionInput

# Create a version when you've made significant changes
version = client.version.create(
    input=CreateVersionInput(
        objectId=object_id,      # The ID of your updated data
        modelId=architecture.id,
        projectId=project_id,
        message="Updated floor layouts based on client feedback from 2024-01-05 meeting:\n"
                "- Enlarged lobby area\n"
                "- Relocated reception desk\n"
                "- Added security office",
        sourceApplication="python"
    )
)
```

Version best practices:

- ✅ Write detailed commit messages
- ✅ Include why changes were made
- ✅ Reference meetings or decisions
- ✅ Create versions at logical break points
- ❌ Don't create versions for tiny changes
- ❌ Don't write vague messages like "updates"

## Real-time Collaboration

Speckle can notify team members about changes as they happen:

```python
import asyncio
from typing import Callable

async def monitor_project_changes():
    def on_model_update(message):
        # When someone updates a model:
        update_type = message.type  # CREATED, UPDATED, or DELETED
        model = message.model
        
        print(f"Update to {model.name}")
        print(f"Made by: {model.author.name}")
        print(f"Type: {update_type}")
    
    # Start watching for changes
    await client.subscription.project_models_updated(
        callback=on_model_update,
        id=project_id
    )

# Run this to stay informed
asyncio.run(monitor_project_changes())
```

This is useful for:

- ✅ Staying informed about team progress
- ✅ Coordinating work in real-time
- ✅ Catching potential conflicts early
- ❌ Don't use it for critical notifications (use proper project management tools)

## Sharing Data

### Within Your Team

When sharing data with team members, use Speckle's transport system:

```python
from specklepy.api import operations
from specklepy.api.wrapper import StreamWrapper
from specklepy.objects.base import Base

# Setup sharing
wrapper = StreamWrapper(f"https://speckle.xyz/projects/{project_id}")
transport = wrapper.get_transport()

# Prepare your data
design_update = Base()
design_update.name = "Level 3 Layout"
design_update.data = {
    "floors": 5,
    "area": 1000,
    "updated_areas": ["lobby", "offices"]
}

# Share it
object_id = operations.send(base=design_update, transports=[transport])

# Make it official with a version
version = client.version.create(
    input=CreateVersionInput(
        objectId=object_id,
        modelId=architecture.id,
        projectId=project_id,
        message="Level 3 layout updates for open office configuration"
    )
)
```

### With External Stakeholders

Sometimes you need to share work with people outside your team:

```python
# Option 1: Make the project public
client.project.update(
    input=ProjectUpdateInput(
        id=project_id,
        visibility=ProjectVisibility.PUBLIC
    )
)

# Option 2: Invite as reviewers
client.project_invite.create(
    project_id=project_id,
    input=ProjectInviteCreateInput(
        email="client@company.com",
        role="project.reviewer"
    )
)

# Share the URL
project_url = f"https://speckle.xyz/projects/{project_id}"
```

Choose the right sharing method:

- ✅ Use reviewer invites for clients and consultants
- ✅ Use public visibility for showcases or portfolios
- ❌ Don't make sensitive projects public
- ❌ Don't give external stakeholders contributor access

## Common Collaboration Scenarios

### Design Review Workflow

Here's how to set up a design review process:

```python
# 1. Create a review model
review_model = client.model.create(
    input=CreateModelInput(
        name="Design Review",
        projectId=project_id,
        description="Consolidated model for client review meeting 2024-01-15"
    )
)

# 2. Invite reviewers
client.project_invite.create(
    project_id=project_id,
    input=ProjectInviteCreateInput(
        email="reviewer@client.com",
        role="project.reviewer"
    )
)

# 3. Create a review version with clear documentation
version = client.version.create(
    input=CreateVersionInput(
        objectId=object_id,
        modelId=review_model.id,
        projectId=project_id,
        message="Design Review Package - January 2024\n"
                "For review:\n"
                "- Ground floor layout\n"
                "- Facade treatment\n"
                "- MEP coordination"
    )
)
```

### Multi-discipline Coordination

When different teams need to work together:

```python
def track_coordination(model_id, object_id, dependencies):
    """
    Keep track of which versions of different models work together.
    Dependencies is a list of {name, version} dictionaries.
    """
    message = "Coordinated Model Update\n\n"
    message += "Referenced Models:\n"
    for dep in dependencies:
        message += f"- {dep['name']}: Version {dep['version']}\n"
    
    return client.version.create(
        input=CreateVersionInput(
            objectId=object_id,
            modelId=model_id,
            projectId=project_id,
            message=message
        )
    )

# Usage example
track_coordination(
    model_id=coordination_model.id,
    object_id=merged_model_id,
    dependencies=[
        {"name": "Architecture", "version": "A1.2"},
        {"name": "Structure", "version": "S1.1"},
        {"name": "MEP", "version": "M1.3"}
    ]
)
```

## Troubleshooting Guide

### "Cannot Access" Errors

If team members can't access what they need:

```python
def diagnose_access(project_id, user_id):
    """Help figure out why someone can't access something"""
    
    # Check their current role
    project = client.project.get_with_team(project_id)
    user_role = None
    
    for member in project.team:
        if member.user.id == user_id:
            user_role = member.role
            break
    
    if not user_role:
        print("User is not a team member!")
        print("They need to be invited to the project")
    else:
        print(f"User has role: {user_role}")
        if user_role == "project.reviewer":
            print("Note: Reviewers cannot modify content")
```

### Version Conflicts

When multiple people are working simultaneously:

```python
from datetime import datetime, timedelta

def check_for_conflicts(model_id, project_id):
    """Help identify if there might be conflicting changes"""
    
    versions = client.version.get_versions(
        model_id=model_id,
        project_id=project_id,
        limit=10
    )
    
    # Look for very close timestamps
    recent_changes = []
    for version in versions.items:
        recent_changes.append({
            'time': version.createdAt,
            'author': version.authorUser.name,
            'message': version.message
        })
    
    # Sort by time
    recent_changes.sort(key=lambda x: x['time'])
    
    # Check for changes close together
    for i in range(len(recent_changes)-1):
        time_diff = recent_changes[i+1]['time'] - recent_changes[i]['time']
        if time_diff < timedelta(minutes=5):
            print("Potential conflict detected!")
            print(f"Changes by {recent_changes[i]['author']} and "
                  f"{recent_changes[i+1]['author']} within 5 minutes")
```

Remember: Good collaboration is about communication and organization. Speckle provides the tools, but it's up to your team to use them effectively:

- Keep your project structure clear
- Write helpful version messages
- Use appropriate roles
- Monitor project activity
- Coordinate between disciplines
- Document important decisions

The more organized your digital workspace is, the smoother your team's collaboration will be.
