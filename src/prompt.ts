import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  print(message: string): void
  info(message: string): void
  error(message: string): void
  exit(code: number): void
  isExited(): boolean
}

export class Prompt implements PromptInterface {
  print(message: string) {
    const text = util.format(message)
    process.stdout.write(text)
  }

  info(message: string) {
    this.print(message + `\n`)
  }

  error(message: string) {
    this.print(message + `\n`)
  }

  exit(code: number) {
    process.exit(code)
  }

  /**
   * This is for test.
   * Also, this method may be used for logs or traces in the future.
   **/
  isExited(): boolean {
    return false
  }
}
