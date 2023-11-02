import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { DatabaseModule } from 'src/modules/database/database.module'
import { UserController } from './user.controller'
import { ImageModule } from '../image/image.module'

@Module({
    imports: [DatabaseModule, ImageModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
