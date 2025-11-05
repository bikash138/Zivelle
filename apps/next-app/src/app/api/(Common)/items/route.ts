import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/database/prisma";

export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = 10;
        const skip = (page-1)*limit
        const [paginatedItems, totalItems] = await Promise.all([
            await prisma.item.findMany({
                skip,
                take: limit,
                orderBy:{
                    createdAt: "desc"
                },
                select:{
                    id: true,
                    thumbnail: true,
                    title: true,
                    description: true,
                    size: true,
                    price: true,
                    originalPrice: true,
                    category: true,
                    subCategory: true,
                    createdAt: true
                },
            }),
            prisma.item.count()
        ])

        return NextResponse.json({
            paginatedItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit)
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Item cannot be fetched"
        })
    }
}