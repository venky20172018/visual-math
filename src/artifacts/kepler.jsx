import React, { useState, useEffect, useRef } from 'react';

const KeplerMasterTool = () => {
  const [activeTab, setActiveTab] = useState('law1');

  // --- Constants ---
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 500;
  const CX = 400; 
  const CY = 250; 
  const A = 180; 

  // --- Animation State ---
  const [isPaused, setIsPaused] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [simSpeed, setSimSpeed] = useState(0.5);
  const requestRef = useRef();

  // --- Law 1 State ---
  const planets = [
    { name: "Venus", ecc: 0.007, color: "#eab308", info: "The most circular planet." },
    { name: "Earth", ecc: 0.017, color: "#3b82f6", info: "A very slight ellipse." },
    { name: "Mars", ecc: 0.093, color: "#ef4444", info: "The planet that proved circles wrong." },
    { name: "Mercury", ecc: 0.206, color: "#94a3b8", info: "The most eccentric real planet." },
    { name: "Planet X-1", ecc: 0.450, color: "#a855f7", info: "Squashed dummy orbit." },
    { name: "Planet X-2", ecc: 0.750, color: "#22c55e", info: "Extreme eccentricity." }
  ];
  const [selectedPlanet, setSelectedPlanet] = useState(planets[2]);
  const [userFocalDist, setUserFocalDist] = useState(0);
  const [showReality, setShowReality] = useState(false);

  // --- Law 2 State ---
  const [l2Ecc, setL2Ecc] = useState(0.5);
  const [l2History, setL2History] = useState([]); 

  // --- Law 3 State ---
  const [customR, setCustomR] = useState(1.5);
  const realPlanets = [
    { name: "Mercury", r: 0.39, color: "#94a3b8", period: 0.24 },
    { name: "Earth", r: 1.00, color: "#3b82f6", period: 1.00 },
    { name: "Jupiter", r: 5.20, color: "#fb923c", period: 11.86 } 
  ];

  // --- Calculations ---
  const userB = Math.sqrt(Math.max(0, Math.pow(A, 2) - Math.pow(userFocalDist, 2)));
  const userEcc = (userFocalDist / A).toFixed(3);
  const customT = Math.sqrt(Math.pow(customR, 3));
  
  // Adjusted Scale for Law 3 to ensure 5.20 AU stays on screen
  const L3_SCALE = 42; 

  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setRotation(prev => {
          if (activeTab === 'law2') {
            const bVal = Math.sqrt(Math.max(1, Math.pow(A, 2) - Math.pow(A * l2Ecc, 2)));
            const fVal = A * l2Ecc;
            const x = A * Math.cos(prev);
            const y = bVal * Math.sin(prev);
            const rVal = Math.sqrt(Math.pow(x - fVal, 2) + Math.pow(y, 2));
            const angularVel = (0.02 * (simSpeed * 2)) * (35000 / Math.pow(rVal, 2));
            const newAngle = prev + angularVel;
            
            // Store position history with timestamps
            setL2History(hist => {
              const newHist = [...hist, { angle: newAngle, time: Date.now() }];
              return newHist.slice(-200); // Keep more history
            });
            
            return newAngle;
          }
          return prev + (0.015 * (simSpeed * 2));
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, activeTab, simSpeed, l2Ecc]);

  const resetAll = () => {
    setRotation(0);
    setIsPaused(true);
    setUserFocalDist(0);
    setShowReality(false);
    setCustomR(1.5);
    setL2Ecc(0.5);
    setL2History([]);
  };

  const styles = {
    layout: { display: 'flex', height: '100vh', backgroundColor: '#020617', color: 'white', fontFamily: 'monospace', overflow: 'hidden' },
    sidebar: { width: '260px', backgroundColor: '#0f172a', borderRight: '2px solid #1e293b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' },
    main: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', overflowY: 'auto' },
    navBtn: (active) => ({
      padding: '12px', cursor: 'pointer', border: 'none', background: active ? '#1e293b' : 'transparent',
      color: active ? '#eab308' : '#64748b', fontWeight: 'bold', borderRadius: '8px', textAlign: 'left', fontSize: '11px'
    }),
    label: { fontSize: '10px', color: '#475569', letterSpacing: '1px', marginBottom: '5px', display: 'block' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '11px', color: '#94a3b8' }
  };

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <span style={styles.label}>SELECT LAW</span>
        <button onClick={() => setActiveTab('law1')} style={styles.navBtn(activeTab === 'law1')}>1. ELLIPSES</button>
        <button onClick={() => setActiveTab('law2')} style={styles.navBtn(activeTab === 'law2')}>2. EQUAL AREAS</button>
        <button onClick={() => setActiveTab('law3')} style={styles.navBtn(activeTab === 'law3')}>3. HARMONIES</button>

        <hr style={{borderColor: '#1e293b'}} />

        <div style={{display: 'flex', gap: '10px'}}>
          <button onClick={() => setIsPaused(!isPaused)} style={{flex: 1, padding: '12px', background: '#eab308', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'black', fontWeight: 'bold'}}>
            {isPaused ? "PLAY" : "PAUSE"}
          </button>
          <button onClick={resetAll} style={{padding: '12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', color: 'white'}}>
            RESET
          </button>
        </div>

        <div>
          <span style={styles.label}>SPEED</span>
          <input type="range" min="0.1" max="1" step="0.1" value={simSpeed} onChange={(e) => setSimSpeed(parseFloat(e.target.value))} style={{width: '100%', accentColor: '#eab308'}} />
        </div>

        {activeTab === 'law1' && (
           <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
            {planets.map(p => (
              <button key={p.name} onClick={() => {setSelectedPlanet(p); setUserFocalDist(0); setShowReality(false);}}
                style={{padding: '8px', background: selectedPlanet.name === p.name ? '#1e293b' : 'transparent', border: `1px solid ${selectedPlanet.name === p.name ? p.color : '#334155'}`, color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '10px'}}>
                {p.name.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'law2' && (
          <div>
            <span style={styles.label}>STRETCH ORBIT</span>
            <input type="range" min="0" max="0.85" step="0.01" value={l2Ecc} onChange={(e) => setL2Ecc(parseFloat(e.target.value))} style={{width: '100%', accentColor: '#3b82f6'}} />
          </div>
        )}

        {activeTab === 'law3' && (
          <div>
            <span style={styles.label}>DISTANCE (AU)</span>
            <input type="range" min="0.4" max="5.2" step="0.1" value={customR} onChange={(e) => setCustomR(parseFloat(e.target.value))} style={{width: '100%', accentColor: '#4ade80'}} />
          </div>
        )}
      </div>

      <div style={styles.main}>
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
          <span style={styles.label}>{activeTab === 'law3' ? "RADIUS" : "ECCENTRICITY"}</span>
          <div style={{fontSize: '48px', fontWeight: '900', color: (activeTab === 'law1' && (Math.abs(parseFloat(userEcc) - selectedPlanet.ecc) < 0.008)) ? '#4ade80' : 'white'}}>
            {activeTab === 'law1' ? userEcc : activeTab === 'law2' ? l2Ecc.toFixed(3) : `${customR} AU`}
          </div>
        </div>

        <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ background: '#000', borderRadius: '20px', border: '2px solid #1e293b' }}>
          <circle cx={CX} cy={CY} r="15" fill="#fbbf24" style={{ filter: 'drop-shadow(0 0 10px #fbbf24)' }} />
          
          {activeTab === 'law1' && (
            <>
              {showReality && (() => {
                const tC = A * selectedPlanet.ecc;
                const tB = Math.sqrt(Math.pow(A, 2) - Math.pow(tC, 2));
                return <ellipse cx={CX - tC} cy={CY} rx={A} ry={tB} fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="10,5" />;
              })()}
              <ellipse cx={CX - userFocalDist} cy={CY} rx={A} ry={userB} fill="none" stroke="#3b82f6" strokeWidth="4" />
              <circle cx={CX + A * Math.cos(rotation) - userFocalDist} cy={CY + userB * Math.sin(rotation)} r="10" fill={selectedPlanet.color} />
            </>
          )}

          {activeTab === 'law2' && (() => {
            const b = Math.sqrt(Math.max(1, Math.pow(A, 2) - Math.pow(A * l2Ecc, 2)));
            const f = A * l2Ecc;
            
            // Current planet position (perihelion - close to sun, on the right)
            const p1 = { x: CX + A * Math.cos(rotation) - f, y: CY + b * Math.sin(rotation) };
            
            // Find angle from ~50 frames ago for near-sun sector
            const timeWindow = 50;
            const angle2 = l2History.length >= timeWindow ? l2History[l2History.length - timeWindow].angle : rotation - 0.8;
            const p2 = { x: CX + A * Math.cos(angle2) - f, y: CY + b * Math.sin(angle2) };
            
            // Opposite side (aphelion - far from sun, on the left)
            const oppAngle = rotation + Math.PI;
            const op1 = { x: CX + A * Math.cos(oppAngle) - f, y: CY + b * Math.sin(oppAngle) };
            
            // For the far side, we need to find what angle gives us the same AREA, not the same time
            // Since area = 0.5 * r² * θ, and r_near is small, θ_near must be large
            // For equal areas: r_near² * θ_near = r_far² * θ_far
            // So: θ_far = (r_near² / r_far²) * θ_near
            
            const r_near = Math.sqrt(Math.pow(p1.x - CX, 2) + Math.pow(p1.y - CY, 2));
            const r_far = Math.sqrt(Math.pow(op1.x - CX, 2) + Math.pow(op1.y - CY, 2));
            const theta_near = Math.abs(rotation - angle2);
            const theta_far = (Math.pow(r_near, 2) / Math.pow(r_far, 2)) * theta_near;
            
            const angle2Opp = oppAngle - theta_far;
            const op2 = { x: CX + A * Math.cos(angle2Opp) - f, y: CY + b * Math.sin(angle2Opp) };
            
            // Calculate actual areas
            const calcArea = (sun, p1, p2) => {
              const angle1 = Math.atan2(p1.y - sun.y, p1.x - sun.x);
              const angle2 = Math.atan2(p2.y - sun.y, p2.x - sun.x);
              let deltaAngle = angle1 - angle2;
              if (deltaAngle < 0) deltaAngle += 2 * Math.PI;
              const r1 = Math.sqrt(Math.pow(p1.x - sun.x, 2) + Math.pow(p1.y - sun.y, 2));
              const r2 = Math.sqrt(Math.pow(p2.x - sun.x, 2) + Math.pow(p2.y - sun.y, 2));
              return 0.5 * r1 * r2 * Math.sin(deltaAngle);
            };
            
            const area1 = calcArea({x: CX, y: CY}, p1, p2);
            const area2 = calcArea({x: CX, y: CY}, op1, op2);
            
            return (
              <>
                <ellipse cx={CX - f} cy={CY} rx={A} ry={b} fill="none" stroke="#1e293b" strokeWidth="2" />
                <path d={`M ${CX} ${CY} L ${p1.x} ${p1.y} A ${A} ${b} 0 0 0 ${p2.x} ${p2.y} Z`} fill="rgba(59, 130, 246, 0.4)" stroke="#3b82f6" strokeWidth="2" />
                <path d={`M ${CX} ${CY} L ${op1.x} ${op1.y} A ${A} ${b} 0 0 0 ${op2.x} ${op2.y} Z`} fill="rgba(234, 179, 8, 0.3)" stroke="#eab308" strokeWidth="2" />
                <line x1={CX} y1={CY} x2={p1.x} y2={p1.y} stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
                <line x1={CX} y1={CY} x2={op1.x} y2={op1.y} stroke="#eab308" strokeWidth="1" opacity="0.5" />
                <circle cx={p1.x} cy={p1.y} r="10" fill="#ef4444" />
                <text x="20" y="30" fill="#3b82f6" fontSize="13" fontWeight="bold">NEAR SUN (fast): Area = {area1.toFixed(0)}</text>
                <text x="20" y="50" fill="#eab308" fontSize="13" fontWeight="bold">FAR FROM SUN (slow): Area = {area2.toFixed(0)}</text>
              </>
            );
          })()}

          {activeTab === 'law3' && (
            <>
              {realPlanets.map(p => {
                const drawR = p.r * L3_SCALE;
                const angle = (rotation / p.period) * Math.PI * 2;
                return (
                  <g key={p.name}>
                    <circle cx={CX} cy={CY} r={drawR} fill="none" stroke="rgba(255,255,255,0.1)" />
                    <circle cx={CX + drawR * Math.cos(angle)} cy={CY + drawR * Math.sin(angle)} r="5" fill={p.color} />
                  </g>
                );
              })}
              <circle cx={CX} cy={CY} r={customR * L3_SCALE} fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="5,5" />
              <circle cx={CX + (customR * L3_SCALE) * Math.cos(rotation/customT * Math.PI*2)} cy={CY + (customR * L3_SCALE) * Math.sin(rotation/customT * Math.PI*2)} r="8" fill="#4ade80" />
            </>
          )}
        </svg>

        <div style={{width: '100%', maxWidth: '800px', marginTop: '20px'}}>
          {activeTab === 'law1' && (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              <button onClick={() => setShowReality(!showReality)} style={{padding: '10px', background: showReality ? '#ef4444' : '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '11px'}}>
                {showReality ? "HIDE TARGET" : "SHOW TARGET"}
              </button>
              <input type="range" min="0" max="160" value={userFocalDist} onChange={(e) => setUserFocalDist(Number(e.target.value))} style={{flex: 1, accentColor: selectedPlanet.color}} />
            </div>
          )}
          {activeTab === 'law3' && (
            <div style={{background: '#0f172a', padding: '15px', borderRadius: '10px', border: '1px solid #1e293b'}}>
              <table style={styles.table}>
                <thead>
                  <tr style={{textAlign: 'left'}}><th>PLANET</th><th>R (AU)</th><th>T (YRS)</th><th style={{color: '#4ade80'}}>T²/R³</th></tr>
                </thead>
                <tbody>
                  {[...realPlanets, { name: "Custom", r: customR, period: customT, color: '#4ade80' }].map(p => (
                    <tr key={p.name} style={{borderTop: '1px solid #1e293b'}}>
                      <td style={{color: p.color, padding: '8px 0'}}>{p.name.toUpperCase()}</td>
                      <td>{p.r.toFixed(2)}</td><td>{p.period.toFixed(2)}</td>
                      <td style={{color: '#4ade80'}}>1.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeplerMasterTool;