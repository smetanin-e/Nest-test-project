import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //устанавливаем глобальные пайпы (без этого не работает валидация)
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Nest Course API')
    .setDescription('API documentation for Nest course')
    .setVersion('1.0.0')
    .setContact(
      'Евгений Сметанин',
      'https://example.com',
      'e91smet15@gmail.com',
    )
    .setLicense('MIT', 'https://github.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document, {
    jsonDocumentUrl: '/swagger.json',
    yamlDocumentUrl: '/swagger.yml',
    customSiteTitle: 'Nest js API docs',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
