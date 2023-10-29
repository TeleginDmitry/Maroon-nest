import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ProductModule } from '../product/product.module'
import { UserModule } from '../user/user.module'
import { DatabaseModule } from '../database/database.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { JwtStrategy } from './jwt.strategy'
import { CookieParserMiddleware } from './cookie-parser.middleware'

@Module({
    imports: [
        DatabaseModule,
        ProductModule,
        UserModule,
        AuthModule,
        TokenModule
    ],
    providers: [JwtStrategy]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CookieParserMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL })
    }
}
