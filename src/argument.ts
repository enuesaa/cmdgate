
export type ArgumentConfig = {
  description: string
}

export class Argument {
  private _name: string
  private _config: ArgumentConfig

  constructor(name: string, config: ArgumentConfig) {
    this._name = name
    this._config = config
  }

  has(): boolean {
    return false
  }
}