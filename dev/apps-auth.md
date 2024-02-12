# Apps & Auth

This post was originally part of the Making Speckle 2.0 series of posts on the community forum, it's been adapted as part of our dev docs. Check out [the original on our forum](https://speckle.community/t/apps-authn-speckle-2-0/961)!

## Introduction

This is a quick post on how authentication with the server works; we've put in _a lot_ of effort to make it easier for developers to extend the functionality of Speckle in their own apps, and simultaneously more secure for end users.

Before we start, we'd like to clarify that this post refers to specifically **authentication**, and not authorization.

- Authorization (authZ) controls **who has access to what resource**; it's not the focus of this post.
- Authentication (authN) controls **how a user can delegate access to other applications** (pieces of software) that then act on their behalf.

## API Tokens

All access to the API is done through bearer tokens that need to present in the Authorization header of each request. There are several ways to create/obtain these tokens, which we'll describe below. First, a few important notes on _tokens in general_:

### Token Scopes

Each token has a set of associated scopes to it which **limit what actions it can do**. For example, you could have a token that is only allowed to read streams and your profile information. Alternatively, you could have a token that is allowed to search for other users on the server, read your existing streams, create new ones, etc.

As Speckle will grow with functionality, new scopes will be made available. Currently there are:

```js
let coreModuleScopes = [
  {
    name: "server:setup",
    description: "Edit server information.",
  },
  {
    name: "tokens:read",
    description: `Access your api tokens.`,
  },
  {
    name: "tokens:write",
    description: `Create and delete api tokens on your behalf.`,
  },
  {
    name: "streams:read",
    description:
      "Read your streams & and any associated information (branches, tags, comments, objects, etc.)",
  },
  {
    name: "streams:write",
    description:
      "Create streams on your behalf and read your streams & any associated information (any associated information (branches, tags, comments, objects, etc.)",
  },
  {
    name: "profile:read",
    description: `Read your profile information`,
  },
  {
    name: "profile:email",
    description: `Access your email.`,
  },
  {
    name: "users:read",
    description: `Read other users' profile on your behalf.`,
  },
  {
    name: "users:email",
    description: "Access the emails of other users.",
  },
];
```

### Token Lifetime

Tokens also have a certain lifetime after which they're no longer valid. This helps with automatically blocking access to long forgotten apps. Written a little script two years ago that you've totally forgot about, but the token's nicely pasted in the codebase since you've never published it? Well, now that's safe even if someone else somehow snitches it - it probably expired.

## Personal Access Tokens

As a developer, you can now create personal access tokens that you can use to delegate access to your script on your behalf, similar to how Github's [Personal Access Tokens](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) work.

When you create them, you can assign assign to them whatever scopes & lifetime you want to, just remember to limit both to the minimum to be _safe._

::: tip
To create a new token head over `YOUR-SPECKLE-SERVER\profile`
:::

## Apps

![image](https://user-images.githubusercontent.com/2679513/109046703-f45be080-76cc-11eb-83b3-27ed956ff319.png)

Once you're beyond the hacking phase, you'll probably want to create & publish a speckle app that others can use. As a developer, you can:

- register apps that others can use (or not),
- manage the apps you have created - edit name, description, redirect url, scopes, and delete.

Once an app is registered on a server, users can now delegate access to it for the set of scopes that the developer registered for that application. Once the delegation process is successful - the user approves it - they will get redirected to the url that the developer specified.

Of course, as an end user, you have full control and visibility on the apps you have authorized. You can:

- see all your authorized apps (apps that you have granted access to),
- revoke access to any of the above,
- check out any publicly listed apps on this server (optional at this stage)

### Extras on app types

Note: broadly speaking, there are two type of apps:

- Apps that act on behalf of a user - **supported ✅**
- Apps that can act with their own identity - **not currently supported ⏱**

We'll write soon more documentation on how the authentication flow with the Server actually works. For the geeks out there, here's a short summary, or some important points:

- We are supporting the **authorization_code** flow with **PKCE** only for public and confidential clients.
- We do not support dynamic scope requests for apps. We **only support pre-registered scopes for each app**.
- If an app is edited in any way - name, scopes, etc. - all its tokens get revoked and users will need to re-authorize it.

Clients are usually split into two categories: public and private. Public clients cannot realistically hold a secret, whereas private ones can. For example, a front-end only web application is a public client; same goes for the desktop connectors. A private client can be a server-side application, which can realistically store an application secret in, for example, a .env file or provide it during the CI/CD process.

Clients are protected by:

- Using exclusively a pre-registered redirect URL.
- Native apps (desktop): registering a custom application scheme (`speckle://`).
- PKCE (Proof of Key For Code Exchange).
- a client id & client secret, but the clientSecret is superfluous in the case of public clients.

## Examples

The 2.0 server already comes with two applications that demonstrate this flow (warning - there might still be bugs). These are:

- The main web frontend application - accessible at the server's default url, and
- The GraphQL explorer - accessible at your server's url + `/explorer`.

## Summary

We've put a lot of work into making Speckle developer friendly and extensible - and apps are just a small part of that. We hope that writing Speckle Apps will be fun and effective, and we can't wait to see what you'll do with them!
