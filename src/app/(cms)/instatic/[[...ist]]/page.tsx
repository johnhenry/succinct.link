import { Suspense } from 'react'
import { InstaticClient } from '../components/client'
import { getDocuments, getCollections } from '../lib/api'
import { redirect } from 'next/navigation'

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-lg">Loading documents...</div>
    </div>
  )
}

function ErrorDisplay({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-red-500">
        <h2 className="text-lg font-semibold mb-2">Error loading documents</h2>
        <p className="text-sm">{error.message}</p>
      </div>
    </div>
  )
}

export default async function Page({ params }: any ) {
  // Check if Instatic is activated
  const isActivated = process.env.IST_ACTIVATED === 'true'
  if (!isActivated) {
    redirect('/')
  }

  try {
    const collections = await getCollections()
    const collectionName = params.ist?.[0]
    
    let documents:any[] = []
    if (collectionName) {
      documents = await getDocuments(collectionName)
    }
    
    return (
      <Suspense fallback={<LoadingFallback />}>
        <InstaticClient 
          initialData={documents}
          collections={collections.map(c => ({ 
            name: c,
            documents: [] // We'll load these on demand
          }))}
          currentCollection={collectionName}
        />
      </Suspense>
    )
  } catch (error) {
    return <ErrorDisplay error={error as Error} />
  }
}
