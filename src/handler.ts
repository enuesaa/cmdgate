import { type PromptInterface } from './prompt'
import { Gate } from './gate'
import { Parser } from './parser'

export type Handlefn = (prompt: PromptInterface) => void

export class Handler {
  protected _gate: Gate
  protected _handlefn: Handlefn

  constructor(gate: Gate, handlefn: Handlefn) {
    this._gate = gate
    this._handlefn = handlefn
  }

  run(parser: Parser, prompt: PromptInterface, route: string) {
    // parse flag and arguments of gate class here.

    const flags = this._gate.getFlags()
    const positionals = this._gate.getPositionals()

    this._handlefn(prompt)
  }
}
