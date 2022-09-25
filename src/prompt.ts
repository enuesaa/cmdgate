import process from 'node:process'
import { promises as readline } from 'node:readline'

export class Prompt {
  readline: readline.Interface;

  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  getArgs(): string[] {
    return process.argv.slice(2) // hide bin
  }

  async question(value: string): Promise<string> {
    return await this.readline.question(value)
  }

  println(value: string): void {
    this.readline.write(`${value}\n`)
  }

  close(): void {
    this.readline.close()
  }
}
