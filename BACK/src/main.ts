import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.use(cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
    }));
    await app.listen(3000);
}

bootstrap();

