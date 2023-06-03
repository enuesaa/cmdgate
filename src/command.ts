import { Handler } from '@/handler/handler'
import process from 'node:process'
import { type Runner, defaultRunner } from '@/runner/runner'
import { type CommandManifest } from '@/runner/manifest'

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
  run(argv: string[] = process.argv, runner: Runner = defaultRunner): number {
    const manifest = this.describeManifest()

    return runner(argv, manifest)
  }
}
