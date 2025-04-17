"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import CryptoSearch from "./Input";
import CryptoModal from "./Modal";
import Logo from "./Logo";
import BuyButton from "./BuyButton";
import Image from "next/image";

interface Crypto {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_24h: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CryptoList() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR<Crypto[]>("./api/coins", fetcher);

  const [search, setSearch] = useState<string>("");
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [selectedCoinName, setSelectedCoinName] = useState<string | null>(null);
  const [selectedCoinImage, setSelectedCoinImage] = useState<string | null>(
    null
  );
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName);
  }, []);

  const filteredCryptos =
    data?.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  const getPriceChangeColor = (coin: Crypto) => {
    if (coin.price_change_24h > 0) return "text-green-500";
    if (coin.price_change_24h < 0) return "text-red-500";
    return "text-gray-700";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-green-500">
      <div className="flex flex-row justify-between items-center mb-6">
        <Logo />

        <CryptoSearch search={search} onSearchChange={setSearch} />

        {(session?.user?.name || userName) && (
          <div className="text-md text-green-500">
            Hello,&nbsp;
            <span className="font-bold">
              {session?.user?.name ? session.user.name : userName}
            </span>
            !
          </div>
        )}
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error fetching data</p>}

      {filteredCryptos.map((coin) => (
        <div
          key={coin.id}
          onClick={() => {
            setSelectedCoinId(coin.id);
            setSelectedCoinName(coin.name);
            setSelectedCoinImage(coin.image);
          }}
          className="flex items-center gap-4 mb-2 cursor-pointer border border-gray-200 p-2.5 rounded-lg hover:bg-blue-50 transition"
        >
          <Image src={coin.image} alt={coin.name} width={30} height={30} />
          <span className="flex-1 font-bold">{coin.name}</span>
          <strong className={`${getPriceChangeColor(coin)}`}>
            ${coin.current_price.toFixed(2)}
          </strong>
          <span
            className={`${getPriceChangeColor(
              coin
            )} ml-2 font-semibold text-sm`}
          >
            ({coin.price_change_24h > 0 ? "+" : ""}
            {coin.price_change_24h.toFixed(2)}%)
          </span>
          <BuyButton />
        </div>
      ))}

      {selectedCoinId && selectedCoinName && selectedCoinImage && (
        <CryptoModal
          coinId={selectedCoinId}
          onClose={() => {
            setSelectedCoinId(null);
            setSelectedCoinName(null);
            setSelectedCoinImage(null);
          }}
          coinName={selectedCoinName}
          coinImage={selectedCoinImage}
        />
      )}
    </div>
  );
}
