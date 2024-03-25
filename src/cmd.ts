import { Flag, FlagConfig } from './flag'
import { Parser } from './parser'
import { Positional, PositionalConfig } from './positional'
import { Prompt, type PromptInterface } from './prompt'

export type Handlefn = (prompt: PromptInterface) => void

export type CmdConfig = {
  description: string
}

export class Cmd {
  public config: CmdConfig
  protected _positionals: Positional[] = []
  protected _flags: Flag[] = []
  protected _handlers: Handlefn[] = []
  protected _routes: Record<string, Cmd> = {}
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
    this._positionals.push(positional)
    return positional
  }

  flag(name: string, config: Partial<FlagConfig> = {}): Flag {
    const flag = new Flag(name, config)
    this._flags.push(flag)
    return flag
  }

  handle(handlefn: Handlefn) {
    this._handlers.push(handlefn)
  }

  route(route: string, cmd: Cmd) {
    this._routes[route] = cmd
  }

  run() {
    const argv = this.argv ?? process.argv
    const parser = new Parser(argv, this.baseRoute)

    this.matchedRoute = parser.listMatchableRoutes().find((route) => {
      return this._routes.hasOwnProperty(route)
    })

    for (const [i, positional] of this._positionals.entries()) {
      positional.bind(parser, i, this.matchedRoute)
    }
    for (const flag of this.inheritFlags) {
      flag.bind(parser)
    }
    for (const flag of this._flags) {
      flag.bind(parser)
    }

    for (const handler of this._handlers) {
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

    const cmd = this._routes[this.matchedRoute]
    cmd.argv = this.argv
    cmd.baseRoute = this.matchedRoute
    cmd.prompt = this.prompt
    cmd.inheritFlags = this._flags
    cmd.run()
  }

  describeCmd() {
    return {
      positionals: this._positionals,
      flags: this._flags,
      handlers: this._handlers,
      routes: this._routes,
    }
  }

  getMatchedCmd(): Cmd {
    return this.matchedRoute === undefined ? this : this._routes[this.matchedRoute]
  }

  getHelpMessage(): string {
    const cmd = this.getMatchedCmd()
    let helpMessage = `${cmd.config.description}\n`

    if (Object.keys(cmd.describeCmd().routes).length > 0) {
      helpMessage += '\n'
      helpMessage += 'Commands:\n'
      for (const route of Object.keys(cmd.describeCmd().routes)) {
        helpMessage += `  ${route}\n`
      }
    }

    if (cmd.describeCmd().flags.length > 0) {
      helpMessage += '\n'
      helpMessage += 'Flags:\n'
      for (const flag of cmd.describeCmd().flags) {
        helpMessage += `  ${flag.name}: ${flag.config.description}\n`
      }
    }

    return helpMessage
  }

  printHelpMessage() {
    this.prompt.print(this.getHelpMessage())
  }
}
