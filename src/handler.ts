import { Gate } from './gate'
import { Prompt } from './prompt'
import { Context } from './context'

export type Handlerfn = () => {}

export class Handler {
  _gate: Gate
  _hanlderfn: Handlerfn

  constructor(gate: Gate, handlerfn: Handlerfn) {
    this._gate = gate
    this._hanlderfn = handlerfn
  }

  run(context: Context, prompt: Prompt) {

  }
}

