"use client";

import { useState } from "react";
import { packageItems } from "@/data/packages";
import Image from "next/image";
import CTA from "@/components/CTA";

export default function PaketAcaraPage() {

    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 6;

    const totalPages = Math.ceil(packageItems.length / ITEMS_PER_PAGE);

    const paginatedPackages = packageItems.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <>
            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    {/* TITLE */}
                    <div className="text-center">

                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark)">
                            Paket Snack Box & Jajan Pasar untuk Berbagai Acara
                        </h1>

                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                            Solusi praktis untuk arisan, pengajian, ulang tahun, hingga acara keluarga.
                        </p>

                    </div>


                    {/* GRID */}
                    <div className="grid mt-14 gap-8 grid-cols-2 lg:grid-cols-3">

                        {paginatedPackages.map((item, index) => (

                            <div
                                key={item.id}
                                className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                ${index >= 4 ? "hidden lg:block" : ""}`}
                            >

                                <div className="relative">

                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={400}
                                        height={300}
                                        className="rounded-xl object-cover w-full h-45"
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

                                <p className="text-sm text-(--primary)">
                                    {item.minOrder}
                                </p>

                                <div className="mt-4 text-sm text-gray-600">

                                    <p className="font-medium mb-1">Isi:</p>

                                    <ul className="list-disc ml-4 space-y-1">
                                        {item.items.map((food, i) => (
                                            <li key={i}>{food}</li>
                                        ))}
                                    </ul>

                                </div>

                                <p className="text-sm font-semibold mt-4">
                                    Mulai dari Rp{item.price.toLocaleString()} / box
                                </p>

                                <a
                                    href={`https://wa.me/628000000000?text=${encodeURIComponent(
                                        `Halo saya ingin memesan ${item.name}`
                                    )}`}
                                    className="inline-block mt-4 bg-(--primary) text-white px-5 py-2 rounded-full text-sm font-semibold"
                                >
                                    Pilih Paket Ini
                                </a>

                            </div>

                        ))}

                    </div>


                    {/* PAGINATION */}
                    <div className="flex justify-center mt-12 gap-3">

                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className={`w-9 h-9 rounded-full flex items-center justify-center border
              ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                        >
                            ‹
                        </button>

                        {Array.from({ length: totalPages || 1 }).map((_, i) => {

                            const pageNumber = i + 1;

                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center
                  ${page === pageNumber
                                            ? "bg-(--primary) text-white"
                                            : "border hover:bg-gray-100"}`}
                                >
                                    {pageNumber}
                                </button>
                            );

                        })}

                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className={`w-9 h-9 rounded-full flex items-center justify-center border
              ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                        >
                            ›
                        </button>

                    </div>

                </div>

            </section>

            <CTA />
        </>
    );
}