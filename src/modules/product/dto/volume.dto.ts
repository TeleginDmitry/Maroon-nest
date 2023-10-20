import { IsNumber, IsString } from 'class-validator'

export class CreateVolumeDto {
    @IsNumber()
    amount: number

    @IsString()
    unit: string
}
