import { Handler, Middlewares, Handlers } from '@/handler'
import { Context } from '@/context'
import { getArgs } from '@/parse'

export class Command {
  private _name: string = ''
  private _description: string = ''
  private _middlewares: Middlewares = []
  private _handlers: Handlers = {}

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

  handler(name: string, handler: Handler): this {
    this._handlers[name] = handler
    return this
  }

  // describe()

  run(args: string[] = getArgs()): void {
    // const parsedArgs = parseArgs(args)
    const context = new Context() // pass args

    for (const gate of this._middlewares) {
      runGate(gate, context)
    }

    const route = context.getParsedRoute()
    for (const [gateRoute, gate] of Object.entries(this._handlers)) {
      if (gateRoute === route) {
        runGate(gate, context)
        break;
      }
    }
  }
}
