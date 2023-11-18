import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction } from 'express'

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const { offset = 0, limit = 10 } = req.query
        const numOffset = +offset
        const numLimit = +limit

        req.pagination = { offset: numOffset, limit: numLimit }
        next()
    }
}
