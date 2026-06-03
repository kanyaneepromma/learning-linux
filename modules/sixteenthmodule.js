// sixteenthmodule.js
// Module 16: Web Server Orchestration (65 Lessons)

const module16_web = {
  name: "16. Web Orchestration (65 Lessons)",
  lessons: [
    // --- PHASE 1: NGINX BASICS & TRIAGE (1-15) ---
    {
      title: "Check Nginx Status",
      why: "See if the modern web server is running.",
      text: "Type <code>systemctl status nginx</code>",
      objective: "Type systemctl status nginx",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "status" && a[1] === "nginx",
    },
    {
      title: "Start Nginx",
      why: "Boot the web daemon.",
      text: "Type <code>systemctl start nginx</code>",
      objective: "Type systemctl start nginx",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "start" && a[1] === "nginx",
    },
    {
      title: "Enable Nginx",
      why: "Ensure the web server boots automatically on system restart.",
      text: "Type <code>systemctl enable nginx</code>",
      objective: "Type systemctl enable nginx",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "enable" && a[1] === "nginx",
    },
    {
      title: "Curl Localhost",
      why: "Test if the server is responding to HTTP requests.",
      text: "Type <code>curl localhost</code>",
      objective: "Type curl localhost",
      xp: 15,
      check: (c, a) => c === "curl" && a[0] === "localhost",
    },
    {
      title: "Curl Headers Only",
      why: "Extract the HTTP response headers to fingerprint the server (-I).",
      text: "Type <code>curl -I localhost</code>",
      objective: "Use curl -I",
      xp: 25,
      check: (c, a) =>
        c === "curl" && a.includes("-I") && a.includes("localhost"),
    },
    {
      title: "Navigate to Web Root",
      why: "Go to where the public HTML files live.",
      text: "Type <code>cd /var/www/html</code>",
      objective: "Type cd /var/www/html",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/var/www/html",
    },
    {
      title: "List Web Files",
      why: "See the default index file.",
      text: "Type <code>ls -la</code>",
      objective: "Type ls -la",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-la"),
    },
    {
      title: "Deface the Web Page",
      why: "Overwrite the default landing page with your own text.",
      text: 'Type <code>echo "Hacked by SysAdmin" > index.html</code>',
      objective: "Overwrite index.html",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes(">") && raw.includes("index.html"),
    },
    {
      title: "Verify Defacement",
      why: "Check the local site again.",
      text: "Type <code>curl localhost</code>",
      objective: "Type curl localhost",
      xp: 15,
      check: (c, a) => c === "curl" && a[0] === "localhost",
    },
    {
      title: "Navigate to Nginx Configs",
      why: "Go to the core configuration directory.",
      text: "Type <code>cd /etc/nginx</code>",
      objective: "Type cd /etc/nginx",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/etc/nginx",
    },
    {
      title: "Read Core Config",
      why: "View the master nginx.conf file.",
      text: "Type <code>cat nginx.conf</code>",
      objective: "Type cat nginx.conf",
      xp: 20,
      check: (c, a) => c === "cat" && a[0] === "nginx.conf",
    },
    {
      title: "View Access Logs",
      why: "See who is visiting your site.",
      text: "Type <code>tail /var/log/nginx/access.log</code>",
      objective: "Tail nginx access.log",
      xp: 20,
      check: (c, a) => c === "tail" && a[0].includes("access.log"),
    },
    {
      title: "View Error Logs",
      why: "See what is crashing.",
      text: "Type <code>tail /var/log/nginx/error.log</code>",
      objective: "Tail nginx error.log",
      xp: 20,
      check: (c, a) => c === "tail" && a[0].includes("error.log"),
    },
    {
      title: "Grep 404 Errors",
      why: "Filter the logs for 'Not Found' errors.",
      text: 'Type <code>grep "404" /var/log/nginx/access.log</code>',
      objective: "Grep 404 from access.log",
      xp: 25,
      check: (c, a) =>
        c === "grep" &&
        a.includes("404") &&
        a.some((x) => x.includes("access.log")),
    },
    {
      title: "Restart Nginx",
      why: "Bounce the service.",
      text: "Type <code>systemctl restart nginx</code>",
      objective: "Type systemctl restart nginx",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "restart" && a[1] === "nginx",
    },

    // --- PHASE 2: REVERSE PROXIES & VIRTUAL HOSTS (16-30) ---
    {
      title: "Go to Sites Available",
      why: "This directory holds offline virtual host blueprints.",
      text: "Type <code>cd /etc/nginx/sites-available</code>",
      objective: "cd to sites-available",
      xp: 15,
      check: (c, a) => c === "cd" && a[0].includes("sites-available"),
    },
    {
      title: "Create VHost Config",
      why: "Create a new blueprint for a proxy.",
      text: "Type <code>touch myapp.conf</code>",
      objective: "Type touch myapp.conf",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "myapp.conf",
    },
    {
      title: "Write Proxy Config",
      why: "Simulate writing a proxy_pass directive.",
      text: 'Type <code>echo "proxy_pass http://127.0.0.1:8080;" > myapp.conf</code>',
      objective: "Write proxy_pass to myapp.conf",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("proxy_pass") && raw.includes("myapp.conf"),
    },
    {
      title: "Go to Sites Enabled",
      why: "This directory holds the ACTIVE sites.",
      text: "Type <code>cd /etc/nginx/sites-enabled</code>",
      objective: "cd to sites-enabled",
      xp: 15,
      check: (c, a) => c === "cd" && a[0].includes("sites-enabled"),
    },
    {
      title: "Create Symbolic Link",
      why: "Link the blueprint to the active directory so Nginx loads it.",
      text: "Type <code>ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/</code>",
      objective: "Use ln -s to symlink",
      xp: 45,
      check: (c, a) =>
        c === "ln" &&
        a.includes("-s") &&
        a.some((x) => x.includes("myapp.conf")),
    },
    {
      title: "Verify Symlink",
      why: "Check that the shortcut was created (it will be cyan colored!).",
      text: "Type <code>ls -la</code>",
      objective: "Type ls -la",
      xp: 15,
      check: (c, a) => c === "ls" && a.includes("-la"),
    },
    {
      title: "Test Nginx Syntax",
      why: "ALWAYS test your config before reloading. One typo will crash the server.",
      text: "Type <code>nginx -t</code>",
      objective: "Type nginx -t",
      xp: 35,
      check: (c, a) => c === "nginx" && a.includes("-t"),
    },
    {
      title: "Reload Nginx",
      why: "Apply the new configuration without dropping active user connections.",
      text: "Type <code>nginx -s reload</code>",
      objective: "Type nginx -s reload",
      xp: 30,
      check: (c, a) =>
        c === "nginx" && a.includes("-s") && a.includes("reload"),
    },
    {
      title: "Remove Default Site",
      why: "Delete the symlink for the default landing page.",
      text: "Type <code>rm default</code>",
      objective: "Type rm default",
      xp: 20,
      check: (c, a) => c === "rm" && a[0] === "default",
    },
    {
      title: "Retest Syntax",
      why: "Ensure the deletion didn't break anything.",
      text: "Type <code>nginx -t</code>",
      objective: "Type nginx -t",
      xp: 15,
      check: (c, a) => c === "nginx" && a.includes("-t"),
    },
    {
      title: "Hard Restart",
      why: "Perform a full cold boot of the service.",
      text: "Type <code>systemctl restart nginx</code>",
      objective: "Type systemctl restart nginx",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "restart" && a[1] === "nginx",
    },
    {
      title: "Check Listening Ports",
      why: "Ensure Nginx is bound to port 80.",
      text: "Type <code>ss -tulnp | grep nginx</code>",
      objective: "Grep nginx from ss",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("ss") && raw.includes("grep") && raw.includes("nginx"),
    },
    {
      title: "Find Web Worker PIDs",
      why: "Nginx spawns worker processes. Find them.",
      text: "Type <code>pgrep nginx</code>",
      objective: "Type pgrep nginx",
      xp: 20,
      check: (c, a) => c === "pgrep" && a[0] === "nginx",
    },
    {
      title: "Kill Nginx Manually",
      why: "Assassinate the master process.",
      text: "Type <code>killall nginx</code>",
      objective: "Type killall nginx",
      xp: 25,
      check: (c, a) => c === "killall" && a[0] === "nginx",
    },
    {
      title: "Check Dead Status",
      why: "Verify the web server is offline.",
      text: "Type <code>curl localhost</code>",
      objective: "Type curl localhost",
      xp: 15,
      check: (c, a) => c === "curl" && a[0] === "localhost",
    },

    // --- PHASE 3: APACHE WEBSERVER (31-45) ---
    {
      title: "Start Apache2",
      why: "Boot up the legacy heavyweight champion.",
      text: "Type <code>systemctl start apache2</code>",
      objective: "Type systemctl start apache2",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "start" && a[1] === "apache2",
    },
    {
      title: "Check Apache Status",
      why: "Verify it is running.",
      text: "Type <code>systemctl status apache2</code>",
      objective: "Type systemctl status apache2",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "status" && a[1] === "apache2",
    },
    {
      title: "Test Apache Syntax",
      why: "Apache uses a different command to test its configs.",
      text: "Type <code>apache2ctl configtest</code>",
      objective: "Type apache2ctl configtest",
      xp: 30,
      check: (c, a) => c === "apache2ctl" && a[0] === "configtest",
    },
    {
      title: "Enable Apache Module",
      why: "Enable the rewrite engine (used for WordPress/URL hiding).",
      text: "Type <code>a2enmod rewrite</code>",
      objective: "Type a2enmod rewrite",
      xp: 30,
      check: (c, a) => c === "a2enmod" && a[0] === "rewrite",
    },
    {
      title: "Enable SSL Module",
      why: "Enable secure connections for Apache.",
      text: "Type <code>a2enmod ssl</code>",
      objective: "Type a2enmod ssl",
      xp: 30,
      check: (c, a) => c === "a2enmod" && a[0] === "ssl",
    },
    {
      title: "Disable Default Site",
      why: "Turn off the default Apache landing page.",
      text: "Type <code>a2dissite 000-default.conf</code>",
      objective: "Type a2dissite 000-default.conf",
      xp: 30,
      check: (c, a) => c === "a2dissite" && a[0].includes("000-default"),
    },
    {
      title: "Enable Custom Site",
      why: "Turn on a simulated custom application.",
      text: "Type <code>a2ensite myapp.conf</code>",
      objective: "Type a2ensite myapp.conf",
      xp: 30,
      check: (c, a) => c === "a2ensite" && a[0] === "myapp.conf",
    },
    {
      title: "Reload Apache",
      why: "Apply the module and site changes smoothly.",
      text: "Type <code>systemctl reload apache2</code>",
      objective: "Type systemctl reload apache2",
      xp: 20,
      check: (c, a) =>
        c === "systemctl" && a[0] === "reload" && a[1] === "apache2",
    },
    {
      title: "View Apache Access",
      why: "Read the Apache traffic logs.",
      text: "Type <code>tail /var/log/apache2/access.log</code>",
      objective: "Tail apache access log",
      xp: 20,
      check: (c, a) => c === "tail" && a[0].includes("apache2/access.log"),
    },
    {
      title: "View Apache Errors",
      why: "Read the Apache crash logs.",
      text: "Type <code>tail /var/log/apache2/error.log</code>",
      objective: "Tail apache error log",
      xp: 20,
      check: (c, a) => c === "tail" && a[0].includes("apache2/error.log"),
    },
    {
      title: "Check Apache Worker User",
      why: "Find out what user account Apache runs as (usually www-data).",
      text: "Type <code>ps aux | grep apache2</code>",
      objective: "Grep apache2 from ps aux",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("ps") && raw.includes("grep") && raw.includes("apache2"),
    },
    {
      title: "Change Web Ownership",
      why: "Give the www-data user permission to read the web files.",
      text: "Type <code>chown -R www-data:www-data /var/www/html</code>",
      objective: "Use chown -R www-data:www-data",
      xp: 40,
      check: (c, a) =>
        c === "chown" && a.includes("-R") && a.includes("www-data:www-data"),
    },
    {
      title: "Change Web Permissions",
      why: "Lock down the files securely (755).",
      text: "Type <code>chmod -R 755 /var/www/html</code>",
      objective: "Use chmod -R 755",
      xp: 40,
      check: (c, a) => c === "chmod" && a.includes("-R") && a.includes("755"),
    },
    {
      title: "Stop Apache2",
      why: "Shut it down so we can switch back to Nginx.",
      text: "Type <code>systemctl stop apache2</code>",
      objective: "Type systemctl stop apache2",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "stop" && a[1] === "apache2",
    },
    {
      title: "Start Nginx Again",
      why: "Bring the modern proxy back online.",
      text: "Type <code>systemctl start nginx</code>",
      objective: "Type systemctl start nginx",
      xp: 15,
      check: (c, a) =>
        c === "systemctl" && a[0] === "start" && a[1] === "nginx",
    },

    // --- PHASE 4: SSL/TLS & CERTBOT (46-55) ---
    {
      title: "Install Certbot",
      why: "Install the automated Let's Encrypt SSL tool.",
      text: "Type <code>apt install certbot python3-certbot-nginx -y</code>",
      objective: "Install certbot via apt",
      xp: 30,
      check: (c, a) =>
        c === "apt" && a.includes("install") && a.includes("certbot"),
    },
    {
      title: "Run Certbot",
      why: "Automatically request an SSL certificate and configure Nginx.",
      text: "Type <code>certbot --nginx -d myapp.com</code>",
      objective: "Use certbot --nginx",
      xp: 50,
      check: (c, a) =>
        c === "certbot" && a.includes("--nginx") && a.includes("-d"),
    },
    {
      title: "Verify HTTPS Port",
      why: "Check if Nginx is now listening on secure port 443.",
      text: "Type <code>ss -tulnp | grep 443</code>",
      objective: "Grep 443 from ss",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("ss") && raw.includes("grep") && raw.includes("443"),
    },
    {
      title: "Test HTTPS Curl",
      why: "Attempt to connect securely (-k ignores local self-signed warnings).",
      text: "Type <code>curl -kI https://localhost</code>",
      objective: "Use curl -kI https",
      xp: 35,
      check: (c, a) =>
        c === "curl" && a.includes("-kI") && a.some((x) => x.includes("https")),
    },
    {
      title: "Check Cert Expiry",
      why: "See when your certificate expires.",
      text: "Type <code>certbot certificates</code>",
      objective: "Type certbot certificates",
      xp: 30,
      check: (c, a) => c === "certbot" && a[0] === "certificates",
    },
    {
      title: "Dry Run Renewal",
      why: "Test the automated renewal process without making real changes.",
      text: "Type <code>certbot renew --dry-run</code>",
      objective: "Type certbot renew --dry-run",
      xp: 35,
      check: (c, a) =>
        c === "certbot" && a.includes("renew") && a.includes("--dry-run"),
    },
    {
      title: "Check SSL Config",
      why: "Read the Nginx file to see the SSL lines Certbot injected.",
      text: "Type <code>cat /etc/nginx/sites-enabled/myapp.conf</code>",
      objective: "Cat the symlinked conf",
      xp: 20,
      check: (c, a) => c === "cat" && a[0].includes("myapp.conf"),
    },
    {
      title: "Test HTTPS Redirect",
      why: "Certbot adds a rule to redirect port 80 to 443. Test it.",
      text: "Type <code>curl -I http://localhost</code>",
      objective: "Curl http to see redirect",
      xp: 25,
      check: (c, a) =>
        c === "curl" &&
        a.includes("-I") &&
        a.some((x) => x.includes("http://localhost")),
    },
    {
      title: "Open Firewall Port 80",
      why: "Ensure the world can reach your HTTP redirect.",
      text: "Type <code>iptables -A INPUT -p tcp --dport 80 -j ACCEPT</code>",
      objective: "Allow tcp port 80 in iptables",
      xp: 35,
      check: (c, a) =>
        c === "iptables" &&
        a.includes("--dport") &&
        a.includes("80") &&
        a.includes("ACCEPT"),
    },
    {
      title: "Open Firewall Port 443",
      why: "Ensure the world can reach your HTTPS server.",
      text: "Type <code>iptables -A INPUT -p tcp --dport 443 -j ACCEPT</code>",
      objective: "Allow tcp port 443 in iptables",
      xp: 35,
      check: (c, a) =>
        c === "iptables" &&
        a.includes("--dport") &&
        a.includes("443") &&
        a.includes("ACCEPT"),
    },

    // --- PHASE 5: BENCHMARKING & MAINTENANCE (56-65) ---
    {
      title: "Install Apache Utils",
      why: "Install benchmarking tools (ab).",
      text: "Type <code>apt install apache2-utils -y</code>",
      objective: "Install apache2-utils",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("apache2-utils"),
    },
    {
      title: "Run Benchmark",
      why: "Send 100 requests (-n) with a concurrency of 10 (-c) to test server limits.",
      text: "Type <code>ab -n 100 -c 10 http://localhost/</code>",
      objective: "Run ab benchmark",
      xp: 50,
      check: (c, a) =>
        c === "ab" && a.includes("-n") && a.includes("100") && a.includes("-c"),
    },
    {
      title: "Read Load Log",
      why: "Check how the access log handled the bombardment.",
      text: "Type <code>tail -n 15 /var/log/nginx/access.log</code>",
      objective: "Tail access log",
      xp: 20,
      check: (c, a) =>
        c === "tail" &&
        a.includes("-n") &&
        a.some((x) => x.includes("access.log")),
    },
    {
      title: "IP Connection Count",
      why: "Use awk to count which IP addresses are making the most requests.",
      text: "Type <code>awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c</code>",
      objective: "Awk, sort, and uniq the access log",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("awk") &&
        raw.includes("access.log") &&
        raw.includes("uniq -c"),
    },
    {
      title: "Watch Live Traffic",
      why: "Watch requests hit the server dynamically.",
      text: "Type <code>tail -f /var/log/nginx/access.log</code>",
      objective: "Live tail the access log",
      xp: 25,
      check: (c, a) =>
        c === "tail" &&
        a.includes("-f") &&
        a.some((x) => x.includes("access.log")),
    },
    {
      title: "Find Largest Web Files",
      why: "Check if you have massive assets slowing down the site.",
      text: "Type <code>find /var/www/html -type f -size +5M</code>",
      objective: "Find files larger than 5M",
      xp: 35,
      check: (c, a) =>
        c === "find" && a.includes("/var/www/html") && a.includes("-size"),
    },
    {
      title: "Create Maintenance Page",
      why: "Create a 503 fallback file.",
      text: 'Type <code>echo "Under Maintenance" > /var/www/html/503.html</code>',
      objective: "Create 503.html",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes(">") && raw.includes("503.html"),
    },
    {
      title: "Check SSL Protocols",
      why: "Verify secure protocols are used (TLSv1.2, TLSv1.3).",
      text: 'Type <code>grep "ssl_protocols" /etc/nginx/nginx.conf</code>',
      objective: "Grep ssl_protocols",
      xp: 30,
      check: (c, a) => c === "grep" && a.includes("ssl_protocols"),
    },
    {
      title: "Flush Old Logs",
      why: "Clear massive logs to save disk space.",
      text: 'Type <code>echo "" > /var/log/nginx/access.log</code>',
      objective: "Truncate access.log",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes(">") && raw.includes("access.log"),
    },
    {
      title: "Web Master",
      why: "Module 16 Complete. You orchestrate the net.",
      text: 'Type <code>echo "Traffic Routed Successfully"</code>',
      objective: "Type echo",
      xp: 50,
      check: (c, a) => c === "echo" && a.some((x) => x.includes("Traffic")),
    },
  ],
};
