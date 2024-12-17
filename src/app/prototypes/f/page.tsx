"use client";

import React, { useState } from "react";
import {
  Mail,
  Terminal,
  Activity,
} from "lucide-react";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("work");

  const skills = [
    { name: "Frontend", level: 92, color: "blue" },
    { name: "Backend", level: 88, color: "green" },
    { name: "UI/UX", level: 85, color: "rose" },
  ];

  const achievements = [
    { icon: null, text: "Featured on Product Hunt", date: "2024" },
    { icon: null, text: "Best Design Portfolio", date: "2023" },
    { icon: null, text: "10k+ Lines of Code", date: "2023" },
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

  const CurrentStatus = () => (
    <div className="fixed bottom-8 left-8 bg-white/10 backdrop-blur-lg rounded-full p-3 z-40">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-sm">Available for work</span>
        </div>
      </div>
    </div>
  );

  const FloatingNav = () => (
    <nav className="fixed top-8 right-8 bg-white/10 backdrop-blur-lg rounded-full p-2 z-40">
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
  );

  const AchievementCard = ({ achievement }) => (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-white/90">{achievement.text}</p>
          <p className="text-sm text-white/60">{achievement.date}</p>
        </div>
      </div>
    </div>
  );

  const QuickContact = () => (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={() => setActiveSection("contact")}
        className="bg-violet-500 hover:bg-violet-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Mail className="w-6 h-6" />
      </button>
    </div>
  );

  const CommandPalette = () => (
    <div className="fixed top-8 left-8 bg-white/10 backdrop-blur-lg rounded-full p-2 z-40">
      <button className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition">
        <Terminal className="w-4 h-4" />
        <span className="text-sm">Press / to search</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-900 to-rose-900">
      <FloatingNav />
      <CurrentStatus />
      <CommandPalette />
      <QuickContact />

      {/* Rest of the existing component structure... */}

      {/* New Sections */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Skills Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Core Competencies
          </h3>
          {skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>

        {/* Achievements Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>

        {/* Currently Building Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-bold text-white">Currently Building</h3>
          </div>
          <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
            <Activity className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-white">Next-Gen Analytics Dashboard</p>
              <p className="text-sm text-white/60">Shipping in 2 weeks</p>
            </div>
          </div>
        </div>

        {/* Bookmarks/Resources Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-bold text-white">Resources & Tools</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Design System", url: "succinct.link/system" },
              { title: "Component Library", url: "succinct.link/components" },
              { title: "Case Studies", url: "succinct.link/cases" },
              { title: "Process Doc", url: "succinct.link/process" },
            ].map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                className="flex items-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition"
              >
                <div className="w-4 h-4 text-violet-400" />
                <span className="text-white/80">{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
