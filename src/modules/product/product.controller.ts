import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    ParseIntPipe,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/product.dto'

@Controller('products')
export class ProductController {
    constructor(private readonly appService: ProductService) {}

    @Get()
    getProducts() {
        return this.appService.getProducts()
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.appService.getProduct(id)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.appService.createProduct(dto)
    }
}
