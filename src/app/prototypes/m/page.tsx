"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Rocket,
  Zap,
  Heart,
  Code2,
  Palette,
  ArrowUpRight,
  ExternalLink,
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
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const ModernPortfolio = () => {
  const [activeSection, setActiveSection] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      id: 1,
      title: "✨ AI Content Studio",
      type: "code",
      description: "AI-powered platform for content creation",
      tags: ["AI/ML", "React"],
      metrics: [
        { name: "Q1", value: 2500 },
        { name: "Q2", value: 5000 },
        { name: "Q3", value: 7500 },
        { name: "Q4", value: 10000 },
      ],
    },
    {
      id: 2,
      title: "🎨 Design System",
      type: "design",
      description: "Comprehensive design system for digital products",
      tags: ["UI/UX", "Systems"],
      metrics: [
        { name: "Q1", value: 15 },
        { name: "Q2", value: 28 },
        { name: "Q3", value: 38 },
        { name: "Q4", value: 50 },
      ],
    },
  ];

  const filteredProjects = projects.filter(
    (project) => projectFilter === "all" || project.type === projectFilter
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-4 md:p-8">
      {/* Decorative background elements */}
      <div className="fixed top-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="fixed bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative mb-12">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-sm rounded-full bg-slate-100 dark:bg-slate-800">
          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500" />
          Available for projects
        </div>
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:to-slate-200 text-transparent bg-clip-text">
            Hello, I'm Alex
          </span>
          <Sparkles className="inline-block ml-2 w-6 h-6 text-amber-400 animate-pulse" />
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Creating digital experiences ✨
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8">
        {[
          { name: "work", icon: <Rocket className="w-4 h-4" /> },
          { name: "about", icon: <Zap className="w-4 h-4" /> },
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

      {/* Project Filters */}
      {activeSection === "work" && (
        <div className="mb-8">
          <div className="flex gap-4">
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
              className="rounded-full flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              Development
            </Button>
            <Button
              variant={projectFilter === "design" ? "default" : "outline"}
              onClick={() => setProjectFilter("design")}
              className="rounded-full flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Design
            </Button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {activeSection === "work" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`
                group relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
                border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700
                transform transition-all duration-300 cursor-pointer
                ${hoveredIndex === index ? "scale-102" : ""}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedItem(project)}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="transition-transform hover:scale-105"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={project.metrics}>
                      <defs>
                        <linearGradient
                          id={`gradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#6366f1"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="#6366f1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#6366f1"
                        fill={`url(#gradient-${index})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* About Section */}
      {activeSection === "about" && (
        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Digital Creator & Developer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400">
              Passionate about creating intuitive and engaging digital
              experiences. Specializing in frontend development and user
              interface design.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Contact Section */}
      {activeSection === "contact" && (
        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Let's Connect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline" className="rounded-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" className="rounded-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <p>{selectedItem?.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedItem?.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModernPortfolio;
