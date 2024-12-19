"use client"

import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PremiumLayout({ children } : { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    return (
        <div className="">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-6 sm:ml-28' : 'ml-0'}`}>
                <div className="mx-auto px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    )
}