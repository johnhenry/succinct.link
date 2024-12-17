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
import {
  Layout,
  Layers,
  CheckCircle,
  Type,
  ImageIcon,
  PlusCircle,
  ChevronRight,
  Github,
  Twitter,
  Mail,
} from "lucide-react";

const RemixPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Modern Web Platform",
      category: "Development",
      tags: ["React", "Next.js", "TypeScript"],
      description: "A scalable and performant web application with modern architecture",
      metrics: "95 Performance Score, 40% Faster Load Times",
    },
    {
      id: 2,
      title: "Design System",
      category: "Design",
      tags: ["UI/UX", "Components", "Documentation"],
      description: "Comprehensive design system with reusable components",
      metrics: "200+ Components, Used by 5 Teams",
    },
  ];

  const posts = [
    {
      id: 1,
      title: "Building Scalable Applications",
      date: "2024-03-15",
      readTime: "5 min",
      category: "Engineering",
      excerpt: "Learn the best practices for building scalable web applications",
    },
    {
      id: 2,
      title: "Modern Design Principles",
      date: "2024-03-10",
      readTime: "4 min",
      category: "Design",
      excerpt: "Exploring contemporary design principles and their implementation",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layout className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Portfolio Hub</h1>
          </div>
          <p className="text-xl text-gray-600">Showcase. Create. Inspire.</p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {project.title}
                      <Badge>{project.category}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{project.metrics}</p>
                      <Button 
                        onClick={() => {
                          setActiveProject(project);
                          setIsDialogOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{post.excerpt}</p>
                    <Badge className="mt-4">{post.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Textarea placeholder="Your Message" className="h-32" />
                  <Button className="w-full">Send Message</Button>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Project Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {activeProject?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-600">{activeProject?.description}</p>
              <div className="flex flex-wrap gap-2">
                {activeProject?.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500">{activeProject?.metrics}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RemixPage;