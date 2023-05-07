import { Command } from '@/command'
import { Hanlder } from '@/handler'

export const createCommand = () => new Command()
export const createHandler = () => new Handler()

export type { Handler } from '@/steps'
