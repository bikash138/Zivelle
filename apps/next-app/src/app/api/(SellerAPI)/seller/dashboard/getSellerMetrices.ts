import redis from "@/lib/redis";
import { prisma } from "@repo/database/prisma";
import { SellerMetrics } from "@/types/sellerTypes";

export async function getSellerMetrices(sellerId:string){
    try{
        const cacheKey = `dashboard:${sellerId}`;
        const cached = await redis.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }
        
        const orders = await prisma.orderItem.findMany({
            where:{
                sellerId
            }
        })
        const items = await prisma.item.findMany({
            where:{
                adminId: sellerId
            }
        })
        const recentOrders = await prisma.orderItem.findMany({
            where: {
                sellerId
            },
            orderBy: {
                order: {
                    placedOn: 'desc' 
                }
            },
            take: 5, // Limit to 5 orders
            select: {
                id: true,
                price: true,
                order: {
                    select: {
                        id:true,
                        orderStatus: true,
                    }
                },
                item: {
                    select: {
                        title: true,
                        thumbnail: true
                    }
                }
            }
        })

        const topSellingProducts = await prisma.item.findMany({
            where: {
                adminId: sellerId,
                soldCount: { gt: 0 }
            },
            orderBy: {
                soldCount: 'desc'
            },
            take: 5,
            select: {
                id: true,
                title: true,
                price: true,
                thumbnail: true,
                soldCount: true
            }
        });
        const result: SellerMetrics = {
            recentOrders,
            topSellingProducts,
            revenue: orders.reduce((sum, o) => sum + o.price, 0),
            totalOrders: orders.length,
            activeListings: items.length,
        }

        // Cache result for 60 seconds
        await redis.set(cacheKey, JSON.stringify(result), "EX", 60);

        return result;
    }catch(error){
        console.log(error)
        console.log("Something went wrong while getting metrices")
        return null
    }
}