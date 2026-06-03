// eighteenthmodule.js
// Module 18: The Cloud Architect - Kubernetes & Terraform (100 Lessons)

const module18_cloud = {
  name: "18. Cloud Architect (100 Lessons)",
  lessons: [
    // --- PHASE 1: TERRAFORM FOUNDATIONS (1-25) ---
    {
      title: "Terraform Version",
      why: "Check your infrastructure-as-code engine.",
      text: "Type <code>terraform version</code>",
      objective: "Type terraform version",
      xp: 10,
      check: (c, a) => c === "terraform" && a[0] === "version",
    },
    {
      title: "Create Main Config",
      why: "Create the main Terraform blueprint file.",
      text: "Type <code>touch main.tf</code>",
      objective: "Type touch main.tf",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "main.tf",
    },
    {
      title: "Define Provider",
      why: "Tell Terraform to connect to AWS.",
      text: 'Type <code>echo \'provider "aws" { region = "us-east-1" }\' > main.tf</code>',
      objective: "Add AWS provider to main.tf",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("aws") && raw.includes("main.tf"),
    },
    {
      title: "Terraform Init",
      why: "Download the necessary cloud provider plugins.",
      text: "Type <code>terraform init</code>",
      objective: "Type terraform init",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "init",
    },
    {
      title: "Format Code",
      why: "Clean up your Terraform syntax automatically.",
      text: "Type <code>terraform fmt</code>",
      objective: "Type terraform fmt",
      xp: 15,
      check: (c, a) => c === "terraform" && a[0] === "fmt",
    },
    {
      title: "Validate Config",
      why: "Check if your main.tf is syntactically valid.",
      text: "Type <code>terraform validate</code>",
      objective: "Type terraform validate",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "validate",
    },
    {
      title: "Define Server",
      why: "Add an EC2 instance to your blueprint.",
      text: 'Type <code>echo \'resource "aws_instance" "web" { ami = "ami-123", instance_type = "t2.micro" }\' >> main.tf</code>',
      objective: "Append aws_instance to main.tf",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("aws_instance") &&
        raw.includes("main.tf"),
    },
    {
      title: "Terraform Plan",
      why: "See what Terraform WILL build before actually building it.",
      text: "Type <code>terraform plan</code>",
      objective: "Type terraform plan",
      xp: 30,
      check: (c, a) => c === "terraform" && a[0] === "plan",
    },
    {
      title: "Save Plan",
      why: "Save the deployment blueprint to a file.",
      text: "Type <code>terraform plan -out=tfplan</code>",
      objective: "Type terraform plan -out=tfplan",
      xp: 35,
      check: (c, a) =>
        c === "terraform" &&
        a.includes("plan") &&
        a.some((x) => x.includes("tfplan")),
    },
    {
      title: "Terraform Apply",
      why: "Execute the plan and spawn real servers in the cloud.",
      text: "Type <code>terraform apply tfplan</code>",
      objective: "Type terraform apply tfplan",
      xp: 50,
      check: (c, a) =>
        c === "terraform" && a[0] === "apply" && a[1] === "tfplan",
    },
    {
      title: "Show State",
      why: "View the JSON map of the infrastructure Terraform now controls.",
      text: "Type <code>terraform show</code>",
      objective: "Type terraform show",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "show",
    },
    {
      title: "List State Resources",
      why: "See a clean list of managed cloud resources.",
      text: "Type <code>terraform state list</code>",
      objective: "Type terraform state list",
      xp: 25,
      check: (c, a) => c === "terraform" && a[0] === "state" && a[1] === "list",
    },
    {
      title: "Inspect State Resource",
      why: "Look at the deep details of your web server.",
      text: "Type <code>terraform state show aws_instance.web</code>",
      objective: "Type terraform state show",
      xp: 30,
      check: (c, a) =>
        c === "terraform" &&
        a[0] === "state" &&
        a[1] === "show" &&
        a[2] === "aws_instance.web",
    },
    {
      title: "Define Output",
      why: "Tell Terraform to print the server's IP after building it.",
      text: "Type <code>echo 'output \"ip\" { value = aws_instance.web.public_ip }' >> main.tf</code>",
      objective: "Append output block",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("output") &&
        raw.includes("public_ip"),
    },
    {
      title: "Apply Auto-Approve",
      why: "Apply changes without prompting for 'yes'.",
      text: "Type <code>terraform apply -auto-approve</code>",
      objective: "Type terraform apply -auto-approve",
      xp: 40,
      check: (c, a) =>
        c === "terraform" && a[0] === "apply" && a.includes("-auto-approve"),
    },
    {
      title: "Print Outputs",
      why: "Extract the IP variables from the state file.",
      text: "Type <code>terraform output</code>",
      objective: "Type terraform output",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "output",
    },
    {
      title: "Terraform Taint",
      why: "Mark a server as degraded, forcing Terraform to replace it on the next run.",
      text: "Type <code>terraform taint aws_instance.web</code>",
      objective: "Type terraform taint",
      xp: 35,
      check: (c, a) =>
        c === "terraform" && a[0] === "taint" && a[1] === "aws_instance.web",
    },
    {
      title: "Plan Replacement",
      why: "See how Terraform plans to destroy and rebuild the tainted server.",
      text: "Type <code>terraform plan</code>",
      objective: "Type terraform plan",
      xp: 20,
      check: (c, a) => c === "terraform" && a[0] === "plan",
    },
    {
      title: "Terraform Untaint",
      why: "Change your mind and unmark the server.",
      text: "Type <code>terraform untaint aws_instance.web</code>",
      objective: "Type terraform untaint",
      xp: 35,
      check: (c, a) =>
        c === "terraform" && a[0] === "untaint" && a[1] === "aws_instance.web",
    },
    {
      title: "Workspaces List",
      why: "Workspaces let you manage Prod and Dev separately.",
      text: "Type <code>terraform workspace list</code>",
      objective: "Type terraform workspace list",
      xp: 25,
      check: (c, a) =>
        c === "terraform" && a[0] === "workspace" && a[1] === "list",
    },
    {
      title: "New Workspace",
      why: "Create a Production environment.",
      text: "Type <code>terraform workspace new prod</code>",
      objective: "Type terraform workspace new prod",
      xp: 30,
      check: (c, a) =>
        c === "terraform" &&
        a[0] === "workspace" &&
        a[1] === "new" &&
        a[2] === "prod",
    },
    {
      title: "Select Workspace",
      why: "Switch back to the default environment.",
      text: "Type <code>terraform workspace select default</code>",
      objective: "Type terraform workspace select default",
      xp: 30,
      check: (c, a) =>
        c === "terraform" &&
        a[0] === "workspace" &&
        a[1] === "select" &&
        a[2] === "default",
    },
    {
      title: "Terraform Refresh",
      why: "Sync the state file with the real world.",
      text: "Type <code>terraform refresh</code>",
      objective: "Type terraform refresh",
      xp: 25,
      check: (c, a) => c === "terraform" && a[0] === "refresh",
    },
    {
      title: "Terraform Destroy",
      why: "Nuke the entire cloud architecture you just built.",
      text: "Type <code>terraform destroy -auto-approve</code>",
      objective: "Type terraform destroy -auto-approve",
      xp: 50,
      check: (c, a) =>
        c === "terraform" && a[0] === "destroy" && a.includes("-auto-approve"),
    },
    {
      title: "Clean Up",
      why: "Remove Terraform files.",
      text: "Type <code>rm -rf main.tf tfplan terraform.tfstate*</code>",
      objective: "Remove terraform files",
      xp: 15,
      check: (c, a) =>
        c === "rm" && a.includes("-rf") && a.some((x) => x.includes("main.tf")),
    },

    // --- PHASE 2: KUBERNETES CLUSTER & NODES (26-45) ---
    {
      title: "Kubeconfig Status",
      why: "Check your Kubernetes connection.",
      text: "Type <code>kubectl cluster-info</code>",
      objective: "Type kubectl cluster-info",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "cluster-info",
    },
    {
      title: "List Nodes",
      why: "See the massive physical servers powering your cluster.",
      text: "Type <code>kubectl get nodes</code>",
      objective: "Type kubectl get nodes",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "nodes",
    },
    {
      title: "Wide Node Details",
      why: "Get the IP addresses of your nodes.",
      text: "Type <code>kubectl get nodes -o wide</code>",
      objective: "Type kubectl get nodes -o wide",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "nodes" &&
        a.includes("-o") &&
        a.includes("wide"),
    },
    {
      title: "Describe Node",
      why: "View deep hardware resources of the master node.",
      text: "Type <code>kubectl describe node k8s-master</code>",
      objective: "Type kubectl describe node k8s-master",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "describe" &&
        a[1] === "node" &&
        a[2] === "k8s-master",
    },
    {
      title: "Node Metrics",
      why: "Check CPU and RAM usage of your servers.",
      text: "Type <code>kubectl top nodes</code>",
      objective: "Type kubectl top nodes",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "top" && a[1] === "nodes",
    },
    {
      title: "Taint Node",
      why: "Prevent standard pods from being scheduled on the master node.",
      text: "Type <code>kubectl taint nodes k8s-master dedicated=master:NoSchedule</code>",
      objective: "Type kubectl taint nodes",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "taint" &&
        a[1] === "nodes" &&
        a.some((x) => x.includes("NoSchedule")),
    },
    {
      title: "Label Node",
      why: "Tag a worker node with SSD storage.",
      text: "Type <code>kubectl label nodes k8s-worker1 disktype=ssd</code>",
      objective: "Type kubectl label nodes",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "label" &&
        a[1] === "nodes" &&
        a.some((x) => x.includes("disktype=ssd")),
    },
    {
      title: "Show Node Labels",
      why: "View all tags applied to servers.",
      text: "Type <code>kubectl get nodes --show-labels</code>",
      objective: "Type kubectl get nodes --show-labels",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "nodes" &&
        a.includes("--show-labels"),
    },
    {
      title: "Drain Node",
      why: "Evict all running apps from a server safely so you can reboot it.",
      text: "Type <code>kubectl drain k8s-worker1 --ignore-daemonsets</code>",
      objective: "Type kubectl drain k8s-worker1",
      xp: 50,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "drain" &&
        a[1] === "k8s-worker1" &&
        a.includes("--ignore-daemonsets"),
    },
    {
      title: "Uncordon Node",
      why: "Tell the cluster the rebooted server is ready for work again.",
      text: "Type <code>kubectl uncordon k8s-worker1</code>",
      objective: "Type kubectl uncordon k8s-worker1",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" && a[0] === "uncordon" && a[1] === "k8s-worker1",
    },
    {
      title: "List Contexts",
      why: "See which clusters you are connected to.",
      text: "Type <code>kubectl config get-contexts</code>",
      objective: "Type kubectl config get-contexts",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" && a[0] === "config" && a[1] === "get-contexts",
    },
    {
      title: "Current Context",
      why: "See your active cluster.",
      text: "Type <code>kubectl config current-context</code>",
      objective: "Type kubectl config current-context",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" && a[0] === "config" && a[1] === "current-context",
    },
    {
      title: "List Namespaces",
      why: "View the virtual partitions within the cluster.",
      text: "Type <code>kubectl get namespaces</code>",
      objective: "Type kubectl get namespaces",
      xp: 15,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "namespaces",
    },
    {
      title: "Create Namespace",
      why: "Create an isolated zone for the dev team.",
      text: "Type <code>kubectl create namespace dev</code>",
      objective: "Type kubectl create namespace dev",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "create" &&
        a[1] === "namespace" &&
        a[2] === "dev",
    },
    {
      title: "Set Default Namespace",
      why: "Switch your terminal context to the dev zone.",
      text: "Type <code>kubectl config set-context --current --namespace=dev</code>",
      objective: "Change active namespace",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "config" &&
        a.includes("set-context") &&
        a.some((x) => x.includes("--namespace=dev")),
    },
    {
      title: "Reset Namespace",
      why: "Go back to the default zone.",
      text: "Type <code>kubectl config set-context --current --namespace=default</code>",
      objective: "Change active namespace to default",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "config" &&
        a.some((x) => x.includes("--namespace=default")),
    },
    {
      title: "Get API Resources",
      why: "List every object type Kubernetes supports.",
      text: "Type <code>kubectl api-resources</code>",
      objective: "Type kubectl api-resources",
      xp: 25,
      check: (c, a) => c === "kubectl" && a[0] === "api-resources",
    },
    {
      title: "Explain Pod",
      why: "Read the manual on how to configure a Pod.",
      text: "Type <code>kubectl explain pod</code>",
      objective: "Type kubectl explain pod",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "explain" && a[1] === "pod",
    },
    {
      title: "Explain Pod Spec",
      why: "Drill down into the Pod's internal spec.",
      text: "Type <code>kubectl explain pod.spec</code>",
      objective: "Type kubectl explain pod.spec",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" && a[0] === "explain" && a[1] === "pod.spec",
    },
    {
      title: "Cluster Events",
      why: "See a live log of everything happening in the cluster.",
      text: "Type <code>kubectl get events --sort-by='.metadata.creationTimestamp'</code>",
      objective: "Get sorted events",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "events" &&
        a.some((x) => x.includes("sort-by")),
    },

    // --- PHASE 3: PODS & CONTAINERS (46-65) ---
    {
      title: "Run a Pod",
      why: "Spin up a single Nginx container.",
      text: "Type <code>kubectl run my-nginx --image=nginx</code>",
      objective: "Type kubectl run my-nginx --image=nginx",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "run" &&
        a[1] === "my-nginx" &&
        a.some((x) => x.includes("image=nginx")),
    },
    {
      title: "List Pods",
      why: "Check if your Nginx container is running.",
      text: "Type <code>kubectl get pods</code>",
      objective: "Type kubectl get pods",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pods",
    },
    {
      title: "Pod Wide Output",
      why: "See which worker node the pod was scheduled on.",
      text: "Type <code>kubectl get pods -o wide</code>",
      objective: "Type kubectl get pods -o wide",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "pods" &&
        a.includes("-o") &&
        a.includes("wide"),
    },
    {
      title: "Watch Pods",
      why: "Live-monitor pod status changes.",
      text: "Type <code>kubectl get pods -w</code>",
      objective: "Type kubectl get pods -w",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "pods" &&
        a.includes("-w"),
    },
    {
      title: "Describe Pod",
      why: "Inspect the massive JSON properties of the pod.",
      text: "Type <code>kubectl describe pod my-nginx</code>",
      objective: "Type kubectl describe pod my-nginx",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "describe" &&
        a[1] === "pod" &&
        a[2] === "my-nginx",
    },
    {
      title: "Read Pod Logs",
      why: "View the Nginx access logs inside the pod.",
      text: "Type <code>kubectl logs my-nginx</code>",
      objective: "Type kubectl logs my-nginx",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" && a[0] === "logs" && a[1] === "my-nginx",
    },
    {
      title: "Follow Pod Logs",
      why: "Tail the logs in real-time.",
      text: "Type <code>kubectl logs -f my-nginx</code>",
      objective: "Type kubectl logs -f my-nginx",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "logs" &&
        a.includes("-f") &&
        a.includes("my-nginx"),
    },
    {
      title: "Exec into Pod",
      why: "Drop a bash shell inside the running container.",
      text: "Type <code>kubectl exec -it my-nginx -- /bin/bash</code>",
      objective: "Exec into pod",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "exec" &&
        a.includes("-it") &&
        a.includes("my-nginx") &&
        a.includes("/bin/bash"),
    },
    {
      title: "Run Temp Pod",
      why: "Run an Alpine linux pod, execute a ping, and instantly delete it (--rm).",
      text: "Type <code>kubectl run temp --image=alpine --rm -it -- ping 8.8.8.8</code>",
      objective: "Run a temporary pod",
      xp: 50,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "run" &&
        a.includes("--rm") &&
        a.includes("ping"),
    },
    {
      title: "Label a Pod",
      why: "Tag the pod as 'production'.",
      text: "Type <code>kubectl label pod my-nginx env=prod</code>",
      objective: "Type kubectl label pod",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "label" &&
        a[1] === "pod" &&
        a.includes("env=prod"),
    },
    {
      title: "Filter by Label",
      why: "Search for all pods tagged as 'prod'.",
      text: "Type <code>kubectl get pods -l env=prod</code>",
      objective: "Type kubectl get pods -l env=prod",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "pods" &&
        a.includes("-l") &&
        a.some((x) => x.includes("env=prod")),
    },
    {
      title: "Port Forward",
      why: "Tunnel port 8080 on your machine directly to the pod's port 80.",
      text: "Type <code>kubectl port-forward pod/my-nginx 8080:80</code>",
      objective: "Type kubectl port-forward",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "port-forward" &&
        a.includes("pod/my-nginx") &&
        a.includes("8080:80"),
    },
    {
      title: "Export Pod YAML",
      why: "Extract the exact YAML blueprint of your running pod.",
      text: "Type <code>kubectl get pod my-nginx -o yaml > pod.yaml</code>",
      objective: "Export pod to YAML",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("kubectl") &&
        raw.includes("-o") &&
        raw.includes("yaml") &&
        raw.includes(">"),
    },
    {
      title: "Read YAML",
      why: "Inspect the exported file.",
      text: "Type <code>cat pod.yaml</code>",
      objective: "Type cat pod.yaml",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "pod.yaml",
    },
    {
      title: "Delete Pod",
      why: "Kill the container.",
      text: "Type <code>kubectl delete pod my-nginx</code>",
      objective: "Type kubectl delete pod my-nginx",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a[1] === "pod" &&
        a[2] === "my-nginx",
    },
    {
      title: "Delete from YAML",
      why: "You can also delete resources by passing their YAML file.",
      text: "Type <code>kubectl delete -f pod.yaml</code>",
      objective: "Type kubectl delete -f pod.yaml",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a.includes("-f") &&
        a.includes("pod.yaml"),
    },
    {
      title: "Apply from YAML",
      why: "Recreate the pod using the blueprint.",
      text: "Type <code>kubectl apply -f pod.yaml</code>",
      objective: "Type kubectl apply -f pod.yaml",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "apply" &&
        a.includes("-f") &&
        a.includes("pod.yaml"),
    },
    {
      title: "Force Replace",
      why: "Nuke and recreate a pod forcefully.",
      text: "Type <code>kubectl replace --force -f pod.yaml</code>",
      objective: "Type kubectl replace --force",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "replace" &&
        a.includes("--force") &&
        a.includes("-f"),
    },
    {
      title: "Check Resource Usage",
      why: "See how much RAM your pod is eating.",
      text: "Type <code>kubectl top pod my-nginx</code>",
      objective: "Type kubectl top pod my-nginx",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "top" &&
        a[1] === "pod" &&
        a[2] === "my-nginx",
    },
    {
      title: "Clean Up Pods",
      why: "Delete all pods in the default namespace.",
      text: "Type <code>kubectl delete pods --all</code>",
      objective: "Type kubectl delete pods --all",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a[1] === "pods" &&
        a.includes("--all"),
    },

    // --- PHASE 4: DEPLOYMENTS, SCALING & SERVICES (66-85) ---
    {
      title: "Create Deployment",
      why: "Deployments manage ReplicaSets, ensuring pods automatically restart if they crash.",
      text: "Type <code>kubectl create deployment web --image=nginx</code>",
      objective: "Type kubectl create deployment",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "create" &&
        a[1] === "deployment" &&
        a[2] === "web" &&
        a.some((x) => x.includes("image=nginx")),
    },
    {
      title: "Get Deployments",
      why: "View the deployment controller.",
      text: "Type <code>kubectl get deployments</code>",
      objective: "Type kubectl get deployments",
      xp: 15,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a.some((x) => x.includes("deployment")),
    },
    {
      title: "Get ReplicaSets",
      why: "View the hidden engine keeping your pods alive.",
      text: "Type <code>kubectl get rs</code>",
      objective: "Type kubectl get rs",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "rs",
    },
    {
      title: "Scale Deployment",
      why: "Instantly spin up 5 identical web servers.",
      text: "Type <code>kubectl scale deployment web --replicas=5</code>",
      objective: "Type kubectl scale deployment",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "scale" &&
        a[1] === "deployment" &&
        a[2] === "web" &&
        a.some((x) => x.includes("replicas=5")),
    },
    {
      title: "Verify Scaling",
      why: "See all 5 pods booting up.",
      text: "Type <code>kubectl get pods</code>",
      objective: "Type kubectl get pods",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pods",
    },
    {
      title: "Set Image (Update)",
      why: "Update your deployment to use Apache (httpd) instead of Nginx.",
      text: "Type <code>kubectl set image deployment/web nginx=httpd</code>",
      objective: "Type kubectl set image",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "set" &&
        a[1] === "image" &&
        a[2] === "deployment/web" &&
        a.some((x) => x.includes("nginx=httpd")),
    },
    {
      title: "Rollout Status",
      why: "Watch the zero-downtime rolling update happen.",
      text: "Type <code>kubectl rollout status deployment/web</code>",
      objective: "Type kubectl rollout status",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "rollout" &&
        a[1] === "status" &&
        a[2] === "deployment/web",
    },
    {
      title: "Rollout History",
      why: "View your deployment revisions.",
      text: "Type <code>kubectl rollout history deployment/web</code>",
      objective: "Type kubectl rollout history",
      xp: 30,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "rollout" &&
        a[1] === "history" &&
        a[2] === "deployment/web",
    },
    {
      title: "Rollout Undo",
      why: "Oh no! Apache is crashing! Instantly rollback to Nginx.",
      text: "Type <code>kubectl rollout undo deployment/web</code>",
      objective: "Type kubectl rollout undo",
      xp: 50,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "rollout" &&
        a[1] === "undo" &&
        a[2] === "deployment/web",
    },
    {
      title: "Autoscale Deploy",
      why: "Tell K8s to automatically scale between 2 and 10 pods based on 80% CPU usage.",
      text: "Type <code>kubectl autoscale deployment web --min=2 --max=10 --cpu-percent=80</code>",
      objective: "Type kubectl autoscale",
      xp: 50,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "autoscale" &&
        a[1] === "deployment" &&
        a.includes("web") &&
        a.some((x) => x.includes("cpu-percent")),
    },
    {
      title: "Get HPA",
      why: "View the Horizontal Pod Autoscaler.",
      text: "Type <code>kubectl get hpa</code>",
      objective: "Type kubectl get hpa",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "hpa",
    },
    {
      title: "Expose Service",
      why: "Create a LoadBalancer to expose the 5 web pods to the internet.",
      text: "Type <code>kubectl expose deployment web --type=LoadBalancer --port=80</code>",
      objective: "Type kubectl expose",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "expose" &&
        a[1] === "deployment" &&
        a[2] === "web" &&
        a.some((x) => x.includes("LoadBalancer")),
    },
    {
      title: "Get Services",
      why: "Find the public IP assigned to your LoadBalancer.",
      text: "Type <code>kubectl get svc</code>",
      objective: "Type kubectl get svc",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "svc",
    },
    {
      title: "Describe Service",
      why: "Check the internal routing targets of the service.",
      text: "Type <code>kubectl describe svc web</code>",
      objective: "Type kubectl describe svc web",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "describe" &&
        a[1] === "svc" &&
        a[2] === "web",
    },
    {
      title: "Get Endpoints",
      why: "See the exact IP addresses of the 5 pods the service is routing to.",
      text: "Type <code>kubectl get endpoints web</code>",
      objective: "Type kubectl get endpoints web",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a[1] === "endpoints" &&
        a[2] === "web",
    },
    {
      title: "Edit Service",
      why: "Open the service YAML directly in the terminal editor.",
      text: "Type <code>kubectl edit svc web</code>",
      objective: "Type kubectl edit svc web",
      xp: 35,
      check: (c, a) =>
        c === "kubectl" && a[0] === "edit" && a[1] === "svc" && a[2] === "web",
    },
    {
      title: "Delete Service",
      why: "Remove the public internet access point.",
      text: "Type <code>kubectl delete svc web</code>",
      objective: "Type kubectl delete svc web",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a[1] === "svc" &&
        a[2] === "web",
    },
    {
      title: "Create Ingress",
      why: "Ingress is a smarter router that reads URL paths.",
      text: 'Type <code>kubectl create ingress my-ing --rule="myapp.com/*=web:80"</code>',
      objective: "Type kubectl create ingress",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "create" &&
        a[1] === "ingress" &&
        a[2] === "my-ing",
    },
    {
      title: "Get Ingress",
      why: "Check your routing rules.",
      text: "Type <code>kubectl get ingress</code>",
      objective: "Type kubectl get ingress",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "ingress",
    },
    {
      title: "Delete Deployment",
      why: "Nuke the deployment and all its replica pods.",
      text: "Type <code>kubectl delete deployment web</code>",
      objective: "Type kubectl delete deployment web",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a.some((x) => x.includes("deployment")) &&
        a.includes("web"),
    },

    // --- PHASE 5: CONFIGMAPS, SECRETS & ADVANCED OPS (86-100) ---
    {
      title: "Create ConfigMap",
      why: "Store non-sensitive config files outside of your containers.",
      text: "Type <code>kubectl create configmap app-config --from-literal=ENV=prod</code>",
      objective: "Type kubectl create configmap",
      xp: 40,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "create" &&
        a[1] === "configmap" &&
        a.some((x) => x.includes("ENV=prod")),
    },
    {
      title: "Get ConfigMaps",
      why: "Verify the map exists.",
      text: "Type <code>kubectl get cm</code>",
      objective: "Type kubectl get cm",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "cm",
    },
    {
      title: "Describe ConfigMap",
      why: "Read the literal values stored inside.",
      text: "Type <code>kubectl describe cm app-config</code>",
      objective: "Type kubectl describe cm",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "describe" && a[1] === "cm",
    },
    {
      title: "Create Secret",
      why: "Securely store database passwords in K8s.",
      text: "Type <code>kubectl create secret generic db-pass --from-literal=password=supersecret</code>",
      objective: "Type kubectl create secret",
      xp: 45,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "create" &&
        a[1] === "secret" &&
        a.some((x) => x.includes("password=")),
    },
    {
      title: "Get Secrets",
      why: "List encrypted items.",
      text: "Type <code>kubectl get secrets</code>",
      objective: "Type kubectl get secrets",
      xp: 15,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "secrets",
    },
    {
      title: "Describe Secret",
      why: "K8s will hide the password from the describe output.",
      text: "Type <code>kubectl describe secret db-pass</code>",
      objective: "Type kubectl describe secret db-pass",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" && a[0] === "describe" && a[1] === "secret",
    },
    {
      title: "Extract Secret",
      why: "You must extract the YAML and decode the Base64 to see the real password.",
      text: "Type <code>kubectl get secret db-pass -o jsonpath='{.data.password}' | base64 --decode</code>",
      objective: "Extract and decode secret",
      xp: 60,
      check: (c, a, o, raw) =>
        raw.includes("kubectl") &&
        raw.includes("jsonpath") &&
        raw.includes("base64") &&
        raw.includes("--decode"),
    },
    {
      title: "DaemonSets",
      why: "DaemonSets ensure exactly one pod runs on EVERY node (used for loggers/monitors).",
      text: "Type <code>kubectl get daemonsets</code>",
      objective: "Type kubectl get daemonsets",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a.some((x) => x.includes("daemonset")),
    },
    {
      title: "StatefulSets",
      why: "StatefulSets are used for Databases where data order and identity matters.",
      text: "Type <code>kubectl get statefulsets</code>",
      objective: "Type kubectl get statefulsets",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "get" &&
        a.some((x) => x.includes("statefulset")),
    },
    {
      title: "Persistent Volumes",
      why: "List massive storage drives attached to the cluster.",
      text: "Type <code>kubectl get pv</code>",
      objective: "Type kubectl get pv",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pv",
    },
    {
      title: "Volume Claims",
      why: "Check which pods are currently claiming storage.",
      text: "Type <code>kubectl get pvc</code>",
      objective: "Type kubectl get pvc",
      xp: 20,
      check: (c, a) => c === "kubectl" && a[0] === "get" && a[1] === "pvc",
    },
    {
      title: "Cluster Roles",
      why: "Check RBAC (Role-Based Access Control) permissions.",
      text: "Type <code>kubectl get clusterroles</code>",
      objective: "Type kubectl get clusterroles",
      xp: 25,
      check: (c, a) =>
        c === "kubectl" && a[0] === "get" && a[1] === "clusterroles",
    },
    {
      title: "Auth Can-I",
      why: "Ask K8s if your current user has permission to delete pods.",
      text: "Type <code>kubectl auth can-i delete pods</code>",
      objective: "Type kubectl auth can-i",
      xp: 35,
      check: (c, a) => c === "kubectl" && a[0] === "auth" && a[1] === "can-i",
    },
    {
      title: "Delete All ConfigMaps",
      why: "Clean up your maps.",
      text: "Type <code>kubectl delete cm --all</code>",
      objective: "Type kubectl delete cm --all",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a[1] === "cm" &&
        a.includes("--all"),
    },
    {
      title: "Delete All Secrets",
      why: "Clean up your passwords.",
      text: "Type <code>kubectl delete secrets --all</code>",
      objective: "Type kubectl delete secrets --all",
      xp: 20,
      check: (c, a) =>
        c === "kubectl" &&
        a[0] === "delete" &&
        a[1] === "secrets" &&
        a.includes("--all"),
    },
    {
      title: "Kustomize Build",
      why: "Kustomize is a template engine built into kubectl. Render a directory.",
      text: "Type <code>kubectl kustomize ./</code>",
      objective: "Type kubectl kustomize ./",
      xp: 40,
      check: (c, a) => c === "kubectl" && a[0] === "kustomize" && a[1] === "./",
    },
    {
      title: "Cluster Proxy",
      why: "Open a direct API tunnel to the Kubernetes control plane.",
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
      why: "Destroy all remaining deployments.",
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
      why: "Destroy all remaining network services.",
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
      why: "Module 18 Complete. You control the cloud infrastructure.",
      text: 'Type <code>echo "Kubernetes God Mode Unlocked"</code>',
      objective: "Type echo",
      xp: 200,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Kubernetes"),
    },
  ],
};
