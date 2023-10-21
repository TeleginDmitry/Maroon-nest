import { IsEmail, IsString } from 'class-validator'

export class RegisterUserDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    image: string
}

export class LoginUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}

export class HeadersUserDto {
    @IsString()
    authorization?: string
}
