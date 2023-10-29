import { HttpException } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common'

const exceptions = {
    user_email_exist: new HttpException(
        'Пользователь с таким email уже существует',
        400
    ),
    user_email_not_exist: new HttpException(
        'Пользователь с таким email не существует',
        400
    ),
    incorrect_password: new HttpException('Неверный пароль', 400),
    token_blacklisted: new UnauthorizedException(
        'Токен находится в чёрном списке'
    ),
    incorrect_token: new UnauthorizedException('Невалидный токен'),
    token_not_exist: new HttpException('Токен не был передан', 400)
}

export default function selectException(exception: keyof typeof exceptions) {
    return exceptions[exception]
}
