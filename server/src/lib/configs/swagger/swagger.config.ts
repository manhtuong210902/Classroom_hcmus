// swagger.config.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Google classroom')
    .setDescription('API documentation for developers')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
