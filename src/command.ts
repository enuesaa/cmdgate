import { Handler, Middlewares } from '@/handler'
import { Context } from '@/context'
import { getArgs } from '@/parse'
import { Runner } from './runner'

export class Command {
  private _name: string = ''
  private _description: string = ''
  private _middlewares: Middlewares = []
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
    this._handlers[route] = handler;
    return this
  }

  // should return manifest interface
  describeManifest(): any {
    // describe this command information.
  }

  run(args: string[] = getArgs(), runner: RunnerInterface = new Runner()): number {
    const manifest = this.describeManifest()
    const exitCode = runner.run(args, manifest)

    return exitCode ?? 1
  }
}
