import { menuItems } from "@/data/menu";
import { makananKeringItems } from "@/data/makanan-kering";
import CTA from "@/components/CTA";
import MenuClient from "@/components/MenuClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Menu | Aneka Jajan Pasar Dapur Vanny",
    description: "Jelajahi berbagai pilihan jajan pasar, kue tradisional, dan jajanan favorit di Dapur Vanny.",
};

export default function MenuPage() {
    const allItems = [
        ...menuItems.map(item => ({ ...item, baseRoute: 'menu' })),
        ...makananKeringItems.map(item => ({ ...item, baseRoute: 'makanan-kering' }))
    ];

    return (
        <>
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark)">
                            Aneka Menu Jajan Pasar
                        </h1>
                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
                            Tersedia berbagai pilihan jajan pasar yang bisa disesuaikan
                            dengan kebutuhan acara Anda.
                        </p>
                    </div>

                    <MenuClient items={allItems} />
                </div>
            </section>
            <CTA />
        </>
    );
}