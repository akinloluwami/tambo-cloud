import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { resetBamlEnvVars } from './baml_client';

// This is a workaround to get the env vars to work with baml
function reloadBamlRuntime() {
  const envVars = Object.fromEntries(
    Object.entries(process.env)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => [key, value as string]),
  );
  resetBamlEnvVars(envVars);
}

async function bootstrap() {
  reloadBamlRuntime();
  const app = await NestFactory.create(AppModule, { cors: true });
  configureSwagger(app);
  await app.listen(process.env.PORT || 3000);
}

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Hydra API')
    .setDescription('Hosted Hydra Backend')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'bearer',
    )
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKey')
    .addSecurityRequirements('apiKey')
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
