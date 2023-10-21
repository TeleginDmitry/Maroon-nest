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

    async generateJwtToken(user: any) {
        return this.jwtService.sign(
            { user },
            {
                secret: selectConfiguration('secret_jwt'),
                expiresIn: selectConfiguration('expire_jwt')
            }
        )
    }

    async verifyJwtToken(token: string) {
        return this.jwtService.decode(token)
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
