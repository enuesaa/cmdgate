import { Cli } from './cli'
import { Handler, Handlerfn } from './handler'
import { Gate } from './gate'

export const createCli = () => new Cli()
export const createGate = () => new Gate()
export const handle = (gate: Gate, handlerfn: Handlerfn): Handler => {
  return new Handler(gate, handlerfn)
}
