import { Module } from '@nestjs/common'
import { ProductModule } from '../product/product.module'
import { UserService } from '../user/user.service'
import { UserController } from '../user/user.controller'
import { UserModule } from '../user/user.module'
import { DatabaseModule } from '../database/database.module'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [DatabaseModule, ProductModule, UserModule, AuthModule],
    controllers: [UserController],
    providers: [UserService]
})
export class AppModule {}
