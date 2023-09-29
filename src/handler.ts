import { Gate } from './gate'
import { Prompt } from '@/prompt'
import { Context } from '@/context'

type Handlerfn = () => {}

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

export const handle = (gate: Gate, handlerfn: Handlerfn): Handler => {
  return new Handler(gate, handlerfn)
}
