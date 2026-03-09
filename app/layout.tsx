import type { Metadata } from "next";
import { Poppins, Baloo_2 } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://dapur-vanny.vercel.app'),
  title: "Dapur Vanny | Aneka Jajan Pasar & Snack Box",
  description: "Pesanan jajan pasar, snack box, makanan kering, dan paket acara lezat. Siap antar tepat waktu dengan rasa autentik dari resep terbaik.",
  keywords: ["Jajan Pasar", "Snack Box", "Makanan Tradisional", "Kue Basah", "Kue Kering", "Dapur Vanny", "Wadaslintang"],
  openGraph: {
    title: "Dapur Vanny | Jajan Pasar & Snack Box",
    description: "Katering & Jajan Pasar Terbaik di Wadaslintang",
    url: "https://dapur-vanny.vercel.app",
    siteName: "Dapur Vanny",
    images: [
      {
        url: "/og-bg.png",
        width: 1200,
        height: 630,
        alt: "Dapur Vanny",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${baloo.variable}`}>

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}