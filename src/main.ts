import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger } from 'swagger';

import { EEnvKey } from '@constants/env.constant';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(configService.get<string>(EEnvKey.GLOBAL_PREFIX));
    app.enableCors();

    /* Swagger */
    if (configService.get<string>(EEnvKey.SWAGGER_PATH)) {
        initSwagger(app, configService.get<string>(EEnvKey.SWAGGER_PATH));
    }

    await app.listen(configService.get<number>(EEnvKey.PORT) || 3000);
}
bootstrap();
