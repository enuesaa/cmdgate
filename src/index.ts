import { Cli } from './cli'
import { Handler } from './handler'

export const createCli = () => new Cli()
export const createHandler = () => new Handler()

export { type PromptInterface, Prompt } from './prompt'
export { PromptMock } from './promptmock'
