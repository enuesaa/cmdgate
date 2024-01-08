import { Argument, type ArgumentConfig } from './argument'
import { Flag, type FlagConfig } from './flag'
import { type Handlefn, Handler } from './handler'

export type GateConfig = {
  description: string
}
export class Gate {
  protected _config: GateConfig 
  protected _positionals: Argument[] = []
  protected _flags: Flag[] = []

  constructor(config: Partial<GateConfig> = {}) {
    this._config = {
      description: '',
      ...config,
    }
  }

  positional(name: string, config: Partial<ArgumentConfig> = {}): Argument {
    const positional = new Argument(name, config)
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

  /**
   * @experimental may change method name.
   */
  getConfig(): GateConfig {
    return this._config
  }
}
