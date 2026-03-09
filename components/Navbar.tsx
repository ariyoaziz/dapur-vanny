
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const menu = [
        { name: "Beranda", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "Makanan Kering", href: "/makanan-kering" },
        { name: "Paket Acara", href: "/paket-acara" },
        { name: "Cara Pesan", href: "/cara-pesan" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full">

            <div className="bg-[#C65A3A] shadow-md backdrop-blur-md">

                <div className="max-w-7xl mx-auto px-5 md:px-8 py-2.5 md:py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Dapur Vanny"
                            width={60}
                            height={60}
                        />
                    </Link>


                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8 text-white font-medium">

                        {menu.map((item) => {

                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-5 py-2 rounded-full transition
                    ${active
                                            ? "bg-white text-[#3A2A24]"
                                            : "hover:opacity-80"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}

                    </nav>


                    {/* Desktop Button */}
                    <a
                        href="https://wa.me/6287762707319"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex bg-white text-[#3A2A24] px-6 py-2 rounded-full font-semibold items-center gap-2 hover:scale-105 transition"
                    >
                        <Image
                            src="/whatsapp.svg"
                            alt="WhatsApp"
                            width={20}
                            height={20}
                        />
                        Pesan Sekarang
                    </a>


                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-white"
                    >

                        {open ? (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        ) : (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                        )}

                    </button>

                </div>

            </div>


            {/* Mobile Menu */}
            {open && (

                <div className="md:hidden bg-[#C65A3A] text-white flex flex-col items-center gap-6 py-6 shadow-lg">

                    {menu.map((item) => {

                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`px-6 py-2 rounded-full
                ${active
                                        ? "bg-white text-[#3A2A24]"
                                        : ""
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );

                    })}

                    <a
                        href="https://wa.me/6287762707319"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-[#3A2A24] px-6 py-2 rounded-full font-semibold flex items-center gap-2"
                    >
                        <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
                        Pesan Sekarang
                    </a>

                </div>

            )}

        </header>
    );
}