import { Injectable } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import { CustomHeadersDto, LoginUserDto, RegisterUserDto } from './dto/auth.dto'
import { TokenService } from '../token/token.service'
import { UserValidatedResponseDto } from 'src/shared/dto/user.dto'
import selectException from 'src/shared/exceptions/exceptions'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async register(dto: RegisterUserDto, response) {
        const user = await this.userService.createUser(dto)

        const refresh_token = await this.tokenService.createAccessToken(user)
        const access_token = await this.tokenService.createAccessToken(user)

        response.cookie('refresh_token', refresh_token, { httpOnly: true })

        return { user, access_token }
    }

    async login(dto: LoginUserDto, response) {
        const user = await this.userService.validateUser(dto)

        const refresh_token = await this.tokenService.createAccessToken(user)
        const access_token = await this.tokenService.createAccessToken(user)

        response.cookie('refresh_token', refresh_token, { httpOnly: true })

        return { user, access_token }
    }

    async refresh(cookies, response) {
        const req_refresh_token = cookies.refresh_token

        if (!req_refresh_token) {
            throw selectException('token_not_exist')
        }

        const isTokenBlacklisted =
            await this.tokenService.isTokenBlacklisted(req_refresh_token)

        if (isTokenBlacklisted) {
            throw selectException('token_blacklisted')
        }

        const { user } =
            await this.tokenService.verifyToken<UserValidatedResponseDto>(
                req_refresh_token
            )

        if (!user) {
            throw selectException('incorrect_token')
        }

        await this.tokenService.addToBlacklist(req_refresh_token)

        const refresh_token = await this.tokenService.createAccessToken(user)
        const access_token = await this.tokenService.createAccessToken(user)

        response.cookie('refresh_token', refresh_token, { httpOnly: true })

        return { access_token }
    }

    async logout(cookies, headers: CustomHeadersDto) {
        const access_token = headers.authorization.split('Bearer ')[1]
        const refresh_token = cookies.refresh_token

        await this.tokenService.addToBlacklist(access_token)
        await this.tokenService.addToBlacklist(refresh_token)
    }
}
