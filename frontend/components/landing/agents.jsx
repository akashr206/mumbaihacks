'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Users, Activity, Package, Network } from 'lucide-react';
import { useRef } from 'react';
import { TiltCard } from '@/components/ui/tilt-card';

const agents = [
  {
    icon: Users,
    title: 'Staff Agent',
    description: 'Dynamically adjusts schedules and reallocates staff during surges.',
    color: "from-emerald-500/20 to-green-500/20",
    accent: "text-emerald-500"
  },
  {
    icon: Activity,
    title: 'Patient Communication',
    description: 'Sends automated notifications and appointment updates to patients.',
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-500"
  },
  {
    icon: Package,
    title: 'Inventory Agent',
    description: 'Monitors supply levels and triggers restocking automatically.',
    color: "from-orange-500/20 to-amber-500/20",
    accent: "text-orange-500"
  },
];

function AgentCard({ agent, index, variants }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = agent.icon;

  return (
    <TiltCard className="h-full">
      <motion.div
        ref={ref}
        variants={variants}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full"
      >
        <div 
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="h-full p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:bg-secondary/30 transition-colors duration-300 text-center shadow-sm hover:shadow-xl group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
          
          <div 
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10 w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300"
          >
            <Icon className={`w-8 h-8 ${agent.accent}`} />
          </div>
          <h3 
            style={{ transform: "translateZ(25px)" }}
            className="relative z-10 text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
          >
            {agent.title}
          </h3>
          <p 
            style={{ transform: "translateZ(25px)" }}
            className="relative z-10 text-muted-foreground leading-relaxed"
          >
            {agent.description}
          </p>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export default function Agents() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }, // Smoother bezier
    },
  };

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium text-sm">
            Our Unique Selling Proposition
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 pb-1">
            Meet Your AI Workforce
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Not just chatbots. A coordinated team of specialized agents that run your hospital 24/7.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative perspective-1000"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ perspective: "1000px" }}
        >
          {/* Connection Lines (Desktop only) */}
          <div className="hidden sm:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 -z-10" />
          
          {agents.map((agent, i) => (
            <AgentCard key={i} agent={agent} index={i} variants={itemVariants} />
          ))}
        </motion.div>

        {/* Connection Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="mt-16 sm:mt-20 p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-secondary/30 text-center relative overflow-hidden will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
          <Network className="w-12 h-12 text-primary mx-auto mb-4 relative z-10" />
          <h3 className="text-2xl font-semibold mb-2 relative z-10">Seamless Integration</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto relative z-10">
            All agents communicate in real-time, creating a unified system that adapts instantly to hospital needs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
