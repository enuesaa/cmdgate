import { Gateli } from './gateli'
import { Command, CommandHandler } from './command'
import { Option, OptionArg } from './option'
import { classify } from './classify'

export type CreateGateliArg = {
  name: string,
  description?: string,
  handler?: CommandHandler,
  with?: {
    [key: string]: Command | Option,
  }
}
export const gateli = (arg: CreateGateliArg): Gateli => {
  const { commands, options } = classify(arg.with ?? {})
  return new Gateli({
    name: arg.name,
    description: arg.description ?? '',
    handler: arg.handler ?? null,
    commands,
    options,
  })
}

export type CreateCommandArg = {
  description?: string,
  handler?: CommandHandler,
  with?: {
    [key: string]: Command | Option,
  },
}
export const command = (arg: CreateCommandArg): Command => {
  const { commands, options } = classify(arg.with ?? {})
  return new Command({
    description: arg.description ?? '',
    handler: arg.handler ?? null,
    commands,
    options
  })
}

export type CreateOptionArg = {
  description?: string,
  alias?: string,
  required?: boolean,
}
export const option = (arg: CreateOptionArg): Option => {
  return new Option({
    description: arg.description ?? '',
    alias: arg.alias ?? '',
    required: arg.required ?? false,
  })
}

export const help = (arg) => {}
export const positional1 = (arg) => {}
export const positional2 = (arg) => {}
export const positionalArgs = (arg) => {}
export const optionValue = (arg) => {}
