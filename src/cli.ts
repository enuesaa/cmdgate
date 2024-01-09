import { Handler } from './handler'
import { Parser } from './parser'
import { Prompt, type PromptInterface } from './prompt'

export type CliConfig = {
  name: string
  version: string
  description: string
}

export class Cli {
  public config: CliConfig
  protected _layers: Handler[] = []
  protected _routes: Record<string, Handler> = {}
  public argv?: string[]
  public prompt?: PromptInterface

  constructor(config: Partial<CliConfig> = {}) {
    this.config = {
      name: '',
      version: '',
      description: '',
      ...config,
    }
  }

  every(handler: Handler) {
    this._layers.push(handler)
  }

  route(route: string, handler: Handler) {
    this._routes[route] = handler
  }

  run() {
    const argv = this.argv ?? process.argv
    const parser = new Parser(argv)
    const prompt = this.prompt ?? new Prompt()

    for (const handler of this._layers) {
      handler.run(parser, prompt, '')
    }

    for (const route of parser.listMatchableRoutes()) {
      if (this._routes.hasOwnProperty(route)) {
        // TODO fix 循環
        const handler = this._routes[route]
        handler.run(parser, prompt, route)
      }
    }
  }
}
