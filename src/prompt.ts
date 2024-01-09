import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  println(message: string): void
  info(message: string): void
  error(message: string): void
  exit(code: number): void
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
}
