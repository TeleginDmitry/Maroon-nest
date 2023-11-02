import { Injectable } from '@nestjs/common'
import { CreateFilterDto } from 'src/shared/dto/filter/filter.dto'
import { DatabaseService } from '../database/database.service'

@Injectable()
export class FilterService {
    constructor(private readonly databaseService: DatabaseService) {}

    get() {
        return this.databaseService.filter.findMany({
            include: {
                categories: true
            }
        })
    }

    create({ name, categories }: CreateFilterDto) {
        return this.databaseService.filter.create({
            data: { name, categories: { create: categories } },
            include: {
                categories: true
            }
        })
    }
}
