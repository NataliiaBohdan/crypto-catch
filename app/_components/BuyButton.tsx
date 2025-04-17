"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function BuyButton() {
  const router = useRouter();

  const handleBuyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/login");
  };

  return (
    <button
      onClick={handleBuyClick}
      className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
    >
      Buy Now
    </button>
  );
}
