"use client";

import { useState } from "react";
import { Search, LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarOpen } from "@/hooks/useSidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";
import NotificationDropdown from "./extra/notifications/NotificationDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
    const { toggleSidebar } = useSidebarOpen();

    return (
        <nav className="sticky top-0 z-40 border-b  border-zinc-200 px-2 bg-white dark:border-zinc-700 dark:bg-zinc-950">
            <div className="flex h-16 items-center justify-between">
                {/* Sidebar Toggle Button */}
                <Button
                    onClick={toggleSidebar}
                    variant="ghost"
                    size="icon"
                    className="mr-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <Menu className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                </Button>

                {/* Search Bar */}
                <div className="max-w-md flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-400 dark:text-zinc-500" />
                        <Input
                            type="text"
                            placeholder="Search patients, staff, supplies..."
                            className="pl-10 pr-4 py-2 w-full border border-zinc-300 rounded-lg bg-zinc-50 text-zinc-900 placeholder-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:bg-zinc-700"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 ml-auto">
                    <ThemeToggle />
                    <div className="relative">
                        <NotificationDropdown />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                                        City General Hospital
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Hospital Admin
                                    </p>
                                </div>
                                <Avatar>
                                    <AvatarImage src={""} />
                                    <AvatarFallback>
                                        {"U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-48 dark:bg-zinc-800 dark:border-zinc-700"
                        >
                            <a href="/profile">
                                <DropdownMenuItem className="flex items-center gap-2 dark:text-zinc-300 dark:focus:bg-zinc-700 cursor-pointer">
                                    <User className="h-4 w-4" />
                                    <span>Profile Settings</span>
                                </DropdownMenuItem>
                            </a>
                            <DropdownMenuSeparator className="dark:bg-zinc-700" />
                            <DropdownMenuItem
                                className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-900/20 cursor-pointer"
                                onClick={() => signOut({ callbackUrl: "/" })}
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
}
