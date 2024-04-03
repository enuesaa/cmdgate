import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  print(message: string): void
  info(message: string): void
  error(message: string): void
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
}
