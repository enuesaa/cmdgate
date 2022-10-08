import { Command } from '@/fragment/command'
import { Help } from '@/fragment/help'
import { Option } from '@/fragment/option'
import { Positional } from '@/fragment/positional'

type Classify = (arg: { [key: string]: Command | Option | Positional | Help }) => {
  commands: Command[]
  options: Option[]
  positionals: Positional[]
  help: Help | null
}
export const classify: Classify = (arg) => {
  const commands: Command[] = []
  const options: Option[] = []
  const positionals: Positional[] = []
  let help: Help | null = null

  for (const [name, value] of Object.entries(arg)) {
    value.bindName(name)
    if (value instanceof Command) {
      commands.push(value)
    } else if (value instanceof Option) {
      options.push(value)
    } else if (value instanceof Positional) {
      positionals.push(value)
    } else if (value instanceof Help) {
      help = value
    }
  }

  return { commands, options, positionals, help }
}
