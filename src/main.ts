import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { selectConfiguration } from './shared/configurations/configurations'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.setGlobalPrefix('api')
    await app.listen(selectConfiguration('port'))
}
bootstrap()
