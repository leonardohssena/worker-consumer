import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

export default async function http() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true })
    app.setGlobalPrefix('api')
    const configService = app.get(ConfigService)

    const HOST = configService.get('HOST', 'localhost')
    const PORT = configService.get('PORT', '3000')
    const APP_NAME = configService.get('APP_NAME')
    const APP_DESCRIPTION = configService.get('APP_DESCRIPTION')
    const API_VERSION = configService.get('API_VERSION', 'v1')

    const options = new DocumentBuilder()
      .setTitle(APP_NAME)
      .setDescription(APP_DESCRIPTION)
      .setVersion(API_VERSION)
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
    Logger.log('Mapped {/api, GET} Swagger api route', 'RouterExplorer')

    await app.listen(PORT)
    process.env.NODE_ENV !== 'production'
      ? Logger.log(`🚀  Server ready at http://${HOST}:${PORT})}`, 'HTTP')
      : Logger.log(`🚀  Server is listening on port ${PORT})}`, 'HTTP')
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'HTTP')
    process.exit()
  }
}
