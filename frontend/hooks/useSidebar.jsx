"use client";
import { useState, useEffect, createContext, useContext } from "react";

const sidebarOpen = createContext();

const SidebarOpenProvider = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState(true);
    const toggleSidebar = () => {
        setOpenSidebar((prev) => !prev);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOpenSidebar(false);
            } else {
                setOpenSidebar(true);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <sidebarOpen.Provider value={{ openSidebar, toggleSidebar }}>
            {children}
        </sidebarOpen.Provider>
    );
};

const useSidebarOpen = () => {
    return useContext(sidebarOpen);
};

export { SidebarOpenProvider, useSidebarOpen };
