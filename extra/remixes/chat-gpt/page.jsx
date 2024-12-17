"use client";
import React, { useState } from 'react';

/**
 * A single-page portfolio application called "succinct.link" that emphasizes brevity
 * and clarity in presenting professional work and content. This component implements
 * the core structure, navigation, filtering, and modal-based detail views for projects
 * and blog posts.
 *
 * Note:
 * - This is a single-file React component that exports the default App component.
 * - Styling and exact UI design are at discretion, focusing on a clean, modern interface.
 * - Data is represented with mock arrays for demonstration.
 * - Filtering and modal functionality are demonstrated in a basic manner.
 */

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

  // Basic Styles (Inline for brevity)
  const containerStyle = {
    fontFamily: 'sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    lineHeight: '1.6',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  };

  const navItemStyle = (section) => ({
    cursor: 'pointer',
    padding: '0 10px',
    borderBottom: activeSection === section ? '2px solid #000' : '2px solid transparent',
  });

  const sectionHeader = {
    margin: '20px 0',
    fontSize: '1.5em',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  };

  const filterContainerStyle = {
    margin: '10px 0',
  };

  const projectContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '15px',
    marginTop: '20px',
  };

  const projectCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const modalStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  const blogPostContainerStyle = {
    marginTop: '20px',
  };

  const postCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
  };

  const skillListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const timelineStyle = {
    borderLeft: '2px solid #ccc',
    paddingLeft: '20px',
  };

  // Render Sections
  const renderWork = () => (
    <div>
      <h2 style={sectionHeader}>Work</h2>
      <div style={filterContainerStyle}>
        <span>Filter by type: </span>
        {['all', 'code', 'design', 'writing'].map((ft) => (
          <button
            key={ft}
            style={{ marginRight: '10px', padding: '5px', cursor: 'pointer' }}
            onClick={() => setProjectFilter(ft)}
            disabled={projectFilter === ft}
          >
            {ft}
          </button>
        ))}
      </div>
      <div style={projectContainerStyle}>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            style={projectCardStyle}
            onClick={() => setSelectedProject(project)}
          >
            <h3>{project.title}</h3>
            <p><strong>Type:</strong> {project.type}</p>
            <p><strong>Duration:</strong> {project.duration}</p>
            <p><strong>Tags:</strong> {project.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div>
      <h2 style={sectionHeader}>About</h2>
      <p>
        I am a professional developer and designer with a deep passion for creating 
        elegant, performant, and user-centric digital experiences. My focus is on 
        brevity, clarity, and impactful solutions.
      </p>
      <h3>Key Competencies</h3>
      <div style={skillListStyle}>
        <span style={{ border: '1px solid #ccc', padding: '5px' }}>React</span>
        <span style={{ border: '1px solid #ccc', padding: '5px' }}>UI/UX Design</span>
        <span style={{ border: '1px solid #ccc', padding: '5px' }}>Technical Writing</span>
        <span style={{ border: '1px solid #ccc', padding: '5px' }}>Performance Optimization</span>
      </div>
      <h3>Career Timeline</h3>
      <div style={timelineStyle}>
        <p><strong>2020 - Present:</strong> Senior Frontend Engineer at XYZ Corp</p>
        <p><strong>2017 - 2020:</strong> UI/UX Designer at ABC Studio</p>
        <p><strong>2015 - 2017:</strong> Technical Writer at DocumentationPro</p>
      </div>
      <h3>Brief Biography</h3>
      <p>
        With a decade of experience in the tech industry, I have built software, designed interfaces,
        and written documentation for products ranging from SaaS platforms to mobile applications.
        I value clarity, collaboration, and user advocacy in all my work.
      </p>
    </div>
  );

  const renderBlog = () => (
    <div>
      <h2 style={sectionHeader}>Blog</h2>
      {featuredPost && (
        <div style={{ border: '2px solid #000', borderRadius: '8px', padding: '10px' }}>
          <h3>Featured Post</h3>
          <h2>{featuredPost.title}</h2>
          <p><em>{featuredPost.date} • {featuredPost.readingTime}</em></p>
          <p>{featuredPost.excerpt}</p>
          <button onClick={() => setSelectedPost(featuredPost)}>Read More</button>
        </div>
      )}

      <div style={filterContainerStyle}>
        <span>Filter by category: </span>
        {['all', 'code', 'react', 'design', 'ux', 'writing', 'docs'].map((cat) => (
          <button
            key={cat}
            style={{ marginRight: '10px', padding: '5px', cursor: 'pointer' }}
            onClick={() => setBlogFilter(cat)}
            disabled={blogFilter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={blogPostContainerStyle}>
        {filteredPosts
          .filter(post => post !== featuredPost) // exclude featured from main list
          .map((post) => (
            <div key={post.id} style={postCardStyle} onClick={() => setSelectedPost(post)}>
              <h3>{post.title}</h3>
              <p><em>{post.date} • {post.readingTime}</em></p>
              <p><strong>Categories:</strong> {post.categories.join(', ')}</p>
              <p>{post.excerpt}</p>
            </div>
          ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div>
      <h2 style={sectionHeader}>Contact</h2>
      <form style={formStyle} onSubmit={(e) => {e.preventDefault(); alert('Form submitted!');}}>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Your message..." required></textarea>
        <button type="submit">Send</button>
      </form>
      <h3>Links</h3>
      <p>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a> | 
        <a href="https://github.com" target="_blank" rel="noreferrer"> GitHub</a> | 
        <a href="mailto:email@example.com"> Email</a>
      </p>
    </div>
  );

  return (
    <div style={containerStyle}>
      <header>
        <h1>succinct.link</h1>
      </header>
      <nav style={navStyle}>
        <span style={navItemStyle('work')} onClick={() => setActiveSection('work')}>Work</span>
        <span style={navItemStyle('about')} onClick={() => setActiveSection('about')}>About</span>
        <span style={navItemStyle('blog')} onClick={() => setActiveSection('blog')}>Blog</span>
        <span style={navItemStyle('contact')} onClick={() => setActiveSection('contact')}>Contact</span>
      </nav>

      <main>
        {activeSection === 'work' && renderWork()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'blog' && renderBlog()}
        {activeSection === 'contact' && renderContact()}
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <div style={modalOverlayStyle} onClick={() => setSelectedProject(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProject.title}</h2>
            <p><strong>Type:</strong> {selectedProject.type}</p>
            <p><strong>Duration:</strong> {selectedProject.duration}</p>
            <p><strong>Tags:</strong> {selectedProject.tags.join(', ')}</p>
            <h3>Metrics</h3>
            {Object.entries(selectedProject.metrics).map(([metric, value]) => (
              <p key={metric}><strong>{metric}:</strong> {value}</p>
            ))}
            <p>{selectedProject.description}</p>
            <button onClick={() => setSelectedProject(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Blog Post Modal */}
      {selectedPost && (
        <div style={modalOverlayStyle} onClick={() => setSelectedPost(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPost.title}</h2>
            <p><em>{selectedPost.date} • {selectedPost.readingTime}</em></p>
            <p><strong>Categories:</strong> {selectedPost.categories.join(', ')}</p>
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br/>') }} />
            <button onClick={() => setSelectedPost(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
