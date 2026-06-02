// tenthmodule.js
// Module 10: Advanced SysAdmin & Infrastructure (65 Lessons)

const module10_sysadmin = {
    name: "10. SysAdmin Core & Infrastructure (65 Lessons)",
    lessons: [
        // --- PHASE 1: USER & GROUP MANAGEMENT (1-15) ---
        { title: "Create New User", why: "Add a new account to the system.", text: "Type <code>useradd -m developer</code>", objective: "Use useradd -m developer", xp: 15, check: (c,a) => c==="useradd" && a.includes("-m") && a.includes("developer") },
        { title: "Set Password", why: "Assign a password to the new user.", text: "Type <code>passwd developer</code>", objective: "Type passwd developer", xp: 15, check: (c,a) => c==="passwd" && a[0]==="developer" },
        { title: "Verify User Creation", why: "Check the passwd file to ensure the user exists.", text: "Type <code>grep \"developer\" /etc/passwd</code>", objective: "Grep developer from /etc/passwd", xp: 20, check: (c,a) => c==="grep" && a.includes("developer") && a.includes("/etc/passwd") },
        { title: "Create User Group", why: "Create a group to manage multiple users.", text: "Type <code>groupadd devteam</code>", objective: "Type groupadd devteam", xp: 15, check: (c,a) => c==="groupadd" && a[0]==="devteam" },
        { title: "Verify Group", why: "Check the system group file.", text: "Type <code>grep \"devteam\" /etc/group</code>", objective: "Grep devteam from /etc/group", xp: 20, check: (c,a) => c==="grep" && a.includes("devteam") && a.includes("/etc/group") },
        { title: "Add User to Group", why: "Append the user to the supplementary group (-aG).", text: "Type <code>usermod -aG devteam developer</code>", objective: "Use usermod -aG", xp: 25, check: (c,a) => c==="usermod" && a.includes("-aG") && a.includes("devteam") && a.includes("developer") },
        { title: "Change Primary Group", why: "Change a user's default login group (-g).", text: "Type <code>usermod -g devteam developer</code>", objective: "Use usermod -g", xp: 25, check: (c,a) => c==="usermod" && a.includes("-g") && a.includes("devteam") },
        { title: "Lock User Account", why: "Disable an account without deleting it (-L).", text: "Type <code>usermod -L developer</code>", objective: "Use usermod -L", xp: 20, check: (c,a) => c==="usermod" && a.includes("-L") && a.includes("developer") },
        { title: "Unlock User Account", why: "Restore access to the locked account (-U).", text: "Type <code>usermod -U developer</code>", objective: "Use usermod -U", xp: 20, check: (c,a) => c==="usermod" && a.includes("-U") && a.includes("developer") },
        { title: "Change Shell", why: "Change the user's default login shell to /bin/sh.", text: "Type <code>usermod -s /bin/sh developer</code>", objective: "Use usermod -s", xp: 25, check: (c,a) => c==="usermod" && a.includes("-s") && a.includes("/bin/sh") },
        { title: "Change Group Ownership", why: "Change the group ownership of a file to devteam.", text: "Type <code>chgrp devteam notes.txt</code>", objective: "Type chgrp devteam notes.txt", xp: 20, check: (c,a) => c==="chgrp" && a[0]==="devteam" && a[1]==="notes.txt" },
        { title: "Verify File Group", why: "Check that the file's group changed.", text: "Type <code>ls -l notes.txt</code>", objective: "ls -l notes.txt", xp: 15, check: (c,a) => c==="ls" && a.includes("-l") && a.includes("notes.txt") },
        { title: "Delete User", why: "Remove the user from the system.", text: "Type <code>userdel developer</code>", objective: "Type userdel developer", xp: 15, check: (c,a) => c==="userdel" && a[0]==="developer" },
        { title: "Delete User & Home", why: "Remove the user AND their home directory (-r).", text: "Type <code>userdel -r developer</code>", objective: "Use userdel -r", xp: 25, check: (c,a) => c==="userdel" && a.includes("-r") && a.includes("developer") },
        { title: "Delete Group", why: "Remove the group from the system.", text: "Type <code>groupdel devteam</code>", objective: "Type groupdel devteam", xp: 15, check: (c,a) => c==="groupdel" && a[0]==="devteam" },

        // --- PHASE 2: PACKAGE MANAGEMENT (APT & DPKG) (16-30) ---
        { title: "Update Package Lists", why: "Fetch the latest version info from repositories.", text: "Type <code>apt update</code>", objective: "Type apt update", xp: 15, check: (c,a) => c==="apt" && a[0]==="update" },
        { title: "Upgrade Packages", why: "Install available upgrades for all packages.", text: "Type <code>apt upgrade -y</code>", objective: "Type apt upgrade -y", xp: 20, check: (c,a) => c==="apt" && a.includes("upgrade") && a.includes("-y") },
        { title: "Search for Package", why: "Find a package in the repository.", text: "Type <code>apt search htop</code>", objective: "Type apt search htop", xp: 15, check: (c,a) => c==="apt" && a[0]==="search" && a[1]==="htop" },
        { title: "Show Package Info", why: "View details about a specific package.", text: "Type <code>apt show htop</code>", objective: "Type apt show htop", xp: 15, check: (c,a) => c==="apt" && a[0]==="show" && a[1]==="htop" },
        { title: "Install Package", why: "Install the package to your system.", text: "Type <code>apt install htop -y</code>", objective: "Type apt install htop -y", xp: 20, check: (c,a) => c==="apt" && a.includes("install") && a.includes("htop") },
        { title: "Verify Installation", why: "Check where the executable was installed.", text: "Type <code>which htop</code>", objective: "Type which htop", xp: 15, check: (c,a) => c==="which" && a[0]==="htop" },
        { title: "Remove Package", why: "Uninstall the software.", text: "Type <code>apt remove htop -y</code>", objective: "Type apt remove htop -y", xp: 20, check: (c,a) => c==="apt" && a.includes("remove") && a.includes("htop") },
        { title: "Purge Package", why: "Remove software AND its configuration files.", text: "Type <code>apt purge htop -y</code>", objective: "Type apt purge htop -y", xp: 25, check: (c,a) => c==="apt" && a.includes("purge") && a.includes("htop") },
        { title: "Auto-Remove", why: "Clean up orphaned dependencies.", text: "Type <code>apt autoremove -y</code>", objective: "Type apt autoremove -y", xp: 20, check: (c,a) => c==="apt" && a.includes("autoremove") },
        { title: "List Installed", why: "Show all packages installed on the system.", text: "Type <code>apt list --installed</code>", objective: "Type apt list --installed", xp: 20, check: (c,a) => c==="apt" && a.includes("list") && a.includes("--installed") },
        { title: "Download Debian Package", why: "Use wget to download a manual .deb package.", text: "Type <code>wget http://repo.com/tool.deb</code>", objective: "Use wget to download tool.deb", xp: 20, check: (c,a) => c==="wget" && a[0].includes("tool.deb") },
        { title: "Install Manual Package", why: "Use dpkg to install downloaded .deb files directly.", text: "Type <code>dpkg -i tool.deb</code>", objective: "Use dpkg -i tool.deb", xp: 25, check: (c,a) => c==="dpkg" && a.includes("-i") && a.includes("tool.deb") },
        { title: "List Package Contents", why: "See exactly what files the .deb package installed.", text: "Type <code>dpkg -L tool</code>", objective: "Use dpkg -L tool", xp: 20, check: (c,a) => c==="dpkg" && a.includes("-L") && a.includes("tool") },
        { title: "Find Package Owner", why: "Find out which package installed a specific file.", text: "Type <code>dpkg -S /usr/bin/tool</code>", objective: "Use dpkg -S", xp: 25, check: (c,a) => c==="dpkg" && a.includes("-S") && a.includes("/usr/bin/tool") },
        { title: "Remove Manual Package", why: "Uninstall the .deb package.", text: "Type <code>dpkg -r tool</code>", objective: "Use dpkg -r tool", xp: 20, check: (c,a) => c==="dpkg" && a.includes("-r") && a.includes("tool") },

        // --- PHASE 3: PROCESS & JOB CONTROL (31-45) ---
        { title: "System Monitor", why: "Launch the interactive process monitor.", text: "Type <code>top</code>", objective: "Type top", xp: 10, check: (c) => c==="top" },
        { title: "Enhanced Monitor", why: "Launch the colorful, human-readable process monitor.", text: "Type <code>htop</code>", objective: "Type htop", xp: 10, check: (c) => c==="htop" },
        { title: "Background a Process", why: "The & symbol starts a command invisibly in the background.", text: "Type <code>sleep 300 &</code>", objective: "Run sleep 300 in the background", xp: 20, check: (c,a) => c==="sleep" && a.includes("300") && a.includes("&") },
        { title: "List Background Jobs", why: "View processes running in the background of your current terminal.", text: "Type <code>jobs</code>", objective: "Type jobs", xp: 15, check: (c) => c==="jobs" },
        { title: "Foreground a Job", why: "Bring the first background job back to the interactive terminal.", text: "Type <code>fg %1</code>", objective: "Type fg %1", xp: 20, check: (c,a) => c==="fg" && a[0]==="%1" },
        { title: "Suspend Process", why: "Usually done with Ctrl+Z, this pauses the foreground job. Simulate it.", text: "Type <code>kill -STOP %1</code>", objective: "Suspend job 1", xp: 25, check: (c,a) => c==="kill" && a.includes("-STOP") && a.includes("%1") },
        { title: "Resume in Background", why: "Restart a suspended job, but keep it in the background.", text: "Type <code>bg %1</code>", objective: "Type bg %1", xp: 20, check: (c,a) => c==="bg" && a[0]==="%1" },
        { title: "Kill Job", why: "Terminate the background job directly.", text: "Type <code>kill %1</code>", objective: "Type kill %1", xp: 15, check: (c,a) => c==="kill" && a[0]==="%1" },
        { title: "Start Immune Process", why: "nohup keeps a process running even if you close the terminal.", text: "Type <code>nohup sleep 600 &</code>", objective: "Use nohup with sleep and &", xp: 30, check: (c,a) => c==="nohup" && a.includes("sleep") && a.includes("&") },
        { title: "Check Nohup Output", why: "nohup automatically redirects output to nohup.out.", text: "Type <code>cat nohup.out</code>", objective: "Read nohup.out", xp: 10, check: (c,a) => c==="cat" && a[0]==="nohup.out" },
        { title: "Find Process by Name", why: "Get the PID of a specific running command.", text: "Type <code>pgrep sleep</code>", objective: "Type pgrep sleep", xp: 20, check: (c,a) => c==="pgrep" && a[0]==="sleep" },
        { title: "Kill All by Name", why: "Kill every instance of a specific program.", text: "Type <code>killall sleep</code>", objective: "Type killall sleep", xp: 25, check: (c,a) => c==="killall" && a[0]==="sleep" },
        { title: "Verify Killall", why: "Ensure no sleep processes remain.", text: "Type <code>pgrep sleep</code>", objective: "Type pgrep sleep", xp: 15, check: (c,a) => c==="pgrep" && a[0]==="sleep" },
        { title: "Process Tree", why: "View processes in a hierarchical tree layout.", text: "Type <code>pstree</code>", objective: "Type pstree", xp: 15, check: (c) => c==="pstree" },
        { title: "Watch Command", why: "Run a command every 2 seconds and watch the output change.", text: "Type <code>watch df -h</code>", objective: "Type watch df -h", xp: 25, check: (c,a) => c==="watch" && a.includes("df") },

        // --- PHASE 4: ARCHIVING & SECURE TRANSFER (46-55) ---
        { title: "Compress File", why: "Compress a file using the standard gzip format.", text: "Type <code>gzip notes.txt</code>", objective: "Type gzip notes.txt", xp: 15, check: (c,a) => c==="gzip" && a[0]==="notes.txt" },
        { title: "Verify Compression", why: "Notice the file was renamed to .gz.", text: "Type <code>ls -l notes.txt.gz</code>", objective: "List notes.txt.gz", xp: 10, check: (c,a) => c==="ls" && a.includes("notes.txt.gz") },
        { title: "Read Compressed", why: "Read text directly out of a compressed file without unzipping it.", text: "Type <code>zcat notes.txt.gz</code>", objective: "Type zcat notes.txt.gz", xp: 20, check: (c,a) => c==="zcat" && a[0]==="notes.txt.gz" },
        { title: "Decompress File", why: "Unzip the file back to normal.", text: "Type <code>gunzip notes.txt.gz</code>", objective: "Type gunzip notes.txt.gz", xp: 15, check: (c,a) => c==="gunzip" && a[0]==="notes.txt.gz" },
        { title: "Extract Tarball", why: "Extract a downloaded .tar.gz archive.", text: "Type <code>tar -xzvf archive.tar.gz</code>", objective: "Use tar -xzvf", xp: 25, check: (c,a) => c==="tar" && a.includes("-xzvf") && a.includes("archive.tar.gz") },
        { title: "List Tarball Contents", why: "See what is inside an archive without extracting it (-t).", text: "Type <code>tar -tzvf archive.tar.gz</code>", objective: "Use tar -tzvf", xp: 25, check: (c,a) => c==="tar" && a.includes("-tzvf") && a.includes("archive.tar.gz") },
        { title: "Secure Copy Local to Remote", why: "Upload a file over an encrypted SSH connection.", text: "Type <code>scp notes.txt root@10.0.0.99:/root/</code>", objective: "Use scp to upload", xp: 35, check: (c,a) => c==="scp" && a[0]==="notes.txt" && a[1].includes("10.0.0.99") },
        { title: "Secure Copy Remote to Local", why: "Download a file over an encrypted SSH connection.", text: "Type <code>scp root@10.0.0.99:/var/log/syslog ./</code>", objective: "Use scp to download", xp: 35, check: (c,a) => c==="scp" && a[0].includes("10.0.0.99") && a[1]==="./" },
        { title: "Web Get", why: "Download a file from the internet.", text: "Type <code>wget http://linux.org/kernel.zip</code>", objective: "Type wget http://linux.org/kernel.zip", xp: 15, check: (c,a) => c==="wget" && a[0].includes("kernel.zip") },
        { title: "Unzip Archive", why: "Extract standard zip files.", text: "Type <code>unzip kernel.zip</code>", objective: "Type unzip kernel.zip", xp: 15, check: (c,a) => c==="unzip" && a[0]==="kernel.zip" },

        // --- PHASE 5: HARDWARE & STORAGE MANAGEMENT (56-65) ---
        { title: "List Block Devices", why: "See all connected hard drives and partitions.", text: "Type <code>lsblk</code>", objective: "Type lsblk", xp: 15, check: (c) => c==="lsblk" },
        { title: "Partition Table", why: "View detailed partition layouts (Requires sudo).", text: "Type <code>fdisk -l</code>", objective: "Type fdisk -l", xp: 20, check: (c,a) => c==="fdisk" && a.includes("-l") },
        { title: "Create Mount Point", why: "Create an empty folder to attach a drive to.", text: "Type <code>mkdir /mnt/usbdrive</code>", objective: "mkdir /mnt/usbdrive", xp: 15, check: (c,a) => c==="mkdir" && a[0]==="/mnt/usbdrive" },
        { title: "Mount Drive", why: "Attach the /dev/sdb1 partition to your folder.", text: "Type <code>mount /dev/sdb1 /mnt/usbdrive</code>", objective: "Mount /dev/sdb1 to /mnt/usbdrive", xp: 30, check: (c,a) => c==="mount" && a.includes("/dev/sdb1") && a.includes("/mnt/usbdrive") },
        { title: "Verify Mount", why: "Check if the drive shows up in disk free stats.", text: "Type <code>df -h</code>", objective: "Type df -h", xp: 10, check: (c,a) => c==="df" && a.includes("-h") },
        { title: "List Mount Contents", why: "Read the files on the USB drive.", text: "Type <code>ls /mnt/usbdrive</code>", objective: "ls /mnt/usbdrive", xp: 15, check: (c,a) => c==="ls" && a[0]==="/mnt/usbdrive" },
        { title: "Unmount Drive", why: "Safely detach the drive before removing it.", text: "Type <code>umount /mnt/usbdrive</code>", objective: "Type umount /mnt/usbdrive", xp: 25, check: (c,a) => c==="umount" && a[0]==="/mnt/usbdrive" },
        { title: "List CPU Hardware", why: "View processor architecture and cores.", text: "Type <code>lscpu</code>", objective: "Type lscpu", xp: 15, check: (c) => c==="lscpu" },
        { title: "List USB Devices", why: "View connected hardware peripherals.", text: "Type <code>lsusb</code>", objective: "Type lsusb", xp: 15, check: (c) => c==="lsusb" },
        { title: "List All Hardware", why: "View a complete, detailed hardware profile.", text: "Type <code>lshw -short</code>", objective: "Type lshw -short", xp: 25, check: (c,a) => c==="lshw" && a.includes("-short") }
    ]
};