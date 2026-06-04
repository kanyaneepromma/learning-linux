// secondmodule.js
// Module 2: File Operations (65 Lessons)

const module2_fileops = {
  name: "2. File Operations (65 Lessons)",
  lessons: [
    // --- DIRECTORY CREATION ---
    {
      title: "Make Directory",
      why: "In Linux, a directory is actually a special type of file that acts as a container for other files. The <b>mkdir</b> (Make Directory) command tells the kernel to allocate a new container node at your current coordinates.",
      text: "Type <code>mkdir dir1</code>",
      objective: "Type mkdir dir1",
      xp: 10,
      check: (c, a) => c === "mkdir" && a[0] === "dir1",
    },
    {
      title: "Make Another",
      why: "Let's create a second container. Remember, names in Linux are heavily case-sensitive (<b>Dir1</b> is completely different from <b>dir1</b>), and using spaces in names can break automation scripts, so always stick to simple characters or underscores.",
      text: "Type <code>mkdir dir2</code>",
      objective: "Type mkdir dir2",
      xp: 10,
      check: (c, a) => c === "mkdir" && a[0] === "dir2",
    },
    {
      title: "Make Multiple",
      why: "Linux commands are built for maximum efficiency. You don't need to run <code>mkdir</code> multiple times. By separating your arguments with a space, you can pass an infinite number of targets to a single command.",
      text: "Type <code>mkdir dir3 dir4</code>",
      objective: "Create dir3 and dir4",
      xp: 15,
      check: (c, a) =>
        c === "mkdir" && a.includes("dir3") && a.includes("dir4"),
    },
    {
      title: "Make Triple",
      why: "Let's test that efficiency. Tell the kernel to allocate three separate directory nodes simultaneously.",
      text: "Type <code>mkdir dir5 dir6 dir7</code>",
      objective: "Create dir5, dir6, dir7",
      xp: 20,
      check: (c, a) =>
        c === "mkdir" &&
        a.includes("dir5") &&
        a.includes("dir6") &&
        a.includes("dir7"),
    },
    {
      title: "Nested Creation",
      why: "If you try to create a folder inside a folder that doesn't exist yet, Linux will throw an error. The <b>-p</b> (Parents) flag tells the system: 'Create the final folder, but automatically build any missing parent folders required to reach it.'",
      text: "Type <code>mkdir -p nested/dir/structure</code>",
      objective: "Type mkdir -p",
      xp: 30,
      check: (c, a) =>
        c === "mkdir" &&
        a.includes("-p") &&
        a.some((x) => x.includes("nested/dir/structure")),
    },

    // --- FILE CREATION ---
    {
      title: "Touch File",
      why: "The <b>touch</b> command creates a completely blank, empty data container (0 bytes). Historically, this command was used to 'touch' an existing file to update its 'last modified' timestamp without opening it, but today it is mostly used to quickly spawn empty files.",
      text: "Type <code>touch file1.txt</code>",
      objective: "Type touch file1.txt",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "file1.txt",
    },
    {
      title: "Touch Another",
      why: "Spawn a second empty text file. File extensions (like .txt) actually mean nothing to the Linux kernel—they are just there to help humans organize things. Linux only cares about the file's internal magic bytes and permissions.",
      text: "Type <code>touch file2.txt</code>",
      objective: "Type touch file2.txt",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "file2.txt",
    },
    {
      title: "Touch Multiple",
      why: "Just like <code>mkdir</code>, you can spawn multiple files simultaneously by separating them with a space.",
      text: "Type <code>touch file3.txt file4.txt</code>",
      objective: "Create file3 and file4",
      xp: 15,
      check: (c, a) =>
        c === "touch" && a.includes("file3.txt") && a.includes("file4.txt"),
    },
    {
      title: "Touch Triple",
      why: "Generate three more files to prepare for our deletion exercises.",
      text: "Type <code>touch file5.txt file6.txt file7.txt</code>",
      objective: "Create file5, file6, file7",
      xp: 20,
      check: (c, a) =>
        c === "touch" &&
        a.includes("file5.txt") &&
        a.includes("file6.txt") &&
        a.includes("file7.txt"),
    },
    {
      title: "Verify Creation",
      why: "Always verify your environment after altering it. Let's list the directory contents to ensure all your new folders and files were created successfully.",
      text: "Type <code>ls</code>",
      objective: "Type ls",
      xp: 10,
      check: (c) => c === "ls",
    },

    // --- FILE DELETION ---
    {
      title: "Remove File",
      why: "In Windows, when you delete a file, it moves to a Recycle Bin. In Linux, there is no safety net. The <b>rm</b> (Remove) command permanently unlinks the data block pointer from the filesystem. Once it is gone, it is gone forever.",
      text: "Type <code>rm file1.txt</code>",
      objective: "Type rm file1.txt",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "file1.txt",
    },
    {
      title: "Remove Another",
      why: "Permanently delete the second file you created.",
      text: "Type <code>rm file2.txt</code>",
      objective: "Type rm file2.txt",
      xp: 15,
      check: (c, a) => c === "rm" && a[0] === "file2.txt",
    },
    {
      title: "Remove Multiple",
      why: "You can delete multiple files simultaneously. Be extremely careful when doing this on production servers.",
      text: "Type <code>rm file3.txt file4.txt</code>",
      objective: "Delete file3 and file4",
      xp: 20,
      check: (c, a) =>
        c === "rm" && a.includes("file3.txt") && a.includes("file4.txt"),
    },
    {
      title: "Wildcard Deletion",
      why: "The asterisk (<b>*</b>) is a wildcard that means 'Match Anything'. By typing <code>*.txt</code>, you are telling the kernel: 'Instantly delete every single file in this room that ends with .txt, regardless of its name.'",
      text: "Type <code>rm *.txt</code>",
      objective: "Type rm *.txt",
      xp: 30,
      check: (c, a) => c === "rm" && a.includes("*.txt"),
    },
    {
      title: "Verify Deletion",
      why: "List your directory contents to prove that all the .txt files have been annihilated.",
      text: "Type <code>ls</code>",
      objective: "Type ls",
      xp: 10,
      check: (c) => c === "ls",
    },

    // --- DIRECTORY DELETION ---
    {
      title: "Remove Directory",
      why: "Standard `rm` only works on flat files. A directory is a complex container. To delete a directory, you must pass the <b>-r</b> (Recursive) flag, which tells the system to dive inside the folder and delete everything it finds before destroying the folder itself.",
      text: "Type <code>rm -r dir1</code>",
      objective: "Type rm -r dir1",
      xp: 20,
      check: (c, a) => c === "rm" && a.includes("-r") && a.includes("dir1"),
    },
    {
      title: "Remove Another Dir",
      why: "Recursively delete the second folder.",
      text: "Type <code>rm -r dir2</code>",
      objective: "Type rm -r dir2",
      xp: 20,
      check: (c, a) => c === "rm" && a.includes("-r") && a.includes("dir2"),
    },
    {
      title: "Force Remove",
      why: "Sometimes files are write-protected and the system will pause to ask 'Are you sure?' for every single file. The <b>-f</b> (Force) flag suppresses all warnings. <b>-rf</b> is the nuclear option: aggressively delete everything inside with zero hesitation.",
      text: "Type <code>rm -rf dir3 dir4</code>",
      objective: "Type rm -rf dir3 dir4",
      xp: 30,
      check: (c, a) =>
        c === "rm" &&
        a.includes("-rf") &&
        a.includes("dir3") &&
        a.includes("dir4"),
    },
    {
      title: "Absolute Destroyer",
      why: "You can combine absolute paths with the nuclear option. This command instantly annihilates the remote directory structure without needing to navigate to it first.",
      text: "Type <code>rm -rf nested</code>",
      objective: "Type rm -rf nested",
      xp: 40,
      check: (c, a) => c === "rm" && a.includes("-rf") && a.includes("nested"),
    },
    {
      title: "Verify Clean Slate",
      why: "Ensure you only have dir5, dir6, and dir7 left.",
      text: "Type <code>ls</code>",
      objective: "Type ls",
      xp: 10,
      check: (c) => c === "ls",
    },

    // --- COPYING DATA ---
    {
      title: "Copy File",
      why: "The <b>cp</b> (Copy) command requires two arguments: the Source, and the Destination. It reads the raw byte data of the source file and duplicates it entirely into a new container.",
      text: "Type <code>touch original.log && cp original.log clone.log</code>",
      objective: "Create and copy a file",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("cp") &&
        raw.includes("original.log") &&
        raw.includes("clone.log"),
    },
    {
      title: "Copy to Folder",
      why: "If your destination is an existing folder instead of a new file name, Linux will duplicate the file and place it exactly inside that target folder.",
      text: "Type <code>cp clone.log dir5/</code>",
      objective: "Copy into dir5",
      xp: 25,
      check: (c, a) => c === "cp" && a[0] === "clone.log" && a[1] === "dir5/",
    },
    {
      title: "Recursive Copy",
      why: "Just like deletion, you cannot use a standard copy command on a folder. You must use the <b>-r</b> (Recursive) flag to tell the system to dive inside the folder and duplicate every individual item it finds.",
      text: "Type <code>cp -r dir5 dir_backup</code>",
      objective: "Type cp -r",
      xp: 35,
      check: (c, a) =>
        c === "cp" &&
        a.includes("-r") &&
        a.includes("dir5") &&
        a.includes("dir_backup"),
    },
    {
      title: "Verify Clone",
      why: "Look inside the new backup folder to prove the clone was successful.",
      text: "Type <code>ls dir_backup</code>",
      objective: "Type ls dir_backup",
      xp: 15,
      check: (c, a) => c === "ls" && a[0] === "dir_backup",
    },

    // --- MOVING AND RENAMING ---
    {
      title: "Rename File",
      why: "There is no 'rename' command in Linux. To the kernel, renaming a file and moving a file are the exact same operation: you are simply updating the directory pointer. Let's 'move' a file into the exact same room, but hand it a new name.",
      text: "Type <code>mv original.log renamed.log</code>",
      objective: "Type mv original renamed",
      xp: 25,
      check: (c, a) =>
        c === "mv" && a[0] === "original.log" && a[1] === "renamed.log",
    },
    {
      title: "Move File",
      why: "Now let's actually relocate a file. Move the renamed file physically inside of dir6.",
      text: "Type <code>mv renamed.log dir6/</code>",
      objective: "Type mv to dir6",
      xp: 25,
      check: (c, a) => c === "mv" && a[0] === "renamed.log" && a[1] === "dir6/",
    },
    {
      title: "Rename Directory",
      why: "Because renaming is just moving, we use the exact same <b>mv</b> command to rename folders. Let's rename dir6 to 'vault'.",
      text: "Type <code>mv dir6 vault</code>",
      objective: "Type mv dir6 vault",
      xp: 30,
      check: (c, a) => c === "mv" && a[0] === "dir6" && a[1] === "vault",
    },
    {
      title: "Move Directory",
      why: "You don't need a recursive flag to move a directory, because you aren't cloning data; you are just picking up the folder node and dropping it inside another folder node.",
      text: "Type <code>mv vault dir7/</code>",
      objective: "Type mv vault dir7/",
      xp: 35,
      check: (c, a) => c === "mv" && a[0] === "vault" && a[1] === "dir7/",
    },
    {
      title: "Verify Move",
      why: "Check inside dir7 to ensure the vault folder arrived safely.",
      text: "Type <code>ls dir7</code>",
      objective: "Type ls dir7",
      xp: 15,
      check: (c, a) => c === "ls" && a[0] === "dir7",
    },

    // --- ARCHIVING: TAR ---
    {
      title: "Create Archive",
      why: "Before high-speed internet, sysadmins backed up servers onto physical magnetic tape drives. The <b>tar</b> (Tape Archive) command was built for this. It stitches multiple files together into a single continuous stream of data without actually compressing them.<br><br><b>-c</b> means Create, <b>-v</b> is Verbose, <b>-f</b> means File.",
      text: "Type <code>tar -cvf backup_bundle.tar dir_backup/</code>",
      objective: "Create a basic tar archive",
      xp: 40,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-cvf") &&
        a.some((x) => x.includes("backup_bundle.tar")),
    },
    {
      title: "Delete Original",
      why: "Now that we have the archive bundle, delete the original backup folder to save space.",
      text: "Type <code>rm -rf dir_backup</code>",
      objective: "Remove dir_backup",
      xp: 20,
      check: (c, a) =>
        c === "rm" && a.includes("-rf") && a.includes("dir_backup"),
    },
    {
      title: "Extract Archive",
      why: "To unbox an archive, swap the Create flag (-c) for the Extract flag (<b>-x</b>). This rips the contents out of the bundle and rebuilds the files exactly as they were.",
      text: "Type <code>tar -xvf backup_bundle.tar</code>",
      objective: "Extract the tar archive",
      xp: 40,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-xvf") &&
        a.some((x) => x.includes("backup_bundle.tar")),
    },
    {
      title: "Verify Extraction",
      why: "List your files to prove that the dir_backup folder was successfully restored from the archive.",
      text: "Type <code>ls</code>",
      objective: "Type ls",
      xp: 10,
      check: (c) => c === "ls",
    },

    // --- COMPRESSION: GZIP ---
    {
      title: "Compress Archive",
      why: "Standard .tar files don't save space. If you add the <b>-z</b> flag, you instruct the system to run the archive through the Gzip algorithm, mathematically shrinking the byte size of the data to save massive amounts of disk space.",
      text: "Type <code>tar -czvf mega_backup.tar.gz dir7/</code>",
      objective: "Create a compressed tar.gz",
      xp: 50,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-czvf") &&
        a.some((x) => x.includes("mega_backup.tar.gz")),
    },
    {
      title: "Nuke the Room",
      why: "Destroy the extracted folders and the uncompressed tar file, leaving only the highly compressed mega_backup.",
      text: "Type <code>rm -rf dir7 dir_backup backup_bundle.tar clone.log</code>",
      objective: "Delete everything else",
      xp: 35,
      check: (c, a) => c === "rm" && a.includes("-rf") && a.includes("dir7"),
    },
    {
      title: "Extract Compressed",
      why: "To extract a compressed file, you must include both the extract flag (<b>-x</b>) AND the unzip flag (<b>-z</b>).",
      text: "Type <code>tar -xzvf mega_backup.tar.gz</code>",
      objective: "Extract the compressed archive",
      xp: 50,
      check: (c, a) =>
        c === "tar" &&
        a.includes("-xzvf") &&
        a.some((x) => x.includes("mega_backup.tar.gz")),
    },

    // --- REP GAUNTLET ---
    {
      title: "Gauntlet: Make Dir",
      why: "Let's put it all together rapidly. Build a staging folder.",
      text: "Type <code>mkdir staging</code>",
      objective: "Type mkdir",
      xp: 15,
      check: (c, a) => c === "mkdir" && a[0] === "staging",
    },
    {
      title: "Gauntlet: Touch",
      why: "Create a payload.",
      text: "Type <code>touch staging/payload.bin</code>",
      objective: "Type touch",
      xp: 15,
      check: (c, a) => c === "touch" && a[0] === "staging/payload.bin",
    },
    {
      title: "Gauntlet: Copy",
      why: "Clone the payload.",
      text: "Type <code>cp staging/payload.bin staging/clone.bin</code>",
      objective: "Type cp",
      xp: 20,
      check: (c, a) => c === "cp" && a[1] === "staging/clone.bin",
    },
    {
      title: "Gauntlet: Rename",
      why: "Rename the clone.",
      text: "Type <code>mv staging/clone.bin staging/weapon.bin</code>",
      objective: "Type mv",
      xp: 20,
      check: (c, a) => c === "mv" && a[1] === "staging/weapon.bin",
    },
    {
      title: "Gauntlet: Delete",
      why: "Remove the original payload.",
      text: "Type <code>rm staging/payload.bin</code>",
      objective: "Type rm",
      xp: 20,
      check: (c, a) => c === "rm" && a[0] === "staging/payload.bin",
    },
    {
      title: "Gauntlet: Compress",
      why: "Zip the staging folder.",
      text: "Type <code>tar -czvf stage.tar.gz staging/</code>",
      objective: "Type tar -czvf",
      xp: 30,
      check: (c, a) =>
        c === "tar" && a.includes("-czvf") && a.includes("stage.tar.gz"),
    },
    {
      title: "Gauntlet: Nuke",
      why: "Destroy the uncompressed staging folder.",
      text: "Type <code>rm -rf staging</code>",
      objective: "Type rm -rf",
      xp: 25,
      check: (c, a) => c === "rm" && a.includes("-rf") && a.includes("staging"),
    },
    {
      title: "Gauntlet: Extract",
      why: "Unzip the backup.",
      text: "Type <code>tar -xzvf stage.tar.gz</code>",
      objective: "Type tar -xzvf",
      xp: 30,
      check: (c, a) =>
        c === "tar" && a.includes("-xzvf") && a.includes("stage.tar.gz"),
    },

    // --- ADVANCED FLAGS & PIPING PREP ---
    {
      title: "Create Sandbox",
      why: "Create a deep sandbox folder.",
      text: "Type <code>mkdir -p sandbox/level1/level2</code>",
      objective: "Type mkdir -p",
      xp: 25,
      check: (c, a) =>
        c === "mkdir" &&
        a.includes("-p") &&
        a.some((x) => x.includes("sandbox/level1/level2")),
    },
    {
      title: "Move to Sandbox",
      why: "Move the extracted weapon inside the deepest folder.",
      text: "Type <code>mv staging/weapon.bin sandbox/level1/level2/</code>",
      objective: "Type mv nested",
      xp: 35,
      check: (c, a) =>
        c === "mv" && a[0] === "staging/weapon.bin" && a[1].includes("level2"),
    },
    {
      title: "List Recursive",
      why: "The <b>-R</b> flag allows you to list a directory and every single folder inside it recursively.",
      text: "Type <code>ls -R sandbox</code>",
      objective: "Type ls -R",
      xp: 25,
      check: (c, a) => c === "ls" && a.includes("-R") && a.includes("sandbox"),
    },
    {
      title: "Copy Recursive",
      why: "Clone the entire sandbox matrix.",
      text: "Type <code>cp -r sandbox sandbox_bak</code>",
      objective: "Type cp -r",
      xp: 30,
      check: (c, a) =>
        c === "cp" &&
        a.includes("-r") &&
        a.includes("sandbox") &&
        a.includes("sandbox_bak"),
    },
    {
      title: "Force Remove Setup",
      why: "Create a decoy file.",
      text: "Type <code>touch decoy.txt</code>",
      objective: "Type touch decoy.txt",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "decoy.txt",
    },
    {
      title: "Force Remove",
      why: "Delete the decoy using the force flag to override permission prompts.",
      text: "Type <code>rm -f decoy.txt</code>",
      objective: "Type rm -f",
      xp: 20,
      check: (c, a) =>
        c === "rm" && a.includes("-f") && a.includes("decoy.txt"),
    },
    {
      title: "Wipe Environment",
      why: "Annihilate everything to prepare for the text manipulation module.",
      text: "Type <code>rm -rf sandbox sandbox_bak staging stage.tar.gz mega_backup.tar.gz dir7</code>",
      objective: "Type rm -rf everything",
      xp: 50,
      check: (c, a) => c === "rm" && a.includes("-rf") && a.includes("sandbox"),
    },
    {
      title: "Verify Wipe",
      why: "Ensure the workspace is perfectly clean.",
      text: "Type <code>ls</code>",
      objective: "Type ls",
      xp: 10,
      check: (c) => c === "ls",
    },
    {
      title: "Clear Screen",
      why: "Reset the terminal view.",
      text: "Type <code>clear</code>",
      objective: "Type clear",
      xp: 10,
      check: (c) => c === "clear",
    },

    // --- THE APEX ---
    {
      title: "Data Manipulation Master",
      why: "You now understand how the Linux Kernel handles nodes, pointers, archives, and data blocks. You have conquered File Operations.",
      text: 'Type <code>echo "I Control The Data"</code>',
      objective: "Echo the final phrase",
      xp: 150,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Control") && raw.includes("Data"),
    },
  ],
};
