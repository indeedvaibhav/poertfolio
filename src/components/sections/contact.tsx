"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio-data";
import SectionHeading from "@/components/ui/section-heading";
import GlassCard from "@/components/ui/glass-card";
import { 
  RiMailLine, 
  RiLinkedinBoxLine, 
  RiGithubLine, 
  RiSendPlaneLine,
  RiCheckboxCircleLine
} from "react-icons/ri";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email.";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!formData.message.trim()) tempErrors.message = "Message is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API request send
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      // Reset success notification after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Open to SDE roles, internships, and collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Social connection channels */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard>
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Connect Directly</h3>
              <p className="text-xs leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                Whether you have a product challenge or SDE opening, feel free to reach out. I try to reply within 24 hours.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl border glass border-transparent hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group text-xs"
                  style={{ borderColor: "var(--border-primary)" }}
                >
                  <RiMailLine size={18} className="text-indigo-400" />
                  <div>
                    <span className="font-semibold text-zinc-300 block">Email Address</span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-indigo-400 transition-colors">{personalInfo.email}</span>
                  </div>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border glass border-transparent hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group text-xs"
                  style={{ borderColor: "var(--border-primary)" }}
                >
                  <RiLinkedinBoxLine size={18} className="text-indigo-400" />
                  <div>
                    <span className="font-semibold text-zinc-300 block">LinkedIn Profile</span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-indigo-400 transition-colors">vaibhav-tripathi</span>
                  </div>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border glass border-transparent hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group text-xs"
                  style={{ borderColor: "var(--border-primary)" }}
                >
                  <RiGithubLine size={18} className="text-indigo-400" />
                  <div>
                    <span className="font-semibold text-zinc-300 block">GitHub Organization</span>
                    <span className="text-[10px] text-zinc-500 group-hover:text-indigo-400 transition-colors">indeedvaibhav</span>
                  </div>
                </a>


              </div>
            </GlassCard>
          </div>

          {/* Contact Glassmorphism Form */}
          <div className="lg:col-span-7">
            <GlassCard>
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                    />
                    {errors.name && <span className="text-[9px] text-red-400 font-semibold mt-1 block">{errors.name}</span>}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                    />
                    {errors.email && <span className="text-[9px] text-red-400 font-semibold mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                  />
                  {errors.subject && <span className="text-[9px] text-red-400 font-semibold mt-1 block">{errors.subject}</span>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500/50 resize-none"
                  />
                  {errors.message && <span className="text-[9px] text-red-400 font-semibold mt-1 block">{errors.message}</span>}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white text-xs font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <RiSendPlaneLine size={14} />
                    {isSubmitting ? "Sending..." : "Submit Message"}
                  </button>

                  <AnimatePresence>
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-1.5 text-green-400 font-semibold text-xs"
                      >
                        <RiCheckboxCircleLine size={16} /> Message sent successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
