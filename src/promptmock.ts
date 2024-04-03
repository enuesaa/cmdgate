import { PromptInterface } from './prompt'
import util from 'node:util'

export class PromptMock implements PromptInterface {
  public out: string = ''

  print(message: string) {
    const text = util.format(message)
    this.out += text
  }

  info(message: string) {
    this.print(message + `\n`)
  }

  error(message: string) {
    this.print(message + `\n`)
  }
}
