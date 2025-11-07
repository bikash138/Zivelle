import { prisma } from "@repo/database/prisma";

export async function searchItems(query: string, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const formattedQuery = query.trim().split(" ").join(" & "); // converts "black hoodie" → "black & hoodie"
  console.log("Function call Received: ", query)
  return prisma.$queryRawUnsafe(
    `
    SELECT id, title, category, price, thumbnail,
           ts_rank("searchVector", to_tsquery('english', $1)) AS rank
    FROM "Item"
    WHERE "searchVector" @@ to_tsquery('english', $1)
    ORDER BY rank DESC
    LIMIT $2 OFFSET $3;
    `,
    formattedQuery,
    limit,
    offset
  );
}
