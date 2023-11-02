import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    Request,
    UseGuards,
    Query
} from '@nestjs/common'
import { ProductService } from './product.service'
import {
    CreateProductDto,
    CreateRecentlyProductDto
} from 'src/shared/dto/product/product.dto'
import { JwtAuthGuard } from 'src/guards/jwt.guard'

@Controller('products')
export class ProductController {
    constructor(private readonly appService: ProductService) {}

    @Get()
    getProducts(@Query() params) {
        const categories = params.categories
        return this.appService.getProducts(categories)
    }

    @Get('recently')
    @UseGuards(new JwtAuthGuard())
    getRecentlyProducts(@Request() request) {
        return this.appService.getRecentlyProducts(request)
    }

    @Post('recently')
    @UseGuards(new JwtAuthGuard())
    @UsePipes(new ValidationPipe())
    createRecentlyProducts(
        @Body() dto: CreateRecentlyProductDto,
        @Request() request
    ) {
        return this.appService.createRecentlyProducts(dto, request)
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.appService.getProduct(id)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() dto: CreateProductDto) {
        return this.appService.createProduct(dto)
    }
}
