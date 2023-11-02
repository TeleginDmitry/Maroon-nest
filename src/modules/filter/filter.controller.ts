import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { FilterService } from './filter.service'
import { CreateFilterDto } from 'src/shared/dto/filter/filter.dto'

@Controller('filters')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}

    @Get()
    get() {
        return this.filterService.get()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateFilterDto) {
        return this.filterService.create(dto)
    }
}
