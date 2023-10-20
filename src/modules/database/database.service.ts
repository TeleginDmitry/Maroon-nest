import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close()
        })
    }
}
