"use client";

import { useState } from "react";
import { menuItems } from "@/data/menu";
import { makananKeringItems } from "@/data/makanan-kering";
import Image from "next/image";
import CTA from "@/components/CTA";
import ProductCard from "@/components/ProductCard";

export default function MenuPage() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("semua");
    const ITEMS_PER_PAGE = 6;

    // FILTER + SEARCH
    const filteredMenu = makananKeringItems.filter((item) => {

        const matchSearch =
            item.name.toLowerCase().includes(search.toLowerCase());

        return matchSearch;

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
                            Aneka Pesanan Makanan Kering
                        </h1>

                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                            Tersedia berbagai pilihan kue kering lezat yang siap dikirim langsung ke seluruh Indonesia.
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


                    {/* FILTER CATEGORY REMOVED FOR DEDICATED DRY PAGE */}


                    {/* MENU GRID */}


                    <div className="grid mt-14 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

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
                                <ProductCard
                                    key={item.id}
                                    {...item}
                                    index={index}
                                    baseRoute="makanan-kering"
                                />
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