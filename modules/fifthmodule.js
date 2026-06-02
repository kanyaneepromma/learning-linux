// fifthmodule.js
// Module 5: Red Team & Networking (65 Lessons)

const module5_networking = {
  name: "5. Red Team & Networking (65 Lessons)",
  lessons: [
    // --- BASIC PING DIAGNOSTICS (1-10) ---
    {
      title: "Ping Localhost",
      why: "Test your local machine's loopback network.",
      text: "Type <code>ping localhost</code>",
      objective: "Type ping localhost",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "localhost",
    },
    {
      title: "Ping Loopback IP",
      why: "Ping the raw IP equivalent of localhost.",
      text: "Type <code>ping 127.0.0.1</code>",
      objective: "Type ping 127.0.0.1",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "127.0.0.1",
    },
    {
      title: "Ping Remote Host",
      why: "Test external internet connectivity.",
      text: "Type <code>ping google.com</code>",
      objective: "Type ping google.com",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "google.com",
    },
    {
      title: "Ping Remote IP",
      why: "Test raw DNS IP routing.",
      text: "Type <code>ping 8.8.8.8</code>",
      objective: "Type ping 8.8.8.8",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "8.8.8.8",
    },
    {
      title: "Limit Ping Count",
      why: "The -c flag stops the ping after X packets.",
      text: "Type <code>ping -c 4 localhost</code>",
      objective: "Type ping -c 4 localhost",
      xp: 15,
      check: (c, a) => c === "ping" && a.includes("-c") && a.includes("4"),
    },
    {
      title: "Quick Ping",
      why: "Send just two packets to test a host.",
      text: "Type <code>ping -c 2 google.com</code>",
      objective: "Type ping -c 2 google.com",
      xp: 15,
      check: (c, a) => c === "ping" && a.includes("-c") && a.includes("2"),
    },
    {
      title: "Log Ping Results",
      why: "Pipe your network diagnostics into a text log.",
      text: "Type <code>ping google.com > ping.txt</code>",
      objective: "Redirect ping into ping.txt",
      xp: 20,
      check: (c, a) =>
        c === "ping" && a.includes(">") && a.includes("ping.txt"),
    },
    {
      title: "Read Ping Log",
      why: "Check your captured network data.",
      text: "Type <code>cat ping.txt</code>",
      objective: "Read ping.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "ping.txt",
    },
    {
      title: "Audit Ping Log",
      why: "Count the lines of the response.",
      text: "Type <code>wc -l ping.txt</code>",
      objective: "Line count ping.txt",
      xp: 15,
      check: (c, a) => c === "wc" && a.includes("-l") && a.includes("ping.txt"),
    },
    {
      title: "Grep Latency",
      why: "Isolate just the response times.",
      text: 'Type <code>grep "time=" ping.txt</code>',
      objective: "Grep 'time=' from ping.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("time=") && a.includes("ping.txt"),
    },

    // --- LOCAL SOCKET AUDITING (11-25) ---
    {
      title: "Raw Netstat",
      why: "View all active network sockets.",
      text: "Type <code>netstat</code>",
      objective: "Type netstat",
      xp: 10,
      check: (c) => c === "netstat",
    },
    {
      title: "TCP Connections",
      why: "Filter for Transmission Control Protocol only.",
      text: "Type <code>netstat -t</code>",
      objective: "Type netstat -t",
      xp: 15,
      check: (c, a) => c === "netstat" && a.includes("-t"),
    },
    {
      title: "UDP Connections",
      why: "Filter for User Datagram Protocol only.",
      text: "Type <code>netstat -u</code>",
      objective: "Type netstat -u",
      xp: 15,
      check: (c, a) => c === "netstat" && a.includes("-u"),
    },
    {
      title: "Listening Sockets",
      why: "Show only ports waiting for connections.",
      text: "Type <code>netstat -l</code>",
      objective: "Type netstat -l",
      xp: 15,
      check: (c, a) => c === "netstat" && a.includes("-l"),
    },
    {
      title: "Numeric IPs",
      why: "Stop netstat from trying to resolve slow hostnames.",
      text: "Type <code>netstat -n</code>",
      objective: "Type netstat -n",
      xp: 15,
      check: (c, a) => c === "netstat" && a.includes("-n"),
    },
    {
      title: "TCP + UDP",
      why: "Combine flags for better visibility.",
      text: "Type <code>netstat -tu</code>",
      objective: "Type netstat -tu",
      xp: 20,
      check: (c, a) => c === "netstat" && a.includes("-tu"),
    },
    {
      title: "Numeric Listeners",
      why: "Show listening ports with raw IPs.",
      text: "Type <code>netstat -ln</code>",
      objective: "Type netstat -ln",
      xp: 20,
      check: (c, a) => c === "netstat" && a.includes("-ln"),
    },
    {
      title: "The God Flag",
      why: "Show all TCP/UDP numeric listening ports. The ultimate Blue Team combo.",
      text: "Type <code>netstat -tuln</code>",
      objective: "Type netstat -tuln",
      xp: 25,
      check: (c, a) => c === "netstat" && a.includes("-tuln"),
    },
    {
      title: "Log Network Sockets",
      why: "Save the current socket state for forensics.",
      text: "Type <code>netstat -tuln > ports.txt</code>",
      objective: "Redirect into ports.txt",
      xp: 25,
      check: (c, a) =>
        c === "netstat" && a.includes(">") && a.includes("ports.txt"),
    },
    {
      title: "Read Ports Log",
      why: "Verify the capture.",
      text: "Type <code>cat ports.txt</code>",
      objective: "Read ports.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "ports.txt",
    },
    {
      title: "Count Open Ports",
      why: "Check how many sockets are active.",
      text: "Type <code>wc -l ports.txt</code>",
      objective: "Line count ports.txt",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("ports.txt"),
    },
    {
      title: "Find Listeners",
      why: "Ensure you only see listening connections.",
      text: 'Type <code>grep "LISTEN" ports.txt</code>',
      objective: "Grep LISTEN from ports.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("LISTEN") && a.includes("ports.txt"),
    },
    {
      title: "Find Web Server",
      why: "Look for port 80 (HTTP).",
      text: 'Type <code>grep "80" ports.txt</code>',
      objective: "Grep 80 from ports.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("80") && a.includes("ports.txt"),
    },
    {
      title: "Find TCP Protocols",
      why: "Filter out UDP via grep.",
      text: 'Type <code>grep "tcp" ports.txt</code>',
      objective: "Grep tcp from ports.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("tcp") && a.includes("ports.txt"),
    },
    {
      title: "Slice Socket Headers",
      why: "Look at the top two lines of the report.",
      text: "Type <code>head -n 2 ports.txt</code>",
      objective: "Head slice 2 lines from ports.txt",
      xp: 20,
      check: (c, a) =>
        c === "head" &&
        a.includes("-n") &&
        a.includes("2") &&
        a.includes("ports.txt"),
    },

    // --- NMAP PORT SCANNING (26-46) ---
    {
      title: "Basic Local Scan",
      why: "Nmap maps out open ports on a target. Scan yourself.",
      text: "Type <code>nmap localhost</code>",
      objective: "Type nmap localhost",
      xp: 15,
      check: (c, a) => c === "nmap" && a[0] === "localhost",
    },
    {
      title: "IP Target Scan",
      why: "Scan the raw loopback IP.",
      text: "Type <code>nmap 127.0.0.1</code>",
      objective: "Type nmap 127.0.0.1",
      xp: 15,
      check: (c, a) => c === "nmap" && a[0] === "127.0.0.1",
    },
    {
      title: "Remote Target Scan",
      why: "Scan an external host.",
      text: "Type <code>nmap google.com</code>",
      objective: "Type nmap google.com",
      xp: 15,
      check: (c, a) => c === "nmap" && a[0] === "google.com",
    },
    {
      title: "Specific Port Scan",
      why: "The -p flag limits the scan to one port. Try HTTP.",
      text: "Type <code>nmap -p 80 localhost</code>",
      objective: "Type nmap -p 80 localhost",
      xp: 20,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("80"),
    },
    {
      title: "Scan SSH Port",
      why: "Check if Secure Shell (22) is open locally.",
      text: "Type <code>nmap -p 22 localhost</code>",
      objective: "Type nmap -p 22 localhost",
      xp: 20,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("22"),
    },
    {
      title: "Scan Remote HTTPS",
      why: "Check if port 443 is open on Google.",
      text: "Type <code>nmap -p 443 google.com</code>",
      objective: "Type nmap -p 443 google.com",
      xp: 20,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("443"),
    },
    {
      title: "Port Range Scan",
      why: "Scan a block of ports from 1 to 1000.",
      text: "Type <code>nmap -p 1-1000 localhost</code>",
      objective: "Type nmap -p 1-1000 localhost",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("1-1000"),
    },
    {
      title: "Service Version Scan",
      why: "The -sV flag tries to find out EXACTLY what software is running.",
      text: "Type <code>nmap -sV localhost</code>",
      objective: "Type nmap -sV localhost",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-sV"),
    },
    {
      title: "Stealth SYN Scan",
      why: "The -sS flag scans quietly without completing the handshake.",
      text: "Type <code>nmap -sS localhost</code>",
      objective: "Type nmap -sS localhost",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-sS"),
    },
    {
      title: "OS Fingerprinting",
      why: "The -O flag tries to guess the Operating System of the target.",
      text: "Type <code>nmap -O localhost</code>",
      objective: "Type nmap -O localhost",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-O"),
    },
    {
      title: "Fast Port Scan",
      why: "The -F flag speeds up the scan by only checking the top 100 ports.",
      text: "Type <code>nmap -F localhost</code>",
      objective: "Type nmap -F localhost",
      xp: 20,
      check: (c, a) => c === "nmap" && a.includes("-F"),
    },
    {
      title: "Log Target Scan",
      why: "Write your Nmap results to a forensic file.",
      text: "Type <code>nmap localhost > scan.txt</code>",
      objective: "Redirect nmap to scan.txt",
      xp: 25,
      check: (c, a) =>
        c === "nmap" && a.includes(">") && a.includes("scan.txt"),
    },
    {
      title: "Read Scan Log",
      why: "Verify the contents of your port scan.",
      text: "Type <code>cat scan.txt</code>",
      objective: "Read scan.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "scan.txt",
    },
    {
      title: "Count Scan Rows",
      why: "Check the size of the report.",
      text: "Type <code>wc -l scan.txt</code>",
      objective: "Line count scan.txt",
      xp: 15,
      check: (c, a) => c === "wc" && a.includes("-l") && a.includes("scan.txt"),
    },
    {
      title: "Grep Open Ports",
      why: "Filter the log for ports that are confirmed open.",
      text: 'Type <code>grep "open" scan.txt</code>',
      objective: "Grep open from scan.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("open") && a.includes("scan.txt"),
    },
    {
      title: "Grep HTTP",
      why: "Look specifically for the web port in the log.",
      text: 'Type <code>grep "80/tcp" scan.txt</code>',
      objective: "Grep 80/tcp from scan.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("80/tcp") && a.includes("scan.txt"),
    },
    {
      title: "Append Remote Scan",
      why: "Add Google's scan to the bottom of the log.",
      text: "Type <code>nmap google.com >> scan.txt</code>",
      objective: "Append nmap to scan.txt",
      xp: 25,
      check: (c, a) =>
        c === "nmap" && a.includes(">>") && a.includes("scan.txt"),
    },
    {
      title: "Read Mega Log",
      why: "View both scans together.",
      text: "Type <code>cat scan.txt</code>",
      objective: "Read scan.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "scan.txt",
    },
    {
      title: "Grep Nmap Footprints",
      why: "Find where Nmap inserted its tool headers.",
      text: 'Type <code>grep "Nmap" scan.txt</code>',
      objective: "Grep Nmap from scan.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("Nmap") && a.includes("scan.txt"),
    },
    {
      title: "Slice Scan Headers",
      why: "Read the top 3 lines of the report.",
      text: "Type <code>head -n 3 scan.txt</code>",
      objective: "Head slice 3 lines from scan.txt",
      xp: 20,
      check: (c, a) =>
        c === "head" &&
        a.includes("-n") &&
        a.includes("3") &&
        a.includes("scan.txt"),
    },

    // --- STRINGS & BINARY FORENSICS (47-60) ---
    {
      title: "Strings Forensics",
      why: "Extract readable text directly from compiled malware.",
      text: "Type <code>strings /tmp/malware.bin</code>",
      objective: "Run strings on malware",
      xp: 15,
      check: (c, a) => c === "strings" && a[0] === "/tmp/malware.bin",
    },
    {
      title: "Log Malware Strings",
      why: "Pipe the extracted binary text to a log for analysis.",
      text: "Type <code>strings /tmp/malware.bin > strings.txt</code>",
      objective: "Redirect strings into strings.txt",
      xp: 20,
      check: (c, a) =>
        c === "strings" && a.includes(">") && a.includes("strings.txt"),
    },
    {
      title: "Read Strings Log",
      why: "View the extracted forensic data.",
      text: "Type <code>cat strings.txt</code>",
      objective: "Read strings.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "strings.txt",
    },
    {
      title: "Count Strings Data",
      why: "See how many lines of text were ripped out.",
      text: "Type <code>wc -l strings.txt</code>",
      objective: "Line count strings.txt",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("strings.txt"),
    },
    {
      title: "Byte Size Check",
      why: "Check the exact forensic file byte size.",
      text: "Type <code>wc -c strings.txt</code>",
      objective: "Byte count strings.txt",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-c") && a.includes("strings.txt"),
    },
    {
      title: "Hunt for Web Links",
      why: "Malware often contains hardcoded Command & Control URLs.",
      text: 'Type <code>grep "http" strings.txt</code>',
      objective: "Grep http from strings.txt",
      xp: 25,
      check: (c, a) =>
        c === "grep" && a.includes("http") && a.includes("strings.txt"),
    },
    {
      title: "Hunt for Hacker IPs",
      why: "Search the malware for suspicious keywords.",
      text: 'Type <code>grep "evil" strings.txt</code>',
      objective: "Grep evil from strings.txt",
      xp: 25,
      check: (c, a) =>
        c === "grep" && a.includes("evil") && a.includes("strings.txt"),
    },
    {
      title: "Inspect System Binaries",
      why: "The 'ping' tool is also a binary. Rip strings from it.",
      text: "Type <code>strings /usr/bin/ping</code>",
      objective: "Run strings on /usr/bin/ping",
      xp: 20,
      check: (c, a) => c === "strings" && a[0] === "/usr/bin/ping",
    },
    {
      title: "Log Ping Binary",
      why: "Save the system binary strings to a file.",
      text: "Type <code>strings /usr/bin/ping > bin_strings.txt</code>",
      objective: "Redirect into bin_strings.txt",
      xp: 25,
      check: (c, a) =>
        c === "strings" && a.includes(">") && a.includes("bin_strings.txt"),
    },
    {
      title: "Count Ping Lines",
      why: "System binaries have thousands of strings.",
      text: "Type <code>wc -l bin_strings.txt</code>",
      objective: "Line count bin_strings.txt",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("bin_strings.txt"),
    },
    {
      title: "Head Binary Strings",
      why: "Read the top 5 extracted lines.",
      text: "Type <code>head -n 5 bin_strings.txt</code>",
      objective: "Head slice 5 lines from bin_strings.txt",
      xp: 20,
      check: (c, a) =>
        c === "head" &&
        a.includes("-n") &&
        a.includes("5") &&
        a.includes("bin_strings.txt"),
    },
    {
      title: "Grep ELF Header",
      why: "Look for the standard Linux Executable format header.",
      text: 'Type <code>grep "ELF" bin_strings.txt</code>',
      objective: "Grep ELF from bin_strings.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("ELF") && a.includes("bin_strings.txt"),
    },
    {
      title: "Init Final Report",
      why: "Start a master forensic report.",
      text: 'Type <code>echo "Malware Analyzed" > report.txt</code>',
      objective: "Redirect text to report.txt",
      xp: 15,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("report.txt"),
    },
    {
      title: "Append Malware Strings",
      why: "Dump the malware data into the final report.",
      text: "Type <code>cat strings.txt >> report.txt</code>",
      objective: "Append strings.txt to report.txt",
      xp: 25,
      check: (c, a) =>
        c === "cat" && a.includes(">>") && a.includes("report.txt"),
    },
    {
      title: "Verify Transfer",
      why: "Check the master report.",
      text: "Type <code>cat report.txt</code>",
      objective: "Read report.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "report.txt",
    },

    // --- FINAL CHALLENGE LOOP (61-65) ---
    {
      title: "Append Sockets to Report",
      why: "Add local sockets to the forensic log.",
      text: "Type <code>netstat -tuln >> report.txt</code>",
      objective: "Append netstat to report.txt",
      xp: 30,
      check: (c, a) =>
        c === "netstat" &&
        a.includes("-tuln") &&
        a.includes(">>") &&
        a.includes("report.txt"),
    },
    {
      title: "Append Ports to Report",
      why: "Add the Nmap footprint to the forensic log.",
      text: "Type <code>nmap localhost >> report.txt</code>",
      objective: "Append nmap to report.txt",
      xp: 30,
      check: (c, a) =>
        c === "nmap" &&
        a.includes("localhost") &&
        a.includes(">>") &&
        a.includes("report.txt"),
    },
    {
      title: "Read Master Report",
      why: "View your massive compiled security audit.",
      text: "Type <code>cat report.txt</code>",
      objective: "Read report.txt",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "report.txt",
    },
    {
      title: "Audit Master File",
      why: "Check the final size of your report.",
      text: "Type <code>wc -l report.txt</code>",
      objective: "Line count report.txt",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("report.txt"),
    },
    {
      title: "Sign-off",
      why: "Module 5 Complete.",
      text: 'Type <code>echo "Red Team Complete" >> report.txt</code>',
      objective: "Append text to report.txt",
      xp: 20,
      check: (c, a) =>
        c === "echo" && a.includes(">>") && a.includes("report.txt"),
    },
  ],
};
