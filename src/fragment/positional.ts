export type PositionalConfig = {}

export class Positional {
  position: number | null
  config: PositionalConfig

  constructor(position: number | null, config: Partial<PositionalConfig>) {
    this.position = position ?? null
    this.config = config
  }

  isMatch(name: string): boolean {
    return false
  }
}
