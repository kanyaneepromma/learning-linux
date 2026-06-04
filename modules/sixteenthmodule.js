// sixteenthmodule.js
// Module 16: Web Server Orchestration (65 Lessons)

const module16_web = {
  name: "16. Web Orchestration (65 Lessons)",
  lessons: [
    // --- PHASE 1: NGINX BASICS & TRIAGE (1-15) ---
    {
      title: "Check Nginx Status",
      why: "Nginx operates as a systemd background daemon. Checking its status reveals its active PID, memory allocation, and the last 10 lines of its internal initialization logs.",
      text: "Type <code>systemctl status nginx</code>",
      objective: "Type systemctl status nginx",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "status" && a[1] === "nginx",
    },
    {
      title: "Start Nginx",
      why: "Instruct systemd to initialize the Nginx master process. The master process reads the configuration files and then forks off unprivileged 'worker' processes to handle the actual web traffic.",
      text: "Type <code>systemctl start nginx</code>",
      objective: "Type systemctl start nginx",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "start" && a[1] === "nginx",
    },
    {
      title: "Enable Nginx",
      why: "Creates a symbolic link in the systemd boot structure, mathematically guaranteeing that the kernel will automatically spawn the web server whenever the physical hardware powers on.",
      text: "Type <code>systemctl enable nginx</code>",
      objective: "Type systemctl enable nginx",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "enable" && a[1] === "nginx",
    },
    {
      title: "Curl Localhost",
      why: "Verify the web stack is listening. `curl` executes an HTTP GET request to the local loopback adapter. If Nginx is healthy, it responds with the default 'Welcome to Nginx' HTML payload.",
      text: "Type <code>curl localhost</code>",
      objective: "Type curl localhost",
      xp: 15,
      check: (c, a) => c === "curl" && a[0] === "localhost",
    },
    {
      title: "Nginx Config Dir",
      why: "The <b>/etc/nginx/</b> directory holds the master architecture. Nginx uses a modular design, loading configurations from various subdirectories rather than relying on one massive, unreadable file.",
      text: "Type <code>cd /etc/nginx</code>",
      objective: "cd /etc/nginx",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/etc/nginx",
    },
    {
      title: "List Configs",
      why: "List the architecture. You will see `nginx.conf` (the master brain), `sites-available` (inactive templates), and `sites-enabled` (active symlinks).",
      text: "Type <code>ls -la</code>",
      objective: "ls -la",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-la"),
    },
    {
      title: "Read Main Config",
      why: "The `nginx.conf` file controls the master worker connections, global SSL protocols, and HTTP buffering. Read it to understand the global limitations of your web server.",
      text: "Type <code>cat nginx.conf</code>",
      objective: "cat nginx.conf",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "nginx.conf",
    },
    {
      title: "Sites Available",
      why: "The `sites-available` folder holds Virtual Host blueprints. You can define 50 different websites here, but none of them will go 'live' until you explicitly link them.",
      text: "Type <code>cd sites-available</code>",
      objective: "cd sites-available",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "sites-available",
    },
    {
      title: "Edit Default Site",
      why: "Use `nano` (simulated text editor) to open the default Virtual Host block. This file tells Nginx exactly which folder on the hard drive correlates to requests arriving on port 80.",
      text: "Type <code>nano default</code>",
      objective: "nano default",
      xp: 20,
      check: (c, a) => c === "nano" && a[0] === "default",
    },
    {
      title: "Change Server Name",
      why: "The `server_name` directive inspects the HTTP 'Host' header of incoming traffic. This allows Nginx to host 'apple.com' and 'google.com' on the exact same IP address, serving different files based on the requested name.",
      text: 'Type <code>sed -i "s/server_name _;/server_name myapp.local;/" default</code>',
      objective: "Update server_name",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("sed") && raw.includes("server_name"),
    },
    {
      title: "Change Root Directory",
      why: "The `root` directive maps the URL structure to the physical disk. By changing this to `/var/www/myapp`, you instruct the web server to pull its HTML files from a new, secure directory.",
      text: 'Type <code>sed -i "s|root /var/www/html;|root /var/www/myapp;|" default</code>',
      objective: "Update root directory",
      xp: 35,
      check: (c, a, o, raw) => raw.includes("sed") && raw.includes("root"),
    },
    {
      title: "Test Configuration",
      why: "A single missing semicolon in an Nginx config will cause the master process to crash, taking down every website you host. <b>nginx -t</b> compiles the syntax mathematically to guarantee it is structurally sound before applying it.",
      text: "Type <code>nginx -t</code>",
      objective: "Type nginx -t",
      xp: 30,
      check: (c, a) => c === "nginx" && a.includes("-t"),
    },
    {
      title: "Reload Configuration",
      why: "Do NOT use `systemctl restart`. Restarting terminates active user downloads. <b>reload</b> sends a SIGHUP signal, instructing Nginx to gracefully spawn new workers with the new config, while letting old workers finish their active downloads.",
      text: "Type <code>systemctl reload nginx</code>",
      objective: "Type systemctl reload nginx",
      xp: 25,
      check: (c, a) =>
        c === "systemctl" && a[0] === "reload" && a[1] === "nginx",
    },
    {
      title: "Web Directory",
      why: "Navigate to the absolute path where the physical code for your web application resides.",
      text: "Type <code>cd /var/www/html</code>",
      objective: "cd /var/www/html",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/var/www/html",
    },
    {
      title: "Create App File",
      why: "Inject a custom HTML payload into the web root to verify the structural mapping is functioning correctly.",
      text: 'Type <code>echo "<h1>App Active</h1>" > index.html</code>',
      objective: "Create index.html",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes(">") && raw.includes("index.html"),
    },

    // --- PHASE 2: LOG PARSING & FORENSICS (16-30) ---
    {
      title: "Access Logs Dir",
      why: "Nginx buffers its traffic metrics into `/var/log/nginx/`. The access log records the IP, Timestamp, HTTP Method, URL, and User-Agent of every single packet that touches the server.",
      text: "Type <code>cd /var/log/nginx</code>",
      objective: "cd /var/log/nginx",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/var/log/nginx",
    },
    {
      title: "Tail Access Log",
      why: "During a DDoS attack, system administrators use `tail -f` to lock their terminal to the active stream buffer, watching the malicious traffic execute in real-time.",
      text: "Type <code>tail -f access.log</code>",
      objective: "Tail access.log",
      xp: 20,
      check: (c, a) =>
        c === "tail" && a.includes("-f") && a.includes("access.log"),
    },
    {
      title: "Grep 404 Errors",
      why: "Hackers run automated scanners (like Gobuster) that generate thousands of '404 Not Found' errors as they guess hidden URLs. Grepping for '404' isolates the hacker's reconnaissance footprint.",
      text: 'Type <code>grep " 404 " access.log</code>',
      objective: "Grep 404 errors",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("404") &&
        raw.includes("access.log"),
    },
    {
      title: "Grep 500 Errors",
      why: "A '500 Internal Server Error' means the backend code (PHP/Python) crashed. Filtering the logs for this code reveals exactly which endpoint is structurally failing under load.",
      text: 'Type <code>grep " 500 " access.log</code>',
      objective: "Grep 500 errors",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("500") &&
        raw.includes("access.log"),
    },
    {
      title: "Extract IP Addresses",
      why: "We use <b>awk '{print $1}'</b> to parse the access log and slice out only the 1st column, which natively holds the Source IP address of the requesting client.",
      text: "Type <code>awk '{print $1}' access.log</code>",
      objective: "Awk first column",
      xp: 35,
      check: (c, a, o, raw) => raw.includes("awk") && raw.includes("print $1"),
    },
    {
      title: "Top 10 IPs Pipeline",
      why: "The ultimate SysAdmin command. We extract IPs (awk), group identical IPs (sort), count them (uniq -c), sort by the highest count (sort -nr), and display only the top 10 worst offenders (head).",
      text: "Type <code>awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -n 10</code>",
      objective: "Pipeline top 10 IPs",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("awk") && raw.includes("uniq -c") && raw.includes("head"),
    },
    {
      title: "Grep Suspicious Agents",
      why: "Automated hacking scripts (like Nmap or SQLMap) often fail to spoof their User-Agent strings. Grepping the logs for these signatures reveals vulnerability scans instantly.",
      text: 'Type <code>grep -i "sqlmap\\|nmap\\|curl" access.log</code>',
      objective: "Grep suspicious user agents",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("sqlmap") &&
        raw.includes("access.log"),
    },
    {
      title: "Error Log",
      why: "The `error.log` is separate from `access.log`. It specifically records Nginx worker crashes, syntax errors, and TLS certificate handshake failures.",
      text: "Type <code>tail -n 20 error.log</code>",
      objective: "Tail error.log",
      xp: 20,
      check: (c, a) =>
        c === "tail" &&
        a.includes("-n") &&
        a.includes("20") &&
        a.includes("error.log"),
    },
    {
      title: "Rotate Logs",
      why: "Logs grow infinitely and will crash your hard drive. <b>logrotate</b> is a cron utility that compresses old logs into `.gz` archives and creates fresh, empty text files to prevent disk exhaustion.",
      text: "Type <code>logrotate -f /etc/logrotate.d/nginx</code>",
      objective: "Force logrotate",
      xp: 30,
      check: (c, a) =>
        c === "logrotate" && a.includes("-f") && a.includes("nginx"),
    },

    // --- PHASE 3: REVERSE PROXY & LOAD BALANCING (31-45) ---
    {
      title: "Virtual Hosts Dir",
      why: "Return to the architectural configuration folder to build a Reverse Proxy.",
      text: "Type <code>cd /etc/nginx/sites-available</code>",
      objective: "cd sites-available",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "sites-available",
    },
    {
      title: "Create Proxy Config",
      why: "We establish a new file. A Reverse Proxy accepts public traffic on port 80, but instead of serving HTML, it silently tunnels the request to a hidden backend application (like a NodeJS API).",
      text: "Type <code>touch api_proxy</code>",
      objective: "Create api_proxy file",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "api_proxy",
    },
    {
      title: "Set Proxy Pass",
      why: "The `proxy_pass` directive is the core of modern architecture. It instructs Nginx to terminate the client's connection, initiate a completely new connection to `localhost:3000`, and funnel the response back.",
      text: 'Type <code>echo "server { listen 80; location /api/ { proxy_pass http://localhost:3000; } }" > api_proxy</code>',
      objective: "Echo proxy configuration",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("proxy_pass") &&
        raw.includes("api_proxy"),
    },
    {
      title: "Enable Site (Symlink)",
      why: "The `api_proxy` file is in `sites-available`, so Nginx ignores it. The <b>ln -s</b> command creates a symbolic shortcut in `sites-enabled`, flipping the structural switch to activate the proxy.",
      text: "Type <code>ln -s /etc/nginx/sites-available/api_proxy /etc/nginx/sites-enabled/</code>",
      objective: "Create symlink",
      xp: 35,
      check: (c, a) =>
        c === "ln" &&
        a.includes("-s") &&
        a.some((x) => x.includes("api_proxy")),
    },
    {
      title: "Test Proxy Syntax",
      why: "Validate the newly established proxy_pass linkage to guarantee the brackets and semicolons are mathematically flawless.",
      text: "Type <code>nginx -t</code>",
      objective: "Test nginx config",
      xp: 20,
      check: (c, a) => c === "nginx" && a.includes("-t"),
    },
    {
      title: "Reload Proxy",
      why: "SIGHUP reload to cleanly activate the new API routing paths without dropping active users.",
      text: "Type <code>systemctl reload nginx</code>",
      objective: "Reload nginx",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "reload" && a[1] === "nginx",
    },
    {
      title: "Upstream Block",
      why: "If your app goes viral, one backend Node server will crash. The `upstream` directive defines an array of multiple backend IPs, allowing Nginx to distribute the traffic mathematically.",
      text: 'Type <code>echo "upstream backend { server 10.0.0.1; server 10.0.0.2; }" > lb.conf</code>',
      objective: "Create upstream block",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("upstream backend"),
    },
    {
      title: "Apply Load Balancer",
      why: "Point the proxy_pass directive at your newly created `backend` cluster instead of a single localhost IP, instantly transforming Nginx into a Round-Robin Load Balancer.",
      text: 'Type <code>echo "server { listen 80; location / { proxy_pass http://backend; } }" >> lb.conf</code>',
      objective: "Append server block",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("proxy_pass http://backend"),
    },
    {
      title: "Enable Load Balancer",
      why: "Symlink the new load balancer blueprint to activate the high-availability clustering.",
      text: "Type <code>ln -s /etc/nginx/sites-available/lb.conf /etc/nginx/sites-enabled/</code>",
      objective: "Symlink lb.conf",
      xp: 30,
      check: (c, a) =>
        c === "ln" && a.includes("-s") && a.some((x) => x.includes("lb.conf")),
    },
    {
      title: "Validate & Reload",
      why: "Compile the syntax tree and reboot the workers into the high-availability paradigm.",
      text: "Type <code>nginx -t && systemctl reload nginx</code>",
      objective: "Test and reload",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("nginx -t") && raw.includes("reload nginx"),
    },

    // --- PHASE 4: SECURITY & SSL (46-65) ---
    {
      title: "Install Certbot",
      why: "HTTP sends passwords in plaintext. HTTPS wraps traffic in a cryptographic TLS tunnel. <b>Certbot</b> automates the retrieval of free, legally-signed cryptographic certificates from Let's Encrypt.",
      text: "Type <code>apt install certbot python3-certbot-nginx -y</code>",
      objective: "Install certbot",
      xp: 25,
      check: (c, a) => c === "apt" && a.includes("certbot"),
    },
    {
      title: "Run Certbot",
      why: "The `--nginx` plugin forces Certbot to automatically read your server blocks, fetch the cryptographic challenges, negotiate the TLS certificate, and dynamically rewrite your Nginx configs to apply the SSL keys.",
      text: "Type <code>certbot --nginx -d myapp.local</code>",
      objective: "Run certbot",
      xp: 45,
      check: (c, a) =>
        c === "certbot" && a.includes("--nginx") && a.includes("myapp.local"),
    },
    {
      title: "Test SSL Renewal",
      why: "Let's Encrypt certificates expire in 90 days. The `--dry-run` flag safely simulates the cronjob renewal process to ensure the API handshake completes successfully before expiration.",
      text: "Type <code>certbot renew --dry-run</code>",
      objective: "Dry run renewal",
      xp: 35,
      check: (c, a) =>
        c === "certbot" && a.includes("renew") && a.includes("--dry-run"),
    },
    {
      title: "Check HTTPS Header",
      why: "Use `curl -I` on the HTTPS endpoint. A '200 OK' confirms that Nginx is successfully offloading the TLS decryption handshake and forwarding the traffic.",
      text: "Type <code>curl -I https://localhost</code>",
      objective: "Curl https localhost",
      xp: 20,
      check: (c, a) =>
        c === "curl" && a.includes("-I") && a.includes("https://localhost"),
    },
    {
      title: "Block Hidden Files",
      why: "In Nginx, if a location block starts with a dot (like `.git` or `.env`), we instruct the engine to instantly drop the request and return a 404, preventing hackers from downloading source code.",
      text: 'Type <code>echo "location ~ /\\. { deny all; }" >> /etc/nginx/nginx.conf</code>',
      objective: "Block dotfiles",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("deny all;") &&
        raw.includes("nginx.conf"),
    },
    {
      title: "Rate Limiting Setup",
      why: "Protect against DDoS. A `limit_req_zone` creates an isolated memory block to track IP frequencies, guaranteeing that an IP can only request 10 pages per second.",
      text: 'Type <code>echo "limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;" >> /etc/nginx/nginx.conf</code>',
      objective: "Setup rate limiting zone",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("limit_req_zone") &&
        raw.includes("nginx.conf"),
    },
    {
      title: "Hide Server Tokens",
      why: "Nginx broadcasts its exact version number on error pages, handing vulnerability scanners free intel. Setting `server_tokens off;` strips this metadata globally.",
      text: 'Type <code>sed -i "s/# server_tokens off;/server_tokens off;/" /etc/nginx/nginx.conf</code>',
      objective: "Uncomment server_tokens off",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("sed") && raw.includes("server_tokens off;"),
    },
    {
      title: "Find Large Files",
      why: "Administrators often leave massive `.tar` backup files in the web root, exposing all backend code. Find them and remove them.",
      text: "Type <code>find /var/www/html -type f -size +5M</code>",
      objective: "Find files larger than 5M",
      xp: 35,
      check: (c, a) =>
        c === "find" && a.includes("/var/www/html") && a.includes("-size"),
    },
    {
      title: "Create Maintenance Page",
      why: "A professional architect prepares for downtime. We create a static `503.html` fallback file so users receive a clean UI when the backend database crashes.",
      text: 'Type <code>echo "Under Maintenance" > /var/www/html/503.html</code>',
      objective: "Create 503.html",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes(">") && raw.includes("503.html"),
    },
    {
      title: "Check SSL Protocols",
      why: "TLSv1.0 and 1.1 are mathematically broken. Grep the master configuration to verify your web server is forcing clients to use the secure TLSv1.2 or TLSv1.3 protocols.",
      text: 'Type <code>grep "ssl_protocols" /etc/nginx/nginx.conf</code>',
      objective: "Grep ssl_protocols",
      xp: 30,
      check: (c, a) => c === "grep" && a.includes("ssl_protocols"),
    },
    {
      title: "Flush Old Logs",
      why: "Log rotation handles regular files, but during an active DDoS, the access log can hit 50GB in seconds. Null-truncating the file frees the hard drive without killing the Nginx worker threads.",
      text: 'Type <code>echo "" > /var/log/nginx/access.log</code>',
      objective: "Truncate access.log",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes(">") &&
        raw.includes("/var/log/nginx/access.log"),
    },
    {
      title: "Restart Nginx Fully",
      why: "Because we altered the massive core limitations (Rate Limiting, Protocols), a gentle `reload` is insufficient. We must forcefully `restart` the daemon to clear its memory allocations.",
      text: "Type <code>systemctl restart nginx</code>",
      objective: "Restart nginx completely",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "restart" && a[1] === "nginx",
    },
    {
      title: "Verify Security Context",
      why: "Confirm the master process is running as `root` (to bind port 80), but ensure all active worker threads properly downgraded to the unprivileged `www-data` account.",
      text: "Type <code>ps aux | grep nginx</code>",
      objective: "Check nginx processes",
      xp: 20,
      check: (c, a, o, raw) => raw.includes("ps") && raw.includes("nginx"),
    },
    {
      title: "Test Config Once More",
      why: "The final sign-off for any Web Architect. Ensure the structural integrity of the entire web environment is pristine.",
      text: "Type <code>nginx -t</code>",
      objective: "Run a final nginx -t",
      xp: 15,
      check: (c, a) => c === "nginx" && a.includes("-t"),
    },
    {
      title: "Orchestration Master",
      why: "You understand Reverse Proxies, TLS Offloading, Log Parsing, and High-Availability Clustering. You have mastered Web Server Orchestration.",
      text: 'Type <code>echo "Web Architect Complete"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Web Architect"),
    },
  ],
};
