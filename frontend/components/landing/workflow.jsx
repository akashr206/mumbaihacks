'use client';

import { motion } from 'framer-motion';
import { Database, Cpu, Zap, ArrowRight } from 'lucide-react';

export default function Workflow() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            How <span className="text-primary">Narada AI</span> Works
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A continuous loop of observation, prediction, and autonomous action.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-slate-200 via-primary/50 to-slate-200 dark:from-slate-800 dark:via-primary/50 dark:to-slate-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1: Data */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-background p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Real-Time Data</h3>
              <p className="text-sm text-muted-foreground">
                Ingests data from IoT sensors, EMR systems, and external signals (weather, epidemics).
              </p>
            </motion.div>

            {/* Step 2: Core */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center bg-background p-8 rounded-2xl border-2 border-primary/20 shadow-xl relative"
            >
              <div className="absolute -top-3 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                THE BRAIN
              </div>
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary animate-pulse">
                <Cpu className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Multi-Agent Core</h3>
              <p className="text-sm text-muted-foreground">
                Specialized agents (Staff, Inventory, Patient) collaborate to predict needs and solve conflicts.
              </p>
            </motion.div>

            {/* Step 3: Action */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center text-center bg-background p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg"
            >
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Optimized Action</h3>
              <p className="text-sm text-muted-foreground">
                Automatically adjusts schedules, orders supplies, and notifies patients in real-time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
