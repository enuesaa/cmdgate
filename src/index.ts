import { Command } from '@/command'
import { Handler } from '@/handler'

export const createCommand = () => new Command()
export const createHandler = () => new Handler()
export { createContext } from '@/context2'

export { type HandleFn } from '@/types/config'
