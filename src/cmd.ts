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
  public prompt?: PromptInterface

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
    const prompt = this.prompt ?? new Prompt()

    const matchedRoute = parser.listMatchableRoutes().find((route) => {
      return this._routes.hasOwnProperty(route)
    })

    for (const [i, positional] of this._positionals.entries()) {
      positional.bind(parser, i, matchedRoute)
    }
    for (const flag of this.inheritFlags) {
      flag.bind(parser)
    }
    for (const flag of this._flags) {
      flag.bind(parser)
    }

    for (const handler of this._handlers) {
      handler(prompt)
    }

    if (typeof matchedRoute === 'undefined') {
      return
    }

    const cmd = this._routes[matchedRoute]
    cmd.argv = this.argv
    cmd.baseRoute = matchedRoute
    cmd.prompt = prompt
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
}
