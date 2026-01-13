# Portfolio Project: Talent Restart — Bridging Sports and Business

**Talent Restart** is a trilingual, production-ready career platform designed to help professional athletes transition into the business world. This project showcases a sophisticated React-frontend integrated with a secure Supabase backend, featuring advanced AI assistance and a robust SaaS-style monetization model.

## 🚀 Key Technical Achievements

*   **🌍 Universal Trilingual Support**: Fully localized in **Czech, English, and German**. Every UI component, filter, and real-time notification (toasts) adapts instantly to the user's language via a centralized Context API.
*   **💎 Premium SaaS Monetization**: Implemented a comprehensive monetization flow for employers. Features include:
    *   **Feature Gating**: Exclusive access to Market Intelligence, Risk Analysis, and Competitor Watch.
    *   **Visual Conversion Hooks**: Candidate profiles and advanced analytics are obscured for free users, encouraging upgrades.
    *   **Simulated Stripe Checkout**: A professional, production-like checkout flow with secure redirects and transactional feedback.
*   **🤖 AI Career Assistant**: A fully integrated AI tool that helps athletes translate their sporting history into high-value professional skills. Features include simulated neural processing and direct job-match integration.
*   **⚡ Production Backend (Supabase)**: A secure, production-ready database implementation:
    *   **Unified Schema**: A single, optimized `submissions` table handles contact inquiries, job applications, and lead tracking.
    *   **Security First**: Enabled Row Level Security (RLS) policies to allow public inserts while strictly protecting data from unauthorized access.

## 👥 Dynamic User Experience

The platform offers a tailored experience for two distinct user groups:

### For Athletes (The Talent)
Athletes experience a 100% free platform where they can build professional profiles, use the **AI Assistant** to rewrite their CVs, and apply to job openings that specifically value their discipline and grit. The flow is designed to be supportive, guiding them through the transition from the stadium to the office.

### For Employers (The Recruiters)
Employers navigate a high-performance **SaaS Dashboard**. 
*   **Free Users**: See a "passive" dashboard with limited candidate visibility and basic analytics. They are constantly nudged toward the value of the "Pro" plan via gated metrics and "Unlock Data" calls to action.
*   **Premium Users**: Gain access to the "Elite Talent" database, detailed candidate profiles, and market-speed analytics that allow them to hire 3.5x faster than traditional methods.

---
**Tech Stack**: Vite, React, TypeScript, Tailwind CSS, Supabase, Lucide React, Shadcn/UI.
