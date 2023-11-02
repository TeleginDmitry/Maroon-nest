import { Injectable, BadRequestException } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'
import * as path from 'path'
import { selectConfiguration } from 'src/shared/configurations/configurations'

@Injectable()
export class ImageService {
    upload(imageFile: Express.Multer.File): string {
        if (!imageFile) {
            throw new BadRequestException('Файл изображения отсутствует')
        }

        const uniqueFileName = `${uuidv4()}${path.extname(
            imageFile.originalname
        )}`

        const imagesFolder = selectConfiguration('images_folder')
        const filePath = path.join(imagesFolder, uniqueFileName)

        fs.writeFileSync(filePath, imageFile.buffer)

        return filePath
    }
}
