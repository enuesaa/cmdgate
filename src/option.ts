export type OptionConfig = {
  description: string;
  alias: null | string;
}

export class Option {
  constructor(
    protected _name: string,
    protected _config: OptionConfig, 
  ) {}

  getName(): string {
    return this._name
  }

  getConfig(): OptionConfig {
    return this._config
  }
}
