// script.js
// Core Terminal UI and Logic Engine - ULTIMATE EDITION

// --- DYNAMIC CSS INJECTION FOR THEMES ---
const themeStyles = document.createElement("style");
themeStyles.innerHTML = `
  .theme-hacker { background-color: #050505 !important; color: #0f0 !important; text-shadow: 0 0 5px #0f0; }
  .theme-hacker .term-rainbow, .theme-hacker .term-prompt, .theme-hacker .term-path { color: #0f0 !important; }
  .theme-hacker input { color: #0f0 !important; text-shadow: 0 0 5px #0f0; }
  .theme-retro { background-color: #2b1100 !important; color: #ff8c00 !important; text-shadow: 0 0 5px #ff8c00; box-shadow: inset 0 0 100px rgba(0,0,0,0.9); }
  .theme-retro::after { content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); z-index: 2; background-size: 100% 2px, 3px 100%; pointer-events: none; }
  .theme-retro .term-rainbow, .theme-retro .term-prompt, .theme-retro .term-path { color: #ff8c00 !important; }
  .theme-retro input { color: #ff8c00 !important; text-shadow: 0 0 5px #ff8c00; }
`;
document.head.appendChild(themeStyles);

// --- GLOBAL ERROR HANDLING & MAINTENANCE TAPE ---
window.addEventListener("error", function (e) {
  triggerMaintenanceMode(e.message || "Unknown Fatal Exception");
});

window.addEventListener("unhandledrejection", function (e) {
  triggerMaintenanceMode(e.reason || "Unhandled Promise Rejection");
});

function triggerMaintenanceMode(errMsg) {
  if (document.getElementById("maintenance-tape")) return;
  if (typeof playSound === "function") playSound("error");
  const div = document.createElement("div");
  div.id = "maintenance-tape";
  div.className =
    "fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none bg-black/80 backdrop-blur-md";
  div.innerHTML = `
        <div class="absolute w-[200%] h-24 bg-yellow-400 flex items-center justify-center border-y-8 border-black shadow-[0_0_50px_rgba(250,204,21,0.5)] z-10" style="transform: rotate(-20deg);">
            <span class="text-black font-black text-6xl tracking-[0.2em] uppercase whitespace-nowrap" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 80px);">
                &nbsp;⚠️ UNDER MAINTENANCE ⚠️ DO NOT CROSS ⚠️ UNDER MAINTENANCE ⚠️ DO NOT CROSS ⚠️ UNDER MAINTENANCE ⚠️ DO NOT CROSS ⚠️&nbsp;
            </span>
        </div>
        <div class="absolute w-[200%] h-24 bg-yellow-400 flex items-center justify-center border-y-8 border-black shadow-[0_0_50px_rgba(250,204,21,0.5)] z-10" style="transform: rotate(20deg);">
            <span class="text-black font-black text-6xl tracking-[0.2em] uppercase whitespace-nowrap" style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 80px);">
                &nbsp;⚠️ FATAL EXCEPTION ⚠️ SYSTEM HALTED ⚠️ FATAL EXCEPTION ⚠️ SYSTEM HALTED ⚠️ FATAL EXCEPTION ⚠️ SYSTEM HALTED ⚠️&nbsp;
            </span>
        </div>
        <div class="relative bg-slate-950 border-4 border-red-500 p-10 rounded-2xl shadow-[0_0_100px_rgba(239,68,68,0.5)] max-w-2xl text-center pointer-events-auto z-50">
            <h1 class="text-5xl font-black text-red-500 mb-4 animate-pulse">KERNEL PANIC</h1>
            <p class="text-slate-300 font-mono text-sm mb-8 bg-black/80 p-4 rounded border border-red-500/30 overflow-auto max-h-32 text-left shadow-inner">${errMsg}</p>
            <button onclick="location.reload()" class="bg-red-500/20 text-red-400 border-2 border-red-500 px-8 py-3 rounded-lg font-black text-lg tracking-widest hover:bg-red-500 hover:text-white hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-all cursor-pointer">REBOOT SYSTEM</button>
        </div>
    `;
  document.body.appendChild(div);
}

// --- VFS DATABASES ---
let vfs = {};
let runningServices = { ssh: true, nginx: false, docker: false };
let envVars = { PATH: "/usr/bin:/bin", USER: "sysadmin", TERM: "xterm" };
let firewallRules = [];
let currentPath = "/home/sysadmin";
let userAliases = { ll: "ls -la" };
let commandHistory = [];
let historyIndex = -1;
let playerStats = {
  xp: 0,
  completedLessons: [],
  completedQuests: [],
  discoveredCommands: [],
};
let isAssistantActive = false;

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
              ".hidden_flag.b64": {
                type: "file",
                owner: "root",
                content: "Q1RGe0g0Q0s3Ul9NMk4wX000U1QzUn0=",
              }, // Hidden CTF Flag!
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

// --- FILE SYSTEM PERSISTENCE ---
function saveVFS() {
  localStorage.setItem("linux_mega_vfs", JSON.stringify(vfs));
}

function initVfs() {
  let savedVFS = localStorage.getItem("linux_mega_vfs");
  if (savedVFS) {
    try {
      vfs = JSON.parse(savedVFS);
    } catch (e) {
      vfs = JSON.parse(JSON.stringify(initialVfsTemplate));
    }
  } else {
    vfs = JSON.parse(JSON.stringify(initialVfsTemplate));
  }
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

// --- UI LOGIC ---
let activeTab = "modules";

function switchTab(tabId) {
  if (typeof playSound === "function") {
    if (tabId === "modules") playSound("book");
    if (tabId === "quests") playSound("quest");
    if (tabId === "cheatsheet") playSound("tool");
  }

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
  saveGame();
  renderLesson();
}

function renderModulesDropdown() {
  if (!learningModules || learningModules.length === 0) return;
  let select = document.getElementById("module-selector");
  select.innerHTML = "";
  learningModules.forEach((m, idx) => {
    select.innerHTML += `<option value="${idx}">${m.name}</option>`;
  });

  if (activeModuleIndex >= learningModules.length) activeModuleIndex = 0;
  select.value = activeModuleIndex;
}

function renderLesson() {
  if (!learningModules || learningModules.length === 0) return;
  let m = learningModules[activeModuleIndex];
  let l = m.lessons[activeLessonIndex];
  document.getElementById("lesson-module-tag").innerText = m.name.split(" ")[1];
  document.getElementById("lesson-index-tag").innerText =
    `Lesson ${activeLessonIndex + 1}/${m.lessons.length}`;

  document.getElementById("active-lesson-body").innerHTML = `
        <h2 class="text-lg font-black text-white flex items-center gap-1.5 mb-2">
            <span class="inline-block w-2 h-2 rounded-full bg-indigo-500 pulse-emerald"></span>${l.title}
        </h2>
        <div class="text-slate-300 text-xs leading-relaxed border-l-2 border-indigo-500/50 pl-3 bg-indigo-500/10 py-3 pr-3 rounded-r mb-4 shadow-inner">
            <strong class="text-indigo-400 uppercase tracking-wider text-[10px] block mb-1.5">Mission Briefing:</strong> 
            ${l.why}
        </div>
        <div class="text-sm text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded border border-slate-800 shadow-md">
            ${l.text}
        </div>`;

  document.getElementById("lesson-objective-target").innerHTML = l.objective;
  document.getElementById("lesson-xp-badge").innerText = `+${l.xp} XP`;
  renderModulesOverview();
  updateOverallProgress();
}

function renderModulesOverview() {
  if (!learningModules || learningModules.length === 0) return;
  let container = document.getElementById("modules-list");
  container.innerHTML = "";
  learningModules.forEach((mod, mIdx) => {
    let count = 0;
    mod.lessons.forEach((les, lIdx) => {
      if (playerStats.completedLessons.includes(`${mIdx}_${lIdx}`)) count++;
    });
    let pct = Math.round((count / mod.lessons.length) * 100);
    container.innerHTML += `
            <div class="p-3 rounded-xl border text-xs flex flex-col gap-2 transition-all hover:border-indigo-500/50 ${activeModuleIndex === mIdx ? "bg-slate-950 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]" : "bg-slate-950/40 border-slate-800"}">
                <div class="flex items-center justify-between cursor-pointer" onclick="selectModuleFromList(${mIdx})">
                    <span class="font-bold text-slate-300">${mod.name}</span><span class="text-slate-500 font-mono">${pct}%</span>
                </div>
                <div class="w-full bg-slate-900 rounded-full h-1.5"><div class="bg-indigo-500 h-1.5 rounded-full shadow-[0_0_5px_rgba(99,102,241,0.5)]" style="width: ${pct}%"></div></div>
            </div>`;
  });
}

function selectModuleFromList(idx) {
  activeModuleIndex = idx;
  activeLessonIndex = 0;
  document.getElementById("module-selector").value = idx;
  saveGame();
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
            <div class="p-4 border rounded-xl space-y-3 transition-all duration-300 ${done ? "bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "bg-slate-950 border-slate-800"}">
                <div class="flex items-center justify-between">
                    <span class="font-mono text-[10px] uppercase px-2 py-0.5 border rounded-full shadow-sm ${done ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : col}">${done ? "✅ Resolved" : q.difficulty}</span>
                    <span class="text-xs font-bold ${done ? "text-emerald-400" : "text-indigo-400"}">+${q.reward} XP</span>
                </div>
                <h4 class="font-bold text-white text-sm ${done ? "line-through text-emerald-400/70" : ""}">${q.title}</h4>
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
  let discovered = playerStats.discoveredCommands || [];

  keys.forEach((k) => {
    let cmdObj = commands[k];
    if (
      query !== "" &&
      !k.includes(query) &&
      !cmdObj.desc.toLowerCase().includes(query)
    )
      return;
    let isUnlocked = discovered.includes(k);
    let div = document.createElement("div");
    div.className = `p-3 border rounded-xl space-y-1 transition-all duration-500 ${isUnlocked ? "bg-slate-950 border-slate-800/80 shadow-md" : "bg-slate-950/40 border-slate-800/40 opacity-60"}`;
    let badge = isUnlocked
      ? `<span class="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-500/20">Unlocked</span>`
      : `<span class="font-mono text-[10px] text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">Locked</span>`;
    div.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-mono text-xs font-bold ${isUnlocked ? "text-indigo-400" : "text-slate-500"}">${k}</span>
            ${badge}
        </div>
        <p class="text-xs leading-relaxed transition-all duration-500 ${isUnlocked ? "text-slate-300" : "text-slate-600 blur-[3px] select-none"}">
            ${isUnlocked ? cmdObj.desc : "Execute this command in the terminal at least once to reveal its description."}
        </p>
    `;
    container.appendChild(div);
  });
}

function filterCheatsheet() {
  renderCheatsheet();
}

// --- PROGRESSION ---
const maxGlobalXp = 50000;
function addXp(amount) {
  if (
    amount > 0 &&
    typeof playSound === "function" &&
    typeof showFloatingXP === "function"
  ) {
    playSound("success");
    showFloatingXP(amount);
  }
  playerStats.xp += amount;
  let r = "Terminal Newbie";
  if (playerStats.xp >= 50000) r = "Kernel God 👑🌌";
  else if (playerStats.xp >= 35000) r = "Global CISO 🛡️";
  else if (playerStats.xp >= 20000) r = "Red Team Ops 🥷";
  else if (playerStats.xp >= 10000) r = "Senior Architect 🏗️";
  else if (playerStats.xp >= 2000) r = "SysAdmin 💻";

  document.getElementById("rank-name").innerText = `Rank: ${r}`;
  document.getElementById("xp-counter").innerText =
    `${playerStats.xp} / ${maxGlobalXp} XP`;
  document.getElementById("xp-progress").style.width =
    `${Math.min(100, (playerStats.xp / maxGlobalXp) * 100)}%`;
  saveGame();
}

function updateOverallProgress() {
  if (!learningModules || learningModules.length === 0) return;
  let t = 0;
  learningModules.forEach((m) => (t += m.lessons.length));
  document.getElementById("overall-progress-tag").innerText =
    `Progress: ${Math.round((playerStats.completedLessons.length / t) * 100)}%`;
}

function saveGame() {
  playerStats.activeModule = activeModuleIndex;
  playerStats.activeLesson = activeLessonIndex;
  localStorage.setItem("linux_mega_stats", JSON.stringify(playerStats));
}

function loadStats() {
  let saved = localStorage.getItem("linux_mega_stats");
  if (saved) {
    try {
      playerStats = JSON.parse(saved);
      if (!playerStats.completedQuests) playerStats.completedQuests = [];
      if (!playerStats.discoveredCommands) playerStats.discoveredCommands = [];
      if (playerStats.activeModule !== undefined)
        activeModuleIndex = playerStats.activeModule;
      if (playerStats.activeLesson !== undefined)
        activeLessonIndex = playerStats.activeLesson;
    } catch (e) {}
  } else {
    playerStats.discoveredCommands = [];
  }
  addXp(0);
}

const terminalOutput = document.getElementById("terminal-output");
const cmdInput = document.getElementById("cmd-input");

function printToTerminal(htmlContent, isCommand = false) {
  const div = document.createElement("div");
  div.className = "mb-1 leading-relaxed cyber-line";
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

  // Easter Egg: Manual Panic
  if (cmdStr.toLowerCase() === "panic") {
    triggerMaintenanceMode(
      "MANUAL OVERRIDE: Administrator triggered a catastrophic simulation. The system kernel has panicked.",
    );
    return;
  }

  // Easter Egg: HIDDEN CTF MINIGAME (Intercepts before standard processing)
  if (
    cmdStr.includes("base64") &&
    cmdStr.includes("-d") &&
    cmdStr.includes(".hidden_flag.b64")
  ) {
    if (!playerStats.completedQuests.includes("CTF_HIDDEN")) {
      playerStats.completedQuests.push("CTF_HIDDEN");
      addXp(5000);
      if (typeof playSound === "function") playSound("quest");
      printToTerminal(
        `<div class="p-6 bg-yellow-500/20 border-2 border-yellow-400 text-yellow-400 font-black text-center text-2xl shadow-[0_0_50px_rgba(250,204,21,0.6)] animate-pulse rounded-xl mt-4 mb-4">🏴‍☠️ ELITE CTF FLAG CAPTURED! 🏴‍☠️<br><span class="text-sm font-mono text-white mt-2 block tracking-widest">CTF{HACK7R_M2N0_M4ST3R}</span></div>`,
      );
      saveGame();
      return;
    }
  }

  let args = cmdStr.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) || [];
  let cmdName = args.shift();

  if (commands[cmdName]) {
    try {
      let output = commands[cmdName].run(args, cmdStr);
      saveVFS(); // PERSISTENCE: Save file changes to disk!

      if (output === "CLEAR_SIGNAL") {
        terminalOutput.innerHTML = "";
      } else if (output !== "") {
        printToTerminal(output);
      }

      if (!playerStats.discoveredCommands) playerStats.discoveredCommands = [];
      if (!playerStats.discoveredCommands.includes(cmdName)) {
        playerStats.discoveredCommands.push(cmdName);
        saveGame();
        if (activeTab === "cheatsheet") renderCheatsheet();
      }

      if (learningModules && learningModules.length > 0) {
        let m = learningModules[activeModuleIndex];
        let l = m.lessons[activeLessonIndex];
        let lId = `${activeModuleIndex}_${activeLessonIndex}`;

        if (l.check(cmdName, args, output, cmdStr)) {
          if (!playerStats.completedLessons.includes(lId)) {
            playerStats.completedLessons.push(lId);
            addXp(l.xp);
            printToTerminal(
              `<div class="my-2 p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs shadow-md">🏆 Objective Accomplished! +${l.xp} XP</div>`,
            );
          }
          if (activeLessonIndex < m.lessons.length - 1) {
            activeLessonIndex++;
            saveGame();
            renderLesson();
          }
        }
      }

      quests.forEach((q) => {
        if (
          !playerStats.completedQuests.includes(q.id) &&
          q.check(cmdName, args, output, cmdStr)
        ) {
          playerStats.completedQuests.push(q.id);
          addXp(q.reward);
          printToTerminal(
            `<div class="my-2 p-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-xs shadow-[0_0_15px_rgba(168,85,247,0.2)]">🔥 Quest Cleared: ${q.title}! +${q.reward} XP</div>`,
          );
          if (activeTab === "quests") renderQuests();
        }
      });
    } catch (e) {
      triggerMaintenanceMode("Command Execution Engine Failure: " + e.message);
    }
  } else {
    if (typeof playSound === "function") playSound("error");
    document.getElementById("terminal-container").classList.add("shake-error");
    setTimeout(
      () =>
        document
          .getElementById("terminal-container")
          .classList.remove("shake-error"),
      300,
    );
    printToTerminal(
      `<span class="term-err">${cmdName}: command not found</span>`,
    );
  }
}

function toggleAssistant() {
  if (typeof playSound === "function") playSound("lightbulb");
  isAssistantActive = !isAssistantActive;
  const btn = document.getElementById("btn-assistant");
  const assistantBubble = document.getElementById("cyber-assistant");

  if (isAssistantActive) {
    btn.innerHTML = "💡 Deep Dive: ON";
    btn.classList.replace("text-yellow-400", "text-emerald-400");
    btn.classList.replace("bg-yellow-400/10", "bg-emerald-400/10");
    btn.classList.replace("border-yellow-400/20", "border-emerald-400/20");
  } else {
    btn.innerHTML = "💡 Deep Dive: OFF";
    btn.classList.replace("text-emerald-400", "text-yellow-400");
    btn.classList.replace("bg-emerald-400/10", "bg-yellow-400/10");
    btn.classList.replace("border-emerald-400/20", "border-yellow-400/20");
    assistantBubble.classList.remove("assistant-show");
    setTimeout(() => assistantBubble.classList.add("hidden"), 300);
  }
}

function resetSandbox() {
  if (
    confirm(
      "WARNING: This will delete ALL files, reset your rank, and wipe ALL XP. Are you sure?",
    )
  ) {
    localStorage.removeItem("linux_mega_vfs");
    initVfs();
    if (typeof playSound === "function") playSound("sweep");
    document.getElementById("prompt-path").innerText = formatPromptPath();
    localStorage.removeItem("linux_mega_stats");

    playerStats = {
      xp: 0,
      completedLessons: [],
      completedQuests: [],
      discoveredCommands: [],
    };
    activeModuleIndex = 0;
    activeLessonIndex = 0;
    document.getElementById("module-selector").value = 0;
    document.getElementById("rank-name").innerText = `Rank: Terminal Newbie`;
    document.getElementById("xp-counter").innerText = `0 / ${maxGlobalXp} XP`;
    document.getElementById("xp-progress").style.width = `0%`;
    document.getElementById("overall-progress-tag").innerText = `Progress: 0%`;

    renderModulesDropdown();
    renderLesson();
    if (activeTab === "quests") renderQuests();
    if (activeTab === "cheatsheet") renderCheatsheet();

    if (typeof playSound === "function") playSound("error");
    document.getElementById("terminal-container").classList.add("shake-error");
    setTimeout(
      () =>
        document
          .getElementById("terminal-container")
          .classList.remove("shake-error"),
      300,
    );
    printToTerminal(
      "<span class='text-red-500 font-black bg-red-950/50 px-2 py-1 uppercase border border-red-500/50 rounded'>SYSTEM WIPE COMPLETE. ALL XP & FILES DESTROYED.</span>",
    );
  }
}

// --- DEEP DIVE ASSISTANT LISTENER ---
cmdInput.addEventListener("input", () => {
  if (!isAssistantActive) return;
  const assistantBubble = document.getElementById("cyber-assistant");
  const title = document.getElementById("assistant-title");
  const text = document.getElementById("assistant-text");
  let rawText = cmdInput.value.trim();
  let commandTyped = rawText.split(" ")[0].toLowerCase();

  if (commandTyped === "") {
    assistantBubble.classList.remove("assistant-show");
    setTimeout(() => {
      if (!cmdInput.value.trim()) assistantBubble.classList.add("hidden");
    }, 300);
  } else if (
    typeof deepDiveData !== "undefined" &&
    deepDiveData[commandTyped]
  ) {
    title.innerText = `Command: ${commandTyped}`;
    text.innerHTML = deepDiveData[commandTyped];
    assistantBubble.classList.remove("hidden");
    setTimeout(() => assistantBubble.classList.add("assistant-show"), 10);
  } else {
    title.innerText = `Command: ${commandTyped}`;
    text.innerHTML = `<em>Bit is analyzing... Keep typing or execute the command!</em>`;
    assistantBubble.classList.remove("hidden");
    setTimeout(() => assistantBubble.classList.add("assistant-show"), 10);
  }
});

// --- TAB COMPLETION & HISTORY ---
cmdInput.addEventListener("keydown", (e) => {
  if (e.key !== "Tab" && typeof playSound === "function") playSound("type");

  if (e.key === "Tab") {
    e.preventDefault(); // Stop browser from jumping focus
    if (typeof playSound === "function") playSound("type");

    let input = cmdInput.value;
    let parts = input.split(" ");

    if (parts.length === 1) {
      // Autocomplete Command Names
      let search = parts[0].toLowerCase();
      let matches = Object.keys(commands).filter((c) => c.startsWith(search));
      if (matches.length === 1) {
        cmdInput.value = matches[0] + " ";
      } else if (matches.length > 1) {
        printToTerminal(
          `<span class="text-indigo-400">${matches.join("  ")}</span>`,
        );
      }
    } else {
      // Autocomplete Files in Current Directory
      let search = parts[parts.length - 1];
      let node = getVfsNode(currentPath);
      if (node && node.contents) {
        let matches = Object.keys(node.contents).filter((f) =>
          f.startsWith(search),
        );
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          cmdInput.value = parts.join(" ");
        } else if (matches.length > 1) {
          printToTerminal(
            `<span class="text-emerald-400">${matches.join("  ")}</span>`,
          );
        }
      }
    }
  } else if (e.key === "Enter") {
    let cmd = cmdInput.value;
    if (cmd.trim() !== "") {
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
    }
    executeCommand(cmd);
    cmdInput.value = "";
    const assistantBubble = document.getElementById("cyber-assistant");
    if (assistantBubble) {
      assistantBubble.classList.remove("assistant-show");
      setTimeout(() => assistantBubble.classList.add("hidden"), 300);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      cmdInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
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
  if (learningModules.length === 0) {
    triggerMaintenanceMode(
      "MODULE ARCHITECTURE MISSING. The learning array failed to populate.",
    );
  }
  renderModulesDropdown();
  renderLesson();
  cmdInput.focus();
};

// --- CONTACT FLYING AIRPLANE LOGIC ---
function sendContactEmail(e) {
  if (typeof playSound === "function") playSound("whoosh");
  const plane = document.createElement("div");
  plane.innerText = "✈️";
  plane.style.position = "fixed";
  plane.style.left = e.clientX + "px";
  plane.style.top = e.clientY + "px";
  plane.style.fontSize = "3rem";
  plane.style.zIndex = "99999";
  plane.style.pointerEvents = "none";
  plane.style.transition = "all 1.5s cubic-bezier(0.5, 0, 0.5, 1)";
  plane.style.transform = "translate(-50%, -50%) rotate(0deg)";
  plane.style.filter = "drop-shadow(0 0 15px rgba(96,165,250,0.8))";
  document.body.appendChild(plane);

  requestAnimationFrame(() => {
    plane.style.left = "120vw";
    plane.style.top = "-20vh";
    plane.style.transform = "translate(-50%, -50%) rotate(45deg) scale(3)";
  });

  setTimeout(() => {
    plane.remove();
    window.location.href =
      "mailto:kanyanee.pro@gmail.com?subject=Hello from the Linux Sandbox!";
  }, 1500);
}
