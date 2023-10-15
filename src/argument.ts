import { Context } from "./context"

export type ArgumentConfig = {
  description: string
}

export class Argument {
  private _name: string
  private _config: ArgumentConfig
  private _has: boolean;
  private _value: null|string

  constructor(name: string, config: ArgumentConfig) {
    this._name = name
    this._config = config
    this._has = false
    this._value = null
  }

  has(): boolean {
    return this._has
  }

  setValue(value: string) {
    this._has = true
    this._value = value
  }
}