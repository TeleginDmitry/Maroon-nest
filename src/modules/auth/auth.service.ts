import { Injectable } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto'
import { TokenService } from '../token/token.service'
import selectException from 'src/shared/exceptions/exceptions'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async registerUser(dto: RegisterUserDto) {
        const user = await this.userService.createUser(dto)

        const token = await this.tokenService.generateJwtToken(user)

        return { ...user, token }
    }

    async loginUser(dto: LoginUserDto, oldToken: string) {
        if (oldToken) {
            const isExistBlackList =
                await this.tokenService.isTokenBlacklisted(oldToken)

            if (!isExistBlackList) {
                await this.tokenService.addToBlacklist(oldToken)
            } else {
                throw selectException('token_blacklisted')
            }
        }

        const user = await this.userService.validateUser(dto)

        const token = await this.tokenService.generateJwtToken(user)

        return { ...user, token }
    }

    async verifyUser(token: string) {
        return this.tokenService.verifyJwtToken(token)
    }

    async logoutUser(token: string) {
        this.tokenService.addToBlacklist(token)
    }
}
