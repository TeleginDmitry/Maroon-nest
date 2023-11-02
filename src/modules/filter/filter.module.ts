import { Module } from '@nestjs/common'
import { FilterController } from './filter.controller'
import { FilterService } from './filter.service'
import { DatabaseModule } from '../database/database.module'

@Module({
    imports: [DatabaseModule],
    controllers: [FilterController],
    providers: [FilterService]
})
export class FilterModule {}
