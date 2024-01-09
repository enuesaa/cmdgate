import { Positional, type PositionalConfig } from './positional'
import { Flag, type FlagConfig } from './flag'
import { type Handlefn, Handler } from './handler'

export type GateConfig = {
  description: string
}

export class Gate {
  public config: GateConfig
  protected _positionals: Positional[] = []
  protected _flags: Flag[] = []

  constructor(config: Partial<GateConfig> = {}) {
    this.config = {
      description: '',
      ...config,
    }
  }

  positional(name: string, config: Partial<PositionalConfig> = {}): Positional {
    const positional = new Positional(name, config)
    this._positionals.push(positional)
    return positional
  }

  flag(name: string, config: Partial<FlagConfig> = {}): Flag {
    const flag = new Flag(name, config)
    this._flags.push(flag)
    return flag
  }

  handle(handlefn: Handlefn): Handler {
    return new Handler(this, handlefn)
  }

  getFlags(): Flag[] {
    return this._flags
  }

  getPositionals(): Positional[] {
    return this._positionals
  }
}
