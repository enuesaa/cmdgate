import { Cli } from './cli'
import { Handler, HandlerMainfn } from './handler'
import { Gate } from './gate'

export const createCli = () => new Cli()
export const createGate = () => new Gate()
export const handle = (gate: Gate, mainfn: HandlerMainfn) => new Handler(gate, mainfn)
