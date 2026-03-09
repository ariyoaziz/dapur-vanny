import { packageItems } from "@/data/packages";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import OrderForm from "@/components/OrderForm";

export async function generateStaticParams() {
    return packageItems.map((item) => ({
        id: item.id.toString(),
    }));
}

export default async function PackageDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const packageItem = packageItems.find((item) => item.id.toString() === id);

    if (!packageItem) {
        notFound();
    }

    return (
        <section className="py-12 md:py-20 lg:py-24 max-w-7xl mx-auto px-6">

            <Link href="/paket-acara" className="inline-flex items-center text-(--primary) hover:text-(--dark) hover:underline font-medium mb-8 transition-colors">
                &larr; Kembali ke Paket Acara
            </Link>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">

                {/* PACKAGE IMAGE & INFO */}
                <div className="flex flex-col">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <Image
                            src={packageItem.image}
                            alt={packageItem.name}
                            width={800}
                            height={600}
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover w-full h-full"
                        />
                        {packageItem.bestseller && (
                            <span className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-md font-medium shadow-sm">
                                Paling Laris
                            </span>
                        )}
                    </div>

                    <div className="mt-8 flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-(--cream) text-(--dark) px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                {packageItem.category.replace('-', ' ')}
                            </span>
                            <span className="text-green-700 font-medium text-xs md:text-sm flex items-center gap-1.5 bg-green-100 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Status: Tersedia
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark) leading-tight">
                            {packageItem.name}
                        </h1>

                        <p className="text-(--primary) mt-4 font-medium">
                            {packageItem.minOrder}
                        </p>

                        <div className="mt-4 text-gray-600">
                            <p className="font-medium mb-2">Isi Paket:</p>
                            <ul className="list-disc ml-5 space-y-1">
                                {packageItem.items.map((food, i) => (
                                    <li key={i}>{food}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Harga per Box</p>
                            <p className="text-2xl font-bold text-(--primary)">
                                Rp{packageItem.price.toLocaleString()} <span className="text-base font-medium text-gray-500">/ box</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ORDER FORM */}
                <div className="flex flex-col h-full">
                    <OrderForm
                        productName={packageItem.name}
                        productPrice={packageItem.price}
                        productUnit={"box"}
                    />
                </div>

            </div>
        </section>
    );
}
