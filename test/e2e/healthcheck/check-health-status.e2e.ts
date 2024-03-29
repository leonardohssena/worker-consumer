import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'app.module'
import request from 'supertest'

describe('Testing health check controller/entrypoint', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api')
    await app.init()
  })

  it('/GET api/healthcheck', async () => {
    await request(app.getHttpServer()).get('/api/healthcheck').expect(HttpStatus.OK)
  })

  afterAll(async () => {
    await app.close()
  })
})
