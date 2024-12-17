"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  Tag,
  User,
  Briefcase,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const PortfolioApp = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [blogFilter, setBlogFilter] = useState("all");

  // Sample data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      type: "code",
      duration: "3 months",
      tags: ["React", "Node.js", "MongoDB"],
      description:
        "Built a scalable e-commerce platform handling 10k+ daily users",
      metrics: "45% increase in conversion rate",
    },
    {
      id: 2,
      title: "Brand Identity System",
      type: "design",
      duration: "2 months",
      tags: ["Branding", "UI/UX", "Design Systems"],
      description: "Developed comprehensive brand guidelines and design system",
      metrics: "Implemented across 12 product lines",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "The Future of Web Development",
      category: "Technology",
      readingTime: "5 min",
      date: "2024-03-15",
      excerpt: "Exploring emerging trends in web development...",
      featured: true,
    },
    {
      id: 2,
      title: "Designing for Accessibility",
      category: "Design",
      readingTime: "4 min",
      date: "2024-03-10",
      excerpt: "Best practices for inclusive design...",
      featured: false,
    },
  ];

  const skills = [
    { name: "Frontend Development", level: 90 },
    { name: "UI/UX Design", level: 85 },
    { name: "Backend Development", level: 75 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">John Doe</h1>
        <p className="text-gray-600">Full Stack Developer & Designer</p>
      </header>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-1/2">
          <TabsTrigger value="work">
            <Briefcase className="w-4 h-4 mr-2" />
            Work
          </TabsTrigger>
          <TabsTrigger value="about">
            <User className="w-4 h-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="blog">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={projectFilter === "all" ? "default" : "outline"}
              onClick={() => setProjectFilter("all")}
            >
              All
            </Button>
            <Button
              variant={projectFilter === "code" ? "default" : "outline"}
              onClick={() => setProjectFilter("code")}
            >
              Code
            </Button>
            <Button
              variant={projectFilter === "design" ? "default" : "outline"}
              onClick={() => setProjectFilter("design")}
            >
              Design
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter(
                (p) => projectFilter === "all" || p.type === projectFilter
              )
              .map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {project.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Passionate full-stack developer with 8+ years of experience
                building scalable web applications and elegant user interfaces.
              </p>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={blogFilter === "all" ? "default" : "outline"}
              onClick={() => setBlogFilter("all")}
            >
              All Posts
            </Button>
            <Button
              variant={blogFilter === "featured" ? "default" : "outline"}
              onClick={() => setBlogFilter("featured")}
            >
              Featured
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts
              .filter(
                (p) =>
                  blogFilter === "all" ||
                  (blogFilter === "featured" && p.featured)
              )
              .map((post) => (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readingTime}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{post.category}</Badge>
                    <p className="mt-2 text-gray-600">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>Let's discuss your next project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button variant="outline" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Project Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription>
              <div className="space-y-4 mt-4">
                <p>{selectedProject?.description}</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedProject?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex flex-wrap gap-2">
                    {selectedProject?.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <strong>Key Metrics:</strong>
                  <p>{selectedProject?.metrics}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Blog Post Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedPost?.readingTime}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {selectedPost?.date}
                </span>
              </div>
              <Badge variant="secondary" className="mt-4">
                {selectedPost?.category}
              </Badge>
              <p className="mt-4">{selectedPost?.excerpt}</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioApp;
