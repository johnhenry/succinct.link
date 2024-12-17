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

// Sample data structure
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

  const ProjectCard = ({ project }) => (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setActiveProject(project)}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <Badge variant="secondary">{project.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600">{project.duration}</p>
      </CardContent>
    </Card>
  );

  const BlogPostCard = ({ post }) => (
    <Card
      className={`hover:shadow-lg transition-shadow cursor-pointer 
                     ${post.featured ? "border-2 border-primary" : ""}`}
      onClick={() => setActivePost(post)}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{post.title}</CardTitle>
          {post.featured && <Badge>Featured</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          <span>{post.readingTime}</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 mb-2">
          {post.categories.map((category) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
        <p className="text-sm">{post.excerpt}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">succinct.link</h1>
        <p className="text-gray-600">Clarity through brevity</p>
      </header>

      <Tabs defaultValue="work" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
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
            <div className="w-64">
              <Input placeholder="Search projects..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p>
                  Professional developer focused on creating elegant solutions
                  to complex problems. Specializing in web development, system
                  architecture, and user experience design.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge className="w-full justify-center">5+ Years</Badge>
                      <p className="text-sm text-center">
                        Professional Development
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge className="w-full justify-center">50+</Badge>
                      <p className="text-sm text-center">Completed Projects</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Node.js</Badge>
                      <Badge variant="outline">UI/UX</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button
                variant={postFilter === "all" ? "default" : "outline"}
                onClick={() => setPostFilter("all")}
              >
                All Posts
              </Button>
              <Button
                variant={postFilter === "featured" ? "default" : "outline"}
                onClick={() => setPostFilter("featured")}
              >
                Featured
              </Button>
            </div>
            <div className="w-64">
              <Input placeholder="Search posts..." />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input placeholder="Email" type="email" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Message" className="min-h-[150px]" />
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button variant="outline">GitHub</Button>
                  <Button variant="outline">LinkedIn</Button>
                  <Button variant="outline">Twitter</Button>
                </div>
                <Button>Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={!!activeProject}
        onOpenChange={() => setActiveProject(null)}
      >
        <DialogContent className="max-w-2xl">
          {activeProject && (
            <>
              <DialogHeader>
                <DialogTitle>{activeProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge>{activeProject.type}</Badge>
                  <Badge variant="outline">{activeProject.duration}</Badge>
                </div>
                <p>{activeProject.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Key Metrics</h4>
                  <p>{activeProject.metrics}</p>
                </div>
                <div className="flex gap-2">
                  {activeProject.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!activePost} onOpenChange={() => setActivePost(null)}>
        <DialogContent className="max-w-2xl">
          {activePost && (
            <>
              <DialogHeader>
                <DialogTitle>{activePost.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{activePost.readingTime}</span>
                  <span>{new Date(activePost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  {activePost.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
                <p>{activePost.excerpt}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioApp;
