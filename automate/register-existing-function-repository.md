---
title: Register Existing Function Repository
deprecationMessages: automate
---

<Banner />

# Register an existing function repository

We recommend to always create a new Function from one of the templates provided by Speckle. Even if you wish to create a Function in a different language, you can use any template and modify it later.

However, if you do already have a GitHub repository for a Function, you can register that with Automate.

### Step by step guide

1. Click your profile icon in the top right corner of the Automate web application and select `API and Dev Info`.
1. Copy the `API token` and save securely. This token can be used to authenticate with the Speckle Automate API and undertake actions on your behalf. It should be treated as securely as a password.
1. Follow the link to the `Interactive API Docs`.
1. Click the `Authorize` button in the top right corner of the page and enter your `API token` you saved earlier.
1. In the `Functions` section, expand the `POST /api/v1/functions` endpoint.
    - If you cannot see this Endpoint, this is because of a known limitation. In a terminal please run `curl -v --request POST https://automate.speckle.dev/api/v1/functions`, then return to the Interactive API Docs and refresh the page. We hope to improve this experience soon.
1. Click the `Try it out` button.
1. Amend the details in the `Request Body` section to match your Function. A description of each property is provided in the `CreateFunctionInput` section towards the bottom of the page.
1. Click the `Execute` button.
1. If successful, you will receive a `201` response code and a `Function` object will be returned in the `Response Body` section. This object will contain the `id` of your Function and the Function token. Please save both the ID and the Function token. Again, please treat the Function token securely like a password.
1. You can now open your GitHub repository and create secrets for your GitHub Action. Please refer to GitHub's instructions for [creating secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).
1. The secrets should be named `SPECKLE_FUNCTION_ID` and `SPECKLE_FUNCTION_TOKEN`, and the values should be the ID and Function token you saved earlier.
1. Please trigger a new run of your GitHub Action, or create a new GitHub release. This will create a new version of your Function in Automate.
