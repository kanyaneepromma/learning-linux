// seventeenthmodule.js
// Module 17: Infrastructure as Code & Ansible (65 Lessons)

const module17_ansible = {
  name: "17. Infrastructure as Code (65 Lessons)",
  lessons: [
    // --- PHASE 1: SSH ORCHESTRATION (1-10) ---
    {
      title: "Generate SSH Keys",
      why: "Ansible requires passwordless SSH access to control nodes. Generate an RSA keypair.",
      text: 'Type <code>ssh-keygen -t rsa -b 4096 -N ""</code>',
      objective: "Type ssh-keygen -t rsa",
      xp: 20,
      check: (c, a) =>
        c === "ssh-keygen" && a.includes("-t") && a.includes("rsa"),
    },
    {
      title: "Check Key Output",
      why: "Verify your public and private keys were created.",
      text: "Type <code>ls -l ~/.ssh/</code>",
      objective: "List ~/.ssh directory",
      xp: 10,
      check: (c, a) => c === "ls" && a.some((x) => x.includes(".ssh")),
    },
    {
      title: "Read Public Key",
      why: "This is the lock you will place on the remote servers.",
      text: "Type <code>cat ~/.ssh/id_rsa.pub</code>",
      objective: "Read id_rsa.pub",
      xp: 15,
      check: (c, a) => c === "cat" && a[0].includes("id_rsa.pub"),
    },
    {
      title: "Copy Key to Web1",
      why: "Push your key to the first web server.",
      text: "Type <code>ssh-copy-id root@10.0.0.10</code>",
      objective: "Copy key to 10.0.0.10",
      xp: 25,
      check: (c, a) => c === "ssh-copy-id" && a[0].includes("10.0.0.10"),
    },
    {
      title: "Copy Key to Web2",
      why: "Push your key to the second web server.",
      text: "Type <code>ssh-copy-id root@10.0.0.11</code>",
      objective: "Copy key to 10.0.0.11",
      xp: 25,
      check: (c, a) => c === "ssh-copy-id" && a[0].includes("10.0.0.11"),
    },
    {
      title: "Copy Key to DB1",
      why: "Push your key to the database server.",
      text: "Type <code>ssh-copy-id root@10.0.0.20</code>",
      objective: "Copy key to 10.0.0.20",
      xp: 25,
      check: (c, a) => c === "ssh-copy-id" && a[0].includes("10.0.0.20"),
    },
    {
      title: "Test Passwordless Login",
      why: "Ensure you can connect without a password prompt.",
      text: 'Type <code>ssh root@10.0.0.10 "whoami"</code>',
      objective: "Test SSH command execution",
      xp: 30,
      check: (c, a) =>
        c === "ssh" && a.includes("root@10.0.0.10") && a.includes("whoami"),
    },
    {
      title: "Install Ansible",
      why: "Install the orchestration tool.",
      text: "Type <code>apt install ansible -y</code>",
      objective: "Install ansible",
      xp: 20,
      check: (c, a) =>
        c === "apt" && a.includes("install") && a.includes("ansible"),
    },
    {
      title: "Verify Ansible",
      why: "Check the installed version.",
      text: "Type <code>ansible --version</code>",
      objective: "Type ansible --version",
      xp: 15,
      check: (c, a) => c === "ansible" && a.includes("--version"),
    },
    {
      title: "Create Ansible Dir",
      why: "Create a workspace for your fleet configurations.",
      text: "Type <code>mkdir ~/ansible_fleet && cd ~/ansible_fleet</code>",
      objective: "mkdir and cd",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("mkdir") &&
        raw.includes("cd") &&
        raw.includes("ansible_fleet"),
    },

    // --- PHASE 2: INVENTORY MANAGEMENT (11-20) ---
    {
      title: "Create Inventory File",
      why: "The inventory file tells Ansible what servers exist.",
      text: "Type <code>touch hosts.ini</code>",
      objective: "Type touch hosts.ini",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "hosts.ini",
    },
    {
      title: "Define Web Group",
      why: "Group servers by their purpose.",
      text: 'Type <code>echo "[webservers]" > hosts.ini</code>',
      objective: "Echo [webservers] to hosts.ini",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("[webservers]") &&
        raw.includes("hosts.ini"),
    },
    {
      title: "Add Web Nodes",
      why: "Add the IP addresses to the webservers group.",
      text: 'Type <code>echo -e "10.0.0.10\\n10.0.0.11" >> hosts.ini</code>',
      objective: "Append IPs to hosts",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("10.0.0.10") &&
        raw.includes("hosts.ini"),
    },
    {
      title: "Define DB Group",
      why: "Create the database group.",
      text: 'Type <code>echo "[dbservers]" >> hosts.ini</code>',
      objective: "Append [dbservers]",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("[dbservers]") &&
        raw.includes("hosts.ini"),
    },
    {
      title: "Add DB Nodes",
      why: "Add the database IP.",
      text: 'Type <code>echo "10.0.0.20" >> hosts.ini</code>',
      objective: "Append 10.0.0.20",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("10.0.0.20"),
    },
    {
      title: "Read Inventory",
      why: "Verify your server fleet configuration.",
      text: "Type <code>cat hosts.ini</code>",
      objective: "Read hosts.ini",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "hosts.ini",
    },
    {
      title: "List Hosts",
      why: "Ask Ansible to parse and list all recognized hosts.",
      text: "Type <code>ansible all -i hosts.ini --list-hosts</code>",
      objective: "Type ansible all --list-hosts",
      xp: 30,
      check: (c, a) =>
        c === "ansible" && a.includes("all") && a.includes("--list-hosts"),
    },
    {
      title: "List Web Group",
      why: "List only the webservers.",
      text: "Type <code>ansible webservers -i hosts.ini --list-hosts</code>",
      objective: "List webservers hosts",
      xp: 30,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("webservers") &&
        a.includes("--list-hosts"),
    },
    {
      title: "Set Config File",
      why: "Set the default inventory so you don't need the -i flag every time.",
      text: 'Type <code>echo "[defaults]\\ninventory = hosts.ini" > ansible.cfg</code>',
      objective: "Create ansible.cfg",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("ansible.cfg"),
    },
    {
      title: "Verify Config",
      why: "Check that Ansible defaults are set.",
      text: "Type <code>cat ansible.cfg</code>",
      objective: "Read ansible.cfg",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "ansible.cfg",
    },

    // --- PHASE 3: AD-HOC COMMANDS (21-35) ---
    {
      title: "The God Ping",
      why: "Ping every single server in your fleet simultaneously using the ping module (-m).",
      text: "Type <code>ansible all -m ping</code>",
      objective: "Use ansible all -m ping",
      xp: 30,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("all") &&
        a.includes("-m") &&
        a.includes("ping"),
    },
    {
      title: "Ping Webservers",
      why: "Ping only a specific group.",
      text: "Type <code>ansible webservers -m ping</code>",
      objective: "Ping webservers",
      xp: 20,
      check: (c, a) =>
        c === "ansible" && a.includes("webservers") && a.includes("ping"),
    },
    {
      title: "Ad-Hoc Command",
      why: "Run an arbitrary raw command (-a) across the fleet.",
      text: 'Type <code>ansible all -a "uptime"</code>',
      objective: "Run uptime on all nodes",
      xp: 35,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("all") &&
        a.includes("-a") &&
        a.includes("uptime"),
    },
    {
      title: "Check Fleet Memory",
      why: "Check RAM on all web servers at once.",
      text: 'Type <code>ansible webservers -a "free -m"</code>',
      objective: "Run free -m on webservers",
      xp: 35,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("webservers") &&
        a.includes("-a") &&
        a.some((x) => x.includes("free")),
    },
    {
      title: "Check Disk Space",
      why: "Check storage on the database node.",
      text: 'Type <code>ansible dbservers -a "df -h"</code>',
      objective: "Run df -h on dbservers",
      xp: 35,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("dbservers") &&
        a.some((x) => x.includes("df")),
    },
    {
      title: "Ansible Shell Module",
      why: "Use the shell module to run commands that require pipes or redirects.",
      text: 'Type <code>ansible all -m shell -a "cat /etc/passwd | wc -l"</code>',
      objective: "Use shell module with pipe",
      xp: 45,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("shell") &&
        a.some((x) => x.includes("wc -l")),
    },
    {
      title: "Gather Facts",
      why: "Extract massive JSON hardware/OS details from a node.",
      text: "Type <code>ansible 10.0.0.10 -m setup</code>",
      objective: "Use the setup module",
      xp: 40,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("10.0.0.10") &&
        a.includes("-m") &&
        a.includes("setup"),
    },
    {
      title: "Filter Facts",
      why: "Extract just the IP address configurations.",
      text: 'Type <code>ansible 10.0.0.10 -m setup -a "filter=ansible_default_ipv4"</code>',
      objective: "Filter ansible setup facts",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("setup") &&
        a.some((x) => x.includes("filter=")),
    },
    {
      title: "Install Package (Ad-Hoc)",
      why: "Use the apt module to install curl on all web nodes (-b means become root).",
      text: 'Type <code>ansible webservers -m apt -a "name=curl state=present" -b</code>',
      objective: "Install curl via apt module",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("apt") &&
        a.includes("-b"),
    },
    {
      title: "Remove Package",
      why: "Ensure a package is deleted across the fleet.",
      text: 'Type <code>ansible all -m apt -a "name=telnet state=absent" -b</code>',
      objective: "Remove telnet via apt",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("apt") &&
        a.some((x) => x.includes("absent")),
    },
    {
      title: "Service Status",
      why: "Check if a service is running on multiple nodes.",
      text: 'Type <code>ansible webservers -m service -a "name=nginx state=started" -b</code>',
      objective: "Use the service module",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("service") &&
        a.some((x) => x.includes("nginx")),
    },
    {
      title: "Copy File",
      why: "Push a local file to 100 servers instantly.",
      text: 'Type <code>ansible all -m copy -a "src=hosts.ini dest=/tmp/hosts.bak"</code>',
      objective: "Use the copy module",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("copy") &&
        a.some((x) => x.includes("dest=/tmp")),
    },
    {
      title: "File Permissions",
      why: "Change permissions on the remote file.",
      text: 'Type <code>ansible all -m file -a "path=/tmp/hosts.bak mode=0644"</code>',
      objective: "Use the file module",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("file") &&
        a.some((x) => x.includes("mode=0644")),
    },
    {
      title: "Create Remote User",
      why: "Create a sysadmin user on every database server.",
      text: 'Type <code>ansible dbservers -m user -a "name=dbadmin state=present" -b</code>',
      objective: "Use the user module",
      xp: 50,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("user") &&
        a.some((x) => x.includes("dbadmin")),
    },
    {
      title: "Reboot Fleet",
      why: "The ultimate power trip. Restart all servers safely.",
      text: "Type <code>ansible all -m reboot -b</code>",
      objective: "Use the reboot module",
      xp: 40,
      check: (c, a) =>
        c === "ansible" &&
        a.includes("-m") &&
        a.includes("reboot") &&
        a.includes("-b"),
    },

    // --- PHASE 4: PLAYBOOKS & YAML (36-50) ---
    {
      title: "Create Playbook",
      why: "Ad-hoc is messy. Playbooks let you define infrastructure in YAML.",
      text: "Type <code>touch web.yml</code>",
      objective: "Type touch web.yml",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "web.yml",
    },
    {
      title: "Write YAML Header",
      why: "Define the target hosts and root execution.",
      text: 'Type <code>echo "- hosts: webservers\\n  become: yes\\n  tasks:" > web.yml</code>',
      objective: "Write playbook header",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("tasks:") &&
        raw.includes("web.yml"),
    },
    {
      title: "Add Task: Install Nginx",
      why: "Write the apt task.",
      text: 'Type <code>echo "    - name: Install Nginx\\n      apt: name=nginx state=latest" >> web.yml</code>',
      objective: "Append apt task",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes(">>") &&
        raw.includes("name=nginx"),
    },
    {
      title: "Add Task: Start Nginx",
      why: "Write the service task.",
      text: 'Type <code>echo "    - name: Start Nginx\\n      service: name=nginx state=started" >> web.yml</code>',
      objective: "Append service task",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes(">>") &&
        raw.includes("state=started"),
    },
    {
      title: "Verify Playbook",
      why: "Review your YAML code.",
      text: "Type <code>cat web.yml</code>",
      objective: "Read web.yml",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "web.yml",
    },
    {
      title: "Syntax Check",
      why: "YAML is highly sensitive to spaces. Always check syntax first.",
      text: "Type <code>ansible-playbook web.yml --syntax-check</code>",
      objective: "Syntax check playbook",
      xp: 30,
      check: (c, a) =>
        c === "ansible-playbook" &&
        a.includes("web.yml") &&
        a.includes("--syntax-check"),
    },
    {
      title: "Dry Run (Check Mode)",
      why: "Simulate the playbook without making real changes.",
      text: "Type <code>ansible-playbook web.yml --check</code>",
      objective: "Use --check flag",
      xp: 40,
      check: (c, a) =>
        c === "ansible-playbook" &&
        a.includes("web.yml") &&
        a.includes("--check"),
    },
    {
      title: "Execute Playbook",
      why: "Deploy Nginx to the entire fleet.",
      text: "Type <code>ansible-playbook web.yml</code>",
      objective: "Run the playbook",
      xp: 50,
      check: (c, a) =>
        c === "ansible-playbook" &&
        a.includes("web.yml") &&
        !a.includes("--check"),
    },
    {
      title: "Create DB Playbook",
      why: "Create a playbook for Postgres.",
      text: "Type <code>touch db.yml</code>",
      objective: "Type touch db.yml",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "db.yml",
    },
    {
      title: "Write DB Code",
      why: "Fill out the Postgres task.",
      text: 'Type <code>echo "- hosts: dbservers\\n  tasks:\\n    - apt: name=postgresql" > db.yml</code>',
      objective: "Write DB playbook",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("postgresql") &&
        raw.includes("db.yml"),
    },
    {
      title: "Execute DB Playbook",
      why: "Deploy the database.",
      text: "Type <code>ansible-playbook db.yml</code>",
      objective: "Run db.yml",
      xp: 40,
      check: (c, a) => c === "ansible-playbook" && a.includes("db.yml"),
    },
    {
      title: "Limit Execution",
      why: "Run the playbook ONLY on a specific server within a group (-l).",
      text: "Type <code>ansible-playbook web.yml -l 10.0.0.11</code>",
      objective: "Use -l to limit hosts",
      xp: 40,
      check: (c, a) =>
        c === "ansible-playbook" && a.includes("-l") && a.includes("10.0.0.11"),
    },
    {
      title: "Playbook Verbosity",
      why: "Get deep debugging information on failure (-vvv).",
      text: "Type <code>ansible-playbook web.yml -vvv</code>",
      objective: "Run with -vvv",
      xp: 35,
      check: (c, a) => c === "ansible-playbook" && a.includes("-vvv"),
    },
    {
      title: "List Tasks",
      why: "Preview what tasks a playbook contains without running it.",
      text: "Type <code>ansible-playbook web.yml --list-tasks</code>",
      objective: "Use --list-tasks",
      xp: 30,
      check: (c, a) => c === "ansible-playbook" && a.includes("--list-tasks"),
    },
    {
      title: "List Target Hosts",
      why: "Preview which servers will be affected by a playbook.",
      text: "Type <code>ansible-playbook web.yml --list-hosts</code>",
      objective: "Use --list-hosts",
      xp: 30,
      check: (c, a) => c === "ansible-playbook" && a.includes("--list-hosts"),
    },

    // --- PHASE 5: ROLES, GALAXY & MAGIC (51-65) ---
    {
      title: "Ansible Galaxy",
      why: "Ansible Galaxy is an open-source hub for pre-built roles.",
      text: "Type <code>ansible-galaxy search nginx</code>",
      objective: "Search ansible-galaxy",
      xp: 30,
      check: (c, a) =>
        c === "ansible-galaxy" && a.includes("search") && a.includes("nginx"),
    },
    {
      title: "Install Galaxy Role",
      why: "Download a community-built Nginx role.",
      text: "Type <code>ansible-galaxy install geerlingguy.nginx</code>",
      objective: "Install a galaxy role",
      xp: 40,
      check: (c, a) =>
        c === "ansible-galaxy" &&
        a.includes("install") &&
        a.includes("geerlingguy.nginx"),
    },
    {
      title: "List Installed Roles",
      why: "Check your local roles path.",
      text: "Type <code>ansible-galaxy list</code>",
      objective: "List galaxy roles",
      xp: 20,
      check: (c, a) => c === "ansible-galaxy" && a.includes("list"),
    },
    {
      title: "Create Custom Role",
      why: "Initialize a blank scaffolding for your own complex role.",
      text: "Type <code>ansible-galaxy init my_custom_role</code>",
      objective: "Init a custom role",
      xp: 40,
      check: (c, a) =>
        c === "ansible-galaxy" &&
        a.includes("init") &&
        a.includes("my_custom_role"),
    },
    {
      title: "View Role Structure",
      why: "Look at the massive folder tree Ansible generated for you.",
      text: "Type <code>ls -l my_custom_role/</code>",
      objective: "List role directory",
      xp: 15,
      check: (c, a) =>
        c === "ls" && a.some((x) => x.includes("my_custom_role")),
    },
    {
      title: "Ansible Vault Init",
      why: "Encrypt a file containing API keys or passwords.",
      text: "Type <code>ansible-vault create secrets.yml</code>",
      objective: "Create an encrypted vault",
      xp: 45,
      check: (c, a) =>
        c === "ansible-vault" &&
        a.includes("create") &&
        a.includes("secrets.yml"),
    },
    {
      title: "Edit Vault",
      why: "Modify an encrypted file.",
      text: "Type <code>ansible-vault edit secrets.yml</code>",
      objective: "Edit the vault",
      xp: 40,
      check: (c, a) =>
        c === "ansible-vault" &&
        a.includes("edit") &&
        a.includes("secrets.yml"),
    },
    {
      title: "View Vault",
      why: "Read an encrypted file (will prompt for password).",
      text: "Type <code>ansible-vault view secrets.yml</code>",
      objective: "View the vault",
      xp: 35,
      check: (c, a) => c === "ansible-vault" && a.includes("view"),
    },
    {
      title: "Run with Vault",
      why: "Tell the playbook to ask you for the vault password at runtime.",
      text: "Type <code>ansible-playbook web.yml --ask-vault-pass</code>",
      objective: "Run with --ask-vault-pass",
      xp: 45,
      check: (c, a) =>
        c === "ansible-playbook" && a.includes("--ask-vault-pass"),
    },
    {
      title: "Ansible Pull",
      why: "Invert the architecture: Have nodes pull configs from a git repo instead of pushing from a master.",
      text: "Type <code>ansible-pull -U https://github.com/repo.git</code>",
      objective: "Use ansible-pull",
      xp: 50,
      check: (c, a) =>
        c === "ansible-pull" &&
        a.includes("-U") &&
        a.some((x) => x.includes("github.com")),
    },
    {
      title: "Ansible Lint",
      why: "Lint your playbook to ensure perfect YAML formatting.",
      text: "Type <code>ansible-lint web.yml</code>",
      objective: "Run ansible-lint",
      xp: 35,
      check: (c, a) => c === "ansible-lint" && a.includes("web.yml"),
    },
    {
      title: "Check Ansible Doc",
      why: "Read offline documentation for the 'file' module.",
      text: "Type <code>ansible-doc file</code>",
      objective: "Type ansible-doc file",
      xp: 20,
      check: (c, a) => c === "ansible-doc" && a[0] === "file",
    },
    {
      title: "Ansible Console",
      why: "Open an interactive REPL terminal connected directly to your fleet.",
      text: "Type <code>ansible-console</code>",
      objective: "Type ansible-console",
      xp: 35,
      check: (c) => c === "ansible-console",
    },
    {
      title: "Final Cleanup",
      why: "Wipe your workspace.",
      text: "Type <code>rm -rf ~/ansible_fleet</code>",
      objective: "Delete ansible_fleet",
      xp: 15,
      check: (c, a) =>
        c === "rm" &&
        a.includes("-rf") &&
        a.some((x) => x.includes("ansible_fleet")),
    },
    {
      title: "Fleet Commander",
      why: "Module 17 Complete. You control the swarm.",
      text: 'Type <code>echo "Infrastructure is now Code"</code>',
      objective: "Type echo",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Infrastructure"),
    },
  ],
};
