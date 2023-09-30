import { Cli } from './cli'
import { Handler, HandlerMainFn } from './handler'
import { Gate } from './gate'

export const createCli = () => new Cli()
export const createGate = () => new Gate()
export const handle = (gate: Gate, mainFn: HandlerMainFn): Handler => {
  return new Handler(gate, mainFn)
}
