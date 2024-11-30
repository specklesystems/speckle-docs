# Releasing a New Function Version

New versions of a Function are created automatically when a new GitHub release is created.

## Releasing a New Version

For detailed instructions on creating a new GitHub release, refer to [GitHub's documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository).

### Naming Convention

We recommend using the [Semantic Versioning (Semver)](https://semver.org/) naming convention to indicate the nature of changes in your release:

- **MAJOR**: Breaking changes.  
- **MINOR**: Backward-compatible functionality.  
- **PATCH**: Backward-compatible bug fixes.

### Deployment Process

The associated GitHub action is triggered when you create a release on GitHub. This will:

1. Spin up a deployment container.  
2. Extract your function's input schema and validate it.  
3. Build your function code.  
4. Send the validated and compiled function code to the Speckle Automate server via an API call using your credentials.  
5. Automate validates the payload and reports success.

Only code that completes these build steps successfully will be sent to Automate. Once the release is processed, your function will appear in the functions list.

### Monitoring Release Actions

The release process triggers a [GitHub Action](https://github.com/features/actions), which can be monitored in your GitHub repository's **Actions** tab. If errors occur during the release process, they will be displayed here.

### Troubleshooting

If you encounter issues during deployment:
- Review the error logs in the **Actions** tab for details.  
- Search for solutions or ask for assistance on the [Speckle Community Forum](https://speckle.community).

---

::: note 💡 Advanced Customisation

While the default deployment setup (e.g., `Dockerfile`, `workflow.yml`) works for most use cases, you can customise these files for advanced scenarios:

1. **Customising the Workflow**:  
   - Adjust the `workflow.yml` file for multipart build steps or additional artefacts.  
   - Ensure all necessary artefacts (e.g., `functionInputs.json`) are generated.

2. **Customising the Runtime**:  
   - Modify the `Dockerfile` to include additional dependencies, libraries, or specific runtime versions (e.g., a custom-built Python environment).  
   - These adjustments allow you to tailor the execution runtime for your function.

Customisation is typically unnecessary but highlights Speckle Automate's flexibility for unique requirements.
:::

Most authors can deploy their functions effortlessly by leveraging the default setup. Speckle Automate provides the flexibility to adapt workflows and runtimes as needed for those with specialised requirements.
