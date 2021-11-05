# Deploying a Server - manual setup

::: tip IMPORTANT
We offer a free server that you can use straight away (create accounts, etc.).

We can also help you manage your Server deployments (setting things up securely, automatic upgrades, support, etc)

See [https://speckle.systems/getstarted/](https://speckle.systems/getstarted/) for more details on our offerings.
:::

If you want to run your own instance, there are multiple ways to achieve this:
- The easiest way is to use our precompiled releases that are available as docker images on Docker Hub.
- If you want to deploy the Server with your own modifications, you should build your own docker images (instructions below).
- Also, you can run the Server with local development tools needed for each package (requires development knowledge)

### Dependencies

The Speckle server needs two services available over the network:
- PostgreSQL (tested with v12 and v13)
- Redis
- Optional: S3-compatible Object Storage

::: tip
PostgreSQL, Redis and MinIO are included in the following deployment instructions, so **you don't need to install them manually**.

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

If you need help deploying a production server, [we can help](https://speckle.systems/getstarted/)!
:::

This is the easiest way to get the Server running.

As prerequisites, you only need a Linux VM with at least 4 GB of RAM and have [Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script) and [Docker Compose](https://docs.docker.com/compose/install/#install-compose-on-linux-systems) installed.

#### Step 1: Create a directory for this deployment on the system:
```
# mkdir /opt/speckle/
```

#### Step 2: Copy and paste this into a file named `docker-compose.yml` in your directory:
```yaml
version: "2"
services:
  ####
  # Speckle Server dependencies
  #######
  postgres:
    image: "postgres:13.1-alpine"
    restart: always
    environment:
      POSTGRES_DB: speckle
      POSTGRES_USER: speckle
      POSTGRES_PASSWORD: speckle
    volumes:
      - ./postgres-data:/var/lib/postgresql/data/
    ports:
      - "127.0.0.1:5432:5432"

  redis:
    image: "redis:6.0-alpine"
    restart: always
    volumes:
      - ./redis-data:/data
    ports:
      - "127.0.0.1:6379:6379"

  minio:
    image: "minio/minio"
    command: server /data --console-address ":9001"
    restart: always
    volumes:
      - ./minio-data:/data
    ports:
      - "127.0.0.1:9000:9000"
      - "127.0.0.1:9001:9001"

  ####
  # Speckle Server
  #######
  speckle-frontend:
    image: speckle/speckle-frontend:2
    restart: always
    ports:
      - "0.0.0.0:80:80"

  speckle-server:
    image: speckle/speckle-server:2
    restart: always
    command: ["bash", "-c", "/wait && node bin/www"]
    environment:
      # TODO: Change this to the URL of the speckle server, as accessed from the network
      CANONICAL_URL: "http://localhost"

      # TODO: Change this to a unique secret for this server
      SESSION_SECRET: "TODO:ReplaceWithLongString"

      STRATEGY_LOCAL: "true"
      DEBUG: "speckle:*"

      POSTGRES_URL: "postgres"
      POSTGRES_USER: "speckle"
      POSTGRES_PASSWORD: "speckle"
      POSTGRES_DB: "speckle"

      REDIS_URL: "redis://redis"
      
      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "minioadmin"
      S3_SECRET_KEY: "minioadmin"
      S3_BUCKET: "speckle-server"
      S3_CREATE_BUCKET: "true"
      
      WAIT_HOSTS: postgres:5432, redis:6379, minio:9000

  preview-service:
    image: speckle/speckle-preview-service:2
    restart: always
    mem_limit: "1000m"
    memswap_limit: "1000m"
    command: ["bash", "-c", "/wait && node bin/www"]
    environment:
      DEBUG: "preview-service:*"
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"
      WAIT_HOSTS: postgres:5432

  webhook-service:
    image: speckle/speckle-webhook-service:2
    restart: always
    command: ["bash", "-c", "/wait && node main.js"]
    environment:
      DEBUG: "webhook-service:*"
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"
      WAIT_HOSTS: postgres:5432

  fileimport-service:
    image: speckle/speckle-fileimport-service:2
    restart: always
    command: ["bash", "-c", "/wait && node src/daemon.js"]
    environment:
      DEBUG: "fileimport-service:*"
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"
      WAIT_HOSTS: postgres:5432

      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "minioadmin"
      S3_SECRET_KEY: "minioadmin"
      S3_BUCKET: "speckle-server"

      SPECKLE_SERVER_URL: "http://speckle-server:3000"
      
```

#### Step 3: Edit the fields marked with `TODO`
Make sure to edit the file and change
- `CANONICAL_URL` to the url used to access this speckle server. This can be `http://[PUBLIC_IP]` or `http://[DOMAIN_NAME]`
- For added security, change the `SESSION_SECRET` to a unique secret value for this deployment.

The server also supports some other environment variables. You can see them in our [.env-example file from the git repo](https://github.com/specklesystems/speckle-server/blob/main/packages/server/.env-example).  

#### Step 4: Optionally add easy TLS certificate

* set up a dns record, that point to the public ip of your VM
* add a new entry into the services into the previously defined docker-compose.yml
  ```yaml
  services:
    reverse-proxy:
      image: traefik:v2.5
      command: 
        - "--providers.docker"
        - "--entrypoints.websecure.address=:443"
        - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
        #- "--certificatesresolvers.myresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"

        # TODO: replace with proper email
        - "--certificatesresolvers.myresolver.acme.email={your@example.com}"

        - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"

      ports:
        # The HTTP port
        - "443:443"
        # The Web UI (enabled by --api.insecure=true)
        - "8080:8080"
      volumes:
        - "./letsencrypt:/letsencrypt"
        # So that Traefik can listen to the Docker events
        - /var/run/docker.sock:/var/run/docker.sock
  ```
* make sure to replace `{your@example.com}` for the `--certificatesresolvers.myresolver.acme.email` with an email, that belongs to you

* modify the frontend service definition with some extra labels like below
  ```yaml

    speckle-frontend:
      image: speckle/speckle-frontend:latest
      restart: always
      labels:
        - "traefik.http.routers.speckle-frontend.rule=Host(`{example.com}`)"
        - "traefik.http.routers.speckle-frontend.entrypoints=websecure"
        - "traefik.http.routers.speckle-frontend.tls.certresolver=myresolver"

  ```

* change `traefik.http.routers.speckle-frontend.rule` replace `{example.com}` with your domain
* change `CANONICAL_URL` to match `https://yourdomain`

#### Step 5: Start the Server and the dependencies
```bash
# cd /opt/speckle
# docker-compose up -d
```

This will:
- Run PostgreSQL inside docker, with data files stored in `/opt/speckle/postgres-data/`
- Run Redis inside docker, with data files stored in `/opt/speckle/redis-data/`
- Run MinIO inside docker, with data files stored in `/opt/speckle/minio-data/` 
- Run the Server component, configured for this environment.
- Run the Frontend component, exposing port 80 to the network the VM is in.
- Run the other microservices for extending the SpeckleServer functionality ( `preview-service`, `webhook-service`, `fileimport-service` )

All containers, except the frontend, are not accessible from outside the VM.

All containers automatically start at system startup (so if the VM gets rebooted, the Server will automatically start)


## Run in a VM without dependencies

If you plan to run PostgreSQL, Redis and and S3-compatible object storage service separately, for example as managed deployments by a cloud provider (DigitalOcean, AWS, Azure, etc), you can follow the same instructions as above, but with this simplified `docker-compose.yml` file:
```yaml
version: "2"
services:
  speckle-frontend:
    image: speckle/speckle-frontend:2
    restart: always
    ports:
      - "0.0.0.0:80:80"

  speckle-server:
    image: speckle/speckle-server:2
    restart: always
    environment:
      # TODO: Change this to the URL of the speckle server, as accessed from the network
      CANONICAL_URL: "http://localhost"

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
      
  preview-service:
    image: speckle/speckle-preview-service:2
    restart: always
    mem_limit: "1000m"
    memswap_limit: "1000m"
    environment:
      DEBUG: "preview-service:*"
      
      # TODO: Change to PostgreSQL connection string:
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"

  webhook-service:
    image: speckle/speckle-webhook-service:2
    restart: always
    environment:
      DEBUG: "webhook-service:*"
      
      # TODO: Change to PostgreSQL connection string:
      PG_CONNECTION_STRING: "postgres://speckle:speckle@postgres/speckle"

  fileimport-service:
    image: speckle/speckle-fileimport-service:2
    restart: always
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

## Run your speckle-server fork

If you made some changes to the server and want to run those instead of the official releases, we created some useful docker-compose .yml files to help with that.

#### Step 1: Set up dependencies

::: tip
If you set up PostgreSQL, Redis and S3-compatible service outside of this VM (for example a managed deployment from a cloud provider), you can skip this step, but remember to set up the correct environment variables later
:::

To get the PostgreSQL, Redis and MinIO dependencies up and running in the VM, our git repo contains 
[a docker-compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-deps.yml)
for running these dependencies locally in docker containers.

It also includes `PGAdmin` and `redis-insight` to be able to explore the raw data. If you don't need them, you can safely remove those entries from the `docker-compose-deps.yml` file.


```bash
$ cd [PATH_TO_SPECKLE-SERVER_REPOSITORY]
$ docker-compose -f docker-compose-deps.yml up -d
```

This will run the following containers, and will automatically launch them at system startup:
- *PostgreSQL v13*, listening only on `127.0.0.1:5432` with default credentials `speckle`:`speckle` and a database named `speckle`.
- *Redis v6*, listening only on `127.0.0.1:6379`
- *PGAdmin4*, listening only on `127.0.0.1:16543` with default credentials `admin@localhost` : `admin`
- *Redis Insight*, listening only on `127.0.0.1:8001`
- *MinIO*, listenting on `127.0.0.1:9000` with the API endpoint and on `127.0.0.1:9001` with the Web Management Interface (default credentials used: `minioadmin`/`minioadmin`)

All of the above containers listen on the local loopback interface (`127.0.0.1`) and are NOT accessible from the local network (for security, since they use default credentials)

To use PGAdmin, after login you can configure a server connection to the host `postgres` (user `speckle`, password `speckle`, database `speckle`)

To use Redis Insight, you can configure it to connect to the hostname `redis` (port `6379`)

Docker-compose creates named docker volumes for storing data for each of the containers, so data is persisted.
You can view existing docker volumes with `docker volume ls` and delete a volume and existing data with `docker volume rm [volume_name]` 

#### Step 2: Build and run your code

The git repository contains [a docker-compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-speckle.yml) for building and running the Speckle server frontend and backend in docker containers.

To use it, first edit the variables in the `docker-compose-speckle.yml` file to reflect your environment. Then, you can start them with:
```bash
$ cd [PATH_TO_SPECKLE-SERVER_REPOSITORY]
$ docker-compose -f docker-compose-speckle.yml up --build -d
```
(You can safely ignore the warnings about the *orphan containers*)

This will run the following containers, and will automatically launch them at system startup:
- *speckle-frontend*, an nginx container that serves the Vue app build as static files (exposed on port 80 in the VM network) and proxies server requests to the `speckle-server` container
- *speckle-server*, the `server` component that doesn't expose any port outside the internal docker network.
- *preview-service*, the component that generates stream previews. Doesn't expose any port outside the internal docker network.
- *webhook-service*, the component that calls webhooks. Doesn't expose any port.
- *fileimport-service*, the component that imports uploaded files. Doesn't expose any port.

## Run in development mode

This is the recommended method for developing or debugging the Speckle Server locally.

If you plan to give others access to your Server instance, consider running it with production settings in a dedicated virtual machine (see previous section)

To run the Speckle Server, you need to run:
- the `frontend` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/frontend))
- the `server` package (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/server))

Optionally, to enable extra functionality, microservices should be run separately. For more information, check their `README.md` file in the git repository:
- the `preview-service` package generates preview images for streams (see [the readme.md file in the git repo](https://github.com/specklesystems/speckle-server/tree/main/packages/preview-service))
- the `webhook-service` package is responsible with calling the configured webhooks
- the `fileimport-service` package parses and imports uploaded files into Speckle.


Detailed instructions for running them locally are kept up to date in their respective readme.md files.

::: tip IMPORTANT
Don't forget to set up the variables in the `.env` file according to your deployment. You can get started by copying the `.env-example` file to `.env` and then edit it.
:::

In this deployment type, the frontend Vue app will listen by default on the local interface (not available over the network) on `port 8080`, but will have no knowledge about the `server` component, and thus **should not be accessed directly**.

The server component will listen on the local interface (not available over the network) on `port 3000`, and will proxy the frontend requests to the frontend component (as configured in .env file).

The optional `preview-service` component has an internal express app that listens only on the local interface on `port 3001`

You can access Speckle Web from your browser at [http://localhost:3000/](http://localhost:3000/).

If you plan to access the development server over the network, you should update the `CANONICAL_URL` variable in the .env file to the URL that is used to access the server, and also set the `BIND_ADDRESS` env variable to `0.0.0.0`.

