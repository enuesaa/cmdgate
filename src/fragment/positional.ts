export type PositionalArg = {}

export class Positional {
  name: string | null
  position: number | null
  required: boolean

  constructor(position: number | null, arg: Partial<PositionalArg>) {
    this.name = null
    this.position = position ?? null
    this.required = false
  }

  bindName(name: string): Positional {
    this.name = name
    return this
  }
}
