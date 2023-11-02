import {
    Body,
    Controller,
    UsePipes,
    ValidationPipe,
    Patch,
    Request,
    UseGuards,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/guards/jwt.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { selectConfiguration } from 'src/shared/configurations/configurations'
import { diskStorage } from 'multer'
import { ChangeUserDto } from 'src/shared/dto/user/user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch()
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard())
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: `./${selectConfiguration('images_folder')}`,
                filename: (req, file, cb) => {
                    cb(null, file.originalname)
                }
            })
        })
    )
    changeUser(
        @Body() dto: ChangeUserDto,
        @Request() request,
        @UploadedFile() image: Express.Multer.File
    ) {
        if (image) {
            dto.image = image.path
        }

        return this.userService.changeUser(dto, request)
    }
}
