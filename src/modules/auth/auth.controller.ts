import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UsePipes,
    ValidationPipe,
    Headers
} from '@nestjs/common'
import {
    HeadersUserDto,
    LoginUserDto,
    RegisterUserDto} from './dto/auth.dto'
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
    login(@Body() dto: LoginUserDto, @Headers() headers: HeadersUserDto) {
        const token = headers?.authorization?.split('Bearer ')?.[1]
        return this.authService.loginUser(dto, token)
    }

    @Get('verify')
    verify(@Headers() headers: HeadersUserDto) {
        const token = headers.authorization.split('Bearer ')[1]
        return this.authService.verifyUser(token)
    }

    @Get('logout')
    logout(@Headers() headers: HeadersUserDto) {
        const token = headers.authorization.split('Bearer ')[1]
        return this.authService.logoutUser(token)
    }
}
