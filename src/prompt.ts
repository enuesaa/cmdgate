import process from 'node:process'
import { promises as readline } from 'node:readline'

export class Prompt {
  readline: readline.Interface
  args: string[]

  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  setArgs(args: string[] | null): void {
    if (args !== null) {
      this.args = args
    } else {
      this.args = process.argv.slice(2) // hide bin
    }
  }

  getArgs(): string[] {
    this.setArgs(null)
    return this.args
  }

  async question(value: string): Promise<string> {
    return await this.readline.question(value)
  }

  write(value: string): void {
    this.readline.write(`${value}\n`)
  }

  close(): void {
    this.readline.close()
  }
}
