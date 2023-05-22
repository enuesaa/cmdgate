import { Option, OptionConfig } from '@/option'
import { Argument, ArgumentConfig } from '@/argument'
import { Context } from '@/context'
import { runGate } from '@/runner'

export type Middlewares = Handler[]
export type Handlers = Record<string, Handler>
type HandleFn = () => void

export class Handler {
  protected _arguments: Argument[] = [];
  protected _options: Option[] = [];
  protected _handlefn: HandleFn = () => {};
  protected _description: string = '';
  protected _middlewares: Middlewares = [];
  protected _handlers: Handlers = {};

  argument(name: string, config: ArgumentConfig): this {
    this._arguments.push({ name, config })
    return this
  }

  option(name: string, config: OptionConfig): this {
    this._options.push({ name, config })
    return this
  }

  description(description: string): this {
    this._description = description;
    return this
  }

  handle(handlefn: HandleFn): this {
    this._handlefn = handlefn;
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

  run(context: Context): Context {
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
    return context
  }
}
