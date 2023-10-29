import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '../database/database.module'
import { selectConfiguration } from 'src/shared/configurations/configurations'

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: selectConfiguration('secret_jwt')
        })
    ],
    providers: [TokenService, JwtService],
    exports: [TokenService]
})
export class TokenModule {}
