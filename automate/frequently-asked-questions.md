---
title: FAQs
deprecationMessages: automate
---

<Banner />

# Frequently Asked Questions  

### **How much does it cost? Is Automate included in my enterprise subscription?**  
- Automate compute usage is **free during the public beta**, allowing you to explore its capabilities at no cost.  
- **Private Functions** can only be authored and executed within **Workspaces**, a paid feature included in Speckle’s subscription plans.  
- Automate is **fully functional during the free trial periods** of the Standard Plan, enabling testing before committing to a subscription.  
- We’re still finalising future pricing and welcome feedback from beta testers to shape our plans.  

### **Is Automate faster than my desktop workflow?**  
- **It depends on your perspective.** Automate may not always run faster for individual tasks, but it excels in the bigger picture:  
  - **Reduced learning curve**: Instead of training every team member on specific software, reusable Automate Functions make workflows accessible to everyone.  
  - **Hardware independence**: Automate uses cloud infrastructure, freeing local machines for other tasks.  
  - **Continuous automation**: Automations trigger automatically on new model uploads, eliminating manual steps and enabling results to be ready while you focus on other work.  
- By streamlining collaboration and task automation, Automate can significantly reduce overall workflow time and effort.  

### **What languages are supported?**  
- **Fully supported SDKs:** Python and C#.  
- **Under development:** JavaScript/TypeScript and Jupyter Notebooks.  
- Any language or software executable via **command-line instructions** can run in Automate, though using Speckle SDKs is recommended for seamless data interaction.  
- For technical flexibility, Automate supports extending functionality with custom libraries, such as C++ or Rust, though support may vary.  

### **Is Automate part of the Speckle Server? How do I install the service?**  
- Automate is a **separate service** relying on an available Speckle Server.  
- While in beta, Automate is not open-source or self-installable. We are working to integrate Automate more tightly into the Speckle web application.  

### **What else do I need for Speckle Automation?**  
Just a mindset that **automation is the future**!  

### **How does Automate compare to Hypar, Viktor, or ShapeDiver?**  
- **Purpose**: Automate automates complex, time-consuming tasks triggered on new model uploads, not real-time parametric modelling like Hypar or ShapeDiver.  
- **Integration**: Automate builds on Speckle’s Connectors, enabling seamless data exchange with tools like SketchUp, Rhino, Blender, and PowerBI.  
- **Flexibility**: Automate supports any language or software while retaining Speckle’s collaborative and open-source ethos.  

### **Who can create Functions?**  
- Function creation is currently **limited to within Workspaces** during this phase.  
- Public Functions are those **authored or curated by Speckle** and made available for general use.  

### **How do Automations work on personal vs workspace projects?**  
- For **personal projects**, Automations are fully configurable by the automation author.  
- For **workspace projects**, Automations are configurable by project owners.  

### **Who can view automation results?**  
- **Any project viewer** can see results directly in the Speckle web application.  
- **Workspace admins and project owners** can access the full history of prior automation runs.  

### **Where can I find help?**  
- Visit our [**Community Forum**](https://speckle.community/invites/Fbk5j1wbRW) to get assistance or share feedback about Automate. 

---

### **How would clash detection* work in Speckle Automate?**  
- While a **public function for clash detection** is not yet available, here’s how it could theoretically operate:  
  - Automate would run clash detection **in the background**, analysing multiple models from various tools (e.g., Blender, Revit, SketchUp) without manual intervention.  
  Results would be viewable directly in the web application, shared via links, or embedded in platforms like SharePoint or Notion.  
  - Results could also be retrieved into other tools via Speckle Connectors (e.g., PowerBI or Excel).  
  - Automate's API would enable integration with external workflows, allowing custom reporting and visualisation.  

- This functionality would save time by automating repetitive tasks and simplifying collaboration across teams and platforms.

*Note: Clash detection is a theoretical use case until a public function is available.*  
