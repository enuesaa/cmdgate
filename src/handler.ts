import { type PromptInterface } from './prompt'
import { Context } from './context'
import { Gate } from './gate'

export type Handlefn = (prompt: PromptInterface) => void

export class Handler {
  protected _gate: Gate
  protected _handlefn: Handlefn

  constructor(gate: Gate, handlefn: Handlefn) {
    this._gate = gate
    this._handlefn = handlefn
  }

  run(context: Context, prompt: PromptInterface) {
    // const positionals = context.positionals
    // for (const argument of this._gate.positionals) {
    //   argument._setNotDefined()
    //   if (positionals.length > 0) {
    //     argument._setValue(positionals[0])
    //     positionals.shift()
    //   }
    // }

    // const rawflags = context.rawFlags
    // for (const flag of this._flags) {
    //   flag._setNotDefined()
    //   if (rawflags.hasOwnProperty(flag.name)) {
    //     flag._setValue(rawflags[flag.name])
    //   }
    // }
  }
}
