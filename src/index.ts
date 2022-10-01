import { Gateli } from '@/gateli'
import { Command, CommandHandler } from '@/command'
import { Option } from '@/option'
import { classify } from '@/classify'

export type CreateGateliArg = {
  name: string,
  description?: string,
  handler?: CommandHandler,
  with?: {
    [key: string]: Command | Option,
  }
}
export const gateli = (arg: CreateGateliArg): Gateli => new Gateli({
  name: arg.name,
  description: arg.description ?? '',
  handler: arg.handler ?? null,
  ...classify(arg.with ?? {}),
})

export type CreateCommandArg = {
  description?: string,
  handler?: CommandHandler,
  with?: {
    [key: string]: Command | Option,
  },
}
export const command = (arg: CreateCommandArg): Command => new Command({
  description: arg.description ?? '',
  handler: arg.handler ?? null,
  ...classify(arg.with ?? {}),
})

export type CreateOptionArg = {
  description?: string,
  alias?: string,
  required?: boolean,
}
export const option = (arg: CreateOptionArg): Option => new Option({
  description: arg.description ?? '',
  alias: arg.alias ?? '',
  required: arg.required ?? false,
})

export const help = (arg) => {}
export const positional1 = (arg) => {}
export const positional2 = (arg) => {}
export const positionalArgs = (arg) => {}
export const optionValue = (arg) => {}
