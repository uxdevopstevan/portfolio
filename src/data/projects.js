/**
 * Portfolio projects — replace image URLs and copy with your real assets.
 *
 * `detailParagraphs`: each item is an HTML fragment (plain text still works).
 * Wrap copy in <p>, <h3>, <ul>, etc. as needed; the modal renders with dangerouslySetInnerHTML.
 *
 * `sections` (optional): when present, the modal uses scrollytelling instead of `detailParagraphs`.
 * Each section: `{ id, media: { type: 'image', src, alt } | { type: 'component', name, git? }, content: '<html...>' }`.
 * For `type: 'component'`, optional `git` is the source URL shown on a floating GitHub control over the embed.
 * On small screens, `content` is split after the first heading + first paragraph (when present) so the order reads: title → description → media → remaining copy.
 *
 * Images:
 * - `imageSrc`: grid thumbnail only (string)
 * - `modalImageSrc`: hero image in the project modal (and lightbox) when using `detailParagraphs`; falls back to `imageSrc` if omitted
 * - `imageSrcs`: optional carousel images (string[])
 */
export const projects = [
  {
    id: 'agronomy-edge',
    title: 'Agronomy Edge',
    subtitle: 'Full-Funnel Acquisition Architecture',
    shortDescription: 'SaaS marketing platform featuring custom GPU-accelerated Web Components and GA4 telemetry pipeline.',
    imageSrc: 'agronomy-edge-mockup.jpg', // The thumbnail hook we discussed earlier
    modalImageSrc: 'agronomy-edge-gtm.png',
    tags: ['Web Components', 'SVG Animation', 'GA4 / GTM Telemetry', 'Looker Studio', 'Conversion Architecture', 'Brand Identity'],
    tagHighlights: {
      'Web Components': ['Web Components'],
      'SVG Animation': ['SVG Animation', 'data-visualisation engine'],
      'GA4 / GTM Telemetry': ['GA4', 'GTM', 'Telemetry'],
      'Looker Studio': ['Looker Studio'],
      'Conversion Architecture': ['Conversion Architecture', 'conversion'],
      'Brand Identity': ['Brand Identity'],
    },
    sections: [
      {
        id: 'agronomy-s1-overview',
        media: { type: 'image', src: 'agronomy-edge-mockup.jpg', alt: 'Agronomy Edge platform mockup' },
        content: `<h3>The Challenge</h3>
      <p>Launching a new B2B agronomy community required more than just a landing page; it required a complete, end-to-end acquisition engine. The objective was to establish a premium brand identity, engineer a high-converting web presence to explain complex data aggregation, and deploy a robust telemetry infrastructure to provide marketing with granular visibility into the Customer Acquisition Cost (CAC) pipeline.</p>
      <h3>Engineering &amp; UX Solutions</h3>
      <h3>1. High-Performance UI (Native Web Components)</h3>
      <p>To visually communicate the platform's core value proposition without relying on heavy video files or bloated animation libraries, I engineered a bespoke, responsive data-visualisation engine.</p>`,
      },
      {
        id: 'agronomy-s2-data-viz',
        media: { type: 'component', name: 'AgronomyEdgeDataViz', git: 'https://github.com/uxdevopstevan/portfolio/blob/main/src/components/Projects/AgronomyEdgeDataViz.jsx', background: '#ffffff' },
        content: `<h3>Shipped as a native Custom Element</h3>
      <p>A self-contained data visualisation with no React, Vue, or Svelte dependency—ideal for marketing pages where payload size and long-term portability matter.</p>
      <ul>
      <li><strong>Zero-Dependency Architecture:</strong> Built as a native Custom HTML Element, ensuring complete framework agnosticism and zero JavaScript payload bloat.</li>
      <li><strong>GPU-Accelerated Micro-Animations:</strong> Utilised complex CSS keyframes and mathematically plotted SVG paths to create a seamless, 60fps organic floating UI that scales dynamically based on the device's visual viewport.</li>
      </ul>`,
      },
      {
        id: 'agronomy-s3-datastudio',
        media: { type: 'image', src: 'agronomy-edge-datastudio.png', alt: 'Agronomy Edge Data Studio' },
        content: `<h3>2. Full-Funnel Telemetry (Data Architecture)</h3>
      <p>A beautiful UI is useless if it cannot be measured. I architected a closed-loop data pipeline to track user behaviour from the first ad click to the final subscription event.</p>`,
      },
      {
        id: 'agronomy-s4-gtm',
        media: { type: 'image', src: 'agronomy-edge-gtm.png', alt: 'Agronomy Edge GTM' },
        content: `<h3>Instrumentation &amp; attribution</h3>
      <p>Closing the loop from first ad click through to subscription: GTM and GA4 capture granular behaviour, while Looker Studio turns that stream into campaign ROI the team can act on.</p>
      <ul>
      <li><strong>GTM &amp; GA4 Integration:</strong> Configured complex Google Tag Manager containers and GA4 properties, defining custom dimensions and event listeners to track highly specific user interactions and conversion milestones across the DOM.</li>
      <li><strong>Attribution Modelling:</strong> Established a strict UTM parameter taxonomy for external campaigns and built automated Looker Studio (Data Studio) dashboards, empowering the marketing team with real time, actionable business intelligence on campaign ROI.</li>
      </ul>`,
      },
      {
        id: 'agronomy-s5-brand',
        media: { type: 'image', src: 'Agronomy-Edge-Logo.png', alt: 'Agronomy Edge Logo' },
        content: `<h3>3. Multi-Channel Brand System</h3>
      <p>Operating as the foundational product designer, I developed the entire visual identity from the ground up.</p>
      <ul>
      <li>Designed the core logo and comprehensive brand style guidelines.</li>
      <li>Translated the digital UI language into high-performing animated programmatic ads (GAM) and high-resolution print creatives, ensuring a cohesive user journey from offline magazines to the digital checkout flow.</li>
      </ul>`,
      },
      {
        id: 'agronomy-s6-takeaway',
        media: { type: 'image', src: 'agronomy-edge-ad-billboard@2x.gif', alt: 'Agronomy Edge animated ad' },
        content: `<h3>The Takeaway</h3>
      <p>This project exemplifies my hybrid capability as a Design Engineer. By owning the visual identity, writing the high-performance DOM rendering logic, and architecting the underlying data telemetry, I delivered a complete, measurable product pipeline that actively drives enterprise lead generation.</p>`,
      },
    ],
  },
  {
    id: 'visual-design',
    title: 'DBR Protocol',
    subtitle: 'Marketing website and AI agent in Telegram.',
    shortDescription: 'Next.js marketing website and members area for LCHP diet protocol prototype. Includes a custom AI agent in Telegram.',
    imageSrc: 'dbrprotocol-mockup.jpg',
    modalImageSrc: '371shots_so.png',
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'Python', 'Supabase', 'Stripe', 'Telegram API'],
    tagHighlights: {
      'Next.js': ['Next.js', 'marketing website', 'members area'],
      React: ['React'],
      'Tailwind CSS': ['Tailwind CSS'],
      'Framer Motion': ['Framer Motion'],
      Python: ['Python', 'Python web scraper'],
      Supabase: ['Supabase'],
      Stripe: ['Stripe', 'payment gateway'],
      'Telegram API': ['Telegram', 'IntelBot', 'Telegram app'],
    },
    detailParagraphs: [
      `<h3>Overview</h3>
<p>The DBR Protocol is a production-ready architecture prototype for a fully automated health SaaS ecosystem. I conceptualised, designed, and engineered this proof-of-concept from the ground up to validate a highly complex, multi-device tech stack. The system features a custom Next.js and Tailwind CSS front end, a Python-driven AI Telegram intelligence bot, and a seamless, passwordless cross-device authentication pipeline bridging the mobile app and the web dashboard.</p>
<h3>The Challenge</h3>
<p>Men over 30 experiencing metabolic slowdown and the onset of visceral belly fat often bounce off traditional, brightly coloured fitness apps. The objective was to build a specialised, zero-cardio nutritional platform centred around a high-protein, low-carb (LCHP) protocol that utilises an 8pm to 12pm fasting window and strategic dietary fat manipulation.</p>
<p>The engineering challenge was threefold:</p>
<ul>
<li>Present the system visually as a high-end “tactical advantage” rather than a restrictive diet app.</li>
<li>Build a frictionless onboarding and payment flow requiring zero manual administration.</li>
<li>Engineer an AI intelligence system capable of calculating real-world fast-food macros for users on the fly.</li>
</ul>
<h3>The Three Pillars of Execution</h3>
<h3>Pillar 1: UI/UX &amp; Motion Engineering (The front end)</h3>
<p>To capture the target demographic, I designed a dark-mode, “Black Ops” tactical UI. Instead of relying on heavy video files that degrade page load speeds, I engineered a custom, 12-second biometric scan animation using React and Framer Motion. I manually traced and plotted complex SVG paths in Illustrator, translating them into a mathematically precise, multi-path morphing array. This allowed a 150kg heavy torso to fluidly morph into a 75kg slim torso in real time on the DOM, perfectly synchronised with a dynamically drawing data chart.</p>
<h3>Pillar 2: The Intelligence Engine (AI &amp; Data Pipeline)</h3>
<p>To eliminate user friction around tracking food, I built a custom Python web scraper to extract commercial nutritional databases (including the complete McDonald’s menu). I vectorised this data and fed it into a custom RAG (Retrieval-Augmented Generation) pipeline powering a Telegram “IntelBot.” Users can message the bot in natural language to receive instant, data-backed macro calculations for real-world scenarios.</p>
<h3>Pillar 3: Infrastructure &amp; Passwordless Auth (The Backend)</h3>
<p>I architected a completely automated subscription backend utilising Supabase (Auth/Database) and Stripe. To eliminate password fatigue and create an enterprise-grade user experience, I engineered a custom QR Code Authentication Flow. When a user visits the React web dashboard, the Next.js server generates a dynamic QR code. The user scans it with their authenticated Telegram app, and the bot instantly verifies their secure token against the Supabase database, authorising the desktop web session in real time with zero passwords typed.</p>
<h3>Key Achievements</h3>
<ul>
<li><strong>Zero-Dependency Motion Design:</strong> Engineered a lightweight, 60fps custom SVG morphing animation that visually communicates the core product ROI within seconds of page load.</li>
<li><strong>Frictionless Auth Bridge:</strong> Deployed a highly secure, custom passwordless authentication system successfully bridging a third-party mobile application (Telegram) and a desktop web dashboard.</li>
<li><strong>Full-Stack Automation:</strong> Architected an end-to-end data pipeline moving from automated web scraping to an interactive AI agent, alongside a fully automated Stripe payment gateway.</li>
</ul>
<h3>The Takeaway</h3>
<p>The DBR Protocol demonstrates my core philosophy as a Design Engineer: true product excellence happens when visual design, user psychology, and deep technical architecture are executed by a unified vision. By understanding the rendering limits of the DOM, the intricacies of API auth flows, and the data engineering required for modern AI, I was able to build a scalable, high-converting product that solves a real-world problem with zero user friction.</p>`,
    ],
  },
  {
    id: 'a2vg',
    title: 'A2VG',
    subtitle: 'WordPress React plugin, Next.js website and AWS Remotion server',
    shortDescription: 'Engineered a distributed video generation SaaS bridging a Next.js frontend, a Vercel/Supabase control plane, and a dual-execution rendering engine (Browser WASM + AWS Remotion).',
    imageSrc: '17shots_so.png',
    modalImageSrc: 'a2vg-mockup.jpg',
    tags: ['React', 'WordPress (PHP)', 'AWS Lambda', 'Remotion', 'FFmpeg (WASM)', 'Freemius SDK', 'Vercel'],
    tagHighlights: {
      React: ['React'],
      'WordPress (PHP)': ['WordPress', 'wp_localize_script'],
      'AWS Lambda': ['AWS Lambda'],
      Remotion: ['Remotion'],
      'FFmpeg (WASM)': ['FFmpeg', 'WASM'],
      'Freemius SDK': ['Freemius SDK'],
      Vercel: ['Vercel', 'Vercel edge deployment'],
    },
    detailParagraphs: [
      `
      <h2>Overview</h2>
      <p>A2VG is a multi-surface product architecture: a React-driven video studio (hosted within a legacy WordPress CMS), a modern Next.js marketing site, a Vercel-hosted premium API (managing credits, licensing, and render orchestration), and a dedicated AWS Lambda render worker built with Remotion.</p>
      <p>Together, this ecosystem proves that heavy, asynchronous media workflows can span client-side WebAssembly, serverless HTTP APIs, and dedicated video compute—united by a single, shared domain model from the browser to the cloud.</p>
      <h3>The Challenge</h3>
      <p>The objective was to engineer a production-ready video product inside a legacy PHP host (WordPress) while maintaining a modern public web presence and a secure, API-driven billing architecture. This forced several non-trivial distributed system integrations:</p>
      <ul>
      <li><strong>Media Orchestration:</strong> Bridging UI state across two distinct execution models—Canvas compositing and FFmpeg.wasm—without locking the browser's main thread.</li>
      <li><strong>Distributed System Boundaries:</strong> Managing the failure modes, timeouts, and trust assumptions across the React client, the Next.js marketing layer, the a2vg-api control plane, and the AWS Lambda worker.</li>
      <li><strong>Honest Routing:</strong> Ensuring the "premium path vs. local fallback" logic was grounded in API-verified entitlement (Freemius/Supabase), not just client-side optimism.</li>
      </ul>
      <h3>Architecture &amp; Solutions</h3>
      <p><img src="a2vg-diagram.png" alt="A2VG Architecture" /></p>
      <h3>1. Dual-Execution Render Pipeline</h3>
      <p>Engineered a custom rendering abstraction that isolates visual compositing (CanvasEngine) from binary encoding (FfmpegEngine). This ensures frames are visually perfect before .mp4 compilation, operating entirely within the browser via WebAssembly.</p>
      <h3>2. Timeline-Aware Job Modelling</h3>
      <p>Architected a "Render Job Builder" that converts chaotic editor state into a rigid timeline domain model (calculating scene durations, voiceovers, delays, and transition overlaps). This unified JSON schema acts as the strict contract between the UI and both the local and remote encoders.</p>
      <h3>3. Serverless API Control Plane</h3>
      <p>Deployed a Vercel serverless API to front all premium operations. This layer manages credit estimation, render job enqueueing, Freemius validation, and Supabase state persistence. It acts as the secure delegator, routing authenticated jobs to the rendering compute service.</p>
      <h3>4. Headless Video Worker (AWS Lambda)</h3>
      <p>Architected a remote render worker using Remotion on AWS Lambda. It normalises incoming JSON payloads, generates the video headlessly, writes the output to S3, and tracks the job lifecycle via Supabase.</p>
      <h3>5. Graceful Engine Routing</h3>
      <p>Built a strategy-pattern RenderingEngineManager that selects the optimal render engine based on context and capability. It supports dynamic bootstrapping and graceful degradation—if the premium AWS route is unavailable or credits are depleted, the system flawlessly falls back to local WASM rendering to protect the user journey.</p>
      <h3>6. The Legacy-to-React Bridge</h3>
      <p>Embedded a complex React SPA inside the WordPress admin environment utilising localised bootstrapping (passing server-known state into the client bundle on first paint) and custom REST workflows for persisting JSON timelines.</p>
      <h3>Key Achievements</h3>
      <ul>
      <li><strong>End-to-End Architecture:</strong> Delivered a cohesive product narrative across Browser WASM, Next.js, Vercel Serverless, Supabase, AWS S3, and Lambda.</li>
      <li><strong>Domain Consistency:</strong> Engineered timeline and job concepts that remain intelligible to both local browser encoders and a remote serverless renderer.</li>
      <li><strong>Fault Tolerance:</strong> Built a resilient routing system where local rendering remains a credible, automatic fallback when cloud paths fail or credits exhaust.</li>
      </ul>
      <h3>The Takeaway</h3>
      <p>A2VG is not simply "hard UI inside WordPress." It is a distributed system for video generation. By separating the editor UI, the Next.js marketing surface, the Vercel API control plane, and the AWS Lambda compute worker, this architecture demonstrates a deep understanding of disciplined timeline modelling, pragmatic routing, and enterprise-grade system degradation.</p>
      <h3>The Roadmap (V2 AI Architecture)</h3>
      <p>To evolve this proof-of-concept from a manual timeline editor into a fully autonomous media engine, I architected the following AI-native roadmap:</p>
      <ul>
      <li><strong>Agentic Content Parsing:</strong> Integrating an LLM middleware to automatically ingest WordPress article payloads, extract the core narrative, and split the text into perfectly timed, storyboarded scenes.</li>
      <li><strong>Dynamic Audio Synthesis:</strong> Implementing a text-to-speech API bridge (e.g., ElevenLabs) to generate hyper-realistic, emotionally contextual voiceovers on the fly, dynamically syncing the audio tracks with the React timeline.</li>
      <li><strong>Generative B-Roll:</strong> Utilising text-to-video models to dynamically generate background visual assets based on the LLM's scene analysis, eliminating reliance on static stock footage and creating a true zero-click production pipeline.</li>
      </ul>`,
    ],
  },
  {
    id: 'web-to-print-engine',
    title: 'Web-to-Print',
    subtitle: 'Enterprise Web-to-Print Engine',
    shortDescription: 'A bespoke DOM-parsing architecture converting WordPress payloads into InDesign XML, saving the business £142k/year.',
    imageSrc: 'indesign-mockup.jpg',
    modalImageSrc: 'indesign-xml.jpg',
    tags: ['Vanilla JS', 'XML Automation', 'DOM Parsing', 'Legacy Modernisation', 'Workflow Automation', 'Cost Optimisation'],
    tagHighlights: {
      'Vanilla JS': ['vanilla JavaScript', 'JavaScript (ES6+)', 'Vanilla JS'],
      'XML Automation': ['XML', 'InDesign XML', 'XML schema'],
      'DOM Parsing': ['DOM', 'DOM-parsing', 'DOM payload'],
      'Legacy Modernisation': ['legacy WordPress', 'legacy infrastructure', 'legacy CMS'],
      'Workflow Automation': ['workflow', 'one-way export script', 'publishing platform'],
      'Cost Optimisation': ['£142,000', 'cost-effective'],
    },
    detailParagraphs: [
      `<h2>The Bottleneck (The Infrastructure Challenge)</h2>
<p>At Farmers Weekly, the editorial production cycle was severely bottlenecked by legacy infrastructure. The editorial team was forced into a highly manual workflow, having to extract digital content from a legacy WordPress CMS and then manually rebuild it for print layouts in Adobe InDesign. This was costing the editorial team hours of manual labour every day for every single article.</p>
<p>The options for the business were to either migrate over to an expensive WordPress VIP enterprise hosting tier, costing <strong>£142,000 annually</strong> just to maintain the status quo, or find a more cost-effective solution.</p>
<p>From a UX and engineering standpoint, the challenge was two-fold:</p>
<ul>
<li><strong>The Technical Constraint:</strong> We needed to decouple the print-export logic from the legacy CMS to avoid lengthy PHP payloads and slow page loads.</li>
<li><strong>The UX Constraint:</strong> Editors needed a seamless, bulletproof interface to visualise, format, and export complex article structures into strict XML directly from their native environment, without relying on unstable third-party plugins. It also needed to be an effortless and enjoyable experience in order for them to adopt it.</li>
</ul>
<p style="margin-top:20px"><img src="indesign-xml-flow.png" alt="InDesign XML Flow" /></p>
<h3>The Architecture (Decoupling the Data Pipeline)</h3>
<p>Instead of relying on bloated PHP plugins or heavy server-side processing, I engineered a client-side intercept using lightweight, vanilla JavaScript (ES6+). By hooking directly into the WordPress TinyMCE editor, I built a pipeline that reads, sanitises, and transforms the raw DOM payload in the browser.</p>
<p><img src="indesign-xml-code.jpg" alt="InDesign XML Code" /></p>
<ul>
<li><strong>DOM Parsing &amp; Schema Mapping:</strong> The script natively walks the DOM tree, intelligently identifying specific content blocks (like nested lists, data tables, or custom full-width &lt;div&gt; boxes) and maps them directly to a strict, validated InDesign XML schema (e.g., &lt;StoryContent&gt;, &lt;KeylineBox&gt;).</li>
<li><strong>The Interface Injection:</strong> To ensure data accuracy and build trust with the editorial team, I designed and injected a custom, React-style UI modal directly into the legacy WordPress admin dashboard. This interface provides editors with a real time, parsed preview of the data structure, allowing them to configure print-specific variables before triggering the XML export.</li>
<li><strong>Zero-Dependency Execution:</strong> By handling the data transformation purely on the client side without third-party libraries, the solution remains exceptionally fast, highly secure, and completely decoupled from the underlying server architecture.</li>
</ul>
<h3>The Roadmap (Future Enhancements)</h3>
<p>To evolve this utility from a one-way export script into a comprehensive enterprise publishing platform, I mapped out the following V2 architecture:</p>
<ul>
<li><strong>Bidirectional Data Sync:</strong> Engineering a reverse-parser to allow layout adjustments made in Adobe InDesign to seamlessly sync back to the WordPress database, creating a true closed-loop editorial system.</li>
<li><strong>Real time collaboration:</strong> Implementing WebSockets to transition the bespoke UI into a multiplayer environment, allowing multiple editors to configure print variables and lock content blocks concurrently.</li>
<li><strong>AI-Driven Editorial Guardrails:</strong> Integrating a lightweight LLM validation step (via custom system prompts) to automatically check the parsed XML against the publication’s strict style guide before export, eliminating formatting errors downstream.</li>
</ul>`,
    ],
  },
  {
    id: 'farmers-weekly-ui',
    title: 'UI & Micro-frontends',
    shortDescription: 'High-conversion event funnels and native Web Components, modernising a legacy publishing infrastructure.',
    imageSrc: 'ui-micro-frontends.jpg', // Use that great Farmers Weekly App mockup here
    modalImageSrc: '582shots_so.png',
    tags: ['Next.js', 'Web Components', 'UI Architecture', 'Micro-Animations', 'Conversion Optimisation'],
    tagHighlights: {
      'Next.js': ['Next.js'],
      'Web Components': ['Web Components'],
      'UI Architecture': ['UI architecture'],
      'Micro-Animations': ['Micro-animations'],
      'Conversion Optimisation': ['Conversion', 'conversion'],
    },
    detailParagraphs: [
      `<h3>The Challenge</h3>
<p>As the UX Engineer for a major publishing brand, I was tasked with modernising the user experience across a heavily fragmented legacy PHP infrastructure. The goal was to introduce modern, highly performant UI patterns—such as dynamic event landing pages and interactive data widgets—without requiring a complete rewrite of the underlying CMS.</p>
<h3>Engineering &amp; UX Solutions</h3>
<h3>1. High-Conversion Event Architecture</h3>
<p>Designed and engineered a suite of premium event landing pages focused on driving ticket sales and app acquisition. Rather than relying on static templates, I built responsive, conversion-optimised funnels featuring micro-animations, complex form-state management, and dynamic ticketing integrations. These pages were built to operate at the intersection of high-fidelity design and ruthless performance.</p>
<h3>2. Native Web Components (Micro-frontends)</h3>
<p>To bypass the limitations of the legacy CMS and avoid heavy framework dependencies (like loading React across every page), I architected a library of native, framework-agnostic Web Components.</p>
<ul>
<li><strong>Dynamic Data Widgets:</strong> Engineered a custom Weather Component utilising native DOM APIs, shadow DOM encapsulation, and external API fetching. This allowed the business to drop highly interactive, complex UI components anywhere on the legacy site without CSS bleed or script conflicts.</li>
<li><strong>Next.js Prototyping:</strong> Spun up rapid, high-fidelity Next.js prototypes to validate new UI architectures and data structures with executive stakeholders before committing to expensive backend integrations.</li>
</ul>
<h3>The Takeaway</h3>
<p>This role required operating as a true Design Engineer: identifying systemic UX bottlenecks within an enterprise infrastructure and solving them by deploying modern, decoupled front-end technologies (Web Components, Next.js) that integrated seamlessly with legacy constraints.</p>`
    ],
  },
  {
    id: 'staypost-architecture',
    title: 'Staypost',
    subtitle: 'Platform Extension Architecture',
    shortDescription: 'Custom webhooks, API integrations, Python automations and React-state injection, extending a closed-source community platform.',
    imageSrc: 'staypost-mockup.jpg', // Use the Agronomy Edge mobile mockup here
    modalImageSrc: 'a2vg-zoomed.png',
    tags: ['DOM Manipulation', 'React Reverse-Engineering', 'Python', 'Webhooks', 'API Integration', 'BlueConic CDP'],
    tagHighlights: {
      'DOM Manipulation': ['DOM', 'DOM-manipulation'],
      'React Reverse-Engineering': ['React', 'reverse-engineering'],
      Python: ['Python'],
      'Webhooks': ['Webhooks'],
      'API Integration': ['API', 'API integration'],
      'BlueConic CDP': ['BlueConic', 'CDP'],
    },
    detailParagraphs: [
      `<h3>The Challenge</h3>
<p>The business launched "Staypost," a premium community platform built on top of a third-party SaaS vendor (Circle.so). The challenge was that the out-of-the-box vendor platform lacked critical business logic required for custom user onboarding, specialised checkout flows, and automated CRM data synchronisation.</p>
<h3>Engineering Solutions</h3>
<h3>1. React State Hijacking &amp; DOM Injection</h3>
<p>Because the platform was a compiled, closed-source React application, traditional script injection was insufficient. I engineered a robust vanilla JavaScript middleware layer that interacted directly with the vendor's front end:</p>
<ul>
<li><strong>Mutation Observers:</strong> Deployed highly optimised <code>MutationObserver</code> patterns to watch the virtual DOM for specific route changes and element mounts, allowing me to dynamically inject custom UI (like dynamic branding and conditional checkout questions) without causing layout shift.</li>
<li><strong>Synthetic Event Dispatching:</strong> To automate coupon applications during checkout, I reverse-engineered the compiled React fiber tree (extracting <code>__reactProps$</code>) to hijack internal <code>onChange</code> handlers, forcefully dispatching synthetic events to update the application state natively.</li>
</ul>
<h3>2. Cross-Origin Data Bridges</h3>
<p>Engineered a secure, cross-origin <code>iframe</code> communication bridge using the <code>window.postMessage</code> API. This allowed the platform to securely capture custom user telemetry (like BASIS accreditation points) and pass it seamlessly to an external, proprietary database without disrupting the user's session.</p>
<h3>3. Full-Stack Automation &amp; Webhooks</h3>
<p>To eliminate manual administration, I architected a backend data synchronisation pipeline:</p>
<ul>
<li>Wrote custom <strong>Python</strong> automation scripts and configured complex Webhook payloads to act as a bridge between the Circle.so member database and the company's internal CRM.</li>
<li>Integrated <strong>BlueConic (CDP)</strong> by mapping custom front-end user state to global telemetry profiles, ensuring marketing teams had real time access to user subscription tiers and engagement metrics.</li>
</ul>
<h3>The Takeaway</h3>
<p>This project proves an ability to engineer solutions in hostile or restricted environments. By utilising advanced DOM manipulation, reverse-engineering React state, and bridging data via Python webhooks, I transformed a rigid, off-the-shelf SaaS product into a highly customised, automated business asset.</p>`
    ],
  }
]
