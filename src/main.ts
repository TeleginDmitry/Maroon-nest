import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { selectConfiguration } from './shared/configurations/configurations'
import * as express from 'express'
import { join } from 'path'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
    app.enableCors({
        origin: [
            'https://nfg928gv-3000.euw.devtunnels.ms',
            'http://localhost:3000'
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    })

    const config = new DocumentBuilder()
        .setTitle('Maroon API')
        .setDescription('Описание всех ручек для Maroon проекта')
        .setVersion('1.0')
        .addTag('api')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document)

    await app.listen(selectConfiguration('port'))
}
bootstrap()
