import { NextResponse } from 'next/server'
import { uploadImage } from '@/app/(cms)/instatic/lib/api'

// Accepts a small JSON payload (base64-encoded file contents) rather than
// multipart/form-data -- cover images edited through Instatic are expected
// to be small, and this keeps the client side to a plain FileReader call
// with no extra dependency.
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 // 5MB

export async function POST(request: Request) {
  try {
    const { collection = 'projects', filename, dataBase64 } = await request.json()

    if (!filename || !dataBase64) {
      return NextResponse.json(
        { error: 'filename and dataBase64 are required' },
        { status: 400 }
      )
    }

    // Rough size check before decoding -- base64 inflates size by ~4/3.
    if (dataBase64.length * 0.75 > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `File exceeds the ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB limit` },
        { status: 413 }
      )
    }

    const url = await uploadImage(collection, filename, dataBase64)
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error in POST /api/instatic/upload:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
