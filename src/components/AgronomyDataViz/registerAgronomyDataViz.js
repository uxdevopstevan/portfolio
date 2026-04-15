/**
 * Registers the <agronomy-data-viz /> custom element (vanilla Web Component).
 * Safe to call multiple times (e.g. React StrictMode): registration is idempotent.
 */
export function registerAgronomyDataViz() {
  if (typeof window === 'undefined') return
  if (window.self !== window.top) return // Skip in iframe (Site Builder/Preview)
  if (customElements.get('agronomy-data-viz')) return

  class AgronomyDataViz extends HTMLElement {
    constructor() {
      super()
      this._ro = null
      this._vvHandler = null
    }

    connectedCallback() {
      this.innerHTML = `
                <div data-viz-root class="relative bg-transparent min-w-0 mx-auto">
                    <div data-viz-scene class="relative overflow-hidden origin-top-left" style="width: 560px; height: 580px;">
                    
                    <style>
                        agronomy-data-viz {
                            display: block;
                            width: fit-content;
                            max-width: 100%;
                            min-width: 0;
                            margin-inline: auto;
                            box-sizing: border-box;
                            overflow-x: hidden;
                        }
                        [data-viz-root] {
                            --viz-scale: 1;
                            width: calc(560px * var(--viz-scale));
                            max-width: 100%;
                            min-width: 0;
                            overflow: hidden;
                            height: calc(580px * var(--viz-scale));
                        }
                        [data-viz-scene] {
                            transform: scale(var(--viz-scale));
                        }

                        @keyframes float-1 { 0%, 100% { transform: translateY(0px) translateX(0px) scale(1); } 50% { transform: translateY(-8px) translateX(4px) scale(1.1); } }
                        @keyframes float-2 { 0%, 100% { transform: translateY(0px) translateX(0px) scale(1); } 50% { transform: translateY(-12px) translateX(-4px) scale(0.9); } }
                        @keyframes float-3 { 0%, 100% { transform: translateY(0px) translateX(0px) scale(1); } 50% { transform: translateY(8px) translateX(2px) scale(1.08); } }
                        
                        @keyframes flow-down { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
                        
                        @keyframes ingest-node {
                            0% { transform: translate(0px, 0px) scale(1); opacity: 1; }
                            8% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
                            25% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
                            26% { transform: translate(0px, 0px) scale(0); opacity: 0; }
                            33%, 100% { transform: translate(0px, 0px) scale(1); opacity: 1; }
                        }

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

                        @keyframes phone-scroll {
                            0%, 6.66% { transform: translateY(-360px); }
                            11.66%, 23.33% { transform: translateY(-300px); }
                            28.33%, 40% { transform: translateY(-240px); }
                            45%, 56.66% { transform: translateY(-180px); }
                            61.66%, 73.33% { transform: translateY(-120px); }
                            78.33%, 90% { transform: translateY(-60px); }
                            95%, 100% { transform: translateY(0px); }
                        }

                        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
                        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
                        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
                        .animate-flow { animation: flow-down 1s linear infinite; }
                        .animate-core { animation: core-glow 2s infinite; }
                        .animate-packet { animation: packet-shoot 2s infinite; }
                        .animate-phone-scroll { animation: phone-scroll 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                        .data-vis-title {display: none;}
                    </style>

                    <svg class="absolute inset-0 w-full h-full z-10 pointer-events-none">
                        <defs>
                            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.1" />
                                <stop offset="100%" stop-color="#C07040" stop-opacity="0.6" />
                            </linearGradient>
                        </defs>
                        <g stroke="url(#flowGrad)" stroke-width="1.5" stroke-dasharray="6 6" fill="none" class="animate-flow">
                            <path d="M 90 75 C 120 150, 200 200, 280 290" />
                            <path d="M 470 65 C 400 150, 350 200, 280 290" />
                            <path d="M 80 215 C 150 220, 200 250, 280 290" />
                            <path d="M 280 55 C 260 150, 280 200, 280 290" />
                            <path d="M 420 175 C 360 210, 310 250, 280 290" />
                            <path d="M 190 135 C 220 200, 240 250, 280 290" />
                        </g>
                    </svg>

                    <div class="absolute inset-0 z-20 pointer-events-none">
                        
                        <div class="absolute left-[40px] top-[60px] animate-float-1">
                            <div style="animation: ingest-node 12s infinite; animation-delay: 0s; --tx: 240px; --ty: 230px;" class="grid place-items-center">
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-[#C07040]/30 text-[#C07040] text-[10px] font-black tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-a 24s infinite; animation-delay: 0s;">VARIETY BREEDERS</span>
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-[#C07040]/30 text-[#C07040] text-[10px] font-black tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-b 24s infinite; animation-delay: 0s;">GENETICS</span>
                            </div>
                        </div>

                        <div class="absolute left-[320px] top-[50px] animate-float-2">
                            <div style="animation: ingest-node 12s infinite; animation-delay: 2s; --tx: -140px; --ty: 240px;" class="grid place-items-center">
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-a 24s infinite; animation-delay: 2s;">AGROCHEMICAL MANUFACTURERS</span>
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-b 24s infinite; animation-delay: 2s;">CROP SCIENCE</span>
                            </div>
                        </div>

                        <div class="absolute left-[30px] top-[200px] animate-float-3">
                            <div style="animation: ingest-node 12s infinite; animation-delay: 4s; --tx: 250px; --ty: 90px;" class="grid place-items-center">
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-a 24s infinite; animation-delay: 4s;">FARMING PRESS</span>
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-b 24s infinite; animation-delay: 4s;">RESEARCH INSTITUTES</span>
                            </div>
                        </div>

                        <div class="absolute left-[230px] top-[40px] animate-float-1">
                            <div style="animation: ingest-node 12s infinite; animation-delay: 6s; --tx: 50px; --ty: 250px;" class="grid place-items-center">
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-a 24s infinite; animation-delay: 6s;">AHDB</span>
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-b 24s infinite; animation-delay: 6s;">CROP TRIALS</span>
                            </div>
                        </div>

                        <div class="absolute left-[370px] top-[160px] animate-float-2">
                            <div style="animation: ingest-node 12s infinite; animation-delay: 8s; --tx: -90px; --ty: 130px;" class="grid place-items-center">
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-[#C07040]/30 text-[#C07040] text-[10px] font-black tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-a 24s infinite; animation-delay: 8s;">FERTILISER SUPPLIERS</span>
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-[#C07040]/30 text-[#C07040] text-[10px] font-black tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-b 24s infinite; animation-delay: 8s;">TECHNICAL UPDATES</span>
                            </div>
                        </div>

                        <div class="absolute left-[140px] top-[120px] animate-float-3">
                            <div style="animation: ingest-node 12s infinite; animation-delay: 10s; --tx: 140px; --ty: 170px;" class="grid place-items-center">
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-[#C07040]/30 text-[#C07040] text-[10px] font-black tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-a 24s infinite; animation-delay: 10s;">FARMING UNIONS</span>
                                <span class="col-start-1 row-start-1 px-3 py-1.5 bg-[#1a2415]/90 border border-[#C07040]/30 text-[#C07040] text-[10px] font-black tracking-widest uppercase rounded-full backdrop-blur-md shadow-lg whitespace-nowrap" style="animation: text-swap-b 24s infinite; animation-delay: 10s;">ENVIRONMENT SCHEMES</span>
                            </div>
                        </div>

                        <div class="absolute left-[360px] top-[100px] animate-float-1" style="animation-delay: -3s;">
                            <span class="px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-500 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md whitespace-nowrap">MARKET PRICES</span>
                        </div>
                        <div class="absolute left-[240px] top-[170px] animate-float-2" style="animation-delay: -5s;">
                            <span class="px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-500 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md whitespace-nowrap">DEFRA DATA</span>
                        </div>
                        <div class="absolute left-[200px] top-[10px] animate-float-3" style="animation-delay: -2s;">
                            <span class="px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-500 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md whitespace-nowrap">PLANT BREEDERS</span>
                        </div>
                        <div class="absolute left-[410px] top-[240px] animate-float-1" style="animation-delay: -4s;">
                            <span class="px-3 py-1.5 bg-[#1a2415]/90 border border-white/20 text-stone-500 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-md whitespace-nowrap">WEATHER DATA</span>
                        </div>
                    </div>

                    <div class="absolute top-[290px] left-[280px] z-30 animate-core">
                        <div class="relative group">
                            <div class="relative bg-white border p-[18px] flex items-center gap-[18px] shadow-2xl transition-colors border-[#C07040]">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 shrink-0" viewBox="0 0 62.742 62.74">
                                    <g id="Group_146" data-name="Group 146" transform="translate(11397 -5014.63)">
                                        <path id="Path_277" data-name="Path 277" d="M23.572,39.163V0H0v62.74H39.166V39.163Z" transform="translate(-11397 5014.631)" fill="#232f1c"/>
                                        <path id="Path_278" data-name="Path 278" d="M12.346,0V23.572H27.94V62.738H51.515V0Z" transform="translate(-11385.773 5014.631)" fill="#ba5425"/>
                                    </g>
                                </svg>
                                <div class="pr-3">
                                    <div class="text-[10px] text-[#C07040] font-black tracking-[0.2em] uppercase mb-1">Edge Intelligence</div>
                                    <div class="text-[#232f1d] text-[15px] font-bold uppercase tracking-widest whitespace-nowrap">Data Curation Core</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="absolute top-[310px] left-[278px] w-[4px] h-[70px] bg-[#C07040]/20 z-20 overflow-hidden rounded-full">
                        <div class="w-full h-[30px] bg-[#C07040] shadow-[0_0_20px_4px_#C07040] animate-packet rounded-full"></div>
                    </div>

                    <div class="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-40">
                        <div class="w-48 h-[240px] bg-[#f8fafc] border-t-[4px] border-x-[4px] border-[#e2e8f0] rounded-t-[2.5rem] p-1.5 shadow-[0_-15px_40px_-10px_rgba(255,255,255,0.05)] relative flex flex-col items-center">
                            <div class="w-full h-full bg-[#f1f5f9] border-[5px] border-[#0f172a] rounded-t-[2rem] relative overflow-hidden px-2.5 pt-6 flex flex-col">
                                <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-[#0f172a] rounded-full z-30 flex items-center justify-end px-2">
                                    <div class="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                                </div>
                                <div class="w-full flex-1 relative z-10 mt-2" style="-webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 25%); mask-image: linear-gradient(to bottom, transparent 0%, black 25%);">
                                    <div class="w-full animate-phone-scroll absolute top-0 left-0">
                                        
                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #be123c"></div>
                                            <div class="flex-1">
                                                <div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #be123c">Daily Summary</div>
                                                <div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div>
                                                <div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div>
                                            </div>
                                        </div>
                                        
                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #047857"></div>
                                            <div class="flex-1">
                                                <div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #047857">Policy Alert</div>
                                                <div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div>
                                                <div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #C07040"></div>
                                            <div class="flex-1">
                                                <div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #C07040">Trial Results</div>
                                                <div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div>
                                                <div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #9333ea"></div>
                                            <div class="flex-1">
                                                <div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #9333ea">Technical Update</div>
                                                <div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div>
                                                <div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #0284c7"></div>
                                            <div class="flex-1">
                                                <div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #0284c7">Chemistry Brief</div>
                                                <div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div>
                                                <div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #232f1d"></div>
                                            <div class="flex-1">
                                                <div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #232f1d">Variety Update</div>
                                                <div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div>
                                                <div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div>
                                            </div>
                                        </div>

                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #be123c"></div>
                                            <div class="flex-1"><div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #be123c">Daily Summary</div><div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div><div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div></div>
                                        </div>
                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #047857"></div>
                                            <div class="flex-1"><div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #047857">Policy Alert</div><div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div><div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div></div>
                                        </div>
                                        <div class="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center h-[50px] mb-[10px] w-full shrink-0">
                                            <div class="w-0.5 h-6 rounded-full shrink-0" style="background-color: #C07040"></div>
                                            <div class="flex-1"><div class="text-[6px] font-black uppercase tracking-widest mb-1.5" style="color: #C07040">Trial Results</div><div class="w-3/4 h-1 bg-slate-700 rounded-full mb-1"></div><div class="w-1/2 h-0.5 bg-slate-300 rounded-full"></div></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            `

      this._setupResponsiveScale()
    }

    disconnectedCallback() {
      if (this._ro) {
        this._ro.disconnect()
        this._ro = null
      }
      if (this._vvHandler && typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', this._vvHandler)
        this._vvHandler = null
      }
    }

    _contentBoxInlineSize(el) {
      if (!el || el.nodeType !== 1) return null
      const cs = getComputedStyle(el)
      if (cs.display === 'contents') return null
      const cw = el.clientWidth
      if (!(cw > 0)) return null
      const padL = parseFloat(cs.paddingLeft) || 0
      const padR = parseFloat(cs.paddingRight) || 0
      return Math.max(0, cw - padL - padR)
    }

    _minContentWidthFromAncestors(maxDepth) {
      let minW = Number.POSITIVE_INFINITY
      let el = this.parentElement
      let depth = 0
      while (el && depth < maxDepth) {
        const w = this._contentBoxInlineSize(el)
        if (w != null && w > 0) minW = Math.min(minW, w)
        if (el === document.documentElement) break
        el = el.parentElement
        depth++
      }
      const docEl = document.documentElement
      if (docEl && docEl.clientWidth > 0) {
        minW = Math.min(minW, docEl.clientWidth)
      }
      return Number.isFinite(minW) && minW < Number.POSITIVE_INFINITY ? minW : 0
    }

    _setupResponsiveScale() {
      const root = this.querySelector('[data-viz-root]')
      if (!root) return

      const readAvailableWidth = () => {
        const vw =
          (typeof window !== 'undefined' &&
            window.visualViewport &&
            window.visualViewport.width) ||
          (typeof document !== 'undefined' && document.documentElement && document.documentElement.clientWidth) ||
          (typeof window !== 'undefined' && window.innerWidth) ||
          0
        let w = Number.POSITIVE_INFINITY
        const fromAncestors = this._minContentWidthFromAncestors(12)
        if (fromAncestors > 0) w = Math.min(w, fromAncestors)
        if (vw > 0) {
          const edgeSlack = 2
          w = Math.min(w, vw - edgeSlack)
        }
        const customCap = parseFloat(getComputedStyle(this).getPropertyValue('--agronomy-viz-max-width').trim())
        if (Number.isFinite(customCap) && customCap > 0) {
          w = Math.min(w, customCap)
        }
        return Number.isFinite(w) && w > 0 && w < Number.POSITIVE_INFINITY ? w : 560
      }

      const applyScale = () => {
        const width = readAvailableWidth()
        const scale = Math.min(1, Math.max(0.1, width / 560))
        root.style.setProperty('--viz-scale', String(scale))
      }

      const scheduleApply = () => {
        applyScale()
        requestAnimationFrame(() => applyScale())
      }

      scheduleApply()

      if (this._ro) this._ro.disconnect()
      this._ro = new ResizeObserver(() => applyScale())
      this._ro.observe(this)
      if (this.parentElement) {
        this._ro.observe(this.parentElement)
      }
      if (typeof window !== 'undefined' && window.visualViewport) {
        if (this._vvHandler) {
          window.visualViewport.removeEventListener('resize', this._vvHandler)
        }
        this._vvHandler = applyScale
        window.visualViewport.addEventListener('resize', this._vvHandler, { passive: true })
      }
    }
  }

  customElements.define('agronomy-data-viz', AgronomyDataViz)
}
