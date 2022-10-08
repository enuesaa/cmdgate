import { Command } from '@/command'
import { Option } from '@/option'

type Classify = (arg: { [key: string]: Command | Option }) => { commands: Command[]; options: Option[] }
export const classify: Classify = (arg) => {
  const commands: Command[] = []
  const options: Option[] = []

  for (const [name, value] of Object.entries(arg)) {
    value.bindName(name)
    if (value instanceof Command) {
      commands.push(value)
    } else if (value instanceof Option) {
      options.push(value)
    }
  }

  return { commands, options }
}
