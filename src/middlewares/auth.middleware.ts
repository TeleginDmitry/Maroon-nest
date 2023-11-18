import { Injectable, NestMiddleware } from '@nestjs/common'
import { TokenService } from '../modules/token/token.service'
import { Request, Response, NextFunction } from 'express'
import selectException from 'src/shared/exceptions/exceptions'

@Injectable()
export class BlacklistTokenMiddleware implements NestMiddleware {
    constructor(private readonly tokenService: TokenService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization

        if (!authorization) {
            throw selectException('token_not_exist')
        }

        const token = authorization.split('Bearer ')[1]

        if (!token) {
            throw selectException('token_not_exist')
        }

        const isBlacklisted = await this.tokenService.isTokenBlacklisted(token)

        if (isBlacklisted) {
            throw selectException('token_blacklisted')
        }

        next()
    }
}
