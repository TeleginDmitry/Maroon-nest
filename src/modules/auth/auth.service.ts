import { Injectable } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async registerUser(dto: RegisterUserDto) {
        return this.userService.createUser(dto)
    }

    async loginUser(dto: LoginUserDto) {
        return this.userService.validateUser(dto)
    }
}
