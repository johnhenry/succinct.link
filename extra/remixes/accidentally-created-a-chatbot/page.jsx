"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Sparkles, User } from 'lucide-react';

const ChatGPTPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: 'user', content: input },
      { role: 'assistant', content: 'This is a demo response. The actual ChatGPT integration would go here!' }
    ]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-green-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              ChatGPT Remix
            </h1>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-32">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <Card
              key={index}
              className={`p-6 ${
                message.role === 'assistant'
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-gray-700/50 border-gray-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${
                  message.role === 'assistant'
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {message.role === 'assistant' ? (
                    <MessageSquare className="w-5 h-5" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    {message.role === 'assistant' ? 'ChatGPT' : 'You'}
                  </p>
                  <p className="text-gray-200 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 w-full bg-gray-900/80 backdrop-blur-lg border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
              className="flex-1 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500"
            />
            <Button 
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTPage;
