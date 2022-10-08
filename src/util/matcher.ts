import { Command } from '@/fragment/command'

export const matcher = (positionals: string[], commands: Command[]): {resolved: boolean, command: Command|null, rest: string[]} => {
  if (positionals.length > 0) {
    const word = positionals[0]
    for (const command of commands) {
      if (command.isMatch(word)) {
        positionals.shift()
        if (command.commands.length > 0) {
          return matcher(positionals, command.commands)
        } else {
          return {resolved: true, command: command, rest: positionals}
        }
      }
    }
  }
  return {resolved: false, command: null, rest: positionals}
}
