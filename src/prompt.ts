import process from 'node:process'
import util from 'node:util'

export interface PromptInterface {
  getArgv(): string[]
  println(message: string): void
  info(message: string): void
  error(message: string): void
  exit(code: number): void
}

export class Prompt implements PromptInterface {
  private argv: string[]
  private input: NodeJS.ReadableStream = process.stdin
  private output: NodeJS.WritableStream = process.stdout

  constructor(argv = process.argv) {
    this.argv = argv
  }

  getArgv(): string[] {
    return this.argv
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
  private argv: string[]
  public out: string = ''
  public code: number = -1

  constructor(argv: string[]) {
    this.argv = argv
  }

  getArgv(): string[] {
    return this.argv
  }

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
