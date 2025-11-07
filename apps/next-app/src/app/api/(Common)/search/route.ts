import { searchItems } from "@/lib/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("Search Route hitted")
  const {searchParams} = new URL(req.url)
  const q = searchParams.get('q')
  const page = 1

  if (!q || typeof q !== "string") {
    return NextResponse.json({ 
        error: "Missing search query"
    }, {status: 400});
  }

  try {
    const results = await searchItems(q, Number(page), 10);
    return NextResponse.json({ results }, {status: 200});
  }catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json({ 
        error: "Internal server error" 
    }, {status: 500});
  }
}
