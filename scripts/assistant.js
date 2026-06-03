// assistant.js
// Deep Dive explanations for Bit the Cyber-Assistant

const deepDiveData = {
  // --- LINUX BASICS & FILE OPS ---
  ls: "<strong>List Directory Contents:</strong> Think of `ls` as opening your eyes in a dark room. It shows you everything around you. Add `-l` for a long list (permissions, owners, sizes) and `-a` to see hidden files (files starting with a dot).",
  cd: "<strong>Change Directory:</strong> Your primary movement tool. `cd /` takes you to the absolute root of the system. `cd ~` takes you home. `cd ..` walks you backwards one step.",
  pwd: "<strong>Print Working Directory:</strong> Lost? `pwd` tells you your exact absolute path on the hard drive.",
  cat: "<strong>Concatenate:</strong> Dumps the entire contents of a file directly onto your screen. Great for small files, terrible for massive log files.",
  echo: "<strong>Echo:</strong> Prints text back to you. Hackers use it with `>` to overwrite files, or `>>` to safely append text to the end of a file without destroying what's already there.",
  mkdir: "<strong>Make Directory:</strong> Creates a new folder.",
  touch:
    "<strong>Touch:</strong> Creates a completely empty file. Also used to update the 'last modified' timestamp of an existing file.",
  rm: "<strong>Remove:</strong> Deletes files. Add `-r` (recursive) to delete folders, and `-f` (force) to bypass confirmation. WARNING: `rm -rf /` will destroy your entire computer.",
  cp: "<strong>Copy:</strong> Duplicates a file or folder. Requires a source and a destination.",
  mv: "<strong>Move:</strong> Moves a file to a new location. In Linux, moving a file into the *same* folder with a new name is how you Rename it.",
  grep: "<strong>Global Regular Expression Print:</strong> The ultimate search tool. Pipe `|` text into it, and it filters out everything except the specific word or pattern you asked for. Crucial for finding passwords in massive log files.",
  find: "<strong>Find:</strong> The most powerful local search tool. Unlike grep (which searches *inside* files), `find` searches the filesystem *for* files based on name, size, permissions, or ownership.",
  clear:
    "<strong>Clear:</strong> Wipes your terminal screen to give you a fresh visual workspace.",
  history:
    "<strong>History:</strong> Prints every command you have typed. Attackers always check `~/.bash_history` for accidentally typed passwords.",
  head: "<strong>Head:</strong> Reads only the first 10 lines of a file. Good for checking headers.",
  tail: "<strong>Tail:</strong> Reads the last 10 lines of a file. Use `tail -f` to live-stream a log file as it updates in real-time.",
  wc: "<strong>Word Count:</strong> Counts lines, words, and characters. Use `wc -l` to count exactly how many lines are in a document.",
  tar: "<strong>Tape Archive:</strong> The Linux zip file. Originally used to write data to magnetic tape drives, it now bundles files into a `.tar` file. Add `z` to compress it into a `.tar.gz`.",

  // --- SYSTEM & PROCESS MANAGEMENT ---
  systemctl:
    "<strong>Systemd Controller:</strong> The master switch for background services (daemons). Use this to `start`, `stop`, `enable`, and check the `status` of web servers and databases.",
  journalctl:
    "<strong>Journal Controller:</strong> Queries the central systemd logging journal. It catches errors that standard log files might miss.",
  df: "<strong>Disk Free:</strong> Shows how much hard drive space is left. Always use `-h` (human-readable) so it prints in Gigabytes instead of raw bytes.",
  free: "<strong>Free Memory:</strong> Shows your available RAM and Swap space. Use `-m` to view in Megabytes.",
  top: "<strong>Top:</strong> The classic task manager. Shows live CPU and RAM usage for all running processes.",
  htop: "<strong>Htop:</strong> An interactive, colorful, and much better version of `top`. Lets you scroll through processes and kill them easily.",
  ps: "<strong>Process Status:</strong> Takes a static snapshot of currently running programs. `ps aux` lists every process from every user.",
  kill: "<strong>Kill:</strong> Sends a termination signal to a process ID (PID). `kill -9` is the 'absolute murder' signal that cannot be ignored by the program.",
  killall:
    "<strong>Kill All:</strong> Kills processes by their name instead of their PID (e.g., `killall nginx`).",
  uptime:
    "<strong>Uptime:</strong> Tells you how long the server has been running since its last reboot.",
  whoami:
    "<strong>Who Am I:</strong> Prints your current username. Usually the first command a hacker types when they get a reverse shell.",
  w: "<strong>W:</strong> Shows who is currently logged into the system and exactly what command they are running right now.",
  last: "<strong>Last:</strong> Reads `/var/log/wtmp` to show a history of all successful logins and reboots.",
  id: "<strong>ID:</strong> Shows your User ID (UID) and Group IDs. If your UID is 0, you are root (God).",

  // --- PERMISSIONS & USERS ---
  chmod:
    "<strong>Change Mode (Permissions):</strong> Modifies the read (4), write (2), and execute (1) bits of a file. `chmod 777` gives everyone total control. `chmod +x` makes a script executable.",
  chown:
    "<strong>Change Owner:</strong> Transfers ownership of a file to another user or group (e.g., `chown root:root file.txt`).",
  sudo: "<strong>SuperUser Do:</strong> Executes a single command with root privileges. Requires your password.",
  passwd:
    "<strong>Password:</strong> Changes a user's password. Root can change anyone's password without knowing the old one.",

  // --- NETWORKING ---
  ping: "<strong>Ping:</strong> Sends ICMP Echo requests to an IP to see if it is online and how fast the connection is.",
  netstat:
    "<strong>Network Statistics:</strong> Shows open ports and active connections. (Legacy tool, mostly replaced by `ss`).",
  ss: "<strong>Socket Statistics:</strong> The modern, faster replacement for netstat. Use `ss -tulnp` to see exactly what services are listening on what ports.",
  tcpdump:
    "<strong>TCP Dump:</strong> A command-line packet sniffer. It captures raw network traffic flying through your network card for forensic analysis.",
  nmap: "<strong>Network Mapper:</strong> The industry standard for network reconnaissance. It sends packets to target IPs to figure out what ports are open, what services are running, and the target's OS.",
  curl: "<strong>Client URL:</strong> A command-line web browser. Used to download files, interact with APIs, or test HTTP headers.",
  wget: "<strong>Web Get:</strong> A non-interactive file downloader. Excellent for grabbing scripts or malware payloads directly from the internet.",
  ssh: "<strong>Secure Shell:</strong> The standard way to securely log into remote Linux servers. Encrypts all your keystrokes.",
  scp: "<strong>Secure Copy:</strong> Copies files between your local machine and a remote server over an encrypted SSH tunnel.",
  nc: "<strong>Netcat:</strong> The hacker's swiss army knife. Can read/write raw data across networks. Used heavily to catch reverse shells (e.g., `nc -lvnp 4444`).",
  iptables:
    "<strong>IP Tables:</strong> The native Linux firewall. You are directly programming the kernel's network routing tables to DROP or ACCEPT traffic.",

  // --- RED TEAM & EXPLOITATION ---
  hydra:
    "<strong>Hydra:</strong> A blazing fast network logon cracker. Uses wordlists to brute-force SSH, FTP, HTTP, and database passwords.",
  gobuster:
    "<strong>Gobuster:</strong> A directory busting tool. It rapidly guesses thousands of URLs on a web server to find hidden admin panels and secret files.",
  sqlmap:
    "<strong>SQLMap:</strong> The database destroyer. Point it at a vulnerable website URL, and it automatically tests thousands of SQL injection payloads to extract sensitive tables.",
  msfconsole:
    "<strong>Metasploit Framework:</strong> The ultimate exploitation framework. Contains thousands of pre-written exploits for known vulnerabilities.",
  msfvenom:
    "<strong>MSF Venom:</strong> Metasploit's standalone payload generator. Used to craft custom malware (like reverse shells) hidden inside executables or PDFs.",
  searchsploit:
    "<strong>SearchSploit:</strong> A command-line search tool for Exploit-DB. Quickly find local copies of PoC (Proof of Concept) exploits for vulnerable software.",
  john: "<strong>John the Ripper:</strong> An incredibly fast offline password cracker. Feed it a stolen `/etc/shadow` file and a wordlist, and it will crack the hashes.",
  hashcat:
    "<strong>Hashcat:</strong> The world's fastest password cracker. Unlike John, Hashcat uses your GPU's raw processing power to crack complex hashes.",
  unshadow:
    "<strong>Unshadow:</strong> A utility that combines the public `/etc/passwd` and the restricted `/etc/shadow` files into a single format that John the Ripper can understand.",
  crunch:
    "<strong>Crunch:</strong> A custom dictionary generator. If you know a password is exactly 6 digits, Crunch will generate every possible combination for you.",

  // --- CONTAINERS, CLOUD & ORCHESTRATION ---
  docker:
    "<strong>Docker Engine:</strong> Summons isolated, mini-computers (containers) running inside your host. `run` starts one, `ps` lists them, and `exec -it` drops you into a shell inside one.",
  "docker-compose":
    "<strong>Docker Compose:</strong> Reads a `docker-compose.yml` file to spin up entire multi-container environments (like a web server AND a database) simultaneously.",
  kubectl:
    "<strong>Kubernetes Control:</strong> You are talking directly to the K8s API server. Orchestrates thousands of containers across physical nodes. Use `apply -f` to deploy cloud infrastructure.",
  terraform:
    "<strong>Terraform:</strong> Infrastructure as Code for the Cloud. Reads a `.tf` blueprint and uses APIs to physically summon AWS/Azure servers, VPCs, and firewalls out of thin air.",
  ansible:
    "<strong>Ansible:</strong> Fleet orchestration. Uses SSH to connect to thousands of remote machines and execute configurations simultaneously without needing agents installed.",
  git: "<strong>Version Control:</strong> The time machine of code. `commit` saves a snapshot of your files forever. `checkout` lets you travel back to previous snapshots.",

  // --- WEB SERVERS ---
  nginx:
    "<strong>Nginx:</strong> A lightning-fast modern web server and reverse proxy. Designed to handle thousands of concurrent connections.",
  apache2ctl:
    "<strong>Apache HTTP Server:</strong> The legacy heavyweight champion of web servers. Relies heavily on `.htaccess` files and dynamic modules.",
  certbot:
    "<strong>Certbot:</strong> Automatically talks to Let's Encrypt to generate and install free SSL/TLS certificates, turning HTTP into secure HTTPS.",

  // --- REVERSE ENGINEERING & FORENSICS ---
  file: "<strong>File:</strong> Analyzes the magic bytes at the beginning of a document to tell you what it *actually* is, regardless of its file extension.",
  strings:
    "<strong>Strings:</strong> Extracts readable human text from compiled, unreadable binary files. Great for finding hardcoded API keys or URLs in malware.",
  ldd: "<strong>List Dynamic Dependencies:</strong> Shows which shared C libraries (`.so` files) an executable requires to run.",
  readelf:
    "<strong>Read ELF:</strong> Extracts deep structural data (headers, memory sections, symbols) from a Linux ELF binary.",
  objdump:
    "<strong>Object Dump:</strong> Disassembles compiled machine code back into readable Assembly language instructions.",
  strace:
    "<strong>System Call Tracer:</strong> Peering into the Matrix. Intercepts the communication between a program and the Linux Kernel. You can see every file it opens and network connection it makes.",
  ltrace:
    "<strong>Library Tracer:</strong> Similar to strace, but watches a program's communication with shared C libraries (like `printf` or `strcmp`).",
  gdb: "<strong>GNU Debugger:</strong> Freezes a program in time. Lets you inspect CPU registers, read raw RAM hex data, and step through assembly code one instruction at a time.",
  xxd: "<strong>Hexdump:</strong> Translates any file into pure Hexadecimal and ASCII formatting.",
  binwalk:
    "<strong>Binwalk:</strong> Scans binary files (like router firmware or JPEGs) looking for hidden embedded filesystems or compressed zip files.",
  steghide:
    "<strong>Steghide:</strong> A steganography tool. Hides secret files or text *inside* the pixels of innocent-looking JPEG or WAV files.",
  exiftool:
    "<strong>ExifTool:</strong> Extracts invisible metadata from files (like the exact GPS coordinates and camera model from a photograph).",
  yara: "<strong>YARA:</strong> The pattern-matching swiss army knife. Security researchers write YARA rules (hex/string patterns) to scan networks and classify new malware families.",
  zeek: "<strong>Zeek (Bro):</strong> An enterprise network security monitor. It parses raw network traffic into highly structured, searchable logs (HTTP, DNS, SSL).",
  sysmon:
    "<strong>System Monitor:</strong> A kernel-level tracker that logs deep system activity like Process Injection, Network Connections, and File Creation to the Event Log.",
  ausearch:
    "<strong>Audit Search:</strong> Queries the native Linux `auditd` logging system. Excellent for finding exactly who failed to log in or who modified a sensitive file.",
  chkrootkit:
    "<strong>Check Rootkit:</strong> Scans your local system for known signatures of kernel-level rootkits and hidden backdoors.",

  // --- HARDWARE & IOT ---
  flashrom:
    "<strong>Flashrom:</strong> Reads and writes directly to SPI flash memory chips. Used to rip firmware straight off a physical motherboard.",
  screen:
    "<strong>Screen:</strong> A terminal multiplexer, heavily used by hardware hackers to connect to raw UART serial pins on IoT devices.",
  i2cdetect:
    "<strong>I2C Detect:</strong> Probes the hardware I2C bus to find connected sensors and EEPROM memory chips.",
  rtl_433:
    "<strong>RTL 433:</strong> Uses a Software Defined Radio (SDR) antenna to intercept and decode 433MHz radio waves from car keys, weather stations, and alarms.",
  "airodump-ng":
    "<strong>Airodump:</strong> Puts your WiFi card into monitor mode to sniff wireless packets out of the air, even if you aren't connected to the network.",
  "aireplay-ng":
    "<strong>Aireplay:</strong> Injects malicious packets into a WiFi network. Used to send 'Deauth' frames to kick IoT devices off the internet.",
  mosquitto_sub:
    "<strong>Mosquitto Sub:</strong> Subscribes to an MQTT broker. Allows you to intercept unencrypted Smart Home commands (like unlocking doors or changing lights).",
  shodan:
    "<strong>Shodan:</strong> The search engine for hackers. Scans the entire internet for exposed IoT devices, webcams, and vulnerable infrastructure.",

  // --- SECURE CODE, AI, & EXPLOIT DEV ---
  semgrep:
    "<strong>Semgrep:</strong> A rapid Static Application Security Testing (SAST) tool. Scans developers' source code to find SQL injections and XSS before the code is deployed.",
  bandit:
    "<strong>Bandit:</strong> A SAST scanner built specifically to find security vulnerabilities in Python code.",
  trufflehog:
    "<strong>TruffleHog:</strong> Scans an entire Git repository's history looking for accidentally committed passwords, AWS keys, and secrets.",
  gitleaks:
    "<strong>Gitleaks:</strong> Another powerful secret-scanning tool to prevent API keys from leaking into version control.",
  ollama:
    "<strong>Ollama:</strong> Runs massive Large Language Models (LLMs) locally on your terminal. Used by Red Teams to test AI prompt injections and jailbreaks without internet.",
  "llm-guard":
    "<strong>LLM-Guard:</strong> An AI firewall. Sits in front of a language model and scans user input for malicious 'Jailbreak' or 'DAN' (Do Anything Now) prompts.",
  modelscan:
    "<strong>ModelScan:</strong> Serialized Machine Learning models (like `.pkl` files) can contain actual malware. This tool scans them for arbitrary code execution before you load them.",
  "afl-fuzz":
    "<strong>American Fuzzy Lop:</strong> The ultimate fuzzing engine. It throws millions of mutated inputs at a C/C++ program trying to force it to crash, revealing buffer overflows.",
  checksec:
    "<strong>Checksec:</strong> Analyzes a compiled binary to tell you what security mitigations (like NX, Stack Canaries, and PIE) the developer enabled.",
  ROPgadget:
    "<strong>ROP Gadget:</strong> Searches binaries for 'Return Oriented Programming' gadgets. Hackers use these to chain together existing code to bypass memory protections.",
  nikto:
    "<strong>Nikto:</strong> A classic Dynamic Application Security Testing (DAST) scanner. Rapidly probes web servers for thousands of known vulnerabilities and misconfigurations.",

  // --- PYTHON / PACKAGE MANAGERS ---
  python3:
    "<strong>Python 3:</strong> Executes python scripts. Can also be used to instantly spawn a web server: `python3 -m http.server 80`.",
  pip: "<strong>Pip:</strong> The standard package installer for Python.",
  npm: "<strong>NPM:</strong> Node Package Manager. Use `npm audit` to check if your JavaScript project has vulnerable dependencies.",
  // --- KALI LINUX & ADVANCED ENUMERATION ---
  whois:
    "<strong>Whois:</strong> Queries public databases to find out who registered a domain name, their contact info, and when it expires.",
  nslookup:
    "<strong>NSLookup:</strong> Queries the Domain Name System (DNS). Can be used to find an IP address from a hostname, or extract hidden TXT records like SPF and DMARC.",
  theharvester:
    "<strong>TheHarvester:</strong> An OSINT tool. It scrapes Google, Bing, LinkedIn, and other sources to find emails, names, and subdomains related to a target.",
  amass:
    "<strong>Amass:</strong> The undisputed king of attack surface mapping. It uses APIs, certificates, and web scraping to find every subdomain an organization owns.",
  sublist3r:
    "<strong>Sublist3r:</strong> A lightweight Python tool for finding subdomains. Very fast, but less comprehensive than Amass.",
  macchanger:
    "<strong>MacChanger:</strong> Alters your physical network card's Media Access Control (MAC) address. Essential for evading physical network access controls.",
  tor: "<strong>Tor:</strong> The Onion Router. Encrypts and bounces your traffic through multiple global volunteer nodes to hide your true IP address.",
  proxychains4:
    "<strong>Proxychains:</strong> Forces *any* standard Linux command (like Nmap or Curl) to route its traffic through Tor or another proxy network.",
  arpspoof:
    "<strong>ARP Spoof:</strong> A Man-in-the-Middle attack. Tells a victim machine that *you* are the router, forcing all their network traffic to flow through your Kali box.",
  urlsnarf:
    "<strong>URLSnarf:</strong> A classic sniffing tool. When performing a MitM attack, this instantly extracts all the HTTP requests the victim is making in plain text.",
  whatweb:
    "<strong>WhatWeb:</strong> Scans a website to identify the underlying technology (e.g., WordPress, Nginx, PHP, Bootstrap) and its exact version numbers.",
  wafw00f:
    "<strong>WafW00f:</strong> Scans a website to figure out if it is protected by a Web Application Firewall (like Cloudflare, Akamai, or F5 BIG-IP).",
  wpscan:
    "<strong>WPScan:</strong> The ultimate WordPress hacking tool. It can enumerate all users on a blog and identify out-of-date, vulnerable plugins.",
  ffuf: "<strong>FFUF:</strong> Fuzz Faster U Fool. A blazing fast, modern web fuzzer. Used to brute-force hidden directories or test parameters for vulnerabilities.",
  dirb: "<strong>Dirb:</strong> A classic directory brute-forcing tool. It throws thousands of common folder names at a web server to see if any return a '200 OK'.",
  enum4linux:
    "<strong>Enum4Linux:</strong> A wrapper script built around Samba tools. Extracts users, password policies, and file shares from Windows networks.",
  smbclient:
    "<strong>SMBClient:</strong> Command-line tool to access Windows network file shares (Server Message Block). Think of it like FTP, but for internal networks.",
  rpcclient:
    "<strong>RPCClient:</strong> Connects directly to Microsoft Remote Procedure Call endpoints. Often allows 'Null Sessions' (logging in without a password) to extract data.",
  snmpwalk:
    "<strong>SNMPWalk:</strong> Queries network devices (like routers and switches) using the Simple Network Management Protocol. Can leak massive amounts of routing data.",
  "smtp-user-enum":
    "<strong>SMTP User Enum:</strong> Asks an email server if an email address exists by using the VRFY, EXPN, or RCPT TO commands.",
  showmount:
    "<strong>Showmount:</strong> Native Linux tool. Asks an NFS (Network File System) server what folders it is currently sharing with the network.",
  cewl: "<strong>CeWL:</strong> Custom Word List generator. A ruby app that crawls a given URL to a specified depth and returns a list of words, perfect for password cracking.",
  hashid:
    "<strong>HashID:</strong> Analyzes a password hash to guess what encryption algorithm (MD5, SHA-256, bcrypt) was used to create it.",
  cupp: "<strong>CUPP:</strong> Common User Passwords Profiler. You input a victim's dog's name, birthdate, and partner's name, and it generates thousands of highly likely passwords.",
};
