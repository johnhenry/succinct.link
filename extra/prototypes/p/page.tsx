"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto backdrop-blur-lg bg-white/30 rounded-xl shadow-lg border border-white/20 p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          succinct.link
        </h1>
        <p className="text-gray-600 text-center">Clarity through brevity</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="work" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-md rounded-xl p-1">
            <TabsTrigger
              value="work"
              className="data-[state=active]:bg-white/40"
            >
              Work
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-white/40"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="data-[state=active]:bg-white/40"
            >
              Blog
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-white/40"
            >
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="space-y-4">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div className="flex gap-2">
                {["all", "code", "design"].map((type) => (
                  <Button
                    key={type}
                    variant={projectFilter === type ? "default" : "secondary"}
                    onClick={() => setProjectFilter(type)}
                    className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm
                              ${
                                projectFilter === type
                                  ? "shadow-inner bg-white/40"
                                  : "shadow-lg"
                              }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
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
                  <div
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="backdrop-blur-lg bg-white/30 rounded-xl p-6
                             shadow-lg border border-white/20 cursor-pointer
                             transition-all duration-300 hover:shadow-xl
                             hover:translate-y-[-2px]"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {project.title}
                      </h3>
                      <Badge className="bg-white/50">{project.type}</Badge>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-white/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{project.duration}</p>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div
              className="backdrop-blur-lg bg-white/30 rounded-xl p-8
                          shadow-lg border border-white/20"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                About Me
              </h2>
              <p className="text-gray-700 mb-8">
                Professional developer focused on creating elegant solutions to
                complex problems. Specializing in web development, system
                architecture, and user experience design.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Experience",
                    value: "5+ Years",
                    subtitle: "Professional Development",
                  },
                  {
                    title: "Projects",
                    value: "50+",
                    subtitle: "Completed Projects",
                  },
                  { title: "Skills", tags: ["React", "Node.js", "UI/UX"] },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-white/20 rounded-xl p-6
                                            shadow-lg border border-white/20 text-center"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    {item.value ? (
                      <>
                        <Badge className="bg-white/50 mb-2">{item.value}</Badge>
                        <p className="text-sm text-gray-700">{item.subtitle}</p>
                      </>
                    ) : (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-white/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div className="flex gap-2">
                {["all", "featured"].map((type) => (
                  <Button
                    key={type}
                    variant={postFilter === type ? "default" : "secondary"}
                    onClick={() => setPostFilter(type)}
                    className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm
                              ${
                                postFilter === type
                                  ? "shadow-inner bg-white/40"
                                  : "shadow-lg"
                              }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
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
                  <div
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className={`backdrop-blur-lg bg-white/30 rounded-xl p-6
                              shadow-lg border cursor-pointer
                              transition-all duration-300 hover:shadow-xl
                              hover:translate-y-[-2px]
                              ${
                                post.featured
                                  ? "border-white/50"
                                  : "border-white/20"
                              }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <Badge className="bg-white/50">Featured</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                      <span>{post.readingTime}</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {post.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="bg-white/30"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{post.excerpt}</p>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div
              className="backdrop-blur-lg bg-white/30 rounded-xl p-8
                          shadow-lg border border-white/20"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Get in Touch
              </h2>
              <div className="space-y-4">
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
                  <div className="flex gap-2">
                    {["GitHub", "LinkedIn", "Twitter"].map((platform) => (
                      <Button
                        key={platform}
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                  <Button className="bg-white/50 hover:bg-white/70">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Dialog
          open={!!activeProject}
          onOpenChange={() => setActiveProject(null)}
        >
          <DialogContent className="bg-white/90 backdrop-blur-xl">
            {activeProject && (
              <>
                <DialogHeader>
                  <DialogTitle>{activeProject.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className="bg-white/50">{activeProject.type}</Badge>
                    <Badge variant="outline">{activeProject.duration}</Badge>
                  </div>
                  <p className="text-gray-700">{activeProject.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Key Metrics</h4>
                    <p className="text-gray-700">{activeProject.metrics}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {activeProject.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-white/30"
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

        <Dialog open={!!activePost} onOpenChange={() => setActivePost(null)}>
          <DialogContent className="bg-white/90 backdrop-blur-xl">
            {activePost && (
              <>
                <DialogHeader>
                  <DialogTitle>{activePost.title}</DialogTitle>
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
                        className="bg-white/30"
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
