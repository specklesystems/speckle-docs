# Deploying a Server - Kubernetes

To ease new deployments, we are maintaining [a Kubernetes Helm chart](https://specklesystems.github.io/helm/).

::: tip IMPORTANT
This setup is not recommended for use as-is in production for a few reasons, namely:

- application level updates: we tend to move quite fast, and if things get busy, blink twice and you’re on an outdated server. This has security implications too.
- database backups: again this is up to you mostly on what’s your risk appetite when it comes to dealing with live data. We’re a bit more on the paranoid side, so we’ve set up replication, failover nodes and PITR.
- automatic scalability: for example, the preview service can be quite a monster; that setup can eat up all a vm’s resources, and starve other processes causing general system wide instability. Cloud providers can provide horizontal VM auto-scaling and Kubernetes can provide horizontal pod auto-scaling but these are not discussed in this guide.
- monitoring: this setup does not describe integrations for telemetry, metrics, tracing, or logging. Nor does it describe alerting or response actions.
- firewall and network hardening: running in production requires additional security hardening measures, particularly protecting the network from intrusion or data exfiltration.

If you need help deploying a production server, [we can help](https://speckle.systems/getstarted/)!
:::

## Prerequisites

- [Required] A [DigitalOcean](https://www.digitalocean.com/) account
- [Required][helm](https://helm.sh/docs/intro/install/) installed
- [Required][kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed
- [Optional] A domain name (to use https encryption)
- [Optional] An email service provider account of your choice (to allow the server to send emails)
- [Optional] An authentication service of your choice (to allow the server to authenticate users)

## Step 1: Create the kubernetes cluster

- Go to your DigitalOcean dashboard and create a new Kubernetes cluster:
  ![image](./img/k8s/01_create_cluster.png)

* When prompted to select the node size, we recommend at least one node of size `XX YY`:
  ![image](./img/k8s/02_select_node_size.png)

- Configure other options for your droplet and click the `Create Cluster` button. After the cluster is created and initialized, you should see it in your list of droplets:
  ![image](./img/k8s/03_other_cluster_config.png)

- To log into the cluster, copy the kubernetes config from the DigitalOcean cluster dashboard.
  ![image](./img/k8s/04_get_kubeconfig.png)

- Verify that you can connect to the cluster using kubectl by running the following command.  Replace `YOUR_CLUSTER_CONTEXT_NAME` with the name of your cluster.

 ```shell
 kubectl --context YOUR_CLUSTER_CONTEXT_NAME --all-namespaces get pods
 ```
 
 - You should see something like the following:
  ![image](./img/k8s/05_kubectl_get_pods.png)

## Step 2 (optional): Deploy dependent external services

If you already have Redis, Postgres, and Blob storage available, you can skip this step.

- Redis #TODO
  ![image](./img/k8s/06_redis_connection.png)

- Postgres #TODO
  ![image](./img/k8s/07_postgres_connection.png)

- Blob storage #TODO
  ![image](./img/k8s/08_blob_storage_connection.png)

## Step 3: Deploy dependencies to Kubernetes

- Priority Classes #TODO
  ![image](./img/k8s/09_priority_classes.png)

- Redis Secrets #TODO
  ![image](./img/k8s/10_redis_secret.png)

- Postgres Secrets #TODO
  ![image](./img/k8s/11_postgres_secret.png)

- Blob storage Secrets #TODO
  ![image](./img/k8s/12_blob_storage_secret.png)

- Authentication service Secrets (optional) #TODO
  ![image](./img/k8s/12_auth_service_secret.png)

- CertManager (optional) #TODO
  ![image](./img/k8s/13_certmanager.png)

## Step 3: Configure your deployment

- [Download the `values.yaml` file from the Helm chart repository](https://raw.githubusercontent.com/specklesystems/helm/main/charts/speckle-server/values.yaml) and save it to a directory on your local machine, we will be editing and using this file in the following steps.

- Fill in the requested fields and save the file:
  - `Domain name` (optional, but providing a domain name will use HTTPS to encrypt your data when you send/receive from your Speckle Server)
  - `Enable emails` + email provider details (optional, but enabling emails will enable extra features like sending invites)
  - If you entered a domain name, you will also configure the LetsEncrypt tool that generates HTTPS certificates and keeps them up to date (you should enter your email to receive important notifications about the certificates)

## Step 4: Deploy Speckle to Kubernetes

- Run the following command to add the Speckle Helm repository

```shell
helm repo add speckle https://specklesystems.github.io/helm
```

- You should see something like this:
  ![image](./img/k8s/05_configure.png)

- Run the following command to deploy the Helm chart to your Kubernetes cluster configured with the values you configured in the prior step.  Replace `YOUR_CLUSTER_CONTEXT_NAME` with the name of your cluster.

```shell
helm install my-speckle-server speckle/speckle-server --values values.yaml --kube-context YOUR_CLUSTER_CONTEXT_NAME
```

- After configuration is done, you should see this success message:
  ![image](./img/k8s/06_configuration_done.png)

- Verify the helm chart was successful by checking its status on the cluster. Replace `YOUR_CLUSTER_CONTEXT_NAME` with the name of your cluster.:

```shell
helm list --all-namespaces --kube-context YOUR_CLUSTER_CONTEXT_NAME
```

- You should see something similar to the following:
  ![image](./img/k8s/06_configuration_done.png)

- For more information about the release, including it's current Status, run the following command. Replace `YOUR_CLUSTER_CONTEXT_NAME` with the name of your cluster.:

```shell
helm get all my-speckle-server --all-namespaces --kube-context YOUR_CLUSTER_CONTEXT_NAME
```

- You should see something similar to the following:
  ![image](./img/k8s/06_configuration_done.png)

## Step 5: Create an account on your Server

- (optional) You may need to wait a short period of time while the loadbalancer and certificate for the ingress is generated by DigitalOcean.  While you are waiting you can access the cluster via the kubernetes client, using the following command. Replace `YOUR_CLUSTER_CONTEXT_NAME` with the name of your cluster.:

```shell
kubectl port-forward service/speckle-server --namespace speckle-test --context YOUR_CLUSTER_CONTEXT_NAME 3000:3000
```

You should now be able to access the cluster at `http://localhost:3000`. To stop the port-forward, press `ctrl + c` in your shell.

After you configure the server, you should open the url in your browser and `Register` a first user. The first user that registers will be the administrator account for that server.
![image](./img/k8s/07_register.png)

## That's it

You have deployed a Speckle Server on Kubernetes that you have full control over.

To reconfigure the server, you can run this command:

```shell
helm install my-speckle-server speckle/speckle-server --values values.yaml
```

If you encounter any issue, have any question or just want to say hi, reach out in [our forum](https://speckle.community/).
