import Link from "next/link";
import CTA from "@/components/CTA";

export default function CaraPesanPage() {
    return (
        <>
            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    {/* TITLE */}
                    <div className="text-center max-w-2xl mx-auto">

                        <h1 className="text-3xl md:text-4xl font-bold text-(--dark)">
                            Cara Memesan Snack Box di Dapur Vanny
                        </h1>

                        <p className="text-gray-600 mt-4">
                            Proses pemesanan sangat mudah dan cepat. Ikuti langkah berikut untuk
                            memesan jajan pasar atau snack box untuk acara Anda.
                        </p>

                    </div>


                    {/* STEPS */}
                    <div className="grid mt-16 gap-10 md:grid-cols-2 lg:grid-cols-4">

                        {/* STEP 1 */}
                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-(--primary) text-white text-xl font-bold">
                                1
                            </div>

                            <h3 className="font-semibold text-lg mt-6 text-(--dark)">
                                Pilih Menu atau Paket
                            </h3>

                            <p className="text-sm text-gray-600 mt-3">
                                Lihat berbagai pilihan jajan pasar dan paket snack box yang tersedia
                                di halaman menu atau paket acara.
                            </p>

                            <Link
                                href="/menu"
                                className="inline-block mt-4 text-(--primary) font-semibold text-sm"
                            >
                                Lihat Menu →
                            </Link>

                        </div>


                        {/* STEP 2 */}
                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-(--primary) text-white text-xl font-bold">
                                2
                            </div>

                            <h3 className="font-semibold text-lg mt-6 text-(--dark)">
                                Hubungi WhatsApp
                            </h3>

                            <p className="text-sm text-gray-600 mt-3">
                                Klik tombol pesan dan hubungi kami melalui WhatsApp untuk
                                melakukan pemesanan.
                            </p>

                        </div>


                        {/* STEP 3 */}
                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-(--primary) text-white text-xl font-bold">
                                3
                            </div>

                            <h3 className="font-semibold text-lg mt-6 text-(--dark)">
                                Tentukan Jumlah & Jadwal
                            </h3>

                            <p className="text-sm text-gray-600 mt-3">
                                Diskusikan jumlah pesanan, pilihan menu, serta tanggal pengiriman
                                sesuai kebutuhan acara Anda.
                            </p>

                        </div>


                        {/* STEP 4 */}
                        <div className="text-center">

                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-(--primary) text-white text-xl font-bold">
                                4
                            </div>

                            <h3 className="font-semibold text-lg mt-6 text-(--dark)">
                                Pesanan Diproses
                            </h3>

                            <p className="text-sm text-gray-600 mt-3">
                                Tim Dapur Vanny akan menyiapkan pesanan Anda dan mengirimkannya
                                tepat waktu ke lokasi acara.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <CTA />
        </>
    );
}