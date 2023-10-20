import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateAccordionDto } from './accordion.dto'
import { CreateVolumeDto } from './volume.dto'

export class CreateProductDto {
    @IsString()
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

    @IsNumber()
    price: number
}
