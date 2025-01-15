# Local Development Environment

This is the recommended method for developing or debugging the Speckle Server locally.

If you plan to give others access to your Server instance, consider running it with production settings. Please refer to our guide for [Kubernetes](server-setup-k8s) or [Docker Compose](server-manualsetup).

## TL;DR

### Prerequisites

Assuming you have:

* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* _optional_ [GitHub configured with ssh key auth](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
* [Node 18](https://nodejs.org/en).
* [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/).

Also don't worry if you don't have all of these, the detailed instructions provide more info on alternative ways to achieve the same thing.
This is a high efficiency getting started step list.

## Supported Platforms

Speckle server has been developed on Linux, Windows WSL2, and MacOS.  It _does not_ work on Windows without WSL2.

On MacOS devices with Apple based chips (M2, M3 etc.) it is possible to run the server as described below, but building and running Dockerfiles takes a lot of time (due to emulation of an x86 platform).

### Steps

1. `git clone git@github.com:specklesystems/speckle-server.git` or, alternatively `git clone https://github.com/specklesystems/speckle-server.git`
1. `cd speckle-server`
1. `corepack enable`
1. `yarn`
1. `yarn build`
1. `yarn dev:docker:up`
1. `cp packages/server/.env-example packages/server/.env`
1. `cp packages/server/.env.test-example packages/server/.env.test`
1. `cp packages/frontend-2/.env.example packages/frontend-2/.env`
1. `cp packages/dui3/.env.example packages/dui3/.env`
1. `yarn dev`

Wait for the frontend to build, and voila, you have a fully functional Speckle Server running at `http://localhost:3000`.

To run a specific part of the Speckle server stack, go to the [components](#components) section

## Details

Let's step back and see what we did.

1. To clone the repo git with [ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) auth was used.
You can use https based auth too, and can also gather some bonus points by using the `gh-cli` :D
1. We change into the cloned repository directory.
1. Nodejs versions ^16 now come with a package manager manager bundled named `corepack`. It enables us to use yarn without actually installing anything.
1. The monorepo is managed by [yarn workspaces](https://yarnpkg.com/features/workspaces).
This way the package manager handles dependencies of the monorepo and the proper connections between the different packages.
Running `yarn` a shorthand for `yarn install` bootstraps the repo.
1. Some of the local packages (viewer, object loader) has to be built the first time so that all packages are linked properly. 
This can be done easily with a yarn script, where the yarn command will execute the given build script in all packages where it exists.
So running `yarn build` triggers all available build commands.
1. In this step, all the required services are started via docker compose.
The `docker-compose-deps.yml` file contains a sensible default setup of all the required non Speckle developed services.
This config by no means meant to be used in production.
If you are not running these dependencies via docker compose, please make sure, that their configuration options are in line with either the compose file or the individual package configurations.
1. In this step the provided example file is copied to a `.env` file with keeping the default values.
Here again we are providing a set of sensible defaults that work out of the box if you follow this guide, but do make sure to reflect any changes you make in you environment.
1. Similarly to the last step, we're providing sensible defaults for env variables that are applied when running tests or running the server in test mode
1. Similarly to the last step, we're providing sensible defaults for env variables that are applied to the new frontend
1. Similarly to the last step, we're providing sensible defaults for env variables that are applied to dui3
1. Just like above, we use yarn to run the `dev` script in each package. This is probably not the most efficient way, since it starts more packages in development mode, than needed, but its the easiest command that gets a server up and running. When developing, you probably want to run each component separately. A good enough setup might be to just run the server and the preferred frontend (run `yarn dev` only in those individual package directories).

When running `yarn dev` for all packages you might see errors relating to `@speckle/shared` being missing, but this is only temporarily because `@speckle/shared` is also being re-built at that point in time. Once its finished building all of the other packages should pick up on it and work fine. You might also see GraphQL Codegen errors, which also are temporary, because they rely on the speckle server being up and running.

::: tip IMPORTANT
Don't forget to set up the variables in the `.env` & `.env.test` files according to your deployment
:::

## Components

To run a barebones Speckle Server, you need to run:

* the `frontend-2` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/frontend-2))
* the `server` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/server))

Optionally, to enable extra functionality, microservices should be run separately. For more information, check their `README.md` file in the git repository:

* the `preview-service` package generates preview images for streams (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/preview-service))
* the `webhook-service` package is responsible with calling the configured webhooks
* the `fileimport-service` package parses and imports uploaded files into Speckle.

Detailed instructions for running them locally are kept up to date in their respective `readme.md` files.

In this deployment type, the frontend Vue app will listen by default on the local interface (not available over the network) on `port 8080`, but will have no knowledge about the `server` component, and thus **should not be accessed directly**.

The server component will listen on the local interface (not available over the network) on `port 3000`, and will proxy the frontend requests to the frontend component (as configured in .env file).
