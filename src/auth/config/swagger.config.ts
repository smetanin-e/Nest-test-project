import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Awesome API')
    .setDescription('Asimple and powerfull REST API build with NestJs')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
}
