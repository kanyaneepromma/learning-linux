// seventeenthmodule.js
// Module 17: Infrastructure as Code & Ansible (65 Lessons)

const module17_ansible = {
  name: "17. Infrastructure as Code (65 Lessons)",
  lessons: [
    // --- PHASE 1: SSH ORCHESTRATION & INVENTORY (1-15) ---
    {
      title: "Generate SSH Keys",
      why: "Ansible is 'Agentless'. It doesn't require software installed on target servers; it orchestrates infrastructure purely over the SSH protocol. We must first generate an RSA cryptographic keypair for passwordless authentication.",
      text: 'Type <code>ssh-keygen -t rsa -b 4096 -N ""</code>',
      objective: "Type ssh-keygen -t rsa",
      xp: 20,
      check: (c, a) =>
        c === "ssh-keygen" && a.includes("-t") && a.includes("rsa"),
    },
    {
      title: "Check Key Output",
      why: "Verify the kernel successfully wrote the `id_rsa` (private) and `id_rsa.pub` (public) keys to your local `.ssh` directory.",
      text: "Type <code>ls -l ~/.ssh/</code>",
      objective: "List ~/.ssh directory",
      xp: 10,
      check: (c, a) => c === "ls" && a.some((x) => x.includes(".ssh")),
    },
    {
      title: "Read Public Key",
      why: "The public key is the 'lock' you will distribute to your fleet. Anyone holding the private key can open this lock mathematically.",
      text: "Type <code>cat ~/.ssh/id_rsa.pub</code>",
      objective: "Read id_rsa.pub",
      xp: 15,
      check: (c, a) => c === "cat" && a[0].includes("id_rsa.pub"),
    },
    {
      title: "Simulate Key Copy",
      why: "In reality, you use `ssh-copy-id` to push your public key into the `authorized_keys` file of your target servers. We simulate this fleet authorization.",
      text: 'Type <code>echo "Keys Distributed"</code>',
      objective: "Simulate key distribution",
      xp: 10,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Keys"),
    },
    {
      title: "Create Workspace",
      why: "Infrastructure as Code (IaC) requires strict organization. Create a dedicated directory to house your YAML blueprints and fleet inventories.",
      text: "Type <code>mkdir ~/ansible_fleet && cd ~/ansible_fleet</code>",
      objective: "Create and enter ansible_fleet",
      xp: 15,
      check: (c, a, o, raw) =>
        raw.includes("mkdir") &&
        raw.includes("ansible_fleet") &&
        raw.includes("cd"),
    },
    {
      title: "Create Inventory File",
      why: "The Inventory file defines your network topology. It categorizes hundreds of IP addresses into logical groups (like [web] or [db]) so Ansible knows exactly where to route its SSH multiplexed connections.",
      text: "Type <code>touch hosts.ini</code>",
      objective: "Create hosts.ini",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "hosts.ini",
    },
    {
      title: "Define Web Group",
      why: "Using INI format, we create a logical `[webservers]` group and assign two IP addresses to it. Ansible will parse this and target these nodes in parallel.",
      text: 'Type <code>echo -e "[webservers]\\n10.0.0.10\\n10.0.0.11" > hosts.ini</code>',
      objective: "Populate hosts.ini",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("[webservers]") &&
        raw.includes(">"),
    },
    {
      title: "Define DB Group",
      why: "Append a `[databases]` group to the inventory architecture.",
      text: 'Type <code>echo -e "\\n[databases]\\n10.0.0.20" >> hosts.ini</code>',
      objective: "Append databases to hosts.ini",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("[databases]") &&
        raw.includes(">>"),
    },
    {
      title: "View Topology",
      why: "Verify the structural layout of your cluster map.",
      text: "Type <code>cat hosts.ini</code>",
      objective: "Read hosts.ini",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "hosts.ini",
    },
    {
      title: "Ansible Ping Fleet",
      why: "The `ping` module is not ICMP. It initiates full SSH cryptographic handshakes with every server in the inventory (`all`), uploads a tiny Python script to their RAM, executes it to verify Python is installed, and returns 'pong'.",
      text: "Type <code>ansible all -i hosts.ini -m ping</code>",
      objective: "Ping the entire fleet",
      xp: 40,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("all") &&
        a.includes("-m") &&
        a.includes("ping"),
    },
    {
      title: "Ping Specific Group",
      why: "Limit the execution scope. Instruct Ansible to only negotiate connections with servers logically bound to the `webservers` array.",
      text: "Type <code>ansible webservers -i hosts.ini -m ping</code>",
      objective: "Ping only webservers",
      xp: 30,
      check: (c, a) =>
        c === "ansible" && a.includes("webservers") && a.includes("ping"),
    },
    {
      title: "Ansible Setup Module",
      why: "The `setup` module initiates 'Fact Gathering'. It interrogates the target's kernel, extracting its exact OS version, RAM capacity, and CPU architecture into a massive JSON object for dynamic logic evaluation.",
      text: "Type <code>ansible webservers -i hosts.ini -m setup</code>",
      objective: "Run setup module",
      xp: 40,
      check: (c, a) =>
        c === "ansible" && a.includes("-m") && a.includes("setup"),
    },
    {
      title: "Filter Facts",
      why: "The raw JSON array from `setup` is massive. The `-a` (Arguments) flag passes a strict filter to the module, isolating only the network IPv4 routing interfaces.",
      text: 'Type <code>ansible webservers -i hosts.ini -m setup -a "filter=ansible_default_ipv4"</code>',
      objective: "Filter setup facts",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("ansible") &&
        raw.includes("setup") &&
        raw.includes("filter="),
    },
    {
      title: "Configure Ansible Defaults",
      why: "Passing `-i hosts.ini` every time is tedious. Create an `ansible.cfg` file to permanently map your local directory to the inventory file.",
      text: 'Type <code>echo -e "[defaults]\\ninventory = hosts.ini" > ansible.cfg</code>',
      objective: "Create ansible.cfg",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("inventory") &&
        raw.includes("ansible.cfg"),
    },
    {
      title: "Ping Without Flags",
      why: "Verify that the local configuration file successfully overrides the default Ansible engine settings.",
      text: "Type <code>ansible all -m ping</code>",
      objective: "Ping without -i flag",
      xp: 20,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("all") &&
        a.includes("ping") &&
        !a.includes("-i"),
    },

    // --- PHASE 2: AD-HOC COMMANDS (16-30) ---
    {
      title: "Ad-Hoc Shell",
      why: "The `shell` module bypasses complex Python wrappers and pushes raw bash strings directly into the remote server's terminal.",
      text: 'Type <code>ansible all -m shell -a "uptime"</code>',
      objective: "Run uptime on fleet",
      xp: 35,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("shell") && raw.includes("uptime"),
    },
    {
      title: "Check Disk Space",
      why: "Orchestrate a parallel execution of `df -h` to instantly locate storage bottlenecks across 10,000 servers simultaneously.",
      text: 'Type <code>ansible databases -m shell -a "df -h"</code>',
      objective: "Run df -h on databases",
      xp: 35,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("databases") && raw.includes("df -h"),
    },
    {
      title: "Elevate Privileges",
      why: "Standard SSH connects as a normal user. The `-b` (Become) flag leverages `sudo` to mathematically escalate the execution process to root before running the command.",
      text: 'Type <code>ansible all -b -m shell -a "whoami"</code>',
      objective: "Use -b for privilege escalation",
      xp: 40,
      check: (c, a, o, raw) =>
        c === "ansible" && a.includes("-b") && raw.includes("whoami"),
    },
    {
      title: "Apt Module",
      why: "Instead of running raw `apt install` bash commands, Ansible uses the `apt` module. This provides Idempotency—it checks if the software is already installed before attempting to download it, saving CPU cycles.",
      text: 'Type <code>ansible webservers -b -m apt -a "name=nginx state=present"</code>',
      objective: "Install nginx via apt module",
      xp: 45,
      check: (c, a, o, raw) =>
        c === "ansible" &&
        raw.includes("apt") &&
        raw.includes("nginx") &&
        raw.includes("present"),
    },
    {
      title: "Service Module",
      why: "The `service` module interacts with the remote systemd daemon, guaranteeing that the targeted process is not only running, but enabled to survive server reboots.",
      text: 'Type <code>ansible webservers -b -m service -a "name=nginx state=started enabled=yes"</code>',
      objective: "Ensure nginx is started",
      xp: 45,
      check: (c, a, o, raw) =>
        c === "ansible" &&
        raw.includes("service") &&
        raw.includes("nginx") &&
        raw.includes("started"),
    },
    {
      title: "User Module",
      why: "Orchestrate fleet-wide account generation. The `user` module safely modifies the `/etc/passwd` file across the cluster without locking the database.",
      text: 'Type <code>ansible all -b -m user -a "name=deployer state=present"</code>',
      objective: "Create user via module",
      xp: 45,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("user") && raw.includes("deployer"),
    },
    {
      title: "Copy Module",
      why: "The `copy` module streams file byte data from your local Control Node securely across the SSH tunnel, dropping the payload perfectly into the remote Node's filesystem.",
      text: 'Type <code>ansible webservers -b -m copy -a "src=hosts.ini dest=/tmp/hosts.bak"</code>',
      objective: "Copy file to fleet",
      xp: 50,
      check: (c, a, o, raw) =>
        c === "ansible" &&
        raw.includes("copy") &&
        raw.includes("src=") &&
        raw.includes("dest="),
    },
    {
      title: "File Module (Directory)",
      why: "The `file` module ensures filesystem states. Setting `state=directory` ensures the folder exists, creating it if necessary (like `mkdir -p`), with perfect idempotency.",
      text: 'Type <code>ansible databases -b -m file -a "path=/opt/data state=directory"</code>',
      objective: "Ensure directory exists",
      xp: 45,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("file") && raw.includes("directory"),
    },
    {
      title: "File Module (Permissions)",
      why: "Mass-update metadata. This instantly enforces 755 (Read/Write/Execute for Owner only) permissions on the target directory across the cluster.",
      text: 'Type <code>ansible databases -b -m file -a "path=/opt/data mode=0755"</code>',
      objective: "Update directory permissions",
      xp: 45,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("file") && raw.includes("mode=0755"),
    },
    {
      title: "Cron Module",
      why: "Automate automation. The `cron` module safely parses and modifies the remote system's scheduling daemon without breaking existing scheduled tasks.",
      text: "Type <code>ansible all -b -m cron -a \"name='backup' minute='0' hour='2' job='/opt/backup.sh'\"</code>",
      objective: "Create cronjob via module",
      xp: 50,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("cron") && raw.includes("backup"),
    },
    {
      title: "Lineinfile Module",
      why: "The `lineinfile` module is a surgical scalpel. Instead of replacing a whole file, it uses Regex to find a specific line (like an SSH config) and modifies only that line.",
      text: "Type <code>ansible all -b -m lineinfile -a \"path=/etc/ssh/sshd_config regexp='^PermitRootLogin' line='PermitRootLogin no'\"</code>",
      objective: "Edit sshd_config safely",
      xp: 60,
      check: (c, a, o, raw) =>
        c === "ansible" &&
        raw.includes("lineinfile") &&
        raw.includes("PermitRootLogin"),
    },
    {
      title: "Restart SSH Daemon",
      why: "Because we edited the SSH configuration, we must remotely send a SIGHUP to the sshd process across the fleet to load the security hardening.",
      text: 'Type <code>ansible all -b -m service -a "name=sshd state=restarted"</code>',
      objective: "Restart SSH",
      xp: 45,
      check: (c, a, o, raw) =>
        c === "ansible" &&
        raw.includes("service") &&
        raw.includes("sshd") &&
        raw.includes("restarted"),
    },
    {
      title: "Command Module",
      why: "Unlike `shell`, the `command` module skips the remote bash interpreter. It talks directly to the kernel to execute binaries. It is safer, but prevents you from using pipes (|) or redirects (>).",
      text: 'Type <code>ansible all -m command -a "hostname"</code>',
      objective: "Run basic command module",
      xp: 35,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("command") && raw.includes("hostname"),
    },
    {
      title: "Ad-Hoc Dry Run",
      why: "The `-C` (Check) flag runs a simulated dry-run. Ansible calculates the exact mathematical changes it *would* make to the filesystem, without actually changing anything.",
      text: 'Type <code>ansible all -C -m command -a "uptime"</code>',
      objective: "Dry run an ad-hoc command",
      xp: 30,
      check: (c, a) => c === "ansible" && a.includes("-C"),
    },
    {
      title: "Git Module",
      why: "The `git` module natively orchestrates version control. It executes secure clones and pulls over the network, ensuring the target servers always host the latest commit hashes.",
      text: 'Type <code>ansible webservers -b -m git -a "repo=https://github.com/sim/app.git dest=/var/www/app"</code>',
      objective: "Clone repo via git module",
      xp: 50,
      check: (c, a, o, raw) =>
        c === "ansible" && raw.includes("git") && raw.includes("dest="),
    },

    // --- PHASE 3: PLAYBOOKS & YAML (31-45) ---
    {
      title: "Create Playbook",
      why: "Ad-Hoc commands are manual. A **Playbook** is a YAML blueprint that chains multiple modules into a strict, reproducible Directed Acyclic Graph (DAG) of execution.",
      text: "Type <code>touch deploy.yml</code>",
      objective: "Create deploy.yml",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "deploy.yml",
    },
    {
      title: "Define Play Structure",
      why: "YAML is highly structure-dependent. The `hosts:` directive maps the DAG to the inventory block, and `become: true` enforces root escalation across the entire play.",
      text: 'Type <code>echo -e "- hosts: webservers\\n  become: true\\n  tasks:" > deploy.yml</code>',
      objective: "Start playbook yaml",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("become: true") &&
        raw.includes("deploy.yml"),
    },
    {
      title: "Add Task: Install",
      why: "Append the first task node to the DAG. This defines the exact desired state of the Nginx package.",
      text: 'Type <code>echo -e "    - name: Install Nginx\\n      apt: name=nginx state=latest" >> deploy.yml</code>',
      objective: "Add apt task",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("apt:") && raw.includes(">>"),
    },
    {
      title: "Add Task: Service",
      why: "Append the second task node. Playbooks are executed synchronously from top to bottom, guaranteeing the software is installed before the daemon starts.",
      text: 'Type <code>echo -e "    - name: Start Nginx\\n      service: name=nginx state=started" >> deploy.yml</code>',
      objective: "Add service task",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("service:") && raw.includes(">>"),
    },
    {
      title: "View Playbook",
      why: "Examine the whitespace and structural indentations of your Infrastructure-as-Code blueprint.",
      text: "Type <code>cat deploy.yml</code>",
      objective: "Read deploy.yml",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "deploy.yml",
    },
    {
      title: "Check Syntax",
      why: "Before executing a cluster-wide playbook, `--syntax-check` parses the YAML structure locally to prevent critical compilation failures halfway through a deployment.",
      text: "Type <code>ansible-playbook --syntax-check deploy.yml</code>",
      objective: "Syntax check playbook",
      xp: 30,
      check: (c, a) =>
        c === "ansible-playbook" &&
        a.includes("--syntax-check") &&
        a.includes("deploy.yml"),
    },
    {
      title: "Execute Playbook",
      why: "The <b>ansible-playbook</b> binary compiles the YAML graph into JSON instructions, multiplexes the SSH connections, and pushes the execution to the fleet in parallel.",
      text: "Type <code>ansible-playbook deploy.yml</code>",
      objective: "Run the playbook",
      xp: 50,
      check: (c, a) => c === "ansible-playbook" && a[0] === "deploy.yml",
    },
    {
      title: "Playbook Dry Run",
      why: "The `--check` flag computes the Delta differences between the Playbook and the current reality of the fleet, returning a simulated output of what *would* be changed.",
      text: "Type <code>ansible-playbook --check deploy.yml</code>",
      objective: "Dry run playbook",
      xp: 35,
      check: (c, a) =>
        c === "ansible-playbook" &&
        a.includes("--check") &&
        a.includes("deploy.yml"),
    },
    {
      title: "Playbook Diff",
      why: "The `--diff` flag mathematically outputs the exact line-by-line file changes Ansible is going to make on the remote servers, similar to `git diff`.",
      text: "Type <code>ansible-playbook --check --diff deploy.yml</code>",
      objective: "Diff the playbook",
      xp: 40,
      check: (c, a) => c === "ansible-playbook" && a.includes("--diff"),
    },
    {
      title: "Limit Execution",
      why: "You wrote a playbook for the whole `webservers` group, but you only want to test it on one server. The `-l` (Limit) flag overrides the YAML hosts directive.",
      text: "Type <code>ansible-playbook -l 10.0.0.10 deploy.yml</code>",
      objective: "Limit execution to one IP",
      xp: 35,
      check: (c, a) =>
        c === "ansible-playbook" && a.includes("-l") && a.includes("10.0.0.10"),
    },
    {
      title: "Step Execution",
      why: "The `--step` flag turns on interactive debugging, pausing the SSH execution engine before every single task and asking you for permission to proceed.",
      text: "Type <code>ansible-playbook --step deploy.yml</code>",
      objective: "Step through playbook",
      xp: 30,
      check: (c, a) => c === "ansible-playbook" && a.includes("--step"),
    },
    {
      title: "Start at Task",
      why: "If a massive playbook crashed on step 45, you don't want to rerun steps 1-44. `--start-at-task` tells the engine to jump directly to a specific node in the DAG.",
      text: 'Type <code>ansible-playbook --start-at-task=\"Start Nginx\" deploy.yml</code>',
      objective: "Start at specific task",
      xp: 40,
      check: (c, a, o, raw) =>
        c === "ansible-playbook" && raw.includes("--start-at-task"),
    },
    {
      title: "List Tasks",
      why: "Without running anything, ask Ansible to parse the YAML structure and return a flat textual list of all executing nodes.",
      text: "Type <code>ansible-playbook --list-tasks deploy.yml</code>",
      objective: "List all tasks",
      xp: 25,
      check: (c, a) => c === "ansible-playbook" && a.includes("--list-tasks"),
    },
    {
      title: "List Hosts",
      why: "Verify the dynamic inventory compilation to see exactly which IP addresses are targeted by the playbook logic.",
      text: "Type <code>ansible-playbook --list-hosts deploy.yml</code>",
      objective: "List targeted hosts",
      xp: 25,
      check: (c, a) => c === "ansible-playbook" && a.includes("--list-hosts"),
    },
    {
      title: "Verbose Playbook",
      why: "If a task fails silently, use `-vvv` to increase the verbosity output, forcing Ansible to dump the raw JSON return payloads from the target machines to your screen.",
      text: "Type <code>ansible-playbook -vvv deploy.yml</code>",
      objective: "Run playbook verbosely",
      xp: 30,
      check: (c, a) => c === "ansible-playbook" && a.includes("-vvv"),
    },

    // --- PHASE 4: VAULTS, ROLES & GALAXY (46-55) ---
    {
      title: "Create Vault",
      why: "You cannot store database passwords in plain text YAML. **Ansible Vault** encrypts the file using AES-256 cryptography, prompting you to set a master encryption password.",
      text: "Type <code>ansible-vault create secrets.yml</code>",
      objective: "Create an encrypted vault",
      xp: 30,
      check: (c, a) =>
        c === "ansible-vault" && a[0] === "create" && a[1] === "secrets.yml",
    },
    {
      title: "View Vault Data",
      why: "Standard `cat` will just return binary gibberish. The `view` command prompts for the AES password and decrypts the contents safely into your terminal RAM without touching the disk.",
      text: "Type <code>ansible-vault view secrets.yml</code>",
      objective: "View vault contents",
      xp: 25,
      check: (c, a) => c === "ansible-vault" && a[0] === "view",
    },
    {
      title: "Edit Vault",
      why: "The `edit` command decrypts the file, opens it in your default text editor, and then automatically re-encrypts the new contents when you save and close.",
      text: "Type <code>ansible-vault edit secrets.yml</code>",
      objective: "Edit the vault",
      xp: 30,
      check: (c, a) => c === "ansible-vault" && a[0] === "edit",
    },
    {
      title: "Encrypt Existing File",
      why: "You realized a legacy file contains plaintext secrets. `encrypt` takes the existing file and hashes its data into an AES-256 block immediately.",
      text: "Type <code>ansible-vault encrypt hosts.ini</code>",
      objective: "Encrypt hosts.ini",
      xp: 30,
      check: (c, a) =>
        c === "ansible-vault" && a[0] === "encrypt" && a[1] === "hosts.ini",
    },
    {
      title: "Decrypt File",
      why: "Reverse the operation, permanently stripping the cryptographic shell and returning the file to standard plaintext.",
      text: "Type <code>ansible-vault decrypt hosts.ini</code>",
      objective: "Decrypt hosts.ini",
      xp: 30,
      check: (c, a) => c === "ansible-vault" && a[0] === "decrypt",
    },
    {
      title: "Run Playbook with Vault",
      why: "If a playbook requires secrets from the vault, you must pass `--ask-vault-pass` so the engine knows to securely prompt you for the master decryption key before executing the DAG.",
      text: "Type <code>ansible-playbook --ask-vault-pass deploy.yml</code>",
      objective: "Run with vault password prompt",
      xp: 40,
      check: (c, a) =>
        c === "ansible-playbook" && a.includes("--ask-vault-pass"),
    },
    {
      title: "Ansible Galaxy Init",
      why: "Playbooks get messy. **Roles** break playbooks into highly structured, modular directories (tasks, handlers, vars). `ansible-galaxy init` generates this exact skeleton folder architecture.",
      text: "Type <code>ansible-galaxy init web_role</code>",
      objective: "Create web_role skeleton",
      xp: 35,
      check: (c, a) =>
        c === "ansible-galaxy" && a[0] === "init" && a[1] === "web_role",
    },
    {
      title: "List Role Structure",
      why: "Use `ls` to visually examine the modular directory architecture generated by the Galaxy engine.",
      text: "Type <code>ls -la web_role/</code>",
      objective: "List the role directory",
      xp: 15,
      check: (c, a) => c === "ls" && a[0] === "web_role/",
    },
    {
      title: "Download Remote Role",
      why: "Ansible Galaxy is also a public hub. The `install` command fetches a pre-built, community-vetted Role (like a secure Nginx configuration) directly into your local workspace.",
      text: "Type <code>ansible-galaxy install geerlingguy.nginx</code>",
      objective: "Download a community role",
      xp: 40,
      check: (c, a) =>
        c === "ansible-galaxy" && a[0] === "install" && a[1].includes("nginx"),
    },
    {
      title: "List Installed Roles",
      why: "Query the local dependency tree to view all community roles currently imported into your execution environment.",
      text: "Type <code>ansible-galaxy list</code>",
      objective: "List installed roles",
      xp: 20,
      check: (c, a) => c === "ansible-galaxy" && a[0] === "list",
    },

    // --- PHASE 5: LINTING, TAGS & ADVANCED EXECUTION (56-65) ---
    {
      title: "Tag Execution",
      why: "You can assign arbitrary string `tags` to specific tasks in YAML. Passing `--tags` tells the engine to completely ignore the normal top-to-bottom sequence and ONLY run tasks matching your specified tag.",
      text: 'Type <code>ansible-playbook --tags "web" deploy.yml</code>',
      objective: "Run specific tags",
      xp: 35,
      check: (c, a) => c === "ansible-playbook" && a.includes("--tags"),
    },
    {
      title: "Skip Tags",
      why: "Conversely, `--skip-tags` executes the entire playbook sequence but drops any task node matching the specified tag, acting as an execution blacklist.",
      text: 'Type <code>ansible-playbook --skip-tags "db" deploy.yml</code>',
      objective: "Skip specific tags",
      xp: 35,
      check: (c, a) => c === "ansible-playbook" && a.includes("--skip-tags"),
    },
    {
      title: "Ansible Pull",
      why: "Standard Ansible is 'Push' architecture. `ansible-pull` flips this, commanding the remote server to pull a playbook from a Git repository and execute it locally. This is used for massive autoscaling clusters.",
      text: "Type <code>ansible-pull -U https://github.com/sim/playbooks.git</code>",
      objective: "Run ansible-pull",
      xp: 50,
      check: (c, a) =>
        c === "ansible-pull" &&
        a.includes("-U") &&
        a.some((x) => x.includes("github.com")),
    },
    {
      title: "Ansible Lint",
      why: "YAML spacing is strictly enforced. `ansible-lint` acts as a static analysis compiler, parsing the blueprint to detect syntax flaws, deprecation warnings, and best-practice violations before execution.",
      text: "Type <code>ansible-lint deploy.yml</code>",
      objective: "Run ansible-lint",
      xp: 35,
      check: (c, a) => c === "ansible-lint" && a.includes("deploy.yml"),
    },
    {
      title: "Check Ansible Doc",
      why: "Ansible operates via hundreds of Python modules. `ansible-doc` reads the offline library manuals, returning the exact parameters required to correctly format the module in YAML.",
      text: "Type <code>ansible-doc file</code>",
      objective: "Type ansible-doc file",
      xp: 20,
      check: (c, a) => c === "ansible-doc" && a[0] === "file",
    },
    {
      title: "Ansible Console",
      why: "The `ansible-console` binary drops you into an interactive REPL loop, maintaining a constant SSH multiplexed connection to the fleet for rapid, real-time command orchestration.",
      text: "Type <code>ansible-console</code>",
      objective: "Type ansible-console",
      xp: 35,
      check: (c) => c === "ansible-console",
    },
    {
      title: "List Inventory Graph",
      why: "The `ansible-inventory` binary compiles your host files and renders the entire nested group topology as a visual JSON or ASCII graph.",
      text: "Type <code>ansible-inventory --graph</code>",
      objective: "View the inventory graph",
      xp: 25,
      check: (c, a) => c === "ansible-inventory" && a.includes("--graph"),
    },
    {
      title: "Final Cleanup",
      why: "Eradicate the working directory, permanently destroying the unencrypted inventory data and YAML blueprints.",
      text: "Type <code>rm -rf ~/ansible_fleet</code>",
      objective: "Delete ansible_fleet",
      xp: 15,
      check: (c, a) =>
        c === "rm" &&
        a.includes("-rf") &&
        a.some((x) => x.includes("ansible_fleet")),
    },
    {
      title: "Verify Deletion",
      why: "Confirm the environment has been returned to its baseline state.",
      text: "Type <code>ls -la ~/</code>",
      objective: "Verify deletion",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-la"),
    },
    {
      title: "Automation Master",
      why: "You understand SSH Multiplexing, Idempotency, YAML Task execution, AES-256 Vault Encryption, and Fleet Topologies. You are ready to orchestrate.",
      text: 'Type <code>echo "Ansible Master Complete"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Master"),
    },
  ],
};
