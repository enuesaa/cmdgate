import { Handler } from './handler'
import { Parser } from './parser'
import { Prompt, type PromptInterface } from './prompt'

export type CliConfig = {
  name: string
  version: string
  description: string
}
export class Cli {
  protected _config: CliConfig
  protected _layers: Handler[] = []
  protected _routes: Record<string, Handler> = {}
  protected _argv: null|string[] = null
  protected _prompt: null|PromptInterface = null

  constructor(config: Partial<CliConfig> = {}) {
    this._config = {
      name: '',
      version: '',
      description: '',
      ...config,
    }
  }

  getConfig() {
    return this._config
  }

  every(handler: Handler) {
    this._layers.push(handler)
  }

  route(route: string, handler: Handler) {
    this._routes[route] = handler
  }

  useArgv(argv: string[]) {
    this._argv = argv
  }

  usePrompt(prompt: PromptInterface) {
    this._prompt = prompt
  }

  run() {
    const argv = this._argv ?? process.argv
    const parser = new Parser(argv)
    const prompt = this._prompt ?? new Prompt()

    for (const handler of this._layers) {
      handler.run(parser, prompt)
    }

    for (const route of parser.listMatchableRoutes()) {
      if (this._routes.hasOwnProperty(route)) {
        const handler = this._routes[route]
        handler.run(parser, prompt)
      }
    }
  }
}
