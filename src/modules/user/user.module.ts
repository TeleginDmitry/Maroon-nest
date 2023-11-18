import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { DatabaseModule } from 'src/modules/database/database.module'
import { UserController } from './user.controller'

@Module({
    imports: [DatabaseModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
