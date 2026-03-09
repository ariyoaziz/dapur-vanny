import { useEffect } from "react";
import Link from "next/link";

interface LocationAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LocationAlertModal({ isOpen, onClose }: LocationAlertModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
                role="dialog"
                aria-modal="true"
            >
                <div className="relative p-6 sm:p-8">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                        aria-label="Tutup Peringatan"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex flex-col items-center text-center mt-2">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-amber-200">
                            <span className="text-3xl">⚠️</span>
                        </div>

                        <h3 className="text-xl font-bold text-(--dark) mb-3">
                            Lokasi Terlalu Jauh untuk Makanan Basah
                        </h3>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Demi menjaga kualitas rasa, Makanan Basah hanya tersedia untuk radius 50km dari Wadaslintang. Silakan coba menu Makanan Kering kami yang bisa dikirim ke seluruh Indonesia!
                        </p>

                        <div className="w-full space-y-3">
                            <Link
                                href="/makanan-kering"
                                className="block w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors shadow-sm"
                            >
                                Lihat Makanan Kering
                            </Link>
                            <button
                                onClick={onClose}
                                className="block w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-medium transition-colors border border-gray-200"
                            >
                                Kembali
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
