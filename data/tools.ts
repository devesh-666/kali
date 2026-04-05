import { toolsMobile } from './tools-mobile'
import { toolsLinux } from './tools-linux'
import { toolsPart1 } from './tools-part1'
import { toolsPart2 } from './tools-part2'
import { toolsPart3 } from './tools-part3'

export const toolsData = [...toolsMobile, ...toolsLinux, ...toolsPart1, ...toolsPart2, ...toolsPart3]

export const categories = [
  {
    name: 'Mobile Hacking',
    slug: 'mobile-hacking',
    description: 'Android penetration testing — ADB, Metasploit, Frida, APK analysis, and mobile payload delivery for security researchers.',
    icon: '📱',
    color: '#a855f7',
  },
  {
    name: 'Linux Basics',
    slug: 'linux-basics',
    description: 'Essential Linux commands every hacker must know — navigation, file management, permissions, and system control.',
    icon: 'Terminal',
    color: '#22c55e',
  },
  {
    name: 'Linux Text & File Processing',
    slug: 'linux-text-processing',
    description: 'Powerful text manipulation tools: grep, awk, sed, and more for processing data on the command line.',
    icon: 'FileText',
    color: '#06b6d4',
  },
  {
    name: 'Information Gathering',
    slug: 'information-gathering',
    description: 'Reconnaissance and OSINT tools for collecting target intelligence before an engagement.',
    icon: 'Search',
    color: '#3b82f6',
  },
  {
    name: 'Vulnerability Analysis',
    slug: 'vulnerability-analysis',
    description: 'Scanners and auditing tools to identify security weaknesses in systems and applications.',
    icon: 'Shield',
    color: '#f97316',
  },
  {
    name: 'Web Application Testing',
    slug: 'web-application-testing',
    description: 'Tools for testing web applications for OWASP Top 10 and other web vulnerabilities.',
    icon: 'Globe',
    color: '#a855f7',
  },
  {
    name: 'Password Attacks',
    slug: 'password-attacks',
    description: 'Password cracking, brute forcing, and credential testing tools.',
    icon: 'Lock',
    color: '#ef4444',
  },
  {
    name: 'Wireless Attacks',
    slug: 'wireless-attacks',
    description: 'WiFi and wireless network security testing and attack tools.',
    icon: 'Wifi',
    color: '#eab308',
  },
  {
    name: 'Exploitation Tools',
    slug: 'exploitation-tools',
    description: 'Exploit frameworks and tools for compromising vulnerable systems.',
    icon: 'Zap',
    color: '#dc2626',
  },
  {
    name: 'Sniffing & Spoofing',
    slug: 'sniffing-spoofing',
    description: 'Network traffic capture, analysis, and man-in-the-middle attack tools.',
    icon: 'Eye',
    color: '#06b6d4',
  },
  {
    name: 'Post Exploitation',
    slug: 'post-exploitation',
    description: 'Tools used after initial access for privilege escalation, persistence, and data extraction.',
    icon: 'Terminal',
    color: '#22c55e',
  },
  {
    name: 'Reverse Engineering',
    slug: 'reverse-engineering',
    description: 'Binary analysis, disassembly, and debugging tools for understanding compiled software.',
    icon: 'Code',
    color: '#6366f1',
  },
  {
    name: 'Forensics',
    slug: 'forensics',
    description: 'Digital forensics tools for evidence collection, memory analysis, and file recovery.',
    icon: 'Database',
    color: '#14b8a6',
  },
  {
    name: 'Social Engineering',
    slug: 'social-engineering',
    description: 'Phishing simulation and social engineering attack frameworks.',
    icon: 'Users',
    color: '#ec4899',
  },
  {
    name: 'Network Tools',
    slug: 'network-tools',
    description: 'Core network utilities for connectivity, tunneling, and traffic routing.',
    icon: 'Network',
    color: '#6b7280',
  },
]

export default toolsData
