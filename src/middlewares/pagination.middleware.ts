import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { PaginationType } from 'src/shared/types/pagination/pagination.type'

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req, res: Response, next: NextFunction) {
        const { page, limit }: PaginationType = req.query

        req.pagination = {
            page: +page,
            limit: +limit
        }
        next()
    }
}
