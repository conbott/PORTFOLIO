import { useState } from 'react';
import { Database, ShieldCheck, Server, Activity, Check } from 'lucide-react';

/**
 * LifecycleFlow
 * Interactive, animated ML lifecycle visualization that guides users through
 * Preparation -> Evaluation -> Serving -> Telemetry.
 */
export default function LifecycleFlow() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      phase: 'PREPARATION',
      title: 'Leakage-Safe Scaling',
      tool: 'RobustScaler & Log1p',
      icon: Database,
      guarantee: 'ZERO VALIDATION BLEED',
      desc: 'Data leakage is the #1 cause of catastrophic production drops. Feature scalers, frequency encoders, and text tokenizers are fit strictly on training partitions. Validation and test samples never bleed into preprocessing transformations.',
      snippet: `# Fit strictly on train; transform val and test partitions independently
scaler = RobustScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)    # Zero validation bleed`
    },
    {
      num: '02',
      phase: 'EVALUATION',
      title: 'Objective Quality Gates',
      tool: 'Automated CLI & Macro-F1',
      icon: ShieldCheck,
      guarantee: 'ATOMIC REPRODUCIBLE SWAP',
      desc: 'Overwriting serving models without an objective evaluation barrier invites regressions. Candidate models must exceed baseline macro-F1 on held-out validation sets before promotion filesystems are touched. Promotions execute atomically via os.replace with SHA-256 audit trails and one-command CLI rollback.',
      snippet: `# Rejects underperforming models; atomic promotion on pass
if candidate_macro_f1 >= baseline_macro_f1:
    shutil.copy2(active_model, backup_path)
    os.replace(candidate_model, active_model)  # Atomic filesystem swap`
    },
    {
      num: '03',
      phase: 'SERVING',
      title: 'Typed API Contracts',
      tool: 'FastAPI & Pydantic V2',
      icon: Server,
      guarantee: 'STRICT FIELD BOUNDS',
      desc: 'Production endpoints enforce strict Pydantic V2 schema contracts, rejecting malformed, missing, or out-of-range features. Models output calibrated class probabilities for downstream thresholding and log latency percentiles.',
      snippet: `class TransactionPayload(BaseModel):
    Time: float
    Amount: float = Field(..., ge=0.0, le=50000.0)
    V1: float; V2: float; ... # Strictly typed feature validation`
    },
    {
      num: '04',
      phase: 'TELEMETRY',
      title: 'Drift & Distribution Shift',
      tool: 'PSI & Two-Sample KS Tests',
      icon: Activity,
      guarantee: 'PROACTIVE DRIFT ALERTS',
      desc: 'Incoming inference batches are stored in telemetry logs to compute Population Stability Index (PSI) and Kolmogorov-Smirnov (KS) tests against baseline reference distributions, triggering automated alerts when distributions drift.',
      snippet: `# Population Stability Index (PSI) drift alert
if psi_score > 0.25:
    logger.warning(f"Feature drift detected: PSI = {psi_score:.4f} > 0.25 threshold")`
    }
  ];

  return (
    <div className="lifecycle-stepper-container">
      {/* Interactive Stage Tabs for Quick Scrubbing */}
      <div className="lifecycle-step-bar" role="tablist" aria-label="ML Lifecycle Stages">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          const isActive = activeStage === idx;
          return (
            <button
              key={st.num}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`lifecycle-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveStage(idx)}
            >
              <div className="tab-indicator-num">
                {isActive ? <span className="tab-pulse-dot" /> : null}
                <span>{st.num}</span>
              </div>
              <div className="tab-indicator-label">
                <span className="tab-phase">{st.phase}</span>
                <span className="tab-title">{st.title}</span>
              </div>
              <Icon size={14} className="tab-icon" />
            </button>
          );
        })}
      </div>

      {/* Vertical Flow with Active Stage Illumination */}
      <div className="methodology-flow">
        {stages.map((st, idx) => {
          const isActive = activeStage === idx;
          return (
            <div 
              key={st.num} 
              className={`methodology-item ${isActive ? 'stage-active' : ''}`}
              onMouseEnter={() => setActiveStage(idx)}
            >
              <div className="methodology-meta">
                <span className="methodology-num">
                  {st.num} // {st.phase}
                  {isActive && <span className="active-badge"><Check size={10} /> CURRENT FOCUS</span>}
                </span>
                <span className="methodology-title">{st.title}</span>
                <span className="methodology-tool">{st.tool}</span>
                <span className="methodology-guarantee">{st.guarantee}</span>
              </div>
              <div className="methodology-content">
                <p>{st.desc}</p>
                <div className={`code-snippet ${isActive ? 'code-highlight' : ''}`} style={{ margin: 0 }}>
                  <pre>{st.snippet}</pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
