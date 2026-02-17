import { Project, SkillGroup, Education } from './types';

import ecomImg from './assets/ecom.jpg';
import oilImg from './assets/oil.jpg';
import iptvImg from './assets/iptv.jpg';
import cvImg from './assets/cvgenerator.jpg';

export const PROJECTS: Project[] = [
  {
    cover: ecomImg,
    title: "LUXURY WEAR | E-COMMERCE PLATFORM",
    role: "Full-Stack Developer (React, Laravel, MySQL)",
    description: "Developed a premium multi-category clothing store with a focus on high-end UI/UX.",
    technologies: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    features: [
      "Secure shopping cart and user authentication",
      "Admin dashboard for inventory/order management",
      "Filtered search system (size, color, price range)"
    ]
  },
  {
    cover: oilImg,
    title: "OLIVE OIL DOMAINES",
    role: "Full-Stack Developer (Laravel, Tailwind CSS)",
    description: "Built a niche marketplace for selling and auctioning domain names related to the olive oil industry.",
    technologies: ["Laravel", "Tailwind CSS", "SEO Optimization"],
    features: [
      "Custom back-end for domain listings and lead gen",
      "SEO optimized for high visibility",
      "Lightning-fast load times"
    ]
  },
  {
    cover: iptvImg,
    title: "PREMIUM IPTV SUBSCRIPTION",
    role: "Full-Stack Developer",
    description: "Designed a streamlined landing page and subscription management system for IPTV services.",
    technologies: ["PHP", "Laravel", "Tailwind CSS"],
    features: [
      "Automated checkout and dynamic pricing",
      "Automated email confirmations",
      "Customer portal for subscription management"
    ]
  },
  {
    cover: cvImg,
    title: "CV GENERATOR & UNIT CONVERTER",
    role: "React Developer",
    description: "Developed a dynamic CV builder with multiple PDF export templates.",
    technologies: ["React", "TypeScript", "PDF Libraries"],
    features: [
      "Real-time data processing",
      "Multiple PDF export templates (Simple, Photo, Professional)",
      "Instant UI updates"
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    icon: "fa-brands fa-react",
    skills: ["React.js", "Hooks", "Context API", "Redux", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"]
  },
  {
    category: "Styling & Design",
    icon: "fa-solid fa-palette",
    skills: ["Tailwind CSS", "Responsive Design", "Figma (UI/UX)", "Framer Motion"]
  },
  {
    category: "Backend",
    icon: "fa-solid fa-server",
    skills: ["PHP", "Laravel", "Eloquent", "Migrations", "API Development", "MySQL", "RESTful APIs"]
  },
  {
    category: "Tools & Workflow",
    icon: "fa-solid fa-screwdriver-wrench",
    skills: ["Git/GitHub", "NPM/Composer", "Web Performance", "Postman"]
  }
];

export const EDUCATIONS: Education[] = [
  {
    institution: "IPIAB",
    degree: "Technician Specialized in Full-Stack Development",
    period: "2023–Present"
  },
  {
    institution: "Tahar Ben Jelloune",
    degree: "Bachelor's Degree in Physical & Chemical Sciences",
    period: "2023"
  },
  {
    institution: "Ibn Tofail",
    degree: "Géography Faculty (1 year)",
    period: "2024–2025"
  }
];