"use client";

import React, { useState } from "react";
import { Activity, X, Sparkles, Rocket, Zap, Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const GenZPortfolio = () => {
  const [activeSection, setActiveSection] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);

  const projects = [
    {
      id: 1,
      title: "✨ AI Vibes Generator",
      type: "code",
      description: "Trained an AI to create aesthetic vibes",
      stats: "10k+ monthly users",
      tags: ["AI/ML", "React", "Vibes"],
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
    {
      id: 2,
      title: "🎮 Gaming Community",
      type: "design",
      description: "Built different gaming spaces",
      stats: "50k+ active gamers",
      tags: ["Community", "Gaming", "Social"],
      color: "bg-gradient-to-br from-green-400 to-blue-500",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "Why AI is Actually Based",
      emoji: "🤖",
      readTime: "4 min",
      vibe: "tech",
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    },
    {
      id: 2,
      title: "Design Tips That Hit Different",
      emoji: "💫",
      readTime: "3 min",
      vibe: "design",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 relative">
        <div className="text-6xl font-bold mb-4 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            hey, i'm alex
          </span>
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-xl text-gray-400">making the web go brr ⚡️</p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 snap-x">
        {["work", "about", "blog", "contact"].map((section) => (
          <Button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`
              px-6 py-3 rounded-full flex items-center gap-2 snap-start
              ${
                activeSection === section
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  : "bg-gray-900 hover:bg-gray-800"
              }
            `}
          >
            {section === "work" && <Rocket className="w-4 h-4" />}
            {section === "about" && <Activity className="w-4 h-4" />}
            {section === "blog" && <Zap className="w-4 h-4" />}
            {section === "contact" && <Heart className="w-4 h-4" />}
            {section}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeSection === "work" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`
                  ${project.color} p-1 rounded-3xl cursor-pointer 
                  transform transition-all hover:scale-105 hover:rotate-1
                `}
                onClick={() => setSelectedItem(project)}
              >
                <Card className="bg-gray-900 p-6 rounded-2xl h-full">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-gray-800 hover:bg-gray-700 text-white"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{project.stats}</p>
                </Card>
              </div>
            ))}
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-8">
            <Card className="bg-gray-900 p-8 rounded-3xl border-2 border-purple-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Star className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">digital creator</h2>
                  <p className="text-gray-400">
                    building vibes in the digital space since '20
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {["React", "Design", "AI/ML"].map((skill, index) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{skill}</span>
                      <span className="text-purple-400">pro status</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{
                          width: `${90 - index * 10}%`,
                          transition: "width 1s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeSection === "blog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`
                  ${post.color} p-1 rounded-3xl cursor-pointer
                  transform transition-all hover:scale-105 hover:-rotate-1
                `}
                onClick={() => setSelectedItem(post)}
              >
                <Card className="bg-gray-900 p-6 rounded-2xl h-full">
                  <div className="text-4xl mb-4">{post.emoji}</div>
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-gray-800 hover:bg-gray-700 text-white">
                      {post.vibe}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {activeSection === "contact" && (
          <Card className="bg-gray-900 p-8 rounded-3xl border-2 border-cyan-500">
            <h2 className="text-3xl font-bold mb-6">
              let's create something cool ✨
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { text: "twitter", color: "from-blue-400 to-cyan-400" },
                { text: "github", color: "from-purple-400 to-pink-400" },
                { text: "discord", color: "from-indigo-400 to-purple-400" },
                { text: "email", color: "from-green-400 to-emerald-400" },
              ].map((link) => (
                <Button
                  key={link.text}
                  className={`
                    bg-gradient-to-r ${link.color} 
                    rounded-xl py-6 text-lg font-medium
                    transform transition-all hover:scale-105
                  `}
                >
                  {link.text} →
                </Button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-gray-900 text-white border-2 border-purple-500">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedItem?.title}
            </DialogTitle>
            <Button
              className="absolute right-4 top-4 p-2"
              variant="ghost"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-400">{selectedItem?.description}</p>
            {selectedItem?.stats && (
              <div className="mt-4 p-4 bg-gray-800 rounded-xl">
                <p className="font-medium">Stats</p>
                <p className="text-gray-400">{selectedItem.stats}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenZPortfolio;
