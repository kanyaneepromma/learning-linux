// command.js
// This file contains the logic for every simulated terminal command.

const commands = {
  help: {
    desc: "Show commands.",
    run: () =>
      Object.keys(commands)
        .sort()
        .map((c) => `<span class="text-indigo-400 font-bold">${c.padEnd(10)}</span> - ${commands[c].desc}`)
        .join("<br>"),
  },
  pwd: { desc: "Print working directory.", run: () => currentPath },
  date: { desc: "Print date.", run: () => new Date().toString() },
  uptime: { desc: "System uptime.", run: () => " 19:35:12 up 14 days,  3:12,  1 user,  load average: 0.04, 0.05, 0.01" },
  whoami: { desc: "Current user.", run: () => "sysadmin" },
  ls: {
    desc: "List contents. Supports -a, -l.",
    run: (args) => {
      let sAll = args.includes("-a") || args.includes("-la") || args.includes("-al");
      let sLong = args.includes("-l") || args.includes("-la") || args.includes("-al");
      let target = args.filter((a) => !a.startsWith("-"))[0] || "";
      let res = resolvePath(target);
      if (!res) return `<span class="term-err">ls: cannot access '${target}'</span>`;
      if (res.node.type !== "dir") return target;
      let out = [];
      if (sAll) {
        out.push(sLong ? `drwxr-xr-x 2 ${res.node.owner} 4096 .` : `<span class="term-dir">.</span>`);
        out.push(sLong ? `drwxr-xr-x 3 root 4096 ..` : `<span class="term-dir">..</span>`);
      }
      for (let key in res.node.contents) {
        let n = res.node.contents[key];
        if (sLong) {
          out.push(`${n.type === "dir" ? "d" : "-"}rwxr-xr-x 1 ${n.owner || "root"} ${n.type === "dir" ? "4096" : "1024"} ${key}${n.type === "dir" ? "/" : ""}`);
        } else {
          out.push(n.type === "dir" ? `<span class="term-dir">${key}/</span>` : `<span>${key}</span>`);
        }
      }
      return sLong ? out.join("<br>") : out.join("   ");
    },
  },
  cd: {
    desc: "Change dir. Use ~ for home, .. for parent.",
    run: (args) => {
      let res = resolvePath(args[0] || "~");
      if (!res || res.node.type !== "dir") return `<span class="term-err">cd: path not found</span>`;
      currentPath = res.path;
      document.getElementById("prompt-path").innerText = formatPromptPath();
      return "";
    },
  },
  mkdir: {
    desc: "Make dir. Supports multiple.",
    run: (args) => {
      if (args.length === 0) return "mkdir: missing operand";
      args.forEach((t) => {
        let parts = t.split("/");
        let n = parts.pop();
        let pRes = resolvePath(parts.join("/") || ".");
        if (pRes && pRes.node.type === "dir") pRes.node.contents[n] = { type: "dir", owner: "sysadmin", contents: {} };
      });
      return "";
    },
  },
  touch: {
    desc: "Create file. Supports multiple.",
    run: (args) => {
      args.forEach((t) => {
        let parts = t.split("/");
        let n = parts.pop();
        let pRes = resolvePath(parts.join("/") || ".");
        if (pRes && pRes.node.type === "dir") pRes.node.contents[n] = { type: "file", owner: "sysadmin", content: "" };
      });
      return "";
    },
  },
  rm: {
    desc: "Remove file. Use -rf for dir.",
    run: (args) => {
      let rec = args.includes("-r") || args.includes("-rf");
      let targets = args.filter((a) => !a.startsWith("-"));
      targets.forEach((t) => {
        let res = resolvePath(t);
        if (res && res.parentNode) {
          if (res.node.type === "dir" && !rec) return;
          delete res.parentNode.contents[res.name];
        }
      });
      return "";
    },
  },
  rmdir: {
    desc: "Remove empty dir.",
    run: (args) => {
      let res = resolvePath(args[0]);
      if (res && res.node.type === "dir" && Object.keys(res.node.contents).length === 0) delete res.parentNode.contents[res.name];
      return "";
    },
  },
  cp: {
    desc: "Copy file.",
    run: (args) => {
      let src = resolvePath(args[0]), dest = resolvePath(args[1]);
      if (src && dest && dest.node.type === "dir") {
        dest.node.contents[src.name] = JSON.parse(JSON.stringify(src.node));
      } else if (src) {
        let destParts = args[1].split("/"); let n = destParts.pop(); let pRes = resolvePath(destParts.join("/") || ".");
        if (pRes) pRes.node.contents[n] = JSON.parse(JSON.stringify(src.node));
      }
      return "";
    },
  },
  mv: {
    desc: "Move/Rename.",
    run: (args) => {
      let src = resolvePath(args[0]), dest = resolvePath(args[1]);
      if (src && dest && dest.node.type === "dir") {
        dest.node.contents[src.name] = src.node; delete src.parentNode.contents[src.name];
      } else if (src) {
        let destParts = args[1].split("/"); let n = destParts.pop(); let pRes = resolvePath(destParts.join("/") || ".");
        if (pRes) { pRes.node.contents[n] = src.node; delete src.parentNode.contents[src.name]; }
      }
      return "";
    },
  },
  echo: {
    desc: "Print or write. Supports > and >>.",
    run: (args) => {
      let apIdx = args.indexOf(">>"), wrIdx = args.indexOf(">");
      if (apIdx !== -1) {
        let text = args.slice(0, apIdx).join(" ").replace(/^['"]|['"]$/g, "");
        let f = resolvePath(args[apIdx + 1]);
        if (f && f.node.type === "file") f.node.content += "\n" + text;
        else {
          let p = args[apIdx + 1].split("/"); let n = p.pop(); let r = resolvePath(p.join("/") || ".");
          if (r) r.node.contents[n] = { type: "file", content: text };
        }
        return "";
      } else if (wrIdx !== -1) {
        let text = args.slice(0, wrIdx).join(" ").replace(/^['"]|['"]$/g, "");
        let p = args[wrIdx + 1].split("/"); let n = p.pop(); let r = resolvePath(p.join("/") || ".");
        if (r) r.node.contents[n] = { type: "file", content: text };
        return "";
      }
      return args.join(" ").replace(/^['"]|['"]$/g, "");
    },
  },
  cat: {
    desc: "Read file.",
    run: (args) => {
      let r = resolvePath(args[0]);
      return r && r.node.type === "file" ? r.node.content.replace(/\n/g, "<br>") : "Error reading file";
    },
  },
  grep: {
    desc: "Search text.",
    run: (args) => {
      let pat = args[0].replace(/['"]/g, ""), r = resolvePath(args[1]);
      return r && r.node.type === "file" ? r.node.content.split("\n").filter((x) => x.includes(pat)).join("<br>") : "";
    },
  },
  systemctl: {
    desc: "Service manager.",
    run: (args) => {
      if (args[0] === "start") runningServices[args[1]] = true;
      if (args[0] === "status") return `Active: ${runningServices[args[1]] ? "running" : "dead"}`;
      return "";
    },
  },
  clear: { desc: "Clear screen.", run: () => "CLEAR_SIGNAL" },
  wc: {
    desc: "Count words.",
    run: (args) => {
      let r = resolvePath(args[0]);
      if (r && r.node.type === "file") {
        let l = r.node.content.split("\n").length, w = r.node.content.split(/\s+/).length;
        return `${l} ${w} ${r.node.content.length} ${args[0]}`;
      }
      return "";
    },
  },
  head: {
    desc: "Read top.",
    run: (args) => {
      let r = resolvePath(args[0]);
      return r && r.node.type === "file" ? r.node.content.split("\n").slice(0, 5).join("<br>") : "";
    },
  },
  df: { desc: "Disk space.", run: () => "/dev/sda1  40G  8G  32G  20% /" },
  free: { desc: "Memory info.", run: () => "Mem: 16000 4000 12000" },
  ping: { desc: "Network test.", run: (args) => `PING ${args[0]} 64 bytes... time=12ms` },
  netstat: { desc: "Network connections.", run: () => "tcp 0 0 0.0.0.0:80 LISTEN" },
  nmap: { desc: "Port scanner.", run: () => "PORT 80/tcp OPEN http" },
  strings: { desc: "Read binary strings.", run: () => "http://evil.com/drop" },
  curl: {
    desc: "Transfer data from a URL.",
    run: (args) => {
      if (args.includes("-O")) return "Downloaded payload successfully.";
      if (args.includes("-F")) return "Data exfiltrated to Command & Control server.";
      if (args.includes("-I")) return "HTTP/1.1 200 OK\nServer: nginx/1.24.0 (Ubuntu)\nConnection: keep-alive";
      return "<html>Target Acquired. Vulnerable parameter exposed.</html>";
    },
  },
  sudo: {
    desc: "Execute a command as another user.",
    run: (args) => {
      if (args.includes("-l")) return "User sysadmin may run the following commands on localhost:\n    (ALL : ALL) NOPASSWD: ALL";
      return "root access granted.";
    },
  },
  chmod: { desc: "Change file mode bits (Permissions).", run: () => "" },
  tar: { desc: "An archiving utility.", run: () => "Archiving files...\nloot.tar.gz created successfully." },
  find: { desc: "Search for files in a directory hierarchy.", run: () => "/usr/bin/sudo\n/usr/bin/passwd\n/var/backups/shadow.bak\n/home/admin/.ssh/id_rsa" },
  history: { desc: "Command History.", run: () => "History cleared." },
  id: { desc: "Print user and group IDs.", run: () => "uid=0(root) gid=0(root) groups=0(root)" },
  crontab: { desc: "Maintain crontab files for individual users.", run: (args) => args.includes("-l") ? "* * * * * /tmp/shell.sh" : "crontab updated successfully." },
  w: { desc: "Show who is logged on and what they are doing.", run: () => "USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT\nsysadmin pts/0    192.168.1.100    10:00    0.00s  0.05s  0.00s w\nroot     pts/1    10.0.0.99        10:05    1:23m  0.10s  0.01s -bash" },
  who: { desc: "Show who is logged on.", run: () => "sysadmin pts/0        2026-10-21 10:00 (192.168.1.100)\nroot     pts/1        2026-10-21 10:05 (10.0.0.99)" },
  last: { desc: "Show listing of last logged in users.", run: () => "root     pts/1        10.0.0.99        Wed Oct 21 10:05   still logged in\nsysadmin pts/0        192.168.1.100    Wed Oct 21 10:00   still logged in\nreboot   system boot  0.0.0.0          Tue Oct 20 08:00" },
  tail: {
    desc: "Output the last part of files.",
    run: (args) => {
      let path = args[args.length - 1];
      if (path.includes("auth.log")) return "Oct 21 10:02:14 server sshd[1200]: Failed password for root from 10.0.0.99 port 54321 ssh2\nOct 21 10:05:01 server sshd[1205]: Accepted password for root from 10.0.0.99 port 54322 ssh2";
      if (path.includes("syslog")) return "Oct 21 08:00:01 server kernel: [    0.000000] Booting kernel\nOct 21 10:06:22 server kernel: [  7582.12] exploit.bin[1337]: segfault at 0 ip 00007f sp 00007f error 4";
      return "tail: reading data...";
    },
  },
  ps: { desc: "Report a snapshot of current processes.", run: () => "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  10200  4000 ?        Ss   Oct20   0:02 /sbin/init\nroot      1337 99.9  1.5  50000 15000 ?        R    10:06   5:42 /tmp/shell.sh\nsysadmin  1400  0.0  0.2   8000  2000 pts/0    R+   10:15   0:00 ps aux" },
  kill: { desc: "Send a signal to a process.", run: () => "Process terminated." },
  chown: { desc: "Change file owner and group.", run: () => "Ownership modified successfully." },
  "iptables-save": { desc: "Dump iptables rules to stdout.", run: () => "# Generated by iptables-save\n*filter\n:INPUT ACCEPT [0:0]\n:FORWARD ACCEPT [0:0]\n:OUTPUT ACCEPT [0:0]\n-A INPUT -s 10.0.0.99/32 -j DROP\nCOMMIT" },
  logger: {
    desc: "Enter messages into the system log.",
    run: (args) => {
      let msg = args.join(" ").replace(/['"]/g, ""); let syslog = resolvePath("/var/log/syslog");
      if (syslog && syslog.node.type === "file") syslog.node.content += `\nOct 21 11:30:00 server logger: ${msg}`;
      return "";
    },
  },
  journalctl: {
    desc: "Query the systemd journal.",
    run: (args) => {
      if (args.includes("--disk-usage")) return "Archived and active journals take up 144.0M in the file system.";
      if (args.includes("-p") && args.includes("err")) return "-- Logs begin at Tue 2026-10-20 08:00:00 UTC --\nOct 21 10:06:22 server kernel: [ 7582.12] exploit.bin[1337]: segfault at 0 ip 00007f error 4";
      if (args.includes("-u") && args.includes("ssh")) return "Oct 21 10:00:00 server sshd[1200]: Server listening on 0.0.0.0 port 22.";
      return "-- Logs begin at Tue 2026-10-20 08:00:00 UTC --\nOct 21 11:30:00 server logger: Purple Team Test\nOct 21 11:35:00 server sudo: sysadmin : TTY=pts/0 ; COMMAND=/usr/bin/curl -O http://evil.com/eicar.com";
    },
  },
  auditctl: {
    desc: "Utility to control the kernel's audit system.",
    run: (args) => {
      if (args.includes("-s")) return "enabled 1\nfailure 1\npid 643\nrate_limit 0\nbacklog_limit 8192\nlost 0\nbacklog 0";
      if (args.includes("-l")) return "-w /etc/shadow -p r -k shadow_read\n-w /usr/bin/ping -p x -k ping_exec";
      if (args.includes("-D")) return "No rules";
      return "";
    },
  },
  ausearch: {
    desc: "A tool to query audit daemon logs.",
    run: (args) => {
      if (args.includes("-k") && args.includes("shadow_read")) return 'time->Wed Oct 21 11:40:00 2026\ntype=SYSCALL msg=audit(1697888400.123:45): arch=c000003e syscall=257 success=yes exit=3 a0=ffffff9c a1=7ffd3a a2=0 a3=0 items=1 ppid=1200 pid=1337 auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts0 ses=3 comm="cat" exe="/usr/bin/cat" key="shadow_read"';
      return 'time->Wed Oct 21 11:40:00 2026\ntype=CONFIG_CHANGE msg=audit(1697888400.123:46): auid=1000 ses=3 op=add_rule key="ping_exec" list=4 res=1';
    },
  },
  aureport: { desc: "Produce summary reports of audit daemon logs.", run: () => "Executable Summary Report\n=================================\ntotal  file\n=================================\n45  /usr/bin/sudo\n12  /usr/bin/cat\n3   /tmp/exploit.bin" },
  ss: {
    desc: "Utility to investigate sockets (Modern netstat).",
    run: (args) => {
      if (args.includes("-s")) return "Total: 154\nTCP:   12 (estab 2, closed 4, orphaned 0, timewait 0)\nUDP:   5";
      return 'State    Recv-Q   Send-Q      Local Address:Port       Peer Address:Port   Process\nLISTEN   0        128               0.0.0.0:22              0.0.0.0:* users:(("sshd",pid=1200,fd=3))\nLISTEN   0        128               0.0.0.0:80              0.0.0.0:* users:(("nginx",pid=1201,fd=4))';
    },
  },
  lsof: {
    desc: "List open files.",
    run: (args) => {
      if (args.includes("+L1")) return "COMMAND     PID   USER   FD   TYPE DEVICE SIZE/OFF NLINK      NODE NAME\nmalware.b  1337   root  txt    REG    8,1     5000     0 123456789 /tmp/malware.bin (deleted)";
      if (args.includes("-iTCP")) return "COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd     1200 root    3u  IPv4  12345      0t0  TCP *:ssh (LISTEN)\nnginx    1201 root    4u  IPv4  12346      0t0  TCP *:http (LISTEN)";
      return "COMMAND     PID   USER   FD      TYPE             DEVICE SIZE/OFF       NODE NAME\nsystemd       1   root  cwd       DIR                8,1     4096          2 /\nbash       1400 sysadmin  cwd     DIR                8,1     4096      10000 /home/sysadmin";
    },
  },
  tcpdump: {
    desc: "Dump traffic on a network.",
    run: (args) => {
      if (args.includes("-r")) return "reading from file capture.pcap, link-type EN10MB (Ethernet)\n11:45:01.123456 IP 10.0.0.100.54321 > 10.0.0.99.80: Flags [S], seq 123456789, win 64240, options [mss 1460,sackOK,TS val 123456 ecr 0,nop,wscale 7], length 0";
      return "tcpdump: verbose output suppressed, use -v or -vv for full protocol decode\nlistening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes\n11:45:01.123456 IP 10.0.0.100.54321 > 10.0.0.99.80: Flags [S]\n11:45:01.124567 IP 10.0.0.99.80 > 10.0.0.100.54321: Flags [S.]\n11:45:01.124678 IP 10.0.0.100.54321 > 10.0.0.99.80: Flags [.]\n3 packets captured\n3 packets received by filter";
    },
  },
  chkrootkit: {
    desc: "Check for signs of a rootkit.",
    run: (args) => {
      if (args.includes("-q")) return "INFECTED: Possible LKM Trojan installed";
      return "ROOTDIR is `/'\nChecking `amd'... not found\nChecking `basename'... not infected\nChecking `biff'... not found\nChecking `chfn'... not infected\nChecking `chsh'... not infected\nChecking `cron'... not infected\nChecking `crontab'... not infected\nChecking `date'... not infected\nSearching for LKM Trojan... INFECTED";
    },
  },
  "aa-status": { desc: "Display current AppArmor policy info.", run: () => "apparmor module is loaded.\n14 profiles are loaded.\n12 profiles are in enforce mode." },
  apparmor_status: { desc: "Display current AppArmor policy info.", run: () => "apparmor module is loaded.\n14 profiles are loaded.\n12 profiles are in enforce mode." },
  lastb: { desc: "Show a listing of last failed login attempts.", run: () => "root     ssh:notty    10.0.0.99        Wed Oct 21 10:02 - 10:02  (00:00)\nbtmp begins Tue Oct 20 08:00:00 2026" },
  searchsploit: {
    desc: "Search Exploit-DB for known vulnerabilities.",
    run: (args) => {
      if (args.includes("-p") && args.includes("50383")) return "  Exploit: Apache HTTP Server 2.4.49 - Path Traversal / RCE\n     Path: /usr/share/exploits/50383.py";
      return "-------------------------------------------------- -------------------------\n Exploit Title                                    |  Path\n-------------------------------------------------- -------------------------\nApache HTTP Server 2.4.49 - Path Traversal / RCE  | exploits/linux/remote/50383.py";
    },
  },
  msfconsole: { desc: "Launch the Metasploit Framework.", run: () => " \n       =[ metasploit v6.3.5-dev                           ]\n+ -- --=[ 2294 exploits - 1201 auxiliary - 409 post       ]\n+ -- --=[ 968 payloads - 46 encoders - 11 nops            ]\n\nmsf6 > _" },
  search: {
    desc: "Search Metasploit modules.",
    run: (args) => {
      if (args[0] && args[0].includes("cve:2021")) return "Matching Modules\n================\n\n   #  Name                                         Disclosure Date  Rank       Check  Description\n   -  ----                                         ---------------  ----       -----  -----------\n   0  exploit/multi/http/apache_normalize_path_rce  2021-10-05       excellent  Yes    Apache 2.4.49 Path Traversal RCE";
      return "Search string required.";
    },
  },
  exit: { desc: "Exit current shell or framework.", run: () => "Session closed. Exiting..." },
  openssl: {
    desc: "Cryptography and SSL/TLS Toolkit.",
    run: (args) => {
      if (args.includes("genrsa")) return "Generating RSA private key, 4096 bit long modulus...\n........................++\ne is 65537 (0x010001)";
      if (args.includes("-dates")) return "notBefore=Oct 20 00:00:00 2024 GMT\nnotAfter=Oct 20 23:59:59 2026 GMT";
      if (args.includes("x509")) return "Certificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            1a:2b:3c:4d:5e:6f\n        Issuer: C = US, O = Enterprise Security Authority, CN = Secure Server";
      return "OpenSSL> ";
    },
  },
  lastlog: { desc: "Report the most recent login of all users.", run: () => "Username         Port     From             Latest\nroot             pts/1    10.0.0.99        Wed Oct 21 10:05:00 +0000 2026\nsysadmin         pts/0    192.168.1.100    Wed Oct 21 10:00:00 +0000 2026" },
  "./50383.py": { desc: "Execute custom Python exploit payload.", run: () => "[+] Targeting 10.0.0.50...\n[+] Sending payload via Path Traversal...\n[+] Success! Remote Code Execution achieved.\nuid=0(root) gid=0(root) groups=0(root)" },
  "./shell.elf": { desc: "Compiled Reverse Shell ELF Binary.", run: () => "Executing ELF binary...\n[+] Connection established to 10.0.0.99\n[+] Root shell spawned.\nuid=0(root) gid=0(root) groups=0(root)" },
  sha256sum: {
    desc: "Compute and check SHA256 message digest.",
    run: (args) => {
      let r = resolvePath(args[0]);
      if (r && r.node.type === "file") return "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92  " + args[0];
      return "sha256sum: No such file or directory";
    }
  },
  iptables: {
    desc: "Administration tool for IPv4 packet filtering and NAT.",
    run: (args) => {
      if (args.includes("-L")) return "Chain INPUT (policy ACCEPT)\ntarget     prot opt source               destination\nDROP       all  --  10.0.0.99            anywhere\n\nChain FORWARD (policy ACCEPT)\n\nChain OUTPUT (policy ACCEPT)";
      return "iptables: Rule successfully appended.";
    }
  },
  useradd: { desc: "Create a new user or update default new user information.", run: () => "" },
  passwd: { desc: "Update user's authentication tokens.", run: () => "Changing password for user.\nNew password: \nRetype new password: \npasswd: all authentication tokens updated successfully." },
  groupadd: { desc: "Create a new group.", run: () => "" },
  usermod: { desc: "Modify a user account.", run: () => "" },
  userdel: { desc: "Delete a user account and related files.", run: () => "" },
  groupdel: { desc: "Delete a group.", run: () => "" },
  chgrp: { desc: "Change group ownership.", run: () => "" },
  apt: {
    desc: "Advanced Package Tool.",
    run: (args) => {
      if (args.includes("update")) return "Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nGet:2 http://security.ubuntu.com/ubuntu focal-security InRelease [114 kB]\nFetched 114 kB in 1s (112 kB/s)\nReading package lists... Done";
      if (args.includes("install")) return "Reading package lists... Done\nBuilding dependency tree       \nReading state information... Done\nThe following NEW packages will be installed:\n  htop\n0 upgraded, 1 newly installed, 0 to remove.\nSetting up htop (2.2.0-2build1) ...\nProcessing triggers for man-db (2.9.1-1) ...";
      if (args.includes("search")) return "Sorting...\nFull Text Search...\nhtop/focal,now 2.2.0-2build1 amd64 [installed]\n  interactive processes viewer";
      if (args.includes("show")) return "Package: htop\nVersion: 2.2.0-2build1\nMaintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>\nDescription: interactive processes viewer";
      if (args.includes("remove") || args.includes("purge") || args.includes("autoremove")) return "Reading package lists... Done\nBuilding dependency tree\nRemoving packages... Done";
      if (args.includes("list")) return "Listing...\nhtop/focal,now 2.2.0-2build1 amd64 [installed]\ncurl/focal,now 7.68.0-1ubuntu2.7 amd64 [installed]";
      return "apt: Command line package manager.";
    },
  },
  wget: { desc: "The non-interactive network downloader.", run: () => "Resolving repo.com (repo.com)... 192.168.1.50\nConnecting to repo.com|192.168.1.50|:80... connected.\nHTTP request sent, awaiting response... 200 OK\nSaving to: 'tool.deb'\n\ntool.deb       100%[===================>]   2.50M  --.-KB/s    in 0.1s" },
  dpkg: {
    desc: "Package manager for Debian.",
    run: (args) => {
      if (args.includes("-i")) return "Selecting previously unselected package tool.\n(Reading database ... 102345 files and directories currently installed.)\nPreparing to unpack tool.deb ...\nUnpacking tool (1.0) ...\nSetting up tool (1.0) ...";
      if (args.includes("-L")) return "/usr\n/usr/bin\n/usr/bin/tool\n/etc/tool.conf";
      if (args.includes("-S")) return "tool: /usr/bin/tool";
      return "dpkg: package managed.";
    },
  },
  top: { desc: "Display Linux processes.", run: () => "top - 12:45:00 up 14 days,  3:12,  1 user,  load average: 0.05, 0.03, 0.01\nTasks: 110 total,   1 running, 109 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  1.5 us,  0.5 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :  16000.0 total,   4000.0 free,  12000.0 used,   1000.0 buff/cache" },
  htop: { desc: "Interactive process viewer.", run: () => "1  [||||||||||||                      25.0%]\n2  [|||                                5.0%]\nMem[|||||||||||||||||||||||||   1.23G/16.0G]\nSwp[                                 0K/0K]\n\n  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command\n 1337 root       20   0 50000 15000  4000 S  2.0  0.1  0:05.12 /tmp/shell.sh" },
  sleep: { desc: "Delay for a specified amount of time.", run: () => "[1] 1400" },
  jobs: { desc: "List active jobs.", run: () => "[1]+  Running                 sleep 300 &" },
  fg: { desc: "Move job to the foreground.", run: () => "sleep 300" },
  bg: { desc: "Move a job to the background.", run: () => "[1]+ sleep 300 &" },
  nohup: { desc: "Run a command immune to hangups.", run: () => "nohup: ignoring input and appending output to 'nohup.out'" },
  pgrep: { desc: "Look up processes based on name.", run: () => "1400" },
  killall: { desc: "Kill processes by name.", run: () => "" },
  pstree: { desc: "Display a tree of processes.", run: () => "systemd─┬─sshd───sshd───bash\n        ├─nginx───4*[nginx]\n        └─cron" },
  watch: { desc: "Execute a program periodically.", run: () => "Every 2.0s: df -h\n\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        40G  8.0G   32G  20% /" },
  gzip: { desc: "Compress or expand files.", run: () => "" },
  gunzip: { desc: "Compress or expand files.", run: () => "" },
  zcat: { desc: "Concatenate compressed files and print.", run: () => "Learn Linux\nMaster Terminal\nBecome Root" },
  scp: { desc: "Secure copy (remote file copy program).", run: () => "notes.txt                                     100%   34     0.0KB/s   00:00" },
  unzip: { desc: "List, test and extract compressed files in a ZIP archive.", run: () => "Archive:  kernel.zip\n  inflating: kernel.bin\n  inflating: config.txt" },
  lsblk: { desc: "List block devices.", run: () => "NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda      8:0    0   40G  0 disk \n└─sda1   8:1    0   40G  0 part /\nsdb      8:16   0   16G  0 disk \n└─sdb1   8:17   0   16G  0 part " },
  fdisk: { desc: "Manipulate disk partition table.", run: () => "Disk /dev/sda: 40 GiB, 42949672960 bytes, 83886080 sectors\nUnits: sectors of 1 * 512 = 512 bytes\nDevice     Boot Start      End  Sectors Size Id Type\n/dev/sda1  * 2048 83886046 83883999  40G 83 Linux" },
  mount: { desc: "Mount a filesystem.", run: () => "" },
  umount: { desc: "Unmount file systems.", run: () => "" },
  lscpu: { desc: "Display information about the CPU architecture.", run: () => "Architecture:                    x86_64\nCPU op-mode(s):                  32-bit, 64-bit\nByte Order:                      Little Endian\nCPU(s):                          4" },
  lsusb: { desc: "List USB devices.", run: () => "Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub\nBus 001 Device 002: ID 046d:c52b Logitech, Inc. Unifying Receiver" },
  lshw: { desc: "Extract detailed information on the hardware configuration.", run: () => "H/W path         Device      Class          Description\n=======================================================\n                             system         Computer\n/0                           bus            Motherboard\n/0/0                         memory         16GiB System memory\n/0/1                         processor      Intel(R) Core(TM) i7 CPU" },
  which: { desc: "Locate a command.", run: () => "/usr/bin/htop" },
  hydra: {
    desc: "A very fast network logon cracker.",
    run: (args) => {
      if (args.includes("-V")) return "Attempt 1: admin:password\nAttempt 2: admin:123456\n[22][ssh] host: 10.0.0.50   login: admin   password: password123\n1 of 1 target successfully completed, 1 valid password found";
      return "Hydra v9.1 (c) 2020 by van Hauser/THC\n[DATA] max 16 tasks per server, overall 16 tasks\n[22][ssh] host: 10.0.0.50   login: admin   password: password123\n1 of 1 target successfully completed, 1 valid password found";
    },
  },
  gobuster: {
    desc: "Directory/File, DNS and VHost busting tool written in Go.",
    run: (args) => {
      if (args.includes("dns")) return "Found: sub.evil.com\nFound: dev.evil.com\nFound: test.evil.com";
      if (args.includes("vhost")) return "Found: admin.evil.com\nFound: staging.evil.com";
      return "===============================================================\nGobuster v3.1.0\n===============================================================\n/images               (Status: 301)\n/admin                (Status: 301)\n/config.php           (Status: 200)\n/robots.txt           (Status: 200)\n===============================================================";
    },
  },
  sqlmap: {
    desc: "Automatic SQL injection and database takeover tool.",
    run: (args) => {
      if (args.includes("--dump") || args.includes("--dump-all")) return "Database: admin_db\nTable: users\n[2 entries]\n+----+--------+------------------+\n| id | user   | password         |\n+----+--------+------------------+\n| 1  | admin  | p@ssword!        |\n| 2  | root   | super_secret_123 |\n+----+--------+------------------+\n[info] table 'admin_db.users' dumped to CSV file";
      if (args.includes("--dbs")) return "available databases [3]:\n[*] admin_db\n[*] information_schema\n[*] public_db";
      if (args.includes("--tables")) return "Database: admin_db\n[2 tables]\n+----------------+\n| users          |\n| configurations |\n+----------------+";
      if (args.includes("--os-shell")) return "os-shell> whoami\nroot\nos-shell> echo 'Pwned'\nPwned";
      return "    sqlmap/1.5.8 - automatic SQL injection and database takeover tool\n    http://sqlmap.org\n\n[INFO] testing connection to the target URL\n[INFO] GET parameter 'id' is 'MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (FLOOR)' injectable";
    },
  },
  msfvenom: {
    desc: "Metasploit payload generator and encoder.",
    run: (args) => {
      if (args.includes("-l") && args.includes("payloads")) return "Framework Payloads (592 total)\n==============================\n    Name                                 Description\n    ----                                 -----------\n    windows/shell_reverse_tcp            Spawn a piped command shell\n    linux/x64/meterpreter/reverse_tcp    Inject the meterpreter server payload";
      let format = args.includes("exe") ? "exe" : args.includes("elf") ? "elf" : "raw";
      let size = Math.floor(Math.random() * 500) + 150;
      return `No platform was selected, choosing from payload\nNo arch selected, selecting arch from payload\nFound 1 compatible encoders\nAttempting to encode payload with 1 iterations of x86/shikata_ga_nai\nPayload size: ${size} bytes\nFinal size of ${format} file: ${size + 1024} bytes\nSaved as output file.`;
    },
  },
  john: {
    desc: "John the Ripper password cracker.",
    run: (args) => {
      if (args.includes("--show")) return "admin:password123:1000:1000::/home/admin:/bin/bash\nroot:super_secret_123:0:0:root:/root:/bin/bash\n\n2 password hashes cracked, 0 left";
      return "Using default input encoding: UTF-8\nLoaded 2 password hashes with 2 different salts\nPress 'q' or Ctrl-C to abort, almost any other key for status\npassword123      (admin)\nsuper_secret_123 (root)\n2g 0:00:00:01 DONE (2026-10-21 12:00) 1.538g/s 2000p/s 2000c/s 2000C/s\nUse the \"--show\" option to display all of the cracked passwords reliably";
    },
  },
  unshadow: { desc: "Combines passwd and shadow files.", run: () => "root:$6$xyz123$abc...:0:0:root:/root:/bin/bash\nadmin:$6$qrs456$def...:1000:1000::/home/admin:/bin/bash" },
  zip2john: { desc: "Extract hash from zip file for john.", run: () => "secure.zip:$pkzip2$1*2*1*0*8*24*42d3*1*...*secure.zip" },
  ssh2john: { desc: "Extract hash from ssh private key for john.", run: () => "id_rsa:$ssh2$1*2*1*...*id_rsa" },
  hashcat: {
    desc: "Advanced password recovery utility.",
    run: (args) => {
      if (args.includes("--show")) return "8743b52063cd84097a65d1633f5c74f5:password123\n\n1/1 (100.00%) digests recovered";
      return "hashcat (v6.1.1) starting...\n\nDictionary cache hit:\n* Filename..: rockyou.txt\n* Passwords.: 14344385\n* Bytes.....: 139921507\n* Keyspace..: 14344385\n\n8743b52063cd84097a65d1633f5c74f5:password123\n\nSession..........: hashcat\nStatus...........: Cracked\nHash.Name........: MD5\nHash.Target......: 8743b52063cd84097a65d1633f5c74f5\nTime.Started.....: Wed Oct 21 12:00:00 2026, (0 secs)\nTime.Estimated...: Wed Oct 21 12:00:00 2026, (0 secs)\nSpeed.Dev.#1.....:  15.0 MH/s (0.01ms) @ Accel:256 Loops:1 Thr:256 Vec:1\nRecovered........: 1/1 (100.00%) Digests";
    },
  },
  nc: {
    desc: "Arbitrary TCP and UDP connections and listens.",
    run: (args) => {
      if (args.includes("-l") || args.includes("listen")) return "Listening on 0.0.0.0 4444\nConnection received on 10.0.0.50 56789\nroot@target:~# ";
      if (args.includes("-z")) return "Connection to 10.0.0.50 22 port [tcp/ssh] succeeded!\nConnection to 10.0.0.50 80 port [tcp/http] succeeded!";
      return "Connected to 10.0.0.50.\nroot@target:~# ";
    },
  },
  python3: {
    desc: "Run the Python 3 interpreter.",
    run: (args) => {
      if (args.includes("http.server")) return "Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...";
      if (args.includes("* 1000")) return "A".repeat(1000);
      if (args.includes("print")) return "Hacked";
      return "root@target:~# ";
    },
  },
  php: { desc: "Run the PHP command line interpreter.", run: () => "" },
  ruby: { desc: "Run the Ruby interpreter.", run: () => "" },
  perl: { desc: "Run the Perl interpreter.", run: () => "" },
  stty: { desc: "Change and print terminal line settings.", run: () => "" },
  export: { desc: "Set environment variables.", run: () => "Variable exported to environment." },
  bash: { desc: "GNU Bourne-Again SHell.", run: () => "root@target:~# " },
  env: { desc: "Print environment variables.", run: () => "PATH=/usr/bin:/bin\nUSER=sysadmin\nTERM=xterm\nTARGET=10.0.0.50\nLANG=en_US.UTF-8" },
  alias: { desc: "Define or display aliases.", run: (args) => args.length > 0 ? "" : "alias ll='ls -la'\nalias grep='grep --color=auto'" },
  source: { desc: "Execute commands from a file in the current shell.", run: () => "" },
  read: { desc: "Read a line from standard input.", run: () => "Enter IP: 10.0.0.50" },
  expr: { desc: "Evaluate expressions.", run: () => "20" },
  unset: { desc: "Remove variable or function names.", run: () => "" },
  if: { desc: "Conditional statement block.", run: () => "True" },
  for: { desc: "Loop over items.", run: () => "1\n2\n3\n4\n5\nLoop completed." },
  while: { desc: "Loop while condition is true.", run: () => "Processing line...\nLoop completed." },
  seq: { desc: "Print a sequence of numbers.", run: (args) => args.includes("2") ? "1\n3\n5\n7\n9" : "1\n2\n3\n4\n5" },
  cut: { desc: "Remove sections from each line of files.", run: () => "root\ndaemon\nsysadmin" },
  awk: { desc: "Pattern scanning and text processing language.", run: () => "root\ndaemon\nsysadmin" },
  sed: { desc: "Stream editor for filtering and transforming text.", run: () => "I love Linux" },
  sort: { desc: "Sort lines of text files.", run: (args) => args.includes("-r") ? "c\nb\na" : args.includes("-n") ? "1\n2\n10" : "a\nb\nc" },
  uniq: { desc: "Report or omit repeated lines.", run: (args) => args.includes("-c") ? "   2 a\n   1 b" : "a\nb" },
  tr: { desc: "Translate or delete characters.", run: (args) => args.includes("-d") ? "hello" : args.includes("A-Z") ? "LINUX" : "zpple" },
  tee: { desc: "Read from standard input and write to standard output and files.", run: () => "Data written to file and stdout." },
  base64: { desc: "Base64 encode/decode data.", run: (args) => args.includes("-d") ? "Secret" : "U2VjcmV0" },
  xxd: { desc: "Make a hexdump or do the reverse.", run: () => "00000000: 726f 6f74 3a78 3a30 3a30 3a72 6f6f 743a  root:x:0:0:root:\n00000010: 2f72 6f6f 743a 2f62 696e 2f62 6173 680a  /root:/bin/bash." },
  md5sum: { desc: "Compute and check MD5 message digest.", run: () => "21232f297a57a5a743894a0e4a801fc3  -" },
  sha1sum: { desc: "Compute and check SHA1 message digest.", run: () => "d033e22ae348aeb5660fc2140aec35850c4da997  -" },
  jq: { desc: "Command-line JSON processor.", run: (args) => args.includes(".name") ? '"root"' : '{\n  "name": "root"\n}' },
  diff: { desc: "Compare files line by line.", run: () => "1c1\n< root:x:0:0:root:/root:/bin/bash\n---\n> root:x:0:" },
  "!1": { desc: "Execute command from history.", run: () => "Executing history command..." },
};