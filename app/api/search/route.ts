import { NextRequest, NextResponse } from 'next/server'
import { toolsData } from '@/data/tools'

const RESULTS_LIMIT = 20

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim() ?? ''

    if (!q) {
      return NextResponse.json({ tools: [], total: 0, query: '' })
    }

    const lower = q.toLowerCase()

    const tools = toolsData
      .filter(
        (t) =>
          t.name.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower) ||
          (t.tags ?? []).some((tag) => tag.toLowerCase().includes(lower)) ||
          (t.useCases ?? []).some((u) => u.toLowerCase().includes(lower)) ||
          (t.commands ?? []).some((c) => c.title?.toLowerCase().includes(lower))
      )
      .slice(0, RESULTS_LIMIT)

    return NextResponse.json({ tools, total: tools.length, query: q })
  } catch (error) {
    console.error('[GET /api/search]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
