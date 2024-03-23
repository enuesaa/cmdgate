import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  println(message: string): void
  info(message: string): void
  error(message: string): void
  exit(code: number): void
  isExited(): boolean
}

export class Prompt implements PromptInterface {
  println(message: string) {
    const text = util.format(message) + '\n'
    process.stdout.write(text)
  }

  info(message: string) {
    this.println(message)
  }

  error(message: string) {
    this.println(message)
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
