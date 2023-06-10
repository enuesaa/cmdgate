import process from 'node:process'
import { promises as readline } from 'node:readline'
import util from 'node:util'

export class Prompt {
  readline: readline.Interface

  constructor() {
    /**
     * @todo remove because error happens on closing command.
     */ 
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

  close(): void {
    this.readline.close()
  }
}
