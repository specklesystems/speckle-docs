# Managing Members

All workspace members can be managed from the **Members** screen in the workspace settings. This screen displays all members added to the workspace, [their role](./roles.md), and the date they were added. You can also see users who have been invited but have not yet accepted the invitation to join the workspace.

---

## Member Status

Workspace members and guests can have two types of status indicators:  

1. **Verified** and **Unverified**:  
   - A **verified** user has confirmed ownership of the email address they signed up with.  
   - A user remains **unverified** until they verify their email address.  

2. **Compliant** and **Non-Compliant**:  
   - Members whose email addresses do not comply with the workspace domain policy will be marked as **Non-Compliant**.  
   - Non-compliant status can occur when:  
     - A project is moved from a personal account to a workspace with domain locking enabled.  
     - The domain policy is changed after a project is created or added.  
   - Non-compliant members and guests will be highlighted in the **Members** window.  

---

## Adding Members

To add a member to a workspace:  

1. Click the **Invite** button in the top-right corner of the **Members** screen.  
2. Enter the email address of the team member you want to invite.  
   - If the user is an existing Speckle user, their name will be suggested as you type.  

You can assign the user a role:  
- `Guest`  
- `Member`  
- `Admin`  

### Role-Specific Notes:
- **Admins** can manage all members, enforce security policies, and control access to private automation functions in Speckle Automate.  
- **Members** can use Speckle Automate to create private automation functions within the Workspace but cannot invite external users.  
- **Guests** cannot access Speckle Automate and are limited to the projects to which they are explicitly invited.

If the invited user is not already a Speckle user, they will receive an email invitation to join Speckle and the workspace.

---

## Removing Members

To remove a member from a workspace:  

1. Click the `...` button next to their name in the **Members** screen.  
2. Select **Remove user**.  
3. Confirm the removal in the dialogue box.  

Once removed:  
- The user will no longer have access to the workspace or any of its projects.  
- This includes projects they had been directly invited to.  
- Any private automation functions authored by the removed user will remain accessible within the Workspace.

---

## Managing Automation Access

Speckle Automate is integrated with Workspaces, allowing members and admins to author and manage private automation functions. Ensure that members with access to automation functions have appropriate roles and permissions.
