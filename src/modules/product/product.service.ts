import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import {
    CreateBasketProductDto,
    CreateProductDto,
    CreateRecentlyProductDto,
    PatchBasketProductDto
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

    async createRecentlyProducts({ id }: CreateRecentlyProductDto, request) {
        const { user }: UserValidatedResponseDto = request.user

        const product = await this.findRecentlyProductByEmail(user.email, id)

        if (product) {
            throw selectException('product_email_exist')
        }

        return await this.databaseService.recentlyProduct.create({
            data: {
                product: { connect: { id: id } },
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

    async getBasketProducts(request) {
        const { user }: UserValidatedResponseDto = request.user
        return await this.databaseService.basketProduct.findMany({
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
                },
                volumes: true
            }
        })
    }

    async createBasketProduct({ id, volume }: CreateBasketProductDto, request) {
        const { user }: UserValidatedResponseDto = request.user

        const product = await this.findBasketProductByEmail(user.email, id)

        if (product) {
            throw selectException('product_email_exist')
        }

        return await this.databaseService.basketProduct.create({
            data: {
                product: { connect: { id } },
                volumes: {
                    connect: { id: volume }
                },
                user: { connect: { email: user.email } }
            },
            include: {
                product: {
                    include: {
                        accordion: true,
                        categories: true,
                        volumes: true
                    }
                },
                volumes: true
            }
        })
    }

    async deleteBasketProduct(id: string) {
        if (!id && typeof +id !== 'number') {
            throw selectException('id_not_number')
        }

        await this.databaseService.basketProduct.delete({
            where: {
                id: +id
            },
            include: {
                product: {
                    include: {
                        accordion: true,
                        categories: true,
                        volumes: true
                    }
                },
                volumes: true
            }
        })
    }

    async patchBasketProducts(data: PatchBasketProductDto[]) {
        for (const { count, id, isChecked } of data) {
            await this.databaseService.basketProduct.update({
                where: { id: id },
                data: {
                    count: count,
                    isChecked: isChecked
                }
            })
        }
    }

    async findRecentlyProductByEmail(email: string, id: number) {
        return await this.databaseService.recentlyProduct.findFirst({
            where: { user: { email }, product: { id: id } },
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

    async findBasketProductByEmail(email: string, id: number) {
        return await this.databaseService.basketProduct.findFirst({
            where: { user: { email }, product: { id: id } },
            include: {
                product: {
                    include: {
                        accordion: true,
                        categories: true,
                        volumes: true
                    }
                },
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
