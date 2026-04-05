interface Flag { flag: string; description: string }
interface Command { title: string; syntax: string; description: string; example?: string; flags?: Flag[] }
interface ToolData {
  name: string; slug: string; category: string; subcategory?: string
  description: string; longDescription: string
  commands: Command[]; useCases: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]; relatedTools: string[]
  installCommand?: string; featured?: boolean
}

export const toolsPart2: ToolData[] = [
  // ─────────────────────────────────────────────
  // WEB APPLICATION TESTING
  // ─────────────────────────────────────────────
  {
    name: 'Burp Suite',
    slug: 'burpsuite',
    category: 'Web Application Testing',
    subcategory: 'Proxy & Interception',
    description: 'Industry-standard integrated platform for web application security testing with proxy, scanner, intruder, and repeater modules.',
    longDescription: `Burp Suite is the most widely used web application security testing toolkit. It operates as an intercepting proxy between your browser and the target, allowing you to inspect, modify, and replay HTTP/S traffic in real time.

Key modules:
- **Proxy**: Intercepts and modifies requests and responses on the fly. Requires configuring your browser to route traffic through 127.0.0.1:8080.
- **Repeater**: Manually craft and resend individual requests to test how the server responds to parameter changes.
- **Intruder**: Automates customised attacks such as fuzzing parameters, credential stuffing, or enumerating resource IDs using payload lists.
- **Scanner** (Pro): Automatically crawls and audits targets for common vulnerabilities including SQLi, XSS, SSRF, and XXE.
- **Spider/Crawler**: Automatically maps application content and functionality by following links and submitting forms.

Burp Suite Community Edition is free and ships with Kali Linux. The Professional edition adds the active scanner and additional attack capabilities.`,
    commands: [
      {
        title: 'Launch Burp Suite GUI',
        syntax: 'burpsuite',
        description: 'Start Burp Suite with the graphical user interface. On first launch, accept the temporary project option or create a new project file.',
        example: 'burpsuite',
      },
      {
        title: 'Launch Burp Suite in headless / jar mode',
        syntax: 'java -jar burpsuite_community.jar --headless --config-file=project.json',
        description: 'Run Burp Suite from a JAR file in headless mode using a saved project configuration. Useful for scripted or CI pipelines.',
        example: 'java -jar /opt/BurpSuiteCommunity/burpsuite_community.jar --headless --config-file=/home/kali/burp_project.json',
      },
      {
        title: 'Configure browser proxy (Firefox)',
        syntax: 'Preferences → Network Settings → Manual proxy: 127.0.0.1 port 8080',
        description: 'Point your browser to the Burp listener so all HTTP/S traffic passes through the proxy. In Firefox: Menu → Settings → Network Settings → Manual proxy configuration → HTTP Proxy 127.0.0.1, Port 8080.',
        example: '# Alternatively use an env var for curl:\ncurl -x http://127.0.0.1:8080 http://target.htb/api/v1/users',
      },
      {
        title: 'Import Burp CA certificate to browser',
        syntax: 'http://burpsuite  →  download cacert.der  →  Import in browser certificate store',
        description: 'Navigate to http://burpsuite (while browser proxy is set) to download the Burp CA cert. Import it into your browser\'s trusted certificate authorities to intercept HTTPS traffic without SSL warnings.',
        example: '# For system-level trust on Kali:\nsudo cp cacert.der /usr/local/share/ca-certificates/burp-ca.crt\nsudo update-ca-certificates',
      },
    ],
    useCases: [
      'Intercept and modify live HTTP/S requests to test input validation and access controls',
      'Fuzz parameters for SQL injection, XSS, and other injection flaws using Intruder',
      'Brute-force login forms by replaying credential lists through Intruder with payload sets',
      'Scan REST and GraphQL APIs for security misconfigurations and injection vulnerabilities',
      'Identify IDOR vulnerabilities by manipulating resource identifiers in Repeater',
      'Detect and exploit SSRF by injecting internal hostnames into request parameters',
    ],
    difficulty: 'Intermediate',
    featured: true,
    tags: ['proxy', 'web', 'intercept', 'scanner', 'intruder', 'repeater', 'http', 'https', 'fuzzing'],
    relatedTools: ['zaproxy', 'mitmproxy', 'sqlmap'],
  },

  {
    name: 'sqlmap',
    slug: 'sqlmap',
    category: 'Web Application Testing',
    subcategory: 'Injection Testing',
    description: 'Open-source penetration testing tool that automates the detection and exploitation of SQL injection vulnerabilities.',
    longDescription: `sqlmap is an open-source command-line tool that automates detecting and exploiting SQL injection flaws. It supports a wide range of database back-ends including MySQL, PostgreSQL, Oracle, Microsoft SQL Server, SQLite, and many more.

sqlmap can:
- Detect injectable parameters in GET, POST, cookies, headers, and JSON bodies.
- Enumerate databases, tables, columns, and dump data.
- Execute arbitrary OS commands via database user privilege escalation (--os-shell).
- Read and write files on the underlying filesystem (--file-read / --file-write).
- Bypass WAFs and filters using built-in and custom tamper scripts.
- Work with captured HTTP requests from Burp Suite (-r request.txt).

Always obtain written permission before running sqlmap against any system you do not own.`,
    commands: [
      {
        title: 'Basic URL injection test',
        syntax: 'sqlmap -u "<url>"',
        description: 'Test a URL with a query parameter for SQL injection. sqlmap will automatically detect and test injectable parameters.',
        example: 'sqlmap -u "http://target.htb/items.php?id=1"',
        flags: [
          { flag: '-u', description: 'Target URL' },
          { flag: '--batch', description: 'Never ask for user input; use default behaviour' },
          { flag: '--random-agent', description: 'Use a random HTTP User-Agent header' },
        ],
      },
      {
        title: 'Enumerate databases',
        syntax: 'sqlmap -u "<url>" --dbs',
        description: 'List all database names accessible via the injection point.',
        example: 'sqlmap -u "http://target.htb/items.php?id=1" --dbs --batch',
      },
      {
        title: 'Enumerate tables in a database',
        syntax: 'sqlmap -u "<url>" -D <database> --tables',
        description: 'List all table names inside a specific database.',
        example: 'sqlmap -u "http://target.htb/items.php?id=1" -D shopdb --tables --batch',
      },
      {
        title: 'Dump contents of a table',
        syntax: 'sqlmap -u "<url>" -D <database> -T <table> --dump',
        description: 'Extract all rows from the specified table. Use -C to limit to specific columns.',
        example: 'sqlmap -u "http://target.htb/items.php?id=1" -D shopdb -T users --dump --batch',
      },
      {
        title: 'Test a POST request',
        syntax: 'sqlmap -u "<url>" --data="<post_body>"',
        description: 'Test parameters sent in the POST body. Separate parameters with & just as in a normal form submission.',
        example: 'sqlmap -u "http://target.htb/login.php" --data="username=admin&password=test" --batch',
      },
      {
        title: 'Cookie-based injection',
        syntax: 'sqlmap -u "<url>" --cookie="<cookie>"',
        description: 'Test session cookies or other cookie values for SQL injection.',
        example: 'sqlmap -u "http://target.htb/dashboard.php" --cookie="session=eyJhbGciOiJub25lIn0.eyJ1c2VyIjoiZ3Vlc3QifQ." --batch',
      },
      {
        title: 'Spawn an OS shell via the database',
        syntax: 'sqlmap -u "<url>" --os-shell',
        description: 'Attempt to obtain an interactive OS shell by leveraging database user privileges (requires DBA/root database account and FILE privilege).',
        example: 'sqlmap -u "http://target.htb/items.php?id=1" --os-shell --batch',
      },
      {
        title: 'Bypass WAF with tamper script',
        syntax: 'sqlmap -u "<url>" --tamper=<script>',
        description: 'Apply a tamper script to obfuscate payloads and evade web application firewalls. Multiple tamper scripts can be chained with commas.',
        example: 'sqlmap -u "http://target.htb/items.php?id=1" --tamper=space2comment,between --level=3 --risk=2 --batch',
      },
    ],
    useCases: [
      'Automate SQL injection detection across large numbers of parameters',
      'Extract credential tables (users, passwords) from vulnerable web databases',
      'Escalate from SQLi to remote code execution via --os-shell on misconfigured DB servers',
      'Test login forms and authenticated endpoints using captured session cookies',
      'Identify and exploit time-based blind SQLi where no output is reflected',
      'Bypass WAFs and input filters during authorised penetration tests',
    ],
    difficulty: 'Beginner',
    featured: true,
    tags: ['sql injection', 'sqli', 'database', 'web', 'automation', 'mysql', 'postgresql', 'mssql', 'waf bypass'],
    relatedTools: ['burpsuite', 'havij', 'bbqsql'],
  },

  {
    name: 'dirb',
    slug: 'dirb',
    category: 'Web Application Testing',
    subcategory: 'Directory & File Enumeration',
    description: 'Web content scanner that brute-forces directories and files on web servers using wordlists.',
    longDescription: `dirb is a command-line web content scanner that discovers hidden directories and files by issuing HTTP requests for each word in a wordlist. It ships with several built-in wordlists located in /usr/share/dirb/wordlists/ and uses common.txt by default.

dirb performs a straightforward GET-request loop against the target URL, making it simple and easy to use for beginners. It is single-threaded and slower than modern alternatives such as gobuster or ffuf, but works reliably without many dependencies.

Common wordlists bundled with dirb:
- /usr/share/dirb/wordlists/common.txt – ~4,600 common paths
- /usr/share/dirb/wordlists/big.txt – ~20,000 paths
- /usr/share/dirb/wordlists/small.txt – fast initial sweep`,
    commands: [
      {
        title: 'Basic directory scan with default wordlist',
        syntax: 'dirb <url>',
        description: 'Scan the target URL using the built-in common.txt wordlist. Results show HTTP status codes and content lengths.',
        example: 'dirb http://target.htb',
      },
      {
        title: 'Scan with a custom wordlist',
        syntax: 'dirb <url> <wordlist>',
        description: 'Use a specific wordlist file instead of the default. The SecLists and dirb big.txt lists are popular choices.',
        example: 'dirb http://target.htb /usr/share/dirb/wordlists/big.txt',
      },
      {
        title: 'Scan ignoring errors and save output',
        syntax: 'dirb <url> <wordlist> -z -o <outfile>',
        description: 'Continue scanning even when HTTP errors are encountered (-z) and save all results to a text file (-o).',
        example: 'dirb http://target.htb /usr/share/dirb/wordlists/common.txt -z -o /home/kali/dirb_results.txt',
        flags: [
          { flag: '-z', description: 'Do not stop on errors (ignore HTTP errors and continue)' },
          { flag: '-o', description: 'Save output to a file' },
        ],
      },
      {
        title: 'Scan with custom cookie and user-agent',
        syntax: 'dirb <url> -c "<cookie>" -a "<user-agent>"',
        description: 'Authenticate with a session cookie and spoof the User-Agent header to avoid simple bot detection.',
        example: 'dirb http://target.htb/admin/ -c "PHPSESSID=abc123def456" -a "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
        flags: [
          { flag: '-a', description: 'Specify a custom User-Agent string' },
          { flag: '-c', description: 'Set a cookie for authenticated scanning' },
          { flag: '-r', description: 'Do not search recursively' },
          { flag: '-S', description: 'Silent mode — only print found paths' },
        ],
      },
    ],
    useCases: [
      'Discover hidden admin panels, backup files, and configuration pages',
      'Enumerate API endpoints and version paths on web applications',
      'Find forgotten upload directories or log file locations',
      'Quickly map an application\'s directory structure during initial reconnaissance',
    ],
    difficulty: 'Beginner',
    tags: ['directory enumeration', 'web', 'brute force', 'wordlist', 'content discovery'],
    relatedTools: ['gobuster', 'ffuf', 'wfuzz'],
  },

  {
    name: 'Gobuster',
    slug: 'gobuster',
    category: 'Web Application Testing',
    subcategory: 'Directory & File Enumeration',
    description: 'Fast directory, DNS, and virtual-host brute-forcing tool written in Go with multi-threaded performance.',
    longDescription: `Gobuster is a multi-threaded brute-forcing tool written in Go. It is significantly faster than dirb because it uses concurrent goroutines. Gobuster supports several enumeration modes:

- **dir** – brute-force directories and files on a web server
- **dns** – enumerate subdomains via DNS resolution
- **vhost** – discover virtual hosts by fuzzing the Host header
- **fuzz** – use the FUZZ keyword anywhere in a request
- **s3** – enumerate open Amazon S3 buckets

Gobuster does not recurse by default in dir mode, which keeps runs fast and predictable. Use the -x flag to append file extensions (e.g., .php,.html,.bak) to every wordlist entry.`,
    commands: [
      {
        title: 'Directory enumeration (dir mode)',
        syntax: 'gobuster dir -u <url> -w <wordlist>',
        description: 'Enumerate directories and files at the target URL. Use -x to add file extensions.',
        example: 'gobuster dir -u http://target.htb -w /usr/share/wordlists/dirb/common.txt -x php,html,txt -t 50',
        flags: [
          { flag: '-u', description: 'Target URL' },
          { flag: '-w', description: 'Path to wordlist' },
          { flag: '-x', description: 'File extensions to append (comma-separated)' },
          { flag: '-t', description: 'Number of concurrent threads (default 10)' },
        ],
      },
      {
        title: 'Subdomain enumeration (dns mode)',
        syntax: 'gobuster dns -d <domain> -w <wordlist>',
        description: 'Resolve each wordlist entry as a subdomain of the target domain to discover valid subdomains.',
        example: 'gobuster dns -d target.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -t 30',
      },
      {
        title: 'Virtual host discovery (vhost mode)',
        syntax: 'gobuster vhost -u <url> -w <wordlist>',
        description: 'Fuzz the Host HTTP header to discover virtual hosts served from the same IP address.',
        example: 'gobuster vhost -u http://10.10.11.20 -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain',
      },
      {
        title: 'Fuzzing mode with FUZZ keyword',
        syntax: 'gobuster fuzz -u "<url_with_FUZZ>" -w <wordlist>',
        description: 'Replace the FUZZ placeholder in the URL with each wordlist entry. Useful for parameter value enumeration.',
        example: 'gobuster fuzz -u "http://target.htb/index.php?page=FUZZ" -w /usr/share/seclists/Fuzzing/LFI/LFI-gracefulsecurity-linux.txt',
      },
      {
        title: 'Directory enumeration with status code filter and output',
        syntax: 'gobuster dir -u <url> -w <wordlist> -s "200,204,301,302" -o <outfile>',
        description: 'Only show specific HTTP status codes and write matching results to a file.',
        example: 'gobuster dir -u http://target.htb -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -s "200,204,301,302,307,401,403" -o /home/kali/gobuster_out.txt -t 40 -q',
      },
    ],
    useCases: [
      'Fast directory and file brute-forcing during web application recon',
      'Subdomain discovery to expand attack surface on a target domain',
      'Virtual host enumeration when multiple sites share the same IP',
      'Enumerate API versioning paths such as /api/v1/, /api/v2/',
      'Find backup and configuration files by appending extensions like .bak, .conf, .old',
    ],
    difficulty: 'Beginner',
    tags: ['directory enumeration', 'subdomain', 'dns', 'vhost', 'web', 'brute force', 'go', 'fast'],
    relatedTools: ['dirb', 'ffuf', 'wfuzz'],
  },

  {
    name: 'ffuf',
    slug: 'ffuf',
    category: 'Web Application Testing',
    subcategory: 'Fuzzing',
    description: 'Fast web fuzzer written in Go using the FUZZ keyword as a flexible placeholder for any part of an HTTP request.',
    longDescription: `ffuf (Fuzz Faster U Fool) is a highly versatile web fuzzing tool written in Go. Unlike dirb or gobuster, ffuf places the FUZZ keyword anywhere in the request — URL path, query parameters, headers, POST body, or even the Host header — making it suitable for a wide range of testing scenarios.

Key features:
- Multiple FUZZ positions in a single request (FUZZ, W2, W3 with multiple -w flags)
- Response filtering by status code (-mc/-fc), response size (-fs), word count (-fw), and line count (-fl)
- Rate limiting (-rate) and configurable thread count (-t)
- Output to JSON, CSV, HTML, or plain text
- Supports HTTP/1 and HTTP/2
- Replay proxy support to forward interesting results to Burp Suite (-replay-proxy)`,
    commands: [
      {
        title: 'Directory and file fuzzing',
        syntax: 'ffuf -u <url>/FUZZ -w <wordlist>',
        description: 'Replace FUZZ in the URL path with each wordlist entry to discover directories and files.',
        example: 'ffuf -u http://target.htb/FUZZ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -mc 200,204,301,302,307 -t 40',
        flags: [
          { flag: '-u', description: 'Target URL with FUZZ placeholder' },
          { flag: '-w', description: 'Wordlist path (use - for stdin)' },
          { flag: '-mc', description: 'Match HTTP status codes (comma-separated)' },
          { flag: '-fc', description: 'Filter (exclude) HTTP status codes' },
          { flag: '-fs', description: 'Filter responses by size in bytes' },
          { flag: '-t', description: 'Number of concurrent threads' },
        ],
      },
      {
        title: 'Subdomain fuzzing via Host header',
        syntax: 'ffuf -u <url> -H "Host: FUZZ.<domain>" -w <wordlist>',
        description: 'Fuzz the Host header to discover virtual hosts and subdomains. Filter out the default response size with -fs.',
        example: 'ffuf -u http://10.10.11.20 -H "Host: FUZZ.target.htb" -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -fs 185 -t 50',
      },
      {
        title: 'GET parameter fuzzing',
        syntax: 'ffuf -u "<url>?param=FUZZ" -w <wordlist>',
        description: 'Fuzz the value of a GET parameter to test for LFI, open redirects, SSRF, or enumeration.',
        example: 'ffuf -u "http://target.htb/index.php?page=FUZZ" -w /usr/share/seclists/Fuzzing/LFI/LFI-gracefulsecurity-linux.txt -mc 200 -fs 1234',
      },
      {
        title: 'POST body fuzzing',
        syntax: 'ffuf -u <url> -d "<post_data_with_FUZZ>" -H "Content-Type: application/x-www-form-urlencoded" -w <wordlist>',
        description: 'Fuzz values inside a POST request body. Useful for login brute-force or hidden field enumeration.',
        example: 'ffuf -u http://target.htb/login.php -d "username=admin&password=FUZZ" -H "Content-Type: application/x-www-form-urlencoded" -w /usr/share/wordlists/rockyou.txt -fc 200 -fs 1523 -t 30',
      },
    ],
    useCases: [
      'Directory and file discovery with flexible response filtering',
      'Virtual host and subdomain enumeration via Host header fuzzing',
      'Parameter value fuzzing for LFI, SSRF, and open redirect vulnerabilities',
      'Login brute-force over HTTP POST with size-based response filtering',
    ],
    difficulty: 'Beginner',
    tags: ['fuzzing', 'web', 'directory enumeration', 'subdomain', 'brute force', 'go', 'fast', 'lfi', 'vhost'],
    relatedTools: ['gobuster', 'wfuzz', 'dirb'],
  },

  {
    name: 'wfuzz',
    slug: 'wfuzz',
    category: 'Web Application Testing',
    subcategory: 'Fuzzing',
    description: 'Python-based web application fuzzer supporting multiple injection points and advanced response filtering.',
    longDescription: `wfuzz is a feature-rich Python web fuzzer that uses FUZZ as the first payload placeholder and FUZ2Z, FUZ3Z etc. for additional positions. It predates ffuf and gobuster and is tightly integrated with the Python ecosystem, making it scriptable and extensible.

wfuzz supports:
- Multiple simultaneous payloads (FUZZ / FUZ2Z / FUZ3Z)
- Hiding results by status code (--hc), lines (--hl), words (--hw), or characters (--hh)
- Built-in payload generators: wordlists, ranges, hex, urlencode, base64
- Cookie injection (-b), custom headers (-H), POST data (-d)
- Output to HTML, JSON, or CSV with -f
- Recursive scanning with --follow and -R`,
    commands: [
      {
        title: 'Directory brute-force',
        syntax: 'wfuzz -c -w <wordlist> --hc 404 <url>/FUZZ',
        description: 'Enumerate directories by hiding 404 responses. -c enables colour output.',
        example: 'wfuzz -c -w /usr/share/wordlists/dirb/common.txt --hc 404 http://target.htb/FUZZ',
        flags: [
          { flag: '-w', description: 'Wordlist file path' },
          { flag: '-z', description: 'Payload type and value (e.g., -z file,wordlist.txt)' },
          { flag: '--hc', description: 'Hide responses with these HTTP status codes' },
          { flag: '--hl', description: 'Hide responses with this number of lines' },
          { flag: '--hw', description: 'Hide responses with this number of words' },
          { flag: '-d', description: 'POST body data with FUZZ placeholder' },
          { flag: '-b', description: 'Cookie string' },
          { flag: '-H', description: 'Custom HTTP header' },
        ],
      },
      {
        title: 'Username and password brute-force with two wordlists',
        syntax: 'wfuzz -c -w <users_wordlist> -w <pass_wordlist> -d "user=FUZZ&pass=FUZ2Z" --hc 200 <url>',
        description: 'Use two payload positions (FUZZ and FUZ2Z) to simultaneously fuzz username and password fields in a POST form.',
        example: 'wfuzz -c -w /usr/share/seclists/Usernames/top-usernames-shortlist.txt -w /usr/share/wordlists/rockyou.txt -d "username=FUZZ&password=FUZ2Z" --hc 200 http://target.htb/login.php',
      },
      {
        title: 'Filter by response character count',
        syntax: 'wfuzz -c -w <wordlist> --hh <chars> <url>/FUZZ',
        description: 'Hide all responses whose body length equals the specified number of characters. Useful when a "not found" page always has the same length.',
        example: 'wfuzz -c -w /usr/share/wordlists/dirb/big.txt --hh 4287 http://target.htb/FUZZ',
      },
      {
        title: 'Fuzz with cookie authentication',
        syntax: 'wfuzz -c -w <wordlist> -b "<cookie>" --hc 302,403 <url>/FUZZ',
        description: 'Pass a session cookie to fuzz authenticated areas of a web application.',
        example: 'wfuzz -c -w /usr/share/wordlists/dirb/common.txt -b "PHPSESSID=9a2f3e8b1c47d" --hc 302,403 http://target.htb/admin/FUZZ',
      },
    ],
    useCases: [
      'Brute-force web directories and files with granular response filtering',
      'Credential stuffing and login brute-force using dual payload positions',
      'Fuzz API endpoints with multiple simultaneous fuzzing points',
      'Identify hidden parameters by fuzzing query string keys',
    ],
    difficulty: 'Intermediate',
    tags: ['fuzzing', 'web', 'brute force', 'python', 'multi-payload', 'directory enumeration'],
    relatedTools: ['ffuf', 'gobuster', 'hydra'],
  },

  {
    name: 'WhatWeb',
    slug: 'whatweb',
    category: 'Web Application Testing',
    subcategory: 'Fingerprinting',
    description: 'Web application fingerprinting tool that identifies technologies, CMS platforms, frameworks, and server software.',
    longDescription: `WhatWeb identifies the software powering a website, including:
- Content Management Systems (WordPress, Drupal, Joomla)
- JavaScript frameworks (jQuery, React, Angular)
- Web servers (Apache, nginx, IIS) and their versions
- Programming languages and server-side frameworks
- Analytics platforms, CDNs, and third-party services
- Security headers and cookie attributes

WhatWeb has over 1,800 plugins and supports aggression levels from 1 (stealthy, single request) to 4 (very aggressive, triggers IDS). Level 3 is generally recommended for active testing as it performs multiple requests to increase detection accuracy.`,
    commands: [
      {
        title: 'Basic fingerprint scan',
        syntax: 'whatweb <url>',
        description: 'Perform a single-request fingerprint of the target. Returns CMS, server, language, and plugin information.',
        example: 'whatweb http://target.htb',
      },
      {
        title: 'Aggressive scan (aggression level 3)',
        syntax: 'whatweb -a 3 <url>',
        description: 'Increase aggression to level 3 for more thorough fingerprinting. Makes additional targeted requests to extract version information.',
        example: 'whatweb -a 3 -v http://target.htb',
        flags: [
          { flag: '-a', description: 'Aggression level 1–4 (default 1; 3 = aggressive; 4 = heavy)' },
          { flag: '-v', description: 'Verbose output — show all matched plugin details' },
          { flag: '-l', description: 'Log errors to a file' },
          { flag: '--log-json', description: 'Save output in JSON format' },
          { flag: '--user-agent', description: 'Set a custom User-Agent string' },
        ],
      },
      {
        title: 'Scan and save results to JSON',
        syntax: 'whatweb --log-json=<outfile> <url>',
        description: 'Write scan results as structured JSON for further processing or integration into reporting tools.',
        example: 'whatweb --log-json=/home/kali/whatweb_target.json -a 3 http://target.htb',
      },
    ],
    useCases: [
      'Technology stack fingerprinting during initial web application reconnaissance',
      'Identify outdated CMS versions (e.g., WordPress 4.x) with known public exploits',
      'Discover third-party plugins and libraries to assess supply chain risk',
      'Bulk scan multiple hosts to map technology distribution across an estate',
    ],
    difficulty: 'Beginner',
    tags: ['fingerprinting', 'recon', 'cms', 'web server', 'technology detection', 'wordpress', 'nginx'],
    relatedTools: ['wafw00f', 'nikto', 'burpsuite'],
  },

  {
    name: 'wafw00f',
    slug: 'wafw00f',
    category: 'Web Application Testing',
    subcategory: 'Fingerprinting',
    description: 'Web Application Firewall detection and fingerprinting tool that identifies WAF products in front of a web server.',
    longDescription: `wafw00f probes a target web application with a series of crafted HTTP requests and analyses the responses to determine whether a WAF is present and, if so, which product it is.

It checks for:
- Response headers and cookies injected by WAF products (e.g., X-Sucuri-ID, X-CDN)
- Characteristic blocking pages and response codes
- Connection behaviour changes when malicious payloads are injected

Knowing which WAF a target uses allows an attacker to select appropriate bypass techniques or tamper scripts. wafw00f currently detects over 160 WAF products.`,
    commands: [
      {
        title: 'Detect WAF on a target',
        syntax: 'wafw00f <url>',
        description: 'Send probe requests to the target and identify the WAF product if one is present.',
        example: 'wafw00f http://target.htb',
        flags: [
          { flag: '-a', description: 'Find all WAF matches rather than stopping at the first' },
          { flag: '-r', description: 'Do not follow HTTP redirects' },
          { flag: '-t', description: 'Test mode — show HTTP responses' },
          { flag: '-v', description: 'Verbose output' },
          { flag: '--list', description: 'List all WAF products wafw00f can detect' },
        ],
      },
      {
        title: 'List all detectable WAF products',
        syntax: 'wafw00f --list',
        description: 'Print all WAF vendors and products that wafw00f can fingerprint. Useful for knowing coverage before testing.',
        example: 'wafw00f --list',
      },
      {
        title: 'Find all matching WAFs',
        syntax: 'wafw00f -a <url>',
        description: 'Run all detection methods and report every WAF that matches rather than exiting on the first match. More thorough but generates more traffic.',
        example: 'wafw00f -a https://target.com',
      },
    ],
    useCases: [
      'Determine whether a WAF is protecting a target before launching injection attacks',
      'Choose appropriate sqlmap tamper scripts based on detected WAF vendor',
      'Map WAF coverage across a large estate using bulk scanning',
      'Validate WAF deployment and rule effectiveness during a security assessment',
    ],
    difficulty: 'Beginner',
    tags: ['waf', 'fingerprinting', 'recon', 'web', 'detection', 'bypass'],
    relatedTools: ['whatweb', 'sqlmap', 'burpsuite'],
  },

  {
    name: 'commix',
    slug: 'commix',
    category: 'Web Application Testing',
    subcategory: 'Injection Testing',
    description: 'Automated OS command injection testing tool that detects and exploits command injection vulnerabilities in web applications.',
    longDescription: `commix (COMMand Injection eXploiter) automates the detection and exploitation of OS command injection vulnerabilities. It supports both classic (output-reflected) and blind (time-based, DNS-based) injection techniques.

commix can:
- Test GET and POST parameters, cookies, and HTTP headers
- Detect and exploit classic, timing-based, and file-based blind injections
- Spawn an interactive pseudo-terminal (--os-shell) on the remote system
- Work alongside Burp Suite by reading captured request files (-r)
- Attempt to bypass WAFs and filters with built-in evasion techniques`,
    commands: [
      {
        title: 'Basic command injection test',
        syntax: 'commix --url="<url>"',
        description: 'Test all parameters in the URL for OS command injection vulnerabilities. commix will automatically detect the injection type.',
        example: 'commix --url="http://target.htb/ping.php?ip=127.0.0.1" --batch',
        flags: [
          { flag: '--url', description: 'Target URL' },
          { flag: '--cookie', description: 'HTTP Cookie header value' },
          { flag: '--data', description: 'POST body data' },
          { flag: '--level', description: 'Test level 1–3 (default 1)' },
          { flag: '--technique', description: 'Injection technique: C (classic), T (time), F (file)' },
          { flag: '--os-cmd', description: 'Execute a single OS command' },
          { flag: '--batch', description: 'Never ask for user input' },
        ],
      },
      {
        title: 'Cookie-based injection test',
        syntax: 'commix --url="<url>" --cookie="<cookie>"',
        description: 'Test cookie values for command injection. Useful when user input is stored in cookies and later passed to a system call.',
        example: 'commix --url="http://target.htb/profile.php" --cookie="user=admin; theme=default" --batch',
      },
      {
        title: 'Blind injection with custom technique',
        syntax: 'commix --url="<url>" --technique=T --level=3',
        description: 'Force time-based blind injection testing at the highest level when standard output-based methods are filtered.',
        example: 'commix --url="http://target.htb/search.php?q=test" --technique=T --level=3 --batch',
      },
    ],
    useCases: [
      'Detect OS command injection in web form inputs, search boxes, and ping utilities',
      'Escalate from command injection to a full reverse shell on the target server',
      'Test API endpoints that pass user input to system() or exec() calls',
      'Assess IoT web interfaces where OS command injection is common',
    ],
    difficulty: 'Intermediate',
    tags: ['command injection', 'rce', 'web', 'automation', 'blind injection', 'os shell'],
    relatedTools: ['sqlmap', 'burpsuite', 'xsstrike'],
  },

  {
    name: 'XSStrike',
    slug: 'xsstrike',
    category: 'Web Application Testing',
    subcategory: 'Injection Testing',
    description: 'Advanced XSS detection suite with a built-in crawler, fuzzer, and intelligent payload generator to identify reflected, stored, and DOM XSS.',
    longDescription: `XSStrike is a Python 3 XSS detection and exploitation framework that goes beyond simple payload injection. It analyses server responses to understand the reflection context and generates context-aware payloads that are more likely to bypass filters.

Key features:
- Context-aware payload generation based on reflection analysis
- Built-in crawler to map the application and find XSS sinks
- WAF fingerprinting and evasion techniques
- DOM XSS detection via headless browser analysis
- Fuzzer mode with hundreds of payloads
- Support for custom headers and POST data

XSStrike is not included in Kali by default and must be cloned from GitHub.`,
    commands: [
      {
        title: 'Single URL XSS test',
        syntax: 'python3 xsstrike.py -u "<url>"',
        description: 'Test all parameters in the given URL for reflected and DOM XSS vulnerabilities.',
        example: 'python3 xsstrike.py -u "http://target.htb/search.php?q=test"',
        flags: [
          { flag: '-u', description: 'Target URL' },
          { flag: '--crawl', description: 'Crawl the target and test all discovered links' },
          { flag: '--data', description: 'POST body data' },
          { flag: '--headers', description: 'Custom HTTP headers (JSON format)' },
          { flag: '--file-path', description: 'File containing list of URLs to test' },
          { flag: '--seeds', description: 'File of seed URLs for the crawler' },
        ],
      },
      {
        title: 'Crawl and test entire application',
        syntax: 'python3 xsstrike.py -u "<url>" --crawl',
        description: 'Automatically crawl the application starting from the given URL and test every discovered page for XSS.',
        example: 'python3 xsstrike.py -u "http://target.htb" --crawl --seeds /home/kali/seeds.txt',
      },
      {
        title: 'Test a list of URLs from a file',
        syntax: 'python3 xsstrike.py --file-path <file>',
        description: 'Read a newline-separated list of URLs from a file and test each for XSS. Useful when scanning many endpoints discovered via spidering.',
        example: 'python3 xsstrike.py --file-path /home/kali/urls.txt',
      },
    ],
    useCases: [
      'Detect reflected, stored, and DOM-based XSS in web application parameters',
      'Bypass XSS filters and WAF rules with context-aware payload generation',
      'Crawl and audit an entire web application for XSS sinks in a single run',
      'Generate proof-of-concept XSS payloads for inclusion in penetration test reports',
    ],
    difficulty: 'Intermediate',
    installCommand: 'git clone https://github.com/s0md3v/XSStrike.git && cd XSStrike && pip3 install -r requirements.txt',
    tags: ['xss', 'cross-site scripting', 'web', 'payload', 'crawler', 'dom xss', 'waf bypass'],
    relatedTools: ['burpsuite', 'dalfox', 'commix'],
  },

  // ─────────────────────────────────────────────
  // PASSWORD ATTACKS
  // ─────────────────────────────────────────────
  {
    name: 'John the Ripper',
    slug: 'john',
    category: 'Password Attacks',
    subcategory: 'Hash Cracking',
    description: 'Fast and versatile offline password cracker supporting hundreds of hash types with dictionary, rule-based, and brute-force modes.',
    longDescription: `John the Ripper (JtR) is one of the oldest and most widely used password cracking tools. It automatically detects hash types, supports a large number of formats, and includes a powerful rule engine to mutate wordlist entries.

John the Ripper modes:
- **Wordlist mode**: Try every password in a wordlist, optionally applying transformation rules.
- **Incremental mode**: Pure brute-force across a defined character set and length range.
- **Single crack mode**: Uses username and GECOS information as password candidates — often the fastest for simple passwords.
- **External mode**: Uses a C-like scripting language for custom cracking logic.

The "jumbo" community patch (shipped in Kali) adds support for 400+ additional formats including bcrypt, scrypt, ZIP, 7-Zip, PDF, KeePass, and many more.

Use \`john --list=formats\` to see all supported hash types.`,
    commands: [
      {
        title: 'Basic hash crack (auto-detect format)',
        syntax: 'john <hashfile>',
        description: 'Automatically detect the hash format and attempt to crack using the built-in wordlist and rules.',
        example: 'john /home/kali/hashes.txt',
        flags: [
          { flag: '--wordlist', description: 'Path to wordlist file' },
          { flag: '--format', description: 'Force a specific hash format (e.g., md5crypt, sha512crypt, ntlm)' },
          { flag: '--rules', description: 'Apply word-mangling rules to wordlist entries' },
          { flag: '--show', description: 'Show all cracked passwords from a session' },
          { flag: '--incremental', description: 'Use incremental (brute-force) mode' },
          { flag: '--fork', description: 'Fork N processes for parallel cracking' },
          { flag: '--session', description: 'Name the session for later restoration' },
          { flag: '--restore', description: 'Restore a previously saved session' },
          { flag: '--list=formats', description: 'List all supported hash formats' },
        ],
      },
      {
        title: 'Dictionary attack with rockyou',
        syntax: 'john --wordlist=<wordlist> <hashfile>',
        description: 'Use a wordlist file as the candidate password source. rockyou.txt is the standard starting point.',
        example: 'john --wordlist=/usr/share/wordlists/rockyou.txt /home/kali/hashes.txt',
      },
      {
        title: 'Crack with specific hash format',
        syntax: 'john --format=<format> --wordlist=<wordlist> <hashfile>',
        description: 'Specify the exact hash type when auto-detection fails or gives wrong results.',
        example: 'john --format=md5crypt --wordlist=/usr/share/wordlists/rockyou.txt /home/kali/shadow.txt',
      },
      {
        title: 'Dictionary attack with rules',
        syntax: 'john --wordlist=<wordlist> --rules <hashfile>',
        description: 'Apply John\'s built-in word mangling rules (capitalise, append numbers/special chars, leet-speak) to every wordlist entry.',
        example: 'john --wordlist=/usr/share/wordlists/rockyou.txt --rules /home/kali/hashes.txt',
      },
      {
        title: 'Show cracked passwords',
        syntax: 'john --show <hashfile>',
        description: 'Display all passwords cracked in previous sessions. The cracked results are stored in john.pot.',
        example: 'john --show /home/kali/hashes.txt',
      },
      {
        title: 'Incremental (pure brute-force) mode',
        syntax: 'john --incremental <hashfile>',
        description: 'Perform a pure brute-force attack cycling through all character combinations. Slow but exhaustive.',
        example: 'john --incremental=Digits --fork=4 /home/kali/hashes.txt',
      },
    ],
    useCases: [
      'Crack /etc/shadow password hashes obtained from a compromised Linux system',
      'Recover NTLM password hashes dumped from Windows SAM or memory',
      'Break password-protected ZIP, PDF, and Office document files',
      'Audit password strength in an organisation\'s Active Directory hash dump',
      'Combine with custom rules to crack passwords matching known policies',
    ],
    difficulty: 'Beginner',
    featured: true,
    tags: ['password cracking', 'hash', 'wordlist', 'brute force', 'offline', 'shadow', 'ntlm', 'md5', 'sha'],
    relatedTools: ['hashcat', 'hydra', 'crunch'],
  },

  {
    name: 'Hashcat',
    slug: 'hashcat',
    category: 'Password Attacks',
    subcategory: 'Hash Cracking',
    description: 'World\'s fastest GPU-accelerated password recovery tool supporting 350+ hash types and multiple attack modes.',
    longDescription: `Hashcat is the world's fastest password recovery utility, leveraging GPU acceleration (CUDA and OpenCL) to achieve cracking speeds orders of magnitude faster than CPU-only tools.

Attack modes (-a flag):
- **0 – Dictionary**: Try each word in a wordlist, optionally with rules
- **1 – Combination**: Combine words from two wordlists
- **3 – Brute-force / Mask**: Generate candidates from a pattern mask
- **6 – Hybrid dict + mask**: Append mask to each dictionary word
- **7 – Hybrid mask + dict**: Prepend mask to each dictionary word

Mask characters:
- ?l = lowercase letters (a–z)
- ?u = uppercase letters (A–Z)
- ?d = digits (0–9)
- ?s = special characters
- ?a = all printable ASCII

Common hash modes (-m):
- 0 = MD5, 100 = SHA-1, 1400 = SHA-256, 1700 = SHA-512
- 1000 = NTLM, 3000 = LM, 5500 = NetNTLMv1, 5600 = NetNTLMv2
- 1800 = sha512crypt ($6$), 1500 = descrypt, 3200 = bcrypt`,
    commands: [
      {
        title: 'Dictionary attack (mode 0)',
        syntax: 'hashcat -m <hash_type> -a 0 <hashfile> <wordlist>',
        description: 'Run each password in the wordlist against the hashes. The most common starting attack.',
        example: 'hashcat -m 0 -a 0 /home/kali/hashes.txt /usr/share/wordlists/rockyou.txt',
        flags: [
          { flag: '-m', description: 'Hash type (e.g., 0=MD5, 1000=NTLM, 1800=sha512crypt, 3200=bcrypt)' },
          { flag: '-a', description: 'Attack mode (0=dict, 1=combo, 3=mask, 6=hybrid dict+mask)' },
          { flag: '-o', description: 'Output cracked passwords to a file' },
          { flag: '--show', description: 'Show previously cracked passwords from hashcat.potfile' },
          { flag: '--force', description: 'Ignore warnings (e.g., missing GPU drivers — not recommended in production)' },
          { flag: '-r', description: 'Apply a rules file to wordlist entries' },
          { flag: '-w', description: 'Workload profile 1–4 (4 = nightmare; use 2 for background)' },
          { flag: '--increment', description: 'Enable mask increment mode' },
          { flag: '--increment-min', description: 'Minimum mask length for increment mode' },
          { flag: '--increment-max', description: 'Maximum mask length for increment mode' },
        ],
      },
      {
        title: 'Brute-force with mask (mode 3)',
        syntax: 'hashcat -m <hash_type> -a 3 <hashfile> <mask>',
        description: 'Generate candidates matching a pattern mask. Use mask characters to represent character classes.',
        example: 'hashcat -m 0 -a 3 /home/kali/hashes.txt "?u?l?l?l?d?d?d?d"',
      },
      {
        title: 'Combination attack (mode 1)',
        syntax: 'hashcat -m <hash_type> -a 1 <hashfile> <wordlist1> <wordlist2>',
        description: 'Combine every word from wordlist1 with every word from wordlist2 to produce candidates.',
        example: 'hashcat -m 1000 -a 1 /home/kali/ntlm_hashes.txt /home/kali/firstnames.txt /home/kali/surnames.txt',
      },
      {
        title: 'Show previously cracked hashes',
        syntax: 'hashcat -m <hash_type> <hashfile> <wordlist> --show',
        description: 'Display hashes that have already been cracked and stored in the potfile without re-running the attack.',
        example: 'hashcat -m 0 /home/kali/hashes.txt /usr/share/wordlists/rockyou.txt --show',
      },
      {
        title: 'Benchmark GPU performance',
        syntax: 'hashcat -b',
        description: 'Run a benchmark of all supported hash types to measure GPU cracking speed. Useful for estimating attack duration.',
        example: 'hashcat -b -m 0',
      },
      {
        title: 'Dictionary attack with rules',
        syntax: 'hashcat -m <hash_type> -a 0 <hashfile> <wordlist> -r <rulesfile>',
        description: 'Apply a rules file to transform each wordlist word (append numbers, toggle case, leet-speak) before testing.',
        example: 'hashcat -m 0 -a 0 /home/kali/hashes.txt /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule',
      },
    ],
    useCases: [
      'GPU-accelerated cracking of NTLM hashes from Windows AD domain dump',
      'Recover bcrypt passwords from stolen web application databases',
      'Mask-based attacks against passwords conforming to known complexity policies',
      'Crack NetNTLMv2 hashes captured with Responder on an internal network',
      'Benchmark GPU hardware to estimate cracking times before starting large jobs',
    ],
    difficulty: 'Intermediate',
    featured: true,
    tags: ['password cracking', 'hash', 'gpu', 'dictionary', 'mask', 'brute force', 'ntlm', 'md5', 'bcrypt', 'offline'],
    relatedTools: ['john', 'crunch', 'hash-identifier'],
  },

  {
    name: 'Hydra',
    slug: 'hydra',
    category: 'Password Attacks',
    subcategory: 'Online Brute-Force',
    description: 'Fast and flexible online brute-force tool supporting over 50 protocols including SSH, FTP, HTTP, RDP, SMB, and many more.',
    longDescription: `Hydra (also called THC-Hydra) is the go-to online password brute-forcing tool for penetration testers. Unlike hashcat and John the Ripper which operate on captured hashes offline, Hydra attacks live services over the network.

Supported protocols include:
SSH, FTP, HTTP/HTTPS GET/POST, SMB, RDP, VNC, Telnet, SMTP, POP3, IMAP, LDAP, MySQL, MSSQL, PostgreSQL, Oracle, Redis, MongoDB, Cisco, Juniper, and many more.

Key concepts:
- Use -l for a single login name, -L for a file of login names
- Use -p for a single password, -P for a password file
- Use -C for a colon-separated (login:pass) credential file
- The http-post-form module requires the form path, POST body with ^USER^ and ^PASS^ placeholders, and a failure string

Always be mindful of account lockout policies. Use -t to limit threads and -W to add a wait time between attempts.`,
    commands: [
      {
        title: 'SSH brute-force',
        syntax: 'hydra -l <user> -P <passlist> <target_ip> ssh',
        description: 'Brute-force SSH login for a known username against a single target.',
        example: 'hydra -l root -P /usr/share/wordlists/rockyou.txt 192.168.1.105 ssh',
        flags: [
          { flag: '-l / -L', description: 'Single login username / file of usernames' },
          { flag: '-p / -P', description: 'Single password / file of passwords' },
          { flag: '-t', description: 'Number of parallel tasks per target (default 16)' },
          { flag: '-V', description: 'Verbose — show each username:password attempt' },
          { flag: '-f', description: 'Exit after the first found login/password pair' },
          { flag: '-s', description: 'Custom port number' },
          { flag: '-o', description: 'Write found credentials to a file' },
        ],
      },
      {
        title: 'FTP brute-force with user and password lists',
        syntax: 'hydra -L <userlist> -P <passlist> <target_ip> ftp',
        description: 'Try all combinations of usernames and passwords from files against an FTP service.',
        example: 'hydra -L /usr/share/seclists/Usernames/top-usernames-shortlist.txt -P /usr/share/wordlists/rockyou.txt 192.168.1.105 ftp -t 10',
      },
      {
        title: 'HTTP POST form brute-force',
        syntax: 'hydra -l <user> -P <passlist> <target> http-post-form "<path>:<body>:<fail_string>"',
        description: 'Brute-force an HTTP login form. The module string has three colon-delimited parts: form path, POST body with ^USER^/^PASS^ placeholders, and the failure indicator string.',
        example: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt target.htb http-post-form "/login:username=^USER^&password=^PASS^:Invalid credentials"',
      },
      {
        title: 'RDP brute-force',
        syntax: 'hydra -l <user> -P <passlist> <target_ip> rdp',
        description: 'Attack a Windows Remote Desktop Protocol service. Use -t 4 as RDP does not handle many concurrent connections well.',
        example: 'hydra -l administrator -P /usr/share/wordlists/rockyou.txt 192.168.1.110 rdp -t 4',
      },
      {
        title: 'Multiple targets from a file',
        syntax: 'hydra -L <userlist> -P <passlist> -M <targets_file> <protocol>',
        description: 'Test multiple target hosts listed one per line in a file. All targets are attacked concurrently.',
        example: 'hydra -L /home/kali/users.txt -P /home/kali/passwords.txt -M /home/kali/targets.txt ssh -t 8',
      },
      {
        title: 'Verbose SSH attack with thread limiting',
        syntax: 'hydra -l <user> -P <passlist> -t <threads> -V <target_ip> <protocol>',
        description: 'Run a rate-limited, verbose attack to monitor each attempt. Use -f to stop on the first successful credential.',
        example: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt -t 4 -V -f 192.168.1.105 ssh',
      },
    ],
    useCases: [
      'Brute-force SSH services on discovered network hosts during an internal pentest',
      'Attack web application login forms during authorised web application testing',
      'Test default credential exposure on network devices (routers, switches, printers)',
      'Credential stuffing against FTP, SMTP, and database services',
      'Validate password policy enforcement by testing lockout thresholds',
    ],
    difficulty: 'Beginner',
    tags: ['brute force', 'online attack', 'ssh', 'ftp', 'http', 'rdp', 'smb', 'credential stuffing', 'network'],
    relatedTools: ['medusa', 'ncrack', 'burpsuite'],
  },

  {
    name: 'Medusa',
    slug: 'medusa',
    category: 'Password Attacks',
    subcategory: 'Online Brute-Force',
    description: 'Speedy, parallel, and modular login brute-forcer supporting many network services as an alternative to Hydra.',
    longDescription: `Medusa is a parallel, modular, login brute-forcer designed to support as many services as possible. It is often used as an alternative to Hydra due to its different module implementations for certain protocols.

Supported modules include: ssh, ftp, http, https, smb, mssql, mysql, postgres, telnet, vnc, pop3, imap, smtp, snmp, rdp, and more. Use \`medusa -d\` to list all available modules.

Medusa uses a host-based parallel connection model — it opens multiple connections to the same host simultaneously, which can be tuned with -t (tasks per host) and -T (total hosts in parallel).`,
    commands: [
      {
        title: 'SSH brute-force',
        syntax: 'medusa -h <host> -u <user> -P <passlist> -M ssh',
        description: 'Attack SSH with a single username and a password list.',
        example: 'medusa -h 192.168.1.105 -u root -P /usr/share/wordlists/rockyou.txt -M ssh -t 4',
        flags: [
          { flag: '-h', description: 'Target host IP or hostname' },
          { flag: '-u / -U', description: 'Single username / file of usernames' },
          { flag: '-p / -P', description: 'Single password / file of passwords' },
          { flag: '-M', description: 'Module (protocol) to use' },
          { flag: '-t', description: 'Number of concurrent tasks per host' },
          { flag: '-f', description: 'Stop cracking after first valid credential found' },
          { flag: '-n', description: 'Custom port number' },
          { flag: '-v', description: 'Verbosity level (e.g., -v 6 for max detail)' },
        ],
      },
      {
        title: 'HTTP basic auth brute-force',
        syntax: 'medusa -h <host> -U <userlist> -P <passlist> -M http',
        description: 'Attack HTTP Basic Authentication on a web server.',
        example: 'medusa -h target.htb -U /usr/share/seclists/Usernames/top-usernames-shortlist.txt -P /usr/share/wordlists/rockyou.txt -M http -m DIR:/admin/ -t 10',
      },
      {
        title: 'FTP brute-force',
        syntax: 'medusa -h <host> -u <user> -P <passlist> -M ftp',
        description: 'Attempt FTP login using a password wordlist against a single username.',
        example: 'medusa -h 192.168.1.105 -u ftp -P /usr/share/wordlists/rockyou.txt -M ftp -t 4 -v 6',
      },
      {
        title: 'SMB brute-force with user and pass files',
        syntax: 'medusa -h <host> -U <userlist> -P <passlist> -M smbnt',
        description: 'Brute-force Windows SMB authentication using the smbnt module.',
        example: 'medusa -h 192.168.1.110 -U /home/kali/users.txt -P /home/kali/passwords.txt -M smbnt -t 4 -f',
      },
    ],
    useCases: [
      'Parallel brute-force of multiple protocols on internal network hosts',
      'Test FTP, SSH, and SMB services for weak or default credentials',
      'Validate network service credential policies during infrastructure pentests',
    ],
    difficulty: 'Beginner',
    tags: ['brute force', 'online attack', 'ssh', 'ftp', 'smb', 'http', 'parallel', 'modular'],
    relatedTools: ['hydra', 'ncrack', 'john'],
  },

  {
    name: 'Crunch',
    slug: 'crunch',
    category: 'Password Attacks',
    subcategory: 'Wordlist Generation',
    description: 'Wordlist generator that creates custom lists based on length ranges, character sets, and pattern templates.',
    longDescription: `Crunch generates wordlists from user-defined parameters. It can produce lists based on:
- A minimum and maximum length with a specified character set
- A pattern template using placeholder characters
- Custom character sets defined inline or from a charset file

Pattern characters:
- @ = lowercase letters (or custom)
- , = uppercase letters
- % = digits
- ^ = special characters (printable non-alphanumeric)

Crunch outputs to stdout by default. Use -o to write directly to a file, or pipe into a cracking tool to avoid writing to disk (important when dealing with very large lists). Use -b to split output into multiple files of a given size (e.g., 1mb) and -c to limit lines per file.`,
    commands: [
      {
        title: 'Generate wordlist by length and charset',
        syntax: 'crunch <min-len> <max-len> <charset>',
        description: 'Generate all combinations of characters from the charset between min and max length.',
        example: 'crunch 6 8 abcdefghijklmnopqrstuvwxyz0123456789',
        flags: [
          { flag: 'min-len', description: 'Minimum password length' },
          { flag: 'max-len', description: 'Maximum password length' },
          { flag: 'charset', description: 'Character set string (inline or charset file name)' },
          { flag: '-t', description: 'Pattern template (@ = lower, , = upper, % = digit, ^ = special)' },
          { flag: '-o', description: 'Output file path' },
          { flag: '-b', description: 'Maximum output file size (e.g., 100mb)' },
          { flag: '-c', description: 'Number of lines per output file' },
          { flag: '-s', description: 'Starting string' },
        ],
      },
      {
        title: 'Generate with custom character set',
        syntax: 'crunch <min-len> <max-len> <chars> -o <outfile>',
        description: 'Restrict candidates to a specific set of characters and save directly to a file.',
        example: 'crunch 4 6 0123456789 -o /home/kali/pin_list.txt',
      },
      {
        title: 'Pattern-based generation',
        syntax: 'crunch <len> <len> -t <pattern>',
        description: 'Generate words matching a fixed pattern. Useful when part of the password is known (e.g., company name + 4 digits).',
        example: 'crunch 10 10 -t "Company%%%%" -o /home/kali/pattern_list.txt',
      },
      {
        title: 'Pipe directly into John the Ripper',
        syntax: 'crunch <min> <max> <charset> | john --stdin <hashfile>',
        description: 'Pipe crunch output directly into John the Ripper via stdin to avoid writing a large wordlist to disk.',
        example: 'crunch 4 4 0123456789 | john --stdin /home/kali/hashes.txt --format=raw-md5',
      },
    ],
    useCases: [
      'Generate targeted PIN lists for known numeric-only passwords',
      'Create custom wordlists when a password policy is known (e.g., 8 chars, upper + lower + digit)',
      'Produce pattern wordlists based on company name and common suffixes',
      'Pipe generated passwords into Hydra or John to avoid large disk writes',
    ],
    difficulty: 'Beginner',
    tags: ['wordlist', 'password generation', 'brute force', 'custom charset', 'pattern', 'offline'],
    relatedTools: ['john', 'hashcat', 'cewl'],
  },

  {
    name: 'CeWL',
    slug: 'cewl',
    category: 'Password Attacks',
    subcategory: 'Wordlist Generation',
    description: 'Custom wordlist generator that spiders a website and extracts unique words to build a target-specific password list.',
    longDescription: `CeWL (Custom Word List generator) crawls a target website to a specified depth and collects all unique words. The resulting wordlist is highly targeted because it contains terminology specific to the organisation — product names, project names, employee names, and jargon — which employees often use as passwords.

CeWL can also:
- Extract email addresses from the target site (--email)
- Harvest metadata from downloaded documents (--meta)
- Include numbers (found as standalone words) in the output
- Set minimum word length to avoid noise from short common words

The output wordlist integrates seamlessly with Hydra, John, and hashcat for targeted attacks.`,
    commands: [
      {
        title: 'Basic wordlist from URL',
        syntax: 'cewl <url> -w <outfile>',
        description: 'Spider the URL to default depth 2 and write unique words to a file.',
        example: 'cewl http://target.htb -w /home/kali/cewl_wordlist.txt',
        flags: [
          { flag: '-d', description: 'Crawl depth (default 2)' },
          { flag: '-m', description: 'Minimum word length (default 3)' },
          { flag: '-w', description: 'Output wordlist file' },
          { flag: '--email (-e)', description: 'Include email addresses found on the site' },
          { flag: '--meta', description: 'Extract metadata from downloaded files' },
          { flag: '-a', description: 'Include numbers (off by default)' },
        ],
      },
      {
        title: 'Wordlist with minimum length and depth',
        syntax: 'cewl <url> -d <depth> -m <min_length> -w <outfile>',
        description: 'Spider deeper and filter out very short words to reduce noise.',
        example: 'cewl http://target.htb -d 3 -m 6 -w /home/kali/cewl_wordlist.txt',
      },
      {
        title: 'Wordlist with email harvesting',
        syntax: 'cewl <url> -e -w <outfile>',
        description: 'Include email addresses found on the website in the output — useful for username enumeration as well as password candidates.',
        example: 'cewl http://target.htb -e -d 2 -m 5 -w /home/kali/cewl_emails.txt',
      },
    ],
    useCases: [
      'Build a target-specific wordlist for a spear-phishing or password-spray attack',
      'Supplement rockyou.txt with organisation-specific terms before cracking',
      'Harvest email addresses from a target website for username lists',
      'Collect product names and jargon from a corporate site for a custom dictionary',
    ],
    difficulty: 'Beginner',
    tags: ['wordlist', 'web spider', 'password generation', 'reconnaissance', 'custom'],
    relatedTools: ['crunch', 'john', 'hydra'],
  },

  {
    name: 'hash-identifier',
    slug: 'hash-identifier',
    category: 'Password Attacks',
    subcategory: 'Hash Analysis',
    description: 'Interactive tool that identifies the likely hash algorithm used to produce a given hash string.',
    longDescription: `hash-identifier analyses a hash string and returns a ranked list of hash algorithms it could represent, based on the hash's length, character set, and structural patterns.

Knowing the hash type is essential before attempting to crack it — supplying the wrong format to hashcat or John the Ripper will produce no results. hash-identifier supports common algorithms including MD5, SHA-1, SHA-256, SHA-512, NTLM, MySQL, bcrypt, and many more.

For more detailed analysis with confidence scores, consider hashid as an alternative — it uses a more structured regex database and supports output in hashcat (-m) and john (--format) notation.`,
    commands: [
      {
        title: 'Interactive mode',
        syntax: 'hash-identifier',
        description: 'Launch the interactive prompt and paste a hash to identify it. Type QUIT to exit.',
        example: 'hash-identifier\n# At the prompt paste: 5f4dcc3b5aa765d61d8327deb882cf99',
      },
      {
        title: 'Identify hash via stdin pipe',
        syntax: 'echo "<hash>" | hash-identifier',
        description: 'Pipe a hash directly to hash-identifier for quick non-interactive identification. The tool will print likely matches and exit.',
        example: 'echo "5f4dcc3b5aa765d61d8327deb882cf99" | hash-identifier',
      },
    ],
    useCases: [
      'Identify the algorithm of an unknown hash before selecting a cracking tool',
      'Determine the correct -m value for hashcat or --format value for John',
      'Quick analysis of hashes discovered in a database dump or config file',
    ],
    difficulty: 'Beginner',
    tags: ['hash', 'identification', 'analysis', 'md5', 'sha', 'ntlm', 'reconnaissance'],
    relatedTools: ['hashid', 'hashcat', 'john'],
  },

  // ─────────────────────────────────────────────
  // WIRELESS ATTACKS
  // ─────────────────────────────────────────────
  {
    name: 'Aircrack-ng',
    slug: 'aircrack-ng',
    category: 'Wireless Attacks',
    subcategory: 'WEP/WPA Cracking',
    description: 'Complete 802.11 WEP and WPA/WPA2-PSK key cracking suite using captured IVs or 4-way handshakes.',
    longDescription: `Aircrack-ng is the core cracking component of the aircrack-ng suite. It takes captured wireless frames (.cap/.ivs files) and attempts to recover the network key:

- **WEP cracking**: Statistical attack on collected IVs (Initialisation Vectors). Requires around 20,000–40,000 IVs for reliable cracking. Use aireplay-ng ARP replay (-3) to accelerate IV collection.
- **WPA/WPA2 cracking**: Dictionary/brute-force attack against a captured 4-way handshake. The handshake is captured by passively listening or by forcing client reconnection with aireplay-ng deauthentication (-0).
- **PMKID attack (-z)**: Newer technique that doesn't require capturing a handshake — only the PMKID from a single EAPOL frame is needed.

The typical workflow is: airmon-ng (enable monitor mode) → airodump-ng (capture traffic) → aireplay-ng (inject/deauth) → aircrack-ng (crack).`,
    commands: [
      {
        title: 'Crack WEP key',
        syntax: 'aircrack-ng -b <bssid> <capturefile>',
        description: 'Perform a statistical WEP key recovery attack on IVs captured in the .cap file for the specified BSSID.',
        example: 'aircrack-ng -b AA:BB:CC:DD:EE:FF /home/kali/capture-01.cap',
        flags: [
          { flag: '-b', description: 'BSSID (AP MAC address) to target' },
          { flag: '-e', description: 'ESSID (network name) to target' },
          { flag: '-w', description: 'Path to wordlist for WPA dictionary attack' },
          { flag: '-z', description: 'Use PMKID attack mode' },
          { flag: '-K', description: 'Use Korek WEP attack (older, slower)' },
        ],
      },
      {
        title: 'Crack WPA/WPA2 with wordlist',
        syntax: 'aircrack-ng -w <wordlist> -b <bssid> <capturefile>',
        description: 'Run a dictionary attack against a captured WPA 4-way handshake. rockyou.txt is the standard starting wordlist.',
        example: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/wpa_capture-01.cap',
      },
      {
        title: 'Crack using ESSID instead of BSSID',
        syntax: 'aircrack-ng -e "<essid>" -w <wordlist> <capturefile>',
        description: 'Identify the target network by its name (SSID) rather than MAC address.',
        example: 'aircrack-ng -e "HomeNetwork" -w /usr/share/wordlists/rockyou.txt /home/kali/capture-01.cap',
      },
      {
        title: 'Show available networks in capture file',
        syntax: 'aircrack-ng <capturefile>',
        description: 'List all detected APs and clients in the capture file along with the number of IVs and whether a WPA handshake is present.',
        example: 'aircrack-ng /home/kali/capture-01.cap',
      },
      {
        title: 'Crack using multiple capture files',
        syntax: 'aircrack-ng -w <wordlist> -b <bssid> *.cap',
        description: 'Combine multiple capture files using a wildcard. Useful when captures have been split or taken across multiple sessions.',
        example: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/captures/*.cap',
      },
      {
        title: 'WPA PMKID attack',
        syntax: 'aircrack-ng -z <pmkid_file> <wordlist>',
        description: 'Crack a PMKID hash obtained with hcxdumptool/hcxtools without needing a full 4-way handshake.',
        example: 'aircrack-ng -z /home/kali/pmkid.16800 /usr/share/wordlists/rockyou.txt',
      },
    ],
    useCases: [
      'Recover WEP keys from captured IV-rich pcap files during wireless assessments',
      'Crack WPA2-PSK from a 4-way handshake captured via airodump-ng',
      'Verify wireless password strength as part of a wireless security audit',
      'Combine with hashcat (-m 22000) for GPU-accelerated WPA cracking',
    ],
    difficulty: 'Intermediate',
    featured: true,
    tags: ['wireless', 'wifi', 'wep', 'wpa', 'wpa2', 'handshake', '802.11', 'dictionary', 'cracking'],
    relatedTools: ['airmon-ng', 'airodump-ng', 'aireplay-ng', 'hashcat'],
  },

  {
    name: 'Airmon-ng',
    slug: 'airmon-ng',
    category: 'Wireless Attacks',
    subcategory: 'Wireless Utilities',
    description: 'Utility to enable and disable monitor mode on wireless interfaces and kill processes that interfere with packet capture.',
    longDescription: `Airmon-ng is the interface management component of the aircrack-ng suite. Its primary role is to switch a wireless adapter into monitor mode — a promiscuous mode that allows the adapter to capture all 802.11 frames in range regardless of the destination MAC address.

Monitor mode is required before using airodump-ng to capture packets or aireplay-ng to inject frames. When you enable monitor mode, the interface is typically renamed from wlan0 to wlan0mon.

Several system processes (NetworkManager, wpa_supplicant, dhclient) can interfere with monitor mode and packet injection. Use \`airmon-ng check kill\` to stop them before starting a wireless attack.

Note: not all wireless adapters support monitor mode and packet injection. Cards based on the Atheros AR9271, Ralink RT3070, and Realtek RTL8812AU chipsets are popular choices for wireless testing.`,
    commands: [
      {
        title: 'Check for interfering processes',
        syntax: 'airmon-ng check',
        description: 'List all processes that may interfere with monitor mode or packet injection (e.g., NetworkManager, wpa_supplicant).',
        example: 'airmon-ng check',
      },
      {
        title: 'Kill interfering processes and start monitor mode',
        syntax: 'airmon-ng check kill && airmon-ng start <interface>',
        description: 'Stop all interfering processes and then enable monitor mode on the specified wireless interface.',
        example: 'airmon-ng check kill && airmon-ng start wlan0',
      },
      {
        title: 'Start monitor mode on specific channel',
        syntax: 'airmon-ng start <interface> <channel>',
        description: 'Enable monitor mode locked to a specific 802.11 channel. Useful when you already know the target AP channel.',
        example: 'airmon-ng start wlan0 6',
      },
      {
        title: 'Stop monitor mode',
        syntax: 'airmon-ng stop <monitor_interface>',
        description: 'Disable monitor mode and return the interface to managed mode.',
        example: 'airmon-ng stop wlan0mon',
      },
    ],
    useCases: [
      'Enable monitor mode on a wireless adapter as the first step of a wireless pentest',
      'Kill interfering processes to prevent disruption during packet capture',
      'Set up a specific channel to target a known access point',
      'Restore managed mode after completing a wireless assessment',
    ],
    difficulty: 'Intermediate',
    tags: ['wireless', 'monitor mode', '802.11', 'interface', 'wifi', 'aircrack-ng suite'],
    relatedTools: ['aircrack-ng', 'airodump-ng', 'kismet'],
  },

  {
    name: 'Airodump-ng',
    slug: 'airodump-ng',
    category: 'Wireless Attacks',
    subcategory: 'Wireless Capture',
    description: 'Raw 802.11 packet capture tool that lists nearby access points and associated clients, and saves frames to pcap files.',
    longDescription: `Airodump-ng captures raw 802.11 frames from all networks in range (or a targeted network) and displays live information about APs and associated clients. It is used to:
- Identify target networks (BSSID, channel, ESSID, encryption type)
- Discover clients associated with target APs
- Capture WPA 4-way handshakes (indicated by "WPA handshake: AA:BB:CC:DD:EE:FF" in the header)
- Collect WEP IVs for statistical cracking

When saving captures with -w, airodump-ng creates a .cap file (full frames) and a .csv summary. The .cap file is passed directly to aircrack-ng for cracking.

Channel hopping is automatic by default. Lock to a specific channel with -c to avoid missing frames from the target AP.`,
    commands: [
      {
        title: 'Scan all channels for nearby APs',
        syntax: 'airodump-ng <monitor_interface>',
        description: 'Start scanning all 2.4 GHz channels in sequence, displaying discovered APs and associated clients. Press Ctrl+C to stop.',
        example: 'airodump-ng wlan0mon',
        flags: [
          { flag: '-c', description: 'Lock to a specific channel (avoids channel hopping)' },
          { flag: '--bssid', description: 'Filter capture to a single AP MAC address' },
          { flag: '-w', description: 'Write captured frames to files with this prefix' },
          { flag: '--ivs', description: 'Save only IVs to reduce file size (WEP attacks)' },
          { flag: '-d', description: 'Filter display to a specific AP (same as --bssid for display)' },
        ],
      },
      {
        title: 'Target a specific AP and save capture',
        syntax: 'airodump-ng -c <channel> --bssid <bssid> -w <prefix> <interface>',
        description: 'Focus on a single AP by locking the channel and filtering by BSSID. Write all captured frames to files prefixed with the given name.',
        example: 'airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w /home/kali/wpa_capture wlan0mon',
      },
      {
        title: 'Capture WPA handshake (targeted)',
        syntax: 'airodump-ng -c <channel> --bssid <bssid> -w <prefix> <interface>',
        description: 'Run a targeted capture waiting for a WPA handshake. Use aireplay-ng deauth in a separate terminal to force clients to reconnect and trigger the handshake.',
        example: 'airodump-ng -c 11 --bssid AA:BB:CC:DD:EE:FF -w /home/kali/handshake wlan0mon',
      },
      {
        title: 'Capture on 5 GHz band with specific channel',
        syntax: 'airodump-ng --band a -c <channel> -w <prefix> <interface>',
        description: 'Scan the 5 GHz band. Requires a wireless adapter that supports 5 GHz monitor mode.',
        example: 'airodump-ng --band a -c 36 --bssid AA:BB:CC:DD:EE:FF -w /home/kali/5ghz_capture wlan0mon',
      },
    ],
    useCases: [
      'Identify target wireless networks and their operating channels before an attack',
      'Capture WPA 4-way handshakes for offline password cracking with aircrack-ng',
      'Collect WEP IVs using the --ivs flag for statistical WEP cracking',
      'Discover all clients associated with a target AP for targeted deauthentication',
    ],
    difficulty: 'Intermediate',
    tags: ['wireless', 'packet capture', '802.11', 'wpa handshake', 'wep', 'wifi', 'reconnaissance'],
    relatedTools: ['airmon-ng', 'aircrack-ng', 'aireplay-ng'],
  },

  {
    name: 'Aireplay-ng',
    slug: 'aireplay-ng',
    category: 'Wireless Attacks',
    subcategory: 'Wireless Injection',
    description: 'Wireless packet injection and replay tool used to generate traffic for WEP cracking and force WPA handshake captures.',
    longDescription: `Aireplay-ng generates and injects 802.11 frames to assist in wireless attacks. It requires a wireless adapter that supports packet injection.

Attack modes:
- **-0 (Deauthentication)**: Send forged deauth frames to disconnect a client from an AP, forcing a WPA 4-way handshake when it reconnects.
- **-1 (Fake Authentication)**: Associate with an AP without a valid PSK, required before ARP replay on WEP networks.
- **-2 (Interactive packet replay)**: Select and replay specific frames.
- **-3 (ARP request replay)**: Capture and replay ARP requests to generate large numbers of WEP IVs rapidly.
- **-4 (Korek chopchop)**: Decrypt WEP packets without knowing the key.
- **-5 (Fragmentation)**: Obtain a PRGA keystream from the AP.
- **-6 (Café-Latte)**: Attack WEP-equipped clients by exploiting the ARP mechanism.

Always use on networks you own or have explicit written permission to test.`,
    commands: [
      {
        title: 'Deauthentication attack',
        syntax: 'aireplay-ng -0 <count> -a <ap_bssid> -c <client_mac> <interface>',
        description: 'Send deauthentication frames to disconnect a specific client from the AP, forcing a WPA handshake on reconnect. Use count=0 for continuous deauth.',
        example: 'aireplay-ng -0 10 -a AA:BB:CC:DD:EE:FF -c CC:DD:EE:FF:00:11 wlan0mon',
        flags: [
          { flag: '-0', description: 'Deauthentication attack; specify number of deauth frames (0 = infinite)' },
          { flag: '-1', description: 'Fake authentication; associate with AP' },
          { flag: '-3', description: 'ARP request replay attack for WEP IV generation' },
          { flag: '-6', description: 'Café-Latte attack targeting WEP clients' },
          { flag: '-a', description: 'Access point BSSID (MAC address)' },
          { flag: '-c', description: 'Target client MAC address' },
          { flag: '-e', description: 'Target network ESSID' },
        ],
      },
      {
        title: 'Fake authentication with AP',
        syntax: 'aireplay-ng -1 0 -a <ap_bssid> -h <your_mac> <interface>',
        description: 'Associate with a WEP access point using a fake authentication. Necessary before ARP replay to establish an association.',
        example: 'aireplay-ng -1 0 -a AA:BB:CC:DD:EE:FF -h 00:11:22:33:44:55 wlan0mon',
      },
      {
        title: 'ARP request replay (WEP IV generation)',
        syntax: 'aireplay-ng -3 -b <ap_bssid> -h <your_mac> <interface>',
        description: 'Capture ARP requests and replay them at high speed to force the AP to generate new IVs, dramatically accelerating WEP cracking.',
        example: 'aireplay-ng -3 -b AA:BB:CC:DD:EE:FF -h 00:11:22:33:44:55 wlan0mon',
      },
      {
        title: 'Interactive packet replay',
        syntax: 'aireplay-ng -2 -p 0841 -c FF:FF:FF:FF:FF:FF -b <bssid> <interface>',
        description: 'Interactively select and replay a captured packet. Can be used to replay specific frames from a .cap file.',
        example: 'aireplay-ng -2 -p 0841 -c FF:FF:FF:FF:FF:FF -b AA:BB:CC:DD:EE:FF wlan0mon',
      },
    ],
    useCases: [
      'Force WPA handshake capture by deauthenticating connected clients',
      'Accelerate WEP IV collection using ARP replay to crack keys faster',
      'Associate with WEP networks as a prerequisite for ARP replay attacks',
      'Test wireless IDS/IPS detection of deauthentication frame injection',
    ],
    difficulty: 'Intermediate',
    tags: ['wireless', 'packet injection', '802.11', 'deauth', 'wep', 'wpa', 'arp replay', 'wifi'],
    relatedTools: ['airmon-ng', 'airodump-ng', 'aircrack-ng'],
  },

  {
    name: 'Wifite',
    slug: 'wifite',
    category: 'Wireless Attacks',
    subcategory: 'Automated Wireless',
    description: 'Automated wireless auditing tool that combines aircrack-ng suite tools into a single workflow for attacking WEP, WPA, and WPS networks.',
    longDescription: `Wifite is a Python-based wireless attack automation framework. It orchestrates airmon-ng, airodump-ng, aireplay-ng, aircrack-ng, reaver, and other tools to attack nearby networks with minimal user interaction.

Wifite workflow:
1. Automatically enables monitor mode
2. Scans for nearby networks
3. Presents a numbered list of targets for the user to select
4. Attempts attacks in order: WPS PIN → WPS pixie-dust → WPA handshake capture + cracking → WEP IV collection + cracking
5. Saves cracked credentials to a file

Wifite2 (the current version in Kali) is a rewrite with improved support for modern attack techniques. It is ideal for beginners and for rapid assessments where speed matters over stealth.`,
    commands: [
      {
        title: 'Attack all nearby networks',
        syntax: 'wifite',
        description: 'Scan for all nearby wireless networks and prompt the user to select targets. Attempts all applicable attack methods automatically.',
        example: 'sudo wifite',
        flags: [
          { flag: '--wpa', description: 'Only attack WPA-encrypted networks' },
          { flag: '--wep', description: 'Only attack WEP-encrypted networks' },
          { flag: '--wps', description: 'Only attack networks with WPS enabled' },
          { flag: '--dict', description: 'Path to wordlist for WPA cracking' },
          { flag: '--bssid', description: 'Attack only this specific BSSID' },
          { flag: '--kill', description: 'Kill interfering processes before starting' },
          { flag: '--no-wps', description: 'Skip WPS attacks entirely' },
        ],
      },
      {
        title: 'WPS-only attack',
        syntax: 'wifite --wps',
        description: 'Limit attacks to networks with WPS enabled, attempting PIN brute-force and pixie-dust attacks.',
        example: 'sudo wifite --wps --bssid AA:BB:CC:DD:EE:FF',
      },
      {
        title: 'WPA attack with custom dictionary',
        syntax: 'wifite --dict <wordlist>',
        description: 'Run WPA handshake captures and crack them using the specified dictionary file.',
        example: 'sudo wifite --dict /usr/share/wordlists/rockyou.txt --wpa',
      },
    ],
    useCases: [
      'Rapid automated wireless assessment during a physical penetration test',
      'Demonstrate wireless exposure to clients without deep aircrack-ng knowledge',
      'Survey an estate for WPS-enabled routers vulnerable to pixie-dust attacks',
      'Capture and crack WPA handshakes across multiple target networks in one session',
    ],
    difficulty: 'Beginner',
    tags: ['wireless', 'automation', 'wpa', 'wep', 'wps', '802.11', 'wifi', 'all-in-one'],
    relatedTools: ['aircrack-ng', 'reaver', 'kismet'],
  },

  {
    name: 'Reaver',
    slug: 'reaver',
    category: 'Wireless Attacks',
    subcategory: 'WPS Attacks',
    description: 'WPS PIN brute-force tool that exploits a design flaw in the Wi-Fi Protected Setup protocol to recover the WPA/WPA2 passphrase.',
    longDescription: `Reaver exploits a vulnerability in the WPS (Wi-Fi Protected Setup) protocol. The WPS PIN is 8 digits, but due to the way the protocol validates the PIN in two halves (4+4 digits), the effective search space is only 11,000 combinations instead of 100,000,000.

Reaver:
1. Sends WPS authentication requests with each PIN candidate
2. Receives partial responses that reveal whether the first 4 digits are correct
3. After pinpointing the first 4 digits, brutes the last 4 (plus a checksum digit)
4. Once the correct PIN is found, the AP returns the WPA passphrase

Attack duration ranges from 4 to 10+ hours on unpatched routers, depending on AP response speed and whether rate-limiting is in place. The pixie-dust attack (--pixie-dust) can recover the PIN in seconds on vulnerable chipsets.

Note: Many modern routers have disabled WPS, implement lockout after failed attempts, or patch the half-PIN vulnerability.`,
    commands: [
      {
        title: 'Basic WPS PIN brute-force',
        syntax: 'reaver -i <interface> -b <bssid> -vv',
        description: 'Start a WPS PIN brute-force attack against the target AP. -vv provides verbose progress output.',
        example: 'reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv',
        flags: [
          { flag: '-i', description: 'Monitor mode interface to use' },
          { flag: '-b', description: 'BSSID of the target access point' },
          { flag: '-vv', description: 'Extra verbose output — show each PIN attempt' },
          { flag: '-d', description: 'Delay in seconds between PIN attempts (reduces lockout risk)' },
          { flag: '-t', description: 'Per-attempt timeout in seconds' },
          { flag: '-p', description: 'Supply a known PIN to skip brute-force' },
          { flag: '--no-nacks', description: 'Do not send NACK messages on receive timeouts' },
        ],
      },
      {
        title: 'Attack with delay to avoid lockout',
        syntax: 'reaver -i <interface> -b <bssid> -vv -d <delay>',
        description: 'Add a delay between PIN attempts to circumvent rate-limiting or temporary lockout on the AP.',
        example: 'reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv -d 3 -t 5',
      },
      {
        title: 'Verbose attack with no-nacks option',
        syntax: 'reaver -i <interface> -b <bssid> -vv --no-nacks',
        description: 'Disable NACK messages to improve reliability against certain AP firmware implementations.',
        example: 'reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv --no-nacks -d 2',
      },
    ],
    useCases: [
      'Recover WPA/WPA2 passphrase from WPS-enabled routers during wireless audits',
      'Demonstrate WPS vulnerability to clients as part of a wireless security review',
      'Test whether client-facing routers have WPS lockout policies properly configured',
    ],
    difficulty: 'Intermediate',
    tags: ['wireless', 'wps', 'wifi', 'brute force', '802.11', 'wpa recovery', 'pin attack'],
    relatedTools: ['wifite', 'bully', 'aircrack-ng'],
  },

  {
    name: 'Kismet',
    slug: 'kismet',
    category: 'Wireless Attacks',
    subcategory: 'Wireless Reconnaissance',
    description: 'Wireless network detector, sniffer, and intrusion detection system supporting 802.11, Bluetooth, and other RF protocols.',
    longDescription: `Kismet is a passive wireless network detector and packet sniffer. Unlike active scanners, Kismet works entirely passively — it does not transmit any frames, making it effectively undetectable during reconnaissance.

Kismet features:
- Detects 802.11a/b/g/n/ac/ax (Wi-Fi), Bluetooth, Zigbee, Z-Wave, and other RF protocols via plugins
- Captures complete raw packets to pcap files for offline analysis in Wireshark
- Maintains a database of observed APs, clients, SSIDs (including hidden networks), and signal levels
- Provides a web-based UI accessible at http://localhost:2501
- Supports GPS integration to map network locations (wardriving)
- Detects anomalies such as deauthentication floods and fake AP attacks

Kismet is particularly useful for long-running passive surveys and wireless IDS deployments.`,
    commands: [
      {
        title: 'Start Kismet with default settings',
        syntax: 'kismet',
        description: 'Launch Kismet. It will detect available wireless interfaces and start the web server. Access the interface at http://localhost:2501 in a browser.',
        example: 'sudo kismet',
      },
      {
        title: 'Start Kismet with a specific capture source',
        syntax: 'kismet -c <interface>',
        description: 'Start Kismet and specify which wireless interface to use as the capture source. Kismet will automatically enable monitor mode.',
        example: 'sudo kismet -c wlan0',
      },
      {
        title: 'Headless mode capturing to file',
        syntax: 'kismet -c <interface> --no-ncurses-wrapper --daemonize',
        description: 'Run Kismet as a background daemon without the terminal UI. Captures are saved automatically to ~/.kismet/ in .kismet and .pcap formats.',
        example: 'sudo kismet -c wlan0 --no-ncurses-wrapper --daemonize --log-prefix /home/kali/kismet_logs/survey',
      },
    ],
    useCases: [
      'Passive wireless reconnaissance to map all APs and clients in an area without transmitting',
      'Wardiving surveys to document wireless exposure across a geographic area',
      'Detect rogue access points and deauthentication attacks on a protected network',
      'Capture complete 802.11 frame sets for offline analysis in Wireshark',
    ],
    difficulty: 'Intermediate',
    tags: ['wireless', 'passive', 'reconnaissance', 'sniffer', '802.11', 'bluetooth', 'ids', 'wardriving', 'pcap'],
    relatedTools: ['airodump-ng', 'wireshark', 'wifite'],
  },
]
