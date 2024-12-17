"use client";
import React, { useState } from "react";
import {
  Layout,
  Layers,
  CheckCircle,
  Type,
  ImageIcon,
  ChevronRight,
} from "lucide-react";

const Homepage = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);

  const templates = [
    { id: 1, name: "Pitch Deck", slides: 5, time: "3 min" },
    { id: 2, name: "Project Update", slides: 3, time: "2 min" },
    { id: 3, name: "Team Brief", slides: 4, time: "2.5 min" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layout className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">succinct.link</h1>
          </div>
          <p className="text-xl text-gray-600">Less slides. More impact.</p>
          <p className="mt-2 text-gray-500">
            Create presentations that respect your audience&apos;s time
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Choose Your Template
            </h2>
            <p className="text-gray-600">
              All templates follow the 1-minute-per-slide rule
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setActiveTemplate(template)}
                className={`p-6 rounded-lg border-2 transition hover:border-indigo-500 text-left ${
                  activeTemplate?.id === template.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <Layers className="w-6 h-6 text-indigo-600" />
                  <span className="text-sm text-indigo-600 font-medium">
                    {template.time}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600">
                  {template.slides} slides
                </p>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Smart Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Type className="w-5 h-5 text-indigo-600" />
                <span>Word count limits per slide</span>
              </div>
              <div className="flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <span>One key visual per slide</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
                <span>AI-powered conciseness check</span>
              </div>
              <div className="flex items-center gap-3">
                <Layout className="w-5 h-5 text-indigo-600" />
                <span>Built-in presentation timer</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2">
              Start Creating
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Time-Optimized</h2>
            <p className="text-gray-600">
              Templates designed for optimal presentation length
            </p>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Message-Focused</h2>
            <p className="text-gray-600">
              One key point per slide, maximum impact
            </p>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Audience-First</h2>
            <p className="text-gray-600">
              Keep your audience engaged with concise, clear slides
            </p>
          </div>
        </div>

        {/* Sample Stats */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Trusted by presenters who value their audience&apos;s time
          </p>
          <div className="mt-4 grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-indigo-600">43%</p>
              <p className="text-sm text-gray-600">shorter presentations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">91%</p>
              <p className="text-sm text-gray-600">audience engagement</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-indigo-600">2.5x</p>
              <p className="text-sm text-gray-600">message retention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
