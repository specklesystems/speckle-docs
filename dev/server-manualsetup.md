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

## Dependencies

The Speckle server needs these services available over the network:

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

### Step 1: Create a directory for this deployment on the system

```bash
mkdir /opt/speckle/
```

### Step 2: Copy and paste this into a file named `docker-compose.yml` in your directory

```yaml
version: '2.3'
name: 'speckle-server'

services:
  ####
  # Speckle Server dependencies
  #######
  postgres:
    image: 'postgres:14.5-alpine'
    restart: always
    environment:
      POSTGRES_DB: speckle
      POSTGRES_USER: speckle
      POSTGRES_PASSWORD: speckle
    volumes:
      - postgres-data:/var/lib/postgresql/data/
    healthcheck:
      # the -U user has to match the POSTGRES_USER value
      test: ["CMD-SHELL", "pg_isready -U speckle"]
      interval: 5s
      timeout: 5s
      retries: 30

  redis:
    image: 'redis:7-alpine'
    restart: always
    volumes:
      - redis-data:/data
    ports:
      - '127.0.0.1:6379:6379'
    healthcheck:
      test: [ "CMD", "redis-cli", "--raw", "incr", "ping" ]
      interval: 5s
      timeout: 5s
      retries: 30

  minio:
    image: 'minio/minio'
    command: server /data --console-address ":9001"
    restart: always
    volumes:
      - minio-data:/data
    healthcheck:
      test: ["CMD-SHELL", "curl -s -o /dev/null http://127.0.0.1:9000/minio/index.html"]
      interval: 5s
      timeout: 30s
      retries: 30
      start_period: 10s

  ####
  # Speckle Server
  #######
  speckle-frontend:
    image: speckle/speckle-frontend:2
    restart: always
    ports:
      - '0.0.0.0:80:8080'
    environment:
      FILE_SIZE_LIMIT_MB: 100

  speckle-server:
    image: speckle/speckle-server:2
    restart: always
    healthcheck:
      test: ["CMD", "node", "-e", "try { require('node:http').request({headers: {'Content-Type': 'application/json'}, port:3000, hostname:'127.0.0.1', path:'/graphql?query={serverInfo{version}}', method: 'GET', timeout: 2000 }, (res) => { body = ''; res.on('data', (chunk) => {body += chunk;}); res.on('end', () => {process.exit(res.statusCode != 200 || body.toLowerCase().includes('error'));}); }).end(); } catch { process.exit(1); }"]
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
      CANONICAL_URL: 'http://127.0.0.1'
      SPECKLE_AUTOMATE_URL: 'http://127.0.0.1:3030'

      REDIS_URL: 'redis://redis'

      S3_ENDPOINT: 'http://minio:9000'
      S3_ACCESS_KEY: 'minioadmin'
      S3_SECRET_KEY: 'minioadmin'
      S3_BUCKET: 'speckle-server'
      S3_CREATE_BUCKET: 'true'

      FILE_SIZE_LIMIT_MB: 100

      # TODO: Change this to a unique secret for this server
      SESSION_SECRET: 'TODO:ReplaceWithLongString'

      STRATEGY_LOCAL: 'true'
      DEBUG: 'speckle:*'

      POSTGRES_URL: 'postgres'
      POSTGRES_USER: 'speckle'
      POSTGRES_PASSWORD: 'speckle'
      POSTGRES_DB: 'speckle'
      ENABLE_MP: 'false'

  preview-service:
    image: speckle/speckle-preview-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    mem_limit: '1000m'
    memswap_limit: '1000m'
    environment:
      DEBUG: 'preview-service:*'
      PG_CONNECTION_STRING: 'postgres://speckle:speckle@postgres/speckle'

  webhook-service:
    image: speckle/speckle-webhook-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    environment:
      DEBUG: 'webhook-service:*'
      PG_CONNECTION_STRING: 'postgres://speckle:speckle@postgres/speckle'
      WAIT_HOSTS: postgres:5432

  fileimport-service:
    image: speckle/speckle-fileimport-service:2
    restart: always
    depends_on:
      speckle-server:
        condition: service_healthy
    environment:
      DEBUG: 'fileimport-service:*'
      PG_CONNECTION_STRING: 'postgres://speckle:speckle@postgres/speckle'
      WAIT_HOSTS: postgres:5432

      S3_ENDPOINT: 'http://minio:9000'
      S3_ACCESS_KEY: 'minioadmin'
      S3_SECRET_KEY: 'minioadmin'
      S3_BUCKET: 'speckle-server'

      SPECKLE_SERVER_URL: 'http://speckle-server:3000'

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
- For added security, change the `SESSION_SECRET` to a unique secret value for this deployment.

The server also supports some other environment variables. You can see them in our [.env-example file from the git repo](https://github.com/specklesystems/speckle-server/blob/main/packages/server/.env-example).

### Step 4: Optionally add easy TLS certificate

- set up a dns record, that point to the public ip of your VM
- add a new entry into the services into the previously defined docker-compose.yml

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

- make sure to replace `{your@example.com}` for the `--certificatesresolvers.myresolver.acme.email` with an email, that belongs to you
- modify the frontend service definition with some extra labels like below:

  ```yaml

    speckle-frontend:
      image: speckle/speckle-frontend:2
      restart: always
      labels:
        - "traefik.http.routers.speckle-frontend.rule=Host(`{example.com}`)"
        - "traefik.http.routers.speckle-frontend.entrypoints=websecure"
        - "traefik.http.routers.speckle-frontend.tls.certresolver=myresolver"

  ```

- change `traefik.http.routers.speckle-frontend.rule` replace `{example.com}` with your domain
- change `CANONICAL_URL` to match `https://yourdomain`

### Step 5: Start the Server and the dependencies

```bash
cd /opt/speckle
docker-compose up -d
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
version: "2.3"
services:
  speckle-frontend:
    image: speckle/speckle-frontend:2
    restart: always
    ports:
      - "0.0.0.0:80:8080"

  speckle-server:
    image: speckle/speckle-server:2
    restart: always
    healthcheck:
      test: ["CMD", "node", "-e", "try { require('node:http').request({headers: {'Content-Type': 'application/json'}, port:3000, hostname:'127.0.0.1', path:'/graphql?query={serverInfo{version}}', method: 'GET', timeout: 2000 }, (res) => { body = ''; res.on('data', (chunk) => {body += chunk;}); res.on('end', () => {process.exit(res.statusCode != 200 || body.toLowerCase().includes('error'));}); }).end(); } catch { process.exit(1); }"]
      interval: 10s
      timeout: 3s
      retries: 30
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

## Update the server to new versions

This deployment mechanism doesn't provide an automatic update mechanism,
so from time to time server operators need to manually update the deployment.

We recommend first backing up your data prior to modifying or updating the
server. You can find instructions on how to do that [here](./server-database-migration.md).

To do that:

- connect to the virtual machine running the Speckle server instance
- navigate to the folder, where the Speckle server docker-compose file is located
- run `docker compose down` (this will take the server offline)
- run `docker compose pull`
- run `docker compose up -d` (this starts the server stack, and runs it in the background)

Your server instance should be back online and updated.

## Run your speckle-server fork

If you made some changes to the server and want to run those instead of the official releases, we created some useful docker-compose.yml files to help with that.

### Step 1: Set up dependencies

::: tip
If you set up PostgreSQL, Redis and S3-compatible service outside of this VM (for example a managed deployment from a cloud provider), you can skip this step, but remember to set up the correct environment variables later
:::

To get the PostgreSQL, Redis and MinIO dependencies up and running in the VM, our git repo contains 
[a docker compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-deps.yml)
for running these dependencies locally in docker containers.

It also includes `PGAdmin` and `redis-insight` to be able to explore the raw data. If you don't need them, you can safely remove those entries from the `docker-compose-deps.yml` file.

```bash
cd [PATH_TO_SPECKLE-SERVER_REPOSITORY]
docker compose -f docker-compose-deps.yml up -d
```

This will run the following containers, and will automatically launch them at system startup:

- *PostgreSQL v13*, listening only on `127.0.0.1:5432` with default credentials `speckle`:`speckle` and a database named `speckle`.
- *Redis v6*, listening only on `127.0.0.1:6379`
- *PGAdmin4*, listening only on `127.0.0.1:16543` with default credentials `admin@localhost` : `admin`
- *Redis Insight*, listening only on `127.0.0.1:8001`
- *MinIO*, listening on `127.0.0.1:9000` with the API endpoint and on `127.0.0.1:9001` with the Web Management Interface (default credentials used: `minioadmin`/`minioadmin`)

All of the above containers listen on the local loopback interface (`127.0.0.1`) and are NOT accessible from the local network (for security, since they use default credentials)

To use PGAdmin, after login you can configure a server connection to the host `postgres` (user `speckle`, password `speckle`, database `speckle`)

To use Redis Insight, you can configure it to connect to the hostname `redis` (port `6379`)

Docker Compose creates named docker volumes for storing data for each of the containers, so data is persisted.
You can view existing docker volumes with `docker volume ls` and delete a volume and existing data with `docker volume rm [volume_name]` 

### Step 2: Build and run your code

The git repository contains [a docker compose file](https://github.com/specklesystems/speckle-server/blob/main/docker-compose-speckle.yml) for building and running the Speckle server frontend and backend in docker containers.

To use it, first edit the variables in the `docker-compose-speckle.yml` file to reflect your environment. Then, you can start them with:

```bash
cd [PATH_TO_SPECKLE-SERVER_REPOSITORY]
docker compose -f docker-compose-speckle.yml up --build -d
```

(You can safely ignore the warnings about the *orphan containers*)

This will run the following containers, and will automatically launch them at system startup:

- *speckle-frontend*, an nginx container that serves the Vue app build as static files (exposed on port 80 in the VM network) and proxies server requests to the `speckle-server` container
- *speckle-server*, the `server` component that doesn't expose any port outside the internal docker network.
- *preview-service*, the component that generates stream previews. Doesn't expose any port outside the internal docker network.
- *webhook-service*, the component that calls webhooks. Doesn't expose any port.
- *fileimport-service*, the component that imports uploaded files. Doesn't expose any port.

## Run in development mode

See the dedicated getting started with speckle server development [page](/dev/server-local-dev).
