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
  Filter,
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

const ModernPortfolio = () => {
  const [activeSection, setActiveSection] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "✨ AI Content Studio",
      type: "code",
      description:
        "Developed an AI-powered content creation platform focused on accessibility and innovation",
      stats: "10k+ active users • 4.9 rating",
      tags: ["AI/ML", "React", "Accessibility"],
      metrics: [
        { name: "Users", value: 10000 },
        { name: "Rating", value: 4.9 },
        { name: "Updates", value: 52 },
      ],
    },
    {
      id: 2,
      title: "🎨 Design System",
      type: "design",
      description:
        "Created a comprehensive design system for modern digital products",
      stats: "50+ components • 12 partner teams",
      tags: ["Design Systems", "UI/UX", "Documentation"],
      metrics: [
        { name: "Components", value: 50 },
        { name: "Teams", value: 12 },
        { name: "Updates", value: 89 },
      ],
    },
    {
      id: 3,
      title: "📱 Social Platform",
      type: "code",
      description:
        "Built a next-gen social platform focusing on authentic connections",
      stats: "25k+ users • 35min avg. session",
      tags: ["React", "Node.js", "Real-time"],
      metrics: [
        { name: "Users", value: 25000 },
        { name: "Sessions", value: 15000 },
        { name: "Features", value: 42 },
      ],
    },
  ];

  const posts = [
    {
      id: 1,
      title: "The Future of AI in Design",
      emoji: "🎨",
      readTime: "4 min",
      category: "Technology",
      content: "Exploring how AI is enhancing creative workflows...",
    },
    {
      id: 2,
      title: "Creating Intuitive Interfaces",
      emoji: "✨",
      readTime: "3 min",
      category: "Design",
      content: "Modern approaches to user interface design...",
    },
  ];

  const skills = [
    { name: "Frontend", level: 95 },
    { name: "Design", level: 88 },
    { name: "AI/ML", level: 82 },
  ];

  const skillsData = skills.map((skill) => ({
    name: skill.name,
    value: skill.level,
  }));

  const filteredProjects = projects.filter(
    (project) => projectFilter === "all" || project.type === projectFilter
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 relative inline-block">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-200 text-transparent bg-clip-text">
            Hello, I'm Alex
          </span>
          <Sparkles className="absolute -top-4 -right-4 w-6 h-6 text-amber-400" />
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Creating digital experiences with purpose ✨
        </p>
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
            variant={activeSection === section.name ? "default" : "outline"}
            className="rounded-full flex items-center gap-2"
          >
            {section.icon}
            {section.name}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeSection === "work" && (
          <>
            {/* Project Filters */}
            <div className="flex gap-4 mb-6">
              <Button
                variant={projectFilter === "all" ? "default" : "outline"}
                onClick={() => setProjectFilter("all")}
                className="rounded-full"
              >
                All Projects
              </Button>
              <Button
                variant={projectFilter === "code" ? "default" : "outline"}
                onClick={() => setProjectFilter("code")}
                className="rounded-full"
              >
                Development
              </Button>
              <Button
                variant={projectFilter === "design" ? "default" : "outline"}
                onClick={() => setProjectFilter("design")}
                className="rounded-full"
              >
                Design
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`
                    bg-white dark:bg-slate-800 border-2 border-transparent
                    hover:border-slate-200 dark:hover:border-slate-700
                    transform transition-all duration-300 cursor-pointer
                    ${hoveredIndex === index ? "scale-102" : ""}
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedItem(project)}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {project.stats}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeSection === "about" && (
          <Card className="bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl">
                Digital Creator & Developer
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400">
                Crafting digital experiences since 2020
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "blog" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className={`
                  bg-white dark:bg-slate-800 border-2 border-transparent
                  hover:border-slate-200 dark:hover:border-slate-700
                  transform transition-all duration-300 cursor-pointer
                `}
                onClick={() => setSelectedItem(post)}
              >
                <CardHeader>
                  <div className="text-3xl mb-4">{post.emoji}</div>
                  <CardTitle className="text-2xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === "contact" && (
          <Card className="bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl">Let's Connect</CardTitle>
              <p className="text-slate-600 dark:text-slate-400">
                Always interested in hearing about new projects and
                opportunities
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <Twitter className="w-5 h-5" />, text: "Twitter" },
                  { icon: <Github className="w-5 h-5" />, text: "GitHub" },
                  {
                    icon: <MessageSquare className="w-5 h-5" />,
                    text: "Message",
                  },
                  { icon: <Mail className="w-5 h-5" />, text: "Email" },
                ].map((link) => (
                  <Button
                    key={link.text}
                    variant="outline"
                    className="h-12 text-lg flex items-center justify-center gap-2"
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
        <DialogContent className="bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedItem?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="mt-4 text-slate-600 dark:text-slate-400">
                {selectedItem?.description || selectedItem?.content}
              </div>
              {selectedItem?.metrics && (
                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedItem.metrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#6366f1"
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

export default ModernPortfolio;
