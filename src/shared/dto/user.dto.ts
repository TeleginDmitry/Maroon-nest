import { IsEmail, IsNumber, IsString } from 'class-validator'

export class UserDto {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    image: string
}

export class UserValidatedDto {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    image: string
}

export class UserValidatedResponseDto {
    user: UserValidatedDto
    iat: number
    exp: number
}
