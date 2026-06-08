"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { projects, Project } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import Image from "next/image";

// ============================================================
// Filter categories
// ============================================================
const FILTERS = [
  { id: "All", label: "All" },
  { id: "Backend", label: "Backend" },
  { id: "Web", label: "Web" },
] as const;

type FilterType = (typeof FILTERS)[number]["id"];

// ============================================================
// Project Card Component — Glassmorphism style
// ============================================================
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      className="group relative cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* Gradient border glow on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3), rgba(99,102,241,0.1))",
          filter: "blur(1px)",
        }}
      />

      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:-translate-y-1"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow: isHovered
            ? "0 25px 60px rgba(0,0,0,0.4), 0 0 30px rgba(99,102,241,0.08)"
            : "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Spotlight follow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.08), transparent 60%)`,
          }}
        />

        {/* Preview image with overlay */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.4) 50%, transparent 100%)",
            }}
          />
          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span
              className="text-[10px] font-mono font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background:
                  project.category === "Backend"
                    ? "rgba(99,102,241,0.15)"
                    : "rgba(16,185,129,0.15)",
                color:
                  project.category === "Backend" ? "#818cf8" : "#34d399",
                border: `1px solid ${
                  project.category === "Backend"
                    ? "rgba(99,102,241,0.25)"
                    : "rgba(16,185,129,0.25)"
                }`,
                backdropFilter: "blur(8px)",
              }}
            >
              {project.category}
            </span>
          </div>
          {/* Icon floating */}
          <div className="absolute bottom-4 left-5">
            <span className="text-3xl drop-shadow-lg">{project.icon}</span>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5 pt-4">
          <h3
            className="text-lg font-bold tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-[11px] font-mono font-semibold mt-0.5 tracking-wide uppercase"
            style={{ color: "var(--accent-primary)" }}
          >
            {project.subtitle}
          </p>
          <p
            className="text-sm mt-3 leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.summary}
          </p>

          {/* Mini tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono px-2 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "var(--text-muted)",
                }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded"
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.15)",
                  color: "var(--accent-tertiary)",
                }}
              >
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* View details button */}
          <motion.button
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.15)",
              color: "#a5b4fc",
            }}
            whileHover={{
              background: "rgba(99,102,241,0.15)",
              borderColor: "rgba(99,102,241,0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Details
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// Project Detail Modal / Drawer
// ============================================================
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <motion.div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={handleBackdropClick}
      style={{
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        style={{
          background: "rgba(10, 10, 10, 0.92)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08)",
        }}
      >
        {/* Accent top bar */}
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 4s linear infinite",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl transition-all duration-300 hover:rotate-90"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--text-secondary)",
          }}
          aria-label="Close modal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} full preview`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.5) 40%, transparent 100%)",
            }}
          />

          {/* Title overlay */}
          <div className="absolute bottom-6 left-6 right-16">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{project.icon}</span>
              <div>
                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--text-primary)",
                  }}
                >
                  {project.title}
                </h2>
                <p
                  className="text-xs font-mono font-semibold uppercase tracking-widest mt-0.5"
                  style={{ color: "var(--accent-tertiary)" }}
                >
                  {project.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              About This Project
            </h3>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Stack as badges */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.15)",
                    color: "#c7d2fe",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modules (if any) */}
          {project.modules && project.modules.length > 0 && (
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
                Modules
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.modules.map((mod) => (
                  <div
                    key={mod}
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: "var(--accent-primary)",
                      }}
                    />
                    {mod}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="flex items-start gap-3 text-sm px-3 py-2.5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-primary)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Repo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// Main Projects Section
// ============================================================
export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.03) 0%, transparent 40%),
          var(--bg-primary)
        `,
      }}
    >
      {/* Decorative floating orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(99,102,241,0.06)" }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(139,92,246,0.04)" }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          title="Projects"
          subtitle="Featured builds — from full-stack web apps to premium brand experiences, each crafted with care and deployed for the real world."
        />

        {/* Filter buttons */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
                style={{
                  color: isActive ? "#fff" : "var(--text-secondary)",
                  background: isActive
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    isActive
                      ? "rgba(99,102,241,0.4)"
                      : "rgba(255,255,255,0.06)"
                  }`,
                  boxShadow: isActive
                    ? "0 4px 20px rgba(99,102,241,0.25)"
                    : "none",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p
                className="text-sm font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                No projects found for this filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
