import process from 'node:process'
import readline from 'node:readline/promises'
import util from 'node:util'

export class Prompt {
  readline: readline.Interface

  constructor(stdin = process.stdin, stdout = process.stdout) {
    this.readline = readline.createInterface({
      input: stdin,
      output: stdout,
    })
  }

  println(message: string) {
    this.readline.write(util.format(message) + '\n')
  }

  info(message: string) {
    this.println(message)
  }

  error(message: string) {
    this.println(message)
  }

  close() {
    this.readline.close()
  }

  exit(code: number): never {
    this.close()
    process.exit(code)
  }
}
