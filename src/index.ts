import { Command } from '@/command'

export const createCommand = () => new Command()
// export const createHandler = (fn: HandleFn) => fn;

export { type HandleFn } from '@/types/config'
