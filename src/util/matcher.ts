import { Command } from '@/fragment/command'

export const matcher = (
  positionals: string[],
  commands: Command[]
): { resolved: boolean; command: Command | null } => {
  for (const command of commands) {
    if (command.route === positionals.join(' ')) {
      return { resolved: true, command: command }
    }
  }
  return { resolved: false, command: null }
}
