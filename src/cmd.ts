import { Flag, FlagConfig } from './flag'
import { Handlefn, Handler } from './handler'
import { Parser } from './parser'
import { Positional, PositionalConfig } from './positional'
import { Prompt, type PromptInterface } from './prompt'

export type CmdConfig = {
  name: string
  version: string
  description: string
}

export class Cmd {
  public config: CmdConfig
  protected _routes: Record<string, Cmd> = {}
  public argv?: string[]
  public prompt?: PromptInterface

  constructor(config: Partial<CmdConfig> = {}) {
    this.config = {
      name: '',
      version: '',
      description: '',
      ...config,
    }
  }

  positional(name: string, config: Partial<PositionalConfig> = {}): Positional {
    const positional = new Positional(name, config)
    // this._positionals.push(positional)
    return positional
  }

  flag(name: string, config: Partial<FlagConfig> = {}): Flag {
    const flag = new Flag(name, config)
    // this._flags.push(flag)
    return flag
  }

  handle(handlefn: Handlefn) {}

  route(route: string, cmd: Cmd) {
    this._routes[route] = cmd
  }

  run() {
    const argv = this.argv ?? process.argv
    const parser = new Parser(argv)
    const prompt = this.prompt ?? new Prompt()

    for (const route of parser.listMatchableRoutes()) {
      if (this._routes.hasOwnProperty(route)) {
        // TODO fix 循環
        const handler = this._routes[route]
        // handler.run(parser, prompt, route)
      }
    }
  }
}
