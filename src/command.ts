import process from 'node:process'
import { type CommandConfig } from '@/types/manifest'
import { Handler } from '@/handler'
import { Prompt } from '@/prompt'
import { Context } from '@/context'

export class Command {
  private _name: string = ''
  private _description: string = ''
  private _version: string = ''
  private _middlewares: Handler[] = []
  private _handlers: Record<string, Handler> = {}

  name(name: string): this {
    this._name = name
    return this
  }

  description(description: string): this {
    this._description = description
    return this
  }

  version(version: string): this {
    this._version = version
    return this
  }

  use(handler: Handler): this {
    this._middlewares.push(handler)
    return this
  }

  route(route: string, handler: Handler): this {
    this._handlers[route] = handler
    return this
  }

  describeConfig(): CommandConfig {
    return {
      name: this._name,
      description: this._description,
      version: this._version,
      middlewares: this._middlewares,
      handlers: this._handlers,
    }
  }

  run(argv: string[] = process.argv, prompt: Prompt = new Prompt()): number {
    const config = this.describeConfig()
    const context = new Context(argv, config)

    for (const handler of this._middlewares) {
      handler.run(context, prompt)
    }
  
    const route = '' // todo parse route
    for (const [handlerRoute, handler] of Object.entries(this._handlers)) {
      if (route === handlerRoute) {
        handler.run(context, prompt)
        break
      }
    }
    prompt.close()

    return 1
  }
}
