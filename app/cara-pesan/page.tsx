import Image from "next/image";
import CTA from "@/components/CTA";
import { orderSteps } from "@/data/orderSteps";
import FAQ from "@/components/FAQ";

export default function CaraPesanPage() {
    return (
        <>
            <section className="py-20">

                <div className="max-w-6xl mx-auto px-6">

                    {/* TITLE */}
                    <div className="text-center max-w-3xl mx-auto">

                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark)">
                            Cara Mudah Memesan di Dapur Vanny
                        </h1>

                        <p className="text-gray-600 mt-4">
                            Pesan jajan pasar untuk acara Anda dengan langkah yang jelas dan praktis.
                        </p>

                    </div>


                    <div className="mt-16 space-y-16">

                        {orderSteps.map((step, index) => {

                            const isEven = index % 2 === 1;

                            return (
                                <div
                                    key={step.id}
                                    className="grid grid-cols-[1fr_auto] lg:grid-cols-3 items-center gap-8"
                                >

                                    {/* NUMBER LEFT (untuk step genap) */}
                                    {isEven && (
                                        <div className="flex justify-center text-[40px] md:text-[70px] lg:text-[160px] font-bold text-[#EFE6DD] select-none">
                                            {String(step.id).padStart(2, "0")}
                                        </div>
                                    )}
                                    {/* CARD */}
                                    <div
                                        className={`
            col-span-1
            ${isEven ? "lg:col-start-2 lg:col-span-2" : "lg:col-start-1 lg:col-span-2"}
          `}
                                    >

                                        <div className="bg-white rounded-2xl border border-[#E8D8CC] shadow-sm p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6">

                                            {/* IMAGE */}
                                            <div className="md:w-[35%] w-full">

                                                <div className="bg-[#F6EFE7] rounded-xl p-4">

                                                    <Image
                                                        src={step.image}
                                                        alt={step.title}
                                                        width={400}
                                                        height={300}
                                                        className="mx-auto"
                                                    />

                                                </div>

                                            </div>

                                            {/* TEXT */}
                                            <div className="md:w-[65%]">

                                                <p className="text-sm font-semibold text-gray-500">
                                                    {String(step.id).padStart(2, "0")}
                                                </p>

                                                <h3 className="text-lg md:text-xl font-semibold text-(--dark) mt-1">
                                                    {step.title}
                                                </h3>

                                                <p className="text-gray-600 mt-3 text-sm md:text-base">
                                                    {step.desc}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-4">
                                                    <span className="font-semibold">Tambahan:</span> {step.note}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* NUMBER RIGHT (untuk step ganjil) */}
                                    {!isEven && (
                                        <div className="flex justify-center text-[40px] md:text-[70px] lg:text-[160px] font-bold text-[#EFE6DD] select-none">
                                            {String(step.id).padStart(2, "0")}
                                        </div>
                                    )}

                                </div>
                            );

                        })}

                    </div>


                </div>


            </section >
            <FAQ />
            <CTA />
        </>
    );
}