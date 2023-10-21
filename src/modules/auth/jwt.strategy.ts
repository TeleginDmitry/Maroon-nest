import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { selectConfiguration } from 'src/shared/configurations/configurations'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: selectConfiguration('secret_jwt')
        })
    }

    async validate(dto: any) {
        const user = await this.userService.validateUser(dto)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
