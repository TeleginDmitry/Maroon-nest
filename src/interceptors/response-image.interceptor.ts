import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { selectConfiguration } from 'src/shared/configurations/configurations'

@Injectable()
export class ResponseImageInterceptor implements NestInterceptor {
    private addServerAddress(data: any) {
        if (typeof data === 'object') {
            for (const key in data) {
                if (key === 'image') {
                    data['image'] =
                        selectConfiguration('server_address') + data['image']
                }

                this.addServerAddress(data[key])
            }
            return data
        } else if (Array.isArray(data)) {
            return data.map((item) => this.addServerAddress(item))
        } else {
            return data
        }
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                // Добавление серверного адреса для поля "image"
                const modifiedData = this.addServerAddress(data)
                return modifiedData
            })
        )
    }
}
