'use client'

import { useState } from 'react'
import { DocumentEditor } from './document-editor';
import Link from 'next/link';

interface Collection {
  name: string
  documents: any[]
}

interface InstaticClientProps {
  initialData: any[]
  collections: Collection[]
  currentCollection?: string
}

export function InstaticClient({ initialData, collections, currentCollection }: InstaticClientProps) {
  const [currentDocument, setCurrentDocument] = useState<null|any>(null)
  const [documents, setDocuments] = useState(initialData)

  const handleSave = async (doc: any) => {
    try {
      // Generate a slug if it doesn't exist
      const slug = doc.slug || doc.title?.toLowerCase().replace(/\s+/g, '-') || new Date().getTime().toString()
      
      const response = await fetch('/api/instatic/documents', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...doc,
          slug,
          collection: currentCollection
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save document')
      }

      // Refresh the documents list
      const updatedDocs = documents.map(d => 
        d.slug === slug ? { ...doc, slug } : d
      )
      
      // If it's a new document, add it to the list
      if (!documents.find(d => d.slug === slug)) {
        updatedDocs.push({ ...doc, slug })
      }
      
      setDocuments(updatedDocs)
      setCurrentDocument(null) // Return to list view after save
    } catch (error) {
      console.error('Error saving document:', error)
      throw error
    }
  }

  const getCollectionIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'posts':
        return 'article'
      case 'projects':
        return 'folder'
      default:
        return 'description'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen">
        <aside className="w-64 border-r border-gray-200 bg-white">
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-8">Instatic</h1>
            <nav className="space-y-4">
              <Link
                href="/instatic" 
                className={`flex items-center space-x-2 ${!currentCollection ? 'text-black' : 'text-gray-700 hover:text-black'}`}
              >
                <span className="material-icons text-xl">grid_view</span>
                <span>Collections</span>
              </Link>
              {collections.map(collection => (
                <a
                  key={collection.name}
                  href={`/instatic/${collection.name.toLowerCase()}`}
                  className={`flex items-center space-x-2 ${
                    currentCollection === collection.name.toLowerCase() 
                      ? 'text-black' 
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  <span className="material-icons text-xl">{getCollectionIcon(collection.name)}</span>
                  <span>{collection.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>
        
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {!currentCollection ? (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold">Collections</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collections.map(collection => (
                    <div
                      key={collection.name}
                      className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => window.location.href = `/instatic/${collection.name.toLowerCase()}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="material-icons text-2xl text-gray-600">
                          {getCollectionIcon(collection.name)}
                        </span>
                        <h3 className="text-lg font-medium">{collection.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-semibold">{currentCollection}</h2>
                  <button 
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    onClick={() => setCurrentDocument({ status: 'draft' })}
                  >
                    New {currentCollection.slice(0, -1)}
                  </button>
                </div>
                
                {currentDocument ? (
                  <DocumentEditor
                    document={currentDocument}
                    onSave={handleSave}
                  />
                ) : documents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="material-icons text-6xl text-gray-300 mb-4">
                      {getCollectionIcon(currentCollection)}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No documents found in this collection
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Create your first {currentCollection.slice(0, -1)} by clicking the button below.
                    </p>
                    <button
                      onClick={() => setCurrentDocument({ status: 'draft' })}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                      Create {currentCollection.slice(0, -1)}
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                        <div className="col-span-6">TITLE</div>
                        <div className="col-span-3">STATUS</div>
                        <div className="col-span-3">PUBLISHED AT</div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {documents.map((doc: any) => (
                        <div 
                          key={doc.slug}
                          className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() => setCurrentDocument(doc)}
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-6 font-medium">{doc.title}</div>
                            <div className="col-span-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {doc.status}
                              </span>
                            </div>
                            <div className="col-span-3 text-sm text-gray-500">
                              {doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString() : 'Not published'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
