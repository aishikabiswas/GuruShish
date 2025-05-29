import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (you can restrict it later)
  app.enableCors({
    origin: '*', // allow all origins; for production, replace '*' with your frontend URL(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Use PORT from environment variables (important for Render deployment)
  const port = process.env.PORT || 3000;

  // Start listening on the specified port
  await app.listen(port);

  console.log(`Backend running on http://localhost:${port}`);
}

bootstrap();
