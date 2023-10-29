import { UserValidatedDto } from 'src/shared/dto/user.dto'

export class ValidateJWTDto {
    user: UserValidatedDto
    iat: number
    exp: number
}
