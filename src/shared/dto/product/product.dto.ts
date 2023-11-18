import {
    IsString,
    IsNumber,
    IsArray,
    ValidateNested,
    IsBoolean
} from 'class-validator'
import { Type } from 'class-transformer'
import { CategoryDto } from '../filter/filter.dto'

export class CreateVolumeDto {
    @IsNumber()
    amount: number

    @IsString()
    unit: string
}

export class CreateAccordionDto {
    @IsString()
    title: string

    @IsString()
    body: string
}

export class CreateProductDto {
    image: string

    @IsString()
    name: string

    @IsString()
    title: string

    @IsString()
    description: string

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAccordionDto)
    accordion: CreateAccordionDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVolumeDto)
    volumes: CreateVolumeDto[]

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CategoryDto)
    categories: CategoryDto[]

    @IsNumber()
    price: number
}

export class CreateRecentlyProductDto {
    @IsNumber()
    id: number
}

export class CreateBasketProductDto {
    @IsNumber()
    id: number

    @IsNumber()
    volume: number
}

export class PatchBasketProductDto {
    @IsNumber()
    id: number

    @IsNumber()
    count: number

    @IsBoolean()
    isChecked: boolean
}
