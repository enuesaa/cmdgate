import { Command } from '@/command'
import { Gate } from '@/gate'

export const createCommand = () => new Command()
export const createGate = () => new Gate()

export type { Handler } from '@/steps'
