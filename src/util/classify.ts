import { Command } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { Positional } from '@/fragment/positional'

type Classify = (arg: { [key: string]: Command | Option | Positional }) => { commands: Command[]; options: Option[], positionals: Positional[] }
export const classify: Classify = (arg) => {
  const commands: Command[] = []
  const options: Option[] = []
  const positionals: Positional[] = []

  for (const [name, value] of Object.entries(arg)) {
    value.bindName(name)
    if (value instanceof Command) {
      commands.push(value)
    } else if (value instanceof Option) {
      options.push(value)
    } else if (value instanceof Positional) {
      positionals.push(value)
    }
  }

  return { commands, options, positionals }
}
