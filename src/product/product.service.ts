import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { CreateDto } from './dto/product.dto'

@Injectable()
export class ProductService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getProducts() {
        return await this.databaseService.product.findMany()
    }

    async getProduct(id: number) {
        return await this.databaseService.product.findFirst({
            where: {
                id
            }
        })
    }

    async createProduct(dto: CreateDto) {
        return await this.databaseService.product.create({ data: dto })
    }
}
