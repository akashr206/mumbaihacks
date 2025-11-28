'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, PackageX, Activity } from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

const problems = [
  {
    icon: AlertCircle,
    title: "Staff Burnout",
    description: "Unpredictable surges and manual scheduling lead to exhausted teams and errors.",
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  {
    icon: PackageX,
    title: "Inventory Blindspots",
    description: "Critical supplies run out unexpectedly, causing delays in life-saving treatments.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
  {
    icon: Clock,
    title: "Patient Delays",
    description: "Inefficient workflows result in long wait times and increased patient anxiety.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
];

export default function Problem() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium mb-6"
          >
            <Activity className="w-4 h-4" />
            The Challenge
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Healthcare Operations are <span className="text-red-500">Critical</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Hospitals today face a "silent crisis" of inefficiency, where reactive systems fail to keep up with real-time demands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <TiltCard key={index} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className={`h-full p-8 rounded-2xl border ${problem.border} ${problem.bg} relative overflow-hidden group`}
                >
                  <div className={`w-12 h-12 rounded-xl ${problem.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${problem.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                  
                  {/* Pulse Effect */}
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${problem.bg} rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
