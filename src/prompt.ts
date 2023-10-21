import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  println(message: string): void
  info(message: string): void
  error(message: string): void
  exit(code: number): void
}

export class Prompt implements PromptInterface {
  private input: NodeJS.ReadableStream
  private output: NodeJS.WritableStream

  constructor(input = process.stdin, output = process.stdout) {
    this.input = input
    this.output = output
  }

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

export class PromptMock implements PromptInterface {
  public out: string = ''
  public code: number = -1

  println(message: string) {
    this.out += util.format(message) + '\n'
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
