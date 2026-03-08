import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-(--dark) text-white pt-14 pb-6">

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <Image
                        src="/logo.png"
                        alt="Dapur Vanny"
                        width={80}
                        height={80}
                    />

                    <p className="text-sm mt-4 leading-relaxed text-gray-300">
                        Dapur Vanny menyediakan aneka jajanan pasar dan snack box
                    </p>
                </div>

                {/* Menu */}
                <div>
                    <ul className="space-y-3 text-sm text-gray-300">

                        <li>
                            <Link href="/" className="hover:text-white">
                                Beranda
                            </Link>
                        </li>

                        <li>
                            <Link href="/menu" className="hover:text-white">
                                Menu
                            </Link>
                        </li>

                        <li>
                            <Link href="/paket-acara" className="hover:text-white">
                                Paket Acara
                            </Link>
                        </li>

                        <li>Testimoni</li>

                        <li>
                            <Link href="/cara-pesan" className="hover:text-white">
                                Cara Pesan
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Kontak */}
                <div className="text-sm text-gray-300 space-y-3">

                    <p>
                        <span className="font-semibold text-white">WhatsApp:</span> 08xxxxxxxxxx
                    </p>

                    <p>
                        <span className="font-semibold text-white">
                            Jam Operasional:
                        </span>{" "}
                        08.00 – 17.00 WIB
                    </p>

                    <p>
                        <span className="font-semibold text-white">Alamat:</span>{" "}
                        Kumejing, Wadaslintang,
                        Wonosobo, Jawa tengah
                    </p>

                </div>

                {/* Social Media */}
                <div>
                    <h3 className="font-semibold mb-4">Mari Terhubung</h3>

                    <div className="flex items-center gap-4">

                        <Image
                            src="/whatsapp.svg"
                            alt="WhatsApp"
                            width={36}
                            height={36}
                        />

                        <Image
                            src="/instagram.svg"
                            alt="Instagram"
                            width={36}
                            height={36}
                        />

                        <Image
                            src="/tiktok.svg"
                            alt="Tiktok"
                            width={36}
                            height={36}
                        />

                    </div>

                </div>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-500 mt-12 pt-6 text-center text-sm text-gray-300">
                © {new Date().getFullYear()} Dapur Vanny. All rights reserved.
            </div>

        </footer>
    );
}