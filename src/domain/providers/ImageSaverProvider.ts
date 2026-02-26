export abstract class ImageSaverProvider {
    abstract saveImage({ image, path }: { image: string, path: string }): Promise<string>;
}