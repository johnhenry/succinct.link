"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample data structure remains the same as previous version
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    type: "code",
    duration: "3 months",
    tags: ["React", "Node.js", "MongoDB"],
    description:
      "Built a scalable e-commerce solution with modern architecture",
    metrics: "50% improvement in load times, 30% increase in conversions",
  },
  {
    id: 2,
    title: "Brand Identity System",
    type: "design",
    duration: "2 months",
    tags: ["Branding", "UI/UX", "Design System"],
    description: "Developed comprehensive brand guidelines and design system",
    metrics: "Implemented across 5 product lines, 20+ digital touchpoints",
  },
];

const posts = [
  {
    id: 1,
    title: "The Future of Web Development",
    featured: true,
    readingTime: "5 min",
    date: "2024-03-15",
    categories: ["Technology", "Web Dev"],
    excerpt: "Exploring emerging trends in web development and their impact",
  },
  {
    id: 2,
    title: "Designing for Accessibility",
    featured: false,
    readingTime: "8 min",
    date: "2024-03-10",
    categories: ["Design", "Accessibility"],
    excerpt: "Best practices for creating inclusive digital experiences",
  },
];

const PortfolioApp = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [postFilter, setPostFilter] = useState("all");

  const GlassCard = ({ children, className = "" }) => (
    <div
      className={`
      backdrop-blur-lg bg-white/30 rounded-xl
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      border border-white/20
      ${className}
    `}
    >
      {children}
    </div>
  );

  const NeumorphicButton = ({ children, active, ...props }) => (
    <button
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${
          active
            ? "bg-white/40 shadow-inner text-gray-800"
            : "bg-white/20 shadow-[4px_4px_10px_0_rgba(0,0,0,0.1),-4px_-4px_10px_0_rgba(255,255,255,0.9)]"
        }
        hover:shadow-inner hover:bg-white/30
      `}
      {...props}
    >
      {children}
    </button>
  );

  const ProjectCard = ({ project }) => (
    <GlassCard
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
      onClick={() => setActiveProject(project)}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {project.title}
          </h3>
          <Badge className="bg-white/50 text-gray-800">{project.type}</Badge>
        </div>
        <div className="flex gap-2 mb-2 flex-wrap">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-white/30 border-white/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-700">{project.duration}</p>
      </div>
    </GlassCard>
  );

  const BlogPostCard = ({ post }) => (
    <GlassCard
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]
                 ${post.featured ? "border-2 border-white/50" : ""}`}
      onClick={() => setActivePost(post)}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
          {post.featured && (
            <Badge className="bg-white/50 text-gray-800">Featured</Badge>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
          <span>{post.readingTime}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 mb-2 flex-wrap">
          {post.categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="bg-white/30 border-white/50"
            >
              {category}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-700">{post.excerpt}</p>
      </div>
    </GlassCard>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6 pt-12">
        <GlassCard className="mb-12 p-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 text-center">
            succinct.link
          </h1>
          <p className="text-gray-600 text-center">Clarity through brevity</p>
        </GlassCard>
        <Tabs defaultValue="work" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 p-1 bg-white/30 backdrop-blur-md rounded-xl">
            <TabsTrigger
              value="work"
              className="data-[state=active]:bg-white/50"
            >
              Work
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-white/50"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="data-[state=active]:bg-white/50"
            >
              Blog
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-white/50"
            >
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="space-y-4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div className="flex gap-2">
                <NeumorphicButton
                  active={projectFilter === "all"}
                  onClick={() => setProjectFilter("all")}
                >
                  All
                </NeumorphicButton>
                <NeumorphicButton
                  active={projectFilter === "code"}
                  onClick={() => setProjectFilter("code")}
                >
                  Code
                </NeumorphicButton>
                <NeumorphicButton
                  active={projectFilter === "design"}
                  onClick={() => setProjectFilter("design")}
                >
                  Design
                </NeumorphicButton>
              </div>
              <Input
                placeholder="Search projects..."
                className="w-64 bg-white/50 border-white/30 backdrop-blur-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects
                .filter(
                  (p) => projectFilter === "all" || p.type === projectFilter
                )
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <GlassCard>
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  About Me
                </h2>
                <p className="text-gray-700">
                  Professional developer focused on creating elegant solutions
                  to complex problems. Specializing in web development, system
                  architecture, and user experience design.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <GlassCard className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Experience
                    </h3>
                    <Badge className="bg-white/50 text-gray-800">
                      5+ Years
                    </Badge>
                    <p className="mt-2 text-sm text-gray-700">
                      Professional Development
                    </p>
                  </GlassCard>
                  <GlassCard className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Projects
                    </h3>
                    <Badge className="bg-white/50 text-gray-800">50+</Badge>
                    <p className="mt-2 text-sm text-gray-700">
                      Completed Projects
                    </p>
                  </GlassCard>
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge className="bg-white/30 border-white/50">
                        React
                      </Badge>
                      <Badge className="bg-white/30 border-white/50">
                        Node.js
                      </Badge>
                      <Badge className="bg-white/30 border-white/50">
                        UI/UX
                      </Badge>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div className="flex gap-2">
                <NeumorphicButton
                  active={postFilter === "all"}
                  onClick={() => setPostFilter("all")}
                >
                  All Posts
                </NeumorphicButton>
                <NeumorphicButton
                  active={postFilter === "featured"}
                  onClick={() => setPostFilter("featured")}
                >
                  Featured
                </NeumorphicButton>
              </div>
              <Input
                placeholder="Search posts..."
                className="w-64 bg-white/50 border-white/30 backdrop-blur-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts
                .filter(
                  (p) =>
                    postFilter === "all" ||
                    (postFilter === "featured" && p.featured)
                )
                .map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <GlassCard>
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Get in Touch
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Name"
                    className="bg-white/50 border-white/30 backdrop-blur-sm"
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-white/50 border-white/30 backdrop-blur-sm"
                  />
                </div>
                <Input
                  placeholder="Subject"
                  className="bg-white/50 border-white/30 backdrop-blur-sm"
                />
                <Textarea
                  placeholder="Message"
                  className="min-h-[150px] bg-white/50 border-white/30 backdrop-blur-sm"
                />
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex gap-4">
                    <NeumorphicButton>GitHub</NeumorphicButton>
                    <NeumorphicButton>LinkedIn</NeumorphicButton>
                    <NeumorphicButton>Twitter</NeumorphicButton>
                  </div>
                  <Button className="bg-white/50 hover:bg-white/70">
                    Send Message
                  </Button>
                </div>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
        <Dialog
          open={!!activeProject}
          onOpenChange={() => setActiveProject(null)}
        >
          <DialogContent className="bg-white/80 backdrop-blur-xl">
            {activeProject && (
              <>
                <DialogHeader>
                  <DialogTitle>{activeProject.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className="bg-white/50">{activeProject.type}</Badge>
                    <Badge
                      variant="outline"
                      className="bg-white/30 border-white/50"
                    >
                      {activeProject.duration}
                    </Badge>
                  </div>
                  <p className="text-gray-700">{activeProject.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">
                      Key Metrics
                    </h4>
                    <p className="text-gray-700">{activeProject.metrics}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {activeProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-white/30 border-white/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        // Previous data and component definitions remain the same until the
        Dialog components...
        <Dialog open={!!activePost} onOpenChange={() => setActivePost(null)}>
          <DialogContent className="bg-white/80 backdrop-blur-xl">
            {activePost && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-gray-800">
                    {activePost.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{activePost.readingTime}</span>
                    <span>
                      {new Date(activePost.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {activePost.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="bg-white/30 border-white/50"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-gray-700">{activePost.excerpt}</p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PortfolioApp;
