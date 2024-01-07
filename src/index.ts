import { Cli, CliConfig } from './cli'
import { type GateConfig, Gate } from './gate'

export const createCli = (config: Partial<CliConfig> = {}) => new Cli(config)
export const createGate = (config: Partial<GateConfig> = {}) => new Gate(config)

export { type PromptInterface, Prompt } from './prompt'
export { PromptMock } from './promptmock'
