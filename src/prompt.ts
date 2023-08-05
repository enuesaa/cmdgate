import process from 'node:process'
import { promises as readline } from 'node:readline'
import util from 'node:util'

// should implement interface to mock prompt.
export class Prompt {
  readline: readline.Interface

  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  async question(value: string): Promise<string> {
    return await this.readline.question(value)
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

  exit(code: number): never {
    this.close()
    process.exit(code)
  }

  /**
   * @todo refactor like deconstructor.
   */
  close() {
    this.readline.close()
  }
}
