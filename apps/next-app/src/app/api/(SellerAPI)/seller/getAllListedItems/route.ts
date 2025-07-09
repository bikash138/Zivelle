import { prisma } from "@repo/database/prisma"
import { NextResponse } from "next/server"
import getUserId from "@/lib/getUserId"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest){
    try{
        const {userId, error} = await getUserId(req)
        if(error){
            return error
        }
        const allListedItems = await prisma.item.findMany({
            where:{
                adminId: userId
            },
        })
        return NextResponse.json({
            success: true,
            message: "All listed items fetched",
            allListedItems
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success:false,
            message: "Internal Server Error",
            error: error
        },{status: 500})
    }
}