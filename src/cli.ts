import { Handler } from './handler'
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
    this._layers.push(handler)
  }

  route(route: string, handler: Handler) {
    this._routes[route] = handler
  }

  run(args: string[] = process.argv, prompt: PromptInterface = new Prompt()) {
    for (const handler of this._layers) {
      handler.run(args, prompt)
    }

    // todo remove positional argument
    const cmdRoute = args.join(' ')
    if (this._routes.hasOwnProperty(cmdRoute)) {
      const handler = this._routes[cmdRoute]
      handler.run(args, prompt)
    }
  }
}
