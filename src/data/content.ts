import type { CTA, SkillGroup, ExperienceEntry, Project, NavLink } from "@/types/content"

export const hero = {
  greeting: "Hi, I'm",
  name: "Srivishag P.",
  roles: ["Full Stack Developer", "Mobile App Developer", "AI Automation Engineer"],
  blurb:
    "I build scalable web applications, cross-platform mobile experiences, and intelligent AI automation systems that solve real-world problems using modern technologies.",
  ctas: [
    { label: "View Projects", href: "#projects" },
    { label: "Download Resume", href: "/resume.pdf" },
    { label: "Contact Me", href: "#contact" },
  ] satisfies CTA[],
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "mailto:srivishagp@gmail.com",
    resume: "/resume.pdf",
  },
}

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm a passionate software engineer specializing in Full Stack Development, Mobile App Development, and AI Automation. I enjoy building end-to-end software solutions — from intuitive user interfaces to scalable backend systems and intelligent automation workflows.",
    "With professional experience in Java, Spring Boot, React, Flutter, PostgreSQL, Redis, Kafka, Docker, and cloud technologies, I've worked on applications across food delivery, healthcare, enterprise software, and AI-driven developer tools.",
  ],
  education: "B.E., Computer Science",
  currentPosition: "Junior Consultant @ Celcom Solutions Global",
  stats: [
    { label: "Years Experience", value: 1, suffix: "+" },
    { label: "Projects Shipped", value: 4, suffix: "" },
    { label: "Technologies", value: 30, suffix: "+" },
  ],
}

export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["Java", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"] },
  { title: "Frontend", skills: ["React", "Flutter", "Tailwind CSS", "Vite"] },
  { title: "Backend", skills: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "REST APIs"] },
  { title: "Databases", skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  { title: "Messaging & Cloud", skills: ["Apache Kafka", "Docker", "Git", "GitHub", "Linux", "OCI"] },
  { title: "AI & Tools", skills: ["OpenAI", "Gemini", "Firebase", "Postman", "Playwright"] },
]

export const experience: ExperienceEntry[] = [
  {
    role: "Junior Consultant",
    company: "Celcom Solutions Global Pvt. Ltd.",
    duration: "2025 – Present",
    summary:
      "Design and develop scalable backend services, RESTful APIs, and enterprise-grade applications while collaborating with cross-functional teams to deliver high-quality software solutions.",
    responsibilities: [
      "Develop scalable backend applications using Java and Spring Boot.",
      "Design and implement RESTful APIs for web and mobile applications.",
      "Build secure authentication and authorization systems using JWT and OAuth2.",
      "Optimize application performance with Redis caching and Kafka-based messaging.",
      "Deploy and maintain applications on Linux servers using Docker.",
    ],
  },
]

export const projects: Project[] = [
  {
    title: "Cloud Kitchen Platform",
    description:
      "A scalable cloud kitchen management platform supporting customers, restaurant partners, and administrators.",
    features: ["User Authentication", "Order Management", "Payment Integration", "Kitchen Dashboard"],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "Docker", "Flutter"],
    visual: "kitchen",
    github: "https://github.com/yourusername/cloud-kitchen-platform",
  },
  {
    title: "Health Tracking Platform",
    description:
      "A full-stack healthcare application designed to help users monitor health data through a secure mobile experience.",
    features: ["Google Authentication", "Health Records", "Secure APIs", "Role-based Access Control"],
    stack: ["Flutter", "Spring Boot", "PostgreSQL", "JWT", "Google OAuth"],
    visual: "health",
    github: "https://github.com/yourusername/health-tracking-platform",
  },
  {
    title: "AI Automation Platform",
    description:
      "An intelligent automation platform that leverages LLMs to streamline workflows and improve developer productivity.",
    features: ["AI Agents", "Prompt Engineering", "Workflow Automation", "Knowledge Retrieval"],
    stack: ["n8n", "Gemini", "OpenAI", "PostgreSQL", "Supabase"],
    visual: "automation",
    github: "https://github.com/yourusername/ai-automation-platform",
  },
  {
    title: "AI-Powered Test Failure Analyzer",
    description:
      "An intelligent testing assistant that analyzes Playwright failures, identifies root causes, and suggests fixes.",
    features: ["Playwright Integration", "Failure Analysis", "AI Root Cause Detection", "Smart Locators"],
    stack: ["Playwright", "TypeScript", "Gemini AI"],
    visual: "testing",
    github: "https://github.com/yourusername/ai-test-failure-analyzer",
  },
]

export const aiCore = {
  heading: "AI Automation",
  description:
    "I build systems that put language models to work on real processes — not demos. The focus is on automation that runs unattended, fails predictably, and saves measurable time.",
  capabilities: [
    {
      title: "Workflow Automation",
      body: "Multi-step pipelines that connect APIs, databases and LLMs to remove repetitive manual work.",
    },
    {
      title: "AI Agents",
      body: "Goal-driven agents with tool access that research, decide and act inside defined guardrails.",
    },
    {
      title: "Retrieval (RAG)",
      body: "Grounding models in your own documents and data so answers cite real sources instead of guessing.",
    },
    {
      title: "LLM Integration",
      body: "Wiring OpenAI and Gemini into existing Spring Boot and Flutter products with sane cost and latency budgets.",
    },
    {
      title: "AI-Assisted QA",
      body: "Tooling that reads Playwright failures, identifies the root cause and proposes a fix, cutting triage time.",
    },
  ],
}

export const contact = {
  heading: "Let's Build Something Amazing Together",
  body:
    "Whether you're looking for a developer, have an exciting project, or simply want to connect, I'd love to hear from you.",
  email: "srivishagp@gmail.com",
  github: "github.com/yourusername",
  linkedin: "linkedin.com/in/yourprofile",
}

export const footer = {
  year: 2026,
  name: "Srivishag P.",
  builtWith: "Built with Next.js, React, TypeScript, Tailwind CSS, and Three.js.",
}

export const navLinks: NavLink[] = [
  { id: "hero", label: "Identity" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "ai-core", label: "AI Automation" },
  { id: "contact", label: "Contact" },
]
