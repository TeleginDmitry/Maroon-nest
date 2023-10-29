import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
    Headers,
    UseInterceptors,
    UploadedFile,
    Request,
    UseGuards,
    Response,
    ParseFilePipe,
    FileTypeValidator
} from '@nestjs/common'
import { CustomHeadersDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { JwtAuthGuard } from 'src/guards/jwt.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
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
    register(
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
        image: Express.Multer.File,
        @Body() dto: RegisterUserDto,
        @Response({ passthrough: true }) response
    ) {
        dto.image = `${request.protocol}://${request.get('host')}/${image.path}`
        return this.authService.register(dto, response)
    }

    @Post('login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    login(
        @Body() dto: LoginUserDto,
        @Response({ passthrough: true }) response
    ) {
        return this.authService.login(dto, response)
    }

    @Get('refresh')
    refresh(@Request() request, @Response({ passthrough: true }) response) {
        return this.authService.refresh(request.cookies, response)
    }

    @Get('verify')
    @UseGuards(new JwtAuthGuard())
    verify(@Request() request) {
        return request.user
    }

    @Get('logout')
    @UseGuards(new JwtAuthGuard())
    logout(@Request() request, @Headers() headers: CustomHeadersDto) {
        return this.authService.logout(request.cookies, headers)
    }
}
