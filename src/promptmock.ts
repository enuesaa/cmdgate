import { PromptInterface } from './prompt'
import util from 'node:util'

export class PromptMock implements PromptInterface {
  public out: string = ''
  public code: number = -1

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

  exit(code: number) {
    // TODO: this method should be `never`. try os exit here not to override code.
    if (this.code !== -1) {
      return
    }
    this.code = code
  }

  isExited(): boolean {
    return this.code !== -1
  }
}
