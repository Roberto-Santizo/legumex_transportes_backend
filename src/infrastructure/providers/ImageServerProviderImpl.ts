import { ImageSaverProvider } from '../../domain/providers/providers';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';
import sharp from 'sharp';

dotenv.config({ quiet: true });

export class ImageSaverProviderImpl implements ImageSaverProvider {
    public s3: S3Client;
    
    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            }
        });
    }

    async saveImage({ image, path }: { image: string, path: string }): Promise<string> {
        let base64image = image.split(';base64,').pop();
        const buffer = Buffer.from(base64image, "base64");
        const timestamp = Date.now().toString();
        const uniqueId = uuidv4();
        const name = `${path}/${timestamp}-${uniqueId}.png`;

         const compressedBuffer = await sharp(buffer).resize({ width: 720 }).jpeg({ quality: 70 }).toBuffer();

        await this.s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: name,
                Body: compressedBuffer,
                ACL: 'public-read',
                ContentType: 'image/png'
            })
        );

        return name;
    }

}