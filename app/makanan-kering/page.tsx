import { makananKeringItems } from "@/data/makanan-kering";
import CTA from "@/components/CTA";
import MakananKeringClient from "@/components/MakananKeringClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Makanan Kering | Dapur Vanny Seluruh Indonesia",
    description: "Katalog aneka kue kering lezat yang siap dikirim langsung ke seluruh wilayah Indonesia dari Dapur Vanny.",
};

export default function MakananKeringPage() {
    return (
        <>
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark)">
                            Aneka Pesanan Makanan Kering
                        </h1>
                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                            Tersedia berbagai pilihan kue kering lezat yang siap dikirim langsung ke seluruh Indonesia.
                        </p>
                    </div>

                    <MakananKeringClient items={makananKeringItems} />
                </div>
            </section>
            <CTA />
        </>
    );
}
