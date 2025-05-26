---
title: Introduction
deprecationType: server
---

# Introduction

Speckle server, frontend and viewer are hosted in our [speckle-server](https://github.com/specklesystems/speckle-server) repo.

To set up a local Speckle server for development, check out the Readme files in the git repo for a quick start, or the [Local Setup](/dev/server-local-dev) page for detailed instructions.

To deploy a Speckle server on a non-production cloud environment, checkout the guide for deploying to [Kubernetes](/dev/server-setup-k8s) or for deploying to Docker with [Docker Compose](/dev/server-manualsetup).

## Server API

Our Speckle Server offers both a [GraphQL API](/dev/server-graphql-api) and a [REST API](/dev/server-rest-api), for most of your queries the GQL API is probably best suited because of its flexibility and ease of use.
When working with uploading and downloading objects, the REST API is preferred.
