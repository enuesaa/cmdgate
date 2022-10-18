import { Prompt } from '@/prompt'

export type VersionOptionConfig = {
  alias: string | null
  message: string
}

export class VersionOption {
  name: string | null
  config: VersionOptionConfig

  constructor(name: string, config: Partial<VersionOptionConfig>) {
    this.name = name
    this.config = { alias: null, message: '', ...config }
  }

  isMatch(name: string): boolean {
    return this.name === name || this.config.alias === name
  }

  execHandler(prompt: Prompt) {
    prompt.println('version')
  }
}
