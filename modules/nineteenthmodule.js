// nineteenthmodule.js
// Module 19: Applied Cryptography & Steganography (100 Lessons)

const module19_crypto = {
  name: "19. Cryptography & Stego (100 Lessons)",
  lessons: [
    // --- PHASE 1: HASHING & INTEGRITY (1-20) ---
    {
      title: "Create Plaintext",
      why: "Create a file to hash.",
      text: 'Type <code>echo "Top Secret" > secret.txt</code>',
      objective: "Create secret.txt",
      xp: 10,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("secret.txt"),
    },
    {
      title: "MD5 Hash",
      why: "Generate a legacy, mathematically broken MD5 hash.",
      text: "Type <code>md5sum secret.txt</code>",
      objective: "Type md5sum secret.txt",
      xp: 15,
      check: (c, a) => c === "md5sum" && a.includes("secret.txt"),
    },
    {
      title: "SHA-1 Hash",
      why: "Generate a SHA-1 hash (also deprecated for high security).",
      text: "Type <code>sha1sum secret.txt</code>",
      objective: "Type sha1sum secret.txt",
      xp: 15,
      check: (c, a) => c === "sha1sum" && a.includes("secret.txt"),
    },
    {
      title: "SHA-256 Hash",
      why: "Generate a modern, highly secure 256-bit hash.",
      text: "Type <code>sha256sum secret.txt</code>",
      objective: "Type sha256sum secret.txt",
      xp: 20,
      check: (c, a) => c === "sha256sum" && a.includes("secret.txt"),
    },
    {
      title: "SHA-512 Hash",
      why: "Generate military-grade 512-bit hash.",
      text: "Type <code>sha512sum secret.txt</code>",
      objective: "Type sha512sum secret.txt",
      xp: 20,
      check: (c, a) => c === "sha512sum" && a.includes("secret.txt"),
    },
    {
      title: "Save Hash to File",
      why: "Save the hash so you can verify it later.",
      text: "Type <code>sha256sum secret.txt > secret.sha256</code>",
      objective: "Redirect sha256sum to file",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("sha256sum") &&
        raw.includes(">") &&
        raw.includes("secret.sha256"),
    },
    {
      title: "Verify Hash",
      why: "Check if the file has been tampered with.",
      text: "Type <code>sha256sum -c secret.sha256</code>",
      objective: "Use sha256sum -c",
      xp: 35,
      check: (c, a) =>
        c === "sha256sum" && a.includes("-c") && a.includes("secret.sha256"),
    },
    {
      title: "Tamper the File",
      why: "Change the file slightly.",
      text: 'Type <code>echo "tampered" >> secret.txt</code>',
      objective: "Append to secret.txt",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("echo") &&
        raw.includes(">>") &&
        raw.includes("secret.txt"),
    },
    {
      title: "Detect Tampering",
      why: "The hash check will now fail because the data changed.",
      text: "Type <code>sha256sum -c secret.sha256</code>",
      objective: "Run hash check again",
      xp: 30,
      check: (c, a) =>
        c === "sha256sum" && a.includes("-c") && a.includes("secret.sha256"),
    },
    {
      title: "Hash a String",
      why: "Hash text directly from the command line.",
      text: 'Type <code>echo -n "password" | md5sum</code>',
      objective: "Pipe string to md5sum",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("md5sum") && raw.includes("|"),
    },
    {
      title: "Hash Password (SHA256)",
      why: "Hash a password securely.",
      text: 'Type <code>echo -n "admin123" | sha256sum</code>',
      objective: "Pipe string to sha256sum",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("sha256sum") && raw.includes("|"),
    },
    {
      title: "B2Sum (Blake2)",
      why: "Use Blake2, a hash function faster than MD5 but more secure than SHA-3.",
      text: "Type <code>b2sum secret.txt</code>",
      objective: "Type b2sum secret.txt",
      xp: 30,
      check: (c, a) => c === "b2sum" && a.includes("secret.txt"),
    },
    {
      title: "View Hash Lengths",
      why: "Compare the visual lengths of different hashes.",
      text: "Type <code>sha1sum secret.txt && sha512sum secret.txt</code>",
      objective: "Run both hash commands",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("sha1sum") &&
        raw.includes("&&") &&
        raw.includes("sha512sum"),
    },
    {
      title: "Create checksums file",
      why: "Store multiple hashes.",
      text: "Type <code>touch hashes.txt</code>",
      objective: "Create hashes.txt",
      xp: 10,
      check: (c, a) => c === "touch" && a.includes("hashes.txt"),
    },
    {
      title: "Find Linux Hashes",
      why: "Look at the shadow file where Linux stores user hashes.",
      text: "Type <code>cat /etc/shadow | head -n 3</code>",
      objective: "Cat shadow file",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("cat") && raw.includes("/etc/shadow"),
    },
    {
      title: "Identify Hash Type",
      why: "In /etc/shadow, $6$ means SHA-512, $1$ means MD5.",
      text: 'Type <code>grep "$6$" /etc/shadow</code>',
      objective: "Grep for SHA-512 in shadow",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("grep") &&
        raw.includes("$6$") &&
        raw.includes("/etc/shadow"),
    },
    {
      title: "Base64 Encode",
      why: "Encoding is NOT encryption. It just translates data into safe text.",
      text: 'Type <code>echo "Hidden" | base64</code>',
      objective: "Pipe string to base64",
      xp: 25,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("base64") && raw.includes("|"),
    },
    {
      title: "Base64 Decode",
      why: "Translate it back.",
      text: 'Type <code>echo "SGlkZGVuCg==" | base64 -d</code>',
      objective: "Decode base64 string",
      xp: 30,
      check: (c, a, o, raw) => raw.includes("base64") && raw.includes("-d"),
    },
    {
      title: "Base32 Encode",
      why: "Base32 uses only A-Z and 2-7, useful for DNS tunneling.",
      text: 'Type <code>echo "Data" | base32</code>',
      objective: "Pipe to base32",
      xp: 25,
      check: (c, a, o, raw) => raw.includes("base32") && !raw.includes("-d"),
    },
    {
      title: "Hex Dump",
      why: "Convert a file to raw hex.",
      text: "Type <code>xxd secret.txt</code>",
      objective: "Type xxd secret.txt",
      xp: 20,
      check: (c, a) => c === "xxd" && a.includes("secret.txt"),
    },

    // --- PHASE 2: SYMMETRIC ENCRYPTION (21-40) ---
    {
      title: "Symmetric GPG",
      why: "Encrypt a file using a single password (symmetric).",
      text: "Type <code>gpg -c secret.txt</code>",
      objective: "Use gpg -c",
      xp: 40,
      check: (c, a) =>
        c === "gpg" && a.includes("-c") && a.includes("secret.txt"),
    },
    {
      title: "List Encrypted File",
      why: "Notice the new .gpg file.",
      text: "Type <code>ls -l secret.txt.gpg</code>",
      objective: "List the gpg file",
      xp: 15,
      check: (c, a) =>
        c === "ls" && a.some((x) => x.includes("secret.txt.gpg")),
    },
    {
      title: "Delete Original",
      why: "Remove the plaintext to secure the data.",
      text: "Type <code>rm secret.txt</code>",
      objective: "Type rm secret.txt",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("secret.txt"),
    },
    {
      title: "Decrypt GPG",
      why: "Restore the file using your password.",
      text: "Type <code>gpg -d secret.txt.gpg > secret.txt</code>",
      objective: "Use gpg -d",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("gpg") &&
        raw.includes("-d") &&
        raw.includes("secret.txt.gpg"),
    },
    {
      title: "OpenSSL Encrypt",
      why: "Use OpenSSL to symmetrically encrypt with AES-256.",
      text: "Type <code>openssl enc -aes-256-cbc -in secret.txt -out secret.enc</code>",
      objective: "Use openssl enc",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("enc") && a.includes("-aes-256-cbc"),
    },
    {
      title: "OpenSSL Decrypt",
      why: "Decrypt the AES-256 file.",
      text: "Type <code>openssl enc -d -aes-256-cbc -in secret.enc -out secret2.txt</code>",
      objective: "Use openssl enc -d",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("-d") && a.includes("secret.enc"),
    },
    {
      title: "File Command on Encrypted",
      why: "Check how the OS sees encrypted data.",
      text: "Type <code>file secret.enc</code>",
      objective: "Type file secret.enc",
      xp: 20,
      check: (c, a) => c === "file" && a.includes("secret.enc"),
    },
    {
      title: "Create Archive",
      why: "Bundle files before encrypting.",
      text: "Type <code>tar -cvf backup.tar secret.txt</code>",
      objective: "Create a tar file",
      xp: 25,
      check: (c, a) => c === "tar" && a.includes("-cvf"),
    },
    {
      title: "Encrypt Archive",
      why: "Symmetrically encrypt the tarball.",
      text: "Type <code>gpg -c backup.tar</code>",
      objective: "Encrypt backup.tar",
      xp: 30,
      check: (c, a) =>
        c === "gpg" && a.includes("-c") && a.includes("backup.tar"),
    },
    {
      title: "Remove Tarball",
      why: "Wipe the unencrypted tarball.",
      text: "Type <code>rm backup.tar</code>",
      objective: "Remove backup.tar",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("backup.tar"),
    },
    {
      title: "Create Random Key",
      why: "Generate a truly random 32-byte key for encryption.",
      text: "Type <code>openssl rand -hex 32 > mykey.txt</code>",
      objective: "Use openssl rand",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("openssl") &&
        raw.includes("rand") &&
        raw.includes("-hex") &&
        raw.includes(">"),
    },
    {
      title: "View Key",
      why: "Check the raw hex key.",
      text: "Type <code>cat mykey.txt</code>",
      objective: "Cat mykey.txt",
      xp: 15,
      check: (c, a) => c === "cat" && a.includes("mykey.txt"),
    },
    {
      title: "Encrypt with File Key",
      why: "Use the key file to encrypt data.",
      text: "Type <code>openssl enc -aes-256-cbc -pass file:./mykey.txt -in secret.txt -out file.enc</code>",
      objective: "Encrypt using pass file",
      xp: 50,
      check: (c, a) =>
        c === "openssl" &&
        a.includes("-pass") &&
        a.some((x) => x.includes("mykey.txt")),
    },
    {
      title: "Decrypt with File Key",
      why: "Use the key file to decrypt data.",
      text: "Type <code>openssl enc -d -aes-256-cbc -pass file:./mykey.txt -in file.enc -out secret3.txt</code>",
      objective: "Decrypt using pass file",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("-d") && a.includes("-pass"),
    },
    {
      title: "Shred File",
      why: "rm doesn't actually delete data. Shred overwrites it with 0s.",
      text: "Type <code>shred -u -z secret.txt</code>",
      objective: "Use shred -u -z",
      xp: 40,
      check: (c, a) => c === "shred" && a.includes("-u") && a.includes("-z"),
    },
    {
      title: "Shred Key",
      why: "Destroy the key file securely.",
      text: "Type <code>shred -u -z mykey.txt</code>",
      objective: "Shred mykey.txt",
      xp: 30,
      check: (c, a) => c === "shred" && a.includes("mykey.txt"),
    },
    {
      title: "Encrypt String",
      why: "Encrypt a string via pipeline.",
      text: 'Type <code>echo "Msg" | openssl enc -aes-256-cbc -a -salt -pass pass:1234</code>',
      objective: "Pipeline to openssl enc",
      xp: 50,
      check: (c, a, o, raw) =>
        raw.includes("openssl") &&
        raw.includes("-a") &&
        raw.includes("pass:1234"),
    },
    {
      title: "Analyze Entropy",
      why: "Encrypted files have high entropy (randomness).",
      text: "Type <code>ent file.enc</code>",
      objective: "Type ent file.enc",
      xp: 30,
      check: (c, a) => c === "ent" && a.includes("file.enc"),
    },
    {
      title: "Try Strings",
      why: "Attempt to read the encrypted file.",
      text: "Type <code>strings file.enc</code>",
      objective: "Type strings file.enc",
      xp: 20,
      check: (c, a) => c === "strings" && a.includes("file.enc"),
    },
    {
      title: "Clean Up Encrypted",
      why: "Remove test files.",
      text: "Type <code>rm *.enc *.gpg</code>",
      objective: "Remove .enc and .gpg",
      xp: 20,
      check: (c, a) => c === "rm" && a.includes("*.enc"),
    },

    // --- PHASE 3: ASYMMETRIC ENCRYPTION (PKI) (41-65) ---
    {
      title: "Generate GPG Keys",
      why: "Generate a public/private keypair. The public key encrypts; only the private key decrypts.",
      text: "Type <code>gpg --gen-key</code>",
      objective: "Type gpg --gen-key",
      xp: 50,
      check: (c, a) => c === "gpg" && a.includes("--gen-key"),
    },
    {
      title: "List Public Keys",
      why: "View your local keyring.",
      text: "Type <code>gpg --list-keys</code>",
      objective: "Type gpg --list-keys",
      xp: 20,
      check: (c, a) => c === "gpg" && a.includes("--list-keys"),
    },
    {
      title: "List Secret Keys",
      why: "View your private keyring.",
      text: "Type <code>gpg --list-secret-keys</code>",
      objective: "Type gpg --list-secret-keys",
      xp: 20,
      check: (c, a) => c === "gpg" && a.includes("--list-secret-keys"),
    },
    {
      title: "Export Public Key",
      why: "Extract your public key so you can share it with others.",
      text: "Type <code>gpg --armor --export admin@gemini.local > pubkey.asc</code>",
      objective: "Export public key to pubkey.asc",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("gpg") &&
        raw.includes("--export") &&
        raw.includes("pubkey.asc"),
    },
    {
      title: "View Public Key",
      why: "Look at the armored ASCII output.",
      text: "Type <code>cat pubkey.asc</code>",
      objective: "Cat pubkey.asc",
      xp: 15,
      check: (c, a) => c === "cat" && a.includes("pubkey.asc"),
    },
    {
      title: "Create Message",
      why: "Create a message to encrypt.",
      text: 'Type <code>echo "Attack at dawn" > orders.txt</code>',
      objective: "Create orders.txt",
      xp: 15,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("orders.txt"),
    },
    {
      title: "Asymmetric Encrypt",
      why: "Encrypt the file USING the public key (only the private key can open it).",
      text: "Type <code>gpg -e -r admin@gemini.local orders.txt</code>",
      objective: "Use gpg -e -r",
      xp: 50,
      check: (c, a) =>
        c === "gpg" &&
        a.includes("-e") &&
        a.includes("-r") &&
        a.includes("orders.txt"),
    },
    {
      title: "Remove Plaintext",
      why: "Delete the orders.",
      text: "Type <code>rm orders.txt</code>",
      objective: "Type rm orders.txt",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("orders.txt"),
    },
    {
      title: "Decrypt Asymmetric",
      why: "Use your private key to open the file.",
      text: "Type <code>gpg -d orders.txt.gpg > orders.txt</code>",
      objective: "Decrypt orders.txt.gpg",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("gpg") &&
        raw.includes("-d") &&
        raw.includes("orders.txt.gpg"),
    },
    {
      title: "Sign a File",
      why: "Digitally sign a file to prove YOU wrote it.",
      text: "Type <code>gpg --sign orders.txt</code>",
      objective: "Use gpg --sign",
      xp: 40,
      check: (c, a) =>
        c === "gpg" && a.includes("--sign") && a.includes("orders.txt"),
    },
    {
      title: "Verify Signature",
      why: "Verify the cryptographic signature of the file.",
      text: "Type <code>gpg --verify orders.txt.gpg</code>",
      objective: "Use gpg --verify",
      xp: 40,
      check: (c, a) =>
        c === "gpg" && a.includes("--verify") && a.includes("orders.txt.gpg"),
    },
    {
      title: "Clear Sign",
      why: "Sign a file while leaving the text readable in plain ASCII.",
      text: "Type <code>gpg --clearsign orders.txt</code>",
      objective: "Use gpg --clearsign",
      xp: 40,
      check: (c, a) =>
        c === "gpg" && a.includes("--clearsign") && a.includes("orders.txt"),
    },
    {
      title: "View Clearsign",
      why: "Look at the PGP signature block.",
      text: "Type <code>cat orders.txt.asc</code>",
      objective: "Cat orders.txt.asc",
      xp: 20,
      check: (c, a) => c === "cat" && a.includes("orders.txt.asc"),
    },
    {
      title: "Import Key",
      why: "Simulate importing someone else's public key.",
      text: "Type <code>gpg --import pubkey.asc</code>",
      objective: "Type gpg --import",
      xp: 35,
      check: (c, a) =>
        c === "gpg" && a.includes("--import") && a.includes("pubkey.asc"),
    },
    {
      title: "Delete Public Key",
      why: "Remove a key from your keyring.",
      text: "Type <code>gpg --delete-key admin@gemini.local</code>",
      objective: "Type gpg --delete-key",
      xp: 35,
      check: (c, a) => c === "gpg" && a.includes("--delete-key"),
    },
    {
      title: "Generate RSA Key",
      why: "Use OpenSSL to generate a raw RSA private key.",
      text: "Type <code>openssl genrsa -out private.pem 2048</code>",
      objective: "Type openssl genrsa",
      xp: 45,
      check: (c, a) =>
        c === "openssl" && a.includes("genrsa") && a.includes("private.pem"),
    },
    {
      title: "Extract RSA Public",
      why: "Extract the public key from the private PEM file.",
      text: "Type <code>openssl rsa -in private.pem -pubout -out public.pem</code>",
      objective: "Use openssl rsa -pubout",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("rsa") && a.includes("-pubout"),
    },
    {
      title: "View RSA Key",
      why: "Look at the raw PEM format.",
      text: "Type <code>cat private.pem | head -n 2</code>",
      objective: "Cat private.pem",
      xp: 20,
      check: (c, a, o, raw) =>
        raw.includes("cat") && raw.includes("private.pem"),
    },
    {
      title: "SSH Keygen",
      why: "Generate an SSH asymmetric keypair.",
      text: 'Type <code>ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519</code>',
      objective: "Generate ed25519 key",
      xp: 40,
      check: (c, a) =>
        c === "ssh-keygen" && a.includes("-t") && a.includes("ed25519"),
    },
    {
      title: "SSH Keyscan",
      why: "Scan a remote server to steal its public SSH host key.",
      text: "Type <code>ssh-keyscan 10.0.0.99 > known.txt</code>",
      objective: "Use ssh-keyscan",
      xp: 40,
      check: (c, a, o, raw) =>
        raw.includes("ssh-keyscan") &&
        raw.includes(">") &&
        raw.includes("known.txt"),
    },
    {
      title: "Read Host Key",
      why: "View the captured host key.",
      text: "Type <code>cat known.txt</code>",
      objective: "Cat known.txt",
      xp: 15,
      check: (c, a) => c === "cat" && a.includes("known.txt"),
    },
    {
      title: "Create CSR",
      why: "Create a Certificate Signing Request for a web server.",
      text: 'Type <code>openssl req -new -key private.pem -out server.csr -subj "/CN=gemini.local"</code>',
      objective: "Create a CSR with openssl",
      xp: 50,
      check: (c, a) =>
        c === "openssl" && a.includes("req") && a.includes("server.csr"),
    },
    {
      title: "Self-Sign Cert",
      why: "Generate a self-signed X.509 SSL certificate.",
      text: "Type <code>openssl x509 -req -days 365 -in server.csr -signkey private.pem -out server.crt</code>",
      objective: "Generate x509 cert",
      xp: 55,
      check: (c, a) =>
        c === "openssl" && a.includes("x509") && a.includes("server.crt"),
    },
    {
      title: "Inspect Cert",
      why: "Read the metadata of the SSL certificate.",
      text: "Type <code>openssl x509 -text -noout -in server.crt</code>",
      objective: "Inspect x509 cert",
      xp: 45,
      check: (c, a) =>
        c === "openssl" && a.includes("-text") && a.includes("server.crt"),
    },
    {
      title: "Clean Up PKI",
      why: "Wipe all the keys.",
      text: "Type <code>rm *.pem *.crt *.csr *.asc</code>",
      objective: "Remove PKI files",
      xp: 20,
      check: (c, a) => c === "rm" && a.includes("*.pem"),
    },

    // --- PHASE 4: STEGANOGRAPHY (66-85) ---
    {
      title: "Download Image",
      why: "Get an innocent-looking image file.",
      text: "Type <code>wget http://target.local/logo.jpg</code>",
      objective: "Download logo.jpg",
      xp: 20,
      check: (c, a) => c === "wget" && a.some((x) => x.includes("logo.jpg")),
    },
    {
      title: "Create Secret File",
      why: "Create the payload you want to hide.",
      text: 'Type <code>echo "Coordinates: 45N 12W" > payload.txt</code>',
      objective: "Create payload.txt",
      xp: 15,
      check: (c, a, o, raw) =>
        raw.includes("echo") && raw.includes("payload.txt"),
    },
    {
      title: "Steghide Embed",
      why: "Embed the text file INSIDE the image file using a password.",
      text: 'Type <code>steghide embed -cf logo.jpg -ef payload.txt -p "ninja"</code>',
      objective: "Embed with steghide",
      xp: 50,
      check: (c, a) =>
        c === "steghide" &&
        a.includes("embed") &&
        a.includes("logo.jpg") &&
        a.includes("payload.txt"),
    },
    {
      title: "Delete Payload",
      why: "Remove the original payload so it only exists inside the image.",
      text: "Type <code>rm payload.txt</code>",
      objective: "Type rm payload.txt",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("payload.txt"),
    },
    {
      title: "Steghide Info",
      why: "Query the image to see if it has hidden data (requires password).",
      text: 'Type <code>steghide info logo.jpg -p "ninja"</code>',
      objective: "Use steghide info",
      xp: 35,
      check: (c, a) =>
        c === "steghide" && a.includes("info") && a.includes("logo.jpg"),
    },
    {
      title: "Steghide Extract",
      why: "Extract the hidden data out of the image.",
      text: 'Type <code>steghide extract -sf logo.jpg -p "ninja"</code>',
      objective: "Use steghide extract",
      xp: 50,
      check: (c, a) =>
        c === "steghide" && a.includes("extract") && a.includes("logo.jpg"),
    },
    {
      title: "Read Payload",
      why: "Verify the extracted data.",
      text: "Type <code>cat payload.txt</code>",
      objective: "Cat payload.txt",
      xp: 15,
      check: (c, a) => c === "cat" && a.includes("payload.txt"),
    },
    {
      title: "EXIF Data",
      why: "Images have metadata (GPS, Camera model). Extract it.",
      text: "Type <code>exiftool logo.jpg</code>",
      objective: "Use exiftool",
      xp: 30,
      check: (c, a) => c === "exiftool" && a.includes("logo.jpg"),
    },
    {
      title: "Clear EXIF",
      why: "Wipe all metadata from an image to protect anonymity.",
      text: "Type <code>exiftool -all= logo.jpg</code>",
      objective: "Wipe EXIF data",
      xp: 40,
      check: (c, a) =>
        c === "exiftool" && a.includes("-all=") && a.includes("logo.jpg"),
    },
    {
      title: "Append Data",
      why: "A crude stego method: simply append a zip file to the end of a JPEG.",
      text: "Type <code>cat payload.txt >> logo.jpg</code>",
      objective: "Append to logo.jpg",
      xp: 35,
      check: (c, a, o, raw) =>
        raw.includes("cat") && raw.includes(">>") && raw.includes("logo.jpg"),
    },
    {
      title: "Strings Image",
      why: "Look for plain text hidden in the binary image data.",
      text: "Type <code>strings logo.jpg | tail -n 5</code>",
      objective: "Use strings on image",
      xp: 30,
      check: (c, a, o, raw) =>
        raw.includes("strings") &&
        raw.includes("logo.jpg") &&
        raw.includes("tail"),
    },
    {
      title: "Binwalk Analysis",
      why: "Binwalk searches binary files for embedded files (like hidden zips).",
      text: "Type <code>binwalk logo.jpg</code>",
      objective: "Type binwalk logo.jpg",
      xp: 40,
      check: (c, a) =>
        c === "binwalk" && a.includes("logo.jpg") && !a.includes("-e"),
    },
    {
      title: "Binwalk Extract",
      why: "Force Binwalk to extract any hidden files it finds.",
      text: "Type <code>binwalk -e logo.jpg</code>",
      objective: "Use binwalk -e",
      xp: 45,
      check: (c, a) =>
        c === "binwalk" && a.includes("-e") && a.includes("logo.jpg"),
    },
    {
      title: "List Extracted",
      why: "Check the folder Binwalk created.",
      text: "Type <code>ls -l _logo.jpg.extracted/</code>",
      objective: "List extracted folder",
      xp: 20,
      check: (c, a) => c === "ls" && a.some((x) => x.includes("extracted")),
    },
    {
      title: "Zsteg Concept",
      why: "zsteg detects hidden data in PNG/BMP files (simulated here).",
      text: "Type <code>zsteg image.png</code>",
      objective: "Type zsteg image.png",
      xp: 30,
      check: (c, a) => c === "zsteg" && a.includes("image.png"),
    },
    {
      title: "Audio Stego",
      why: "Data can also be hidden in audio frequencies using tools like steghide or wavsteg.",
      text: 'Type <code>steghide info audio.wav -p ""</code>',
      objective: "Check audio.wav",
      xp: 35,
      check: (c, a) =>
        c === "steghide" && a.includes("info") && a.includes("audio.wav"),
    },
    {
      title: "File Carving",
      why: "Use foremost to recover deleted files or carve them out of binaries.",
      text: "Type <code>foremost -i logo.jpg</code>",
      objective: "Type foremost -i logo.jpg",
      xp: 40,
      check: (c, a) =>
        c === "foremost" && a.includes("-i") && a.includes("logo.jpg"),
    },
    {
      title: "Compare Hashes",
      why: "Check if the original image hash matches the stego image hash.",
      text: "Type <code>md5sum logo.jpg</code>",
      objective: "Hash logo.jpg",
      xp: 15,
      check: (c, a) => c === "md5sum" && a.includes("logo.jpg"),
    },
    {
      title: "Conceal Directory",
      why: "Hide the extracted folder using a dot.",
      text: "Type <code>mv _logo.jpg.extracted .hidden_extract</code>",
      objective: "Rename to .hidden_extract",
      xp: 20,
      check: (c, a) =>
        c === "mv" && a.some((x) => x.includes(".hidden_extract")),
    },
    {
      title: "Clean Up Stego",
      why: "Remove stego files.",
      text: "Type <code>rm logo.jpg payload.txt</code>",
      objective: "Remove logo and payload",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("logo.jpg"),
    },

    // --- PHASE 5: ADVANCED PKI & CRACKING (86-100) ---
    {
      title: "Copy Passwd",
      why: "Steal the user list file.",
      text: "Type <code>cp /etc/passwd ./passwd.txt</code>",
      objective: "Copy passwd",
      xp: 20,
      check: (c, a) => c === "cp" && a.includes("/etc/passwd"),
    },
    {
      title: "Copy Shadow",
      why: "Steal the password hashes file.",
      text: "Type <code>cp /etc/shadow ./shadow.txt</code>",
      objective: "Copy shadow",
      xp: 20,
      check: (c, a) => c === "cp" && a.includes("/etc/shadow"),
    },
    {
      title: "Unshadow",
      why: "Combine the two files into a format John The Ripper can crack.",
      text: "Type <code>unshadow passwd.txt shadow.txt > unshadowed.txt</code>",
      objective: "Run unshadow",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("unshadow") &&
        raw.includes(">") &&
        raw.includes("unshadowed.txt"),
    },
    {
      title: "John the Ripper",
      why: "Run John against the combined hashes using a wordlist.",
      text: "Type <code>john --wordlist=rockyou.txt unshadowed.txt</code>",
      objective: "Run john",
      xp: 60,
      check: (c, a) =>
        c === "john" &&
        a.some((x) => x.includes("wordlist")) &&
        a.includes("unshadowed.txt"),
    },
    {
      title: "Show Cracked",
      why: "View the cracked passwords John saved.",
      text: "Type <code>john --show unshadowed.txt</code>",
      objective: "Use john --show",
      xp: 35,
      check: (c, a) =>
        c === "john" && a.includes("--show") && a.includes("unshadowed.txt"),
    },
    {
      title: "Hashcat MD5",
      why: "Use Hashcat to crack an MD5 hash (mode 0) using a dictionary (attack 0).",
      text: "Type <code>hashcat -m 0 -a 0 hash.txt rockyou.txt</code>",
      objective: "Run hashcat",
      xp: 60,
      check: (c, a) =>
        c === "hashcat" &&
        a.includes("-m") &&
        a.includes("0") &&
        a.includes("-a"),
    },
    {
      title: "Create Wordlist",
      why: "Use crunch to generate a custom password dictionary.",
      text: "Type <code>crunch 4 4 0123456789 -o dict.txt</code>",
      objective: "Use crunch",
      xp: 40,
      check: (c, a) => c === "crunch" && a.includes("4") && a.includes("-o"),
    },
    {
      title: "Count Dict Lines",
      why: "See how many passwords crunch generated.",
      text: "Type <code>wc -l dict.txt</code>",
      objective: "Type wc -l dict.txt",
      xp: 20,
      check: (c, a) => c === "wc" && a.includes("-l") && a.includes("dict.txt"),
    },
    {
      title: "GPG Decrypt Hack",
      why: "Try to decrypt without a password (fails).",
      text: "Type <code>gpg -d fake.gpg</code>",
      objective: "Attempt bad decrypt",
      xp: 20,
      check: (c, a) =>
        c === "gpg" && a.includes("-d") && a.includes("fake.gpg"),
    },
    {
      title: "John2John",
      why: "Convert a GPG file into a hash for John.",
      text: "Type <code>gpg2john fake.gpg > gpg_hash.txt</code>",
      objective: "Use gpg2john",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("gpg2john") && raw.includes("fake.gpg"),
    },
    {
      title: "PDF2John",
      why: "Extract a hash from a locked PDF file.",
      text: "Type <code>pdf2john locked.pdf > pdf_hash.txt</code>",
      objective: "Use pdf2john",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("pdf2john") && raw.includes("locked.pdf"),
    },
    {
      title: "Zip2John",
      why: "Extract a hash from a locked ZIP file.",
      text: "Type <code>zip2john secret.zip > zip_hash.txt</code>",
      objective: "Use zip2john",
      xp: 45,
      check: (c, a, o, raw) =>
        raw.includes("zip2john") && raw.includes("secret.zip"),
    },
    {
      title: "Crack ZIP",
      why: "Crack the zip hash with John.",
      text: "Type <code>john zip_hash.txt</code>",
      objective: "Crack zip hash",
      xp: 40,
      check: (c, a) =>
        c === "john" && a.includes("zip_hash.txt") && !a.includes("--show"),
    },
    {
      title: "Clean Hashes",
      why: "Wipe all cracking attempts.",
      text: "Type <code>rm *.txt</code>",
      objective: "Remove txt files",
      xp: 15,
      check: (c, a) => c === "rm" && a.includes("*.txt"),
    },
    {
      title: "Cryptography God",
      why: "Module 19 Complete. You are a Master of Secrets.",
      text: 'Type <code>echo "Shadows and Secrets Unlocked"</code>',
      objective: "Type echo",
      xp: 200,
      check: (c, a, o, raw) => raw.includes("echo") && raw.includes("Shadows"),
    },
  ],
};
