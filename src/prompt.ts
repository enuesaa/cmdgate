import process from 'node:process'
import { promises as readline } from 'node:readline'
import util from 'node:util'

export class Prompt {
  readline: readline.Interface

  constructor(stdin = process.stdin, stdout = process.stdout) {
    this.readline = readline.createInterface({
      input: stdin,
      output: stdout,
    })
  }

  println(value: any) {
    this.readline.write(util.format(value) + '\n')
  }

  info(value: any) {
    this.println(value)
  }

  error(value: any) {
    this.println(value)
  }

  close() {
    this.readline.close()
  }

  exit(code: number): never {
    this.close()
    process.exit(code)
  }
}
