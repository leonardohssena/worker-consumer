import { Injectable } from '@nestjs/common'
import { sleep } from '@nestjs/terminus/dist/utils'

@Injectable()
export class ConsumerService {
  constructor() {}

  async consume(message: any) {
    console.log('Consumindo mensagem da fila')
    await sleep(20000)
    console.log(message)
  }
}
