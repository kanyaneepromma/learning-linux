// fifteenthmodule.js
// Module 15: Kernel Internals & Reverse Engineering (65 Lessons)

const module15_kernel = {
  name: "15. Kernel & Reverse Eng (65 Lessons)",
  lessons: [
    // --- PHASE 1: HARDWARE & BOOT RING BUFFER (1-12) ---
    {
      title: "Read Kernel Ring Buffer",
      why: "Read the absolute lowest-level hardware and boot logs.",
      text: "Type <code>dmesg</code>",
      objective: "Type dmesg",
      xp: 15,
      check: (c) => c === "dmesg",
    },
    {
      title: "Human Readable Timestamps",
      why: "Convert kernel seconds into real dates.",
      text: "Type <code>dmesg -T</code>",
      objective: "Type dmesg -T",
      xp: 20,
      check: (c, a) => c === "dmesg" && a.includes("-T"),
    },
    {
      title: "Hunt Hardware Issues",
      why: "Grep the ring buffer for USB connections.",
      text: "Type <code>dmesg | grep -i usb</code>",
      objective: "Grep usb from dmesg",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("dmesg") && raw.includes("grep") && raw.includes("usb"),
    },
    {
      title: "Hunt Network Interfaces",
      why: "Check how the kernel loaded your network card.",
      text: "Type <code>dmesg | grep -i eth0</code>",
      objective: "Grep eth0 from dmesg",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("dmesg") && raw.includes("grep") && raw.includes("eth0"),
    },
    {
      title: "Print System Info",
      why: "Get the basic kernel name.",
      text: "Type <code>uname</code>",
      objective: "Type uname",
      xp: 10,
      check: (c) => c === "uname",
    },
    {
      title: "Print All System Info",
      why: "Get the full kernel build, architecture, and hostname.",
      text: "Type <code>uname -a</code>",
      objective: "Type uname -a",
      xp: 15,
      check: (c, a) => c === "uname" && a.includes("-a"),
    },
    {
      title: "Print Kernel Release",
      why: "Get just the exact kernel version number.",
      text: "Type <code>uname -r</code>",
      objective: "Type uname -r",
      xp: 15,
      check: (c, a) => c === "uname" && a.includes("-r"),
    },
    {
      title: "Print Distribution Info",
      why: "See exactly what OS flavor you are running.",
      text: "Type <code>lsb_release -a</code>",
      objective: "Type lsb_release -a",
      xp: 20,
      check: (c, a) => c === "lsb_release" && a.includes("-a"),
    },
    {
      title: "List CPU Architecture",
      why: "Inspect your processor threads and architecture.",
      text: "Type <code>lscpu</code>",
      objective: "Type lscpu",
      xp: 15,
      check: (c) => c === "lscpu",
    },
    {
      title: "List Hardware Devices",
      why: "Generate a short map of motherboard components.",
      text: "Type <code>lshw -short</code>",
      objective: "Type lshw -short",
      xp: 25,
      check: (c, a) => c === "lshw" && a.includes("-short"),
    },
    {
      title: "List Kernel Parameters",
      why: "View all live kernel configuration values.",
      text: "Type <code>sysctl -a</code>",
      objective: "Type sysctl -a",
      xp: 20,
      check: (c, a) => c === "sysctl" && a.includes("-a"),
    },
    {
      title: "Read Specific Kernel Param",
      why: "Check the kernel's memory of the hostname.",
      text: "Type <code>sysctl kernel.hostname</code>",
      objective: "Type sysctl kernel.hostname",
      xp: 25,
      check: (c, a) => c === "sysctl" && a.includes("kernel.hostname"),
    },

    // --- PHASE 2: KERNEL MODULES & DRIVERS (13-24) ---
    {
      title: "List Kernel Modules",
      why: "See what hardware drivers are currently loaded into memory.",
      text: "Type <code>lsmod</code>",
      objective: "Type lsmod",
      xp: 15,
      check: (c) => c === "lsmod",
    },
    {
      title: "Find Specific Module",
      why: "Check if the e1000 network driver is loaded.",
      text: "Type <code>lsmod | grep e1000</code>",
      objective: "Grep e1000 from lsmod",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("lsmod") && raw.includes("grep") && raw.includes("e1000"),
    },
    {
      title: "Module Info",
      why: "Extract metadata, authors, and dependencies from a module.",
      text: "Type <code>modinfo e1000</code>",
      objective: "Type modinfo e1000",
      xp: 25,
      check: (c, a) => c === "modinfo" && a.includes("e1000"),
    },
    {
      title: "Insert Module (Raw)",
      why: "Manually inject a raw .ko file into the running kernel.",
      text: "Type <code>insmod /lib/modules/custom.ko</code>",
      objective: "Type insmod",
      xp: 35,
      check: (c, a) => c === "insmod" && a[0].includes("custom.ko"),
    },
    {
      title: "Remove Module (Raw)",
      why: "Yank a driver out of the running kernel.",
      text: "Type <code>rmmod custom</code>",
      objective: "Type rmmod custom",
      xp: 35,
      check: (c, a) => c === "rmmod" && a.includes("custom"),
    },
    {
      title: "Modprobe Add",
      why: "The safe way to add modules (it resolves dependencies automatically).",
      text: "Type <code>modprobe e1000</code>",
      objective: "Type modprobe e1000",
      xp: 30,
      check: (c, a) =>
        c === "modprobe" && a.includes("e1000") && !a.includes("-r"),
    },
    {
      title: "Modprobe Remove",
      why: "The safe way to remove modules.",
      text: "Type <code>modprobe -r e1000</code>",
      objective: "Type modprobe -r e1000",
      xp: 35,
      check: (c, a) =>
        c === "modprobe" && a.includes("-r") && a.includes("e1000"),
    },
    {
      title: "List Module Directory",
      why: "See where the kernel keeps its driver files.",
      text: "Type <code>ls -l /lib/modules</code>",
      objective: "List /lib/modules",
      xp: 15,
      check: (c, a) => c === "ls" && a.includes("/lib/modules"),
    },
    {
      title: "Check Module Load Logs",
      why: "See if dmesg caught the driver insertion.",
      text: "Type <code>dmesg | tail -n 5</code>",
      objective: "Tail dmesg",
      xp: 20,
      check: (c, a, o, raw) => raw.includes("dmesg") && raw.includes("tail"),
    },
    {
      title: "Enable IP Forwarding",
      why: "Change a live kernel parameter to allow router behavior.",
      text: "Type <code>sysctl net.ipv4.ip_forward=1</code>",
      objective: "Set ip_forward to 1",
      xp: 40,
      check: (c, a) =>
        c === "sysctl" && a.some((x) => x.includes("ip_forward=1")),
    },
    {
      title: "Apply Sysctl Config",
      why: "Force the kernel to reload settings from /etc/sysctl.conf.",
      text: "Type <code>sysctl -p</code>",
      objective: "Type sysctl -p",
      xp: 30,
      check: (c, a) => c === "sysctl" && a.includes("-p"),
    },
    {
      title: "Get Process ID",
      why: "Find the PID of the core system daemon.",
      text: "Type <code>pidof systemd</code>",
      objective: "Type pidof systemd",
      xp: 20,
      check: (c, a) => c === "pidof" && a.includes("systemd"),
    },

    // --- PHASE 3: ELF BINARIES & SHARED LIBRARIES (25-40) ---
    {
      title: "Determine File Type",
      why: "Check what a binary actually is.",
      text: "Type <code>file /bin/ls</code>",
      objective: "Type file /bin/ls",
      xp: 15,
      check: (c, a) => c === "file" && a[0] === "/bin/ls",
    },
    {
      title: "File Exploit",
      why: "Inspect a suspicious binary.",
      text: "Type <code>file /tmp/exploit.bin</code>",
      objective: "Type file /tmp/exploit.bin",
      xp: 15,
      check: (c, a) => c === "file" && a[0] === "/tmp/exploit.bin",
    },
    {
      title: "List Dynamic Dependencies",
      why: "See what shared C libraries a program needs to run.",
      text: "Type <code>ldd /bin/ls</code>",
      objective: "Type ldd /bin/ls",
      xp: 25,
      check: (c, a) => c === "ldd" && a[0] === "/bin/ls",
    },
    {
      title: "LDD Exploit",
      why: "See what libraries the malware hooks into.",
      text: "Type <code>ldd /tmp/exploit.bin</code>",
      objective: "Type ldd /tmp/exploit.bin",
      xp: 25,
      check: (c, a) => c === "ldd" && a[0] === "/tmp/exploit.bin",
    },
    {
      title: "Print LD Cache",
      why: "View all mapped dynamic libraries on the system.",
      text: "Type <code>ldconfig -p</code>",
      objective: "Type ldconfig -p",
      xp: 25,
      check: (c, a) => c === "ldconfig" && a.includes("-p"),
    },
    {
      title: "Grep LD Cache",
      why: "Check if the core C library is mapped.",
      text: "Type <code>ldconfig -p | grep libc</code>",
      objective: "Grep libc from ldconfig",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("ldconfig") &&
        raw.includes("grep") &&
        raw.includes("libc"),
    },
    {
      title: "Read ELF Header",
      why: "Inspect the raw Executable and Linkable Format (ELF) header.",
      text: "Type <code>readelf -h /bin/ls</code>",
      objective: "Type readelf -h",
      xp: 30,
      check: (c, a) =>
        c === "readelf" && a.includes("-h") && a.includes("/bin/ls"),
    },
    {
      title: "Read ELF Sections",
      why: "View the memory sections (.text, .data, .bss).",
      text: "Type <code>readelf -S /bin/ls</code>",
      objective: "Type readelf -S",
      xp: 35,
      check: (c, a) =>
        c === "readelf" && a.includes("-S") && a.includes("/bin/ls"),
    },
    {
      title: "Read ELF Symbols",
      why: "View the symbol table (function names).",
      text: "Type <code>readelf -s /bin/ls</code>",
      objective: "Type readelf -s",
      xp: 35,
      check: (c, a) =>
        c === "readelf" && a.includes("-s") && a.includes("/bin/ls"),
    },
    {
      title: "List Symbols (NM)",
      why: "Another tool to extract function names from object files.",
      text: "Type <code>nm /bin/ls</code>",
      objective: "Type nm /bin/ls",
      xp: 25,
      check: (c, a) => c === "nm" && a[0] === "/bin/ls",
    },
    {
      title: "Disassemble Binary",
      why: "Translate machine code back into Assembly instructions.",
      text: "Type <code>objdump -d /bin/ls | head</code>",
      objective: "Pipe objdump -d to head",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("objdump") && raw.includes("-d") && raw.includes("head"),
    },
    {
      title: "Print Object Headers",
      why: "Extract all headers from the binary.",
      text: "Type <code>objdump -x /bin/ls | head</code>",
      objective: "Pipe objdump -x to head",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("objdump") && raw.includes("-x") && raw.includes("head"),
    },
    {
      title: "Hex Dump File",
      why: "View the raw byte values of a binary.",
      text: "Type <code>hexdump -C /bin/ls | head</code>",
      objective: "Pipe hexdump to head",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("hexdump") && raw.includes("-C") && raw.includes("head"),
    },
    {
      title: "XXD Dump",
      why: "Alternative tool to view hex dumps.",
      text: "Type <code>xxd /bin/ls | head</code>",
      objective: "Pipe xxd to head",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("xxd") && raw.includes("/bin/ls") && raw.includes("head"),
    },
    {
      title: "Strings Library Search",
      why: "Extract plain text to see if it dynamically loads GLIBC.",
      text: "Type <code>strings /bin/ls | grep GLIBC</code>",
      objective: "Grep GLIBC from strings",
      xp: 30,
      check: (c, a, o, raw) => raw.includes("strings") && raw.includes("GLIBC"),
    },
    {
      title: "Clear Buffer",
      why: "Clear the terminal before the heavy tracing begins.",
      text: "Type <code>clear</code>",
      objective: "Type clear",
      xp: 10,
      check: (c) => c === "clear",
    },

    // --- PHASE 4: SYSTEM CALLS & PROCESS TRACING (41-55) ---
    {
      title: "Trace System Calls",
      why: "Watch every request a program makes to the Linux kernel.",
      text: "Type <code>strace pwd</code>",
      objective: "Type strace pwd",
      xp: 30,
      check: (c, a) => c === "strace" && a[0] === "pwd",
    },
    {
      title: "Strace Summary",
      why: "Count how many times each kernel function was called.",
      text: "Type <code>strace -c pwd</code>",
      objective: "Type strace -c",
      xp: 35,
      check: (c, a) => c === "strace" && a.includes("-c") && a.includes("pwd"),
    },
    {
      title: "Strace Filter",
      why: "Only trace file opening functions (openat).",
      text: "Type <code>strace -e trace=openat pwd</code>",
      objective: "Use -e trace=openat",
      xp: 40,
      check: (c, a) =>
        c === "strace" &&
        a.includes("-e") &&
        a.some((x) => x.includes("openat")),
    },
    {
      title: "Trace Running PID",
      why: "Attach the tracer to an already running process.",
      text: "Type <code>strace -p 1337</code>",
      objective: "Use strace -p",
      xp: 35,
      check: (c, a) => c === "strace" && a.includes("-p") && a.includes("1337"),
    },
    {
      title: "Trace Library Calls",
      why: "Watch a program talk to shared C libraries instead of the kernel.",
      text: "Type <code>ltrace pwd</code>",
      objective: "Type ltrace pwd",
      xp: 30,
      check: (c, a) => c === "ltrace" && a[0] === "pwd",
    },
    {
      title: "Ltrace Summary",
      why: "Count library function calls.",
      text: "Type <code>ltrace -c pwd</code>",
      objective: "Type ltrace -c",
      xp: 35,
      check: (c, a) => c === "ltrace" && a.includes("-c") && a.includes("pwd"),
    },
    {
      title: "Ltrace Filter",
      why: "Only trace 'getenv' environment checks.",
      text: "Type <code>ltrace -e getenv pwd</code>",
      objective: "Use ltrace -e",
      xp: 40,
      check: (c, a) =>
        c === "ltrace" && a.includes("-e") && a.includes("getenv"),
    },
    {
      title: "Strace Forks",
      why: "Trace a program AND any child processes it spawns (-f).",
      text: "Type <code>strace -f ./exploit.bin</code>",
      objective: "Use strace -f",
      xp: 45,
      check: (c, a) =>
        c === "strace" && a.includes("-f") && a.includes("./exploit.bin"),
    },
    {
      title: "Ltrace Forks",
      why: "Trace library calls through child processes.",
      text: "Type <code>ltrace -f ./exploit.bin</code>",
      objective: "Use ltrace -f",
      xp: 45,
      check: (c, a) =>
        c === "ltrace" && a.includes("-f") && a.includes("./exploit.bin"),
    },
    {
      title: "Output Trace to Log",
      why: "Save the massive output stream to a file.",
      text: "Type <code>strace -o trace.log ls</code>",
      objective: "Use strace -o",
      xp: 40,
      check: (c, a) =>
        c === "strace" && a.includes("-o") && a.includes("trace.log"),
    },
    {
      title: "Read Trace Log",
      why: "Review the system call capture.",
      text: "Type <code>cat trace.log</code>",
      objective: "Type cat trace.log",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "trace.log",
    },
    {
      title: "Grep Trace Log",
      why: "Find exactly what files the program tried to open.",
      text: 'Type <code>grep "openat" trace.log</code>',
      objective: "Grep openat from trace",
      xp: 20,
      check: (c, a) =>
        c === "grep" && a.includes("openat") && a.includes("trace.log"),
    },
    {
      title: "Find Nginx PID",
      why: "Get the process ID of the web server dynamically.",
      text: "Type <code>pidof nginx</code>",
      objective: "Type pidof nginx",
      xp: 25,
      check: (c, a) => c === "pidof" && a[0] === "nginx",
    },
    {
      title: "Dynamic Trace",
      why: "Use bash substitution to trace nginx immediately.",
      text: "Type <code>strace -p $(pidof nginx)</code>",
      objective: "Combine strace and pidof",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("strace") &&
        raw.includes("-p") &&
        raw.includes("$(pidof nginx)"),
    },
    {
      title: "Kill Traced Process",
      why: "Nuke the process using the same trick.",
      text: "Type <code>kill -9 $(pidof nginx)</code>",
      objective: "Combine kill and pidof",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("kill") &&
        raw.includes("-9") &&
        raw.includes("$(pidof nginx)"),
    },

    // --- PHASE 5: GNU DEBUGGER (GDB) & MEMORY (56-65) ---
    {
      title: "Launch GDB",
      why: "Load a binary into the GNU Debugger.",
      text: "Type <code>gdb ./exploit.bin</code>",
      objective: "Type gdb ./exploit.bin",
      xp: 30,
      check: (c, a) =>
        c === "gdb" && a[0] === "./exploit.bin" && !a.includes("-q"),
    },
    {
      title: "Quiet GDB",
      why: "Load without printing the massive copyright header.",
      text: "Type <code>gdb -q ./exploit.bin</code>",
      objective: "Type gdb -q",
      xp: 30,
      check: (c, a) => c === "gdb" && a.includes("-q"),
    },
    {
      title: "Disassemble Main",
      why: "Use GDB batch mode to dump the assembly code of the main function.",
      text: 'Type <code>gdb -ex "disassemble main" -batch ./exploit.bin</code>',
      objective: "Pass disassemble to GDB",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("disassemble main"),
    },
    {
      title: "Inspect CPU Registers",
      why: "View the current state of EAX, EBX, ESP, etc.",
      text: 'Type <code>gdb -ex "info registers" -batch ./exploit.bin</code>',
      objective: "Pass info registers to GDB",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("info registers"),
    },
    {
      title: "Inspect Hex Memory",
      why: "Examine 10 hexadecimal words at the Stack Pointer ($esp).",
      text: 'Type <code>gdb -ex "x/10x $esp" -batch ./exploit.bin</code>',
      objective: "Examine memory x/10x",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("x/10x"),
    },
    {
      title: "Set Breakpoint",
      why: "Tell the program to pause execution right when 'main' starts.",
      text: 'Type <code>gdb -ex "break main" -batch ./exploit.bin</code>',
      objective: "Set a breakpoint",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("break main"),
    },
    {
      title: "Run Binary",
      why: "Start the program inside the debugger.",
      text: 'Type <code>gdb -ex "run" -batch ./exploit.bin</code>',
      objective: "Run the binary",
      xp: 45,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("run"),
    },
    {
      title: "Step Instruction",
      why: "Move forward exactly one assembly instruction.",
      text: 'Type <code>gdb -ex "next" -batch ./exploit.bin</code>',
      objective: "Step next",
      xp: 45,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("next"),
    },
    {
      title: "Print Variable",
      why: "Extract the value currently held in the EAX register.",
      text: 'Type <code>gdb -ex "print $eax" -batch ./exploit.bin</code>',
      objective: "Print register value",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("gdb") && raw.includes("print $eax"),
    },
    {
      title: "Examine Strings",
      why: "Extract a string from a specific memory address.",
      text: 'Type <code>gdb -ex "x/s 0x8048000" -batch ./exploit.bin</code>',
      objective: "Examine string x/s",
      xp: 50,
      check: (c, a, o, raw) => raw.includes("gdb") && raw.includes("x/s"),
    },
    {
      title: "The Kernel God",
      why: "Module 15 Complete. You see the Matrix.",
      text: 'Type <code>echo "Kernel God Mode Unlocked" > /root/mastery.txt</code>',
      objective: "Unlock God Mode",
      xp: 100,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Kernel God Mode Unlocked"),
    },
  ],
};
