// thirteenthmodule.js
// Module 13: Containerization & Cloud Native (65 Lessons)

const module13_docker = {
  name: "13. Containerization (65 Lessons)",
  lessons: [
    // --- PHASE 1: IMAGES & BASIC CONTAINERS (1-15) ---
    {
      title: "Verify Docker Engine",
      why: "Docker is not a virtual machine; it is a daemon (dockerd) that interfaces directly with the Linux kernel to create isolated 'Namespaces' and allocate resources via 'cgroups'. First, verify the daemon is active.",
      text: "Type <code>systemctl status docker</code>",
      objective: "Check docker status",
      xp: 10,
      check: (c, a) =>
        c === "systemctl" && a.includes("status") && a.includes("docker"),
    },
    {
      title: "Pull Base Image",
      why: "An 'Image' is an immutable, read-only template built from stacked filesystem layers. The <b>pull</b> command queries an OCI-compliant registry (like Docker Hub) and downloads the compressed Ubuntu layers to your local disk.",
      text: "Type <code>docker pull ubuntu</code>",
      objective: "Type docker pull ubuntu",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "pull" && a[1] === "ubuntu",
    },
    {
      title: "Pull Web Server",
      why: "Download the Nginx image. Because Docker uses an Overlay Filesystem (OverlayFS), if Nginx shares base layers with Ubuntu, the daemon will only download the delta layers, saving massive amounts of disk space.",
      text: "Type <code>docker pull nginx</code>",
      objective: "Type docker pull nginx",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "pull" && a[1] === "nginx",
    },
    {
      title: "List Local Images",
      why: "Query the Docker daemon for a manifest of all cached image layers currently residing on your physical hard drive.",
      text: "Type <code>docker images</code>",
      objective: "Type docker images",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "images",
    },
    {
      title: "Run Container",
      why: "The <b>run</b> command is complex. It instructs the kernel to spin up a thin, Read/Write overlay on top of the immutable image layer, allocate a new isolated PID namespace, and start the container.",
      text: 'Type <code>docker run ubuntu echo "Hello"</code>',
      objective: "Run a command inside ubuntu",
      xp: 20,
      check: (c, a, o, raw) =>
        c === "docker" &&
        a.includes("run") &&
        a.includes("ubuntu") &&
        raw.includes("echo"),
    },
    {
      title: "Run Interactive",
      why: "Containers usually die the second their primary process finishes. The <b>-i</b> (Interactive) and <b>-t</b> (Pseudo-TTY) flags wire your terminal's Standard Input/Output directly into the container's isolated bash process.",
      text: "Type <code>docker run -it ubuntu /bin/bash</code>",
      objective: "Run an interactive ubuntu shell",
      xp: 25,
      check: (c, a) =>
        c === "docker" &&
        a.includes("run") &&
        a.includes("-it") &&
        a.includes("ubuntu"),
    },
    {
      title: "Exit Container",
      why: "Terminate the container's root process (bash). When PID 1 inside a container dies, the Linux kernel instantly destroys the isolated namespace and halts the container.",
      text: "Type <code>exit</code>",
      objective: "Type exit",
      xp: 10,
      check: (c) => c === "exit",
    },
    {
      title: "List Running Containers",
      why: "The <b>ps</b> command queries the Docker daemon for active isolated environments. Since you exited the Ubuntu container, this list should currently be empty.",
      text: "Type <code>docker ps</code>",
      objective: "Type docker ps",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "ps",
    },
    {
      title: "List All Containers",
      why: "The <b>-a</b> flag reveals the 'graveyard'. Even though a container stops running, its Read/Write filesystem layer remains on the disk until you explicitly delete it.",
      text: "Type <code>docker ps -a</code>",
      objective: "Type docker ps -a",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "ps" && a.includes("-a"),
    },
    {
      title: "Run Detached Daemon",
      why: "Web servers shouldn't lock up your terminal. The <b>-d</b> (Detached) flag forks the container process into the background, returning a long SHA-256 hash identifying the specific container instance.",
      text: "Type <code>docker run -d nginx</code>",
      objective: "Run nginx detached",
      xp: 25,
      check: (c, a) =>
        c === "docker" &&
        a.includes("run") &&
        a.includes("-d") &&
        a.includes("nginx"),
    },
    {
      title: "Name a Container",
      why: "Docker generates random names (like 'jovial_turing') by default. The <b>--name</b> flag allows you to assign a strict DNS identifier, ensuring automation scripts can reliably target the container.",
      text: "Type <code>docker run -d --name webserver nginx</code>",
      objective: "Run named container",
      xp: 25,
      check: (c, a) =>
        c === "docker" && a.includes("--name") && a.includes("webserver"),
    },
    {
      title: "Stop Container",
      why: "The <b>stop</b> command sends a SIGTERM signal to the container's primary process, politely asking it to dump its memory and shut down.",
      text: "Type <code>docker stop webserver</code>",
      objective: "Stop the webserver",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "stop" && a[1] === "webserver",
    },
    {
      title: "Start Container",
      why: "Revive a halted container. The daemon loads the container's exact Read/Write filesystem layer back into a new kernel namespace.",
      text: "Type <code>docker start webserver</code>",
      objective: "Start the webserver",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "start" && a[1] === "webserver",
    },
    {
      title: "Remove Container",
      why: "The <b>rm</b> command unlinks the container's Read/Write layer from the host's filesystem, permanently destroying any data that was altered inside it. You must stop it before removing it.",
      text: "Type <code>docker rm webserver</code>",
      objective: "Type docker rm",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "rm" && a[1] === "webserver",
    },
    {
      title: "Force Remove",
      why: "The <b>-f</b> (Force) flag acts as a SIGKILL. It violently rips the container out of the kernel's execution queue and destroys its filesystem layer in a single command.",
      text: "Type <code>docker rm -f webserver</code>",
      objective: "Type docker rm -f",
      xp: 25,
      check: (c, a) => c === "docker" && a[0] === "rm" && a.includes("-f"),
    },

    // --- PHASE 2: EXEC, LOGS & DIAGNOSTICS (16-30) ---
    {
      title: "Port Forwarding",
      why: "Containers are completely isolated by a virtual bridge. The <b>-p 8080:80</b> flag alters the host's iptables, mapping port 8080 on the host machine to port 80 inside the container namespace.",
      text: "Type <code>docker run -d -p 8080:80 --name myweb nginx</code>",
      objective: "Run with port forwarding",
      xp: 35,
      check: (c, a) =>
        c === "docker" && a.includes("-p") && a.includes("8080:80"),
    },
    {
      title: "Execute Inside Container",
      why: "How do you hack or debug a running container? The <b>exec</b> command bypasses the container's primary process, directly injecting a completely new process (like bash) into the container's existing namespace.",
      text: "Type <code>docker exec -it myweb /bin/bash</code>",
      objective: "Drop a shell into the container",
      xp: 40,
      check: (c, a) =>
        c === "docker" &&
        a.includes("exec") &&
        a.includes("-it") &&
        a.includes("/bin/bash"),
    },
    {
      title: "Exit Exec",
      why: "Because bash was spawned as a secondary process, typing `exit` only kills the bash session. The container itself remains perfectly unharmed.",
      text: "Type <code>exit</code>",
      objective: "Type exit",
      xp: 10,
      check: (c) => c === "exit",
    },
    {
      title: "View Container Logs",
      why: "Containers do not write to `/var/log/syslog`. Docker captures everything the container blasts to Standard Output (stdout) and Standard Error (stderr) and buffers it in the daemon.",
      text: "Type <code>docker logs myweb</code>",
      objective: "Type docker logs myweb",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "logs" && a[1] === "myweb",
    },
    {
      title: "Follow Container Logs",
      why: "The <b>-f</b> flag locks your terminal onto the Docker daemon's stream output, providing real-time diagnostics of the container's internal traffic.",
      text: "Type <code>docker logs -f myweb</code>",
      objective: "Type docker logs -f myweb",
      xp: 25,
      check: (c, a) => c === "docker" && a.includes("logs") && a.includes("-f"),
    },
    {
      title: "Inspect Container",
      why: "The <b>inspect</b> command dumps the container's entire JSON architectural blueprint. This reveals its virtual IP address, MAC address, environment variables, and exact host mount points.",
      text: "Type <code>docker inspect myweb</code>",
      objective: "Type docker inspect myweb",
      xp: 30,
      check: (c, a) => c === "docker" && a[0] === "inspect" && a[1] === "myweb",
    },
    {
      title: "Inspect Grep IP",
      why: "Use Bash pipeline logic to extract the container's hidden internal IP address from the massive JSON blueprint.",
      text: "Type <code>docker inspect myweb | grep IPAddress</code>",
      objective: "Grep the IPAddress",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("inspect") &&
        raw.includes("grep") &&
        raw.includes("IPAddress"),
    },
    {
      title: "Live Container Stats",
      why: "The <b>stats</b> command opens an interactive telemetry dashboard, proving that cgroups are successfully limiting the CPU and RAM allocation of the container.",
      text: "Type <code>docker stats</code>",
      objective: "Type docker stats",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "stats",
    },
    {
      title: "Container Process Tree",
      why: "The <b>top</b> command looks inside the container's isolated PID namespace and maps exactly which internal processes are consuming resources.",
      text: "Type <code>docker top myweb</code>",
      objective: "Type docker top myweb",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "top" && a[1] === "myweb",
    },
    {
      title: "Rename Container",
      why: "You can update the container's DNS mapping dynamically without altering its running state.",
      text: "Type <code>docker rename myweb prod_web</code>",
      objective: "Rename myweb to prod_web",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "rename" && a[1] === "myweb",
    },

    // --- PHASE 3: NETWORKS & VOLUMES (31-50) ---
    {
      title: "List Networks",
      why: "Docker uses isolated Software-Defined Networks (SDNs). The `ls` command displays the host's default bridges, host networks, and 'none' (air-gapped) network configurations.",
      text: "Type <code>docker network ls</code>",
      objective: "Type docker network ls",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "network" && a[1] === "ls",
    },
    {
      title: "Create Network",
      why: "Create a custom Virtual Bridge. Containers placed on this bridge can resolve each other via DNS names (like 'database') instead of relying on fragile, shifting IP addresses.",
      text: "Type <code>docker network create my_net</code>",
      objective: "Create my_net network",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "create",
    },
    {
      title: "Connect Container",
      why: "Hot-plug the running container into your newly established custom subnet without needing to restart it.",
      text: "Type <code>docker network connect my_net prod_web</code>",
      objective: "Connect prod_web to my_net",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "connect",
    },
    {
      title: "Inspect Network",
      why: "Dumping the network JSON reveals the precise subnet CIDR block (e.g., 172.18.0.0/16) and lists all containers actively routed through the bridge.",
      text: "Type <code>docker network inspect my_net</code>",
      objective: "Inspect my_net",
      xp: 25,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "inspect",
    },
    {
      title: "Disconnect Container",
      why: "Hot-unplug the container, severing its routing access to the custom subnet.",
      text: "Type <code>docker network disconnect my_net prod_web</code>",
      objective: "Disconnect prod_web",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "disconnect",
    },
    {
      title: "List Volumes",
      why: "Containers are ephemeral; if they die, their internal files die. <b>Volumes</b> are dedicated folders on the Host machine's disk that bypass the container's overlay filesystem, ensuring data persists permanently.",
      text: "Type <code>docker volume ls</code>",
      objective: "Type docker volume ls",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "volume" && a[1] === "ls",
    },
    {
      title: "Create Volume",
      why: "Instruct the Docker daemon to format and allocate a dedicated persistent storage block on the physical host machine.",
      text: "Type <code>docker volume create db_data</code>",
      objective: "Create db_data volume",
      xp: 25,
      check: (c, a) => c === "docker" && a[0] === "volume" && a[1] === "create",
    },
    {
      title: "Mount Volume",
      why: "The <b>-v</b> flag builds a hyper-link. We are instructing Docker to mount the physical `db_data` volume directly over the container's internal `/var/lib/mysql` directory. Now, database writes hit the host disk safely.",
      text: "Type <code>docker run -d -v db_data:/var/lib/mysql --name db ubuntu</code>",
      objective: "Run container with volume mount",
      xp: 40,
      check: (c, a) =>
        c === "docker" &&
        a.includes("-v") &&
        a.some((x) => x.includes("db_data")),
    },
    {
      title: "Inspect Volume",
      why: "Find out exactly where Docker is hiding the physical data. The JSON blueprint reveals the absolute `Mountpoint` path on the host system (usually `/var/lib/docker/volumes/`).",
      text: "Type <code>docker volume inspect db_data</code>",
      objective: "Inspect db_data volume",
      xp: 25,
      check: (c, a) =>
        c === "docker" && a[0] === "volume" && a[1] === "inspect",
    },
    {
      title: "Bind Mount",
      why: "Instead of letting Docker manage the volume, you can use absolute paths. This maps a specific Host folder directly into the container, allowing you to edit code locally and see it update instantly inside the container.",
      text: "Type <code>docker run -d -v /opt/code:/var/www/html nginx</code>",
      objective: "Run container with bind mount",
      xp: 40,
      check: (c, a) =>
        c === "docker" &&
        a.includes("-v") &&
        a.some((x) => x.includes("/opt/code")),
    },

    // --- PHASE 4: DOCKERFILES & ARCHITECTURE (51-60) ---
    {
      title: "Create Dockerfile",
      why: "A Dockerfile is an Infrastructure-as-Code blueprint. It contains the exact sequential steps required to compile your application into an immutable Docker Image layer.",
      text: 'Type <code>echo "FROM ubuntu" > Dockerfile</code>',
      objective: "Start a Dockerfile",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Dockerfile"),
    },
    {
      title: "Add Build Steps",
      why: "Every line in a Dockerfile creates a new filesystem layer. Appending a RUN command tells Docker to execute `apt update` and bake those file changes permanently into the image.",
      text: 'Type <code>echo "RUN apt update" >> Dockerfile</code>',
      objective: "Append to Dockerfile",
      xp: 20,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes(">>"),
    },
    {
      title: "Build Image",
      why: "The <b>build</b> command passes the blueprint context (the <b>.</b> represents current directory) to the daemon, which compiles the layers and tags (<b>-t</b>) the final cryptographic SHA hash with a human-readable name.",
      text: "Type <code>docker build -t my_custom_os .</code>",
      objective: "Build the docker image",
      xp: 40,
      check: (c, a) =>
        c === "docker" && a.includes("build") && a.includes("-t"),
    },
    {
      title: "Verify Build",
      why: "Query the local registry to confirm the daemon successfully hashed and stored your newly compiled image artifact.",
      text: "Type <code>docker images</code>",
      objective: "Type docker images",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "images",
    },
    {
      title: "Tag Image",
      why: "Before pushing an image to the cloud, you must cryptographically tag it with the exact registry URL and version notation (e.g., v1.0).",
      text: "Type <code>docker tag my_custom_os sysadmin/my_custom_os:v1</code>",
      objective: "Tag the docker image",
      xp: 30,
      check: (c, a) => c === "docker" && a[0] === "tag",
    },
    {
      title: "Save Image to Tar",
      why: "If a server is air-gapped (no internet), you cannot `docker pull`. You must mathematically compress the image layers into a `.tar` binary block for physical USB transfer.",
      text: "Type <code>docker save -o custom_os.tar my_custom_os</code>",
      objective: "Save image to tar",
      xp: 40,
      check: (c, a) => c === "docker" && a[0] === "save" && a.includes("-o"),
    },
    {
      title: "Load Image from Tar",
      why: "The reverse operation. The daemon decompresses the `.tar` file, validates the layer hashes, and imports the image seamlessly into the local registry.",
      text: "Type <code>docker load -i custom_os.tar</code>",
      objective: "Load image from tar",
      xp: 40,
      check: (c, a) => c === "docker" && a[0] === "load" && a.includes("-i"),
    },
    {
      title: "Docker Compose Up",
      why: "Modern apps require 5+ containers (web, db, redis) networking together. `docker-compose.yml` orchestrates this topology. (Simulated execution of spawning an entire cloud stack).",
      text: "Type <code>docker-compose up -d</code>",
      objective: "Simulate docker-compose up",
      xp: 35,
      check: (c, a) => c.includes("docker-compose") && a.includes("up"),
    },
    {
      title: "Docker Compose Down",
      why: "The orchestrator symmetrically dismantles the infrastructure, systematically killing containers and destroying virtual subnets.",
      text: "Type <code>docker-compose down</code>",
      objective: "Simulate docker-compose down",
      xp: 35,
      check: (c, a) => c.includes("docker-compose") && a.includes("down"),
    },
    {
      title: "Remove Untagged Images",
      why: "Remove the specific image instance to begin cleaning your local cache.",
      text: "Type <code>docker rmi my_custom_os</code>",
      objective: "Type docker rmi",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "rmi",
    },

    // --- PHASE 5: SYSTEM PRUNING & CLEANUP (61-65) ---
    {
      title: "Disk Usage Stats",
      why: "Docker is notorious for consuming 100% of a hard drive over time. <b>system df</b> calculates the exact block sizes consumed by inactive images, dangling layers, and abandoned volumes.",
      text: "Type <code>docker system df</code>",
      objective: "Type docker system df",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "system" && a[1] === "df",
    },
    {
      title: "Prune Stopped Containers",
      why: "Violently purge all halted Read/Write layers from the disk. The <b>-f</b> flag bypasses the safety warning.",
      text: "Type <code>docker container prune -f</code>",
      objective: "Type docker container prune",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a[0] === "container" && a[1] === "prune",
    },
    {
      title: "Prune Dangling Images",
      why: "When you rebuild Dockerfiles repeatedly, you leave behind 'dangling' (untagged, useless) intermediate layers. Reclaim this lost storage.",
      text: "Type <code>docker image prune -f</code>",
      objective: "Type docker image prune",
      xp: 30,
      check: (c, a) => c === "docker" && a[0] === "image" && a[1] === "prune",
    },
    {
      title: "Nuclear Prune",
      why: "The ultimate reset. This destroys ALL stopped containers, tears down all unused virtual networks, and deletes every single image that isn't actively running a container.",
      text: "Type <code>docker system prune -a -f</code>",
      objective: "Type docker system prune -a -f",
      xp: 50,
      check: (c, a) =>
        c === "docker" &&
        a[0] === "system" &&
        a[1] === "prune" &&
        a.includes("-a"),
    },
    {
      title: "Cloud Architect Complete",
      why: "You understand namespaces, volume persistence, overlay filesystems, and infrastructure-as-code deployment.",
      text: 'Type <code>echo "Cloud Native Master"</code>',
      objective: "Complete module",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Master"),
    },
  ],
};
