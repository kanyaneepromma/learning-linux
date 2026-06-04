// fourthmodule.js
// Module 4: System Diagnostics (65 Lessons)

const module4_diagnostics = {
  name: "4. System Diagnostics (65 Lessons)",
  lessons: [
    // --- TIME & UPTIME TRACKING (1-10) ---
    {
      title: "Current Date",
      why: "When diagnosing a system, time is your most critical metric. Logs are useless if you don't know the server's current timezone. The <b>date</b> command queries the system clock, which is synchronized by the kernel.",
      text: "Type <code>date</code>",
      objective: "Type date",
      xp: 10,
      check: (c) => c === "date",
    },
    {
      title: "Universal Time",
      why: "Server clusters span the globe. To prevent log mismatch errors between a server in Tokyo and a server in New York, sysadmins always use Coordinated Universal Time. The <b>-u</b> flag forces the output into UTC.",
      text: "Type <code>date -u</code>",
      objective: "Type date -u",
      xp: 15,
      check: (c, a) => c === "date" && a.includes("-u"),
    },
    {
      title: "RFC 2822 Format",
      why: "Different protocols require time stamped in specific machine-readable formats. The <b>-R</b> flag formats the date according to RFC 2822, which is the internet standard used for email headers and HTTP timestamps.",
      text: "Type <code>date -R</code>",
      objective: "Type date -R",
      xp: 15,
      check: (c, a) => c === "date" && a.includes("-R"),
    },
    {
      title: "Custom Formatting",
      why: "When writing bash scripts, you often need to create log files with the current date in the filename. You can extract specific variables (like Year, Month, Day) using a plus sign <b>+</b> followed by format strings.",
      text: 'Type <code>date +"%Y-%m-%d"</code>',
      objective: 'Format date via +"%Y-%m-%d"',
      xp: 20,
      check: (c, a) => c === "date" && a[0] === '+"%Y-%m-%d"',
    },
    {
      title: "Uptime Check",
      why: "The <b>uptime</b> command is the ultimate pulse check. It tells you exactly how long the server has been running since its last reboot, how many users are logged in, and the <i>Load Average</i> (CPU queue length) over the last 1, 5, and 15 minutes.",
      text: "Type <code>uptime</code>",
      objective: "Type uptime",
      xp: 20,
      check: (c) => c === "uptime",
    },
    {
      title: "Pretty Uptime",
      why: "Sometimes you just want the raw time without the CPU load averages cluttering the screen. The <b>-p</b> (pretty) flag translates the raw uptime data into a highly readable human format.",
      text: "Type <code>uptime -p</code>",
      objective: "Type uptime -p",
      xp: 15,
      check: (c, a) => c === "uptime" && a.includes("-p"),
    },
    {
      title: "Since Uptime",
      why: "To find out the exact historical moment the server booted up (perhaps to cross-reference it with a power outage or a kernel panic log), use the <b>-s</b> (since) flag.",
      text: "Type <code>uptime -s</code>",
      objective: "Type uptime -s",
      xp: 15,
      check: (c, a) => c === "uptime" && a.includes("-s"),
    },
    {
      title: "Current User",
      why: "When you get dropped into a terminal, you need to know your privilege level immediately. <b>whoami</b> queries the kernel for your Effective User ID (EUID). If this returns 'root', you have God-mode access.",
      text: "Type <code>whoami</code>",
      objective: "Type whoami",
      xp: 10,
      check: (c) => c === "whoami",
    },
    {
      title: "Who is Logged In?",
      why: "Are you alone on this server? The <b>w</b> command checks the <code>/var/run/utmp</code> file to show you a live list of every user currently logged in, what IP address they connected from, and exactly what command they are typing right now.",
      text: "Type <code>w</code>",
      objective: "Type w",
      xp: 20,
      check: (c) => c === "w",
    },
    {
      title: "Login History",
      why: "To perform forensics, you need to know who was here yesterday. The <b>last</b> command reads the historical <code>/var/log/wtmp</code> file, listing every successful login and system reboot in chronological order.",
      text: "Type <code>last -n 5</code>",
      objective: "Type last -n 5",
      xp: 25,
      check: (c, a) => c === "last" && a.includes("-n") && a.includes("5"),
    },

    // --- SYSTEM INFO & KERNEL (11-20) ---
    {
      title: "Kernel Name",
      why: "The operating system is just a shell; the <b>Kernel</b> is the actual brain talking to the hardware. The <b>uname</b> (Unix Name) command queries the system to see if you are running Linux, Darwin (macOS), or something else.",
      text: "Type <code>uname</code>",
      objective: "Type uname",
      xp: 10,
      check: (c) => c === "uname",
    },
    {
      title: "Kernel Release",
      why: "Exploit developers need to know exactly what version of the brain they are attacking. The <b>-r</b> (Release) flag outputs the specific kernel version (e.g., 5.15.0). If it is outdated, it might be vulnerable to a privilege escalation exploit.",
      text: "Type <code>uname -r</code>",
      objective: "Type uname -r",
      xp: 15,
      check: (c, a) => c === "uname" && a.includes("-r"),
    },
    {
      title: "All Kernel Info",
      why: "The <b>-a</b> (All) flag dumps everything: the kernel name, the exact network hostname, the release version, the compilation date, and the hardware architecture (like x86_64 or ARM).",
      text: "Type <code>uname -a</code>",
      objective: "Type uname -a",
      xp: 20,
      check: (c, a) => c === "uname" && a.includes("-a"),
    },
    {
      title: "Hostname Check",
      why: "The <b>hostname</b> is the machine's identity on the network. When orchestrating thousands of servers, sysadmins use hostnames (like 'web-prod-01' or 'db-replica-02') to ensure they are pushing commands to the correct target.",
      text: "Type <code>hostname</code>",
      objective: "Type hostname",
      xp: 10,
      check: (c) => c === "hostname",
    },
    {
      title: "Hostname IP",
      why: "You can ask the system to resolve its own hostname into its local network IP address using the <b>-I</b> (capital i) flag. This is a rapid way to check your internal IP.",
      text: "Type <code>hostname -I</code>",
      objective: "Type hostname -I",
      xp: 15,
      check: (c, a) => c === "hostname" && a.includes("-I"),
    },
    {
      title: "System Architecture",
      why: "Are you on a 32-bit, 64-bit, or ARM processor? The <b>arch</b> command tells you the hardware architecture. You cannot run a 64-bit payload or executable on a 32-bit machine, so you must verify this before deploying software.",
      text: "Type <code>arch</code>",
      objective: "Type arch",
      xp: 15,
      check: (c) => c === "arch",
    },
    {
      title: "Operating System Release",
      why: "While `uname` tells you about the Kernel, it doesn't tell you if you are running Ubuntu, Debian, or Red Hat. We read the <b>/etc/os-release</b> file to see the exact Linux Distribution and version code.",
      text: "Type <code>cat /etc/os-release</code>",
      objective: "Type cat /etc/os-release",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "/etc/os-release",
    },
    {
      title: "Extract OS Name",
      why: "Using our text manipulation skills, let's pipe the OS release file into grep to isolate just the PRETTY_NAME line, ignoring all the extra configuration variables.",
      text: 'Type <code>grep "PRETTY_NAME" /etc/os-release</code>',
      objective: "Grep PRETTY_NAME",
      xp: 25,
      check: (c, a) =>
        c === "grep" &&
        a.includes("PRETTY_NAME") &&
        a.includes("/etc/os-release"),
    },
    {
      title: "User Identity",
      why: "The <b>id</b> command maps your username to its underlying mathematical <b>UID</b> (User ID). The Linux kernel does not care about names like 'sysadmin'; it only understands numbers. Root is always UID 0.",
      text: "Type <code>id</code>",
      objective: "Type id",
      xp: 15,
      check: (c) => c === "id",
    },
    {
      title: "Root Identity Check",
      why: "If you want to check if a specific user exists and what groups they belong to, pass their name as an argument. Let's inspect the God-account.",
      text: "Type <code>id root</code>",
      objective: "Type id root",
      xp: 15,
      check: (c, a) => c === "id" && a[0] === "root",
    },

    // --- MEMORY & DISK USAGE (21-30) ---
    {
      title: "Free Memory",
      why: "If a server is crashing, it might be out of RAM. The <b>free</b> command queries the memory controller to show total, used, and available RAM. By default, it outputs in raw bytes, which is very hard to read.",
      text: "Type <code>free</code>",
      objective: "Type free",
      xp: 10,
      check: (c) => c === "free",
    },
    {
      title: "Human Readable Memory",
      why: "Always append the <b>-h</b> (Human Readable) or <b>-m</b> (Megabytes) flag to memory checks. This translates massive byte numbers into Gigabytes (G) and Megabytes (M) for instant comprehension.",
      text: "Type <code>free -h</code>",
      objective: "Type free -h",
      xp: 15,
      check: (c, a) => c === "free" && a.includes("-h"),
    },
    {
      title: "Disk Free",
      why: "Databases will catastrophically crash if the hard drive hits 100% capacity. The <b>df</b> (Disk Free) command surveys every mounted filesystem and partitions to report storage usage.",
      text: "Type <code>df</code>",
      objective: "Type df",
      xp: 10,
      check: (c) => c === "df",
    },
    {
      title: "Human Readable Disk",
      why: "Just like `free`, `df` defaults to 1K-blocks. Adding the <b>-h</b> flag translates the block sizes into Gigabytes and Terabytes, letting you instantly spot drives that are at 99% capacity.",
      text: "Type <code>df -h</code>",
      objective: "Type df -h",
      xp: 15,
      check: (c, a) => c === "df" && a.includes("-h"),
    },
    {
      title: "Disk Usage",
      why: "If your drive is full, you need to find out *what* is eating the space. The <b>du</b> (Disk Usage) command calculates the exact size of specific files and directories recursively.",
      text: "Type <code>du -sh /var/log</code>",
      objective: "Type du -sh /var/log",
      xp: 25,
      check: (c, a) =>
        c === "du" && a.includes("-sh") && a.includes("/var/log"),
    },
    {
      title: "Deep Disk Usage",
      why: "Let's check the size of the /etc directory. The <b>-s</b> flag stands for 'Summarize', meaning it gives you one grand total size instead of listing the size of every single file individually.",
      text: "Type <code>du -sh /etc</code>",
      objective: "Type du -sh /etc",
      xp: 25,
      check: (c, a) => c === "du" && a.includes("-sh") && a.includes("/etc"),
    },
    {
      title: "Memory Info File",
      why: "Commands like `free` are actually just graphical wrappers. Under the hood, Linux stores all hardware metrics inside virtual text files in the `/proc` directory. Let's read the raw memory data directly.",
      text: "Type <code>cat /proc/meminfo | head -n 5</code>",
      objective: "Cat meminfo",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("cat") &&
        raw.includes("/proc/meminfo") &&
        raw.includes("head"),
    },
    {
      title: "CPU Info File",
      why: "Similarly, the kernel exposes the exact specs of your processor (model, cores, cache size) in a virtual file. This is how the system knows what hardware it's running on.",
      text: 'Type <code>cat /proc/cpuinfo | grep "model name"</code>',
      objective: "Grep model name from cpuinfo",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("model name") &&
        raw.includes("/proc/cpuinfo"),
    },
    {
      title: "List Block Devices",
      why: "The <b>lsblk</b> (List Block Devices) command visually maps out your physical hard drives (like sda or nvme0n1) and how they are partitioned into smaller drives.",
      text: "Type <code>lsblk</code>",
      objective: "Type lsblk",
      xp: 20,
      check: (c) => c === "lsblk",
    },
    {
      title: "List CPU",
      why: "The <b>lscpu</b> command parses the `/proc/cpuinfo` file we just looked at, presenting the processor threads, cores, and virtualization features in a clean, readable table.",
      text: "Type <code>lscpu</code>",
      objective: "Type lscpu",
      xp: 20,
      check: (c) => c === "lscpu",
    },

    // --- PROCESS MONITORING & KILLING (31-40) ---
    {
      title: "Process Status",
      why: "Every running program in Linux is called a Process, and is assigned a unique number called a PID. The <b>ps</b> (Process Status) command takes a static, one-time snapshot of the processes running in your current terminal.",
      text: "Type <code>ps</code>",
      objective: "Type ps",
      xp: 15,
      check: (c) => c === "ps",
    },
    {
      title: "All Processes",
      why: "A server has hundreds of background processes (daemons) running. To see them all, we pass <b>aux</b>. 'a' means all users, 'u' shows the user owner, and 'x' shows processes not attached to a terminal.",
      text: "Type <code>ps aux</code>",
      objective: "Type ps aux",
      xp: 20,
      check: (c, a) => c === "ps" && a.includes("aux"),
    },
    {
      title: "Find Specific Process",
      why: "Because `ps aux` dumps hundreds of lines, sysadmins use the pipe `|` to send that output into `grep`. This allows you to instantly find the PID of a specific crashed program, like Nginx.",
      text: 'Type <code>ps aux | grep \"nginx\"</code>',
      objective: "Grep for nginx processes",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("ps") && raw.includes("grep") && raw.includes("nginx"),
    },
    {
      title: "Top Command",
      why: "A static snapshot isn't always enough. The <b>top</b> command opens an interactive, live-updating task manager. It ranks processes by CPU usage, letting you watch spikes in real-time.",
      text: "Type <code>top -b -n 1</code>",
      objective: "Run top in batch mode",
      xp: 30,
      check: (c, a) => c === "top" && a.includes("-b") && a.includes("-n"),
    },
    {
      title: "Htop Command",
      why: "<b>htop</b> is the modern evolution of `top`. It adds colors, horizontal scrolling, and a visual meter for your CPU cores. (We are simulating it here).",
      text: "Type <code>htop</code>",
      objective: "Type htop",
      xp: 15,
      check: (c) => c === "htop",
    },
    {
      title: "Kill a Process",
      why: "If a program freezes, you must assassinate it. The <b>kill</b> command sends a SIGTERM (Signal 15 - Terminate) to a specific PID, politely asking the program to save its data and shut down.",
      text: "Type <code>kill 1234</code>",
      objective: "Type kill 1234",
      xp: 20,
      check: (c, a) => c === "kill" && a[0] === "1234",
    },
    {
      title: "Force Kill",
      why: "If a process is completely deadlocked, it will ignore a polite SIGTERM. Adding <b>-9</b> sends a SIGKILL. This tells the kernel to instantly execute the program without giving it a chance to clean up. Use with caution.",
      text: "Type <code>kill -9 1234</code>",
      objective: "Type kill -9 1234",
      xp: 25,
      check: (c, a) => c === "kill" && a.includes("-9") && a.includes("1234"),
    },
    {
      title: "Kill All",
      why: "If a web server spawns 50 worker processes, you don't want to type `kill` 50 times. The <b>killall</b> command takes a name instead of a PID, and murders every process matching that name simultaneously.",
      text: "Type <code>killall nginx</code>",
      objective: "Type killall nginx",
      xp: 25,
      check: (c, a) => c === "killall" && a[0] === "nginx",
    },
    {
      title: "Pgrep",
      why: "Instead of piping `ps aux` into `grep`, Linux has a built-in shortcut. <b>pgrep</b> (Process Grep) searches the process table and returns only the raw PIDs matching your search.",
      text: "Type <code>pgrep nginx</code>",
      objective: "Type pgrep nginx",
      xp: 20,
      check: (c, a) => c === "pgrep" && a[0] === "nginx",
    },
    {
      title: "Pkill",
      why: "<b>pkill</b> combines `pgrep` and `kill`. It searches for a pattern and immediately sends a termination signal to anything it finds. It's a highly efficient sniper rifle.",
      text: "Type <code>pkill nginx</code>",
      objective: "Type pkill nginx",
      xp: 20,
      check: (c, a) => c === "pkill" && a[0] === "nginx",
    },

    // --- SERVICE MANAGEMENT (SYSTEMD) (41-50) ---
    {
      title: "Check Service Status",
      why: "Modern Linux uses <b>systemd</b> to manage critical background services. To see if your firewall or web server is healthy, use <b>systemctl status</b>. It returns the uptime, memory footprint, and recent logs for that service.",
      text: "Type <code>systemctl status ssh</code>",
      objective: "Type systemctl status ssh",
      xp: 25,
      check: (c, a) =>
        c === "systemctl" && a.includes("status") && a.includes("ssh"),
    },
    {
      title: "Start a Service",
      why: "If a service says 'inactive (dead)', you must manually boot it. <b>start</b> tells the systemd daemon to initialize the configuration files and spawn the background process.",
      text: "Type <code>systemctl start nginx</code>",
      objective: "Type systemctl start nginx",
      xp: 25,
      check: (c, a) =>
        c === "systemctl" && a.includes("start") && a.includes("nginx"),
    },
    {
      title: "Verify Start",
      why: "Never assume a command worked blindly. Always check the status after starting a service to ensure it didn't immediately crash due to a configuration syntax error.",
      text: "Type <code>systemctl status nginx</code>",
      objective: "Type systemctl status nginx",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a.includes("status") && a.includes("nginx"),
    },
    {
      title: "Stop a Service",
      why: "If you are under attack or need to perform deep maintenance, you must halt the service. <b>stop</b> gracefully shuts down all worker processes associated with the service.",
      text: "Type <code>systemctl stop nginx</code>",
      objective: "Type systemctl stop nginx",
      xp: 25,
      check: (c, a) =>
        c === "systemctl" && a.includes("stop") && a.includes("nginx"),
    },
    {
      title: "Restart a Service",
      why: "If you change a configuration file (like `nginx.conf`), the running program doesn't know about it. You must <b>restart</b> the service to force it to read the new configuration from the hard drive.",
      text: "Type <code>systemctl restart ssh</code>",
      objective: "Type systemctl restart ssh",
      xp: 25,
      check: (c, a) =>
        c === "systemctl" && a.includes("restart") && a.includes("ssh"),
    },
    {
      title: "Enable on Boot",
      why: "Starting a service only lasts until the server reboots. If you want the web server to automatically turn itself on when the computer powers up, you must <b>enable</b> it in the systemd boot symlinks.",
      text: "Type <code>systemctl enable nginx</code>",
      objective: "Type systemctl enable nginx",
      xp: 30,
      check: (c, a) =>
        c === "systemctl" && a.includes("enable") && a.includes("nginx"),
    },
    {
      title: "Disable on Boot",
      why: "If you install a service you only want to use manually (like a heavy database or scanner), <b>disable</b> prevents it from turning on automatically and wasting RAM during the boot sequence.",
      text: "Type <code>systemctl disable nginx</code>",
      objective: "Type systemctl disable nginx",
      xp: 30,
      check: (c, a) =>
        c === "systemctl" && a.includes("disable") && a.includes("nginx"),
    },
    {
      title: "List Active Services",
      why: "To see a massive table of every single service currently running on your machine, you ask systemctl to list its operational units.",
      text: "Type <code>systemctl list-units --type=service</code>",
      objective: "List all services",
      xp: 35,
      check: (c, a) =>
        c === "systemctl" &&
        a.includes("list-units") &&
        a.some((x) => x.includes("--type=service")),
    },
    {
      title: "Check Failed Services",
      why: "This is a critical diagnostic command. Passing <b>--failed</b> instantly filters out the noise and highlights only the services that attempted to boot but crashed due to a fatal error.",
      text: "Type <code>systemctl --failed</code>",
      objective: "Type systemctl --failed",
      xp: 30,
      check: (c, a) => c === "systemctl" && a.includes("--failed"),
    },
    {
      title: "Reload Daemon",
      why: "If you write a completely new systemd configuration file (a `.service` file), you must run <b>daemon-reload</b> to force the systemd architect to re-scan the hard drive and recognize your new blueprint.",
      text: "Type <code>systemctl daemon-reload</code>",
      objective: "Type systemctl daemon-reload",
      xp: 30,
      check: (c, a) => c === "systemctl" && a.includes("daemon-reload"),
    },

    // --- NETWORK DIAGNOSTICS (51-57) ---
    {
      title: "Ping Target",
      why: "The simplest network test. <b>ping</b> sends ICMP Echo Request packets to an IP. If the target receives them, it sends Echo Replies back. It proves basic physical and routing connectivity exists.",
      text: "Type <code>ping -c 4 8.8.8.8</code>",
      objective: "Ping 4 times",
      xp: 20,
      check: (c, a) => c === "ping" && a.includes("-c") && a.includes("4"),
    },
    {
      title: "Check IP Address",
      why: "The <b>ip a</b> (IP Address) command queries your physical and virtual network cards (like `eth0` or `wlan0`) to display your machine's local assigned IP addresses and MAC hardware addresses.",
      text: "Type <code>ip a</code>",
      objective: "Type ip a",
      xp: 15,
      check: (c, a) => c === "ip" && a[0] === "a",
    },
    {
      title: "Check Open Ports",
      why: "The <b>ss</b> (Socket Statistics) tool is replacing the legacy `netstat`. Passing <b>-tulnp</b> (TCP, UDP, Listening, Numeric, Process) reveals exactly what ports your server has opened to the internet, and which PID owns them.",
      text: "Type <code>ss -tulnp</code>",
      objective: "Type ss -tulnp",
      xp: 30,
      check: (c, a) => c === "ss" && a.includes("-tulnp"),
    },
    {
      title: "Trace Route",
      why: "If ping fails, where is the signal dying? <b>traceroute</b> maps the exact path your packets take as they jump from router to router across the internet, exposing broken nodes along the way.",
      text: "Type <code>traceroute 8.8.8.8</code>",
      objective: "Type traceroute",
      xp: 25,
      check: (c, a) => c === "traceroute" && a.includes("8.8.8.8"),
    },
    {
      title: "DNS Lookup",
      why: "When a user types 'google.com', DNS translates it into an IP address. The <b>dig</b> tool directly queries Domain Name Servers to troubleshoot translation failures or extract hidden TXT records.",
      text: "Type <code>dig google.com</code>",
      objective: "Type dig google.com",
      xp: 25,
      check: (c, a) => c === "dig" && a[0] === "google.com",
    },
    {
      title: "Curl Test",
      why: "Sometimes ping works, but the web server itself is broken. <b>curl -I</b> acts like a tiny web browser, reaching out to grab the raw HTTP Headers (like '200 OK' or '500 Internal Error') without downloading the website body.",
      text: "Type <code>curl -I http://localhost</code>",
      objective: "Type curl -I",
      xp: 25,
      check: (c, a) => c === "curl" && a.includes("-I"),
    },
    {
      title: "Check Routing Table",
      why: "The <b>ip route</b> command displays the kernel's internal map for routing traffic. It shows you the Default Gateway—the specific router your machine sends traffic to when it wants to reach the outside internet.",
      text: "Type <code>ip route</code>",
      objective: "Type ip route",
      xp: 20,
      check: (c, a) => c === "ip" && a[0] === "route",
    },

    // --- COMPILE A DIAGNOSTIC REPORT (58-65) ---
    {
      title: "Create Report File",
      why: "During a major outage, you must compile evidence for the post-mortem. Let's create an empty text file to serve as our incident report.",
      text: "Type <code>touch services.log</code>",
      objective: "Create services.log",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "services.log",
    },
    {
      title: "Log Date",
      why: "Evidence needs a timestamp. We execute the date command, but use the Append <b>>></b> operator to route the output directly into our report instead of the screen.",
      text: "Type <code>date >> services.log</code>",
      objective: "Append date to services.log",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("date") &&
        raw.includes(">>") &&
        raw.includes("services.log"),
    },
    {
      title: "Log Uptime",
      why: "Append the server's uptime and load averages to the report to document the CPU stress levels at the time of the incident.",
      text: "Type <code>uptime >> services.log</code>",
      objective: "Append uptime to services.log",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("uptime") &&
        raw.includes(">>") &&
        raw.includes("services.log"),
    },
    {
      title: "Log Process List",
      why: "Dump the active process list into the report. By capturing this, we preserve a historical snapshot of exactly what was running when the system failed.",
      text: "Type <code>ps aux >> services.log</code>",
      objective: "Append ps aux to services.log",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("ps") &&
        raw.includes("aux") &&
        raw.includes(">>") &&
        raw.includes("services.log"),
    },
    {
      title: "Read Services Report",
      why: "Use <code>cat</code> to open your compiled report and ensure the stream redirections accurately populated the file.",
      text: "Type <code>cat services.log</code>",
      objective: "Read services.log",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "services.log",
    },
    {
      title: "Isolate Active Tags",
      why: "Instead of reading the massive process list, use <b>grep</b> to filter the report, proving you can extract specific data sets from your custom logs.",
      text: 'Type <code>grep "Active:" services.log</code>',
      objective: "Grep Active: from services.log",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("Active:") && a.includes("services.log"),
    },
    {
      title: "Count Service Rows",
      why: "Use <b>wc -l</b> to check the exact length of your report. This ensures the data density matches your expectations.",
      text: "Type <code>wc -l services.log</code>",
      objective: "Line count services.log",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("services.log"),
    },
    {
      title: "Sign-Off Report",
      why: "You have successfully identified hardware specs, monitored running processes, diagnosed network faults, and managed systemd daemons. You are now a competent System Diagnostician.",
      text: 'Type <code>echo "Diagnostics Complete" >> services.log</code>',
      objective: "Append text into services.log",
      xp: 25,
      check: (c, a) =>
        c === "echo" && a.includes(">>") && a.includes("services.log"),
    },
  ],
};
