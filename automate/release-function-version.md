# Releasing a new Function Version

New versions of a Function will be created automatically when a new GitHub release is created.

# Deployment

Your function's deployment is very straightforward when you are confident in the business logic. The GitHub action is triggered on a release. It will:

- Spin up a deployment container,
- Extract your functions input schema and validate it
- Build your function code
- Send to Speckle Automate server as an API call with your credentials and successfully compiled code.
- Automate will validate the payload and report success.

This way, only code that has completed the build steps will be sent to Automate. Once a release has been successfully sent, your function will appear in the functions list.

Points to look out for:

1. You can customise your `workflow.yml` if you want a multipart build step or customise the `functionInputs.json`; ensure the steps generate all the necessary artefacts.
2. The template projects include the basic `Dockerfile` that will be deployed to Speckle Automate. This can be customised to build a set of dependencies and libraries or even custom-build Python if you need a specific version. The container derived from this Dockerfile represents your execution runtime. 
3. It will be important to keep the GitHub action up to date as this is where the API call for publishing is made; any.. changes to the API will need to be reflected.

# Releasing a New Version

For detailed instructions on how to create a new GitHub release, please refer to [GitHub's documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository). We recommend using the [Semver naming convention](https://semver.org/) for your release names.

Releasing a new version of your Function code causes a [GitHub Action](https://github.com/features/actions) to run. This can be viewed in the Actions tab along the top of your GitHub repository. If there are any errors in the release process, they will be displayed here.

If you require any assistance with understanding errors, please search Speckle's community forum at [speckle.community](https://speckle.community).
