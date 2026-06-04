// seventhmodule.js
// Module 7: Advanced Defensive Ops (Blue Team) - 65 Lessons

const module7_blueteam = {
  name: "7. Advanced Defensive Ops (65 Lessons)",
  lessons: [
    // --- PHASE 1: INITIAL TRIAGE & USER AUDITING (1-15) ---
    {
      title: "Active Users",
      why: "Incident Response begins with triage. Are you currently sharing this server with an attacker? The <b>w</b> command queries the <code>/var/run/utmp</code> file to show all active TTY/PTY terminal sessions, revealing who is logged in and what command they are currently executing.",
      text: "Type <code>w</code>",
      objective: "Type w",
      xp: 10,
      check: (c) => c === "w",
    },
    {
      title: "User Details",
      why: "The <b>who</b> command parses the exact same utmp file, but strips out the CPU load and active command data. Blue Teamers often use this in automated bash scripts to quickly parse raw active IP addresses.",
      text: "Type <code>who</code>",
      objective: "Type who",
      xp: 10,
      check: (c) => c === "who",
    },
    {
      title: "Login History",
      why: "If the attacker is currently offline, you must check the historical logs. The <b>last</b> command reads the binary <code>/var/log/wtmp</code> file, translating the raw hex data into a readable chronological list of every successful SSH login and system reboot.",
      text: "Type <code>last</code>",
      objective: "Type last",
      xp: 15,
      check: (c) => c === "last",
    },
    {
      title: "Limit History",
      why: "During a high-stress incident, flooding your terminal with thousands of historical logins hides critical data. The <b>-n 5</b> flag slices the output, showing you only the 5 most recent logins to quickly identify the breach window.",
      text: "Type <code>last -n 5</code>",
      objective: "Use last -n 5",
      xp: 20,
      check: (c, a) => c === "last" && a.includes("-n") && a.includes("5"),
    },
    {
      title: "Check Root User",
      why: "Attackers often create hidden 'backdoor' accounts and assign them a User ID (UID) of 0, making them invisible root equivalents. Filtering the <code>/etc/passwd</code> file for 'root' exposes any rogue accounts sharing God-mode privileges.",
      text: 'Type <code>grep "root" /etc/passwd</code>',
      objective: "Grep for root in passwd",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("root") &&
        raw.includes("/etc/passwd"),
    },
    {
      title: "Check Active Shells",
      why: "Service accounts (like 'www-data' or 'mysql') should never be able to log in interactively. By grepping for <b>sh$</b>, you filter the user database to show ONLY accounts that have a valid bash or sh terminal assigned to them.",
      text: 'Type <code>grep "sh$" /etc/passwd</code>',
      objective: "Grep for active shells",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("sh") &&
        raw.includes("/etc/passwd"),
    },
    {
      title: "Audit Failed Logins",
      why: "Before an attacker breaches a system, they usually brute-force it. The <b>/var/log/auth.log</b> records all PAM (Pluggable Authentication Modules) events. Filtering for 'Failed' reveals the attacker's IP address and the usernames they targeted.",
      text: 'Type <code>grep "Failed" /var/log/auth.log</code>',
      objective: "Grep Failed from auth.log",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("Failed") &&
        raw.includes("/var/log/auth.log"),
    },
    {
      title: "Tail Auth Log",
      why: "If an active brute-force attack is happening *right now*, you can grab the bottom of the authentication log to see the incoming strikes in real-time.",
      text: "Type <code>tail -n 10 /var/log/auth.log</code>",
      objective: "Tail the auth.log",
      xp: 20,
      check: (c, a) =>
        c === "tail" &&
        a.includes("-n") &&
        a.includes("10") &&
        a.includes("/var/log/auth.log"),
    },
    {
      title: "Audit Accepted Logins",
      why: "Finding out how the attacker got in is paramount. Filtering for 'Accepted' will show exactly which account the attacker successfully compromised and at what timestamp.",
      text: 'Type <code>grep "Accepted" /var/log/auth.log</code>',
      objective: "Grep Accepted from auth.log",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("Accepted") &&
        raw.includes("/var/log/auth.log"),
    },
    {
      title: "Audit Sudo Usage",
      why: "Once an attacker compromises a low-level account, they will try to escalate to root. Grepping the auth log for 'sudo' reveals exactly what commands the compromised user attempted to run with elevated privileges.",
      text: 'Type <code>grep "sudo" /var/log/auth.log</code>',
      objective: "Grep sudo from auth.log",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("sudo") &&
        raw.includes("/var/log/auth.log"),
    },
    {
      title: "Check Sudoers File",
      why: "The <b>/etc/sudoers</b> file controls who is allowed to run root commands. If an attacker successfully gains root access, they will often rewrite this file to give their low-level backdoor account permanent administrative rights.",
      text: "Type <code>cat /etc/sudoers</code>",
      objective: "Read /etc/sudoers",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "/etc/sudoers",
    },
    {
      title: "Find NOPASSWD",
      why: "The most dangerous configuration in the sudoers file is 'NOPASSWD'. It allows a user to execute root commands without ever typing a password. Attackers inject this string to ensure they never lose access.",
      text: 'Type <code>grep "NOPASSWD" /etc/sudoers</code>',
      objective: "Grep for NOPASSWD",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("NOPASSWD") &&
        raw.includes("/etc/sudoers"),
    },
    {
      title: "Check Home Directories",
      why: "Look at the physical home folders. If you see a directory for a user that doesn't exist in the company directory, you have discovered an attacker's staging area.",
      text: "Type <code>ls -la /home</code>",
      objective: "List /home directory",
      xp: 15,
      check: (c, a) => c === "ls" && a.includes("-la") && a.includes("/home"),
    },
    {
      title: "Audit Bash History",
      why: "If an attacker was careless, they didn't clear their RAM before logging out. Reading their <b>.bash_history</b> file acts as a step-by-step confession of exactly what malware they downloaded and what files they modified.",
      text: "Type <code>cat ~/.bash_history</code>",
      objective: "Read bash history",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "~/.bash_history",
    },
    {
      title: "Create IR Log",
      why: "In a real incident, you must maintain a strict Chain of Custody. Every piece of evidence must be documented. Create a master log file to track your findings.",
      text: "Type <code>touch ir_log.txt</code>",
      objective: "Create ir_log.txt",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "ir_log.txt",
    },

    // --- PHASE 2: PROCESS & NETWORK FORENSICS (16-30) ---
    {
      title: "Process Snapshot",
      why: "Malware requires a running process to execute its payload. <b>ps aux</b> dumps the entire process table. You are looking for randomly named binaries (like './sdf89') or python scripts running in the background.",
      text: "Type <code>ps aux</code>",
      objective: "Type ps aux",
      xp: 15,
      check: (c, a) => c === "ps" && a.includes("aux"),
    },
    {
      title: "Filter Root Processes",
      why: "A backdoor running as 'www-data' is bad, but a backdoor running as 'root' is catastrophic. Filter the process table to isolate high-level daemons and kernel threads.",
      text: "Type <code>ps aux | grep root</code>",
      objective: "Grep root processes",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("ps") && raw.includes("grep") && raw.includes("root"),
    },
    {
      title: "Live Process Monitor",
      why: "Cryptominers are a very common payload. They consume 100% of your CPU resources. Running <b>top -b -n 1</b> takes a batch-mode snapshot of the live resource consumption to catch aggressive malware.",
      text: "Type <code>top -b -n 1</code>",
      objective: "Run top in batch mode",
      xp: 30,
      check: (c, a) => c === "top" && a.includes("-b") && a.includes("-n"),
    },
    {
      title: "Htop Forensics",
      why: "Htop allows you to view processes in a 'Tree' mode (showing parent-child relationships). If a web server process spawned a bash terminal process, that is mathematical proof of a Reverse Shell exploit.",
      text: "Type <code>htop</code>",
      objective: "Type htop",
      xp: 15,
      check: (c) => c === "htop",
    },
    {
      title: "Network Listeners",
      why: "If an attacker installed a 'Bind Shell', they opened a hidden port on the server and are waiting to connect to it. <b>netstat -tuln</b> reveals all ports actively listening for inbound traffic.",
      text: "Type <code>netstat -tuln</code>",
      objective: "Type netstat -tuln",
      xp: 25,
      check: (c, a) => c === "netstat" && a.includes("-tuln"),
    },
    {
      title: "Active Connections",
      why: "If the attacker is using a 'Reverse Shell', the port won't be listening; it will show as an ESTABLISHED outbound connection. <b>netstat -antp</b> maps all active connections directly to their associated Process ID (PID).",
      text: "Type <code>netstat -antp</code>",
      objective: "Type netstat -antp",
      xp: 30,
      check: (c, a) => c === "netstat" && a.includes("-antp"),
    },
    {
      title: "Socket Statistics",
      why: "The modern, faster replacement for netstat. <b>ss -tulnp</b> talks directly to the kernel's network stack to dump the raw socket data. You are hunting for unrecognized ports.",
      text: "Type <code>ss -tulnp</code>",
      objective: "Type ss -tulnp",
      xp: 30,
      check: (c, a) => c === "ss" && a.includes("-tulnp"),
    },
    {
      title: "List Open Files (Network)",
      why: "In Linux, everything is a file—including network sockets. The <b>lsof -i</b> command lists all open files that are currently bound to an internet socket, making it the ultimate tool for catching malware communicating over the network.",
      text: "Type <code>lsof -i</code>",
      objective: "Type lsof -i",
      xp: 25,
      check: (c, a) => c === "lsof" && a.includes("-i"),
    },
    {
      title: "Lsof Specific Port",
      why: "If you know port 80 is acting suspicious, you can pass the port directly to lsof to isolate exactly which binary on the hard drive is generating the traffic.",
      text: "Type <code>lsof -i :80</code>",
      objective: "Type lsof -i :80",
      xp: 30,
      check: (c, a) => c === "lsof" && a.includes("-i") && a.includes(":80"),
    },
    {
      title: "Catch Reverse Shell Port",
      why: "Port 4444 is the default port for Metasploit payloads. If lsof shows an ESTABLISHED connection on this port, your server is completely compromised.",
      text: "Type <code>lsof -i :4444</code>",
      objective: "Check port 4444",
      xp: 30,
      check: (c, a) => c === "lsof" && a.includes("-i") && a.includes(":4444"),
    },
    {
      title: "Log Suspicious Port",
      why: "Document your finding in the IR log. The attacker is operating a C2 (Command and Control) connection on port 4444.",
      text: 'Type <code>echo "Suspicious Port 4444" >> ir_log.txt</code>',
      objective: "Log finding to ir_log.txt",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("Port 4444") &&
        raw.includes(">>") &&
        raw.includes("ir_log.txt"),
    },
    {
      title: "Inspect Malicious PID",
      why: "Assuming lsof told us the malware is running on Process ID 1234, we use <b>ps -f -p 1234</b> to extract the exact command-line arguments the attacker used to launch the malware.",
      text: "Type <code>ps -f -p 1234</code>",
      objective: "Inspect PID 1234",
      xp: 30,
      check: (c, a) =>
        c === "ps" &&
        a.includes("-f") &&
        a.includes("-p") &&
        a.includes("1234"),
    },
    {
      title: "Procfs Forensics",
      why: "The <b>/proc</b> directory is a virtual filesystem reflecting live kernel memory. Even if the attacker deleted their malware from the hard drive, the kernel still holds a symbolic link to the raw executable in memory at <code>/proc/[PID]/exe</code>.",
      text: "Type <code>ls -l /proc/1234/exe</code>",
      objective: "Check process executable path",
      xp: 40,
      check: (c, a) =>
        c === "ls" && a.includes("-l") && a.includes("/proc/1234/exe"),
    },
    {
      title: "Procfs Command Line",
      why: "The <code>cmdline</code> file inside the procfs directory contains the exact strings passed to the binary when it was spawned. This reveals hidden flags or configuration files the malware is using.",
      text: "Type <code>cat /proc/1234/cmdline</code>",
      objective: "Read process command line",
      xp: 30,
      check: (c, a) => c === "cat" && a[0] === "/proc/1234/cmdline",
    },
    {
      title: "Log Malicious PID",
      why: "Document the exact Process ID of the malware so the rest of the incident response team knows what to kill during the eradication phase.",
      text: 'Type <code>echo "Malware PID 1234" >> ir_log.txt</code>',
      objective: "Log PID to ir_log.txt",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("PID 1234") &&
        raw.includes(">>") &&
        raw.includes("ir_log.txt"),
    },

    // --- PHASE 3: HUNTING PERSISTENCE & CRON (31-45) ---
    {
      title: "Audit System Crontab",
      why: "If you kill the malware, the attacker will just lose access, right? Wrong. Attackers set up 'Persistence'. They inject commands into <b>/etc/crontab</b> to automatically re-download and re-execute the malware every 5 minutes.",
      text: "Type <code>cat /etc/crontab</code>",
      objective: "Read system crontab",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "/etc/crontab",
    },
    {
      title: "Audit Cron Drops",
      why: "Linux has multiple drop-in folders for automation. Any script placed in <b>/etc/cron.d/</b> is executed automatically by the root kernel. Check here for hidden malicious bash scripts.",
      text: "Type <code>ls -la /etc/cron.d</code>",
      objective: "List /etc/cron.d",
      xp: 20,
      check: (c, a) =>
        c === "ls" && a.includes("-la") && a.includes("/etc/cron.d"),
    },
    {
      title: "Audit Hourly Crons",
      why: "Check the hourly execution directory. A common persistence trick is to drop a python reverse shell here, so even if the server is rebooted, the attacker regains access within the hour.",
      text: "Type <code>ls -la /etc/cron.hourly</code>",
      objective: "List /etc/cron.hourly",
      xp: 20,
      check: (c, a) =>
        c === "ls" && a.includes("-la") && a.includes("/etc/cron.hourly"),
    },
    {
      title: "Audit Daily Crons",
      why: "Check the daily execution directory. Red Teamers often hide their deepest fallback backdoors here, hoping you won't check an automation script that only fires at 3:00 AM.",
      text: "Type <code>ls -la /etc/cron.daily</code>",
      objective: "List /etc/cron.daily",
      xp: 20,
      check: (c, a) =>
        c === "ls" && a.includes("-la") && a.includes("/etc/cron.daily"),
    },
    {
      title: "Audit User Crontab",
      why: "Every individual user can also have their own hidden scheduled tasks. <b>crontab -l</b> reads the specific cron configuration for your currently logged-in user.",
      text: "Type <code>crontab -l</code>",
      objective: "List user crontab",
      xp: 15,
      check: (c, a) => c === "crontab" && a.includes("-l"),
    },
    {
      title: "Audit SSH Authorized Keys",
      why: "The <b>authorized_keys</b> file allows password-less login via public-key cryptography. Attackers append their own public key to the bottom of this file to guarantee permanent, highly-secure backdoor access to the machine.",
      text: "Type <code>cat ~/.ssh/authorized_keys</code>",
      objective: "Read SSH authorized keys",
      xp: 30,
      check: (c, a) => c === "cat" && a[0] === "~/.ssh/authorized_keys",
    },
    {
      title: "Audit Systemd Services",
      why: "Advanced malware creates its own <b>systemd service</b> (e.g., 'network-helper.service') so that the Linux kernel physically manages and revives the malware if it crashes. List the core systemd configuration folder.",
      text: "Type <code>ls -la /etc/systemd/system/</code>",
      objective: "List systemd units",
      xp: 25,
      check: (c, a) =>
        c === "ls" && a.includes("-la") && a.includes("/etc/systemd/system/"),
    },
    {
      title: "Audit Enabled Services",
      why: "Filter the massive systemctl list to show ONLY services that are configured to boot automatically when the server turns on. Look for services with misspelled or generic names.",
      text: "Type <code>systemctl list-unit-files --state=enabled</code>",
      objective: "List enabled systemd services",
      xp: 35,
      check: (c, a) =>
        c === "systemctl" &&
        a.includes("list-unit-files") &&
        a.some((x) => x.includes("--state=enabled")),
    },
    {
      title: "Check SSH Service",
      why: "If you found an attacker connecting via SSH, check the service status. If the attacker recompiled the SSH daemon (a rootkit), the logs might show strange memory signatures.",
      text: "Type <code>systemctl status ssh</code>",
      objective: "Check SSH status",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a.includes("status") && a.includes("ssh"),
    },
    {
      title: "Check Cron Service",
      why: "Verify the cron daemon itself is healthy and hasn't been hijacked by a kernel module.",
      text: "Type <code>systemctl status cron</code>",
      objective: "Check Cron status",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a.includes("status") && a.includes("cron"),
    },
    {
      title: "Audit SUID Binaries",
      why: "If an attacker escalated to root once, they will leave a backdoor to do it again instantly. They often copy <code>/bin/bash</code> to a hidden folder and apply the SUID permission. Finding unauthorized SUID files is critical.",
      text: "Type <code>find / -perm -4000 -type f 2>/dev/null</code>",
      objective: "Find SUID files",
      xp: 50,
      check: (c, a) =>
        c === "find" && a.includes("-perm") && a.includes("-4000"),
    },
    {
      title: "Audit SGID Binaries",
      why: "Check for maliciously altered Group permissions as well. The <code>2>/dev/null</code> part of the command redirects all 'Permission Denied' errors into a black hole so your screen stays clean.",
      text: "Type <code>find / -perm -2000 -type f 2>/dev/null</code>",
      objective: "Find SGID files",
      xp: 50,
      check: (c, a) =>
        c === "find" && a.includes("-perm") && a.includes("-2000"),
    },
    {
      title: "Find Recently Modified",
      why: "If the breach happened yesterday, query the filesystem for timestamps. The <b>-mtime -1</b> flag asks `find` to output any file in the /tmp directory that was modified in the last 24 hours.",
      text: "Type <code>find /tmp -type f -mtime -1</code>",
      objective: "Find recently modified files",
      xp: 40,
      check: (c, a) =>
        c === "find" &&
        a.includes("-type") &&
        a.includes("-mtime") &&
        a.includes("-1"),
    },
    {
      title: "Hunt PHP Web Shells",
      why: "If the server runs a website, attackers drop PHP files (like 'cmd.php') that allow them to execute terminal commands through their web browser. Scan the web directory for hidden scripts.",
      text: 'Type <code>find /var/www/html -name "*.php"</code>',
      objective: "Find PHP files in web directory",
      xp: 40,
      check: (c, a) =>
        c === "find" && a.includes("/var/www/html") && a.includes("-name"),
    },
    {
      title: "Log Backdoor",
      why: "You found a suspicious binary in the temp directory! Document the finding for the Eradication phase.",
      text: 'Type <code>echo "Backdoor found" >> ir_log.txt</code>',
      objective: "Log backdoor discovery",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("Backdoor") &&
        raw.includes("ir_log.txt"),
    },

    // --- PHASE 4: CONTAINMENT & FIREWALLING (46-55) ---
    {
      title: "Kill Malware Process",
      why: "Containment begins now. Issue a standard SIGTERM to PID 1234 to attempt to gracefully close the malware's open network sockets and shut down its threads.",
      text: "Type <code>kill 1234</code>",
      objective: "Kill PID 1234",
      xp: 20,
      check: (c, a) => c === "kill" && a[0] === "1234",
    },
    {
      title: "Force Kill Malware",
      why: "Advanced malware ignores SIGTERM signals to protect itself. You must use <b>kill -9</b> to send a SIGKILL. The kernel intercepts this and violently deletes the malware's memory space without giving it a chance to react.",
      text: "Type <code>kill -9 1234</code>",
      objective: "Force kill PID 1234",
      xp: 25,
      check: (c, a) => c === "kill" && a.includes("-9") && a.includes("1234"),
    },
    {
      title: "Kill C2 Tooling",
      why: "If the attacker is using tools like Netcat to maintain redundant connections, massacre all instances of the tool globally across the server.",
      text: "Type <code>killall netcat</code>",
      objective: "Kill all netcat processes",
      xp: 25,
      check: (c, a) => c === "killall" && a[0] === "netcat",
    },
    {
      title: "Check Firewall Rules",
      why: "Linux uses <b>iptables</b> to program the kernel's Netfilter network routing module. Running <b>-L</b> lists the current rule chains (INPUT, OUTPUT, FORWARD) to see if the attacker disabled your defenses.",
      text: "Type <code>iptables -L</code>",
      objective: "List iptables rules",
      xp: 20,
      check: (c, a) => c === "iptables" && a.includes("-L"),
    },
    {
      title: "Block Inbound Traffic",
      why: "Cut the attacker off. <b>-A INPUT</b> appends a rule to the incoming chain. <b>-s</b> targets the attacker's Source IP. <b>-j DROP</b> tells the kernel to silently delete any packet from that IP before it even hits the application layer.",
      text: "Type <code>iptables -A INPUT -s 10.0.0.99 -j DROP</code>",
      objective: "Drop inbound attacker traffic",
      xp: 45,
      check: (c, a) =>
        c === "iptables" &&
        a.includes("-A") &&
        a.includes("INPUT") &&
        a.includes("-s") &&
        a.includes("10.0.0.99") &&
        a.includes("DROP"),
    },
    {
      title: "Block Outbound Traffic",
      why: "If the malware operates via a Reverse Shell, blocking inbound traffic isn't enough because the malware initiates the connection *outward*. <b>-A OUTPUT -d</b> blocks the server from sending data to the attacker's Destination IP.",
      text: "Type <code>iptables -A OUTPUT -d 10.0.0.99 -j DROP</code>",
      objective: "Drop outbound attacker traffic",
      xp: 45,
      check: (c, a) =>
        c === "iptables" &&
        a.includes("-A") &&
        a.includes("OUTPUT") &&
        a.includes("-d") &&
        a.includes("10.0.0.99") &&
        a.includes("DROP"),
    },
    {
      title: "Save Firewall Rules",
      why: "Iptables rules are applied purely in RAM. If the server reboots, the attacker's IP will be unblocked. You must save the rules to the hard drive so the system restores them on boot.",
      text: "Type <code>iptables-save > /etc/iptables/rules.v4</code>",
      objective: "Save iptables rules",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("iptables-save") &&
        raw.includes(">") &&
        raw.includes("/etc/iptables/rules.v4"),
    },
    {
      title: "Stop Vulnerable Service",
      why: "If the attacker got in by exploiting a zero-day in the web server, you must turn Nginx off completely until the patching team can apply a security update. Contain the breach.",
      text: "Type <code>systemctl stop nginx</code>",
      objective: "Stop the web server",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a.includes("stop") && a.includes("nginx"),
    },
    {
      title: "Quarantine File",
      why: "Before deleting the malware, you should quarantine it for the Reverse Engineering team to analyze. <b>chmod 000</b> removes all read, write, and execute permissions, locking the file down entirely.",
      text: "Type <code>chmod 000 /tmp/malware.bin</code>",
      objective: "Remove all permissions from malware",
      xp: 25,
      check: (c, a) =>
        c === "chmod" && a.includes("000") && a.includes("/tmp/malware.bin"),
    },
    {
      title: "Log Containment",
      why: "Document that network isolation has been achieved and the bleeding has stopped.",
      text: 'Type <code>echo "Attacker Blocked" >> ir_log.txt</code>',
      objective: "Log containment",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("Blocked") &&
        raw.includes("ir_log.txt"),
    },

    // --- PHASE 5: ERADICATION & RECOVERY (56-65) ---
    {
      title: "Delete Malware",
      why: "The Reverse Engineers grabbed their copy. Now, eradicate the malicious binary from the production filesystem completely.",
      text: "Type <code>rm /tmp/malware.bin</code>",
      objective: "Remove malware binary",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "/tmp/malware.bin",
    },
    {
      title: "Delete Rogue SSH Keys",
      why: "Eradicate the attacker's persistence. By deleting the authorized_keys file, you wipe out their cryptographic backdoor access.",
      text: "Type <code>rm ~/.ssh/authorized_keys</code>",
      objective: "Remove rogue SSH keys",
      xp: 20,
      check: (c, a) => c === "rm" && a[0] === "~/.ssh/authorized_keys",
    },
    {
      title: "Remove Rogue User",
      why: "The attacker created an invisible user account named 'hacker'. Use <b>sed</b> to surgically delete the specific row containing 'hacker' directly out of the <code>/etc/passwd</code> file.",
      text: "Type <code>sed -i '/hacker/d' /etc/passwd</code>",
      objective: "Remove rogue user via sed",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("sed") &&
        raw.includes("-i") &&
        raw.includes("/hacker/d") &&
        raw.includes("/etc/passwd"),
    },
    {
      title: "Purge Staging Folders",
      why: "Attackers often hide multiple scripts inside dotfiles (like `.cache`). Nuke the entire hidden staging directory recursively.",
      text: "Type <code>rm -rf /tmp/.cache</code>",
      objective: "Force remove hidden cache",
      xp: 25,
      check: (c, a) =>
        c === "rm" && a.includes("-rf") && a.includes("/tmp/.cache"),
    },
    {
      title: "Final Network Audit",
      why: "Trust, but verify. Run a final sweep of the active network sockets to ensure no new rogue listeners spawned during the eradication phase.",
      text: "Type <code>netstat -tuln</code>",
      objective: "Verify clean network sockets",
      xp: 15,
      check: (c, a) => c === "netstat" && a.includes("-tuln"),
    },
    {
      title: "Final Process Audit",
      why: "Run a final sweep of the process table to ensure the CPU is completely clean.",
      text: "Type <code>ps aux</code>",
      objective: "Verify clean process table",
      xp: 15,
      check: (c, a) => c === "ps" && a.includes("aux"),
    },
    {
      title: "Review IR Log",
      why: "Read your compiled Incident Response report to ensure all timestamps, PIDs, and attacker IPs were captured correctly for the Chief Information Security Officer (CISO).",
      text: "Type <code>cat ir_log.txt</code>",
      objective: "Review the IR log",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "ir_log.txt",
    },
    {
      title: "Archive Evidence",
      why: "Package the text file into a compressed tarball so it can be securely emailed to the external forensic auditing team.",
      text: "Type <code>tar -czvf incident_report.tar.gz ir_log.txt</code>",
      objective: "Compress the IR log",
      xp: 40,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-czvf") &&
        a.includes("incident_report.tar.gz") &&
        a.includes("ir_log.txt"),
    },
    {
      title: "Clean Workspace",
      why: "Remove the raw text file from the server now that it is securely compressed in the archive.",
      text: "Type <code>rm ir_log.txt</code>",
      objective: "Delete the raw log",
      xp: 10,
      check: (c, a) => c === "rm" && a[0] === "ir_log.txt",
    },
    {
      title: "Incident Closed",
      why: "You identified the breach, hunted the process memory, walled off the network, and eradicated the threat. You are an elite Blue Teamer.",
      text: 'Type <code>echo "Incident Resolved"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Resolved"),
    },
  ],
};
