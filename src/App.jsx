import React, { useState, useEffect } from 'react';
import { ExternalLink, Star, Code2, Terminal, ArrowRight, User, ChevronLeft, ChevronRight, Download, Briefcase, Mail } from 'lucide-react';

const Github = ({ size = 24, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.1 2.5 4.9 2.9 4.9 2.9a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 10.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

import './index.css'; // Just importing the global css

const ProjectCard = ({ repo }) => {
  const customImages = {
    'PKMN-game': ['/pkmn-game.png', '/pkmn-map.png'],
    'CARDIOVASCULAR-DESEASE-PREDICTION': ['/heart-disease-1.png', '/heart-disease-2.png'],
    'AUTOMOTIVE-IMAGE-CLASSIFIER': ['/auto-1.png', '/auto-2.png'],
  };
  
  const images = customImages[repo.name] || [
    `https://picsum.photos/seed/${repo.id}1/600/300`,
    `https://picsum.photos/seed/${repo.id}2/600/300`
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    if (images.length > 1) {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length > 1) {
      setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div className="feature repo-card">
      <div 
        className="repo-image" 
        style={{ position: 'relative' }}
      >
        <img src={images[currentIdx]} alt={`${repo.name} screenshot`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              style={{
                position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0, transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0, transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="repo-content">
        <div className="repo-header">
          <h3>{repo.name}</h3>
          <div className="repo-links">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
        <p className="repo-desc">
          {repo.description || "No description provided for this repository."}
        </p>
        <div className="repo-stack">
          <span className="stack-label">STACK</span>
          <div className="stack-icons">
            {repo.all_languages && repo.all_languages.length > 0 ? (
              repo.all_languages.map(lang => (
                <span key={lang} className="lang-badge">
                  {lang}
                </span>
              ))
            ) : (
              repo.language && (
                <span className="lang-badge">
                  {repo.language}
                </span>
              )
            )}
          </div>
        </div>
        <div className="repo-footer">
          <div className="status">
            <span className="status-dot"></span> All Systems Operational
          </div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="view-details">
            View Details <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = 'conbott';

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`)
        ]);
        
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        
        // Filter out forks and the portfolio repository itself, then fetch the full languages object for each repo
        const filteredRepos = reposData.filter(repo => 
          !repo.fork && 
          repo.name.toLowerCase() !== 'portfolio' && 
          repo.name.toLowerCase() !== 'portfolio-website'
        );
        const reposWithLangs = await Promise.all(
          filteredRepos.map(async (repo) => {
            try {
              const langRes = await fetch(repo.languages_url);
              const langData = await langRes.json();
              return { ...repo, all_languages: Object.keys(langData) };
            } catch (err) {
              return { ...repo, all_languages: repo.language ? [repo.language] : [] };
            }
          })
        );
        
        setProfile(profileData);
        setRepos(reposWithLangs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav">
        <div className="wrap nav-wrap">
          <div className="brand">
            <Terminal className="brand-icon" size={20} />
            <span>stevesamuel.dev</span>
          </div>
          <div className="nav-links">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero animate-fade-in-up">
        <div className="wrap">
          <div className="badge">
            <span className="dot"></span>
            Available for new opportunities
          </div>
          <div className="hero-logo">
            <User size={32} color="var(--accent)" />
            <span className="wordmark">Hello, I'm Steve Samuel.</span>
          </div>
          <h1>
            Building <span className="grad">Digital Experiences</span>
          </h1>
          <p className="lede">
            I'm a B.Tech Computer Science and Engineering student (Class of 2026) and an aspiring data scientist passionate about creating clean, efficient, and dynamic end-to-end MLOps products. Welcome to my portfolio where I showcase my latest work and projects directly from GitHub.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="/Resume.pdf" download className="btn">
              <Download size={16} /> Download Resume
            </a>
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="btn">
              <Github size={16} /> Follow on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="wrap">
          <div className="section-header center">
            <div className="eyebrow">
              <Briefcase size={14} /> My Journey
            </div>
            <h2 className="h">Professional Experience</h2>
            <p className="sub">Internships and roles where I've applied my skills in the real world.</p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content feature">
                <div className="exp-header">
                  <h3>Next Gen Pro</h3>
                  <span className="exp-date">June 2025</span>
                </div>
                <div className="exp-role">AI & Machine Learning Intern</div>
                <ul className="exp-list">
                  <li>Applied image classification and ensemble learning techniques on real datasets</li>
                  <li>Evaluated model performance and improved accuracy through optimization</li>
                  <li>Optimized data pipelines for efficient real-world dataset handling</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content feature">
                <div className="exp-header">
                  <h3>Corizo (In collaboration with Wipro)</h3>
                  <span className="exp-date">Oct. 2024 - Nov. 2024</span>
                </div>
                <div className="exp-role">AI Project Intern</div>
                <ul className="exp-list">
                  <li>Built a cardiovascular disease prediction system using XGBoost, SVM, and K-Means</li>
                  <li>Performed preprocessing and feature selection to enhance reliability</li>
                  <li>Developed a Tkinter GUI for interactive prediction output</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="wrap">
          <div className="section-header center">
            <div className="eyebrow">
              <Code2 size={14} /> My Work
            </div>
            <h2 className="h">Featured Projects</h2>
            <p className="sub">A live feed of my latest projects and contributions directly from GitHub.</p>
          </div>

          {loading ? (
            <div className="loading-state center" style={{ marginTop: '40px' }}>
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : (
            <div className="grid">
              {repos.map(repo => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="wrap center">
          <div className="section-header">
            <h2 className="h">Get In Touch</h2>
            <p className="sub">I am currently looking for new opportunities and collaborations.</p>
          </div>
          <div className="contact-box feature">
            <Mail size={32} color="var(--accent)" style={{ marginBottom: '16px' }} />
            <h3>Let's Connect</h3>
            <p className="repo-desc">
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a href="mailto:stevesamuel.cse@gmail.com" className="btn primary" style={{ marginTop: '20px' }}>
              Say Hello
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <p>© {new Date().getFullYear()} {username}. Built with React & Vite. Hosted on Vercel.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
