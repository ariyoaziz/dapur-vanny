import { packageItems } from "@/data/packages";
import CTA from "@/components/CTA";
import PaketAcaraClient from "@/components/PaketAcaraClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Paket Acara & Snack Box | Dapur Vanny",
    description: "Dapatkan paket harga spesial jajan pasar dan snack box kombo untuk kebutuhan arisan dan rapat dengan Dapur Vanny.",
};

export default function PaketAcaraPage() {
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

                    <PaketAcaraClient packageItems={packageItems} />
                </div>
            </section>
            <CTA />
        </>
    );
}