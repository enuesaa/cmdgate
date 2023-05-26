import process from 'node:process'

export const getArgs = (): string[] => {
  const [_nodepath, _filename, ...args] = process.argv

  return args
}

/**
 * Patterns 
 * - subcommand --flag flag-value argument // 定義がないと厳しい
 * - subcommand positional
 * - subcommand 
 */
class ParsedArgs {
  getSubcommands(): string[] {
    return []
  }
}

export const parseArgs = (args: string[]) => {}
