// eighteenthmodule.js
// Module 18: The Cloud Architect - Kubernetes & Terraform (100 Lessons)

const module18_cloud = {
  name: "18. Cloud Architect (105 Lessons)",
  lessons: [
    // --- PHASE 1: TERRAFORM FOUNDATIONS (1-25) ---
    {
      title: "Terraform Version",
      why: "Terraform operates using provider plugins. Always verify the binary version to ensure your execution engine matches the syntax required by the `.tf` blueprints.",
      text: "Type <code>terraform version</code>",
      objective: "Type terraform version",
      xp: 10,
      check: (c, a) => c === "terraform" && a[0] === "version",
    },
    {
      title: "Create Main Config",
      why: "Terraform uses declarative HCL (HashiCorp Configuration Language). We create `main.tf`, the primary blueprint where we describe exactly what the cloud architecture *should* look like.",
      text: "Type <code>touch main.tf</code>",
      objective: "Type touch main.tf",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "main.tf",
    },
    {
      title: "Define Provider",
      why: "Terraform is cloud-agnostic. We must explicitly define a `provider` block (like AWS, GCP, or Kubernetes) so the engine knows which API protocols to download and translate our HCL code into.",
      text: 'Type <code>echo \'provider "aws" { region = "us-east-1" }\' > main.tf</code>',
      objective: "Add AWS provider to main.tf",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("aws") && raw.includes("main.tf"),
    },
    {
      title: "Terraform Init",
      why: "The <b>init</b> command parses your `.tf` files, connects to the HashiCorp registry, and downloads the specific API binaries (providers) into a hidden `.terraform` directory.",
      text: "Type <code>terraform init</code>",
      objective: "Type terraform init",
      xp: 25,
      check: (c, a) => c === "terraform" && a[0] === "init",
    },
    {
      title: "Define EC2 Resource",
      why: "A `resource` block mathematically defines a physical cloud component. Here, we declare the exact AMI image and hardware size for a virtual server.",
      text: 'Type <code>echo \'resource "aws_instance" "web" { ami = "ami-123456"; instance_type = "t2.micro" }\' >> main.tf</code>',
      objective: "Append EC2 resource",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("aws_instance") &&
        raw.includes(">>"),
    },
    {
      title: "Format Code",
      why: "The <b>fmt</b> command acts as a strict style linter. It parses your `.tf` files and rewrites the whitespaces and indents to perfectly match the HashiCorp standard.",
      text: "Type <code>terraform fmt</code>",
      objective: "Type terraform fmt",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "fmt",
    },
    {
      title: "Validate Syntax",
      why: "The <b>validate</b> command locally compiles the HCL syntax tree without connecting to the cloud provider, catching missing brackets or invalid data types instantly.",
      text: "Type <code>terraform validate</code>",
      objective: "Type terraform validate",
      xp: 25,
      check: (c, a) => c === "terraform" && a[0] === "validate",
    },
    {
      title: "Terraform Plan",
      why: "The core of Terraform. <b>plan</b> builds a Directed Acyclic Graph (DAG) comparing your `main.tf` to the current state of the cloud. It outputs a strict calculation of exactly what it *will* create, modify, or destroy.",
      text: "Type <code>terraform plan</code>",
      objective: "Type terraform plan",
      xp: 40,
      check: (c, a) => c === "terraform" && a[0] === "plan",
    },
    {
      title: "Terraform Apply",
      why: "The <b>apply</b> command executes the DAG. It initiates secure API calls to AWS, physically spinning up the hardware. The `-auto-approve` flag bypasses the final manual confirmation prompt.",
      text: "Type <code>terraform apply -auto-approve</code>",
      objective: "Type terraform apply",
      xp: 50,
      check: (c, a) =>
        c === "terraform" && a[0] === "apply" && a.includes("-auto-approve"),
    },
    {
      title: "Inspect State File",
      why: "Once applied, Terraform generates a `terraform.tfstate` JSON file. This is the 'Source of Truth'. It rigidly maps the logical resource names in your code to the actual physical Resource IDs in the cloud.",
      text: "Type <code>cat terraform.tfstate</code>",
      objective: "View state file",
      xp: 25,
      check: (c, a) => c === "cat" && a[0] === "terraform.tfstate",
    },
    {
      title: "State List",
      why: "Instead of reading raw JSON, <b>state list</b> parses the local memory state and returns a clean index of every active physical cloud component Terraform is currently tracking.",
      text: "Type <code>terraform state list</code>",
      objective: "Type terraform state list",
      xp: 30,
      check: (c, a) => c === "terraform" && a[0] === "state" && a[1] === "list",
    },
    {
      title: "State Show",
      why: "The <b>state show</b> command extracts the exact live metadata (like public IPs or DNS allocations) for a specific resource directly from the memory state buffer.",
      text: "Type <code>terraform state show aws_instance.web</code>",
      objective: "Show specific state",
      xp: 35,
      check: (c, a) =>
        c === "terraform" &&
        a[0] === "state" &&
        a[1] === "show" &&
        a.includes("aws_instance.web"),
    },
    {
      title: "Output Variables",
      why: "If you deploy 100 servers, finding their IPs is impossible. We use `output` blocks to instruct Terraform to extract and print specific data (like the public IP) to the terminal upon completion.",
      text: "Type <code>echo 'output \"ip\" { value = aws_instance.web.public_ip }' >> main.tf</code>",
      objective: "Create output block",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("output") &&
        raw.includes("public_ip"),
    },
    {
      title: "Apply Output",
      why: "Re-evaluate the DAG. Since the physical server already exists, `apply` simply updates the state file and prints the requested IP address.",
      text: "Type <code>terraform apply -auto-approve</code>",
      objective: "Re-apply config",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "apply",
    },
    {
      title: "View Outputs",
      why: "The <b>output</b> command directly parses the `tfstate` file, allowing you to extract previously calculated variables without needing to communicate with the cloud provider API.",
      text: "Type <code>terraform output</code>",
      objective: "Type terraform output",
      xp: 25,
      check: (c, a) => c === "terraform" && a[0] === "output",
    },
    {
      title: "Define Variables",
      why: "Hardcoding 't2.micro' is bad practice. We use `variable` blocks to inject dynamic data during the plan phase, making our modules reusable.",
      text: 'Type <code>echo \'variable "size" { default = "t2.micro" }\' > vars.tf</code>',
      objective: "Create vars.tf",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("variable") &&
        raw.includes("vars.tf"),
    },
    {
      title: "Terraform Destroy",
      why: "Cloud resources cost money. The <b>destroy</b> command reverses the DAG. It calculates dependencies in reverse order, systematically terminating the physical servers and networks via API calls.",
      text: "Type <code>terraform destroy -auto-approve</code>",
      objective: "Type terraform destroy",
      xp: 50,
      check: (c, a) => c === "terraform" && a[0] === "destroy",
    },
    {
      title: "Verify Destruction",
      why: "Once destroyed, the `state list` will return completely empty, mathematically proving that no orphaned resources remain in the cloud.",
      text: "Type <code>terraform state list</code>",
      objective: "Check state list",
      xp: 15,
      check: (c, a) => c === "terraform" && a[0] === "state" && a[1] === "list",
    },
    {
      title: "Clean Environment",
      why: "Purge your infrastructure blueprints and the hidden `.terraform` binary plugin directory.",
      text: "Type <code>rm -rf main.tf vars.tf terraform.tfstate* .terraform</code>",
      objective: "Delete TF files",
      xp: 20,
      check: (c, a) =>
        c === "rm" && a.includes("-rf") && a.some((x) => x.includes("main.tf")),
    },
    {
      title: "Taint Resource",
      why: "Sometimes a server breaks, but Terraform's state file thinks it's healthy. The <b>taint</b> command forces Terraform to mark the resource as 'degraded', guaranteeing it will be physically destroyed and rebuilt on the next apply.",
      text: "Type <code>terraform taint aws_instance.web</code>",
      objective: "Simulate taint command",
      xp: 35,
      check: (c, a) => c === "terraform" && a[0] === "taint",
    },
    {
      title: "Untaint Resource",
      why: "Remove the degraded mark from the state file, indicating the resource was manually fixed and does not require reconstruction.",
      text: "Type <code>terraform untaint aws_instance.web</code>",
      objective: "Simulate untaint command",
      xp: 30,
      check: (c, a) => c === "terraform" && a[0] === "untaint",
    },
    {
      title: "Import Existing",
      why: "If someone manually built a server in the AWS console, it exists physically but not in your state file. <b>import</b> surgically links the remote hardware ID to your local `.tf` code.",
      text: "Type <code>terraform import aws_instance.web i-1234567890</code>",
      objective: "Simulate terraform import",
      xp: 45,
      check: (c, a) => c === "terraform" && a[0] === "import",
    },
    {
      title: "State Pull",
      why: "In enterprise environments, the state file is stored remotely (like an S3 bucket). <b>state pull</b> downloads a local copy of this highly sensitive JSON file for deep inspection.",
      text: "Type <code>terraform state pull > local.tfstate</code>",
      objective: "Simulate state pull",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("terraform state pull") && raw.includes(">"),
    },
    {
      title: "Workspace List",
      why: "Workspaces allow you to manage multiple isolated state files (like 'dev', 'staging', 'prod') using the exact same underlying HCL codebase.",
      text: "Type <code>terraform workspace list</code>",
      objective: "List terraform workspaces",
      xp: 20,
      check: (c, a) =>
        c === "terraform" && a[0] === "workspace" && a[1] === "list",
    },
    {
      title: "Workspace Create",
      why: "Initialize a new, blank environment state, completely isolated from your production infrastructure.",
      text: "Type <code>terraform workspace new dev</code>",
      objective: "Create dev workspace",
      xp: 30,
      check: (c, a) =>
        c === "terraform" && a[0] === "workspace" && a[1] === "new",
    },

    // --- PHASE 2: KUBERNETES CLUSTER TRIAGE (26-40) ---
    {
      title: "Cluster Info",
      why: "Kubernetes is an orchestration engine. The <b>kubectl cluster-info</b> command executes an authenticated REST API call to the `kube-apiserver` to map the location of the core control plane.",
      text: "Type <code>kubectl cluster-info</code>",
      objective: "Type kubectl cluster-info",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "cluster-info",
    },
    {
      title: "Get Nodes",
      why: "Nodes are physical (or virtual) machines providing CPU/RAM to the cluster. <b>get nodes</b> queries the `etcd` datastore to report which servers are successfully heartbeating to the control plane.",
      text: "Type <code>kubectl get nodes</code>",
      objective: "Type kubectl get nodes",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "nodes",
    },
    {
      title: "Node Wide Format",
      why: "The <b>-o wide</b> flag forces the API to return the extended internal topology, exposing the private IP addresses and exact container runtime versions (e.g., containerd or Docker) running on the nodes.",
      text: "Type <code>kubectl get nodes -o wide</code>",
      objective: "Type kubectl get nodes -o wide",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "nodes" &&
        a.includes("-o"),
    },
    {
      title: "Describe Node",
      why: "The <b>describe</b> command dives deep into the API. It returns the exact hardware allocations (CPU capacity, Memory pressure) and the timeline of systemic events that have occurred on the node.",
      text: "Type <code>kubectl describe node minikube</code>",
      objective: "Describe the minikube node",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" && a[0] === "describe" && a[1] === "node",
    },
    {
      title: "Top Nodes",
      why: "The <b>top</b> command interfaces with the internal `metrics-server`, providing real-time telemetry on the live CPU and Memory utilization percentages across your hardware fleet.",
      text: "Type <code>kubectl top nodes</code>",
      objective: "Type kubectl top nodes",
      xp: 30,
      check: (c, a) => c === "kubectl" && a[0] === "top" && a[1] === "nodes",
    },
    {
      title: "Get Namespaces",
      why: "Namespaces are virtual clusters within a cluster. They mathematically isolate resources, allowing Development and Production teams to deploy apps on the same hardware without colliding.",
      text: "Type <code>kubectl get namespaces</code>",
      objective: "Type kubectl get namespaces",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "namespaces",
    },
    {
      title: "Get All in Namespace",
      why: "By default, kubectl only queries the 'default' namespace. The <b>-n kube-system</b> flag instructs the API to query the deeply isolated system namespace where the DNS and network routing pods live.",
      text: "Type <code>kubectl get all -n kube-system</code>",
      objective: "Get all in kube-system",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "all" && a.includes("-n"),
    },
    {
      title: "Create Namespace",
      why: "Establish a new, mathematically isolated virtual boundary for your upcoming project deployment.",
      text: "Type <code>kubectl create namespace staging</code>",
      objective: "Create staging namespace",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" && a[0] === "create" && a[1] === "namespace",
    },
    {
      title: "Set Context",
      why: "Typing `-n staging` constantly is tedious. We edit our local `~/.kube/config` file context to permanently alter the default namespace destination for all future API calls.",
      text: "Type <code>kubectl config set-context --current --namespace=staging</code>",
      objective: "Set default namespace context",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" && a[0] === "config" && a.includes("set-context"),
    },
    {
      title: "Verify Context",
      why: "Check your local kubectl configuration architecture to guarantee the context switch was successfully applied.",
      text: "Type <code>kubectl config view --minify</code>",
      objective: "View kubectl config",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" && a[0] === "config" && a.includes("view"),
    },
    {
      title: "Explain Command",
      why: "Kubernetes uses a complex OpenAPI schema. The <b>explain</b> command reads the local API definitions, outputting the exact internal documentation for how a specific resource (like a Pod) operates.",
      text: "Type <code>kubectl explain pods</code>",
      objective: "Explain pods",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "explain" && a[1] === "pods",
    },
    {
      title: "API Resources",
      why: "Kubernetes relies on dozens of APIs. <b>api-resources</b> dumps the entire schema index, showing you all the valid components (Ingress, ConfigMap, Secret) that your server is capable of processing.",
      text: "Type <code>kubectl api-resources</code>",
      objective: "List API resources",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "api-resources",
    },
    {
      title: "API Versions",
      why: "Some features are in 'v1' (stable) while others are 'v1beta1' (experimental). This command confirms which architectural versions your control plane currently supports.",
      text: "Type <code>kubectl api-versions</code>",
      objective: "List API versions",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "api-versions",
    },
    {
      title: "Get Events",
      why: "The cluster continuously logs internal logic decisions (like scheduling or scaling failures). <b>get events</b> dumps this systemic timeline from the `etcd` database.",
      text: "Type <code>kubectl get events --sort-by='.metadata.creationTimestamp'</code>",
      objective: "Get sorted cluster events",
      xp: 40,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "events",
    },
    {
      title: "Reset Context",
      why: "Point your local configuration tool back to the primary un-isolated 'default' environment.",
      text: "Type <code>kubectl config set-context --current --namespace=default</code>",
      objective: "Reset to default namespace",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" && a[0] === "config" && a.includes("set-context"),
    },

    // --- PHASE 3: PODS & CONTAINERS (41-60) ---
    {
      title: "Run Pod",
      why: "A <b>Pod</b> is the smallest unit in Kubernetes; it is a wrapper that houses one or more Docker containers. The <b>run</b> command submits a request to the `kube-apiserver` to schedule an Nginx container onto a node.",
      text: "Type <code>kubectl run web --image=nginx</code>",
      objective: "Run a web pod",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "run" &&
        a[1] === "web" &&
        a.some((x) => x.includes("nginx")),
    },
    {
      title: "Get Pods",
      why: "Query the API to check the status phase of your newly spawned Pod. You are looking for 'Running', indicating the `kubelet` daemon on the hardware successfully pulled the image and started the container.",
      text: "Type <code>kubectl get pods</code>",
      objective: "Type kubectl get pods",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pods",
    },
    {
      title: "Describe Pod",
      why: "If a Pod is stuck in 'CrashLoopBackOff', use <b>describe</b>. It dumps the entire lifecycle metadata, highlighting exact scheduling errors, insufficient RAM allocations, or image pull failures.",
      text: "Type <code>kubectl describe pod web</code>",
      objective: "Describe the web pod",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "describe" && a[1] === "pod",
    },
    {
      title: "Pod Logs",
      why: "Kubernetes intercepts the Standard Output stream from the underlying Docker container. The <b>logs</b> command tunnels this stream through the API directly to your terminal screen.",
      text: "Type <code>kubectl logs web</code>",
      objective: "Get logs from web pod",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "logs" && a[1] === "web",
    },
    {
      title: "Follow Pod Logs",
      why: "The <b>-f</b> flag locks the API tunnel open, allowing you to watch the live HTTP traffic hitting the Nginx container in real-time.",
      text: "Type <code>kubectl logs -f web</code>",
      objective: "Follow logs from web pod",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "logs" && a.includes("-f"),
    },
    {
      title: "Exec into Pod",
      why: "Like Docker, you can bypass the container's primary process. <b>exec -it</b> sends a request to the `kube-apiserver`, routing an interactive bash terminal directly into the running Pod's isolated namespace.",
      text: "Type <code>kubectl exec -it web -- /bin/bash</code>",
      objective: "Exec into the web pod",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "exec" &&
        a.includes("-it") &&
        a.includes("web"),
    },
    {
      title: "Exit Exec",
      why: "Terminate your secondary bash process to detach from the Pod.",
      text: "Type <code>exit</code>",
      objective: "Type exit",
      xp: 10,
      check: (c) => c === "exit",
    },
    {
      title: "Top Pods",
      why: "Poll the metrics-server to see the exact millicores (CPU) and Mebibytes (RAM) your specific Pod is consuming.",
      text: "Type <code>kubectl top pods</code>",
      objective: "Type kubectl top pods",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "top" && a[1] === "pods",
    },
    {
      title: "Port Forward",
      why: "By default, Pods are sealed off from the internet. <b>port-forward</b> mathematically wires your local laptop port directly to the Pod's internal container port through an encrypted API tunnel.",
      text: "Type <code>kubectl port-forward pod/web 8080:80 &</code>",
      objective: "Port forward to web pod",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "port-forward" &&
        a.some((x) => x.includes("8080:80")),
    },
    {
      title: "Label a Pod",
      why: "Kubernetes is built entirely on labels. Setting a key-value pair (`env=prod`) tags the Pod so that Network Policies and Load Balancers know mathematically how to route traffic to it.",
      text: "Type <code>kubectl label pods web env=prod</code>",
      objective: "Label the web pod",
      xp: 30,
      check: (c, a) => c === "kubectl" && a[0] === "label" && a[1] === "pods",
    },
    {
      title: "Show Labels",
      why: "Query the API, forcing the output table to expose all the key-value tagging infrastructure associated with your Pods.",
      text: "Type <code>kubectl get pods --show-labels</code>",
      objective: "Get pods with labels",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a.includes("--show-labels"),
    },
    {
      title: "Filter by Label",
      why: "The <b>-l</b> (Selector) flag parses the `etcd` database, returning ONLY the components matching the exact label criteria. This is how massive clusters are managed efficiently.",
      text: "Type <code>kubectl get pods -l env=prod</code>",
      objective: "Filter pods by label",
      xp: 30,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a.includes("-l"),
    },
    {
      title: "Extract Pod YAML",
      why: "The <b>-o yaml</b> flag tells the API to dump the exact internal structural blueprint of the Pod. This is how Cloud Architects reverse-engineer and export active configurations.",
      text: "Type <code>kubectl get pod web -o yaml > pod.yaml</code>",
      objective: "Export pod to yaml",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("kubectl") &&
        raw.includes("-o") &&
        raw.includes("yaml") &&
        raw.includes(">"),
    },
    {
      title: "Delete Pod",
      why: "Because we ran the Pod as a standalone unit (not part of a Deployment), deleting it permanently unlinks its container layers and destroys the virtual environment completely.",
      text: "Type <code>kubectl delete pod web</code>",
      objective: "Delete the web pod",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "delete" && a[1] === "pod",
    },
    {
      title: "Verify Deletion",
      why: "Confirm the namespace is totally empty.",
      text: "Type <code>kubectl get pods</code>",
      objective: "Check pod list",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pods",
    },

    // --- PHASE 4: DEPLOYMENTS & RECONCILIATION LOOPS (61-80) ---
    {
      title: "Create Deployment",
      why: "A <b>Deployment</b> is an autonomous controller. It continuously monitors the cluster via a 'Reconciliation Loop'. If a pod dies, the Deployment controller instantly detects it and spawns a replacement.",
      text: "Type <code>kubectl create deployment my-app --image=nginx</code>",
      objective: "Create a deployment",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "create" &&
        a[1] === "deployment" &&
        a[2] === "my-app",
    },
    {
      title: "Get Deployments",
      why: "Check the status of the master controller to ensure it successfully scheduled its requested Pod replications.",
      text: "Type <code>kubectl get deployments</code>",
      objective: "Get all deployments",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "deployments",
    },
    {
      title: "Scale Deployment",
      why: "The <b>scale</b> command modifies the desired state. Instructing the controller to demand 3 replicas forces the underlying ReplicaSet to immediately spin up two new identical Pods.",
      text: "Type <code>kubectl scale deployment my-app --replicas=3</code>",
      objective: "Scale the deployment to 3",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" && a[0] === "scale" && a.includes("--replicas=3"),
    },
    {
      title: "Get ReplicaSets",
      why: "A ReplicaSet is the hidden mechanism beneath a Deployment that mathematically maintains the exact number of desired running instances.",
      text: "Type <code>kubectl get replicasets</code>",
      objective: "Type kubectl get replicasets",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "replicasets",
    },
    {
      title: "Verify Pod Scaling",
      why: "You should now see three distinct Nginx pods running simultaneously across the architecture.",
      text: "Type <code>kubectl get pods</code>",
      objective: "Check the 3 pods",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pods",
    },
    {
      title: "Simulate Failure",
      why: "Kubernetes is self-healing. If we violently delete one of the running pods, the Deployment's reconciliation loop will detect the state mismatch (2/3) and automatically create a new pod.",
      text: 'Type <code>echo "Delete a pod, K8s auto-heals"</code>',
      objective: "Simulate auto-healing concept",
      xp: 15,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("auto-heals"),
    },
    {
      title: "Update Image",
      why: "To update the app code, we instruct the Deployment to change the underlying container image. This triggers a 'Rolling Update', ensuring zero downtime by carefully swapping old pods for new ones.",
      text: "Type <code>kubectl set image deployment/my-app nginx=nginx:1.19</code>",
      objective: "Update deployment image",
      xp: 40,
      check: (c, a) => c === "kubectl" && a[0] === "set" && a.includes("image"),
    },
    {
      title: "Rollout Status",
      why: "The <b>rollout status</b> command queries the controller's progression queue, verifying that the new pods are fully online and the old pods have been successfully retired.",
      text: "Type <code>kubectl rollout status deployment/my-app</code>",
      objective: "Check rollout status",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" && a[0] === "rollout" && a[1] === "status",
    },
    {
      title: "Rollout History",
      why: "Every time you update a Deployment, it saves its previous ReplicaSet blueprint. The <b>history</b> command lists the cryptographic revisions stored in the database.",
      text: "Type <code>kubectl rollout history deployment/my-app</code>",
      objective: "Check rollout history",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" && a[0] === "rollout" && a[1] === "history",
    },
    {
      title: "Rollout Undo",
      why: "If version 1.19 contains a fatal bug, <b>undo</b> instructs the Deployment controller to instantly revert to the previous known-good ReplicaSet, performing an automatic hot-rollback.",
      text: "Type <code>kubectl rollout undo deployment/my-app</code>",
      objective: "Undo the rollout",
      xp: 35,
      check: (c, a) => c === "kubectl" && a[0] === "rollout" && a[1] === "undo",
    },
    {
      title: "Create ConfigMap",
      why: "Hardcoding variables inside containers breaks portability. A <b>ConfigMap</b> stores plain-text variables (like UI colors) centrally in `etcd`, injecting them into pods dynamically at runtime.",
      text: "Type <code>kubectl create configmap web-config --from-literal=theme=dark</code>",
      objective: "Create a ConfigMap",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" && a[0] === "create" && a[1] === "configmap",
    },
    {
      title: "Create Secret",
      why: "<b>Secrets</b> are base64-encoded objects designed to hold sensitive data (like database passwords or API keys). Unlike ConfigMaps, they are designed to be heavily encrypted at rest in the cluster.",
      text: "Type <code>kubectl create secret generic db-pass --from-literal=password=secure123</code>",
      objective: "Create a Secret",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" && a[0] === "create" && a[1] === "secret",
    },
    {
      title: "Get Secrets",
      why: "Verify the core control plane securely generated the cryptographic object.",
      text: "Type <code>kubectl get secrets</code>",
      objective: "List secrets",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "secrets",
    },
    {
      title: "Autoscale Deployment",
      why: "The Horizontal Pod Autoscaler (HPA) monitors the metrics-server. If average CPU utilization exceeds 50%, it dynamically scales the cluster up to 10 instances to handle the traffic load.",
      text: "Type <code>kubectl autoscale deployment my-app --min=3 --max=10 --cpu-percent=50</code>",
      objective: "Set up autoscaling",
      xp: 50,
      check: (c, a) => c === "kubectl" && a[0] === "autoscale",
    },
    {
      title: "Get HPA",
      why: "Query the status of the Autoscaler logic loop to ensure it is actively receiving CPU telemetry data from the nodes.",
      text: "Type <code>kubectl get hpa</code>",
      objective: "Get Horizontal Pod Autoscaler status",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "hpa",
    },

    // --- PHASE 5: NETWORKING, SERVICES & CLEANUP (81-100) ---
    {
      title: "Expose Deployment",
      why: "Pods constantly die and change IP addresses. A <b>Service</b> creates a permanent, static internal IP address and DNS name. It acts as an internal Load Balancer, routing traffic mathematically to healthy pods.",
      text: "Type <code>kubectl expose deployment my-app --port=80 --target-port=80</code>",
      objective: "Expose deployment via Service",
      xp: 35,
      check: (c, a) => c === "kubectl" && a[0] === "expose",
    },
    {
      title: "Get Services",
      why: "View the network map. Your newly created Service has an internal `ClusterIP`. Any pod in the entire cluster can now talk to your Nginx app perfectly by just addressing the word 'my-app'.",
      text: "Type <code>kubectl get svc</code>",
      objective: "List services",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "svc",
    },
    {
      title: "Get Endpoints",
      why: "The Service creates an <b>Endpoint</b> object under the hood. It tracks the exact physical IP addresses of all healthy pods currently connected to the load balancing pool.",
      text: "Type <code>kubectl get endpoints my-app</code>",
      objective: "Check endpoints",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "endpoints",
    },
    {
      title: "Service Port Forward",
      why: "Instead of forwarding traffic to a single, fragile Pod, you forward your local port to the robust, permanent Service block, allowing the Load Balancer to route your traffic correctly.",
      text: "Type <code>kubectl port-forward svc/my-app 8080:80 &</code>",
      objective: "Port forward to service",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "port-forward" &&
        a.some((x) => x.includes("svc/")),
    },
    {
      title: "Describe Service",
      why: "Inspect the Load Balancer's deep configurations, verifying the exact label selectors (`app=my-app`) it uses to group the pods.",
      text: "Type <code>kubectl describe svc my-app</code>",
      objective: "Describe the service",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "describe" && a[1] === "svc",
    },
    {
      title: "Apply YAML Manifest",
      why: "Imperative commands (typing create, expose) are error-prone. Kubernetes relies heavily on Declarative architecture. <b>apply -f</b> submits a complete YAML blueprint to the API, establishing the total state instantly.",
      text: "Type <code>kubectl apply -f manifest.yaml</code>",
      objective: "Apply a yaml manifest",
      xp: 40,
      check: (c, a) => c === "kubectl" && a[0] === "apply" && a.includes("-f"),
    },
    {
      title: "Delete from YAML",
      why: "The architecture symmetric tear-down. By passing the file back to `delete`, the API parses the blueprint and uninstalls all referenced components seamlessly.",
      text: "Type <code>kubectl delete -f manifest.yaml</code>",
      objective: "Delete from yaml manifest",
      xp: 30,
      check: (c, a) => c === "kubectl" && a[0] === "delete" && a.includes("-f"),
    },
    {
      title: "Diff YAML",
      why: "The `diff` plugin mathematically calculates what physical changes would occur if you applied an updated YAML file against the current running architecture.",
      text: "Type <code>kubectl diff -f manifest.yaml</code>",
      objective: "Diff a yaml manifest",
      xp: 35,
      check: (c, a) => c === "kubectl" && a[0] === "diff" && a.includes("-f"),
    },
    {
      title: "Kustomize Build",
      why: "<b>Kustomize</b> is a native overlay engine. It takes base YAML templates and merges environment-specific overlays (like adding 'prod' labels) without altering the original raw files.",
      text: "Type <code>kubectl kustomize ./</code>",
      objective: "Run kustomize",
      xp: 35,
      check: (c, a) => c === "kubectl" && a[0] === "kustomize" && a[1] === "./",
    },
    {
      title: "Cluster Proxy",
      why: "<b>proxy</b> executes a local interceptor server, opening an unauthenticated REST API tunnel directly to the `kube-apiserver`, allowing custom dashboard UIs to read control plane data.",
      text: "Type <code>kubectl proxy --port=8080 &</code>",
      objective: "Type kubectl proxy",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "proxy" &&
        a.some((x) => x.includes("port=8080")),
    },
    {
      title: "Nuke All Deployments",
      why: "The engagement is finished. Command the control plane to permanently terminate every single deployment and replica scaling loop globally.",
      text: "Type <code>kubectl delete deployments --all</code>",
      objective: "Type kubectl delete deployments --all",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a.some((x) => x.includes("deployment")) &&
        a.includes("--all"),
    },
    {
      title: "Nuke All Services",
      why: "Command the API to strip the `kube-proxy` iptables routing, permanently dismantling the internal load balancing grid and terminating all access points.",
      text: "Type <code>kubectl delete svc --all</code>",
      objective: "Type kubectl delete svc --all",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a[1] === "svc" &&
        a.includes("--all"),
    },
    {
      title: "Cloud Architect",
      why: "You understand Immutable Infrastructure, State Files, Load Balancing Services, Reconciliation Loops, and Declarative Graphing. You are a Senior DevOps Engineer.",
      text: 'Type <code>echo "Infrastructure Conquered"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Infrastructure"),
    },
  ],
};
