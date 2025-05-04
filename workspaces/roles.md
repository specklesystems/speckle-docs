# Workspace Roles and Seats

## Project roles

### Project owner

- Full ownership of the project, including managing project members and settings.
- The user who initially creates a project is automatically the Project owner.
- Workspace admins are automatically project owners of all projects in a workspace.
- An Editor seat is required to have the Project owner role.

### Can edit

- Fully contribute to a project including publishing and loading new versions from the connectors.
- A user can only have the Can edit role in a project if they are assigned an Editor seat.
- An Editor seat is required to have the Can edit role.

### Can view

- Read-only project access through the Speckle web app including adding comments in the 3D viewer.
- No permission to publish or load model versions from the Speckle connectors.

## Workspace roles

### Admin

- Full ownership of the workspace, including management of members, projects, and settings.
- Automatically the project owner for all existing and new workspace projects.
- Cannot be removed or have their role changed within a project.
- Can create, manage, and oversee all Speckle Automate functions within the workspace. 

### Member

- By default access to all workspace projects with the *Can view* project role.
- Can create and own projects if on an Editor seat.
- Can be removed or have their role changed (for project and workspace) by admins.
- Cannot invite new users to the workspace but can invite existing workspace members to projects.
- Can access and use Speckle Automate to create private functions.  

### Guests

- Role meant for external collabators who only need limited access to select projects in the workspace.
- Can hold the *Can edit* project role if on an Editor seat.
- Can never create new projects in the workspace.
- Can never hold the *Project owner* project role.
- Can join a workspace without adhering to any domain policies or authorizing through SSO.
- If an existing workspace user is changed to a guest, they will lose access to all workspace projects except those they are explicitly invited to.
- Cannot access or create private Speckle Automate functions.  

## Workspace seats

Members and Guests can be assigned either an Editor seat or a Viewer seat. 

### Editor seat

- Gives Members or Guests permission to have the *Can edit* project role. 
- Gives Members permission to create new projects in the workspace and become *Project owner*.
- Is a required seat for Admins.
- Is a paid seat on the Starter and Business plans.

### Viewer seat

- Gives Members and Guests permissino to have the *Can view* project role.
- Is always a free seat.
