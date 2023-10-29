import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/modules/database/database.service'
import * as bcrypt from 'bcrypt'
import { ChangeUserDto, CreateUserDto, ValidateUserDto } from './dto/user.dto'
import selectException from 'src/shared/exceptions/exceptions'
import { UserValidatedResponseDto } from 'src/shared/dto/user.dto'

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async validateUser({ email, password }: ValidateUserDto) {
        const user = await this.findUserByEmail(email)
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

    async createUser({ email, password, ...dto }: CreateUserDto) {
        const isExistUser = await this.findUserByEmail(email)
        if (isExistUser) {
            throw selectException('user_email_exist')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.databaseService.user.create({
            data: {
                email,
                password: hashedPassword,
                ...dto
            },
            select: {
                email: true,
                id: true,
                image: true,
                name: true
            }
        })

        return user
    }

    async findUserByEmail(email: string) {
        return this.databaseService.user.findUnique({
            where: { email }
        })
    }

    async changeUser(dto: ChangeUserDto, request) {
        const { user }: UserValidatedResponseDto = request.user

        return this.databaseService.user.update({
            data: dto,
            where: { id: user.id },
            select: {
                email: true,
                id: true,
                image: true,
                name: true
            }
        })
    }
}
