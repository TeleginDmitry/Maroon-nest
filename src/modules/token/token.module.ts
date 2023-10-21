import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '../database/database.module'

@Module({
    imports: [DatabaseModule],
    providers: [TokenService, JwtService],
    exports: [TokenService]
})
export class TokenModule {}
