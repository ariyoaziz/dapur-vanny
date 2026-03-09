"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(1);

    return (
        <section className="py-20">

            <div className="max-w-5xl mx-auto px-6">

                {/* TITLE */}
                <div className="text-center mb-12">

                    <h2 className="text-3xl md:text-4xl font-bold text-(--dark)">
                        Pertanyaan yang Sering Diajukan
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Jika masih ada pertanyaan, silakan hubungi kami.
                    </p>

                </div>


                <div className="space-y-6">

                    {faqs.map((faq) => {

                        const isOpen = open === faq.id;

                        return (
                            <div
                                key={faq.id}
                                className="rounded-2xl overflow-hidden border border-[#E8D8CC] shadow-sm"
                            >

                                {/* HEADER */}
                                <button
                                    onClick={() =>
                                        setOpen(isOpen ? null : faq.id)
                                    }
                                    className="w-full flex items-center justify-between bg-[#D9C5B2] px-6 py-4 text-left font-semibold text-(--dark)"
                                >

                                    {faq.question}

                                    <span
                                        className={`transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    >
                                        ▼
                                    </span>

                                </button>


                                {/* CONTENT */}
                                {isOpen && (
                                    <div className="bg-white px-6 py-5 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}

                            </div>
                        );

                    })}

                </div>

            </div>

        </section>
    );
}