export interface IImageHandler {
    generateImage(id: string): Promise<string>;
    UploadImage(imageUrl: string): Promise<string>;
}