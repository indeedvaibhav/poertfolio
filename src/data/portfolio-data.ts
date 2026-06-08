// ============================================================
// Portfolio Data — Central data source for all sections
// ============================================================

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  icon: string;
  category: "Backend" | "Web" | "All";
  techStack: string[];
  features: string[];
  modules?: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  isFlagship?: boolean;
}

export const projects: Project[] = [
  {
    id: "civicsentinel",
    title: "CivicSentinel",
    subtitle: "Digital Democracy Platform",
    summary:
      "A citizen grievance platform for reporting and tracking civic issues in real time.",
    description:
      "CivicSentinel enables residents to report civic issues (potholes, water leakage, broken streetlights, etc.) with images and location data. Authorities manage and resolve complaints via an admin dashboard. Bridges the gap between citizens and local governments through transparency.",
    icon: "🏛️",
    category: "Backend",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "REST API",
      "Git/GitHub",
    ],
    features: [
      "Issue reporting with images",
      "Location-based submission",
      "Complaint status tracking",
      "Admin dashboard",
      "Transparency in resolution",
    ],
    image: "/projects/civicsentinel.png",
    githubUrl: "https://github.com/vaibhav/civicsentinel",
    liveUrl: "https://civicsentinel-admin.onrender.com",
  },
  {
    id: "parksense",
    title: "ParkSense",
    subtitle: "Smart Parking Management",
    summary:
      "A smart parking solution for real-time slot management and vehicle tracking.",
    description:
      "Automates parking operations for malls and commercial complexes — managing slot allocation, vehicle entry/exit, bookings, and occupancy monitoring through a clean admin dashboard.",
    icon: "🅿️",
    category: "Backend",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "REST API",
      "Git/GitHub",
    ],
    features: [
      "Real-time slot tracking",
      "Vehicle entry/exit logging",
      "Booking management",
      "Occupancy dashboard",
      "Analytics & reports",
    ],
    modules: [
      "Dashboard Analytics",
      "Slot Management",
      "Booking Management",
      "Reports",
      "User Authentication",
    ],
    image: "/projects/parksense.png",
    githubUrl: "https://github.com/vaibhav/parksense",
  },
  {
    id: "triyogi",
    title: "Triyogi Mustard Oil",
    subtitle: "Premium Brand Website",
    summary:
      "A premium brand website for an organic mustard oil company with product showcase.",
    description:
      "A business-focused web platform establishing Triyogi Mustard Oil's digital presence — showcasing products, brand story, and enabling customer inquiries. Built for mobile and desktop with a premium aesthetic.",
    icon: "🌿",
    category: "Web",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "EmailJS",
      "Git/GitHub",
      "Vercel",
    ],
    features: [
      "Product showcase",
      "Brand story page",
      "Contact form",
      "Responsive design",
      "SEO-friendly structure",
    ],
    image: "/projects/triyogi.png",
    githubUrl: "https://github.com/vaibhav/triyogi",
    liveUrl: "https://triyogi.vercel.app",
  },
];

// ============================================================
// Navigation Links
// ============================================================
export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Coding", href: "#coding" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

// ============================================================
// Personal Info
// ============================================================
export const personalInfo = {
  name: "Vaibhav",
  title: "Software Developer & Builder",
  tagline: "Building Software. Leading Teams.",
  email: "vaibhav@example.com",
  github: "https://github.com/vaibhav",
  linkedin: "https://linkedin.com/in/vaibhav",
  location: "India",
};

// ============================================================
// Tech Stack (for coding section)
// ============================================================
export const techStack = [
  { name: "Java", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "React.js", level: 88 },
  { name: "Node.js", level: 82 },
  { name: "MongoDB", level: 78 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Git/GitHub", level: 85 },
];

// ============================================================
// DSA Stats (for coding section)
// ============================================================
export const dsaStats = {
  problemsSolved: 500,
  contestRating: 1650,
  platforms: ["LeetCode", "Codeforces", "GeeksforGeeks"],
};

// ============================================================
// GitHub Stats (for coding section)
// ============================================================
export const githubStats = {
  contributions: 1200,
  repositories: 25,
  stars: 45,
};

// ============================================================
// About Data
// ============================================================
export const aboutData = {
  bio: "I'm a passionate Software Developer and B.Tech CSE student who loves building real-world software products. From full-stack web apps to smart systems, I enjoy solving problems that matter.",
  highlights: [
    "Full-Stack Developer",
    "Competitive Programmer",
    "Team Leader",
    "Open Source Contributor",
  ],
};

// ============================================================
// Experiences
// ============================================================
export const experiences = [
  {
    title: "Software Developer",
    company: "Freelance",
    period: "2024 - Present",
    description:
      "Building full-stack web applications for clients, focusing on modern UI/UX and scalable backends.",
  },
];

// ============================================================
// Leadership Data
// ============================================================
export const leadershipData = [
  {
    title: "Team Lead",
    organization: "College Project Team",
    period: "2024 - Present",
    description:
      "Leading a team of developers in building innovative software solutions for academic and real-world projects.",
  },
];
