import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CategoryDto {
    @IsNumber()
    id: number

    @IsString()
    name: string
}

export class FilterDto {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    categories: CategoryDto[]
}

export class CreateCategoryDto {
    @IsString()
    name: string
}

export class CreateFilterDto {
    @IsString()
    name: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    categories: CategoryDto[]
}
