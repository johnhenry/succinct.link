'use client'

interface SidebarProps {
  documents: any[]
  currentDocument: any
  onDocumentSelect: (doc: any) => void
}

export function Sidebar({ documents, currentDocument, onDocumentSelect }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-gray-200 p-4">
      <nav>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Collections</h2>
        </div>
        <ul>
          <li className="mb-2">
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              Posts
            </button>
          </li>
          <li>
            <button className="w-full text-left p-2 hover:bg-gray-100 rounded">
              Projects
            </button>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">Documents</h3>
        <ul>
          {documents.map((doc) => (
            <li key={doc.slug}>
              <button
                onClick={() => onDocumentSelect(doc)}
                className={`w-full text-left p-2 hover:bg-gray-100 rounded text-sm ${
                  currentDocument?.slug === doc.slug ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                {doc.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
