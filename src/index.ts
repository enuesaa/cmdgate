import { Gateli, GateliConfig } from '@/gateli'
import { Command, CommandConfig } from '@/fragment/command'
import { Option, OptionConfig } from '@/fragment/option'
import { HelpOption, HelpOptionConfig } from '@/fragment/help-option'
import { VersionOption, VersionOptionConfig } from '@/fragment/version-option'
import { Positional, PositionalConfig } from '@/fragment/positional'

export const gateli = (config?: Partial<GateliConfig>) => new Gateli(config ?? {})
export const command = (route: string, config?: Partial<CommandConfig>) => new Command(route, config ?? {})
export const option = (name: string, config?: Partial<OptionConfig>) => new Option(name, config ?? {})
export const helpOption = (name: string, config?: Partial<HelpOptionConfig>) => new HelpOption(name, config ?? {})
export const versionOption = (name: string, config?: Partial<VersionOptionConfig>) => new VersionOption(name, config ?? {})
export const positional1 = (config?: Partial<PositionalConfig>) => new Positional(1, config ?? {})
export const positional2 = (config?: Partial<PositionalConfig>) => new Positional(2, config ?? {})
export const positionals = (config?: Partial<PositionalConfig>) => new Positional(null, config ?? {})

export default {
  gateli,
  command,
  option,
  helpOption,
  versionOption,
  positional1,
  positional2,
  positionals
}
