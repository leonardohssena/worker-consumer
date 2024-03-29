import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheckService, HealthCheck, HttpHealthIndicator } from '@nestjs/terminus'

@ApiTags('Health Check')
@Controller('healthcheck')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    if (this.configService.get('NODE_ENV') === 'test') {
      return true
    }

    const host = this.configService.get<string>('HOST')
    const port = this.configService.get<string>('PORT')
    const urlApi = `http://${host}:${port}/api`

    return this.health.check([async () => this.http.pingCheck('http', urlApi)])
  }
}
