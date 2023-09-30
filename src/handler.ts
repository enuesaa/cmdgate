import { Gate } from './gate'
import { Prompt } from './prompt'
import { Context } from './context'

export type HandlerMainFn = (context: Context, prompt: Prompt) => {}

export class Handler {
  _gate: Gate
  _mainFn: HandlerMainFn

  constructor(gate: Gate, mainFn: HandlerMainFn) {
    this._gate = gate
    this._mainFn = mainFn
  }

  run(context: Context, prompt: Prompt) {

  }
}

