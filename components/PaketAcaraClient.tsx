"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PackageItem {
    id: string | number;
    name: string;
    category: string;
    minOrder: string;
    items: string[];
    price: number | string;
    image: string;
    bestseller?: boolean;
}

export default function PaketAcaraClient({ packageItems }: { packageItems: PackageItem[] }) {
    const [search, setSearch] = useState("");
    const ITEMS_PER_PAGE = 6;

    // FILTER BY SEARCH
    const filteredPackages = packageItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // LOAD MORE
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const hasMore = visibleCount < filteredPackages.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
    };

    const paginatedPackages = filteredPackages.slice(0, visibleCount);

    return (
        <>
            {/* SEARCH BAR */}
            <div className="flex justify-center mt-8">
                <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-2 w-full max-w-xl shadow-sm">
                    <input
                        type="text"
                        placeholder="Cari paket acara..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setVisibleCount(ITEMS_PER_PAGE); // reset visible count on new search
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

            {/* GRID */}
            <div className="grid mt-14 gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPackages.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <p className="text-gray-500 text-lg">Paket tidak ditemukan</p>
                        <p className="text-sm text-gray-400 mt-2">Coba gunakan kata kunci lain.</p>
                    </div>
                ) : (
                    paginatedPackages.map((item, index) => (
                        <div
                            key={item.id}
                            style={{ animationDelay: `${(index % ITEMS_PER_PAGE) * 150}ms` }}
                            className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between animate-fadeUp opacity-0 h-full [animation-fill-mode:forwards]`}
                        >
                            <div className="relative">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={400}
                                    height={300}
                                    className="rounded-xl object-cover w-full aspect-[4/3]"
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
                            <p className="text-sm text-(--primary) font-medium">
                                {item.minOrder}
                            </p>
                            <div className="mt-4 text-sm text-gray-600">
                                <p className="font-medium mb-1">Isi:</p>
                                <ul className="list-disc ml-4 space-y-1">
                                    {item.items.map((food: string, i: number) => (
                                        <li key={i}>{food}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="text-sm font-semibold mt-4">
                                Mulai dari Rp{item.price.toLocaleString()} / box
                            </p>
                            <Link
                                href={`/paket-acara/${item.id}`}
                                className="w-full text-center mt-6 bg-(--primary) text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition active:scale-95"
                            >
                                Lihat Detail Paket
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
        </>
    );
}
