import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'BOOK_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [
                        process.env.RABBITMQ_URL || ""
                    ],
                    queue: 'book_queue',
                    queueOptions: { durable: false }
                }
            },

            {
                name: "CUSTOMER_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: [
                        process.env.RABBITMQ_URL || ""
                    ],
                    queue: 'customer_queue',
                    queueOptions: { durable: false }
                }
            },

            {
                name: "ORDER_SERVICE",
                transport: Transport.RMQ,
                options: {
                    urls: [
                        process.env.RABBITMQ_URL || ""
                    ],
                    queue: 'order_queue',
                    queueOptions: { durable: false },
                },
            },
        ])

    ],

    exports: [ClientsModule]
})
export class RabbitMQModule {}