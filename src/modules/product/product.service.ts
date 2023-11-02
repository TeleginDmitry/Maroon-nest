import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import {
    CreateProductDto,
    CreateRecentlyProductDto
} from '../../shared/dto/product/product.dto'
import { UserValidatedResponseDto } from 'src/shared/dto/user/user.dto'
import selectException from 'src/shared/exceptions/exceptions'

@Injectable()
export class ProductService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getProducts(categories?: string | undefined) {
        const query: {
            include: {
                accordion: boolean
                volumes: boolean
            }
            where?: {
                categories?: {
                    some?: {
                        OR?: any
                    }
                }
            }
        } = {
            include: {
                accordion: true,
                volumes: true
            }
        }

        if (categories?.length) {
            const categoriesArray = categories.split(',')

            query.where = {
                categories: {
                    some: {
                        OR: categoriesArray.map((category) => ({
                            name: category
                        }))
                    }
                }
            }
        }

        return await this.databaseService.product.findMany(query)
    }

    async getRecentlyProducts(request) {
        const { user }: UserValidatedResponseDto = request.user
        return await this.databaseService.recentlyProduct.findMany({
            where: {
                user: {
                    email: user.email
                }
            },
            include: {
                product: {
                    include: {
                        accordion: true,
                        volumes: true
                    }
                }
            }
        })
    }

    async createRecentlyProducts(
        { productId }: CreateRecentlyProductDto,
        request
    ) {
        const { user }: UserValidatedResponseDto = request.user

        const product = await this.findRecentlyProductByEmail(
            user.email,
            productId
        )

        if (product) {
            throw selectException('product_email_exist')
        }

        return await this.databaseService.recentlyProduct.create({
            data: {
                product: { connect: { id: productId } },
                user: { connect: { email: user.email } }
            },
            include: {
                product: {
                    include: {
                        accordion: true,
                        categories: true,
                        volumes: true
                    }
                }
            }
        })
    }

    async findRecentlyProductByEmail(email: string, productId: number) {
        return await this.databaseService.recentlyProduct.findFirst({
            where: { user: { email }, product: { id: productId } },
            include: { product: true }
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

    async createProduct({
        accordion,
        volumes,
        categories,
        ...dto
    }: CreateProductDto) {
        return await this.databaseService.product.create({
            data: {
                volumes: { create: volumes },
                accordion: { create: accordion },
                categories: { connect: categories },
                ...dto
            },
            include: {
                accordion: true,
                volumes: true
            }
        })
    }
}
