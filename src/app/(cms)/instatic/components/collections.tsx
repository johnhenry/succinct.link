'use client'

export function Collections() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Collections</h1>
        <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          New Collection
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Posts</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <span className="sr-only">Edit</span>
                ✏️
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <span className="sr-only">Delete</span>
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <span className="sr-only">Edit</span>
                ✏️
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <span className="sr-only">Delete</span>
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
