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

  exit(code: number) {
    // TODO: this method should be `never`. try os exit here not to override code.
    // throw してどこかでキャッチすれば、この問題は解決するかも?
    if (this.code !== -1) {
      return
    }
    this.code = code
  }
}
