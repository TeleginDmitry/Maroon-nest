import { Injectable } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'
import {
    CustomHeadersDto,
    LoginUserDto,
    RegisterUserDto
} from '../../shared/dto/auth/auth.dto'
import { TokenService } from '../token/token.service'
import { UserValidatedResponseDto } from 'src/shared/dto/user/user.dto'
import selectException from 'src/shared/exceptions/exceptions'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async register(
        { email, image, name, password }: RegisterUserDto,
        response
    ) {
        const user = await this.userService.createUser({
            email,
            image,
            name,
            password
        })

        const refresh_token = await this.tokenService.createAccessToken({
            email: user.email
        })
        const access_token = await this.tokenService.createAccessToken({
            email: user.email
        })

        response.cookie('refresh_token', refresh_token, { httpOnly: true })

        return { user, access_token }
    }

    async login({ email, password }: LoginUserDto, response) {
        const user = await this.userService.validateUser({ email, password })

        const refresh_token = await this.tokenService.createAccessToken({
            email: user.email
        })
        const access_token = await this.tokenService.createAccessToken({
            email: user.email
        })

        response.cookie('refresh_token', refresh_token, { httpOnly: true })

        return { user, access_token }
    }

    async verify(request) {
        const email = request.user.user.email

        const user = await this.userService.findUserByEmail(email)

        if (!user) {
            throw selectException('user_email_not_exist')
        }

        return user
    }

    async refresh(cookies, response) {
        const req_refresh_token = cookies.refresh_token

        if (!req_refresh_token) {
            throw selectException('token_not_exist')
        }

        const { user } =
            await this.tokenService.verifyToken<UserValidatedResponseDto>(
                req_refresh_token
            )

        if (!user) {
            throw selectException('incorrect_token')
        }

        const isTokenBlacklisted =
            await this.tokenService.isTokenBlacklisted(req_refresh_token)

        if (isTokenBlacklisted) {
            throw selectException('token_blacklisted')
        }

        await this.tokenService.addToBlacklist(req_refresh_token)

        const refresh_token = await this.tokenService.createAccessToken({
            email: user.email
        })
        const access_token = await this.tokenService.createAccessToken({
            email: user.email
        })

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
