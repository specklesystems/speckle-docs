# Important Caveats

### Your Data

Our development server ([latest.speckle.systems](http://latest.speckle.systems)) has always been flagged as “transient” because we keep the server at the cutting edge of our development branch. While project data is handled exactly like all our stable servers, it comes with the note that we reserve the right to tear down the server and database and build it up again. Your functions will, by nature, be safe in GitHub, but automations, automation runs and results may be lost.

At the end of the Beta program, there is no plan to migrate either project data or automations to any other Speckle server.

### Your Access

Your access to Speckle Automate beta is at our discretion as we build and test the infrastructure. We have deliberately designed Automate to be highly open and permissive regarding what is possible to build. At the same time, we have some sophisticated tools to check the contents of running containers and WILL find crypto miners, spam email servers, and other nefarious use cases. There is a zero-tolerance policy, and access will be removed instantly.

### Open by Design

There are no sandbox restrictions on making external calls, limits on dependencies used, or artefact sizes. We will explore the best fit between function needs and compute platform offerings. Speckle does not currently accept inbound calls to its infrastructure. All automations are anticipated to be created, configured, and managed within the Speckle Automate interface.

### Our Infrastructure

If your code can be defined to run within a container that will run on a Linux machine, then Automate will run it (we hope). We are exploring how to support Windows runtimes and how to offer GPU computing. Speckle Automate beta can be assumed to be CPU execution only until further notice. 

### Our Ethical Use and Privacy

Speckle does not use data uploaded to any Speckle server for purposes other than support when invited to join projects. We monitor logs to maintain integrity and server health and can debug problems from there without viewing user data. Function authors acknowledge that their functions are source-available and that they are responsible for their organisation's privacy, intellectual property, and security.