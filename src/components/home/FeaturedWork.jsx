import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "TruuBlue",
    cat: "Dating App • AI-Powered",
    desc: "Progressive dating app using AI matching. Built with React Native, achieving 4.9★ App Store rating and 50K+ downloads in 3 months.",
    bg: "from-blue-600 to-indigo-700",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    tags: ["React Native", "AI/ML", "Firebase"],
    stat: "50K+", statLabel: "Downloads",
  },
  {
    title: "HomesBasket",
    cat: "On-Demand • Multi-Service",
    desc: "Feature-rich on-demand delivery platform serving food, groceries, and medicines across Miami with real-time GPS tracking.",
    bg: "from-cyan-500 to-blue-600",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    tags: ["Node.js", "React", "AWS"],
    stat: "1M+", statLabel: "Deliveries",
  },
  {
    title: "Whirlpool Digital",
    cat: "Enterprise • B2B Platform",
    desc: "Custom enterprise catalog management with real-time inventory and multi-region dealer portal for a global appliance giant.",
    bg: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
    tags: ["React", "Microservices", "Azure"],
    stat: "40%", statLabel: "Cost Reduction",
  },
  {
    title: "WFFA Sports",
    cat: "Sports Tech • Real-Time",
    desc: "Live fantasy football platform with real-time scoring, AI recommendations, and 100K+ active users across the globe.",
    bg: "from-indigo-600 to-purple-700",
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600",
    tags: ["WebSockets", "Python", "Redis"],
    stat: "100K+", statLabel: "Active Users",
  },
];

// Each card sticks at a slightly lower top offset so they stack visually
function StickyCard({ project, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index - 1) * 0.04]);
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

  return (
    <div
      ref={ref}
      className="h-screen flex items-center justify-center"
      style={{ zIndex: index }}
    >
      <motion.div
        style={{ scale, opacity }}
        className={`relative w-full max-w-5xl mx-auto h-[440px] rounded-3xl overflow-hidden bg-gradient-to-br ${project.bg} cursor-pointer group shadow-2xl`}
      >
        {/* Background image */}
        <img
          src={project.img}
          className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition duration-700"
          alt={project.title}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="relative z-10 p-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs text-white/50 font-mono tracking-widest">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="text-xs text-white/70 font-medium bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                {project.cat}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg mb-6">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, j) => (
                <span key={j} className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full font-medium backdrop-blur-sm border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-white">{project.stat}</div>
              <div className="text-white/50 text-xs mt-0.5">{project.statLabel}</div>
            </div>
            <motion.div
              whileHover={{ x: 3, y: -3 }}
              className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white/25 transition"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeaturedWork() {
  return (
    <section className="bg-gray-50">
      {/* Header — non-sticky */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-block text-blue-700 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-100 px-4 py-2 rounded-full">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Work We're<br />Proud Of
            </h2>
            <p className="text-gray-500 mt-3 text-base max-w-md">
              Scroll through our featured projects — each one a story of real business impact.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition text-sm group">
            View All Projects
            <ExternalLink size={15} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Sticky scroll cards */}
      <div className="relative">
        {projects.map((project, index) => (
          <StickyCard
            key={index}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </section>
  );
}
