import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { selectConfiguration } from 'src/shared/configurations/configurations'
import { ValidateJWTDto } from './dto/app.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: selectConfiguration('secret_jwt')
        })
    }

    async validate(user: ValidateJWTDto) {
        return user
    }
}
