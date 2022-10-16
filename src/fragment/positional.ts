export type PositionalConfig = {}

export class Positional {
  position: number | null
  required: boolean

  constructor(position: number | null, config: Partial<PositionalConfig>) {
    this.position = position ?? null
    this.required = false
  }
}
