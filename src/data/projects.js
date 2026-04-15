/**
 * Portfolio projects — replace image URLs and copy with your real assets.
 *
 * `detailParagraphs`: each item is an HTML fragment (plain text still works).
 * Wrap copy in <p>, <h3>, <ul>, etc. as needed; the modal renders with dangerouslySetInnerHTML.
 *
 * Images:
 * - `imageSrc`: single image (string)
 * - `imageSrcs`: optional carousel images (string[])
 */
export const projects = [
  {
    id: 'agronomy-edge',
    title: 'Agronomy Edge',
    shortDescription: 'Marketing website containing bespoke SVG animation for a new agronomy community platform.',
    imageSrc: 'agronomy-edge-mockup.jpg',
    tags: ['Branding', 'React', 'Community'],
    detailParagraphs: [
      'This project covered end-to-end product work: discovery interviews, IA and flows, a scalable design system, and production UI in React.',
      'Outcome: faster feature delivery, clearer data hierarchy for power users, and a documented component library the team could extend safely.',
    ],
  },
  {
    id: 'visual-design',
    title: 'DBR Protocol',
    shortDescription: 'Next.js marketing website and members area for LCHP diet protocol prototype. Includes a custom Ai agent in Telegram.',
    imageSrc: 'dbrprotocol-mockup.jpg',
    tags: ['Prototype', 'Next.js', 'Telegram', 'Ai agents', 'SVG animations', 'Stripe integration'],
    detailParagraphs: [
      'Exploration-heavy work: visual language, interaction patterns, and handoff-ready specs for engineering partners.',
      'Focus on accessibility, responsive behaviour, and consistency across marketing and in-app experiences.',
    ],
  },
  {
    id: 'a2vg',
    title: 'A2VG',
    shortDescription: 'WordPress React plugin, Next.js website and AWS Remotion server for generating videos from articles.',
    imageSrc: 'a2vg-mockup.jpg',
    tags: ['React', 'Next.js', 'WordPress'],
    detailParagraphs: [
      'Shipping reusable modules, tightening performance budgets, and documenting APIs so adoption stays low-friction.',
      'Includes CI-friendly patterns, Storybook examples, and pragmatic test coverage where it pays off.',
    ],
  },
  {
    id: 'web-to-print-engine',
    title: 'Enterprise Web-to-Print Engine',
    shortDescription: 'A bespoke DOM-parsing architecture that translates legacy WordPress payloads into automated InDesign XML, saving the business £142k/year.',
    imageSrc: 'indesign-xml.jpg',
    imageSrcs: [
      'indesign-xml.jpg',
      'indesign-xml-code.jpg',
      // ...
    ],
    tags: ['Vanilla JS', 'XML Automation', 'DOM Parsing', 'Legacy Modernization', 'Workflow Automation', 'Cost Optimization'],
    detailParagraphs: [
      `<h3>The Bottleneck (The Infrastructure Challenge)</h3>
<p>At Farmers Weekly, the editorial production cycle was severely bottlenecked by legacy infrastructure. The editorial team was forced into a highly manual workflow, having to extract digital content from a legacy WordPress CMS and then manually rebuild it for print layouts in Adobe InDesign. This was costing the editorial team hours of manual labour every day for every single article.</p>
<p>The options for the business was to either migrate over to an expensive WordPress VIP enterprise hosting tier, costing <strong>£142,000 annually</strong> just to maintain the status quo, or find a more cost-effective solution.</p>
<p>From a UX and engineering standpoint, the challenge was two-fold:</p>
<ul>
<li><strong>The Technical Constraint:</strong> We needed to decouple the print-export logic from the legacy CMS to avoid lengthy PHP payloads and slow page loads.</li>
<li><strong>The UX Constraint:</strong> Editors needed a seamless, bulletproof interface to visualize, format, and export complex article structures into strict XML directly from their native environment, without relying on unstable third-party plugins. It also needed to be an effortless and enjoyable experience in order for them to adopt it.</li>
</ul>
<h3>The Architecture (Decoupling the Data Pipeline)</h3>
<p>Instead of relying on bloated PHP plugins or heavy server-side processing, I engineered a client-side intercept using lightweight, vanilla JavaScript (ES6+). By hooking directly into the WordPress TinyMCE editor, I built a pipeline that reads, sanitizes, and transforms the raw DOM payload in the browser.</p>
<ul>
<li><strong>DOM Parsing &amp; Schema Mapping:</strong> The script natively walks the DOM tree, intelligently identifying specific content blocks (like nested lists, data tables, or custom full-width &lt;div&gt; boxes) and maps them directly to a strict, validated InDesign XML schema (e.g., &lt;StoryContent&gt;, &lt;KeylineBox&gt;).</li>
<li><strong>The Interface Injection:</strong> To ensure data accuracy and build trust with the editorial team, I designed and injected a custom, React-style UI modal directly into the legacy WordPress admin dashboard. This interface provides editors with a real-time, parsed preview of the data structure, allowing them to configure print-specific variables before triggering the XML export.</li>
<li><strong>Zero-Dependency Execution:</strong> By handling the data transformation purely on the client side without third-party libraries, the solution remains exceptionally fast, highly secure, and completely decoupled from the underlying server architecture.</li>
</ul>
<h3>The Roadmap (Future Enhancements)</h3>
<p>To evolve this utility from a one-way export script into a comprehensive enterprise publishing platform, I mapped out the following V2 architecture:</p>
<ul>
<li><strong>Bidirectional Data Sync:</strong> Engineering a reverse-parser to allow layout adjustments made in Adobe InDesign to seamlessly sync back to the WordPress database, creating a true closed-loop editorial system.</li>
<li><strong>Real-Time Collaboration:</strong> Implementing WebSockets to transition the bespoke UI into a multiplayer environment, allowing multiple editors to configure print variables and lock content blocks concurrently.</li>
<li><strong>AI-Driven Editorial Guardrails:</strong> Integrating a lightweight LLM validation step (via custom system prompts) to automatically check the parsed XML against the publication’s strict style guide before export, eliminating formatting errors downstream.</li>
</ul>`,
    ],
  },
  {
    id: 'farmers-weekly',
    title: 'Farmers Weekly projects',
    shortDescription: 'Web components, events landing pages and custom lottie animations for a leading UK magazine publisher.',
    imageSrc: 'https://picsum.photos/seed/portfolio4/800/520',
    tags: ['Design Tokens', 'Storybook'],
    detailParagraphs: [
      'Tokens, primitives, and composite components with clear usage guidance and migration notes for legacy screens.',
      'Goal: one source of truth for spacing, type, colour, and motion so product teams move quickly without breaking cohesion.',
    ],
  },
  {
    id: 'staypost',
    title: 'Staypost',
    shortDescription: 'Online Circle community platform consisting of custom webhook automations.',
    imageSrc: 'https://picsum.photos/seed/portfolio4/800/520',
    tags: ['Design Tokens', 'Storybook'],
    detailParagraphs: [
      'Tokens, primitives, and composite components with clear usage guidance and migration notes for legacy screens.',
      'Goal: one source of truth for spacing, type, colour, and motion so product teams move quickly without breaking cohesion.',
    ],
  }
]
