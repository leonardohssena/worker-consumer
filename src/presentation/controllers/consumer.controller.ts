import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

import { ConsumerService } from 'application/service/consumer.service'

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern()
  async consume(@Payload() message: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMsg = context.getMessage()
    try {
      await this.consumerService.consume(message)

      await channel.ack(originalMsg)
    } catch (error) {
      await channel.nack(originalMsg)
    }
  }
}
