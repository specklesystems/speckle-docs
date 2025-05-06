# How-to: Implement Real-time Subscriptions

Real-time subscriptions in specklepy allow you to monitor changes in your projects, models, and versions as they happen. This feature is particularly useful for creating automated workflows, keeping team members informed, and maintaining coordination between different aspects of your project.

## Understanding Subscription Types

specklepy supports several types of subscriptions:

1. Project Updates - Track when projects are modified or deleted
2. Model Updates - Monitor when models are created, changed, or removed
3. Version Updates - Get notified about new versions being created or modified
4. User Project Updates - Follow changes to all projects a user has access to

## Basic Setup

First, let's set up your client and authentication. This is the foundation for all subscription types:

```python
from specklepy.api.client import SpeckleClient
import asyncio

# Initialize client
client = SpeckleClient(host="speckle.xyz")
client.authenticate_with_token("your-token")

# All subscriptions use async/await because they maintain
# a persistent connection to listen for updates
async def main():
    # Subscription code will go here
    pass

# Run your subscription
asyncio.run(main())
```

This setup creates an authenticated connection to your Speckle server. The async/await pattern is used because subscriptions maintain a persistent WebSocket connection to receive real-time updates.

## Monitoring Project Changes

This example shows how to track changes to a specific project. You'll be notified when the project is updated or deleted:

```python
async def monitor_project():
    async def on_update(message):
        # The message object contains three key pieces of information:
        # - id: The project ID
        # - type: The type of change (DELETED or UPDATED)
        # - project: The updated project data (None if deleted)
        update_type = message.type
        
        if message.project:  # Check if project exists (will be None if deleted)
            print(f"Project '{message.project.name}' was {update_type}")
            print(f"Updated at: {message.project.updatedAt}")
            # You can access other project properties like:
            # - message.project.description
            # - message.project.visibility
            # - message.project.role
    
    await client.subscription.project_updated(
        callback=on_update,
        id="your-project-id"  # The ID of the project you want to monitor
    )
```

This subscription is useful for keeping track of project-level changes such as name updates, description changes, or project deletion.

## Tracking Model Changes

This subscription monitors changes to models within a project. It's particularly useful for tracking when new models are added or existing ones are modified:

```python
async def monitor_models():
    async def on_model_update(message):
        # The message contains:
        # - id: The project ID
        # - type: CREATED, UPDATED, or DELETED
        # - model: The model data (None if deleted)
        update_type = message.type
        
        if message.model:  # Check if model exists (will be None if deleted)
            # Access detailed information about the model
            print(f"Model '{message.model.name}' was {update_type}")
            print(f"By user: {message.model.author.name}")
            print(f"At: {message.model.updatedAt}")
            
            # You can also access:
            # - message.model.description
            # - message.model.createdAt
            # - message.model.id
    
    await client.subscription.project_models_updated(
        callback=on_model_update,
        id="your-project-id",
        # Optionally specify which models to monitor
        # If not provided, monitors all models in the project
        model_ids=["model-1-id", "model-2-id"]
    )
```

This type of subscription is essential for teams working on multiple models within a project, helping to maintain awareness of changes across different disciplines or aspects of the project.

## Version Tracking

Version tracking lets you monitor when new versions are created or existing versions are modified. This is crucial for tracking the evolution of your models:

```python
async def monitor_versions():
    async def on_version_update(message):
        # The message contains:
        # - id: The project ID
        # - modelId: The specific model being versioned
        # - type: CREATED, UPDATED, or DELETED
        # - version: The version data (None if deleted)
        update_type = message.type
        
        if message.version:  # Check if version exists (will be None if deleted)
            # Get detailed information about the new version
            print(f"Version created for model {message.modelId}")
            print(f"Message: {message.version.message}")
            print(f"Author: {message.version.authorUser.name}")
            
            # Additional version information available:
            # - message.version.referencedObject (the data object ID)
            # - message.version.createdAt
            # - message.version.sourceApplication
            # - message.version.previewUrl
    
    await client.subscription.project_versions_updated(
        callback=on_version_update,
        id="your-project-id"
    )
```

Version tracking is particularly useful for maintaining a history of changes and understanding who made what changes and when.

## User Project Updates

This subscription type allows you to monitor all projects a user has access to, notifying you when projects are added or removed from their access:

```python
async def monitor_user_projects():
    async def on_project_update(message):
        # The message contains:
        # - id: The project ID
        # - type: ADDED or REMOVED
        # - project: The project data (None if removed)
        update_type = message.type
        
        if message.project:  # Check if project exists (will be None if removed)
            print(f"Project '{message.project.name}' was {update_type}")
            print(f"Role: {message.project.role}")
            
            # Additional project information:
            # - message.project.description
            # - message.project.visibility
            # - message.project.createdAt
            # - message.project.updatedAt
    
    await client.subscription.user_projects_updated(
        callback=on_project_update
    )
```

This subscription is valuable for maintaining an up-to-date list of accessible projects and monitoring changes in project access permissions.

## Combining Multiple Subscriptions

In real-world applications, you often need to monitor multiple aspects simultaneously. Here's how to combine different subscriptions:

```python
async def monitor_everything(project_id: str):
    # Create all monitoring tasks
    # asyncio.gather allows us to run multiple coroutines concurrently
    tasks = [
        monitor_project(),
        monitor_models(),
        monitor_versions(),
        monitor_user_projects()
    ]
    
    # Run all monitoring tasks concurrently
    await asyncio.gather(*tasks)

# Run the complete monitoring system
if __name__ == "__main__":
    asyncio.run(monitor_everything("your-project-id"))
```

This pattern allows you to maintain multiple subscriptions efficiently without blocking each other.

## Practical Applications

### 1. Automated Build System

This example shows how to create an automated build system that triggers when specific versions are created:

```python
async def build_monitor():
    async def on_version_created(message):
        # Check if this is a version we should build
        # Looking for versions tagged with "build-ready"
        if message.version and "build-ready" in message.version.message.lower():
            # Get the ID of the actual data object
            obj_id = message.version.referencedObject
            
            # Trigger the build process
            await trigger_build(obj_id)
    
    await client.subscription.project_versions_updated(
        callback=on_version_created,
        id="your-project-id"
    )

async def trigger_build(obj_id: str):
    # Here you would implement your specific build process
    # For example:
    # 1. Download the object data
    # 2. Process it according to your needs
    # 3. Generate build outputs
    print(f"Starting build for object: {obj_id}")
```

This pattern is useful for automating processes like generating documentation, running analyses, or creating deliverables whenever specific changes occur.

### 2. Team Notifications

Keep your team informed of changes by integrating with notification systems:

```python
async def team_notifications():
    async def notify_team(message):
        if not message.model:
            return
            
        # Create a structured notification object
        notification = {
            "title": f"Model Update: {message.model.name}",
            "author": message.model.author.name,
            "time": message.model.updatedAt,
            "type": message.type
        }
        
        # Send to your notification system
        await send_notification(notification)
    
    await client.subscription.project_models_updated(
        callback=notify_team,
        id="your-project-id"
    )

async def send_notification(notification: dict):
    # Implement your notification logic here
    # This could integrate with:
    # - Slack
    # - Email
    # - MS Teams
    # - Custom notification systems
    print(f"Notification: {notification}")
```

This pattern helps maintain team awareness and coordination by automatically notifying relevant team members of important changes.

### 3. Coordination Checker

This example monitors for potential coordination issues by detecting when related models are updated close together in time:

```python
async def coordination_monitor():
    # Keep track of recent updates to detect potential conflicts
    recent_updates = {}
    
    async def check_coordination(message):
        if not message.model:
            return
            
        model_id = message.model.id
        # Store update information
        recent_updates[model_id] = {
            "time": message.model.updatedAt,
            "author": message.model.author.name
        }
        
        # Check for related models updated recently
        for other_id, other_update in recent_updates.items():
            if other_id != model_id:
                # Calculate time between updates
                time_diff = message.model.updatedAt - other_update["time"]
                # Alert if updates are within an hour of each other
                if time_diff.total_seconds() < 3600:  # One hour
                    print(f"Coordination Alert: Models updated within 1 hour")
                    print(f"Model 1: {message.model.name} by {message.model.author.name}")
                    print(f"Model 2: {other_id} by {other_update['author']}")
                    # You might want to:
                    # - Send notifications to team leads
                    # - Flag for review
                    # - Create coordination tasks
    
    await client.subscription.project_models_updated(
        callback=check_coordination,
        id="your-project-id"
    )
```

This pattern helps prevent coordination issues by alerting team members when multiple related models are being modified in close succession.

## Error Handling

Implement robust error handling to ensure your subscriptions remain active even when problems occur:

```python
async def resilient_monitor():
    while True:
        try:
            # Attempt to maintain the subscription
            await client.subscription.project_models_updated(
                callback=handle_update,
                id="your-project-id"
            )
        except Exception as e:
            # Handle any errors that occur
            print(f"Subscription error: {e}")
            print("Reconnecting in 5 seconds...")
            # Wait before attempting to reconnect
            await asyncio.sleep(5)
            # The loop will automatically retry the subscription

async def handle_update(message):
    try:
        # Your update handling code
        pass
    except Exception as e:
        # Handle errors in the update processing
        print(f"Error handling update: {e}")
        # Log error but don't crash the subscription
```

This error handling pattern ensures your subscriptions remain robust and self-healing.

## Best Practices

1. **Error Handling**
   - Always implement error recovery mechanisms
   - Keep subscriptions running despite temporary failures
   - Log issues for debugging purposes
   - Use try/except blocks around callback processing

2. **Resource Management**
   - Limit the number of simultaneous subscriptions
   - Clean up subscriptions when they're no longer needed
   - Monitor memory usage in long-running subscriptions
   - Consider implementing reconnection strategies

3. **Update Processing**
   - Keep callback processing quick and efficient
   - Move heavy processing work to separate tasks
   - Don't block the subscription loop with long operations
   - Consider using queues for processing updates

4. **Security**
   - Validate all incoming data before processing
   - Check permissions where appropriate
   - Don't expose sensitive information in logs or notifications
   - Be cautious with automated actions based on updates

Remember that subscriptions maintain persistent connections that need to be managed carefully. Plan for:

- Network interruptions
- Server disconnects
- Reconnection strategies
- Error recovery
- Proper resource cleanup

This will help you create robust and reliable real-time monitoring systems.
