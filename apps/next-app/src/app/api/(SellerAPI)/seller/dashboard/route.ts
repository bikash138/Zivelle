import getUserIdToken from "@/lib/getUserIdToken";
import { getSellerMetrices } from "./getSellerMetrices";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
): Promise<void | NextResponse<{ message: string; success: boolean; }>> {

  try{
    const token = req.cookies.get('token')
    if (!token) {
      return NextResponse.json({ 
        message: "Token is required", 
        success: false
      }, { status: 400 });
    }
    const {userId} = await getUserIdToken(token?.value)

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID not found"
      }, { status: 400 });
    }

    const data = await getSellerMetrices(userId);
    return NextResponse.json({
      success: true,
      data,
      message: "Data Fetched success"
    }, { status: 200 });
  }catch(error){
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Failed to fetch dashboard data"
    }, {status: 500})
  }
}
