import { Gate } from './gate'
import { Prompt } from './prompt'
import { Context } from './context'

export type HandlerMainfn = (context: Context, prompt: Prompt) => {}

export class Handler {
  private _gate: Gate
  private _mainfn: HandlerMainfn

  constructor(gate: Gate, mainfn: HandlerMainfn) {
    this._gate = gate
    this._mainfn = mainfn
  }

  run(context: Context, prompt: Prompt) {

  }
}
