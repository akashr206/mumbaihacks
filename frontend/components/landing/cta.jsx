"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

function MagneticButton({ children, className, onClick }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } =
            ref.current.getBoundingClientRect();
        const xPos = clientX - (left + width / 2);
        const yPos = clientY - (top + height / 2);
        x.set(xPos * 0.3); // Magnetic strength
        y.set(yPos * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseXSpring, y: mouseYSpring }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}

export default function CTA() {
    const benefits = [
        "Instant setup and deployment",
        "Real-time analytics and insights",
        "24/7 AI-powered operations",
    ];

    return (
        <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 p-8 sm:p-12 text-center overflow-hidden"
                >
                    {/* Animated Background Blobs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -top-1/2 -right-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -bottom-1/2 -left-1/2 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"
                    />

                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 pb-1">
                            Ready to Transform Your Hospital?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                            Join hospitals optimizing operations with Narada
                            AI's intelligent automation
                        </p>

                        {/* Benefits */}
                        <motion.div
                            className="flex flex-col gap-3 mb-8 max-w-md mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                            }}
                            viewport={{ once: true }}
                        >
                            {benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-2 text-left justify-center sm:justify-start"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                        {benefit}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link href="/auth/signin">
                                <MagneticButton className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-primary/20">
                                    Start Free Trial
                                    <ArrowRight className="w-4 h-4" />
                                </MagneticButton>
                            </Link>
                            <Link href="/auth/signin">
                                <MagneticButton className="px-8 py-3 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold text-foreground hover:bg-secondary/50 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm">
                                    Sign In
                                </MagneticButton>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
                >
                    <p className="text-sm text-muted-foreground">
                        No credit card required • Setup in minutes • Cancel
                        anytime
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
