import { Gateli, GateliArg } from '@/gateli'
import { Command, CommandArg } from '@/command'
import { Option, OptionArg } from '@/option'

export const gateli = (arg: Partial<GateliArg>) => new Gateli(arg)
export const command = (arg: Partial<CommandArg>) => new Command(arg)
export const option = (arg: Partial<OptionArg>) => new Option(arg)

export const help = (arg) => ({})
export const positional1 = (arg) => ({})
export const positional2 = (arg) => ({})
export const positionalArgs = (arg) => ({})
export const optionValue = (arg) => ({})
