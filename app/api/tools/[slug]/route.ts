import { NextRequest, NextResponse } from 'next/server'
import { toolsData } from '@/data/tools'

interface RouteContext {
  params: { slug: string }
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const tool = toolsData.find((t) => t.slug === params.slug)
    if (!tool) return NextResponse.json({ error: 'Tool not found' }, { status: 404 })
    return NextResponse.json(tool)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
