import { HttpException } from '@nestjs/common'

const exceptions = {
    USER_EMAIL_EXIST: new HttpException(
        'Пользователь с таким email уже существует',
        400
    ),
    USER_EMAIL_NOT_EXIST: new HttpException(
        'Пользователь с таким email не существует',
        400
    ),
    INCORRECT_PASSWORD: new HttpException('Неверный пароль', 400)
}

export default function selectException(exception: keyof typeof exceptions) {
    return exceptions[exception]
}
