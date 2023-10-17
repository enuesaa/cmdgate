import process from 'node:process'
import util from 'node:util'

export class Prompt {
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

  exit(code: number): never {
    process.exit(code)
  }
}
