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

export const toolsPart1: ToolData[] = [
  // ─────────────────────────────────────────────
  // INFORMATION GATHERING
  // ─────────────────────────────────────────────
  {
    name: 'Nmap',
    slug: 'nmap',
    category: 'Information Gathering',
    subcategory: 'Network Scanning',
    featured: true,
    difficulty: 'Beginner',
    description:
      'The industry-standard open-source network scanner used to discover hosts, services, and vulnerabilities across networks.',
    longDescription:
      'Nmap (Network Mapper) is the gold standard for network discovery and security auditing, trusted by security professionals and system administrators worldwide since 1997. It uses raw IP packets to determine which hosts are available on the network, what services those hosts are offering, what operating systems they are running, and dozens of other characteristics. Nmap ships with a powerful scripting engine (NSE) that enables users to write and share scripts to automate a wide variety of networking tasks, from vulnerability detection to backdoor discovery.',
    commands: [
      {
        title: 'Basic TCP Connect Scan',
        syntax: 'nmap <target>',
        description:
          'Performs a basic TCP connect scan against the most common 1000 ports on the target host.',
        example: 'nmap 192.168.1.1',
      },
      {
        title: 'SYN Stealth Scan',
        syntax: 'nmap -sS <target>',
        description:
          'Sends SYN packets without completing the TCP handshake, making it faster and less likely to be logged than a full connect scan. Requires root/administrator privileges.',
        example: 'nmap -sS 192.168.1.1',
        flags: [
          { flag: '-sS', description: 'TCP SYN (stealth) scan — never completes the handshake' },
        ],
      },
      {
        title: 'Service and Version Detection',
        syntax: 'nmap -sV <target>',
        description:
          'Probes open ports to determine the service and version information running on each port.',
        example: 'nmap -sV 192.168.1.1',
        flags: [
          { flag: '-sV', description: 'Probe open ports to determine service/version info' },
        ],
      },
      {
        title: 'OS Detection',
        syntax: 'nmap -O <target>',
        description:
          'Attempts to identify the operating system of the target by analyzing TCP/IP stack fingerprints. Requires root privileges.',
        example: 'nmap -O 192.168.1.1',
        flags: [
          { flag: '-O', description: 'Enable OS detection via TCP/IP stack fingerprinting' },
        ],
      },
      {
        title: 'Aggressive Scan',
        syntax: 'nmap -A -T4 <target>',
        description:
          'Enables OS detection, version detection, script scanning, and traceroute. -T4 speeds up the scan using a faster timing template.',
        example: 'nmap -A -T4 192.168.1.0/24',
        flags: [
          { flag: '-A', description: 'Aggressive scan: enables OS detection, version detection, script scanning, and traceroute' },
          { flag: '-T4', description: 'Timing template 4 (aggressive) — speeds up scan, suitable for fast networks' },
        ],
      },
      {
        title: 'Default Script Scan',
        syntax: 'nmap -sC <target>',
        description:
          'Runs the default set of NSE (Nmap Scripting Engine) scripts against the target, checking for common vulnerabilities and gathering extra information.',
        example: 'nmap -sC -sV 192.168.1.1',
        flags: [
          { flag: '-sC', description: 'Run default NSE scripts (equivalent to --script=default)' },
        ],
      },
      {
        title: 'Specific Port Scan',
        syntax: 'nmap -p <ports> <target>',
        description:
          'Scans only the specified port(s) or port range instead of the default 1000 ports.',
        example: 'nmap -p 22,80,443,3306,8080 192.168.1.1',
        flags: [
          { flag: '-p', description: 'Specify ports or port ranges to scan (e.g. -p 80, -p 1-1024, -p-)' },
          { flag: '-Pn', description: 'Skip host discovery (treat all hosts as online)' },
          { flag: '-oN', description: 'Output results in normal human-readable format to a file' },
          { flag: '-oX', description: 'Output results in XML format to a file' },
          { flag: '--script', description: 'Run specific NSE script(s) by name or category' },
        ],
      },
      {
        title: 'Ping / Host Discovery Scan',
        syntax: 'nmap -sn <target-range>',
        description:
          'Performs host discovery only (no port scan), identifying which hosts are alive on a network. The legacy flag -sP is equivalent.',
        example: 'nmap -sn 192.168.1.0/24',
        flags: [
          { flag: '-sn', description: 'Ping scan — disable port scan, only discover live hosts (replaces deprecated -sP)' },
        ],
      },
    ],
    useCases: [
      'Discover all live hosts and open ports on a local or remote network',
      'Identify running services and their software versions for patch management',
      'Detect the operating system of remote hosts during penetration tests',
      'Run NSE scripts to check for known CVEs and misconfigurations',
      'Generate XML or grepable output for ingestion into vulnerability management platforms',
    ],
    tags: ['network', 'scanning', 'enumeration', 'ports', 'recon'],
    relatedTools: ['masscan', 'netdiscover', 'arp-scan'],
  },

  {
    name: 'Masscan',
    slug: 'masscan',
    category: 'Information Gathering',
    subcategory: 'Network Scanning',
    difficulty: 'Beginner',
    description:
      'The fastest Internet-scale port scanner, capable of scanning the entire IPv4 address space in under 6 minutes.',
    longDescription:
      'Masscan is an asynchronous TCP port scanner that uses a custom TCP/IP stack to transmit packets at extremely high rates (up to 25 million packets per second). It is designed for large-scale Internet scanning tasks where Nmap would be too slow, and its output format is compatible with Nmap for further analysis.',
    commands: [
      {
        title: 'Fast Full Port Scan',
        syntax: 'masscan -p1-65535 <target> --rate=10000',
        description:
          'Scans all 65535 TCP ports on the target at 10,000 packets per second.',
        example: 'masscan -p1-65535 192.168.1.0/24 --rate=10000',
        flags: [
          { flag: '--rate', description: 'Set the transmit rate in packets per second' },
          { flag: '-p', description: 'Specify port(s) or range to scan' },
        ],
      },
      {
        title: 'Rate-Limited Scan',
        syntax: 'masscan -p80,443 <target> --rate=1000',
        description:
          'Scans specific ports with a conservative rate to avoid overwhelming the target or triggering IDS alerts.',
        example: 'masscan -p80,443 192.168.1.0/24 --rate=1000',
      },
      {
        title: 'Port Range Scan with Banner Grabbing',
        syntax: 'masscan -p22,80,443 <target> --banners',
        description:
          'Scans specified ports and attempts to grab banners from open services to identify software versions.',
        example: 'masscan -p22,80,443 192.168.1.1 --banners --source-ip 192.168.1.100',
        flags: [
          { flag: '--banners', description: 'Grab banners from open TCP services' },
          { flag: '--source-ip', description: 'Manually specify the source IP address for transmitted packets' },
        ],
      },
      {
        title: 'Scan and Save Output to File',
        syntax: 'masscan -p1-1024 <target> --rate=5000 -oL output.txt',
        description:
          'Scans the first 1024 ports and saves results in list format to a file.',
        example: 'masscan -p1-1024 192.168.1.0/24 --rate=5000 -oL masscan-results.txt',
        flags: [
          { flag: '-oL', description: 'Output results in list format to the specified file' },
        ],
      },
    ],
    useCases: [
      'Rapidly sweep large network ranges to identify live hosts and open ports',
      'Pre-scan phase before a targeted Nmap scan to narrow down interesting hosts',
      'Internet-wide research and scanning studies',
      'Time-sensitive penetration tests requiring fast port discovery',
    ],
    tags: ['network', 'scanning', 'ports', 'fast', 'recon'],
    relatedTools: ['nmap', 'zmap'],
  },

  {
    name: 'theHarvester',
    slug: 'theharvester',
    category: 'Information Gathering',
    subcategory: 'OSINT',
    difficulty: 'Beginner',
    description:
      'A passive OSINT tool for gathering emails, subdomains, hosts, employee names, open ports, and banners from public sources.',
    longDescription:
      'theHarvester is a simple yet powerful tool included in Kali Linux for early-stage penetration tests and red team engagements. It aggregates data from multiple public search engines and online databases — including Google, Bing, LinkedIn, Shodan, and many more — without directly touching the target infrastructure. The results are compiled into a structured report that can be exported to HTML or XML.',
    commands: [
      {
        title: 'Search via Google',
        syntax: 'theHarvester -d <domain> -b google -l 100',
        description:
          'Queries Google for up to 100 results related to the target domain, extracting emails and subdomains.',
        example: 'theHarvester -d target.com -b google -l 100',
        flags: [
          { flag: '-d', description: 'Target domain to search' },
          { flag: '-b', description: 'Data source (google, bing, linkedin, shodan, all, etc.)' },
          { flag: '-l', description: 'Limit the number of results to retrieve' },
        ],
      },
      {
        title: 'Search via Bing',
        syntax: 'theHarvester -d <domain> -b bing -l 200',
        description:
          'Uses Bing as the data source to discover emails and hosts associated with the target domain.',
        example: 'theHarvester -d target.com -b bing -l 200',
      },
      {
        title: 'LinkedIn Employee Enumeration',
        syntax: 'theHarvester -d <domain> -b linkedin',
        description:
          'Harvests employee names and associated data from LinkedIn for the specified company domain.',
        example: 'theHarvester -d target.com -b linkedin',
      },
      {
        title: 'Shodan-Assisted Discovery',
        syntax: 'theHarvester -d <domain> -b shodan',
        description:
          'Uses the Shodan search engine as a data source to find hosts and open ports (requires a Shodan API key configured).',
        example: 'theHarvester -d target.com -b shodan',
      },
      {
        title: 'All Sources with File Output',
        syntax: 'theHarvester -d <domain> -b all -l 500 -f results',
        description:
          'Runs theHarvester against all available data sources and saves results to an HTML and XML report.',
        example: 'theHarvester -d target.com -b all -l 500 -f target-harvest',
        flags: [
          { flag: '-f', description: 'Filename prefix for the HTML and XML output reports (no extension needed)' },
        ],
      },
    ],
    useCases: [
      'Email harvesting for phishing simulation campaigns',
      'Subdomain and hostname discovery during the reconnaissance phase',
      'Employee name enumeration via LinkedIn for social engineering assessments',
      'Identifying internet-exposed infrastructure using Shodan integration',
      'Building a target profile before active scanning begins',
    ],
    tags: ['osint', 'email', 'subdomains', 'recon', 'passive'],
    relatedTools: ['recon-ng', 'maltego', 'amass'],
  },

  {
    name: 'Recon-ng',
    slug: 'recon-ng',
    category: 'Information Gathering',
    subcategory: 'OSINT',
    difficulty: 'Intermediate',
    description:
      'A full-featured web reconnaissance framework with a modular design similar to Metasploit, built for open-source intelligence gathering.',
    longDescription:
      'Recon-ng provides a powerful environment in which open-source web-based reconnaissance can be conducted quickly and thoroughly. The framework is modular, with a marketplace of modules that can be installed on demand. Each module is dedicated to a specific data-gathering task — ranging from DNS enumeration and WHOIS lookups to harvesting data from social networks and breach databases. Results are stored in a local SQLite workspace database, making it easy to track and correlate data across multiple recon sessions.',
    commands: [
      {
        title: 'Install a Module from the Marketplace',
        syntax: 'marketplace install <module-path>',
        description:
          'Installs a specific module from the recon-ng module marketplace into the local framework.',
        example: 'marketplace install recon/domains-hosts/hackertarget',
      },
      {
        title: 'Load and Use a Module',
        syntax: 'modules load <module-path>',
        description:
          'Loads a previously installed module into the active session, ready for configuration.',
        example: 'modules load recon/domains-hosts/hackertarget',
      },
      {
        title: 'Set the Target Source',
        syntax: 'options set SOURCE <domain>',
        description:
          'Sets the SOURCE option (target domain or value) for the currently loaded module.',
        example: 'options set SOURCE target.com',
      },
      {
        title: 'Run the Loaded Module',
        syntax: 'run',
        description:
          'Executes the currently loaded and configured module, storing discovered data in the workspace database.',
        example: 'run',
      },
      {
        title: 'Show Discovered Hosts',
        syntax: 'show hosts',
        description:
          'Displays all hosts discovered and stored in the current recon-ng workspace database.',
        example: 'show hosts',
      },
    ],
    useCases: [
      'Automated multi-source OSINT collection for penetration test reporting',
      'Subdomain and host enumeration using public APIs',
      'Building a structured intelligence database for a target organization',
      'Correlating data from DNS, WHOIS, and social media sources',
      'Chaining modules to progressively expand attack surface knowledge',
    ],
    tags: ['osint', 'recon', 'framework', 'modular', 'dns', 'subdomains'],
    relatedTools: ['theHarvester', 'maltego', 'amass'],
  },

  {
    name: 'Maltego',
    slug: 'maltego',
    category: 'Information Gathering',
    subcategory: 'OSINT',
    difficulty: 'Intermediate',
    description:
      'A visual link analysis and OSINT platform that maps relationships between people, companies, domains, IPs, and other entities using automated transforms.',
    longDescription:
      'Maltego is a graphical intelligence-gathering tool that visually represents the connections between pieces of open-source data. It works through "transforms" — automated queries that take one piece of information (an entity) and return related data from external sources like DNS registries, social networks, WHOIS databases, and threat intelligence feeds. The Community Edition (CE) is free with usage limits, while the commercial version offers unlimited transforms and additional data sources. Maltego is particularly useful for visually mapping out an organization\'s attack surface or tracing relationships between threat actors.',
    commands: [
      {
        title: 'Launch Maltego CE',
        syntax: 'maltego',
        description:
          'Opens the Maltego GUI. On first launch, you must register for a free Community Edition account to use public transforms.',
        example: 'maltego',
      },
      {
        title: 'Run DNS to IP Transform',
        syntax: 'GUI: Right-click domain entity -> Run Transform -> DNS to IP Address',
        description:
          'Resolves a domain entity to its associated IP addresses using the built-in DNS transform.',
        example: 'Entity: target.com -> Transform: Resolve to IP -> Result: 93.184.216.34',
      },
      {
        title: 'Person to Email Transform',
        syntax: 'GUI: Right-click Person entity -> Run Transform -> To Email Address [PiplAPI]',
        description:
          'Attempts to find email addresses associated with a named person using people-search data sources.',
        example: 'Entity: John Smith -> Transform: To Email Address -> Result: john.smith@target.com',
      },
    ],
    useCases: [
      'Visually map the infrastructure relationships of a target organization',
      'Trace relationships between domain names, IPs, email addresses, and persons',
      'Identify all subdomains and hosting providers associated with a company',
      'Conduct social network analysis to find connections between individuals',
      'Build a comprehensive OSINT graph for red team planning or threat intelligence',
    ],
    tags: ['osint', 'visualization', 'graph', 'recon', 'transforms', 'gui'],
    relatedTools: ['recon-ng', 'theHarvester'],
  },

  {
    name: 'DMitry',
    slug: 'dmitry',
    category: 'Information Gathering',
    subcategory: 'OSINT',
    difficulty: 'Beginner',
    description:
      'A UNIX/Linux command-line application for gathering as much information as possible about a host, including WHOIS, subdomains, email addresses, and open ports.',
    longDescription:
      'DMitry (Deepmagic Information Gathering Tool) is a simple information gathering tool that consolidates multiple reconnaissance tasks into a single command. It can perform WHOIS lookups for both domains and IPs, search for subdomains using Google, harvest email addresses, and run a basic TCP port scan. While not as feature-rich as modern tools, it is a quick all-in-one option for preliminary target reconnaissance.',
    commands: [
      {
        title: 'WHOIS Lookup',
        syntax: 'dmitry -w <target>',
        description:
          'Performs a WHOIS lookup on the target domain to retrieve registration information.',
        example: 'dmitry -w target.com',
        flags: [
          { flag: '-w', description: 'Perform a WHOIS lookup on the target domain' },
          { flag: '-n', description: 'Retrieve Netcraft.com information on the host' },
          { flag: '-s', description: 'Search for possible subdomains' },
          { flag: '-e', description: 'Search for possible email addresses' },
          { flag: '-p', description: 'Perform a TCP port scan on the target' },
          { flag: '-o', description: 'Save output to a file (default: dmitry.txt)' },
        ],
      },
      {
        title: 'Subdomain Search',
        syntax: 'dmitry -s <target>',
        description:
          'Searches for subdomains of the target domain using various publicly available sources.',
        example: 'dmitry -s target.com',
      },
      {
        title: 'Email Address Search',
        syntax: 'dmitry -e <target>',
        description:
          'Attempts to enumerate email addresses associated with the target domain.',
        example: 'dmitry -e target.com',
      },
      {
        title: 'Full Reconnaissance with Port Scan',
        syntax: 'dmitry -winsepfb <target> -o output.txt',
        description:
          'Runs all available modules: WHOIS, Netcraft, subdomains, emails, port scan, filtered/open ports, and banners. Saves the report to a text file.',
        example: 'dmitry -winsepfb target.com -o dmitry-report.txt',
      },
    ],
    useCases: [
      'Quick all-in-one passive information gathering on a domain',
      'WHOIS and registration data collection for target profiling',
      'Basic subdomain and email enumeration without API keys',
      'Lightweight port scanning combined with OSINT in a single tool',
    ],
    tags: ['osint', 'whois', 'subdomains', 'email', 'recon'],
    relatedTools: ['whois', 'theHarvester', 'fierce'],
  },

  {
    name: 'DNSenum',
    slug: 'dnsenum',
    category: 'Information Gathering',
    subcategory: 'DNS Enumeration',
    difficulty: 'Beginner',
    description:
      'A multithreaded Perl script for enumerating DNS information about a domain, including zone transfers, subdomains, and MX/NS records.',
    longDescription:
      'DNSenum automates the process of gathering DNS information about a target domain. It queries for common record types (A, MX, NS, SOA), attempts zone transfers against all nameservers, brute-forces subdomains using a wordlist, and can perform reverse lookups on discovered IP ranges. Its multithreaded design makes subdomain brute-forcing significantly faster than sequential tools.',
    commands: [
      {
        title: 'Basic DNS Enumeration',
        syntax: 'dnsenum <domain>',
        description:
          'Performs standard DNS enumeration: retrieves MX, NS, A records, and attempts zone transfer.',
        example: 'dnsenum target.com',
        flags: [
          { flag: '--dnsserver', description: 'Use a specific DNS server for all queries' },
          { flag: '--enum', description: 'Shortcut equivalent to --threads 5 -s 15 -w' },
          { flag: '--threads', description: 'Number of threads to use for brute-force subdomain lookups' },
          { flag: '--file', description: 'Read subdomains from a wordlist file for brute forcing' },
          { flag: '-p', description: 'Number of Google search pages to scrape for subdomains' },
          { flag: '-s', description: 'Maximum number of subdomains to scrape from Google' },
        ],
      },
      {
        title: 'Subdomain Brute Force',
        syntax: 'dnsenum --file <wordlist> --threads 10 <domain>',
        description:
          'Brute-forces subdomains using a wordlist file with 10 concurrent threads.',
        example: 'dnsenum --file /usr/share/wordlists/dnsenum/dns.txt --threads 10 target.com',
      },
      {
        title: 'Zone Transfer Attempt',
        syntax: 'dnsenum --enum <domain>',
        description:
          'Performs a comprehensive enumeration including an attempted AXFR zone transfer against all discovered nameservers.',
        example: 'dnsenum --enum target.com',
      },
      {
        title: 'Custom DNS Server with Threaded Brute Force',
        syntax: 'dnsenum --dnsserver <ns> --threads 20 --file <wordlist> <domain>',
        description:
          'Directs all queries to a specific nameserver and runs a high-speed threaded subdomain brute force.',
        example: 'dnsenum --dnsserver 8.8.8.8 --threads 20 --file /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt target.com',
      },
    ],
    useCases: [
      'Discover all subdomains of a target domain using brute-force wordlists',
      'Attempt DNS zone transfers to dump the full DNS zone file',
      'Enumerate MX, NS, and A records for target infrastructure mapping',
      'Identify IP ranges associated with a target for further scanning',
    ],
    tags: ['dns', 'enumeration', 'subdomains', 'zone-transfer', 'recon'],
    relatedTools: ['dnsrecon', 'fierce', 'subfinder'],
  },

  {
    name: 'DNSrecon',
    slug: 'dnsrecon',
    category: 'Information Gathering',
    subcategory: 'DNS Enumeration',
    difficulty: 'Beginner',
    description:
      'A powerful Python-based DNS enumeration script supporting multiple record types, zone transfers, brute forcing, and reverse lookups.',
    longDescription:
      'DNSrecon is a Python script that provides the ability to perform various DNS enumeration checks. It supports standard record enumeration, zone transfer attempts, subdomain brute forcing with custom dictionaries, Google enumeration, reverse lookups on IP ranges, and cache snooping. Its clean output and support for multiple export formats (CSV, XML, JSON) make it a staple in penetration testing workflows.',
    commands: [
      {
        title: 'Standard DNS Enumeration',
        syntax: 'dnsrecon -d <domain> -t std',
        description:
          'Performs standard enumeration: SOA, NS, A, AAAA, MX, and SRV record lookups.',
        example: 'dnsrecon -d target.com -t std',
        flags: [
          { flag: '-d', description: 'Target domain name' },
          { flag: '-t', description: 'Enumeration type (std, axfr, brt, rvl, goo, etc.)' },
          { flag: '-D', description: 'Dictionary file for brute-force subdomain enumeration' },
          { flag: '-r', description: 'IP range for reverse DNS lookup (e.g. 192.168.1.0/24)' },
          { flag: '-n', description: 'Specify a specific nameserver to use' },
        ],
      },
      {
        title: 'Zone Transfer Attempt',
        syntax: 'dnsrecon -d <domain> -t axfr',
        description:
          'Attempts an AXFR (full zone transfer) against all of the domain\'s nameservers.',
        example: 'dnsrecon -d target.com -t axfr',
      },
      {
        title: 'Subdomain Brute Force',
        syntax: 'dnsrecon -d <domain> -t brt -D <wordlist>',
        description:
          'Brute-forces subdomains using a provided dictionary file.',
        example: 'dnsrecon -d target.com -t brt -D /usr/share/wordlists/dnsmap.txt',
      },
      {
        title: 'Reverse DNS Lookup on IP Range',
        syntax: 'dnsrecon -r <CIDR> -n <nameserver>',
        description:
          'Performs reverse PTR lookups on every IP in the specified CIDR range using the given nameserver.',
        example: 'dnsrecon -r 192.168.1.0/24 -n 192.168.1.1',
      },
    ],
    useCases: [
      'Perform comprehensive DNS enumeration during reconnaissance',
      'Attempt DNS zone transfers to extract full DNS zone data',
      'Brute-force subdomains with custom or standard wordlists',
      'Reverse DNS mapping of IP ranges to identify hostnames',
    ],
    tags: ['dns', 'enumeration', 'subdomains', 'zone-transfer', 'recon'],
    relatedTools: ['dnsenum', 'fierce', 'amass'],
  },

  {
    name: 'Fierce',
    slug: 'fierce',
    category: 'Information Gathering',
    subcategory: 'DNS Enumeration',
    difficulty: 'Beginner',
    description:
      'A DNS reconnaissance tool focused on locating non-contiguous IP space and hostnames that are mapped to a target domain.',
    longDescription:
      'Fierce is a semi-lightweight scanner that helps locate non-contiguous IP space and hostnames against specified domains. The modern Python 3 version (available via pip) has a cleaner interface than the legacy Perl version and supports wordlist-based subdomain brute forcing, custom DNS server selection, and configurable connection timeouts. It is particularly useful for discovering internal-facing hosts that have been accidentally exposed in public DNS.',
    commands: [
      {
        title: 'Basic Domain Scan',
        syntax: 'fierce --domain <domain>',
        description:
          'Performs a basic DNS reconnaissance scan against the target domain, attempting zone transfers and common subdomain lookups.',
        example: 'fierce --domain target.com',
        flags: [
          { flag: '--domain', description: 'Target domain to scan' },
          { flag: '--wordlist', description: 'Path to a wordlist file for subdomain brute forcing' },
          { flag: '--dns-servers', description: 'Specify custom DNS server(s) to use for resolution' },
          { flag: '--connect', description: 'Attempt TCP connections to discovered hosts on common ports' },
          { flag: '--subdomains', description: 'Specify a list of subdomains to check instead of a wordlist' },
        ],
      },
      {
        title: 'DNS Brute Force with Wordlist',
        syntax: 'fierce --domain <domain> --wordlist <wordlist>',
        description:
          'Brute-forces subdomains of the target domain using the provided wordlist file.',
        example: 'fierce --domain target.com --wordlist /usr/share/seclists/Discovery/DNS/fierce-hostlist.txt',
      },
      {
        title: 'Scan with Custom DNS Server and Connect Check',
        syntax: 'fierce --domain <domain> --dns-servers <dns-ip> --connect',
        description:
          'Runs the domain scan using a custom DNS resolver and attempts TCP connection to discovered hosts to verify they are accessible.',
        example: 'fierce --domain target.com --dns-servers 8.8.8.8 --connect',
      },
    ],
    useCases: [
      'Discover subdomains that may reveal internal infrastructure',
      'Locate non-contiguous IP blocks associated with an organization',
      'Verify subdomain accessibility by attempting TCP connections',
      'Supplement DNSenum and dnsrecon for comprehensive DNS coverage',
    ],
    tags: ['dns', 'subdomains', 'brute-force', 'recon', 'enumeration'],
    relatedTools: ['dnsenum', 'dnsrecon', 'subfinder'],
  },

  {
    name: 'Whois',
    slug: 'whois',
    category: 'Information Gathering',
    subcategory: 'OSINT',
    difficulty: 'Beginner',
    description:
      'A command-line client for querying WHOIS databases to retrieve domain registration and IP ownership information.',
    longDescription:
      'The whois utility queries WHOIS protocol servers to retrieve registration records for domain names and IP addresses. This information typically includes the registrant name and contact details, registration and expiry dates, name servers, and the registrar. For IP addresses, WHOIS returns the registered owner (often an ISP or organization), the allocated IP range, and abuse contact information. It is a foundational tool in any reconnaissance workflow.',
    commands: [
      {
        title: 'Domain WHOIS Lookup',
        syntax: 'whois <domain>',
        description:
          'Queries the appropriate WHOIS server for registration information about the target domain.',
        example: 'whois target.com',
      },
      {
        title: 'IP Address WHOIS Lookup',
        syntax: 'whois <ip-address>',
        description:
          'Queries the regional Internet registry (ARIN, RIPE, APNIC, etc.) for ownership and contact information for the given IP address.',
        example: 'whois 192.168.1.1',
      },
      {
        title: 'Query a Specific WHOIS Server',
        syntax: 'whois -h <whois-server> <target>',
        description:
          'Directs the WHOIS query to a specific server, useful when the automatic server selection is incorrect.',
        example: 'whois -h whois.arin.net 8.8.8.8',
      },
    ],
    useCases: [
      'Retrieve domain registrant and registrar information for target profiling',
      'Identify the organization and contact details behind an IP address',
      'Determine domain registration and expiry dates',
      'Find abuse contact information for reporting or social engineering research',
    ],
    tags: ['whois', 'osint', 'domain', 'ip', 'recon', 'passive'],
    relatedTools: ['dmitry', 'theHarvester'],
  },

  {
    name: 'Subfinder',
    slug: 'subfinder',
    category: 'Information Gathering',
    subcategory: 'DNS Enumeration',
    difficulty: 'Beginner',
    description:
      'A fast passive subdomain discovery tool that uses multiple data sources including certificate transparency logs, APIs, and search engines.',
    longDescription:
      'Subfinder is a subdomain discovery tool developed by ProjectDiscovery that passively enumerates valid subdomains using a large number of passive online sources. These include certificate transparency logs (crt.sh), threat intelligence platforms (VirusTotal, Shodan), DNS aggregators, and many public APIs. Because it operates passively, it does not send any traffic to the target\'s infrastructure. It integrates seamlessly with other ProjectDiscovery tools like Nuclei and httpx.',
    installCommand: 'go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest',
    commands: [
      {
        title: 'Basic Subdomain Enumeration',
        syntax: 'subfinder -d <domain>',
        description:
          'Runs a passive subdomain discovery against the target domain using all configured sources.',
        example: 'subfinder -d target.com',
        flags: [
          { flag: '-d', description: 'Target domain for subdomain discovery' },
          { flag: '-all', description: 'Use all available enumeration sources (slower but more thorough)' },
          { flag: '-o', description: 'Write discovered subdomains to the specified output file' },
          { flag: '-silent', description: 'Suppress all output except discovered subdomains (useful for piping)' },
        ],
      },
      {
        title: 'Enumerate Using All Sources',
        syntax: 'subfinder -d <domain> -all',
        description:
          'Queries every available passive data source, including those requiring API keys, for maximum coverage.',
        example: 'subfinder -d target.com -all',
      },
      {
        title: 'Save Output to File',
        syntax: 'subfinder -d <domain> -o <output-file>',
        description:
          'Writes all discovered subdomains to a specified output file, one per line.',
        example: 'subfinder -d target.com -o subdomains.txt',
      },
      {
        title: 'Silent Mode for Pipeline Use',
        syntax: 'subfinder -d <domain> -silent | httpx -title -status-code',
        description:
          'Runs in silent mode, printing only discovered subdomains to stdout, suitable for piping into tools like httpx.',
        example: 'subfinder -d target.com -silent | httpx -title -status-code',
      },
    ],
    useCases: [
      'Passive subdomain enumeration without alerting the target',
      'Building a comprehensive list of subdomains for further testing',
      'Integrating into automated recon pipelines with other ProjectDiscovery tools',
      'Certificate transparency log mining for subdomain discovery',
    ],
    tags: ['subdomains', 'passive', 'dns', 'recon', 'osint', 'enumeration'],
    relatedTools: ['amass', 'dnsenum', 'assetfinder'],
  },

  {
    name: 'Amass',
    slug: 'amass',
    category: 'Information Gathering',
    subcategory: 'DNS Enumeration',
    difficulty: 'Intermediate',
    description:
      'A comprehensive attack surface mapping tool from OWASP for in-depth DNS enumeration, subdomain discovery, and network mapping.',
    longDescription:
      'OWASP Amass performs network mapping of attack surfaces and external asset discovery using open-source information gathering and active reconnaissance techniques. It supports passive enumeration from over 50 data sources, active DNS brute-forcing, certificate transparency log searches, web scraping, and reverse WHOIS. The intel subcommand can discover root domains associated with an organization, while the viz subcommand generates visual graphs of discovered relationships. Amass stores results in a local database for tracking changes over time.',
    commands: [
      {
        title: 'Passive Subdomain Enumeration',
        syntax: 'amass enum -passive -d <domain> -o <output>',
        description:
          'Collects subdomains purely from passive data sources without sending any queries to the target\'s name servers.',
        example: 'amass enum -passive -d target.com -o amass-passive.txt',
        flags: [
          { flag: '-passive', description: 'Use only passive data sources, no direct DNS queries to the target' },
          { flag: '-active', description: 'Include active DNS resolution and zone transfer attempts' },
          { flag: '-d', description: 'Target domain (can be specified multiple times)' },
          { flag: '-o', description: 'Output discovered names and sources to a text file' },
          { flag: '-ip', description: 'Show IP addresses in the results' },
          { flag: '-brute', description: 'Enable brute-force subdomain enumeration' },
          { flag: '-src', description: 'Print the data source for each discovered name' },
        ],
      },
      {
        title: 'Active Subdomain Enumeration',
        syntax: 'amass enum -active -d <domain> -ip',
        description:
          'Performs active DNS resolution, zone transfer attempts, and certificate scraping for thorough subdomain discovery.',
        example: 'amass enum -active -d target.com -ip',
      },
      {
        title: 'Intel: Organization WHOIS Pivot',
        syntax: 'amass intel -whois -d <domain>',
        description:
          'Uses reverse WHOIS to discover other root domains registered by the same organization as the target.',
        example: 'amass intel -whois -d target.com',
      },
      {
        title: 'Database Summary',
        syntax: 'amass db -summary',
        description:
          'Displays a summary of all data stored in the local Amass database for all enumeration sessions.',
        example: 'amass db -summary',
      },
    ],
    useCases: [
      'Comprehensive attack surface mapping for large organizations',
      'Discovering all subdomains and associated IP addresses of a target',
      'Reverse WHOIS pivoting to find all domains owned by an organization',
      'Tracking changes in an organization\'s external attack surface over time',
    ],
    tags: ['subdomains', 'dns', 'attack-surface', 'osint', 'recon', 'owasp'],
    relatedTools: ['subfinder', 'dnsenum', 'recon-ng'],
  },

  {
    name: 'Netdiscover',
    slug: 'netdiscover',
    category: 'Information Gathering',
    subcategory: 'Network Scanning',
    difficulty: 'Beginner',
    description:
      'An active/passive ARP reconnaissance tool for discovering live hosts on a local network segment.',
    longDescription:
      'Netdiscover is an ARP-based host discovery tool designed for wireless and switched networks where ICMP-based ping sweeps may be blocked. In active mode it sends ARP requests to discover live hosts; in passive mode it silently listens to ARP broadcast traffic to build a host table without transmitting any packets. It displays the IP address, MAC address, and vendor (OUI lookup) for each discovered host.',
    commands: [
      {
        title: 'Passive Host Discovery',
        syntax: 'netdiscover -p',
        description:
          'Runs in passive mode, silently capturing ARP traffic to discover hosts without sending any packets.',
        example: 'netdiscover -p',
        flags: [
          { flag: '-r', description: 'Scan a specific IP range (e.g. 192.168.1.0/24)' },
          { flag: '-i', description: 'Specify the network interface to use' },
          { flag: '-p', description: 'Enable passive mode — listen only, do not send ARP requests' },
          { flag: '-l', description: 'Read a list of IP ranges from a file' },
        ],
      },
      {
        title: 'Active Network Scan',
        syntax: 'netdiscover -i <interface>',
        description:
          'Actively sends ARP requests on the specified interface to discover all live hosts on the connected network.',
        example: 'netdiscover -i eth0',
      },
      {
        title: 'Specific Range Scan',
        syntax: 'netdiscover -r <CIDR> -i <interface>',
        description:
          'Performs an active ARP scan on the specified IP range using the given network interface.',
        example: 'netdiscover -r 192.168.1.0/24 -i eth0',
      },
    ],
    useCases: [
      'Discover live hosts on a local network segment during a pentest',
      'Identify hosts on wireless networks where ICMP is filtered',
      'Map MAC addresses to IP addresses for asset inventory',
      'Passively monitor ARP traffic to learn the network topology',
    ],
    tags: ['arp', 'network', 'host-discovery', 'recon', 'local-network'],
    relatedTools: ['nmap', 'arp-scan', 'masscan'],
  },

  {
    name: 'ARP-Scan',
    slug: 'arp-scan',
    category: 'Information Gathering',
    subcategory: 'Network Scanning',
    difficulty: 'Beginner',
    description:
      'A fast and accurate ARP-based host discovery tool for identifying all active devices on a local network.',
    longDescription:
      'arp-scan sends ARP requests to specified targets and displays the IP address, MAC address, and hardware vendor for each responding host. Because ARP operates at Layer 2 and cannot be filtered by host-based firewalls, arp-scan can discover hosts that would be invisible to ICMP ping sweeps. It is extremely fast on local segments and handles duplicate address detection and stale ARP cache entries gracefully.',
    commands: [
      {
        title: 'Scan Local Network',
        syntax: 'arp-scan --localnet',
        description:
          'Automatically determines the local network range based on the active interface and scans all IPs in that range.',
        example: 'arp-scan --localnet',
      },
      {
        title: 'Scan Specific Range with Interface',
        syntax: 'arp-scan -I <interface> <CIDR>',
        description:
          'Sends ARP probes over the specified interface to every IP address in the given CIDR range.',
        example: 'arp-scan -I eth0 192.168.1.0/24',
      },
      {
        title: 'Scan Single Target',
        syntax: 'arp-scan <target-ip>',
        description:
          'Sends an ARP request to a single IP address to confirm whether it is live and retrieve its MAC address.',
        example: 'arp-scan 192.168.1.1',
      },
    ],
    useCases: [
      'Quickly enumerate all active hosts on a local network segment',
      'Identify network devices by MAC address vendor (OUI lookup)',
      'Detect rogue or unauthorized devices on a network',
      'Complement nmap for reliable Layer 2 host discovery',
    ],
    tags: ['arp', 'network', 'host-discovery', 'layer2', 'recon'],
    relatedTools: ['netdiscover', 'nmap'],
  },

  {
    name: 'Shodan CLI',
    slug: 'shodan',
    category: 'Information Gathering',
    subcategory: 'OSINT',
    difficulty: 'Intermediate',
    description:
      'The command-line interface for Shodan, the search engine for Internet-connected devices, servers, and industrial systems.',
    longDescription:
      'Shodan is the world\'s first search engine for Internet-connected devices — from web servers and routers to industrial control systems and IoT devices. The Shodan CLI allows penetration testers and researchers to query the Shodan database from the terminal, retrieving detailed banner data, open ports, software versions, geolocation, and known vulnerabilities (CVEs) for any Internet-facing host. A free API key provides limited queries; paid plans enable comprehensive access.',
    installCommand: 'pip3 install shodan',
    commands: [
      {
        title: 'Initialize API Key',
        syntax: 'shodan init <API_KEY>',
        description:
          'Configures the Shodan CLI with your personal API key for authenticated queries.',
        example: 'shodan init aBcDeFgHiJkLmNoPqRsTuVwXyZ123456',
      },
      {
        title: 'Search for Hosts',
        syntax: 'shodan search "<query>"',
        description:
          'Searches the Shodan database using a query string and returns matching hosts with their banner data.',
        example: 'shodan search "apache country:US port:8080"',
      },
      {
        title: 'Get Host Information',
        syntax: 'shodan host <ip-address>',
        description:
          'Retrieves all information Shodan has indexed for a specific IP address, including open ports, services, and CVEs.',
        example: 'shodan host 192.168.1.1',
      },
    ],
    useCases: [
      'Identify Internet-facing services belonging to a target organization',
      'Discover misconfigured or vulnerable devices exposed to the Internet',
      'Research the attack surface of a target without sending any traffic',
      'Find default-credential devices (routers, cameras, industrial systems)',
    ],
    tags: ['osint', 'iot', 'internet-scanning', 'recon', 'passive', 'api'],
    relatedTools: ['theHarvester', 'recon-ng', 'censys'],
  },

  // ─────────────────────────────────────────────
  // VULNERABILITY ANALYSIS
  // ─────────────────────────────────────────────
  {
    name: 'Nikto',
    slug: 'nikto',
    category: 'Vulnerability Analysis',
    subcategory: 'Web Application Scanning',
    featured: true,
    difficulty: 'Beginner',
    description:
      'An open-source web server scanner that performs comprehensive tests against web servers for dangerous files, outdated software, and misconfigurations.',
    longDescription:
      'Nikto is a classic web server vulnerability scanner that checks for over 6,700 potentially dangerous files and programs, outdated server versions, and version-specific problems. It also checks for server configuration issues like multiple index files and HTTP server options. Nikto is not designed to be a stealthy tool — its scans are detectable — but it is invaluable for quickly identifying low-hanging fruit on web servers during a vulnerability assessment.',
    commands: [
      {
        title: 'Basic Web Server Scan',
        syntax: 'nikto -h <host>',
        description:
          'Scans the target web server on the default HTTP port (80) for known vulnerabilities and misconfigurations.',
        example: 'nikto -h 192.168.1.10',
        flags: [
          { flag: '-h', description: 'Target hostname or IP address (required)' },
          { flag: '-p', description: 'Specify target port(s), comma-separated or range (default: 80)' },
          { flag: '-ssl', description: 'Force SSL/HTTPS mode for the scan' },
          { flag: '-o', description: 'Write output to a file (format inferred from extension)' },
          { flag: '-Format', description: 'Specify output format: csv, html, msf+, nbe, txt, xml' },
          { flag: '-Plugins', description: 'Specify which plugins to run (default: ALL)' },
          { flag: '-Tuning', description: 'Tune scan type using codes: 1=interesting, 2=misconfiguration, 4=injection, etc.' },
          { flag: '-update', description: 'Update the plugin and database files to the latest versions' },
          { flag: '-useproxy', description: 'Use the HTTP proxy defined in nikto.conf for all requests' },
        ],
      },
      {
        title: 'Scan on Non-Standard Port',
        syntax: 'nikto -h <host> -p <port>',
        description:
          'Scans the web server running on a non-standard port.',
        example: 'nikto -h 192.168.1.10 -p 8080',
      },
      {
        title: 'SSL/HTTPS Scan',
        syntax: 'nikto -h <host> -ssl',
        description:
          'Forces the scanner to use HTTPS/SSL when connecting to the target web server.',
        example: 'nikto -h 192.168.1.10 -ssl -p 443',
      },
      {
        title: 'Scan and Save HTML Report',
        syntax: 'nikto -h <host> -o <output-file> -Format html',
        description:
          'Scans the target and saves a formatted HTML report of all findings.',
        example: 'nikto -h 192.168.1.10 -o nikto-report.html -Format html',
      },
      {
        title: 'Tuned Scan for Injection Vulnerabilities',
        syntax: 'nikto -h <host> -Tuning 4',
        description:
          'Runs only injection-related tests (XSS, SQL injection, etc.) using the Tuning parameter.',
        example: 'nikto -h 192.168.1.10 -Tuning 4',
      },
      {
        title: 'Update Nikto Database',
        syntax: 'nikto -update',
        description:
          'Downloads the latest plugin and vulnerability database updates from the Nikto project.',
        example: 'nikto -update',
      },
    ],
    useCases: [
      'Rapid identification of web server vulnerabilities and misconfigurations',
      'Check for dangerous default files (phpinfo.php, test.cgi, etc.)',
      'Verify HTTP headers and server security configurations',
      'Identify outdated web server software with known CVEs',
      'Generate vulnerability reports for web server assessments',
    ],
    tags: ['web', 'scanning', 'vulnerability', 'http', 'cms', 'misconfiguration'],
    relatedTools: ['wpscan', 'nuclei', 'burpsuite'],
  },

  {
    name: 'WPScan',
    slug: 'wpscan',
    category: 'Vulnerability Analysis',
    subcategory: 'CMS Scanning',
    difficulty: 'Beginner',
    description:
      'A black-box WordPress vulnerability scanner that enumerates users, plugins, themes, and checks for known CVEs in WordPress installations.',
    longDescription:
      'WPScan is the de facto standard tool for WordPress security testing. It fingerprints the WordPress version, enumerates installed plugins and themes (including hidden ones), discovers registered usernames, and cross-references findings against the WPScan Vulnerability Database (WPVDB) to identify known CVEs. A free API token provides up to 75 daily API requests for vulnerability data lookup, while commercial plans offer more. WPScan is written in Ruby and maintained by the WPScan team.',
    commands: [
      {
        title: 'Enumerate WordPress Users',
        syntax: 'wpscan --url <url> -e u',
        description:
          'Enumerates registered WordPress usernames, which can be used for password brute-force attacks.',
        example: 'wpscan --url http://192.168.1.10 -e u',
        flags: [
          { flag: '--url', description: 'Target WordPress installation URL (required)' },
          { flag: '-e', description: 'Enumeration mode: u (users), p (plugins), t (themes), ap (all plugins), at (all themes)' },
          { flag: '--api-token', description: 'WPScan API token for vulnerability data lookup (from wpscan.com)' },
          { flag: '--passwords', description: 'Path to a wordlist for password brute forcing' },
          { flag: '--usernames', description: 'Specific username(s) to target for brute-force' },
          { flag: '--force', description: 'Do not check if the target is running WordPress' },
          { flag: '--random-user-agent', description: 'Use a random User-Agent header for each request' },
        ],
      },
      {
        title: 'Enumerate Installed Plugins',
        syntax: 'wpscan --url <url> -e p --api-token <token>',
        description:
          'Enumerates all installed plugins and checks them against the WPScan vulnerability database for known CVEs.',
        example: 'wpscan --url http://192.168.1.10 -e p --api-token YOUR_TOKEN',
      },
      {
        title: 'Enumerate Installed Themes',
        syntax: 'wpscan --url <url> -e t',
        description:
          'Detects and enumerates active and inactive WordPress themes, including the version number.',
        example: 'wpscan --url http://192.168.1.10 -e t',
      },
      {
        title: 'Password Brute Force',
        syntax: 'wpscan --url <url> --passwords <wordlist> --usernames <username>',
        description:
          'Attempts to brute-force the WordPress login for a known username using a password wordlist.',
        example: 'wpscan --url http://192.168.1.10 --passwords /usr/share/wordlists/rockyou.txt --usernames admin',
      },
      {
        title: 'Full Enumeration Scan',
        syntax: 'wpscan --url <url> -e ap,at,u --api-token <token> --random-user-agent',
        description:
          'Comprehensive scan enumerating all plugins, all themes, and all users while rotating User-Agent headers to reduce fingerprint visibility.',
        example: 'wpscan --url http://192.168.1.10 -e ap,at,u --api-token YOUR_TOKEN --random-user-agent',
      },
    ],
    useCases: [
      'Identify vulnerable WordPress plugins and themes with known CVEs',
      'Enumerate WordPress usernames for credential attacks',
      'Assess WordPress core version against known vulnerabilities',
      'Brute-force weak WordPress admin passwords',
      'Audit WordPress installations for security hardening recommendations',
    ],
    tags: ['wordpress', 'cms', 'web', 'vulnerability', 'enumeration', 'brute-force'],
    relatedTools: ['nikto', 'joomscan', 'burpsuite'],
  },

  {
    name: 'Lynis',
    slug: 'lynis',
    category: 'Vulnerability Analysis',
    subcategory: 'Host Auditing',
    difficulty: 'Intermediate',
    description:
      'An open-source security auditing tool for Unix/Linux systems that performs in-depth system hardening assessments and compliance checks.',
    longDescription:
      'Lynis is a battle-tested security auditing tool for systems running Linux, macOS, or other Unix-based operating systems. It performs hundreds of individual security checks covering boot loader configuration, kernel hardening, user accounts and authentication, file system permissions, network settings, services and software, logging, and compliance with standards like CIS Benchmarks, PCI DSS, and HIPAA. Lynis runs locally on the host and produces a detailed report with a hardening index score and prioritized recommendations.',
    commands: [
      {
        title: 'Full System Audit',
        syntax: 'lynis audit system',
        description:
          'Runs a complete security audit of the local system, checking all applicable categories and generating a hardening report.',
        example: 'lynis audit system',
        flags: [
          { flag: '--pentest', description: 'Enable pentest mode — non-privileged scan simulating an attacker\'s perspective' },
          { flag: '--quick', description: 'Skip time-consuming tests for a faster audit' },
          { flag: '--report-file', description: 'Save the machine-readable report to a specific file path' },
          { flag: '--no-colors', description: 'Disable colored output (useful for logging to files)' },
          { flag: '--verbose', description: 'Show more detailed output during the audit' },
        ],
      },
      {
        title: 'Pentest Mode Audit',
        syntax: 'lynis audit system --pentest',
        description:
          'Runs the audit in pentest mode, which does not require root privileges and simulates the view of a non-privileged attacker on the system.',
        example: 'lynis audit system --pentest',
      },
      {
        title: 'Show Hardening Details',
        syntax: 'lynis show details <test-id>',
        description:
          'Displays detailed information and remediation guidance for a specific test identified by its ID.',
        example: 'lynis show details AUTH-9328',
      },
      {
        title: 'View Generated Report',
        syntax: 'cat /var/log/lynis-report.dat',
        description:
          'Reads the machine-readable report file generated by the last Lynis audit run.',
        example: 'cat /var/log/lynis-report.dat',
      },
    ],
    useCases: [
      'Perform security baseline audits on Linux servers and workstations',
      'Identify system misconfigurations and hardening opportunities',
      'Assess compliance with CIS Benchmarks, PCI DSS, or HIPAA requirements',
      'Run as a non-privileged user during pentest engagements for local privilege escalation insights',
    ],
    tags: ['linux', 'hardening', 'audit', 'compliance', 'system', 'configuration'],
    relatedTools: ['openvas', 'nessus'],
  },

  {
    name: 'Nuclei',
    slug: 'nuclei',
    category: 'Vulnerability Analysis',
    subcategory: 'Vulnerability Scanning',
    difficulty: 'Intermediate',
    description:
      'A fast, template-based vulnerability scanner from ProjectDiscovery that uses community-contributed YAML templates to detect thousands of security issues.',
    longDescription:
      'Nuclei is a modern, high-performance vulnerability scanner built around a flexible YAML-based templating system. Templates define the exact HTTP requests, matchers, and extractors used to detect a specific vulnerability, allowing the community to rapidly create and share detection logic for new CVEs and misconfigurations. Nuclei supports scanning web applications, networks, DNS, and more. It integrates seamlessly with other ProjectDiscovery tools (subfinder, httpx, naabu) for automated vulnerability discovery pipelines.',
    installCommand: 'go install -v github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest',
    commands: [
      {
        title: 'Scan with Specific Templates',
        syntax: 'nuclei -u <url> -t <template-path>',
        description:
          'Runs Nuclei against the target URL using templates from the specified directory or template file.',
        example: 'nuclei -u http://192.168.1.10 -t nuclei-templates/vulnerabilities/',
        flags: [
          { flag: '-t', description: 'Path to template file(s) or directory of templates to run' },
          { flag: '-l', description: 'File containing a list of target URLs/IPs to scan' },
          { flag: '-u', description: 'Single target URL to scan' },
          { flag: '-rate-limit', description: 'Maximum number of requests per second' },
          { flag: '-severity', description: 'Filter templates by severity: info, low, medium, high, critical' },
          { flag: '-o', description: 'Write output findings to a file' },
          { flag: '-silent', description: 'Display only found results, suppress informational output' },
          { flag: '-update-templates', description: 'Update the local Nuclei templates to the latest release' },
        ],
      },
      {
        title: 'Scan Multiple Targets from File',
        syntax: 'nuclei -l <targets-file> -t <template-path> -o <output>',
        description:
          'Reads a list of target URLs from a file and scans each one, writing findings to an output file.',
        example: 'nuclei -l targets.txt -t nuclei-templates/ -o nuclei-results.txt',
      },
      {
        title: 'Update Templates',
        syntax: 'nuclei -update-templates',
        description:
          'Downloads and updates the community Nuclei templates repository to ensure access to the latest detection signatures.',
        example: 'nuclei -update-templates',
      },
      {
        title: 'Scan with Severity Filter and Rate Limit',
        syntax: 'nuclei -u <url> -severity critical,high -rate-limit 100',
        description:
          'Scans only for critical and high severity issues while limiting the request rate to 100 per second.',
        example: 'nuclei -u http://192.168.1.10 -severity critical,high -rate-limit 100',
      },
    ],
    useCases: [
      'Automated vulnerability scanning across large numbers of web targets',
      'Rapid CVE detection using up-to-date community templates',
      'Integration into CI/CD pipelines for continuous security testing',
      'Detecting misconfigurations in cloud infrastructure and web applications',
    ],
    tags: ['vulnerability', 'scanning', 'templates', 'web', 'cve', 'automation'],
    relatedTools: ['nikto', 'wpscan', 'nessus'],
  },

  {
    name: 'OpenVAS',
    slug: 'openvas',
    category: 'Vulnerability Analysis',
    subcategory: 'Vulnerability Scanning',
    difficulty: 'Advanced',
    description:
      'A comprehensive open-source vulnerability assessment system (part of the Greenbone Vulnerability Management suite) with over 100,000 vulnerability tests.',
    longDescription:
      'OpenVAS (Open Vulnerability Assessment Scanner) is the scanning engine at the heart of the Greenbone Vulnerability Management (GVM) platform. It maintains a feed of over 100,000 Network Vulnerability Tests (NVTs) and performs deep, authenticated scans against network hosts to identify CVEs, misconfigurations, missing patches, and compliance violations. The GVM platform includes a web UI (Greenbone Security Assistant), a command-line client (gvm-cli), and a PostgreSQL-backed management layer. Initial setup requires running openvas-setup or gvm-setup to configure the services and download the initial NVT feed.',
    commands: [
      {
        title: 'Start GVM Services',
        syntax: 'gvm-start',
        description:
          'Starts all GVM/OpenVAS services including the OpenVAS scanner daemon, the GVM management daemon, and the Greenbone Security Assistant web interface.',
        example: 'gvm-start',
      },
      {
        title: 'Initial Setup and Feed Download',
        syntax: 'openvas-setup',
        description:
          'Performs the initial OpenVAS/GVM setup: creates the admin user, configures the database, and downloads the NVT, SCAP, and CERT vulnerability feeds.',
        example: 'openvas-setup',
      },
      {
        title: 'Create and Run a Scan via CLI',
        syntax: 'gvm-cli tls --hostname 127.0.0.1 --xml "<create_task><name>Scan</name><config id=\\"daba56c8-73ec-11df-a475-002264764cea\\"/><target id=\\"<target-id>\\"/></create_task>"',
        description:
          'Uses gvm-cli to create and configure a scan task via the GVM TLS API. The config ID shown corresponds to the "Full and fast" scan configuration.',
        example: 'gvm-cli tls --hostname 127.0.0.1 --xml "<get_tasks/>"',
      },
      {
        title: 'View Scan Reports',
        syntax: 'gvm-cli tls --hostname 127.0.0.1 --xml "<get_reports/>"',
        description:
          'Retrieves all available scan reports from the GVM management daemon in XML format.',
        example: 'gvm-cli tls --hostname 127.0.0.1 --xml "<get_reports/>"',
      },
    ],
    useCases: [
      'Comprehensive authenticated vulnerability scanning of network infrastructure',
      'Identifying missing patches and CVEs across Windows, Linux, and network devices',
      'Compliance scanning against PCI DSS, HIPAA, and other regulatory frameworks',
      'Generating executive and technical vulnerability reports for remediation tracking',
    ],
    tags: ['vulnerability', 'scanning', 'network', 'cve', 'compliance', 'enterprise'],
    relatedTools: ['nessus', 'nuclei', 'lynis'],
  },
]
