import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/modules/database/database.service'
import * as bcrypt from 'bcrypt'
import selectException from 'src/shared/exceptions/exceptions'
import {
    ChangeUserDto,
    CreateUserDto,
    UserValidatedResponseDto,
    ValidateUserDto
} from 'src/shared/dto/user/user.dto'
import { userHook } from 'src/hooks/user.hook'

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async validateUser({ email, password }: ValidateUserDto) {
        const user = await this.findUserByEmailWithPassword(email)

        if (!user) {
            throw selectException('user_email_not_exist')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw selectException('incorrect_password')
        }

        const resultUser = { ...user }
        delete resultUser.password

        return resultUser
    }

    async createUser({ email, password, image, name }: CreateUserDto) {
        const foundUser = await this.findUserByEmail(email)

        if (foundUser) {
            throw selectException('user_email_exist')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.databaseService.user.create({
            data: {
                email,
                password: hashedPassword,
                image,
                name
            },
            select: {
                email: true,
                id: true,
                image: true,
                name: true
            }
        })

        if (user) {
            await userHook(user)
        }

        return user
    }

    async changeUser({ email, password, image, name }: ChangeUserDto, request) {
        const authorizatedUser: UserValidatedResponseDto = request.user

        const user = await this.databaseService.user.update({
            data: {
                email,
                password,
                image,
                name
            },
            where: {
                email: authorizatedUser.user.email
            },
            select: {
                email: true,
                id: true,
                image: true,
                name: true
            }
        })

        if (user) {
            await userHook(user)
        }

        return user
    }

    async findUserByEmail(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email },
            select: {
                email: true,
                id: true,
                image: true,
                name: true
            }
        })

        if (user) {
            await userHook(user)
        }

        return user
    }

    private async findUserByEmailWithPassword(email: string) {
        const user = await this.databaseService.user.findUnique({
            where: { email }
        })

        if (user) {
            await userHook(user)
        }

        return user
    }
}
