import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { v4 as uuid } from 'uuid'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name)

  use(req: Request, res: Response, next: NextFunction) {
    const correlationHeader = req.header('x-correlation-id') || uuid()
    req.headers['x-correlation-id'] = correlationHeader
    res.set('X-Correlation-Id', correlationHeader)

    const logData = {
      headers: req.headers,
      body: req.body,
      originalUrl: req.originalUrl,
    }

    this.logger.log(logData, `Request - ${correlationHeader}`)

    this.getResponseLog(res, correlationHeader)

    if (next) {
      next()
    }
  }

  private getResponseLog = (res: Response, correlationHeader: string) => {
    const rawResponseEnd = res.end
    let chunkBuffers: Buffer[] = []

    res.end = (...chunks) => {
      const resArgs = chunks.filter(chunk => chunk)

      if (resArgs.length > 0) {
        chunkBuffers = [...chunkBuffers, ...resArgs]
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8')

      const responseLog = {
        statusCode: res.statusCode,
        body: JSON.parse(body) || body || {},
        headers: res.getHeaders(),
      }

      this.logger.log(responseLog, `Response - ${correlationHeader}`)

      rawResponseEnd.apply(res, resArgs)
      return responseLog as unknown as Response
    }
  }
}
