// --- SECURITY HOOK ---
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) e.preventDefault();
});

// --- VFS DATABASES ---
let vfs = {};
let runningServices = { 'ssh': true, 'nginx': false, 'docker': false };
let envVars = { 'PATH': '/usr/bin:/bin', 'USER': 'sysadmin', 'TERM': 'xterm' };
let firewallRules = [];
let currentPath = "/home/sysadmin";
let userAliases = { 'll': 'ls -la' };
let commandHistory = [];
let historyIndex = -1;
let playerStats = { xp: 0, completedLessons: [], completedQuests: [] };

const initialVfsTemplate = {
    "/": { 
        type: "dir", 
        owner: "root", 
        contents: {
            "home": { 
                type: "dir", 
                owner: "root", 
                contents: {
                    "sysadmin": { 
                        type: "dir", 
                        owner: "sysadmin", 
                        contents: {
                            ".bash_profile": { type: "file", owner: "sysadmin", content: "export PATH=$PATH:/opt/bin" },
                            "notes.txt": { type: "file", owner: "sysadmin", content: "Learn Linux\nMaster Terminal\nBecome Root" },
                            "projects": { type: "dir", owner: "sysadmin", contents: {} }
                        }
                    }
                }
            },
            "var": { 
                type: "dir", 
                owner: "root", 
                contents: {
                    "log": { 
                        type: "dir", 
                        owner: "root", 
                        contents: {
                            "syslog": { type: "file", owner: "root", content: "Booting kernel...\nNetwork UP\nNginx failed to start" },
                            "auth.log": { type: "file", owner: "root", content: "Failed pass for root from 10.0.0.99" }
                        }
                    }
                }
            },
            "etc": { 
                type: "dir", 
                owner: "root", 
                contents: {
                    "passwd": { type: "file", owner: "root", content: "root:x:0:0:root:/root:/bin/bash\nsysadmin:x:1000:1000::/home/sysadmin:/bin/bash" }
                }
            },
            "tmp": { 
                type: "dir", 
                owner: "root", 
                contents: {
                    "malware.bin": { type: "file", owner: "root", content: "\x7FELF\nConnecting to http://evil.com" }
                }
            }
        }
    }
};

function initVfs() {
    vfs = JSON.parse(JSON.stringify(initialVfsTemplate));
    currentPath = "/home/sysadmin";
}

function resolvePath(targetPath) {
    if (!targetPath) return { node: getVfsNode(currentPath), path: currentPath };
    if (targetPath === '~') targetPath = "/home/sysadmin";
    if (targetPath.startsWith('~/')) targetPath = "/home/sysadmin" + targetPath.substring(1);
    
    let parts = targetPath.split('/');
    let absPathParts = targetPath.startsWith('/') ? [] : currentPath.split('/').filter(Boolean);
    
    for (let part of parts) {
        if (part === '' || part === '.') continue;
        if (part === '..') { 
            if (absPathParts.length > 0) absPathParts.pop(); 
        } else {
            absPathParts.push(part);
        }
    }
    
    let resolvedStr = '/' + absPathParts.join('/');
    let current = vfs['/'];
    let parent = null;
    let finalName = absPathParts.length > 0 ? absPathParts[absPathParts.length-1] : "";
    
    for (let i = 0; i < absPathParts.length; i++) {
        parent = current;
        if (!current.contents || !current.contents[absPathParts[i]]) return null;
        current = current.contents[absPathParts[i]];
    }
    return { node: current, path: resolvedStr === '//' ? '/' : resolvedStr, parentNode: parent, name: finalName };
}

function getVfsNode(pathStr) { 
    let res = resolvePath(pathStr); 
    return res ? res.node : null; 
}

function formatPromptPath() { 
    return currentPath.startsWith("/home/sysadmin") ? currentPath.replace("/home/sysadmin", "~") : currentPath; 
}

// --- THE FULLY EXPANDED MEGA CURRICULUM ---
const learningModules = [
    {
        name: "1. Navigation Ninja",
        lessons: [
            { title: "Print Working Dir", why: "Find yourself", text: "Type <code>pwd</code>", objective: "Type pwd", xp: 20, check: (c) => c==="pwd" },
            { title: "List Basic", why: "See files", text: "Type <code>ls</code>", objective: "Type ls", xp: 20, check: (c) => c==="ls" },
            { title: "List All", why: "See hidden files", text: "Type <code>ls -a</code>", objective: "Type ls -a", xp: 20, check: (c,a) => c==="ls" && a.includes("-a") },
            { title: "List Long", why: "See permissions", text: "Type <code>ls -l</code>", objective: "Type ls -l", xp: 20, check: (c,a) => c==="ls" && a.includes("-l") },
            { title: "List Long All", why: "Combine flags", text: "Type <code>ls -la</code>", objective: "Type ls -la", xp: 20, check: (c,a) => c==="ls" && a.includes("-la") },
            { title: "Change Dir", why: "Move in", text: "Type <code>cd projects</code>", objective: "Type cd projects", xp: 20, check: (c,a) => c==="cd" && a[0]==="projects" },
            { title: "Verify Move", why: "Check location", text: "Type <code>pwd</code>", objective: "Type pwd", xp: 20, check: (c) => c==="pwd" && currentPath==="/home/sysadmin/projects" },
            { title: "Move Up", why: "Go to parent", text: "Type <code>cd ..</code>", objective: "Type cd ..", xp: 20, check: (c,a) => c==="cd" && a[0]===".." },
            { title: "Move to Root", why: "Absolute path", text: "Type <code>cd /</code>", objective: "Type cd /", xp: 20, check: (c,a) => c==="cd" && a[0]==="/" },
            { title: "List Root", why: "Explore", text: "Type <code>ls</code>", objective: "Type ls", xp: 20, check: (c) => c==="ls" && currentPath==="/" },
            { title: "Move to Logs", why: "Absolute nested", text: "Type <code>cd /var/log</code>", objective: "Type cd /var/log", xp: 30, check: (c,a) => c==="cd" && a[0]==="/var/log" },
            { title: "Go Home", why: "Use Tilde shortcut", text: "Type <code>cd ~</code>", objective: "Type cd ~", xp: 30, check: (c,a) => c==="cd" && a[0]==="~" }
        ]
    },
    {
        name: "2. File Operations",
        lessons: [
            { title: "Make Directory", why: "Create folder", text: "Type <code>mkdir test1</code>", objective: "Type mkdir test1", xp: 20, check: (c,a) => c==="mkdir" && a[0]==="test1" },
            { title: "Make Multiple", why: "Space separated", text: "Type <code>mkdir test2 test3</code>", objective: "Create 2 folders at once", xp: 30, check: (c,a) => c==="mkdir" && a.includes("test2") && a.includes("test3") },
            { title: "Touch File", why: "Create empty file", text: "Type <code>touch file1.txt</code>", objective: "Type touch file1.txt", xp: 20, check: (c,a) => c==="touch" && a[0]==="file1.txt" },
            { title: "Touch Multiple", why: "Space separated", text: "Type <code>touch f2.txt f3.txt</code>", objective: "Create f2 and f3", xp: 30, check: (c,a) => c==="touch" && a.includes("f2.txt") && a.includes("f3.txt") },
            { title: "Copy File", why: "Duplicate", text: "Type <code>cp file1.txt clone.txt</code>", objective: "Type cp file1.txt clone.txt", xp: 30, check: (c,a) => c==="cp" && a[0]==="file1.txt" },
            { title: "Move / Rename", why: "Rename file", text: "Type <code>mv clone.txt hidden.txt</code>", objective: "Rename clone to hidden", xp: 30, check: (c,a) => c==="mv" && a[0]==="clone.txt" },
            { title: "Remove File", why: "Delete f3", text: "Type <code>rm f3.txt</code>", objective: "Type rm f3.txt", xp: 20, check: (c,a) => c==="rm" && a[0]==="f3.txt" },
            { title: "Remove Dir", why: "Delete empty folder", text: "Type <code>rmdir test3</code>", objective: "Type rmdir test3", xp: 30, check: (c,a) => c==="rmdir" && a[0]==="test3" },
            { title: "Remove Recursive", why: "Force delete folder", text: "Type <code>rm -rf test2</code>", objective: "Type rm -rf test2", xp: 40, check: (c,a) => c==="rm" && a.includes("-rf") && a.includes("test2") }
        ]
    },
    {
        name: "3. Text Manipulation",
        lessons: [
            { title: "Echo Redirection", why: "Write text", text: "Type <code>echo \"Hello\" > msg.txt</code>", objective: "Use > to write msg.txt", xp: 30, check: (c,a) => c==="echo" && a.includes(">") && a.includes("msg.txt") },
            { title: "Echo Append", why: "Add to bottom", text: "Type <code>echo \"World\" >> msg.txt</code>", objective: "Use >> to append to msg.txt", xp: 40, check: (c,a) => c==="echo" && a.includes(">>") && a.includes("msg.txt") },
            { title: "Concatenate", why: "Read full file", text: "Type <code>cat msg.txt</code>", objective: "Read msg.txt", xp: 20, check: (c,a) => c==="cat" && a[0]==="msg.txt" },
            { title: "Word Count", why: "Count lines/words", text: "Type <code>wc notes.txt</code>", objective: "Run wc on notes.txt", xp: 20, check: (c,a) => c==="wc" && a[0]==="notes.txt" },
            { title: "Grep Basic", why: "Search strings", text: "Type <code>grep \"Master\" notes.txt</code>", objective: "Grep 'Master'", xp: 30, check: (c,a) => c==="grep" && a.includes("Master") }
        ]
    },
    {
        name: "4. System Diagnostics",
        lessons: [
            { title: "Date", why: "Check server time", text: "Type <code>date</code>", objective: "Type date", xp: 20, check: (c) => c==="date" },
            { title: "Uptime", why: "Check how long it's running", text: "Type <code>uptime</code>", objective: "Type uptime", xp: 20, check: (c) => c==="uptime" },
            { title: "Whoami", why: "Check user", text: "Type <code>whoami</code>", objective: "Type whoami", xp: 20, check: (c) => c==="whoami" },
            { title: "Disk Free", why: "Check storage", text: "Type <code>df -h</code>", objective: "Type df -h", xp: 20, check: (c,a) => c==="df" && a.includes("-h") },
            { title: "Memory", why: "Check RAM", text: "Type <code>free -m</code>", objective: "Type free -m", xp: 20, check: (c,a) => c==="free" && a.includes("-m") }
        ]
    },
    {
        name: "5. Red Team & Networking",
        lessons: [
            { title: "Ping", why: "Test connection", text: "Type <code>ping google.com</code>", objective: "Ping google.com", xp: 30, check: (c,a) => c==="ping" && a[0]==="google.com" },
            { title: "Netstat", why: "Check ports", text: "Type <code>netstat -tuln</code>", objective: "Type netstat -tuln", xp: 30, check: (c,a) => c==="netstat" && a.includes("-tuln") },
            { title: "Nmap Local", why: "Scan yourself", text: "Type <code>nmap localhost</code>", objective: "Type nmap localhost", xp: 50, check: (c,a) => c==="nmap" && a[0]==="localhost" },
            { title: "Strings", why: "Reverse malware", text: "Type <code>strings /tmp/malware.bin</code>", objective: "Run strings on malware", xp: 60, check: (c,a) => c==="strings" && a[0]==="/tmp/malware.bin" }
        ]
    }
];

// --- BOSS QUESTS ---
const quests = [
    { 
        id: "q1", 
        title: "The Appender", 
        difficulty: "Medium", 
        reward: 200, 
        description: "Create a file named `log.txt`, echo 'Start' into it, then append `>>` 'End' to it.", 
        objective: "echo Start > log.txt, then echo End >> log.txt", 
        check: () => { 
            let n = getVfsNode("/home/sysadmin/log.txt"); 
            return n && n.content.includes("Start") && n.content.includes("End"); 
        } 
    },
    { 
        id: "q2", 
        title: "Hidden Cleaner", 
        difficulty: "Hard", 
        reward: 300, 
        description: "Navigate to `/home/sysadmin`, create a hidden directory `.trash`, and move `notes.txt` into it.", 
        objective: "mkdir .trash && mv notes.txt .trash/", 
        check: () => { 
            let n = getVfsNode("/home/sysadmin/.trash/notes.txt"); 
            return n !== null; 
        } 
    },
    { 
        id: "q3", 
        title: "Log Investigator", 
        difficulty: "Hard", 
        reward: 400, 
        description: "Grep for 'Failed' inside /var/log/auth.log.", 
        objective: "Use grep Failed on auth.log", 
        check: (c,a) => c==="grep" && a.includes("Failed") && a.some(x=>x.includes("auth.log")) 
    },
    { 
        id: "q4", 
        title: "System Rebooter", 
        difficulty: "Ultimate", 
        reward: 800, 
        description: "Check `systemctl status nginx`, then start it.", 
        objective: "Start the nginx daemon", 
        check: () => runningServices['nginx'] === true 
    }
];

let activeModuleIndex = 0; 
let activeLessonIndex = 0; 
let activeTab = 'modules';

function switchTab(tabId) {
    activeTab = tabId;
    ['modules', 'quests', 'cheatsheet'].forEach(t => {
        document.getElementById(`view-${t}`).classList.add('hidden');
        document.getElementById(`tab-btn-${t}`).classList.remove('border-indigo-500', 'text-white');
        document.getElementById(`tab-btn-${t}`).classList.add('border-transparent', 'text-slate-400');
    });
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    document.getElementById(`tab-btn-${tabId}`).classList.remove('border-transparent', 'text-slate-400');
    document.getElementById(`tab-btn-${tabId}`).classList.add('border-indigo-500', 'text-white');
    if (tabId === 'quests') renderQuests();
    if (tabId === 'cheatsheet') renderCheatsheet();
}

function changeModule() { 
    activeModuleIndex = parseInt(document.getElementById('module-selector').value); 
    activeLessonIndex = 0; 
    renderLesson(); 
}

function renderModulesDropdown() {
    let select = document.getElementById('module-selector');
    select.innerHTML = '';
    learningModules.forEach((m, idx) => { 
        select.innerHTML += `<option value="${idx}">${m.name}</option>`; 
    });
    select.value = activeModuleIndex;
}

function renderLesson() {
    let m = learningModules[activeModuleIndex];
    let l = m.lessons[activeLessonIndex];
    document.getElementById('lesson-module-tag').innerText = m.name.split(' ')[1];
    document.getElementById('lesson-index-tag').innerText = `Lesson ${activeLessonIndex + 1}/${m.lessons.length}`;
    document.getElementById('active-lesson-body').innerHTML = `
        <h2 class="text-lg font-black text-white flex items-center gap-1.5"><span class="inline-block w-2 h-2 rounded-full bg-indigo-500 pulse-emerald"></span>${l.title}</h2>
        <div class="text-slate-400 text-[11px] leading-relaxed border-l-2 border-indigo-500/30 pl-3 italic bg-indigo-500/5 py-1.5 rounded-r"><strong class="text-slate-300">Context:</strong> ${l.why}</div>
        <p class="text-sm text-slate-300 leading-relaxed">${l.text}</p>`;
    document.getElementById('lesson-objective-target').innerHTML = l.objective;
    document.getElementById('lesson-xp-badge').innerText = `+${l.xp} XP`;
    renderModulesOverview(); 
    updateOverallProgress();
}

function renderModulesOverview() {
    let container = document.getElementById('modules-list');
    container.innerHTML = '';
    learningModules.forEach((mod, mIdx) => {
        let count = 0; 
        mod.lessons.forEach((les, lIdx) => { 
            if (playerStats.completedLessons.includes(`${mIdx}_${lIdx}`)) count++; 
        });
        let pct = Math.round((count / mod.lessons.length) * 100);
        container.innerHTML += `
            <div class="p-3 rounded-xl border text-xs flex flex-col gap-2 transition-all ${activeModuleIndex === mIdx ? 'bg-slate-950 border-indigo-500/30' : 'bg-slate-950/40 border-slate-800'}">
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
    document.getElementById('module-selector').value = idx; 
    renderLesson(); 
}

function renderQuests() {
    let container = document.getElementById('quests-container');
    container.innerHTML = '';
    quests.forEach(q => {
        let done = playerStats.completedQuests.includes(q.id);
        let col = q.difficulty === 'Ultimate' ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' : (q.difficulty === 'Medium' ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' : 'text-red-400 bg-red-400/10 border-red-400/20');
        container.innerHTML += `
            <div class="p-4 border rounded-xl space-y-3 ${done ? 'bg-emerald-950/10 border-emerald-500/20' : 'bg-slate-950 border-slate-800'}">
                <div class="flex items-center justify-between"><span class="font-mono text-[10px] uppercase px-2 py-0.5 border rounded-full ${done ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : col}">${done ? '✅ Resolved' : q.difficulty}</span><span class="text-xs font-bold text-indigo-400">+${q.reward} XP</span></div>
                <h4 class="font-bold text-white text-sm">${q.title}</h4>
                <p class="text-slate-400 text-xs">${q.description}</p>
            </div>`;
    });
}

function renderCheatsheet() {
    let container = document.getElementById('cheatsheet-list');
    container.innerHTML = '';
    let query = document.getElementById('cheatsheet-search').value.toLowerCase().trim();
    let keys = Object.keys(commands).sort();
    
    keys.forEach(k => {
        let cmdObj = commands[k];
        if (query !== '' && !k.includes(query) && !cmdObj.desc.toLowerCase().includes(query)) return;
        
        let div = document.createElement('div');
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
function filterCheatsheet() { renderCheatsheet(); }

// --- PROGRESSION ---
const maxGlobalXp = 30000;
function addXp(amount) {
    playerStats.xp += amount;
    let r = "Terminal Newbie";
    if(playerStats.xp >= 30000) r = "Linux Kernel God 👑🌌"; 
    else if(playerStats.xp >= 15000) r = "Global CISO 🛡️"; 
    else if(playerStats.xp >= 5000) r = "Red Team Ops 🥷"; 
    else if(playerStats.xp >= 2000) r = "SysAdmin 💻";
    
    document.getElementById('rank-name').innerText = `Rank: ${r}`;
    document.getElementById('xp-counter').innerText = `${playerStats.xp} / ${maxGlobalXp} XP`;
    document.getElementById('xp-progress').style.width = `${Math.min(100, (playerStats.xp/maxGlobalXp)*100)}%`;
    localStorage.setItem('linux_mega_stats', JSON.stringify(playerStats));
}

function updateOverallProgress() {
    let t = 0; 
    learningModules.forEach(m => t += m.lessons.length);
    document.getElementById('overall-progress-tag').innerText = `Progress: ${Math.round((playerStats.completedLessons.length / t) * 100)}%`;
}

function loadStats() {
    let saved = localStorage.getItem('linux_mega_stats');
    if (saved) { 
        try { 
            playerStats = JSON.parse(saved); 
            if(!playerStats.completedQuests) playerStats.completedQuests = []; 
        } catch(e) {} 
    }
    addXp(0);
}

// --- THE FULLY EXPANDED COMMAND PARSER ENGINE ---
const commands = {
    'help': { 
        desc: 'Show commands.', 
        run: () => Object.keys(commands).sort().map(c => `<span class="text-indigo-400 font-bold">${c.padEnd(10)}</span> - ${commands[c].desc}`).join('<br>') 
    },
    'pwd': { 
        desc: 'Print working directory.', 
        run: () => currentPath 
    },
    'date': { 
        desc: 'Print date.', 
        run: () => new Date().toString() 
    },
    'uptime': { 
        desc: 'System uptime.', 
        run: () => " 19:35:12 up 14 days,  3:12,  1 user,  load average: 0.04, 0.05, 0.01" 
    },
    'whoami': { 
        desc: 'Current user.', 
        run: () => "sysadmin" 
    },
    'ls': {
        desc: 'List contents. Supports -a, -l.',
        run: (args) => {
            let sAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
            let sLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
            let target = args.filter(a => !a.startsWith('-'))[0] || "";
            let res = resolvePath(target);
            
            if (!res) return `<span class="term-err">ls: cannot access '${target}'</span>`;
            if (res.node.type !== 'dir') return target;
            
            let out = [];
            if (sAll) { 
                out.push(sLong ? `drwxr-xr-x 2 ${res.node.owner} 4096 .` : `<span class="term-dir">.</span>`); 
                out.push(sLong ? `drwxr-xr-x 3 root 4096 ..` : `<span class="term-dir">..</span>`); 
            }
            
            for (let key in res.node.contents) {
                let n = res.node.contents[key];
                if(sLong) {
                    out.push(`${n.type==='dir'?'d':'-'}rwxr-xr-x 1 ${n.owner||'root'} ${n.type==='dir'?'4096':'1024'} ${key}${n.type==='dir'?'/':''}`);
                } else {
                    out.push(n.type==='dir' ? `<span class="term-dir">${key}/</span>` : `<span>${key}</span>`);
                }
            }
            return sLong ? out.join("<br>") : out.join("   ");
        }
    },
    'cd': {
        desc: 'Change dir. Use ~ for home, .. for parent.',
        run: (args) => {
            let res = resolvePath(args[0] || "~");
            if (!res || res.node.type !== 'dir') return `<span class="term-err">cd: path not found</span>`;
            currentPath = res.path; 
            document.getElementById('prompt-path').innerText = formatPromptPath(); 
            return "";
        }
    },
    'mkdir': {
        desc: 'Make dir. Supports multiple.',
        run: (args) => {
            if (args.length===0) return "mkdir: missing operand";
            args.forEach(t => {
                let parts = t.split('/'); 
                let n = parts.pop(); 
                let pRes = resolvePath(parts.join('/')||'.');
                if(pRes && pRes.node.type==='dir') {
                    pRes.node.contents[n] = { type:"dir", owner:"sysadmin", contents:{} };
                }
            });
            return "";
        }
    },
    'touch': {
        desc: 'Create file. Supports multiple.',
        run: (args) => {
            args.forEach(t => {
                let parts = t.split('/'); 
                let n = parts.pop(); 
                let pRes = resolvePath(parts.join('/')||'.');
                if(pRes && pRes.node.type==='dir') {
                    pRes.node.contents[n] = { type:"file", owner:"sysadmin", content:"" };
                }
            });
            return "";
        }
    },
    'rm': {
        desc: 'Remove file. Use -rf for dir.',
        run: (args) => {
            let rec = args.includes('-r') || args.includes('-rf');
            let targets = args.filter(a => !a.startsWith('-'));
            targets.forEach(t => {
                let res = resolvePath(t);
                if(res && res.parentNode) {
                    if (res.node.type==='dir' && !rec) return;
                    delete res.parentNode.contents[res.name];
                }
            });
            return "";
        }
    },
    'rmdir': {
        desc: 'Remove empty dir.',
        run: (args) => {
            let res = resolvePath(args[0]);
            if(res && res.node.type==='dir' && Object.keys(res.node.contents).length===0) {
                delete res.parentNode.contents[res.name];
            }
            return "";
        }
    },
    'cp': {
        desc: 'Copy file.',
        run: (args) => {
            let src = resolvePath(args[0]), dest = resolvePath(args[1]);
            if(src && dest && dest.node.type==='dir') {
                dest.node.contents[src.name] = JSON.parse(JSON.stringify(src.node));
            } else if (src) {
                let destParts = args[1].split('/'); 
                let n = destParts.pop(); 
                let pRes = resolvePath(destParts.join('/')||'.');
                if(pRes) {
                    pRes.node.contents[n] = JSON.parse(JSON.stringify(src.node));
                }
            }
            return "";
        }
    },
    'mv': {
        desc: 'Move/Rename.',
        run: (args) => {
            let src = resolvePath(args[0]), dest = resolvePath(args[1]);
            if(src && dest && dest.node.type==='dir') { 
                dest.node.contents[src.name] = src.node; 
                delete src.parentNode.contents[src.name]; 
            } else if (src) {
                let destParts = args[1].split('/'); 
                let n = destParts.pop(); 
                let pRes = resolvePath(destParts.join('/')||'.');
                if(pRes) { 
                    pRes.node.contents[n] = src.node; 
                    delete src.parentNode.contents[src.name]; 
                }
            }
            return "";
        }
    },
    'echo': {
        desc: 'Print or write. Supports > and >>.',
        run: (args) => {
            let apIdx = args.indexOf('>>'), wrIdx = args.indexOf('>');
            if (apIdx !== -1) {
                let text = args.slice(0, apIdx).join(" ").replace(/^['"]|['"]$/g, '');
                let f = resolvePath(args[apIdx+1]);
                if(f && f.node.type==='file') {
                    f.node.content += "\n" + text;
                } else {
                    let p = args[apIdx+1].split('/'); 
                    let n = p.pop(); 
                    let r = resolvePath(p.join('/')||'.');
                    if(r) r.node.contents[n] = {type:"file", content:text};
                }
                return "";
            } else if (wrIdx !== -1) {
                let text = args.slice(0, wrIdx).join(" ").replace(/^['"]|['"]$/g, '');
                let p = args[wrIdx+1].split('/'); 
                let n = p.pop(); 
                let r = resolvePath(p.join('/')||'.');
                if(r) r.node.contents[n] = {type:"file", content:text};
                return "";
            }
            return args.join(" ").replace(/^['"]|['"]$/g, '');
        }
    },
    'cat': { 
        desc: 'Read file.', 
        run: (args) => { 
            let r = resolvePath(args[0]); 
            return (r && r.node.type==='file') ? r.node.content.replace(/\n/g, '<br>') : "Error reading file"; 
        } 
    },
    'grep': { 
        desc: 'Search text.', 
        run: (args) => { 
            let pat = args[0].replace(/['"]/g, ''), r = resolvePath(args[1]); 
            return (r && r.node.type==='file') ? r.node.content.split('\n').filter(x=>x.includes(pat)).join('<br>') : ""; 
        } 
    },
    'systemctl': { 
        desc: 'Service manager.', 
        run: (args) => { 
            if (args[0]==='start') runningServices[args[1]] = true; 
            if(args[0]==='status') return `Active: ${runningServices[args[1]]?'running':'dead'}`; 
            return ""; 
        } 
    },
    'clear': { 
        desc: 'Clear screen.', 
        run: () => "CLEAR_SIGNAL" 
    },
    'wc': { 
        desc: 'Count words.', 
        run: (args) => { 
            let r = resolvePath(args[0]); 
            if(r&&r.node.type==='file'){ 
                let l=r.node.content.split('\n').length, w=r.node.content.split(/\s+/).length; 
                return `${l} ${w} ${r.node.content.length} ${args[0]}`; 
            } 
            return ""; 
        } 
    },
    'head': { 
        desc: 'Read top.', 
        run: (args) => { 
            let r = resolvePath(args[0]); 
            return (r && r.node.type==='file') ? r.node.content.split('\n').slice(0,5).join('<br>') : ""; 
        } 
    },
    'df': { 
        desc: 'Disk space.', 
        run: () => "/dev/sda1  40G  8G  32G  20% /" 
    },
    'free': { 
        desc: 'Memory info.', 
        run: () => "Mem: 16000 4000 12000" 
    },
    'ping': { 
        desc: 'Network test.', 
        run: (args) => `PING ${args[0]} 64 bytes... time=12ms` 
    },
    'netstat': { 
        desc: 'Network connections.', 
        run: () => "tcp 0 0 0.0.0.0:80 LISTEN" 
    },
    'nmap': { 
        desc: 'Port scanner.', 
        run: () => "PORT 80/tcp OPEN http" 
    },
    'strings': { 
        desc: 'Read binary strings.', 
        run: () => "http://evil.com/drop" 
    }
};

const terminalOutput = document.getElementById('terminal-output');
const cmdInput = document.getElementById('cmd-input');

function printToTerminal(htmlContent, isCommand = false) {
    const div = document.createElement('div');
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
            
            if (!playerStats.completedLessons.includes(lId) && l.check(cmdName, args, output)) {
                playerStats.completedLessons.push(lId); 
                addXp(l.xp);
                printToTerminal(`<div class="my-2 p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs">🏆 Objective Accomplished! +${l.xp} XP</div>`);
                if (activeLessonIndex < m.lessons.length - 1) activeLessonIndex++;
                renderLesson();
            }
            
            quests.forEach(q => {
                if (!playerStats.completedQuests.includes(q.id) && q.check(cmdName, args, output)) {
                    playerStats.completedQuests.push(q.id); 
                    addXp(q.reward);
                    printToTerminal(`<div class="my-2 p-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-xs">🔥 Quest Cleared: ${q.title}! +${q.reward} XP</div>`);
                    if(activeTab==='quests') renderQuests();
                }
            });
        } catch (e) { 
            printToTerminal(`<span class="term-err">Execution Error.</span>`); 
        }
    } else { 
        printToTerminal(`<span class="term-err">${cmdName}: command not found</span>`); 
    }
}

function resetSandbox() {
    if(confirm("Hard reset? XP is saved, files are reset.")) { 
        initVfs(); 
        document.getElementById('prompt-path').innerText = formatPromptPath(); 
        printToTerminal("<span class='text-red-400 font-bold'>Reset Complete.</span>"); 
    }
}

cmdInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        let cmd = cmdInput.value; 
        if (cmd.trim() !== '') { 
            commandHistory.push(cmd); 
            historyIndex = commandHistory.length; 
        }
        executeCommand(cmd); 
        cmdInput.value = '';
    } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--; 
            cmdInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) { 
            historyIndex++; 
            cmdInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length; 
            cmdInput.value = ''; 
        }
    }
});

document.getElementById('terminal-container').addEventListener('click', () => cmdInput.focus());

window.onload = () => { 
    initVfs(); 
    loadStats(); 
    renderModulesDropdown(); 
    renderLesson(); 
    cmdInput.focus(); 
};