import { useState } from 'react';

/**
 * ConfusionMatrixInspector
 * Interactive 2x2 confusion matrix for FraudGuard AI.
 * Allows users and recruiters to inspect individual quadrants (TN, FP, FN, TP)
 * to understand the real-world trade-offs of threshold tuning on imbalanced data.
 */
export default function ConfusionMatrixInspector() {
  const [activeCell, setActiveCell] = useState(null);

  const explanations = {
    tn: {
      title: 'TRUE NEGATIVE (TN) // SMOOTH CUSTOMER FLOW',
      count: '56,845 Legitimate Purchases Approved',
      rate: '99.96% Specificity (TNR)',
      impact: 'Legitimate cardholder transactions permitted without human review. At T = 0.43, frictionless payment flow is preserved for 99.96% of genuine cardholders.'
    },
    fp: {
      title: 'FALSE POSITIVE (FP) // CUSTOMER FRICTION ANALYSIS',
      count: '19 Legitimate Transactions Flagged',
      rate: '0.0334% False Positive Rate (FPR)',
      impact: 'Represents false alarms where an innocent purchase is blocked. Tuned threshold T = 0.43 keeps false positives down to ~1 in 3,000 transactions, preventing customer attrition.'
    },
    fn: {
      title: 'FALSE NEGATIVE (FN) // FRAUD LOSS EXPOSURE',
      count: '18 Fraud Events Undetected',
      rate: '18.37% False Negative Rate (FNR)',
      impact: 'Missed fraud transactions resulting in chargeback loss. Under default T = 0.50, 34 frauds were missed. Tuning to T = 0.43 recovered 16 additional frauds, reducing loss by 47%.'
    },
    tp: {
      title: 'TRUE POSITIVE (TP) // INTERCEPTED FRAUD',
      count: '80 Fraud Events Successfully Caught',
      rate: '81.63% Recall (Sensitivity)',
      impact: 'Malicious transactions intercepted before settlement. In an extreme imbalanced distribution (0.172% fraud), capturing 80 of 98 frauds proves high signal recovery.'
    }
  };

  const current = activeCell ? explanations[activeCell] : null;

  return (
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
          
          {/* True Negative */}
          <button
            type="button"
            className={`cm-cell tn ${activeCell === 'tn' ? 'cell-active' : ''}`}
            onMouseEnter={() => setActiveCell('tn')}
            onMouseLeave={() => setActiveCell(null)}
            onFocus={() => setActiveCell('tn')}
            onBlur={() => setActiveCell(null)}
            aria-label="True Negative: 56,845 transactions"
          >
            <div className="cm-val">56,845</div>
            <div className="cm-label">True Negative (TN)</div>
            <span className="cm-interactive-hint">inspect</span>
          </button>

          {/* False Positive */}
          <button
            type="button"
            className={`cm-cell fp ${activeCell === 'fp' ? 'cell-active' : ''}`}
            onMouseEnter={() => setActiveCell('fp')}
            onMouseLeave={() => setActiveCell(null)}
            onFocus={() => setActiveCell('fp')}
            onBlur={() => setActiveCell(null)}
            aria-label="False Positive: 19 transactions"
          >
            <div className="cm-val" style={{ color: 'var(--color-warning)' }}>19</div>
            <div className="cm-label">False Positive (FP)</div>
            <span className="cm-interactive-hint">inspect</span>
          </button>

          <div className="cm-cell header" style={{ justifyContent: 'flex-start' }}>Actual Pos.</div>

          {/* False Negative */}
          <button
            type="button"
            className={`cm-cell fn ${activeCell === 'fn' ? 'cell-active' : ''}`}
            onMouseEnter={() => setActiveCell('fn')}
            onMouseLeave={() => setActiveCell(null)}
            onFocus={() => setActiveCell('fn')}
            onBlur={() => setActiveCell(null)}
            aria-label="False Negative: 18 transactions"
          >
            <div className="cm-val" style={{ color: 'var(--color-danger)' }}>18</div>
            <div className="cm-label">False Negative (FN)</div>
            <span className="cm-interactive-hint">inspect</span>
          </button>

          {/* True Positive */}
          <button
            type="button"
            className={`cm-cell tp ${activeCell === 'tp' ? 'cell-active' : ''}`}
            onMouseEnter={() => setActiveCell('tp')}
            onMouseLeave={() => setActiveCell(null)}
            onFocus={() => setActiveCell('tp')}
            onBlur={() => setActiveCell(null)}
            aria-label="True Positive: 80 transactions"
          >
            <div className="cm-val">80</div>
            <div className="cm-label">True Positive (TP)</div>
            <span className="cm-interactive-hint">inspect</span>
          </button>
        </div>

        {/* Dynamic Contextual Readout */}
        <div className={`cm-dynamic-readout ${activeCell ? 'has-active' : ''}`}>
          {current ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-leaf)' }}>
                <span>{current.title}</span>
                <span>{current.rate}</span>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '2px' }}>
                {current.count}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                {current.impact}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>FPR: 0.0334% (19 / 56,864)</span>
                <span style={{ color: 'var(--accent-leaf)' }}>RECALL: 81.63% (80 / 98)</span>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                Across 56,864 legitimate transactions, only 19 produced false alarms while catching 80 of 98 fraud events. 
                Hover or tap any matrix cell to inspect financial loss vs. customer friction trade-offs.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
