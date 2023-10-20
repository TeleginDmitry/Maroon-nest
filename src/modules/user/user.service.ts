import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/modules/database/database.service'
import * as bcrypt from 'bcrypt'
import { CreateUserDto, ValidateUserDto } from './dto/user.dto'
import selectException from 'src/shared/exceptions'

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async validateUser({ email, password }: ValidateUserDto) {
        const user = await this.findUserByEmail(email)
        if (!user) {
            throw selectException('USER_EMAIL_NOT_EXIST')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw selectException('INCORRECT_PASSWORD')
        }

        const resultUser = { ...user }
        delete resultUser.password

        return resultUser
    }

    async createUser({ email, password, ...dto }: CreateUserDto) {
        const isExistUser = await this.findUserByEmail(email)
        if (isExistUser) {
            throw selectException('USER_EMAIL_EXIST')
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
}
