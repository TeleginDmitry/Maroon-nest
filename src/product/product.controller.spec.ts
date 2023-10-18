import { Test, TestingModule } from '@nestjs/testing'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { DatabaseModule } from '../database/database.module'

describe('ProductController', () => {
    let controller: ProductController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
            imports: [DatabaseModule]
        }).compile()

        controller = module.get<ProductController>(ProductController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
