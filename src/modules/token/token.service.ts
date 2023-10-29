import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { selectConfiguration } from 'src/shared/configurations/configurations'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService
    ) {}

    async createAccessToken(user) {
        return this.jwtService.sign(
            { user },
            {
                expiresIn: selectConfiguration('expire_access_token'),
                secret: selectConfiguration('secret_jwt')
            }
        )
    }

    async createRefreshToken(user) {
        return this.jwtService.sign(
            { user },
            {
                expiresIn: selectConfiguration('expire_refresh_token'),
                secret: selectConfiguration('secret_jwt')
            }
        )
    }

    async verifyToken<T extends object>(token: string): Promise<T> {
        return this.jwtService.verify(token, {
            secret: selectConfiguration('secret_jwt')
        })
    }

    async addToBlacklist(token: string) {
        return this.databaseService.blacklistToken.create({
            data: { token }
        })
    }

    async isTokenBlacklisted(token: string) {
        const blacklistedToken =
            await this.databaseService.blacklistToken.findFirst({
                where: { token }
            })
        return !!blacklistedToken
    }
}
