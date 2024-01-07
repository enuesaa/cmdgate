import { Handler } from './handler'
import { Prompt, type PromptInterface } from './prompt'
import { Context } from './context'

export type CliConfig = {
  name: string
  version: string
  description: string
}
export class Cli {
  protected _config: CliConfig
  protected _middlewares: Handler[] = []
  protected _handlers: Record<string, Handler> = {}
  protected _prompt: PromptInterface = new Prompt()

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

  use(handler: Handler) {
    this._middlewares.push(handler)
  }

  route(route: string, handler: Handler) {
    this._handlers[route] = handler
  }

  prompt(prompt: PromptInterface) {
    this._prompt = prompt
  }

  run(args: string[] = process.argv) {
    const context = new Context(args)

    for (const handler of this._middlewares) {
      handler.run(context, this._prompt)
    }

    for (const route of context.routes) {
      if (this._handlers.hasOwnProperty(route)) {
        const handler = this._handlers[route]
        handler.run(context, this._prompt)
        break
      }
    }
  }
}
