"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LocationAlertModal from "./LocationAlertModal";
import ValidationAlertModal from "./ValidationAlertModal";

interface OrderFormProps {
    productName: string;
    productPrice: number;
    productUnit: string;
    isNationwideShipping?: boolean;
}

interface Region {
    id: string;
    name: string;
}

export default function OrderForm({ productName, productPrice, productUnit, isNationwideShipping }: OrderFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        provinceId: "",
        provinceName: "",
        regencyId: "",
        regencyName: "",
        districtId: "",
        districtName: "",
        addressDetail: "",
        quantity: 1,
        date: "",
        notes: "",
    });

    const [provinces, setProvinces] = useState<Region[]>([]);
    const [regencies, setRegencies] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState({ prov: false, reg: false, dist: false });
    const [showDistanceModal, setShowDistanceModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Validation States
    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [showValidationModal, setShowValidationModal] = useState(false);

    // Fetch Provinces on Mount
    useEffect(() => {
        setIsLoading(prev => ({ ...prev, prov: true }));
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Error fetching provinces:", err))
            .finally(() => setIsLoading(prev => ({ ...prev, prov: false })));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "quantity" ? (parseInt(value) || "") : value
        }));

        // Clear field validation error when typed
        if (invalidFields.includes(name)) {
            setInvalidFields(prev => prev.filter(f => f !== name));
        }
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setFormData(prev => ({
            ...prev,
            provinceId: id,
            provinceName: id ? name : "",
            regencyId: "",
            regencyName: "",
            districtId: "",
            districtName: ""
        }));

        if (invalidFields.includes("provinceId")) {
            setInvalidFields(prev => prev.filter(f => f !== "provinceId"));
        }

        setRegencies([]);
        setDistricts([]);

        if (id) {
            setIsLoading(prev => ({ ...prev, reg: true }));
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`)
                .then(res => res.json())
                .then(data => setRegencies(data))
                .catch(err => console.error("Error fetching regencies:", err))
                .finally(() => setIsLoading(prev => ({ ...prev, reg: false })));
        }
    };

    const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setFormData(prev => ({
            ...prev,
            regencyId: id,
            regencyName: id ? name : "",
            districtId: "",
            districtName: ""
        }));

        if (invalidFields.includes("regencyId")) {
            setInvalidFields(prev => prev.filter(f => f !== "regencyId"));
        }

        setDistricts([]);

        if (id) {
            setIsLoading(prev => ({ ...prev, dist: true }));
            fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`)
                .then(res => res.json())
                .then(data => setDistricts(data))
                .catch(err => console.error("Error fetching districts:", err))
                .finally(() => setIsLoading(prev => ({ ...prev, dist: false })));
        }
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setFormData(prev => ({
            ...prev,
            districtId: id,
            districtName: id ? name : ""
        }));

        if (invalidFields.includes("districtId")) {
            setInvalidFields(prev => prev.filter(f => f !== "districtId"));
        }
    };

    const total = productPrice * (Number(formData.quantity) || 0);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
    };

    const handleCheckout = () => {
        // Collect invalid fields
        const newInvalidFields: string[] = [];

        if (!formData.name.trim()) newInvalidFields.push("name");
        if (!formData.provinceId) newInvalidFields.push("provinceId");
        if (!formData.regencyId) newInvalidFields.push("regencyId");
        if (!formData.districtId) newInvalidFields.push("districtId");
        if (!formData.addressDetail.trim()) newInvalidFields.push("addressDetail");
        if (!formData.date) newInvalidFields.push("date");

        const qty = Number(formData.quantity);
        if (isNaN(qty) || qty < 1) newInvalidFields.push("quantity");

        // UI Feedback if any required fields are missing
        if (newInvalidFields.length > 0) {
            setInvalidFields(newInvalidFields);
            setShowValidationModal(true);
            return;
        }

        setInvalidFields([]);
        setError("");

        // Check 50km limit for Makanan Basah 
        // Wadaslintang borders Wonosobo, Kebumen, Banjarnegara, Purworejo. We use their Region Codes roughly.
        const validLocalRegencies = ["3307", "3305", "3304", "3306", "3308", "3371"]; // Wonosobo, Kebumen, Banjarnegara, Purworejo, Magelang, Kota Magelang

        if (isNationwideShipping === false && !validLocalRegencies.includes(formData.regencyId)) {
            setShowDistanceModal(true);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
            return;
        }

        // Build WhatsApp Message
        const phoneNumber = "6287762707319";

        const message = `Halo Admin Dapur Vanny, saya ingin memesan:
------------------------------------------
Produk: ${productName}
Harga Satuan: ${formatCurrency(productPrice)}
Jumlah: ${qty} ${productUnit}
TOTAL: ${formatCurrency(total)}
------------------------------------------
> DATA PEMESAN:
Nama: ${formData.name.trim()}
LOKASI PENGIRIMAN:
Provinsi: ${formData.provinceName}
Kota/Kab: ${formData.regencyName}
Kecamatan: ${formData.districtName}
Alamat Detail: ${formData.addressDetail.trim()}
------------------------------------------
Tanggal Kirim: ${formData.date}
Catatan: ${formData.notes.trim() || "-"}

Apakah pesanan ini bisa segera diproses?`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(waUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <LocationAlertModal
                isOpen={showDistanceModal}
                onClose={() => setShowDistanceModal(false)}
            />

            <ValidationAlertModal
                isOpen={showValidationModal}
                onClose={() => setShowValidationModal(false)}
            />

            {/* Toast Notification */}
            <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 transform ${showToast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2">
                    <span>⚠️</span> Pengiriman area lokal!
                </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-(--dark) mb-6">Formulir Pemesanan</h3>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm mb-6 border border-red-100">
                    <span className="font-semibold px-2">!</span> {error}
                </div>
            )}

            {isNationwideShipping !== undefined && (
                <div className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-2 border shadow-sm ${isNationwideShipping
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                    {isNationwideShipping
                        ? "✈️ Bisa dikirim ke seluruh Indonesia"
                        : "⚠️ Pengiriman terbatas area lokal"}
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
                        className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition border ${invalidFields.includes("name")
                            ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                            }`}
                        placeholder="Masukkan nama Anda"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Provinsi <span className="text-red-500">*</span></label>
                        <select
                            value={formData.provinceId}
                            onChange={handleProvinceChange}
                            className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition bg-white border ${invalidFields.includes("provinceId")
                                ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                                : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                                }`}
                        >
                            <option value="">Pilih Provinsi</option>
                            {provinces.map(prov => (
                                <option key={prov.id} value={prov.id}>{prov.name}</option>
                            ))}
                        </select>
                        {isLoading.prov && <p className="text-xs text-gray-500 mt-1">Memuat provinsi...</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Kota/Kabupaten <span className="text-red-500">*</span></label>
                        <select
                            value={formData.regencyId}
                            onChange={handleRegencyChange}
                            disabled={!formData.provinceId}
                            className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition disabled:bg-gray-100 disabled:text-gray-400 bg-white border ${invalidFields.includes("regencyId")
                                ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                                : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                                }`}
                        >
                            <option value="">Pilih Kota/Kab</option>
                            {regencies.map(reg => (
                                <option key={reg.id} value={reg.id}>{reg.name}</option>
                            ))}
                        </select>
                        {isLoading.reg && <p className="text-xs text-gray-500 mt-1">Memuat kota...</p>}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Kecamatan <span className="text-red-500">*</span></label>
                        <select
                            value={formData.districtId}
                            onChange={handleDistrictChange}
                            disabled={!formData.regencyId}
                            className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition disabled:bg-gray-100 disabled:text-gray-400 bg-white border ${invalidFields.includes("districtId")
                                ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                                : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                                }`}
                        >
                            <option value="">Pilih Kecamatan</option>
                            {districts.map(dist => (
                                <option key={dist.id} value={dist.id}>{dist.name}</option>
                            ))}
                        </select>
                        {isLoading.dist && <p className="text-xs text-gray-500 mt-1">Memuat kecamatan...</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Detail Alamat <span className="text-red-500">*</span></label>
                    <textarea
                        name="addressDetail"
                        value={formData.addressDetail}
                        onChange={handleChange}
                        className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition resize-y border ${invalidFields.includes("addressDetail")
                            ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                            }`}
                        placeholder="Contoh: Jl. Sudirman No 123, RT 01/RW 02, Patokan sebelah masjid..."
                        rows={2}
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
                            className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition border ${invalidFields.includes("quantity")
                                ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                                : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className={`w-full rounded-xl px-4 py-3 outline-none text-sm transition border ${invalidFields.includes("date")
                                ? "border-red-500 ring-1 ring-red-500 bg-red-50"
                                : "border-gray-300 focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                                }`}
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
                    <span className="text-2xl font-bold text-(--dark)">{formatCurrency(total)}</span>
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
