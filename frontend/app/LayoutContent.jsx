"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSidebarOpen } from "@/hooks/useSidebar";
import { usePathname } from "next/navigation";

export default function LayoutContent({ children }) {
    const { openSidebar } = useSidebarOpen();
    const pathname = usePathname();

    const disableSidebar = [
        "/",
        "/auth/signin",
        "/auth/signup",
        "/onboarding",
    ].includes(pathname);

    if (disableSidebar) {
        return <main>{children}</main>;
    }

    return (
        <div className="flex h-screen ">
            <Sidebar />
            <motion.div
                className={`relative transition-all ml-auto duration-300
                    ${openSidebar ? "md:w-[calc(100%-300px)]" : "ml-0 w-full"}
                `}
            >
                <Navbar />
                <main className=" p-6">{children}</main>
            </motion.div>
        </div>
    );
}
