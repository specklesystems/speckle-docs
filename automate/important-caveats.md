---
title: Imoprtant Caveats
deprecationMessages: automate
---

<Banner />

# Important Caveats

### Your Data

Automate is currently only available on the main production server ([app.speckle.systems](https://app.speckle.systems)). 

While project data is handled with the same level of care and security as all Speckle servers note that:
- During the beta phase, Speckle reserves the right to modify or reset the Automate Execution Engine, Function library or other enabling parts of the server infrastructure. However, the data held on the server is secured and maintained.
- Automations, automation runs, and results may be subject to deletion due to infrastructure updates.
- The end of the Public beta phase will be communicated widely on [Speckle Community](https://speckle.community) and in the application.
- At the end of the beta program, we will announce any mechanisms to migrate project data, automation, or related artefacts that might be required.  

We strongly encourage users to continue to back up their functions in GitHub or other repositories as a safeguard.

### Your Access

Your access to Speckle Automate beta is at our discretion as we build and test the infrastructure. While we have designed Automate to be highly open and permissive regarding what is possible to build, there are strict usage policies:
- We actively monitor running containers to detect and prevent misuse (e.g., crypto miners, spam email servers, or other nefarious activities).  
- A **zero-tolerance policy** is enforced. Access will be revoked instantly for violations.  

### Open by Design

Speckle Automate beta encourages open experimentation:
- No sandbox restrictions exist for making external calls, choosing dependencies, or managing artefact sizes other than restricted to normal Speckle server limits.
- Functionality is designed to allow flexible automation workflows.  

However, Speckle does not currently accept inbound calls to its infrastructure. All automation must be created, configured, and managed within the Speckle Automate interface.

### Our Infrastructure

Automate is designed to run code within containers that execute on Linux machines. During the beta phase:
- Automations are CPU-only until further notice.  
- Support for Windows runtimes and GPU computing is under exploration.
- Support for alternative code repositories than Github is under exploration.

### Ethical Use and Privacy

Speckle adheres to strict ethical use and privacy policies:
- Speckle does not use or analyse data uploaded to any Speckle server except when invited to join projects for support purposes.  
- Logs are monitored to maintain integrity and server health; debugging does not require viewing user data.  
- Function authors acknowledge:
  - Their functions are source-available.  
  - They are responsible for ensuring their organisation's privacy, intellectual property, and security.  
