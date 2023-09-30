import process from 'node:process'
import { Handler } from './handler'
import { Prompt } from './prompt'
import { Context } from './context'

export type CliConfig = {
  name: string
  description: string
  version: string
  handlers: Record<string, Handler>
}

export class Cli {
  private _name: string = ''
  private _description: string = ''
  private _version: string = ''
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
    this.route('', handler)
  }

  route(route: string, handler: Handler) {
    this._handlers[route] = handler
  }

  describeConfig(): CliConfig {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      handlers: this._handlers,
    }
  }

  run(argv: string[] = process.argv, prompt: Prompt = new Prompt()) {
    const context = new Context(argv)
  
    const route = argv.slice(2).join(' ')
    for (const [handlerRoute, handler] of Object.entries(this._handlers)) {
      if (route === '') {
        handler.run(context, prompt)
      }
      if (route === handlerRoute) {
        handler.run(context, prompt)
        break
      }
    }
    prompt.close()
  }
}
