// script.js
// Core Terminal UI and Logic Engine

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

let activeTab = "modules";

function switchTab(tabId) {
  if (tabId === "modules") playSound("book");
  if (tabId === "quests") playSound("quest");
  if (tabId === "cheatsheet") playSound("tool");

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

  // UPGRADED UI: Massive Mission Briefing Box & Clearer Command Target
  document.getElementById("active-lesson-body").innerHTML = `
        <h2 class="text-lg font-black text-white flex items-center gap-1.5 mb-2">
            <span class="inline-block w-2 h-2 rounded-full bg-indigo-500 pulse-emerald"></span>${l.title}
        </h2>
        <div class="text-slate-300 text-xs leading-relaxed border-l-2 border-indigo-500/50 pl-3 bg-indigo-500/10 py-3 pr-3 rounded-r mb-4">
            <strong class="text-indigo-400 uppercase tracking-wider text-[10px] block mb-1.5">Mission Briefing:</strong> 
            ${l.why}
        </div>
        <div class="text-sm text-slate-200 leading-relaxed font-mono bg-slate-900/80 p-3 rounded border border-slate-800">
            ${l.text}
        </div>`;

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
                    <span class="font-mono text-[10px] uppercase px-2 py-0.5 border rounded-full ${done ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : col}">${done ? "✅ Resolved" : q.difficulty}</span>
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
    div.className = `p-3 border rounded-xl space-y-1 transition-all duration-500 ${isUnlocked ? "bg-slate-950 border-slate-800/80" : "bg-slate-950/40 border-slate-800/40 opacity-60"}`;

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
const maxGlobalXp = 45000;
function addXp(amount) {
  if (amount > 0) {
    playSound("success");
    showFloatingXP(amount);
  }
  playerStats.xp += amount;
  let r = "Terminal Newbie";
  if (playerStats.xp >= 45000) r = "Linux Kernel God 👑🌌";
  else if (playerStats.xp >= 25000) r = "Global CISO 🛡️";
  else if (playerStats.xp >= 10000) r = "Red Team Ops 🥷";
  else if (playerStats.xp >= 2000) r = "SysAdmin 💻";

  document.getElementById("rank-name").innerText = `Rank: ${r}`;
  document.getElementById("xp-counter").innerText =
    `${playerStats.xp} / ${maxGlobalXp} XP`;
  document.getElementById("xp-progress").style.width =
    `${Math.min(100, (playerStats.xp / maxGlobalXp) * 100)}%`;
  saveGame();
}

function updateOverallProgress() {
  let t = 0;
  learningModules.forEach((m) => (t += m.lessons.length));
  document.getElementById("overall-progress-tag").innerText =
    `Progress: ${Math.round((playerStats.completedLessons.length / t) * 100)}%`;
}

// --- NEW SAVE GAME HELPER ---
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

      // LOAD THE BOOKMARKED LESSON!
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

  // ADDED 'cyber-line' HERE!
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

      if (!playerStats.discoveredCommands) playerStats.discoveredCommands = [];
      if (!playerStats.discoveredCommands.includes(cmdName)) {
        playerStats.discoveredCommands.push(cmdName);
        saveGame();
        if (activeTab === "cheatsheet") renderCheatsheet();
      }

      // Verify Lessons
      let m = learningModules[activeModuleIndex];
      let l = m.lessons[activeLessonIndex];
      let lId = `${activeModuleIndex}_${activeLessonIndex}`;

      // Check if the command satisfies the lesson objective
      if (l.check(cmdName, args, output, cmdStr)) {
        // If it's a NEW completion, give XP and save progress!
        if (!playerStats.completedLessons.includes(lId)) {
          playerStats.completedLessons.push(lId);
          addXp(l.xp);
          printToTerminal(
            `<div class="my-2 p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs">🏆 Objective Accomplished! +${l.xp} XP</div>`,
          );
        }

        // ALWAYS advance to the next lesson if the command was correct,
        // even if they already had the XP for this one.
        if (activeLessonIndex < m.lessons.length - 1) {
          activeLessonIndex++;
          saveGame();
          renderLesson();
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
      playSound("error"); // Play buzz
      document
        .getElementById("terminal-container")
        .classList.add("shake-error"); // Shake screen
      setTimeout(
        () =>
          document
            .getElementById("terminal-container")
            .classList.remove("shake-error"),
        300,
      );
      printToTerminal(`<span class="term-err">Execution Error.</span>`);
    }
  } else {
    playSound("error"); // Play buzz
    document.getElementById("terminal-container").classList.add("shake-error"); // Shake screen
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
  playSound("lightbulb");

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
    // Hide bubble instantly if turned off
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
    // 1. Reset the Virtual File System
    initVfs();

    playSound("sweep");

    document.getElementById("prompt-path").innerText = formatPromptPath();

    // 2. NUKE the Local Storage (The real hard reset!)
    localStorage.removeItem("linux_mega_stats");

    // 3. Reset the game variables in memory
    playerStats = {
      xp: 0,
      completedLessons: [],
      completedQuests: [],
      discoveredCommands: [],
    };
    activeModuleIndex = 0;
    activeLessonIndex = 0;
    document.getElementById("module-selector").value = 0;

    // 4. Reset the UI counters
    document.getElementById("rank-name").innerText = `Rank: Terminal Newbie`;
    document.getElementById("xp-counter").innerText = `0 / ${maxGlobalXp} XP`;
    document.getElementById("xp-progress").style.width = `0%`;
    document.getElementById("overall-progress-tag").innerText = `Progress: 0%`;

    // 5. Re-render the fresh state
    renderModulesDropdown();
    renderLesson();
    if (activeTab === "quests") renderQuests();
    if (activeTab === "cheatsheet") renderCheatsheet();

    playSound("error"); // Play the buzz sound for a dramatic wipe
    document.getElementById("terminal-container").classList.add("shake-error");
    setTimeout(
      () =>
        document
          .getElementById("terminal-container")
          .classList.remove("shake-error"),
      300,
    );

    printToTerminal(
      "<span class='text-red-500 font-black bg-red-950/50 px-2 py-1 uppercase'>SYSTEM WIPE COMPLETE. ALL XP DESTROYED.</span>",
    );
  }
}

// --- DEEP DIVE ASSISTANT LISTENER ---
cmdInput.addEventListener("input", () => {
  if (!isAssistantActive) return;

  const assistantBubble = document.getElementById("cyber-assistant");
  const title = document.getElementById("assistant-title");
  const text = document.getElementById("assistant-text");

  // Grab exactly what the user is typing
  let rawText = cmdInput.value.trim();
  let commandTyped = rawText.split(" ")[0].toLowerCase(); // Only check the first word

  if (commandTyped === "") {
    // Hide if input is empty
    assistantBubble.classList.remove("assistant-show");
    setTimeout(() => {
      if (!cmdInput.value.trim()) assistantBubble.classList.add("hidden");
    }, 300);
  } else if (deepDiveData[commandTyped]) {
    // We have a match! Show the deep dive.
    title.innerText = `Command: ${commandTyped}`;
    text.innerHTML = deepDiveData[commandTyped];

    assistantBubble.classList.remove("hidden");
    // Tiny timeout to allow display:block to apply before animating opacity
    setTimeout(() => assistantBubble.classList.add("assistant-show"), 10);
  } else {
    // Command not in our dictionary yet
    title.innerText = `Command: ${commandTyped}`;
    text.innerHTML = `<em>Bit is analyzing... Keep typing or execute the command!</em>`;

    assistantBubble.classList.remove("hidden");
    setTimeout(() => assistantBubble.classList.add("assistant-show"), 10);
  }
});

// Also hide the assistant when the user hits Enter!
cmdInput.addEventListener("keydown", (e) => {
  playSound("type");
  if (e.key === "Enter") {
    let cmd = cmdInput.value;
    if (cmd.trim() !== "") {
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
    }
    executeCommand(cmd);
    cmdInput.value = "";

    // ADD THIS TO HIDE THE ASSISTANT AFTER PRESSING ENTER
    const assistantBubble = document.getElementById("cyber-assistant");
    if (assistantBubble) {
      assistantBubble.classList.remove("assistant-show");
      setTimeout(() => assistantBubble.classList.add("hidden"), 300);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault(); // Prevents cursor from jumping
    if (historyIndex > 0) {
      historyIndex--;
      cmdInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault(); // Prevents cursor from jumping
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
