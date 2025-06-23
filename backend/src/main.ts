import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
  origin: '*',      // won't work with credentials
  credentials: true,
});

  const port = process.env.PORT || 3043;

  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
