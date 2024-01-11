import { Cmd, CmdConfig } from './cmd'

export const createCmd = (config: Partial<CmdConfig> = {}) => new Cmd(config)

export { type PromptInterface, Prompt } from './prompt'
export { PromptMock } from './promptmock'
