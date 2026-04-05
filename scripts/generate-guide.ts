import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  ShadingType,
  WidthType,
  Packer,
  PageBreak,
  TableOfContents,
  StyleLevel,
} from 'docx'
import fs from 'fs'
import path from 'path'
import { toolsLinux } from '../data/tools-linux'
import { toolsPart1 } from '../data/tools-part1'
import { toolsPart2 } from '../data/tools-part2'
import { toolsPart3 } from '../data/tools-part3'
import { categories } from '../data/tools'

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Colour palette ─────────────────────────────────────────────────────────

const C = {
  green:      '1a7f37',
  greenLight: 'dcfce7',
  yellow:     'a16207',
  yellowLight:'fef9c3',
  red:        'b91c1c',
  redLight:   'fee2e2',
  blue:       '1d4ed8',
  blueLight:  'dbeafe',
  gray:       '374151',
  grayLight:  'f3f4f6',
  white:      'FFFFFF',
  black:      '111827',
  border:     'd1d5db',
  codeBg:     'f1f5f9',
  coverBg:    '0f172a',
  coverAccent:'22c55e',
}

// ─── Shared border spec ─────────────────────────────────────────────────────

const cellBorder = {
  top:    { style: BorderStyle.SINGLE, size: 4, color: C.border },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: C.border },
  left:   { style: BorderStyle.SINGLE, size: 4, color: C.border },
  right:  { style: BorderStyle.SINGLE, size: 4, color: C.border },
}

// ─── Helper: header cell ────────────────────────────────────────────────────

function headerCell(text: string, width: number): TableCell {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: C.blue },
    borders: cellBorder,
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, color: C.white, font: 'Calibri', size: 20 })],
      }),
    ],
  })
}

// ─── Helper: data cell ──────────────────────────────────────────────────────

function dataCell(text: string, width: number, shaded = false, mono = false): TableCell {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: shaded ? C.grayLight : C.white },
    borders: cellBorder,
    children: [
      new Paragraph({
        children: [new TextRun({ text, font: mono ? 'Courier New' : 'Calibri', size: 18, color: C.black })],
      }),
    ],
  })
}

// ─── Helper: code block ─────────────────────────────────────────────────────

function codeBlock(code: string): Paragraph {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    shading: { type: ShadingType.CLEAR, fill: C.codeBg },
    border: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: C.border, space: 4 },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.border, space: 4 },
      left:   { style: BorderStyle.THICK,  size: 12, color: C.coverAccent, space: 4 },
      right:  { style: BorderStyle.NONE,   size: 0, color: C.white },
    },
    children: [new TextRun({ text: code, font: 'Courier New', size: 18, color: '1e293b' })],
  })
}

// ─── Helper: difficulty badge ────────────────────────────────────────────────

function difficultyBadge(difficulty: string): Paragraph {
  const cfg = difficulty === 'Beginner'
    ? { fill: C.greenLight, color: C.green, label: 'BEGINNER' }
    : difficulty === 'Intermediate'
    ? { fill: C.yellowLight, color: C.yellow, label: 'INTERMEDIATE' }
    : { fill: C.redLight,   color: C.red,   label: 'ADVANCED' }

  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: `  ${cfg.label}  `, bold: true, color: cfg.color, size: 16,
        highlight: difficulty === 'Beginner' ? 'green' : difficulty === 'Intermediate' ? 'yellow' : 'red',
      }),
    ],
  })
}

// ─── Helper: spacer ─────────────────────────────────────────────────────────

function spacer(before = 100, after = 100): Paragraph {
  return new Paragraph({ spacing: { before, after }, children: [] })
}

// ─── Helper: bullet ─────────────────────────────────────────────────────────

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: 'Calibri', size: 20, color: C.gray })],
  })
}

// ─── Commands table ──────────────────────────────────────────────────────────

function commandsTable(commands: Command[]): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell('Command / Syntax', 32),
      headerCell('Description', 40),
      headerCell('Example', 28),
    ],
  })

  const rows = commands.map((cmd, i) => new TableRow({
    children: [
      dataCell(cmd.syntax, 32, i % 2 !== 0, true),
      dataCell(cmd.description, 40, i % 2 !== 0),
      dataCell(cmd.example ?? '—', 28, i % 2 !== 0, true),
    ],
  }))

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...rows],
  })
}

// ─── Flags table ────────────────────────────────────────────────────────────

function flagsTable(flags: Flag[]): Table {
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell('Flag', 22),
      headerCell('Description', 78),
    ],
  })

  const rows = flags.map((f, i) => new TableRow({
    children: [
      dataCell(f.flag, 22, i % 2 !== 0, true),
      dataCell(f.description, 78, i % 2 !== 0),
    ],
  }))

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...rows],
  })
}

// ─── Collect all flags from a tool ──────────────────────────────────────────

function allFlags(tool: ToolData): Flag[] {
  const seen = new Set<string>()
  const out: Flag[] = []
  for (const cmd of tool.commands) {
    for (const f of cmd.flags ?? []) {
      if (!seen.has(f.flag)) { seen.add(f.flag); out.push(f) }
    }
  }
  return out
}

// ─── Tool section builder ────────────────────────────────────────────────────

function buildToolSection(tool: ToolData): (Paragraph | Table)[] {
  const blocks: (Paragraph | Table)[] = []

  // Tool heading
  blocks.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
    children: [
      new TextRun({ text: tool.name, bold: true, color: C.blue, font: 'Calibri', size: 28 }),
      tool.subcategory
        ? new TextRun({ text: `  —  ${tool.subcategory}`, color: C.gray, font: 'Calibri', size: 20 })
        : new TextRun({ text: '' }),
    ],
  }))

  // Difficulty badge
  blocks.push(difficultyBadge(tool.difficulty))

  // Description
  blocks.push(new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text: tool.description, font: 'Calibri', size: 20, color: C.black })],
  }))

  // Install command (if any)
  if (tool.installCommand) {
    blocks.push(new Paragraph({
      spacing: { before: 40, after: 20 },
      children: [new TextRun({ text: 'Install: ', bold: true, font: 'Calibri', size: 18, color: C.gray })],
    }))
    blocks.push(codeBlock(tool.installCommand))
  }

  // Commands table
  if (tool.commands.length > 0) {
    blocks.push(new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [new TextRun({ text: 'Key Commands', bold: true, font: 'Calibri', size: 22, color: C.black })],
    }))
    blocks.push(commandsTable(tool.commands))
  }

  // Flags table
  const flags = allFlags(tool)
  if (flags.length > 0) {
    blocks.push(new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [new TextRun({ text: 'Common Flags', bold: true, font: 'Calibri', size: 22, color: C.black })],
    }))
    blocks.push(flagsTable(flags))
  }

  // Use cases
  if (tool.useCases.length > 0) {
    blocks.push(new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [new TextRun({ text: 'Use Cases', bold: true, font: 'Calibri', size: 22, color: C.black })],
    }))
    tool.useCases.forEach(uc => blocks.push(bullet(uc)))
  }

  blocks.push(spacer(80, 40))
  return blocks
}

// ─── Category section builder ────────────────────────────────────────────────

function buildCategorySection(
  catName: string,
  tools: ToolData[],
  catDesc: string,
  isFirst = false,
): (Paragraph | Table)[] {
  const blocks: (Paragraph | Table)[] = []

  // Page break before each category (except first)
  if (!isFirst) {
    blocks.push(new Paragraph({ children: [new PageBreak()] }))
  }

  // Category Heading 1
  blocks.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text: catName, bold: true, color: C.coverAccent, font: 'Calibri', size: 36 })],
  }))

  // Category description
  if (catDesc) {
    blocks.push(new Paragraph({
      spacing: { before: 0, after: 160 },
      shading: { type: ShadingType.CLEAR, fill: C.grayLight },
      border: {
        left: { style: BorderStyle.THICK, size: 12, color: C.coverAccent, space: 6 },
        top: { style: BorderStyle.NONE, size: 0, color: C.white },
        bottom: { style: BorderStyle.NONE, size: 0, color: C.white },
        right: { style: BorderStyle.NONE, size: 0, color: C.white },
      },
      children: [new TextRun({ text: catDesc, font: 'Calibri', size: 20, color: C.gray, italics: true })],
    }))
  }

  // Tools in this category
  for (const tool of tools) {
    blocks.push(...buildToolSection(tool))
  }

  return blocks
}

// ─── Quick Reference table ───────────────────────────────────────────────────

function buildQuickReference(allTools: ToolData[]): (Paragraph | Table)[] {
  const blocks: (Paragraph | Table)[] = []

  blocks.push(new Paragraph({ children: [new PageBreak()] }))
  blocks.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text: 'Quick Reference Card', bold: true, color: C.coverAccent, font: 'Calibri', size: 36 })],
  }))
  blocks.push(new Paragraph({
    spacing: { before: 0, after: 160 },
    children: [new TextRun({ text: 'Essential command cheatsheet — all tools at a glance.', font: 'Calibri', size: 20, color: C.gray, italics: true })],
  }))

  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      headerCell('Tool', 18),
      headerCell('Category', 22),
      headerCell('Key Command', 35),
      headerCell('Purpose', 25),
    ],
  })

  const rows = allTools.map((tool, i) => {
    const keyCmd = tool.commands[0]?.syntax ?? '—'
    return new TableRow({
      children: [
        dataCell(tool.name, 18, i % 2 !== 0),
        dataCell(tool.category, 22, i % 2 !== 0),
        dataCell(keyCmd, 35, i % 2 !== 0, true),
        dataCell(tool.description.slice(0, 80) + (tool.description.length > 80 ? '…' : ''), 25, i % 2 !== 0),
      ],
    })
  })

  blocks.push(new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...rows],
  }))

  return blocks
}

// ─── Cover page ──────────────────────────────────────────────────────────────

function buildCoverPage(): Paragraph[] {
  return [
    spacer(600, 0),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({
          text: 'KALI LEARN',
          bold: true,
          font: 'Calibri',
          size: 80,
          color: C.coverAccent,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
      children: [
        new TextRun({
          text: 'Complete Hacking Reference',
          font: 'Calibri',
          size: 40,
          color: C.white,
          bold: true,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      shading: { type: ShadingType.CLEAR, fill: C.coverBg },
      children: [
        new TextRun({
          text: 'Linux Fundamentals  ·  Kali Linux Tools  ·  Penetration Testing',
          font: 'Calibri',
          size: 22,
          color: 'a3e635',
          italics: true,
        }),
      ],
    }),
    spacer(120, 0),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({ text: 'From beginner to advanced — every essential tool documented with commands, flags, and real-world use cases.', font: 'Calibri', size: 20, color: '94a3b8' }),
      ],
    }),
    spacer(80, 0),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({ text: `Generated: ${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`, font: 'Calibri', size: 18, color: '64748b' }),
      ],
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ]
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const allTools = [...toolsLinux, ...toolsPart1, ...toolsPart2, ...toolsPart3]

  // Group tools by category preserving declaration order
  const toolsByCategory = new Map<string, ToolData[]>()
  for (const tool of allTools) {
    const existing = toolsByCategory.get(tool.category) ?? []
    existing.push(tool)
    toolsByCategory.set(tool.category, existing)
  }

  const catDescMap = new Map(categories.map(c => [c.name, c.description]))

  // Build document children
  const children: (Paragraph | Table)[] = []

  // 1. Cover page
  children.push(...buildCoverPage())

  // 2. TOC placeholder
  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text: 'Contents', bold: true, font: 'Calibri', size: 36, color: C.black })],
  }))

  // TOC entries (manual since auto-TOC requires Word update)
  let catIndex = 1
  for (const [catName] of toolsByCategory) {
    children.push(new Paragraph({
      spacing: { before: 60, after: 40 },
      children: [
        new TextRun({ text: `${catIndex}. `, bold: true, font: 'Calibri', size: 22, color: C.blue }),
        new TextRun({ text: catName, font: 'Calibri', size: 22, color: C.black }),
      ],
    }))
    catIndex++
  }
  children.push(new Paragraph({
    spacing: { before: 60, after: 40 },
    children: [
      new TextRun({ text: `${catIndex}. `, bold: true, font: 'Calibri', size: 22, color: C.blue }),
      new TextRun({ text: 'Quick Reference Card', font: 'Calibri', size: 22, color: C.black }),
    ],
  }))
  children.push(new Paragraph({ children: [new PageBreak()] }))

  // 3. Category sections
  let isFirst = true
  for (const [catName, tools] of toolsByCategory) {
    const catDesc = catDescMap.get(catName) ?? ''
    children.push(...buildCategorySection(catName, tools, catDesc, isFirst))
    isFirst = false
  }

  // 4. Quick reference
  children.push(...buildQuickReference(allTools))

  // ─── Build document ───────────────────────────────────────────────────────
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 20 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch = 1440 twips
          },
        },
        children,
      },
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  const outPath = path.resolve(__dirname, '..', 'kali-learn-guide.docx')
  fs.writeFileSync(outPath, buffer)
  console.log(`\n  Done! Written to: ${outPath}`)
  console.log(`  Tools documented: ${allTools.length}`)
  console.log(`  Categories:       ${toolsByCategory.size}\n`)
}

main().catch(err => { console.error(err); process.exit(1) })
