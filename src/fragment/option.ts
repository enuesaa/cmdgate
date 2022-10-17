export type OptionConfig = {
  description: string
  alias: string
  required: boolean
}

export class Option {
  name: string
  config: OptionConfig

  constructor(name: string, config: Partial<OptionConfig>) {
    this.name = name
    this.config = { description: '', alias: '', required: false, ...config }
  }

  isMatch(name: string): boolean {
    return this.name === name
  }
}
