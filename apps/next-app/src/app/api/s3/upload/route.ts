import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3 } from "@/lib/s3Client";
import getUserIdFromRequest from "@/lib/getUserId";

export async function POST(req: NextRequest){
    try{
        const { userId, error } = await getUserIdFromRequest(req);
        if (error) {
            return error;
        }
        const  body = await req.json()
        const {contentType, fileName, size} = body
        const uniqueKey = `${userId}/${uuidv4()}-${fileName}`
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: uniqueKey,
            ContentType: contentType,
            ContentLength: size
        })

        const preSignedUrl = await getSignedUrl(S3, command, {
            expiresIn: 360
        })

        const bucket = process.env.S3_BUCKET_NAME!;

        const permanentUrl = `https://${bucket}.fly.storage.tigris.dev/${uniqueKey}`;

        return NextResponse.json({ 
            preSignedUrl,
            uniqueKey,
            permanentUrl
        }, {status: 200})
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Somethin went wrong while uploading the file"
        }, {status: 500})
    }
}