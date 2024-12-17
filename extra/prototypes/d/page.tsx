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
} from "lucide-react";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("work");

  const projects = [
    { id: 1, title: "E-Commerce Platform", duration: "2 mins", type: "code" },
    { id: 2, title: "Brand Identity", duration: "1 min", type: "design" },
    { id: 3, title: "Content Strategy", duration: "3 mins", type: "writing" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-900 to-rose-900">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Floating Navigation */}
        <nav className="fixed top-8 right-8 bg-white/10 backdrop-blur-lg rounded-full p-2 z-50">
          <div className="flex gap-2">
            {["work", "about", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-full transition ${
                  activeSection === section
                    ? "bg-white text-violet-900"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </nav>

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

        {/* Main Content Area */}
        <div className="grid gap-8">
          {/* Time Promise */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white text-center">
            <Timer className="w-6 h-6 mx-auto mb-3" />
            <p className="text-lg">3-minute portfolio experience</p>
            <div className="mt-2 flex justify-center gap-4 text-sm text-white/80">
              <span>7 projects</span>
              <span>•</span>
              <span>3 case studies</span>
              <span>•</span>
              <span>1 bio</span>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <button
                key={project.id}
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
                <div className="flex items-center gap-2 text-white/60">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Quick view</span>
                </div>
                <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-white/0 group-hover:text-white/100 transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center text-white">
              <p className="text-3xl font-bold mb-2">27k</p>
              <p className="text-sm text-white/60">Lines of Code</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center text-white">
              <p className="text-3xl font-bold mb-2">14</p>
              <p className="text-sm text-white/60">Happy Clients</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center text-white">
              <p className="text-3xl font-bold mb-2">3</p>
              <p className="text-sm text-white/60">Min to Review</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mt-8">
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
      </div>
    </div>
  );
};

export default Homepage;
