import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database/prisma';

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
    const { 
        email,
        password,
        name,
        store
     } = body;

    // if (!id) {
    //     return NextResponse.json({ 
    //         message: 'Missing Clerk user id' 
    //     }, { status: 400 });
    // }

    const seller = await prisma.seller.create({
      data:{
        email,
        password,
        name,
        store
      }
    });

    // if (!user) {
    //   user = await prisma.user.create({
    //     data: {
    //       clerkId: id,
    //       email: email_addresses?.[0]?.email_address || null,
    //       name: first_name || null,
    //       photo: profile_image_url || null,
    //     },
    //   });
    // }

    return NextResponse.json({ seller });
  }catch(error){
    console.log(error)
    return NextResponse.json({ 
      message: "Something went wrong while creating seller",
      error: error
     });
  }
}