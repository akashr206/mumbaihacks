'use client';

import Hero from '../components/landing/hero';
import Problem from '../components/landing/problem';
import Workflow from '../components/landing/workflow';
import Features from '../components/landing/features';
import Agents from '../components/landing/agents';
import CTA from '../components/landing/cta';
import Footer from '../components/landing/footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Activity } from 'lucide-react';
import { Poppins } from 'next/font/google';
import styles from './landing.module.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function LandingPage() {
  return (
    <main className={`min-h-screen bg-background text-foreground selection:bg-primary/20 ${poppins.variable} font-sans ${styles.landingWrapper}`}>
      {/* Fixed Logo */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight">Narada AI</span>
      </div>

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <Hero />
      <Problem />
      <Workflow />
      <Agents />
      <Features />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </main>
  );
}
