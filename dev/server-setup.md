# (deprecated) Deploying a Server - DigitalOcean Marketplace App

::: tip IMPORTANT
As of March 2024 Speckle has deprecated the DigitalOcean Marketplace App. We instead recommend following our [deployment guide using Docker Compose](./server-manualsetup.md).

If you need help exploring your options for running and managing a Speckle server, [we can help](https://speckle.systems/getstarted/)!
:::

The following provides details on how to maintain an existing DigitalOcean Marketplace App deployment.

## Prerequisites

- [Required] A [DigitalOcean](https://www.digitalocean.com/) account.
- [Required] An existing DigitalOcean Droplet deployed from the Speckle Server Marketplace App prior to March 2024.

## Configure your Server

- Login with `ssh` into the droplet to configure it.

To reconfigure the server, you can run this ssh command:

    ```shell
    /opt/speckle-server/setup.py
    ```

If you encounter any issue, have any question or just want to say hi, reach out in [our forum](https://speckle.community/).
