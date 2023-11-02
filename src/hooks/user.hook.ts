import { User } from '@prisma/client'

const serverAddress = 'http://localhost:3004/'

export async function userHook(user: Partial<User>) {
    if (user && user.image) {
        user.image = `${serverAddress}${user.image}`
    }
    return user
}
