import { menuItems } from "@/data/menu";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";
import { Metadata } from "next";

export async function generateStaticParams() {
    return menuItems.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const product = menuItems.find((item) => item.slug === slug);

    if (!product) {
        return { title: "Dapur Vanny" };
    }

    return {
        title: `${product.name} | Dapur Vanny Wadaslintang`,
        description: `Beli ${product.name} yang baru dibuat. ${product.desc} Pesan sekarang dari katalog jajan pasar Dapur Vanny.`,
        openGraph: {
            title: `${product.name} | Dapur Vanny`,
            description: `Beli ${product.name}. ${product.desc}`,
            images: [
                {
                    url: product.image || '/og-bg.png',
                    width: 1200,
                    height: 630,
                    alt: product.name,
                }
            ],
            type: 'website',
        }
    };
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Next.js >= 15 approach for async params
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const product = menuItems.find((item) => item.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <section className="py-12 md:py-20 lg:py-24 max-w-7xl mx-auto px-6">

            <Link href="/menu" className="inline-flex items-center text-(--primary) hover:text-(--dark) hover:underline font-medium mb-8 transition-colors">
                &larr; Kembali ke Menu
            </Link>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start max-w-5xl mx-auto">

                {/* PRODUCT IMAGE & INFO */}
                <div className="flex flex-col">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={800}
                            height={600}
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover w-full h-full"
                        />
                        {product.bestseller && (
                            <span className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-md font-medium shadow-sm">
                                Paling Laris
                            </span>
                        )}
                    </div>

                    <div className="mt-8 flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-(--cream) text-(--dark) px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                {product.category.replace('-', ' ')}
                            </span>
                            <span className="text-green-700 font-medium text-xs md:text-sm flex items-center gap-1.5 bg-green-100 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Status: Tersedia
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark) leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">
                            {product.desc}
                        </p>

                        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Harga Satuan</p>
                            <p className="text-2xl font-bold text-(--primary)">
                                Rp{product.price.toLocaleString()} <span className="text-base font-medium text-gray-500">/ {product.unit}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ORDER FORM */}
                <div className="flex flex-col h-full">
                    <OrderForm
                        productName={product.name}
                        productPrice={product.price}
                        productUnit={product.unit}
                        isNationwideShipping={product.isNationwideShipping}
                    />
                </div>

            </div>
        </section>
    );
}
