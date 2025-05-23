import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching coins:", error);
    return NextResponse.error();
  }
}
