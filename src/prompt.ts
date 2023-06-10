import process from 'node:process'
import { promises as readline } from 'node:readline'
import util from 'node:util'

export class Prompt {
  readline: readline.Interface
  args: string[]

  constructor() {
    /**
     * @todo remove because error happens on closing command.
     */ 
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

  println(value: any): void {
    this.readline.write(util.format(value) + '\n')
  }

  error(value: any): void {
    this.println(value)
  }

  close(): void {
    this.readline.close()
  }
}
