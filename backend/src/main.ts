import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // allow all origins; for production, replace '*' with your frontend URL(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Use PORT from environment variables (important for Render deployment)
  const port = process.env.PORT || 3047;

  // Start listening on the specified port
  await app.listen(port);

  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();
