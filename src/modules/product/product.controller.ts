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
    Query,
    Delete,
    Patch,
    HttpCode
} from '@nestjs/common'
import { ProductService } from './product.service'
import {
    CreateBasketProductDto,
    CreateProductDto,
    CreateRecentlyProductDto,
    PatchBasketProductDto
} from 'src/shared/dto/product/product.dto'
import { JwtAuthGuard } from 'src/guards/jwt.guard'

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getProducts(@Query() params, @Request() request) {
        params = { ...params, ...request.pagination }

        return await this.productService.getProducts(params)
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto)
    }

    @Get('recently')
    @UseGuards(new JwtAuthGuard())
    getRecentlyProducts(@Request() request) {
        return this.productService.getRecentlyProducts(request)
    }

    @Post('recently')
    @UseGuards(new JwtAuthGuard())
    @UsePipes(new ValidationPipe())
    createRecentlyProducts(
        @Body() dto: CreateRecentlyProductDto,
        @Request() request
    ) {
        return this.productService.createRecentlyProducts(dto, request)
    }

    @Get('basket')
    @UseGuards(new JwtAuthGuard())
    getBasketProducts(@Request() request) {
        return this.productService.getBasketProducts(request)
    }

    @Post('basket')
    @UseGuards(new JwtAuthGuard())
    @UsePipes(new ValidationPipe())
    createBasketProduct(
        @Body() dto: CreateBasketProductDto,
        @Request() request
    ) {
        return this.productService.createBasketProduct(dto, request)
    }

    @Delete('basket/:id')
    @UseGuards(new JwtAuthGuard())
    deleteBasketProduct(@Param('id') id: string) {
        return this.productService.deleteBasketProduct(id)
    }

    @Patch('basket')
    @UseGuards(new JwtAuthGuard())
    @HttpCode(200)
    patchBasketProducts(@Body() dto: PatchBasketProductDto[]) {
        return this.productService.patchBasketProducts(dto)
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProduct(id)
    }
}
