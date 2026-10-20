import { useState } from 'react';
import { Database, Filter, Cpu, ShieldCheck, Server, ArrowRight } from 'lucide-react';

/**
 * HeroPipelineVisual
 * Interactive, animated inference pipeline visualizer showing data
 * flowing from raw ingestion to verified REST endpoints.
 */
export default function HeroPipelineVisual() {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      id: 0,
      step: '01',
      title: 'Raw Stream Ingest',
      sub: 'Credit card txns / Car images',
      icon: Database,
      tag: 'STREAM / BATCH',
      detail: 'Validates raw incoming payloads before memory allocation. Drops malformed packets with immediate 422 HTTP responses.',
      metric: '0.172% fraud prevalence & 196 image classes'
    },
    {
      id: 1,
      step: '02',
      title: 'Leakage-Safe Scaling',
      sub: 'RobustScaler & Log1p',
      icon: Filter,
      tag: 'TRAIN SPLIT ONLY',
      detail: 'Scalers and encoders fit strictly on the train partition. Validation and test statistics never leak into preprocessing.',
      metric: '0% validation or test sample bleed'
    },
    {
      id: 2,
      step: '03',
      title: 'Model Inference',
      sub: 'EfficientNetB0 & LogReg',
      icon: Cpu,
      tag: 'SINGLE-PASS LOGITS',
      detail: 'Outputs raw logits directly, preventing double-softmax distortion and enabling calibrated probability thresholds.',
      metric: '0.49s train latency / 0.968 ROC-AUC'
    },
    {
      id: 3,
      step: '04',
      title: 'Automated Quality Gate',
      sub: 'Objective Promotion CLI',
      icon: ShieldCheck,
      tag: 'MACRO-F1 / PR-AUC',
      detail: 'CLI evaluates candidate model on held-out validation data. If metrics underperform baseline, promotion aborts before filesystem touch.',
      metric: 'F1 >= 0.5698 & PR-AUC >= 0.8140'
    },
    {
      id: 4,
      step: '05',
      title: 'Typed Serving & Telemetry',
      sub: 'FastAPI REST + PSI Drift',
      icon: Server,
      tag: 'PYDANTIC V2 SCHEMA',
      detail: 'Pydantic schemas enforce type bounds. Telemetry logs input feature distributions for PSI / KS drift detection.',
      metric: '< 15ms p95 latency / 68 passing CI tests'
    }
  ];

  const current = stages[activeStage];

  return (
    <div className="pipeline-visual-wrapper">
      <div className="pipeline-nodes-track">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          const isActive = activeStage === idx;
          return (
            <div key={st.id} className="pipeline-node-col">
              <button
                type="button"
                className={`pipeline-node-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStage(idx)}
                aria-label={`Inspect Pipeline Stage ${st.step}: ${st.title}`}
              >
                <div className="node-icon-wrap">
                  <Icon size={14} />
                  {isActive && <span className="node-pulse-ring" />}
                </div>
                <div className="node-text-col">
                  <span className="node-step">{st.step} //</span>
                  <span className="node-title">{st.title}</span>
                </div>
              </button>
              {idx < stages.length - 1 && (
                <div className="pipeline-connector-line">
                  <span className="pipeline-flow-dot" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pipeline-inspector-panel">
        <div className="inspector-header">
          <div className="inspector-stage-tag">
            <span>STAGE {current.step}</span>
            <ArrowRight size={11} />
            <span style={{ color: 'var(--accent-leaf)' }}>{current.tag}</span>
          </div>
          <span className="inspector-metric-badge">{current.metric}</span>
        </div>
        <p className="inspector-detail">{current.detail}</p>
      </div>
    </div>
  );
}
