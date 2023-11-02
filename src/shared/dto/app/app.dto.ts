import { UserValidatedDto } from 'src/shared/dto/user/user.dto'

export class ValidateJWTDto {
    user: UserValidatedDto
    iat: number
    exp: number
}
