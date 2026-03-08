/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { menuItems } from "@/data/menu";
import { testimonials } from "@/data/testimonials";
import { steps } from "@/data/steps";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <section className="py-12 md:py-16">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-(--primary) font-medium mb-4">
              Aneka Jajan Pasar & Snack Box
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--dark) leading-tight">
              Jajan Pasar Enak untuk Arisan,
              <br />
              Hajatan & Acara Keluarga
            </h1>

            <p className="text-gray-600 mt-6">
              Pilihan lengkap, rasa autentik, dan siap antar tepat waktu ke lokasi Anda.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              {/* WA BUTTON */}
              <a
                href="https://wa.me/628000000000"
                className="flex items-center gap-2 bg-(--secondary) text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                <img
                  src="/whatsapp.svg"
                  alt="WhatsApp"
                  className="w-5 h-5"
                />
                Pesan Via WhatsApp
              </a>

              {/* MENU BUTTON */}
              <a
                href="/menu"
                className="border border-(--primary) text-(--primary) px-6 py-3 rounded-full font-semibold hover:bg-(--primary) hover:text-white transition"
              >
                Lihat Menu
              </a>

            </div>

            <p className="mt-8 text-gray-600">
              Sudah melayani <span className="font-semibold">500+ pesanan</span>
            </p>

          </div>

          {/* RIGHT IMAGE GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">

            <Image
              src="/hero.jpg"
              alt="Snack Box"
              width={400}
              height={300}
              className="rounded-2xl object-cover h-40 sm:h-50"
            />

            <Image
              src="/hero.jpg"
              alt="Snack Box"
              width={400}
              height={300}
              className="rounded-2xl object-cover h-40 sm:h-50"
            />

            <Image
              src="/hero.jpg"
              alt="Snack Box"
              width={400}
              height={300}
              className="rounded-2xl object-cover h-40 sm:h-50"
            />

            <Image
              src="/hero.jpg"
              alt="Snack Box"
              width={400}
              height={300}
              className="rounded-2xl object-cover h-40 sm:h-50"
            />

          </div>

        </div>
        {/* BOTTOM SCROLL TEXT */}
        <div className="bg-(--primary) text-white mt-16 py-3 overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee gap-10">

            <span>
              Brownies • Bolu Kukus • Klepon • Lapis • Dadar Gulung • Pastel Risoles • Lemper
            </span>

            <span>
              Brownies • Bolu Kukus • Klepon • Lapis • Dadar Gulung • Pastel Risoles • Lemper
            </span>

            <span>
              Brownies • Bolu Kukus • Klepon • Lapis • Dadar Gulung • Pastel Risoles • Lemper
            </span>

          </div>
        </div>

      </section>
      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold text-(--dark)">
            Alasan Kenapa Dapur Vanny Dipercaya
          </h2>

          <p className="text-gray-600 mt-4">
            Kami hadir untuk membuat acara Anda lebih praktis, lezat, dan tepat waktu.
          </p>

        </div>

        {/* BACKGROUND AREA */}
        <div className="bg-(--cream) mt-16 py-16 rounded-t-[60px]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* CARD 1 */}
            <div className="bg-(--white) p-6 rounded-2xl shadow-sm text-left">

              <div className="w-12 h-12 flex items-center justify-center bg-(--secondary) rounded-full mb-4 text-white">
                🏆
              </div>

              <h3 className="font-semibold text-(--dark)">
                Rasa Autentik & Fresh
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Setiap pesanan dibuat mendekati hari acara agar rasa tetap autentik,
                lembut, dan tidak basi saat disajikan.
              </p>

            </div>


            {/* CARD 2 */}
            <div className="bg-(--white) p-6 rounded-2xl shadow-sm text-left">

              <div className="w-12 h-12 flex items-center justify-center bg-(--primary) rounded-full mb-4 text-white">
                🎉
              </div>

              <h3 className="font-semibold text-(--dark)">
                Berbagai Acara
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Mulai dari arisan, pengajian, ulang tahun, hingga hajatan keluarga
                tersedia berbagai menu yang bisa disesuaikan.
              </p>

            </div>


            {/* CARD 3 */}
            <div className="bg-(--white) p-6 rounded-2xl shadow-sm text-left">

              <div className="w-12 h-12 flex items-center justify-center bg-(--secondary) rounded-full mb-4 text-white">
                💰
              </div>

              <h3 className="font-semibold text-(--dark)">
                Custom Sesuai Budget
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Pilih jenis jajan, jumlah box, dan kombinasi menu sesuai anggaran
                tanpa mengurangi kualitas rasa.
              </p>

            </div>


            {/* CARD 4 */}
            <div className="bg-(--white) p-6 rounded-2xl shadow-sm text-left">

              <div className="w-12 h-12 flex items-center justify-center bg-(--primary) rounded-full mb-4 text-white">
                ⏰
              </div>

              <h3 className="font-semibold text-(--dark)">
                Antar Tepat Waktu
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Pesanan dikirim sesuai jadwal acara agar Anda tidak perlu khawatir
                atau terburu-buru di hari penting.
              </p>

            </div>

          </div>

        </div>

      </section>
      <section className="py-24">

        {/* TITLE */}
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-(--dark)">
            Aneka Jajan Pasar Favorit
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Tersedia berbagai pilihan jajan pasar dan snack box yang bisa disesuaikan dengan kebutuhan acara Anda.
          </p>

        </div>

        {/* GRID MENU */}
        <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 flex flex-col
      ${index >= 4 ? "hidden lg:flex" : ""}`}
            >

              {/* IMAGE */}
              <div className="w-full aspect-4/3 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col grow">

                <h3 className="font-semibold text-base md:text-lg text-(--dark) mt-4">
                  {item.name}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>

                <p className="text-xs md:text-sm font-semibold mt-4">
                  {item.price}
                </p>

                <button className="mt-4 bg-(--primary) text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold hover:opacity-90 transition self-start">
                  Pesan Sekarang
                </button>

              </div>

            </div>
          ))}

        </div>


        {/* BUTTON */}
        <div className="text-center mt-12">

          <a
            href="/menu"
            className="border border-(--primary) text-(--primary) px-6 py-3 rounded-full font-semibold hover:bg-(--primary) hover:text-white transition"
          >
            Lihat Semua Menu
          </a>

        </div>

      </section>

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-bold text-center text-(--dark)">
            Cerita Mereka yang Sudah Memesan di Dapur Vanny
          </h2>

          {/* MOBILE SCROLL */}
          <div className="mt-16 flex gap-6 overflow-x-auto lg:hidden pb-4">

            {testimonials.map((item) => (
              <div
                key={item.id}
                className="min-w-70 bg-white rounded-2xl p-6 border border-[#E8D8CC]"
              >

                <div className="text-yellow-400 text-lg">
                  ★★★★★
                </div>

                <h3 className="font-semibold text-(--dark) mt-3">
                  {item.name} – {item.event}
                </h3>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  &quot;{item.text}&quot;
                </p>

              </div>
            ))}

          </div>


          {/* TABLET + DESKTOP GRID */}
          <div className="hidden lg:grid grid-cols-3 gap-8 mt-16">

            {testimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-[#E8D8CC]"
              >

                <div className="text-yellow-400 text-lg">
                  ★★★★★
                </div>

                <h3 className="font-semibold text-(--dark) mt-3">
                  {item.name} – {item.event}
                </h3>

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  &quot;{item.text}&quot;
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-(--dark) max-w-2xl mx-auto leading-snug">
            Percayakan Jajan Pasar Acara Anda ke Dapur Vanny
          </h2>

          <p className="text-gray-600 mt-4 text-center max-w-xl mx-auto">
            Pesan jajan pasar untuk acara Anda hanya dalam beberapa langkah sederhana.
          </p>


          {/* STEP LIST */}
          <div className="mt-16 flex flex-col gap-8">

            {steps.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >

                {/* NUMBER HEADER */}
                <div className="bg-(--cream) px-6 py-4 text-xl font-bold text-(--dark)">
                  {step.id}
                </div>

                {/* CONTENT */}
                <div className="bg-white px-6 py-6">

                  <h3 className="font-semibold text-(--dark) text-lg">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    {step.desc}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>
      <CTA />
    </>

  );
}