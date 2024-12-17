"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Rocket,
  Zap,
  Heart,
  Star,
  X,
  Github,
  Twitter,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GenZPortfolio = () => {
  const [activeSection, setActiveSection] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      id: 1,
      title: "✨ AI Vibes Generator",
      type: "code",
      description:
        "Trained an AI to create aesthetic vibes for your digital space",
      stats: "10k+ monthly users • 4.9 star rating",
      tags: ["AI/ML", "React", "Vibes"],
      metrics: [
        { name: "Users", value: 10000 },
        { name: "Rating", value: 4.9 },
        { name: "Updates", value: 52 },
      ],
    },
    {
      id: 2,
      title: "🎮 Gaming Community",
      type: "design",
      description: "Built different gaming spaces for next-gen players",
      stats: "50k+ active gamers • 12 min avg session",
      tags: ["Community", "Gaming", "Social"],
      metrics: [
        { name: "Users", value: 50000 },
        { name: "Sessions", value: 120000 },
        { name: "Events", value: 89 },
      ],
    },
  ];

  const posts = [
    {
      id: 1,
      title: "Why AI is Actually Based",
      emoji: "🤖",
      readTime: "4 min",
      vibe: "tech",
      content: "A deep dive into why AI is revolutionizing everything...",
    },
    {
      id: 2,
      title: "Design Tips That Hit Different",
      emoji: "💫",
      readTime: "3 min",
      vibe: "design",
      content: "Fresh perspectives on modern design principles...",
    },
  ];

  const skills = [
    { name: "React", level: 95 },
    { name: "Design", level: 88 },
    { name: "AI/ML", level: 82 },
  ];

  const skillsData = skills.map((skill) => ({
    name: skill.name,
    value: skill.level,
  }));

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-6xl font-bold mb-4 relative inline-block">
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            hey, i'm alex
          </span>
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400" />
        </h1>
        <p className="text-xl text-zinc-400">making the web go brr ⚡️</p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[
          { name: "work", icon: <Rocket className="w-4 h-4" /> },
          { name: "about", icon: <Star className="w-4 h-4" /> },
          { name: "blog", icon: <Zap className="w-4 h-4" /> },
          { name: "contact", icon: <Heart className="w-4 h-4" /> },
        ].map((section) => (
          <Button
            key={section.name}
            onClick={() => setActiveSection(section.name)}
            className={`
              px-6 py-3 rounded-full flex items-center gap-2
              ${
                activeSection === section.name
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }
            `}
          >
            {section.icon}
            {section.name}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeSection === "work" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className={`
                  bg-zinc-800 border-2 border-transparent hover:border-purple-500
                  transform transition-all duration-300 cursor-pointer
                  ${hoveredIndex === index ? "scale-105" : ""}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedItem(project)}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500">{project.stats}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-8">
            <Card className="bg-zinc-800 border-2 border-purple-500">
              <CardHeader>
                <CardTitle className="text-2xl">digital creator</CardTitle>
                <p className="text-zinc-400">
                  building vibes in the digital space since '20
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181b",
                          border: "1px solid #purple-500",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "blog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className={`
                  bg-zinc-800 border-2 border-transparent hover:border-purple-500
                  transform transition-all duration-300 cursor-pointer
                  ${hoveredIndex === index ? "scale-105" : ""}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedItem(post)}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{post.emoji}</div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-zinc-700 hover:bg-zinc-600 text-white">
                      {post.vibe}
                    </Badge>
                    <span className="text-sm text-zinc-500">
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === "contact" && (
          <Card className="bg-zinc-800 border-2 border-purple-500">
            <CardHeader>
              <CardTitle className="text-3xl">
                let's create something cool ✨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Twitter className="w-5 h-5" />, text: "twitter" },
                  { icon: <Github className="w-5 h-5" />, text: "github" },
                  {
                    icon: <MessageSquare className="w-5 h-5" />,
                    text: "discord",
                  },
                  { icon: <Mail className="w-5 h-5" />, text: "email" },
                ].map((link, index) => (
                  <Button
                    key={link.text}
                    className={`
                      bg-zinc-700 hover:bg-zinc-600
                      rounded-xl py-6 text-lg font-medium
                      transform transition-all hover:scale-105
                      flex items-center justify-center gap-2
                    `}
                  >
                    {link.icon}
                    {link.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-zinc-800 text-white border-2 border-purple-500">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 text-zinc-400">
                {selectedItem?.description || selectedItem?.content}
              </div>
              {selectedItem?.metrics && (
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedItem.metrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181b",
                          border: "1px solid #purple-500",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenZPortfolio;
