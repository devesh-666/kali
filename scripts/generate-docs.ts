import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  BorderStyle,
  WidthType,
  PageBreak,
  Footer,
  PageNumber,
  Header,
  LevelFormat,
  convertInchesToTwip,
} from 'docx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FONT = 'Calibri'
const BODY_SIZE = 22       // 11pt in half-points
const H1_SIZE = 32         // 16pt
const H2_SIZE = 28         // 14pt
const H3_SIZE = 24         // 12pt

const tableBorder = {
  top: { style: BorderStyle.SINGLE, size: 4, color: '999999' },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: '999999' },
  left: { style: BorderStyle.SINGLE, size: 4, color: '999999' },
  right: { style: BorderStyle.SINGLE, size: 4, color: '999999' },
}

function body(text: string, bold = false): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: BODY_SIZE, bold })],
    spacing: { after: 120 },
  })
}

function h1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, font: FONT, size: H1_SIZE, bold: true, color: '1F3864' })],
  })
}

function h2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 160 },
    children: [new TextRun({ text, font: FONT, size: H2_SIZE, bold: true, color: '2E4A7A' })],
  })
}

function h3(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, font: FONT, size: H3_SIZE, bold: true, color: '375A8C' })],
  })
}

function bullet(text: string, level = 0): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, font: FONT, size: BODY_SIZE })],
    bullet: { level },
    spacing: { after: 80 },
  })
}

function pageBreak(): Paragraph {
  return new Paragraph({
    children: [new PageBreak()],
  })
}

function spacer(): Paragraph {
  return new Paragraph({ children: [], spacing: { after: 200 } })
}

function headerRow(cells: string[]): TableRow {
  return new TableRow({
    children: cells.map(
      (text) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text, font: FONT, size: BODY_SIZE, bold: true, color: 'FFFFFF' })],
              alignment: AlignmentType.CENTER,
            }),
          ],
          shading: { fill: '2E4A7A' },
          borders: tableBorder,
          margins: { top: 60, bottom: 60, left: 100, right: 100 },
        })
    ),
  })
}

function dataRow(cells: string[], shade = false): TableRow {
  return new TableRow({
    children: cells.map(
      (text) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text, font: FONT, size: BODY_SIZE })],
            }),
          ],
          shading: shade ? { fill: 'EEF2F8' } : undefined,
          borders: tableBorder,
          margins: { top: 40, bottom: 40, left: 100, right: 100 },
        })
    ),
  })
}

// ─── Document sections ────────────────────────────────────────────────────────

// Title page
const titlePage = [
  spacer(),
  spacer(),
  spacer(),
  new Paragraph({
    children: [
      new TextRun({ text: 'KALI LEARN', font: FONT, size: 64, bold: true, color: '1F3864' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'User & Admin Documentation',
        font: FONT,
        size: 36,
        bold: true,
        color: '2E4A7A',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'Comprehensive Guide to the Kali Linux Security Learning Platform',
        font: FONT,
        size: BODY_SIZE,
        italics: true,
        color: '555555',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Author: Devesh (Admin)', font: FONT, size: BODY_SIZE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Version: 1.0.0', font: FONT, size: BODY_SIZE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'April 2026', font: FONT, size: BODY_SIZE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  pageBreak(),
]

// Section 1: Introduction
const section1 = [
  h1('1. Introduction'),
  h2('What is Kali Learn?'),
  body(
    'Kali Learn is a private, self-hosted security learning platform designed exclusively for authorized users. ' +
    'It provides a structured reference for Kali Linux tools, commands, and penetration testing techniques ' +
    'in an easy-to-navigate web interface.'
  ),
  h2('Purpose'),
  body(
    'The platform serves as a comprehensive reference for Kali Linux tools, commands, and security testing techniques. ' +
    'It is intended to accelerate learning and provide quick access to command syntax, usage examples, and best practices ' +
    'for the 10 authorized members of the group.'
  ),
  h2('Who It\'s For'),
  body('Kali Learn is restricted to 10 authorized users:'),
  bullet('Devesh — Administrator (full access, including admin panel)'),
  bullet('9 additional authorized users — standard access to all tool references and categories'),
  spacer(),
  h2('Legal Disclaimer'),
  body(
    'This platform and all content within it is intended solely for educational and ethical security research purposes. ' +
    'All tools, techniques, and commands documented here must only be used on systems and networks you own or have ' +
    'explicit written permission to test. Unauthorized access to computer systems is a criminal offence under the ' +
    'Indian IT Act 2000, the US Computer Fraud and Abuse Act (CFAA), the UK Computer Misuse Act, and equivalent ' +
    'legislation in most jurisdictions. The administrators and contributors of this platform accept no liability for ' +
    'misuse of the information provided.'
  ),
  pageBreak(),
]

// Section 2: Getting Started
const section2 = [
  h1('2. Getting Started'),
  h2('Accessing the Platform'),
  body('Open your browser and navigate to the platform URL provided by the admin. When deployed to Netlify, the URL will be in the format:'),
  new Paragraph({
    children: [new TextRun({ text: 'https://<your-site-name>.netlify.app', font: 'Courier New', size: BODY_SIZE, bold: true })],
    spacing: { after: 160 },
  }),
  body('For local development, the site is accessible at:'),
  new Paragraph({
    children: [new TextRun({ text: 'http://localhost:3000', font: 'Courier New', size: BODY_SIZE, bold: true })],
    spacing: { after: 160 },
  }),
  h2('Login Credentials'),
  body('Each user has a username equal to their first name (lowercase) and a default password in the format Name@123.'),
  body('Example: username '),
  new Paragraph({
    children: [
      new TextRun({ text: 'Example: ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'username = devesh', font: 'Courier New', size: BODY_SIZE, bold: true }),
      new TextRun({ text: ',  password = ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'Devesh@123', font: 'Courier New', size: BODY_SIZE, bold: true }),
    ],
    spacing: { after: 160 },
  }),
  h2('First Login Steps'),
  bullet('Navigate to the platform URL.'),
  bullet('Enter your username (first name, lowercase) and default password.'),
  bullet('Click "Sign In".'),
  bullet('You will be redirected to the Dashboard.'),
  bullet('Review the available tool categories and featured tools.'),
  spacer(),
  h2('Changing Your Password'),
  body(
    'In the current version (v1.0.0), password changes are managed by the admin only. ' +
    'If you need your password reset, contact Devesh. Password changes require a code update ' +
    'in scripts/seed.ts followed by a re-seed of the database via the Admin Panel.'
  ),
  pageBreak(),
]

// Section 3: Navigation Guide
const section3 = [
  h1('3. Navigation Guide'),
  h2('Dashboard'),
  body(
    'The Dashboard is the landing page after login. It displays platform statistics (total tools, categories, users), ' +
    'a set of featured tools, and quick-access category cards. Use it as your starting point to explore the platform.'
  ),
  h2('Tools Page'),
  body('The Tools page lists all documented security tools. You can:'),
  bullet('Filter by category using the category dropdown or sidebar.'),
  bullet('Filter by difficulty (Beginner, Intermediate, Advanced).'),
  bullet('Use the search bar to find tools by name, tag, or keyword.'),
  bullet('Click any tool card to open its full reference page.'),
  spacer(),
  h2('Categories Page'),
  body(
    'The Categories page displays all 12 tool categories with counts and descriptions. ' +
    'Click a category card to view all tools belonging to that category.'
  ),
  h2('Search'),
  body('Global search is available from any page. To focus the search bar, press '),
  new Paragraph({
    children: [
      new TextRun({ text: 'Global search is available from any page. Press ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'Ctrl+K', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' (Windows/Linux) or ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'Cmd+K', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' (Mac) to instantly focus the search input.', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 120 },
  }),
  body('Search results include matches on tool names, descriptions, tags, and commands.'),
  h2('Admin Panel (Devesh Only)'),
  body('The Admin Panel is accessible at /admin. It is only visible and accessible to users with the admin role. It provides:'),
  bullet('A full user list showing usernames, roles, and account creation dates.'),
  bullet('Platform statistics (total tools, categories, users).'),
  bullet('A Re-seed Database button that resets all tool and category data to defaults.'),
  pageBreak(),
]

// Section 4: Tool Categories
const section4 = [
  h1('4. Tool Categories'),
  body('Kali Learn organises all tools into 12 categories. The table below summarises each:'),
  spacer(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      headerRow(['Category', 'Description', '# of Tools']),
      dataRow(['Information Gathering', 'Recon and OSINT tools', '15']),
      dataRow(['Vulnerability Analysis', 'Scanners and auditing', '5'], true),
      dataRow(['Web Application Testing', 'Web pentesting tools', '10']),
      dataRow(['Password Attacks', 'Cracking and brute force', '7'], true),
      dataRow(['Wireless Attacks', 'WiFi security tools', '7']),
      dataRow(['Exploitation Tools', 'Exploit frameworks', '5'], true),
      dataRow(['Sniffing & Spoofing', 'Network interception', '7']),
      dataRow(['Post Exploitation', 'Post-compromise tools', '5'], true),
      dataRow(['Reverse Engineering', 'Binary analysis tools', '5']),
      dataRow(['Forensics', 'Digital forensics tools', '5'], true),
      dataRow(['Social Engineering', 'Phishing and SE tools', '2']),
      dataRow(['Network Tools', 'Network utilities', '4'], true),
    ],
  }),
  spacer(),
  pageBreak(),
]

// Section 5: Using the Tool Reference
const section5 = [
  h1('5. Using the Tool Reference'),
  h2('Tool Page Structure'),
  body('Each tool has a dedicated reference page with the following sections:'),
  bullet('Name & Category — tool name, parent category, and difficulty badge.'),
  bullet('Description — a concise summary of the tool\'s purpose.'),
  bullet('Long Description — detailed background and use-case context.'),
  bullet('Commands — a list of important commands, each with syntax, description, flags, and a runnable example.'),
  bullet('Use Cases — common scenarios where the tool is applied.'),
  bullet('Tags — searchable keywords associated with the tool.'),
  bullet('Related Tools — links to similar or complementary tools.'),
  bullet('Install Command — the apt/pip/other command to install the tool on Kali Linux.'),
  spacer(),
  h2('Copying Commands'),
  body(
    'Every command block includes a copy button (clipboard icon) on the right side. Click it to copy the exact ' +
    'command syntax to your clipboard. A confirmation indicator will briefly appear.'
  ),
  h2('Difficulty Badges'),
  body('Each tool is tagged with one of three difficulty levels:'),
  bullet('Beginner — suitable for those new to security testing; minimal prerequisites.'),
  bullet('Intermediate — requires familiarity with networking and Linux CLI.'),
  bullet('Advanced — assumes solid pentesting experience and deep technical knowledge.'),
  spacer(),
  h2('Related Tools'),
  body(
    'The Related Tools section at the bottom of each tool page lists tools that are commonly used alongside or as ' +
    'alternatives to the current tool. Click any related tool chip to navigate directly to its reference page.'
  ),
  pageBreak(),
]

// Section 6: Search Guide
const section6 = [
  h1('6. Search Guide'),
  h2('How Search Works'),
  body(
    'The search engine indexes tool names, descriptions, tags, and command titles. It uses fuzzy matching, ' +
    'so partial or slightly misspelled queries will still return relevant results.'
  ),
  h2('Search Tips'),
  bullet('Search by tool name: "nmap", "burpsuite", "metasploit"'),
  bullet('Search by technique: "sql injection", "brute force", "port scan"'),
  bullet('Search by category keyword: "wireless", "forensics", "post exploitation"'),
  bullet('Search by tag: "recon", "web", "password", "network"'),
  spacer(),
  h2('Keyboard Shortcut'),
  new Paragraph({
    children: [
      new TextRun({ text: 'Press ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'Ctrl+K', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' (Windows/Linux) or ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'Cmd+K', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' (Mac) from anywhere on the site to instantly focus the search input. Press ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: 'Esc', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' to dismiss.', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 160 },
  }),
  pageBreak(),
]

// Section 7: Admin Guide
const section7 = [
  h1('7. Admin Guide (Devesh Only)'),
  h2('Admin Panel Location'),
  new Paragraph({
    children: [
      new TextRun({ text: 'The admin panel is available at ', font: FONT, size: BODY_SIZE }),
      new TextRun({ text: '/admin', font: 'Courier New', size: BODY_SIZE, bold: true }),
      new TextRun({ text: '. It is only rendered for users with role = admin. All other users receive a 403 page.', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 160 },
  }),
  h2('User Management Table'),
  body(
    'The Users table shows all registered users, their roles, and account creation timestamps. ' +
    'Use this table to verify that all 10 users are present in the database after seeding.'
  ),
  h2('Re-seed Database'),
  body(
    'The "Re-seed Database" button in the admin panel triggers a full reset of tool and category data. ' +
    'This is useful after adding new tools to the data files. Note: user accounts are not affected by a re-seed.'
  ),
  new Paragraph({
    children: [
      new TextRun({ text: 'Warning: ', font: FONT, size: BODY_SIZE, bold: true, color: 'CC0000' }),
      new TextRun({ text: 'Re-seeding will delete and replace all Tool and Category documents in MongoDB.', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 160 },
  }),
  h2('Adding New Users'),
  body('In v1.0.0, adding users requires a code change:'),
  bullet('Open scripts/seed.ts.'),
  bullet('Add a new entry to the usersToCreate array with the desired username, password, and role.'),
  bullet('Run npm run seed to re-populate the database.'),
  bullet('Alternatively, use the MongoDB Atlas console to manually insert a user document with a bcrypt-hashed password.'),
  pageBreak(),
]

// Section 8: Deployment
const section8 = [
  h1('8. Deployment'),
  h2('Netlify Deployment Steps'),
  bullet('1. Push the project to a GitHub repository.'),
  bullet('2. Log in to Netlify and click "Add new site" → "Import an existing project".'),
  bullet('3. Connect your GitHub account and select the kali-learn repository.'),
  bullet('4. Set the build command to:  npm run build'),
  bullet('5. Set the publish directory to:  .next'),
  bullet('6. Add the following environment variables in Netlify → Site settings → Environment variables:'),
  new Paragraph({
    children: [
      new TextRun({ text: '   MONGODB_URI', font: 'Courier New', size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' — your MongoDB Atlas connection string', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 60 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: '   NEXTAUTH_SECRET', font: 'Courier New', size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' — a long random string (use openssl rand -base64 32)', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 60 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: '   NEXTAUTH_URL', font: 'Courier New', size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' — set to http://localhost:3000 initially', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  bullet('7. Click "Deploy site".'),
  spacer(),
  h2('After Deployment'),
  body(
    'Once Netlify assigns a URL (e.g. https://kali-learn.netlify.app), update the NEXTAUTH_URL environment variable ' +
    'in Netlify to match the live URL, then trigger a redeploy for the change to take effect.'
  ),
  pageBreak(),
]

// Section 9: Running Locally
const section9 = [
  h1('9. Running Locally'),
  h2('Prerequisites'),
  bullet('Node.js 20 or later'),
  bullet('npm 10 or later'),
  bullet('A MongoDB Atlas cluster (or local MongoDB instance)'),
  spacer(),
  h2('Steps'),
  new Paragraph({
    children: [
      new TextRun({ text: 'Step 1 — Install dependencies:', font: FONT, size: BODY_SIZE, bold: true }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'npm install', font: 'Courier New', size: BODY_SIZE })],
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Step 2 — Create .env.local:', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({ text: ' (already done for this project — verify the file exists at project root)', font: FONT, size: BODY_SIZE }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'MONGODB_URI=<your-connection-string>', font: 'Courier New', size: BODY_SIZE }),
    ],
    spacing: { after: 40 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'NEXTAUTH_SECRET=<random-secret>', font: 'Courier New', size: BODY_SIZE })],
    spacing: { after: 40 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'NEXTAUTH_URL=http://localhost:3000', font: 'Courier New', size: BODY_SIZE })],
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Step 3 — Seed the database:', font: FONT, size: BODY_SIZE, bold: true }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'npm run seed', font: 'Courier New', size: BODY_SIZE })],
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Step 4 — Start the development server:', font: FONT, size: BODY_SIZE, bold: true }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'npm run dev', font: 'Courier New', size: BODY_SIZE })],
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Step 5 — Open the app:', font: FONT, size: BODY_SIZE, bold: true }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'http://localhost:3000', font: 'Courier New', size: BODY_SIZE })],
    spacing: { after: 160 },
    indent: { left: convertInchesToTwip(0.5) },
  }),
  pageBreak(),
]

// Section 10: Default Credentials
const section10 = [
  h1('10. Default Credentials'),
  body('The following credentials are created by the seed script. All users should be advised to contact the admin if they need their password changed.'),
  spacer(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      headerRow(['Username', 'Password', 'Role']),
      dataRow(['devesh', 'Devesh@123', 'Admin']),
      dataRow(['melwin', 'Melwin@123', 'User'], true),
      dataRow(['ibrahim', 'Ibrahim@123', 'User']),
      dataRow(['hari', 'Hari@123', 'User'], true),
      dataRow(['janani', 'Janani@123', 'User']),
      dataRow(['obhu', 'Obhu@123', 'User'], true),
      dataRow(['tilika', 'Tilika@123', 'User']),
      dataRow(['iniyan', 'Iniyan@123', 'User'], true),
      dataRow(['raam', 'Raam@123', 'User']),
      dataRow(['logan', 'Logan@123', 'User'], true),
    ],
  }),
  spacer(),
  new Paragraph({
    children: [
      new TextRun({ text: 'Note: ', font: FONT, size: BODY_SIZE, bold: true }),
      new TextRun({
        text: 'Store these credentials securely. Do not share them with unauthorised individuals. All passwords are stored as bcrypt hashes in MongoDB — the plaintext values above are only needed for first login.',
        font: FONT,
        size: BODY_SIZE,
        italics: true,
      }),
    ],
    spacing: { after: 200 },
  }),
]

// ─── Build Document ───────────────────────────────────────────────────────────

const doc = new Document({
  creator: 'Devesh',
  title: 'KALI LEARN — User & Admin Documentation',
  description: 'Comprehensive Guide to the Kali Linux Security Learning Platform',
  styles: {
    default: {
      document: {
        run: {
          font: FONT,
          size: BODY_SIZE,
        },
      },
    },
  },
  sections: [
    {
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'KALI LEARN — User & Admin Documentation',
                  font: FONT,
                  size: 18,
                  color: '888888',
                }),
              ],
              alignment: AlignmentType.RIGHT,
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' },
              },
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'KALI LEARN Documentation v1.0 | Confidential          Page ',
                  font: FONT,
                  size: 18,
                  color: '888888',
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: FONT,
                  size: 18,
                  color: '888888',
                }),
                new TextRun({
                  text: ' of ',
                  font: FONT,
                  size: 18,
                  color: '888888',
                }),
                new TextRun({
                  children: [PageNumber.TOTAL_PAGES],
                  font: FONT,
                  size: 18,
                  color: '888888',
                }),
              ],
              alignment: AlignmentType.CENTER,
              border: {
                top: { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' },
              },
            }),
          ],
        }),
      },
      children: [
        ...titlePage,
        ...section1,
        ...section2,
        ...section3,
        ...section4,
        ...section5,
        ...section6,
        ...section7,
        ...section8,
        ...section9,
        ...section10,
      ],
    },
  ],
})

// ─── Write file ───────────────────────────────────────────────────────────────

const outputPath = path.join(__dirname, '../kali-learn-documentation.docx')

const buffer = await Packer.toBuffer(doc)
fs.writeFileSync(outputPath, buffer)

console.log('Documentation generated: kali-learn-documentation.docx')
