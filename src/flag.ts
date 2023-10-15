import { Context } from "./context"

export type FlagConfig = {
  description: string
  alias: null | string
  required: boolean
}

export class Flag {
  private _name: string
  private _config: FlagConfig
  private _has: boolean;
  private _value: null|string[];

  constructor(name: string, config: FlagConfig) {
    this._name = name
    this._config = config
    this._has = false;
    this._value = null;
  }

  getName(): string {
    return this._name
  }

  has(): boolean {
    return this._has;
  }

  setValue(value: string[]) {
    this._has = true
    this._value = value
  }
}
