export type PositionalArg = {}

export class Positional {
  name: string | null
  position: number | null

  constructor(position: number | null, arg: Partial<PositionalArg>) {
    this.name = null
    this.position = position ?? null
  }

  bindName(name: string): Positional {
    this.name = name
    return this
  }
}
