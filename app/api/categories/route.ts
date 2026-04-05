import { NextRequest, NextResponse } from 'next/server'
import { toolsData, categories } from '@/data/tools'

export async function GET(request: NextRequest) {
  try {
    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      toolCount: toolsData.filter((t) => t.category === cat.name).length,
    }))

    return NextResponse.json(categoriesWithCount)
  } catch (error) {
    console.error('[GET /api/categories]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
