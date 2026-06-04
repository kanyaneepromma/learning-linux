// twentysecondmodule.js
// Module 22: Kali Linux & Advanced Enumeration (65 Lessons)

const module22_kali = {
  name: "22. Kali Linux & Advanced Enum (65 Lessons)",
  lessons: [
    // --- PHASE 1: OSINT & DNS ENUMERATION (1-15) ---
    {
      title: "Whois Lookup",
      why: "The WHOIS database stores the physical identity, email addresses, and registration dates of domain owners. Information Gathering starts here to build a profile for Social Engineering.",
      text: "Type <code>whois example.com</code>",
      objective: "Run whois",
      xp: 15,
      check: (c, a) => c === "whois" && a.includes("example.com"),
    },
    {
      title: "NSLookup Basic",
      why: "Query the Domain Name System (DNS) via port 53. NSLookup mathematically translates human-readable domain names into raw, routable IPv4 addresses.",
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
      why: "The `-type=TXT` flag instructs the DNS server to return Text records. Administrators often hide sensitive domain verification keys or misconfigured SPF email routing rules in these records.",
      text: "Type <code>nslookup -type=TXT example.com</code>",
      objective: "Run nslookup for TXT",
      xp: 20,
      check: (c, a) =>
        c === "nslookup" &&
        a.includes("-type=TXT") &&
        a.includes("example.com"),
    },
    {
      title: "Harvester Google",
      why: "TheHarvester is a premier OSINT tool. By passing `-b google`, it scrapes search engine indexes, extracting leaked employee emails and hidden subdomains without ever touching the target's actual servers.",
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
      title: "Amass Enum",
      why: "OWASP Amass executes aggressive Attack Surface Mapping. It crawls APIs, certificates, and web archives to build an exhaustive topological map of every subdomain the target organization owns.",
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
      title: "Sublist3r Scan",
      why: "Sublist3r is a rapid Python enumeration tool. By passing `-o`, it routes the scraped subdomains directly into a text file, which we can later pipe into Nmap for mass vulnerability scanning.",
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
      title: "DNS Zone Transfer",
      why: "The AXFR (Zone Transfer) protocol is meant to sync databases between Master and Slave DNS servers. A misconfigured DNS server will accept an AXFR request from anyone, dumping its entire internal network map to the hacker.",
      text: "Type <code>dig axfr @ns1.example.com example.com</code>",
      objective: "Attempt AXFR",
      xp: 45,
      check: (c, a) =>
        c === "dig" && a.includes("axfr") && a.some((x) => x.includes("ns1")),
    },
    {
      title: "Check DMARC",
      why: "DMARC prevents email spoofing. Querying `_dmarc.example.com` tells us if the target has this configured. If missing or set to `p=none`, the organization is highly vulnerable to phishing campaigns.",
      text: "Type <code>dig TXT _dmarc.example.com</code>",
      objective: "Check DMARC",
      xp: 30,
      check: (c, a) =>
        c === "dig" && a.includes("TXT") && a.some((x) => x.includes("_dmarc")),
    },
    {
      title: "DNSRecon Standard",
      why: "DNSRecon automates SRV, SOA, and MX record enumeration. It parses the DNS architecture to reveal exactly where the target's email and active directory servers are physically routed.",
      text: "Type <code>dnsrecon -d example.com</code>",
      objective: "Run dnsrecon",
      xp: 40,
      check: (c, a) =>
        c === "dnsrecon" && a.includes("-d") && a.includes("example.com"),
    },
    {
      title: "Clean Up OSINT",
      why: "Destroy the generated subdomain text files to maintain OPSEC (Operational Security) before moving to active network spoofing.",
      text: "Type <code>rm subdomains.txt</code>",
      objective: "Remove text file",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("subdomains.txt"),
    },

    // --- PHASE 2: ANONYMITY, SPOOFING & PROXIES (16-30) ---
    {
      title: "Check IP",
      why: "Before routing traffic, query an external reflection server (`ifconfig.me`) to mathematically confirm the exact public IPv4 address your machine is currently broadcasting to the internet.",
      text: "Type <code>curl ifconfig.me</code>",
      objective: "Curl ifconfig.me",
      xp: 20,
      check: (c, a) => c === "curl" && a.includes("ifconfig.me"),
    },
    {
      title: "Show Current MAC",
      why: "MAC addresses are hardcoded into your physical network interface card (NIC). Network Intrusion systems log this to track physical devices. Check your true hardware address.",
      text: "Type <code>macchanger -s eth0</code>",
      objective: "Show MAC",
      xp: 25,
      check: (c, a) =>
        c === "macchanger" && a.includes("-s") && a.includes("eth0"),
    },
    {
      title: "Randomize MAC",
      why: "The `-r` flag injects a completely randomized, spoofed hexadecimal block into the kernel's network stack, temporarily altering your hardware identity to evade physical switch tracking.",
      text: "Type <code>macchanger -r eth0</code>",
      objective: "Randomize MAC",
      xp: 40,
      check: (c, a) =>
        c === "macchanger" && a.includes("-r") && a.includes("eth0"),
    },
    {
      title: "Start Tor Service",
      why: "Initialize the Onion Router daemon. Tor opens a local SOCKS5 proxy on port 9050, allowing you to mathematically encrypt and bounce your packets through global relay nodes to mask your IP.",
      text: "Type <code>systemctl start tor</code>",
      objective: "Start tor",
      xp: 30,
      check: (c, a) =>
        c === "systemctl" && a.includes("start") && a.includes("tor"),
    },
    {
      title: "Verify Tor Routing",
      why: "<b>Proxychains</b> uses `LD_PRELOAD` hooks to intercept any command (like curl) and force its TCP sockets to route through the Tor proxy, mathematically anonymizing the request.",
      text: "Type <code>proxychains4 curl ifconfig.me</code>",
      objective: "Proxychains curl",
      xp: 50,
      check: (c, a) =>
        c === "proxychains4" && a.includes("curl") && a.includes("ifconfig.me"),
    },
    {
      title: "Anonymous Nmap",
      why: "You cannot send raw UDP or Stealth SYN packets through Tor. You MUST use the `-sT` (TCP Connect) flag, which forces Nmap to complete full, proxy-compliant handshakes to scan the target anonymously.",
      text: "Type <code>proxychains4 nmap -sT -Pn -p 80 target.local</code>",
      objective: "Proxychains nmap",
      xp: 60,
      check: (c, a) =>
        c === "proxychains4" && a.includes("nmap") && a.includes("-sT"),
    },
    {
      title: "Enable IP Forwarding",
      why: "To execute a Man-in-the-Middle (MitM) attack, you must tell your Linux kernel to act as a router. Setting `ip_forward=1` allows your machine to accept packets from a victim and seamlessly forward them to the internet.",
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
      why: "The Address Resolution Protocol (ARP) lacks authentication. <b>arpspoof</b> floods the victim (10.0.0.50) with forged packets, mathematically convincing their computer that YOUR MAC address belongs to the network Router.",
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
      why: "Because you are now mathematically positioned between the victim and the internet, <b>urlsnarf</b> intercepts the unencrypted HTTP requests passing through your network card, revealing their browsing habits.",
      text: "Type <code>urlsnarf -i eth0</code>",
      objective: "Run urlsnarf",
      xp: 40,
      check: (c, a) => c === "urlsnarf" && a.includes("-i"),
    },
    {
      title: "Disable IP Forwarding",
      why: "The attack is complete. Restore the kernel networking stack to its default state to prevent packet leaking.",
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
      why: "Drop the temporary spoofed MAC block and instruct the kernel to resume using the permanent, physical hardware address of your NIC.",
      text: "Type <code>macchanger -p eth0</code>",
      objective: "Restore MAC",
      xp: 30,
      check: (c, a) =>
        c === "macchanger" && a.includes("-p") && a.includes("eth0"),
    },

    // --- PHASE 3: WAF PROFILING & DIR FUZZING (31-45) ---
    {
      title: "Run WhatWeb",
      why: "<b>WhatWeb</b> intercepts HTTP headers and HTML metadata. It parses these signatures to instantly identify the underlying Content Management System (WordPress), programming language (PHP), and server software (Apache).",
      text: "Type <code>whatweb http://target.local</code>",
      objective: "Run whatweb",
      xp: 35,
      check: (c, a) =>
        c === "whatweb" && a.some((x) => x.includes("target.local")),
    },
    {
      title: "Detect WAF",
      why: "Web Application Firewalls (WAFs) like Cloudflare intercept malicious packets. <b>WafW00f</b> sends mathematically malformed logic payloads to the server and analyzes the rejection response to fingerprint exactly which WAF brand is blocking you.",
      text: "Type <code>wafw00f http://target.local</code>",
      objective: "Run wafw00f",
      xp: 45,
      check: (c, a) =>
        c === "wafw00f" && a.some((x) => x.includes("target.local")),
    },
    {
      title: "WPScan Enumerate Users",
      why: "WordPress exposes user data through its REST API. <b>wpscan -e u</b> systematically iterates through the `/wp-json/wp/v2/users/` endpoint to extract the full list of valid administrator usernames.",
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
      why: "Plugins are the weakest link in WordPress. The `-e vp` flag iterates through known plugin directory paths, matching them against the WPVulnDB database to identify out-of-date code susceptible to Remote Code Execution.",
      text: "Type <code>wpscan --url http://target.local -e vp</code>",
      objective: "WPScan vulnerable plugins",
      xp: 50,
      check: (c, a) => c === "wpscan" && a.includes("-e") && a.includes("vp"),
    },
    {
      title: "FFUF Directory Scan",
      why: "Fuzz Faster U Fool (FFUF) is a Go-based fuzzer. It replaces the 'FUZZ' keyword in the URL with thousands of dictionary words simultaneously, evaluating the HTTP status codes to brute-force hidden directories.",
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
      why: "Some servers respond with a '200 OK' for everything, making fuzzing impossible. The `-fs 4242` flag mathematically filters out responses that are exactly 4242 bytes large, perfectly hiding the false positives.",
      text: "Type <code>ffuf -w common.txt -u http://target.local/FUZZ -fs 4242</code>",
      objective: "Run ffuf with -fs",
      xp: 50,
      check: (c, a) => c === "ffuf" && a.includes("-fs") && a.includes("4242"),
    },
    {
      title: "Run Dirb",
      why: "Dirb is a legacy recursive directory buster. Unlike FFUF, if Dirb finds an `admin/` folder, it automatically dives into it and begins a completely new brute-force attack from that new baseline.",
      text: "Type <code>dirb http://target.local</code>",
      objective: "Run dirb",
      xp: 35,
      check: (c, a) =>
        c === "dirb" && a.some((x) => x.includes("target.local")),
    },
    {
      title: "Extract Headers",
      why: "The `-I` flag commands `curl` to issue an HTTP HEAD request. This returns only the server's architectural headers (like `X-Powered-By: PHP/7.4`), revealing the exact backend technology stack.",
      text: "Type <code>curl -I http://target.local</code>",
      objective: "Curl -I",
      xp: 25,
      check: (c, a) => c === "curl" && a.includes("-I"),
    },
    {
      title: "Test OPTIONS Method",
      why: "The OPTIONS request queries the web server's Cross-Origin Resource Sharing (CORS) policies. It reveals if dangerous legacy methods like PUT or DELETE are enabled, allowing unauthorized file uploads.",
      text: "Type <code>curl -X OPTIONS -i http://target.local</code>",
      objective: "Curl OPTIONS",
      xp: 35,
      check: (c, a) =>
        c === "curl" && a.includes("-X") && a.includes("OPTIONS"),
    },

    // --- PHASE 4: NETWORK, SMB, & RPC ENUMERATION (46-60) ---
    {
      title: "Run Enum4Linux",
      why: "Samba (SMB) powers Windows file sharing. <b>Enum4Linux</b> exploits legacy NetBIOS and SMB APIs to systematically extract Domain SIDs, password complexity rules, and all configured Windows user accounts.",
      text: "Type <code>enum4linux -a 10.0.0.5</code>",
      objective: "Run enum4linux -a",
      xp: 55,
      check: (c, a) =>
        c === "enum4linux" && a.includes("-a") && a.includes("10.0.0.5"),
    },
    {
      title: "List SMB Shares",
      why: "The `-N` flag forces a 'Null Session' (anonymous login). <b>smbclient -L</b> interrogates the server, listing all available internal hard drives and backup folders exposed to the network.",
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
      why: "The IPC$ (Inter-Process Communication) share is used by Windows to handle background networking. Connecting anonymously to IPC$ confirms the server is vulnerable to deep Null Session RPC polling.",
      text: "Type <code>smbclient //10.0.0.5/IPC$ -N</code>",
      objective: "Connect to IPC$",
      xp: 50,
      check: (c, a) =>
        c === "smbclient" &&
        a.includes("-N") &&
        a.some((x) => x.includes("IPC$")),
    },
    {
      title: "RPC Null Session",
      why: 'Microsoft Remote Procedure Call (RPC) executes code on remote servers. By passing an empty string `-U ""`, we initiate an anonymous RPC pipe, giving us direct command-line access to internal Windows queries.',
      text: 'Type <code>rpcclient -U "" 10.0.0.5</code>',
      objective: "Run rpcclient null session",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("rpcclient") && raw.includes("-U") && raw.includes('""'),
    },
    {
      title: "SNMP Walk",
      why: "Simple Network Management Protocol (SNMP) manages enterprise routers. Polling the community string 'public' dumps the entire routing table, interface IPs, and connected hardware metrics for the entire building.",
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
      title: "SMTP Enum",
      why: "Email servers operate on port 25. <b>smtp-user-enum</b> uses the VRFY (Verify) command to mathematically ask the server if an inbox exists. This allows attackers to silently build a list of valid targets for phishing.",
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
      why: "Nmap scripts can directly execute exploits. The `smb-vuln-ms17-010` script sends specifically malformed packets to port 445 to determine if the server is vulnerable to EternalBlue (the exploit behind WannaCry).",
      text: "Type <code>nmap --script smb-vuln-ms17-010 -p 445 10.0.0.5</code>",
      objective: "Nmap EternalBlue check",
      xp: 55,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("smb-vuln")),
    },
    {
      title: "Nmap LDAP Enum",
      why: "Lightweight Directory Access Protocol (LDAP) organizes the Active Directory tree. Scanning port 389 allows you to extract the Domain Controllers and organizational units of the corporate network.",
      text: "Type <code>nmap -p 389 --script ldap-search 10.0.0.5</code>",
      objective: "Nmap LDAP search",
      xp: 45,
      check: (c, a) => c === "nmap" && a.some((x) => x.includes("ldap-search")),
    },
    {
      title: "Showmount NFS",
      why: "Network File System (NFS) acts like SMB but for Linux. The `showmount -e` command asks the RPC portmapper exactly which internal server directories are being actively exported to the public network.",
      text: "Type <code>showmount -e 10.0.0.15</code>",
      objective: "Run showmount",
      xp: 35,
      check: (c, a) =>
        c === "showmount" && a.includes("-e") && a.includes("10.0.0.15"),
    },
    {
      title: "Mount NFS Share",
      why: "If an NFS share is exposed, you can use the `mount` command to map the remote server's `/backups` directory physically into your local Kali Linux `/mnt` folder, giving you instant access to all their data.",
      text: "Type <code>mount -t nfs 10.0.0.15:/backups /mnt</code>",
      objective: "Mount NFS",
      xp: 50,
      check: (c, a) =>
        c === "mount" &&
        a.includes("-t") &&
        a.includes("nfs") &&
        a.some((x) => x.includes("backups")),
    },

    // --- PHASE 5: PASSWORD PROFILING & CONCLUSION (61-65) ---
    {
      title: "Run CeWL",
      why: "<b>CeWL</b> is a Custom Word List generator. It spiders the target website, extracting all corporate terminology, names, and industry jargon, mathematically compiling them into a highly targeted dictionary for brute-forcing.",
      text: "Type <code>cewl -d 2 -w custom_dict.txt http://target.local</code>",
      objective: "Run cewl",
      xp: 50,
      check: (c, a) =>
        c === "cewl" && a.includes("-d") && a.includes("2") && a.includes("-w"),
    },
    {
      title: "Identify Hash",
      why: "Before you crack a password, you must know the math behind it. <b>Hashid</b> parses the hex string, assessing its byte length and character set to determine if it is MD5, SHA-256, or bcrypt.",
      text: "Type <code>hashid 8743b52063cd84097a65d1633f5c74f5</code>",
      objective: "Run hashid",
      xp: 30,
      check: (c, a) => c === "hashid" && a.some((x) => x.includes("8743b520")),
    },
    {
      title: "Run Cupp Interactive",
      why: "<b>CUPP</b> (Common User Passwords Profiler) exploits human psychology. You input a victim's birthdate, pet's name, and favorite sports team, and CUPP permutes thousands of likely passwords.",
      text: "Type <code>cupp -i</code>",
      objective: "Run cupp -i",
      xp: 40,
      check: (c, a) => c === "cupp" && a.includes("-i"),
    },
    {
      title: "Clean Arsenal",
      why: "Remove the generated custom wordlists from your terminal environment to conclude the engagement cleanly.",
      text: "Type <code>rm custom_dict.txt</code>",
      objective: "Remove artifacts",
      xp: 20,
      check: (c, a) => c === "rm" && a.includes("custom_dict.txt"),
    },
    {
      title: "The Master Enumerator",
      why: "You understand AXFR Zone Transfers, WAF Bypassing, SMB Null Sessions, and LDAP polling. You possess the ultimate reconnaissance skill set.",
      text: 'Type <code>echo "Kali Master Recon Complete"</code>',
      objective: "Echo Kali Master",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Recon"),
    },
  ],
};
