// fourthmodule.js
// Module 4: System Diagnostics (65 Lessons)

const module4_diagnostics = {
    name: "4. System Diagnostics (65 Lessons)",
    lessons: [
        // --- TIME & UPTIME TRACKING (1-10) ---
        { title: "Current Date", why: "Check the server's local time.", text: "Type <code>date</code>", objective: "Type date", xp: 10, check: (c) => c==="date" },
        { title: "Universal Time", why: "Check UTC time.", text: "Type <code>date -u</code>", objective: "Type date -u", xp: 15, check: (c,a) => c==="date" && a.includes("-u") },
        { title: "RFC 2822 Format", why: "Output time in standard email format.", text: "Type <code>date -R</code>", objective: "Type date -R", xp: 15, check: (c,a) => c==="date" && a.includes("-R") },
        { title: "Custom Formatting", why: "Extract just the year, month, and day.", text: "Type <code>date +\"%Y-%m-%d\"</code>", objective: "Format date via +\"%Y-%m-%d\"", xp: 20, check: (c,a) => c==="date" && a[0]==="+\"%Y-%m-%d\"" },
        { title: "Server Uptime", why: "See how long the server has been running.", text: "Type <code>uptime</code>", objective: "Type uptime", xp: 10, check: (c) => c==="uptime" },
        { title: "Pretty Uptime", why: "Make the uptime string easier to read.", text: "Type <code>uptime -p</code>", objective: "Type uptime -p", xp: 15, check: (c,a) => c==="uptime" && a.includes("-p") },
        { title: "Since Uptime", why: "See the exact time the system booted.", text: "Type <code>uptime -s</code>", objective: "Type uptime -s", xp: 15, check: (c,a) => c==="uptime" && a.includes("-s") },
        { title: "Identify Session", why: "Verify your current logged-in identity.", text: "Type <code>whoami</code>", objective: "Type whoami", xp: 10, check: (c) => c==="whoami" },
        { title: "Log Start Time", why: "Write the current time into a log.", text: "Type <code>date > diag.txt</code>", objective: "Redirect date into diag.txt", xp: 20, check: (c,a) => c==="date" && a.includes(">") && a.includes("diag.txt") },
        { title: "Log Uptime", why: "Append the uptime underneath the date.", text: "Type <code>uptime >> diag.txt</code>", objective: "Append uptime into diag.txt", xp: 20, check: (c,a) => c==="uptime" && a.includes(">>") && a.includes("diag.txt") },

        // --- IDENTITY & DIAGNOSTIC LOGS (11-20) ---
        { title: "Log Identity", why: "Append your user ID to the log.", text: "Type <code>whoami >> diag.txt</code>", objective: "Append whoami into diag.txt", xp: 20, check: (c,a) => c==="whoami" && a.includes(">>") && a.includes("diag.txt") },
        { title: "Read Diagnostics", why: "Review your compiled diagnostic report.", text: "Type <code>cat diag.txt</code>", objective: "Read diag.txt", xp: 10, check: (c,a) => c==="cat" && a[0]==="diag.txt" },
        { title: "Line Audit", why: "Check how many lines are in your log.", text: "Type <code>wc -l diag.txt</code>", objective: "Run line count on diag.txt", xp: 15, check: (c,a) => c==="wc" && a.includes("-l") && a.includes("diag.txt") },
        { title: "Byte Audit", why: "Check the file size of the log in bytes.", text: "Type <code>wc -c diag.txt</code>", objective: "Run byte count on diag.txt", xp: 15, check: (c,a) => c==="wc" && a.includes("-c") && a.includes("diag.txt") },
        { title: "Audit Users", why: "Check the system user database.", text: "Type <code>cat /etc/passwd</code>", objective: "Read /etc/passwd", xp: 15, check: (c,a) => c==="cat" && a[0]==="/etc/passwd" },
        { title: "Find Root", why: "Isolate the root user configuration.", text: "Type <code>grep \"root\" /etc/passwd</code>", objective: "Grep root from /etc/passwd", xp: 20, check: (c,a) => c==="grep" && a.includes("root") && a.includes("/etc/passwd") },
        { title: "Find Admin", why: "Isolate your sysadmin configuration.", text: "Type <code>grep \"sysadmin\" /etc/passwd</code>", objective: "Grep sysadmin from /etc/passwd", xp: 20, check: (c,a) => c==="grep" && a.includes("sysadmin") && a.includes("/etc/passwd") },
        { title: "Count Users", why: "Quickly count the number of system accounts.", text: "Type <code>wc -l /etc/passwd</code>", objective: "Line count /etc/passwd", xp: 20, check: (c,a) => c==="wc" && a.includes("-l") && a.includes("/etc/passwd") },
        { title: "Top Users", why: "Read the top entries in the password file.", text: "Type <code>head /etc/passwd</code>", objective: "Use head on /etc/passwd", xp: 15, check: (c,a) => c==="head" && a[0]==="/etc/passwd" },
        { title: "Slice Top Users", why: "Slice exactly 2 lines off the top.", text: "Type <code>head -n 2 /etc/passwd</code>", objective: "Head slice 2 lines off /etc/passwd", xp: 20, check: (c,a) => c==="head" && a.includes("-n") && a.includes("2") },

        // --- DISK STORAGE AUDITING (21-35) ---
        { title: "Disk Free", why: "Print raw 1K-block filesystem capacities.", text: "Type <code>df</code>", objective: "Type df", xp: 10, check: (c) => c==="df" },
        { title: "Human Readable Disk", why: "Convert blocks into Megabytes and Gigabytes.", text: "Type <code>df -h</code>", objective: "Type df -h", xp: 15, check: (c,a) => c==="df" && a.includes("-h") },
        { title: "Disk in Kilobytes", why: "Force output in KB.", text: "Type <code>df -k</code>", objective: "Type df -k", xp: 15, check: (c,a) => c==="df" && a.includes("-k") },
        { title: "Disk in Megabytes", why: "Force output in MB.", text: "Type <code>df -m</code>", objective: "Type df -m", xp: 15, check: (c,a) => c==="df" && a.includes("-m") },
        { title: "Filesystem Types", why: "Print the type (ext4, tmpfs) of each mount.", text: "Type <code>df -T</code>", objective: "Type df -T", xp: 20, check: (c,a) => c==="df" && a.includes("-T") },
        { title: "Check Root Mount", why: "Check storage on just the root partition.", text: "Type <code>df -h /</code>", objective: "Type df -h /", xp: 20, check: (c,a) => c==="df" && a.includes("-h") && a.includes("/") },
        { title: "Check Log Mount", why: "Check storage on the log partition.", text: "Type <code>df -h /var/log</code>", objective: "Type df -h /var/log", xp: 20, check: (c,a) => c==="df" && a.includes("-h") && a.includes("/var/log") },
        { title: "Check Temp Mount", why: "Check storage on the temporary partition.", text: "Type <code>df -h /tmp</code>", objective: "Type df -h /tmp", xp: 20, check: (c,a) => c==="df" && a.includes("-h") && a.includes("/tmp") },
        { title: "All Filesystems", why: "Include dummy, pseudo, and hidden filesystems.", text: "Type <code>df -a</code>", objective: "Type df -a", xp: 20, check: (c,a) => c==="df" && a.includes("-a") },
        { title: "Inode Capacity", why: "Check if you ran out of file indices (Inodes).", text: "Type <code>df -i</code>", objective: "Type df -i", xp: 20, check: (c,a) => c==="df" && a.includes("-i") },
        { title: "Log Disk Check", why: "Pipe disk status into a new log file.", text: "Type <code>df -h > disk_check.txt</code>", objective: "Redirect df -h into disk_check.txt", xp: 25, check: (c,a) => c==="df" && a.includes("-h") && a.includes(">") && a.includes("disk_check.txt") },
        { title: "Read Disk Log", why: "Verify the piped output.", text: "Type <code>cat disk_check.txt</code>", objective: "Read disk_check.txt", xp: 10, check: (c,a) => c==="cat" && a[0]==="disk_check.txt" },
        { title: "Grep Partition", why: "Find specific drives inside the log.", text: "Type <code>grep \"sda1\" disk_check.txt</code>", objective: "Grep sda1 from disk_check.txt", xp: 20, check: (c,a) => c==="grep" && a.includes("sda1") && a.includes("disk_check.txt") },
        { title: "Count Partitions", why: "Count how many drives are mounted.", text: "Type <code>wc -l disk_check.txt</code>", objective: "Line count disk_check.txt", xp: 15, check: (c,a) => c==="wc" && a.includes("-l") && a.includes("disk_check.txt") },
        { title: "Extract Disk Headers", why: "Slice just the header labels.", text: "Type <code>head -n 1 disk_check.txt</code>", objective: "Head slice 1 line off disk_check.txt", xp: 20, check: (c,a) => c==="head" && a.includes("-n") && a.includes("1") && a.includes("disk_check.txt") },

        // --- RAM & MEMORY PROFILING (36-50) ---
        { title: "Free Memory", why: "Print active RAM data.", text: "Type <code>free</code>", objective: "Type free", xp: 10, check: (c) => c==="free" },
        { title: "RAM in Megabytes", why: "Convert memory values into MB.", text: "Type <code>free -m</code>", objective: "Type free -m", xp: 15, check: (c,a) => c==="free" && a.includes("-m") },
        { title: "RAM in Gigabytes", why: "Convert memory values into GB.", text: "Type <code>free -g</code>", objective: "Type free -g", xp: 15, check: (c,a) => c==="free" && a.includes("-g") },
        { title: "Human Readable RAM", why: "Auto-scale sizes based on capacity.", text: "Type <code>free -h</code>", objective: "Type free -h", xp: 15, check: (c,a) => c==="free" && a.includes("-h") },
        { title: "RAM Totals", why: "Print an extra row calculating total used vs free.", text: "Type <code>free -t</code>", objective: "Type free -t", xp: 20, check: (c,a) => c==="free" && a.includes("-t") },
        { title: "Wide Format RAM", why: "Disable line breaks for wide terminal output.", text: "Type <code>free -w</code>", objective: "Type free -w", xp: 20, check: (c,a) => c==="free" && a.includes("-w") },
        { title: "Combined RAM Flags", why: "Human readable + totals row.", text: "Type <code>free -h -t</code>", objective: "Type free -h -t", xp: 25, check: (c,a) => c==="free" && a.includes("-h") && a.includes("-t") },
        { title: "Log Memory Profiler", why: "Pipe MB data into a tracker.", text: "Type <code>free -m > ram_check.txt</code>", objective: "Redirect free -m to ram_check.txt", xp: 25, check: (c,a) => c==="free" && a.includes("-m") && a.includes(">") && a.includes("ram_check.txt") },
        { title: "Read Memory Log", why: "Verify the capture.", text: "Type <code>cat ram_check.txt</code>", objective: "Read ram_check.txt", xp: 10, check: (c,a) => c==="cat" && a[0]==="ram_check.txt" },
        { title: "Isolate RAM Row", why: "Grep just the physical memory.", text: "Type <code>grep \"Mem:\" ram_check.txt</code>", objective: "Grep Mem: from ram_check.txt", xp: 20, check: (c,a) => c==="grep" && a.includes("Mem:") && a.includes("ram_check.txt") },
        { title: "Isolate Swap Row", why: "Grep just the virtual paging memory.", text: "Type <code>grep \"Swap:\" ram_check.txt</code>", objective: "Grep Swap: from ram_check.txt", xp: 20, check: (c,a) => c==="grep" && a.includes("Swap:") && a.includes("ram_check.txt") },
        { title: "Count Memory Rows", why: "Audit the size of the output.", text: "Type <code>wc -l ram_check.txt</code>", objective: "Line count ram_check.txt", xp: 15, check: (c,a) => c==="wc" && a.includes("-l") && a.includes("ram_check.txt") },
        { title: "Extract Memory Headers", why: "Slice just the header labels.", text: "Type <code>head -n 2 ram_check.txt</code>", objective: "Head slice 2 lines off ram_check.txt", xp: 20, check: (c,a) => c==="head" && a.includes("-n") && a.includes("2") && a.includes("ram_check.txt") },
        { title: "RAM in Bytes", why: "Force absolute granular sizing.", text: "Type <code>free -b</code>", objective: "Type free -b", xp: 15, check: (c,a) => c==="free" && a.includes("-b") },
        { title: "RAM in Kilobytes", why: "Force standard scaling.", text: "Type <code>free -k</code>", objective: "Type free -k", xp: 15, check: (c,a) => c==="free" && a.includes("-k") },

        // --- BACKGROUND DAEMONS & SERVICES (51-65) ---
        { title: "Check SSH Daemon", why: "See if secure shell is running.", text: "Type <code>systemctl status ssh</code>", objective: "Check status of ssh", xp: 20, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="ssh" },
        { title: "Check Nginx Daemon", why: "See if the web server is offline.", text: "Type <code>systemctl status nginx</code>", objective: "Check status of nginx", xp: 20, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="nginx" },
        { title: "Start Web Server", why: "Power up the Nginx process.", text: "Type <code>systemctl start nginx</code>", objective: "Start the nginx service", xp: 30, check: (c,a) => c==="systemctl" && a[0]==="start" && a[1]==="nginx" },
        { title: "Verify Web Server", why: "Ensure it didn't crash on boot.", text: "Type <code>systemctl status nginx</code>", objective: "Check status of nginx", xp: 20, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="nginx" },
        { title: "Check Docker Engine", why: "See if containers are active.", text: "Type <code>systemctl status docker</code>", objective: "Check status of docker", xp: 20, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="docker" },
        { title: "Start Docker Engine", why: "Initialize container systems.", text: "Type <code>systemctl start docker</code>", objective: "Start the docker service", xp: 30, check: (c,a) => c==="systemctl" && a[0]==="start" && a[1]==="docker" },
        { title: "Verify Docker Engine", why: "Confirm successful boot.", text: "Type <code>systemctl status docker</code>", objective: "Check status of docker", xp: 20, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="docker" },
        { title: "Log SSH Status", why: "Begin compiling a services report.", text: "Type <code>systemctl status ssh > services.log</code>", objective: "Redirect ssh status into services.log", xp: 25, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="ssh" && a.includes(">") && a.includes("services.log") },
        { title: "Log Nginx Status", why: "Append the web server to the report.", text: "Type <code>systemctl status nginx >> services.log</code>", objective: "Append nginx status into services.log", xp: 25, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="nginx" && a.includes(">>") && a.includes("services.log") },
        { title: "Log Docker Status", why: "Append container engine to the report.", text: "Type <code>systemctl status docker >> services.log</code>", objective: "Append docker status into services.log", xp: 25, check: (c,a) => c==="systemctl" && a[0]==="status" && a[1]==="docker" && a.includes(">>") && a.includes("services.log") },
        { title: "Read Services Report", why: "View your compiled system checks.", text: "Type <code>cat services.log</code>", objective: "Read services.log", xp: 10, check: (c,a) => c==="cat" && a[0]==="services.log" },
        { title: "Isolate Active Tags", why: "Filter the logs for 'Active' status rows only.", text: "Type <code>grep \"Active:\" services.log</code>", objective: "Grep Active: from services.log", xp: 20, check: (c,a) => c==="grep" && a.includes("Active:") && a.includes("services.log") },
        { title: "Count Service Rows", why: "Ensure data density is correct.", text: "Type <code>wc -l services.log</code>", objective: "Line count services.log", xp: 15, check: (c,a) => c==="wc" && a.includes("-l") && a.includes("services.log") },
        { title: "Sign-Off Report", why: "Append a custom text string to conclude.", text: "Type <code>echo \"Diagnostics Complete\" >> services.log</code>", objective: "Append text into services.log", xp: 25, check: (c,a) => c==="echo" && a.includes(">>") && a.includes("services.log") },
        { title: "Final Validation", why: "Module complete.", text: "Type <code>cat services.log</code>", objective: "Read final services.log", xp: 15, check: (c,a) => c==="cat" && a[0]==="services.log" }
    ]
};