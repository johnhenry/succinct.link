"use client";

"use tailwind colors: bg-green-400/10 text-green-400";
"use tailwind colors: bg-yellow-400/10 text-yellow-400";
"use tailwind colors: bg-blue-400/10 text-blue-400";
"use tailwind colors: bg-red-400/10 text-red-400";
"use tailwind colors: bg-rose-400/10 text-rose-400";
"use tailwind colors: bg-purple-400/10 text-purple-400";
"use tailwind colors: bg-sky-400/10 text-sky-400";
"use tailwind colors: bg-teal-400/10 text-teal-400";
"use tailwind colors: bg-orange-400/10 text-orange-400";
"use tailwind colors: bg-emerald-400/10 text-emerald-400";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Timer,
  ArrowRight,
  Palette,
  Code,
  X,
  ExternalLink,
  MessageSquare,
  Mail,
  Terminal,
  Activity,
  Layers,
  CheckCircle,
  Type,
  Video,
} from "lucide-react";
import tagTransformations from "@/lib/tagTransformations";
import typeTransformations from "@/lib/typeTransformations";

const templates = [
  { id: 1, name: "Pitch Deck", slides: 5, time: "3 min" },
  { id: 2, name: "Project Update", slides: 3, time: "2 min" },
  { id: 3, name: "Team Brief", slides: 4, time: "2.5 min" },
];

const skills = [
  { name: "Frontend", level: 92, color: "blue" },
  { name: "Backend", level: 88, color: "green" },
  { name: "UI/UX", level: 85, color: "rose" },
];

const careerTimeline = [
  { period: "2020 - Present", role: "Senior Frontend Engineer at XYZ Corp" },
  { period: "2017 - 2020", role: "UI/UX Designer at ABC Studio" },
  { period: "2015 - 2017", role: "Technical Writer at DocumentationPro" },
];

const SkillBar = ({ skill }) => (
  <div className="mb-4">
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
);

const ProjectModal = ({ project, onClose }) => (
  <Dialog open={!!project} onOpenChange={() => onClose()}>
    <DialogContent className="sm:max-w-2xl bg-gray-900/95">
      <DialogHeader>
        <div className="flex justify-between items-start mb-6">
          <div>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {project?.title}
            </DialogTitle>
            <div className="flex gap-2">
              {project?.tags.map((tag) => {
                return (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/10 text-white"
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </DialogHeader>

      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          {Object.entries(project?.metrics || {}).map(([key, value]) => (
            <div key={key}>
              <p className="text-2xl font-bold text-white mb-1">{value}</p>
              <p className="text-sm text-white/60">{key}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-white/80 mb-6">{project?.content}</p>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="text-white bg-white/10 hover:bg-white/20"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Live
        </Button>
        <Button
          variant="outline"
          className="text-white bg-white/10 hover:bg-white/20"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Case Study
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

import { useProjects } from "./project-provider";
const Homepage = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isReading] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [tagsMenuCollapsed, setTagsMenuCollapsed] = useState(false);
  const projects = useProjects();

  // Get unique tags from all projects
  const uniqueTags = React.useMemo(() => {
    const allTags = projects.flatMap((project) =>
      project.tags.map((tag) => (typeof tag === "object" ? tag.value : tag))
    );
    return [...new Set(allTags)];
  }, [projects]);

  // Filter projects by selected tag
  const filteredProjects = React.useMemo(() => {
    if (!selectedTag) return projects;

    return projects.filter((project) =>
      project.tags.some((tag) =>
        typeof tag === "object"
          ? tag.value === selectedTag
          : tag === selectedTag
      )
    );
  }, [projects, selectedTag]);

  const handleWritingAnalysis = (e) => {
    e.preventDefault();
    setFeedback({
      wordCount: text.split(/\s+/).filter(Boolean).length,
      suggestions: [
        "Consider removing redundant adjectives",
        "Your opening could be stronger",
      ],
    });
  };
  const TABS = ["projects"]; // TODO Re-add: "templates", "writing", "about"

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-900 to-rose-900 pt-12">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div
          className={`h-full bg-violet-400 transition-all duration-300 ${
            isReading ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: isReading ? "100%" : "0%" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 right-8 bg-white/10 backdrop-blur-lg rounded-full p-2 z-40">
        <div className="flex gap-2">
          {TABS.map((section) => (
            <button
              key={section}
              onClick={() => setActiveTab(section)}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === section
                  ? "bg-white text-violet-900"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* <Sparkles className="w-8 h-8" /> */}
            <h1 className="text-5xl font-bold">John Henry</h1>
          </div>
          <p className="text-2xl mb-2">JavaScript AI Engineer</p>
          <p className="text-lg text-white/80">Every project tells a story.</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Work Section */}
          {activeTab === "projects" && (
            <div>
              {/* Tags sub-menu with toggle */}
              <div className="mb-6 relative">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">Filter by tags</h3>
                  <button
                    onClick={() => setTagsMenuCollapsed(!tagsMenuCollapsed)}
                    className="text-white/60 hover:text-white"
                  >
                    {tagsMenuCollapsed ? "Show filters" : "Hide filters"}
                  </button>
                </div>

                {!tagsMenuCollapsed && (
                  <div className="w-full">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full transition ${
                          !selectedTag
                            ? "bg-white text-violet-900"
                            : "text-white hover:bg-white/20"
                        }`}
                      >
                        All
                      </button>
                      {uniqueTags.map((tag) => {
                        const TAG = tagTransformations[tag];
                        return TAG ? (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
                              selectedTag === tag
                                ? "bg-white text-violet-900"
                                : `${TAG.bg} ${TAG.color}`
                            }`}
                          >
                            {TAG.icon}
                            {TAG.text}
                          </button>
                        ) : (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full transition ${
                              selectedTag === tag
                                ? "bg-white text-violet-900"
                                : "text-white hover:bg-white/20"
                            }`}
                          >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <div
                    key={index}
                    // onClick={() => setSelectedProject(project)}
                    className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-2xl p-8 pb-2 text-left transition-all duration-300 border border-white/10 hover:border-white/30 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      {typeTransformations[project.type]}
                      {project.type === "code" && (
                        <Code className="w-6 h-6 text-blue-400" />
                      )}
                      {project.type === "design" && (
                        <Palette className="w-6 h-6 text-rose-400" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80 mb-6">{project?.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(({ label, value }, index) => {
                        if (tagTransformations[value]) {
                          const TAG = tagTransformations[value];
                          return (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`flex flex-row gap-2 ${TAG.bg} ${TAG.color}`}
                            >
                              {TAG.icon}
                              {TAG.text}
                            </Badge>
                          );
                        }
                        return (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-white/10 text-white"
                          >
                            {label}
                          </Badge>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 pb-4 justify-end text-white/0 transition-all duration-300 group-hover:text-white/100">
                      {project.video && (
                        <a href={project.video} target="_blank">
                          <Video className="w-6 h-6 text-sm flex items-center gap-2" />
                        </a>
                      )}
                      <a href={project.url} target="_blank">
                        <ArrowRight className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Templates Section */}
          {activeTab === "templates" && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Choose Your Template
                </h2>
                <p className="text-white/60">
                  All templates follow the 1-minute-per-slide rule
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setActiveTemplate(template)}
                    className={`p-6 rounded-lg border-2 transition text-left ${
                      activeTemplate?.id === template.id
                        ? "border-violet-400 bg-white/10"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Layers className="w-6 h-6 text-violet-400" />
                      <span className="text-sm text-violet-400 font-medium">
                        {template.time}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-white/60">
                      {template.slides} slides
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Writing Analysis Section */}
          {activeTab === "writing" && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
              <form onSubmit={handleWritingAnalysis} className="space-y-4">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your text here for instant feedback on clarity and concision..."
                  className="w-full h-48 p-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-400 text-white placeholder-white/40"
                  required
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-white/60">
                    <Timer className="inline w-4 h-4 mr-1" />
                    Average response time: 2 seconds
                  </div>
                  <Button
                    type="submit"
                    className="bg-violet-600 text-white hover:bg-violet-700"
                  >
                    Get Feedback
                    <MessageSquare className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>

              {feedback && (
                <div className="mt-8 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h3 className="font-semibold text-white">Word Count</h3>
                      <p className="text-2xl text-violet-400">
                        {feedback.wordCount}
                      </p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h3 className="font-semibold text-white">
                        Clarity Score
                      </h3>
                      <p className="text-2xl text-violet-400">8/10</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h3 className="font-semibold text-white">Concision</h3>
                      <p className="text-2xl text-violet-400">Good</p>
                    </div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h3 className="font-semibold text-white mb-2">
                      Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {feedback.suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-white/80"
                        >
                          <CheckCircle className="w-5 h-5 text-violet-400 mt-1" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* About Section */}
          {activeTab === "about" && (
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Core Competencies
                </h3>
                {skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Smart Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Type className="w-5 h-5 text-violet-400" />
                    <span className="text-white/80">Clear Communication</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-violet-400" />
                    <span className="text-white/80">Technical Excellence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-violet-400" />
                    <span className="text-white/80">Data-Driven Approach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-violet-400" />
                    <span className="text-white/80">Quality Assurance</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Career Timeline
                </h3>
                <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:h-[calc(100%-20px)] before:w-0.5 before:bg-gradient-to-b before:from-violet-400 before:to-rose-400">
                  {careerTimeline.map((item, index) => (
                    <div key={index} className="pl-8 relative">
                      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
                      <p className="text-violet-400 font-semibold">
                        {item.period}
                      </p>
                      <p className="text-white/80">{item.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Quick Contact Button */}
      <a
        className="fixed bottom-8 right-8 bg-violet-500 hover:bg-violet-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-40"
        href={`mailto:${"john@iamjohnhenry.com"}`}
      >
        <Mail className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Homepage;
