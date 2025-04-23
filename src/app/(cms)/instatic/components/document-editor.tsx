"use client";

import { useState } from "react";
import Img from "next/image";
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
  url?: string;
  video?: string;
  type: "::code::" | "::app::" | "::library::" | "::design::";
  color: "rose" | "blue" | "green";
  slug: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: Tag[];
  author: Author;
  coverImage?: string;
}

interface DocumentEditorProps {
  document: Document;
  onSave: (doc: Document) => Promise<void>;
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

export function DocumentEditor({ document, onSave }: DocumentEditorProps) {
  const [formData, setFormData] = useState<Document>({
    ...document,
    tags: document.tags || [],
    author: document.author || { name: "", picture: "" },
    title: document.title || "",
    content: document.content || "",
    status: document.status || "draft",
    type: document.type || "::app::",
    color: document.color || "rose",
    slug: document.slug || "",
    url: document.url || "",
    video: document.video || "",
    coverImage: document.coverImage || "",
  });
  const [saving, setSaving] = useState(false);

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
            {formData.title || "New Project"}
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
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {formData.coverImage ? (
                <Img
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
                  <span>Upload a file</span>
                  <input
                    id="cover-upload"
                    name="cover-upload"
                    type="file"
                    className="sr-only"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        // Handle file upload here
                      }
                    }}
                  />
                </label>
              </div>
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
          <TagEditor
            tags={formData.tags}
            onChange={(tags) => setFormData({ ...formData, tags })}
          />
        </div>

        <div className="flex justify-end space-x-4">
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
