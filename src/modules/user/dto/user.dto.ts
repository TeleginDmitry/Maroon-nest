import { IsEmail, IsString, IsOptional } from 'class-validator'

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

export class ChangeUserDto {
    @IsString()
    @IsOptional()
    name: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    password: string

    @IsOptional()
    image: string
}

export class ValidateUserDto {
    @IsString()
    email: string

    @IsString()
    password: string
}

export class CustomHeadersDto {
    @IsString()
    authorization: string
}
