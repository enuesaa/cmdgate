import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  println(message: string): void
  info(message: string): void
  error(message: string): void
  exit(code: number): void
}

export class Prompt implements PromptInterface {
  private output: NodeJS.WritableStream = process.stdout

  println(message: string) {
    this.output.write(util.format(message) + '\n')
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
