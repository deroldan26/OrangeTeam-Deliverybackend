import { cloudinary } from '../cloudinary/cloudinary.js';

export class ImageUrlGenerator {

  public async generateUrl(id: string): Promise<string> {
    const url = cloudinary.url(id)
    return url; 
  }

  public async UploadImage(imageUrl: string): Promise<string> {
    try {
      const uploadResult = await cloudinary.uploader.upload(imageUrl);
      return uploadResult.public_id
    } catch (error) {
      return error.message      
    }
  }
  
}