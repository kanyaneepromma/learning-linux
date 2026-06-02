// quest.js
// 30 Ultimate Cyber Quests

const quests = [
  // --- TIER 1: FOUNDATIONS ---
  {
    id: "q1", title: "The Appender", difficulty: "Medium", reward: 200,
    description: "Create a file named `log.txt`, echo 'Start' into it, then append `>>` 'End' to it.",
    objective: "echo Start > log.txt, then echo End >> log.txt",
    check: () => { let n = getVfsNode("/home/sysadmin/log.txt"); return n && n.content.includes("Start") && n.content.includes("End"); }
  },
  {
    id: "q2", title: "Hidden Cleaner", difficulty: "Hard", reward: 300,
    description: "Navigate to `/home/sysadmin`, create a hidden directory `.trash`, and move `notes.txt` into it.",
    objective: "mkdir .trash && mv notes.txt .trash/",
    check: () => { let n = getVfsNode("/home/sysadmin/.trash/notes.txt"); return n !== null; }
  },
  {
    id: "q3", title: "Log Investigator", difficulty: "Hard", reward: 400,
    description: "Grep for 'Failed' inside /var/log/auth.log.",
    objective: "Use grep Failed on auth.log",
    check: (c, a) => c === "grep" && a.includes("Failed") && a.some((x) => x.includes("auth.log"))
  },
  {
    id: "q4", title: "System Rebooter", difficulty: "Ultimate", reward: 800,
    description: "Check `systemctl status nginx`, then start it.",
    objective: "Start the nginx daemon",
    check: () => runningServices["nginx"] === true
  },

  // --- TIER 2: NETWORK & RED TEAM ---
  {
    id: "q5", title: "Network Recon", difficulty: "Hard", reward: 500,
    description: "Perform an aggressive Nmap scan on localhost and save the output to `recon.txt`.",
    objective: "nmap -A localhost > recon.txt",
    check: (c, a) => c === "nmap" && a.includes("-A") && a.includes("localhost") && a.includes(">") && a.includes("recon.txt")
  },
  {
    id: "q6", title: "Rogue Terminator", difficulty: "Medium", reward: 400,
    description: "A malicious process is running on PID 1337. Send a SIGKILL (-9) to terminate it.",
    objective: "kill -9 1337",
    check: (c, a) => c === "kill" && a.includes("-9") && a.includes("1337")
  },
  {
    id: "q7", title: "The Firewall Architect", difficulty: "Ultimate", reward: 1000,
    description: "The host `10.0.0.99` is attacking! Use iptables to append (-A) a rule to the INPUT chain to DROP their source (-s) traffic.",
    objective: "iptables -A INPUT -s 10.0.0.99 -j DROP",
    check: (c, a) => c === "iptables" && a.includes("INPUT") && a.includes("10.0.0.99") && a.includes("DROP")
  },
  {
    id: "q8", title: "Evidence Destroyer", difficulty: "Hard", reward: 600,
    description: "You've finished your Red Team operation. Overwrite your `~/.bash_history` file with nothing (an empty string) using echo.",
    objective: "echo \"\" > ~/.bash_history",
    check: (c, a) => c === "echo" && a.includes(">") && a.includes("~/.bash_history")
  },

  // --- TIER 3: PERSISTENCE & PRIV ESC ---
  {
    id: "q9", title: "Persistence Hunter", difficulty: "Medium", reward: 400,
    description: "Check the active scheduled tasks for the current user to see if a backdoor is installed.",
    objective: "crontab -l",
    check: (c, a) => c === "crontab" && a.includes("-l")
  },
  {
    id: "q10", title: "Data Exfiltrator", difficulty: "Ultimate", reward: 1200,
    description: "Archive the file `secret.txt` into a compressed tarball named `loot.tar.gz`.",
    objective: "tar -czvf loot.tar.gz secret.txt",
    check: (c, a) => c === "tar" && a.includes("-czvf") && a.includes("loot.tar.gz")
  },
  {
    id: "q11", title: "Malware Profiler", difficulty: "Hard", reward: 800,
    description: "Generate a cryptographic SHA256 hash of the binary `/tmp/exploit.bin` and append it to `ir_log.txt`.",
    objective: "sha256sum /tmp/exploit.bin >> ir_log.txt",
    check: (c, a) => c === "sha256sum" && a.includes("/tmp/exploit.bin") && a.includes(">>") && a.includes("ir_log.txt")
  },
  {
    id: "q12", title: "SUID Privilege Escalation", difficulty: "Ultimate", reward: 1500,
    description: "Search the entire root filesystem (`/`) for files with the SUID permission bit set (`-perm -4000`).",
    objective: "find / -perm -4000",
    check: (c, a) => c === "find" && a.includes("/") && a.includes("-perm") && a.includes("-4000")
  },

  // --- TIER 4: ADVANCED SYSADMIN ---
  {
    id: "q13", title: "The Groupie", difficulty: "Medium", reward: 500,
    description: "Use usermod to append (-aG) the user 'hacker' to the 'wheel' group.",
    objective: "usermod -aG wheel hacker",
    check: (c, a) => c === "usermod" && a.includes("-aG") && a.includes("wheel") && a.includes("hacker")
  },
  {
    id: "q14", title: "The Installer", difficulty: "Medium", reward: 400,
    description: "Install the package 'nmap' using the apt package manager and auto-confirm (-y).",
    objective: "apt install nmap -y",
    check: (c, a) => c === "apt" && a.includes("install") && a.includes("nmap")
  },
  {
    id: "q15", title: "The Silent Sleeper", difficulty: "Hard", reward: 600,
    description: "Run `sleep 600` in the background (&) completely immune to hangups using nohup.",
    objective: "nohup sleep 600 &",
    check: (c, a) => c === "nohup" && a.includes("sleep") && a.includes("600") && a.includes("&")
  },
  {
    id: "q16", title: "Tarball Inspector", difficulty: "Hard", reward: 600,
    description: "List the internal contents of `archive.tar.gz` without extracting it.",
    objective: "tar -tzvf archive.tar.gz",
    check: (c, a) => c === "tar" && a.includes("-tzvf") && a.includes("archive.tar.gz")
  },
  {
    id: "q17", title: "Disk Detective", difficulty: "Medium", reward: 400,
    description: "Check the human-readable disk free space exclusively on the `/var/log` partition.",
    objective: "df -h /var/log",
    check: (c, a) => c === "df" && a.includes("-h") && a.includes("/var/log")
  },

  // --- TIER 5: OFFENSIVE WEAPONIZATION ---
  {
    id: "q18", title: "Hydra Striker", difficulty: "Ultimate", reward: 1200,
    description: "Brute force SSH on 10.0.0.50 using user 'admin' and the 'rockyou.txt' password list.",
    objective: "hydra -l admin -P rockyou.txt ssh://10.0.0.50",
    check: (c, a) => c === "hydra" && a.includes("-l") && a.includes("admin") && a.includes("-P") && a.includes("rockyou.txt") && a.includes("ssh://10.0.0.50")
  },
  {
    id: "q19", title: "Directory Buster", difficulty: "Hard", reward: 800,
    description: "Run gobuster in 'dir' mode against 'http://10.0.0.50' using the wordlist 'words.txt'.",
    objective: "gobuster dir -u http://10.0.0.50 -w words.txt",
    check: (c, a) => c === "gobuster" && a.includes("dir") && a.includes("-u") && a.some(x=>x.includes("10.0.0.50")) && a.includes("-w")
  },
  {
    id: "q20", title: "SQL Dumper", difficulty: "Ultimate", reward: 1500,
    description: "Use sqlmap against 'http://10.0.0.50/view.php?id=1' to completely dump the 'users' table from the 'admin_db' database.",
    objective: "sqlmap -u URL -D admin_db -T users --dump",
    check: (c, a) => c === "sqlmap" && a.includes("-u") && a.includes("-D") && a.includes("admin_db") && a.includes("-T") && a.includes("users") && a.includes("--dump")
  },
  {
    id: "q21", title: "Venomous Payload", difficulty: "Ultimate", reward: 1500,
    description: "Generate a linux elf reverse tcp shell using msfvenom targeting LHOST=10.0.0.99 and LPORT=4444.",
    objective: "msfvenom -p linux/x64/shell_reverse_tcp -f elf",
    check: (c, a) => c === "msfvenom" && a.includes("-p") && a.includes("linux/x64/shell_reverse_tcp") && a.includes("-f") && a.includes("elf")
  },
  {
    id: "q22", title: "Hash Cracker", difficulty: "Hard", reward: 1000,
    description: "Use hashcat to crack an MD5 hash (mode 0) in attack mode 0 against 'hash.txt' using 'rockyou.txt'.",
    objective: "hashcat -m 0 -a 0 hash.txt rockyou.txt",
    check: (c, a) => c === "hashcat" && a.includes("-m") && a.includes("0") && a.includes("-a") && a.includes("0")
  },
  {
    id: "q23", title: "Netcat Catcher", difficulty: "Medium", reward: 500,
    description: "Set up a listening, verbose, numeric netcat server on port 4444 to catch a reverse shell.",
    objective: "nc -lvnp 4444",
    check: (c, a) => c === "nc" && a.includes("-lvnp") && a.includes("4444")
  },

  // --- TIER 6: BASH MAGIC & AUTOMATION ---
  {
    id: "q24", title: "Variable Master", difficulty: "Medium", reward: 400,
    description: "Set and export an environment variable named TARGET pointing to '10.0.0.50'.",
    objective: "export TARGET=10.0.0.50",
    check: (c, a, o, raw) => (c === "export" && a.some(x=>x.includes("TARGET"))) || raw.includes("TARGET=10.0.0.50")
  },
  {
    id: "q25", title: "Alias Architect", difficulty: "Medium", reward: 400,
    description: "Create an alias named 'll' that executes 'ls -la'.",
    objective: "alias ll='ls -la'",
    check: (c, a, o, raw) => c === "alias" && raw.includes("ll=") && raw.includes("ls -la")
  },
  {
    id: "q26", title: "The Loop Builder", difficulty: "Ultimate", reward: 1200,
    description: "Write a for loop that pings the IPs 10.0.0.1 through 10.0.0.5 with 1 packet each.",
    objective: "for i in {1..5}; do ping -c 1 10.0.0.$i; done",
    check: (c, a, o, raw) => c === "for" && raw.includes("ping") && raw.includes("{1..5}")
  },
  {
    id: "q27", title: "The Awkward Parser", difficulty: "Hard", reward: 800,
    description: "Use awk to extract ONLY the first column (usernames) from `/etc/passwd`, using a colon ':' as the delimiter.",
    objective: "awk -F ':' '{print $1}' /etc/passwd",
    check: (c, a, o, raw) => c === "awk" && raw.includes("-F") && raw.includes(":") && raw.includes("print $1") && raw.includes("/etc/passwd")
  },
  {
    id: "q28", title: "Stream Editor", difficulty: "Hard", reward: 800,
    description: "Use sed to globally replace the word 'hate' with 'love' in a piped text stream.",
    objective: "sed 's/hate/love/g'",
    check: (c, a, o, raw) => c === "sed" && raw.includes("s/hate/love/g")
  },
  {
    id: "q29", title: "Base64 Decoder", difficulty: "Medium", reward: 400,
    description: "Decode the base64 string 'U2VjcmV0' via the pipeline.",
    objective: "echo U2VjcmV0 | base64 -d",
    check: (c, a, o, raw) => raw.includes("base64") && raw.includes("-d")
  },
  {
    id: "q30", title: "Grandmaster Pipeline", difficulty: "Ultimate", reward: 2500,
    description: "Cut field 7 (shells) from `/etc/passwd` delimited by colons, sort them alphabetically, and count the unique occurrences.",
    objective: "cut -d ':' -f 7 /etc/passwd | sort | uniq -c",
    check: (c, a, o, raw) => raw.includes("cut") && raw.includes("/etc/passwd") && raw.includes("sort") && raw.includes("uniq -c")
  }
];