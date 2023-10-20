import {
    Body,
    Controller,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() dto: RegisterUserDto) {
        return this.authService.registerUser(dto)
    }

    @Post('login')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    login(@Body() dto: LoginUserDto) {
        return this.authService.loginUser(dto)
    }
}
