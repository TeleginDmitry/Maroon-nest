import { Module } from '@nestjs/common'
import { ProductModule } from '../product/product.module'
import { UserModule } from '../user/user.module'
import { DatabaseModule } from '../database/database.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'

@Module({
    imports: [
        DatabaseModule,
        ProductModule,
        UserModule,
        AuthModule,
        TokenModule
    ]
})
export class AppModule {}
