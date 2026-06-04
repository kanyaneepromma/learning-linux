// fifteenthmodule.js
// Module 15: Kernel Internals & Reverse Engineering (65 Lessons)

const module15_kernel = {
  name: "15. Kernel & Reverse Eng (65 Lessons)",
  lessons: [
    // --- PHASE 1: HARDWARE & BOOT RING BUFFER (1-12) ---
    {
      title: "Read Kernel Ring Buffer",
      why: "The Linux Kernel boots before the filesystem or logging daemons exist. It writes its initialization sequence directly to a fixed-size memory array called the Ring Buffer. <b>dmesg</b> reads this raw memory block, revealing hardware mapping and driver loading.",
      text: "Type <code>dmesg</code>",
      objective: "Type dmesg",
      xp: 15,
      check: (c) => c === "dmesg",
    },
    {
      title: "Human Readable Timestamps",
      why: "The kernel ring buffer logs time in 'seconds since boot'. The <b>-T</b> flag translates this raw kernel uptime integer into a human-readable local date and time format.",
      text: "Type <code>dmesg -T</code>",
      objective: "Type dmesg -T",
      xp: 20,
      check: (c, a) => c === "dmesg" && a.includes("-T"),
    },
    {
      title: "Hunt Hardware Issues",
      why: "If a malicious USB ('Rubber Ducky') was plugged into a server, the kernel interrupts will log it. We pipe the ring buffer into grep to isolate USB hardware enumerations.",
      text: "Type <code>dmesg | grep -i usb</code>",
      objective: "Grep usb from dmesg",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("dmesg") && raw.includes("grep") && raw.includes("usb"),
    },
    {
      title: "Hunt Network Interfaces",
      why: "Check how the kernel loaded your physical network card. This reveals if a driver failed, causing a network outage at the lowest possible hardware layer.",
      text: "Type <code>dmesg | grep -i eth</code>",
      objective: "Grep eth from dmesg",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("dmesg") && raw.includes("grep") && raw.includes("eth"),
    },
    {
      title: "Clear Ring Buffer",
      why: "Before executing a custom exploit that might cause a kernel panic, researchers clear the ring buffer using the <b>-c</b> flag to ensure they only capture the logs from their specific attack.",
      text: "Type <code>dmesg -c</code>",
      objective: "Type dmesg -c",
      xp: 25,
      check: (c, a) => c === "dmesg" && a.includes("-c"),
    },
    {
      title: "List Kernel Modules",
      why: "The Linux Kernel is modular. Instead of compiling every driver into the core brain, it loads Loadable Kernel Modules (LKMs) dynamically. <b>lsmod</b> lists all LKMs currently injected into kernel space.",
      text: "Type <code>lsmod</code>",
      objective: "Type lsmod",
      xp: 15,
      check: (c) => c === "lsmod",
    },
    {
      title: "Filter Kernel Modules",
      why: "Search the live kernel memory map to see if the Bluetooth stack module is actively loaded and exposing an attack surface.",
      text: "Type <code>lsmod | grep bluetooth</code>",
      objective: "Grep bluetooth from lsmod",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("lsmod") &&
        raw.includes("grep") &&
        raw.includes("bluetooth"),
    },
    {
      title: "Module Information",
      why: "The <b>modinfo</b> command extracts the metadata from a compiled kernel module (`.ko` file), showing its author, license, and the exact hardware it is designed to interface with.",
      text: "Type <code>modinfo bluetooth</code>",
      objective: "Type modinfo bluetooth",
      xp: 20,
      check: (c, a) => c === "modinfo" && a[0] === "bluetooth",
    },
    {
      title: "Inject Kernel Module",
      why: "The <b>modprobe</b> command safely injects a compiled kernel module into live memory, resolving any dependency chains dynamically. Rootkits are often installed using this exact mechanism.",
      text: "Type <code>modprobe dummy_module</code>",
      objective: "Type modprobe dummy_module",
      xp: 30,
      check: (c, a) => c === "modprobe" && a[0] === "dummy_module",
    },
    {
      title: "Remove Kernel Module",
      why: "The <b>rmmod</b> command unlinks the module from the kernel and purges it from RAM. Use this to disable vulnerable drivers or forcefully eject a detected rootkit.",
      text: "Type <code>rmmod dummy_module</code>",
      objective: "Type rmmod dummy_module",
      xp: 30,
      check: (c, a) => c === "rmmod" && a[0] === "dummy_module",
    },
    {
      title: "Read All Kernel Params",
      why: "The `/proc/sys` directory holds virtual files that control the live kernel parameters. <b>sysctl -a</b> dumps this massive configuration array, showing you the exact tuning of the system's brain.",
      text: "Type <code>sysctl -a</code>",
      objective: "Type sysctl -a",
      xp: 20,
      check: (c, a) => c === "sysctl" && a.includes("-a"),
    },
    {
      title: "Read IP Forwarding",
      why: "Check if the kernel is allowed to route packets between two different network cards. If this is 1, the machine can be used as a router (or a Man-in-the-Middle proxy).",
      text: "Type <code>sysctl net.ipv4.ip_forward</code>",
      objective: "Type sysctl net.ipv4.ip_forward",
      xp: 25,
      check: (c, a) => c === "sysctl" && a[0] === "net.ipv4.ip_forward",
    },

    // --- PHASE 2: SYSTEM CALLS & DYNAMIC ANALYSIS (13-25) ---
    {
      title: "Enable IP Forwarding",
      why: "The <b>-w</b> flag writes a new value directly into the live kernel RAM. We are dynamically turning this server into a network router without rebooting.",
      text: "Type <code>sysctl -w net.ipv4.ip_forward=1</code>",
      objective: "Write to net.ipv4.ip_forward",
      xp: 30,
      check: (c, a) =>
        c === "sysctl" &&
        a.includes("-w") &&
        a.includes("net.ipv4.ip_forward=1"),
    },
    {
      title: "Reload Sysctl Config",
      why: "RAM changes are volatile. If you edit the `/etc/sysctl.conf` file for permanence, the <b>-p</b> flag commands the kernel to parse the file and apply the rules instantly.",
      text: "Type <code>sysctl -p</code>",
      objective: "Type sysctl -p",
      xp: 25,
      check: (c, a) => c === "sysctl" && a.includes("-p"),
    },
    {
      title: "Strace Basics",
      why: "Software cannot interact with hardware directly; it must ask the kernel via a 'System Call'. <b>strace</b> intercepts and logs every single syscall an application makes, exposing its hidden behavior.",
      text: "Type <code>strace ls</code>",
      objective: "Trace the ls command",
      xp: 30,
      check: (c, a) => c === "strace" && a[0] === "ls",
    },
    {
      title: "Strace Summary",
      why: "The <b>-c</b> flag counts the syscalls instead of printing them individually. This generates a clean statistical table, showing you if an application spends 90% of its time waiting for the network or reading files.",
      text: "Type <code>strace -c ls</code>",
      objective: "Count syscalls for ls",
      xp: 35,
      check: (c, a) => c === "strace" && a.includes("-c") && a.includes("ls"),
    },
    {
      title: "Strace Filter Open",
      why: "Malware often reads your SSH keys. By passing <b>-e open</b>, we instruct `strace` to ignore everything except the specific syscall used to open files, instantly revealing what the program is secretly reading.",
      text: "Type <code>strace -e open ls</code>",
      objective: "Trace only 'open' calls",
      xp: 40,
      check: (c, a) =>
        c === "strace" &&
        a.includes("-e") &&
        a.includes("open") &&
        a.includes("ls"),
    },
    {
      title: "Strace Network Calls",
      why: "Filter for the 'network' syscall class. This instantly flags if an innocent-looking program (like a calculator) is secretly opening sockets and phoning home to a Command and Control server.",
      text: "Type <code>strace -e trace=network ping -c 1 localhost</code>",
      objective: "Trace network calls",
      xp: 45,
      check: (c, a) =>
        c === "strace" &&
        a.includes("-e") &&
        a.includes("trace=network") &&
        a.includes("ping"),
    },
    {
      title: "Ltrace Basics",
      why: "While `strace` watches the kernel, <b>ltrace</b> watches Shared Libraries. It intercepts calls made to the `glibc` library (like `strcmp` or `malloc`), revealing how the application processes data internally.",
      text: "Type <code>ltrace ls</code>",
      objective: "Trace library calls for ls",
      xp: 35,
      check: (c, a) => c === "ltrace" && a[0] === "ls",
    },
    {
      title: "Identify File Type",
      why: "Before reverse engineering, you must know what you are looking at. The <b>file</b> command reads the magic bytes at the absolute beginning of the file to determine if it is an ELF binary, a bash script, or a zipped archive.",
      text: "Type <code>file /bin/bash</code>",
      objective: "Identify /bin/bash",
      xp: 15,
      check: (c, a) => c === "file" && a[0] === "/bin/bash",
    },
    {
      title: "List Dynamic Dependencies",
      why: "Compiled programs don't contain all their own code; they link to system libraries dynamically. <b>ldd</b> prints the memory addresses of all the `.so` (Shared Object) files the binary requires to run.",
      text: "Type <code>ldd /bin/bash</code>",
      objective: "List dependencies for /bin/bash",
      xp: 20,
      check: (c, a) => c === "ldd" && a[0] === "/bin/bash",
    },
    {
      title: "Extract Strings",
      why: "The <b>strings</b> command scans raw binary code and extracts any sequence of printable ASCII characters. Reverse engineers use this to instantly find hardcoded IP addresses, passwords, or error messages left by the developer.",
      text: "Type <code>strings /bin/bash | head -n 10</code>",
      objective: "Extract strings from /bin/bash",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("strings") &&
        raw.includes("/bin/bash") &&
        raw.includes("head"),
    },

    // --- PHASE 3: STATIC BINARY ANALYSIS (26-40) ---
    {
      title: "Simulate Malware File",
      why: "We create a dummy binary file to simulate analyzing a piece of malware or a vulnerable C program.",
      text: "Type <code>touch exploit.bin</code>",
      objective: "Create exploit.bin",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "exploit.bin",
    },
    {
      title: "Read ELF Header",
      why: "Linux executables use the ELF (Executable and Linkable Format) structure. The <b>readelf -h</b> command parses the file's primary header, revealing its architecture (32/64 bit) and its exact Entry Point memory address.",
      text: "Type <code>readelf -h ./exploit.bin</code>",
      objective: "Read ELF header",
      xp: 35,
      check: (c, a) =>
        c === "readelf" && a.includes("-h") && a.includes("./exploit.bin"),
    },
    {
      title: "Read ELF Sections",
      why: "An ELF file is divided into Sections (like `.text` for code, and `.data` for variables). The <b>-S</b> flag dumps the Section Header Table, showing exactly how the binary organizes its memory.",
      text: "Type <code>readelf -S ./exploit.bin</code>",
      objective: "Read ELF sections",
      xp: 35,
      check: (c, a) =>
        c === "readelf" && a.includes("-S") && a.includes("./exploit.bin"),
    },
    {
      title: "Read ELF Symbols",
      why: "Symbols are the names of variables and functions (like `main()` or `printf()`). The <b>-s</b> flag extracts the Symbol Table, allowing you to see exactly what functions the developer wrote.",
      text: "Type <code>readelf -s ./exploit.bin</code>",
      objective: "Read ELF symbols",
      xp: 35,
      check: (c, a) =>
        c === "readelf" && a.includes("-s") && a.includes("./exploit.bin"),
    },
    {
      title: "Objdump Basics",
      why: "<b>objdump</b> is a powerful static analysis tool. We use it to disassemble the binary, translating the raw machine code (hex bytes) back into human-readable Assembly language instructions.",
      text: "Type <code>objdump -d ./exploit.bin</code>",
      objective: "Disassemble the binary",
      xp: 40,
      check: (c, a) =>
        c === "objdump" && a.includes("-d") && a.includes("./exploit.bin"),
    },
    {
      title: "Objdump Intel Syntax",
      why: "By default, objdump uses AT&T Assembly syntax. Most exploit developers prefer Intel syntax because the destination register is listed first, making it much easier to read the data flow.",
      text: "Type <code>objdump -d -M intel ./exploit.bin</code>",
      objective: "Disassemble in Intel syntax",
      xp: 40,
      check: (c, a) =>
        c === "objdump" &&
        a.includes("-d") &&
        a.includes("-M") &&
        a.includes("intel") &&
        a.includes("./exploit.bin"),
    },
    {
      title: "Objdump All Headers",
      why: "The <b>-x</b> flag dumps all available header information from the binary, providing a massive, comprehensive overview of its layout before you begin debugging.",
      text: "Type <code>objdump -x ./exploit.bin</code>",
      objective: "Dump all headers",
      xp: 35,
      check: (c, a) =>
        c === "objdump" && a.includes("-x") && a.includes("./exploit.bin"),
    },
    {
      title: "Objdump Specific Section",
      why: "The `.rodata` section holds Read-Only data, like hardcoded passwords or format strings. We instruct objdump to only display the contents of this specific memory section.",
      text: "Type <code>objdump -s -j .rodata ./exploit.bin</code>",
      objective: "Dump .rodata section",
      xp: 45,
      check: (c, a) =>
        c === "objdump" &&
        a.includes("-s") &&
        a.includes("-j") &&
        a.includes(".rodata") &&
        a.includes("./exploit.bin"),
    },
    {
      title: "Grep Objdump",
      why: "To find out exactly where the program starts executing, we pipe the disassembly through grep and hunt for the 'main' function wrapper.",
      text: 'Type <code>objdump -d ./exploit.bin | grep "<main>:"</code>',
      objective: "Grep main function",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("objdump") && raw.includes("grep") && raw.includes("main"),
    },
    {
      title: "Hexdump the Binary",
      why: "Sometimes you need to patch a binary manually. The <b>xxd</b> command converts the binary into a pure hexadecimal grid, allowing you to edit the raw opcodes directly.",
      text: "Type <code>xxd ./exploit.bin | head -n 5</code>",
      objective: "Hexdump the binary",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("xxd") &&
        raw.includes("./exploit.bin") &&
        raw.includes("head"),
    },

    // --- PHASE 4: GDB DYNAMIC DEBUGGING (41-65) ---
    {
      title: "Start GDB",
      why: "The GNU Debugger (GDB) allows you to pause a program while it is running, inspect its RAM, and alter its variables on the fly. It is the ultimate tool for Exploit Development.",
      text: "Type <code>gdb ./exploit.bin</code>",
      objective: "Start GDB",
      xp: 30,
      check: (c, a) => c === "gdb" && a[0] === "./exploit.bin",
    },
    {
      title: "Quiet GDB",
      why: "GDB prints a massive copyright message on startup. The <b>-q</b> (Quiet) flag suppresses this noise, dropping you cleanly into the debugging prompt.",
      text: "Type <code>gdb -q ./exploit.bin</code>",
      objective: "Start GDB quietly",
      xp: 35,
      check: (c, a) =>
        c === "gdb" && a.includes("-q") && a.includes("./exploit.bin"),
    },
    {
      title: "Set Breakpoint",
      why: "If you just run the program, it will finish instantly. A Breakpoint tells the CPU: 'Execute instructions until you hit the `main` function, then freeze completely so I can inspect the memory.'",
      text: 'Type <code>gdb -ex "break main" -batch ./exploit.bin</code>',
      objective: "Set a breakpoint",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("break main"),
    },
    {
      title: "Run Program",
      why: "Once the breakpoint is set, you instruct the debugger to spawn the child process and begin executing the assembly instructions.",
      text: 'Type <code>gdb -ex "run" -batch ./exploit.bin</code>',
      objective: "Run the binary",
      xp: 45,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("run"),
    },
    {
      title: "Step Instruction",
      why: "The program is frozen at `main`. The `next` command instructs the CPU to execute exactly one line of source code and immediately freeze again.",
      text: 'Type <code>gdb -ex "next" -batch ./exploit.bin</code>',
      objective: "Step next",
      xp: 45,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("next"),
    },
    {
      title: "Print Variable",
      why: "The EAX register holds the mathematical output of the last executed function. We instruct GDB to read the live CPU register and print its exact value.",
      text: 'Type <code>gdb -ex "print $eax" -batch ./exploit.bin</code>',
      objective: "Print register value",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("print $eax"),
    },
    {
      title: "Examine Strings",
      why: "The `x/s` command tells GDB to eXamine memory as a String. If you know a password is stored at memory address 0x8048000, this command extracts and decrypts it instantly.",
      text: 'Type <code>gdb -ex "x/s 0x8048000" -batch ./exploit.bin</code>',
      objective: "Examine string x/s",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("x/s"),
    },
    {
      title: "Examine Hex",
      why: "The `x/10x` command tells GDB to eXamine the next 10 memory blocks and format them as Hexadecimal bytes. This is how you confirm your payload was injected into memory correctly.",
      text: 'Type <code>gdb -ex "x/10x $esp" -batch ./exploit.bin</code>',
      objective: "Examine hex x/10x",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("x/10x"),
    },
    {
      title: "Examine Instructions",
      why: "The `x/10i` command tells GDB to eXamine the next 10 memory blocks and decompile them back into Assembly Instructions (`i`), showing you what the CPU is about to do.",
      text: 'Type <code>gdb -ex "x/10i $eip" -batch ./exploit.bin</code>',
      objective: "Examine instructions x/10i",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("x/10i"),
    },
    {
      title: "Info Registers",
      why: "Dumps the live state of every single CPU register (EAX, EBX, ESP, EIP). If your buffer overflow successfully overwrote the Instruction Pointer (EIP) with '41414141', you will see it here.",
      text: 'Type <code>gdb -ex "info registers" -batch ./exploit.bin</code>',
      objective: "Info registers",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("info registers"),
    },
    {
      title: "Modify Register",
      why: "You aren't just an observer; you are God. The `set` command overwrites the live value of the EAX register in the CPU, altering the mathematical execution of the program in real-time.",
      text: 'Type <code>gdb -ex "set $eax=1" -batch ./exploit.bin</code>',
      objective: "Set register value",
      xp: 60,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("set $eax=1"),
    },
    {
      title: "Modify Memory",
      why: "You can overwrite raw RAM. By forcefully writing malicious hex code directly into the stack pointer ($esp), you dynamically inject your buffer overflow payload during execution.",
      text: 'Type <code>gdb -ex "set *0x8048000=0x90909090" -batch ./exploit.bin</code>',
      objective: "Set memory value",
      xp: 60,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("set *0x8048000"),
    },
    {
      title: "Continue Execution",
      why: "Once you have injected your payload and altered the registers, the `continue` command instructs the CPU to unfreeze and resume execution at full speed. Your exploit detonates.",
      text: 'Type <code>gdb -ex "continue" -batch ./exploit.bin</code>',
      objective: "Continue execution",
      xp: 45,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("continue"),
    },
    {
      title: "Quit GDB",
      why: "Terminate the debugging session and release the process hooks.",
      text: "Type <code>quit</code>",
      objective: "Type quit",
      xp: 10,
      check: (c) => c === "quit",
    },
    {
      title: "Reverse Engineer",
      why: "You understand ELF headers, Syscall Hooking, Memory Registers, and Assembly Execution. You have completed the Kernel & Reverse Engineering module.",
      text: 'Type <code>echo "Memory Corrupted"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Memory"),
    },
  ],
};
