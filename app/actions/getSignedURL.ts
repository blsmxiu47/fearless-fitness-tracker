"use server";

// import { auth } from "@/auth";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const generateFileName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString("hex");
}

const acceptedTypes = [
    "text/csv"
]

const maxFileSize = 1024 * 1024 * 100; // 100MB

export async function getSignedURL(type: string, size: number, checksum: string) {
    // const session = await auth();
    // if (!session) {
    //     return { failure: "Not authenticated" };
    // }

    const putObjCmd = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: generateFileName(),
        ContentType: type,
        ContentLength: size,
        ChecksumSHA256: checksum,
        Metadata: {
            // userId: session.user.id.toString(),
            userId: "1", // TODO: replace with above or similar
        }
    });

    if (!acceptedTypes.includes(type)) {
        return { failure: "Invalid file type" };
    }

    if (size > maxFileSize) {
        return { failure: "File too large" };
    }

    const signedUrl = await getSignedUrl(s3, putObjCmd, {
        expiresIn: 60,
    });
    
    return { success: { url: signedUrl } }
} 