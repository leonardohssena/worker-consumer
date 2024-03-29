import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConsumerModule } from 'consumer.module'

export default async function consumer() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
      transport: Transport.RMQ,
      options: {
        urls: (process.env.CONSUMER_URLS || 'amqps://localhost:5671').split(','),
        queue: process.env.CONSUMER_QUEUE,
        noAck: false,
        prefetchCount: process.env.CONSUMER_PREFETCH_COUNT ? parseInt(process.env.CONSUMER_PREFETCH_COUNT) : 1,
        queueOptions: {
          durable: true,
        },
      },
    })
    const configService = app.get(ConfigService)

    const QUEUE = configService.get('CONSUMER_QUEUE')

    await app.listen()
    Logger.log(`🚀  Consumer ready to consume queue ${QUEUE}`, 'Consumer')
  } catch (error) {
    Logger.error(`❌  Error starting consumer, ${error}`, '', 'Consumer')
    process.exit()
  }
}
