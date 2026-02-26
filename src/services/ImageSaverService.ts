import { ImageSaverProvider } from "../domain/providers/providers";

export class ImageSaverService {
    constructor(private service: ImageSaverProvider) { }

    async saveImage({ image, path }: { image: string, path: string }) {
        return await this.service.saveImage({ image, path });
    }
}