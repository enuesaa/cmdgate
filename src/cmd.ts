import { Flag, FlagConfig } from './flag'
import { Parser } from './parser'
import { Positional, PositionalConfig } from './positional'
import { Prompt, type PromptInterface } from './prompt'

export type Handler = (prompt: PromptInterface) => void | number

export type CmdConfig = {
  description: string
}

export class Cmd {
  public config: CmdConfig
  // readonly positionals: Positional[] = []
  readonly flags: Flag[] = []
  readonly handlers: Handler[] = []
  readonly routes: Record<string, Cmd> = {}
  public argv?: string[]
  public baseRoute: string = ''
  public inheritFlags: Flag[] = []
  public prompt: PromptInterface = new Prompt()
  public matchedRoute?: string
  public parser: Parser
  // todo remove
  protected positionals: number = 0

  constructor(config: Partial<CmdConfig> = {}) {
    this.config = {
      description: '',
      ...config,
    }
    this.parser = new Parser()
  }

  positional(name: string, config: Partial<PositionalConfig> = {}): Positional {
    config.position = this.positionals++
    return new Positional(name, config, this.parser)
  }

  flag(name: string, config: Partial<FlagConfig> = {}): Flag {
    return new Flag(name, config, this.parser)
  }

  handle(handler: Handler) {
    this.handlers.push(handler)
  }

  cmd(route: string, cmd: Cmd) {
    this.routes[route] = cmd
  }

  run() {
    const argv = this.argv ?? process.argv
    this.parser.argv = argv
    this.parser.baseRoute = this.baseRoute

    this.matchedRoute = this.parser.listMatchableRoutes().find((route) => {
      return this.routes.hasOwnProperty(route)
    })

    for (const flag of this.inheritFlags) {
      flag.bind(this.parser)
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
    cmd.inheritFlags = this.flags
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

    // todo
    // if (cmd.flags.length > 0) {
    //   helpMessage += '\n'
    //   helpMessage += 'Flags:\n'
    //   for (const flag of cmd.flags) {
    //     helpMessage += `  ${flag.name}\t${flag.config.description}\n`
    //   }
    // }

    return helpMessage
  }
}
