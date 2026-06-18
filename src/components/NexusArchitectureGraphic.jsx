import '../styles/nexus-architecture.css';

function SatIcon({ children }) {
  return (
    <svg className="nexus-arch-sat-icon" viewBox="0 0 20 16">
      {children}
    </svg>
  );
}

function ArrowCol() {
  return (
    <div className="nexus-arch-arrow-col">
      <div className="nexus-arch-arrow" />
    </div>
  );
}

/**
 * Project NEXUS architecture slide — Observe → Ingest → Understand → Retrieve → Decide.
 * Ported from project_nexus_slide_2.html.
 */
export default function NexusArchitectureGraphic({ showTitle = false, caption }) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="nexus-arch-fit">
        <div className="nexus-arch-slide">
          <div className="nexus-arch-content">
            {showTitle && (
              <div className="nexus-arch-title-row">
                <div className="nexus-arch-eyebrow">Multimodal · Multisensor · Multi-vertical</div>
                <h2 className="nexus-arch-title-main">
                  PROJECT <span className="accent">NEXUS</span>
                </h2>
              </div>
            )}

            <div className="nexus-arch-pill-row">
              <span className="nexus-arch-pill multimodal">Multimodal</span>
              <span className="nexus-arch-pill hsi-pill">★ HSI Upgraded</span>
              <span className="nexus-arch-pill bio">Biophysically constrained</span>
              <span className="nexus-arch-pill semantic">Semantically integrated</span>
              <span className="nexus-arch-pill intel">Intelligence at scale</span>
            </div>

            <div className="nexus-arch-stage-grid">
              <div className="nexus-arch-stage-label" style={{ color: '#3fc1ff' }}>01 — Observe</div>
              <div />
              <div className="nexus-arch-stage-label" style={{ color: '#3fc1ff' }}>02 — Ingest</div>
              <div />
              <div className="nexus-arch-stage-label" style={{ color: '#c792ea' }}>03 — Understand</div>
              <div />
              <div className="nexus-arch-stage-label" style={{ color: '#1ad1b5' }}>04 — Retrieve</div>
              <div />
              <div className="nexus-arch-stage-label" style={{ color: '#5be584' }}>05 — Decide</div>
            </div>

            <div className="nexus-arch-stage-grid">
              {/* 01 Observe */}
              <div>
                <div className="nexus-arch-constellation">
                  <div className="nexus-arch-sat-row">
                    <div className="nexus-arch-sat msi">
                      <SatIcon>
                        <rect x="8" y="2" width="4" height="6" fill="currentColor" />
                        <rect x="2" y="4" width="5" height="2" fill="currentColor" />
                        <rect x="13" y="4" width="5" height="2" fill="currentColor" />
                        <line x1="10" y1="8" x2="10" y2="14" stroke="currentColor" strokeWidth="1" />
                      </SatIcon>
                      <div className="nexus-arch-sat-label">MSI</div>
                    </div>
                    <div className="nexus-arch-sat hsi">
                      <SatIcon>
                        <rect x="8" y="2" width="4" height="6" fill="currentColor" />
                        <rect x="2" y="4" width="5" height="2" fill="currentColor" />
                        <rect x="13" y="4" width="5" height="2" fill="currentColor" />
                        <line x1="10" y1="8" x2="10" y2="14" stroke="currentColor" strokeWidth="1" />
                        <circle cx="17" cy="2" r="1.5" fill="currentColor" />
                      </SatIcon>
                      <div className="nexus-arch-sat-label">HSI ★</div>
                    </div>
                  </div>
                  <div className="nexus-arch-sat-row">
                    <div className="nexus-arch-sat sar">
                      <SatIcon>
                        <rect x="8" y="3" width="4" height="5" fill="currentColor" />
                        <path d="M3 6 L8 5 L8 7 Z" fill="currentColor" />
                        <path d="M17 6 L12 5 L12 7 Z" fill="currentColor" />
                        <line x1="10" y1="8" x2="10" y2="14" stroke="currentColor" strokeWidth="1" />
                      </SatIcon>
                      <div className="nexus-arch-sat-label">SAR</div>
                    </div>
                    <div className="nexus-arch-sat vhr">
                      <SatIcon>
                        <rect x="7" y="2" width="6" height="5" fill="currentColor" />
                        <rect x="9" y="7" width="2" height="3" fill="currentColor" />
                        <circle cx="10" cy="12" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                      </SatIcon>
                      <div className="nexus-arch-sat-label">VHR</div>
                    </div>
                    <div className="nexus-arch-sat clim">
                      <SatIcon>
                        <path d="M3 9 Q3 6 6 6 Q7 3 11 3 Q15 3 16 7 Q18 7 18 9 L4 9 Z" fill="currentColor" />
                        <line x1="6" y1="11" x2="6" y2="14" stroke="currentColor" strokeWidth="1" />
                        <line x1="10" y1="11" x2="10" y2="14" stroke="currentColor" strokeWidth="1" />
                        <line x1="14" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1" />
                      </SatIcon>
                      <div className="nexus-arch-sat-label">CLIM</div>
                    </div>
                  </div>
                </div>
                <div className="nexus-arch-hsi-banner">★ HSI Precision Upgrade</div>
                <div className="nexus-arch-stage-title color-blue">Multimodal Constellation</div>
              </div>

              <ArrowCol />

              {/* 02 Ingest */}
              <div>
                <div className="nexus-arch-cubes-grid">
                  <div className="nexus-arch-cube-cell">
                    <svg className="nexus-arch-cube-svg" viewBox="0 0 88 64">
                      <polygon points="14,22 44,8 74,22 44,36" fill="#7c4ec7" stroke="#c792ea" strokeWidth="0.8" />
                      <polygon points="14,22 14,52 44,66 44,36" fill="#5a3a96" stroke="#c792ea" strokeWidth="0.8" />
                      <polygon points="74,22 74,52 44,66 44,36" fill="#9d6ed4" stroke="#c792ea" strokeWidth="0.8" />
                      <line x1="20" y1="28" x2="36" y2="20" stroke="#e0c4f5" strokeWidth="0.6" opacity="0.6" />
                      <line x1="22" y1="32" x2="38" y2="24" stroke="#e0c4f5" strokeWidth="0.6" opacity="0.6" />
                      <line x1="24" y1="36" x2="40" y2="28" stroke="#e0c4f5" strokeWidth="0.6" opacity="0.6" />
                    </svg>
                    <div className="nexus-arch-cube-label purple">HSI · 150+ BANDS</div>
                  </div>
                  <div className="nexus-arch-cube-cell">
                    <svg className="nexus-arch-cube-svg" viewBox="0 0 88 64">
                      <polygon points="14,22 44,8 74,22 44,36" fill="#1e6fb8" stroke="#3fc1ff" strokeWidth="0.8" />
                      <polygon points="14,22 14,52 44,66 44,36" fill="#154d80" stroke="#3fc1ff" strokeWidth="0.8" />
                      <polygon points="74,22 74,52 44,66 44,36" fill="#2a8fd9" stroke="#3fc1ff" strokeWidth="0.8" />
                      <line x1="20" y1="28" x2="36" y2="20" stroke="#b0dcf5" strokeWidth="0.6" opacity="0.6" />
                      <line x1="24" y1="34" x2="40" y2="26" stroke="#b0dcf5" strokeWidth="0.6" opacity="0.6" />
                    </svg>
                    <div className="nexus-arch-cube-label blue">MSI · 2013+</div>
                  </div>
                  <div className="nexus-arch-cube-cell">
                    <svg className="nexus-arch-cube-svg" viewBox="0 0 88 64">
                      <polygon points="14,22 44,8 74,22 44,36" fill="#a86820" stroke="#f2a623" strokeWidth="0.8" />
                      <polygon points="14,22 14,52 44,66 44,36" fill="#7a4a17" stroke="#f2a623" strokeWidth="0.8" />
                      <polygon points="74,22 74,52 44,66 44,36" fill="#c4822e" stroke="#f2a623" strokeWidth="0.8" />
                      <circle cx="30" cy="28" r="0.8" fill="#fce0a8" />
                      <circle cx="42" cy="22" r="0.8" fill="#fce0a8" />
                      <circle cx="56" cy="28" r="0.8" fill="#fce0a8" />
                      <circle cx="38" cy="32" r="0.8" fill="#fce0a8" />
                    </svg>
                    <div className="nexus-arch-cube-label amber">SAR · VV/VH</div>
                  </div>
                  <div className="nexus-arch-cube-cell">
                    <svg className="nexus-arch-cube-svg" viewBox="0 0 88 64">
                      <polygon points="14,22 44,8 74,22 44,36" fill="#0e8c79" stroke="#1ad1b5" strokeWidth="0.8" />
                      <polygon points="14,22 14,52 44,66 44,36" fill="#0a6356" stroke="#1ad1b5" strokeWidth="0.8" />
                      <polygon points="74,22 74,52 44,66 44,36" fill="#13b39b" stroke="#1ad1b5" strokeWidth="0.8" />
                      <path d="M18 26 Q26 22 34 26 T50 26" fill="none" stroke="#a8efe0" strokeWidth="0.6" opacity="0.7" />
                      <path d="M20 32 Q28 28 36 32 T52 32" fill="none" stroke="#a8efe0" strokeWidth="0.6" opacity="0.7" />
                    </svg>
                    <div className="nexus-arch-cube-label cyan">
                      PIXXEL MICROCLIM<span className="upgrade-tag">★ NEW</span>
                    </div>
                  </div>
                </div>
                <div className="nexus-arch-stage-title color-blue">Analysis-Ready Data Products</div>
              </div>

              <ArrowCol />

              {/* 03 Understand */}
              <div>
                <div className="nexus-arch-core-card">
                  <div className="nexus-arch-core-header">Four-Engine Architecture</div>
                  <div className="nexus-arch-engine trait">
                    <div className="nexus-arch-engine-title">Trait &amp; Structure</div>
                    <div className="nexus-arch-engine-sub">PROSAIL · WOFOST · SAR-allometric</div>
                  </div>
                  <div className="nexus-arch-engine context">
                    <div className="nexus-arch-engine-title">Context</div>
                    <div className="nexus-arch-engine-sub">Expected state · Anomaly · Phenology</div>
                  </div>
                  <div className="nexus-arch-engine event">
                    <div className="nexus-arch-engine-title">Event</div>
                    <div className="nexus-arch-engine-sub">Temporal detection · Change signature</div>
                  </div>
                  <div className="nexus-arch-engine attribution">
                    <div className="nexus-arch-engine-title">Attribution</div>
                    <div className="nexus-arch-engine-sub">Causal hypothesis · Driver linking</div>
                  </div>
                </div>
                <div className="nexus-arch-stage-title color-purple">Intelligence Core</div>
                <div className="nexus-arch-stage-sub">Parameter Registry · Config-driven · Zero bespoke pipelines</div>
              </div>

              <ArrowCol />

              {/* 04 Retrieve */}
              <div>
                <div className="nexus-arch-semantic-card">
                  <div className="nexus-arch-semantic-header">Semantic Foundation</div>
                  <div className="nexus-arch-semantic-tag">
                    <div className="nexus-arch-semantic-tag-name">LENS</div>
                    <div className="nexus-arch-semantic-tag-desc">Latent Embedding &amp; Nearest-neighbor Search — petabyte archive</div>
                  </div>
                  <div className="nexus-arch-semantic-tag">
                    <div className="nexus-arch-semantic-tag-name">DINOv3</div>
                    <div className="nexus-arch-semantic-tag-desc">Self-supervised embeddings</div>
                  </div>
                  <div className="nexus-arch-semantic-tag">
                    <div className="nexus-arch-semantic-tag-name">SAM3</div>
                    <div className="nexus-arch-semantic-tag-desc">Object-centric segmentation</div>
                  </div>
                  <div className="nexus-arch-semantic-tag">
                    <div className="nexus-arch-semantic-tag-name">Semantic Web</div>
                    <div className="nexus-arch-semantic-tag-desc">Cross-vertical knowledge graph</div>
                  </div>
                </div>
                <div className="nexus-arch-stage-title color-teal">Semantic Foundation</div>
              </div>

              <ArrowCol />

              {/* 05 Decide */}
              <div>
                <div className="nexus-arch-verticals-grid">
                  <div className="nexus-arch-vertical-tile agri">
                    <div className="nexus-arch-stripe-bg" />
                    <span className="nexus-arch-vert-tag">Stress</span>
                    <div className="nexus-arch-vert-name">Agriculture</div>
                  </div>
                  <div className="nexus-arch-vertical-tile forestry">
                    <div className="nexus-arch-stripe-bg" />
                    <span className="nexus-arch-vert-tag">AGB t/ha</span>
                    <div className="nexus-arch-vert-name">Forestry · Carbon</div>
                  </div>
                  <div className="nexus-arch-vertical-tile water">
                    <div className="nexus-arch-stripe-bg" />
                    <span className="nexus-arch-vert-tag">HAB Alert</span>
                    <div className="nexus-arch-vert-name">Water Quality</div>
                  </div>
                  <div className="nexus-arch-vertical-tile geology">
                    <div className="nexus-arch-stripe-bg" />
                    <span className="nexus-arch-vert-tag">REE Prospect</span>
                    <div className="nexus-arch-vert-name">Geology · Minerals</div>
                  </div>
                </div>
                <div className="nexus-arch-stage-title color-green">Vertical Intelligence</div>
                <div className="nexus-arch-stage-sub">Scoring · SLA · Alerts · Delivery</div>
              </div>
            </div>

            <div className="nexus-arch-bracket-row">
              <div className="nexus-arch-bracket nexus" style={{ gridColumn: '1 / span 7' }}>
                <div className="nexus-arch-bracket-line" />
                <div className="nexus-arch-bracket-label">NEXUS · ENGINE</div>
              </div>
              <div className="nexus-arch-bracket aurora" style={{ gridColumn: '8 / span 2' }}>
                <div className="nexus-arch-bracket-line" />
                <div className="nexus-arch-bracket-label">AURORA · PLATFORM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="nexus-arch-caption" style={{ marginTop: 10 }}>{caption}</figcaption>
      )}
    </figure>
  );
}
