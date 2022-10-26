export type PositionalConfig = {
  required: boolean
}

export class Positional {
  position: number | null
  config: PositionalConfig

  constructor(position: number | null, config: Partial<PositionalConfig>) {
    this.position = position ?? null
    this.config = { required: false, ...config }
  }

  isMatch(name: string): boolean {
    return false
  }

  isValid(value: string[]|string|boolean|null): boolean {
    if (this.position === null) {
      return Array.isArray(value) && (this.config.required)? value.length > 0 : true
    }
    return this.config.required ? value !== null : true 
  }
}
