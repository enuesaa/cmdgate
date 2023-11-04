import { Handler } from './handler'
import { Prompt, type PromptInterface } from './prompt'
import { Context } from './context'

export class Cli {
  private _name: string = ''
  private _description: string = ''
  private _version: string = ''
  private _middlewares: Handler[] = []
  private _handlers: Record<string, Handler> = {}

  name(name: string) {
    this._name = name
  }

  description(description: string) {
    this._description = description
  }

  version(version: string) {
    this._version = version
  }

  use(handler: Handler) {
    this._middlewares.push(handler)
  }

  route(route: string, handler: Handler) {
    this._handlers[route] = handler
  }

  describe() {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
    }
  }

  run(prompt: PromptInterface = new Prompt()) {
    const context = new Context(prompt.getArgv())

    for (const handler of this._middlewares) {
      handler.run(context, prompt)
    }

    for (const route of context.routes) {
      if (this._handlers.hasOwnProperty(route)) {
        const handler = this._handlers[route]
        handler.run(context, prompt)
        break
      }
    }
  }
}
