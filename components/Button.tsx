import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "outline";
}

export default function Button({ children, variant = "primary" }: ButtonProps) {

    const styles =
        variant === "primary"
            ? "bg-(--primary) text-white"
            : "border border-(--primary) text-(--primary)";

    return (
        <button
            className={`${styles} px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition`}
        >
            {children}
        </button>
    );
}