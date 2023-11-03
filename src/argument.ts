export type ArgumentConfig = {
  description?: string;
  required?: boolean;
}

export class Argument {
  private _name: string
  private _config: ArgumentConfig
  private _has: boolean;
  private _value: null|string

  constructor(name: string, config?: ArgumentConfig) {
    this._name = name
    this._config = config ?? { description: '' }
    this._has = false
    this._value = null
  }

  get name(): string {
    return this.name
  }

  get config(): ArgumentConfig {
    return this._config
  }

  get value(): string {
    return this._value ?? ''
  }

  has(): boolean {
    return this._has
  }

  setNotDefined() {
    this._has = false;
    this._value = null;
  }

  // internal method
  setValue(value: string) {
    this._has = true
    this._value = value
  }
}