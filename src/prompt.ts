import process from 'node:process'
import { promises as readline } from 'node:readline'
import util from 'node:util'

/**
 * @todo fix
 * Dont do readline.createInterface() on constructor().
 * Failed to close readline on errors within gateli.
 */
export class Prompt {
  readline: readline.Interface
  args: string[]

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

  println(value: any): void {
    this.readline.write(util.format(value) + '\n')
  }

  /**
   * @todo fix to out stderror
   */
  error(value: any): void {
    this.println(value)
  }

  close(): void {
    this.readline.close()
  }
}
