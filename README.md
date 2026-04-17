# Stevan Brash | Design Engineer Portfolio

> High-performance, client-side portfolio showcasing enterprise web architecture, UI/UX engineering, and zero-dependency DOM micro-animations.

**Live Site:** [https://stevanbrash.vercel.app/](https://stevanbrash.vercel.app/)

---

## Overview

This repository contains the source code for my professional Design Engineering portfolio. It is designed to act as a high-velocity presentation layer demonstrating my ability to bridge high-fidelity UX design with complex technical implementation.

While my core SaaS architectures (such as the DBR Protocol and A2VG) rely heavily on decoupled server-side environments (Next.js, Supabase, AWS Remotion), this portfolio was deliberately architected as a pure client-side application.

## ⚡ Tech Stack & Architecture

* **Framework:** React + Vite
* **Styling:** Tailwind CSS 
* **Icons:** Lucide React
* **Deployment:** Vercel (Edge Network)

### Why Vite over Next.js?
In an ecosystem that defaults to Server-Side Rendering (Next.js/App Router), this application was deliberately built using Vite to provide an unadulterated, highly performant client-side playground. Because the core features of this site rely on heavy DOM manipulation—such as 60fps mathematical SVG path morphing and custom Web Components—a pure React SPA environment ensures optimal client-side rendering and seamless layout transitions without server-state friction.

## A Note on Proprietary Code

This repository contains the presentation layer and micro-architecture of my portfolio. However, the full source code for the complex enterprise architectures discussed within the case studies (such as **A2VG** and **DBR Protocol**) remain in private repositories to protect proprietary IP and commercial data structures. 

I am happy to provide deep-dive technical walkthroughs of these private repositories during technical interviews.

## 🚀 Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone [https://github.com/uxdevopstevan/portfolio.git](https://github.com/uxdevopstevan/portfolio.git)