import { IsString } from 'class-validator'

export class CreateAccordionDto {
    @IsString()
    title: string

    @IsString()
    body: string
}
