import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database/prisma';
import getUserId from "@/lib/getUserId"

//Get User Profile Details
export async function GET(req: NextRequest){
  try{
    const {userId, error} = await getUserId(req)
    if(error){
      return error
    }
    const userDetails = await prisma.customer.findUnique({
      where:{
        id: userId
      },
      select:{
        name: true,
        createdAt: true,
        email: true,
        addresses: true
      }
    })
    return NextResponse.json({
      success:true,
      userDetails
    })
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while getting customer details",
      error: error
     });
  }
}

//Update user profile details
export async function PATCH(req: NextRequest) {
  try{
    const {userId, error} = await getUserId(req)
    if(error){
      return error
    }
    
    const body = await req.json()
    const { name, email } = body 

    const updatedUser = await prisma.customer.update({
      where:{
        id: userId
      },
      data:{
        name, email
      },
      select:{
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({ 
      success: true,
      message: "Profile Updated Successfully",
      userDetails: updatedUser
    }, { status: 200 });
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while updating customer",
      error: error
     }, {status: 500});
  }
}