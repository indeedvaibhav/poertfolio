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
  roles: [
    "B.Tech CSE Student",
    "Software Developer",
    "Competitive Programmer",
    "Student Leader",
  ],
  resumeUrl: "#",
};

// ============================================================
// Tech Stack (for coding section)
// ============================================================
export const techStack = [
  { name: "Java", level: 90, color: "#E76F51" },
  { name: "JavaScript", level: 85, color: "#F4A261" },
  { name: "TypeScript", level: 80, color: "#2A9D8F" },
  { name: "React.js", level: 88, color: "#61DBFB" },
  { name: "Node.js", level: 82, color: "#68A063" },
  { name: "MongoDB", level: 78, color: "#4DB33D" },
  { name: "Tailwind CSS", level: 92, color: "#38B2AC" },
  { name: "Git/GitHub", level: 85, color: "#F05032" },
];

// ============================================================
// DSA Stats (for coding section)
// ============================================================
export const dsaStats = {
  totalSolved: 650,
  contestRating: 1685,
  streakDays: 120,
  easy: { solved: 220, total: 300, color: "#10b981" },
  medium: { solved: 350, total: 500, color: "#f59e0b" },
  hard: { solved: 80, total: 100, color: "#ef4444" },
  ratingHistory: [
    { contest: "Contest 1", rating: 1450 },
    { contest: "Contest 2", rating: 1480 },
    { contest: "Contest 3", rating: 1520 },
    { contest: "Contest 4", rating: 1560 },
    { contest: "Contest 5", rating: 1590 },
    { contest: "Contest 6", rating: 1640 },
    { contest: "Contest 7", rating: 1685 },
  ],
  profiles: [
    { platform: "LeetCode", handle: "indeedvaibhav", url: "https://leetcode.com/indeedvaibhav" },
    { platform: "Codeforces", handle: "indeedvaibhav", url: "https://codeforces.com" },
    { platform: "GeeksforGeeks", handle: "indeedvaibhav", url: "https://geeksforgeeks.org" },
  ],
};

// ============================================================
// GitHub Stats (for coding section)
// ============================================================
// We generate a 52x7 density array for the contribution grid
const getContributionGrid = () => {
  const grid = [];
  for (let i = 0; i < 52; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      // Create some nice patterns for contributions
      const val = Math.floor(Math.sin((i + j) / 5) * 2) + Math.floor(Math.random() * 2) + 1;
      week.push(Math.max(0, Math.min(4, val)));
    }
    grid.push(week);
  }
  return grid;
};

export const githubStats = {
  username: "indeedvaibhav",
  totalContributions: 1247,
  totalPRs: 156,
  totalStars: 85,
  totalRepos: 32,
  topRepos: [
    {
      name: "Smart-Parking-System",
      description: "An IoT-based smart parking system managing real-time slots and vehicle logs.",
      stars: 24,
      language: "Java",
      forks: 8,
    },
    {
      name: "CivicSentinel",
      description: "Citizen grievance reporting platform with admin dashboards and mapping.",
      stars: 18,
      language: "TypeScript",
      forks: 5,
    },
  ],
  contributionData: getContributionGrid(),
};

// ============================================================
// About Data
// ============================================================
export const aboutData = {
  intro: "I'm a passionate Software Developer and B.Tech CSE student. I specialize in building robust backend architectures, real-time IoT systems, and clean interactive user interfaces. I enjoy translating complex problem statements into functional software products.",
  highlights: [
    "Full-Stack Developer",
    "Competitive Programmer",
    "Team Leader",
    "Open Source Contributor",
  ],
  education: {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    university: "State Technical University",
    year: "2022 - 2026",
    expectedGraduation: "June 2026",
  },
  interests: [
    "System Design",
    "IoT Systems",
    "Web Performance",
    "Database Systems",
    "State Management",
    "Agile Leadership",
  ],
};

// ============================================================
// Experiences
// ============================================================
export const experiences = [
  {
    id: "exp1",
    title: "Full-Stack Developer Intern",
    organization: "BuildTech Systems",
    duration: "Jun 2024 - Aug 2024",
    description: "Developed and deployed critical backend modules for a dashboard application, optimized REST APIs, and managed WebSocket-based notifications.",
    skills: ["Spring Boot", "React.js", "MongoDB", "WebSockets"],
  },
  {
    id: "exp2",
    title: "Open Source Contributor",
    organization: "Community Repositories",
    duration: "2023 - Present",
    description: "Contributed components, UI enhancements, and documentation to various developer repositories.",
    skills: ["JavaScript", "React.js", "Git", "CSS"],
  },
];

// ============================================================
// Leadership Data
// ============================================================
export const leadershipData = {
  positions: [
    {
      title: "School Captain & Leader",
      organization: "St. John's Academy",
      duration: "2021 - 2022",
      description: "Represented the student body of 2000+ students, organized multiple campus-wide events, and acted as a liaison between student groups and the administration.",
    },
    {
      title: "Tech Lead / Coordinator",
      organization: "College Coding Club",
      duration: "2023 - Present",
      description: "Mentored 100+ juniors in DSA, coordinated college hackathons, and built the official club platform with real-time leaderboard features.",
    },
  ],
  athletics: [
    {
      title: "State-Level Basketball Athlete",
      level: "State Level",
      description: "Competed in school and college tournaments, representing divisional teams, learning discipline, focus, and high-pressure team dynamics.",
    },
  ],
  qualities: [
    "Resilience",
    "Discipline",
    "Team Cohesion",
    "Fast Learning",
    "Peer Mentoring",
    "Adaptive Thinking",
  ],
};
