import React from 'react'

export default function AgronomyEdgeDataViz() {
  // Data for the looping phone feed
  const CARDS = [
    { id: 6, label: 'Disease Warning', source: 'NIAB', color: '#be123c' },
    { id: 5, label: 'Policy Alert', source: 'AGRII', color: '#047857' },
    { id: 4, label: 'Trial Results', source: 'AHDB', color: '#C07040' },
    { id: 3, label: 'Technical Update', source: 'NGA', color: '#9333ea' },
    { id: 2, label: 'Chemistry Brief', source: 'Bayer', color: '#0284c7' },
    { id: 1, label: 'Variety Update', source: 'RAGT', color: '#232f1d' },
  ]

  // We duplicate the array to create a seamless infinite scrolling marquee effect
  const FEED_ITEMS = [...CARDS, ...CARDS.slice(0, 3)]

  return (
    <div className="@container relative mx-auto aspect-[560/580] w-full min-w-0 max-w-[560px]">
      <div
        className="absolute left-1/2 top-0 h-[580px] w-[560px] shrink-0 overflow-hidden"
        style={{
          transform: 'translateX(-50%) scale(calc(100cqi / 560px))',
          transformOrigin: 'top center',
        }}
      >
        <style>{`
        /* Organic Floating for Deco Nodes */
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) translateX(0px) scale(1); } 50% { transform: translateY(-8px) translateX(4px) scale(1.1); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) translateX(0px) scale(1); } 50% { transform: translateY(-12px) translateX(-4px) scale(0.9); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) translateX(0px) scale(1); } 50% { transform: translateY(8px) translateX(2px) scale(1.08); } }
        
        /* Flowing SVG Spaghetti Lines */
        @keyframes flow-down { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        
        /* 12-Second Master Loop: Node Ingestion */
        @keyframes ingest-node {
           0% { transform: translate(0px, 0px) scale(1); opacity: 1; }
           8% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
           /* Extended invisibility: Stay hidden until 25% of the 12s loop (3 full seconds) */
           25% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
           /* Instantly teleport back to the start point while still invisible */
           26% { transform: translate(0px, 0px) scale(0); opacity: 0; }
           /* Smoothly fade and scale back into the background at the 4 second mark */
           33%, 100% { transform: translate(0px, 0px) scale(1); opacity: 1; }
        }

        /* 24-Second Text Swap Loop for All Active Nodes (Swaps while invisible in the core) */
        @keyframes text-swap-a {
           0%, 8.3% { opacity: 1; }
           8.4%, 58.3% { opacity: 0; }
           58.4%, 100% { opacity: 1; }
        }
        @keyframes text-swap-b {
           0%, 8.3% { opacity: 0; }
           8.4%, 58.3% { opacity: 1; }
           58.4%, 100% { opacity: 0; }
        }

        /* 2-Second Micro Loop: Core Pulse & Data Transmission */
        @keyframes core-glow {
           0%, 30%, 60%, 100% { box-shadow: 0 0 15px rgba(192,112,64,0.3); transform: scale(1) translateX(-50%) translateY(-50%); border-color: rgba(192,112,64,0.5); }
           40% { box-shadow: 0 0 40px rgba(192,112,64,1); transform: scale(1.08) translateX(-46%) translateY(-46%); border-color: rgba(192,112,64,1); }
        }
        @keyframes packet-shoot {
           0%, 39% { transform: translateY(-30px); opacity: 0; }
           40% { transform: translateY(-30px); opacity: 1; }
           70% { transform: translateY(120px); opacity: 1; }
           71%, 100% { transform: translateY(120px); opacity: 0; }
        }

        /* 12-Second Master Loop: Phone Feed Scrolling 
           Timings perfectly match the packet-shoot (Starts exactly at packet launch, ends exactly at packet strike)
        */
        @keyframes phone-scroll {
           0%, 6.66% { transform: translateY(-360px); }
           11.66%, 23.33% { transform: translateY(-300px); }
           28.33%, 40% { transform: translateY(-240px); }
           45%, 56.66% { transform: translateY(-180px); }
           61.66%, 73.33% { transform: translateY(-120px); }
           78.33%, 90% { transform: translateY(-60px); }
           95%, 100% { transform: translateY(0px); }
        }

        /* Utility Classes */
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-flow { animation: flow-down 1s linear infinite; }
        .animate-core { animation: core-glow 2s infinite; }
        .animate-packet { animation: packet-shoot 2s infinite; }
        .animate-phone-scroll { animation: phone-scroll 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>

        {/* LAYER 1: The "Spaghetti" Data Streams (SVG Curves matching exact node coordinates) */}
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
          <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#C07040" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <g stroke="url(#flowGrad)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" className="animate-flow">
            {/* Target Core Center is roughly 280, 290 */}
            <path d="M 90 75 C 120 150, 200 200, 280 290" />
            <path d="M 470 65 C 400 150, 350 200, 280 290" />
            <path d="M 80 215 C 150 220, 200 250, 280 290" />
            <path d="M 280 55 C 260 150, 280 200, 280 290" />
            <path d="M 420 175 C 360 210, 310 250, 280 290" />
            <path d="M 190 135 C 220 200, 240 250, 280 290" />
          </g>
        </svg>

        {/* LAYER 2: Floating Nodes (The Active Sequence) */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Active Node 1 (0s): RAGT -> GENETICS */}
          <div className="animate-float-1 absolute left-[40px] top-[60px]">
            <div
              style={{
                animation: 'ingest-node 12s infinite',
                animationDelay: '0s',
                '--tx': '240px',
                '--ty': '230px',
              }}
              className="grid place-items-center"
            >
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-[#C07040]/30 bg-[#1a2415]/90 px-3 py-1.5 text-[12px] font-black uppercase tracking-widest text-[#C07040] shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-a 24s infinite', animationDelay: '0s' }}
              >
                RAGT
              </span>
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-[#C07040]/30 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C07040] shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-b 24s infinite', animationDelay: '0s' }}
              >
                GENETICS
              </span>
            </div>
          </div>

          {/* Active Node 2 (2s): BAYER -> CROP SCIENCE */}
          <div className="animate-float-2 absolute left-[420px] top-[50px]">
            <div
              style={{
                animation: 'ingest-node 12s infinite',
                animationDelay: '2s',
                '--tx': '-140px',
                '--ty': '240px',
              }}
              className="grid place-items-center"
            >
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-300 shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-a 24s infinite', animationDelay: '2s' }}
              >
                BAYER
              </span>
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-300 shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-b 24s infinite', animationDelay: '2s' }}
              >
                CROP SCIENCE
              </span>
            </div>
          </div>

          {/* Active Node 3 (4s): NIAB -> RESEARCH INSTITUTES */}
          <div className="animate-float-3 absolute left-[20px] top-[195px]">
            <div
              style={{
                animation: 'ingest-node 12s infinite',
                animationDelay: '4s',
                '--tx': '250px',
                '--ty': '90px',
              }}
              className="grid place-items-center"
            >
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-300 shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-a 24s infinite', animationDelay: '4s' }}
              >
                NIAB
              </span>
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-300 shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-b 24s infinite', animationDelay: '4s' }}
              >
                RESEARCH INSTITUTES
              </span>
            </div>
          </div>

          {/* Active Node 4 (6s): AHDB -> CROP TRIALS */}
          <div className="animate-float-1 absolute left-[230px] top-[40px]">
            <div
              style={{
                animation: 'ingest-node 12s infinite',
                animationDelay: '6s',
                '--tx': '50px',
                '--ty': '250px',
              }}
              className="grid place-items-center"
            >
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-300 shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-a 24s infinite', animationDelay: '6s' }}
              >
                AHDB
              </span>
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[12px] font-bold uppercase tracking-widest text-stone-300 shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-b 24s infinite', animationDelay: '6s' }}
              >
                CROP TRIALS
              </span>
            </div>
          </div>

          {/* Active Node 5 (8s): NGA -> TECHNICAL UPDATES */}
          <div className="animate-float-2 absolute left-[370px] top-[160px]">
            <div
              style={{
                animation: 'ingest-node 12s infinite',
                animationDelay: '8s',
                '--tx': '-90px',
                '--ty': '130px',
              }}
              className="grid place-items-center"
            >
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-[#C07040]/30 bg-[#1a2415]/90 px-3 py-1.5 text-[12px] font-black uppercase tracking-widest text-[#C07040] shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-a 24s infinite', animationDelay: '8s' }}
              >
                NGA
              </span>
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-[#C07040]/30 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C07040] shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-b 24s infinite', animationDelay: '8s' }}
              >
                TECHNICAL UPDATES
              </span>
            </div>
          </div>

          {/* Active Node 6 (10s): AGRII -> ENVIRONMENT SCHEMES */}
          <div className="animate-float-3 absolute left-[140px] top-[120px]">
            <div
              style={{
                animation: 'ingest-node 12s infinite',
                animationDelay: '10s',
                '--tx': '140px',
                '--ty': '170px',
              }}
              className="grid place-items-center"
            >
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-[#C07040]/30 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C07040] shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-a 24s infinite', animationDelay: '10s' }}
              >
                AGRII
              </span>
              <span
                className="col-start-1 row-start-1 whitespace-nowrap rounded-full border border-[#C07040]/30 bg-[#1a2415]/90 px-3 py-1.5 text-[12px] font-black uppercase tracking-widest text-[#C07040] shadow-lg backdrop-blur-md"
                style={{ animation: 'text-swap-b 24s infinite', animationDelay: '10s' }}
              >
                ENVIRONMENT SCHEMES
              </span>
            </div>
          </div>

          {/* Static Decoration Nodes (To keep the network looking busy in the background) */}
          <div className="animate-float-1 absolute left-[360px] top-[100px]" style={{ animationDelay: '-3s' }}>
            <span className="whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[12px] font-bold uppercase tracking-widest text-stone-100 backdrop-blur-md">
              MARKET PRICES
            </span>
          </div>
          <div className="animate-float-2 absolute left-[240px] top-[170px]" style={{ animationDelay: '-5s' }}>
            <span className="whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[14px] font-bold uppercase tracking-widest text-stone-100 backdrop-blur-md">
              DEFRA
            </span>
          </div>
          <div className="animate-float-3 absolute left-[150px] top-[10px]" style={{ animationDelay: '-2s' }}>
            <span className="whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-100 backdrop-blur-md">
              SYNGENTA
            </span>
          </div>
          <div className="animate-float-1 absolute left-[410px] top-[210px]" style={{ animationDelay: '-4s' }}>
            <span className="whitespace-nowrap rounded-full border border-white/20 bg-[#1a2415]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-100 backdrop-blur-md">
              WEATHER DATA
            </span>
          </div>
        </div>

        {/* LAYER 3: The Edge Engine (The Filter) */}
        <div className="animate-core absolute left-[280px] top-[290px] z-30">
          <div className="group relative">
            {/* The Processor Box */}
            <div className="relative flex items-center gap-[18px] border border-[#C07040] bg-white/80 p-[18px] shadow-2xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63">
                <g id="Group_146" data-name="Group 146" transform="translate(11397 -5015)">
                  <rect id="Rectangle_1931" data-name="Rectangle 1931" width="63" height="63" transform="translate(-11397 5015)" fill="#fff" />
                  <path id="Path_277" data-name="Path 277" d="M23.572,39.326V0H0V63H40.046V39.326Z" transform="translate(-11397 5015)" fill="#232f1c" />
                  <path id="Path_278" data-name="Path 278" d="M12.346,0V23.671h15.7V63H51.773V0Z" transform="translate(-11385.773 5015)" fill="#ba5425" />
                </g>
              </svg>
              <div className="pr-3">
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#C07040]">
                  Edge Intelligence
                </div>
                <div className="whitespace-nowrap text-[15px] font-bold uppercase tracking-widest text-[#232f1d]">
                  Data Curation Core
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Stream (Pulsating Copper Line) */}
        <div className="absolute left-[278px] top-[310px] z-20 h-[70px] w-[4px] overflow-hidden rounded-full bg-[#C07040]/20">
          <div className="animate-packet h-[30px] w-full rounded-full bg-[#C07040] shadow-[0_0_20px_4px_#C07040]" />
        </div>

        {/* LAYER 4: The Target Device (White Flagship Phone) */}
        <div className="absolute bottom-[-20px] left-1/2 z-40 -translate-x-1/2 transform">
          {/* Outer Phone Casing */}
          <div className="relative flex h-[240px] w-48 flex-col items-center rounded-t-[2.5rem] border-x-[4px] border-t-[4px] border-[#e2e8f0] bg-[#f8fafc] p-1.5 shadow-[0_-15px_40px_-10px_rgba(255,255,255,0.05)]">
            {/* Inner Screen & Thin Black Bezel */}
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-t-[2rem] border-[5px] border-[#0f172a] bg-[#f1f5f9] px-2.5 pt-6">
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute left-1/2 top-2 z-30 flex h-4 w-16 -translate-x-1/2 transform items-center justify-end rounded-full bg-[#0f172a] px-2">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
              </div>

              {/* FADE-IN MASK WRAPPER */}
              <div
                className="relative z-10 mt-2 w-full flex-1"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)',
                }}
              >
                {/* Screen Content Mockup (The Scrolling Feed) */}
                <div className="animate-phone-scroll absolute left-0 top-0 w-full">
                  {FEED_ITEMS.map((item, index) => (
                    <div
                      key={index}
                      className="mb-[10px] flex h-[50px] w-full shrink-0 items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
                    >
                      <div className="h-6 w-0.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                      <div className="flex-1">
                        <div
                          className="mb-1 text-[10px] font-black uppercase tracking-widest"
                          style={{ color: item.color }}
                        >
                          {item.label}
                        </div>
                        <div className="h-0.5 w-1/2 rounded-full bg-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
