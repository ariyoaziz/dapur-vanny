import Image from "next/image";

export default function CTA() {
    return (
        <section className="mt-20">

            <div className="bg-(--cream) rounded-t-[60px] py-14 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 text-center">

                {/* TEXT AREA */}
                <div className="max-w-3xl mx-auto">

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-(--dark) max-w-2xl mx-auto leading-snug">
                        Percayakan Jajan Pasar Acara Anda ke Dapur Vanny
                    </h2>

                    <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
                        Hubungi kami untuk konsultasi menu dan jadwal pengiriman.
                    </p>

                </div>

                {/* BUTTON */}
                <div className="mt-8 flex justify-center">

                    <a
                        href="https://wa.me/628000000000"
                        className="flex items-center gap-2 sm:gap-3 bg-white text-(--dark) 
      px-5 sm:px-6 md:px-8 py-3 rounded-full font-semibold 
      text-sm sm:text-base
      shadow-sm hover:scale-105 transition"
                    >

                        <Image
                            src="/whatsapp.svg"
                            alt="WhatsApp"
                            width={22}
                            height={22}
                            className="w-5 h-5 sm:w-6 sm:h-6"
                        />

                        Pesan Sekarang via WhatsApp

                    </a>

                </div>

            </div>

        </section>
    );
}