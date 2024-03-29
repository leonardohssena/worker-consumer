import { Logger } from '@nestjs/common'
import consumer from 'main_consumer'
import http from 'main_http'

async function bootstrap() {
  Logger.log(`Environment: ${process.env.NODE_ENV?.toUpperCase()}`, 'Bootstrap')
  await Promise.all([http(), consumer()])
}
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap')
  throw e
})
