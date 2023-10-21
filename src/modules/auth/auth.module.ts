import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserModule } from 'src/modules/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from './auth.controller'
import { TokenModule } from '../token/token.module'
import { BlacklistTokenMiddleware } from './auth.middleware'

@Module({
    imports: [UserModule, TokenModule],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BlacklistTokenMiddleware)
            .forRoutes(
                { path: 'auth/verify', method: RequestMethod.GET },
                { path: 'auth/logout', method: RequestMethod.GET }
            )
    }
}
