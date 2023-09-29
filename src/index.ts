import { Command } from '@/command'

/** @deprecated */
export const createCommand = () => new Command()
/** @deprecated */
export { type HandleFn } from '@/types/config'

export { createGate } from '@/gate'
export const createCli = () => new Command()
export { handle } from '@/handler'
