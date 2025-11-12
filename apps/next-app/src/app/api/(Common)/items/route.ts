import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

type CountResult = {
  count: number
}[]

interface ProductItem {
  id: number
  title: string
  price: number
  originalPrice: number
  thumbnail: string
  category: string
  subCategory: string
  createdAt: Date
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const searchQuery = searchParams.get("search")?.trim() || "";
    const limit = 10;
    const skip = (page - 1) * limit;

    let paginatedItems: ProductItem[] = [];
    let totalItems = 0;
    if (searchQuery) {
      const tsQuery = searchQuery.split(" ").join(" & ");
      const [items, countResult] = await Promise.all([
        prisma.$queryRawUnsafe<ProductItem[]>(
          `
          SELECT id, title, price, "originalPrice", thumbnail, category, "subCategory", "createdAt",
            ts_rank("searchVector", to_tsquery('english', $1)) AS rank
          FROM "Item"
          WHERE "searchVector" @@ to_tsquery('english', $1)
          ORDER BY rank DESC
          LIMIT $2 OFFSET $3
        `,
          tsQuery,
          limit,
          skip
        ),
        prisma.$queryRawUnsafe<CountResult[]>(
          `
          SELECT COUNT(*)::int AS count
          FROM "Item"
          WHERE "searchVector" @@ to_tsquery('english', $1)
        `,
          tsQuery
        ),
      ]);

      paginatedItems = items
      // eslint-disable-next-line
      //@ts-ignore
      totalItems = countResult[0].count
    } else {
      // ✅ NORMAL MODE (NO SEARCH)
      const [items, count] = await Promise.all([
        prisma.item.findMany({
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            price: true,
            originalPrice: true,
            thumbnail: true,
            category: true,
            subCategory: true,
            createdAt: true,
          },
        }),
        prisma.item.count(),
      ]);

      paginatedItems = items;
      totalItems = count;
    }
    console.log(totalItems)
    return NextResponse.json({
      items: paginatedItems,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
        totalItems,
        limit,
      },
    });
  } catch (error) {
    console.error("❌ Error in /api/items:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
