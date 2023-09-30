import { Gate } from './gate'
import { Prompt } from './prompt'
import { Context } from './context'

export type Handlefn = (context: Context, prompt: Prompt) => {}

export class Handler {
  private _gate: Gate
  private _handlefn: Handlefn

  constructor(gate: Gate, handlefn: Handlefn) {
    this._gate = gate
    this._handlefn = handlefn
  }

  run(context: Context, prompt: Prompt) {

  }
}
