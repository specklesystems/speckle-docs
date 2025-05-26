---
title: Deploying with Docker Compose
deprecationMessages: server
---

<Banner />

# Deploying a Server - Docker Compose

::: tip IMPORTANT
We offer a free server that you can use straight away (create accounts, etc.).

We can also help you manage your Server deployments (setting things up securely, automatic upgrades, support, etc)

See [https://speckle.systems/pricing/](https://speckle.systems/pricing/) for more details on our offerings.
:::

If you want to run your own instance, there are multiple ways to achieve this:

- The easiest way is to use our precompiled releases that are available as docker images on Docker Hub. This guide provides details on how to do that.
- If you want to deploy the Server with your own modifications, you should build your own docker images. Please refer to our separate guide on [local development](/server/server-local-dev).

## Dependencies

The Speckle server needs these services available over the network:

- PostgreSQL (tested with v12 and v13)
- Valkey
- Optional: S3-compatible Object Storage

::: tip
PostgreSQL, Valkey and MinIO are included in the following deployment instructions, so **you don't need to install them manually**.

You can also install them manually or use a managed deployment from a cloud provider (Azure, AWS, DigitalOcean, etc). Setting them up manually is out of scope of this article.
:::

## Run in a Virtual Machine

::: tip IMPORTANT
This setup is not recommended for use in production for a few reasons, namely:

- application level updates: we tend to move quite fast, and if things get busy, blink twice and you’re on an outdated server. this has security implications too.
- guaranteed uptime: from our experience, vm’s tend to restart now and then (they need updates and reboots too), which results in downtime.
- database backups - again this is up to you mostly on what’s your risk appetite when it comes to dealing with live data. We’re a bit more on the paranoid side, so we’ve set up replication, failover nodes and PITR.
- end-to-end encryption: possibly less of daily concern - we’re offering from encryption at rest, to https security (SSL/TLS certs & renewal) - so whenever data travels between a client and the db it’s always encrypted, inc. inside the datacenter itself.
- automatic scalability: for example, the preview service can be quite a monster; that setup can eat up all a vm’s resources, and starve other processes causing general system wide instability.

If you need help deploying a production server, [we can help](https://speckle.systems/pricing/)!
:::

This is the easiest way to get the Server running.

As prerequisites, you only need a Linux VM with at least 4 GB of RAM and have [Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script) and [Docker Compose](https://docs.docker.com/compose/install/#install-compose-on-linux-systems) installed.

### Step 1: Create a Directory for this Deployment on the System

```bash
mkdir /opt/speckle/
```

### Step 2: Copy and paste this into a file named `docker-compose.yml` in your directory

```yaml
version: "2.3"
name: "speckle-server"

services:
  ####
  # Speckle Server dependencies
  #######
  postgres:
    image: "postgres:16.9-alpine"
    restart: always
    environment:
      POSTGRES_DB: speckle
      POSTGRES_USER: speckle
      POSTGRES_PASSWORD: speckle
    volumes:
      - ./postgres-data:/var/lib/postgresql/data/
    healthcheck:
      # the -U user has to match the POSTGRES_USER value
      test: ["CMD-SHELL", "pg_isready -U speckle"]
      interval: 5s
      timeout: 5s
      retries: 30

  redis:
    image: "valkey/valkey:8-alpine"
    restart: always
    volumes:
      - ./redis-data:/data
    ports:
      - "127.0.0.1:6379:6379"
    healthcheck:
      test: ["CMD", "valkey-cli", "--raw", "incr", "ping"]
      interval: 5s
      timeout: 5s
      retries: 30

  minio:
    image: "minio/minio"
    command: server /data --console-address ":9001"
    restart: always
    volumes:
      - ./minio-data:/data
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 5s
      timeout: 5s
      retries: 5

  ####
  # Speckle Server
  #######
  speckle-ingress:
    image: speckle/speckle-docker-compose-ingress:2
    restart: always
    ports:
      - "0.0.0.0:80:8080"
    environment:
      FILE_SIZE_LIMIT_MB: "100"
      NGINX_ENVSUBST_OUTPUT_DIR: "/etc/nginx"

  speckle-frontend-2:
    image: speckle/speckle-frontend-2:2
    restart: always
    environment:
      NUXT_PUBLIC_SERVER_NAME: "local"
      # TODO: Change NUXT_PUBLIC_API_ORIGIN to the URL of the speckle server, as accessed from the network. This is the same value as should be used for the CANONICAL_URL in the server section below.
      NUXT_PUBLIC_API_ORIGIN: "http://127.0.0.1"
      NUXT_PUBLIC_BACKEND_API_ORIGIN: "http://speckle-server:3000"
      # TODO: Change NUXT_PUBLIC_BASE_URL to the URL of the speckle frontend, as accessed from the network. This is the same value as should be used for the CANONICAL_URL in the server section below.
      NUXT_PUBLIC_BASE_URL: "http://127.0.0.1"
      NUXT_PUBLIC_LOG_LEVEL: 'warn'
      NUXT_REDIS_URL: "redis://redis"

  speckle-server:
    image: speckle/speckle-server:2
    restart: always
    healthcheck:
      test:
        [
          "CMD",
          "/nodejs/bin/node",
          "-e",
          "try { require('node:http').request({headers: {'Content-Type': 'application/json'}, port:3000, hostname:'127.0.0.1', path:'/graphql?query={serverInfo{version}}', method: 'GET', timeout: 2000 }, (res) => { body = ''; res.on('data', (chunk) => {body += chunk;}); res.on('end', () => {process.exit(res.statusCode != 200 || body.toLowerCase().includes('error'));}); }).end(); } catch { process.exit(1); }",
        ]
      interval: 10s
      timeout: 3s
      retries: 30

    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
      minio:
        condition: service_healthy
    environment:
      # TODO: Change this to the URL of the speckle server, as accessed from the network
      CANONICAL_URL: "http://127.0.0.1"
      SPECKLE_AUTOMATE_URL: "http://127.0.0.1:3030"

      REDIS_URL: "redis://redis"

      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "minioadmin"
      S3_SECRET_KEY: "minioadmin"
      S3_BUCKET: "speckle-server"
      S3_CREATE_BUCKET: "true"

      FILE_SIZE_LIMIT_MB: 100

      # TODO: Change this to a unique secret for this server
      SESSION_SECRET: "TODO:ReplaceWithLongString"

      STRATEGY_LOCAL: "true"
      DEBUG: "speckle:*"

      POSTGRES_URL: "postgres"
      POSTGRES_USER: "speckle"
      POSTGRES_PASSWORD: "speckle"
      POSTGRES_DB: "speckle"
      ENABLE_MP: "false"

      # TODO: Change this to the URL of the speckle server, as accessed from the network
      FRONTEND_ORIGIN: "http://127.0.0.1"

  preview-service:
    image: speckle/speckle-preview-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    mem_limit: "1000m"
    memswap_limit: "1000m"
    environment:
      DEBUG: "preview-service:*"
      REDIS_URL: "redis://redis"
      PORT: "3001"

  webhook-service:
    image: speckle/speckle-webhook-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    environment:
      DEBUG: "webhook-service:*"
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"
      WAIT_HOSTS: postgres:5432

  fileimport-service:
    image: speckle/speckle-fileimport-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    environment:
      DEBUG: "fileimport-service:*"
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"
      WAIT_HOSTS: postgres:5432

      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "minioadmin"
      S3_SECRET_KEY: "minioadmin"
      S3_BUCKET: "speckle-server"

      SPECKLE_SERVER_URL: "http://speckle-server:3000"

networks:
  default:
    name: speckle-server

volumes:
  postgres-data:
  redis-data:
  minio-data:
```

### Step 3: Edit the fields marked with `TODO`

Make sure to edit the file and change:

- `CANONICAL_URL` to the url used to access this speckle server. This can be `http://[PUBLIC_IP]` or `http://[DOMAIN_NAME]`
- `NUXT_PUBLIC_API_ORIGIN` to the same value as set for `CANONICAL_URL`
- `NUXT_PUBLIC_BASE_URL` to the same value as set for `CANONICAL_URL`
- `FRONTEND_ORIGIN` to the same value as set for `CANONICAL_URL`
- For added security, change the `SESSION_SECRET` to a unique secret value for this deployment.

The server also supports some other environment variables. You can see them in our [.env.example file from the git repo](https://github.com/specklesystems/speckle-server/blob/main/packages/server/.env.example).

### Step 4: **Recommended** Add a TLS Certificate and Serve Via HTTPS

- set up a dns record, that points to the public ip of your VM
- add a new entry into the services into the previously defined docker-compose.yml

  ```yaml
  services:
    reverse-proxy:
      image: traefik:v2.10
      restart: always
      command:
        - "--providers.docker=true"
        - "--providers.docker.exposedbydefault=false"
        - "--entrypoints.websecure.address=:443"
        - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
        # To use Let's Encrypt staging server instead of production, uncomment the following line
        #- "--certificatesresolvers.myresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"
        # TODO: replace `{your@example.com}` with your actual email
        - "--certificatesresolvers.myresolver.acme.email=your@example.com"
        - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
        # To enable the Traefik web UI (enabled by --api.insecure=true); this is not recommended as it will expose the Traefik dashboard to the internet
        #- "--api.insecure=true"

      ports:
        # The HTTPS port (required for Traefik to listen to HTTPS requests)
        - "443:443"
        # The Traefik Web UI port if enabled by --api.insecure=true
        - "8080:8080"
      volumes:
        - "./letsencrypt:/letsencrypt"
        # So that Traefik can listen to the Docker events
        - "/var/run/docker.sock:/var/run/docker.sock:ro"
  ```

- make sure to replace `your@example.com` for the `--certificatesresolvers.myresolver.acme.email` with an email that belongs to you. This is used by Let's Encrypt to notify you about certificate expiration.
- modify the speckle-ingress service definition by removing all exposed ports
- modify the speckle-ingress with some extra labels like below:

  ```yaml
  speckle-ingress:
    image: speckle/speckle-docker-compose-ingress:2
    restart: always
    ports: [] #TODO remove all exposed ports
    environment:
      FILE_SIZE_LIMIT_MB: "100"
      NGINX_ENVSUBST_OUTPUT_DIR: "/etc/nginx"
    #TODO add these labels
    labels:
      - "traefik.enable=true"
      #TODO: replace `example.com` with your domain. This should just be the domain, and do not include the protocol (http/https).
      - "traefik.http.routers.speckle-ingress.rule=Host(`example.com`)"
      - "traefik.http.routers.speckle-ingress.entrypoints=websecure"
      - "traefik.http.routers.speckle-ingress.tls.certresolver=myresolver"
      - "traefik.http.services.speckle-ingress.loadbalancer.server.port=8080"
  ```

- change `traefik.http.routers.speckle-ingress.rule` replace `example.com` with your domain

### Step 5: Configure the Logging Driver for Docker

By default, Docker will log output from Speckle to a file on the host machine. For legacy reasons Docker defaults to a logging driver which does not manage logs well and will quickly fill up disk space with logs. Docker recommends configuring Docker to use a different logging driver, such as `local`, to prevent this problem. Please follow the instructions in [Docker's documentation](https://docs.docker.com/config/containers/logging/configure) to amend your Docker settings.

### Step 6: Start the Server and the Dependencies

```bash
cd /opt/speckle
docker compose up -d
```

This will:

- Run PostgreSQL inside docker, with data files stored in `/opt/speckle/postgres-data/`
- Run Valkey inside docker, with data files stored in `/opt/speckle/redis-data/`
- Run MinIO inside docker, with data files stored in `/opt/speckle/minio-data/`
- Run the Server component, configured for this environment.
- Run the Frontend component, exposing port 80 to the network the VM is in.
- Run the other microservices for extending the SpeckleServer functionality ( `preview-service`, `webhook-service`, `fileimport-service` )

All containers, except the frontend, are not accessible from outside the VM.

All containers automatically start at system startup (so if the VM gets rebooted, the Server will automatically start)

## Run in a VM without Dependencies

If you plan to run PostgreSQL, Valkey, and S3-compatible object storage service separately - for example as managed deployments by a cloud provider (DigitalOcean, AWS, Azure, etc) - you can follow the same instructions as above, but with this simplified `docker-compose.yml` file:

```yaml
version: "2.3"
services:
  speckle-ingress:
    image: speckle/speckle-docker-compose-ingress:2
    restart: always
    ports:
      - "0.0.0.0:80:8080"
    environment:
      FILE_SIZE_LIMIT_MB: "100"
      NGINX_ENVSUBST_OUTPUT_DIR: "/etc/nginx"

  speckle-frontend-2:
    image: speckle/speckle-frontend-2:2
    restart: always
    environment:
      NUXT_PUBLIC_SERVER_NAME: "local"
      # TODO: Change NUXT_PUBLIC_API_ORIGIN to the URL of the speckle server, as accessed from the network. This is the same value as should be used for the CANONICAL_URL in the server section below.
      NUXT_PUBLIC_API_ORIGIN: "http://127.0.0.1"
      NUXT_PUBLIC_BACKEND_API_ORIGIN: "http://speckle-server:3000"
      # TODO: Change NUXT_PUBLIC_BASE_URL to the URL of the speckle frontend, as accessed from the network. This is the same value as should be used for the CANONICAL_URL in the server section below.
      NUXT_PUBLIC_BASE_URL: "http://127.0.0.1"
      NUXT_PUBLIC_LOG_LEVEL: 'warn'
      NUXT_REDIS_URL: "redis://redis"

  speckle-server:
    image: speckle/speckle-server:2
    restart: always
    healthcheck:
      test:
        [
          "CMD",
          "/nodejs/bin/node",
          "-e",
          "try { require('node:http').request({headers: {'Content-Type': 'application/json'}, port:3000, hostname:'127.0.0.1', path:'/graphql?query={serverInfo{version}}', method: 'GET', timeout: 2000 }, (res) => { body = ''; res.on('data', (chunk) => {body += chunk;}); res.on('end', () => {process.exit(res.statusCode != 200 || body.toLowerCase().includes('error'));}); }).end(); } catch { process.exit(1); }",
        ]
      interval: 10s
      timeout: 3s
      retries: 30
    environment:
      # TODO: Change this to the URL of the speckle server, as accessed from the network
      CANONICAL_URL: "http://127.0.0.1"

      # TODO: Change this to a unique secret for this server
      SESSION_SECRET: "TODO:ReplaceWithLongString"

      STRATEGY_LOCAL: "true"
      DEBUG: "speckle:*"

      # TODO: Change to PostgreSQL connection details:
      POSTGRES_URL: "postgres"
      POSTGRES_USER: "speckle"
      POSTGRES_PASSWORD: "speckle"
      POSTGRES_DB: "speckle"

      # TODO: Change to redis connection string:
      REDIS_URL: "redis://redis"

      # TODO: Change to ObjectStorage connection information (s3-compatible):
      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "minioadmin"
      S3_SECRET_KEY: "minioadmin"
      S3_BUCKET: "speckle-server"

      # TODO: Change this to the URL of the speckle server, as accessed from the network
      FRONTEND_ORIGIN: "http://127.0.0.1"

  preview-service:
    image: speckle/speckle-preview-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    mem_limit: "1000m"
    memswap_limit: "1000m"
    environment:
      DEBUG: "preview-service:*"

      # TODO: Change to PostgreSQL connection string:
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"

  webhook-service:
    image: speckle/speckle-webhook-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    environment:
      DEBUG: "webhook-service:*"

      # TODO: Change to PostgreSQL connection string:
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"

  fileimport-service:
    image: speckle/speckle-fileimport-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    environment:
      DEBUG: "fileimport-service:*"
      SPECKLE_SERVER_URL: "http://speckle-server:3000"

      # TODO: Change to PostgreSQL connection string:
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"

      # TODO: Change to ObjectStorage connection information (s3-compatible):
      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "minioadmin"
      S3_SECRET_KEY: "minioadmin"
      S3_BUCKET: "speckle-server"
```

## Update the Server to New Versions

This deployment mechanism doesn't provide an automatic update mechanism,
so from time to time server operators need to manually update the deployment.

We recommend first backing up your data prior to modifying or updating the
server. You can find instructions on how to do that [here](/server/server-database-migration.md).

To update Speckle:

1. connect to the virtual machine running the Speckle server instance
1. navigate to the folder, where the Speckle server docker-compose file is located
1. run `docker compose down` (this will take the server offline)
1. review the latest changes in this guide against your `docker-compose.yml` file, and amend as necessary.
1. run `docker compose pull` (this will retrieve the latest images)
1. run `docker compose up -d` (this starts the server stack, and runs it in the background)

Your server instance should be back online and updated.

## Run Your Speckle-Server Fork

If you made some changes to the server and want to run those instead of the official releases, we created some useful docker-compose.yml files to help with that.

### Step 1: Set up Dependencies

::: tip
If you set up PostgreSQL, Valkey and S3-compatible service outside of this VM (for example a managed deployment from a cloud provider), you can skip this step, but remember to set up the correct environment variables later
:::

To get the PostgreSQL, Valkey and MinIO dependencies up and running in the VM, our git repo contains
[a docker compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-deps.yml)
for running these dependencies locally in docker containers.

It also includes `PGAdmin` and `redis-insight` to be able to explore the raw data. If you don't need them, you can safely remove those entries from the `docker-compose-deps.yml` file.

```bash
cd [PATH_TO_SPECKLE-SERVER_REPOSITORY]
docker compose -f docker-compose-deps.yml up -d
```

This will run the following containers, and will automatically launch them at system startup:

- _PostgreSQL v13_, listening only on `127.0.0.1:5432` with default credentials `speckle`:`speckle` and a database named `speckle`.
- _Valkey v8_, listening only on `127.0.0.1:6379`
- _PGAdmin4_, listening only on `127.0.0.1:16543` with default credentials `admin@localhost` : `admin`
- _Redis Insight_, listening only on `127.0.0.1:8001`. To provide insights into the Valkey cache.
- _MinIO_, listening on `127.0.0.1:9000` with the API endpoint and on `127.0.0.1:9001` with the Web Management Interface (default credentials used: `minioadmin`/`minioadmin`)

All of the above containers listen on the local loopback interface (`127.0.0.1`) and are NOT accessible from the local network (for security, since they use default credentials)

To use PGAdmin, after login you can configure a server connection to the host `postgres` (user `speckle`, password `speckle`, database `speckle`)

To use Redis Insight, you can configure it to connect to the hostname `redis` (port `6379`)

Docker Compose creates named docker volumes for storing data for each of the containers, so data is persisted.
You can view existing docker volumes with `docker volume ls` and delete a volume and existing data with `docker volume rm [volume_name]`

### Step 2: Build and Run Your Code

The git repository contains [a docker compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-speckle.yml) for building and running the Speckle server frontend and backend in docker containers.

To use it, first edit the variables in the `docker-compose-speckle.yml` file to reflect your environment. Then, you can start them with:

```bash
cd [PATH_TO_SPECKLE-SERVER_REPOSITORY]
docker compose -f docker-compose-speckle.yml up --build -d
```

(You can safely ignore the warnings about the _orphan containers_)

This will run the following containers, and will automatically launch them at system startup:

- _docker-compose-ingress_, an nginx container that routes traffic to either speckle-frontend-2 or speckle-server as required. This is exposed on port 80 in the VM network.
- _speckle-frontend-2_, the frontend Vue app. It doesn't expose any port outside of the internal docker network.
- _speckle-server_, the `server` component. It doesn't expose any port outside of the internal docker network.
- _preview-service_, the component that generates stream previews. Doesn't expose any port outside of the internal docker network.
- _webhook-service_, the component that calls webhooks. Doesn't expose any port outside of the internal docker network.
- _fileimport-service_, the component that imports uploaded files. Doesn't expose any port outside of the internal docker network.

## Run in Development Mode

See the dedicated getting started with speckle server development [page](/server/server-local-dev).
