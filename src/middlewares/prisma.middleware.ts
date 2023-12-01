import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class PrismaMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req.query = {
            ...req.query,
            orderBy: {
                id: 'asc'
            }
        }

        next()
    }
}
