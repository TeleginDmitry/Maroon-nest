import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { CreateProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getProducts() {
        return await this.databaseService.product.findMany({
            include: {
                accordion: true,
                volumes: true
            }
        })
    }

    async getProduct(id: number) {
        return await this.databaseService.product.findFirst({
            where: {
                id
            },
            include: {
                accordion: true,
                volumes: true
            }
        })
    }

    async createProduct({ accordion, volumes, ...dto }: CreateProductDto) {
        return await this.databaseService.product.create({
            data: {
                volumes: { create: volumes },
                accordion: { create: accordion },
                ...dto
            },
            include: {
                accordion: true,
                volumes: true
            }
        })
    }
}
