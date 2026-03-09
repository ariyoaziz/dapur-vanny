"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface MakananKeringItem {
    id: string | number;
    slug: string;
    name: string;
    category: string;
    desc: string;
    price: number | string;
    unit: string;
    image: string;
    bestseller: boolean;
    isNationwideShipping?: boolean;
}

export default function MakananKeringClient({ items }: { items: MakananKeringItem[] }) {
    const [search, setSearch] = useState("");
    const ITEMS_PER_PAGE = 6;

    const filteredMenu = items.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
    });

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const hasMore = visibleCount < filteredMenu.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    const paginatedMenu = filteredMenu.slice(0, visibleCount);

    return (
        <>
            <div className="flex justify-center mt-8">
                <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-2 w-full max-w-xl shadow-sm">
                    <input
                        type="text"
                        placeholder="Cari pesanan..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        className="flex-1 outline-none text-sm"
                    />
                    <div className="bg-(--primary) text-white w-9 h-9 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="grid mt-14 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {paginatedMenu.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <p className="text-gray-500 text-lg">Menu tidak ditemukan</p>
                        <p className="text-sm text-gray-400 mt-2">Coba gunakan kata kunci lain.</p>
                    </div>
                ) : (
                    paginatedMenu.map((item, index) => (
                        <ProductCard key={item.id} {...item} index={index} baseRoute="makanan-kering" />
                    ))
                )}
            </div>

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
        </>
    );
}
