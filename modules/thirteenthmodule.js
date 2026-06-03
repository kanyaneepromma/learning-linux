// thirteenthmodule.js
// Module 13: Containerization & Cloud Native (65 Lessons)

const module13_docker = {
  name: "13. Containerization (65 Lessons)",
  lessons: [
    // --- PHASE 1: IMAGES & BASIC CONTAINERS (1-15) ---
    {
      title: "Verify Docker Engine",
      why: "Ensure the Docker daemon is running.",
      text: "Type <code>systemctl status docker</code>",
      objective: "Check docker status",
      xp: 10,
      check: (c, a) =>
        c === "systemctl" && a.includes("status") && a.includes("docker"),
    },
    {
      title: "Pull Base Image",
      why: "Download an Ubuntu image from Docker Hub.",
      text: "Type <code>docker pull ubuntu</code>",
      objective: "Type docker pull ubuntu",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "pull" && a[1] === "ubuntu",
    },
    {
      title: "Pull Web Server",
      why: "Download the Nginx web server image.",
      text: "Type <code>docker pull nginx</code>",
      objective: "Type docker pull nginx",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "pull" && a[1] === "nginx",
    },
    {
      title: "List Local Images",
      why: "View all downloaded images on your machine.",
      text: "Type <code>docker images</code>",
      objective: "Type docker images",
      xp: 10,
      check: (c, a) => c === "docker" && a[0] === "images",
    },
    {
      title: "Run Interactive Container",
      why: "Start a container and drop into its shell (-it).",
      text: "Type <code>docker run -it ubuntu</code>",
      objective: "Type docker run -it ubuntu",
      xp: 25,
      check: (c, a) =>
        c === "docker" &&
        a.includes("run") &&
        a.includes("-it") &&
        a.includes("ubuntu"),
    },
    {
      title: "Run Detached Container",
      why: "Run a web server silently in the background (-d).",
      text: "Type <code>docker run -d nginx</code>",
      objective: "Type docker run -d nginx",
      xp: 25,
      check: (c, a) =>
        c === "docker" &&
        a.includes("run") &&
        a.includes("-d") &&
        a.includes("nginx"),
    },
    {
      title: "List Active Containers",
      why: "See what is currently running.",
      text: "Type <code>docker ps</code>",
      objective: "Type docker ps",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "ps" && !a.includes("-a"),
    },
    {
      title: "List All Containers",
      why: "Include stopped/crashed containers.",
      text: "Type <code>docker ps -a</code>",
      objective: "Type docker ps -a",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "ps" && a.includes("-a"),
    },
    {
      title: "Stop Container",
      why: "Gracefully shut down a container by its ID or name.",
      text: "Type <code>docker stop web_server</code>",
      objective: "Type docker stop web_server",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "stop" && a[1] === "web_server",
    },
    {
      title: "Start Container",
      why: "Boot a stopped container back up.",
      text: "Type <code>docker start web_server</code>",
      objective: "Type docker start web_server",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "start" && a[1] === "web_server",
    },
    {
      title: "Restart Container",
      why: "Bounce a container to apply new configs.",
      text: "Type <code>docker restart web_server</code>",
      objective: "Type docker restart web_server",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "restart" && a[1] === "web_server",
    },
    {
      title: "Remove Stopped Container",
      why: "Delete a container completely.",
      text: "Type <code>docker rm suspicious_mccarthy</code>",
      objective: "Type docker rm suspicious_mccarthy",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "rm" && a[1] === "suspicious_mccarthy",
    },
    {
      title: "Force Remove",
      why: "Destroy a container even if it's currently running (-f).",
      text: "Type <code>docker rm -f web_server</code>",
      objective: "Type docker rm -f web_server",
      xp: 25,
      check: (c, a) => c === "docker" && a[0] === "rm" && a.includes("-f"),
    },
    {
      title: "Remove Image",
      why: "Delete the actual downloaded template.",
      text: "Type <code>docker rmi ubuntu</code>",
      objective: "Type docker rmi ubuntu",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "rmi" && a[1] === "ubuntu",
    },
    {
      title: "Name a Container",
      why: "Assign a specific name instead of a random hash.",
      text: "Type <code>docker run -d --name my_db postgres</code>",
      objective: "Use --name flag",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a.includes("--name") && a.includes("my_db"),
    },

    // --- PHASE 2: CONTAINER INTERACTION & DEBUGGING (16-30) ---
    {
      title: "Execute Command",
      why: "Run a command inside a running container.",
      text: "Type <code>docker exec web_server ls -l</code>",
      objective: "Type docker exec web_server ls -l",
      xp: 30,
      check: (c, a) => c === "docker" && a[0] === "exec" && a.includes("ls"),
    },
    {
      title: "Drop into Shell",
      why: "Open an interactive bash prompt inside a running container.",
      text: "Type <code>docker exec -it web_server /bin/bash</code>",
      objective: "Use exec -it to get bash",
      xp: 35,
      check: (c, a) =>
        c === "docker" &&
        a[0] === "exec" &&
        a.includes("-it") &&
        a.includes("/bin/bash"),
    },
    {
      title: "Read Container Logs",
      why: "View the standard output (stdout) of the container.",
      text: "Type <code>docker logs web_server</code>",
      objective: "Type docker logs web_server",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "logs" && a[1] === "web_server",
    },
    {
      title: "Follow Logs",
      why: "Live-tail the container logs in real time (-f).",
      text: "Type <code>docker logs -f web_server</code>",
      objective: "Type docker logs -f web_server",
      xp: 25,
      check: (c, a) => c === "docker" && a[0] === "logs" && a.includes("-f"),
    },
    {
      title: "Tail Specific Lines",
      why: "Only view the last 10 lines of the container log.",
      text: "Type <code>docker logs --tail 10 web_server</code>",
      objective: "Use --tail 10",
      xp: 25,
      check: (c, a) =>
        c === "docker" &&
        a[0] === "logs" &&
        a.includes("--tail") &&
        a.includes("10"),
    },
    {
      title: "Inspect Container",
      why: "Dump the massive JSON configuration of a container.",
      text: "Type <code>docker inspect web_server</code>",
      objective: "Type docker inspect web_server",
      xp: 25,
      check: (c, a) =>
        c === "docker" && a[0] === "inspect" && a[1] === "web_server",
    },
    {
      title: "Grep Inspector",
      why: "Filter the JSON blob to find the container's IP Address.",
      text: "Type <code>docker inspect web_server | grep IPAddress</code>",
      objective: "Grep IPAddress from inspect",
      xp: 30,
      check: (c, a) => c === "docker" || c === "grep",
    },
    {
      title: "Container Processes",
      why: "See what is running INSIDE the container.",
      text: "Type <code>docker top web_server</code>",
      objective: "Type docker top web_server",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "top" && a[1] === "web_server",
    },
    {
      title: "Resource Stats",
      why: "Live stream CPU and RAM usage for all containers.",
      text: "Type <code>docker stats</code>",
      objective: "Type docker stats",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "stats",
    },
    {
      title: "Copy File TO Container",
      why: "Push a file from the host into the container.",
      text: "Type <code>docker cp config.txt web_server:/etc/nginx/</code>",
      objective: "Use docker cp",
      xp: 35,
      check: (c, a) => c === "docker" && a[0] === "cp" && a[1] === "config.txt",
    },
    {
      title: "Copy File FROM Container",
      why: "Pull a file out of the container to the host.",
      text: "Type <code>docker cp web_server:/var/log/nginx/error.log ./</code>",
      objective: "Use docker cp to extract",
      xp: 35,
      check: (c, a) => c === "docker" && a[0] === "cp" && a.includes("./"),
    },
    {
      title: "Pause Container",
      why: "Freeze the container's processes without stopping it.",
      text: "Type <code>docker pause web_server</code>",
      objective: "Type docker pause",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "pause",
    },
    {
      title: "Unpause Container",
      why: "Resume operations.",
      text: "Type <code>docker unpause web_server</code>",
      objective: "Type docker unpause",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "unpause",
    },
    {
      title: "Rename Container",
      why: "Change the container's identifier.",
      text: "Type <code>docker rename web_server legacy_web</code>",
      objective: "Type docker rename",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "rename",
    },
    {
      title: "Port Mapping Check",
      why: "See how the container connects to the host.",
      text: "Type <code>docker port web_server</code>",
      objective: "Type docker port",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "port",
    },

    // --- PHASE 3: VOLUMES & NETWORKING (31-45) ---
    {
      title: "Create Volume",
      why: "Create persistent storage that survives container deletion.",
      text: "Type <code>docker volume create db_data</code>",
      objective: "Type docker volume create db_data",
      xp: 25,
      check: (c, a) => c === "docker" && a[0] === "volume" && a[1] === "create",
    },
    {
      title: "List Volumes",
      why: "See all persistent disks.",
      text: "Type <code>docker volume ls</code>",
      objective: "Type docker volume ls",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "volume" && a[1] === "ls",
    },
    {
      title: "Inspect Volume",
      why: "Find where the volume is stored on the host filesystem.",
      text: "Type <code>docker volume inspect db_data</code>",
      objective: "Type docker volume inspect",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "volume" && a[1] === "inspect",
    },
    {
      title: "Mount Volume",
      why: "Attach the volume when starting a container.",
      text: "Type <code>docker run -d -v db_data:/var/lib/postgresql/data postgres</code>",
      objective: "Use -v to mount db_data",
      xp: 40,
      check: (c, a) =>
        c === "docker" &&
        a.includes("-v") &&
        a.some((x) => x.includes("db_data")),
    },
    {
      title: "Bind Mount Host Dir",
      why: "Map a local host directory directly into the container.",
      text: "Type <code>docker run -d -v /home/sysadmin/projects:/app nginx</code>",
      objective: "Use -v to mount absolute path",
      xp: 40,
      check: (c, a) =>
        c === "docker" &&
        a.includes("-v") &&
        a.some((x) => x.includes("/home/sysadmin/projects")),
    },
    {
      title: "Port Forwarding",
      why: "Expose a container port to the outside world.",
      text: "Type <code>docker run -d -p 8080:80 nginx</code>",
      objective: "Use -p 8080:80",
      xp: 40,
      check: (c, a) =>
        c === "docker" && a.includes("-p") && a.includes("8080:80"),
    },
    {
      title: "Create Network",
      why: "Create a virtual bridge so containers can talk to each other.",
      text: "Type <code>docker network create my_net</code>",
      objective: "Type docker network create my_net",
      xp: 25,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "create",
    },
    {
      title: "List Networks",
      why: "View Docker's virtual switches.",
      text: "Type <code>docker network ls</code>",
      objective: "Type docker network ls",
      xp: 15,
      check: (c, a) => c === "docker" && a[0] === "network" && a[1] === "ls",
    },
    {
      title: "Attach to Network",
      why: "Connect a running container to a network.",
      text: "Type <code>docker network connect my_net web_server</code>",
      objective: "Type docker network connect",
      xp: 30,
      check: (c, a) =>
        c === "docker" &&
        a[0] === "network" &&
        a[1] === "connect" &&
        a[2] === "my_net",
    },
    {
      title: "Detach from Network",
      why: "Disconnect a container.",
      text: "Type <code>docker network disconnect my_net web_server</code>",
      objective: "Type docker network disconnect",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "disconnect",
    },
    {
      title: "Run on Network",
      why: "Boot a container directly onto a specific network.",
      text: "Type <code>docker run -d --network my_net redis</code>",
      objective: "Use --network my_net",
      xp: 35,
      check: (c, a) =>
        c === "docker" && a.includes("--network") && a.includes("my_net"),
    },
    {
      title: "Inspect Network",
      why: "See which containers are attached to the switch.",
      text: "Type <code>docker network inspect my_net</code>",
      objective: "Type docker network inspect",
      xp: 20,
      check: (c, a) =>
        c === "docker" && a[0] === "network" && a[1] === "inspect",
    },
    {
      title: "Remove Volume",
      why: "Delete a persistent disk.",
      text: "Type <code>docker volume rm db_data</code>",
      objective: "Type docker volume rm",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "volume" && a[1] === "rm",
    },
    {
      title: "Remove Network",
      why: "Delete a virtual switch.",
      text: "Type <code>docker network rm my_net</code>",
      objective: "Type docker network rm",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "network" && a[1] === "rm",
    },
    {
      title: "Check Environment",
      why: "Verify the cleanup.",
      text: "Type <code>docker ps</code>",
      objective: "Type docker ps",
      xp: 10,
      check: (c, a) => c === "docker" && a[0] === "ps",
    },

    // --- PHASE 4: BUILDING IMAGES (DOCKERFILE) (46-55) ---
    {
      title: "Create Dockerfile",
      why: "Initialize the blueprint for your custom image.",
      text: "Type <code>touch Dockerfile</code>",
      objective: "Type touch Dockerfile",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "Dockerfile",
    },
    {
      title: "Define Base Image",
      why: "Write the FROM directive.",
      text: 'Type <code>echo "FROM ubuntu:latest" > Dockerfile</code>',
      objective: "Write FROM directive",
      xp: 25,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("Dockerfile"),
    },
    {
      title: "Define Run Command",
      why: "Tell Docker what to execute during the build.",
      text: 'Type <code>echo "RUN apt-get update" >> Dockerfile</code>',
      objective: "Append RUN directive",
      xp: 25,
      check: (c, a) =>
        c === "echo" && a.includes(">>") && a.includes("Dockerfile"),
    },
    {
      title: "Verify Blueprint",
      why: "Check your Dockerfile logic.",
      text: "Type <code>cat Dockerfile</code>",
      objective: "cat Dockerfile",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "Dockerfile",
    },
    {
      title: "Build the Image",
      why: "Compile the Dockerfile into an actual image tagged as 'myapp'.",
      text: "Type <code>docker build -t myapp .</code>",
      objective: "Type docker build -t myapp .",
      xp: 50,
      check: (c, a) =>
        c === "docker" &&
        a[0] === "build" &&
        a.includes("-t") &&
        a.includes("myapp") &&
        a.includes("."),
    },
    {
      title: "Verify Custom Image",
      why: "Check if 'myapp' appears in your local registry.",
      text: "Type <code>docker images</code>",
      objective: "Type docker images",
      xp: 10,
      check: (c, a) => c === "docker" && a[0] === "images",
    },
    {
      title: "Image History",
      why: "See the layers that make up your image.",
      text: "Type <code>docker history myapp</code>",
      objective: "Type docker history myapp",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "history" && a[1] === "myapp",
    },
    {
      title: "Tag Image",
      why: "Add a version tag (v1.0) to your image.",
      text: "Type <code>docker tag myapp myapp:v1.0</code>",
      objective: "Type docker tag",
      xp: 25,
      check: (c, a) =>
        c === "docker" &&
        a[0] === "tag" &&
        a[1] === "myapp" &&
        a[2] === "myapp:v1.0",
    },
    {
      title: "Save Image to Tar",
      why: "Export an image to a raw file for offline transfer.",
      text: "Type <code>docker save -o myapp.tar myapp</code>",
      objective: "Use docker save -o",
      xp: 35,
      check: (c, a) => c === "docker" && a[0] === "save" && a.includes("-o"),
    },
    {
      title: "Load Image from Tar",
      why: "Import an image from a raw file.",
      text: "Type <code>docker load -i myapp.tar</code>",
      objective: "Use docker load -i",
      xp: 35,
      check: (c, a) => c === "docker" && a[0] === "load" && a.includes("-i"),
    },

    // --- PHASE 5: DOCKER COMPOSE & SYSTEM MAINTENANCE (56-65) ---
    {
      title: "Docker Compose Up",
      why: "Boot a multi-container environment defined in a docker-compose.yml file.",
      text: "Type <code>docker-compose up -d</code>",
      objective: "Type docker-compose up -d",
      xp: 40,
      check: (c, a) =>
        c === "docker-compose" && a[0] === "up" && a.includes("-d"),
    },
    {
      title: "Compose PS",
      why: "List containers managed by docker-compose.",
      text: "Type <code>docker-compose ps</code>",
      objective: "Type docker-compose ps",
      xp: 20,
      check: (c, a) => c === "docker-compose" && a[0] === "ps",
    },
    {
      title: "Compose Logs",
      why: "View aggregated logs from all services.",
      text: "Type <code>docker-compose logs -f</code>",
      objective: "Type docker-compose logs -f",
      xp: 25,
      check: (c, a) =>
        c === "docker-compose" && a[0] === "logs" && a.includes("-f"),
    },
    {
      title: "Compose Scale",
      why: "Instantly deploy 3 identical web server containers.",
      text: "Type <code>docker-compose up -d --scale web=3</code>",
      objective: "Use --scale web=3",
      xp: 45,
      check: (c, a) =>
        c === "docker-compose" && a.includes("up") && a.includes("--scale"),
    },
    {
      title: "Compose Down",
      why: "Tear down the entire environment and its networks.",
      text: "Type <code>docker-compose down</code>",
      objective: "Type docker-compose down",
      xp: 30,
      check: (c, a) => c === "docker-compose" && a[0] === "down",
    },
    {
      title: "System Disk Usage",
      why: "See exactly how much space Docker is hoarding.",
      text: "Type <code>docker system df</code>",
      objective: "Type docker system df",
      xp: 20,
      check: (c, a) => c === "docker" && a[0] === "system" && a[1] === "df",
    },
    {
      title: "Prune Stopped Containers",
      why: "Clean up all containers that aren't running.",
      text: "Type <code>docker container prune -f</code>",
      objective: "Type docker container prune",
      xp: 30,
      check: (c, a) =>
        c === "docker" && a[0] === "container" && a[1] === "prune",
    },
    {
      title: "Prune Dangling Images",
      why: "Delete untagged, leftover build layers.",
      text: "Type <code>docker image prune -f</code>",
      objective: "Type docker image prune",
      xp: 30,
      check: (c, a) => c === "docker" && a[0] === "image" && a[1] === "prune",
    },
    {
      title: "Nuclear Prune",
      why: "Destroy ALL stopped containers, networks, and unused images.",
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
      title: "Container God",
      why: "Module 13 Complete. You command the cloud.",
      text: 'Type <code>echo "Immutable Infrastructure Achieved"</code>',
      objective: "Type echo",
      xp: 50,
      check: (c, a) => c === "echo" && a.some((x) => x.includes("Immutable")),
    },
  ],
};
