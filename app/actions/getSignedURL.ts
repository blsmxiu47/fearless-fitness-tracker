"use server";

// import { auth } from "@/auth";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export async function getSignedURL() {
    // const session = await auth();
    // if (!session) {
    //     return { failure: "Not authenticated" };
    // }

    const putObjCmd = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: "test",
        ContentType: "text/csv",
    });

    const signedUrl = await getSignedUrl(s3, putObjCmd, {
        expiresIn: 60,
    });

    return { success: { url: signedUrl } }
} 