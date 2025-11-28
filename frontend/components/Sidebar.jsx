"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    Package,
    Lightbulb,
    Activity,
    Settings,
    X,
    Briefcase,
    Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarOpen } from "@/hooks/useSidebar";
import { AnimatePresence, motion } from "framer-motion";

const SIDEBAR_ITEMS = [
    {
        section: "Operations",
        items: [
            { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
            {
                label: "Staff Management",
                icon: UserCheck,
                href: "/staff-management",
            },
            { label: "Inventory", icon: Package, href: "/inventory" },
            { label: "AI Status", icon: Bot, href: "/ai-status" },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const isActive = (href) =>
        pathname === href || pathname.startsWith(href + "/");

    const { openSidebar, toggleSidebar } = useSidebarOpen();

    const closeSidebarMobile = () => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
        <>
            {/*  BACKDROP OVERLAY - MOBILE ONLY */}
            <AnimatePresence>
                {openSidebar && (
                    <motion.div
                        onClick={closeSidebarMobile}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        className="
                            fixed inset-0 bg-black 
                            md:hidden
                            z-[998]
                        "
                    />
                )}
            </AnimatePresence>

            {/*  SIDEBAR ITSELF */}
            <AnimatePresence>
                {openSidebar && (
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "tween" }}
                        role="navigation"
                        aria-label="Sidebar"
                        className={`
                            z-[999] h-screen w-[300px]
                            border-r border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 
                            fixed top-0 left-0
                        `}
                    >
                        {/* Sidebar Header */}
                        <div className="h-20 px-6 flex items-center justify-between">
                            <Link
                                href="/"
                                onClick={closeSidebarMobile}
                                className="flex items-center gap-3"
                            >
                                <div className="h-10 w-10 rounded-lg bg-zinc-200/80 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/logo.png"
                                        alt="Narada AI Logo"
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                                        Narada AI
                                    </p>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                        Hospital Operations
                                    </p>
                                </div>
                            </Link>

                            {/* Mobile Close Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={closeSidebarMobile}
                                className="md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <X className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                            </Button>
                        </div>

                        {/* Navigation */}
                        <nav className="overflow-y-auto px-3 py-4 space-y-8 scrollbar-none overscroll-contain">
                            {SIDEBAR_ITEMS.map((section) => (
                                <div key={section.section}>
                                    <p className="mb-3 mx-2 text-xs font-bold uppercase text-muted-foreground">
                                        {section.section}
                                    </p>

                                    <div className="space-y-1 flex flex-col">
                                        {section.items.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.href);

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={closeSidebarMobile}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start gap-3 px-4 py-2 text-sm font-medium
                                                            ${active
                                                                ? "bg-zinc-100 text-blue-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-800"
                                                                : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                                                            }
                                                        `}
                                                    >
                                                        <Icon className="h-5 w-5 shrink-0" />
                                                        {item.label}
                                                    </Button>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
