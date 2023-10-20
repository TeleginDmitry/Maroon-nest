import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    image: string
}

export class ValidateUserDto {
    @IsString()
    email: string

    @IsString()
    password: string
}
