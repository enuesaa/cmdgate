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
  private _value: null|string;

  constructor(name: string, config: FlagConfig) {
    this._name = name
    this._config = config
    this._has = false;
    this._value = null;
  }

  has(): boolean {
    return this._has;
  }

  apply(context: Context) {
    if (context.args.some(v => v === this._name)) {
      this._has = true;
      // extract value here.
    } else {
      this._has = false;
    }
  }
}
