"use client";

import React, { useState } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('work');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogFilter, setBlogFilter] = useState('all');

  // Mock Data
  const projects = [
    {
      id: 1,
      title: 'Codebase Refactor',
      type: 'code',
      duration: '3 months',
      tags: ['React', 'Refactoring'],
      metrics: { linesOfCode: 2000, commits: 150 },
      description:
        'A complete refactor of an existing codebase to improve performance, readability, and maintainability.',
    },
    {
      id: 2,
      title: 'UI Redesign',
      type: 'design',
      duration: '2 months',
      tags: ['Figma', 'UX'],
      metrics: { screens: 12, prototypes: 2 },
      description:
        'A modernized UI design for a web application, improving user experience and visual consistency.',
    },
    {
      id: 3,
      title: 'Technical Documentation',
      type: 'writing',
      duration: '1 month',
      tags: ['Technical Writing', 'API Docs'],
      metrics: { pages: 15, revisions: 3 },
      description:
        'Comprehensive technical documentation for an API, including usage examples and best practices.',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Optimizing React Apps',
      featured: true,
      categories: ['code', 'react'],
      date: '2024-08-10',
      readingTime: '5 min',
      excerpt:
        'Explore proven strategies and patterns for improving performance in React applications...',
      content: `
        # Optimizing React Apps
        In this post, we dive deep into performance considerations for React...
      `,
    },
    {
      id: 2,
      title: 'Design Systems 101',
      featured: false,
      categories: ['design', 'ux'],
      date: '2024-07-15',
      readingTime: '7 min',
      excerpt:
        'A primer on building and maintaining design systems that scale across teams and products...',
      content: `
        # Design Systems 101
        Design systems streamline the way we build user interfaces...
      `,
    },
    {
      id: 3,
      title: 'Writing for Developers',
      featured: false,
      categories: ['writing', 'docs'],
      date: '2024-06-20',
      readingTime: '4 min',
      excerpt:
        'Effective technical communication can improve onboarding, reduce errors, and build trust...',
      content: `
        # Writing for Developers
        Clear technical documentation is a cornerstone of successful software...
      `,
    },
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.type === projectFilter);

  const filteredPosts = blogFilter === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.categories.includes(blogFilter));

  const featuredPost = blogPosts.find(post => post.featured);

  const renderWork = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Work</h2>
      <div className="flex gap-4 flex-wrap">
        <span className="text-gray-400">Filter by type: </span>
        {['all', 'code', 'design', 'writing'].map((ft) => (
          <button
            key={ft}
            className={`px-4 py-2 rounded-full transition-all ${
              projectFilter === ft
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setProjectFilter(ft)}
          >
            {ft}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 cursor-pointer border border-gray-700/50 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10"
            onClick={() => setSelectedProject(project)}
          >
            <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <span className="font-medium">Type:</span> {project.type}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Duration:</span> {project.duration}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">About</h2>
      <p className="text-lg text-gray-300 leading-relaxed">
        I am a professional developer and designer with a deep passion for creating 
        elegant, performant, and user-centric digital experiences. My focus is on 
        brevity, clarity, and impactful solutions.
      </p>
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Key Competencies</h3>
        <div className="flex flex-wrap gap-3">
          {['React', 'UI/UX Design', 'Technical Writing', 'Performance Optimization'].map((skill) => (
            <span key={skill} className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Career Timeline</h3>
        <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:h-[calc(100%-20px)] before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:to-pink-600">
          {[
            { period: '2020 - Present', role: 'Senior Frontend Engineer at XYZ Corp' },
            { period: '2017 - 2020', role: 'UI/UX Designer at ABC Studio' },
            { period: '2015 - 2017', role: 'Technical Writer at DocumentationPro' },
          ].map((item, index) => (
            <div key={index} className="pl-8 relative">
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-purple-600 shadow-lg shadow-purple-500/50" />
              <p className="text-purple-400 font-semibold">{item.period}</p>
              <p className="text-gray-300">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Blog</h2>
      {featuredPost && (
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
          <div className="text-purple-400 font-semibold mb-2">Featured Post</div>
          <h2 className="text-2xl font-bold text-white mb-2">{featuredPost.title}</h2>
          <p className="text-gray-400 mb-4">
            <span>{featuredPost.date}</span>
            <span className="mx-2">•</span>
            <span>{featuredPost.readingTime}</span>
          </p>
          <p className="text-gray-300 mb-4">{featuredPost.excerpt}</p>
          <button
            onClick={() => setSelectedPost(featuredPost)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Read More
          </button>
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        <span className="text-gray-400">Filter by category: </span>
        {['all', 'code', 'react', 'design', 'ux', 'writing', 'docs'].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full transition-all ${
              blogFilter === cat
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setBlogFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredPosts
          .filter(post => post !== featuredPost)
          .map((post) => (
            <div
              key={post.id}
              className="group p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
              <p className="text-gray-400 mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readingTime}</span>
              </p>
              <div className="flex gap-2 mb-3">
                {post.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300">
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-gray-300">{post.excerpt}</p>
            </div>
          ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Contact</h2>
      <form
        className="space-y-4 max-w-md"
        onSubmit={(e) => {e.preventDefault(); alert('Form submitted!');}}
      >
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Your message..."
          required
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 min-h-[150px]"
        ></textarea>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Send Message
        </button>
      </form>
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Connect</h3>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:email@example.com"
            className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
            succinct.link
          </h1>
          <p className="text-gray-400 text-lg">Clarity through brevity</p>
        </header>

        <nav className="flex justify-center gap-6 mb-12">
          {['work', 'about', 'blog', 'contact'].map((section) => (
            <button
              key={section}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === section
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        <main>
          {activeSection === 'work' && renderWork()}
          {activeSection === 'about' && renderAbout()}
          {activeSection === 'blog' && renderBlog()}
          {activeSection === 'contact' && renderContact()}
        </main>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">{selectedProject.title}</h2>
              <div className="space-y-4">
                <p><span className="text-gray-400">Type:</span> <span className="text-white">{selectedProject.type}</span></p>
                <p><span className="text-gray-400">Duration:</span> <span className="text-white">{selectedProject.duration}</span></p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedProject.metrics).map(([metric, value]) => (
                      <div key={metric} className="bg-gray-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">{metric}</p>
                        <p className="text-xl font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{selectedProject.description}</p>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-2">{selectedPost.title}</h2>
              <p className="text-gray-400 mb-4">
                <span>{selectedPost.date}</span>
                <span className="mx-2">•</span>
                <span>{selectedPost.readingTime}</span>
              </p>
              <div className="flex gap-2 mb-6">
                {selectedPost.categories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
                    {category}
                  </span>
                ))}
              </div>
              <div className="prose prose-invert max-w-none mb-6">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br/>') }} />
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
