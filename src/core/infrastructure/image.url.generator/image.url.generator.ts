import { v2 as cloudinary } from 'cloudinary';

export class ImageUrlGenerator {
  public async generateUrl(id: string): Promise<string> {
    const url = cloudinary.url(id)
    return url;
  }
}