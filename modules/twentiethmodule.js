// twentiethmodule.js
// Module 20: IoT & Firmware Hacking (100 Lessons)

const module20_iot = {
  name: "20. IoT & Firmware (100 Lessons)",
  lessons: [
    // --- PHASE 1: FIRMWARE RECON & EXTRACTION (1-20) ---
    {
      title: "Download Router Firmware",
      why: "Get the target binary.",
      text: "Type <code>wget http://vendor.local/firmware_v1.bin</code>",
      objective: "Download firmware",
      xp: 10,
      check: (c, a) => c === "wget" && a.some((x) => x.includes("firmware")),
    },
    {
      title: "Identify Binary",
      why: "Check the basic file type.",
      text: "Type <code>file firmware_v1.bin</code>",
      objective: "Type file firmware_v1.bin",
      xp: 15,
      check: (c, a) => c === "file" && a.includes("firmware_v1.bin"),
    },
    {
      title: "Check Entropy",
      why: "High entropy means it's compressed or encrypted.",
      text: "Type <code>ent firmware_v1.bin</code>",
      objective: "Type ent firmware_v1.bin",
      xp: 20,
      check: (c, a) => c === "ent" && a.includes("firmware_v1.bin"),
    },
    {
      title: "Hex Dump Header",
      why: "Look for magic bytes manually.",
      text: "Type <code>xxd firmware_v1.bin | head -n 10</code>",
      objective: "Pipe xxd to head",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("xxd") && raw.includes("firmware") && raw.includes("head"),
    },
    {
      title: "Extract Strings",
      why: "Look for hardcoded URLs or passwords.",
      text: "Type <code>strings firmware_v1.bin | head -n 15</code>",
      objective: "Pipe strings to head",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("strings") &&
        raw.includes("firmware") &&
        raw.includes("head"),
    },
    {
      title: "Grep for Passwords",
      why: "Search the binary specifically for 'password'.",
      text: "Type <code>strings firmware_v1.bin | grep -i password</code>",
      objective: "Grep password from strings",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("strings") &&
        raw.includes("grep") &&
        raw.includes("password"),
    },
    {
      title: "Grep for Backdoors",
      why: "Search for hidden development URLs.",
      text: "Type <code>strings firmware_v1.bin | grep -i http</code>",
      objective: "Grep http from strings",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("strings") && raw.includes("grep") && raw.includes("http"),
    },
    {
      title: "Binwalk Scan",
      why: "Scan the binary for embedded filesystems like SquashFS.",
      text: "Type <code>binwalk firmware_v1.bin</code>",
      objective: "Type binwalk firmware_v1.bin",
      xp: 35,
      check: (c, a) =>
        c === "binwalk" && a.includes("firmware_v1.bin") && !a.includes("-e"),
    },
    {
      title: "Binwalk Extract",
      why: "Rip the filesystem out of the binary.",
      text: "Type <code>binwalk -e firmware_v1.bin</code>",
      objective: "Type binwalk -e firmware_v1.bin",
      xp: 50,
      check: (c, a) =>
        c === "binwalk" && a.includes("-e") && a.includes("firmware_v1.bin"),
    },
    {
      title: "List Extracted",
      why: "Look at the folder Binwalk created.",
      text: "Type <code>ls -l _firmware_v1.bin.extracted/</code>",
      objective: "List extracted dir",
      xp: 15,
      check: (c, a) => c === "ls" && a.some((x) => x.includes("extracted")),
    },
    {
      title: "Navigate to SquashFS",
      why: "Enter the extracted Linux root filesystem.",
      text: "Type <code>cd _firmware_v1.bin.extracted/squashfs-root</code>",
      objective: "cd into squashfs-root",
      xp: 20,
      check: (c, a) => c === "cd" && a.some((x) => x.includes("squashfs-root")),
    },
    {
      title: "List Firmware Root",
      why: "It looks just like a normal Linux system!",
      text: "Type <code>ls -la</code>",
      objective: "Type ls -la",
      xp: 10,
      check: (c, a) => c === "ls" && a.includes("-la"),
    },
    {
      title: "Read Shadow File",
      why: "Steal the router's root hashes.",
      text: "Type <code>cat etc/shadow</code>",
      objective: "Cat etc/shadow",
      xp: 30,
      check: (c, a) => c === "cat" && a.some((x) => x.includes("etc/shadow")),
    },
    {
      title: "Read Config",
      why: "Check for hardcoded WiFi credentials.",
      text: "Type <code>cat etc/config/wireless</code>",
      objective: "Cat etc/config/wireless",
      xp: 30,
      check: (c, a) =>
        c === "cat" && a.some((x) => x.includes("config/wireless")),
    },
    {
      title: "Find Startup Scripts",
      why: "See what the router does when it boots.",
      text: "Type <code>cat etc/init.d/rcS</code>",
      objective: "Cat rcS",
      xp: 30,
      check: (c, a) => c === "cat" && a.some((x) => x.includes("rcS")),
    },
    {
      title: "Plant a Backdoor",
      why: "Modify the firmware by adding a malicious user.",
      text: 'Type <code>echo "hacker:x:0:0::/:/bin/sh" >> etc/passwd</code>',
      objective: "Append to etc/passwd",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes("hacker") &&
        raw.includes("passwd"),
    },
    {
      title: "Repack Firmware",
      why: "Rebuild the SquashFS filesystem into a new binary.",
      text: "Type <code>mksquashfs . ../modified_fw.bin -comp xz</code>",
      objective: "Use mksquashfs",
      xp: 50,
      check: (c, a) => c === "mksquashfs" && a.includes("modified_fw.bin"),
    },
    {
      title: "Go Up",
      why: "Leave the root folder.",
      text: "Type <code>cd ..</code>",
      objective: "Type cd ..",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "..",
    },
    {
      title: "Verify New Firmware",
      why: "Check that your backdoored binary was built.",
      text: "Type <code>ls -lh modified_fw.bin</code>",
      objective: "List modified_fw.bin",
      xp: 20,
      check: (c, a) => c === "ls" && a.includes("modified_fw.bin"),
    },
    {
      title: "Go Home",
      why: "Return to your workspace.",
      text: "Type <code>cd ~</code>",
      objective: "Type cd ~",
      xp: 10,
      check: (c, a) => c === "cd" && a[0] === "~",
    },

    // --- PHASE 2: EMULATION & BINARY ANALYSIS (21-40) ---
    {
      title: "Check Architecture",
      why: "Find out what CPU the router uses (often ARM or MIPS).",
      text: "Type <code>readelf -h _firmware_v1.bin.extracted/squashfs-root/bin/busybox | grep Machine</code>",
      objective: "Readelf busybox",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("readelf") &&
        raw.includes("Machine") &&
        raw.includes("busybox"),
    },
    {
      title: "Install QEMU",
      why: "Install the CPU emulator to run ARM/MIPS binaries on an x86 PC.",
      text: "Type <code>apt install qemu-user-static -y</code>",
      objective: "Install qemu-user-static",
      xp: 30,
      check: (c, a) => c === "apt" && a.includes("qemu-user-static"),
    },
    {
      title: "Copy QEMU Binary",
      why: "Place the emulator inside the extracted firmware root.",
      text: "Type <code>cp /usr/bin/qemu-mips-static _firmware_v1.bin.extracted/squashfs-root/usr/bin/</code>",
      objective: "Copy qemu-mips-static",
      xp: 35,
      check: (c, a) =>
        c === "cp" && a.some((x) => x.includes("qemu-mips-static")),
    },
    {
      title: "Chroot into Firmware",
      why: "Change root into the firmware to run it locally!",
      text: "Type <code>chroot _firmware_v1.bin.extracted/squashfs-root /bin/sh</code>",
      objective: "Use chroot",
      xp: 50,
      check: (c, a) =>
        c === "chroot" && a.some((x) => x.includes("squashfs-root")),
    },
    {
      title: "Test Emulation",
      why: "Run the router's web server locally.",
      text: "Type <code>/usr/sbin/httpd -h /www</code>",
      objective: "Start httpd in chroot",
      xp: 40,
      check: (c, a, o, raw) => raw.includes("httpd") && raw.includes("/www"),
    },
    {
      title: "Exit Chroot",
      why: "Leave the emulated environment.",
      text: "Type <code>exit</code>",
      objective: "Type exit",
      xp: 10,
      check: (c) => c === "exit",
    },
    {
      title: "Find Web Binaries",
      why: "Locate CGI scripts handling web requests.",
      text: 'Type <code>find _firmware_v1.bin.extracted/squashfs-root -name "*.cgi"</code>',
      objective: "Find .cgi files",
      xp: 30,
      check: (c, a) => c === "find" && a.includes("*.cgi"),
    },
    {
      title: "Analyze CGI (Strings)",
      why: "Look for command injection vulnerabilities.",
      text: "Type <code>strings _firmware_v1.bin.extracted/squashfs-root/www/cgi-bin/ping.cgi | grep system</code>",
      objective: "Grep system in cgi",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("strings") &&
        raw.includes("system") &&
        raw.includes("ping.cgi"),
    },
    {
      title: "Disassemble CGI",
      why: "Use objdump to look at the assembly instructions.",
      text: "Type <code>objdump -d _firmware_v1.bin.extracted/squashfs-root/www/cgi-bin/ping.cgi | head</code>",
      objective: "Disassemble cgi",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("objdump") &&
        raw.includes("-d") &&
        raw.includes("ping.cgi"),
    },
    {
      title: "Look for Keys",
      why: "Find hidden RSA keys shipped with the firmware.",
      text: 'Type <code>find _firmware_v1.bin.extracted/squashfs-root -name "*.pem"</code>',
      objective: "Find .pem files",
      xp: 30,
      check: (c, a) => c === "find" && a.includes("*.pem"),
    },
    {
      title: "Read Private Key",
      why: "View the compromised key.",
      text: "Type <code>cat _firmware_v1.bin.extracted/squashfs-root/etc/dropbear/dropbear_rsa_host_key</code>",
      objective: "Cat dropbear key",
      xp: 35,
      check: (c, a) => c === "cat" && a.some((x) => x.includes("dropbear")),
    },
    {
      title: "Search Certificates",
      why: "Look for hardcoded SSL certs.",
      text: 'Type <code>find _firmware_v1.bin.extracted/squashfs-root -name "*.crt"</code>',
      objective: "Find .crt files",
      xp: 30,
      check: (c, a) => c === "find" && a.includes("*.crt"),
    },
    {
      title: "Extract Bootloader",
      why: "Use dd to carve out the u-boot bootloader from the raw binary.",
      text: "Type <code>dd if=firmware_v1.bin of=uboot.bin bs=1 count=131072</code>",
      objective: "Use dd to extract bootloader",
      xp: 50,
      check: (c, a) =>
        c === "dd" &&
        a.includes("if=firmware_v1.bin") &&
        a.includes("of=uboot.bin"),
    },
    {
      title: "Analyze Bootloader",
      why: "Look for U-Boot environment variables.",
      text: "Type <code>strings uboot.bin | grep bootcmd</code>",
      objective: "Grep bootcmd from uboot",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("strings") &&
        raw.includes("bootcmd") &&
        raw.includes("uboot.bin"),
    },
    {
      title: "Decompile Kernel",
      why: "Find the LZMA compressed kernel.",
      text: "Type <code>binwalk -e uboot.bin</code>",
      objective: "Binwalk uboot",
      xp: 30,
      check: (c, a) =>
        c === "binwalk" && a.includes("-e") && a.includes("uboot.bin"),
    },
    {
      title: "Install Firmware Mod Kit",
      why: "FMK automates the extraction and rebuilding process.",
      text: "Type <code>apt install firmware-mod-kit -y</code>",
      objective: "Install FMK",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("firmware-mod-kit"),
    },
    {
      title: "Run Extract-ng",
      why: "Use FMK to extract firmware.",
      text: "Type <code>extract-ng.sh firmware_v1.bin</code>",
      objective: "Run extract-ng",
      xp: 30,
      check: (c, a) => c === "extract-ng.sh" && a.includes("firmware_v1.bin"),
    },
    {
      title: "Run Build-ng",
      why: "Use FMK to rebuild it automatically.",
      text: "Type <code>build-ng.sh fmk/</code>",
      objective: "Run build-ng",
      xp: 30,
      check: (c, a) => c === "build-ng.sh" && a.includes("fmk/"),
    },
    {
      title: "Calculate Original Hash",
      why: "Prep for comparison.",
      text: "Type <code>sha256sum firmware_v1.bin</code>",
      objective: "Hash original",
      xp: 15,
      check: (c, a) => c === "sha256sum" && a.includes("firmware_v1.bin"),
    },
    {
      title: "Compare Modified Hash",
      why: "Prove the firmware signature changed.",
      text: "Type <code>sha256sum modified_fw.bin</code>",
      objective: "Hash modified",
      xp: 15,
      check: (c, a) => c === "sha256sum" && a.includes("modified_fw.bin"),
    },

    // --- PHASE 3: HARDWARE PROTOCOLS (UART, SPI, I2C) (41-60) ---
    {
      title: "Check dmesg for UART",
      why: "You plugged a USB-to-TTL adapter into the motherboard. Find it.",
      text: "Type <code>dmesg | grep ttyUSB</code>",
      objective: "Grep ttyUSB from dmesg",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("dmesg") && raw.includes("grep") && raw.includes("ttyUSB"),
    },
    {
      title: "Connect to UART",
      why: "Use screen to open a serial connection to the hardware pins at 115200 baud.",
      text: "Type <code>screen /dev/ttyUSB0 115200</code>",
      objective: "Use screen to connect to UART",
      xp: 50,
      check: (c, a) =>
        c === "screen" && a.includes("/dev/ttyUSB0") && a.includes("115200"),
    },
    {
      title: "UART Root Shell",
      why: "You bypassed the login by interrupting the boot process. Who are you?",
      text: "Type <code>whoami</code>",
      objective: "Type whoami in UART",
      xp: 20,
      check: (c) => c === "whoami",
    },
    {
      title: "Exit Screen",
      why: "Kill the serial connection.",
      text: "Type <code>exit</code>",
      objective: "Exit screen",
      xp: 10,
      check: (c) => c === "exit",
    },
    {
      title: "Install Flashrom",
      why: "You clamped an EEPROM clip onto the router's SPI flash memory chip. Install the tool to read it.",
      text: "Type <code>apt install flashrom -y</code>",
      objective: "Install flashrom",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("flashrom"),
    },
    {
      title: "Detect SPI Chip",
      why: "Probe the hardware to see what memory chip is attached.",
      text: "Type <code>flashrom -p ch341a_spi</code>",
      objective: "Detect chip with flashrom",
      xp: 40,
      check: (c, a) =>
        c === "flashrom" &&
        a.includes("-p") &&
        a.includes("ch341a_spi") &&
        !a.includes("-r"),
    },
    {
      title: "Dump SPI Flash",
      why: "Rip the entire firmware directly off the physical motherboard chip.",
      text: "Type <code>flashrom -p ch341a_spi -r dumped_bios.bin</code>",
      objective: "Dump SPI flash",
      xp: 60,
      check: (c, a) =>
        c === "flashrom" && a.includes("-r") && a.includes("dumped_bios.bin"),
    },
    {
      title: "Verify Dump Size",
      why: "Ensure the dump matches the 8MB chip size.",
      text: "Type <code>ls -lh dumped_bios.bin</code>",
      objective: "Check size of dumped_bios.bin",
      xp: 15,
      check: (c, a) => c === "ls" && a.includes("dumped_bios.bin"),
    },
    {
      title: "Erase SPI Chip",
      why: "WARNING: You are about to brick the router physically.",
      text: "Type <code>flashrom -p ch341a_spi -E</code>",
      objective: "Erase SPI flash",
      xp: 45,
      check: (c, a) => c === "flashrom" && a.includes("-E"),
    },
    {
      title: "Write Malicious SPI",
      why: "Flash your backdoored firmware directly to the hardware.",
      text: "Type <code>flashrom -p ch341a_spi -w modified_fw.bin</code>",
      objective: "Write SPI flash",
      xp: 60,
      check: (c, a) =>
        c === "flashrom" && a.includes("-w") && a.includes("modified_fw.bin"),
    },
    {
      title: "Install I2C Tools",
      why: "I2C is another protocol used to talk to sensors/EEPROMs.",
      text: "Type <code>apt install i2c-tools -y</code>",
      objective: "Install i2c-tools",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("i2c-tools"),
    },
    {
      title: "Detect I2C Busses",
      why: "See what I2C interfaces exist on the device.",
      text: "Type <code>i2cdetect -l</code>",
      objective: "Use i2cdetect -l",
      xp: 30,
      check: (c, a) => c === "i2cdetect" && a.includes("-l"),
    },
    {
      title: "Scan I2C Bus 1",
      why: "Probe the bus to see what hardware addresses respond.",
      text: "Type <code>i2cdetect -y 1</code>",
      objective: "Use i2cdetect -y 1",
      xp: 40,
      check: (c, a) => c === "i2cdetect" && a.includes("-y") && a.includes("1"),
    },
    {
      title: "Dump I2C EEPROM",
      why: "Extract data from the chip at address 0x50.",
      text: "Type <code>i2cdump -y 1 0x50</code>",
      objective: "Use i2cdump",
      xp: 50,
      check: (c, a) => c === "i2cdump" && a.includes("1") && a.includes("0x50"),
    },
    {
      title: "Write I2C Register",
      why: "Change a configuration bit on the hardware sensor.",
      text: "Type <code>i2cset -y 1 0x50 0x00 0xFF</code>",
      objective: "Use i2cset",
      xp: 50,
      check: (c, a) =>
        c === "i2cset" && a.includes("0x50") && a.includes("0xFF"),
    },
    {
      title: "Read JTAG Info",
      why: "JTAG is the ultimate hardware debugging port. (Simulated check).",
      text: "Type <code>openocd -f interface/jlink.cfg</code>",
      objective: "Run openocd",
      xp: 35,
      check: (c, a) => c === "openocd" && a.some((x) => x.includes("jlink")),
    },
    {
      title: "Check USB Devices",
      why: "See what hacking hardware is plugged into your PC.",
      text: "Type <code>lsusb</code>",
      objective: "Type lsusb",
      xp: 15,
      check: (c) => c === "lsusb",
    },
    {
      title: "Setup Baudrate",
      why: "Configure the TTY device settings manually.",
      text: "Type <code>stty -F /dev/ttyUSB0 115200 cs8 -cstopb -parenb</code>",
      objective: "Configure stty for UART",
      xp: 45,
      check: (c, a) =>
        c === "stty" && a.includes("/dev/ttyUSB0") && a.includes("115200"),
    },
    {
      title: "Read Raw Serial",
      why: "Cat the raw hardware port directly.",
      text: "Type <code>cat /dev/ttyUSB0</code>",
      objective: "Cat /dev/ttyUSB0",
      xp: 30,
      check: (c, a) => c === "cat" && a[0] === "/dev/ttyUSB0",
    },
    {
      title: "Send Serial Command",
      why: "Push data to the hardware port.",
      text: 'Type <code>echo "reboot" > /dev/ttyUSB0</code>',
      objective: "Echo to /dev/ttyUSB0",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes(">") &&
        raw.includes("/dev/ttyUSB0"),
    },

    // --- PHASE 4: BLUETOOTH LOW ENERGY (BLE) & SDR (61-80) ---
    {
      title: "Check BT Adapter",
      why: "Verify your Bluetooth hacking dongle is recognized.",
      text: "Type <code>hciconfig</code>",
      objective: "Type hciconfig",
      xp: 15,
      check: (c) => c === "hciconfig",
    },
    {
      title: "Bring BT UP",
      why: "Turn on the Bluetooth interface.",
      text: "Type <code>hciconfig hci0 up</code>",
      objective: "Type hciconfig hci0 up",
      xp: 20,
      check: (c, a) =>
        c === "hciconfig" && a.includes("hci0") && a.includes("up"),
    },
    {
      title: "BLE Scan",
      why: "Scan the room for Smart Watches, Locks, and Trackers.",
      text: "Type <code>hcitool lescan</code>",
      objective: "Type hcitool lescan",
      xp: 35,
      check: (c, a) => c === "hcitool" && a.includes("lescan"),
    },
    {
      title: "Bluetoothctl",
      why: "Enter the interactive BT management console.",
      text: "Type <code>bluetoothctl</code>",
      objective: "Type bluetoothctl",
      xp: 20,
      check: (c) => c === "bluetoothctl",
    },
    {
      title: "Exit Bluetoothctl",
      why: "Leave the console.",
      text: "Type <code>exit</code>",
      objective: "Type exit",
      xp: 10,
      check: (c) => c === "exit",
    },
    {
      title: "Connect to BLE Device",
      why: "Use gatttool to connect to a Smart Bulb's MAC Address.",
      text: "Type <code>gatttool -b AA:BB:CC:DD:EE:FF -I</code>",
      objective: "Use gatttool -I",
      xp: 40,
      check: (c, a) => c === "gatttool" && a.includes("-b") && a.includes("-I"),
    },
    {
      title: "Read BLE Characteristics",
      why: "Ask the smart device what features it has.",
      text: "Type <code>char-desc</code>",
      objective: "Type char-desc",
      xp: 30,
      check: (c) => c === "char-desc",
    },
    {
      title: "Write BLE Payload",
      why: "Send a hex command to turn off the smart bulb without authentication.",
      text: "Type <code>char-write-req 0x0012 00000000</code>",
      objective: "Write BLE char",
      xp: 50,
      check: (c, a, o, raw) =>
        c === "char-write-req" || raw.includes("char-write-req"),
    },
    {
      title: "Install SDR Tools",
      why: "Software Defined Radio lets you hack raw radio waves (drones, car keys).",
      text: "Type <code>apt install rtl-sdr -y</code>",
      objective: "Install rtl-sdr",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("rtl-sdr"),
    },
    {
      title: "Test RTL-SDR",
      why: "Check if the antenna is connected.",
      text: "Type <code>rtl_test</code>",
      objective: "Type rtl_test",
      xp: 25,
      check: (c) => c === "rtl_test",
    },
    {
      title: "Install RTL_433",
      why: "A tool specifically for hacking 433MHz devices (Weather stations, alarms).",
      text: "Type <code>apt install rtl-433 -y</code>",
      objective: "Install rtl-433",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("rtl-433"),
    },
    {
      title: "Scan 433MHz",
      why: "Sniff the airwaves for IoT device transmissions.",
      text: "Type <code>rtl_433</code>",
      objective: "Type rtl_433",
      xp: 40,
      check: (c) => c === "rtl_433",
    },
    {
      title: "Capture Radio to File",
      why: "Record the raw radio signal of a key fob.",
      text: "Type <code>rtl_sdr -f 433.92M -s 250000 capture.bin</code>",
      objective: "Use rtl_sdr to capture",
      xp: 50,
      check: (c, a) =>
        c === "rtl_sdr" && a.includes("-f") && a.includes("capture.bin"),
    },
    {
      title: "Install Airmon",
      why: "WiFi hacking tools for IoT device attacks.",
      text: "Type <code>apt install aircrack-ng -y</code>",
      objective: "Install aircrack-ng",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("aircrack-ng"),
    },
    {
      title: "Monitor Mode",
      why: "Put your WiFi card into listening mode to sniff IoT traffic.",
      text: "Type <code>airmon-ng start wlan0</code>",
      objective: "Start monitor mode",
      xp: 35,
      check: (c, a) =>
        c === "airmon-ng" && a.includes("start") && a.includes("wlan0"),
    },
    {
      title: "Airodump Sniff",
      why: "Watch devices communicate with the router.",
      text: "Type <code>airodump-ng wlan0mon</code>",
      objective: "Run airodump-ng",
      xp: 40,
      check: (c, a) => c === "airodump-ng" && a.includes("wlan0mon"),
    },
    {
      title: "Deauth Attack",
      why: "Kick the IoT camera off the network using aireplay.",
      text: "Type <code>aireplay-ng -0 5 -a 00:11:22:33:44:55 wlan0mon</code>",
      objective: "Use aireplay-ng deauth",
      xp: 50,
      check: (c, a) =>
        c === "aireplay-ng" && a.includes("-0") && a.includes("5"),
    },
    {
      title: "TCPDump IoT",
      why: "Sniff packets specifically looking for unencrypted IoT data.",
      text: "Type <code>tcpdump -i wlan0mon -w iot_capture.pcap</code>",
      objective: "Run tcpdump",
      xp: 45,
      check: (c, a) =>
        c === "tcpdump" && a.includes("-w") && a.includes("iot_capture.pcap"),
    },
    {
      title: "Read PCAP",
      why: "Use TShark (command line Wireshark) to analyze the dump.",
      text: "Type <code>tshark -r iot_capture.pcap</code>",
      objective: "Run tshark",
      xp: 40,
      check: (c, a) =>
        c === "tshark" && a.includes("-r") && a.includes("iot_capture.pcap"),
    },
    {
      title: "Stop Monitor Mode",
      why: "Return the WiFi card to normal.",
      text: "Type <code>airmon-ng stop wlan0mon</code>",
      objective: "Stop monitor mode",
      xp: 20,
      check: (c, a) => c === "airmon-ng" && a.includes("stop"),
    },

    // --- PHASE 5: MQTT, COAP & SMART HOME HACKING (81-100) ---
    {
      title: "Install MQTT Clients",
      why: "MQTT is the most popular IoT messaging protocol.",
      text: "Type <code>apt install mosquitto-clients -y</code>",
      objective: "Install mosquitto-clients",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("mosquitto-clients"),
    },
    {
      title: "Scan for MQTT",
      why: "Look for port 1883 on the Smart Home network.",
      text: "Type <code>nmap -p 1883 10.0.0.0/24</code>",
      objective: "Nmap port 1883",
      xp: 30,
      check: (c, a) => c === "nmap" && a.includes("-p") && a.includes("1883"),
    },
    {
      title: "Subscribe to All Topics",
      why: "Connect to the broker and listen to EVERYTHING in the smart home.",
      text: 'Type <code>mosquitto_sub -h 10.0.0.50 -t "#" -v</code>',
      objective: "Use mosquitto_sub with # wildcard",
      xp: 50,
      check: (c, a) =>
        c === "mosquitto_sub" &&
        a.includes("-h") &&
        a.includes("-t") &&
        a.includes("#"),
    },
    {
      title: "Publish MQTT Payload",
      why: "Send a command to unlock the front door.",
      text: 'Type <code>mosquitto_pub -h 10.0.0.50 -t "home/door/lock" -m "UNLOCK"</code>',
      objective: "Use mosquitto_pub",
      xp: 50,
      check: (c, a) =>
        c === "mosquitto_pub" &&
        a.includes("-t") &&
        a.some((x) => x.includes("home/door/lock")) &&
        a.includes("-m"),
    },
    {
      title: "Turn on Smart Plug",
      why: "Hijack the living room lights.",
      text: 'Type <code>mosquitto_pub -h 10.0.0.50 -t "home/livingroom/plug" -m "ON"</code>',
      objective: "Publish ON message",
      xp: 40,
      check: (c, a) =>
        c === "mosquitto_pub" &&
        a.some((x) => x.includes("plug")) &&
        a.some((x) => x.includes("ON")),
    },
    {
      title: "Install CoAP",
      why: "CoAP is another lightweight IoT protocol (Port 5683).",
      text: "Type <code>apt install libcoap-1-0-bin -y</code>",
      objective: "Install libcoap",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("libcoap-1-0-bin"),
    },
    {
      title: "Query CoAP Device",
      why: "Ask the IoT thermometer for its status.",
      text: "Type <code>coap-client -m get coap://10.0.0.60/.well-known/core</code>",
      objective: "Use coap-client",
      xp: 45,
      check: (c, a) =>
        c === "coap-client" &&
        a.includes("get") &&
        a.some((x) => x.includes("coap://")),
    },
    {
      title: "Shodan CLI Install",
      why: "Install the search engine for exposed IoT devices.",
      text: "Type <code>apt install python3-shodan -y</code>",
      objective: "Install python3-shodan",
      xp: 20,
      check: (c, a) => c === "apt" && a.includes("python3-shodan"),
    },
    {
      title: "Shodan Init",
      why: "Initialize your API key.",
      text: "Type <code>shodan init YOUR_API_KEY</code>",
      objective: "Run shodan init",
      xp: 20,
      check: (c, a) => c === "shodan" && a.includes("init"),
    },
    {
      title: "Shodan Search Cameras",
      why: "Search the internet for exposed webcams.",
      text: 'Type <code>shodan search "webcamXP"</code>',
      objective: "Shodan search webcam",
      xp: 40,
      check: (c, a) =>
        c === "shodan" &&
        a.includes("search") &&
        a.some((x) => x.includes("webcamXP")),
    },
    {
      title: "Shodan Search MQTT",
      why: "Search for exposed MQTT brokers without authentication.",
      text: 'Type <code>shodan search "port:1883 MQTT"</code>',
      objective: "Shodan search port:1883",
      xp: 40,
      check: (c, a) =>
        c === "shodan" &&
        a.includes("search") &&
        a.some((x) => x.includes("port:1883")),
    },
    {
      title: "Grep Firmware Config",
      why: "Search the squashfs dump again for cloud API keys.",
      text: "Type <code>grep -rnw '_firmware_v1.bin.extracted' -e 'api_key'</code>",
      objective: "Grep api_key recursively",
      xp: 35,
      check: (c, a) =>
        c === "grep" && a.includes("-rnw") && a.includes("api_key"),
    },
    {
      title: "Router Exploit Test",
      why: "Use curl to test a known router bypass vulnerability.",
      text: 'Type <code>curl -d "admin=1" http://10.0.0.1/cgi-bin/config.exp</code>',
      objective: "Curl exploit payload",
      xp: 40,
      check: (c, a) =>
        c === "curl" &&
        a.includes("-d") &&
        a.some((x) => x.includes("cgi-bin")),
    },
    {
      title: "Verify Router Root",
      why: "Check if the exploit granted root access.",
      text: "Type <code>curl http://10.0.0.1/cgi-bin/config.exp?cmd=whoami</code>",
      objective: "Curl whoami command",
      xp: 40,
      check: (c, a) => c === "curl" && a.some((x) => x.includes("whoami")),
    },
    {
      title: "Mirai Botnet Scan",
      why: "Simulate what the Mirai botnet does: bruteforce telnet on IoT.",
      text: "Type <code>hydra -l root -P passwords.txt telnet://10.0.0.200</code>",
      objective: "Hydra telnet",
      xp: 50,
      check: (c, a) => c === "hydra" && a.includes("telnet://10.0.0.200"),
    },
    {
      title: "Nmap IoT Script",
      why: "Use Nmap's vulnerability scripts against a smart TV.",
      text: "Type <code>nmap --script=broadcast-upnp-info 10.0.0.150</code>",
      objective: "Nmap broadcast-upnp",
      xp: 40,
      check: (c, a) =>
        c === "nmap" && a.some((x) => x.includes("broadcast-upnp-info")),
    },
    {
      title: "Clean Up Extraction",
      why: "Remove the firmware directories.",
      text: "Type <code>rm -rf _firmware* modified_fw.bin</code>",
      objective: "Remove firmware folders",
      xp: 20,
      check: (c, a) =>
        c === "rm" &&
        a.includes("-rf") &&
        a.some((x) => x.includes("_firmware")),
    },
    {
      title: "Stop MQTT",
      why: "Kill your listeners.",
      text: "Type <code>killall mosquitto_sub</code>",
      objective: "Killall mosquitto_sub",
      xp: 15,
      check: (c, a) => c === "killall" && a.includes("mosquitto_sub"),
    },
    {
      title: "Check System Integrity",
      why: "Ensure your own system wasn't compromised during hacking.",
      text: "Type <code>debsums -c</code>",
      objective: "Type debsums -c",
      xp: 30,
      check: (c, a) => c === "debsums" && a.includes("-c"),
    },
    {
      title: "Cyber Grandmaster",
      why: "You have completed all 20 modules and 1,200+ lessons.",
      text: 'Type <code>echo "I AM THE KERNEL GOD"</code>',
      objective: "Type echo",
      xp: 500,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("GOD"),
    },
  ],
};
