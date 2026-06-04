// fifthmodule.js
// Module 5: Red Team & Networking (65 Lessons)

const module5_networking = {
  name: "5. Red Team & Networking (65 Lessons)",
  lessons: [
    // --- BASIC PING DIAGNOSTICS (1-10) ---
    {
      title: "Ping Localhost",
      why: "Before you attack a network, you must ensure your own TCP/IP stack is functioning. The <b>ping</b> command sends ICMP (Internet Control Message Protocol) Echo Request packets. 'localhost' is an alias for your own machine.",
      text: "Type <code>ping localhost</code>",
      objective: "Type ping localhost",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "localhost",
    },
    {
      title: "Ping Loopback IP",
      why: "Every network card in the world has a hardcoded, internal loopback IP address: <b>127.0.0.1</b>. Pinging this bypasses your physical network hardware and tests the operating system's software networking layer directly.",
      text: "Type <code>ping 127.0.0.1</code>",
      objective: "Type ping 127.0.0.1",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "127.0.0.1",
    },
    {
      title: "Ping Remote Host",
      why: "When you ping a domain name, your computer must first ask a DNS (Domain Name System) server to translate the name into an IP address. If this fails, your DNS is broken, even if your internet is working.",
      text: "Type <code>ping google.com</code>",
      objective: "Type ping google.com",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "google.com",
    },
    {
      title: "Ping Remote IP",
      why: "If DNS is broken, you can bypass the translation and route packets directly to a raw IP address. 8.8.8.8 is Google's public DNS server, and is the universal standard for testing raw internet connectivity.",
      text: "Type <code>ping 8.8.8.8</code>",
      objective: "Type ping 8.8.8.8",
      xp: 10,
      check: (c, a) => c === "ping" && a[0] === "8.8.8.8",
    },
    {
      title: "Ping Count Limit",
      why: "By default, Linux will send ping packets infinitely until you press Ctrl+C, causing unnecessary network noise. The <b>-c</b> (Count) flag tells the system to send exactly X packets and then stop automatically.",
      text: "Type <code>ping -c 4 8.8.8.8</code>",
      objective: "Type ping -c 4 8.8.8.8",
      xp: 20,
      check: (c, a) => c === "ping" && a.includes("-c") && a.includes("4"),
    },
    {
      title: "Ping Count 2",
      why: "When scripting automated network sweeps, you only need a single packet to prove a host is alive. Sending more wastes time.",
      text: "Type <code>ping -c 2 localhost</code>",
      objective: "Type ping -c 2 localhost",
      xp: 15,
      check: (c, a) => c === "ping" && a.includes("-c") && a.includes("2"),
    },
    {
      title: "Ping Timeout",
      why: "If a target is offline, Ping will hang as it waits for a reply. The <b>-w</b> (Wait) flag sets a hard deadline in seconds. If the target doesn't reply within 3 seconds, the command terminates.",
      text: "Type <code>ping -w 3 8.8.8.8</code>",
      objective: "Type ping -w 3 8.8.8.8",
      xp: 20,
      check: (c, a) => c === "ping" && a.includes("-w") && a.includes("3"),
    },
    {
      title: "Ping Interval",
      why: "Sometimes you need to monitor a host without flooding the network with 1 packet per second. The <b>-i</b> (Interval) flag changes the delay between packets. Let's send a packet every 2 seconds.",
      text: "Type <code>ping -i 2 8.8.8.8</code>",
      objective: "Type ping -i 2 8.8.8.8",
      xp: 20,
      check: (c, a) => c === "ping" && a.includes("-i") && a.includes("2"),
    },
    {
      title: "Ping Packet Size",
      why: "To test network throughput (or simulate a basic Denial of Service), you can change the size of the ICMP payload bytes using the <b>-s</b> (Size) flag.",
      text: "Type <code>ping -s 100 8.8.8.8</code>",
      objective: "Type ping -s 100 8.8.8.8",
      xp: 20,
      check: (c, a) => c === "ping" && a.includes("-s") && a.includes("100"),
    },
    {
      title: "Ping TTL",
      why: "Every packet has a Time-To-Live (TTL) number to prevent it from bouncing around the internet forever. Every router it passes through subtracts 1 from the TTL. The <b>-t</b> flag lets you artificially set the starting TTL.",
      text: "Type <code>ping -t 64 8.8.8.8</code>",
      objective: "Type ping -t 64 8.8.8.8",
      xp: 20,
      check: (c, a) => c === "ping" && a.includes("-t") && a.includes("64"),
    },

    // --- ADVANCED PING & INTRO TO NMAP (11-20) ---
    {
      title: "Combine Ping Flags",
      why: "Red Teamers combine flags to create exact network probes. Send exactly 3 packets, with a 2-second interval, testing Google's DNS.",
      text: "Type <code>ping -c 3 -i 2 8.8.8.8</code>",
      objective: "Use -c and -i together",
      xp: 25,
      check: (c, a) =>
        c === "ping" &&
        a.includes("-c") &&
        a.includes("-i") &&
        a.includes("8.8.8.8"),
    },
    {
      title: "Combine Ping Flags 2",
      why: "Send 2 packets, but fail the test if the host doesn't reply within a 4-second timeout limit.",
      text: "Type <code>ping -c 2 -w 4 localhost</code>",
      objective: "Use -c and -w together",
      xp: 25,
      check: (c, a) =>
        c === "ping" &&
        a.includes("-c") &&
        a.includes("-w") &&
        a.includes("localhost"),
    },
    {
      title: "Ping Flood",
      why: "The <b>-f</b> (Flood) flag sends packets as fast as the network can handle them. This is used to aggressively stress-test network capacity or execute a basic DoS (Denial of Service) attack.",
      text: "Type <code>ping -f localhost</code>",
      objective: "Type ping -f localhost",
      xp: 30,
      check: (c, a) =>
        c === "ping" && a.includes("-f") && a.includes("localhost"),
    },
    {
      title: "Ping Audible",
      why: "If you are working in the server room and waiting for a machine to reboot, the <b>-a</b> (Audible) flag will literally beep your computer speaker every time a packet successfully returns.",
      text: "Type <code>ping -a 8.8.8.8</code>",
      objective: "Type ping -a 8.8.8.8",
      xp: 15,
      check: (c, a) =>
        c === "ping" && a.includes("-a") && a.includes("8.8.8.8"),
    },
    {
      title: "Nmap Basics",
      why: "Ping only tells you if a machine is online. <b>Nmap</b> (Network Mapper) sends thousands of raw IP packets to figure out exactly what services (like web servers or databases) are running on that machine.",
      text: "Type <code>nmap localhost</code>",
      objective: "Type nmap localhost",
      xp: 20,
      check: (c, a) => c === "nmap" && a[0] === "localhost",
    },
    {
      title: "Nmap Remote",
      why: "Scan an external IP. By default, Nmap scans the 1,000 most common ports (out of 65,535 possible ports) to map the attack surface.",
      text: "Type <code>nmap 8.8.8.8</code>",
      objective: "Type nmap 8.8.8.8",
      xp: 20,
      check: (c, a) => c === "nmap" && a[0] === "8.8.8.8",
    },
    {
      title: "Nmap Subnet",
      why: "Instead of scanning one IP, you can scan an entire network block. The <b>/24</b> CIDR notation tells Nmap to scan all 256 IP addresses in the 10.0.0.x range to see what machines are connected to the office network.",
      text: "Type <code>nmap 10.0.0.0/24</code>",
      objective: "Type nmap 10.0.0.0/24",
      xp: 30,
      check: (c, a) => c === "nmap" && a[0] === "10.0.0.0/24",
    },
    {
      title: "Nmap Ping Sweep",
      why: "Scanning 1,000 ports across 256 machines takes a long time. The <b>-sn</b> (Ping Scan) flag tells Nmap to skip port scanning and ONLY check which IP addresses respond to a ping, instantly generating a map of live hosts.",
      text: "Type <code>nmap -sn 10.0.0.0/24</code>",
      objective: "Type nmap -sn",
      xp: 35,
      check: (c, a) =>
        c === "nmap" && a.includes("-sn") && a.includes("10.0.0.0/24"),
    },
    {
      title: "Nmap Fast Scan",
      why: "If you need a quick reconnaissance profile, the <b>-F</b> (Fast) flag tells Nmap to only scan the top 100 most common ports instead of the top 1,000. It is much faster, but you might miss a hidden service on a random port.",
      text: "Type <code>nmap -F localhost</code>",
      objective: "Type nmap -F",
      xp: 25,
      check: (c, a) =>
        c === "nmap" && a.includes("-F") && a.includes("localhost"),
    },
    {
      title: "Nmap Verbose",
      why: "Nmap can take minutes to finish a deep scan. The <b>-v</b> (Verbose) flag tells it to print information to your screen continuously as it finds it, rather than waiting until the entire scan completes.",
      text: "Type <code>nmap -v localhost</code>",
      objective: "Type nmap -v",
      xp: 20,
      check: (c, a) =>
        c === "nmap" && a.includes("-v") && a.includes("localhost"),
    },

    // --- NMAP PORT SCANNING (21-30) ---
    {
      title: "Scan Specific Port",
      why: "If you are specifically hunting for vulnerable Web Servers, there is no need to scan database ports. The <b>-p</b> flag limits the scan to a precise target, like port 80 (HTTP).",
      text: "Type <code>nmap -p 80 localhost</code>",
      objective: "Type nmap -p 80",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("80"),
    },
    {
      title: "Scan Port Range",
      why: "You can specify a range. Let's scan ports 1 through 100 to check for common historical protocols like FTP (21), SSH (22), Telnet (23), and DNS (53).",
      text: "Type <code>nmap -p 1-100 localhost</code>",
      objective: "Type nmap -p 1-100",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("1-100"),
    },
    {
      title: "Scan Multiple Ports",
      why: "You can use commas to specify distinct, unconnected ports. 80 is HTTP (unencrypted web), and 443 is HTTPS (encrypted web).",
      text: "Type <code>nmap -p 80,443 localhost</code>",
      objective: "Type nmap -p 80,443",
      xp: 25,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("80,443"),
    },
    {
      title: "Scan All Ports",
      why: "To be absolutely sure you haven't missed a hidden backdoor or database, you must scan all 65,535 possible ports. The shortcut for this is <b>-p-</b>.",
      text: "Type <code>nmap -p- localhost</code>",
      objective: "Type nmap -p-",
      xp: 40,
      check: (c, a) =>
        c === "nmap" && a.includes("-p-") && a.includes("localhost"),
    },
    {
      title: "Nmap Service Version",
      why: "Knowing a port is open is useless if you don't know what software is listening on it. The <b>-sV</b> (Service Version) flag actively interrogates the port to extract the exact software banner (e.g., Apache 2.4.41). This is how you find zero-day vulnerabilities.",
      text: "Type <code>nmap -sV localhost</code>",
      objective: "Type nmap -sV",
      xp: 35,
      check: (c, a) =>
        c === "nmap" && a.includes("-sV") && a.includes("localhost"),
    },
    {
      title: "Nmap OS Detection",
      why: "Different Operating Systems respond slightly differently to broken network packets. By sending malformed packets and measuring the response, the <b>-O</b> flag attempts to fingerprint if the target is running Linux, Windows, or a router firmware.",
      text: "Type <code>nmap -O localhost</code>",
      objective: "Type nmap -O",
      xp: 35,
      check: (c, a) =>
        c === "nmap" && a.includes("-O") && a.includes("localhost"),
    },
    {
      title: "Version + Specific Port",
      why: "Combine your flags to create a targeted probe. 'Tell me exactly what version of software is running on port 80.'",
      text: "Type <code>nmap -p 80 -sV localhost</code>",
      objective: "Combine -p and -sV",
      xp: 30,
      check: (c, a) =>
        c === "nmap" &&
        a.includes("-p") &&
        a.includes("-sV") &&
        a.includes("80"),
    },
    {
      title: "OS + Fast Scan",
      why: "Perform a quick top-100 port scan while simultaneously attempting to fingerprint the target's operating system.",
      text: "Type <code>nmap -F -O localhost</code>",
      objective: "Combine -F and -O",
      xp: 30,
      check: (c, a) => c === "nmap" && a.includes("-F") && a.includes("-O"),
    },
    {
      title: "Aggressive Scan",
      why: "The <b>-A</b> (Aggressive) flag is the loud, chaotic scan. It throws everything at the target: OS detection, Version detection, Script scanning, and Traceroute. It generates massive network noise and will trigger any Intrusion Detection System immediately.",
      text: "Type <code>nmap -A localhost</code>",
      objective: "Type nmap -A",
      xp: 40,
      check: (c, a) =>
        c === "nmap" && a.includes("-A") && a.includes("localhost"),
    },
    {
      title: "Scan Exclude",
      why: "When scanning a whole subnet, you might want to exclude the router or a critical production server from being probed to avoid disrupting them.",
      text: "Type <code>nmap 10.0.0.0/24 --exclude 10.0.0.1</code>",
      objective: "Use --exclude",
      xp: 35,
      check: (c, a) =>
        c === "nmap" && a.includes("--exclude") && a.includes("10.0.0.1"),
    },

    // --- NMAP ADVANCED & SCRIPTS (31-40) ---
    {
      title: "Stealth SYN Scan",
      why: "TCP uses a '3-Way Handshake' (SYN, SYN-ACK, ACK) to connect. A full connection is logged by the server. The <b>-sS</b> (Stealth SYN) scan sends a SYN, waits for the SYN-ACK to prove the port is open, but then drops the connection before sending the final ACK. This prevents the server from logging the interaction.",
      text: "Type <code>nmap -sS localhost</code>",
      objective: "Type nmap -sS",
      xp: 45,
      check: (c, a) =>
        c === "nmap" && a.includes("-sS") && a.includes("localhost"),
    },
    {
      title: "UDP Scan",
      why: "Most internet traffic is TCP (guaranteed delivery). Protocols like DNS (53) and SNMP (161) use UDP (connectionless). Since UDP doesn't guarantee a response, scanning for it using <b>-sU</b> is slow and difficult, but highly rewarding for hackers.",
      text: "Type <code>nmap -sU localhost</code>",
      objective: "Type nmap -sU",
      xp: 45,
      check: (c, a) =>
        c === "nmap" && a.includes("-sU") && a.includes("localhost"),
    },
    {
      title: "TCP Connect Scan",
      why: "If you don't have raw socket (root) privileges, you cannot perform a Stealth SYN scan. The <b>-sT</b> flag forces Nmap to use the standard operating system API to complete full TCP handshakes. It is 100% reliable, but extremely loud and fully logged.",
      text: "Type <code>nmap -sT localhost</code>",
      objective: "Type nmap -sT",
      xp: 35,
      check: (c, a) =>
        c === "nmap" && a.includes("-sT") && a.includes("localhost"),
    },
    {
      title: "Output to Text",
      why: "Never lose your reconnaissance data! The <b>-oN</b> flag forces Nmap to write the exact terminal output into a standard text file for your forensic report.",
      text: "Type <code>nmap -oN scan.txt localhost</code>",
      objective: "Use -oN scan.txt",
      xp: 30,
      check: (c, a) =>
        c === "nmap" && a.includes("-oN") && a.includes("scan.txt"),
    },
    {
      title: "Output to Grepable",
      why: "If you want to feed your Nmap results into another automated tool via Bash piping, you need the <b>-oG</b> (Grepable) output format. It forces all data for a host onto a single, parsable line.",
      text: "Type <code>nmap -oG scan.gnmap localhost</code>",
      objective: "Use -oG scan.gnmap",
      xp: 30,
      check: (c, a) =>
        c === "nmap" && a.includes("-oG") && a.includes("scan.gnmap"),
    },
    {
      title: "Output All Formats",
      why: "The standard for penetration testers: <b>-oA</b> generates the Text format, the Grepable format, and an XML format simultaneously for maximum portability.",
      text: "Type <code>nmap -oA scan_all localhost</code>",
      objective: "Use -oA scan_all",
      xp: 40,
      check: (c, a) =>
        c === "nmap" && a.includes("-oA") && a.includes("scan_all"),
    },
    {
      title: "Nmap Scripting Engine",
      why: "Nmap isn't just a scanner; it's a vulnerability framework. The <b>-sC</b> flag activates the default set of Lua scripts, automatically checking for anonymous FTP logins, open SMB shares, and common web vulnerabilities.",
      text: "Type <code>nmap -sC localhost</code>",
      objective: "Type nmap -sC",
      xp: 45,
      check: (c, a) =>
        c === "nmap" && a.includes("-sC") && a.includes("localhost"),
    },
    {
      title: "Specific Vulnerability Script",
      why: "You can call individual scripts by name. For example, to check if a web server is susceptible to the catastrophic 'Heartbleed' vulnerability, you call the exact NSE module.",
      text: "Type <code>nmap --script ssl-heartbleed localhost</code>",
      objective: "Use a specific --script",
      xp: 50,
      check: (c, a) =>
        c === "nmap" && a.includes("--script") && a.includes("ssl-heartbleed"),
    },
    {
      title: "Script + Version Scan",
      why: "Scripts are much more accurate when they know exactly what version of a service they are evaluating. Combine default scripts (-sC) with Version fingerprinting (-sV) for the 'Gold Standard' Red Team scan.",
      text: "Type <code>nmap -sC -sV localhost</code>",
      objective: "Combine -sC and -sV",
      xp: 40,
      check: (c, a) => c === "nmap" && a.includes("-sC") && a.includes("-sV"),
    },
    {
      title: "No DNS Resolution",
      why: "Scanning 256 IP addresses takes a long time if Nmap has to ask a DNS server to resolve a hostname for every single one of them. The <b>-n</b> flag disables DNS resolution, drastically speeding up the scan.",
      text: "Type <code>nmap -n 10.0.0.0/24</code>",
      objective: "Type nmap -n",
      xp: 30,
      check: (c, a) =>
        c === "nmap" && a.includes("-n") && a.includes("10.0.0.0/24"),
    },

    // --- NETCAT & CONNECTIONS (41-50) ---
    {
      title: "Netcat Listener",
      why: "<b>Netcat (nc)</b> is the hacker's Swiss Army knife. The <b>-l</b> (Listen) and <b>-p</b> (Port) flags tell netcat to open a raw network socket on your machine and wait for incoming connections. This is how you catch a Reverse Shell from a hacked server.",
      text: "Type <code>nc -l -p 1234</code>",
      objective: "Type nc -l -p 1234",
      xp: 30,
      check: (c, a) =>
        c === "nc" &&
        a.includes("-l") &&
        a.includes("-p") &&
        a.includes("1234"),
    },
    {
      title: "Netcat Verbose Listener",
      why: "Always add <b>-v</b> (Verbose) so your terminal prints a message when a target actually connects to your listener, and <b>-n</b> (Numeric) to skip DNS resolution, which prevents connection delays.",
      text: "Type <code>nc -lvnp 4444</code>",
      objective: "Type nc -lvnp 4444",
      xp: 40,
      check: (c, a) =>
        c === "nc" &&
        (a.includes("-lvnp") ||
          (a.includes("-l") &&
            a.includes("-v") &&
            a.includes("-n") &&
            a.includes("-p"))) &&
        a.includes("4444"),
    },
    {
      title: "Netcat Connect",
      why: "If you want to push data TO a remote server, just give Netcat the IP address and the port. It will open a raw TCP socket, allowing you to type commands directly to the remote service.",
      text: "Type <code>nc 8.8.8.8 80</code>",
      objective: "Type nc 8.8.8.8 80",
      xp: 30,
      check: (c, a) => c === "nc" && a[0] === "8.8.8.8" && a[1] === "80",
    },
    {
      title: "Netcat Port Scan",
      why: "If Nmap isn't installed on a system, you can use Netcat to scan ports. The <b>-z</b> (Zero-I/O) flag tells Netcat to attempt a connection, report if it succeeded, and immediately drop it without sending any data.",
      text: "Type <code>nc -zv localhost 80</code>",
      objective: "Type nc -zv",
      xp: 35,
      check: (c, a) =>
        c === "nc" &&
        a.includes("-zv") &&
        a.includes("localhost") &&
        a.includes("80"),
    },
    {
      title: "Netcat Port Range",
      why: "You can scan a range of ports using Netcat to quickly find open services on a locked-down machine.",
      text: "Type <code>nc -zv localhost 1-100</code>",
      objective: "Type nc -zv with a port range",
      xp: 35,
      check: (c, a) =>
        c === "nc" &&
        a.includes("-zv") &&
        a.includes("localhost") &&
        a.includes("1-100"),
    },
    {
      title: "Netstat Listeners",
      why: "The <b>netstat</b> command shows you what your own machine is doing. Passing <b>-l</b> reveals every service currently 'Listening' (waiting for incoming internet traffic).",
      text: "Type <code>netstat -l</code>",
      objective: "Type netstat -l",
      xp: 20,
      check: (c, a) => c === "netstat" && a.includes("-l"),
    },
    {
      title: "Netstat TCP",
      why: "Filter the massive list of active sockets to only show TCP connections (web traffic, SSH, FTP).",
      text: "Type <code>netstat -t</code>",
      objective: "Type netstat -t",
      xp: 20,
      check: (c, a) => c === "netstat" && a.includes("-t"),
    },
    {
      title: "Netstat UDP",
      why: "Filter the active socket list to only show connectionless UDP traffic (DNS, DHCP).",
      text: "Type <code>netstat -u</code>",
      objective: "Type netstat -u",
      xp: 20,
      check: (c, a) => c === "netstat" && a.includes("-u"),
    },
    {
      title: "Netstat Numeric",
      why: "By default, netstat tries to resolve port '80' to the word 'http'. Using <b>-n</b> prevents this, showing you the raw numerical IP addresses and ports, which is much better for parsing logs.",
      text: "Type <code>netstat -n</code>",
      objective: "Type netstat -n",
      xp: 20,
      check: (c, a) => c === "netstat" && a.includes("-n"),
    },
    {
      title: "Netstat Combo",
      why: "The ultimate local reconnaissance command. 'Show me all TCP, UDP, Listening, and Numeric ports on my machine so I know exactly what my attack surface looks like.'",
      text: "Type <code>netstat -tuln</code>",
      objective: "Type netstat -tuln",
      xp: 30,
      check: (c, a) => c === "netstat" && a.includes("-tuln"),
    },

    // --- AGGREGATION & REPORTING (51-65) ---
    {
      title: "Create Network Report",
      why: "Red Teaming is useless without reporting. Let's create an empty master log file to aggregate all our network scans.",
      text: "Type <code>touch report.txt</code>",
      objective: "Create report.txt",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "report.txt",
    },
    {
      title: "Append Date",
      why: "Timestamp the start of your audit.",
      text: "Type <code>date >> report.txt</code>",
      objective: "Append date to report.txt",
      xp: 20,
      check: (c, a) =>
        c === "date" && a.includes(">>") && a.includes("report.txt"),
    },
    {
      title: "Append Local IP",
      why: "Record your machine's physical hardware identity (IP/MAC) into the log to establish your point of origin.",
      text: "Type <code>ip a >> report.txt</code>",
      objective: "Append ip a to report.txt",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("ip") &&
        raw.includes("a") &&
        raw.includes(">>") &&
        raw.includes("report.txt"),
    },
    {
      title: "Append Ping Test",
      why: "Record the baseline network latency and internet connectivity status into your audit log.",
      text: "Type <code>ping -c 2 8.8.8.8 >> report.txt</code>",
      objective: "Append ping results to report.txt",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("ping") &&
        raw.includes("-c") &&
        raw.includes("8.8.8.8") &&
        raw.includes(">>") &&
        raw.includes("report.txt"),
    },
    {
      title: "Append Netstat",
      why: "Record all active local listeners so you know what ports were open on your own machine during the engagement.",
      text: "Type <code>netstat -tuln >> report.txt</code>",
      objective: "Append netstat to report.txt",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("netstat") &&
        raw.includes("-tuln") &&
        raw.includes(">>") &&
        raw.includes("report.txt"),
    },
    {
      title: "Append Ports to Report",
      why: "Run a massive Nmap sweep and route the raw terminal output directly into your forensic file instead of relying on external XML formats.",
      text: "Type <code>nmap localhost >> report.txt</code>",
      objective: "Append nmap to report.txt",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("nmap") &&
        raw.includes("localhost") &&
        raw.includes(">>") &&
        raw.includes("report.txt"),
    },
    {
      title: "Read Master Report",
      why: "Verify that all your stream redirections successfully compiled into a single, cohesive intelligence log.",
      text: "Type <code>cat report.txt</code>",
      objective: "Read report.txt",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "report.txt",
    },
    {
      title: "Audit Master File",
      why: "Calculate the exact line length of your intelligence log to verify the data density matches your expectations.",
      text: "Type <code>wc -l report.txt</code>",
      objective: "Line count report.txt",
      xp: 15,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("report.txt"),
    },
    {
      title: "Grep the Report",
      why: "Parse your massive intelligence log to instantly locate which network interfaces were active during the audit.",
      text: 'Type <code>grep "inet" report.txt</code>',
      objective: "Grep inet from report.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("inet") && a.includes("report.txt"),
    },
    {
      title: "Grep the Open Ports",
      why: "Filter the intelligence log to instantly extract only the successful Nmap open port detections.",
      text: 'Type <code>grep "open" report.txt</code>',
      objective: "Grep open from report.txt",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("open") && a.includes("report.txt"),
    },
    {
      title: "Filter and Export",
      why: "Extract all the open port data from your master log, and redirect it into a new, highly specific targeting document for the exploitation phase.",
      text: 'Type <code>grep "open" report.txt > targets.txt</code>',
      objective: "Grep to a new file",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("open") &&
        raw.includes("report.txt") &&
        raw.includes(">") &&
        raw.includes("targets.txt"),
    },
    {
      title: "Check Target File",
      why: "Ensure your targeted output file compiled correctly.",
      text: "Type <code>cat targets.txt</code>",
      objective: "Read targets.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "targets.txt",
    },
    {
      title: "Cleanup Temp Files",
      why: "A professional Red Teamer leaves no tracks. Delete your specific target extraction files.",
      text: "Type <code>rm targets.txt</code>",
      objective: "Remove targets.txt",
      xp: 10,
      check: (c, a) => c === "rm" && a[0] === "targets.txt",
    },
    {
      title: "Cleanup Master",
      why: "Annihilate the master intelligence log from the system.",
      text: "Type <code>rm report.txt</code>",
      objective: "Remove report.txt",
      xp: 10,
      check: (c, a) => c === "rm" && a[0] === "report.txt",
    },
    {
      title: "Network Architect",
      why: "You understand TCP/IP, Port Scanning, Socket manipulation, and Network Diagnostics. You are ready to attack.",
      text: 'Type <code>echo "Network Layer Conquered"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("Network") &&
        raw.includes("Conquered"),
    },
  ],
};
