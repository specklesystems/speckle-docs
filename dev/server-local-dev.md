# Local development environment

This is the recommended method for developing or debugging the Speckle Server locally.

If you plan to give others access to your Server instance, consider running it with production settings in a dedicated virtual machine (see [manual setup](server-manualsetup))

## TL;DR

Assuming you have:
* git with ssh key auth
* nodejs 14
* docker and docker-compose

Also don't worry if you don't have all of these, the detailed instructions provide more info on alternative ways to achieve the same thing.
This is a high efficiency getting started step list.

### Steps

1. `$ git clone https://github.com/specklesystems/speckle-server.git`
2. `$ npm install`
3. `$ npx lerna bootstrap`
4. `$ npx lerna run build`
5. `$ docker-compose -f docker-compose-deps.yml up -d`
6. `$ cp packages/server/.env-example packages/server/.env`
7. `$ npx lerna run dev --parallel`

Wait for the frontend to build, and voila, you have a fully functional Speckle Server running at [http://localhost:3000](http://localhost:3000).

To run a specific part of the Speckle server stack, go to the [components](#components) section

## Details

Let's step back and see what we did.

1. To clone the repo git with [ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) auth was used.
You can use https based auth too, and can also gather some bonus points by using the `gh-cli` :D
1. Install the root level npm packages, you can use the shorthand `$ npm i`
1. The monorepo is managed by [lerna](https://lerna.js.org/).
This tool is necessary to create the proper connections between the different packages.
To get things set up first we need to bootstrap the project dependencies with lerna. This step will install all required npm dependencies for all the packages.
`$ npx lerna bootstrap`. Please note, that this step **can take a while** to finish.
1. Some of the local packages (viewer, object loader) has to be built the first time so that all packages are linked properly. 
This can be done easily with lerna, where the lerna run command will execute the given npm script in all packages where it exists.
So running `$ npx lerna run build` triggers all build commands.
1. In this step, all the required services are started via docker-compose.
The `docker-compose-deps.yml` file contains a sensible default setup of all the required non Speckle developed services.
This config by no means meant to be used in production.
If you are not running these dependencies via docker-compose, please make sure, that their configuration options are in line with either the compose file or the individual package configurations.
1. In this step the provided example file is copied to a `.env` file with keeping the default values.
Here again we are providing a set of sensible defaults that work out of the box if you follow this guide, but do make sure to reflect any changes you make in you environment.
1. Just like above, we use lerna to run the `dev` script in each package. This is probably not the most efficient way, since it starts more package in development mode, than needed, but its the easiest command that gets a server up and running. When developing, you probably want to run each component separately.

::: tip IMPORTANT
Don't forget to set up the variables in the `.env` file according to your deployment. You can get started by copying the `.env-example` file to `.env` and then edit it.
:::

## Components

To run a barebones Speckle Server, you need to run:
- the `frontend` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/frontend))
- the `server` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/server))

Optionally, to enable extra functionality, microservices should be run separately. For more information, check their `README.md` file in the git repository:
- the `preview-service` package generates preview images for streams (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/preview-service))
- the `webhook-service` package is responsible with calling the configured webhooks
- the `fileimport-service` package parses and imports uploaded files into Speckle.

Detailed instructions for running them locally are kept up to date in their respective `readme.md` files.

In this deployment type, the frontend Vue app will listen by default on the local interface (not available over the network) on `port 8080`, but will have no knowledge about the `server` component, and thus **should not be accessed directly**.

The server component will listen on the local interface (not available over the network) on `port 3000`, and will proxy the frontend requests to the frontend component (as configured in .env file).









