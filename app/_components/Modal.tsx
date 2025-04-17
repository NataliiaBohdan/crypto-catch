import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Props {
  coinId: string;
  coinName: string;
  coinImage: string;
  onClose: () => void;
}

export default function CryptoModal({
  coinId,
  onClose,
  coinName,
  coinImage,
}: Props) {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();
        const prices = data.prices.map(
          ([timestamp, price]: [number, number]) => ({
            time: new Date(timestamp).toLocaleDateString("en-GB"),
            price,
          })
        );

        const last7Days = prices.slice(-7);

        const priceChangeColor =
          last7Days[last7Days.length - 1].price > last7Days[0].price
            ? "#22c55e"
            : "#ef4444";

        setChartData({
          labels: last7Days.map((p: any) => p.time),
          datasets: [
            {
              data: last7Days.map((p: any) => p.price),
              borderColor: priceChangeColor,
              backgroundColor:
                priceChangeColor === "#22c55e"
                  ? "rgba(34, 197, 94, 0.2)"
                  : "rgba(239, 68, 68, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [coinId]);

  return (
    <div
      className="fixed inset-0 bg-black  flex justify-center items-center z-[999]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-black p-8 rounded-lg w-[90%] max-w-[600px] border-green-300 border-2">
        <button
          onClick={onClose}
          className="float-right text-green-300 hover:text-green-500"
        >
          BACK
        </button>
        <div className="flex flex-raw gap-4">
          <h2 className="text-white font-bold pl-42 pb-8">
            Price for {coinName}
          </h2>
          <img
            src={coinImage}
            alt={coinName}
            className="w-6 h-6  animate-bounce  "
          />
        </div>
        {loading ? (
          <p className="text-white">Loading chart...</p>
        ) : (
          <Line
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              responsive: true,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "",
                    color: "white",
                  },
                  ticks: {
                    color: "rgb(34 197 94)",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "",
                    color: "white",
                  },
                  ticks: {
                    callback: (value) => `$${(value as number).toFixed(2)}`,
                    color: "rgb(34 197 94)",
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
