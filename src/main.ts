import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { selectConfiguration } from './shared/configurations/configurations'
import * as express from 'express'
import { join } from 'path'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    })

    await app.listen(selectConfiguration('port'))
}
bootstrap()
