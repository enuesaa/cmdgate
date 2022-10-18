import { Option } from '@/fragment/option'
import { Command } from '@/fragment/command'
import { Prompt } from '@/prompt'
import { Positional } from './positional'

export type HelpOptionConfig = {
  alias: string
  message: string
}

export class HelpOption {
  name: string | null
  config: HelpOptionConfig
  alias: string | null
  message: string | null

  constructor(name: string, config: Partial<HelpOptionConfig>) {
    this.name = name
    this.config = { alias: null, message: '', ...config }
  }

  isMatch(name: string): boolean {
    return this.name === name || this.config.alias === name
  }

  generateHelpMessage(options: Option[], positionals: Positional[]): string {
    /** @todo list commands */
    return `
options:
${options.map((v) => `  ${v.name}`).join('\n')}
`
  }

  execHandler(prompt: Prompt, def: { options: Option[], positionals: Positional[] }) {
    const message = this.generateHelpMessage(def.options, def.positionals)
    prompt.println(message)
  }
}
