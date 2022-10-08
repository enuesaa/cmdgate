import { Command } from '@/fragment/command'
import { Option } from '@/fragment/option'
import { resoveStdinArgs } from '@/util/stdinArgs'

export const matcher = (stdinArgs: string[]) => {
  const stdinArgDict = resoveStdinArgs(stdinArgs)
  console.log(stdinArgDict)
}

// const searchFromCommands = (commands: Command[], value: string): false | Command => {
//   for (const command of commands) {
//     if (command.isMatch(value)) {
//       return command
//     }
//   }
//   return false
// }

// const searchFromOptions = (options: Option[], value: string): false | Option => {
//   for (const option of options) {
//     if (option.isMatch(value)) {
//       return option
//     }
//   }
//   return false
// }
