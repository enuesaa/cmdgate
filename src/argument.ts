export type ArgumentConfig = {
  description: string;
  required: boolean;
}
export class Argument {
  private _name: string
  private _config: ArgumentConfig
  private _has: boolean;
  private _value: null|string

  constructor(name: string, config: Partial<ArgumentConfig> = {}) {
    this._name = name
    this._config = {
      description: '',
      required: false,
      ...config,
    }
    this._has = false
    this._value = null
  }

  get value(): string {
    return this._value ?? ''
  }

  get has(): boolean {
    return this._has
  }

  parse() {}
}