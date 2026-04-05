import { NextRequest, NextResponse } from 'next/server'
import { toolsData } from '@/data/tools'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10))
    const featuredParam = searchParams.get('featured')

    let filtered = [...toolsData]

    if (category) {
      filtered = filtered.filter((t) => t.category === category)
    }

    if (difficulty) {
      filtered = filtered.filter((t) => t.difficulty === difficulty)
    }

    if (featuredParam !== null) {
      const isFeatured = featuredParam === 'true'
      filtered = filtered.filter((t) => (t.featured ?? false) === isFeatured)
    }

    if (search) {
      const lower = search.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower) ||
          (t.tags ?? []).some((tag) => tag.toLowerCase().includes(lower))
      )
    }

    const total = filtered.length
    const skip = (page - 1) * limit
    const tools = filtered.slice(skip, skip + limit)
    const pages = Math.ceil(total / limit)

    return NextResponse.json({ tools, total, pages, currentPage: page })
  } catch (error) {
    console.error('[GET /api/tools]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
