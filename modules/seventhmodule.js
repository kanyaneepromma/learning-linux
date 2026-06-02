// seventhmodule.js
// Module 7: Advanced Defensive Ops (Blue Team) - 65 Lessons

const module7_blueteam = {
    name: "7. Advanced Defensive Ops (65 Lessons)",
    lessons: [
        // --- PHASE 1: INITIAL TRIAGE & USER AUDITING (1-15) ---
        { title: "Active Users", why: "See who is currently logged into the server.", text: "Type <code>w</code>", objective: "Type w", xp: 10, check: (c) => c==="w" },
        { title: "User Details", why: "Alternative command to check active terminal sessions.", text: "Type <code>who</code>", objective: "Type who", xp: 10, check: (c) => c==="who" },
        { title: "Login History", why: "Check the history of successful logins.", text: "Type <code>last</code>", objective: "Type last", xp: 15, check: (c) => c==="last" },
        { title: "Limit History", why: "Read only the last 5 successful logins.", text: "Type <code>last -n 5</code>", objective: "Use last -n 5", xp: 20, check: (c,a) => c==="last" && a.includes("-n") && a.includes("5") },
        { title: "Check Root User", why: "Verify your own effective UID and GID.", text: "Type <code>id</code>", objective: "Type id", xp: 10, check: (c) => c==="id" },
        { title: "Read Passwd", why: "Print the system user database.", text: "Type <code>cat /etc/passwd</code>", objective: "cat /etc/passwd", xp: 10, check: (c,a) => c==="cat" && a[0]==="/etc/passwd" },
        { title: "Find Root Accounts", why: "Hackers create rogue accounts with UID 0 (Root).", text: "Type <code>grep \"x:0:\" /etc/passwd</code>", objective: "Grep x:0: from passwd", xp: 25, check: (c,a) => c==="grep" && a.includes("x:0:") && a.includes("/etc/passwd") },
        { title: "Find Login Shells", why: "See which users actually have interactive shells.", text: "Type <code>grep \"bash\" /etc/passwd</code>", objective: "Grep bash from passwd", xp: 20, check: (c,a) => c==="grep" && a.includes("bash") && a.includes("/etc/passwd") },
        { title: "Check Sudoers", why: "See who has administrative privileges.", text: "Type <code>cat /etc/sudoers</code>", objective: "cat /etc/sudoers", xp: 15, check: (c,a) => c==="cat" && a[0]==="/etc/sudoers" },
        { title: "Audit Sudoers", why: "Filter for lines granting ALL access.", text: "Type <code>grep \"ALL\" /etc/sudoers</code>", objective: "Grep ALL from sudoers", xp: 20, check: (c,a) => c==="grep" && a.includes("ALL") && a.includes("/etc/sudoers") },
        { title: "Read SSH Keys", why: "Check authorized keys for rogue backdoors.", text: "Type <code>cat ~/.ssh/authorized_keys</code>", objective: "cat authorized keys", xp: 20, check: (c,a) => c==="cat" && a[0]==="~/.ssh/authorized_keys" },
        { title: "Count SSH Keys", why: "Count how many keys are allowed access.", text: "Type <code>wc -l ~/.ssh/authorized_keys</code>", objective: "Line count authorized keys", xp: 20, check: (c,a) => c==="wc" && a.includes("-l") && a.includes("~/.ssh/authorized_keys") },
        { title: "Check Crontab", why: "Hackers use cron jobs for persistence.", text: "Type <code>crontab -l</code>", objective: "crontab -l", xp: 15, check: (c,a) => c==="crontab" && a.includes("-l") },
        { title: "System Cron", why: "Check the global system scheduled tasks.", text: "Type <code>cat /etc/crontab</code>", objective: "cat /etc/crontab", xp: 15, check: (c,a) => c==="cat" && a[0]==="/etc/crontab" },
        { title: "Verify Triage", why: "Log your initial findings.", text: "Type <code>echo \"Triage Complete\" > ir_log.txt</code>", objective: "Redirect to ir_log.txt", xp: 20, check: (c,a) => c==="echo" && a.includes(">") && a.includes("ir_log.txt") },

        // --- PHASE 2: LOG FORENSICS (16-30) ---
        { title: "Tail Auth Logs", why: "Read the last 10 lines of authentication logs.", text: "Type <code>tail /var/log/auth.log</code>", objective: "tail /var/log/auth.log", xp: 15, check: (c,a) => c==="tail" && a[0]==="/var/log/auth.log" },
        { title: "Deep Tail Auth", why: "Read the last 50 lines to find the breach.", text: "Type <code>tail -n 50 /var/log/auth.log</code>", objective: "tail -n 50 /var/log/auth.log", xp: 20, check: (c,a) => c==="tail" && a.includes("-n") && a.includes("50") },
        { title: "Find Failed Logins", why: "Filter the log for brute-force attempts.", text: "Type <code>grep \"Failed\" /var/log/auth.log</code>", objective: "Grep Failed from auth.log", xp: 25, check: (c,a) => c==="grep" && a.includes("Failed") && a.includes("/var/log/auth.log") },
        { title: "Find Accepted Logins", why: "Filter for successful breaches.", text: "Type <code>grep \"Accepted\" /var/log/auth.log</code>", objective: "Grep Accepted from auth.log", xp: 25, check: (c,a) => c==="grep" && a.includes("Accepted") && a.includes("/var/log/auth.log") },
        { title: "Isolate Attacker IP", why: "Extract the exact IP address of the attacker.", text: "Type <code>grep \"10.0.0.99\" /var/log/auth.log</code>", objective: "Grep the hacker IP", xp: 25, check: (c,a) => c==="grep" && a.includes("10.0.0.99") && a.includes("/var/log/auth.log") },
        { title: "Log Hacker IP", why: "Document the rogue IP.", text: "Type <code>echo \"Hacker IP: 10.0.0.99\" >> ir_log.txt</code>", objective: "Append IP to ir_log.txt", xp: 20, check: (c,a) => c==="echo" && a.includes(">>") && a.includes("ir_log.txt") },
        { title: "Tail Syslog", why: "Check system messages for malware execution.", text: "Type <code>tail /var/log/syslog</code>", objective: "tail /var/log/syslog", xp: 15, check: (c,a) => c==="tail" && a[0]==="/var/log/syslog" },
        { title: "Grep Segfaults", why: "Exploits often crash programs (segmentation faults).", text: "Type <code>grep \"segfault\" /var/log/syslog</code>", objective: "Grep segfault from syslog", xp: 25, check: (c,a) => c==="grep" && a.includes("segfault") },
        { title: "Grep Sudo Usage", why: "See if the attacker used sudo.", text: "Type <code>grep \"sudo\" /var/log/auth.log</code>", objective: "Grep sudo from auth.log", xp: 25, check: (c,a) => c==="grep" && a.includes("sudo") },
        { title: "Check Bash History", why: "Read the commands the attacker typed.", text: "Type <code>cat ~/.bash_history</code>", objective: "cat ~/.bash_history", xp: 15, check: (c,a) => c==="cat" && a[0]==="~/.bash_history" },
        { title: "Grep Wget/Curl", why: "See if they downloaded malware.", text: "Type <code>grep \"curl\" ~/.bash_history</code>", objective: "Grep curl from history", xp: 25, check: (c,a) => c==="grep" && a.includes("curl") },
        { title: "Grep Rm", why: "See what evidence they tried to delete.", text: "Type <code>grep \"rm\" ~/.bash_history</code>", objective: "Grep rm from history", xp: 25, check: (c,a) => c==="grep" && a.includes("rm") },
        { title: "Check Hidden Dirs", why: "Hackers hide tools in .hidden folders.", text: "Type <code>ls -la /tmp</code>", objective: "ls -la /tmp", xp: 15, check: (c,a) => c==="ls" && a.includes("-la") && a.includes("/tmp") },
        { title: "Find Suspicious Files", why: "Search /tmp for dropped payloads.", text: "Type <code>find /tmp -type f</code>", objective: "Find files in /tmp", xp: 20, check: (c,a) => c==="find" && a[0]==="/tmp" && a.includes("-type") },
        { title: "Log Malware Location", why: "Document the payload.", text: "Type <code>echo \"Malware at /tmp/shell.sh\" >> ir_log.txt</code>", objective: "Append finding to ir_log", xp: 20, check: (c,a) => c==="echo" && a.includes(">>") && a.includes("ir_log.txt") },

        // --- PHASE 3: NETWORK CONTAINMENT (31-45) ---
        { title: "Check Open Sockets", why: "Identify rogue listening backdoors.", text: "Type <code>netstat -tuln</code>", objective: "netstat -tuln", xp: 15, check: (c,a) => c==="netstat" && a.includes("-tuln") },
        { title: "Grep High Ports", why: "Backdoors usually listen on high ports (like 4444).", text: "Type <code>netstat -tuln | grep 4444</code>", objective: "Grep 4444 from netstat", xp: 30, check: (c,a) => c==="netstat" || c==="grep" }, // Simulated validation 
        { title: "Log Rogue Port", why: "Document the backdoor port.", text: "Type <code>echo \"Port 4444 Open\" >> ir_log.txt</code>", objective: "Append to ir_log", xp: 20, check: (c,a) => c==="echo" && a.includes(">>") && a.includes("ir_log.txt") },
        { title: "Check Firewall", why: "View current iptables rules.", text: "Type <code>iptables -L</code>", objective: "iptables -L", xp: 15, check: (c,a) => c==="iptables" && a.includes("-L") },
        { title: "Block Attacker IP", why: "Sever the attacker's connection completely.", text: "Type <code>iptables -A INPUT -s 10.0.0.99 -j DROP</code>", objective: "Block 10.0.0.99 via iptables", xp: 40, check: (c,a) => c==="iptables" && a.includes("-A") && a.includes("INPUT") && a.includes("10.0.0.99") && a.includes("DROP") },
        { title: "Verify Block", why: "Check that the rule was appended.", text: "Type <code>iptables -L</code>", objective: "iptables -L", xp: 15, check: (c,a) => c==="iptables" && a.includes("-L") },
        { title: "Block Outbound IP", why: "Stop malware from reaching the C2 server.", text: "Type <code>iptables -A OUTPUT -d evil.com -j DROP</code>", objective: "Block outbound to evil.com", xp: 40, check: (c,a) => c==="iptables" && a.includes("-A") && a.includes("OUTPUT") && a.includes("DROP") },
        { title: "Block Backdoor Port", why: "Close the firewall on port 4444.", text: "Type <code>iptables -A INPUT -p tcp --dport 4444 -j DROP</code>", objective: "Block port 4444", xp: 40, check: (c,a) => c==="iptables" && a.includes("-A") && a.includes("4444") && a.includes("DROP") },
        { title: "Save Rules", why: "Ensure rules survive a reboot (Simulated).", text: "Type <code>iptables-save > /etc/iptables.rules</code>", objective: "Redirect iptables-save", xp: 30, check: (c,a) => c==="iptables-save" && a.includes(">") },
        { title: "Verify Save", why: "Check the saved firewall config.", text: "Type <code>cat /etc/iptables.rules</code>", objective: "cat /etc/iptables.rules", xp: 15, check: (c,a) => c==="cat" && a[0]==="/etc/iptables.rules" },
        { title: "Check Active Connections", why: "See established TCP connections.", text: "Type <code>netstat -tnpa</code>", objective: "netstat -tnpa", xp: 25, check: (c,a) => c==="netstat" && a.includes("-tnpa") },
        { title: "Find Suspicious PID", why: "Identify the Process ID (PID) of the backdoor.", text: "Type <code>netstat -tulnp</code>", objective: "netstat -tulnp", xp: 25, check: (c,a) => c==="netstat" && a.includes("-tulnp") },
        { title: "Log PID", why: "Document the malicious Process ID.", text: "Type <code>echo \"Rogue PID 1337\" >> ir_log.txt</code>", objective: "Append PID to log", xp: 20, check: (c,a) => c==="echo" && a.includes(">>") && a.includes("ir_log.txt") },
        { title: "Check Process Tree", why: "See what spawned the malware.", text: "Type <code>ps aux</code>", objective: "ps aux", xp: 20, check: (c,a) => c==="ps" && a[0]==="aux" },
        { title: "Grep Rogue Process", why: "Filter process list for the malware.", text: "Type <code>ps aux | grep shell</code>", objective: "Grep shell from ps", xp: 25, check: (c,a) => c==="ps" || c==="grep" },

        // --- PHASE 4: ERADICATION & HARDENING (46-55) ---
        { title: "Kill Malware", why: "Terminate the malicious process forcefully.", text: "Type <code>kill -9 1337</code>", objective: "kill -9 1337", xp: 35, check: (c,a) => c==="kill" && a.includes("-9") && a.includes("1337") },
        { title: "Verify Kill", why: "Ensure the process is dead.", text: "Type <code>ps aux | grep 1337</code>", objective: "Check if PID exists", xp: 20, check: (c,a) => c==="ps" || c==="grep" },
        { title: "Remove Payload", why: "Delete the executable from disk.", text: "Type <code>rm /tmp/shell.sh</code>", objective: "rm /tmp/shell.sh", xp: 15, check: (c,a) => c==="rm" && a[0]==="/tmp/shell.sh" },
        { title: "Remove Cronjob", why: "Destroy the persistence mechanism.", text: "Type <code>crontab -r</code>", objective: "crontab -r", xp: 25, check: (c,a) => c==="crontab" && a.includes("-r") },
        { title: "Clean SSH Keys", why: "Remove the attacker's backdoor key.", text: "Type <code>echo \"\" > ~/.ssh/authorized_keys</code>", objective: "Empty authorized keys", xp: 30, check: (c,a) => c==="echo" && a.includes(">") && a.includes("authorized_keys") },
        { title: "Hunt SUID Binaries", why: "Find misconfigured privileges.", text: "Type <code>find / -perm -4000</code>", objective: "find / -perm -4000", xp: 30, check: (c,a) => c==="find" && a.includes("-perm") && a.includes("-4000") },
        { title: "Fix SUID Binary", why: "Remove the SUID bit from a compromised file.", text: "Type <code>chmod -s /usr/bin/ping</code>", objective: "chmod -s /usr/bin/ping", xp: 40, check: (c,a) => c==="chmod" && a.includes("-s") && a.includes("/usr/bin/ping") },
        { title: "Fix File Ownership", why: "Reclaim a stolen file for root.", text: "Type <code>chown root:root /etc/passwd</code>", objective: "chown root:root /etc/passwd", xp: 40, check: (c,a) => c==="chown" && a[0]==="root:root" && a[1]==="/etc/passwd" },
        { title: "Lock File Perms", why: "Make a critical file read-only.", text: "Type <code>chmod 644 /etc/passwd</code>", objective: "chmod 644 /etc/passwd", xp: 30, check: (c,a) => c==="chmod" && a[0]==="644" && a[1]==="/etc/passwd" },
        { title: "Verify Permissions", why: "Check the hardening results.", text: "Type <code>ls -l /etc/passwd</code>", objective: "ls -l /etc/passwd", xp: 15, check: (c,a) => c==="ls" && a.includes("-l") && a.includes("/etc/passwd") },

        // --- PHASE 5: FILE INTEGRITY & REPORTING (56-65) ---
        { title: "Generate Hash", why: "Create a cryptographic signature of a file.", text: "Type <code>sha256sum /etc/passwd</code>", objective: "sha256sum /etc/passwd", xp: 25, check: (c,a) => c==="sha256sum" && a[0]==="/etc/passwd" },
        { title: "Hash Malware", why: "Get the signature of the remaining exploit binary.", text: "Type <code>sha256sum /tmp/exploit.bin</code>", objective: "sha256sum /tmp/exploit.bin", xp: 25, check: (c,a) => c==="sha256sum" && a[0]==="/tmp/exploit.bin" },
        { title: "Log Malware Hash", why: "Save the signature for Threat Intel.", text: "Type <code>sha256sum /tmp/exploit.bin >> ir_log.txt</code>", objective: "Append hash to ir_log.txt", xp: 30, check: (c,a) => c==="sha256sum" && a.includes(">>") && a.includes("ir_log.txt") },
        { title: "Destroy Malware", why: "Eradicate the final payload.", text: "Type <code>rm /tmp/exploit.bin</code>", objective: "rm /tmp/exploit.bin", xp: 15, check: (c,a) => c==="rm" && a[0]==="/tmp/exploit.bin" },
        { title: "Clear Attack Cache", why: "Remove attacker artifacts from temp space.", text: "Type <code>rm -rf /tmp/.cache</code>", objective: "rm -rf /tmp/.cache", xp: 25, check: (c,a) => c==="rm" && a.includes("-rf") && a.includes("/tmp/.cache") },
        { title: "Final System Check", why: "Verify no listening backdoors remain.", text: "Type <code>netstat -tuln</code>", objective: "netstat -tuln", xp: 15, check: (c,a) => c==="netstat" && a.includes("-tuln") },
        { title: "Final Process Check", why: "Verify no rogue processes remain.", text: "Type <code>ps aux</code>", objective: "ps aux", xp: 15, check: (c,a) => c==="ps" && a[0]==="aux" },
        { title: "Review IR Log", why: "Check your complete Incident Response report.", text: "Type <code>cat ir_log.txt</code>", objective: "cat ir_log.txt", xp: 15, check: (c,a) => c==="cat" && a[0]==="ir_log.txt" },
        { title: "Archive IR Report", why: "Package the evidence for the CISO.", text: "Type <code>tar -czvf incident_report.tar.gz ir_log.txt</code>", objective: "tar the ir_log", xp: 40, check: (c,a) => c==="tar" && a.includes("-czvf") && a.includes("incident_report.tar.gz") },
        { title: "Close Incident", why: "Module 7 Complete.", text: "Type <code>echo \"Incident Closed\"</code>", objective: "echo Incident Closed", xp: 20, check: (c,a) => c==="echo" && a.includes("Incident") }
    ]
};