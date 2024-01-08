import { type PromptInterface } from './prompt'
import { Gate } from './gate'

export type Handlefn = (prompt: PromptInterface) => void

export class Handler {
  protected _gate: Gate
  protected _handlefn: Handlefn

  constructor(gate: Gate, handlefn: Handlefn) {
    this._gate = gate
    this._handlefn = handlefn
  }

  run(args: string[], prompt: PromptInterface) {}
}
