import { Gateli } from '@/old/gateli'
import { Command } from './command'

export type VersionOptionConfig = {
  alias: string | null
  message: string
}

export class VersionOption {
  name: string
  config: VersionOptionConfig

  constructor(name: string, config: Partial<VersionOptionConfig>) {
    this.name = name
    this.config = { alias: null, message: '', ...config }
  }

  isMatch(name: string): boolean {
    return this.name === name || this.config.alias === name
  }

  exec(gateli: Gateli, triggered: Command) {
    gateli.prompt.println(`version: ${gateli.config.version}`)
  }
}
