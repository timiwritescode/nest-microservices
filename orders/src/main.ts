import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RABBITMQ_URL = process.env.RABBITMQ_URL || "";
  
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'order_queue',
      queueOptions: { durable: false }
    }


  });

  await microservice.listen()

}
bootstrap();
