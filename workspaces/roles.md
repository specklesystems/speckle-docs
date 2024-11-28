# Workspace Member Roles

## Contributors and Reviewers

Workspace admins can invite external users to a workspace as **guests**. Guests only have access to projects in the workspace to which they are specifically invited. Guests cannot own projects in your workspace but may be assigned one of the following roles within a project:

- **Contributor**: Grants write access to the project.
- **Reviewer**: Grants read-only access to the project.

## Roles and Permissions

### Workspace Admin

- Full ownership of the workspace, including management of members, projects, and settings.
- Automatically the project owner for all existing and new workspace projects.
- Cannot be removed or have their role changed within a project by non-admins.

### Workspace Member

- Project viewer for all existing and new workspace projects.
- Can be removed or have their role changed (for project and workspace) by admins.
- Can create and own projects.
- Cannot invite new users to the workspace but can invite existing workspace members to projects.

### Workspace Read/Write Guest

- Guest on the workspace with no general access but granted **Contributor** access to at least one project.
- If an existing workspace user is changed to a guest, they will lose access to all workspace projects except those they are explicitly invited to.
- Project owners can change their role or remove them.

### Workspace Read-Only Guest

- Guest on the workspace with no general access and **Reviewer** access to at least one project.
- If a read-only guest is granted edit access to any project, they are converted to a read/write guest.
- Project owners can change their role or remove them.

## Workspaces for Individuals

You can use Workspaces as an individual, but we encourage using them as part of a team. Workspaces are designed to deliver maximum value when collaborating with colleagues on various projects.
