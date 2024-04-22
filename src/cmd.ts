import { Flag, FlagConfig } from './flag'
import { Argv } from './parseutil'
import { Positional, PositionalConfig } from './positional'
import { Prompt, type PromptInterface } from './prompt'

export type Handler = (prompt: PromptInterface) => void | number

export type CmdConfig = {
  description: string
}

export class Cmd {
  public config: CmdConfig
  public positionals: Positional[] = []
  public flags: Flag[] = []
  public handlers: Handler[] = []
  public routes: Record<string, Cmd> = {}
  public prompt: PromptInterface = new Prompt()
  public matchedRoute?: string
  public baseRoute: string = ''
  public argv: string[]

  constructor(config: Partial<CmdConfig> = {}) {
    this.config = { description: '', ...config }
    this.argv = process.argv
  }

  positional(name: string, config: Partial<PositionalConfig> = {}): Positional {
    config.position = this.positionals.length
    const positional = new Positional(name, config)
    this.positionals.push(positional)
    return positional
  }

  flag(name: string, config: Partial<FlagConfig> = {}): Flag {
    const flag = new Flag(name, config)
    this.flags.push(flag)
    return flag
  }

  handle(handler: Handler) {
    this.handlers.push(handler)
  }

  cmd(route: string, cmd: Cmd) {
    this.routes[route] = cmd
  }

  run() {
    this.matchedRoute = this.listMatchableRoutes().find((route) => {
      return this.routes.hasOwnProperty(route)
    })
    for (const positional of this.positionals) {
      positional.argv = new Argv(this.argv)
      positional.baseRoute = this.baseRoute
    }
    for (const flag of this.flags) {
      flag.argv = new Argv(this.argv)
    }

    for (const handler of this.handlers) {
      const code = handler(this.prompt)
      if (typeof code === 'number') {
        this.prompt.exit(code)
        return
      }
    }

    if (typeof this.matchedRoute === 'undefined') {
      // TODO: This should be configrued inside handle function
      // this.printHelpMessage()
      this.prompt.exit(1)
      return
    }

    const cmd = this.routes[this.matchedRoute]
    cmd.argv = this.argv
    cmd.baseRoute = this.matchedRoute
    cmd.prompt = this.prompt
    cmd.flags = this.flags
    cmd.run()
  }

  get matchedCmd(): Cmd {
    return this.matchedRoute === undefined ? this : this.routes[this.matchedRoute]
  }

  getHelpMessage(): string {
    const cmd = this.matchedCmd
    let helpMessage = `${cmd.config.description}\n`

    if (Object.keys(cmd.routes).length > 0) {
      helpMessage += '\n'
      helpMessage += 'Commands:\n'
      for (const route of Object.keys(cmd.routes)) {
        helpMessage += `  ${route}\n`
      }
    }

    if (cmd.flags.length > 0) {
      helpMessage += '\n'
      helpMessage += 'Flags:\n'
      for (const flag of cmd.flags) {
        helpMessage += `  ${flag.name}\t${flag.config.description}\n`
      }
    }

    return helpMessage
  }

  listMatchableRoutes(): string[] {
    const list: string[] = []

    const argv = new Argv(this.argv)
    const mayCommandArgs = argv.find((i, value, prev) => !value.startsWith('-') && !prev.startsWith('-'))

    for (let i = 0; i < mayCommandArgs.length; i++) {
      list.push(mayCommandArgs.slice(0, i + 1).join(' '))
    }

    return list
  }
}
