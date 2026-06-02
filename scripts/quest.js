const quests = [
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
  }
];