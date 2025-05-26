---
Title: Using Google Apps Script
deprecationType: developer
---

<Banner />

# Using Google Apps Scripts

Using Speckle in [Google Apps Scripts](https://developers.google.com/apps-script) is very simple, and fun! With just a few lines of code, you'll be able to send, receive and leverage our API from Google Sheets, Docs etc.

Here's a few examples to get you started.

## Prerequisites

First of all we need to create a [Personal Access Token](/dev/tokens), make sure to select the scopes that you'll need for running your queries and mutations.
As always, treat this token as a password!

## Writing your Queries

To learn how to write queries check out our section on the [Server API](/dev/server-api), and use the GraphQL explorer to make sure your query or mutation works as expected.

Next, since App Scripts doesn't have a GraphQL library we need to transform them a bit to work with `UrlFetchApp`, it's just a matter of setting the right payload and parameters.

Here's what a function that runs a query to get the currently logged user looks like, remember to replace `YOUR_SERVER_ADDRESS` and `YOUR_PERSONAL_TOKEN`.
You can extend its fields to get the streams, branches and commits as well:

```js
function getMe() {
  let url = "https://YOUR_SERVER_ADDRESS/graphql";
  let graphql = JSON.stringify({
    query: `query User {
                      user{
                        id,
                        email,
                        name
                      }
                    }`,
    variables: null,
  });
  let params = {
    method: "POST",
    payload: graphql,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_PERSONAL_TOKEN",
    },
  };
  var response = UrlFetchApp.fetch(url, params);

  Logger.log(response);
}
```

:::tip

How do you create a token, we hear you ask? Read the section on [personal access tokens](/dev/tokens.html)!

:::

Here's a function that runs a mutation to create a new stream:

```js
function createStream() {
  let url = "https://YOUR_SERVER_ADDRESS/graphql";
  let graphql = JSON.stringify({
    query: `mutation streamCreate($myStream: StreamCreateInput!) { streamCreate(stream: $myStream) }`,
    variables: {
      myStream: {
        name: "Sample Stream",
        description: "Created from Google Sheets!",
      },
    },
  });
  let params = {
    method: "POST",
    payload: graphql,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_PERSONAL_TOKEN",
    },
  };
  var response = UrlFetchApp.fetch(url, params);

  Logger.log(response);
}
```

This is all! If you have any questions feel free to ping us on the [👉 forum](http://speckle.community/).
