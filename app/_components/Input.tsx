"use client";
import React from "react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function CryptoSearch({ search, onSearchChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search crypto..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="border-2 border-green-500 p-2 leading-none size-fit w-96 rounded-md text-white focus:border-green-300 focus:outline focus:outline-green-300 hover:bg-white focus:bg-white hover:text-stone-900 focus:text-stone-900"
    />
  );
}
