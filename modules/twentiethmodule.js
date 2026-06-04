// nineteenthmodule.js
// Module 19: Applied Cryptography & Steganography (65 Lessons)

const module19_crypto = {
  name: "19. Cryptography & Stego (65 Lessons)",
  lessons: [
    // --- PHASE 1: HASHING & INTEGRITY (1-15) ---
    {
      title: "Create Plaintext",
      why: "Cryptography requires raw data. We create a standardized plaintext file to observe how different mathematical hashing algorithms process identical byte arrays.",
      text: 'Type <code>echo "Top Secret" > secret.txt</code>',
      objective: "Create secret.txt",
      xp: 10,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("secret.txt"),
    },
    {
      title: "MD5 Hash",
      why: "The MD5 algorithm generates a 128-bit message digest. It is mathematically broken and vulnerable to 'Collision Attacks' (two different files generating the exact same hash). It should only be used for basic file integrity checks, never for security.",
      text: "Type <code>md5sum secret.txt</code>",
      objective: "Type md5sum secret.txt",
      xp: 15,
      check: (c, a) => c === "md5sum" && a.includes("secret.txt"),
    },
    {
      title: "SHA-1 Hash",
      why: "The Secure Hash Algorithm 1 generates a 160-bit digest. Like MD5, SHA-1 was shattered by Google in 2017 via the 'SHAttered' collision attack. Modern cryptographic standards deprecate its use.",
      text: "Type <code>sha1sum secret.txt</code>",
      objective: "Type sha1sum secret.txt",
      xp: 15,
      check: (c, a) => c === "sha1sum" && a.includes("secret.txt"),
    },
    {
      title: "SHA-256 Hash",
      why: "SHA-256 is the current industry gold standard. Developed by the NSA, it generates a highly secure 256-bit cryptographic signature. It is the core algorithm used in Bitcoin mining and TLS handshakes.",
      text: "Type <code>sha256sum secret.txt</code>",
      objective: "Type sha256sum secret.txt",
      xp: 20,
      check: (c, a) => c === "sha256sum" && a.includes("secret.txt"),
    },
    {
      title: "SHA-512 Hash",
      why: "An evolution of the SHA-2 family. It computes a massive 512-bit digest, utilizing 64-bit mathematical operations. This algorithm is heavily utilized in modern Linux `/etc/shadow` password storage.",
      text: "Type <code>sha512sum secret.txt</code>",
      objective: "Type sha512sum secret.txt",
      xp: 20,
      check: (c, a) => c === "sha512sum" && a.includes("secret.txt"),
    },
    {
      title: "BLAKE2 Hash",
      why: "BLAKE2 (b2sum) is a modern cryptographic hash function that is mathematically faster than MD5 and SHA-1, yet more secure than SHA-2. It is highly optimized for modern CPUs.",
      text: "Type <code>b2sum secret.txt</code>",
      objective: "Type b2sum secret.txt",
      xp: 20,
      check: (c, a) => c === "b2sum" && a.includes("secret.txt"),
    },
    {
      title: "Save Checksum",
      why: "When distributing software, developers provide a checksum file. We route the SHA-256 calculation directly into a `.sha256` file to establish a cryptographic baseline for our data.",
      text: "Type <code>sha256sum secret.txt > secret.sha256</code>",
      objective: "Save sha256sum to file",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("sha256sum") &&
        raw.includes(">") &&
        raw.includes("secret.sha256"),
    },
    {
      title: "Verify Checksum",
      why: "The <b>-c</b> (Check) flag reads the saved checksum file, independently recalculates the hash of the target file on your disk, and verifies if the two mathematical signatures perfectly match.",
      text: "Type <code>sha256sum -c secret.sha256</code>",
      objective: "Verify sha256sum",
      xp: 25,
      check: (c, a) =>
        c === "sha256sum" && a.includes("-c") && a.includes("secret.sha256"),
    },
    {
      title: "Modify Plaintext",
      why: "Let's test the 'Avalanche Effect'. We alter a single byte in our plaintext file. In a strong cryptographic algorithm, altering one bit of input should drastically change at least 50% of the output bits.",
      text: 'Type <code>echo "Top Secres" > secret.txt</code>',
      objective: "Modify secret.txt",
      xp: 15,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("Top Secres"),
    },
    {
      title: "Detect Tampering",
      why: "Run the verification check again. Because the underlying file bytes were altered, the newly calculated hash will fail against the original signature, proving the file was tampered with.",
      text: "Type <code>sha256sum -c secret.sha256</code>",
      objective: "Verify failed sha256sum",
      xp: 25,
      check: (c, a) =>
        c === "sha256sum" && a.includes("-c") && a.includes("secret.sha256"),
    },
    {
      title: "Base64 Encoding",
      why: "Encoding is NOT encryption; it provides zero security. Base64 mathematically translates raw binary data into a safe 64-character ASCII alphabet so it can be transmitted over text-only protocols like HTTP or SMTP.",
      text: 'Type <code>echo "MalwarePayload" | base64</code>',
      objective: "Base64 encode a string",
      xp: 20,
      check: (c, a, o, raw) => raw.includes("base64") && !raw.includes("-d"),
    },
    {
      title: "Base64 Decoding",
      why: "The <b>-d</b> flag reverses the Radix-64 encoding process. Attackers heavily use Base64 to obfuscate malicious PowerShell or bash commands, bypassing simple Intrusion Detection Systems.",
      text: 'Type <code>echo "TWFsd2FyZVBheWxvYWQK" | base64 -d</code>',
      objective: "Base64 decode a string",
      xp: 20,
      check: (c, a, o, raw) => raw.includes("base64") && raw.includes("-d"),
    },
    {
      title: "Hex Dump",
      why: "The <b>xxd</b> command translates the file's raw binary into a Hexadecimal block structure. This is critical for cryptanalysis when attempting to identify file headers or hidden magic bytes.",
      text: "Type <code>xxd secret.txt</code>",
      objective: "Type xxd secret.txt",
      xp: 15,
      check: (c, a) => c === "xxd" && a.includes("secret.txt"),
    },
    {
      title: "Clean Hashing Artifacts",
      why: "Remove the modified plaintext and the broken cryptographic signature file to prepare for asymmetric encryption.",
      text: "Type <code>rm secret.txt secret.sha256</code>",
      objective: "Remove text and sha files",
      xp: 10,
      check: (c, a) => c === "rm" && a.includes("secret.txt"),
    },

    // --- PHASE 2: SYMMETRIC & ASYMMETRIC ENCRYPTION (16-30) ---
    {
      title: "Generate GPG Keypair",
      why: "Asymmetric Encryption relies on two mathematically linked keys. <b>gpg --gen-key</b> generates a Public Key (to lock data) and a Private Key (to unlock data) using the RSA algorithm.",
      text: "Type <code>gpg --gen-key</code>",
      objective: "Generate GPG keys",
      xp: 30,
      check: (c, a) => c === "gpg" && a.includes("--gen-key"),
    },
    {
      title: "List Public Keys",
      why: "Query the local GnuPG keyring memory to verify the kernel successfully generated and stored the public component of your cryptographic identity.",
      text: "Type <code>gpg --list-keys</code>",
      objective: "List GPG keys",
      xp: 15,
      check: (c, a) => c === "gpg" && a.includes("--list-keys"),
    },
    {
      title: "Export Public Key",
      why: "To allow others to send you secure messages, you must export your Public Key into an ASCII-armored (<b>-a</b>) block. This key can be safely posted publicly on the internet.",
      text: "Type <code>gpg -a --export > public.asc</code>",
      objective: "Export GPG public key",
      xp: 35,
      check: (c, a, o, raw) =>
        c === "gpg" && raw.includes("--export") && raw.includes("public.asc"),
    },
    {
      title: "View Public Key",
      why: "Examine the exported ASCII-armored RSA key block. This mathematical matrix allows anyone to encrypt data that only your private key can decrypt.",
      text: "Type <code>cat public.asc</code>",
      objective: "Read public.asc",
      xp: 15,
      check: (c, a) => c === "cat" && a[0] === "public.asc",
    },
    {
      title: "Create Secret Data",
      why: "Establish a highly sensitive plaintext file that we will encrypt to simulate secure network communication.",
      text: 'Type <code>echo "Launch Codes" > mission.txt</code>',
      objective: "Create mission.txt",
      xp: 10,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("mission.txt"),
    },
    {
      title: "Encrypt Asymmetrically",
      why: "The <b>-e</b> flag encrypts the file. The <b>-r</b> flag specifies the recipient's public key. The resulting file (`mission.txt.gpg`) is mathematically locked and can only be opened by the private key holder.",
      text: "Type <code>gpg -e -a -r SysAdmin mission.txt</code>",
      objective: "Encrypt mission.txt",
      xp: 40,
      check: (c, a) =>
        c === "gpg" &&
        a.includes("-e") &&
        a.includes("-r") &&
        a.includes("mission.txt"),
    },
    {
      title: "Delete Plaintext",
      why: "Once the data is securely locked inside the GPG block, violently delete the plaintext original from the hard drive to prevent forensic recovery.",
      text: "Type <code>rm mission.txt</code>",
      objective: "Remove mission.txt",
      xp: 10,
      check: (c, a) => c === "rm" && a[0] === "mission.txt",
    },
    {
      title: "Decrypt Asymmetrically",
      why: "The <b>-d</b> flag reads the encrypted GPG block, queries your local keyring for the matching Private Key, and processes the decryption algorithm, dumping the plaintext output to your terminal.",
      text: "Type <code>gpg -d mission.txt.gpg</code>",
      objective: "Decrypt mission.txt.gpg",
      xp: 40,
      check: (c, a) =>
        c === "gpg" && a.includes("-d") && a.includes("mission.txt.gpg"),
    },
    {
      title: "Symmetric OpenSSL",
      why: "Asymmetric (RSA) is slow. Symmetric encryption uses a single password to both lock and unlock data, and is heavily utilized for bulk file encryption. <b>openssl enc -aes-256-cbc</b> initiates a military-grade block cipher.",
      text: "Type <code>openssl enc -aes-256-cbc -salt -in public.asc -out secure.enc</code>",
      objective: "Use openssl aes-256-cbc",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("enc") && a.includes("-aes-256-cbc"),
    },
    {
      title: "Decrypt OpenSSL",
      why: "The <b>-d</b> flag reverses the AES-256 Cipher Block Chaining (CBC) algorithm, requiring the exact same initialization password you used to encrypt it.",
      text: "Type <code>openssl enc -d -aes-256-cbc -in secure.enc -out recovered.asc</code>",
      objective: "Decrypt with openssl",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("-d") && a.includes("-aes-256-cbc"),
    },

    // --- PHASE 3: PKI, CERTIFICATES & TLS (31-45) ---
    {
      title: "Generate RSA Key",
      why: "Public Key Infrastructure (PKI) secures the internet via HTTPS. First, we use OpenSSL to generate an unencrypted 2048-bit RSA private key, which forms the mathematical foundation of our server.",
      text: "Type <code>openssl genrsa -out server.key 2048</code>",
      objective: "Generate RSA key",
      xp: 35,
      check: (c, a) =>
        c === "openssl" && a.includes("genrsa") && a.includes("2048"),
    },
    {
      title: "Generate CSR",
      why: "A Certificate Signing Request (CSR) is an encoded message sent to a Certificate Authority (like VeriSign). It contains your Public Key and company metadata, requesting them to legally cryptographically sign your identity.",
      text: "Type <code>openssl req -new -key server.key -out server.csr</code>",
      objective: "Generate CSR",
      xp: 45,
      check: (c, a) =>
        c === "openssl" && a.includes("req") && a.includes("-new"),
    },
    {
      title: "Self-Sign Certificate",
      why: "For internal networks, we act as our own Certificate Authority. We use the X.509 standard to self-sign the CSR using our own Private Key, establishing a valid TLS certificate valid for 365 days.",
      text: "Type <code>openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt</code>",
      objective: "Self-sign certificate",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("x509") && a.includes("-req"),
    },
    {
      title: "Inspect Certificate",
      why: "The X.509 certificate is encoded in PEM format. The <b>-text -noout</b> arguments command OpenSSL to decode the certificate and print the cryptographic modulus, issuer metadata, and validity dates in human-readable text.",
      text: "Type <code>openssl x509 -in server.crt -text -noout</code>",
      objective: "Inspect x509 certificate",
      xp: 40,
      check: (c, a) =>
        c === "openssl" && a.includes("x509") && a.includes("-text"),
    },
    {
      title: "Extract Public Key",
      why: "Using OpenSSL, you can mathematically derive and extract the pure Public Key vector directly from the X.509 certificate structural matrix.",
      text: "Type <code>openssl x509 -in server.crt -pubkey -noout > server_pub.pem</code>",
      objective: "Extract pubkey from cert",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("openssl") &&
        raw.includes("-pubkey") &&
        raw.includes("server_pub.pem"),
    },
    {
      title: "Test TLS Server",
      why: "OpenSSL includes `s_server`, a diagnostic tool that opens a listening port and simulates a full web server, allowing you to test if your newly generated keys successfully negotiate a TLS cryptographic handshake.",
      text: "Type <code>openssl s_server -cert server.crt -key server.key -accept 4433 &</code>",
      objective: "Start openssl s_server",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("s_server") &&
        raw.includes("-accept") &&
        raw.includes("4433"),
    },
    {
      title: "Test TLS Client",
      why: "The `s_client` acts as a diagnostic browser. It connects to the server, outputs the entire TLS handshake process, reveals the negotiated Cipher Suite (e.g., ECDHE-RSA-AES256-GCM-SHA384), and validates the certificate chain.",
      text: "Type <code>openssl s_client -connect localhost:4433</code>",
      objective: "Connect openssl s_client",
      xp: 45,
      check: (c, a) =>
        c === "openssl" &&
        a.includes("s_client") &&
        a.includes("localhost:4433"),
    },
    {
      title: "Kill TLS Server",
      why: "Terminate the diagnostic OpenSSL background process.",
      text: "Type <code>killall openssl</code>",
      objective: "Kill openssl",
      xp: 15,
      check: (c, a) => c === "killall" && a.includes("openssl"),
    },

    // --- PHASE 4: STEGANOGRAPHY (46-55) ---
    {
      title: "Simulate Image",
      why: "Steganography is the art of hiding data in plain sight. Create a simulated JPEG file that we will use to conceal our encrypted payloads.",
      text: "Type <code>touch cover.jpg</code>",
      objective: "Create cover.jpg",
      xp: 10,
      check: (c, a) => c === "touch" && a[0] === "cover.jpg",
    },
    {
      title: "Steghide Embed",
      why: "<b>steghide</b> targets image and audio files. It parses the file and manipulates the Least Significant Bits (LSB) of the pixel color data, mathematically injecting the secret file into the image without altering how it looks to the human eye.",
      text: "Type <code>steghide embed -ef mission.txt.gpg -cf cover.jpg -p 'password123'</code>",
      objective: "Embed data with steghide",
      xp: 45,
      check: (c, a) =>
        c === "steghide" && a.includes("embed") && a.includes("cover.jpg"),
    },
    {
      title: "Steghide Info",
      why: "The <b>info</b> command probes the image. If provided the correct extraction password, the algorithm verifies that a hidden payload matrix exists inside the file's LSB data.",
      text: "Type <code>steghide info cover.jpg -p 'password123'</code>",
      objective: "Get steghide info",
      xp: 30,
      check: (c, a) =>
        c === "steghide" && a.includes("info") && a.includes("cover.jpg"),
    },
    {
      title: "Steghide Extract",
      why: "The <b>extract</b> command processes the passphrase, navigates the manipulated LSB pixels, and perfectly rebuilds the hidden GPG archive onto the hard drive.",
      text: "Type <code>steghide extract -sf cover.jpg -p 'password123'</code>",
      objective: "Extract with steghide",
      xp: 40,
      check: (c, a) =>
        c === "steghide" && a.includes("extract") && a.includes("cover.jpg"),
    },
    {
      title: "Zsteg Analysis",
      why: "<b>zsteg</b> is a forensic tool. It automates LSB detection against PNG and BMP files, rapidly testing multiple mathematical data layouts and RGB channels to blindly detect hidden payloads.",
      text: "Type <code>zsteg cover.jpg</code>",
      objective: "Analyze with zsteg",
      xp: 25,
      check: (c, a) => c === "zsteg" && a.includes("cover.jpg"),
    },
    {
      title: "Exiftool Analysis",
      why: "Attackers often hide reverse shells inside the Exif metadata of images (like the 'Artist' or 'Copyright' tags) and upload them to bypass web filters. <b>exiftool</b> dumps all embedded metadata.",
      text: "Type <code>exiftool cover.jpg</code>",
      objective: "Analyze with exiftool",
      xp: 25,
      check: (c, a) => c === "exiftool" && a.includes("cover.jpg"),
    },
    {
      title: "Binwalk Forensics",
      why: "<b>binwalk</b> is an elite structural analysis engine. It scans the raw hex bytes of a file and looks for embedded file signatures. If an attacker appended a hidden `.zip` file directly to the end of the `.jpg` hex code, binwalk will instantly find it.",
      text: "Type <code>binwalk cover.jpg</code>",
      objective: "Analyze with binwalk",
      xp: 30,
      check: (c, a) => c === "binwalk" && a.includes("cover.jpg"),
    },
    {
      title: "Binwalk Extraction",
      why: "The <b>-e</b> flag forces `binwalk` to use the `dd` command internally to carve out any hidden file signatures it finds, dumping the extracted archives into a dedicated staging folder.",
      text: "Type <code>binwalk -e cover.jpg</code>",
      objective: "Extract with binwalk -e",
      xp: 35,
      check: (c, a) =>
        c === "binwalk" && a.includes("-e") && a.includes("cover.jpg"),
    },

    // --- PHASE 5: CRACKING INFRASTRUCTURE (56-65) ---
    {
      title: "PDF2John",
      why: "Digital Forensics: You intercepted an encrypted, password-protected PDF. <b>pdf2john</b> parses the document headers and extracts the complex cryptographic hashing variables into a text string readable by cracking engines.",
      text: "Type <code>pdf2john locked.pdf > pdf_hash.txt</code>",
      objective: "Use pdf2john",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("pdf2john") && raw.includes("locked.pdf"),
    },
    {
      title: "Zip2John",
      why: "Similarly, <b>zip2john</b> extracts the PKZIP cryptographic headers from a locked archive so we can attack the hash offline, rather than attempting to interact with the ZIP software directly.",
      text: "Type <code>zip2john secret.zip > zip_hash.txt</code>",
      objective: "Use zip2john",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("zip2john") && raw.includes("secret.zip"),
    },
    {
      title: "Crack ZIP",
      why: "Execute John the Ripper. The engine calculates billions of candidate passwords, hashes them using the extracted PKZIP math, and compares them to the target hash until a perfect collision occurs.",
      text: "Type <code>john zip_hash.txt</code>",
      objective: "Crack zip hash",
      xp: 40,
      check: (c, a) =>
        c === "john" && a.includes("zip_hash.txt") && !a.includes("--show"),
    },
    {
      title: "Hashcat Advanced Mode",
      why: "Execute Hashcat in Mode 13000 (RAR5 archive). Using the `-a 3` (Brute-Force/Mask) attack type, Hashcat uses the GPU to mathematically exhaust all possible character combinations.",
      text: "Type <code>hashcat -m 13000 -a 3 rar_hash.txt ?a?a?a?a</code>",
      objective: "Run hashcat mask attack",
      xp: 50,
      check: (c, a) =>
        c === "hashcat" &&
        a.includes("-a") &&
        a.includes("3") &&
        a.some((x) => x.includes("?a?a")),
    },
    {
      title: "Clean Hashes",
      why: "Eradicate the forensic hash dumps from the filesystem to complete the intelligence operation.",
      text: "Type <code>rm *.txt *.asc *.enc *.crt *.key *.csr *.gpg *.pem</code>",
      objective: "Remove artifacts",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("*.txt"),
    },
    {
      title: "Clean PKI",
      why: "Remove all generated certificates to leave a pristine architecture.",
      text: "Type <code>rm -rf _cover.jpg.extracted</code>",
      objective: "Remove extracted dirs",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("-rf"),
    },
    {
      title: "Cryptography Master",
      why: "You understand LSB Manipulation, Asymmetric RSA Tunnels, Cryptographic Hashes, and Digital Signatures. You are an Encryption Architect.",
      text: 'Type <code>echo "Cipher Cracked"</code>',
      objective: "Echo final message",
      xp: 100,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Cipher"),
    },
  ],
};
