export type OptionConfig = {
  description: string
  alias: string
  required: boolean
}

export class Option {
  name: string
  description: string
  alias: string | null
  required: boolean

  constructor(name: string, arg: Partial<OptionConfig>) {
    this.name = name
    this.description = arg.description ?? ''
    this.alias = arg.alias ?? null
    this.required = arg.required ?? false
  }
}
