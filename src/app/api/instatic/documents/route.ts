import { NextResponse } from 'next/server'
import { saveDocument } from '@/app/(cms)/instatic/lib/api'

export async function PUT(request: Request) {
  try {
    const document = await request.json()
    const { collection = 'projects', slug, content, status, ...metadata } = document

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    // Update timestamps
    const now = new Date().toISOString()
    const updatedMetadata = {
      ...metadata,
      status,
      updatedAt: now,
      ...(status === 'published' && !metadata.publishedAt && { publishedAt: now })
    }

    const success = await saveDocument(collection, slug, { 
      content, 
      ...updatedMetadata,
      author: metadata.author || { name: '', picture: '' },
      tags: metadata.tags || []
    })
    
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
