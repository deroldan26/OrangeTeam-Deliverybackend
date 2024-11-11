import { cloudinary } from '../cloudinary/cloudinary.js';

export class ImageUrlGenerator {
  public async generateUrl(id: string): Promise<string> {
    const url = cloudinary.url(id)
    return url; 
  }
}