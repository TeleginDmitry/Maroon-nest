import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto)
    }
}
