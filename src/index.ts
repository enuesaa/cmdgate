import { Gateli, GateliArg } from '@/gateli'
import { Command, CommandArg } from '@/fragment/command'
import { Option, OptionArg } from '@/fragment/option'
import { Help, HelpArg } from '@/fragment/help'
import { Positional, PositionalArg } from '@/fragment/positional'

export const gateli = (arg?: Partial<GateliArg>) => new Gateli(arg ?? {})
export const command = (arg?: Partial<CommandArg>) => new Command(arg ?? {})
export const option = (arg?: Partial<OptionArg>) => new Option(arg ?? {})
export const help = (arg?: Partial<HelpArg>) => new Help(arg ?? {})
export const positional1 = (arg?: Partial<PositionalArg>) => new Positional(1, arg ?? {})
export const positional2 = (arg?: Partial<PositionalArg>) => new Positional(2, arg ?? {})
export const positionals = (arg?: Partial<PositionalArg>) => new Positional(null, arg ?? {})

// export const optionValue = (arg) => ({})
