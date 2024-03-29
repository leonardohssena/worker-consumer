import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ConsumerService } from 'application/service/consumer.service'
import { setEnvironment } from 'infrastructure/environments'
import { ConsumerController } from 'presentation/controllers/consumer.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
