import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
    Patch,
    UploadedFile,
    UseInterceptors,
    Request,
    UseGuards,
    ParseFilePipe,
    FileTypeValidator
} from '@nestjs/common'
import { UserService } from './user.service'
import { ChangeUserDto, CreateUserDto } from './dto/user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from 'src/guards/jwt.guard'
import { diskStorage } from 'multer'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }

    @Patch()
    @UsePipes(new ValidationPipe())
    @UseGuards(new JwtAuthGuard())
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, file.originalname)
                }
            })
        })
    )
    changeUser(
        @Body() dto: ChangeUserDto,
        @Request() request,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType: /^image\/(jpg|jpeg|png)$/
                    })
                ]
            })
        )
        image: Express.Multer.File
    ) {
        if (image) {
            dto.image = `${request.protocol}://${request.get('host')}/${
                image.path
            }`
        }

        return this.userService.changeUser(dto, request)
    }
}
