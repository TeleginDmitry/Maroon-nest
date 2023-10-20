import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/modules/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
