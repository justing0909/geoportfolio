"use client";
import { useState, useEffect, useRef } from "react";

// ── Hand-drawn Maine landscape SVG ──────────────────────────────────────
const MaineLandscape = ({ style }) => (
  <svg viewBox="0 0 480 220" style={{ width: "100%", maxWidth: 560, height: "auto", ...style }}>
    {/* Treeline - hand-drawn pine trees */}
    <g stroke="#4a5e3e" strokeWidth="1.1" fill="none" opacity="0.22" strokeLinecap="round">
      {/* Tree 1 */}
      <line x1="30" y1="180" x2="30" y2="120" />
      <polyline points="18,155 30,130 42,155" />
      <polyline points="20,145 30,120 40,145" />
      {/* Tree 2 - taller */}
      <line x1="58" y1="180" x2="58" y2="100" />
      <polyline points="44,160 58,132 72,160" />
      <polyline points="46,148 58,118 70,148" />
      <polyline points="49,136 58,100 67,136" />
      {/* Tree 3 */}
      <line x1="90" y1="180" x2="90" y2="115" />
      <polyline points="78,158 90,128 102,158" />
      <polyline points="80,145 90,115 100,145" />
      {/* Tree 4 - small */}
      <line x1="115" y1="180" x2="115" y2="140" />
      <polyline points="106,165 115,145 124,165" />
      <polyline points="108,155 115,140 122,155" />
      {/* Tree 5 - tall */}
      <line x1="145" y1="180" x2="145" y2="95" />
      <polyline points="131,162 145,132 159,162" />
      <polyline points="133,148 145,116 157,148" />
      <polyline points="136,134 145,95 154,134" />
      {/* Tree 6 */}
      <line x1="175" y1="180" x2="175" y2="110" />
      <polyline points="163,157 175,127 187,157" />
      <polyline points="165,143 175,110 185,143" />
      {/* Tree 7 - small background */}
      <line x1="200" y1="180" x2="200" y2="135" />
      <polyline points="192,163 200,143 208,163" />
      <polyline points="193,153 200,135 207,153" />
      {/* Coastline hint */}
      <path d="M0,185 Q40,182 80,186 Q120,190 160,183 Q200,178 240,185 Q280,192 320,182 Q360,176 400,184 Q440,190 480,183" strokeWidth="0.8" />
      {/* Distant hills */}
      <path d="M220,165 Q260,140 300,155 Q340,135 380,150 Q420,130 460,148 Q480,155 480,155" strokeWidth="0.7" opacity="0.15" />
      {/* Water ripples */}
      <path d="M10,195 Q50,193 90,196" strokeWidth="0.5" opacity="0.12" />
      <path d="M140,198 Q190,195 240,199" strokeWidth="0.5" opacity="0.1" />
      <path d="M280,196 Q340,193 400,197" strokeWidth="0.5" opacity="0.08" />
      {/* Birds */}
      <path d="M300,90 Q305,85 310,90" strokeWidth="0.7" opacity="0.15" />
      <path d="M320,80 Q324,76 328,80" strokeWidth="0.6" opacity="0.12" />
      <path d="M280,100 Q286,94 292,100" strokeWidth="0.7" opacity="0.13" />
    </g>
  </svg>
);

// ── Contour background pattern ──────────────────────────────────────────
const ContourBackground = () => (
  <svg style={{
    position: "absolute", top: 0, left: 0, width: "55%", height: "100%",
    pointerEvents: "none", zIndex: 0,
  }} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="contourFade" cx="30%" cy="35%" r="60%" fx="25%" fy="30%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="50%" stopColor="white" stopOpacity="0.6" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      <mask id="contourMask">
        <rect width="100%" height="100%" fill="url(#contourFade)" />
      </mask>
    </defs>
    <g stroke="#4a5e3e" fill="none" opacity="0.14" mask="url(#contourMask)">
      {/* Summit - tight concentric contours */}
      <ellipse cx="175" cy="260" rx="18" ry="14" strokeWidth="1.3" />
      <ellipse cx="177" cy="262" rx="35" ry="26" strokeWidth="1.2" />
      <ellipse cx="174" cy="258" rx="55" ry="42" strokeWidth="1.1" />
      <ellipse cx="179" cy="264" rx="80" ry="60" strokeWidth="1" />
      {/* Mid-slope contours - increasingly irregular */}
      <path d="M75,268 Q110,200 178,188 Q250,178 310,218 Q345,248 320,295" strokeWidth="0.95" />
      <path d="M50,295 Q85,195 168,165 Q270,148 350,205 Q395,255 370,330" strokeWidth="0.9" />
      <path d="M25,335 Q55,195 160,138 Q295,115 390,195 Q445,265 420,375" strokeWidth="0.85" />
      <path d="M5,380 Q30,210 150,110 Q320,80 430,185 Q500,280 470,420" strokeWidth="0.8" />
      {/* Ridge extending NE from summit */}
      <path d="M200,245 Q250,228 300,245 Q345,262 385,248 Q420,235 460,244" strokeWidth="0.75" />
      <path d="M195,278 Q248,258 310,278 Q360,298 405,280 Q445,264 490,276" strokeWidth="0.7" />
      {/* Secondary peak / knob to NE */}
      <ellipse cx="400" cy="285" rx="22" ry="16" strokeWidth="0.8" />
      <ellipse cx="398" cy="283" rx="42" ry="30" strokeWidth="0.7" />
      <ellipse cx="402" cy="288" rx="65" ry="46" strokeWidth="0.6" />
      {/* Broad base contours */}
      <path d="M-20,440 Q20,260 140,90 Q340,45 480,170 Q555,290 530,470" strokeWidth="0.7" />
      <path d="M-40,510 Q0,310 130,60 Q360,10 520,155 Q600,300 580,540" strokeWidth="0.6" />
      {/* Outermost contours */}
      <path d="M-50,580 Q-10,360 120,40 Q380,-15 560,140 Q640,320 620,590" strokeWidth="0.5" />
      <path d="M-60,650 Q-20,420 110,20 Q400,-40 580,130 Q670,340 650,660" strokeWidth="0.4" />
    </g>
  </svg>
);

const ContourDivider = ({ style }) => (
  <svg viewBox="0 0 800 40" style={{ width: "100%", maxWidth: 600, height: 40, opacity: 0.2, ...style }}>
    <path d="M0,20 Q100,8 200,18 Q300,28 400,16 Q500,6 600,22 Q700,32 800,18" fill="none" stroke="#4a5e3e" strokeWidth="1" />
    <path d="M0,24 Q120,12 220,22 Q320,32 420,20 Q520,10 620,26 Q720,36 800,22" fill="none" stroke="#4a5e3e" strokeWidth="0.6" />
    <path d="M0,28 Q80,16 200,26 Q340,36 440,22 Q540,12 640,28 Q740,34 800,26" fill="none" stroke="#4a5e3e" strokeWidth="0.4" />
  </svg>
);

const CompassRose = ({ size = 32, style }) => (
  <svg viewBox="0 0 100 100" style={{ width: size, height: size, opacity: 0.25, ...style }}>
    <circle cx="50" cy="50" r="48" fill="none" stroke="#c4a24e" strokeWidth="1" />
    <circle cx="50" cy="50" r="3" fill="#c4a24e" />
    <line x1="50" y1="5" x2="50" y2="95" stroke="#c4a24e" strokeWidth="0.8" />
    <line x1="5" y1="50" x2="95" y2="50" stroke="#c4a24e" strokeWidth="0.8" />
    <line x1="18" y1="18" x2="82" y2="82" stroke="#c4a24e" strokeWidth="0.5" />
    <line x1="82" y1="18" x2="18" y2="82" stroke="#c4a24e" strokeWidth="0.5" />
    <polygon points="50,8 46,30 54,30" fill="#c4a24e" opacity="0.6" />
    <text x="50" y="4" textAnchor="middle" fill="#c4a24e" fontSize="7" fontFamily="EB Garamond, serif">N</text>
  </svg>
);

const CoordLabel = ({ lat, lon, label, note }) => (
  <div className="coord-label" style={{
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.7rem",
    color: "#7a6b55",
    letterSpacing: "0.06em",
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  }}>
    <span style={{ color: "#c4a24e", opacity: 0.7 }}>◈</span>
    <span>{lat}, {lon}</span>
    <span style={{ color: "#5a5244", fontStyle: "italic", fontFamily: "'EB Garamond', serif", fontSize: "0.78rem" }}>
      — {label}
    </span>
    {note && (
      <span style={{
        fontSize: "0.6rem",
        color: "#6b5f4f",
        background: "rgba(74, 94, 62, 0.12)",
        padding: "1px 6px",
        borderRadius: 3,
        marginLeft: 2,
      }}>
        {note}
      </span>
    )}
  </div>
);

// ── External link component with yellow underline animation ─────────────
const ExtLink = ({ href, children, style: extraStyle }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: "0.68rem",
      letterSpacing: "0.06em",
      color: "var(--accent-amber)",
      textDecoration: "none",
      position: "relative",
      display: "inline-block",
      paddingBottom: 2,
      ...extraStyle,
    }}
    onMouseEnter={e => {
      const underline = e.target.querySelector('.link-underline');
      if (underline) underline.style.width = '100%';
    }}
    onMouseLeave={e => {
      const underline = e.target.querySelector('.link-underline');
      if (underline) underline.style.width = '0%';
    }}
  >
    {children}
    <span className="link-underline" style={{
      position: "absolute",
      bottom: 0, left: 0,
      height: 1,
      width: "0%",
      background: "var(--accent-amber)",
      transition: "width 0.3s ease",
    }} />
  </a>
);

// ── Project data ────────────────────────────────────────────────────────
const researchThemes = [
  {
    id: "understanding",
    numeral: "I",
    title: "Understanding the Earth",
    subtitle: "Satellite intelligence & geospatial AI",
    description: "Making sense of how foundation models encode planetary information — opening the black box of satellite embeddings to understand what machines see when they look at Earth.",
    projects: [
      {
        title: "What on Earth is Google AlphaEarth?",
        role: "Lead Developer & Co-Author",
        org: "Sustainability and Data Sciences Lab, Northeastern University",
        year: "2026",
        summary: "Investigating interpretability of Google DeepMind's 64-dimensional AlphaEarth satellite embeddings — identifying which dimensions are most predictive for ESA WorldCover land cover classification. Built a full-stack interactive dashboard (React/TypeScript, Python/Polars) for exploring 130K+ experimental records.",
        tags: ["GeoAI", "Foundation Models", "React/TypeScript", "Python/Polars", "Data Visualization"],
        links: [
            { label: "Preprint", href: "https://arxiv.org/abs/2603.16911" },
            { label: "Live App", href: "https://alpha-earth-viz.vercel.app" },
            { label: "App DOI", href: "https://doi.org/10.5281/zenodo.17728053" },
            { label: "Source", href: "https://github.com/justing0909/AlphaEarth_Viz" },
          ],
        coord: { lat: "42.3398°N", lon: "71.0892°W", label: "Boston, MA", note: "research base" },
        status: "Preprint completed · Software published on Zenodo",
        preview: { type: "embed", hint: "Interactive dashboard" },
      },
      {
        title: "Encyclopedia of GIS — Chapter Revisions",
        role: "Contributing Researcher",
        org: "Sustainability and Data Sciences Lab, Northeastern University",
        year: "2026",
        summary: "Updated three chapters from their 2017 publication: 'Climate Extremes and Informing Adaptation,' 'Informing Climate Adaptation with Earth System Models and Big Data,' and 'Climate Adaptation, Introduction.'",
        tags: ["Climate Science", "Technical Writing", "Literature Review"],
        links: [],
        coord: { lat: "42.3398°N", lon: "71.0892°W", label: "Boston, MA", note: "research base" },
        status: "Revisions contributed",
        preview: null,
      },
    ],
  },
  {
    id: "networks",
    numeral: "II",
    title: "Networks, Interdependence, & Cascading Risk",
    subtitle: "Infrastructure systems & failure propagation",
    description: "Infrastructure systems don't fail in isolation. A downed power line becomes a water outage becomes a shelter crisis. Mapping these hidden dependencies — and finding the chokepoints that matter most.",
    projects: [
      {
        title: "Cascading Infrastructure Failure Modeling",
        role: "GIS Specialist",
        org: "Enodia Inc.",
        year: "2025–Present",
        summary: "Animated simulations in ArcGIS Online demonstrating how hurricane scenarios propagate through coupled power and water networks. Identified single-point-of-failure chokepoints where one circuit loss cascades into water supply disruption, school power outage, and residential service loss. Completed NSF I-Corps Spark Program; conducted customer discovery with Maine municipalities.",
        tags: ["ArcGIS Online", "Network Analysis", "Cascading Failures", "Customer Discovery", "NSF I-Corps"],
        links: [],
        coord: { lat: "43.6667°N", lon: "70.2500°W", label: "Portland, ME", note: "case study subject" },
        status: "Active — proprietary methodology",
        preview: { type: "image", hint: "Animated simulation still" },
      },
      {
        title: "Defense Industrial Base Geospatial Analysis",
        role: "Research Associate",
        org: "Defense Industrial Base Institute, Northeastern University",
        year: "2025–Present",
        summary: "Developed geodatabase of 300+ U.S. shipyards and repair facilities with 10+ analytical attributes per site. Built interactive ArcGIS Dashboard for internal stakeholder use; managed geospatial data sharing across 20+ users. Cleaned and visualized social capital investment data across U.S. metropolitan areas.",
        tags: ["ArcGIS Pro", "Geodatabase", "Dashboard Design", "Defense"],
        links: [],
        coord: { lat: "42.3398°N", lon: "71.0892°W", label: "Boston, MA", note: "research base" },
        status: "Active",
        preview: null,
      },
      {
        title: "Rail Network Resilience Optimization",
        role: "Research Assistant",
        org: "Sustainability and Data Sciences Lab, Northeastern University",
        year: "2025",
        summary: "Modeling betweenness-centrality on the Amtrak network as a subgraph of U.S. freight rail to optimize service extensions under budget constraints — maximizing both population served and resilience to weather extremes. Contributed data engineering, initial GIS visualization, and network condensation.",
        tags: ["Network Science", "Betweenness Centrality", "Transportation", "Python", "GIS"],
        links: [],
        coord: { lat: "38.8951°N", lon: "77.0364°W", label: "Washington, D.C.", note: "Amtrak network hub" },
        status: "Research ongoing",
        preview: { type: "image", hint: "Network visualization" },
      },
      {
        title: "MBTA Commuter Rail Network Modeling",
        role: "Digital Solutions Co-op",
        org: "Keolis Commuter Services",
        year: "2023",
        summary: "Enhanced real-time Python data pipeline in Azure for track change handling across the MBTA Commuter Rail, cross-referencing Amtrak and MBTA schedules. Implemented NetworkX graph model using Dijkstra's algorithm; established framework for South Coast Rail integration. Improved scheduling accuracy for 81K+ daily passengers via XML transformations across 135 stations.",
        tags: ["NetworkX", "Python", "Azure", "Real-Time Data", "XML"],
        links: [],
        coord: { lat: "42.3519°N", lon: "71.0552°W", label: "South Station, Boston", note: "network terminus" },
        status: "Completed",
        preview: null,
      },
    ],
  },
  {
    id: "communities",
    numeral: "III",
    title: "Building with Communities",
    subtitle: "Participatory resilience & stakeholder engagement",
    description: "Resilience isn't just a modeling problem — it's a listening problem. Working with communities to understand what they actually face, not what we assume they face, and building tools that serve their real needs.",
    projects: [
      {
        title: "GIS Day 2024 & 2025",
        role: "Organizer, MC, & Featured Speaker",
        org: "Northeastern University",
        year: "2024–2025",
        summary: "Led planning and execution of GIS Day 2024 — coordinated speakers, catering, logistics, and served as master of ceremonies. Increased attendance four-fold. Returned as featured speaker at GIS Day 2025 presenting AlphaEarth research.",
        tags: ["Event Planning", "Community Building", "GIS Advocacy", "Public Speaking"],
        links: { label: "NULab Feature", href: "https://cssh.northeastern.edu/nulab/fall-2025-gis-day/" },
        coord: { lat: "42.3398°N", lon: "71.0892°W", label: "Northeastern University, Boston", note: "event venue" },
        status: "Completed",
        preview: { type: "image", hint: "Event photos" },
      },
      {
        title: "Caribbean Community Resilience Assessment",
        role: "Undergraduate Research Assistant",
        org: "Global Resilience Institute, Northeastern University",
        year: "2025",
        summary: "Collected baseline resilience indicators (transportation, public safety, urbanism) for three communities in St. Thomas, USVI using the I-RES methodology. Created animated population migration timeline from U.S. Census data. Developed StoryMaps for Caribbean infrastructure challenges. Assisted planning collaborative sessions integrating local stakeholder input into resilience assessments.",
        tags: ["StoryMaps", "Census Data", "Community Engagement", "I-RES"],
        links: [{ label: "Coulibistrie, Dominica StoryMap", href: "https://storymaps.arcgis.com/stories/1b49c1a74cab42b8b7897044cf8501d2" },
                { label: "Crab Hill, Barbados StoryMap", href: "https://storymaps.arcgis.com/stories/d0081be96ae64e3d8a01f27e9c5214f9" },
                { label: "Pile Bay, Barbados StoryMap", href: "https://storymaps.arcgis.com/stories/6dccd4993a1d4b01a07fd4628ce84c71" }],
        coord: { lat: "18.3358°N", lon: "64.9307°W", label: "St. Thomas, USVI", note: "field site" },
        status: "Completed",
        preview: { type: "image", hint: "StoryMap & population timeline" },
      },
      {
        title: "3D Digital Heritage — Porto Novo, Benin",
        role: "Informatics Co-op, GIS Focus",
        org: "Northeastern University Library",
        year: "2024",
        summary: "Created 3D panorama tour of Porto Novo, Benin for the African Built Heritage Hub using 3DVista. Processed LiDAR point cloud data into mesh layers for urban-scale 3D models in ArcGIS Online.",
        tags: ["3DVista", "LiDAR", "Point Clouds", "ArcGIS Online", "Digital Heritage"],
        links: [{ label: "African Built Heritage Digital Hub", href: "https://african-built-heritage-nu.hub.arcgis.com/" }],
        coord: { lat: "6.4969°N", lon: "2.6289°E", label: "Porto Novo, Benin", note: "subject location" },
        status: "Completed",
        preview: { type: "image", hint: "3D panorama & LiDAR model" },
      },
    ],
  },
];

const toolsAndMethods = [
  { name: "FastMCP Server — Maine Community Data", desc: "MCP server integrating Google Sheets community resilience data for AI-assisted municipal research", link: null, year: "2025" },
  { name: "Agentic AI EdTech Chatbot", desc: "RAG-based agentic system using open-source LLMs to answer queries from course materials", link: "https://github.com/justing0909/agentic_ai_edtech_chatbot", year: "2025" },
  { name: "ArcGIS Online Auto-Update Pipeline", desc: "Python package for real-time feature layer updates via external APIs", link: "https://github.com/justing0909/agol_auto_feature_layer", year: "2024" },
  { name: "MBTA Transit Delay Predictor", desc: "Bayesian and MLP models predicting transit delays from weather data", link: "https://github.com/justing0909/mbta_transit_delay_predictor", year: "2024" },
];

const trajectoryItems = [
  { text: "RHYTHM — tentative lead author for next iteration of human mobility prediction for disaster scenarios", type: "paper" },
  { text: "XAI × AlphaEarth — emerging collaboration with MIT Senseable City Lab on explainable satellite AI", type: "collaboration" },
  { text: "ERL Perspective — 'Towards a Resilience Framework for Compound Extremes and Cascading Failures'", type: "perspective" },
  { text: "NASA INNOVATE grant solicitation & space weather research continuation from ROSES SWR2O2R", type: "grant" },
];

// ── Main component ──────────────────────────────────────────────────────
export default function GeoPortfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // "themeId-projectIndex"

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", handleScroll); };
  }, []);

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroParallax = Math.min(scrollY * 0.25, 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&family=IBM+Plex+Mono:wght@300;400&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg-deep: #1a1e1b;
          --bg-card: #21251e;
          --bg-card-hover: #272c23;
          --text-parchment: #e2d8c4;
          --text-body: #c4b9a5;
          --text-muted: #9b8e7a;
          --text-dim: #6b5f4f;
          --accent-moss: #4a5e3e;
          --accent-moss-light: #5a7048;
          --accent-amber: #c4a24e;
          --accent-amber-dim: #a08338;
          --accent-leather: #7a5c3a;
          --border-subtle: rgba(74, 94, 62, 0.18);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg-deep);
          color: var(--text-body);
          font-family: 'Crimson Pro', serif;
          font-weight: 400;
          line-height: 1.75;
          overflow-x: hidden;
        }

        /* Grain overlay */
        .grain-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background: var(--accent-moss); border-radius: 3px; }

        a { color: var(--accent-amber); text-decoration: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .fade-up { opacity: 0; animation: fadeUp 0.8s ease forwards; }
        .fade-in { opacity: 0; animation: fadeIn 1s ease forwards; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }
        .delay-5 { animation-delay: 0.75s; }
        .delay-6 { animation-delay: 0.9s; }

        .tag {
          display: inline-block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.64rem;
          color: var(--accent-moss-light);
          border: 1px solid var(--border-subtle);
          padding: 2px 8px;
          border-radius: 2px;
          letter-spacing: 0.04em;
          cursor: default;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
          padding: 28px 28px 22px;
          transition: all 0.4s ease;
          position: relative;
        }
        .project-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: var(--accent-moss);
          opacity: 0;
          transition: opacity 0.4s;
          border-radius: 3px 0 0 3px;
        }
        .project-card:hover {
          background: var(--bg-card-hover);
          border-color: rgba(74, 94, 62, 0.3);
          box-shadow: 0 6px 28px rgba(0,0,0,0.25);
        }
        .project-card:hover::before { opacity: 1; }

        .status-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 2px;
          display: inline-block;
        }
        .status-active { background: rgba(74, 94, 62, 0.2); color: var(--accent-moss-light); }
        .status-completed { background: rgba(122, 92, 58, 0.15); color: var(--accent-leather); }
        .status-paper { background: rgba(196, 162, 78, 0.12); color: var(--accent-amber-dim); }

        .tool-item {
          padding: 16px 20px;
          border-left: 2px solid var(--border-subtle);
          transition: all 0.3s;
        }
        .tool-item:hover {
          border-left-color: var(--accent-amber);
          background: rgba(196, 162, 78, 0.03);
        }

        .trajectory-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(74, 94, 62, 0.1);
        }
        .trajectory-item:last-child { border-bottom: none; }
        .trajectory-marker {
          width: 8px; height: 8px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .nav-link {
          font-family: 'EB Garamond', serif;
          font-size: 0.95rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          padding: 6px 0;
          position: relative;
          transition: color 0.3s;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-link:hover { color: var(--text-parchment); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0;
          width: 0; height: 1px;
          background: var(--accent-amber);
          transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }

        .ext-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: var(--accent-amber);
          text-decoration: none;
          position: relative;
          display: inline-block;
          padding-bottom: 2px;
        }
        .ext-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: var(--accent-amber);
          transition: width 0.3s ease;
        }
        .ext-link:hover::after { width: 100%; }
        .ext-link:hover { color: var(--accent-amber); }

        .footer-link {
          color: var(--accent-amber);
          text-decoration: none;
          position: relative;
          display: inline-block;
          padding-bottom: 1px;
          font-size: 0.85rem;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: var(--accent-amber);
          transition: width 0.3s ease;
        }
        .footer-link:hover::after { width: 100%; }

        .hero-ext-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
          text-decoration: none;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 2px;
          transition: all 0.3s;
        }
        .hero-ext-link:hover {
          color: var(--accent-amber);
          border-bottom-color: var(--accent-amber);
        }

        /* ── Responsive: Tablet (768px and below) ─── */
        @media (max-width: 768px) {
          .nav-links { gap: 16px !important; }
          .nav-link { font-size: 0.85rem; }
          .hero-section { padding: 0 6vw !important; }
          .hero-inner { flex-direction: column !important; }
          .hero-text { max-width: 100% !important; flex: 1 1 100% !important; }
          .hero-landscape { display: none !important; }
          .section-padding { padding-left: 6vw !important; padding-right: 6vw !important; }
          .project-card { padding: 22px 20px 18px !important; }
          .footer-grid {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .footer-contact {
            text-align: left !important;
            align-items: flex-start !important;
          }
          .footer-contact > div {
            align-items: flex-start !important;
          }
          .card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
          .card-meta {
            align-self: flex-start !important;
          }
        }

        /* ── Responsive: Mobile (480px and below) ─── */
        @media (max-width: 480px) {
          .nav-bar { padding: 12px 20px !important; }
          .nav-links { display: none !important; }
          .hero-section {
            padding: 0 5vw !important;
            min-height: 90vh !important;
          }
          .section-padding {
            padding-left: 5vw !important;
            padding-right: 5vw !important;
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
          .project-card { padding: 18px 16px 14px !important; }
          .hero-links { gap: 16px !important; }
          .scroll-indicator { display: none !important; }
          .coord-label { flex-wrap: wrap; }
        }
      `}</style>

      <div className="grain-overlay" />

      {/* ── Navigation ─────────────────────────────────── */}
      <nav className="nav-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 60 ? "rgba(26, 30, 27, 0.92)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(74, 94, 62, 0.15)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}
        >
          <CompassRose size={22} style={{ opacity: 0.5 }} />
          <span style={{
            fontFamily: "'EB Garamond', serif", fontSize: "1.1rem",
            color: "var(--text-parchment)", letterSpacing: "0.08em", fontWeight: 500,
          }}>
            J. Guthrie
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Work", id: "work" },
            { label: "Instruments", id: "instruments" },
            { label: "Trajectory", id: "trajectory" },
            { label: "About", id: "about" },
          ].map(item => (
            <button
              key={item.id}
              className="nav-link"
              onClick={e => smoothScroll(e, item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="hero-section" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 10vw",
        position: "relative", overflow: "hidden",
      }}>
        <ContourBackground />
        <div className="hero-inner" style={{
          position: "relative", zIndex: 1,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 40, flexWrap: "wrap",
        }}>
          {/* Left: text content */}
          <div className="hero-text" style={{ maxWidth: 600, flex: "1 1 400px" }}>
            {/* PhD banner */}
            <div className={loaded ? "fade-up" : ""} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem",
              color: "var(--accent-amber-dim)", letterSpacing: "0.12em", textTransform: "uppercase",
              padding: "5px 12px",
              border: "1px solid rgba(196, 162, 78, 0.2)",
              borderRadius: 2,
              display: "inline-block",
              marginBottom: 20,
            }}>
              Seeking doctoral research positions · Entering class of 2027
            </div>

            <div className={loaded ? "fade-up delay-1" : ""} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem",
              color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase",
              marginBottom: 18,
            }}>
              43.6591°N, 70.2568°W — Portland, Maine
            </div>

            <h1 className={loaded ? "fade-up delay-2" : ""} style={{
              fontFamily: "'EB Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              fontWeight: 500, lineHeight: 1.15, color: "var(--text-parchment)",
              marginBottom: 22,
            }}>
              Justin Guthrie
            </h1>

            <p className={loaded ? "fade-up delay-3" : ""} style={{
              fontFamily: "'EB Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              fontWeight: 400, fontStyle: "italic", color: "var(--accent-amber)",
              lineHeight: 1.5, marginBottom: 28,
            }}>
              Mapping what connects — and what breaks.
            </p>

            <p className={loaded ? "fade-up delay-4" : ""} style={{
              fontSize: "1.02rem", color: "var(--text-muted)", maxWidth: 560, lineHeight: 1.85,
            }}>
              I study how infrastructure systems depend on each other — and how those 
              hidden connections shape what happens when something breaks. From satellite 
              embeddings to power grids to rail networks, my work maps the 
              interdependencies that traditional analysis misses. Currently a GIS Specialist 
              at <a href="https://enodia.us" target="_blank" rel="noopener" className="footer-link" style={{ fontSize: "inherit" }}>Enodia</a> and 
              Research Associate at Northeastern University's <a href="https://sdslab.io" target="_blank" rel="noopener" className="footer-link" style={{ fontSize: "inherit" }}>Sustainability and Data Sciences Lab</a>.
            </p>

            <div className={`hero-links ${loaded ? "fade-up delay-5" : ""}`} style={{
              display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap",
            }}>
              {[
                { label: "GitHub", href: "https://github.com/justing0909" },
                { label: "ORCID", href: "https://orcid.org/0009-0009-9133-6135" },
                { label: "LinkedIn", href: "https://linkedin.com/in/justinmguthrie" },
                { label: "CV", href: "/Justin_Guthrie_CV.pdf" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener" className="hero-ext-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: hand-sketched Maine landscape */}
          <div className={`hero-landscape ${loaded ? "fade-in delay-5" : ""}`} style={{
            flex: "0 1 480px", display: "flex", justifyContent: "center",
            alignItems: "center", minWidth: 340,
          }}>
            <MaineLandscape style={{ opacity: 0.9 }} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`scroll-indicator ${loaded ? "fade-in delay-6" : ""}`} style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem",
            color: "var(--text-dim)", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 28, background: "linear-gradient(to bottom, var(--accent-moss), transparent)",
          }} />
        </div>
      </header>

      {/* ── Work Section ─────────────────────────────────── */}
      <section id="work" className="section-padding" style={{ padding: "100px 10vw", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: "2rem", fontWeight: 500,
            color: "var(--text-parchment)", marginBottom: 10,
          }}>
            Work
          </h2>
          <p style={{
            fontFamily: "'EB Garamond', serif", fontStyle: "italic",
            fontSize: "1rem", color: "var(--text-dim)",
          }}>
            Organized by research question, not employer
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <ContourDivider />
          </div>
        </div>

        {researchThemes.map((theme) => (
          <div key={theme.id} style={{ marginBottom: 80 }}>
            <div style={{ marginBottom: 32, maxWidth: 640 }}>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.63rem",
                color: "var(--accent-amber-dim)", letterSpacing: "0.15em",
                textTransform: "uppercase", marginBottom: 8,
              }}>
                {theme.numeral} · {theme.subtitle}
              </div>
              <h3 style={{
                fontFamily: "'EB Garamond', serif", fontSize: "1.55rem", fontWeight: 500,
                color: "var(--text-parchment)", marginBottom: 12,
              }}>
                {theme.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                {theme.description}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {theme.projects.map((project, pi) => {
                const cardKey = `${theme.id}-${pi}`;
                const isExpanded = expandedCard === cardKey;
                return (
                <div key={pi} className="project-card"
                  onClick={() => project.preview && setExpandedCard(isExpanded ? null : cardKey)}
                  style={{ cursor: project.preview ? "pointer" : "default" }}
                >
                  <div className="card-header" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                    flexWrap: "wrap", gap: 8, marginBottom: 12,
                  }}>
                    <div>
                      <h4 style={{
                        fontFamily: "'EB Garamond', serif", fontSize: "1.18rem", fontWeight: 600,
                        color: "var(--text-parchment)", marginBottom: 4,
                      }}>
                        {project.title}
                      </h4>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>
                        {project.role} · {project.org}
                      </div>
                    </div>
                    <div className="card-meta" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.68rem",
                        color: "var(--text-dim)",
                      }}>
                        {project.year}
                      </span>
                      <span className={`status-badge ${
                        project.status.toLowerCase().includes("active") || project.status.toLowerCase().includes("ongoing")
                          ? "status-active"
                          : project.status.toLowerCase().includes("paper") || project.status.toLowerCase().includes("preparation")
                          ? "status-paper"
                          : "status-completed"
                      }`}>
                        {project.status.toLowerCase().includes("active") || project.status.toLowerCase().includes("ongoing")
                          ? "Active"
                          : project.status.toLowerCase().includes("paper") || project.status.toLowerCase().includes("preparation")
                          ? "In Progress"
                          : "Completed"}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: "0.94rem", color: "var(--text-muted)", lineHeight: 1.8,
                    marginBottom: 14,
                  }}>
                    {project.summary}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {(project.links || []).length > 0 && (
                    <div style={{ display: "flex", gap: 16, marginBottom: 6, flexWrap: "wrap" }}
                      onClick={e => e.stopPropagation()}
                    >
                      {project.links.map((link, li) => (
                        <a key={li} href={link.href} target="_blank" rel="noopener" className="ext-link">
                          ↗ {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <CoordLabel
                    lat={project.coord.lat}
                    lon={project.coord.lon}
                    label={project.coord.label}
                    note={project.coord.note}
                  />

                  <div style={{
                    fontFamily: "'EB Garamond', serif", fontStyle: "italic",
                    fontSize: "0.8rem", color: "var(--text-dim)", marginTop: 10,
                  }}>
                    {project.status}
                  </div>

                  {/* Expanded preview panel */}
                  {project.preview && (
                  <div style={{
                    maxHeight: isExpanded ? 500 : 0,
                    opacity: isExpanded ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.5s ease",
                    marginTop: isExpanded ? 20 : 0,
                  }}>
                    <div style={{
                      borderTop: "1px solid var(--border-subtle)",
                      paddingTop: 20,
                    }}>
                      {/* Preview frame with corner marks */}
                      <div style={{
                        background: "rgba(26, 30, 27, 0.6)",
                        border: "1px solid rgba(74, 94, 62, 0.25)",
                        borderRadius: 3,
                        padding: project.preview.type === "embed" ? 4 : 24,
                        position: "relative",
                        overflow: "hidden",
                      }}>
                        {/* Corner marks */}
                        {[
                          { top: 6, left: 6 }, { top: 6, right: 6 },
                          { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
                        ].map((pos, i) => (
                          <div key={i} style={{
                            position: "absolute", ...pos, zIndex: 2,
                            width: 12, height: 12,
                            borderColor: "var(--accent-moss)",
                            borderStyle: "solid", borderWidth: 0,
                            ...(i === 0 ? { borderTopWidth: 1, borderLeftWidth: 1 } : {}),
                            ...(i === 1 ? { borderTopWidth: 1, borderRightWidth: 1 } : {}),
                            ...(i === 2 ? { borderBottomWidth: 1, borderLeftWidth: 1 } : {}),
                            ...(i === 3 ? { borderBottomWidth: 1, borderRightWidth: 1 } : {}),
                            opacity: 0.5,
                          }} />
                        ))}

                        {project.preview.type === "embed" ? (
                          /* Live embed (e.g. AlphaEarth dashboard) */
                          <div style={{ position: "relative" }}>
                            <iframe
                              src={project.links.find(l => l.label === "Live App")?.href || project.links[0]?.href}
                              title={project.title}
                              loading="lazy"
                              style={{
                                width: "100%", height: 360, border: "none",
                                borderRadius: 2, display: "block",
                                filter: "brightness(0.95) saturate(0.9)",
                              }}
                            />
                            <div style={{
                              position: "absolute", bottom: 0, left: 0, right: 0,
                              background: "linear-gradient(transparent, rgba(26,30,27,0.85))",
                              padding: "28px 16px 10px",
                              display: "flex", justifyContent: "flex-end",
                            }}>
                              <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener"
                                className="ext-link"
                                onClick={e => e.stopPropagation()}
                                style={{ fontSize: "0.7rem" }}
                              >
                                ↗ Open in new window
                              </a>
                            </div>
                          </div>
                        ) : project.preview.src ? (
                          /* Actual image */
                          <div style={{ textAlign: "center" }}>
                            <img
                              src={project.preview.src}
                              alt={project.preview.hint}
                              style={{
                                maxWidth: "100%", maxHeight: 320,
                                borderRadius: 2, display: "block", margin: "0 auto",
                                filter: "saturate(0.85) brightness(0.95) sepia(0.08)",
                              }}
                            />
                            <div style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: "0.58rem", color: "var(--text-dim)",
                              letterSpacing: "0.1em", textTransform: "uppercase",
                              marginTop: 10,
                            }}>
                              {project.preview.hint}
                            </div>
                          </div>
                        ) : (
                          /* Placeholder for images not yet provided */
                          <div style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "center", minHeight: 160,
                          }}>
                            <div style={{ textAlign: "center" }}>
                              <div style={{
                                fontFamily: "'IBM Plex Mono', monospace",
                                fontSize: "0.6rem", color: "var(--text-dim)",
                                letterSpacing: "0.12em", textTransform: "uppercase",
                                marginBottom: 8,
                              }}>
                                {project.preview.hint}
                              </div>
                              <p style={{
                                fontFamily: "'EB Garamond', serif", fontStyle: "italic",
                                fontSize: "0.88rem", color: "var(--text-dim)",
                                maxWidth: 360,
                              }}>
                                Visual preview coming soon.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Expand indicator — only for previewable projects */}
                  {project.preview && (
                  <div style={{
                    textAlign: "center", marginTop: 12,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.55rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    opacity: 0.6,
                    transition: "opacity 0.3s",
                  }}>
                    {isExpanded ? "▲ Collapse" : "▼ Preview"}
                  </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ── Instruments Section ────────────────────────────── */}
      <section id="instruments" className="section-padding" style={{
        padding: "80px 10vw", position: "relative", zIndex: 1,
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.63rem",
            color: "var(--accent-amber-dim)", letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: 8,
          }}>
            Tools & Methods
          </div>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: "1.55rem", fontWeight: 500,
            color: "var(--text-parchment)", marginBottom: 12,
          }}>
            Instruments I Build
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            Software and pipelines developed in the course of research — 
            tools for automating geospatial workflows, integrating data sources, 
            and making information accessible.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {toolsAndMethods.map((tool, i) => (
            <div key={i} className="tool-item">
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", fontWeight: 500,
                  color: "var(--text-parchment)",
                }}>
                  {tool.name}
                </span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem",
                  color: "var(--text-dim)", letterSpacing: "0.04em",
                }}>
                  {tool.year}
                </span>
                {tool.link && (
                  <a href={tool.link} target="_blank" rel="noopener" className="ext-link">↗ Source</a>
                )}
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: 4, lineHeight: 1.7 }}>
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trajectory Section ─────────────────────────────── */}
      <section id="trajectory" className="section-padding" style={{
        padding: "80px 10vw", position: "relative", zIndex: 1,
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.63rem",
            color: "var(--accent-amber-dim)", letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: 8,
          }}>
            Research Trajectory
          </div>
          <h2 style={{
            fontFamily: "'EB Garamond', serif", fontSize: "1.55rem", fontWeight: 500,
            color: "var(--text-parchment)", marginBottom: 12,
          }}>
            Where This Is Heading
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
            The thread connecting my work — from satellite embeddings to municipal power 
            grids to naval supply chains — is a conviction that resilience is a network 
            property, not a component property. These are the directions I'm pursuing next.
          </p>
        </div>

        <div style={{ maxWidth: 600 }}>
          {trajectoryItems.map((item, i) => (
            <div key={i} className="trajectory-item">
              <div className="trajectory-marker" style={{
                background: item.type === "paper" ? "var(--accent-amber)"
                  : item.type === "collaboration" ? "var(--accent-moss-light)"
                  : item.type === "grant" ? "var(--accent-leather)"
                  : item.type === "perspective" ? "#8a8278"
                  : "var(--text-parchment)",
              }} />
              <div>
                <p style={{ fontSize: "0.94rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {item.text}
                </p>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem",
                  color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About / Footer ─────────────────────────────────── */}
      <footer id="about" className="section-padding" style={{
        padding: "80px 10vw 60px", position: "relative", zIndex: 1,
        borderTop: "1px solid var(--border-subtle)",
      }}>
        <div className="footer-grid" style={{
          display: "flex", justifyContent: "space-between",
          gap: 80, flexWrap: "wrap",
        }}>
          <div style={{ flex: "1 1 340px", maxWidth: 480 }}>
            <h2 style={{
              fontFamily: "'EB Garamond', serif", fontSize: "1.4rem", fontWeight: 500,
              color: "var(--text-parchment)", marginBottom: 16,
            }}>
              About
            </h2>
            <p style={{ fontSize: "0.94rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 12 }}>
              BSc in Data Science & Business Administration from Northeastern University (2025). 
              Currently based in Maine, working at the intersection of GIS, earth observation, machine learning, artificial intelligence, 
              and infrastructure resilience.
            </p>
            <p style={{ fontSize: "0.94rem", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 12 }}>
              Eagle Scout. 2024 Northeastern University GIS Day organizer. Currently learning 
              French, Dutch, and Mandarin Chinese. Lover of maps, music, and the outdoors. Persistent user of the Oxford comma.
            </p>
          </div>

          {/* Contact - right aligned */}
          <div className="footer-contact" style={{ flex: "0 0 auto", textAlign: "right" }}>
            <h2 style={{
              fontFamily: "'EB Garamond', serif", fontSize: "1.4rem", fontWeight: 500,
              color: "var(--text-parchment)", marginBottom: 16,
            }}>
              Contact
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              {[
                { label: "Email", value: "j.guthrie[at]northeastern.edu" },
                { label: "GitHub", value: "github.com/justing0909", href: "https://github.com/justing0909" },
                { label: "LinkedIn", value: "justinmguthrie", href: "https://linkedin.com/in/justinmguthrie" },
                { label: "ORCID", value: "0009-0009-9133-6135", href: "https://orcid.org/0009-0009-9133-6135" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.66rem",
                    color: "var(--text-dim)", letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {item.label}
                  </span>
                  <a href={item.href} target="_blank" rel="noopener" className="footer-link">
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
          <ContourDivider />
        </div>

        <div style={{
          textAlign: "center", marginTop: 20,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem",
          color: "var(--text-dim)", letterSpacing: "0.1em",
        }}>
          <CompassRose size={16} style={{ display: "inline-block", verticalAlign: "middle", marginRight: 8, opacity: 0.35 }} />
          Built with care in Maine · 2026
        </div>
      </footer>
    </>
  );
}