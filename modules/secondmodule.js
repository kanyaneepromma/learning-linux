// secondmodule.js
// Module 2: File Operations (65 Lessons)

const module2_fileops = {
    name: "2. File Operations (65 Lessons)",
    lessons: [
        // --- DIRECTORY CREATION ---
        { title: "Make Directory", why: "Create a folder.", text: "Type <code>mkdir dir1</code>", objective: "Type mkdir dir1", xp: 10, check: (c,a) => c==="mkdir" && a[0]==="dir1" },
        { title: "Make Another", why: "Create another folder.", text: "Type <code>mkdir dir2</code>", objective: "Type mkdir dir2", xp: 10, check: (c,a) => c==="mkdir" && a[0]==="dir2" },
        { title: "Make Multiple", why: "Space separation creates multiple.", text: "Type <code>mkdir dir3 dir4</code>", objective: "Create dir3 and dir4", xp: 15, check: (c,a) => c==="mkdir" && a.includes("dir3") && a.includes("dir4") },
        { title: "Make Triple", why: "You can make as many as you want.", text: "Type <code>mkdir dir5 dir6 dir7</code>", objective: "Create dir5, dir6, dir7", xp: 20, check: (c,a) => c==="mkdir" && a.includes("dir5") && a.includes("dir7") },
        { title: "Step Inside", why: "Enter your new directory.", text: "Type <code>cd dir1</code>", objective: "Type cd dir1", xp: 10, check: (c,a) => c==="cd" && a[0]==="dir1" },
        { title: "Nested Creation", why: "Create a folder inside a folder.", text: "Type <code>mkdir subdir1</code>", objective: "Type mkdir subdir1", xp: 15, check: (c,a) => c==="mkdir" && a[0]==="subdir1" },
        { title: "Step Back", why: "Return to home.", text: "Type <code>cd ..</code>", objective: "Type cd ..", xp: 10, check: (c,a) => c==="cd" && a[0]===".." },
        { title: "Absolute Creation", why: "Create a folder somewhere else.", text: "Type <code>mkdir /tmp/testdir</code>", objective: "Type mkdir /tmp/testdir", xp: 20, check: (c,a) => c==="mkdir" && a[0]==="/tmp/testdir" },
        { title: "Verify Local", why: "Check local folders.", text: "Type <code>ls</code>", objective: "Type ls", xp: 10, check: (c) => c==="ls" },
        { title: "Verify Remote", why: "Check remote folders.", text: "Type <code>ls /tmp</code>", objective: "Type ls /tmp", xp: 10, check: (c,a) => c==="ls" && a[0]==="/tmp" },

        // --- FILE CREATION (TOUCH) ---
        { title: "Create File", why: "Make an empty file.", text: "Type <code>touch file1.txt</code>", objective: "Type touch file1.txt", xp: 10, check: (c,a) => c==="touch" && a[0]==="file1.txt" },
        { title: "Create Another", why: "Make a second file.", text: "Type <code>touch file2.txt</code>", objective: "Type touch file2.txt", xp: 10, check: (c,a) => c==="touch" && a[0]==="file2.txt" },
        { title: "Touch Multiple", why: "Space separation works here too.", text: "Type <code>touch f3.txt f4.txt</code>", objective: "Create f3 and f4", xp: 15, check: (c,a) => c==="touch" && a.includes("f3.txt") && a.includes("f4.txt") },
        { title: "Touch Triple", why: "Create three files.", text: "Type <code>touch f5.txt f6.txt f7.txt</code>", objective: "Create f5, f6, f7", xp: 20, check: (c,a) => c==="touch" && a.includes("f5.txt") && a.includes("f7.txt") },
        { title: "Nested Touch", why: "Create a file inside a folder.", text: "Type <code>touch dir1/file_in_dir.txt</code>", objective: "Type touch dir1/file_in_dir.txt", xp: 20, check: (c,a) => c==="touch" && a[0]==="dir1/file_in_dir.txt" },
        { title: "Absolute Touch", why: "Create a file far away.", text: "Type <code>touch /tmp/testdir/tempfile.txt</code>", objective: "Type touch /tmp/testdir/tempfile.txt", xp: 25, check: (c,a) => c==="touch" && a[0]==="/tmp/testdir/tempfile.txt" },
        { title: "List Local Files", why: "Verify creation.", text: "Type <code>ls</code>", objective: "Type ls", xp: 10, check: (c) => c==="ls" },
        { title: "List Nested", why: "Verify folder contents.", text: "Type <code>ls dir1</code>", objective: "Type ls dir1", xp: 15, check: (c,a) => c==="ls" && a[0]==="dir1" },
        { title: "List Absolute", why: "Verify remote contents.", text: "Type <code>ls /tmp/testdir</code>", objective: "Type ls /tmp/testdir", xp: 15, check: (c,a) => c==="ls" && a[0]==="/tmp/testdir" },
        { title: "Touch Hidden", why: "Dot prefix makes it hidden.", text: "Type <code>touch .hiddenfile</code>", objective: "Type touch .hiddenfile", xp: 20, check: (c,a) => c==="touch" && a[0]===".hiddenfile" },

        // --- COPYING FILES (CP) ---
        { title: "Copy File", why: "Duplicate a file.", text: "Type <code>cp file1.txt copy1.txt</code>", objective: "Copy file1.txt to copy1.txt", xp: 15, check: (c,a) => c==="cp" && a[0]==="file1.txt" && a[1]==="copy1.txt" },
        { title: "Copy Another", why: "Duplicate again.", text: "Type <code>cp file2.txt copy2.txt</code>", objective: "Copy file2.txt to copy2.txt", xp: 15, check: (c,a) => c==="cp" && a[0]==="file2.txt" && a[1]==="copy2.txt" },
        { title: "Copy to Folder", why: "Send a copy into a directory.", text: "Type <code>cp copy1.txt dir2/</code>", objective: "Copy into dir2/", xp: 20, check: (c,a) => c==="cp" && a[0]==="copy1.txt" && a[1].includes("dir2") },
        { title: "Copy Another to Folder", why: "Muscle memory.", text: "Type <code>cp copy2.txt dir2/</code>", objective: "Copy into dir2/", xp: 20, check: (c,a) => c==="cp" && a[0]==="copy2.txt" && a[1].includes("dir2") },
        { title: "Verify Copy", why: "Check inside dir2.", text: "Type <code>ls dir2</code>", objective: "Type ls dir2", xp: 10, check: (c,a) => c==="ls" && a[0]==="dir2" },
        { title: "Enter Folder", why: "Go into dir2.", text: "Type <code>cd dir2</code>", objective: "Type cd dir2", xp: 10, check: (c,a) => c==="cd" && a[0]==="dir2" },
        { title: "Local Copy Backup", why: "Create a backup.", text: "Type <code>cp copy1.txt backup.txt</code>", objective: "Copy copy1.txt to backup.txt", xp: 15, check: (c,a) => c==="cp" && a[0]==="copy1.txt" && a[1]==="backup.txt" },
        { title: "Verify Backup", why: "Check contents.", text: "Type <code>ls</code>", objective: "Type ls", xp: 10, check: (c) => c==="ls" },
        { title: "Exit Folder", why: "Go back home.", text: "Type <code>cd ..</code>", objective: "Type cd ..", xp: 10, check: (c,a) => c==="cd" && a[0]===".." },
        { title: "Absolute Copy", why: "Copy far away.", text: "Type <code>cp file1.txt /tmp/testdir/</code>", objective: "Copy into /tmp/testdir/", xp: 25, check: (c,a) => c==="cp" && a[0]==="file1.txt" && a[1].includes("/tmp/testdir") },
        { title: "Verify Absolute", why: "Check remote folder.", text: "Type <code>ls /tmp/testdir</code>", objective: "Type ls /tmp/testdir", xp: 15, check: (c,a) => c==="ls" && a[0]==="/tmp/testdir" },
        { title: "Backup F3", why: "One more clone.", text: "Type <code>cp f3.txt f3_bak.txt</code>", objective: "Copy f3.txt", xp: 15, check: (c,a) => c==="cp" && a[0]==="f3.txt" },

        // --- MOVING AND RENAMING (MV) ---
        { title: "Rename File", why: "MV renames files if the target is a file.", text: "Type <code>mv file1.txt renamed1.txt</code>", objective: "Rename file1.txt", xp: 15, check: (c,a) => c==="mv" && a[0]==="file1.txt" && a[1]==="renamed1.txt" },
        { title: "Rename Another", why: "Muscle memory.", text: "Type <code>mv file2.txt renamed2.txt</code>", objective: "Rename file2.txt", xp: 15, check: (c,a) => c==="mv" && a[0]==="file2.txt" && a[1]==="renamed2.txt" },
        { title: "Move to Folder", why: "MV moves if the target is a directory.", text: "Type <code>mv f3.txt dir3/</code>", objective: "Move f3.txt to dir3/", xp: 20, check: (c,a) => c==="mv" && a[0]==="f3.txt" && a[1].includes("dir3") },
        { title: "Move Another", why: "Muscle memory.", text: "Type <code>mv f4.txt dir3/</code>", objective: "Move f4.txt to dir3/", xp: 20, check: (c,a) => c==="mv" && a[0]==="f4.txt" && a[1].includes("dir3") },
        { title: "Verify Move", why: "Check dir3.", text: "Type <code>ls dir3</code>", objective: "Type ls dir3", xp: 10, check: (c,a) => c==="ls" && a[0]==="dir3" },
        { title: "Enter Dir3", why: "Go inside.", text: "Type <code>cd dir3</code>", objective: "Type cd dir3", xp: 10, check: (c,a) => c==="cd" && a[0]==="dir3" },
        { title: "Local Rename", why: "Rename inside a folder.", text: "Type <code>mv f3.txt f3_new.txt</code>", objective: "Rename f3.txt", xp: 15, check: (c,a) => c==="mv" && a[0]==="f3.txt" && a[1]==="f3_new.txt" },
        { title: "Verify Local", why: "Check contents.", text: "Type <code>ls</code>", objective: "Type ls", xp: 10, check: (c) => c==="ls" },
        { title: "Go Home", why: "Exit dir3.", text: "Type <code>cd ..</code>", objective: "Type cd ..", xp: 10, check: (c,a) => c==="cd" && a[0]===".." },
        { title: "Absolute Move", why: "Move a file far away.", text: "Type <code>mv f5.txt /tmp/testdir/</code>", objective: "Move to /tmp/testdir", xp: 25, check: (c,a) => c==="mv" && a[0]==="f5.txt" && a[1].includes("/tmp/testdir") },
        { title: "Verify Absolute", why: "Check remote location.", text: "Type <code>ls /tmp/testdir</code>", objective: "Type ls /tmp/testdir", xp: 15, check: (c,a) => c==="ls" && a[0]==="/tmp/testdir" },
        { title: "Rename F6", why: "One more rename.", text: "Type <code>mv f6.txt f6_moved.txt</code>", objective: "Rename f6.txt", xp: 15, check: (c,a) => c==="mv" && a[0]==="f6.txt" },

        // --- REMOVING FILES (RM) ---
        { title: "Remove File", why: "Delete a file forever.", text: "Type <code>rm copy1.txt</code>", objective: "Type rm copy1.txt", xp: 15, check: (c,a) => c==="rm" && a[0]==="copy1.txt" },
        { title: "Remove Another", why: "Muscle memory.", text: "Type <code>rm copy2.txt</code>", objective: "Type rm copy2.txt", xp: 15, check: (c,a) => c==="rm" && a[0]==="copy2.txt" },
        { title: "Remove Multiple", why: "Space separation works for deletion.", text: "Type <code>rm renamed1.txt renamed2.txt</code>", objective: "Delete both renamed files.", xp: 20, check: (c,a) => c==="rm" && a.includes("renamed1.txt") && a.includes("renamed2.txt") },
        { title: "Remove Triple", why: "Delete three at once.", text: "Type <code>rm f3_bak.txt f6_moved.txt f7.txt</code>", objective: "Delete all three.", xp: 25, check: (c,a) => c==="rm" && a.includes("f3_bak.txt") && a.includes("f7.txt") },
        { title: "Enter Dir2", why: "Time to clean up folders.", text: "Type <code>cd dir2</code>", objective: "Type cd dir2", xp: 10, check: (c,a) => c==="cd" && a[0]==="dir2" },
        { title: "Clean Folder", why: "Delete everything here.", text: "Type <code>rm copy1.txt copy2.txt backup.txt</code>", objective: "Empty the folder.", xp: 25, check: (c,a) => c==="rm" && a.includes("backup.txt") },
        { title: "Go Home", why: "Leave empty folder.", text: "Type <code>cd ..</code>", objective: "Type cd ..", xp: 10, check: (c,a) => c==="cd" && a[0]===".." },
        { title: "Remove Nested", why: "Delete a file inside a folder.", text: "Type <code>rm dir1/file_in_dir.txt</code>", objective: "Type rm dir1/file_in_dir.txt", xp: 20, check: (c,a) => c==="rm" && a[0]==="dir1/file_in_dir.txt" },
        { title: "Remove Absolute", why: "Delete remote file.", text: "Type <code>rm /tmp/testdir/tempfile.txt</code>", objective: "Type rm /tmp/testdir/tempfile.txt", xp: 25, check: (c,a) => c==="rm" && a[0]==="/tmp/testdir/tempfile.txt" },
        { title: "Remove Hidden", why: "Delete a dotfile.", text: "Type <code>rm .hiddenfile</code>", objective: "Type rm .hiddenfile", xp: 15, check: (c,a) => c==="rm" && a[0]===".hiddenfile" },

        // --- REMOVING DIRECTORIES (RMDIR & RM -RF) ---
        { title: "Remove Empty Dir", why: "rmdir only works if empty.", text: "Type <code>rmdir dir2</code>", objective: "Type rmdir dir2", xp: 20, check: (c,a) => c==="rmdir" && a[0]==="dir2" },
        { title: "Remove Another Empty", why: "Muscle memory.", text: "Type <code>rmdir dir4</code>", objective: "Type rmdir dir4", xp: 20, check: (c,a) => c==="rmdir" && a[0]==="dir4" },
        { title: "Remove Multiple Empty", why: "Space separation.", text: "Type <code>rmdir dir5 dir6 dir7</code>", objective: "Delete 5, 6, 7.", xp: 30, check: (c,a) => c==="rmdir" && a.includes("dir5") && a.includes("dir7") },
        { title: "Recursive Remove", why: "rmdir fails on full folders. Use rm -r.", text: "Type <code>rm -r dir3</code>", objective: "Type rm -r dir3", xp: 30, check: (c,a) => c==="rm" && a.includes("-r") && a.includes("dir3") },
        { title: "Force Recursive", why: "The ultimate destroyer flag.", text: "Type <code>rm -rf dir1</code>", objective: "Type rm -rf dir1", xp: 35, check: (c,a) => c==="rm" && a.includes("-rf") && a.includes("dir1") },
        { title: "Absolute Destroyer", why: "Destroy remote folder.", text: "Type <code>rm -rf /tmp/testdir</code>", objective: "Type rm -rf /tmp/testdir", xp: 40, check: (c,a) => c==="rm" && a.includes("-rf") && a.includes("/tmp/testdir") },
        { title: "Verify Destruction", why: "Check current folder.", text: "Type <code>ls</code>", objective: "Type ls", xp: 10, check: (c) => c==="ls" },
        { title: "Create Cleanup Targets", why: "Make junk folders.", text: "Type <code>mkdir junk1 junk2</code>", objective: "Create junk folders.", xp: 20, check: (c,a) => c==="mkdir" && a.includes("junk1") },
        { title: "Double Destroyer", why: "Destroy both at once.", text: "Type <code>rm -rf junk1 junk2</code>", objective: "Use rm -rf on both.", xp: 30, check: (c,a) => c==="rm" && a.includes("-rf") && a.includes("junk1") && a.includes("junk2") },
        { title: "Final Check", why: "Look at your clean directory.", text: "Type <code>ls</code>", objective: "Type ls", xp: 10, check: (c) => c==="ls" },
        { title: "Return to Base", why: "Module 2 complete.", text: "Type <code>cd ~</code>", objective: "Type cd ~", xp: 15, check: (c,a) => c==="cd" && a[0]==="~" }
    ]
};