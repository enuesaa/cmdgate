import { Cli } from './cli'
import { Handler } from './handler'

export const createCli = () => new Cli()
export const createHandler = () => new Handler()

export { Prompt, PromptMock, type PromptInterface } from './prompt'
