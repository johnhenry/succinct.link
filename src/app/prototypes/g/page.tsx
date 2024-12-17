"use client";
import React, { useState } from "react";
import {
  Sparkles,
  Link,
  Timer,
  Eye,
  ArrowRight,
  Palette,
  Code,
  Pen,
  X,
  Star,
  ExternalLink,
  MessageSquare,
  Calendar,
  User,
  Mail,
  Terminal,
  Bookmark,
  Box,
  Activity,
  Award,
  Coffee,
} from "lucide-react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      duration: "2 mins",
      type: "code",
      tags: ["React", "Node.js", "MongoDB"],
      metrics: {
        users: "50k+",
        conversion: "12%",
        performance: "98/100",
      },
      description: "Full-stack e-commerce solution with real-time inventory",
      color: "blue",
    },
    {
      id: 2,
      title: "Brand Identity System",
      duration: "1 min",
      type: "design",
      tags: ["Branding", "UI/UX", "Design System"],
      metrics: {
        components: "200+",
        brands: "5",
        satisfaction: "96%",
      },
      description: "Comprehensive design system for fintech startup",
      color: "rose",
    },
    {
      id: 3,
      title: "Content Strategy",
      duration: "3 mins",
      type: "writing",
      tags: ["Strategy", "Content", "SEO"],
      metrics: {
        traffic: "+225%",
        engagement: "4.5m",
        conversion: "18%",
      },
      description: "Data-driven content strategy for SaaS platform",
      color: "green",
    },
  ];

  const filters = [
    { id: "all", label: "All Work" },
    { id: "code", label: "Development" },
    { id: "design", label: "Design" },
    { id: "writing", label: "Writing" },
  ];

  const skills = [
    { name: "Frontend", level: 92, color: "blue" },
    { name: "Backend", level: 88, color: "green" },
    { name: "UI/UX", level: 85, color: "rose" },
  ];

  const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key}>
                  <p className="text-2xl font-bold text-white mb-1">{value}</p>
                  <p className="text-sm text-white/60">{key}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/80 mb-6">{project.description}</p>

          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition"
            >
              <ExternalLink className="w-4 h-4" />
              View Live
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition"
            >
              <MessageSquare className="w-4 h-4" />
              Case Study
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkTab = () => (
    <div>
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full transition whitespace-nowrap ${
              activeFilter === filter.id
                ? "bg-white text-violet-900"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects
          .filter(
            (project) => activeFilter === "all" || project.type === activeFilter
          )
          .map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-left transition-all duration-300 border border-white/10 hover:border-white/30"
            >
              <div className="flex justify-between items-start mb-4">
                {project.type === "code" && (
                  <Code className="w-6 h-6 text-blue-400" />
                )}
                {project.type === "design" && (
                  <Palette className="w-6 h-6 text-rose-400" />
                )}
                {project.type === "writing" && (
                  <Pen className="w-6 h-6 text-green-400" />
                )}
                <span className="text-white/60 text-sm flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  {project.duration}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <Eye className="w-4 h-4" />
                <span className="text-sm">View Project</span>
              </div>
              <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-white/0 group-hover:text-white/100 transition-all duration-300" />
            </button>
          ))}
      </div>
    </div>
  );

  const AboutTab = () => (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">John Developer</h2>
            <p className="text-white/60">Full-stack developer & UI designer</p>
          </div>
        </div>
        <p className="text-white/80 mb-6">
          Creating efficient, user-centric solutions at the intersection of
          design and development. 5+ years of experience in building scalable
          web applications.
        </p>

        <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
        {skills.map((skill) => (
          <div key={skill.name} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-white/80">{skill.name}</span>
              <span className="text-white/60">{skill.level}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-${skill.color}-400 transition-all duration-1000 ease-out`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Journey</h3>
        <div className="space-y-4">
          {[
            { year: "2024", event: "Started independent consulting" },
            { year: "2023", event: "Lead Developer at TechCorp" },
            { year: "2022", event: "First major project launch" },
          ].map((item, index) => (
            <div key={index} className="flex gap-4 text-white/80">
              <span className="text-sm text-white/60 w-16">{item.year}</span>
              <span>{item.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactTab = () => (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2">Name</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Email</label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Message</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 h-32" />
          </div>
          <button className="bg-white text-violet-900 px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition">
            Send Message
          </button>
        </form>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="#"
            className="flex items-center gap-3 text-white/80 hover:text-white transition"
          >
            <Link className="w-5 h-5" />
            <span>succinct.link/github</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-white/80 hover:text-white transition"
          >
            <Link className="w-5 h-5" />
            <span>succinct.link/linkedin</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-white/80 hover:text-white transition"
          >
            <Link className="w-5 h-5" />
            <span>succinct.link/twitter</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-900 to-rose-900">
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-5xl font-bold">succinct.link</h1>
          </div>
          <p className="text-2xl mb-2">Your work. Clearly presented.</p>
          <p className="text-lg text-white/80">
            Every project tells a story. Make it count.
          </p>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-full p-2">
            <div className="flex gap-2">
              {["work", "about", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full transition ${
                    activeTab === tab
                      ? "bg-white text-violet-900"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[60vh]">
          {activeTab === "work" && <WorkTab />}
          {activeTab === "about" && <AboutTab />}
          {activeTab === "contact" && <ContactTab />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
