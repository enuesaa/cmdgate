import { Handler } from '@/handler'
import { getArgs } from '@/parse'
import { type Runner, defaultRunner } from '@/runner'
import { type CommandManifest } from '@/manifest'

export class Command {
  private _name: string = ''
  private _description: string = ''
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

  use(handler: Handler): this {
    this._middlewares.push(handler)
    return this
  }
  
  route(route: string, handler: Handler): this {
    this._handlers[route] = handler
    return this
  }

  describeManifest(): CommandManifest {
    return {
      name: this._name,
      description: this._description,
      middlewares: this._middlewares,
      handlers: this._handlers,
    }
  }

  /**
   * @returns number exit code.
   */
  run(args: string[] = getArgs(), runner: Runner = defaultRunner): number {
    const manifest = this.describeManifest()

    return runner(args, manifest)
  }
}
