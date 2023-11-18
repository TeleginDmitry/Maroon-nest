import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ProductModule } from '../product/product.module'
import { UserModule } from '../user/user.module'
import { DatabaseModule } from '../database/database.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { JwtStrategy } from './jwt.strategy'
import { FilterModule } from '../filter/filter.module'
import { CookieParserMiddleware } from 'src/middlewares/cookie-parser.middleware'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseImageInterceptor } from 'src/interceptors/response-image.interceptor'
import { PaginationMiddleware } from 'src/middlewares/pagination.middleware'

@Module({
    imports: [
        DatabaseModule,
        ProductModule,
        UserModule,
        AuthModule,
        TokenModule,
        FilterModule
    ],
    providers: [
        JwtStrategy,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseImageInterceptor
        }
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CookieParserMiddleware)
            .forRoutes('*')
            .apply(PaginationMiddleware)
            .forRoutes('*')
    }
}
