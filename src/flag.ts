
export type FlagConfig = {
  description: string
  alias: null | string
  required: boolean
}

export class Flag {
  private _name: string
  private _config: FlagConfig

  constructor(name: string, config: FlagConfig) {
    this._name = name
    this._config = config
  }

  has(): boolean {
    return false;
  }
}
