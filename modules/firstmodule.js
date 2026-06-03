// firstmodule.js
// Module 1: Navigation Ninja (65 Lessons)

const module1_navigation = {
  name: "1. Navigation Ninja (65 Lessons)",
  lessons: [
    // --- THE BASICS: PWD & LS ---
    {
      title: "Where Am I?",
      why: "Linux doesn't have a C: drive. Everything lives inside a single, giant tree matrix. The absolute bottom of this tree is called the <b>Root</b>, represented by a single slash: <b>/</b>.<br><br>Right now, you are a player dropped into this maze. Let's find your exact coordinates. <b>pwd</b> stands for Print Working Directory.",
      text: "Type <code>pwd</code>",
      objective: "Type pwd",
      xp: 10,
      check: (c) => c === "pwd",
    },
    {
      title: "Look Around",
      why: "You know your coordinates, but you are standing in the dark. The <b>ls</b> (List) command acts like a flashlight. It queries the system to show you all the visible files and folders physically located in the room you are currently standing in.",
      text: "Type <code>ls</code>",
      objective: "Type ls",
      xp: 10,
      check: (c) => c === "ls",
    },
    {
      title: "Expose Hidden",
      why: "In Linux, if a file or folder name starts with a dot (like <b>.bashrc</b>), it becomes invisible to the standard <code>ls</code> command. These 'dotfiles' usually contain sensitive user configurations.<br><br>By adding the <b>-a</b> (All) flag, you force the flashlight to reveal everything.",
      text: "Type <code>ls -a</code>",
      objective: "Type ls -a",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-a"),
    },
    {
      title: "Long Format",
      why: "Just seeing names isn't enough for a system administrator. By passing the <b>-l</b> (Long format) flag, the system outputs a detailed table showing file permissions (read/write/execute), file owners, file sizes in bytes, and the exact date they were last modified.",
      text: "Type <code>ls -l</code>",
      objective: "Type ls -l",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-l"),
    },
    {
      title: "Combine Flags",
      why: "Linux commands are highly efficient. Instead of typing <code>ls -l -a</code>, you can smash the flags together into a single argument. <b>-la</b> tells the system: 'Give me the detailed table format, and make sure you include the hidden dotfiles.'",
      text: "Type <code>ls -la</code>",
      objective: "Type ls -la",
      xp: 10,
      check: (c, a) =>
        c === "ls" &&
        (a.includes("-la") ||
          a.includes("-al") ||
          (a.includes("-l") && a.includes("-a"))),
    },

    // --- NAVIGATION: CD ---
    {
      title: "Step Forward",
      why: "Because your coordinates say you are in <b>/home/sysadmin</b>, you can only interact with things in this specific room.<br><br>To move to a different room, we use <b>cd</b> (Change Directory). Let's step forward into the projects room.",
      text: "Type <code>cd projects</code>",
      objective: "Type cd projects",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "projects",
    },
    {
      title: "Step Back",
      why: "You hit a dead end. How do you go back?<br><br>Every folder in Linux has a hidden trapdoor called <b>..</b> (two dots). Typing two dots literally means 'The Parent Folder'. Let's step backward into the room that holds the room you are currently in.",
      text: "Type <code>cd ..</code>",
      objective: "Type cd ..",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "..",
    },
    {
      title: "Go Home",
      why: "No matter how deep you get lost in the system, Linux provides a global shortcut to teleport you back to your personal safe zone (your user folder). The tilde symbol <b>~</b> mathematically maps to <code>/home/your_username</code>.",
      text: "Type <code>cd ~</code>",
      objective: "Type cd ~",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "~",
    },
    {
      title: "Absolute Path",
      why: "Moving room by room is slow. If you know exactly where you want to go, you can teleport there instantly using an <b>Absolute Path</b>.<br><br>By starting your command with the Root slash <b>/</b>, you are giving the system the exact, unbroken trail from the bottom of the tree.",
      text: "Type <code>cd /var/log</code>",
      objective: "Type cd /var/log",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/var/log",
    },
    {
      title: "Back to Root",
      why: "Let's teleport to the very floor of the matrix. The Root directory (<b>/</b>) is where the core operating system folders live, like /etc, /bin, /var, and /usr. Everything sprouts from here.",
      text: "Type <code>cd /</code>",
      objective: "Type cd /",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/",
    },
    {
      title: "Relative Step",
      why: "If you don't start your path with a slash, it is a <b>Relative Path</b>. This means the system will look for the folder <i>relative to where you are standing right now</i>. Since you are standing in Root (/), you can just step into 'home'.",
      text: "Type <code>cd home</code>",
      objective: "Type cd home",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "home",
    },
    {
      title: "Relative Step 2",
      why: "Now that you are standing in /home, you can take another relative step forward into the sysadmin folder.",
      text: "Type <code>cd sysadmin</code>",
      objective: "Type cd sysadmin",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "sysadmin",
    },
    {
      title: "Double Back",
      why: "You can chain those double dots together using slashes! <b>../../</b> means 'Go up one level, and then immediately go up another level.' It's a quick double-jump backward.",
      text: "Type <code>cd ../..</code>",
      objective: "Type cd ../..",
      xp: 20,
      check: (c, a) => c === "cd" && a[0] === "../..",
    },
    {
      title: "Quick Swap",
      why: "Linux remembers the last place you were standing in a hidden variable called $OLDPWD. If you use a single dash (<b>-</b>), it swaps you back to your previous location instantly. It's like an Undo button for navigation.",
      text: "Type <code>cd -</code>",
      objective: "Type cd -",
      xp: 20,
      check: (c, a) => c === "cd" && a[0] === "-",
    },
    {
      title: "Tilde Path",
      why: "You can combine the Home shortcut (~) with a deep path. This command translates to: 'Teleport to my home folder, and then step directly into the projects folder from there.'",
      text: "Type <code>cd ~/projects</code>",
      objective: "Type cd ~/projects",
      xp: 20,
      check: (c, a) => c === "cd" && a[0] === "~/projects",
    },
    {
      title: "Tilde Nested",
      why: "Let's try it again. Teleport to your home folder, but step into documents instead.",
      text: "Type <code>cd ~/documents</code>",
      objective: "Type cd ~/documents",
      xp: 30,
      check: (c, a) => c === "cd" && a[0] === "~/documents",
    },
    {
      title: "Tilde Nested 2",
      why: "Jump back to projects using the same absolute-shortcut logic.",
      text: "Type <code>cd ~/projects</code>",
      objective: "Type cd ~/projects",
      xp: 30,
      check: (c, a) => c === "cd" && a[0] === "~/projects",
    },
    {
      title: "Verify Exam",
      why: "You've been jumping around a lot. What are your exact absolute coordinates right now?",
      text: "Type <code>pwd</code>",
      objective: "Type pwd",
      xp: 10,
      check: (c) => c === "pwd",
    },
    {
      title: "Root Reset",
      why: "Teleport back to the absolute base of the system to prepare for the search module.",
      text: "Type <code>cd /</code>",
      objective: "Type cd /",
      xp: 15,
      check: (c, a) => c === "cd" && a[0] === "/",
    },

    // --- SEARCHING: FIND ---
    {
      title: "Global Find Dirs",
      why: "The <b>find</b> command is incredibly powerful because it is recursive—it will search your current folder, and every folder inside that folder, all the way to the bottom. By targeting <b>/</b>, we are searching the entire computer. The <b>-type d</b> flag tells it to only look for Directories (folders).",
      text: "Type <code>find / -type d</code>",
      objective: "Type find / -type d",
      xp: 40,
      check: (c, a) =>
        c === "find" &&
        a.includes("/") &&
        a.includes("-type") &&
        a.includes("d"),
    },
    {
      title: "Global Find Files",
      why: "Now we change the flag to <b>-type f</b>. This tells the search engine to ignore all folders and exclusively return results that are actual Files (like .txt, .bin, or .log files).",
      text: "Type <code>find / -type f</code>",
      objective: "Type find / -type f",
      xp: 40,
      check: (c, a) =>
        c === "find" &&
        a.includes("/") &&
        a.includes("-type") &&
        a.includes("f"),
    },
    {
      title: "Find by Name",
      why: "We can pass a specific string to search for using the <b>-name</b> flag. Here, we are asking Linux to scour the entire hard drive (starting at /) for a file exactly named 'passwd', which contains the system user data.",
      text: 'Type <code>find / -name "passwd"</code>',
      objective: 'Type find / -name "passwd"',
      xp: 45,
      check: (c, a) =>
        c === "find" &&
        a.includes("-name") &&
        a.some((x) => x.includes("passwd")),
    },
    {
      title: "Find by Ext",
      why: "The asterisk (*) is a wildcard. It means 'anything'. By searching for <b>*.txt</b>, you are telling the system: 'I don't care what the name is, as long as it ends with .txt.'",
      text: 'Type <code>find / -name "*.txt"</code>',
      objective: 'Type find / -name "*.txt"',
      xp: 45,
      check: (c, a) =>
        c === "find" &&
        a.includes("-name") &&
        a.some((x) => x.includes("*.txt")),
    },
    {
      title: "Find by Ext 2",
      why: "Let's find all configuration files on the system using the .conf extension wildcard.",
      text: 'Type <code>find / -name "*.conf"</code>',
      objective: 'Type find / -name "*.conf"',
      xp: 30,
      check: (c, a) =>
        c === "find" &&
        a.includes("-name") &&
        a.some((x) => x.includes("*.conf")),
    },
    {
      title: "Find by Ext 3",
      why: "Let's find all the system log files.",
      text: 'Type <code>find / -name "*.log"</code>',
      objective: 'Type find / -name "*.log"',
      xp: 30,
      check: (c, a) =>
        c === "find" &&
        a.includes("-name") &&
        a.some((x) => x.includes("*.log")),
    },
    {
      title: "Find by Ext 4",
      why: "Let's find all the bash scripts on the system (.sh). Hackers often look for these to find automation tasks they can hijack.",
      text: 'Type <code>find / -name "*.sh"</code>',
      objective: 'Type find / -name "*.sh"',
      xp: 30,
      check: (c, a) =>
        c === "find" &&
        a.includes("-name") &&
        a.some((x) => x.includes("*.sh")),
    },

    // --- READING: CAT & GREP ---
    {
      title: "Read File",
      why: "The <b>cat</b> (concatenate) command simply takes the raw contents of a file and dumps it onto your terminal screen. Here, we are reading the absolute path to the system's user list.",
      text: "Type <code>cat /etc/passwd</code>",
      objective: "Type cat /etc/passwd",
      xp: 20,
      check: (c, a) => c === "cat" && a.includes("/etc/passwd"),
    },
    {
      title: "Read Log",
      why: "Let's dump the contents of the main system log to see what the kernel is doing.",
      text: "Type <code>cat /var/log/syslog</code>",
      objective: "Type cat /var/log/syslog",
      xp: 20,
      check: (c, a) => c === "cat" && a.includes("/var/log/syslog"),
    },
    {
      title: "Read Auth",
      why: "Let's dump the authorization log to see who has been logging in (or failing to log in) to our server.",
      text: "Type <code>cat /var/log/auth.log</code>",
      objective: "Type cat /var/log/auth.log",
      xp: 20,
      check: (c, a) => c === "cat" && a.includes("/var/log/auth.log"),
    },
    {
      title: "Grep User",
      why: "If a file is 10,000 lines long, `cat` is useless. <b>grep</b> (Global Regular Expression Print) searches inside files. It filters out everything except the specific word you asked for. Let's pull out only the line containing 'root'.",
      text: 'Type <code>grep "root" /etc/passwd</code>',
      objective: 'Type grep "root" /etc/passwd',
      xp: 40,
      check: (c, a) =>
        c === "grep" &&
        a.some((x) => x.includes("root")) &&
        a.includes("/etc/passwd"),
    },
    {
      title: "Grep Error",
      why: "Let's filter the massive authentication log for any line that contains the word 'failed'. This is how defenders spot brute-force attacks.",
      text: 'Type <code>grep "failed" /var/log/auth.log</code>',
      objective: 'Type grep "failed" /var/log/auth.log',
      xp: 40,
      check: (c, a) =>
        c === "grep" &&
        a.some((x) => x.includes("failed")) &&
        a.includes("/var/log/auth.log"),
    },
    {
      title: "Grep Warning",
      why: "Let's filter the kernel syslog for any line containing the word 'error'.",
      text: 'Type <code>grep "error" /var/log/syslog</code>',
      objective: 'Type grep "error" /var/log/syslog',
      xp: 40,
      check: (c, a) =>
        c === "grep" &&
        a.some((x) => x.includes("error")) &&
        a.includes("/var/log/syslog"),
    },
    {
      title: "Grep IP",
      why: "You can also search for numbers! Let's filter the auth log to track the activity of a specific IP address.",
      text: 'Type <code>grep "10.0.0.99" /var/log/auth.log</code>',
      objective: 'Type grep "10.0.0.99" /var/log/auth.log',
      xp: 40,
      check: (c, a) =>
        c === "grep" &&
        a.some((x) => x.includes("10.0.0.99")) &&
        a.includes("/var/log/auth.log"),
    },
    {
      title: "Grep Case Insensitive",
      why: "By default, grep is case-sensitive ('Fail' is different from 'fail'). Adding the <b>-i</b> flag makes the search case-insensitive, returning both.",
      text: 'Type <code>grep -i "fail" /var/log/auth.log</code>',
      objective: 'Type grep -i "fail"',
      xp: 45,
      check: (c, a) =>
        c === "grep" && a.includes("-i") && a.some((x) => x.includes("fail")),
    },
    {
      title: "Grep Word",
      why: "Sometimes 'root' might show up inside another word (like 'chroot'). The <b>-w</b> flag forces grep to only return matches where your search term is an exact, standalone word.",
      text: 'Type <code>grep -w "root" /etc/passwd</code>',
      objective: 'Type grep -w "root"',
      xp: 45,
      check: (c, a) =>
        c === "grep" && a.includes("-w") && a.some((x) => x.includes("root")),
    },

    // --- MANIPULATION: MKDIR, TOUCH, RM, CP, MV ---
    {
      title: "Make Directory",
      why: "Now we start altering the environment. <b>mkdir</b> stands for Make Directory. This creates a brand new folder node in the directory tree exactly where you are standing.",
      text: "Type <code>mkdir scripts</code>",
      objective: "Type mkdir scripts",
      xp: 20,
      check: (c, a) => c === "mkdir" && a[0] === "scripts",
    },
    {
      title: "Make Nested Dir",
      why: "If you want to create a folder inside a folder inside a folder, you use the <b>-p</b> (Parents) flag. It tells the system to automatically build all the required 'parent' folders to make the path valid.",
      text: "Type <code>mkdir -p a/b/c</code>",
      objective: "Type mkdir -p a/b/c",
      xp: 30,
      check: (c, a) =>
        c === "mkdir" && a.includes("-p") && a.some((x) => x.includes("a/b/c")),
    },
    {
      title: "Make Test Dir",
      why: "Create a testing folder.",
      text: "Type <code>mkdir test_dir</code>",
      objective: "Type mkdir test_dir",
      xp: 15,
      check: (c, a) => c === "mkdir" && a[0] === "test_dir",
    },
    {
      title: "Make Hack Dir",
      why: "Create a workspace for our payloads.",
      text: "Type <code>mkdir exploit</code>",
      objective: "Type mkdir exploit",
      xp: 15,
      check: (c, a) => c === "mkdir" && a[0] === "exploit",
    },
    {
      title: "Touch File",
      why: "The <b>touch</b> command creates a completely blank, empty file. Historically, it was used to 'touch' an existing file to update its 'last modified' timestamp without changing its contents.",
      text: "Type <code>touch payload.sh</code>",
      objective: "Type touch payload.sh",
      xp: 20,
      check: (c, a) => c === "touch" && a[0] === "payload.sh",
    },
    {
      title: "Touch Note",
      why: "Create an empty text file.",
      text: "Type <code>touch note.txt</code>",
      objective: "Type touch note.txt",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "note.txt",
    },
    {
      title: "Touch Log",
      why: "Create an empty log file.",
      text: "Type <code>touch debug.log</code>",
      objective: "Type touch debug.log",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "debug.log",
    },
    {
      title: "Touch Config",
      why: "Create an empty configuration file.",
      text: "Type <code>touch config.ini</code>",
      objective: "Type touch config.ini",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "config.ini",
    },
    {
      title: "Remove File",
      why: "The <b>rm</b> (remove) command permanently deletes files. There is no recycling bin in the Linux terminal. Once it's gone, it's gone.",
      text: "Type <code>rm note.txt</code>",
      objective: "Type rm note.txt",
      xp: 20,
      check: (c, a) => c === "rm" && a[0] === "note.txt",
    },
    {
      title: "Remove Config",
      why: "Delete the configuration file you just created.",
      text: "Type <code>rm config.ini</code>",
      objective: "Type rm config.ini",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "config.ini",
    },
    {
      title: "Remove Dir",
      why: "Standard `rm` only works on files. If you want to delete a folder, you must add the <b>-r</b> (recursive) flag, which tells the system to dive into the folder and delete everything inside it first.",
      text: "Type <code>rm -r test_dir</code>",
      objective: "Type rm -r test_dir",
      xp: 30,
      check: (c, a) =>
        c === "rm" && a.includes("-r") && a.some((x) => x.includes("test_dir")),
    },
    {
      title: "Remove Nested",
      why: "The <b>-f</b> (force) flag tells the system not to ask you for confirmation on every single file. Combining them into <b>-rf</b> is the nuclear option. It aggressively deletes folders and everything inside them without mercy.",
      text: "Type <code>rm -rf a</code>",
      objective: "Type rm -rf a",
      xp: 40,
      check: (c, a) => c === "rm" && a.includes("-rf") && a.includes("a"),
    },
    {
      title: "Copy File",
      why: "The <b>cp</b> (copy) command requires two arguments: the source file, and the destination name. It creates a duplicate clone of the data.",
      text: "Type <code>cp payload.sh payload_backup.sh</code>",
      objective: "Type cp payload.sh payload_backup.sh",
      xp: 25,
      check: (c, a) =>
        c === "cp" && a[0] === "payload.sh" && a[1] === "payload_backup.sh",
    },
    {
      title: "Copy Log",
      why: "Create a backup of our debug log before we modify it.",
      text: "Type <code>cp debug.log debug.bak</code>",
      objective: "Type cp debug.log debug.bak",
      xp: 20,
      check: (c, a) =>
        c === "cp" && a[0] === "debug.log" && a[1] === "debug.bak",
    },
    {
      title: "Move File",
      why: "The <b>mv</b> (move) command physically relocates a file. Here, we are throwing the payload script inside the exploit folder.",
      text: "Type <code>mv payload.sh exploit/</code>",
      objective: "Type mv payload.sh exploit/",
      xp: 25,
      check: (c, a) =>
        c === "mv" && a[0] === "payload.sh" && a[1] === "exploit/",
    },
    {
      title: "Rename File",
      why: "There is no 'rename' command in standard Linux. Renaming is literally just <b>moving</b> a file into the exact same folder, but handing it a new name on arrival.",
      text: "Type <code>mv debug.bak debug_old.log</code>",
      objective: "Type mv debug.bak debug_old.log",
      xp: 30,
      check: (c, a) =>
        c === "mv" && a[0] === "debug.bak" && a[1] === "debug_old.log",
    },

    // --- ARCHIVING: TAR ---
    {
      title: "Tar Create",
      why: "<b>tar</b> (Tape Archive) bundles multiple files and folders into a single file. <b>-c</b> means Create. <b>-v</b> means Verbose (show me what you're doing). <b>-f</b> means 'save it to this filename'.",
      text: "Type <code>tar -cvf backup.tar exploit/</code>",
      objective: "Type tar -cvf",
      xp: 40,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-cvf") &&
        a.some((x) => x.includes("backup.tar")),
    },
    {
      title: "Tar Extract",
      why: "To unbox an archive, swap the Create flag (-c) for the Extract flag (<b>-x</b>). This rips the contents out of the bundle into your current folder.",
      text: "Type <code>tar -xvf backup.tar</code>",
      objective: "Type tar -xvf",
      xp: 40,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-xvf") &&
        a.some((x) => x.includes("backup.tar")),
    },
    {
      title: "Tar Gzip",
      why: "Standard .tar files don't save space; they just bundle things together. If you add the <b>-z</b> flag, you instruct the system to compress the bundle using Gzip, saving massive amounts of disk space.",
      text: "Type <code>tar -czvf backup.tar.gz exploit/</code>",
      objective: "Type tar -czvf",
      xp: 50,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-czvf") &&
        a.some((x) => x.includes("backup.tar.gz")),
    },

    // --- DATA INSPECTION: HEAD, TAIL, WC ---
    {
      title: "Head Read",
      why: "Sometimes you just need to check the formatting of a file without dumping 10,000 lines onto your screen. The <b>head</b> command reads only the very top. <b>-n 5</b> limits it to 5 lines.",
      text: "Type <code>head -n 5 /etc/passwd</code>",
      objective: "Type head -n 5",
      xp: 25,
      check: (c, a) => c === "head" && a.includes("-n") && a.includes("5"),
    },
    {
      title: "Head Log",
      why: "Read the top 3 lines of the syslog to see when it was created.",
      text: "Type <code>head -n 3 /var/log/syslog</code>",
      objective: "Type head -n 3",
      xp: 20,
      check: (c, a) =>
        c === "head" &&
        a.includes("-n") &&
        a.includes("3") &&
        a.includes("/var/log/syslog"),
    },
    {
      title: "Tail Read",
      why: "Conversely, <b>tail</b> reads the very bottom of a file. This is perfect for logs, because the newest events are always appended to the bottom.",
      text: "Type <code>tail -n 5 /etc/passwd</code>",
      objective: "Type tail -n 5",
      xp: 25,
      check: (c, a) => c === "tail" && a.includes("-n") && a.includes("5"),
    },
    {
      title: "Tail Follow",
      why: "The <b>-f</b> (follow) flag is one of the most used commands in sysadmin history. It locks onto the bottom of a file and live-streams any new text that gets added in real-time.",
      text: "Type <code>tail -f /var/log/syslog</code>",
      objective: "Type tail -f",
      xp: 40,
      check: (c, a) =>
        c === "tail" && a.includes("-f") && a.includes("/var/log/syslog"),
    },
    {
      title: "Word Count Lines",
      why: "The <b>wc</b> (Word Count) tool calculates data sizes. When you pass the <b>-l</b> flag, it counts exactly how many lines are in the document.",
      text: "Type <code>wc -l /etc/passwd</code>",
      objective: "Type wc -l",
      xp: 25,
      check: (c, a) =>
        c === "wc" && a.includes("-l") && a.includes("/etc/passwd"),
    },
    {
      title: "Word Count Words",
      why: "Passing the <b>-w</b> flag counts every individual word.",
      text: "Type <code>wc -w /etc/passwd</code>",
      objective: "Type wc -w",
      xp: 25,
      check: (c, a) =>
        c === "wc" && a.includes("-w") && a.includes("/etc/passwd"),
    },
    {
      title: "Word Count Bytes",
      why: "Passing the <b>-c</b> flag counts the raw byte size of the data.",
      text: "Type <code>wc -c /etc/passwd</code>",
      objective: "Type wc -c",
      xp: 25,
      check: (c, a) =>
        c === "wc" && a.includes("-c") && a.includes("/etc/passwd"),
    },

    // --- SYSTEM UTILS ---
    {
      title: "History Check",
      why: "The terminal records every command you type into a hidden file called .bash_history. The <b>history</b> command prints that list out. Hackers often check this to see if an admin accidentally typed a password.",
      text: "Type <code>history</code>",
      objective: "Type history",
      xp: 15,
      check: (c) => c === "history",
    },
    {
      title: "Clear Screen",
      why: "Your screen is getting cluttered. The <b>clear</b> command wipes the terminal display, giving you a fresh, clean workspace without altering any data.",
      text: "Type <code>clear</code>",
      objective: "Type clear",
      xp: 10,
      check: (c) => c === "clear",
    },
    {
      title: "Final Exam",
      why: "You now understand how the Linux matrix is structured, how to navigate its rooms, and how to manipulate its files. The basics are conquered.",
      text: 'Type <code>echo "Navigation Mastered"</code>',
      objective: "Echo the final phrase",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("Navigation") &&
        raw.includes("Mastered"),
    },
  ],
};
