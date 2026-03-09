"use client";

import { useState } from "react";
import Image from "next/image";

interface OrderFormProps {
    productName: string;
    productPrice: number;
    productUnit: string;
}

export default function OrderForm({ productName, productPrice, productUnit }: OrderFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        quantity: 1,
        date: "",
        notes: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "quantity" ? (parseInt(value) || "") : value
        }));
    };

    const handleCheckout = () => {
        // Validate
        if (!formData.name.trim() || !formData.address.trim() || !formData.date) {
            setError("Mohon lengkapi Nama Lengkap, Alamat Pengiriman, dan Tanggal.");
            return;
        }

        const qty = Number(formData.quantity);
        if (isNaN(qty) || qty < 1) {
            setError("Jumlah pesanan tidak valid (minimal 1).");
            return;
        }

        setError("");

        // Build WhatsApp Message
        const phoneNumber = "6287762707319";
        const message = `Halo Admin, saya ingin memesan:
Produk: ${productName}
Jumlah: ${qty} ${productUnit}
Nama: ${formData.name.trim()}
Alamat: ${formData.address.trim()}
Tanggal Pengiriman: ${formData.date}
Catatan: ${formData.notes.trim() || "-"}

Apakah pesanan ini bisa diproses?`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(waUrl, "_blank", "noopener,noreferrer");
    };

    // Calculate total
    const total = productPrice * (Number(formData.quantity) || 0);

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 className="text-xl md:text-2xl font-bold text-(--dark) mb-6">Formulir Pemesanan</h3>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm mb-6 border border-red-100">
                    <span className="font-semibold px-2">!</span> {error}
                </div>
            )}

            <div className="space-y-5 flex-grow">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm transition"
                        placeholder="Masukkan nama Anda"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat Pengiriman <span className="text-red-500">*</span></label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm transition resize-y"
                        placeholder="Contoh: Jl. Sudirman No 123, RT 01/RW 02..."
                        rows={3}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min={1}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm transition"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Catatan Tambahan</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm transition resize-y"
                        placeholder="Contoh: Tolong dikirim jam 9 pagi"
                        rows={2}
                    />
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 font-medium">Total Estimasi</span>
                    <span className="text-2xl font-bold text-(--dark)">Rp{total.toLocaleString()}</span>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-(--primary) text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-sm"
                >
                    <Image src="/whatsapp.svg" alt="WhatsApp" width={22} height={22} />
                    Pesan via WhatsApp
                </button>
            </div>
        </div>
    );
}
