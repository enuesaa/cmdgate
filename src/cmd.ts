import { Flag, FlagConfig } from './flag'
import { Parser } from './parser'
import { Positional, PositionalConfig } from './positional'
import { Prompt, type PromptInterface } from './prompt'

export type Handler = (prompt: PromptInterface) => void

export type CmdConfig = {
  description: string
}

export class Cmd {
  public config: CmdConfig
  readonly positionals: Positional[] = []
  readonly flags: Flag[] = []
  readonly handlers: Handler[] = []
  readonly routes: Record<string, Cmd> = {}
  public argv?: string[]
  public baseRoute: string = ''
  public inheritFlags: Flag[] = []
  public prompt: PromptInterface = new Prompt()
  protected matchedRoute?: string

  constructor(config: Partial<CmdConfig> = {}) {
    this.config = {
      description: '',
      ...config,
    }
  }

  positional(name: string, config: Partial<PositionalConfig> = {}): Positional {
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

  route(route: string, cmd: Cmd) {
    this.routes[route] = cmd
  }

  run() {
    const argv = this.argv ?? process.argv
    const parser = new Parser(argv, this.baseRoute)

    this.matchedRoute = parser.listMatchableRoutes().find((route) => {
      return this.routes.hasOwnProperty(route)
    })

    for (const [i, positional] of this.positionals.entries()) {
      positional.bind(parser, i, this.matchedRoute)
    }
    for (const flag of this.inheritFlags) {
      flag.bind(parser)
    }
    for (const flag of this.flags) {
      flag.bind(parser)
    }

    for (const handler of this.handlers) {
      handler(this.prompt)
      if (this.prompt.isExited()) {
        return
      }
    }

    if (typeof this.matchedRoute === 'undefined') {
      // TODO: This should be configrued inside handle function
      // this.printHelpMessage()
      this.prompt.exit(0)
      return
    }

    const cmd = this.routes[this.matchedRoute]
    cmd.argv = this.argv
    cmd.baseRoute = this.matchedRoute
    cmd.prompt = this.prompt
    cmd.inheritFlags = this.flags
    cmd.run()
  }

  // TODO: refactor
  // this def is so ambiguous as compared to `matchedRoute` above.
  getMatchedCmd(): Cmd {
    return this.matchedRoute === undefined ? this : this.routes[this.matchedRoute]
  }

  getHelpMessage(): string {
    const cmd = this.getMatchedCmd()
    let helpMessage = `${cmd.config.description}\n`

    if (Object.keys(this.routes).length > 0) {
      helpMessage += '\n'
      helpMessage += 'Commands:\n'
      for (const route of Object.keys(this.routes)) {
        helpMessage += `  ${route}\n`
      }
    }

    if (this.flags.length > 0) {
      helpMessage += '\n'
      helpMessage += 'Flags:\n'
      for (const flag of this.flags) {
        helpMessage += `  ${flag.name}: ${flag.config.description}\n`
      }
    }

    return helpMessage
  }
}
