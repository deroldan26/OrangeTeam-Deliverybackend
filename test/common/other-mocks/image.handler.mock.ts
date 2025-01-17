import { IImageHandler } from "../../../src/core/application/image.handler/image.handler";

export class ImageHandlerMock implements IImageHandler {
    public static create(): ImageHandlerMock {
        return new ImageHandlerMock();
    }

    public async generateImage(id: string): Promise<string> {
        return `https://www.images.com/${id}`;
    }

    public async UploadImage(imageUrl: string): Promise<string> {
        return 'https://www.images.com/image';
    }
}