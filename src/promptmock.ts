import { PromptInterface } from './prompt'
import util from 'node:util'

export class PromptMock implements PromptInterface {
  public out: string = ''
  public code: number = -1

  println(message: string) {
    const text = util.format(message) + '\n'
    this.out += text
  }

  info(message: string) {
    this.println(message)
  }

  error(message: string) {
    this.println(message)
  }

  exit(code: number) {
    this.code = code
  }
}
