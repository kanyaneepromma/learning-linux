// twentysecondmodule.js
// Module 22: Kali Linux & Advanced Enumeration (100 Lessons)

const module22_kali = {
  name: "22. Kali Linux & Advanced Enum (100 Lessons)",
  lessons: [
    // --- PHASE 1: OSINT & DNS ENUMERATION (1-20) ---
    {
      title: "Whois Lookup",
      why: "Find out who owns a domain and when it was registered.",
      text: "Type <code>whois example.com</code>",
      objective: "Run whois",
      xp: 15,
      check: (c, a) => c === "whois" && a.includes("example.com"),
    },
    {
      title: "NSLookup Basic",
      why: "Query the Domain Name System (DNS) to find the IP of a website.",
      text: "Type <code>nslookup example.com</code>",
      objective: "Run nslookup",
      xp: 15,
      check: (c, a) =>
        c === "nslookup" &&
        a.includes("example.com") &&
        !a.includes("-type=TXT"),
    },
    {
      title: "NSLookup TXT",
      why: "Extract TXT records, which often contain sensitive SPF rules or verification keys.",
      text: "Type <code>nslookup -type=TXT example.com</code>",
      objective: "Run nslookup for TXT",
      xp: 20,
      check: (c, a) =>
        c === "nslookup" &&
        a.includes("-type=TXT") &&
        a.includes("example.com"),
    },
    {
      title: "Install theHarvester",
      why: "Kali's premier OSINT tool for scraping emails and subdomains from search engines.",
      text: "Type <code>apt install theharvester -y</code>",
      objective: "Install theharvester",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("theharvester"),
    },
    {
      title: "Harvester Google",
      why: "Scrape Google for any emails belonging to the target domain.",
      text: "Type <code>theHarvester -d example.com -b google</code>",
      objective: "Run theHarvester",
      xp: 40,
      check: (c, a) =>
        c === "theHarvester" &&
        a.includes("-d") &&
        a.includes("example.com") &&
        a.includes("-b"),
    },
    {
      title: "Install Amass",
      why: "OWASP Amass is the most powerful subdomain enumeration tool available.",
      text: "Type <code>apt install amass -y</code>",
      objective: "Install amass",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("amass"),
    },
    {
      title: "Amass Enum",
      why: "Use Amass to actively build a map of the target's external infrastructure.",
      text: "Type <code>amass enum -d example.com</code>",
      objective: "Run amass enum",
      xp: 50,
      check: (c, a) =>
        c === "amass" &&
        a.includes("enum") &&
        a.includes("-d") &&
        a.includes("example.com"),
    },
    {
      title: "Install Sublist3r",
      why: "Another fast Python tool that enumerates subdomains using many search engines.",
      text: "Type <code>apt install sublist3r -y</code>",
      objective: "Install sublist3r",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("sublist3r"),
    },
    {
      title: "Sublist3r Scan",
      why: "Scan the target domain for subdomains and output to a text file.",
      text: "Type <code>sublist3r -d example.com -o subdomains.txt</code>",
      objective: "Run sublist3r",
      xp: 40,
      check: (c, a) =>
        c === "sublist3r" &&
        a.includes("-d") &&
        a.includes("-o") &&
        a.includes("subdomains.txt"),
    },
    {
      title: "View Subdomains",
      why: "Check the results of your scrape.",
      text: "Type <code>cat subdomains.txt</code>",
      objective: "Cat subdomains.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a.includes("subdomains.txt"),
    },
    {
      title: "DNS Zone Transfer",
      why: "Attempt a zone transfer (AXFR) to see if the DNS server leaks all its records.",
      text: "Type <code>dig axfr @ns1.example.com example.com</code>",
      objective: "Attempt AXFR",
      xp: 45,
      check: (c, a) =>
        c === "dig" && a.includes("axfr") && a.some((x) => x.includes("ns1")),
    },
    {
      title: "Check DMARC",
      why: "Find out if the target is vulnerable to email spoofing.",
      text: "Type <code>dig TXT _dmarc.example.com</code>",
      objective: "Check DMARC",
      xp: 30,
      check: (c, a) =>
        c === "dig" && a.includes("TXT") && a.some((x) => x.includes("_dmarc")),
    },
    {
      title: "Install Maltego",
      why: "Install the Kali GUI tool for interactive threat intelligence (simulated CLI initialization).",
      text: "Type <code>apt install maltego -y</code>",
      objective: "Install maltego",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("maltego"),
    },
    {
      title: "Recon-ng Setup",
      why: "Recon-ng is a full-featured Web Reconnaissance framework written in Python.",
      text: "Type <code>recon-ng -v</code>",
      objective: "Start recon-ng",
      xp: 30,
      check: (c, a) => c === "recon-ng" && a.includes("-v"),
    },
    {
      title: "Ping Sweep Subnet",
      why: "Use nmap to quickly see which IPs in a subnet are alive without port scanning.",
      text: "Type <code>nmap -sn 10.0.0.0/24</code>",
      objective: "Nmap ping sweep",
      xp: 35,
      check: (c, a) => c === "nmap" && a.includes("-sn"),
    },
    {
      title: "Reverse DNS Lookup",
      why: "Translate IP addresses back into hostnames to discover hidden internal names.",
      text: "Type <code>nmap -sL 10.0.0.0/24</code>",
      objective: "Nmap reverse DNS",
      xp: 35,
      check: (c, a) => c === "nmap" && a.includes("-sL"),
    },
    {
      title: "Install DNSRecon",
      why: "A powerful DNS enumeration script.",
      text: "Type <code>apt install dnsrecon -y</code>",
      objective: "Install dnsrecon",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("dnsrecon"),
    },
    {
      title: "DNSRecon Standard",
      why: "Run a standard enumeration against the domain.",
      text: "Type <code>dnsrecon -d example.com</code>",
      objective: "Run dnsrecon",
      xp: 40,
      check: (c, a) =>
        c === "dnsrecon" && a.includes("-d") && a.includes("example.com"),
    },
    {
      title: "Clean Up OSINT",
      why: "Remove your scraped files.",
      text: "Type <code>rm subdomains.txt</code>",
      objective: "Remove text file",
      xp: 10,
      check: (c, a) => c === "rm" && a.includes("subdomains.txt"),
    },
    {
      title: "OSINT Complete",
      why: "You mapped the external perimeter.",
      text: 'Type <code>echo "Perimeter Mapped"</code>',
      objective: "Echo Perimeter Mapped",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Perimeter"),
    },

    // --- PHASE 2: ANONYMITY, SPOOFING & PROXIES (21-40) ---
    {
      title: "Check IP",
      why: "Find out your public-facing IP before hiding it.",
      text: "Type <code>curl ifconfig.me</code>",
      objective: "Curl ifconfig.me",
      xp: 20,
      check: (c, a) => c === "curl" && a.includes("ifconfig.me"),
    },
    {
      title: "Install Macchanger",
      why: "Spoof your network card's hardware MAC address to evade physical tracking.",
      text: "Type <code>apt install macchanger -y</code>",
      objective: "Install macchanger",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("macchanger"),
    },
    {
      title: "Show Current MAC",
      why: "Check your physical hardware address.",
      text: "Type <code>macchanger -s eth0</code>",
      objective: "Show MAC",
      xp: 25,
      check: (c, a) =>
        c === "macchanger" && a.includes("-s") && a.includes("eth0"),
    },
    {
      title: "Randomize MAC",
      why: "Generate a completely random MAC address.",
      text: "Type <code>macchanger -r eth0</code>",
      objective: "Randomize MAC",
      xp: 40,
      check: (c, a) =>
        c === "macchanger" && a.includes("-r") && a.includes("eth0"),
    },
    {
      title: "Install Tor",
      why: "Install the Onion Router daemon to hide your IP address.",
      text: "Type <code>apt install tor -y</code>",
      objective: "Install tor",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("tor"),
    },
    {
      title: "Start Tor Service",
      why: "Boot up the local Tor proxy on port 9050.",
      text: "Type <code>systemctl start tor</code>",
      objective: "Start tor",
      xp: 30,
      check: (c, a) =>
        c === "systemctl" && a.includes("start") && a.includes("tor"),
    },
    {
      title: "Install Proxychains",
      why: "Proxychains forces any Linux command to route its traffic through Tor.",
      text: "Type <code>apt install proxychains4 -y</code>",
      objective: "Install proxychains",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("proxychains4"),
    },
    {
      title: "Verify Tor Routing",
      why: "Use Proxychains with curl to see your new exit-node IP.",
      text: "Type <code>proxychains4 curl ifconfig.me</code>",
      objective: "Proxychains curl",
      xp: 50,
      check: (c, a) =>
        c === "proxychains4" && a.includes("curl") && a.includes("ifconfig.me"),
    },
    {
      title: "Anonymous Nmap",
      why: "Scan a target completely anonymously. (Requires TCP Connect -sT).",
      text: "Type <code>proxychains4 nmap -sT -Pn -p 80 target.local</code>",
      objective: "Proxychains nmap",
      xp: 60,
      check: (c, a) =>
        c === "proxychains4" && a.includes("nmap") && a.includes("-sT"),
    },
    {
      title: "Configure Proxychains",
      why: "Edit the config to use dynamic chains instead of strict chains.",
      text: 'Type <code>echo "dynamic_chain" > /etc/proxychains4.conf</code>',
      objective: "Edit proxychains conf",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("dynamic_chain") &&
        raw.includes("proxychains4.conf"),
    },
    {
      title: "ARP Spoofing Setup",
      why: "Install dsniff to perform Man-in-the-Middle (MitM) ARP poisoning.",
      text: "Type <code>apt install dsniff -y</code>",
      objective: "Install dsniff",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("dsniff"),
    },
    {
      title: "Enable IP Forwarding",
      why: "Allow your Kali box to route traffic between the victim and the router.",
      text: "Type <code>sysctl -w net.ipv4.ip_forward=1</code>",
      objective: "Enable IP forwarding",
      xp: 45,
      check: (c, a) =>
        c === "sysctl" &&
        a.includes("-w") &&
        a.some((x) => x.includes("ip_forward=1")),
    },
    {
      title: "Arpspoof Victim",
      why: "Tell the victim (10.0.0.50) that YOU are the router (10.0.0.1).",
      text: "Type <code>arpspoof -i eth0 -t 10.0.0.50 10.0.0.1</code>",
      objective: "Run arpspoof",
      xp: 55,
      check: (c, a) =>
        c === "arpspoof" &&
        a.includes("-i") &&
        a.includes("-t") &&
        a.includes("10.0.0.50"),
    },
    {
      title: "Sniff MitM Traffic",
      why: "Now that you are the router, sniff their traffic.",
      text: "Type <code>urlsnarf -i eth0</code>",
      objective: "Run urlsnarf",
      xp: 40,
      check: (c, a) => c === "urlsnarf" && a.includes("-i"),
    },
    {
      title: "Disable IP Forwarding",
      why: "Turn routing back off.",
      text: "Type <code>sysctl -w net.ipv4.ip_forward=0</code>",
      objective: "Disable IP forwarding",
      xp: 20,
      check: (c, a) =>
        c === "sysctl" &&
        a.includes("-w") &&
        a.some((x) => x.includes("ip_forward=0")),
    },
    {
      title: "Restore MAC",
      why: "Reset your MAC address to its permanent hardware value.",
      text: "Type <code>macchanger -p eth0</code>",
      objective: "Restore MAC",
      xp: 30,
      check: (c, a) =>
        c === "macchanger" && a.includes("-p") && a.includes("eth0"),
    },
    {
      title: "Stop Tor",
      why: "Turn off the onion router.",
      text: "Type <code>systemctl stop tor</code>",
      objective: "Stop tor",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a.includes("stop") && a.includes("tor"),
    },
    {
      title: "Clear Arp Cache",
      why: "Wipe your local ARP cache to avoid network collisions.",
      text: "Type <code>ip -s -s neigh flush all</code>",
      objective: "Flush ARP",
      xp: 35,
      check: (c, a) => c === "ip" && a.includes("neigh") && a.includes("flush"),
    },
    {
      title: "Verify Network",
      why: "Ensure you are reconnected locally.",
      text: "Type <code>ping -c 1 8.8.8.8</code>",
      objective: "Ping Google",
      xp: 15,
      check: (c, a) => c === "ping" && a.includes("-c") && a.includes("1"),
    },
    {
      title: "Ghost in the Machine",
      why: "Phase 2 complete.",
      text: 'Type <code>echo "Anonymity Restored"</code>',
      objective: "Echo Anonymity",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Anonymity"),
    },

    // --- PHASE 3: ADVANCED WEB ENUMERATION & WAF PROFILING (41-60) ---
    {
      title: "Install WhatWeb",
      why: "Identify the CMS, blogging platform, or web framework of a site.",
      text: "Type <code>apt install whatweb -y</code>",
      objective: "Install whatweb",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("whatweb"),
    },
    {
      title: "Run WhatWeb",
      why: "Scan the target website for framework signatures.",
      text: "Type <code>whatweb http://target.local</code>",
      objective: "Run whatweb",
      xp: 35,
      check: (c, a) =>
        c === "whatweb" && a.some((x) => x.includes("target.local")),
    },
    {
      title: "Install WafW00f",
      why: "Identify and fingerprint Web Application Firewalls (WAF) protecting a site.",
      text: "Type <code>apt install wafw00f -y</code>",
      objective: "Install wafw00f",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("wafw00f"),
    },
    {
      title: "Detect WAF",
      why: "Scan the target to see if it's protected by Cloudflare, Akamai, or F5.",
      text: "Type <code>wafw00f http://target.local</code>",
      objective: "Run wafw00f",
      xp: 45,
      check: (c, a) =>
        c === "wafw00f" && a.some((x) => x.includes("target.local")),
    },
    {
      title: "Install WPScan",
      why: "The ultimate black-box WordPress vulnerability scanner.",
      text: "Type <code>apt install wpscan -y</code>",
      objective: "Install wpscan",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("wpscan"),
    },
    {
      title: "WPScan Enumerate Users",
      why: "Extract all valid usernames from the WordPress installation.",
      text: "Type <code>wpscan --url http://target.local -e u</code>",
      objective: "WPScan users",
      xp: 50,
      check: (c, a) =>
        c === "wpscan" &&
        a.includes("--url") &&
        a.includes("-e") &&
        a.includes("u"),
    },
    {
      title: "WPScan Enumerate Plugins",
      why: "Find out of date, vulnerable WordPress plugins.",
      text: "Type <code>wpscan --url http://target.local -e vp</code>",
      objective: "WPScan vulnerable plugins",
      xp: 50,
      check: (c, a) => c === "wpscan" && a.includes("-e") && a.includes("vp"),
    },
    {
      title: "Install FFUF",
      why: "Fuzz Faster U Fool (FFUF) is the modern, Go-based directory fuzzer.",
      text: "Type <code>apt install ffuf -y</code>",
      objective: "Install ffuf",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("ffuf"),
    },
    {
      title: "Fetch Wordlist",
      why: "Get the SecLists directory discovery wordlist.",
      text: "Type <code>wget http://repo.local/common.txt</code>",
      objective: "Wget common.txt",
      xp: 20,
      check: (c, a) => c === "wget" && a.some((x) => x.includes("common.txt")),
    },
    {
      title: "FFUF Directory Scan",
      why: "Rapidly brute-force hidden directories on the web server.",
      text: "Type <code>ffuf -w common.txt -u http://target.local/FUZZ</code>",
      objective: "Run ffuf",
      xp: 60,
      check: (c, a) =>
        c === "ffuf" &&
        a.includes("-w") &&
        a.includes("common.txt") &&
        a.includes("-u") &&
        a.some((x) => x.includes("FUZZ")),
    },
    {
      title: "FFUF Filter Size",
      why: "Filter out massive junk responses by excluding sizes (-fs).",
      text: "Type <code>ffuf -w common.txt -u http://target.local/FUZZ -fs 4242</code>",
      objective: "Run ffuf with -fs",
      xp: 50,
      check: (c, a) => c === "ffuf" && a.includes("-fs") && a.includes("4242"),
    },
    {
      title: "Install Dirb",
      why: "The classic Kali directory buster.",
      text: "Type <code>apt install dirb -y</code>",
      objective: "Install dirb",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("dirb"),
    },
    {
      title: "Run Dirb",
      why: "Run a simple, recursive directory brute-force.",
      text: "Type <code>dirb http://target.local</code>",
      objective: "Run dirb",
      xp: 35,
      check: (c, a) =>
        c === "dirb" && a.some((x) => x.includes("target.local")),
    },
    {
      title: "Nmap HTTP Enum",
      why: "Use Nmap's scripting engine to enumerate common web apps.",
      text: "Type <code>nmap --script http-enum target.local</code>",
      objective: "Nmap http-enum",
      xp: 45,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("http-enum")),
    },
    {
      title: "Nmap HTTP Title",
      why: "Quickly grab the HTML <title> of every web server in the subnet.",
      text: "Type <code>nmap -p 80,443 --script http-title 10.0.0.0/24</code>",
      objective: "Nmap http-title",
      xp: 50,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("http-title")),
    },
    {
      title: "Extract Headers",
      why: "Use curl to dump the raw HTTP headers, revealing the server version.",
      text: "Type <code>curl -I http://target.local</code>",
      objective: "Curl -I",
      xp: 25,
      check: (c, a) => c === "curl" && a.includes("-I"),
    },
    {
      title: "Test OPTIONS Method",
      why: "Send an OPTIONS request to see what HTTP methods (PUT, DELETE) the server allows.",
      text: "Type <code>curl -X OPTIONS -i http://target.local</code>",
      objective: "Curl OPTIONS",
      xp: 35,
      check: (c, a) =>
        c === "curl" && a.includes("-X") && a.includes("OPTIONS"),
    },
    {
      title: "Clean Up Web Enum",
      why: "Delete your wordlists.",
      text: "Type <code>rm common.txt</code>",
      objective: "Remove common.txt",
      xp: 10,
      check: (c, a) => c === "rm" && a.includes("common.txt"),
    },
    {
      title: "Clear Screen",
      why: "Prep for network services.",
      text: "Type <code>clear</code>",
      objective: "Type clear",
      xp: 10,
      check: (c) => c === "clear",
    },
    {
      title: "Web Enumerator",
      why: "Phase 3 complete.",
      text: 'Type <code>echo "Web Attack Surface Mapped"</code>',
      objective: "Echo Web Surface",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Mapped"),
    },

    // --- PHASE 4: NETWORK, SMB, & RPC ENUMERATION (61-80) ---
    {
      title: "Install Enum4Linux",
      why: "The ultimate tool for extracting information from Windows and Samba systems.",
      text: "Type <code>apt install enum4linux -y</code>",
      objective: "Install enum4linux",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("enum4linux"),
    },
    {
      title: "Run Enum4Linux",
      why: "Run a full scan against a target Windows server.",
      text: "Type <code>enum4linux -a 10.0.0.5</code>",
      objective: "Run enum4linux -a",
      xp: 55,
      check: (c, a) =>
        c === "enum4linux" && a.includes("-a") && a.includes("10.0.0.5"),
    },
    {
      title: "Install SMBClient",
      why: "A command-line FTP-like client to access SMB/CIFS resources on servers.",
      text: "Type <code>apt install smbclient -y</code>",
      objective: "Install smbclient",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("smbclient"),
    },
    {
      title: "List SMB Shares",
      why: "List all shared folders on the target anonymously.",
      text: "Type <code>smbclient -L //10.0.0.5 -N</code>",
      objective: "Smbclient list shares",
      xp: 45,
      check: (c, a) =>
        c === "smbclient" &&
        a.includes("-L") &&
        a.includes("-N") &&
        a.some((x) => x.includes("10.0.0.5")),
    },
    {
      title: "Connect to SMB Share",
      why: "Connect to the anonymous IPC$ share to verify null sessions.",
      text: "Type <code>smbclient //10.0.0.5/IPC$ -N</code>",
      objective: "Connect to IPC$",
      xp: 50,
      check: (c, a) =>
        c === "smbclient" &&
        a.includes("-N") &&
        a.some((x) => x.includes("IPC$")),
    },
    {
      title: "Install RPCClient",
      why: "Connect directly to Microsoft RPC endpoints.",
      text: "Type <code>apt install rpcclient -y</code>",
      objective: "Install rpcclient",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("rpcclient"),
    },
    {
      title: "RPC Null Session",
      why: "Log into the RPC endpoint without a username or password.",
      text: 'Type <code>rpcclient -U "" 10.0.0.5</code>',
      objective: "Run rpcclient null session",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("rpcclient") && raw.includes("-U") && raw.includes('""'),
    },
    {
      title: "Enumerate Domain Users",
      why: "While inside the RPC shell, you would run 'enumdomusers'. (Simulation).",
      text: 'Type <code>echo "enumdomusers"</code>',
      objective: "Simulate enumdomusers",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("enumdomusers"),
    },
    {
      title: "Install SNMP Tools",
      why: "Simple Network Management Protocol often leaks massive amounts of infrastructure data.",
      text: "Type <code>apt install snmp snmp-mibs-downloader -y</code>",
      objective: "Install snmp",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("snmp"),
    },
    {
      title: "SNMP Walk",
      why: "Query the target router using the default community string 'public'.",
      text: "Type <code>snmpwalk -c public -v2c 10.0.0.10</code>",
      objective: "Run snmpwalk",
      xp: 55,
      check: (c, a) =>
        c === "snmpwalk" &&
        a.includes("-c") &&
        a.includes("public") &&
        a.includes("-v2c"),
    },
    {
      title: "Install SMTP-User-Enum",
      why: "Guess usernames by asking the mail server (VRFY, EXPN, RCPT).",
      text: "Type <code>apt install smtp-user-enum -y</code>",
      objective: "Install smtp-user-enum",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("smtp-user-enum"),
    },
    {
      title: "SMTP Enum",
      why: "Check if 'root' is a valid email user on the mail server.",
      text: "Type <code>smtp-user-enum -M VRFY -u root -t 10.0.0.25</code>",
      objective: "Run smtp-user-enum",
      xp: 45,
      check: (c, a) =>
        c === "smtp-user-enum" &&
        a.includes("-M") &&
        a.includes("VRFY") &&
        a.includes("-u"),
    },
    {
      title: "Nmap SMB Vulns",
      why: "Use Nmap to check if the target is vulnerable to MS17-010 (EternalBlue).",
      text: "Type <code>nmap --script smb-vuln-ms17-010 -p 445 10.0.0.5</code>",
      objective: "Nmap EternalBlue check",
      xp: 55,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("smb-vuln")),
    },
    {
      title: "Nmap LDAP Enum",
      why: "Enumerate Lightweight Directory Access Protocol.",
      text: "Type <code>nmap -p 389 --script ldap-search 10.0.0.5</code>",
      objective: "Nmap LDAP search",
      xp: 45,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("ldap-search")),
    },
    {
      title: "Nmap NFS Enum",
      why: "Enumerate Network File System shares.",
      text: "Type <code>nmap -p 111 --script nfs-ls 10.0.0.15</code>",
      objective: "Nmap NFS search",
      xp: 45,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("nfs-ls")),
    },
    {
      title: "Showmount",
      why: "Native Linux tool to see what NFS folders are exported.",
      text: "Type <code>showmount -e 10.0.0.15</code>",
      objective: "Run showmount",
      xp: 35,
      check: (c, a) =>
        c === "showmount" && a.includes("-e") && a.includes("10.0.0.15"),
    },
    {
      title: "Mount NFS Share",
      why: "Mount the exposed backup drive to your local Kali machine.",
      text: "Type <code>mount -t nfs 10.0.0.15:/backups /mnt</code>",
      objective: "Mount NFS",
      xp: 50,
      check: (c, a) =>
        c === "mount" &&
        a.includes("-t") &&
        a.includes("nfs") &&
        a.some((x) => x.includes("backups")),
    },
    {
      title: "List Backups",
      why: "Check what you just mounted.",
      text: "Type <code>ls -l /mnt</code>",
      objective: "List /mnt",
      xp: 15,
      check: (c, a) => c === "ls" && a.includes("/mnt"),
    },
    {
      title: "Unmount",
      why: "Disconnect from the share.",
      text: "Type <code>umount /mnt</code>",
      objective: "Umount /mnt",
      xp: 15,
      check: (c, a) => c === "umount" && a.includes("/mnt"),
    },
    {
      title: "Network Insider",
      why: "Phase 4 complete.",
      text: 'Type <code>echo "Internal Services Enumerated"</code>',
      objective: "Echo Internal Services",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Internal"),
    },

    // --- PHASE 5: CUSTOM WORDLISTS & FINAL GAUNTLET (81-100) ---
    {
      title: "Install CeWL",
      why: "Custom Word List generator. Scrapes a website's text to build a hyper-targeted password dictionary.",
      text: "Type <code>apt install cewl -y</code>",
      objective: "Install cewl",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("cewl"),
    },
    {
      title: "Run CeWL",
      why: "Scrape the target site to a depth of 2 links and save to a dictionary.",
      text: "Type <code>cewl -d 2 -w custom_dict.txt http://target.local</code>",
      objective: "Run cewl",
      xp: 50,
      check: (c, a) =>
        c === "cewl" && a.includes("-d") && a.includes("2") && a.includes("-w"),
    },
    {
      title: "View Custom Wordlist",
      why: "Check the words CeWL found.",
      text: "Type <code>head custom_dict.txt</code>",
      objective: "Head custom_dict.txt",
      xp: 20,
      check: (c, a) => c === "head" && a.includes("custom_dict.txt"),
    },
    {
      title: "Install Hashid",
      why: "Identify unknown password hashes.",
      text: "Type <code>apt install hashid -y</code>",
      objective: "Install hashid",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("hashid"),
    },
    {
      title: "Identify Hash",
      why: "Identify an MD5 hash format.",
      text: "Type <code>hashid 8743b52063cd84097a65d1633f5c74f5</code>",
      objective: "Run hashid",
      xp: 30,
      check: (c, a) => c === "hashid" && a.some((x) => x.includes("8743b520")),
    },
    {
      title: "Install Cupp",
      why: "Common User Passwords Profiler. Generates passwords based on a person's life details.",
      text: "Type <code>apt install cupp -y</code>",
      objective: "Install cupp",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("cupp"),
    },
    {
      title: "Run Cupp Interactive",
      why: "Launch Cupp in interactive mode.",
      text: "Type <code>cupp -i</code>",
      objective: "Run cupp -i",
      xp: 40,
      check: (c, a) => c === "cupp" && a.includes("-i"),
    },
    {
      title: "Nmap Output to XML",
      why: "Always save your scans! Save as XML to import into Metasploit later.",
      text: "Type <code>nmap -sV -oX scan.xml target.local</code>",
      objective: "Nmap -oX",
      xp: 50,
      check: (c, a) => c === "nmap" && a.includes("-sV") && a.includes("-oX"),
    },
    {
      title: "Import into MSF",
      why: "Inside msfconsole, you would run 'db_import'. (Simulation).",
      text: 'Type <code>echo "db_import scan.xml"</code>',
      objective: "Simulate db_import",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("db_import"),
    },
    {
      title: "Searchsploit Nmap",
      why: "Search Exploit-DB using the exact Nmap XML output format.",
      text: "Type <code>searchsploit --nmap scan.xml</code>",
      objective: "Searchsploit --nmap",
      xp: 55,
      check: (c, a) =>
        c === "searchsploit" && a.includes("--nmap") && a.includes("scan.xml"),
    },
    {
      title: "Gauntlet: Enum Web",
      why: "You are dropped into a network. Find the web server's framework.",
      text: "Type <code>whatweb http://192.168.10.5</code>",
      objective: "Whatweb 192.168.10.5",
      xp: 50,
      check: (c, a) =>
        c === "whatweb" && a.some((x) => x.includes("192.168.10.5")),
    },
    {
      title: "Gauntlet: Enum CMS",
      why: "It's WordPress. Enumerate the users.",
      text: "Type <code>wpscan --url http://192.168.10.5 -e u</code>",
      objective: "WPScan users 192.168.10.5",
      xp: 60,
      check: (c, a) =>
        c === "wpscan" &&
        a.some((x) => x.includes("192.168.10.5")) &&
        a.includes("u"),
    },
    {
      title: "Gauntlet: Generate Dict",
      why: "Scrape the blog for a custom dictionary.",
      text: "Type <code>cewl -w words.txt http://192.168.10.5</code>",
      objective: "Cewl words.txt",
      xp: 60,
      check: (c, a) =>
        c === "cewl" &&
        a.includes("-w") &&
        a.some((x) => x.includes("192.168.10.5")),
    },
    {
      title: "Gauntlet: Brute Force",
      why: "Use Hydra to blast the WordPress login using your custom list.",
      text: 'Type <code>hydra -L users.txt -P words.txt 192.168.10.5 http-post-form "/wp-login.php"</code>',
      objective: "Hydra wp-login",
      xp: 75,
      check: (c, a) =>
        c === "hydra" &&
        a.includes("-L") &&
        a.includes("-P") &&
        a.includes("http-post-form"),
    },
    {
      title: "Gauntlet: Pivot to SMB",
      why: "You found credentials. See if they work on the internal Domain Controller.",
      text: "Type <code>smbclient -L //192.168.10.10 -U admin</code>",
      objective: "Smbclient DC",
      xp: 60,
      check: (c, a) =>
        c === "smbclient" &&
        a.includes("-L") &&
        a.some((x) => x.includes("192.168.10.10")) &&
        a.includes("-U"),
    },
    {
      title: "Gauntlet: Exploit DB",
      why: "Search for a zero-day for the exposed service.",
      text: "Type <code>searchsploit smb 3.0</code>",
      objective: "Searchsploit smb 3.0",
      xp: 40,
      check: (c, a) =>
        c === "searchsploit" && a.includes("smb") && a.includes("3.0"),
    },
    {
      title: "Clean Arsenal",
      why: "Wipe your custom wordlists and XML files.",
      text: "Type <code>rm custom_dict.txt scan.xml words.txt</code>",
      objective: "Remove artifacts",
      xp: 20,
      check: (c, a) => c === "rm" && a.includes("scan.xml"),
    },
    {
      title: "Clear Terminal",
      why: "Hide your tracks.",
      text: "Type <code>clear</code>",
      objective: "Type clear",
      xp: 10,
      check: (c) => c === "clear",
    },
    {
      title: "The Master Enumerator",
      why: "You have completed the entire Kali Linux reconnaissance toolkit.",
      text: 'Type <code>echo "Kali Master"</code>',
      objective: "Echo Kali Master",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Kali"),
    },
    {
      title: "BEYOND THE HORIZON",
      why: "You have completed 22 modules. You are an unstoppable force of nature.",
      text: 'Type <code>echo "I AM THE OMNISCIENT RED TEAMER"</code>',
      objective: "Echo Omniscient",
      xp: 3000,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("OMNISCIENT"),
    },
  ],
};
