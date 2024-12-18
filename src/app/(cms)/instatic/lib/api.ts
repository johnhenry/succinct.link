import { readFile, writeFile, readdir, mkdir } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = join(process.cwd(), 'outstatic/content')

// Custom stringifier to preserve exact YAML format
function customStringify(data: any) {
  const lines: string[] = ['---']
  
  // Helper to stringify a value with proper indentation
  const stringifyValue = (value: any, indent: number = 0): string[] => {
    if (Array.isArray(value)) {
      // Special handling for tags array
      if (value[0]?.label && value[0]?.value) {
        return [`[${value.map(item => 
          `{"label":"${item.label}","value":"${item.value}"}`
        ).join(',')}]`]
      }
      return [`[${value.map(v => stringifyValue(v, indent)[0]).join(',')}]`]
    }
    if (typeof value === 'object' && value !== null) {
      // Return empty array for empty objects
      if (Object.keys(value).length === 0) {
        return ["{}"]
      }
      return Object.entries(value).map(([k, v]) => {
        const indentStr = ' '.repeat(indent)
        const nestedValue = stringifyValue(v, indent + 2)
        return `${indentStr}${k}: ${nestedValue[0]}`
      })
    }
    if (typeof value === 'string') {
      return [`'${value}'`]
    }
    return [String(value)]
  }

  // Build YAML lines with proper indentation
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Special handling for nested objects like author
      const nestedLines = stringifyValue(value, 2)
      if (nestedLines.length > 0) {
        lines.push(`${key}:`)
        lines.push(...nestedLines)
      } else {
        lines.push(`${key}: {}`)
      }
    } else {
      const [formattedValue] = stringifyValue(value, 0)
      lines.push(`${key}: ${formattedValue}`)
    }
  })
  
  lines.push('---')
  return lines.join('\n')
}

export async function getDocuments(collection = 'projects') {
  const contentPath = join(CONTENT_DIR, collection)
  try {
    const files = await readdir(contentPath)
    const documents = await Promise.all(
      files.filter(file => file.endsWith('.md')).map(async (file) => {
        const content = await readFile(join(contentPath, file), 'utf-8')
        const { data, content: markdownContent } = matter(content)
        const [firstLine] = markdownContent.split('\n')
        return {
          ...data,
          content: markdownContent,
          description: firstLine || '',
          slug: file.replace(/\.md$/, '')
        }
      })
    )
    return documents
  } catch (error) {
    console.error('Error reading documents:', error)
    return []
  }
}

export async function getCollections(): Promise<string[]> {
  try {
    const collections = await readdir(CONTENT_DIR, { withFileTypes: true })
    return collections
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch (error) {
    console.error('Error reading collections:', error)
    return []
  }
}

export async function saveDocument(collection: string, slug: string, { content, ...metadata }: any) {
  const filePath = join(CONTENT_DIR, collection, `${slug}.md`)
  
  try {
    // Create collection directory if it doesn't exist
    const collectionPath = join(CONTENT_DIR, collection)
    try {
      await readdir(collectionPath)
    } catch {
      await mkdir(collectionPath, { recursive: true })
    }

    // Try to read existing file, but don't fail if it doesn't exist
    let existingData:any = {}
    try {
      const existingContent = await readFile(filePath, 'utf-8')
      const matter = await import('gray-matter')
      const { data } = matter.default(existingContent)
      existingData = data
    } catch {
      // File doesn't exist, that's okay for new documents
    }

    // Merge metadata while preserving format
    const newMetadata = {
      ...existingData,
      ...metadata,
      // Ensure required fields exist
      author: metadata.author || existingData.author || { name: '', picture: '' },
      tags: metadata.tags || existingData.tags || [],
      status: metadata.status || existingData.status || 'draft',
      type: metadata.type || existingData.type || '::app::',
      color: metadata.color || existingData.color || 'rose',
      updatedAt: new Date().toISOString()
    }

    // Format the document with custom YAML stringifier
    const yamlContent = customStringify(newMetadata)
    const newContent = `${yamlContent}\n\n${content || ''}`

    await writeFile(filePath, newContent, 'utf-8')
    return true
  } catch (error) {
    console.error('Error saving document:', error)
    return false
  }
}
