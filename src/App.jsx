import { useState } from 'react';
import {
  ExternalLink,
  Code2,
  Terminal,
  ArrowRight,
  Mail,
  CheckCircle2,
  ShieldAlert,
  GitBranch,
  Cpu,
  Layers,
  Database,
  BarChart3,
  Server,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Activity,
  Phone,
  Check
} from 'lucide-react';
import './index.css';

// SVG GitHub icon component
const GithubIcon = ({ size = 18, className = "" }) => (
  <svg
    className={className}
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

// SVG LinkedIn icon component
const LinkedinIcon = ({ size = 18, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function App() {
  // Deep technical breakdown drawer states
  const [expandedA, setExpandedA] = useState(false);
  const [expandedB, setExpandedB] = useState(false);
  const [expandedC, setExpandedC] = useState(false);

  // Active tabs inside deep drawers
  const [activeTabA, setActiveTabA] = useState('lifecycle');
  const [activeTabB, setActiveTabB] = useState('imbalanced');
  const [activeTabC, setActiveTabC] = useState('nlp');
  
  // Interactive system spec in hero
  const [activeSpec, setActiveSpec] = useState(0);
  
  // Archive toggle
  const [showArchive, setShowArchive] = useState(false);

  // Tab definitions for accessible keyboard navigation
  const tabsA = ['lifecycle', 'quality-gate', 'metrics', 'interface', 'repro'];
  const tabsB = ['imbalanced', 'thresholds', 'api', 'repro'];
  const tabsC = ['nlp', 'benchmarks', 'api', 'repro'];

  const handleTabKeyDown = (e, projectKey) => {
    const tabMap = { A: tabsA, B: tabsB, C: tabsC };
    const currentTab = projectKey === 'A' ? activeTabA : projectKey === 'B' ? activeTabB : activeTabC;
    const setTab = projectKey === 'A' ? setActiveTabA : projectKey === 'B' ? setActiveTabB : setActiveTabC;
    const tabs = tabMap[projectKey];
    const currentIndex = tabs.indexOf(currentTab);

    let nextIndex = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = tabs[nextIndex];
      setTab(nextTab);
      setTimeout(() => {
        const nextButton = document.getElementById(`tab-${projectKey.toLowerCase()}-${nextTab}`);
        if (nextButton) {
          nextButton.focus();
          nextButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }, 0);
    }
  };

  const systemSpecs = [
    {
      num: "01",
      name: "Leakage Prevention",
      tool: "Train Split Fit Only",
      desc: "RobustScaler & feature encoders are fit exclusively on train partitions. Zero validation or test sample bleed.",
      snippet: "scaler.fit(X_train)  # Scaler never touches X_val or X_test"
    },
    {
      num: "02",
      name: "Objective Promotion Gate",
      tool: "Macro-F1 / PR-AUC",
      desc: "Candidate model must outperform baseline on held-out validation data before promotion CLI touches filesystem.",
      snippet: "if candidate_macro_f1 >= baseline_f1: os.replace(cand, prod)"
    },
    {
      num: "03",
      name: "Atomic Swap & Rollback",
      tool: "os.replace & SHA-256",
      desc: "Promotions create timestamped backups and log cryptographic hashes. Instant rollback with python src/promote.py --rollback.",
      snippet: "python src/promote.py --rollback models/backup_20261018.keras"
    },
    {
      num: "04",
      name: "Production Contracts",
      tool: "FastAPI & Pydantic V2",
      desc: "Endpoints validate strict field types and bounds, returning calibrated probabilities, risk categories, and latency telemetry.",
      snippet: "class ReviewRequest(BaseModel): text: constr(min_length=3)"
    }
  ];

  return (
    <div className="portfolio-app">
      {/* Header & Navigation */}
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="brand">
            <span className="brand-dot"></span>
            <span>Steve Samuel</span>
            <span className="brand-tag">// ML Engineering & MLOps</span>
          </a>

          <nav className="nav-menu" aria-label="Main Navigation">
            <a href="#projects" className="nav-link">Featured Work</a>
            <a href="#methodology" className="nav-link">ML Lifecycle</a>
            <a href="#evidence" className="nav-link">Technical Evidence</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#skills" className="nav-link">Toolkit</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="nav-actions">
            <a 
              href="/Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              title="Open Steve Samuel's Résumé (PDF)"
            >
              <FileText size={13} />
              <span>Résumé (PDF)</span>
            </a>
            <a 
              href="https://github.com/conbott" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm"
              aria-label="GitHub Profile (@conbott)"
            >
              <GithubIcon size={14} />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 1. HERO SECTION: ASYMMETRIC ENGINEERING STATEMENT & SPEC */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-grid">
              
              {/* Left Column: Statement & CTAs */}
              <div>
                <div className="hero-badge">
                  <span className="brand-dot"></span>
                  <span>B.Tech Computer Science &bull; Class of 2026</span>
                </div>

                <h1 className="hero-headline">
                  I build machine learning systems that are <span className="highlight">measurable</span>, <span className="highlight">reproducible</span>, and <span className="highlight">deployable</span>.
                </h1>

                <p className="hero-lede">
                  Computer Science graduate specializing in ML engineering, MLOps, and dependable software. 
                  Experienced in fine-tuning deep learning vision models, optimizing decision thresholds for imbalanced financial data, 
                  building automated promotion gates with rollback guarantees, and serving low-latency REST APIs.
                </p>

                <div className="hero-actions">
                  <a href="#projects" className="btn btn-primary">
                    Explore Featured Work <ArrowRight size={14} />
                  </a>
                  <a 
                    href="/Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                  >
                    <FileText size={14} /> View Résumé (PDF)
                  </a>
                  <a 
                    href="https://github.com/conbott" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-outline"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                </div>

                <div className="hero-meta-bar">
                  <div className="hero-meta-item">
                    <span className="mono-tag">[ 01 ]</span>
                    <span><strong>3</strong> Production Repositories</span>
                  </div>
                  <div className="hero-meta-item">
                    <span className="mono-tag">[ 02 ]</span>
                    <span><strong>68</strong> Automated CI Tests</span>
                  </div>
                  <div className="hero-meta-item">
                    <span className="mono-tag">[ 03 ]</span>
                    <span><strong>0%</strong> Validation Leakage</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Engineering System Spec Console */}
              <div>
                <div className="hero-spec-console">
                  <div className="console-header">
                    <div className="console-dots">
                      <span className="console-dot"></span>
                      <span className="console-dot"></span>
                      <span className="console-dot"></span>
                    </div>
                    <span className="console-title">// ML SYSTEM SPECIFICATION</span>
                    <span className="console-status">
                      <span className="brand-dot"></span> VERIFIED
                    </span>
                  </div>

                  <div className="console-body">
                    {systemSpecs.map((spec, index) => (
                      <div 
                        key={spec.num}
                        className={`spec-entry ${activeSpec === index ? 'active' : ''}`}
                        onClick={() => setActiveSpec(index)}
                      >
                        <div className="spec-meta">
                          <span className="spec-num">{spec.num} // {spec.name}</span>
                          <span className="spec-tool">{spec.tool}</span>
                        </div>
                        <p className="spec-desc">{spec.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="console-footer">
                    <Sparkles size={14} color="var(--accent-leaf)" style={{ flexShrink: 0 }} />
                    <code style={{ fontSize: '11px', color: 'var(--accent-leaf)' }}>
                      {systemSpecs[activeSpec].snippet}
                    </code>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. FEATURED WORK: EDITORIAL PROJECTS SHOWCASE */}
        <section id="projects" className="section-spacer">
          <div className="container">
            <div className="editorial-eyebrow">
              <Layers size={13} /> Verified Implementations
            </div>
            <h2 className="editorial-section-title">Featured Engineering Projects</h2>
            <p className="editorial-section-desc">
              In-depth technical case studies documenting model architecture, leakage-safe data partitions, 
              automated quality barriers, verified benchmark evaluations, and containerized deployment.
            </p>

            <div className="editorial-projects-list">

              {/* ==================================================== */}
              {/* PROJECT 01: AUTOMOTIVE IMAGE CLASSIFIER              */}
              {/* ==================================================== */}
              <article className="editorial-project">
                <div className="editorial-project-header">
                  <div className="mono-tag">01 // DLOps & Computer Vision</div>
                  <div className="mono-dim">June 2026 &ndash; October 2026 &bull; Verified Repository</div>
                </div>

                <div className="editorial-project-grid">
                  {/* Left: Problem, Approach & Metrics */}
                  <div>
                    <h3 className="editorial-project-title">Automotive Image Classifier</h3>
                    <p className="editorial-lead">
                      Fine-grained vehicle classification across 196 Stanford Cars classes. 
                      Demonstrates configuration-driven transfer learning with EfficientNetB0, local MLflow tracking, 
                      automated validation quality gates, atomic model promotion via <code>os.replace</code>, and rollback guarantees.
                    </p>

                    <div className="editorial-stat-row">
                      <div className="stat-item">
                        <span className="stat-val">196</span>
                        <span className="stat-lbl">Classes</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val highlight">57.34%</span>
                        <span className="stat-lbl">Val Acc</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val highlight">0.5698</span>
                        <span className="stat-lbl">F1 Gate</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val">35</span>
                        <span className="stat-lbl">CI Tests</span>
                      </div>
                    </div>

                    <div className="editorial-checklist">
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Leakage-Safe Prep:</strong> 80/20 train/validation split (6,515 train / 1,629 val) with zero data bleed.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Quality Gate CLI:</strong> Evaluates Macro-F1 &ge; 0.5698 on unbatched validation data before promotion.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Atomic Promotion:</strong> <code>os.replace</code> guarantees zero-downtime serving with SHA-256 integrity logs.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Single-Pass Softmax:</strong> Consumes raw logits directly in Streamlit to eliminate double-softmax distortion.</span>
                      </div>
                    </div>

                    <div className="editorial-actions">
                      <a 
                        href="https://conbott-automotive-ai.streamlit.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-sm"
                      >
                        <ExternalLink size={13} /> Live Streamlit Demo
                      </a>
                      <a 
                        href="https://github.com/conbott/AUTOMOTIVE-IMAGE-CLASSIFIER" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline btn-sm"
                      >
                        <GithubIcon size={13} /> Source Code
                      </a>
                      <button 
                        onClick={() => setExpandedA(!expandedA)} 
                        className="btn btn-outline btn-sm"
                        aria-expanded={expandedA}
                      >
                        {expandedA ? 'Collapse Technical Breakdown' : 'Deep Technical Breakdown & CI (35 Tests)'} 
                        {expandedA ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>
                  </div>

                  {/* Right: Real UI Preview Centerpiece */}
                  <div>
                    <div className="editorial-artifact-frame">
                      <div className="artifact-titlebar">
                        <div className="console-dots">
                          <span className="console-dot"></span>
                          <span className="console-dot"></span>
                          <span className="console-dot"></span>
                        </div>
                        <span>conbott-automotive-ai.streamlit.app</span>
                        <span className="mono-tag">LIVE UI</span>
                      </div>
                      <div className="artifact-content">
                        <img 
                          src="/auto-1.png" 
                          alt="Automotive Image Classifier Interface displaying top-3 predictions and confidence scores" 
                          className="artifact-img"
                        />
                        <div style={{ marginTop: '12px', padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            <span>MODEL: EfficientNetB0</span>
                            <span style={{ color: 'var(--accent-leaf)' }}>STATUS: PROMOTED</span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            Top-3 confidence ranking outputs prediction uncertainty on ambiguous car trims. Caching monitors <code>mtime</code> to reload new champions without server restarts.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Technical Drawer for Automotive */}
                {expandedA && (
                  <div className="editorial-drawer">
                    <div className="drawer-header">
                      <span className="drawer-title">// DEEP TECHNICAL SPECIFICATION: AUTOMOTIVE DLOps</span>
                      <span className="mono-dim">Keyboard Navigable (Arrow Keys)</span>
                    </div>

                    <div className="case-tabs-wrapper">
                      <div 
                        className="case-tabs"
                        role="tablist"
                        aria-label="Automotive Image Classifier Case Study Sections"
                      >
                        <button 
                          id="tab-a-lifecycle"
                          role="tab"
                          aria-selected={activeTabA === 'lifecycle'}
                          aria-controls="panel-a-lifecycle"
                          tabIndex={activeTabA === 'lifecycle' ? 0 : -1}
                          className={`tab-btn ${activeTabA === 'lifecycle' ? 'active' : ''}`}
                          onClick={() => setActiveTabA('lifecycle')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'A')}
                        >
                          <Cpu size={13} /> Architecture
                        </button>
                        <button 
                          id="tab-a-quality-gate"
                          role="tab"
                          aria-selected={activeTabA === 'quality-gate'}
                          aria-controls="panel-a-quality-gate"
                          tabIndex={activeTabA === 'quality-gate' ? 0 : -1}
                          className={`tab-btn ${activeTabA === 'quality-gate' ? 'active' : ''}`}
                          onClick={() => setActiveTabA('quality-gate')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'A')}
                        >
                          <ShieldAlert size={13} /> Promotion Gate & Rollback
                        </button>
                        <button 
                          id="tab-a-metrics"
                          role="tab"
                          aria-selected={activeTabA === 'metrics'}
                          aria-controls="panel-a-metrics"
                          tabIndex={activeTabA === 'metrics' ? 0 : -1}
                          className={`tab-btn ${activeTabA === 'metrics' ? 'active' : ''}`}
                          onClick={() => setActiveTabA('metrics')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'A')}
                        >
                          <BarChart3 size={13} /> Baseline Benchmarks
                        </button>
                        <button 
                          id="tab-a-repro"
                          role="tab"
                          aria-selected={activeTabA === 'repro'}
                          aria-controls="panel-a-repro"
                          tabIndex={activeTabA === 'repro' ? 0 : -1}
                          className={`tab-btn ${activeTabA === 'repro' ? 'active' : ''}`}
                          onClick={() => setActiveTabA('repro')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'A')}
                        >
                          <Terminal size={13} /> Reproduction & CI (35 Tests)
                        </button>
                      </div>
                    </div>

                    <div className="case-body">
                      {activeTabA === 'lifecycle' && (
                        <div role="tabpanel" id="panel-a-lifecycle" aria-labelledby="tab-a-lifecycle" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Transfer Learning & Pipeline Architecture
                          </h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                            Built on the Stanford Cars dataset (8,144 vehicle images partitioned into 6,515 train and 1,629 validation samples). 
                            Initial feature extraction freezes ImageNet weights with a custom classification head (Dropout 0.3, BatchNormalization, Dense 196). 
                            Subsequent fine-tuning selectively unfreezes top convolutional blocks with a conservative learning rate (<code>1e-4</code>) and cosine decay.
                          </p>
                          <div className="decision-grid">
                            <div className="decision-card">
                              <h4><GitBranch size={15} color="var(--accent-leaf)" /> Config-Driven Hyperparameters</h4>
                              <p>Learning rates, batch sizes, image dimensions, and frozen layers are defined in <code>configs/train_config.yaml</code>.</p>
                            </div>
                            <div className="decision-card">
                              <h4><Server size={15} color="var(--accent-leaf)" /> Logit-Preserving Inference</h4>
                              <p>Consumes raw output logits in Streamlit, avoiding double-softmax numerical distortion.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTabA === 'quality-gate' && (
                        <div role="tabpanel" id="panel-a-quality-gate" aria-labelledby="tab-a-quality-gate" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Objective Promotion Gate & One-Command Rollback
                          </h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                            Model promotion is guarded by an automated Python CLI (<code>src/promote.py</code>) rather than manual overwrites. 
                            Candidates are verified against the 1,629 validation images: if Macro-F1 &lt; 0.5698, the candidate is rejected and serving remains untouched.
                          </p>
                          <div className="code-snippet">
                            <pre>{`# Promotion Record (models/promotion_history.json)
{
  "timestamp": "2026-10-18T14:32:01Z",
  "candidate_run": "candidate_run_01",
  "validation_macro_f1": 0.5812,
  "baseline_macro_f1": 0.5698,
  "decision": "PROMOTED",
  "sha256": "8f3b14...e4a2",
  "backup_path": "models/backups/car_classifier_backup_20261018.keras"
}`}</pre>
                          </div>
                          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                            Rollback CLI: <code>python src/promote.py --rollback models/backups/car_classifier_backup_20261018.keras</code>
                          </p>
                        </div>
                      )}

                      {activeTabA === 'metrics' && (
                        <div role="tabpanel" id="panel-a-metrics" aria-labelledby="tab-a-metrics" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Baseline Validation Benchmarks (1,629 Images)
                          </h4>
                          <div className="data-table-wrapper">
                            <table className="data-table">
                              <thead>
                                <tr>
                                  <th>Evaluation Metric</th>
                                  <th>Benchmark Value</th>
                                  <th>Evaluation Partition</th>
                                  <th>Engineering Significance</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Validation Accuracy</td>
                                  <td>57.34%</td>
                                  <td>1,629 held-out images</td>
                                  <td>Outperforms random guessing (1/196 = 0.51%) by &gt;110x across fine-grained classes</td>
                                </tr>
                                <tr className="champion-row">
                                  <td>Validation Macro F1</td>
                                  <td>0.5698</td>
                                  <td>1,629 held-out images</td>
                                  <td>Enforced as the automated promotion gate baseline threshold</td>
                                </tr>
                                <tr>
                                  <td>Macro Precision</td>
                                  <td>63.38%</td>
                                  <td>1,629 held-out images</td>
                                  <td>Discriminative fidelity across visually subtle trim lines</td>
                                </tr>
                                <tr>
                                  <td>Macro Recall</td>
                                  <td>57.39%</td>
                                  <td>1,629 held-out images</td>
                                  <td>Equally weighted per-class sensitivity across all 196 labels</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeTabA === 'repro' && (
                        <div role="tabpanel" id="panel-a-repro" aria-labelledby="tab-a-repro" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Local Reproduction & 35-Test CI Suite
                          </h4>
                          <div className="code-snippet">
                            <pre>{`# 1. Clone repository & install dependencies
git clone https://github.com/conbott/AUTOMOTIVE-IMAGE-CLASSIFIER.git
cd AUTOMOTIVE-IMAGE-CLASSIFIER
pip install -r requirements.txt

# 2. Run the 35 automated tests (passes in < 12s in CI)
python -m pytest tests/ -v

# 3. Launch local Streamlit application
streamlit run app/main.py`}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>

              {/* ==================================================== */}
              {/* PROJECT 02: FRAUDGUARD AI                            */}
              {/* ==================================================== */}
              <article className="editorial-project">
                <div className="editorial-project-header">
                  <div className="mono-tag">02 // Financial MLOps & API Service</div>
                  <div className="mono-dim">October 2026 &bull; Verified Repository</div>
                </div>

                <div className="editorial-project-grid">
                  {/* Left: Problem, Approach & Metrics */}
                  <div>
                    <h3 className="editorial-project-title">FraudGuard AI &mdash; Imbalanced MLOps</h3>
                    <p className="editorial-lead">
                      End-to-end fraud detection platform built on 284,807 credit card transactions with extreme class imbalance (0.172% fraud prevalence). 
                      Demonstrates leakage-safe feature scaling, validation decision threshold tuning (threshold T = 0.43), 
                      champion model promotion, a typed FastAPI REST service, and Population Stability Index (PSI) drift monitoring.
                    </p>

                    <div className="editorial-stat-row">
                      <div className="stat-item">
                        <span className="stat-val highlight">0.8140</span>
                        <span className="stat-lbl">Test PR-AUC</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val highlight">0.0334%</span>
                        <span className="stat-lbl">Test FPR</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val">80.81%</span>
                        <span className="stat-lbl">Precision</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val">81.63%</span>
                        <span className="stat-lbl">Recall</span>
                      </div>
                    </div>

                    <div className="editorial-checklist">
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Strict Leakage Shield:</strong> <code>RobustScaler</code> and <code>log1p</code> transforms fit strictly on train split (170,883 txns).</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Val Threshold Tuning:</strong> Threshold T = 0.43 selected on 56,962 validation txns to optimize F1 (Val PR-AUC 0.7693 / Val F1 0.8280).</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Held-Out Test Rigor:</strong> Final evaluation on 56,962 unseen test txns: 19 false alarms across 56,864 negatives.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>FastAPI & Drift Telemetry:</strong> Pydantic V2 schema validation and two-sample KS / PSI distribution shift alerts.</span>
                      </div>
                    </div>

                    <div className="editorial-actions">
                      <a 
                        href="https://conbott-fraudguard.streamlit.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-sm"
                      >
                        <ExternalLink size={13} /> Live Streamlit Demo
                      </a>
                      <a 
                        href="https://github.com/conbott/Fraud-Guard-AI" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline btn-sm"
                      >
                        <GithubIcon size={13} /> Source Code
                      </a>
                      <button 
                        onClick={() => setExpandedB(!expandedB)} 
                        className="btn btn-outline btn-sm"
                        aria-expanded={expandedB}
                      >
                        {expandedB ? 'Collapse Technical Breakdown' : 'Deep Technical Breakdown & CI (33 Tests)'} 
                        {expandedB ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>
                  </div>

                  {/* Right: Verified 2x2 Confusion Matrix Centerpiece */}
                  <div>
                    <div className="editorial-artifact-frame">
                      <div className="artifact-titlebar">
                        <div className="console-dots">
                          <span className="console-dot"></span>
                          <span className="console-dot"></span>
                          <span className="console-dot"></span>
                        </div>
                        <span>TEST CONFUSION MATRIX (N = 56,962 at T = 0.43)</span>
                        <span className="mono-tag">HELD-OUT TEST</span>
                      </div>
                      <div className="artifact-content">
                        <div className="confusion-matrix-grid">
                          <div className="cm-cell header"></div>
                          <div className="cm-cell header">Pred. Negative</div>
                          <div className="cm-cell header">Pred. Positive</div>

                          <div className="cm-cell header" style={{ justifyContent: 'flex-start' }}>Actual Neg.</div>
                          <div className="cm-cell tn">
                            <div className="cm-val">56,845</div>
                            <div className="cm-label">True Negative (TN)</div>
                          </div>
                          <div className="cm-cell">
                            <div className="cm-val" style={{ color: 'var(--color-warning)' }}>19</div>
                            <div className="cm-label">False Positive (FP)</div>
                          </div>

                          <div className="cm-cell header" style={{ justifyContent: 'flex-start' }}>Actual Pos.</div>
                          <div className="cm-cell">
                            <div className="cm-val" style={{ color: 'var(--color-danger)' }}>18</div>
                            <div className="cm-label">False Negative (FN)</div>
                          </div>
                          <div className="cm-cell tp">
                            <div className="cm-val">80</div>
                            <div className="cm-label">True Positive (TP)</div>
                          </div>
                        </div>

                        <div style={{ marginTop: '12px', padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            <span>FPR: 0.0334% (19 / 56,864)</span>
                            <span style={{ color: 'var(--accent-leaf)' }}>RECALL: 81.63% (80 / 98)</span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            Across 56,864 legitimate transactions, only 19 produced false alarms while catching 80 of 98 fraud events. 
                            Accuracy (99.93%) is deceptive; evaluation relies strictly on PR-AUC (0.8140) and FPR.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Technical Drawer for FraudGuard AI */}
                {expandedB && (
                  <div className="editorial-drawer">
                    <div className="drawer-header">
                      <span className="drawer-title">// DEEP TECHNICAL SPECIFICATION: FRAUDGUARD MLOps</span>
                      <span className="mono-dim">Keyboard Navigable (Arrow Keys)</span>
                    </div>

                    <div className="case-tabs-wrapper">
                      <div 
                        className="case-tabs"
                        role="tablist"
                        aria-label="FraudGuard AI Case Study Sections"
                      >
                        <button 
                          id="tab-b-imbalanced"
                          role="tab"
                          aria-selected={activeTabB === 'imbalanced'}
                          aria-controls="panel-b-imbalanced"
                          tabIndex={activeTabB === 'imbalanced' ? 0 : -1}
                          className={`tab-btn ${activeTabB === 'imbalanced' ? 'active' : ''}`}
                          onClick={() => setActiveTabB('imbalanced')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'B')}
                        >
                          <BarChart3 size={13} /> Imbalanced Partition
                        </button>
                        <button 
                          id="tab-b-thresholds"
                          role="tab"
                          aria-selected={activeTabB === 'thresholds'}
                          aria-controls="panel-b-thresholds"
                          tabIndex={activeTabB === 'thresholds' ? 0 : -1}
                          className={`tab-btn ${activeTabB === 'thresholds' ? 'active' : ''}`}
                          onClick={() => setActiveTabB('thresholds')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'B')}
                        >
                          <ShieldAlert size={13} /> Threshold Tuning & Splits
                        </button>
                        <button 
                          id="tab-b-api"
                          role="tab"
                          aria-selected={activeTabB === 'api'}
                          aria-controls="panel-b-api"
                          tabIndex={activeTabB === 'api' ? 0 : -1}
                          className={`tab-btn ${activeTabB === 'api' ? 'active' : ''}`}
                          onClick={() => setActiveTabB('api')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'B')}
                        >
                          <Server size={13} /> FastAPI & Drift
                        </button>
                        <button 
                          id="tab-b-repro"
                          role="tab"
                          aria-selected={activeTabB === 'repro'}
                          aria-controls="panel-b-repro"
                          tabIndex={activeTabB === 'repro' ? 0 : -1}
                          className={`tab-btn ${activeTabB === 'repro' ? 'active' : ''}`}
                          onClick={() => setActiveTabB('repro')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'B')}
                        >
                          <Terminal size={13} /> Reproduction & CI (33 Tests)
                        </button>
                      </div>
                    </div>

                    <div className="case-body">
                      {activeTabB === 'imbalanced' && (
                        <div role="tabpanel" id="panel-b-imbalanced" aria-labelledby="tab-b-imbalanced" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Mathematical Partition & Leakage Prevention
                          </h4>
                          <div className="metrics-grid">
                            <div className="metric-box">
                              <div className="metric-label">Dataset Scale</div>
                              <div className="metric-value">284,807</div>
                              <div className="metric-subtext">492 frauds (0.1727% prevalence)</div>
                            </div>
                            <div className="metric-box">
                              <div className="metric-label">Val Tuning Split</div>
                              <div className="metric-value">0.7693 / 0.8280</div>
                              <div className="metric-subtext">Val PR-AUC / Val F1 at tuned T = 0.43</div>
                            </div>
                            <div className="metric-box">
                              <div className="metric-label">Held-Out Test PR-AUC</div>
                              <div className="metric-value highlight">0.8140</div>
                              <div className="metric-subtext">56,962 unseen txns &bull; ROC-AUC 0.9717</div>
                            </div>
                            <div className="metric-box">
                              <div className="metric-label">Held-Out Test Precision / Recall</div>
                              <div className="metric-value highlight">80.81% / 81.63%</div>
                              <div className="metric-subtext">FPR: 0.0334% (19 false alarms / 56,864 neg)</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTabB === 'thresholds' && (
                        <div role="tabpanel" id="panel-b-thresholds" aria-labelledby="tab-b-thresholds" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Validation Tuning vs. Held-Out Test Evaluation
                          </h4>
                          <div className="data-table-wrapper">
                            <table className="data-table">
                              <thead>
                                <tr>
                                  <th>Split Strategy</th>
                                  <th>Tuned Threshold</th>
                                  <th>Val Tuning Split</th>
                                  <th>Held-Out Test PR-AUC</th>
                                  <th>Precision</th>
                                  <th>Recall</th>
                                  <th>FPR</th>
                                  <th>Held-Out Confusion Matrix</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="champion-row">
                                  <td>Stratified Split (60/20/20)</td>
                                  <td>0.43</td>
                                  <td>0.7693 PR-AUC / 0.8280 F1</td>
                                  <td>0.8140</td>
                                  <td>80.81%</td>
                                  <td>81.63%</td>
                                  <td>0.0334%</td>
                                  <td>TP: 80 | FP: 19 | TN: 56,845 | FN: 18</td>
                                </tr>
                                <tr>
                                  <td>Chronological Split (Temporal)</td>
                                  <td>0.34</td>
                                  <td>0.7508 PR-AUC / 0.8350 F1</td>
                                  <td>0.8151</td>
                                  <td>89.06%</td>
                                  <td>76.00%</td>
                                  <td>0.0123%</td>
                                  <td>TP: 57 | FP: 7 | TN: 56,879 | FN: 18</td>
                                </tr>
                                <tr>
                                  <td>Logistic Regression Baseline</td>
                                  <td>0.95</td>
                                  <td>0.6942 PR-AUC / 0.4412 F1</td>
                                  <td>0.7168</td>
                                  <td>30.00%</td>
                                  <td>88.78%</td>
                                  <td>0.3570%</td>
                                  <td>TP: 87 | FP: 203 | TN: 56,661 | FN: 11</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeTabB === 'api' && (
                        <div role="tabpanel" id="panel-b-api" aria-labelledby="tab-b-api" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            FastAPI Serving Architecture & Drift Monitoring
                          </h4>
                          <div className="arch-diagram">
                            <pre>{`[Client POST /predict] ──▶ [Pydantic V2 Schema Validation]
  └──▶ [Feature Validator: Range checks on Amount, Time, V1-V28]
        └──▶ [Active Champion Model: Predict Probability]
              └──▶ [Apply Tuned Threshold T = 0.43 ──▶ Binary Decision & Risk Score]
                    ├──▶ [JSON Response: status, risk_score, latency_ms]
                    └──▶ [SQLite Telemetry Store] ──▶ [Drift Monitor: PSI & KS-Tests]`}</pre>
                          </div>
                        </div>
                      )}

                      {activeTabB === 'repro' && (
                        <div role="tabpanel" id="panel-b-repro" aria-labelledby="tab-b-repro" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Reproduction & 33-Test Automated CI Suite
                          </h4>
                          <div className="code-snippet">
                            <pre>{`# 1. Clone repository & install dependencies
git clone https://github.com/conbott/Fraud-Guard-AI.git
cd Fraud-Guard-AI
pip install -r requirements-dev.txt

# 2. Run unit and integration tests (33 tests)
python -m pytest tests/ -v --cov=src

# 3. Launch FastAPI server (Interactive Swagger docs at /docs)
python -m uvicorn src.api.app:app --host 127.0.0.1 --port 8000`}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>

              {/* ==================================================== */}
              {/* PROJECT 03: IMDB SENTIMENT ANALYSIS PLATFORM         */}
              {/* ==================================================== */}
              <article className="editorial-project">
                <div className="editorial-project-header">
                  <div className="mono-tag">03 // NLP & Containerized Serving</div>
                  <div className="mono-dim">October 2026 &bull; Verified Repository</div>
                </div>

                <div className="editorial-project-grid">
                  {/* Left: Problem, Approach & Metrics */}
                  <div>
                    <h3 className="editorial-project-title">IMDb Sentiment Analysis Platform</h3>
                    <p className="editorial-lead">
                      End-to-end NLP binary classification platform across 50,000 IMDb movie reviews. 
                      Features custom negation-preserving text normalization, multi-model benchmarking, 
                      calibrated posterior probability scoring, a typed FastAPI REST backend with Pydantic validation, and Docker containerization.
                    </p>

                    <div className="editorial-stat-row">
                      <div className="stat-item">
                        <span className="stat-val highlight">90.92%</span>
                        <span className="stat-lbl">Test Acc</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val highlight">0.968</span>
                        <span className="stat-lbl">ROC-AUC</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val">91.06%</span>
                        <span className="stat-lbl">F1-Score</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-val">0.49s</span>
                        <span className="stat-lbl">Train Latency</span>
                      </div>
                    </div>

                    <div className="editorial-checklist">
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Negation Normalization:</strong> Preserves modifier words ("not", "never") to safeguard sentiment polarity.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Sublinear TF-IDF:</strong> Combines (1, 2) n-grams across 25,000 features with <code>1 + log(TF)</code> dampening.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Calibrated Probabilities:</strong> Logistic Regression champion outputs true confidence bounds for production safety.</span>
                      </div>
                      <div className="checklist-item">
                        <Check size={15} />
                        <span><strong>Docker Containerization:</strong> Dockerfile packaging both the FastAPI REST backend and interactive Streamlit UI.</span>
                      </div>
                    </div>

                    <div className="editorial-actions">
                      <a 
                        href="https://conbott-sentiment-analysis.streamlit.app" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary btn-sm"
                      >
                        <ExternalLink size={13} /> Live Streamlit Demo
                      </a>
                      <a 
                        href="https://github.com/conbott/Sentiment-Analysis" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline btn-sm"
                      >
                        <GithubIcon size={13} /> Source Code
                      </a>
                      <button 
                        onClick={() => setExpandedC(!expandedC)} 
                        className="btn btn-outline btn-sm"
                        aria-expanded={expandedC}
                      >
                        {expandedC ? 'Collapse Technical Breakdown' : 'Deep Technical Breakdown & Docker'} 
                        {expandedC ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                    </div>
                  </div>

                  {/* Right: Multi-Model Benchmark Centerpiece */}
                  <div>
                    <div className="editorial-artifact-frame">
                      <div className="artifact-titlebar">
                        <div className="console-dots">
                          <span className="console-dot"></span>
                          <span className="console-dot"></span>
                          <span className="console-dot"></span>
                        </div>
                        <span>MULTI-MODEL BENCHMARK (9,917 HELD-OUT REVIEWS)</span>
                        <span className="mono-tag">STRATIFIED TEST</span>
                      </div>
                      <div className="artifact-content">
                        <div className="data-table-wrapper" style={{ margin: 0 }}>
                          <table className="data-table">
                            <thead>
                              <tr>
                                <th>Model Architecture</th>
                                <th>Accuracy</th>
                                <th>Precision</th>
                                <th>Recall</th>
                                <th>F1-Score</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="champion-row">
                                <td>Logistic Regression (C=2.0) [Champion]</td>
                                <td>90.92%</td>
                                <td>90.01%</td>
                                <td>92.14%</td>
                                <td>91.06%</td>
                              </tr>
                              <tr>
                                <td>LinearSVC</td>
                                <td>90.39%</td>
                                <td>90.12%</td>
                                <td>90.88%</td>
                                <td>90.50%</td>
                              </tr>
                              <tr>
                                <td>Multinomial Naive Bayes</td>
                                <td>87.99%</td>
                                <td>87.45%</td>
                                <td>88.78%</td>
                                <td>88.11%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div style={{ marginTop: '12px', padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            <span>TRAINING CONVERGENCE: 0.49s</span>
                            <span style={{ color: 'var(--accent-leaf)' }}>STATUS: CONTAINERIZED</span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                            While LinearSVC achieved competitive accuracy (90.39%), Logistic Regression delivered higher recall (92.14%), faster convergence (0.49s), and critically, calibrated posterior probabilities.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Technical Drawer for IMDb */}
                {expandedC && (
                  <div className="editorial-drawer">
                    <div className="drawer-header">
                      <span className="drawer-title">// DEEP TECHNICAL SPECIFICATION: NLP & CONTAINER SERVING</span>
                      <span className="mono-dim">Keyboard Navigable (Arrow Keys)</span>
                    </div>

                    <div className="case-tabs-wrapper">
                      <div 
                        className="case-tabs"
                        role="tablist"
                        aria-label="IMDb Sentiment Analysis Platform Case Study Sections"
                      >
                        <button 
                          id="tab-c-nlp"
                          role="tab"
                          aria-selected={activeTabC === 'nlp'}
                          aria-controls="panel-c-nlp"
                          tabIndex={activeTabC === 'nlp' ? 0 : -1}
                          className={`tab-btn ${activeTabC === 'nlp' ? 'active' : ''}`}
                          onClick={() => setActiveTabC('nlp')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'C')}
                        >
                          <Code2 size={13} /> NLP Preprocessing
                        </button>
                        <button 
                          id="tab-c-api"
                          role="tab"
                          aria-selected={activeTabC === 'api'}
                          aria-controls="panel-c-api"
                          tabIndex={activeTabC === 'api' ? 0 : -1}
                          className={`tab-btn ${activeTabC === 'api' ? 'active' : ''}`}
                          onClick={() => setActiveTabC('api')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'C')}
                        >
                          <Server size={13} /> FastAPI & Docker
                        </button>
                        <button 
                          id="tab-c-repro"
                          role="tab"
                          aria-selected={activeTabC === 'repro'}
                          aria-controls="panel-c-repro"
                          tabIndex={activeTabC === 'repro' ? 0 : -1}
                          className={`tab-btn ${activeTabC === 'repro' ? 'active' : ''}`}
                          onClick={() => setActiveTabC('repro')}
                          onKeyDown={(e) => handleTabKeyDown(e, 'C')}
                        >
                          <Terminal size={13} /> Reproduction & Commands
                        </button>
                      </div>
                    </div>

                    <div className="case-body">
                      {activeTabC === 'nlp' && (
                        <div role="tabpanel" id="panel-c-nlp" aria-labelledby="tab-c-nlp" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Negation-Preserving Text Normalization
                          </h4>
                          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                            Standard stopword removal strips "not", "no", and "never". In sentiment analysis, stripping negation inverts polarity ("not good" becomes "good"). 
                            This pipeline expands contractions ("don't" &#8594; "do not") and preserves emotional modifiers to safeguard sentiment integrity.
                          </p>
                          <div className="decision-grid">
                            <div className="decision-card">
                              <h4><Code2 size={15} color="var(--accent-leaf)" /> (1, 2) N-Grams</h4>
                              <p>Extracts unigrams and bigrams across 25,000 vocabulary features to capture phrases like "waste of time".</p>
                            </div>
                            <div className="decision-card">
                              <h4><Database size={15} color="var(--accent-leaf)" /> Sublinear Scaling</h4>
                              <p>Applies <code>1 + log(TF)</code> dampening to prevent lengthy movie essays from drowning out concise review signals.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTabC === 'api' && (
                        <div role="tabpanel" id="panel-c-api" aria-labelledby="tab-c-api" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            FastAPI REST Backend & Docker Containerization
                          </h4>
                          <div className="arch-diagram">
                            <pre>{`[Client POST /predict] ──▶ [Pydantic ReviewRequest Schema Validation]
  └──▶ [Custom Negation-Preserving Cleaner]
        └──▶ [Sublinear TF-IDF Vectorizer (25,000 features)]
              └──▶ [Calibrated Logistic Regression Inference]
                    └──▶ [JSON Response: sentiment, label, confidence_pct, probabilities]`}</pre>
                          </div>
                          <div className="code-snippet">
                            <pre>{`# Docker deployment commands
docker build -t sentiment-analysis-app .
docker run -p 8000:8000 -p 8501:8501 sentiment-analysis-app`}</pre>
                          </div>
                        </div>
                      )}

                      {activeTabC === 'repro' && (
                        <div role="tabpanel" id="panel-c-repro" aria-labelledby="tab-c-repro" tabIndex={0}>
                          <h4 style={{ fontSize: '14.5px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                            Local Reproduction Commands
                          </h4>
                          <div className="code-snippet">
                            <pre>{`# 1. Clone repository & install dependencies
git clone https://github.com/conbott/Sentiment-Analysis.git
cd Sentiment-Analysis
pip install -r requirements.txt

# 2. Launch FastAPI backend (Interactive Swagger docs at /docs)
python app/api.py

# 3. Launch interactive Streamlit interface
python -m streamlit run app/ui.py`}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>

            </div>
          </div>
        </section>

        {/* 3. ENGINEERING METHODOLOGY: THE PRODUCTION ML LIFECYCLE */}
        <section id="methodology" className="section-spacer" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="editorial-eyebrow">
              <ShieldAlert size={13} /> Architectural Principles
            </div>
            <h2 className="editorial-section-title">The Production ML Lifecycle</h2>
            <p className="editorial-section-desc">
              Moving beyond optimistic Jupyter notebook accuracy. How models are trained, gated, deployed, and monitored for real-world resilience.
            </p>

            <div className="methodology-flow">
              <div className="methodology-item">
                <div className="methodology-meta">
                  <span className="methodology-num">01 // PREPARATION</span>
                  <span className="methodology-title">Leakage-Safe Scaling</span>
                  <span className="methodology-tool">RobustScaler & Log1p</span>
                </div>
                <div className="methodology-content">
                  <p>
                    Data leakage is the #1 cause of catastrophic production drops. Feature scalers, frequency encoders, and text tokenizers 
                    are fit strictly on training partitions. Validation and test samples never bleed into preprocessing transformations.
                  </p>
                  <div className="code-snippet" style={{ margin: 0 }}>
                    <pre>{`# Fit strictly on train; transform val and test partitions independently
scaler = RobustScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)    # Zero validation bleed`}</pre>
                  </div>
                </div>
              </div>

              <div className="methodology-item">
                <div className="methodology-meta">
                  <span className="methodology-num">02 // EVALUATION</span>
                  <span className="methodology-title">Objective Quality Gates</span>
                  <span className="methodology-tool">Automated CLI & Macro-F1</span>
                </div>
                <div className="methodology-content">
                  <p>
                    Overwriting serving models without an objective evaluation barrier invites regressions. 
                    Candidate models must exceed baseline macro-F1 on held-out validation sets before promotion filesystems are touched. 
                    Promotions execute atomically via <code>os.replace</code> with SHA-256 audit trails and one-command CLI rollback.
                  </p>
                  <div className="code-snippet" style={{ margin: 0 }}>
                    <pre>{`# Rejects underperforming models; atomic promotion on pass
if candidate_macro_f1 >= baseline_macro_f1:
    shutil.copy2(active_model, backup_path)
    os.replace(candidate_model, active_model)  # Atomic filesystem swap`}</pre>
                  </div>
                </div>
              </div>

              <div className="methodology-item">
                <div className="methodology-meta">
                  <span className="methodology-num">03 // SERVING</span>
                  <span className="methodology-title">Typed API Contracts</span>
                  <span className="methodology-tool">FastAPI & Pydantic V2</span>
                </div>
                <div className="methodology-content">
                  <p>
                    Production endpoints enforce strict Pydantic V2 schema contracts, rejecting malformed, missing, or out-of-range features. 
                    Models output calibrated class probabilities for downstream thresholding and log latency percentiles.
                  </p>
                  <div className="code-snippet" style={{ margin: 0 }}>
                    <pre>{`class TransactionPayload(BaseModel):
    Time: float
    Amount: float = Field(..., ge=0.0, le=50000.0)
    V1: float; V2: float; ... # Strictly typed feature validation`}</pre>
                  </div>
                </div>
              </div>

              <div className="methodology-item">
                <div className="methodology-meta">
                  <span className="methodology-num">04 // TELEMETRY</span>
                  <span className="methodology-title">Drift & Distribution Shift</span>
                  <span className="methodology-tool">PSI & Two-Sample KS Tests</span>
                </div>
                <div className="methodology-content">
                  <p>
                    Incoming inference batches are stored in telemetry logs to compute Population Stability Index (PSI) 
                    and Kolmogorov-Smirnov (KS) tests against baseline reference distributions, triggering automated alerts when distributions drift.
                  </p>
                  <div className="code-snippet" style={{ margin: 0 }}>
                    <pre>{`# Population Stability Index (PSI) drift alert
if psi_score > 0.25:
    logger.warning(f"Feature drift detected: PSI = {psi_score:.4f} > 0.25 threshold")`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECHNICAL EVIDENCE & VERIFICATION ARTIFACTS */}
        <section id="evidence" className="section-spacer">
          <div className="container">
            <div className="editorial-eyebrow">
              <CheckCircle2 size={13} /> Concrete Evidence
            </div>
            <h2 className="editorial-section-title">Technical Evidence & Artifacts</h2>
            <p className="editorial-section-desc">
              Direct verification artifacts demonstrating code quality, automated test coverage, and reproducible evaluation standards.
            </p>

            <div className="evidence-grid">
              {/* Evidence 1: Automated CI Tests */}
              <div className="evidence-card">
                <div className="evidence-tag">EVIDENCE // 01 &bull; AUTOMATED CI</div>
                <h3 className="evidence-title">68 Automated CI Tests Passing</h3>
                <p className="evidence-desc">
                  Every commit triggers automated test suites in GitHub Actions CI across Python 3.10 and 3.11 runners, validating preprocessing transformers, forward pass tensor shapes, quality gates, and FastAPI REST endpoints.
                </p>
                <div className="evidence-snippet">
                  <div>AUTOMOTIVE-IMAGE-CLASSIFIER: <strong>35 tests passed</strong> (&lt; 12s)</div>
                  <div style={{ marginTop: '4px' }}>Fraud-Guard-AI: <strong>33 tests passed</strong> (&lt; 8s)</div>
                  <div style={{ marginTop: '6px', color: 'var(--accent-leaf)' }}>STATUS: 100% PASS RATE IN CI</div>
                </div>
              </div>

              {/* Evidence 2: Promotion Audit Ledger */}
              <div className="evidence-card">
                <div className="evidence-tag">EVIDENCE // 02 &bull; AUDIT & ROLLBACK</div>
                <h3 className="evidence-title">Cryptographic Promotion Audit</h3>
                <p className="evidence-desc">
                  Automated promotion records SHA-256 checksums, candidate validation metrics, and timestamped backup paths into <code>models/promotion_history.json</code>, enabling instant rollback if unexpected distribution shifts occur.
                </p>
                <div className="evidence-snippet">
                  <div>SHA-256: <code>8f3b14a...e4a2</code></div>
                  <div style={{ marginTop: '4px' }}>ACTION: <code>os.replace(cand, prod)</code></div>
                  <div style={{ marginTop: '6px', color: 'var(--accent-leaf)' }}>ROLLBACK CLI GUARANTEE</div>
                </div>
              </div>

              {/* Evidence 3: Strict Val vs Test Partition */}
              <div className="evidence-card">
                <div className="evidence-tag">EVIDENCE // 03 &bull; EVALUATION RIGOR</div>
                <h3 className="evidence-title">Validation vs. Test Rigor</h3>
                <p className="evidence-desc">
                  Decision thresholds (threshold T = 0.43) were tuned exclusively on the 20% validation partition (56,962 txns) to maximize validation F1. All reported Precision (80.81%), Recall (81.63%), and PR-AUC (0.8140) are verified on the unseen test partition.
                </p>
                <div className="evidence-snippet">
                  <div>TRAIN: 170,883 (60%) &bull; VAL: 56,962 (20%)</div>
                  <div style={{ marginTop: '4px' }}>HELD-OUT TEST: 56,962 (20%)</div>
                  <div style={{ marginTop: '6px', color: 'var(--accent-leaf)' }}>ZERO OPTIMISTIC LEAKAGE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE & EDUCATION: HAIRLINE EDITORIAL TIMELINE */}
        <section id="experience" className="section-spacer" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="editorial-eyebrow">
              <Activity size={13} /> Practical Experience
            </div>
            <h2 className="editorial-section-title">Experience & Education</h2>
            <p className="editorial-section-desc">
              Verified software internships and academic foundation in Computer Science and Engineering.
            </p>

            <div className="editorial-timeline">
              {/* Internship 1 */}
              <div className="editorial-timeline-item">
                <div>
                  <div className="timeline-time">June 2025</div>
                  <div className="timeline-company">NextGenPro Innovations</div>
                  <div className="timeline-place">Ernakulam, Kerala &bull; On-site</div>
                </div>
                <div>
                  <div className="timeline-role-title">Data & Machine Learning Intern</div>
                  <ul className="timeline-bullets">
                    <li>Audited multi-class numerical and image datasets across feature distributions, identifying missing values, label anomalies, and extreme outliers using Python and NumPy.</li>
                    <li>Engineered data cleaning and preprocessing routines, standardizing feature scales and formatting structured arrays to establish clean baseline data for downstream modeling pipelines.</li>
                  </ul>
                </div>
              </div>

              {/* Internship 2 */}
              <div className="editorial-timeline-item">
                <div>
                  <div className="timeline-time">Oct. 2024 &ndash; Dec. 2024</div>
                  <div className="timeline-company">Corizo (in collab. with Wipro)</div>
                  <div className="timeline-place">Remote</div>
                </div>
                <div>
                  <div className="timeline-role-title">AI Project Intern</div>
                  <ul className="timeline-bullets">
                    <li>Evaluated baseline classification algorithms on structured clinical healthcare records across 13 physiological attributes, comparing model sensitivity to identify diagnostic risk patterns.</li>
                    <li>Built an interactive desktop prototype application using Python and Tkinter, integrating feature scaling logic to accept patient metrics and output risk classifications in real time.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="editorial-timeline-item">
                <div>
                  <div className="timeline-time">2022 &ndash; 2026</div>
                  <div className="timeline-company">APJ Abdul Kalam Technological Univ.</div>
                  <div className="timeline-place">Kerala, India</div>
                </div>
                <div>
                  <div className="timeline-role-title">Bachelor of Technology &bull; Computer Science and Engineering</div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                    <strong>Relevant Coursework:</strong> Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, Software Engineering.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications & Programs */}
            <div style={{ marginTop: '40px', padding: '20px 24px', background: 'var(--bg-surface-alt)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)' }}>
              <div className="mono-tag" style={{ marginBottom: '10px' }}>
                <CheckCircle2 size={14} /> Completed Technical Programs
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>AI & Machine Learning Program</strong> &bull; Corizo / Wipro (Dec 2024)<br/>
                  <span style={{ color: 'var(--text-muted)' }}>Supervised & unsupervised learning, statistical testing, and predictive modeling delivery.</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Robotics, AI & ML Workshop</strong> &bull; Shristi Campus, Technopark (June 2023)<br/>
                  <span style={{ color: 'var(--text-muted)' }}>Foundations of artificial intelligence, robotic control interfaces, and ML fundamentals.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CURATED TECHNICAL TOOLKIT */}
        <section id="skills" className="section-spacer">
          <div className="container">
            <div className="editorial-eyebrow">
              <Terminal size={13} /> Engineering Stack
            </div>
            <h2 className="editorial-section-title">Curated Technical Toolkit</h2>
            <p className="editorial-section-desc">
              Technologies and tools actively implemented across verified repositories, CI pipelines, and serving services.
            </p>

            <div className="editorial-toolkit-grid">
              <div className="toolkit-block">
                <div className="toolkit-header">// 01 MODEL DEVELOPMENT & DEEP LEARNING</div>
                <div className="toolkit-tags">
                  <span className="editorial-tag">PyTorch</span>
                  <span className="editorial-tag">TensorFlow / Keras</span>
                  <span className="editorial-tag">Scikit-learn</span>
                  <span className="editorial-tag">EfficientNetB0</span>
                  <span className="editorial-tag">Transfer Learning</span>
                  <span className="editorial-tag">CNNs</span>
                  <span className="editorial-tag">Logistic Regression</span>
                  <span className="editorial-tag">LinearSVC</span>
                  <span className="editorial-tag">Imbalanced Learning</span>
                </div>
              </div>

              <div className="toolkit-block">
                <div className="toolkit-header">// 02 MLOps & EXPERIMENTATION</div>
                <div className="toolkit-tags">
                  <span className="editorial-tag">Local MLflow</span>
                  <span className="editorial-tag">Automated Quality Gates</span>
                  <span className="editorial-tag">Atomic Rollback CLI</span>
                  <span className="editorial-tag">Config-Driven Pipelines (YAML)</span>
                  <span className="editorial-tag">PR-AUC Optimization</span>
                  <span className="editorial-tag">Pytest (68 Tests)</span>
                  <span className="editorial-tag">GitHub Actions CI</span>
                  <span className="editorial-tag">Git / GitHub</span>
                </div>
              </div>

              <div className="toolkit-block">
                <div className="toolkit-header">// 03 BACKEND & SERVING INFRASTRUCTURE</div>
                <div className="toolkit-tags">
                  <span className="editorial-tag">FastAPI</span>
                  <span className="editorial-tag">Pydantic V2</span>
                  <span className="editorial-tag">RESTful APIs</span>
                  <span className="editorial-tag">Streamlit</span>
                  <span className="editorial-tag">Docker Containerization</span>
                  <span className="editorial-tag">Uvicorn</span>
                  <span className="editorial-tag">PSI Drift Monitoring</span>
                  <span className="editorial-tag">Two-Sample KS Tests</span>
                </div>
              </div>

              <div className="toolkit-block">
                <div className="toolkit-header">// 04 LANGUAGES & FOUNDATIONS</div>
                <div className="toolkit-tags">
                  <span className="editorial-tag">Python (OOP, Typing)</span>
                  <span className="editorial-tag">SQL</span>
                  <span className="editorial-tag">NumPy</span>
                  <span className="editorial-tag">Pandas</span>
                  <span className="editorial-tag">C</span>
                  <span className="editorial-tag">Java</span>
                  <span className="editorial-tag">Data Structures & Algorithms</span>
                  <span className="editorial-tag">Operating Systems</span>
                  <span className="editorial-tag">DBMS</span>
                </div>
              </div>
            </div>

            {/* Extended Projects Archive Drawer */}
            <div style={{ marginTop: '56px', borderTop: '1px solid var(--border-subtle)', paddingTop: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <div className="mono-tag">// ARCHIVE & PROTOTYPES</div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                    Secondary Coursework & Academic Prototypes
                  </div>
                </div>
                <button 
                  onClick={() => setShowArchive(!showArchive)} 
                  className="btn btn-outline btn-sm"
                  aria-expanded={showArchive}
                >
                  {showArchive ? (
                    <>Hide Archive <ChevronUp size={13} /></>
                  ) : (
                    <>Expand Archive (4 Projects) <ChevronDown size={13} /></>
                  )}
                </button>
              </div>

              {showArchive && (
                <div className="archive-grid">
                  <div className="archive-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Cardiovascular Disease Prediction</h4>
                      <a href="https://github.com/conbott/CARDIOVASCULAR-DESEASE-PREDICTION" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      Heart disease risk classification evaluated across 13 physiological attributes using ensemble baselines and Tkinter desktop GUI.
                    </p>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                      Python &bull; Tkinter &bull; Scikit-learn
                    </div>
                  </div>

                  <div className="archive-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Credit Risk Prediction</h4>
                      <a href="https://github.com/conbott/Credit-Risk-Prediction" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      End-to-end loan default risk evaluation pipeline featuring tabular preprocessing and Streamlit interactive dashboard.
                    </p>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                      Python &bull; Streamlit &bull; Scikit-learn
                    </div>
                  </div>

                  <div className="archive-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Customer Churn Prediction</h4>
                      <a href="https://github.com/conbott/Customer-Churn-Prediction" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      Banking customer retention classifier modeling customer attrition likelihood with feature importance analysis and Streamlit UI.
                    </p>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                      Python &bull; Streamlit &bull; Pandas
                    </div>
                  </div>

                  <div className="archive-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)' }}>Pokémon FireRed Engine</h4>
                      <a href="https://github.com/conbott/PKMN-game" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                      A custom 2D turn-based game engine written in Python and Pygame implementing tilemap rendering, sprite animations, and battle state machines.
                    </p>
                    <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                      Python &bull; Pygame &bull; State Machine
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 7. INTENTIONAL CONTACT & FOOTER */}
        <section id="contact" className="editorial-contact" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="contact-layout">
              <div>
                <div className="editorial-eyebrow">
                  <Mail size={13} /> Open For Opportunities
                </div>
                <h2 className="editorial-section-title" style={{ marginBottom: '14px' }}>
                  Let's Discuss Engineering Roles
                </h2>
                <p className="editorial-section-desc" style={{ marginBottom: '24px' }}>
                  I am actively seeking machine learning engineering, MLOps, and backend software engineering roles 
                  where I can contribute to reliable, measurable, and production-ready systems.
                </p>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  LOCATION: Kerala, India &bull; Open to On-site, Hybrid & Remote Roles
                </div>
              </div>

              <div className="contact-buttons-col">
                <a href="mailto:stevesamuel.cse@gmail.com" className="contact-link-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} color="var(--accent-leaf)" />
                    <span>stevesamuel.cse@gmail.com</span>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </a>

                <a href="tel:+918848172665" className="contact-link-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Phone size={16} color="var(--accent-leaf)" />
                    <span>+91 8848172665</span>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </a>

                <a 
                  href="https://linkedin.com/in/steve-samuel-a10534343" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LinkedinIcon size={16} className="" />
                    <span>LinkedIn &bull; steve-samuel-a10534343</span>
                  </div>
                  <ExternalLink size={14} color="var(--text-muted)" />
                </a>

                <a 
                  href="/Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="var(--accent-leaf)" />
                    <span>Download Official Résumé (PDF)</span>
                  </div>
                  <ExternalLink size={14} color="var(--text-muted)" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Hairline Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            &copy; {new Date().getFullYear()} Steve Samuel &bull; All benchmark figures and architecture claims verified against public GitHub repositories.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://github.com/conbott" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
            <a href="https://linkedin.com/in/steve-samuel-a10534343" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">Résumé (PDF)</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
