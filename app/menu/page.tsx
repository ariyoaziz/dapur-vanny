"use client";

import { useState } from "react";
import { menuItems } from "@/data/menu";
import Image from "next/image";
import CTA from "@/components/CTA";
import Link from "next/link";

export default function MenuPage() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("semua");
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    // FILTER + SEARCH
    const filteredMenu = menuItems.filter((item) => {

        const matchCategory =
            category === "semua" || item.category === category;

        const matchSearch =
            item.name.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;

    });

    // PAGINATION -> LOAD MORE
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const hasMore = visibleCount < filteredMenu.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    const paginatedMenu = filteredMenu.slice(0, visibleCount);

    return (
        <>
            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    {/* TITLE */}
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark)">
                            Aneka Menu Jajan Pasar
                        </h1>

                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                            Tersedia berbagai pilihan jajan pasar yang bisa disesuaikan
                            dengan kebutuhan acara Anda.
                        </p>
                    </div>


                    {/* SEARCH */}
                    <div className="flex justify-center mt-8">

                        <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-2 w-full max-w-xl shadow-sm">

                            <input
                                type="text"
                                placeholder="Cari menu..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setVisibleCount(ITEMS_PER_PAGE);
                                }}
                                className="flex-1 outline-none text-sm"
                            />

                            <div className="bg-(--primary) text-white w-9 h-9 rounded-full flex items-center justify-center">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>

                            </div>

                        </div>

                    </div>


                    {/* FILTER CATEGORY */}
                    <div className="flex justify-center mt-6 gap-3 flex-wrap">

                        {[
                            { label: "Semua", value: "semua" },
                            { label: "Gorengan & Isi", value: "gorengan" },
                            { label: "Kue Tradisional", value: "kue-tradisional" },
                            { label: "Kue Modern & Bolu", value: "kue-modern" }
                        ].map((cat) => (

                            <button
                                key={cat.value}
                                onClick={() => {
                                    setCategory(cat.value);
                                    setVisibleCount(ITEMS_PER_PAGE);
                                }}
                                className={`px-4 py-1 rounded-full text-sm ${category === cat.value
                                    ? "bg-(--primary) text-white"
                                    : "border border-gray-200"
                                    }`}
                            >
                                {cat.label}
                            </button>

                        ))}

                    </div>


                    {/* MENU GRID */}


                    <div className="grid mt-14 gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {paginatedMenu.length === 0 ? (

                            <div className="col-span-full text-center py-16">

                                <p className="text-gray-500 text-lg">
                                    Menu tidak ditemukan
                                </p>

                                <p className="text-sm text-gray-400 mt-2">
                                    Coba gunakan kata kunci lain.
                                </p>

                            </div>

                        ) : (

                            paginatedMenu.map((item, index) => (

                                <div
                                    key={item.id}
                                    style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 150}ms` }}
                                    className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between animate-fadeUp opacity-0 h-full`}
                                >

                                    <div className="relative">

                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={400}
                                            height={300}
                                            className="rounded-xl object-cover w-full h-[180px]"
                                        />

                                        {item.bestseller && (
                                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                                Paling Laris
                                            </span>
                                        )}

                                    </div>

                                    <h3 className="font-semibold text-lg text-(--dark) mt-4">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-2">
                                        {item.desc}
                                    </p>

                                    <p className="text-sm font-semibold mt-4">
                                        Mulai dari Rp{item.price.toLocaleString()} / {item.unit}
                                    </p>

                                    <Link
                                        href={`/menu/${item.slug}`}
                                        className="w-full text-center mt-6 bg-(--primary) text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition active:scale-95"
                                    >
                                        Lihat Detail
                                    </Link>

                                </div>

                            ))

                        )}

                    </div>

                    {/* LOAD MORE */}
                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={handleLoadMore}
                                className="px-8 py-3 rounded-full border-2 border-(--primary) text-(--primary) font-semibold hover:bg-(--primary) hover:text-white transition active:scale-95"
                            >
                                Tampilkan Lebih Banyak
                            </button>
                        </div>
                    )}



                </div>

            </section>
            <CTA />
        </>

    );

}