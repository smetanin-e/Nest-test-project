import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
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
}
