import { Cli } from './cli'
import { Gate } from './gate'

export const createCli = () => new Cli()
export const createHandler = () => new Gate()
