// twentyfirstmodule.js
// Module 21: The Capstone - Threat Intel, Secure Code, & AI (65 Lessons)

const module21_capstone = {
  name: "21. Capstone & Threat Intel (65 Lessons)",
  lessons: [
    // --- PHASE 1: YARA & MALWARE ANALYSIS (1-15) ---
    {
      title: "Install YARA",
      why: "YARA is the 'pattern matching Swiss army knife' for malware researchers. It scans the raw binary hex of files on the disk, comparing them against cryptographic byte-signatures and ASCII strings to detect polymorphic malware families.",
      text: "Type <code>apt install yara -y</code>",
      objective: "Install yara",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("yara"),
    },
    {
      title: "Create YARA Rule",
      why: "Malware signatures are defined in `.yar` files. These files contain three logic blocks: metadata, strings (the byte/hex signatures to look for), and the condition (the mathematical logic required to trigger an alert).",
      text: "Type <code>touch rule.yar</code>",
      objective: "Create rule.yar",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "rule.yar",
    },
    {
      title: "Write YARA Header",
      why: "Initialize the rule block. The rule name (e.g., Detect_Malware) acts as the unique identifier that the SIEM or EDR platform will parse when the signature is triggered.",
      text: 'Type <code>echo "rule Detect_Malware {" > rule.yar</code>',
      objective: "Echo rule header",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("rule Detect") &&
        raw.includes(">"),
    },
    {
      title: "Write YARA Strings",
      why: 'We define a target string. `$str1 = "evil_payload"` tells the YARA engine to load this specific ASCII byte sequence into memory and search for it during the execution scan.',
      text: 'Type <code>echo "    strings: $str1 = \\"evil_payload\\"" >> rule.yar</code>',
      objective: "Add strings block",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("strings:") && raw.includes(">>"),
    },
    {
      title: "Write YARA Condition",
      why: "The `condition:` block is the boolean trigger. Setting it to `$str1` mathematically instructs the engine: 'If the byte array $str1 exists anywhere in the file's memory space, return True.'",
      text: 'Type <code>echo "    condition: $str1 }" >> rule.yar</code>',
      objective: "Add condition block",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("condition:") &&
        raw.includes(">>"),
    },
    {
      title: "Simulate Malware",
      why: "Generate a simulated malicious binary containing the exact ASCII byte sequence our YARA rule is designed to intercept.",
      text: 'Type <code>echo "This is an evil_payload file" > file.bin</code>',
      objective: "Create simulated malware",
      xp: 15,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("evil_payload") &&
        raw.includes("file.bin"),
    },
    {
      title: "Scan with YARA",
      why: "Execute the YARA engine. It loads the `rule.yar` definitions into RAM and mathematically sweeps the `file.bin` inode. If the condition evaluates to True, it outputs the rule name.",
      text: "Type <code>yara rule.yar file.bin</code>",
      objective: "Run yara on the file",
      xp: 40,
      check: (c, a) =>
        c === "yara" && a.includes("rule.yar") && a.includes("file.bin"),
    },
    {
      title: "Scan Entire Directory",
      why: "The <b>-r</b> flag instructs YARA to recursively traverse every subdirectory, acting as a manual Endpoint Detection and Response (EDR) sweep across the entire filesystem.",
      text: "Type <code>yara -r rule.yar /tmp/</code>",
      objective: "Run yara recursively",
      xp: 40,
      check: (c, a) => c === "yara" && a.includes("-r") && a.includes("/tmp/"),
    },
    {
      title: "YARA Hex Signatures",
      why: "Advanced malware is obfuscated. Instead of ASCII strings, YARA can search for raw Hexadecimal Opcodes (like `{ E2 34 A1 C8 }`), allowing it to detect compiled C/C++ shellcode directly.",
      text: 'Type <code>echo "rule Hex_Detect { strings: $hex = { 4D 5A 90 00 } condition: $hex }" > hex.yar</code>',
      objective: "Create hex rule",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("4D 5A 90 00"),
    },
    {
      title: "Clean YARA Workspace",
      why: "Remove the custom signatures and test files from the filesystem to prepare for protocol analysis.",
      text: "Type <code>rm rule.yar hex.yar file.bin</code>",
      objective: "Remove YARA files",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("rule.yar"),
    },

    // --- PHASE 2: ZEEK & NETWORK FORENSICS (11-25) ---
    {
      title: "Install Zeek",
      why: "Zeek (formerly Bro) is not an intrusion detection system (IDS); it is a Network Security Monitor. It parses raw packet captures (PCAPs) and translates complex network protocols into highly-structured, human-readable TSV logs.",
      text: "Type <code>apt install zeek -y</code>",
      objective: "Install zeek",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("zeek"),
    },
    {
      title: "Download PCAP",
      why: "Download a raw packet capture from a simulated data breach. PCAP files contain the raw Hex and Binary layer-2/layer-3 frames intercepted directly from the network interface card.",
      text: "Type <code>wget http://intel.local/breach.pcap</code>",
      objective: "Download pcap",
      xp: 20,
      check: (c, a) => c === "wget" && a.some((x) => x.includes("breach.pcap")),
    },
    {
      title: "Analyze PCAP with Zeek",
      why: "The <b>-r</b> flag instructs Zeek's event engine to read the PCAP offline. Zeek reconstructs the TCP streams in RAM, analyzes the Application Layer protocols (HTTP, DNS, SSH), and outputs dedicated log files for each.",
      text: "Type <code>zeek -r breach.pcap</code>",
      objective: "Run zeek on pcap",
      xp: 40,
      check: (c, a) =>
        c === "zeek" && a.includes("-r") && a.includes("breach.pcap"),
    },
    {
      title: "List Zeek Logs",
      why: "Zeek generated dozens of logs (e.g., `conn.log`, `http.log`, `dns.log`). These represent the normalized, mathematically parsed telemetry of the network attack.",
      text: "Type <code>ls -l *.log</code>",
      objective: "List log files",
      xp: 15,
      check: (c, a) => c === "ls" && a.some((x) => x.includes(".log")),
    },
    {
      title: "Zeek Cut Utility",
      why: "Zeek logs contain massive column arrays. The <b>zeek-cut</b> binary parses the TSV headers mathematically, allowing you to instantly extract specific fields (like source and destination IPs) without messy `awk` scripts.",
      text: "Type <code>cat conn.log | zeek-cut id.orig_h id.resp_h</code>",
      objective: "Use zeek-cut",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("cat") &&
        raw.includes("zeek-cut") &&
        raw.includes("id.orig_h"),
    },
    {
      title: "Isolate HTTP Traffic",
      why: "If the attack was web-based, we interrogate the `http.log`. By slicing out the `uri` column, we can instantly see every single web page the attacker attempted to access.",
      text: "Type <code>cat http.log | zeek-cut uri | head -n 10</code>",
      objective: "Extract URIs",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("cat") && raw.includes("zeek-cut") && raw.includes("uri"),
    },
    {
      title: "Find Data Exfiltration",
      why: "In `conn.log`, the `orig_bytes` column tracks how much data was sent. Sorting by this column mathematically exposes massive data transfers, indicating exactly which IP address the attacker exfiltrated the database to.",
      text: "Type <code>cat conn.log | zeek-cut id.orig_h orig_bytes | sort -k2 -nr | head -n 5</code>",
      objective: "Sort by orig_bytes",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("zeek-cut") && raw.includes("sort -k2"),
    },
    {
      title: "Clean Zeek Logs",
      why: "Purge the generated protocol telemetry to ensure a clean workspace for the next forensic operation.",
      text: "Type <code>rm *.log breach.pcap</code>",
      objective: "Remove zeek logs",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("breach.pcap"),
    },

    // --- PHASE 3: SAST, SECURE CODE & SEMGREP (26-40) ---
    {
      title: "Install Semgrep",
      why: "Static Application Security Testing (SAST) tools scan raw source code before it compiles. <b>Semgrep</b> reads code, parses it into an Abstract Syntax Tree (AST), and uses rules to find SQL injections and hardcoded secrets.",
      text: "Type <code>apt install semgrep -y</code>",
      objective: "Install semgrep",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("semgrep"),
    },
    {
      title: "Create Vulnerable Code",
      why: "Create a Python file containing a catastrophic security flaw: a hardcoded AWS cryptographic access key.",
      text: "Type <code>echo \"AWS_SECRET = 'AKIAIOSFODNN7EXAMPLE'\" > main.py</code>",
      objective: "Create main.py with secret",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("AKIA") && raw.includes("main.py"),
    },
    {
      title: "Create Vulnerable SQL",
      why: "Inject a severe SQL Injection flaw into the Python file, where untrusted user input is concatenated directly into the database query string.",
      text: "Type <code>echo \"query = 'SELECT * FROM users WHERE id=' + user_input\" >> main.py</code>",
      objective: "Append SQLi to main.py",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("SELECT *") && raw.includes(">>"),
    },
    {
      title: "Run Semgrep Scan",
      why: "Execute Semgrep against the directory. The <b>--config=auto</b> flag instructs the engine to pull the latest security policies from the registry, automatically matching the AST against known vulnerability signatures.",
      text: "Type <code>semgrep --config=auto .</code>",
      objective: "Run semgrep",
      xp: 40,
      check: (c, a) =>
        c === "semgrep" && a.includes("--config=auto") && a.includes("."),
    },
    {
      title: "Install Bandit",
      why: "<b>Bandit</b> is a Python-specific SAST tool. It parses Python files and searches for dangerously weak cryptographic modules (like MD5) or insecure functions (like `subprocess.call` or `eval()`).",
      text: "Type <code>apt install bandit -y</code>",
      objective: "Install bandit",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("bandit"),
    },
    {
      title: "Run Bandit",
      why: "The <b>-r</b> flag tells Bandit to recursively parse the entire project directory. It computes a severity score for every vulnerability it mathematically detects in the codebase.",
      text: "Type <code>bandit -r .</code>",
      objective: "Run bandit",
      xp: 35,
      check: (c, a) => c === "bandit" && a.includes("-r") && a.includes("."),
    },
    {
      title: "Install TruffleHog",
      why: "Developers often accidentally push API keys to GitHub. <b>TruffleHog</b> mathematically calculates the Shannon Entropy of strings in Git commits. High entropy (randomness) usually proves the string is a cryptographic key.",
      text: "Type <code>apt install trufflehog -y</code>",
      objective: "Install trufflehog",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("trufflehog"),
    },
    {
      title: "Scan for Secrets",
      why: "Execute TruffleHog on the local directory. It scans the entire commit history, ensuring no compromised API keys are buried in previous iterations of the software.",
      text: "Type <code>trufflehog filesystem .</code>",
      objective: "Run trufflehog",
      xp: 35,
      check: (c, a) =>
        c === "trufflehog" && a.includes("filesystem") && a.includes("."),
    },

    // --- PHASE 4: MITRE ATT&CK & FAIL2BAN (41-55) ---
    {
      title: "Install Fail2Ban",
      why: "Security relies on automation. <b>Fail2Ban</b> is an Intrusion Prevention daemon. It monitors system logs in real-time, mathematically calculates authentication failure frequencies, and dynamically rewrites iptables firewall rules to block IPs.",
      text: "Type <code>apt install fail2ban -y</code>",
      objective: "Install fail2ban",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("fail2ban"),
    },
    {
      title: "Start Fail2Ban",
      why: "Initialize the daemon, binding it to the Linux kernel's Netfilter module and linking it to the `/var/log/auth.log` stream.",
      text: "Type <code>systemctl start fail2ban</code>",
      objective: "Start fail2ban",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "start" && a[1] === "fail2ban",
    },
    {
      title: "Fail2Ban Client",
      why: "The `fail2ban-client` connects to the active daemon via IPC sockets. The <b>status</b> command proves the engine is active and lists the currently active 'jails' (monitoring zones).",
      text: "Type <code>fail2ban-client status</code>",
      objective: "Check fail2ban status",
      xp: 25,
      check: (c, a) => c === "fail2ban-client" && a.includes("status"),
    },
    {
      title: "Jail Status",
      why: "Query the specific `sshd` jail. The daemon outputs a real-time list of every single IP address it has dynamically banned from the server due to brute-force detection.",
      text: "Type <code>fail2ban-client status sshd</code>",
      objective: "Check sshd jail",
      xp: 30,
      check: (c, a) =>
        c === "fail2ban-client" && a.includes("status") && a.includes("sshd"),
    },
    {
      title: "Unban IP Address",
      why: "If a legitimate user is locked out, you must manually un-ban them. This command commands the daemon to locate the specific IP and seamlessly delete its block directive from the iptables chain.",
      text: "Type <code>fail2ban-client set sshd unbanip 10.0.0.99</code>",
      objective: "Unban an IP",
      xp: 35,
      check: (c, a) =>
        c === "fail2ban-client" &&
        a.includes("unbanip") &&
        a.includes("10.0.0.99"),
    },
    {
      title: "MITRE ATT&CK Mapping",
      why: "In Threat Intelligence, the MITRE ATT&CK matrix categorizes adversarial behaviors. T1059.004 represents 'Command and Scripting Interpreter: Unix Shell'. We document this T-Code to map the attacker's methodology.",
      text: 'Type <code>echo "T1059.004 Detected" > intel.txt</code>',
      objective: "Log MITRE T-Code",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("T1059") &&
        raw.includes("intel.txt"),
    },
    {
      title: "Map Persistence",
      why: "T1053.003 represents 'Scheduled Task/Job: Cron'. Documenting this allows the Security Operations Center (SOC) to understand exactly how the attacker maintained persistence across reboots.",
      text: 'Type <code>echo "T1053.003 Detected" >> intel.txt</code>',
      objective: "Log Persistence T-Code",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("T1053") && raw.includes(">>"),
    },

    // --- PHASE 5: FUZZING & EXPLOIT DEV (56-65) ---
    {
      title: "Install AFL++",
      why: "American Fuzzy Lop (AFL) is a genetic fuzzer. It instruments C/C++ binaries during compilation. It generates millions of mutated, malformed inputs, mathematically tracking the CPU's execution path to deliberately crash the program and find zero-days.",
      text: "Type <code>apt install afl++ -y</code>",
      objective: "Install afl++",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("afl++"),
    },
    {
      title: "Create Fuzzing Inputs",
      why: "AFL requires a 'seed' file to start mutating. Create a basic, valid text file that the fuzzer will mathematically corrupt bit-by-bit.",
      text: "Type <code>mkdir in && echo 'test' > in/seed.txt</code>",
      objective: "Create seed inputs",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("mkdir") && raw.includes("in") && raw.includes("seed.txt"),
    },
    {
      title: "Create Target Dir",
      why: "Create an output directory where AFL will store the raw hex dumps of the inputs that successfully triggered segmentation faults (crashes) in the target.",
      text: "Type <code>mkdir out</code>",
      objective: "Create output directory",
      xp: 15,
      check: (c, a) => c === "mkdir" && a[0] === "out",
    },
    {
      title: "Run AFL Fuzzer",
      why: "The <b>afl-fuzz</b> command initializes the core execution loop. It takes files from `-i`, mutates them via genetic algorithms, and feeds them into `./vulnerable_app`, recording all memory crashes in `-o`.",
      text: "Type <code>afl-fuzz -i in/ -o out/ -- ./vulnerable_app @@</code>",
      objective: "Run afl-fuzz",
      xp: 50,
      check: (c, a) => c === "afl-fuzz" && a.includes("-i") && a.includes("-o"),
    },
    {
      title: "Check Crash Reports",
      why: "If a segmentation fault occurs, the exact byte sequence that caused the buffer overflow is saved in `out/crashes`. Exploit developers use these hex dumps to craft weaponized reverse shells.",
      text: "Type <code>ls -l out/crashes/</code>",
      objective: "List crashes",
      xp: 20,
      check: (c, a) => c === "ls" && a.includes("out/crashes/"),
    },
    {
      title: "Eradicate Dev Tools",
      why: "Clean the workspace. An elite researcher leaves no forensic trace of their exploit development toolchain on the system.",
      text: "Type <code>rm -rf in/ out/ main.py intel.txt vulnerable_app</code>",
      objective: "Remove all artifacts",
      xp: 20,
      check: (c, a) =>
        c === "rm" && a.includes("-rf") && a.some((x) => x.includes("in/")),
    },
    {
      title: "Review Blueprint",
      why: "You have completed the entire spectrum. Operations, Architecture, Intelligence, and Automation.",
      text: 'Type <code>echo "Senior Cyber Security Engineer Ready"</code>',
      objective: "Echo Senior",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Senior") && raw.includes("Ready"),
    },
  ],
};
