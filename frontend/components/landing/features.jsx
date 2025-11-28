'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, Package, Activity, Clock, TrendingUp, Shield } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const features = [
  {
    icon: Users,
    title: 'Staff Management',
    description: 'Intelligent scheduling and shift optimization for seamless team coordination. AI analyzes historical data to predict staffing needs.',
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-500"
  },
  {
    icon: Activity,
    title: 'Patient Flow',
    description: 'Real-time patient routing and appointment management. Reduce wait times and improve patient satisfaction scores instantly.',
    color: "from-emerald-500/20 to-green-500/20",
    accent: "text-emerald-500"
  },
  {
    icon: Package,
    title: 'Inventory Control',
    description: 'Automated tracking of medical supplies. Smart alerts for low stock and expiration dates to prevent waste and shortages.',
    color: "from-orange-500/20 to-amber-500/20",
    accent: "text-orange-500"
  },
  {
    icon: Clock,
    title: 'Real-Time Decisions',
    description: 'AI-driven insights for instant operational adjustments. Make data-backed decisions in seconds, not hours.',
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-500"
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Comprehensive dashboards tracking efficiency metrics. Visualize hospital performance and identify bottlenecks effortlessly.',
    color: "from-indigo-500/20 to-violet-500/20",
    accent: "text-indigo-500"
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description: 'Healthcare-grade data protection. HIPAA compliant architecture ensuring patient data remains secure and private.',
    color: "from-red-500/20 to-rose-500/20",
    accent: "text-red-500"
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * features.length),
        features.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section className="relative bg-background">
      {/* Scrollable Container */}
      <div 
        ref={containerRef} 
        style={{ height: `${features.length * 100}vh` }}
        className="relative"
      >
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
            
            {/* Left Column: Text Content */}
            <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center min-h-[300px]">
              <div className="mb-8 lg:mb-12">
                 <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Powerful Features
                </h2>
                <p className="text-lg text-muted-foreground">
                  Scroll to explore our capabilities
                </p>
              </div>

              <div className="relative h-[200px] sm:h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                      {features[activeIndex].title}
                    </h3>
                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg">
                      {features[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Progress Indicators */}
              <div className="flex gap-2 mt-8">
                {features.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-8 bg-primary" : "w-2 bg-primary/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Visual Content */}
            <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] flex items-center justify-center">
               {/* Background Gradients */}
               <div className="absolute inset-0  z-10 pointer-events-none" />
               
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                   animate={{ opacity: 1, scale: 1, rotate: 0 }}
                   exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                   transition={{ duration: 0.5 }}
                   className="relative w-full max-w-md aspect-square"
                 >
                   <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${features[activeIndex].color} border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center overflow-hidden group relative`}>
                      {/* Abstract Shapes */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-to-br ${features[activeIndex].color} opacity-20 blur-3xl`}
                      />
                      
                      {(() => {
                        const Icon = features[activeIndex].icon;
                        return <Icon className={`w-32 h-32 ${features[activeIndex].accent} drop-shadow-2xl relative z-10`} />;
                      })()}
                      
                      {/* Glass Overlay */}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                   </div>
                 </motion.div>
               </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}