"use client";

import { useState } from "react";
interface Author {
  name: string;
  picture: string;
}

interface Tag {
  label: string;
  value: string;
}

interface Document {
  title: string;
  content: string;
  status: "draft" | "published";
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  coverImage?: string;
  // "projects" collection fields
  url?: string;
  video?: string;
  type?: "::code::" | "::app::" | "::library::" | "::design::";
  color?: "rose" | "blue" | "green";
  tags?: Tag[] | string[];
  author?: Author | string;
  // "posts" collection fields
  description?: string;
  date?: string;
  heroImage?: string;
  alt?: string;
}

interface DocumentEditorProps {
  // Callers only ever pass a partial shape (a brand-new document starts as
  // just `{ status: 'draft' }`) -- this component fills in the rest.
  document: Partial<Document>;
  collection?: string;
  onSave: (doc: Document) => Promise<void>;
  onCancel: () => void;
}

function TagEditor({
  tags,
  onChange,
}: {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim()) {
      const value = `::${input.trim().toLowerCase().replace(/\s+/g, "-")}::`;
      const newTag = { label: value, value };
      onChange([...tags, newTag]);
      setInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
          >
            {tag.label}
            <button
              onClick={() => removeTag(index)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag and press Enter"
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={addTag}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// "posts" tags are plain strings (unlike "projects"' {label,value} pairs) --
// matches src/content/config.ts's `tags: z.array(z.string())` for posts.
function StringTagEditor({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (input.trim()) {
      onChange([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag and press Enter"
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={addTag}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export function DocumentEditor({ document, collection = "projects", onSave, onCancel }: DocumentEditorProps) {
  const isPosts = collection === "posts";

  const [formData, setFormData] = useState<Document>({
    ...document,
    title: document.title || "",
    content: document.content || "",
    status: document.status || "draft",
    slug: document.slug || "",
    coverImage: document.coverImage || "",
    ...(isPosts
      ? {
          tags: (document.tags as string[]) || [],
          author: (document.author as string) || "John Henry",
          description: document.description || "",
          date: document.date || "",
          heroImage: document.heroImage || "",
          alt: document.alt || "",
        }
      : {
          tags: (document.tags as Tag[]) || [],
          author: (document.author as Author) || { name: "", picture: "" },
          type: document.type || "::app::",
          color: document.color || "rose",
          url: document.url || "",
          video: document.video || "",
        }),
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleCoverUpload = async (file: File) => {
    setUploadError(null);
    setUploading(true);
    try {
      const dataBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          // reader.result is "data:<mime>;base64,<data>" -- keep just the data.
          const result = reader.result as string;
          resolve(result.slice(result.indexOf(",") + 1));
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      const response = await fetch("/api/instatic/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collection, filename: file.name, dataBase64 }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }

      const { url } = await response.json();
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        ...formData,
        status: "published",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAsDraft = async () => {
    setSaving(true);
    try {
      await onSave({
        ...formData,
        status: "draft",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold mb-8">
            {formData.title || (isPosts ? "New Post" : "New Project")}
          </h1>
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>
          </div>

          {isPosts ? (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="text"
                  id="date"
                  placeholder="e.g. 4 July 2026"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="heroImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hero Image URL
                </label>
                <input
                  type="text"
                  id="heroImage"
                  value={formData.heroImage}
                  onChange={(e) =>
                    setFormData({ ...formData, heroImage: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="alt"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hero Image Alt Text
                </label>
                <input
                  type="text"
                  id="alt"
                  value={formData.alt}
                  onChange={(e) =>
                    setFormData({ ...formData, alt: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={formData.author as string}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-700"
                >
                  Video URL
                </label>
                <input
                  type="text"
                  id="video"
                  value={formData.video}
                  onChange={(e) =>
                    setFormData({ ...formData, video: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as Document["type"] })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                >
                  <option value="::app::">App</option>
                  <option value="::code::">Code</option>
                  <option value="::library::">Library</option>
                  <option value="::design::">Design</option>
                </select>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color
                </label>
                <select
                  id="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value as Document["color"] })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                >
                  <option value="rose">Rose</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.coverImage ? (
                // Admin preview thumbnail for an arbitrary CMS-supplied URL,
                // not a public-facing perf-critical image -- avoids next/image's
                // required width/height.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="mx-auto h-32 w-auto object-cover"
                />
              ) : (
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <span className="material-icons text-4xl">image</span>
                </div>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="cover-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                >
                  <span>{uploading ? "Uploading..." : "Upload a file"}</span>
                  <input
                    id="cover-upload"
                    name="cover-upload"
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleCoverUpload(file);
                      }
                      e.target.value = ""; // allow re-selecting the same file later
                    }}
                  />
                </label>
              </div>
              {uploadError && (
                <p className="text-sm text-red-600">{uploadError}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={8}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          {isPosts ? (
            <StringTagEditor
              tags={(formData.tags as string[]) || []}
              onChange={(tags) => setFormData({ ...formData, tags })}
            />
          ) : (
            <TagEditor
              tags={(formData.tags as Tag[]) || []}
              onChange={(tags) => setFormData({ ...formData, tags })}
            />
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAsDraft}
            disabled={saving}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save as Draft"}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>
    </form>
  );
}
