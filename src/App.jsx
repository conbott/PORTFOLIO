import { useState } from 'react';
import {
  ExternalLink,
  Code2,
  Terminal,
  ArrowRight,
  Download,
  Briefcase,
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
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Activity,
  Phone,
  ImageIcon
} from 'lucide-react';
import './index.css';

// SVG GitHub icon component
const GithubIcon = ({ size = 20, className = "" }) => (
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
const LinkedinIcon = ({ size = 20, className = "" }) => (
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
  // Active tabs for project case studies
  const [activeTabA, setActiveTabA] = useState('lifecycle');
  const [activeTabB, setActiveTabB] = useState('imbalanced');
  const [activeTabC, setActiveTabC] = useState('nlp');
  
  // Interactive lifecycle stage selector in hero
  const [activeLifecycleStage, setActiveLifecycleStage] = useState(3);
  
  // Archive toggle
  const [showArchive, setShowArchive] = useState(false);

  // Tab definitions for accessible keyboard navigation (ArrowLeft / ArrowRight / Home / End)
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

  const lifecycleStages = [
    {
      num: "01",
      name: "Configuration",
      tool: "train_config.yaml",
      desc: "Centralized hyperparameter schemas, data paths, and reproducible random seeds.",
      detail: "Prevents silent environment drifts. Strict parameter schemas validate architectures and inputs before execution."
    },
    {
      num: "02",
      name: "Leakage-Safe Prep",
      tool: "Train Split Fit",
      desc: "Fit scalers and feature encoders strictly on training splits to prevent data leakage.",
      detail: "RobustScaler + Log1p transforms are learned exclusively on train partitions, ensuring zero validation bleed."
    },
    {
      num: "03",
      name: "Tracking & Eval",
      tool: "Local MLflow",
      desc: "Per-epoch metrics, PR-AUC, confusion matrices, and candidate artifacts stored locally.",
      detail: "Runs logged with complete loss curves, top-1 accuracy, and macro metrics across all class distributions."
    },
    {
      num: "04",
      name: "Promotion Gate",
      tool: "Macro-F1 / PR-AUC",
      desc: "Automated quality checks: candidate must exceed baseline before atomic promotion.",
      detail: "Rejects underperforming models. Overwriting serving models is forbidden; promotions create rollback backups & log SHA-256 hashes."
    },
    {
      num: "05",
      name: "Serving & Drift",
      tool: "FastAPI & PSI",
      desc: "Pydantic contract endpoints, calibrated probabilities, and distribution shift tracking.",
      detail: "Production APIs validate JSON contracts, monitor latency percentiles, and check feature drift via PSI & KS-tests."
    }
  ];

  return (
    <div className="portfolio-app">
      {/* Navigation Bar */}
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="brand">
            <span className="brand-dot"></span>
            <span>Steve Samuel</span>
            <span className="brand-tag">// ML Engineering</span>
          </a>

          <nav className="nav-menu" aria-label="Main Navigation">
            <a href="#projects" className="nav-link">Case Studies</a>
            <a href="#engineering" className="nav-link">Methodology</a>
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
              title="Open Steve Samuel's Résumé"
            >
              <FileText size={14} />
              <span>Résumé (PDF)</span>
            </a>
            <a 
              href="https://github.com/conbott" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm"
              aria-label="GitHub Profile (@conbott)"
            >
              <GithubIcon size={15} />
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-badge">
              <Activity size={13} />
              <span>B.Tech Computer Science &bull; Class of 2026</span>
            </div>

            <h1 className="hero-headline">
              I build machine learning systems that are <span className="highlight">measurable</span>, <span className="highlight">reproducible</span>, and <span className="highlight">deployable</span>.
            </h1>

            <p className="hero-lede">
              Computer Science graduate specializing in ML engineering, MLOps, and dependable software. 
              Experienced in fine-tuning deep learning models, optimizing decision thresholds for imbalanced financial data, 
              building automated model evaluation gates with rollback guarantees, and serving low-latency REST APIs.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-primary">
                Explore Case Studies <ArrowRight size={15} />
              </a>
              <a href="/Resume.pdf" download className="btn">
                <Download size={15} /> Download Résumé
              </a>
              <a 
                href="https://github.com/conbott" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
              >
                <GithubIcon size={16} /> GitHub (@conbott)
              </a>
              <a 
                href="https://linkedin.com/in/steve-samuel-a10534343" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </div>

            {/* Interactive Engineering Pipeline Architecture */}
            <div className="pipeline-visual">
              <div className="pipeline-header">
                <div className="pipeline-title">
                  <GitBranch size={16} color="var(--accent-leaf)" />
                  <span>The Verified MLOps Lifecycle Pipeline</span>
                </div>
                <div className="pipeline-status">
                  <CheckCircle2 size={14} />
                  <span>Click any stage to inspect design rationale</span>
                </div>
              </div>

              <div className="pipeline-flow" role="tablist" aria-label="MLOps Pipeline Stages">
                {lifecycleStages.map((stage, idx) => (
                  <div 
                    key={stage.num}
                    role="tab"
                    tabIndex={0}
                    aria-selected={activeLifecycleStage === idx}
                    className={`flow-step ${activeLifecycleStage === idx ? 'active' : ''}`}
                    onClick={() => setActiveLifecycleStage(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveLifecycleStage(idx);
                      }
                    }}
                  >
                    <div className="flow-step-num">{stage.num} &bull; {stage.tool}</div>
                    <div className="flow-step-name">{stage.name}</div>
                    <div className="flow-step-desc">{stage.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', padding: '14px 18px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sparkles size={18} color="var(--accent-leaf)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Stage {lifecycleStages[activeLifecycleStage].num} Architecture & Rationale: </strong>
                  {lifecycleStages[activeLifecycleStage].detail}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Case Studies Section */}
        <section id="projects" className="section-spacer">
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">
                <Layers size={14} /> Verified Implementations
              </div>
              <h2 className="section-title">Featured Engineering Projects</h2>
              <p className="section-desc">
                In-depth technical case studies documenting model architecture, leakage-safe data splits, 
                automated quality gates, verified test benchmarks, and deployment realities.
              </p>
            </div>

            <div className="projects-container">
              
              {/* ======================================================== */}
              {/* PROJECT A: AUTOMOTIVE IMAGE CLASSIFIER */}
              {/* ======================================================== */}
              <article className="project-card">
                <div className="project-hero-bar">
                  <div className="project-identity">
                    <div className="project-tagline-badge">
                      <span className="project-type-chip">Flagship DLOps Platform</span>
                      <span className="project-date">June 2026 &ndash; October 2026</span>
                    </div>
                    <h3 className="project-title">Automotive Image Classifier</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                      End-to-End DLOps fine-tuning of EfficientNetB0 across 196 Stanford Cars classes with configuration-driven training, MLflow tracking, automated macro-F1 quality gates, atomic model promotion, and rollback guarantees.
                    </p>
                  </div>

                  <div className="project-quick-actions">
                    <a 
                      href="https://github.com/conbott/AUTOMOTIVE-IMAGE-CLASSIFIER" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline btn-sm"
                    >
                      <GithubIcon size={14} /> Source Code
                    </a>
                    <a 
                      href="https://conbott-automotive-ai.streamlit.app" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary btn-sm"
                    >
                      <ExternalLink size={14} /> Live Streamlit Demo
                    </a>
                  </div>
                </div>

                {/* Case Study Tabs */}
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
                      <Cpu size={14} /> Lifecycle & Architecture
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
                      <ShieldAlert size={14} /> Quality Gate & Rollback
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
                      <BarChart3 size={14} /> Benchmark Evaluation
                    </button>
                    <button 
                      id="tab-a-interface"
                      role="tab"
                      aria-selected={activeTabA === 'interface'}
                      aria-controls="panel-a-interface"
                      tabIndex={activeTabA === 'interface' ? 0 : -1}
                      className={`tab-btn ${activeTabA === 'interface' ? 'active' : ''}`}
                      onClick={() => setActiveTabA('interface')}
                      onKeyDown={(e) => handleTabKeyDown(e, 'A')}
                    >
                      <ImageIcon size={14} /> Interface & App Preview
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
                      <Terminal size={14} /> Reproduction & CI (35 Tests)
                    </button>
                  </div>
                </div>

                <div className="case-body">
                  {activeTabA === 'lifecycle' && (
                    <div role="tabpanel" id="panel-a-lifecycle" aria-labelledby="tab-a-lifecycle" tabIndex={0}>
                      <div className="metrics-grid">
                        <div className="metric-box">
                          <div className="metric-label">Target Classes</div>
                          <div className="metric-value">196</div>
                          <div className="metric-subtext">Stanford Cars fine-grained categories</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Dataset Split</div>
                          <div className="metric-value">8,144</div>
                          <div className="metric-subtext">6,515 train / 1,629 val (0 overlap)</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Val Macro F1</div>
                          <div className="metric-value highlight">0.5698</div>
                          <div className="metric-subtext">Baseline Quality Gate threshold</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">CI Test Suite</div>
                          <div className="metric-value">35 Tests</div>
                          <div className="metric-subtext">GitHub Actions CI run time &lt; 12s</div>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        System Architecture & Data Flow
                      </h4>
                      <div className="arch-diagram">
                        <pre>{`[configs/train_config.yaml] ──▶ [src/config.py Schema Validator]
  └──▶ [src/dataset.py: 224x224 RGB Augmentation / Deterministic Val Split (1,629 images)]
        └──▶ [src/train.py: EfficientNetB0 Transfer Learning + MLflow Epoch Callback]
              └──▶ [artifacts/runs/run_id/ (candidate_model.keras + metrics.json)]
                    └──▶ [src/promote.py Quality Gate: Macro F1 ≥ 0.5698 required]
                          ├── FAIL ──▶ Log Rejection to models/promotion_history.json (Serving Untouched)
                          └── PASS ──▶ Create Backup ──▶ Atomic os.replace ──▶ Streamlit Serving`}</pre>
                      </div>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><GitBranch size={16} color="var(--accent-leaf)" /> Configuration-Driven Pipeline</h4>
                          <p>
                            All hyperparameters (learning rates, batch sizes, image dimensions, unfreeze layers) are managed declaratively in <code>configs/train_config.yaml</code>. No hardcoded magic constants inside training loops.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><Server size={16} color="var(--accent-leaf)" /> Single-Pass Softmax Serving</h4>
                          <p>
                            The Streamlit application eliminates double-softmax distortion by consuming raw class logits directly, preventing probability artificial shrinkage or inflation during inference.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabA === 'quality-gate' && (
                    <div role="tabpanel" id="panel-a-quality-gate" aria-labelledby="tab-a-quality-gate" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Automated Gate Validation & Rollback Protection
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        In machine learning engineering, overwriting active models without an objective evaluation barrier invites regressions. The Automotive Image Classifier implements an explicit CLI promotion gate in <code>src/promote.py</code>:
                      </p>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><ShieldAlert size={16} color="var(--accent-leaf)" /> 1. Input Shape & Class Verification</h4>
                          <p>
                            Before evaluation, the gate inspects candidate tensor shapes <code>(None, 224, 224, 3)</code> and ensures exact alignment with the 196 Stanford Cars classes mapped in <code>models/classes.txt</code>.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><AlertTriangle size={16} color="var(--color-warning)" /> 2. Objective Threshold Comparison</h4>
                          <p>
                            Candidate validation Macro F1 is computed on the 1,629 validation images. If <code>F1 &lt; 0.5698</code>, the candidate is automatically rejected, recorded in <code>promotion_history.json</code>, and the serving model remains untouched.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><RotateCcw size={16} color="var(--accent-leaf)" /> 3. Atomic Promotion & Backups</h4>
                          <p>
                            Upon passing, a timestamped backup is saved to <code>models/backups/</code>. Promotion executes via <code>os.replace</code> (atomic in filesystem operations) to eliminate zero-byte serving downtime.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><CheckCircle2 size={16} color="var(--accent-leaf)" /> 4. One-Command Rollback CLI</h4>
                          <p>
                            If an active model demonstrates unexpected drift or behavior, rolling back is executed with: <code>python src/promote.py --rollback models/car_classifier_baseline_backup.keras</code>.
                          </p>
                        </div>
                      </div>

                      <div className="code-snippet" style={{ marginTop: '20px' }}>
                        <pre>{`# Sample Promotion Audit Record (models/promotion_history.json)
{
  "timestamp": "2026-10-18T14:32:01Z",
  "candidate_run": "candidate_run_01",
  "validation_macro_f1": 0.5812,
  "baseline_macro_f1": 0.5698,
  "decision": "PROMOTED",
  "sha256": "8f3b14...e4a2",
  "backup_path": "models/backups/car_classifier_backup_20261018_143201.keras"
}`}</pre>
                      </div>
                    </div>
                  )}

                  {activeTabA === 'metrics' && (
                    <div role="tabpanel" id="panel-a-metrics" aria-labelledby="tab-a-metrics" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Baseline Benchmark Metrics (1,629 Validation Images)
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        Evaluated deterministically across all 196 classes on the unbatched validation split.
                      </p>

                      <div className="data-table-wrapper">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Metric</th>
                              <th>Score</th>
                              <th>Evaluation Context</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="champion-row">
                              <td>Validation Macro F1</td>
                              <td><strong>0.5698</strong></td>
                              <td>Promotion quality gate threshold across all 196 classes</td>
                            </tr>
                            <tr>
                              <td>Validation Top-1 Accuracy</td>
                              <td>57.34%</td>
                              <td>Exact class match across 1,629 validation images</td>
                            </tr>
                            <tr>
                              <td>Validation Macro Precision</td>
                              <td>63.38%</td>
                              <td>Unweighted average precision across 196 vehicle categories</td>
                            </tr>
                            <tr>
                              <td>Validation Macro Recall</td>
                              <td>57.39%</td>
                              <td>Unweighted average recall across 196 vehicle categories</td>
                            </tr>
                            <tr>
                              <td>Validation Loss</td>
                              <td>1.6796</td>
                              <td>Categorical cross-entropy</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="limitation-box">
                        <AlertTriangle size={18} />
                        <div>
                          <strong>Honest Production Limitation & Smoke Test Finding:</strong>
                          <p>
                            Fine-grained car classification involves extreme intra-class similarity (e.g. sub-models, trim packages, and model years). 
                            During real-image smoke testing, an Acura Integra was classified as a Ferrari California Convertible at 50.12% confidence, 
                            illustrating expected baseline boundary limitations. These figures represent an initial transfer-learning baseline on an 80/20 split, 
                            not state-of-the-art production performance.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabA === 'interface' && (
                    <div role="tabpanel" id="panel-a-interface" aria-labelledby="tab-a-interface" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Streamlit Application Interface & Inference Preview
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        Real screenshots captured from the deployed Streamlit inference application displaying the top-3 predictions, single-pass softmax confidence scores, and verified model metadata:
                      </p>

                      <div className="project-preview-wrap">
                        <div className="preview-topbar">
                          <span className="preview-dot"></span>
                          <span className="preview-dot"></span>
                          <span className="preview-dot"></span>
                          <span style={{ marginLeft: '6px' }}>conbott-automotive-ai.streamlit.app — Inference Interface</span>
                        </div>
                        <img 
                          src="/auto-1.png" 
                          alt="Automotive Image Classifier Streamlit Interface" 
                          className="project-img"
                        />
                      </div>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><CheckCircle2 size={16} color="var(--accent-leaf)" /> Top-3 Confidence Ranking</h4>
                          <p>
                            Outputs the top-3 model predictions with individual confidence percentages, giving operators transparency into prediction uncertainty on ambiguous vehicle trims.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><Server size={16} color="var(--accent-leaf)" /> Dynamic Model Caching</h4>
                          <p>
                            Monitors model file modification time (<code>mtime</code>) to invalidate and reload memory cache automatically when new models are promoted without restarting the server.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabA === 'repro' && (
                    <div role="tabpanel" id="panel-a-repro" aria-labelledby="tab-a-repro" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Local Reproduction & Automated Testing
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        The test suite runs against synthetic fixtures and temporary directories without requiring multi-gigabyte dataset downloads:
                      </p>

                      <div className="code-snippet">
                        <pre>{`# 1. Clone repository & install dependencies
git clone https://github.com/conbott/AUTOMOTIVE-IMAGE-CLASSIFIER.git
cd AUTOMOTIVE-IMAGE-CLASSIFIER
pip install -r requirements.txt

# 2. Run the 35 automated tests (passes in < 12s in GitHub Actions CI)
python -m pytest tests/ -v

# 3. Launch local Streamlit application
streamlit run app/main.py`}</pre>
                      </div>

                      <div className="demo-fallback-box">
                        <div className="demo-fallback-header">
                          <Server size={16} color="var(--accent-leaf)" />
                          <span>Streamlit Community Cloud Deployment Note</span>
                        </div>
                        <div className="demo-fallback-text">
                          The live demo is hosted on Streamlit Cloud at <a href="https://conbott-automotive-ai.streamlit.app" target="_blank" rel="noopener noreferrer">conbott-automotive-ai.streamlit.app</a>. If the instance is sleeping, click to wake it up or run locally using the commands above.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {/* ======================================================== */}
              {/* PROJECT B: FRAUDGUARD AI */}
              {/* ======================================================== */}
              <article className="project-card">
                <div className="project-hero-bar">
                  <div className="project-identity">
                    <div className="project-tagline-badge">
                      <span className="project-type-chip">Flagship MLOps Platform</span>
                      <span className="project-date">October 2026</span>
                    </div>
                    <h3 className="project-title">FraudGuard AI &mdash; Imbalanced MLOps & API Service</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                      End-to-end fraud detection platform built on 284,807 transactions (0.172% fraud prevalence). Demonstrates leakage-safe feature scaling, decision threshold optimization on validation data, champion promotion, FastAPI serving, and drift monitoring.
                    </p>
                  </div>

                  <div className="project-quick-actions">
                    <a 
                      href="https://github.com/conbott/Fraud-Guard-AI" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline btn-sm"
                    >
                      <GithubIcon size={14} /> Source Code
                    </a>
                    <a 
                      href="https://conbott-fraudguard.streamlit.app" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary btn-sm"
                    >
                      <ExternalLink size={14} /> Live Streamlit Demo
                    </a>
                  </div>
                </div>

                {/* Case Study Tabs */}
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
                      <BarChart3 size={14} /> Imbalanced Learning & Metrics
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
                      <ShieldAlert size={14} /> Threshold Tuning & Confusion Matrix
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
                      <Server size={14} /> FastAPI & Drift Monitoring
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
                      <Terminal size={14} /> Reproduction & CI (33 Tests)
                    </button>
                  </div>
                </div>

                <div className="case-body">
                  {activeTabB === 'imbalanced' && (
                    <div role="tabpanel" id="panel-b-imbalanced" aria-labelledby="tab-b-imbalanced" tabIndex={0}>
                      <div className="metrics-grid">
                        <div className="metric-box">
                          <div className="metric-label">Dataset & Partitions</div>
                          <div className="metric-value">284,807</div>
                          <div className="metric-subtext">492 frauds (0.1727%) &bull; 60% Train / 20% Val / 20% Test</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Val Tuning Split (56,962 txns)</div>
                          <div className="metric-value">0.7693 / 0.8280</div>
                          <div className="metric-subtext">Val PR-AUC / Val F1 at tuned T = 0.43</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Held-Out Test PR-AUC</div>
                          <div className="metric-value highlight">0.8140</div>
                          <div className="metric-subtext">56,962 unseen test txns &bull; ROC-AUC 0.9717</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Held-Out Test Precision / Recall</div>
                          <div className="metric-value highlight">80.81% / 81.63%</div>
                          <div className="metric-subtext">FPR: 0.0334% (19 false alarms / 56,864 negatives)</div>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Why Conventional Accuracy Is Meaningless in Fraud Detection
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        In an imbalanced dataset with 0.172% fraud cases, a trivial dummy baseline that blindly predicts all transactions as legitimate achieves <strong>99.83% accuracy</strong> while catching exactly 0 frauds. 
                        In financial applications, missing a fraudulent transaction costs money (false negative), while blocking a legitimate customer card causes customer churn (false positive). 
                        FraudGuard AI evaluates performance using <strong>Precision-Recall AUC (PR-AUC)</strong>, precision, recall, and false positive rates.
                      </p>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><Database size={16} color="var(--accent-leaf)" /> Leakage-Safe Feature Pipeline</h4>
                          <p>
                            Numerical features (<code>Amount</code>) undergo <code>RobustScaler</code> and <code>log1p</code> transforms fit strictly on the training partition. Scaler parameters never see validation or test samples prior to inference.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><Cpu size={16} color="var(--accent-leaf)" /> Offline IEEE-CIS Scale Safeguards</h4>
                          <p>
                            Includes a dedicated pipeline for the 590,540-transaction IEEE-CIS dataset (434 features), utilizing int32/float32 downcasting and categorical frequency encoding to cap memory usage under 2.5 GB.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabB === 'thresholds' && (
                    <div role="tabpanel" id="panel-b-thresholds" aria-labelledby="tab-b-thresholds" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Decision Threshold Optimization & Split Comparison
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        To prevent optimistic evaluation leakage, decision thresholds were tuned exclusively on the 20% validation split (56,962 transactions) to maximize validation F1-score. Final performance was then independently evaluated against the 20% held-out test split (56,962 transactions):
                      </p>

                      <div className="data-table-wrapper">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Split Strategy</th>
                              <th>Tuned Threshold</th>
                              <th>Val Tuning Split (Val PR-AUC / Val F1)</th>
                              <th>Held-Out Test PR-AUC</th>
                              <th>Held-Out Test ROC-AUC</th>
                              <th>Test Precision</th>
                              <th>Test Recall</th>
                              <th>Test FPR</th>
                              <th>Held-Out Test Confusion Matrix</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="champion-row">
                              <td>Stratified Split (60/20/20) [Champion]</td>
                              <td>0.43</td>
                              <td>0.7693 / 0.8280</td>
                              <td>0.8140</td>
                              <td>0.9717</td>
                              <td>80.81%</td>
                              <td>81.63%</td>
                              <td>0.0334%</td>
                              <td>TP: 80 | FP: 19 | TN: 56,845 | FN: 18</td>
                            </tr>
                            <tr>
                              <td>Chronological Split (Temporal Ordering)</td>
                              <td>0.34</td>
                              <td>0.7508 / 0.8350</td>
                              <td>0.8151</td>
                              <td>0.9547</td>
                              <td>89.06%</td>
                              <td>76.00%</td>
                              <td>0.0123%</td>
                              <td>TP: 57 | FP: 7 | TN: 56,879 | FN: 18</td>
                            </tr>
                            <tr>
                              <td>Logistic Regression Baseline</td>
                              <td>0.95</td>
                              <td>0.6942 / 0.4412</td>
                              <td>0.7168</td>
                              <td>0.9724</td>
                              <td>30.00%</td>
                              <td>88.78%</td>
                              <td>0.3570%</td>
                              <td>TP: 87 | FP: 203 | TN: 56,661 | FN: 11</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginTop: '24px', marginBottom: '8px' }}>
                        Verified Held-Out Test Confusion Matrix (56,962 Transactions at T = 0.43)
                      </h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                        Evaluated on the unseen 20% test partition: across 56,864 negative transactions, only 19 produced false alarms (0.0334% FPR), while capturing 80 out of 98 fraud events (81.63% recall).
                      </p>

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

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><CheckCircle2 size={16} color="var(--accent-leaf)" /> Temporal Shift Resilience</h4>
                          <p>
                            In the chronological split (training on the first 60% of timeline, testing on the last 20%), the model produced only 7 false alarms across 56,886 legitimate transactions while capturing 76.00% of frauds (Test PR-AUC 0.8151), demonstrating robustness against evolving spending patterns.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><ShieldAlert size={16} color="var(--accent-leaf)" /> Strict Val vs. Test Separation</h4>
                          <p>
                            Decision thresholds ($T=0.43$ stratified, $T=0.34$ chronological) were tuned exclusively on the 20% validation partition (56,962 txns) to maximize validation F1. All reported Precision (80.81%), Recall (81.63%), and PR-AUC (0.8140) are verified on the independent held-out test partition.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabB === 'api' && (
                    <div role="tabpanel" id="panel-b-api" aria-labelledby="tab-b-api" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Production Serving Architecture & Drift Telemetry
                      </h4>
                      <div className="arch-diagram">
                        <pre>{`[Client Request] ──▶ [FastAPI /predict, /predict/batch with Pydantic V2]
  └──▶ [DataValidator: Type & Range Check on V1-V28, Amount, Time]
        └──▶ [Active Champion Model: Predict Probability]
              └──▶ [Apply Tuned Threshold T = 0.43 ──▶ Binary Decision & Risk Score]
                    ├──▶ [Response: Status, Risk Category, Latency ms]
                    └──▶ [SQLite Telemetry Store] ──▶ [Drift Monitor: PSI & KS-Tests]`}</pre>
                      </div>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><Server size={16} color="var(--accent-leaf)" /> FastAPI REST Endpoints</h4>
                          <p>
                            Includes typed endpoints with interactive Swagger documentation: <code>/health</code>, <code>/predict</code> (single transaction), and <code>/predict/batch</code> (CSV or bulk JSON payload).
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><Activity size={16} color="var(--accent-leaf)" /> Data & Feature Drift Monitoring</h4>
                          <p>
                            Computes Population Stability Index (PSI) and two-sample Kolmogorov-Smirnov (KS) tests between baseline reference features and incoming production batches to alert operators of distribution shifts.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabB === 'repro' && (
                    <div role="tabpanel" id="panel-b-repro" aria-labelledby="tab-b-repro" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Reproduction & CI Test Suite (33 Tests, 100% Pass)
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        Tested natively on Windows and Linux without requiring paid cloud APIs or Docker:
                      </p>

                      <div className="code-snippet">
                        <pre>{`# 1. Clone & install dependencies
git clone https://github.com/conbott/Fraud-Guard-AI.git
cd Fraud-Guard-AI
pip install -r requirements-dev.txt

# 2. Run automated test suite (Unit & Integration, 33 tests)
python -m pytest tests/ -v --cov=src

# 3. Launch FastAPI server (Interactive docs at http://localhost:8000/docs)
python -m uvicorn src.api.app:app --host 127.0.0.1 --port 8000

# 4. Launch Streamlit operations dashboard
streamlit run src/dashboard/app.py`}</pre>
                      </div>

                      <div className="demo-fallback-box">
                        <div className="demo-fallback-header">
                          <Server size={16} color="var(--accent-leaf)" />
                          <span>Streamlit Community Cloud Deployment Note</span>
                        </div>
                        <div className="demo-fallback-text">
                          The live dashboard is hosted on Streamlit Cloud at <a href="https://conbott-fraudguard.streamlit.app" target="_blank" rel="noopener noreferrer">conbott-fraudguard.streamlit.app</a>. If the instance is sleeping, click to wake it up or run locally using the commands above.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {/* ======================================================== */}
              {/* PROJECT C: IMDB SENTIMENT ANALYSIS PLATFORM */}
              {/* ======================================================== */}
              <article className="project-card">
                <div className="project-hero-bar">
                  <div className="project-identity">
                    <div className="project-tagline-badge">
                      <span className="project-type-chip">NLP & API Architecture</span>
                      <span className="project-date">October 2026</span>
                    </div>
                    <h3 className="project-title">IMDb Sentiment Analysis Platform</h3>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
                      End-to-end NLP binary classification pipeline across 50,000 IMDb movie reviews. Features custom negation-preserving text normalization, multi-model benchmarking, calibrated confidence scoring, a FastAPI REST backend with Pydantic validation, and Docker containerization.
                    </p>
                  </div>

                  <div className="project-quick-actions">
                    <a 
                      href="https://github.com/conbott/Sentiment-Analysis" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline btn-sm"
                    >
                      <GithubIcon size={14} /> Source Code
                    </a>
                    <a 
                      href="https://conbott-sentiment-analysis.streamlit.app" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary btn-sm"
                    >
                      <ExternalLink size={14} /> Live Streamlit Demo
                    </a>
                  </div>
                </div>

                {/* Case Study Tabs */}
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
                      <Code2 size={14} /> NLP Pipeline & Negation
                    </button>
                    <button 
                      id="tab-c-benchmarks"
                      role="tab"
                      aria-selected={activeTabC === 'benchmarks'}
                      aria-controls="panel-c-benchmarks"
                      tabIndex={activeTabC === 'benchmarks' ? 0 : -1}
                      className={`tab-btn ${activeTabC === 'benchmarks' ? 'active' : ''}`}
                      onClick={() => setActiveTabC('benchmarks')}
                      onKeyDown={(e) => handleTabKeyDown(e, 'C')}
                    >
                      <BarChart3 size={14} /> Model Benchmarks
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
                      <Server size={14} /> FastAPI & Docker Serving
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
                      <Terminal size={14} /> Reproduction & Commands
                    </button>
                  </div>
                </div>

                <div className="case-body">
                  {activeTabC === 'nlp' && (
                    <div role="tabpanel" id="panel-c-nlp" aria-labelledby="tab-c-nlp" tabIndex={0}>
                      <div className="metrics-grid">
                        <div className="metric-box">
                          <div className="metric-label">Dataset Scale</div>
                          <div className="metric-value">50,000</div>
                          <div className="metric-subtext">49,582 unique (418 duplicates purged)</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Test Accuracy</div>
                          <div className="metric-value highlight">90.92%</div>
                          <div className="metric-subtext">On 9,917 held-out test reviews</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">ROC-AUC</div>
                          <div className="metric-value highlight">0.968</div>
                          <div className="metric-subtext">High discrimination capability</div>
                        </div>
                        <div className="metric-box">
                          <div className="metric-label">Training Latency</div>
                          <div className="metric-value">0.49s</div>
                          <div className="metric-subtext">Fast inference with calibrated probabilities</div>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Negation-Preserving Text Normalization
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Standard stopword filtering removes tokens such as "not", "no", and "never". In sentiment analysis, this inverts meaning: "not good" is stripped into "good", generating false positive predictions. 
                        This pipeline expands contractions (e.g. "don't" &#8594; "do not") and preserves emotional negation modifiers to safeguard polarity context.
                      </p>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><Code2 size={16} color="var(--accent-leaf)" /> (1, 2) N-Gram Feature Engineering</h4>
                          <p>
                            Combines unigrams and bigrams across 25,000 vocabulary features, capturing multi-word phrases like "waste of time" and "masterfully acted".
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><Database size={16} color="var(--accent-leaf)" /> Sublinear Term Frequency Scaling</h4>
                          <p>
                            Applies <code>1 + log(TF)</code> dampening to prevent disproportionately lengthy movie essays from drowning out concise review signals.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabC === 'benchmarks' && (
                    <div role="tabpanel" id="panel-c-benchmarks" aria-labelledby="tab-c-benchmarks" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Multi-Model Benchmark Comparison (9,917 Held-Out Reviews)
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                        All models were evaluated on the independent 20% stratified hold-out test set using identical TF-IDF feature matrices:
                      </p>

                      <div className="data-table-wrapper">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Classifier Model</th>
                              <th>Accuracy</th>
                              <th>Precision</th>
                              <th>Recall</th>
                              <th>F1-Score</th>
                              <th>Training Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="champion-row">
                              <td>Logistic Regression (C=2.0) [Champion]</td>
                              <td>90.92%</td>
                              <td>90.01%</td>
                              <td>92.14%</td>
                              <td>91.06%</td>
                              <td>0.49 s</td>
                            </tr>
                            <tr>
                              <td>Linear Support Vector Classifier (LinearSVC)</td>
                              <td>90.39%</td>
                              <td>90.12%</td>
                              <td>90.88%</td>
                              <td>90.50%</td>
                              <td>1.27 s</td>
                            </tr>
                            <tr>
                              <td>Multinomial Naive Bayes (Baseline)</td>
                              <td>87.99%</td>
                              <td>87.45%</td>
                              <td>88.78%</td>
                              <td>88.11%</td>
                              <td>0.03 s</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><CheckCircle2 size={16} color="var(--accent-leaf)" /> Why Logistic Regression Won</h4>
                          <p>
                            While LinearSVC achieved comparable accuracy (90.39%), Logistic Regression delivered higher recall (92.14%), faster convergence (0.49s), and critically, outputs calibrated posterior probabilities for production confidence scores.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><ShieldAlert size={16} color="var(--accent-leaf)" /> Test Set Rigor</h4>
                          <p>
                            Raw reviews were first deduplicated (removing 418 duplicate entries) to prevent train-test contamination before partitioning the 9,917 test samples.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabC === 'api' && (
                    <div role="tabpanel" id="panel-c-api" aria-labelledby="tab-c-api" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        FastAPI REST Backend & Container Deployment
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Demonstrates taking an NLP model beyond a Jupyter notebook into a validated REST service and containerized application:
                      </p>

                      <div className="arch-diagram">
                        <pre>{`[Client POST /predict] ──▶ [Pydantic ReviewRequest Schema Validation]
  └──▶ [Custom Negation-Preserving Cleaner]
        └──▶ [Sublinear TF-IDF Vectorizer (25,000 features)]
              └──▶ [Calibrated Logistic Regression Inference]
                    └──▶ [JSON Response: sentiment, label, confidence_pct, probabilities]

[Streamlit UI] ──▶ Interactive text area, sample presets, & bulk CSV batch prediction`}</pre>
                      </div>

                      <div className="decision-grid">
                        <div className="decision-card">
                          <h4><Server size={16} color="var(--accent-leaf)" /> Pydantic Schema Contracts</h4>
                          <p>
                            Requests are strictly validated (rejecting empty or non-string inputs). Swagger UI provides interactive endpoint testing at <code>/docs</code>.
                          </p>
                        </div>
                        <div className="decision-card">
                          <h4><Layers size={16} color="var(--accent-leaf)" /> Docker Containerization</h4>
                          <p>
                            Packaged via <code>Dockerfile</code> exposing both the FastAPI backend on port 8000 and the Streamlit UI on port 8501.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTabC === 'repro' && (
                    <div role="tabpanel" id="panel-c-repro" aria-labelledby="tab-c-repro" tabIndex={0}>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        Local Reproduction & Execution Guide
                      </h4>

                      <div className="code-snippet">
                        <pre>{`# 1. Clone repository & install dependencies
git clone https://github.com/conbott/Sentiment-Analysis.git
cd Sentiment-Analysis
pip install -r requirements.txt

# 2. Launch FastAPI backend (Swagger at http://localhost:8000/docs)
python app/api.py

# 3. Launch interactive Streamlit interface
python -m streamlit run app/ui.py

# 4. Optional: Run with Docker
docker build -t sentiment-analysis-app .
docker run -p 8000:8000 -p 8501:8501 sentiment-analysis-app`}</pre>
                      </div>

                      <div className="demo-fallback-box">
                        <div className="demo-fallback-header">
                          <Server size={16} color="var(--accent-leaf)" />
                          <span>Streamlit Community Cloud Deployment Note</span>
                        </div>
                        <div className="demo-fallback-text">
                          The live interface is deployed on Streamlit Cloud at <a href="https://conbott-sentiment-analysis.streamlit.app" target="_blank" rel="noopener noreferrer">conbott-sentiment-analysis.streamlit.app</a>. If sleeping, click to wake up or run locally via the steps above.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* Engineering Methodology Section */}
        <section id="engineering" className="section-spacer" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">
                <ShieldAlert size={14} /> Core Engineering Approach
              </div>
              <h2 className="section-title">How I Approach ML Quality & Reliability</h2>
              <p className="section-desc">
                Engineering machine learning systems requires moving beyond optimistic notebook accuracy to ensure models are measurable, durable, and resilient to production failure modes.
              </p>
            </div>

            <div className="principles-grid">
              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <BarChart3 size={20} />
                </div>
                <h3>1. Measurable, Leakage-Safe Evaluation</h3>
                <p>
                  Never evaluate models on leaked data or misleading aggregate metrics. Feature transformers (scalers, encoders, tokenizers) are fit strictly on training splits. On imbalanced problems, decision thresholds are optimized on validation partitions and evaluated via PR-AUC and False Positive Rates, rather than deceptively high overall accuracy.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <ShieldAlert size={20} />
                </div>
                <h3>2. Automated Quality Gates & Rollback</h3>
                <p>
                  Model promotion must be guarded by automated gates rather than manual overwrites. Candidates must beat baseline metrics (e.g. macro-F1 $\ge$ 0.5698) on held-out validation data. Promotions execute atomically via <code>os.replace</code> with automatic timestamped backups and SHA-256 audit logs to guarantee zero-downtime rollback.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <Server size={20} />
                </div>
                <h3>3. Typed API Contracts & Production Serving</h3>
                <p>
                  Models are served through strongly typed REST APIs using FastAPI and Pydantic schemas. Every endpoint enforces strict input bounds, outputs calibrated class probabilities, logs inference latency telemetry, and provides both single-sample and bulk CSV batch prediction paths.
                </p>
              </div>

              <div className="principle-card">
                <div className="principle-icon-wrap">
                  <GitBranch size={20} />
                </div>
                <h3>4. Reproducibility & Continuous Testing</h3>
                <p>
                  Centralized YAML configurations (<code>train_config.yaml</code>) and deterministic random seeds ensure training runs are reproducible. Automated test suites in Pytest run in GitHub Actions CI to validate data loaders, forward passes, quality gates, and REST routes before any commit is merged.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="section-spacer">
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">
                <Briefcase size={14} /> Practical Journey
              </div>
              <h2 className="section-title">Experience & Education</h2>
              <p className="section-desc">
                Verified internships and academic background establishing foundational data engineering and machine learning skills.
              </p>
            </div>

            <div className="timeline-section">
              {/* Internship 1 */}
              <div className="timeline-entry">
                <div className="timeline-meta">
                  <span className="timeline-dates">June 2025</span>
                  <span className="timeline-org">NextGenPro Innovations</span>
                  <span className="timeline-location">Ernakulam, Kerala &bull; On-site</span>
                </div>
                <div>
                  <div className="timeline-role">Data & Machine Learning Intern</div>
                  <ul className="timeline-bullets">
                    <li>Audited multi-class numerical and image datasets across feature distributions, identifying missing values, label anomalies, and extreme outliers using Python and NumPy.</li>
                    <li>Engineered data cleaning and preprocessing routines, standardizing feature scales and formatting structured arrays to establish clean baseline data for downstream modeling pipelines.</li>
                  </ul>
                </div>
              </div>

              {/* Internship 2 */}
              <div className="timeline-entry">
                <div className="timeline-meta">
                  <span className="timeline-dates">Oct. 2024 &ndash; Dec. 2024</span>
                  <span className="timeline-org">Corizo (in collab. with Wipro)</span>
                  <span className="timeline-location">Remote</span>
                </div>
                <div>
                  <div className="timeline-role">AI Project Intern</div>
                  <ul className="timeline-bullets">
                    <li>Evaluated baseline classification algorithms on structured clinical healthcare records across 13 physiological attributes, comparing model sensitivity to identify diagnostic risk patterns.</li>
                    <li>Built an interactive desktop prototype application using Python and Tkinter, integrating feature scaling logic to accept patient metrics and output risk classifications in real time.</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="timeline-entry">
                <div className="timeline-meta">
                  <span className="timeline-dates">2022 &ndash; 2026</span>
                  <span className="timeline-org">APJ Abdul Kalam Technological Univ.</span>
                  <span className="timeline-location">Kerala, India</span>
                </div>
                <div>
                  <div className="timeline-role">Bachelor of Technology &bull; Computer Science and Engineering</div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    <strong>Relevant Coursework:</strong> Machine Learning, Deep Learning, Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, Software Engineering.
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Certifications */}
            <div style={{ marginTop: '36px', padding: '20px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="var(--accent-leaf)" /> Completed Technical Workshops & Programs
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>AI & Machine Learning Program</strong> &bull; Corizo / Wipro (Dec 2024)<br/>
                  <span style={{ color: 'var(--text-muted)' }}>ML algorithms, exploratory analysis, and predictive modeling project delivery.</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Robotics, AI & ML Workshop</strong> &bull; Shristi Campus, Technopark (June 2023)<br/>
                  <span style={{ color: 'var(--text-muted)' }}>Foundations of artificial intelligence, robotics hardware interfacing, and ML fundamentals.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Toolkit Section */}
        <section id="skills" className="section-spacer" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-eyebrow">
                <Terminal size={14} /> Skills & Tools
              </div>
              <h2 className="section-title">Technical Toolkit</h2>
              <p className="section-desc">
                Technologies and tools actively implemented across verified repositories and production pipelines.
              </p>
            </div>

            <div className="toolkit-grid">
              <div className="toolkit-card">
                <div className="toolkit-category">
                  <Cpu size={15} /> Machine Learning & Modeling
                </div>
                <div className="pill-cloud">
                  <span className="tech-pill">Scikit-Learn</span>
                  <span className="tech-pill">TensorFlow</span>
                  <span className="tech-pill">Keras</span>
                  <span className="tech-pill">EfficientNetB0</span>
                  <span className="tech-pill">Random Forest</span>
                  <span className="tech-pill">Logistic Regression</span>
                  <span className="tech-pill">Imbalanced Learning</span>
                  <span className="tech-pill">Transfer Learning</span>
                  <span className="tech-pill">NLP (TF-IDF)</span>
                  <span className="tech-pill">Feature Scaling</span>
                </div>
              </div>

              <div className="toolkit-card">
                <div className="toolkit-category">
                  <ShieldAlert size={15} /> MLOps & Model Reliability
                </div>
                <div className="pill-cloud">
                  <span className="tech-pill">MLflow Tracking</span>
                  <span className="tech-pill">Quality Gates</span>
                  <span className="tech-pill">Model Rollback</span>
                  <span className="tech-pill">SHA-256 Hashing</span>
                  <span className="tech-pill">PR-AUC Optimization</span>
                  <span className="tech-pill">Drift Detection (PSI)</span>
                  <span className="tech-pill">KS-Tests</span>
                  <span className="tech-pill">Reproducible Seeds</span>
                  <span className="tech-pill">YAML Configurations</span>
                </div>
              </div>

              <div className="toolkit-card">
                <div className="toolkit-category">
                  <Server size={15} /> Backend & Serving
                </div>
                <div className="pill-cloud">
                  <span className="tech-pill">FastAPI</span>
                  <span className="tech-pill">Pydantic V2</span>
                  <span className="tech-pill">RESTful APIs</span>
                  <span className="tech-pill">Streamlit</span>
                  <span className="tech-pill">Docker</span>
                  <span className="tech-pill">Uvicorn</span>
                  <span className="tech-pill">Flask</span>
                  <span className="tech-pill">SQLite Telemetry</span>
                  <span className="tech-pill">Tkinter</span>
                </div>
              </div>

              <div className="toolkit-card">
                <div className="toolkit-category">
                  <GitBranch size={15} /> Languages & DevOps
                </div>
                <div className="pill-cloud">
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">SQL</span>
                  <span className="tech-pill">Git & GitHub</span>
                  <span className="tech-pill">GitHub Actions (CI)</span>
                  <span className="tech-pill">Pytest</span>
                  <span className="tech-pill">Ruff Linter</span>
                  <span className="tech-pill">Pandas</span>
                  <span className="tech-pill">NumPy</span>
                  <span className="tech-pill">Java</span>
                  <span className="tech-pill">C</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Projects Archive Section */}
        <section id="archive" className="section-spacer">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="section-eyebrow">
                  <Database size={14} /> Extended Archive
                </div>
                <h2 className="section-title" style={{ marginBottom: '6px' }}>Additional Projects & Prototypes</h2>
                <p className="section-desc">
                  Secondary coursework and exploratory software prototypes archived from the main showcase.
                </p>
              </div>

              <button 
                onClick={() => setShowArchive(!showArchive)} 
                className="btn btn-outline"
                aria-expanded={showArchive}
              >
                {showArchive ? (
                  <>Hide Archive <ChevronUp size={15} /></>
                ) : (
                  <>Expand Archive (4 Projects) <ChevronDown size={15} /></>
                )}
              </button>
            </div>

            {showArchive && (
              <div className="archive-grid">
                <div className="archive-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>Cardiovascular Disease Prediction</h4>
                    <a href="https://github.com/conbott/CARDIOVASCULAR-DESEASE-PREDICTION" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Heart disease risk classification evaluated on clinical records across 13 physiological attributes using ensemble baselines (SVM, XGBoost) and interactive Tkinter GUI.
                  </p>
                  <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                    Python &bull; Tkinter &bull; Scikit-learn
                  </div>
                </div>

                <div className="archive-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>Credit Risk Prediction</h4>
                    <a href="https://github.com/conbott/Credit-Risk-Prediction" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    End-to-end loan approval and default risk evaluation pipeline featuring tabular data preprocessing and Streamlit interactive dashboard.
                  </p>
                  <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                    Python &bull; Streamlit &bull; Scikit-learn
                  </div>
                </div>

                <div className="archive-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>Customer Churn Prediction</h4>
                    <a href="https://github.com/conbott/Customer-Churn-Prediction" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Banking customer retention classifier modeling customer attrition likelihood with feature importance analysis and Streamlit UI.
                  </p>
                  <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                    Python &bull; Streamlit &bull; Pandas
                  </div>
                </div>

                <div className="archive-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>Pokémon FireRed Engine</h4>
                    <a href="https://github.com/conbott/PKMN-game" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    A custom 2D turn-based game engine written in Python and Pygame implementing tilemap rendering, sprite animations, and battle state machines.
                  </p>
                  <div style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                    Python &bull; Pygame &bull; State Machine
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-spacer" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div className="contact-card">
              <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
                <Mail size={14} /> Open for Opportunities
              </div>
              <h2 className="section-title" style={{ marginBottom: '14px' }}>Let's Discuss Engineering Roles</h2>
              <p className="section-desc" style={{ margin: '0 auto 28px' }}>
                I am actively seeking machine learning engineering, MLOps, and backend software roles where I can contribute to reliable, production-ready systems.
              </p>

              <div className="contact-actions" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '24px' }}>
                <a 
                  href="mailto:stevesamuel.cse@gmail.com" 
                  className="btn btn-primary"
                >
                  <Mail size={15} /> stevesamuel.cse@gmail.com
                </a>
                <a 
                  href="tel:+918848172665" 
                  className="btn btn-outline"
                >
                  <Phone size={15} /> +91 8848172665
                </a>
                <a 
                  href="https://linkedin.com/in/steve-samuel-a10534343" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline"
                >
                  <LinkedinIcon size={15} /> LinkedIn Profile
                </a>
                <a 
                  href="/Resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline"
                >
                  <FileText size={15} /> Open Résumé
                </a>
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Based in Kerala, India &bull; Open to On-site, Hybrid, and Remote Engineering Roles
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Accessible Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            &copy; {new Date().getFullYear()} Steve Samuel &bull; All claims, metrics, and architecture details verified against public repository artifacts.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://github.com/conbott" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
            <a href="https://linkedin.com/in/steve-samuel-a10534343" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">Résumé</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
