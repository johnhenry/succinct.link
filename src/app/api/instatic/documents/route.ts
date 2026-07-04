import { NextResponse } from 'next/server'
import { saveDocument } from '@/app/(cms)/instatic/lib/api'

// Thin HTTP shim -- all default-value logic (timestamps, tags, the
// projects-only author shape, etc.) lives solely in saveDocument, so there's
// one place those rules can drift, not two.
export async function PUT(request: Request) {
  try {
    const document = await request.json()
    const { collection = 'projects', slug, content, ...metadata } = document

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const success = await saveDocument(collection, slug, { content, ...metadata })

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Failed to save document' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in PUT /api/instatic/documents:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
