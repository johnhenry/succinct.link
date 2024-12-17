"use client";

import React, { useState } from "react";
import { MessageSquare, Scissors, Timer, ThumbsUp } from "lucide-react";

const Homepage = () => {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({
      wordCount: text.split(/\s+/).filter(Boolean).length,
      suggestions: [
        "Consider removing redundant adjectives",
        "Your opening could be stronger",
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scissors className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">succinct.link</h1>
          </div>
          <p className="text-xl text-gray-600">
            Get straight to the point. Get better feedback.
          </p>
          <p className="mt-2 text-gray-500">
            AI-powered writing feedback that helps you cut the fluff
          </p>
        </div>

        {/* Main Editor */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here for instant feedback on clarity and concision..."
              className="w-full h-48 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <Timer className="inline w-4 h-4 mr-1" />
                Average response time: 2 seconds
              </div>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
              >
                Get Feedback
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Feedback Display */}
          {feedback && (
            <div className="mt-8 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold">Word Count</h3>
                  <p className="text-2xl text-emerald-600">
                    {feedback.wordCount}
                  </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold">Clarity Score</h3>
                  <p className="text-2xl text-emerald-600">8/10</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h3 className="font-semibold">Concision</h3>
                  <p className="text-2xl text-emerald-600">Good</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Suggestions</h3>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ThumbsUp className="w-5 h-5 text-emerald-600 mt-1" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Instant Analysis</h2>
            <p className="text-gray-600">
              Get immediate feedback on your writing&apos;s clarity and concision
            </p>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">AI-Powered</h2>
            <p className="text-gray-600">
              Advanced algorithms help identify redundancy and suggest
              improvements
            </p>
          </div>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">
              Practice Makes Perfect
            </h2>
            <p className="text-gray-600">
              Learn to write more effectively with each submission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
