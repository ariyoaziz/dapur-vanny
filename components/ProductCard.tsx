import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: number | string;
    slug: string;
    name: string;
    category: string;
    isNationwideShipping?: boolean;
    bestseller: boolean;
    desc: string;
    price: number | string;
    unit: string;
    image: string;
    index: number;
    baseRoute: string;
    hideOnDesktop?: boolean;
}

export default function ProductCard({
    slug,
    name,
    category,
    isNationwideShipping,
    bestseller,
    desc,
    price,
    unit,
    image,
    index,
    baseRoute,
    hideOnDesktop
}: ProductCardProps) {

    // Visual Badge Logic
    const isKering = category === "Kering";
    const badgeColor = isKering ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-blue-100 text-blue-800 border-blue-200";
    const badgeText = isKering ? "Makanan Kering" : "Makanan Basah";

    return (
        <div
            style={{ animationDelay: `${(index % 6) * 150}ms` }}
            className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:shadow-md animate-fadeUp opacity-0 [animation-fill-mode:forwards] h-full
            ${hideOnDesktop ? "hidden md:flex" : ""}`}
        >
            {/* IMAGE */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                />

                <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
                    {bestseller && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-sm font-medium">
                            Paling Laris
                        </span>
                    )}

                    {/* Visual Badge Category */}
                    <span className={`text-[10px] md:text-xs px-2 py-1 rounded border font-semibold shadow-sm backdrop-blur-sm ${badgeColor}`}>
                        {badgeText}
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col grow">
                <h3 className="font-semibold text-base md:text-lg text-(--dark) mt-4">
                    {name}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
                    {desc}
                </p>

                <p className="text-xs md:text-sm font-semibold mt-4 text-(--primary)">
                    {typeof price === "number" ? `Rp${price.toLocaleString()}` : price} / {unit}
                </p>

                {/* Shipping info text inside card */}
                {isNationwideShipping !== undefined && (
                    <div className="mt-2 text-[10px] md:text-xs flex items-center gap-1">
                        {isNationwideShipping ? (
                            <span className="text-green-600 font-medium">✈️ Seluruh Indonesia</span>
                        ) : (
                            <span className="text-amber-600 font-medium">⚠️ Area Lokal Saja</span>
                        )}
                    </div>
                )}

                <Link
                    href={`/${baseRoute}/${slug}`}
                    className="w-full text-center mt-auto pt-6"
                >
                    <div className="bg-(--primary) text-white px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition active:scale-95">
                        Lihat Detail
                    </div>
                </Link>
            </div>
        </div>
    );
}
