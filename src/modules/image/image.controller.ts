import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { ImageService } from './image.service'

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    uploadImage(@UploadedFile() imageFile: Express.Multer.File) {
        const imagePath = this.imageService.upload(imageFile)
        return { image: imagePath }
    }
}
