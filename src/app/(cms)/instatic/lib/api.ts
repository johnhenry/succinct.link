import { readFile, writeFile, readdir, mkdir } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

// Instatic edits files on the local filesystem, unlike Outstatic (which
// reads/writes via GitHub's API and can target any repo regardless of local
// checkout layout). OST_CONTENT_PATH is a path *within the target repo's
// git tree* from Outstatic's perspective -- reused here for the content
// subdirectory name, but resolved against a *local checkout* of that same
// repo, which may not be this app's own directory (e.g. Outstatic here is
// configured for johnhenry/johnhenry.github.io, a separate repo from this
// one). IST_REPO_PATH points at that local checkout, relative to this app's
// cwd; defaults to "." for the case where Instatic's target repo is this
// app's own repo (Instatic's original assumption).
const REPO_ROOT = join(process.cwd(), process.env.IST_REPO_PATH || '.')
const CONTENT_DIR = join(REPO_ROOT, process.env.OST_CONTENT_PATH || 'outstatic/content')

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
    if (value === undefined) return // omit rather than write the literal string "undefined"
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

    // Defaults that make sense for every collection.
    const commonDefaults = {
      tags: metadata.tags || existingData.tags || [],
      status: metadata.status || existingData.status || 'draft',
      updatedAt: new Date().toISOString(),
      publishedAt:
        metadata.publishedAt ||
        existingData.publishedAt ||
        ((metadata.status || existingData.status) === 'published'
          ? new Date().toISOString()
          : undefined),
    }

    // "projects" documents (Outstatic's original schema) additionally carry
    // type/color/an author object; other collections (e.g. "posts") have
    // their own shape and shouldn't have these invented for them.
    const collectionDefaults =
      collection === 'projects'
        ? {
            author: metadata.author || existingData.author || { name: '', picture: '' },
            type: metadata.type || existingData.type || '::app::',
            color: metadata.color || existingData.color || 'rose',
          }
        : {}

    // Merge metadata while preserving format
    const newMetadata = {
      ...existingData,
      ...metadata,
      ...commonDefaults,
      ...collectionDefaults,
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
